/*eslint-disable no-console*/

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js').then(() => {
		console.log('Service worker registered, initializing app...');
		const mainJs = document.createElement('script');
		mainJs.src = '/js/main.mjs';
		mainJs.type = 'module';
		document.head.appendChild(mainJs);

		const mainCss = document.createElement('link');
		mainCss.href = '/css/main.css';
		mainCss.rel = 'stylesheet';
		document.head.appendChild(mainCss);
	}).catch((err) => {
		console.error('Error registering service worker');
		console.error(err);
	});
} else {
	console.log('No worker, loading modules without cache...');

	const mainJs = document.createElement('script');
	mainJs.src = '/js/main.mjs';
	mainJs.type = 'module';
	document.head.appendChild(mainJs);

	const mainCss = document.createElement('link');
	mainCss.href = '/css/main.css';
	mainCss.rel = 'stylesheet';
	document.head.appendChild(mainCss);
}