import type { Material } from '../../data/data';

import { SdrProgressOverlay } from '../../components/SdrProgressOverlay';
import { getAllIDBValues } from './idb-persistence';

function formatDataToExport(data: Material) {
	const formattedData: Material = {
		sku: data.sku,
		name: data.name,
		category: data.category,
		type: data.type,
		originalLanguage: data.originalLanguage,
		...(Object.keys(data.names ?? {}).length > 0 ? { names: data.names } : {}),
		description: data.description,
		...(Object.keys(data.links ?? {}).length > 0 ? { links: data.links } : {}),
		edition: data.edition,
		publisher: data.publisher,
		releaseDate: data.releaseDate,
		gameDate: data.gameDate,
		status: data.status
	};

	if (data.notes) {
		formattedData.notes = data.notes;
	}

	return formattedData;
}

export async function exportDataFile() {
	const progressOverlay = SdrProgressOverlay.createOverlay({ title: 'Export Data' });

	try {
		const items = await getAllIDBValues('items');

		if (items.length > 0) {
			const fileHandler = await window.showSaveFilePicker({
				id: 'dataFile',
				startIn: 'downloads',
				suggestedName: 'data.json',
				excludeAcceptAllOption: true,
				types: [{ description: 'JSON Files', accept: { 'text/json': ['.json'] } }]
			});
			const file = await fileHandler.createWritable();

			await file.truncate(0);
			await file.write(JSON.stringify({
				$schema: './data.schema.json',
				items
			}, null, '\t'));
			await file.close();
		}
	} catch (err) {
		console.error('Failed to export data file.', err);
	}

	progressOverlay.remove();
}

export async function exportDataItem(data: Material) {
	const fileHandler = await window.showSaveFilePicker({
		id: 'dataFile',
		startIn: 'downloads',
		suggestedName: `${data.sku[0]}.json`,
		excludeAcceptAllOption: true,
		types: [{ description: 'JSON Files', accept: { 'text/json': ['.json'] } }]
	});
	const file = await fileHandler.createWritable();

	const formattedData = formatDataToExport(data);

	await file.truncate(0);
	await file.write(JSON.stringify(formattedData, null, '\t'));
	await file.close();
}

export async function copyItemToClipboard(data: Material) {
	const formattedData = formatDataToExport(data);

	await navigator.clipboard.writeText(JSON.stringify(formattedData, null, '\t'));

	// eslint-disable-next-line no-alert
	alert('Copied to clipboard!');
}
