/* eslint-env node */
// eslint-disable-next-line no-unused-vars
import { IncomingMessage, ServerResponse } from 'http';
import { basename, resolve as resolvePath } from 'path';
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
function handleIcons(req, res) {
	try {
		const fileExtensionLength = -3;
		const fileName = basename(req.url);

		const file = readFileSync(resolvePath('dist/img/icons', fileName));

		const mimes = {
			jpg: 'image/jpeg',
			png: 'image/png',
			svg: 'image/svg+xml'
		};

		res.setHeader('Content-Type', mimes[fileName.slice(fileExtensionLength)]);
		res.end(file);
	} catch {
		res.statusCode = 404;
		res.end('Not found');
	}
}

/** @type RequestHandler */
function handleDataFiles(req, res) {
	const fileName = basename(req.url);

	try {
		const file = readFileSync(resolvePath('dist/data', fileName));

		res.setHeader('Content-Type', 'application/json');
		res.end(file);
	} catch {
		res.statusCode = 404;

		res.end('Data not found.');
	}
}

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

/** @type RequestHandler */
function handleImage(req, res) {
	const fileName = basename(req.url);

	res.setHeader('Content-Type', 'image/jpeg');

	try {
		const file = readFileSync(resolvePath('covers', fileName));


		res.end(file);
	} catch {
		// eslint-disable-next-line no-console
		console.log(`IMAGE NOT FOUND: ${fileName}`);

		res.end(readFileSync(resolvePath('src/img/full/000-fallback.jpg')));
	}
}

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
	root: './src',
	mount: {
		src: '/',
		dist: '/'
	},
	routes: [
		{
			match: 'routes',
			src: '.*',
			dest: '/index.html'
		},
		{
			match: 'all',
			src: '/sw.js',
			dest: handleServiceWorker
		},
		{
			match: 'all',
			src: '/img/thumb/.*',
			dest: handleImage
		},
		{
			match: 'all',
			src: '/img/full/.*',
			dest: handleImage
		},
		{
			match: 'all',
			src: '/img/icons/.*',
			dest: handleIcons
		},
		{
			match: 'all',
			src: '/data/.*',
			dest: handleDataFiles
		}
	],
	optimize: {
		minify: true,
		target: 'es2020'
	},
	devOptions: { secure: { key, cert } },
	buildOptions: { out: 'dist' }
};
