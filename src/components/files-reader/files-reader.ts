import { saveFile } from '../data-operations/idb-persistence';
import { extractCover } from './cover-extractor';
import { Encoder } from './optimizer';

const encoder = new Encoder();

async function readFiles() {
	const files = new Map<string, FileSystemFileHandle>();
	const dir = await window.showDirectoryPicker();

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

	await saveFile('/', dir);
	await readDir(dir, '');

	return files;
}

async function processFiles() {
	const files = await readFiles();

	for await (const [name, file] of files.entries()) {
		await saveFile(name, file);

		if (name.endsWith('.pdf')) {
			const cover = await extractCover(await file.getFile());
			const coverImg = await encoder.encode(cover.data.buffer, { width: 2048, height: 2048 });

			// TODO: save covers here?
			console.log(coverImg);
		}
	}
}

export function createMaterialsImportButton() {
	const button = document.createElement('button');

	button.textContent = '📥 Import Materials';
	button.addEventListener('click', async () => {
		await processFiles();
	});

	return button;
}
