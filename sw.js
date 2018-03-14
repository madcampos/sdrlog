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
	'https://unpkg.com/dialog-polyfill',
	'https://unpkg.com/dialog-polyfill/dialog-polyfill.css',
	'https://unpkg.com/vue/dist/vue.min.js',
	'https://unpkg.com/normalize.css'
];

const images = [
	'/img/publishers/catalyst.png',
	'/img/publishers/cliffhanger.png',
	'/img/publishers/fanpro.png',
	'/img/publishers/fasa.png',
	'/img/publishers/harebrained.png',
	'/img/publishers/other.png',
	'/img/publishers/pegasus.png',
	'/img/publishers/unofficial.png',
	'/img/publishers/wizkids.png'
];

const styles = [
	'/css/base.css',
	'/css/chrome.css',
	'/css/main.css',
	'/css/material.css',
	'/css/vars.css'
];

const scripts = [
	'/js/chrome.mjs',
	'/js/itens.mjs',
	'/js/main.mjs'
];

self.addEventListener('install', (evt) => {
	return evt.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(['/', ...libs, ...styles, ...scripts, ...images]);
		})
	);
});

/**
 * Test if a request was successful.
 * @param {Response} response The response to test.
 * @returns {Boolean} The request status.
 */
function isSuccessful(response){
	return response && response.status === 200 && response.type === 'basic';
}

//TODO: filter by type and add new entries to cache.
//TODO: cache json data
self.addEventListener('fetch', (evt) => {
	evt.respondWith(
		caches.match(evt.request).then((res) => {
			if (res) {
				return res; // Cache hit
			}

			return fetch(evt.request.clone()).then((res) => {
				if (!isSuccessful(res)) {
					return res;
				}

				caches.open(CACHE_NAME).then((cache) => {
					cache.put(evt.request, res.clone());
				});

				return res;
			});
		})
	);
});