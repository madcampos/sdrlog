import type { Material } from '../../../../data/data';
import { fetchCover } from '../covers/fetch-covers';
import { getFilesForMaterial } from '../data-operations/idb-persistence';
import type { EditBox } from '../edit-box/edit-box';
import type { EditList } from '../edit-box/edit-list';
import type { EditSelect } from '../edit-box/edit-select';
import type { EditText } from '../edit-box/edit-text';

import { formatFile, formatLink, formatPublisher, formatReleaseDate, formatSku, formatTranslatedName } from './details-template';

interface DetailElementsReferences {
	name: EditBox,
	sku: EditList,
	edition: EditBox,
	gameDate: EditBox,
	category: EditSelect,
	type: EditSelect,
	language: EditSelect,
	releaseDate: EditList,
	publisher: EditList,
	status: EditSelect,
	names: EditList,
	files: EditList,
	links: EditList,
	cover: HTMLImageElement,
	notes: EditText,
	description: EditText
}

export async function setMaterialDetails(material: Material, {
	name,
	sku,
	edition,
	gameDate,
	category,
	type,
	language,
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
	gameDate.value = material.gameDate ?? '';
	category.value = material.category;
	type.value = material.type;
	language.value = material.originalLanguage;

	material.releaseDate?.forEach((releaseDateValue) => {
		releaseDate.insertAdjacentHTML('beforeend', formatReleaseDate(releaseDateValue));
	});

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

	notes.value = material.notes ?? '';
	description.value = material.description;

	const coverFile = await fetchCover(material.sku[0]);

	if (coverFile) {
		cover.src = URL.createObjectURL(coverFile);
	}

	const fileList = await getFilesForMaterial(material.sku[0]) ?? [];

	if (fileList.length > 0) {
		files.hidden = false;
	}

	for (const file of fileList) {
		files.insertAdjacentHTML('beforeend', formatFile(file));
	}
}
