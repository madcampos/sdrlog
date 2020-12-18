/* eslint-env node */
/**
 * @file Configuration for local web server.
 * @author madcampos <madcampos@outlook.com>
 * @version 1.0.0
 */

import { readFile } from 'fs/promises';
import { IncomingMessage, ServerResponse } from 'http';
import { default as server } from 'live-server';

import { default as data } from './data/data.mjs';

const CHUNK_SIZE = 100;
const dataMap = new Map();

let dataChunks = [];

for (const [i, item] of data.entries()) {
	dataChunks.push(item);

	if ((i + 1) % CHUNK_SIZE === 0 || i === data.length - 1) {
		const fileName = `/data/data-${Math.ceil((i + 1) / CHUNK_SIZE)}.json`;

		dataMap.set(fileName, [...dataChunks]);

		dataChunks = [];
	}
}

/**
 * Resolve data json files.
 *
 * @param {IncomingMessage} req The Request.
 * @param {ServerResponse} res The response.
 * @param {Function} next The next middleware.
 * @returns {ServerResponse} Calls the next middleware or returns a response.
 */
function dataMiddleware(req, res, next) {
	if (req.url?.match(/data-\d+\.json$/iu)) {
		if (!dataMap.has(req.url)) {
			res.statusCode = 404;

			return res.end('Data not found.');
		}

		res.setHeader('Content-Type', 'application/json');

		return res.end(JSON.stringify(dataMap.get(req.url)));
	}

	return next();
}

/**
 * Resolve service worker to "dumb" for development process.
 *
 * @param {IncomingMessage} req The Request.
 * @param {ServerResponse} res The response.
 * @param {Function} next The next middleware.
 * @returns {ServerResponse} Calls the next middleware or returns a response.
 */
function serviceWorkerMiddleware(req, res, next) {
	if (req.url === '/sw.js') {
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

	return next();
}

const params = {
	file: 'index.html',
	host: 'localhost',
	https: {
		cert: await readFile('./server-cert.pem'),
		key: await readFile('./server-key.pem'),
		passphrase: '12345'
	},
	logLevel: 2,
	mount: [
		['/img/thumbs', './covers'],
		['/img/full', './covers']
	],
	middleware: [
		serviceWorkerMiddleware,
		dataMiddleware
	],
	open: true,
	port: 8000,
	root: './src',
	wait: 1000
};

server.start(params);
