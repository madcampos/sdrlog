/* eslint-disable no-console*/
/**
 * @file Service worker registration.
 * @author madcampos <madcampos@outlook.com>
 * @version 1.0.0
 */
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js').then(() => {
		console.log('Service worker registered, loading scripts...');
	}).catch((err) => {
		console.error('Error registering service worker.');
		console.error(err);

		console.log('Falling back to default load...');
	});
} else {
	console.log('No service worker, falling back to default load...');
}
