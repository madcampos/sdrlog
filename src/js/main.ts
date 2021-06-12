/* eslint-disable no-console*/
import './components/components';
import { fetchItems } from './components/data-operations/data-import';
import { getMaterialsBasicInfo } from './components/data-operations/idb-persistence';
import { updateFiltersFromURL } from './components/search-box/update-filter';

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js').then(() => {
		console.log('Service worker registered, loading scripts...');
	}).catch((err) => {
		console.error(err);
	});
} else {
	console.log('No service worker, falling back to default load...');
}

document.addEventListener('DOMContentLoaded', async () => {
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
