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
