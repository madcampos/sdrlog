/* eslint-disable no-console*/
import './components/components';
import { fetchItems } from './components/data-operations/data-import';
import { getMaterialIds } from './components/data-operations/idb-persistence';
import { ItemCard } from './components/item-info/item-card';

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

	const materials = await getMaterialIds();

	for await (const materialId of materials) {
		const card = new ItemCard();

		await card.setMaterial(materialId as string);
		document.querySelector('main')?.appendChild(card);
	}

	document.querySelector('#load-overlay')?.remove();
});
