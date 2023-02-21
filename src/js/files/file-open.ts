import type { FileForMaterial } from '../../data/data';

import { I18n } from '../intl/translations';
import { getFilePermission } from './file-import';
import { getIDBItemByIndex } from '../data/idb-persistence';
import { Router } from '../../router/router';

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

	// TODO: create file viewer for other file types

	if (fileInfo.handler.kind !== 'file') {
		// eslint-disable-next-line no-alert
		alert(`${I18n.t`File not found.`}`);

		return;
	}

	await getFilePermission(fileInfo.handler);

	const file = await fileInfo.handler.getFile();

	if (!mimeAllowed.some((mime) => file.type.startsWith(mime))) {
		// eslint-disable-next-line no-alert
		alert(`${I18n.t`File type for`} "${file.name}" ${I18n.t`not supported.\nTry opening it on your file explorer.`}`);
	}

	const fileURL = URL.createObjectURL(file);

	return window.open(fileURL, '_blank', 'noopener,noreferrer');
}

export async function loadFile(id: string) {
	const { handler } = await getIDBItemByIndex('files', 'itemId', id) ?? {};

	if (!handler || handler.kind !== 'file') {
		throw new Error(I18n.t`File does not exist.`);
	}

	await getFilePermission(handler);

	return handler.getFile();
}
