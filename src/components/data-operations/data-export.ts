import { getMaterials } from './idb-persistence';

async function exportData() {
	const items = await getMaterials();

	if (items.length === 0) {
		throw new Error('Data unavailable');
	}

	const fileHandler = await window.showSaveFilePicker({
		excludeAcceptAllOption: true,
		types: [{ description: 'JSON Files', accept: { 'text/json': ['.json'] } }]
	});
	const file = await fileHandler.createWritable();

	await file.truncate(0);
	await file.write(JSON.stringify({
		$schema: './data.schema.json',
		items
	}));
	await file.close();
}

export function createDataExportButton() {
	const button = document.createElement('button');

	button.innerText = '📤 Export Data';
	button.addEventListener('click', async () => exportData());

	return button;
}