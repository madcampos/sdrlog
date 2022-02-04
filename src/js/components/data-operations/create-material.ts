import type { FileForMaterial, IsoCode, Material, MaterialLink, MaterialStatus } from '../../../../data/data';
import { processCoverFile, THUMB_WIDTH } from '../covers/cover-extractor';
import { Logger } from '../logger/logger';

import { saveCover, saveMaterial, saveThumb, setFileForMaterial } from './idb-persistence';

export type NewMaterialProperties = Required<Omit<Material, 'edition' | 'names' | 'status' | 'links'>> & {
	status: 'ok' | MaterialStatus,
	edition: string,
	names: string[],
	links: string[],
	files: string[],
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
		materialToSave.links = links.map((link) => JSON.parse(decodeURI(link)) as MaterialLink);
	}

	if (notes && notes !== '') {
		materialToSave.notes = notes;
	}

	if (status !== 'ok') {
		materialToSave.status = status as Material['status'];
	}

	const namesValues = {};

	names.forEach((item) => {
		const { lang, name } = JSON.parse(decodeURI(item)) as { lang: IsoCode, name: string };

		namesValues[lang] = name;
	});

	if (Object.keys(namesValues).length > 0) {
		materialToSave.names = namesValues;
	}

	await saveMaterial(id, materialToSave);

	for await (const file of files) {
		await setFileForMaterial(JSON.parse(decodeURI(file)) as FileForMaterial);
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
