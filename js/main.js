import './chrome.js';
import './gamepad.js';
import './itens.js';

if ('serviceWorker' in navigator) {
	/*eslint-disable no-console*/
	navigator.serviceWorker.register('/sw.js').then((reg) => {
		console.log('Service worker registered');
	}).catch((err) => {
		console.error('Error registering service worker');
		console.error(err);
	});
	/*eslint-enable no-console*/
}