// @ts-nocheck

import { readFileSync } from 'fs';

const mode = process.env.NODE_ENV;
let sslOptions = false;

if (mode === 'development') {
	sslOptions = {
		cert: readFileSync('./snowpack.crt'),
		key: readFileSync('./snowpack.key')
	}
}

function handleServiceWorker(_req, res) {
	res.setHeader('Content-Type', 'text/javascript');

	return res.end("self.addEventListener('install', () => self.skipWaiting()); self.addEventListener('activate', () => self.clients.matchAll({ type: 'window' }).then((clients) => clients.forEach((window) => window.navigate(window.url)))); self.addEventListener('fetch', (evt) => evt.respondWith(fetch(evt.request)));");
}

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
	mode,
	root: './src',
	mount: {
		src: '/',
		data: { url: '/data', resolve: false, static: true },
		covers: { url: '/covers', resolve: false, static: true },
		thumbs: { url: '/thumbs', resolve: false, static: true },
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
	devOptions: { secure: sslOptions },
	buildOptions: {
		out: 'dist',
		metaUrlPath: 'meta'
	}
};
