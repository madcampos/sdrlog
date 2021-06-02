/* eslint-disable no-console*/
import '../components/components';
import { fetchItems } from '../components/data-operations/data-import';

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

	document.querySelector('#load-overlay')?.remove();
});
