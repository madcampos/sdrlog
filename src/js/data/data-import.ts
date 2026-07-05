import { saveHandle } from '@mad-c/file-system-helpers/access';
import { parse } from 'valibot';
import dataFileUrl from '../../../public/data/index.json?url';
import { SdrProgressOverlay } from '../../components/SdrProgressOverlay';
import { processCoverFile, THUMB_WIDTH } from '../covers/cover-extract';
import { getFileHash } from '../files/import';
import { type ISODate, type Material, MaterialSchema } from './data';
import { getAllIDBValues, getIDBItemByIndex, setIDBItem, setIDBItems } from './idb-persistence';

export interface SDRLogData {
	$schema: string;
	lastUpdated: ISODate;
	items: Material[];
}

export async function fetchDataFile() {
	try {
		const res = await fetch(dataFileUrl);

		if (res.ok) {
			const parsedFile: SDRLogData = await res.json();

			return parsedFile.items;
		}
	} catch (err) {
		console.error('Failed to load data.', err);
	}

	return [];
}

export async function fetchAndSaveItems() {
	const currentData = await getAllIDBValues('items');
	const onlineData = await fetchDataFile();
	const mergedData = new Map<string, Material>();

	for (const material of currentData) {
		const [sku = ''] = material.sku;
		// oxlint-disable-next-line typescript/consistent-type-assertions typescript/no-unsafe-type-assertion
		mergedData.set(sku, material as Material);
	}

	for (const material of onlineData) {
		const [sku = ''] = material.sku;
		const existingMaterial = mergedData.get(sku);

		mergedData.set(sku, {
			...existingMaterial,
			...material
		});
	}

	await setIDBItems('items', [...mergedData.entries()]);

	return [...mergedData.values()];
}

export async function requestDataFileFromUser() {
	const progressOverlay = SdrProgressOverlay.createOverlay({ title: 'Read data file' });

	try {
		const [fileHandle] = await window.showOpenFilePicker({
			id: 'dataFile',
			startIn: 'downloads',
			excludeAcceptAllOption: false,
			types: [{ description: 'JSON Files', accept: { 'text/json': ['.json'] } }]
		});

		const hash = await getFileHash(await (await fileHandle.getFile()).arrayBuffer());
		await setIDBItem('files', undefined, {
			filePath: '/data.json',
			fileName: 'data.json',
			fileExtension: '.json',
			mimeType: 'text/json',
			hash
		});
		await saveHandle(hash, fileHandle);

		const file = await fileHandle.getFile();
		const parsedFile: Partial<SDRLogData> = JSON.parse(await file.text());

		if (!parsedFile.items) {
			throw new Error('No items found in data file.');
		}

		const parsedItems = parsedFile.items.map((material) => parse(MaterialSchema, material));

		await setIDBItems('items', parsedItems.map((material) => [material.sku[0] ?? '', material]));
	} catch (err) {
		console.error('Failed to open data file.', err);
	}

	progressOverlay.remove();
}

export async function saveNewMaterialInfo(id: string, newMaterial: Material) {
	const { cover, files, ...materialToSave } = newMaterial;

	await setIDBItem('items', id, materialToSave);

	await Promise.all((files ?? []).map(async (file) => {
		const existingFile = await getIDBItemByIndex('files', 'hash', file.hash);

		if (!existingFile) {
			await setIDBItem('files', undefined, file);
		}
	}));

	if (cover) {
		try {
			const coverFile = await processCoverFile(cover, { name: `${id}.jpg` });
			const thumbFile = await processCoverFile(cover, { referenceWidth: THUMB_WIDTH, name: `${id}.jpg` });

			if (coverFile && thumbFile) {
				await setIDBItem('covers', id, coverFile);
				await setIDBItem('thumbs', id, thumbFile);
			}
		} catch (err) {
			console.error(`Failed to save material for id "${id}".`, err);
		}
	}
}
