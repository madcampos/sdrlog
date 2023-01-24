import type { NewMaterial } from '../../data/data';
import { processCoverFile, THUMB_WIDTH } from '../covers/cover-extractor';

import { saveCover, saveMaterial, saveThumb, setFileForMaterial } from './idb-persistence';

const DEFAULT_ICON = '📄';

const mimeIcons = new Map([
	['application/pdf', '📓'],
	['image', '🖼️'],
	['audio', '🔊'],
	['text', '📝'],
	['video', '🎞️'],
	['application/zip', '📦'],
	['application/epub+zip', '📚']
]);

const extensionIcons = new Map([
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

export function getIconForFile(mime: string, extension: string) {
	const mimes = [...mimeIcons.keys()];
	const mimeKey = mimes.find((iconMime) => mime.includes(iconMime)) ?? '';

	return mimeIcons.get(mimeKey) ?? extensionIcons.get(extension) ?? DEFAULT_ICON;
}

export async function saveNewMaterialInfo(id: string, newMaterial: NewMaterial) {
	const { cover, files, ...materialToSave } = newMaterial;

	await saveMaterial(id, materialToSave);

	for await (const file of files ?? []) {
		await setFileForMaterial(file);
	}

	if (cover) {
		try {
			const coverFile = await processCoverFile(cover);

			await saveCover(id, coverFile);

			const thumbFile = await processCoverFile(cover, { referenceWidth: THUMB_WIDTH });

			await saveThumb(id, thumbFile);
		} catch (err) {
			console.error(`Failed to save material for id "${id}".`, err);
		}
	}
}
