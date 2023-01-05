import type { SDRLogData } from '../../../public/data/data';
import { I18n } from '../intl/translations';
import { Logger } from '../util/logger';
import { SdrProgressOverlay } from '../../components/progress/progress';
import { getFile, getMaterials, saveFile, saveMaterials } from './idb-persistence';

async function fetchData() {
	try {
		const res = await fetch(`${import.meta.env.APP_PUBLIC_URL}data/data.json`);

		if (res.ok) {
			const parsedFile = await res.json() as SDRLogData;

			return parsedFile.items;
		}
	} catch (err) {
		Logger.error('Failed to load data.', err);
	}

	return [];
}

async function readDataFromFile() {
	try {
		const savedHandler = await getFile('data.json') as FileSystemFileHandle | undefined;

		let file: FileSystemFileHandle | undefined;

		if (savedHandler && await savedHandler.queryPermission({ mode: 'read' }) === 'granted') {
			file = savedHandler;
		} else if (savedHandler && await savedHandler.requestPermission({ mode: 'read' }) === 'granted') {
			file = savedHandler;
		}

		const content = await file?.getFile();
		const parsedFile = JSON.parse(await content?.text() ?? '{ "items": [] }') as SDRLogData;

		return parsedFile.items;
	} catch (err) {
		Logger.error('Failed to read data from file.', err);
	}

	return [];
}

export async function fetchItems() {
	let currentData = await getMaterials();
	const onlineData = await fetchData();

	if (currentData.length < onlineData.length) {
		currentData = onlineData;
	}

	if (currentData.length === 0) {
		currentData = await readDataFromFile();
	}

	if (currentData.length > 0) {
		await saveMaterials(currentData.map((material) => [material.sku[0], material]));
	}

	return currentData;
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
		Logger.error('Failed to open data file.', err);
	}

	progressOverlay.remove();
}
