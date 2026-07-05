import { listDirEntries, resolveParentHandle } from '@mad-c/file-system-helpers';
import { getUserDirHandle, getUserOpenFileHandle, saveHandle } from '@mad-c/file-system-helpers/access';
import { basename, extname, resolve } from '@mad-c/file-system-helpers/path';
import { requestHandlePermissions } from '@mad-c/file-system-helpers/permissions';
import { parse } from 'valibot';
import dataFileUrl from '../../../public/data/index.json?url';
import { FileOperationOverlay } from '../../components/FileOperationOverlay/FileOperationOverlay.ts';
import { type Material, type MaterialSku, type NewMaterial, type SavedFileMetadata, type SDRLogData, MaterialSchema } from '../data/data.ts';
import { getAllIDBValues, getIDBItem, setIDBItem, setIDBItems } from '../data/idb-persistence';

export async function getFileHash(dataToHash: BufferSource | string) {
	const encoder = new TextEncoder();

	let data = dataToHash;

	if (typeof data === 'string') {
		data = encoder.encode(data);
	}

	const hash = await crypto.subtle.digest('SHA-1', data);

	return new Uint8Array(hash).toBase64();
}

export function extractMetadataFromFileName(fileName: string) {
	const testRegex = /^(?:(?<id>[A-Z0-9](?:-?[A-Z0-9])+)(?: \((?<modifier>[ADETX])\))? - )?(?<name>.*?)?(?<extension>\.\w+)$/u;
	const { name, modifier, id, extension } = testRegex.exec(fileName)?.groups ?? {};
	const modifierMap = new Map([
		['A', 'attachement'],
		['D', 'draft'],
		['E', 'errata'],
		['T', 'translation'],
		['X', 'extra']
	]);

	return {
		name: name ?? basename(fileName),
		modifier: modifierMap.get(modifier ?? ''),
		// oxlint-disable-next-line typescript/consistent-type-assertions
		id: id as MaterialSku | undefined,
		extension: extension ?? extname(fileName)
	};
}

export async function saveMaterialHandle(handle: FileSystemDirectoryHandle | FileSystemFileHandle | FileSystemHandle, path: string, metadata: Partial<SavedFileMetadata> = {}) {
	const { name, id, extension } = extractMetadataFromFileName(handle.name);
	const mergedMetadata: SavedFileMetadata = {
		itemId: id,
		path,
		mimeType: 'application/x-directory',
		fileName: name,
		extension,
		hash: metadata.hash ?? await getFileHash(path),
		...metadata
	};

	if (handle instanceof FileSystemFileHandle) {
		const file = await handle.getFile();

		mergedMetadata.hash = await getFileHash(await file.arrayBuffer());
		mergedMetadata.mimeType = file.type;

		if (mergedMetadata.itemId) {
			const material = await getIDBItem('items', mergedMetadata.itemId);

			if (material) {
				material.status = 'ok';

				await setIDBItem('items', mergedMetadata.itemId, material);
			}
		}
	}

	await saveHandle(mergedMetadata.hash, handle);
	await setIDBItem('files', undefined, mergedMetadata);

	return mergedMetadata;
}

export async function importFiles() {
	const overlay = document.querySelector<FileOperationOverlay>('file-operation-overlay') ?? new FileOperationOverlay();

	document.body.insertAdjacentElement('beforeend', overlay);

	try {
		const dirHandle = await getUserDirHandle({
			id: 'filesFolder',
			startIn: 'downloads'
		}, 'read');

		if (!dirHandle) {
			throw new Error('No dir handle selected');
		}

		await requestHandlePermissions(dirHandle, 'read');

		const hash = await getFileHash(`(root) ${dirHandle.name}`);
		await saveMaterialHandle(dirHandle, '/', {
			hash
		});

		const entryStack = await listDirEntries(dirHandle);
		overlay.max = entryStack.length;

		while (entryStack.length) {
			// oxlint-disable no-await-in-loop
			const { handle, name = '', children } = entryStack.pop() ?? {};

			if (!handle) {
				continue;
			}

			overlay.increment(name);

			await requestHandlePermissions(handle, 'read');

			const { parentPath } = await resolveParentHandle(handle, { rootDir: dirHandle });
			const handlePath = resolve(parentPath, name);

			await saveMaterialHandle(handle, handlePath);

			if (children?.length) {
				overlay.max += children.length;

				entryStack.push(...children);
			}
			// oxlint-enable no-await-in-loop
		}
	} catch (err) {
		console.error('Failed to read materials.', err);
	} finally {
		overlay.remove();
	}
}

export async function fetchOnlineItems() {
	try {
		const res = await fetch(dataFileUrl);

		if (res.ok) {
			const parsedFile: SDRLogData = await res.json();

			return parsedFile.items;
		}
	} catch (err) {
		console.error('Failed to load data.', err);
	}

	return [];
}

export async function saveItems(newItems: Material[]) {
	const currentItems = await getAllIDBValues('items');
	const mergedItems = new Map<string, Material>();

	for (const material of currentItems) {
		mergedItems.set(material.sku[0] ?? '', material);
	}

	for (const material of newItems) {
		const [sku = ''] = material.sku;
		const existingMaterial = mergedItems.get(sku);

		mergedItems.set(sku, {
			...existingMaterial,
			...material
		});
	}

	await setIDBItems('items', [...mergedItems.entries()]);

	return [...mergedItems.values()];
}

export async function openDataFile() {
	const overlay = document.querySelector<FileOperationOverlay>('file-operation-overlay') ?? new FileOperationOverlay();

	document.body.insertAdjacentElement('beforeend', overlay);

	try {
		const handle = await getUserOpenFileHandle({
			id: 'dataFile',
			startIn: 'downloads',
			excludeAcceptAllOption: false,
			types: [{ description: 'JSON Files', accept: { 'text/json': ['.json'] } }]
		});

		if (!handle) {
			throw new Error('No file selected');
		}

		await requestHandlePermissions(handle, 'read');
		await saveMaterialHandle(handle, '/data.json');

		const file = await handle.getFile();
		const parsedFile: Partial<SDRLogData> = JSON.parse(await file.text());

		if (!parsedFile.items) {
			throw new Error('No items found in data file.');
		}

		const parsedItems = parsedFile.items.map((material) => parse(MaterialSchema, material));

		await saveItems(parsedItems);
	} catch (err) {
		console.error('Failed to open data file.', err);
	} finally {
		overlay.remove();
	}
}

export async function saveNewMaterial(newMaterial: NewMaterial) {
	// TODO: validate material
	const { files, cover, thumbnail, ...materialToSave } = newMaterial;

	// TODO: handle cover and thumbnail

	await setIDBItem('items', materialToSave.sku[0], materialToSave);

	await Promise.all((files ?? []).map(async (file) => {
		// TODO: save handle
	}));
}
