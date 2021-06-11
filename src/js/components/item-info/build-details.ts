import type { Material } from '../../../../data/data';
import { fetchCover } from '../covers/fetch-covers';
import type { EditBox } from '../edit-box/edit-box';
import type { EditList } from '../edit-box/edit-list';
import type { EditSelect } from '../edit-box/edit-select';
import type { EditText } from '../edit-box/edit-text';

import { languages, publishers } from './details-template';

const dateFormater = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC', year: 'numeric' });

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
		sku.insertAdjacentHTML('beforeend', `
			<edit-list-item>${skuValue}</edit-list-item>
		`);
	});

	edition.value = material.edition.toString();
	gameDate.value = material.gameDate ?? '';
	category.value = material.category;
	type.value = material.type;
	language.value = material.originalLanguage;

	material.releaseDate?.forEach((releaseDateValue) => {
		releaseDate.insertAdjacentHTML('beforeend', `
			<edit-list-item>
				${dateFormater.format(new Date(releaseDateValue))}
			</edit-list-item>
		`);
	});

	material.publisher.forEach((publisherValue) => {
		publisher.insertAdjacentHTML('beforeend', `
			<edit-list-item>
				<abbr title="${publisherValue}">
					<img
						role="presentation"
						src="/img/publishers/${publishers.get(publisherValue) ?? 'fallback'}.png"
					/>
				</abbr>
			</edit-list-item>
		`);
	});

	if (material.status) {
		status.hidden = false;
	}

	status.value = material.status ?? 'ok';

	Object.entries(material.names ?? {}).forEach(([lang, name]) => {
		names.insertAdjacentHTML('beforeend', `
			<edit-list-item>${languages.get(lang) ?? ''} → ${name}</edit-list-item>
		`);
	});

	names.loaded = true;

	// TODO: get files for material and link them

	material.links?.forEach((link) => {
		links.insertAdjacentHTML('beforeend', `
			<edit-list-item>
				<a
					href="${link.url}"
					target="_blank"
					rel="noopener"
				>${link.title}</a>
			</edit-list-item>
		`);
	});

	links.loaded = true;

	notes.value = material.notes ?? '';
	description.value = material.description;

	const coverFile = await fetchCover(material.sku[0]);

	if (coverFile) {
		cover.src = URL.createObjectURL(cover);
	}
}
