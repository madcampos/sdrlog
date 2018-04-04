/*global workbox*/
/*eslint-env serviceworker*/
/*eslint-disable no-console*/
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');
if (workbox) {
	console.log('Yay! Workbox is loaded 🎉');
} else {
	console.log('Boo! Workbox didn\'t load 😬');
}

workbox.precaching.precacheAndRoute([
	'/',
	'/js/critical.js',
	'/css/critical.css',
	'/img/full/000-fallback.jpg',
	'/img/thumbs/000-fallback.jpg',
	'/img/publishers/fallback.png',
	'https://unpkg.com/dialog-polyfill'
]);

workbox.routing.registerRoute(/\.(?:jpg|png|svg)$/, workbox.strategies.cacheFirst());
workbox.routing.registerRoute(/\.js$/, workbox.strategies.cacheFirst());
workbox.routing.registerRoute(/\.css$/, workbox.strategies.cacheFirst());
workbox.routing.registerRoute(/\.json$/, workbox.strategies.networkOnly());

/*const CACHE_VERSION = 'v8';
const appShellFiles = [
	'/',
	'/js/critical.js',
	'/css/critical.css',
	'/img/full/000-fallback.jpg',
	'/img/thumbs/000-fallback.jpg',
	'/img/publishers/fallback.png',
	'https://unpkg.com/dialog-polyfill'
];

self.addEventListener('install', (evt) => {
	evt.waitUntil(caches.open(CACHE_VERSION).then((cache) => cache.addAll(appShellFiles)).then(() => self.skipWaiting()).catch((err) => {
		console.error('[⚙️] Error installing worker:');
		console.error(err);
	}));
});

self.addEventListener('activate', (evt) => {
	self.clients.matchAll({includeUncontrolled: true}).then((clientList) => {
		clientList.forEach((client) => console.log(`[⚙️] Matching client: ${client.url}`));
	});

	//eslint-disable-next-line arrow-body-style
	evt.waitUntil(caches.keys().then((cacheNames) => {
		return Promise.all(cacheNames.map((cacheName) => {
			if (cacheName !== CACHE_VERSION) {
				console.log(`[⚙️] Deleting old cache "${cacheName}"`);
				return caches.delete(cacheName);
			}

			return Promise.resolve(null);
		})).then(() => {
			console.log(`[⚙️] Claming clients for version: ${CACHE_VERSION}`);
			return self.clients.claim();
		});
	}));
});

self.addEventListener('fetch', async (evt) => {
	evt.respondWith(caches.match(evt.request).then((res) => {
		if (res) {
			return res;
		}

		//TODO: don't handle image requests?
		return fetch(evt.request).then((netRes) => {
			console.log(`[⚙] Fetching ${evt.request.url}`);
			const cacheRes = netRes.clone();

			if (!evt.request.url.endsWith('.json')) {
				console.log(`[⚙] Caching ${evt.request.url}`);
				caches.open(CACHE_VERSION).then((cache) => {
					cache.put(evt.request, cacheRes);
				});
			}

			return netRes;
		}, () => {
			console.warn('[⚙️] Network fetch failed, loading fallback...');

			if (evt.request.url.endsWith('.jpg') || evt.request.url.endsWith('.png')) {
				return caches.open(CACHE_VERSION).then((cache) => {
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
		}).catch((err) => {
			console.error('[⚙️] Fetch error:');
			console.error(err);
		});
	}));
});*/