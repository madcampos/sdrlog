import type { FileForMaterial } from '../../data/data';

import { SdrProgressOverlay } from '../../components/SdrProgressOverlay';
import { getIDBItem, setIDBItem } from '../data/idb-persistence';
import { I18n } from '../intl/translations';

export async function getFileHash(dataToHash: ArrayBuffer | string) {
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
	const testRegex = /^(?<id>[A-Z0-9](?:-?[A-Z0-9])+)(?: \((?<modifier>[ADETX])\))? - (?<name>.+)(?<extension>\.[a-z0-9]{3,})$/u;
	const { name, modifier, id, extension } = testRegex.exec(fileName)?.groups ?? {};
	const modifierMap = new Map([
		['A', 'attachement'],
		['D', 'draft'],
		['E', 'errata'],
		['T', 'translation'],
		['X', 'extra']
	]);

	return {
		name,
		modifier: modifierMap.get(modifier),
		id,
		extension
	};
}

export function getFileMetadataForMaterial(fileName: string, path: string) {
	const testRegex = /^(?<id>[A-Z0-9](?:-?[A-Z0-9])+)(?: [A-Z])? - (?<name>.+)(?<extension>\.[a-z0-9]{3,})$/u;
	const { name, id, extension } = testRegex.exec(fileName)?.groups ?? { name: fileName, id: undefined, extension: undefined };
	const fileForMaterial = {
		fileName: name,
		filePath: path,
		fileExtension: extension,
		itemId: id
	};

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
	const entries: { path: string, entry: FileSystemFileHandle | FileSystemDirectoryHandle }[] = [];

	for await (const entry of dirHandle.values()) {
		if (entry.name.startsWith('.')) {
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
	const progressOverlay = SdrProgressOverlay.createOverlay({ title: I18n.t`Read materials` });

	try {
		const dir = await window.showDirectoryPicker({
			id: 'filesFolder',
			startIn: 'downloads'
		});

		const dirHash = await getFileHash('/');

		await setIDBItem('files', undefined, {
			filePath: '/',
			handler: dir,
			hash: dirHash
		});

		const entries = await readDir(dir, '');

		progressOverlay.total = entries.length;
		for await (const { entry, path } of entries) {
			progressOverlay.increment();

			const fileForMaterial: FileForMaterial = {
				...getFileMetadataForMaterial(entry.name, path),
				hash: await getFileHash(path),
				handler: entry
			};

			if (entry.kind === 'file') {
				const file = await entry.getFile();

				fileForMaterial.hash = await getFileHash(await file.arrayBuffer());
				fileForMaterial.mimeType = file.type;

				if (fileForMaterial.itemId) {
					const material = await getIDBItem('items', fileForMaterial.itemId);

					// eslint-disable-next-line max-depth
					if (material) {
						material.status = 'ok';

						await setIDBItem('items', fileForMaterial.itemId, material);
					}
				}
			}

			const existingFile = await getIDBItem('files', fileForMaterial.hash);

			if (!existingFile) {
				await setIDBItem('files', undefined, fileForMaterial);
			} else {
				console.warn('File already exists.', existingFile, fileForMaterial);
			}
		}
	} catch (err) {
		console.error('Failed to read materials.', err);
	}

	progressOverlay.remove();
}
