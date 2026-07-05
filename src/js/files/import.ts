import { requestHandlePermissions } from '@mad-c/file-system-helpers/permissions';
import type { MaterialSku } from '../data/data.ts';
import { getIDBItem, getIDBItemByIndex, setIDBItem } from '../data/idb-persistence';

import { listDirEntries } from '@mad-c/file-system-helpers';
import { saveHandle } from '@mad-c/file-system-helpers/access';

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
	const { name, modifier, id, extension } = testRegex.exec(fileName)?.groups ?? { name: fileName, id: undefined, extension: undefined, modifier: undefined };
	const modifierMap = new Map([
		['A', 'attachement'],
		['D', 'draft'],
		['E', 'errata'],
		['T', 'translation'],
		['X', 'extra']
	]);

	return {
		name,
		modifier: modifierMap.get(modifier ?? ''),
		// oxlint-disable-next-line typescript/consistent-type-assertions typescript/no-unsafe-type-assertion
		id: id as MaterialSku,
		extension
	};
}

export async function saveFile(handle: FileSystemDirectoryHandle | FileSystemFileHandle, path?: string) {
	const filePath = path ?? `/${new Date().toISOString()}/${handle.name}`;
	const { name, id, extension } = extractMetadataFromFileName(handle.name);
	const metadata = {
		fileName: name,
		fileExtension: extension,
		mimeType: 'text/directory',
		itemId: id,
		filePath,
		hash: await getFileHash(filePath)
	};

	if (handle.kind === 'file') {
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

	return metadata;
}

async function _readDir(dirHandle: FileSystemDirectoryHandle, parentPath: string) {
	const entries: { path: string, entry: FileSystemDirectoryHandle | FileSystemFileHandle }[] = [];

	for await (const entry of dirHandle.values()) {
		// INFO: Ignore mac os annoying files
		if (entry.name.startsWith('.DS_Store')) {
			continue;
		}

		const entryPath = `${parentPath}/${entry.name}`;

		if (entry.kind === 'directory') {
			entries.push(...await readDir(entry, entryPath));
		} else {
			await requestHandlePermissions(entry, 'read');
		}

		entries.push({
			path: entryPath,
			entry
		});
	}

	return entries;
}

export async function readFiles() {
	const progressOverlay = SdrProgressOverlay.createOverlay({ title: 'Read materials' });

	try {
		const dir = await window.showDirectoryPicker({
			id: 'filesFolder',
			startIn: 'downloads'
		});

		const isPermissionGranted = await getFilePermission(dir);

		if (!isPermissionGranted) {
			throw new Error('Permission denied.');
		}

		const existingDir = await getIDBItemByIndex('files', 'filePath', '/');

		if (!existingDir) {
			const dirHash = await getFileHash('/');

			await setIDBItem('files', undefined, {
				fileName: '/',
				filePath: '/',
				handler: dir,
				hash: dirHash,
				mimeType: 'text/directory'
			});
		}

		const entries = await listDirEntries(dir);

		progressOverlay.total = entries.length;
		for (const { entry, path } of entries) {
			progressOverlay.increment(entry.name);

			// oxlint-disable-next-line no-await-in-loop
			await saveFile(entry, path);
		}
	} catch (err) {
		console.error('Failed to read materials.', err);
	}

	progressOverlay.remove();
}
