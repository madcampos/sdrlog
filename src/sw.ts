/* eslint-env serviceworker */
/// <reference lib="webworker" />

const isDebug = false;

import type { SDRLogData } from '../data/data';
import type { UpdateMessage, WorkerReadyMessage } from './js/rpc-messages';

const worker: ServiceWorkerGlobalScope = self as unknown as ServiceWorkerGlobalScope;
const REQUEST_TIMEOUT = 20000;
const CACHE_VERSION = 'v3';
const skipNetworkRefresh = ['.jpg', '.png', '.svg', '.wasm'];
const preCacheFiles = [
	// Base files
	'./',
	'./sdrlog.webmanifest',
	'./img/icons/favicon.svg',
	'./data/data.json',

	// JS
	'./lib/pdfjs/pdf.js',
	'./meta/env.js',
	'./js/loader.js',
	'./js/main.js',

	// CSS
	'./css/base.css',
	'./css/font.css',
	'./css/vars.css',
	'./css/components/item-info/item-details.css',
	'./css/components/info-box/info-box.css',
	'./css/components/dialog/dialog.css'
];

function logger(message: string) {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (isDebug) {
		// eslint-disable-next-line no-console
		console.log(message);
	}
}

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

async function messageWorkerReady(status: 'success' | 'fail') {
	const pages = await worker.clients.matchAll();

	for (const page of pages) {
		const message: WorkerReadyMessage = {
			type: 'worker-ready',
			status
		};

		page.postMessage(message);
	}
}

async function installWorker() {
	try {
		await worker.skipWaiting();
		logger(`[⚙️][✔️] Service worker installed for version ${CACHE_VERSION}.`);
	} catch (err) {
		console.error('[⚙️][❌] Error installing service worker.');
		console.error(err);
		await messageWorkerReady('fail');
	}
}

worker.addEventListener('install', (evt) => evt.waitUntil(installWorker()));

async function workerActivation() {
	const clientList = await worker.clients.matchAll({ includeUncontrolled: true });

	clientList.forEach((client) => {
		logger(`[⚙️][🔎] Matching client: ${client.url}`);
	});

	const cacheNames = await caches.keys();

	for await (const cacheName of cacheNames) {
		if (cacheName !== CACHE_VERSION) {
			logger(`[⚙️][♻️] Deleting old cache "${cacheName}".`);

			await caches.delete(cacheName);
		}
	}

	logger(`[⚙️][😎] Claming clients for version: ${CACHE_VERSION}.`);

	await worker.clients.claim();

	try {
		const cache = await caches.open(CACHE_VERSION);

		logger(`[⚙️][🗃️] Pre caching files: ${JSON.stringify(preCacheFiles)}.`);
		await cache.addAll(preCacheFiles);

		logger('[⚙️][🟢] Service worker ready.');
		await messageWorkerReady('success');
	} catch (err) {
		console.error('[⚙️][❌] Error activating service worker.');
		console.error(err);
		await messageWorkerReady('fail');
	}
}

worker.addEventListener('activate', (evt) => evt.waitUntil(workerActivation()));

async function fetchFromCache(request: Request) {
	logger(`[⚙️][🗃️] Getting from cache: "${request.url}"`);

	const res = await caches.match(request);

	if (res) {
		return res;
	}

	return null;
}

async function fetchFromNetwork(request: Request, timeout = REQUEST_TIMEOUT) {
	logger(`[⚙️][📶] Fetching: "${request.url}".`);

	return new Promise<Response>((resolve) => {
		const fallbackResponse = new Response('Service Unavailable', {
			headers: new Headers({ 'Content-Type': 'text/plain' }),
			status: 503,
			statusText: 'Service Unavailable'
		});

		const timeoutId = setTimeout(() => {
			console.error(`[⚙️][❌] Network fetch timed out for url: "${request.url}"`);
			resolve(fallbackResponse);
		}, timeout);

		fetch(request).then(async (response) => {
			clearTimeout(timeoutId);

			logger('[⚙️][✔️] Fetch succedded.');

			const STORAGE_TRESHOLD = 0.7;
			const { quota, usage } = await navigator.storage.estimate();
			const isReachingQuota = (usage ?? 0) / (quota ?? 1) >= STORAGE_TRESHOLD;

			if (!isReachingQuota) {
				const cacheRes = response.clone();
				const cache = await caches.open(CACHE_VERSION);

				await cache.put(request, cacheRes);
			}

			resolve(response);
		}, (err) => {
			console.error(`[⚙️][❌] Network fetch failed for url: "${request.url}".`);
			console.error(err);

			resolve(fallbackResponse);
		});
	});
}

async function updateFromNetwork(request: Request) {
	const isSkippedFromNetwork = skipNetworkRefresh.some((ext) => request.url.endsWith(ext));

	if (!isSkippedFromNetwork) {
		logger(`[⚙️][♻️] Updating from network: "${request.url}"`);

		const res = await fetchFromNetwork(request);

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
		headers: { 'Content-Type': 'application/x-suggestions+json' }
	});

	return response;
}

async function handleFetchRequest(request: Request) {
	const contentType = request.headers.get('Content-Type');

	if (contentType === 'application/x-suggestions+json') {
		return searchSuggestion(request);
	}

	let response = await fetchFromCache(request);

	if (!response) {
		response = await fetchFromNetwork(request);
	} else {
		void updateFromNetwork(request);
	}


	return response;
}

worker.addEventListener('fetch', (evt) => evt.respondWith(handleFetchRequest(evt.request)));
