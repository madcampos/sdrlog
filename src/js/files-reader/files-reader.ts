import { SdrProgressOverlay } from '../../components/progress/progress';
import { getMaterial, saveFile, saveMaterial, setFileForMaterial } from '../data-operations/idb-persistence';
import { I18n } from '../intl/translations';
import { Logger } from '../util/logger';

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

export async function associateFileWithData(fileName: string, path: string, type: string) {
	const testRegex = /^(?<id>[A-Z0-9](?:-?[A-Z0-9])+)(?: [A-Z])? - (?<name>.+)(?<extension>\.[a-z0-9]{3,})$/u;
	const { name, id, extension } = testRegex.exec(fileName)?.groups ?? { name: '', id: '', extension: '' };
	const material = await getMaterial(id);

	if (material) {
		const fileForMaterial = {
			fileName: name,
			filePath: path,
			mimeType: type,
			fileExtension: extension,
			itemId: id
		};

		await setFileForMaterial(fileForMaterial);

		if (material.status === 'missing') {
			delete material.status;

			await saveMaterial(id, material);
		}

		return fileForMaterial;
	}

	return null;
}

export async function getFilePermission(file: FileSystemHandle, mode: 'read' | 'readwrite' = 'read') {
	const isPermissionGranted = await file.queryPermission({ mode }) === 'granted';

	if (isPermissionGranted) {
		return true;
	}

	return await file.requestPermission({ mode }) === 'granted';
}

async function readDir(dirHandle: FileSystemDirectoryHandle, parentPath: string) {
	const entries: { path: string, entry: FileSystemHandle }[] = [];

	for await (const entry of dirHandle.values()) {
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

		await saveFile('/', dir);

		const entries = await readDir(dir, '');

		progressOverlay.total = entries.length;
		for await (const { entry, path } of entries) {
			progressOverlay.increment();

			if (entry.kind === 'file') {
				const file = await (entry as FileSystemFileHandle).getFile();

				await associateFileWithData(entry.name, path, file.type);
			}

			await saveFile(path, entry);
		}
	} catch (err) {
		Logger.error('Failed to read materials.', err);
	}

	progressOverlay.remove();
}
