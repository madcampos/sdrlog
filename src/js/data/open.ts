import { requestHandlePermissions } from '@mad-c/file-system-helpers/permissions';
import type { MaterialSku, SavedFileMetadata } from './schema';

import { getHandle } from '@mad-c/file-system-helpers/access';
import { getIDBItemByIndex } from './idb-helpers';

const ALLOWED_MIMES = [
	'image',
	'video',
	'audio',
	'text',
	'application/pdf'
];

const URLS_FOR_EXTENSIONS: Record<string, string> = {
	'.epub': '/epub',
	'.cbz': '/cbz',
	'.smd': '/emulator',
	'.gen': '/emulator',
	'.img': '/emulator',
	'.bin': '/emulator',
	'.smc': '/emulator',
	'.sfc': '/emulator'
};

const DEFAULT_ICON = '📄';

const MIME_ICONS = new Map([
	['application/pdf', '📓'],
	['image', '🖼️'],
	['audio', '🔊'],
	['text', '📝'],
	['video', '🎞️'],
	['application/zip', '📦'],
	['application/epub+zip', '📚']
]);

const EXTENSION_ICONS = new Map([
	['.pdf', '📓'],
	['.epub', '📚'],
	['.bin', '💾'],
	['.img', '💽'],
	['.iso', '💽'],
	['.smc', '🕹️'],
	['.smd', '🕹️'],
	['.cbz', '💭'],
	['.apk', '🤖'],
	['.xapk', '🤖'],
	['.doc', '🖋️'],
	['.docx', '🖋️'],
	['.xls', '📊'],
	['.xlsx', '📊'],
	['.ppt', '📽️'],
	['.pptx', '📽️']
]);

export function getIconForFile(mimeOrExtension: string) {
	const mimeIcon = MIME_ICONS.get(mimeOrExtension);
	const extensionIcon = EXTENSION_ICONS.get(mimeOrExtension);

	return mimeIcon ?? extensionIcon ?? DEFAULT_ICON;
}

export async function openFile(fileInfo: SavedFileMetadata) {
	const urlForExtension = URLS_FOR_EXTENSIONS[fileInfo.extension];

	if (urlForExtension) {
		if (!fileInfo.itemId) {
			// eslint-disable-next-line no-alert
			alert('File not found.');

			return;
		}

		window.navigation.navigate(`${urlForExtension}/${fileInfo.itemId}`);
	}

	const { handle } = await getHandle(fileInfo.hash) ?? {};

	if (!(handle instanceof FileSystemFileHandle)) {
		// eslint-disable-next-line no-alert
		alert('File not found.');

		return;
	}

	await requestHandlePermissions(handle);

	const file = await handle.getFile();

	if (!ALLOWED_MIMES.some((mime) => file.type.startsWith(mime))) {
		// eslint-disable-next-line no-alert
		alert(`File type for "${file.name}" not supported.\nTry opening it on your file explorer.`);

		return;
	}

	const fileURL = URL.createObjectURL(file);

	return window.open(fileURL, '_blank', 'noopener,noreferrer');
}

export async function loadFile(id: MaterialSku) {
	const { hash } = await getIDBItemByIndex('files', 'itemId', id) ?? {};

	if (!hash) {
		throw new Error('File does not exist');
	}

	const { handle } = await getHandle(hash) ?? {};

	if (!(handle instanceof FileSystemFileHandle)) {
		throw new Error('File does not exist.');
	}

	await requestHandlePermissions(handle, 'read');

	return handle.getFile();
}
