import type { FileForMaterial } from '../../data/data';

import { Router } from '../../router/router';
import { getIDBItemByIndex } from '../data/idb-persistence';
import { getFilePermission } from './file-import';

const mimeAllowed = [
	'image',
	'video',
	'audio',
	'text',
	'application/pdf'
];

const urlsForExtension: Record<string, string> = {
	'.epub': '/epub',
	'.cbz': '/cbz',
	'.smd': '/emulator',
	'.gen': '/emulator',
	'.img': '/emulator',
	'.bin': '/emulator',
	'.smc': '/emulator',
	'.sfc': '/emulator'
};

export async function openFile(fileInfo: FileForMaterial) {
	const urlForExtension = urlsForExtension[fileInfo.fileExtension ?? ''];

	if (urlForExtension) {
		return Router.navigate(`${urlForExtension}/${fileInfo.itemId}`);
	}

	if (fileInfo.handler.kind !== 'file') {
		// eslint-disable-next-line no-alert
		alert('File not found.');

		return;
	}

	await getFilePermission(fileInfo.handler);

	const file = await fileInfo.handler.getFile();

	if (!mimeAllowed.some((mime) => file.type.startsWith(mime))) {
		// eslint-disable-next-line no-alert
		alert(`File type for "${file.name}" not supported.\nTry opening it on your file explorer.`);

		return;
	}

	const fileURL = URL.createObjectURL(file);

	return window.open(fileURL, '_blank', 'noopener,noreferrer');
}

export async function loadFile(id: string) {
	const { handler } = await getIDBItemByIndex('files', 'itemId', id) ?? {};

	if (!handler || handler.kind !== 'file') {
		throw new Error('File does not exist.');
	}

	await getFilePermission(handler);

	return handler.getFile();
}
