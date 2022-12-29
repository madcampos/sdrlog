import type { IsoCode, Material } from '../../../data/data';
import type { NewMaterialProperties } from './create-material';

import { ProgressOverlay } from '../progress/progress';
import { getMaterials } from './idb-persistence';
import saveFile from '../../../lib/file-system/file-save';
import { I18n } from '../intl/translations';
import { Logger } from '../logger/logger';

function formatDataItem(data: Omit<NewMaterialProperties, 'cover' | 'files'>) {
	const filteredData: Material = {
		sku: data.sku,
		name: data.name,
		category: data.category,
		type: data.type,
		originalLanguage: data.originalLanguage,
		description: data.description,
		edition: Number.parseInt(data.edition),
		publisher: data.publisher,
		releaseDate: data.releaseDate,
		gameDate: data.gameDate
	};

	if (data.status !== 'ok') {
		filteredData.status = data.status;
	}

	if (data.names.length > 0) {
		filteredData.names = data.names.reduce((names, nameString) => {
			const { lang, name } = JSON.parse(nameString) as { lang: IsoCode, name: string };

			names[lang] = name;

			return names;
		}, {});
	}

	if (data.notes) {
		filteredData.notes = data.notes;
	}

	return filteredData;
}

export async function exportDataFile() {
	const progressOverlay = ProgressOverlay.createOverlay({ title: I18n.t`Export Data` });

	try {
		const items = (await getMaterials()).map((material) => formatDataItem(material as unknown as NewMaterialProperties));

		if (items.length > 0) {
			if ('showSaveFilePicker' in window) {
				const fileHandler = await window.showSaveFilePicker({
					// @ts-expect-error
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
			} else {
				const file = new File([JSON.stringify({ $schema: './data.schema.json', items }, null, '\t')], 'data.json', { type: 'application/json' });

				await saveFile(file, { fileName: 'data.json' });
			}
		}
	} catch (err) {
		Logger.error('Failed to export data file.', err);
	}

	progressOverlay.remove();
}

export async function exportDataItem(data: Omit<NewMaterialProperties, 'cover'>) {
	const filteredData = formatDataItem(data);

	if ('showSaveFilePicker' in window) {
		const fileHandler = await window.showSaveFilePicker({
			// @ts-expect-error
			id: 'dataFile',
			startIn: 'downloads',
			suggestedName: `${data.sku[0]}.json`,
			excludeAcceptAllOption: true,
			types: [{ description: I18n.t`JSON Files`, accept: { 'text/json': ['.json'] } }]
		});
		const file = await fileHandler.createWritable();

		await file.truncate(0);
		await file.write(JSON.stringify(filteredData, null, '\t'));
		await file.close();
	} else {
		const file = new File([JSON.stringify(filteredData, null, '\t')], `${data.sku[0]}.json`, { type: 'application/json' });

		await saveFile(file, { fileName: `${data.sku[0]}.json` });
	}
}
