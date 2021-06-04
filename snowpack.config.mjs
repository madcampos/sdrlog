// @ts-nocheck
/* eslint-disable */
import { IncomingMessage, ServerResponse } from 'http';
import { readFileSync } from 'fs';

const cert = readFileSync('./snowpack.crt');
const key = readFileSync('./snowpack.key');

/**
 * @callback RequestHandler A request handler
 *
 * @param {IncomingMessage} req The Request.
 * @param {ServerResponse} res The response.
 * @param {RequestHandler} [next] The next item to call.
 *
 * @returns {ServerResponse} Returns a response.
 */

/** @type RequestHandler */
function handleServiceWorker(_req, res) {
	res.setHeader('Content-Type', 'text/javascript');

	return res.end(`// This service worker file is effectively a 'no-op' that will reset any
// Previous service worker registered for the same host:port combination.

// It is read and returned by a dev server middleware that is only loaded
// During development.

// In the production build, this file is replaced with an actual service worker
// File that will precache your site's local assets.

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => {
	self.clients.matchAll({ type: 'window' }).then((windowClients) => {
		for (const windowClient of windowClients) {
			// Force open pages to refresh, so that they have a chance to load the
			// Fresh navigation response from the local dev server.
			windowClient.navigate(windowClient.url);
		}
	});
});
`);
}

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
	root: './src',
	mount: {
		src: '/',
		data: '/data',
		lib: { url: '/lib', resolve: false, 'static': true }
	},
	routes: [
		{
			match: 'all',
			src: '/sw.js',
			dest: handleServiceWorker
		}
	],
	optimize: {
		minify: true,
		target: 'es2020'
	},
	devOptions: { secure: { key, cert } },
	buildOptions: { out: 'dist' }
};
