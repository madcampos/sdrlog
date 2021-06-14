import type { FileForMaterial, IsoCode, Material, MaterialLink } from '../../../../data/data';
import { processCoverFile, THUMB_WIDTH } from '../covers/cover-extractor';

import { saveCover, saveMaterial, saveThumb, setFileForMaterial } from './idb-persistence';

interface NewMaterialProperties {
	name: string,
	sku: string[],
	edition: string,
	gameDate: string,
	category: string,
	type: string,
	originalLanguage: string,
	releaseDate: string[],
	publisher: string[],
	status: string,
	names: string[],
	notes: string,
	description: string,
	links: string[],
	files: string[],
	cover?: File
}

export async function createNewMaterial(id: string, {
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
	let statusValue: Material['status'] | undefined;
	const namesValues = {};

	if (status !== 'ok') {
		statusValue = status as Material['status'];
	}

	names.forEach((item) => {
		const { lang, name } = JSON.parse(decodeURI(item)) as { lang: IsoCode, name: string };

		namesValues[lang] = name;
	});

	await saveMaterial(id, {
		name,
		sku,
		edition: Number.parseInt(edition),
		gameDate,
		category: category as Material['category'],
		type: type as Material['type'],
		originalLanguage: originalLanguage as Material['originalLanguage'],
		releaseDate,
		publisher,
		status: statusValue,
		names: namesValues,
		notes,
		description,
		links: links.map((link) => JSON.parse(decodeURI(link)) as MaterialLink)
	});

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
			// eslint-disable-next-line no-console
			console.error(id, err);
		}
	}
}
