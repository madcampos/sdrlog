/* eslint-env serviceworker */
/* eslint-disable no-console */
/// <reference lib="webworker" />

import type { SDRLogData } from '../data/data';
import type { UpdateMessage } from './js/components/update-refresh/update-message';

const CACHE_VERSION = 'v8';
const appShellFiles = ['./index.html'];
const skipNetworkRefresh = ['.jpg', '.png', '.svg', '.wasm', '.html'];
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
	if (import.meta.env.MODE !== 'development') {
		const res = await caches.match(request);

		if (res) {
			console.log(`[⚙️] Cache hit! ${request.url}`);
		}

		return res;
	}

	return null;
}

async function fetchFromNetwork(request: Request) {
	try {
		if (import.meta.env.MODE === 'development') {
			console.log(`[⚙️] Fetching ${request.url}`);
		}

		const netRes = await fetch(request);
		const cacheRes = netRes.clone();

		if (import.meta.env.MODE === 'development') {
			console.log(`[⚙️] Caching ${request.url}`);
		}

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

async function updateFromNetwork(req: Request) {
	const isSkippedFromNetwork = skipNetworkRefresh.some((ext) => req.url.endsWith(ext));

	if (!isSkippedFromNetwork) {
		const res = await fetchFromNetwork(req);

		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		if (res.status <= 200 && res.status >= 299) {
			await messageUpdate(res);
		}
	}
}

async function searchSuggestion(request: Request) {
	const dataRequest = new Request('./data/data.json');
	const dataResponse = await fetchFromCache(dataRequest) ?? await fetchFromNetwork(dataRequest);
	let data: SDRLogData = { $schema: '', items: [] };

	if (dataResponse.ok) {
		data = await dataResponse.json() as SDRLogData;
	}

	// TODO: filter data
	const suggestions = {};
	const response = new Response(JSON.stringify(suggestions), {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		headers: { 'Content-Type': 'application/x-suggestions+json' }
	});

	return response;
}

worker.addEventListener('install', async () => {
	try {
		const cache = await caches.open(CACHE_VERSION);

		await cache.addAll(appShellFiles);

		await worker.skipWaiting();
		console.log(`[⚙️] Service worker installed for version ${CACHE_VERSION}`);
	} catch (err) {
		console.error('[⚙️] Error installing worker:');
		console.error(err);
	}
});

worker.addEventListener('activate', async () => {
	const clientList = await worker.clients.matchAll({ includeUncontrolled: true });

	clientList.forEach((client) => {
		if (import.meta.env.MODE === 'development') {
			console.log(`[⚙️] Matching client: ${client.url}`);
		}
	});

	const cacheNames = await caches.keys();

	for await (const cacheName of cacheNames) {
		if (cacheName !== CACHE_VERSION) {
			if (import.meta.env.MODE === 'development') {
				console.log(`[⚙️] Deleting old cache "${cacheName}"`);
			}

			await caches.delete(cacheName);
		}

		if (import.meta.env.MODE === 'development') {
			console.log(`[⚙️] Claming clients for version: ${CACHE_VERSION}`);
		}

		await worker.clients.claim();
		console.log(`[⚙️] Service worker version ${CACHE_VERSION} active!`);
	}
});

worker.addEventListener('fetch', async (evt) => {
	const contentType = evt.request.headers.get('Content-Type');

	if (contentType === 'application/x-suggestions+json') {
		return searchSuggestion(evt.request);
	}

	let response = await fetchFromCache(evt.request);

	if (!response) {
		response = await fetchFromNetwork(evt.request);
	} else {
		void updateFromNetwork(evt.request);
	}


	return response;
});
