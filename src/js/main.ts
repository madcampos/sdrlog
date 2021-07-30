/* eslint-disable no-console*/
import './components/components';
import './components/menu-bar/main-menu-items';
import { fetchItems } from './components/data-operations/data-import';
import { getMaterialsBasicInfo } from './components/data-operations/idb-persistence';
import { updateFiltersFromURL } from './components/search-box/update-filter';
import { updateInfoBoxFromURL } from './components/menu-bar/info-box-url';
import { checkForMatchingId, updateItemModalFromURL } from './components/item-info/item-details-url';
import { createComparer } from './components/intl/formatting';

document.addEventListener('DOMContentLoaded', async () => {
	if ('serviceWorker' in navigator) {
		try {
			await navigator.serviceWorker.register(`${import.meta.env.PUBLIC_URL}sw.js`);
		} catch (err) {
			console.error(err);
		}
	}

	await fetchItems();

	const sorter = createComparer();
	const materials = (await getMaterialsBasicInfo()).sort(({ name: nameA }, { name: nameB }) => sorter(nameA, nameB));
	let matchedId: string | null = null;
	let matchedTitle = '';

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
		updateItemModalFromURL(matchedId, matchedTitle);
	}

	updateInfoBoxFromURL();
	updateFiltersFromURL();

	document.querySelector('#load-overlay')?.remove();
});
