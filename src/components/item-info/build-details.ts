import type { Material } from '../../../public/data/data';
import { FALLBACK_COVER, fetchCover } from '../../js/covers/fetch-covers';
import { getFilesForMaterial } from '../../js/data-operations/idb-persistence';
import type { SdrInput } from '../edit-box/edit-box';
import type { SdrEditList } from '../edit-list/edit-list';
import type { SdrSelect } from '../edit-select/edit-select';
import type { SdrTextArea } from '../edit-textarea/edit-textarea';
import { formatMonth } from '../../js/intl/formatting';

import { formatFile, formatLink, formatPublisher, formatReleaseDate, formatSku, formatTranslatedName } from './details-template';

interface DetailElementsReferences {
	name: SdrInput,
	sku: SdrEditList,
	edition: SdrInput,
	gameDate: SdrInput,
	category: SdrSelect,
	type: SdrSelect,
	originalLanguage: SdrSelect,
	releaseDate: SdrEditList,
	publisher: SdrEditList,
	status: SdrSelect,
	names: SdrEditList,
	files: SdrEditList,
	links: SdrEditList,
	cover: HTMLImageElement,
	notes: SdrTextArea,
	description: SdrTextArea
}

export function setMaterialDetails(material: Material, {
	name,
	sku,
	edition,
	gameDate,
	category,
	type,
	originalLanguage,
	releaseDate,
	publisher,
	status,
	names,
	links,
	files,
	cover,
	notes,
	description
}: DetailElementsReferences) {
	name.value = material.name;

	material.sku.forEach((skuValue) => {
		sku.insertAdjacentHTML('beforeend', formatSku(skuValue));
	});

	edition.value = material.edition.toString();
	gameDate.value = formatMonth(material.gameDate ?? '');
	category.value = material.category;

	type.value = material.type;

	originalLanguage.value = material.originalLanguage;

	material.releaseDate?.forEach((releaseDateValue) => {
		releaseDate.insertAdjacentHTML('beforeend', formatReleaseDate(releaseDateValue));
	});

	releaseDate.loaded = true;

	material.publisher.forEach((publisherValue) => {
		publisher.insertAdjacentHTML('beforeend', formatPublisher(publisherValue));
	});

	if (material.status) {
		status.hidden = false;
	}

	status.value = material.status ?? 'ok';

	Object.entries(material.names ?? {}).forEach(([lang, name]) => {
		names.insertAdjacentHTML('beforeend', formatTranslatedName(lang, name));
	});

	names.loaded = true;

	material.links?.forEach((link) => {
		links.insertAdjacentHTML('beforeend', formatLink(link));
	});

	links.loaded = true;

	if (material.notes) {
		notes.value = material.notes;
		notes.hidden = false;
	}

	notes.loaded = true;

	description.value = material.description;

	void fetchCover(material.sku[0]).then((coverFile) => {
		if (coverFile) {
			cover.src = URL.createObjectURL(coverFile);
		} else {
			cover.src = FALLBACK_COVER;
		}
	});

	void getFilesForMaterial(material.sku[0]).then((fileList) => {
		if (fileList) {
			for (const file of fileList) {
				files.insertAdjacentHTML('beforeend', formatFile(file));
			}

			if (fileList.length > 0) {
				files.hidden = false;
			}
		}

		files.loaded = true;
	});
}
