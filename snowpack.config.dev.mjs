import { readFileSync } from 'fs';
import { default as baseConfig } from './snowpack.config.mjs';

const sslOptions = {
	cert: readFileSync('./snowpack.crt'),
	key: readFileSync('./snowpack.key')
};

/**
 * @param {import("http").IncomingMessage} _req
 * @param {import("http").ServerResponse} res
 * @returns {void}
 */
function handleManifest(_req, res) {
	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	const manifest = readFileSync('./src/sdrlog.webmanifest', { encoding: 'utf8' }).replaceAll(/%(.+?)%/giu, (_, match) => config.env?.[match] ?? '');

	res.setHeader('Content-Type', 'text/javascript');

	res.end(manifest);
}

/**
 * @param {import("http").IncomingMessage} _req
 * @param {import("http").ServerResponse} res
 * @returns {void}
 */
function handleServiceWorker(_req, res) {
	res.setHeader('Content-Type', 'text/javascript');

	res.end("self.addEventListener('install', () => self.skipWaiting()); self.addEventListener('activate', () => self.clients.matchAll({ type: 'window' }).then((clients) => clients.forEach((window) => {window.navigate(window.url); window.postMessage({ type: 'worker-ready', status: 'success' }); }))); self.addEventListener('fetch', (evt) => evt.respondWith(fetch(evt.request)));");
}

/** @type {import("snowpack").SnowpackUserConfig} */
const config = {
	...baseConfig,
	env: {
		...baseConfig.env,
		MODE: 'development',
		PUBLIC_URL: 'https://localhost:8080/'
	},
	devOptions: {
		secure: sslOptions,
		open: 'none'
	},
	routes: [
		{
			match: 'all',
			src: '/sdrlog.webmanifest',
			dest: handleManifest
		},
		{
			match: 'all',
			src: '/sw.js',
			dest: handleServiceWorker
		}
	]
};

export default config;
