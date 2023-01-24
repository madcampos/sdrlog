import type { SDRLogData } from '../../data/data';
import { I18n } from '../intl/translations';
import { SdrProgressOverlay } from '../../components/SdrProgressOverlay';
import { getMaterials, saveFile, saveMaterials } from './idb-persistence';

import dataUrl from '../../data/data.json?url';

async function fetchData() {
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
	const currentData = await getMaterials();
	const onlineData = await fetchData();

	await saveMaterials(currentData.map((material) => [material.sku[0], material]));
	await saveMaterials(onlineData.map((material) => [material.sku[0], material]));

	return [...currentData, ...onlineData];
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

		await saveFile('data.json', fileHandle);

		const file = await fileHandle.getFile();

		const parsedFile = JSON.parse(await file.text()) as SDRLogData;

		await saveMaterials(parsedFile.items.map((material) => [material.sku[0], material]));
	} catch (err) {
		console.error('Failed to open data file.', err);
	}

	progressOverlay.remove();
}
