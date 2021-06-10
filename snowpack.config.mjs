// @ts-nocheck

import { IncomingMessage, ServerResponse } from 'http';

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

	return res.end("self.addEventListener('install', () => self.skipWaiting()); self.addEventListener('activate', () => self.clients.matchAll({ type: 'window' }).then((clients) => clients.forEach((window) => window.navigate(window.url)))); self.addEventListener('fetch', (evt) => evt.respondWith(fetch(evt.request)));");
}

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
	root: './src',
	mount: {
		src: '/',
		data: '/data',
		covers: '/covers',
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
	devOptions: { secure: true },
	buildOptions: {
		out: 'dist',
		metaUrlPath: 'meta'
	}
};
