/* eslint-disable no-console*/
import type { SearchBox } from './components/search-box/search-box';

import { I18n } from './components/intl/translations';

(document.querySelector('#load-overlay progress') as HTMLProgressElement).max = 11;

function updateLoadStatus(status: string) {
	const text = document.querySelector('#load-overlay h1') as HTMLHeadingElement;
	const progress = document.querySelector('#load-overlay progress') as HTMLProgressElement;

	text.innerText = status;
	progress.value += 1;
}

updateLoadStatus('Loading components.');
import './components/components';

updateLoadStatus('Adding menu bar.');
import './components/menu-bar/main-menu-items';

updateLoadStatus('Importing helper functions.');
import { fetchItems } from './components/data-operations/data-import';
import { getMaterialsBasicInfo } from './components/data-operations/idb-persistence';
import { updateFiltersFromURL } from './components/search-box/update-filter';
import { updateInfoBoxFromURL } from './components/info-box/info-box';
import { checkForMatchingId, updateItemModalFromURL } from './components/item-info/item-details-url';
import { createComparer } from './components/intl/formatting';

document.addEventListener('DOMContentLoaded', async () => {
	if ('serviceWorker' in navigator) {
		updateLoadStatus(I18n.t`Registering Service Worker.`);

		try {
			await navigator.serviceWorker.register(`${import.meta.env.PUBLIC_URL}sw.js`);
		} catch (err) {
			console.error(err);
		}
	}

	updateLoadStatus(I18n.t`Fetching items database.`);

	await fetchItems();

	updateLoadStatus(I18n.t`Sorting materials.`);

	const sorter = createComparer();
	const materials = (await getMaterialsBasicInfo()).sort(({ name: nameA }, { name: nameB }) => sorter(nameA, nameB));
	let matchedId: string | null = null;
	let matchedTitle = '';

	updateLoadStatus(I18n.t`Adding materials to the display.`);

	for (const material of materials) {
		const itemCard = document.createElement('item-card');

		itemCard.id = material.id;
		itemCard.title = material.name;
		itemCard.dataset.category = material.category;
		itemCard.dataset.sku = material.sku.join(' ');
		itemCard.dataset.type = material.type;
		itemCard.dataset.edition = material.edition.toString();
		itemCard.dataset.status = material.status ?? '';
		document.querySelector('main')?.appendChild(itemCard);

		if (checkForMatchingId(material.id)) {
			matchedId = material.id;
			matchedTitle = material.name;
		}
	}

	if (matchedId) {
		updateLoadStatus(I18n.t`Setting modal from URL.`);

		updateItemModalFromURL(matchedId, matchedTitle);
	}

	updateLoadStatus(I18n.t`Setting information from URL.`);

	updateInfoBoxFromURL();
	updateFiltersFromURL();
	document.querySelector<SearchBox>('search-box')?.updateSuggestions();

	updateLoadStatus(I18n.t`Done!`);
	document.querySelector('#load-overlay')?.remove();
});
