/* eslint-env serviceworker */
/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference, spaced-comment
/// <reference lib="webworker" />

import type { UpdateMessage } from './js/components/update-refresh/update-message';

const CACHE_VERSION = 'v8';
const appShellFiles = ['/'];
const worker: ServiceWorkerGlobalScope = self as unknown as ServiceWorkerGlobalScope;

async function messageUpdate(response: Response) {
	const pages = await worker.clients.matchAll();

	for (const page of pages) {
		const message: UpdateMessage = {
			type: 'update',
			url: response.url,
			updatedAt: response.headers.get('ETag') ?? ''
		};

		page.postMessage(message);
	}
}

async function fetchFromCache(request: Request) {
	const res = await caches.match(request);

	if (res) {
		return res;
	}

	return null;
}

async function fetchFromNetwork(request: Request) {
	try {
		console.log(`[⚙] Fetching ${request.url}`);

		const netRes = await fetch(request);
		const cacheRes = netRes.clone();

		console.log(`[⚙] Caching ${request.url}`);

		const cache = await caches.open(CACHE_VERSION);

		await cache.put(request, cacheRes);

		return netRes;
	} catch (err) {
		console.error('[⚙️] Network fetch failed!');
		console.error(err);
	}

	return new Response('Service Unavailable', {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		headers: new Headers({ 'Content-Type': 'text/plain' }),
		status: 503,
		statusText: 'Service Unavailable'
	});
}

worker.addEventListener('install', async () => {
	try {
		const cache = await caches.open(CACHE_VERSION);

		await cache.addAll(appShellFiles);

		await worker.skipWaiting();
	} catch (err) {
		console.error('[⚙️] Error installing worker:');
		console.error(err);
	}
});

worker.addEventListener('activate', async (evt) => {
	const clientList = await worker.clients.matchAll({ includeUncontrolled: true });

	clientList.forEach((client) => {
		console.log(`[⚙️] Matching client: ${client.url}`);
	});

	evt.waitUntil(caches.keys().then(async (cacheNames) => {
		await Promise.all(cacheNames.map(async (cacheName) => {
			if (cacheName !== CACHE_VERSION) {
				console.log(`[⚙️] Deleting old cache "${cacheName}"`);

				return caches.delete(cacheName);
			}

			return Promise.resolve(null);
		}));

		console.log(`[⚙️] Claming clients for version: ${CACHE_VERSION}`);

		return worker.clients.claim();
	}));
});

worker.addEventListener('fetch', async (evt) => {
	const resFromCache = await fetchFromCache(evt.request);

	if (resFromCache) {
		evt.respondWith(resFromCache);

		const res = await fetchFromNetwork(evt.request);

		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		if (res.status <= 200 && res.status >= 299) {
			await messageUpdate(res);
		}
	} else {
		evt.respondWith(fetchFromNetwork(evt.request));
	}
});
