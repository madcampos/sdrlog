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