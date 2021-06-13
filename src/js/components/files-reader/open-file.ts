import type { FileForMaterial } from '../../../../data/data';

import { getFile } from '../data-operations/idb-persistence';
import { getFilePermission } from './files-reader';

const mimeAllowed = [
	'image',
	'video',
	'audio',
	'text'
];

export async function openFile(fileInfo: FileForMaterial) {
	const fileHandler = await getFile(fileInfo.filePath) as FileSystemFileHandle;

	await getFilePermission(fileHandler);

	const file = await fileHandler.getFile();
	const fileURL = URL.createObjectURL(file);

	if (mimeAllowed.some((mime) => file.type.startsWith(mime))) {
		window.open(fileURL, '_blank', 'noopener,noreferrer');
	}

	// TODO: deal with download or message to open.
}
