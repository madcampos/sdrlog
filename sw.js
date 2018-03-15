/*eslint-disable no-console, arrow-body-style */
/**
 * Refs:
 * https://www.sitepoint.com/getting-started-with-service-workers/
 * https://developers.google.com/web/tools/workbox/
 * https://developers.google.com/web/fundamentals/primers/service-workers/
 * https://css-tricks.com/serviceworker-for-offline/
 * https://serviceworke.rs/
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
 */

const CACHE_NAME = 'sdrlog-v1';

const libs = [
	'https://cdn.polyfill.io/v2/polyfill.min.js',
	'https://unpkg.com/dialog-polyfill'
];

const fallbacks = [
	'/img/full/000-fallback.jpg',
	'/img/thumb/000-fallback.jpg',
	'/img/publishers/fallback.png'
];

self.addEventListener('install', (evt) => {
	evt.waitUntil(async () => {
		try {
			const cache = await caches.open(CACHE_NAME);
			await cache.addAll(['/', '/critical.css', '/js/critical.mjs', ...libs, ...fallbacks]);
		} catch (err) {
			console.error(err);
		}
	});
});

/**
 * Caches a response.
 * @param {Request} request The request to use as a key to the response.
 * @param {Response} response The response to be cached.
 */
async function cacheResponse(request, response){
	const cache = await caches.open(CACHE_NAME);

	await cache.put(request, response);
}

/**
 * Get a request from the network and fetch it if needed.
 * @param {FetchEvent} evt The FetchEvent that initiated the request.
 * @returns {Response} A response from the network.
 */
async function getFromNetwork(evt){
	const url = evt.request.clone();

	//TODO: timeout requests
	//Promise.race?
	const networkResponse = await fetch(url);

	//if not a valid response pipe the error
	if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
		return networkResponse;
	}

	await cacheResponse(networkResponse);

	return networkResponse;
}

/**
 * Get a cached response.
 * @param {FetchEvent} evt The FetchEvent that initiated the request.
 * @returns {Response} A cached response.
 */
async function getFromCache(evt){
	const cache = await caches.open(CACHE_NAME);
	const cachedResponse = await cache.match(evt.request);

	if (cachedResponse) {
		await cache.add(evt.request);
	}

	return cachedResponse;
}

/**
 * Handles the fetch event, returning a network response or a cached response as appropriate.
 * @param {FetchEvent} evt The FetchEvent that initiated the request.
 * @returns {Response} A cached or networked resposne.
 */
async function handleFetch(evt){
	let res = await getFromCache(evt);

	if (res) {
		if (evt.request.url.endsWith('.json') || evt.request.url.endsWith('.json')) {
			//TODO: handle json (last available & last available +1), request from network and cache if ok
		}

		return res;
	}

	res = await getFromNetwork(evt);

	if (!res.ok && (evt.request.url.endsWith('.jpg') || evt.request.url.endsWith('.png'))) {
		//TODO: fallback images (thumb, full ou publisher)
	}

	if (!res.ok && evt.request.url.endsWith('.json')) {
		//TODO: handle last available json
	}

	return res;
}

self.addEventListener('fetch', async (evt) => {
	//TODO: await to respond (pass in a async function *call*)
	evt.respondWith(
		caches.match(evt.request).then((res) => {
			if (res) {
				return res;
			}

			return getFromNetwork(evt);
		})
	);
});