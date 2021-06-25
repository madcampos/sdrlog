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
	id: string | true,
	params?: Record<string, string>
}

type AllowedExtensions = Record<string, AllowedExtension>;

const itemExtensions: AllowedExtensions = {
	'.epub': {
		url: '/reader.html',
		id: true
	},
	'.md': {
		url: '/emulator.html',
		id: 'GENESIS',
		params: { system: 'segaMD' }
	},
	'.img': {
		url: '/emulator.html',
		id: 'SEGA-CD',
		params: { system: 'segaCD' }
	},
	'.smc': {
		url: '/emulator.html',
		id: 'SNES',
		params: { system: 'snes' }
	}
};

export async function openFile(fileInfo: FileForMaterial) {
	const fileHandler = await getFile(fileInfo.filePath) as FileSystemFileHandle;

	await getFilePermission(fileHandler);

	const file = await fileHandler.getFile();
	const fileURL = URL.createObjectURL(file);

	if (mimeAllowed.some((mime) => file.type.startsWith(mime))) {
		window.open(fileURL, '_blank', 'noopener,noreferrer');
	} else if (Object.keys(itemExtensions).includes(fileInfo.fileExtension)) {
		const infoForExtension = itemExtensions[fileInfo.fileExtension];
		const isSameItemId = fileInfo.itemId === infoForExtension.id;
		const isExtensionAllowed = infoForExtension.id === true;

		if (isExtensionAllowed || isSameItemId) {
			const url = new URL(infoForExtension.url, window.location.origin);

			url.searchParams.set('file', fileInfo.filePath);
			Object.entries(infoForExtension.params ?? {}).forEach(([name, value]) => {
				url.searchParams.set(name, value);
			});

			window.open(url.toString(), '_blank', 'noopener,noreferrer');
		}
	} else {
		// eslint-disable-next-line no-alert
		alert(`Unable to open file "${file.name}"`);
	}
}
