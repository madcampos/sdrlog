import type { FileSystemEntryForMaterial } from '../../data/data';

import { SdrProgressOverlay } from '../../components/SdrProgressOverlay';
import { getIDBItem, getIDBItemByIndex, setIDBItem } from '../data/idb-persistence';

export async function getFileHash(dataToHash: BufferSource | string) {
	const encoder = new TextEncoder();

	let data = dataToHash;

	if (typeof data === 'string') {
		data = encoder.encode(data);
	}

	const hash = await crypto.subtle.digest('SHA-1', data);

	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	return [...new Uint8Array(hash)].map((char) => char.toString(16).padStart(2, '0')).join('');
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
		id,
		extension
	};
}

export async function saveFile(handler: FileSystemDirectoryHandle | FileSystemFileHandle, path?: string) {
	const filePath = path ?? `/${new Date().toISOString()}/${handler.name}`;
	const { name, id, extension } = extractMetadataFromFileName(handler.name);
	const fileForMaterial: FileSystemEntryForMaterial = {
		fileName: name,
		fileExtension: extension,
		mimeType: 'text/directory',
		itemId: id,
		filePath,
		hash: await getFileHash(filePath),
		handler
	};

	if (handler.kind === 'file') {
		const file = await handler.getFile();

		fileForMaterial.hash = await getFileHash(await file.arrayBuffer());
		fileForMaterial.mimeType = file.type;

		if (fileForMaterial.itemId) {
			const material = await getIDBItem('items', fileForMaterial.itemId);

			if (material) {
				material.status = 'ok';

				await setIDBItem('items', fileForMaterial.itemId, material);
			}
		}
	}

	const existingFile = await getIDBItemByIndex('files', 'hash', fileForMaterial.hash);

	if (!existingFile) {
		await setIDBItem('files', undefined, fileForMaterial);
	}

	return fileForMaterial;
}

export async function getFilePermission(file: FileSystemHandle, mode: 'read' | 'readwrite' = 'read') {
	const isPermissionGranted = await file.queryPermission({ mode }) === 'granted';

	if (isPermissionGranted) {
		return true;
	}

	return await file.requestPermission({ mode }) === 'granted';
}

async function readDir(dirHandle: FileSystemDirectoryHandle, parentPath: string) {
	const entries: { path: string, entry: FileSystemDirectoryHandle | FileSystemFileHandle }[] = [];

	for await (const entry of dirHandle.values()) {
		// Ignore useless mac os files
		if (entry.name.startsWith('.DS_Store')) {
			continue;
		}

		const entryPath = `${parentPath}/${entry.name}`;

		if (entry.kind === 'directory') {
			entries.push(...await readDir(entry, entryPath));
		} else {
			await getFilePermission(entry);
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

		const entries = await readDir(dir, '');

		progressOverlay.total = entries.length;
		for (const { entry, path } of entries) {
			progressOverlay.increment(entry.name);

			await saveFile(entry, path);
		}
	} catch (err) {
		console.error('Failed to read materials.', err);
	}

	progressOverlay.remove();
}
