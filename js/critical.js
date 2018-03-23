/*eslint-disable no-console*/
const mainJs = document.createElement('script');
mainJs.src = '/js/main.js';
mainJs.type = 'module';

const mainCss = document.createElement('link');
mainCss.href = '/css/main.css';
mainCss.rel = 'stylesheet';


if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js').then(() => {
		console.log('Service worker registered, loading scripts...');
		document.head.appendChild(mainJs);
		document.head.appendChild(mainCss);
	}).catch((err) => {
		console.error('Error registering service worker.');
		console.error(err);

		console.log('Falling back to default load...');
		document.head.appendChild(mainJs);
		document.head.appendChild(mainCss);
	});
} else {
	console.log('No service worker, falling back to default load...');
	document.head.appendChild(mainJs);
	document.head.appendChild(mainCss);
}