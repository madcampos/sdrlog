import { ProgressOverlay } from '../progress/progress';
import { getMaterial, saveFile, saveMaterial, setFileForMaterial } from '../data-operations/idb-persistence';

export function extractMetadataFromFileName(fileName: string) {
	const testRegex = /^(?<id>[A-Z0-9](?:-?[A-Z0-9])+) - (?<name>.+)(?<extension>\.[a-z0-9]{3,})$/u;
	const { name, id, extension } = testRegex.exec(fileName)?.groups ?? {};

	return {
		name,
		id,
		extension
	};
}

async function associateFileWithData(fileName: string, path: string) {
	const testRegex = /^(?<id>[A-Z0-9](?:-?[A-Z0-9])+)(?: [A-Z])? - (?<name>.+)(?<extension>\.[a-z0-9]{3,})$/u;
	const { name, id, extension } = testRegex.exec(fileName)?.groups ?? { name: '', id: '', extension: '' };
	const material = await getMaterial(id);

	if (material) {
		await setFileForMaterial({
			fileName: name,
			filePath: path,
			fileExtension: extension,
			itemId: id
		});

		if (material.status === 'missing') {
			delete material.status;

			await saveMaterial(id, material);
		}
	}
}

export async function readFiles() {
	const progressOverlay = ProgressOverlay.createOverlay({ title: 'Read materials' });

	async function readDir(dirHandle: FileSystemDirectoryHandle, parentPath: string) {
		for await (const entry of dirHandle.values()) {
			const entryPath = `${parentPath}/${entry.name}`;

			if (entry.kind === 'directory') {
				await readDir(entry, entryPath);
			} else {
				await associateFileWithData(entry.name, entryPath);
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
