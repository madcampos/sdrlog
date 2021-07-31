import type { SDRLogData } from '../../../../data/data';
import fileOpen from '../../../../lib/file-system/file-open';
import { I18n } from '../intl/translations';
import { ProgressOverlay } from '../progress/progress';
import { getFile, getMaterials, saveFile, saveMaterials } from './idb-persistence';

async function fetchData() {
	try {
		const res = await fetch(`${import.meta.env.PUBLIC_URL}data/data.json`);

		if (res.ok) {
			const parsedFile = await res.json() as SDRLogData;

			return parsedFile.items;
		}
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err);
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
		// eslint-disable-next-line no-console
		console.error(err);
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
	const progressOverlay = ProgressOverlay.createOverlay({ title: I18n.t`Read data file` });
	let file;

	try {
		if ('showOpenFilePicker' in window) {
			const [fileHandle] = await window.showOpenFilePicker({
				// @ts-expect-error
				id: 'dataFile',
				startIn: 'downloads',
				excludeAcceptAllOption: false,
				types: [{ description: I18n.t`JSON Files`, accept: { 'text/json': ['.json'] } }]
			});

			await saveFile('data.json', fileHandle);

			file = await fileHandle.getFile();
		} else {
			file = await fileOpen({ extensions: ['.json'] });
		}

		const parsedFile = JSON.parse(await file.text()) as SDRLogData;

		await saveMaterials(parsedFile.items.map((material) => [material.sku[0], material]));
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err);
	}

	progressOverlay.remove();
}
