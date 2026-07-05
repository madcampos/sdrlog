import { listDirEntries, resolveParentHandle } from '@mad-c/file-system-helpers';
import { getUserDirHandle, saveHandle } from '@mad-c/file-system-helpers/access';
import { basename, extname, resolve } from '@mad-c/file-system-helpers/path';
import { requestHandlePermissions } from '@mad-c/file-system-helpers/permissions';
import { FileOperationOverlay } from '../../components/FileOperationOverlay/FileOperationOverlay.ts';
import type { MaterialSku } from '../data/data.ts';
import { type SavedFileMetadata, getIDBItem, setIDBItem } from '../data/idb-persistence';

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
		// oxlint-disable-next-line typescript/consistent-type-assertions typescript/no-unsafe-type-assertion
		id: id as MaterialSku,
		extension: extension ?? extname(fileName)
	};
}

export async function saveFile(handle: FileSystemDirectoryHandle | FileSystemFileHandle | FileSystemHandle, path: string) {
	const { name, id, extension } = extractMetadataFromFileName(handle.name);
	const metadata: SavedFileMetadata = {
		itemId: id,
		fileName: name,
		filePath: path,
		mimeType: 'text/directory',
		fileExtension: extension,
		hash: await getFileHash(path)
	};

	if (handle instanceof FileSystemFileHandle) {
		const file = await handle.getFile();

		metadata.hash = await getFileHash(await file.arrayBuffer());
		metadata.mimeType = file.type;

		if (metadata.itemId) {
			const material = await getIDBItem('items', metadata.itemId);

			if (material) {
				material.status = 'ok';

				await setIDBItem('items', metadata.itemId, material);
			}
		}
	}

	await saveHandle(metadata.hash, handle, metadata);
	await setIDBItem('files', undefined, metadata);

	return metadata;
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

		const dirHash = await getFileHash(`(root) ${dirHandle.name}`);
		await saveHandle(dirHash, dirHandle);
		await setIDBItem('files', undefined, {
			fileName: '/',
			filePath: '/',
			mimeType: 'text/directory',
			fileExtension: '',
			hash: dirHash
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

			await saveFile(handle, handlePath);

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
