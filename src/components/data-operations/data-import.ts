import type { SDRLogData } from '../../../data/data';
import { getFile, getMaterials, saveFile, saveMaterials } from './idb-persistence';
import type { ModalDialog } from '../dialog/dialog';

async function fetchData() {
	try {
		const res = await fetch('/data/data.json');

		if (res.ok) {
			const parsedFile = JSON.parse(await res.text()) as SDRLogData;

			return parsedFile.items;
		}
	} catch (err: unknown) {
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
	} catch (err: unknown) {
		// eslint-disable-next-line no-console
		console.error(err);
	}

	return [];
}

export async function fetchItems() {
	let currentData = await getMaterials();

	if (currentData.length === 0) {
		currentData = await fetchData();
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
	const [file] = await window.showOpenFilePicker({
		excludeAcceptAllOption: false,
		types: [{ description: 'JSON Files', accept: { 'text/json': ['.json'] } }]
	});

	await saveFile('data.json', file);

	const content = await file.getFile();
	const parsedFile = JSON.parse(await content.text()) as SDRLogData;

	await saveMaterials(parsedFile.items.map((material) => [material.sku[0], material]));
}

export function showImportDialog() {
	const dialog = document.createElement('modal-dialog') as ModalDialog;

	dialog.innerHTML = `
		<h1 slot="title">⚠️ Data not found!</h1>
		<p>Data not found. Please click on the button below and select a file to import.</p>
		<button>Import</button>
	`;

	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	dialog.querySelector('button')?.addEventListener('click', async () => {
		dialog.innerHTML = '<progress></progress>';

		await requestDataFileFromUser();

		dialog.close();
	});

	document.body.appendChild(dialog);

	dialog.show();
}
