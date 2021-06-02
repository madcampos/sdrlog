import { getCover, saveCover, saveFile } from '../data-operations/idb-persistence';
import { extractCover } from './cover-extractor';
import { encode } from './optimizer';
import { isNameExcluded } from './names-filter-list';

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

function matchFileWithData(name: string) {
	const testRegex = /^(?<id>[A-Z0-9](?:-?[A-Z0-9])+) - (?<title>.+)(?<extension>\.[a-z]+)$/u;
	const { title, id, extension } = testRegex.exec(name)?.groups ?? {};

	return {
		name: title,
		id,
		extension
	};
}

async function processCover(file: FileSystemFileHandle, name: string, id: string) {
	if (id && name.endsWith('.pdf') && !isNameExcluded(name)) {
		const savedCover = await getCover(id);

		if (!savedCover) {
			const { width, height, data: coverData } = await extractCover(await file.getFile());
			const optimizedCover = await encode(coverData.buffer, { width, height });
			const coverName = `${id}.jpg`;

			const cover = new File([optimizedCover], coverName, {
				type: 'image/jpeg'
			});

			await saveCover(id, cover);
		}
	}
}

async function processFiles() {
	const dialog = document.createElement('dialog');

	dialog.innerHTML = '<h1>Loading Files...</h1><progress></progress><p></p>';
	document.body.appendChild(dialog);
	dialog.showModal();

	const progress = dialog.querySelector('progress') as HTMLProgressElement;
	const description = dialog.querySelector('p') as HTMLParagraphElement;
	const files = await readFiles();
	let i = 1;

	progress.max = files.size;

	for await (const [name, file] of files.entries()) {
		progress.value = i;
		i += 1;
		description.textContent = `${i}/${progress.max}`;

		try {
			const { id } = matchFileWithData(file.name);

			await processCover(file, name, id);
		} catch (err: unknown) {
			// eslint-disable-next-line no-console
			console.error(`Error processing item: ${name}`);
			// eslint-disable-next-line no-console
			console.error(err);
		}
	}

	dialog.remove();

	return files;
}

export function createMaterialsImportButton() {
	const button = document.createElement('button');

	button.textContent = '📥 Import Materials';
	button.addEventListener('click', async () => {
		await processFiles();
	});

	return button;
}
