import { getFileHandle, listDirEntries, resolveParentHandle } from '@mad-c/file-system-helpers';
import { getUserDirHandle, getUserOpenFileHandle, saveHandle } from '@mad-c/file-system-helpers/access';
import { basename, extname, resolve } from '@mad-c/file-system-helpers/path';
import { requestHandlePermissions } from '@mad-c/file-system-helpers/permissions';
import { FileOperationOverlay } from '../../components/FileOperationOverlay/FileOperationOverlay.ts';
import { processCoverFile } from './cover.ts';
import { type MaterialSku, type SavedFileMetadata, type SDRLogData, FileHashSchema, MaterialSchema, MaterialSkuSchema } from './data.ts';
import { getIDBItem, setIDBItem } from './idb-helpers.ts';
import { saveMaterials } from './material.ts';

// oxlint-disable-next-line no-magic-numbers
const COVER_IMPORT_RELOAD_TIMEOUT = 3 * 1000;

const IGNORE_FILES = [
	'.ds_store'
];

export async function getFileHash(dataToHash: BufferSource | string) {
	const encoder = new TextEncoder();

	let data = dataToHash;

	if (typeof data === 'string') {
		data = encoder.encode(data);
	}

	const hash = await crypto.subtle.digest('SHA-1', data);
	const parsedHash = FileHashSchema.parse(new Uint8Array(hash).toBase64());

	return parsedHash;
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
		// oxlint-disable-next-line typescript/consistent-type-assertions typescript/no-unsafe-type-assertion
		id: id as MaterialSku | undefined,
		extension: extension ?? extname(fileName)
	};
}

async function saveFileMetadata(handle: FileSystemDirectoryHandle | FileSystemFileHandle | FileSystemHandle, path: string, metadata: Partial<SavedFileMetadata> = {}) {
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

	await setIDBItem('files', mergedMetadata.hash, mergedMetadata);

	return mergedMetadata.hash;
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

		const rootDirHash = await getFileHash(`[root] ${dirHandle.name}`);
		await saveFileMetadata(dirHandle, '/', {
			hash: rootDirHash
		});
		await saveHandle(rootDirHash, dirHandle);

		const entryStack = await listDirEntries(dirHandle, { depth: Infinity, rootDir: dirHandle });
		overlay.max = entryStack.length;
		overlay.name = 'File Import';
		overlay.show();

		while (entryStack.length) {
			// oxlint-disable no-await-in-loop
			const { handle, name = '', children } = entryStack.pop() ?? {};

			if (!handle) {
				continue;
			}

			overlay.increment(name);

			await requestHandlePermissions(handle, 'read');

			if (IGNORE_FILES.includes(handle.name.toLowerCase())) {
				continue;
			}

			const { parentPath } = await resolveParentHandle(handle, { rootDir: dirHandle });
			const handlePath = resolve(parentPath, name);

			await saveFileMetadata(handle, handlePath);

			if (children?.length) {
				overlay.max += children.length;

				entryStack.push(...children);
			}
			// oxlint-enable no-await-in-loop
		}
	} catch (err) {
		console.error('Failed to read materials.', err);
	} finally {
		overlay.hideAndRemove();
	}
}
export async function importMaterialsFromFile() {
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
		const hash = await saveFileMetadata(handle, '/data.json');
		await saveHandle(hash, handle);

		const file = await handle.getFile();
		const parsedFile: Partial<SDRLogData> = JSON.parse(await file.text());

		if (!parsedFile.items) {
			throw new Error('No items found in data file.');
		}

		const parsedItems = parsedFile.items.map((material) => {
			try {
				const newMaterial = MaterialSchema.parse(material);

				return newMaterial;
			} catch (err) {
				console.error(err);
			}

			return undefined;
		}).filter((material) => material !== undefined);

		await saveMaterials(parsedItems);
	} catch (err) {
		console.error('Failed to open data file.', err);
	} finally {
		overlay.remove();
	}
}

export async function importCoversFromFolder() {
	const overlay = document.querySelector<FileOperationOverlay>('file-operation-overlay') ?? new FileOperationOverlay();

	document.body.insertAdjacentElement('beforeend', overlay);

	try {
		const dirHandle = await getUserDirHandle({
			id: 'originalCoversFolder',
			startIn: 'downloads'
		}, 'readwrite');

		if (!dirHandle) {
			throw new Error('No dir handle selected');
		}

		await requestHandlePermissions(dirHandle, 'readwrite');

		const coversDirHash = await getFileHash(`[covers] ${dirHandle.name}`);
		await saveFileMetadata(dirHandle, '/covers', {
			hash: coversDirHash
		});
		await saveHandle(coversDirHash, dirHandle);

		const entryStack = await listDirEntries(dirHandle, { depth: Infinity, rootDir: dirHandle });
		overlay.max = entryStack.length;
		overlay.name = 'Cover Import';
		overlay.show();

		while (entryStack.length) {
			// oxlint-disable no-await-in-loop
			const { handle, name = '', children } = entryStack.pop() ?? {};

			if (!handle) {
				continue;
			}

			overlay.increment(name);

			await requestHandlePermissions(handle, 'read');

			if (IGNORE_FILES.includes(handle.name.toLowerCase())) {
				continue;
			}

			if (handle instanceof FileSystemFileHandle) {
				const coverFile = await processCoverFile(handle, 'cover');
				const thumbFile = await processCoverFile(handle, 'thumb');

				const { error: parseError, data: id } = MaterialSkuSchema.safeParse(basename(handle.name));

				if (parseError) {
					continue;
				}

				if (coverFile) {
					const optimizedPath = resolve('/optimized/covers', handle.name);
					const optimizedHandle = await getFileHandle(optimizedPath, { recursive: true, touch: true });
					const writableStream = await optimizedHandle.createWritable();

					await writableStream.truncate(0);
					await writableStream.write(coverFile);
					await writableStream.close();

					const optimizedHash = await getFileHash(await coverFile.arrayBuffer());
					await saveHandle(optimizedHash, optimizedHandle);
					await setIDBItem('covers', id, optimizedHash);
				}

				if (thumbFile) {
					const optimizedPath = resolve('/optimized/thumbs', handle.name);
					const optimizedHandle = await getFileHandle(optimizedPath, { recursive: true, touch: true });
					const writableStream = await optimizedHandle.createWritable();

					await writableStream.truncate(0);
					await writableStream.write(thumbFile);
					await writableStream.close();

					const optimizedHash = await getFileHash(await thumbFile.arrayBuffer());
					await saveHandle(optimizedHash, optimizedHandle);
					await setIDBItem('covers', id, optimizedHash);
				}
			}

			if (children?.length) {
				overlay.max += children.length;

				entryStack.push(...children);
			}
			// oxlint-enable no-await-in-loop
		}

		setTimeout(() => {
			window.navigation.reload();
		}, COVER_IMPORT_RELOAD_TIMEOUT);
	} catch (err) {
		console.error('Failed to import covers from folder.', err);
	} finally {
		overlay.hideAndRemove();
	}
}
