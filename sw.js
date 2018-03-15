/*eslint-disable no-console, arrow-body-style, require-jsdoc */
const CACHE_NAME = 'sdrlog-v5';
const appShellFiles = [
	'/',
	'/js/critical.js',
	'/css/critical.css',
	'/img/full/000-fallback.jpg',
	'/img/thumbs/000-fallback.jpg',
	'/img/publishers/fallback.png',
	'/site.webmanifest',
	'https://unpkg.com/dialog-polyfill'
];

self.addEventListener('install', (evt) => {
	evt.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(appShellFiles)).then(() => self.skipWaiting()).catch((err) => console.error(err)));
});

self.addEventListener('activate', (evt) => {
	evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', async (evt) => {
	evt.respondWith(caches.match(evt.request).then((res) => res || fetch(evt.request).then((netRes) => {
		const cacheRes = netRes.clone();
		if (!evt.request.url.endsWith('.json')) {
			caches.open(CACHE_NAME).then((cache) => {
				cache.put(evt.request, cacheRes);
			});
		}
		return netRes;
	}, () => {
		if (evt.request.url.endsWith('.jpg') || evt.request.url.endsWith('.png')) {
			return caches.open(CACHE_NAME).then((cache) => {
				let path = '/img/publishers/fallback.png';

				if (evt.request.url.includes('/thumbs/')) {
					path = '/img/thumbs/000-fallback.jpg';
				}

				if (evt.request.url.includes('/full/')) {
					path = '/img/full/000-fallback.jpg';
				}

				return cache.match(path);
			});
		}

		return new Response('<h1>Service Unavailable</h1>', {
			status: 503,
			statusText: 'Service Unavailable',
			headers: new Headers({'Content-Type': 'text/html'})
		});
	})));
});