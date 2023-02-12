import type { Material, NewMaterial, SDRLogData } from '../../data/data';
import { I18n } from '../intl/translations';
import { SdrProgressOverlay } from '../../components/SdrProgressOverlay';
import { getAllIDBValues, setIDBItem, setIDBItems } from './idb-persistence';
import { getFileHash } from '../files/file-import';

import dataUrl from '../../data/data.json?url';
import { processCoverFile, THUMB_WIDTH } from '../covers/cover-extract';

export async function fetchData() {
	try {
		const res = await fetch(dataUrl);

		if (res.ok) {
			const parsedFile = await res.json() as SDRLogData;

			return parsedFile.items;
		}
	} catch (err) {
		console.error('Failed to load data.', err);
	}

	return [];
}

export async function fetchItems() {
	const currentData = await getAllIDBValues('items');
	const onlineData = await fetchData();
	const mergedData = new Map<string, Material>();

	for (const material of currentData) {
		mergedData.set(material.sku[0], material);
	}

	for (const material of onlineData) {
		mergedData.set(material.sku[0], material);
	}

	await setIDBItems('items', [...mergedData.entries()]);

	return [...mergedData.values()];
}

export async function requestDataFileFromUser() {
	const progressOverlay = SdrProgressOverlay.createOverlay({ title: I18n.t`Read data file` });

	try {
		const [fileHandle] = await window.showOpenFilePicker({
			id: 'dataFile',
			startIn: 'downloads',
			excludeAcceptAllOption: false,
			types: [{ description: I18n.t`JSON Files`, accept: { 'text/json': ['.json'] } }]
		});

		await setIDBItem('files', undefined, {
			filePath: '/data.json',
			fileName: 'data.json',
			fileExtension: '.json',
			mimeType: 'text/json',
			handler: fileHandle,
			hash: await getFileHash(await (await fileHandle.getFile()).arrayBuffer())
		});

		const file = await fileHandle.getFile();

		const parsedFile = JSON.parse(await file.text()) as SDRLogData;

		await setIDBItems('items', parsedFile.items.map((material) => [material.sku[0], material]));
	} catch (err) {
		console.error('Failed to open data file.', err);
	}

	progressOverlay.remove();
}

export async function saveNewMaterialInfo(id: string, newMaterial: NewMaterial) {
	const { cover, files, ...materialToSave } = newMaterial;

	await setIDBItem('items', id, materialToSave);

	// TODO: Remove old files

	for await (const file of files ?? []) {
		await setIDBItem('files', undefined, file);
	}

	if (cover) {
		try {
			const coverFile = await processCoverFile(cover);

			await setIDBItem('covers', id, coverFile);

			const thumbFile = await processCoverFile(cover, { referenceWidth: THUMB_WIDTH });

			await setIDBItem('thumbs', id, thumbFile);
		} catch (err) {
			console.error(`Failed to save material for id "${id}".`, err);
		}
	}
}
