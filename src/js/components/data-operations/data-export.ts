import type { NewMaterialProperties } from './create-material';

import { ProgressOverlay } from '../progress/progress';
import { getMaterials } from './idb-persistence';
import saveFile from '../../../../lib/file-system/file-save';

export async function exportDataFile() {
	const progressOverlay = ProgressOverlay.createOverlay({ title: 'Export data file' });

	try {
		const items = await getMaterials();

		if (items.length > 0) {
			if ('showSaveFilePicker' in window) {
				const fileHandler = await window.showSaveFilePicker({
					// @ts-expect-error
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
				}));
				await file.close();
			} else {
				const file = new File([JSON.stringify({ $schema: './data.schema.json', items }, null, '\t')], 'data.json', { type: 'application/json' });

				await saveFile(file, { fileName: 'data.json' });
			}
		}
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err);
	}

	progressOverlay.remove();
}

export async function exportDataItem(data: Omit<NewMaterialProperties, 'cover'>) {
	const filteredData = Object.entries(data).reduce((newData, [name, value]) => {
		const hasStatus = name === 'status' && value !== 'ok';
		const hasNotes = name === 'notes' && value !== '';
		const hasLinks = name === 'links' && value.length > 0;
		const hasNames = name === 'names' && value.length > 0;
		const hasGameDate = name === 'gameDate' && value !== '';
		const hasReleaseDate = name === 'releaseDate' && value.length > 0;
		const isFiles = name === 'files';

		if (hasStatus || hasNotes || hasLinks || hasNames || hasGameDate || hasReleaseDate || !isFiles) {
			newData[name] = value;
		}

		return newData;
	}, {});

	if ('showSaveFilePicker' in window) {
		const fileHandler = await window.showSaveFilePicker({
			// @ts-expect-error
			id: 'dataFile',
			startIn: 'downloads',
			suggestedName: `${data.sku[0]}.json`,
			excludeAcceptAllOption: true,
			types: [{ description: 'JSON Files', accept: { 'text/json': ['.json'] } }]
		});
		const file = await fileHandler.createWritable();

		await file.truncate(0);
		await file.write(JSON.stringify(filteredData));
		await file.close();
	} else {
		const file = new File([JSON.stringify(filteredData, null, '\t')], `${data.sku[0]}.json`, { type: 'application/json' });

		await saveFile(file, { fileName: `${data.sku[0]}.json` });
	}
}
