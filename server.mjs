/* eslint-disable jsdoc/require-description, jsdoc/valid-types, no-console */
/* eslint-env node */

// eslint-disable-next-line no-unused-vars
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

import { dirname, resolve as resolvePath } from 'path';
import polka from 'polka';
import sirv from 'sirv';

import { default as data } from './data/data.mjs';

const ROOT_FOLDER = resolvePath(dirname(''), 'src');
const COVERS_PATH = resolvePath(dirname(''), 'covers');
const SERVER_PORT = 8000;
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

/** @type RequestHandler */
function logRequest(req, res, next) {
	console.log(req.url);

	return next();
}

/** @type RequestHandler */
function handleDataFiles(req, res) {
	if (!dataMap.has(req.url)) {
		res.statusCode = 404;

		return res.end('Data not found.');
	}

	res.setHeader('Content-Type', 'application/json');

	return res.end(JSON.stringify(dataMap.get(req.url)));
}

/** @type RequestHandler */
function handleServiceWorker(req, res) {
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

const server = polka({});

server.use(logRequest);
server.get('/sw.js', handleServiceWorker);
server.use(sirv(ROOT_FOLDER, { dev: true }));
server.use('/img/thumbs/*', sirv(COVERS_PATH, { dev: true }));
server.use('/img/full/*', sirv(COVERS_PATH, { dev: true }));
server.get('/data/*', handleDataFiles);

server.listen(SERVER_PORT, () => {
	console.log(`Server running on port: ${SERVER_PORT}`);
});
