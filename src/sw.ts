/* eslint-env serviceworker */
/* eslint-disable no-console */
/// <reference lib="webworker" />

import type { SDRLogData } from '../data/data';
import type { UpdateMessage } from './js/components/update-refresh/update-message';

const CACHE_VERSION = 'v1';
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
	const res = await caches.match(request);

	if (res) {
		return res;
	}

	return null;
}

async function fetchFromNetwork(request: Request) {
	try {
		const netRes = await fetch(request);

		const STORAGE_TRESHOLD = 0.7;
		const { quota, usage } = await navigator.storage.estimate();
		const isReachingQuota = (usage ?? 0) / (quota ?? 1) >= STORAGE_TRESHOLD;

		if (!isReachingQuota) {
			const cacheRes = netRes.clone();
			const cache = await caches.open(CACHE_VERSION);

			await cache.put(request, cacheRes);
		}

		return netRes;
	} catch (err) {
		console.error(`[⚙️] Network fetch failed for url: "${request.url}"`);
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

	const validations = new Map([
		['name', (value: string) => value !== ''],
		['category', (value: string) => ['rulebook', 'sourcebook', 'mission', 'magazine', 'novel', 'videogame', 'tcg', 'boardgame', 'misc'].includes(value)],
		['type', (value: string) => ['digital', 'print', 'scan', 'ocr', 'physical'].includes(value)],
		['status', (value: string) => ['outofscope', 'missing', 'canceled'].includes(value)],
		['sku', (value: string) => (/^[A-Z0-9](?:-?[A-Z0-9])+$/gu).test(value)],
		['edition', (value: string) => (/^[0-6]$/gu).test(value)]
	]);

	const url = new URL(request.url);
	const params = new URLSearchParams(url.search);
	const allowedFilters = ['name', 'category', 'type', 'status', 'sku', 'edition'];
	let suggestions = data.items;

	type AllowedFilters = 'name' | 'category' | 'type' | 'status' | 'sku' | 'edition';

	params.forEach((value, name) => {
		const hasTag = allowedFilters.includes(name);
		const isValid = validations.get(name)?.(value) ?? false;

		if (hasTag && isValid) {
			suggestions = suggestions.filter((item) => item[name as AllowedFilters]?.toString().includes(value));
		}
	});

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
		console.log(`[⚙️] Matching client: ${client.url}`);
	});

	const cacheNames = await caches.keys();

	for await (const cacheName of cacheNames) {
		if (cacheName !== CACHE_VERSION) {
			console.log(`[⚙️] Deleting old cache "${cacheName}"`);

			await caches.delete(cacheName);
		}

		console.log(`[⚙️] Claming clients for version: ${CACHE_VERSION}`);

		await worker.clients.claim();
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
