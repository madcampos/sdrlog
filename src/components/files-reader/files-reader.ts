import { ProgressOverlay } from '../progress/progress';

import { saveFile } from '../data-operations/idb-persistence';

export async function readFiles() {
	const files = new Map<string, FileSystemFileHandle>();
	const progressOverlay = ProgressOverlay.createOverlay({ title: 'Read materials' });

	async function readDir(dirHandle: FileSystemDirectoryHandle, parentPath: string) {
		for await (const entry of dirHandle.values()) {
			if (entry.kind === 'directory') {
				const dirPath = `${parentPath}/${entry.name}`;

				await saveFile(dirPath, entry);
				await readDir(entry, dirPath);
			} else {
				files.set(`${parentPath}/${entry.name}`, entry);
			}
		}
	}

	try {
		const dir = await window.showDirectoryPicker();

		await saveFile('/', dir);
		await readDir(dir, '');
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err);
	}

	progressOverlay.remove();
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
