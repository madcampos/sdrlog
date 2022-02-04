/* eslint-env serviceworker */
/// <reference lib="webworker" />

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
const isDebug: boolean = false;

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

type ConsoleMethods = 'log' | 'warn' | 'error' | 'info';

class Logger {
	static log(message: string | Error, method: ConsoleMethods = 'log', symbol = '⏺️') {
		if (method === 'error') {
			if (message instanceof Error) {
				console.error(`[⚙️][${symbol}] ${message.name}`);
				console.error(message.message);
				console.error(message.stack);

				// eslint-disable-next-line no-console
				console.trace();
			} else {
				console.error(`[⚙️][${symbol}] ${message}`);
			}
		} else if (isDebug) {
			// eslint-disable-next-line no-console
			console[method](`[⚙️][${symbol}] ${message as string}`);
		}
	}

	static error(message: string, error?: Error) {
		Logger.log(message, 'error', '❌');

		if (error) {
			Logger.log(error, 'error', '❌');
		}
	}

	static warn(message: string, symbol = '⚠️') {
		Logger.log(message, 'warn', symbol);
	}

	static info(message: string, symbol = 'ℹ️') {
		Logger.log(message, 'info', symbol);
	}

	static success(message: string, symbol = '✅') {
		Logger.log(message, 'log', symbol);
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
		Logger.success(`Service worker installed for version ${CACHE_VERSION}.`);
	} catch (err) {
		Logger.error('Error installing service worker.', err);
		await messageWorkerReady('fail');
	}
}

worker.addEventListener('install', (evt) => evt.waitUntil(installWorker()));

async function workerActivation() {
	const clientList = await worker.clients.matchAll({ includeUncontrolled: true });

	clientList.forEach((client) => {
		Logger.info(`Matching client: ${client.url}`, '🔎');
	});

	const cacheNames = await caches.keys();

	for await (const cacheName of cacheNames) {
		if (cacheName !== CACHE_VERSION) {
			Logger.info(`Deleting old cache "${cacheName}".`, '♻️');

			await caches.delete(cacheName);
		}
	}

	Logger.info(`Claming clients for version: ${CACHE_VERSION}.`, '😎');

	await worker.clients.claim();

	try {
		const cache = await caches.open(CACHE_VERSION);

		Logger.info(`Pre caching files: ${JSON.stringify(preCacheFiles)}.`, '🗃️');
		await cache.addAll(preCacheFiles);

		Logger.success('Service worker ready.', '🟢');
		await messageWorkerReady('success');
	} catch (err) {
		Logger.error('Error activating service worker.', err);
		await messageWorkerReady('fail');
	}
}

worker.addEventListener('activate', (evt) => evt.waitUntil(workerActivation()));

async function fetchFromCache(request: Request) {
	Logger.info(`Getting from cache: "${request.url}"`, '🗃️');

	const res = await caches.match(request);

	if (res) {
		return res;
	}

	return null;
}

async function fetchFromNetwork(request: Request, timeout = REQUEST_TIMEOUT) {
	Logger.info(`Fetching: "${request.url}".`, '📶');

	return new Promise<Response>((resolve) => {
		const fallbackResponse = new Response('Service Unavailable', {
			headers: new Headers({ 'Content-Type': 'text/plain' }),
			status: 503,
			statusText: 'Service Unavailable'
		});

		const timeoutId = setTimeout(() => {
			Logger.error(`Network fetch timed out for url: "${request.url}"`);
			resolve(fallbackResponse);
		}, timeout);

		fetch(request).then(async (response) => {
			clearTimeout(timeoutId);

			Logger.success('Fetch succedded.');

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
			Logger.error(`Network fetch failed for url: "${request.url}".`, err);

			resolve(fallbackResponse);
		});
	});
}

async function updateFromNetwork(request: Request) {
	const isSkippedFromNetwork = skipNetworkRefresh.some((ext) => request.url.endsWith(ext));

	if (!isSkippedFromNetwork) {
		Logger.info(`Updating from network: "${request.url}"`, '♻️');

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
