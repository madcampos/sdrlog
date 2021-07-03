import type { FileForMaterial } from '../../../../data/data';

import { getFile } from '../data-operations/idb-persistence';
import { getFilePermission } from './files-reader';

const mimeAllowed = [
	'image',
	'video',
	'audio',
	'text',
	'application/pdf'
];

interface AllowedExtension {
	url: string,
	id: string | true
}

type AllowedExtensions = Record<string, AllowedExtension>;

const itemExtensions: AllowedExtensions = {
	'.epub': { url: '/epub.html', id: true },
	'.cbz': { url: '/cbz.html', id: true },
	'.smd': { url: '/emulator.html', id: 'GENESIS' },
	'.gen': { url: '/emulator.html', id: 'GENESIS' },
	'.img': { url: '/emulator.html', id: 'SEGA-CD' },
	'.bin': { url: '/emulator.html', id: 'SEGA-CD' },
	'.smc': { url: '/emulator.html', id: 'SNES' },
	'.sfc': { url: '/emulator.html', id: 'SNES' }
};

export async function openFile(fileInfo: FileForMaterial) {
	if (Object.keys(itemExtensions).includes(fileInfo.fileExtension)) {
		const infoForExtension = itemExtensions[fileInfo.fileExtension];
		const isSameItemId = fileInfo.itemId === infoForExtension.id;
		const isExtensionAllowed = infoForExtension.id === true;

		if (isExtensionAllowed || isSameItemId) {
			const url = new URL(infoForExtension.url, window.location.origin);

			url.searchParams.set('file', fileInfo.filePath);

			return window.open(url.toString(), '_blank', 'noopener,noreferrer');
		}
	}

	const fileHandler = await getFile(fileInfo.filePath) as FileSystemFileHandle;

	await getFilePermission(fileHandler);

	const file = await fileHandler.getFile();

	if (!mimeAllowed.some((mime) => file.type.startsWith(mime))) {
		// eslint-disable-next-line no-alert
		alert(`File type for "${file.name}" not supported.\nTry opening it on your file explorer.`);
	}

	const fileURL = URL.createObjectURL(file);

	return window.open(fileURL, '_blank', 'noopener,noreferrer');
}
