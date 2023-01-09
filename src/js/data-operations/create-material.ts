import type { FileForMaterial, Material, MaterialStatus } from '../../../public/data/data';
import { processCoverFile, THUMB_WIDTH } from '../covers/cover-extractor';
import { Logger } from '../util/logger';

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

export type NewMaterialProperties = Required<Omit<Material, 'edition' | 'names' | 'status'>> & {
	status: 'ok' | MaterialStatus,
	edition: string,
	names: [string, string][],
	files: FileForMaterial[],
	cover?: File
};

export async function saveNewMaterialInfo(id: string, {
	name,
	sku,
	edition,
	gameDate,
	category,
	type,
	originalLanguage,
	releaseDate,
	publisher,
	status,
	names,
	notes,
	description,
	links,
	files,
	cover
}: NewMaterialProperties) {
	const materialToSave: Material = {
		name,
		sku,
		edition: Number.parseInt(edition),
		gameDate,
		category,
		type,
		originalLanguage,
		releaseDate,
		publisher,
		description
	};

	if (links.length > 0) {
		materialToSave.links = links;
	}

	if (notes && notes !== '') {
		materialToSave.notes = notes;
	}

	if (status !== 'ok') {
		materialToSave.status = status as Material['status'];
	}

	const namesValues = Object.fromEntries(names);

	if (Object.keys(namesValues).length > 0) {
		materialToSave.names = namesValues;
	}

	await saveMaterial(id, materialToSave);

	for await (const file of files) {
		await setFileForMaterial(file);
	}

	if (cover) {
		try {
			const coverFile = await processCoverFile(cover);

			await saveCover(id, coverFile);

			const thumbFile = await processCoverFile(cover, { referenceWidth: THUMB_WIDTH });

			await saveThumb(id, thumbFile);
		} catch (err) {
			Logger.error(`Failed to save material for id "${id}".`, err);
		}
	}
}
