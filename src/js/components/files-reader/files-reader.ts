import { ProgressOverlay } from '../progress/progress';

import { saveFile } from '../data-operations/idb-persistence';

export async function readFiles() {
	const progressOverlay = ProgressOverlay.createOverlay({ title: 'Read materials' });

	async function readDir(dirHandle: FileSystemDirectoryHandle, parentPath: string) {
		for await (const entry of dirHandle.values()) {
			const entryPath = `${parentPath}/${entry.name}`;

			if (entry.kind === 'directory') {
				await readDir(entry, entryPath);
			}

			await saveFile(entryPath, entry);
		}
	}

	try {
		const dir = await window.showDirectoryPicker({
			id: 'filesReader',
			startIn: 'downloads'
		});

		await saveFile('/', dir);
		await readDir(dir, '');
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err);
	}

	progressOverlay.remove();
}

export async function getFilePermission(file: FileSystemHandle, mode: 'read' | 'readwrite' = 'read') {
	const isPermissionGranted = await file.queryPermission({ mode }) === 'granted';

	if (isPermissionGranted) {
		return true;
	}

	return await file.requestPermission({ mode }) === 'granted';
}

export function extractMetadataFromFileName(fileName: string) {
	const testRegex = /^(?<id>[A-Z0-9](?:-?[A-Z0-9])+) - (?<title>.+)(?<extension>\.[a-z]+)$/u;
	const { name, id, extension } = testRegex.exec(fileName)?.groups ?? {};

	return {
		name,
		id,
		extension
	};
}
