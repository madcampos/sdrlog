import type { Material } from '../../data/data';

import { SdrProgressOverlay } from '../../components/SdrProgressOverlay';
import { getAllIDBValues } from './idb-persistence';
import { I18n } from '../intl/translations';

export async function exportDataFile() {
	const progressOverlay = SdrProgressOverlay.createOverlay({ title: I18n.t`Export Data` });

	try {
		const items = await getAllIDBValues('items');

		if (items.length > 0) {
			const fileHandler = await window.showSaveFilePicker({
				id: 'dataFile',
				startIn: 'downloads',
				suggestedName: 'data.json',
				excludeAcceptAllOption: true,
				types: [{ description: I18n.t`JSON Files`, accept: { 'text/json': ['.json'] } }]
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
		types: [{ description: I18n.t`JSON Files`, accept: { 'text/json': ['.json'] } }]
	});
	const file = await fileHandler.createWritable();

	await file.truncate(0);
	await file.write(JSON.stringify(data, null, '\t'));
	await file.close();
}
