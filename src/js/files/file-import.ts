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
	const testRegex = /^(?:(?<id>[A-Z0-9](?:-?[A-Z0-9])+)(?: \((?<modifier>[ADETX])\))? - )?(?<name>.*)(?<extension>\.[a-z][a-z0-9]+)?$/u;
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


			const { name, id, extension } = extractMetadataFromFileName(entry.name);
			const fileForMaterial: FileForMaterial = {
				fileName: name,
				fileExtension: extension,
				mimeType: 'text/directory',
				itemId: id,
				filePath: path,
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

			await setIDBItem('files', undefined, fileForMaterial);
		}
	} catch (err) {
		console.error('Failed to read materials.', err);
	}

	progressOverlay.remove();
}
