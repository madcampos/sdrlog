/* eslint-disable no-console*/
import './components/components';
import './components/menu-bar/main-menu-items';
import { fetchItems } from './components/data-operations/data-import';
import { getMaterialsBasicInfo } from './components/data-operations/idb-persistence';
import { updateFiltersFromURL } from './components/search-box/update-filter';

document.addEventListener('DOMContentLoaded', async () => {
	if ('serviceWorker' in navigator) {
		try {
			await navigator.serviceWorker.register(`${import.meta.env.SNOWPACK_PUBLIC_URL}sw.js`);
		} catch (err) {
			console.error(err);
		}
	}

	await fetchItems();

	const sorter = new Intl.Collator('en-US');
	const materials = (await getMaterialsBasicInfo()).sort(({ name: nameA }, { name: nameB }) => sorter.compare(nameA, nameB));

	for await (const material of materials) {
		const itemCard = document.createElement('item-card');

		itemCard.id = material.id;
		itemCard.title = material.name;
		itemCard.dataset.category = material.category;
		itemCard.dataset.sku = material.sku.join(' ');
		itemCard.dataset.type = material.type;
		itemCard.dataset.edition = material.edition.toString();
		itemCard.dataset.status = material.status ?? '';
		document.querySelector('main')?.appendChild(itemCard);
	}

	updateFiltersFromURL();

	document.querySelector('#load-overlay')?.remove();
});
