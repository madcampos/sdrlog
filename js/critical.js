if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js').then(() => {
		const mainJs = document.createElement('script');
		mainJs.src = '/js/main.js';
		mainJs.type = 'module';
		document.head.appendChild(mainJs);

		const mainCss = document.createElement('link');
		mainCss.href = '/css/main.css';
		mainCss.rel = 'stylesheet';
		document.head.appendChild(mainCss);
	}).catch((err) => {
		/*eslint-disable no-console*/
		console.error('Error registering service worker');
		console.error(err);
		/*eslint-enable no-console*/
	});
} else {
	const mainJs = document.createElement('script');
	mainJs.src = '/js/main.js';
	mainJs.type = 'module';
	document.head.appendChild(mainJs);

	const mainCss = document.createElement('link');
	mainCss.href = '/css/main.css';
	mainCss.rel = 'stylesheet';
	document.head.appendChild(mainCss);
}