/* eslint-disable no-console*/
import './components/components';
import { fetchItems } from './components/data-operations/data-import';
import { getMaterialsBasicInfo } from './components/data-operations/idb-persistence';

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

	const materials = await getMaterialsBasicInfo();

	for await (const material of materials) {
		const itemCard = document.createElement('item-card');

		itemCard.id = material.id;
		itemCard.title = material.name;
		document.querySelector('main')?.appendChild(itemCard);
	}

	document.querySelector('#load-overlay')?.remove();
});
