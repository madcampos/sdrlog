/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access */

import { readFileSync } from 'fs';

const mode = process.env.NODE_ENV;
let sslOptions = false;

if (mode === 'development') {
	sslOptions = {
		cert: readFileSync('./snowpack.crt'),
		key: readFileSync('./snowpack.key')
	};
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
		data: '/data',
		covers: '/covers',
		thumbs: '/thumbs',
		lib: '/lib'
	},
	exclude: ['**/*.schema.json'],
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
	plugins: [
		[
			'snowpack-plugin-minify-html',
			{
				htmlMinifierOptions: {
					caseSensitive: true,
					collapseBooleanAttributes: true,
					collapseInlineTagWhitespace: true,
					collapseWhitespace: true,
					conservativeCollapse: true,
					decodeEntities: true,
					minifyCSS: true,
					minifyURLs: true,
					quoteCharacter: '"',
					removeComments: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true,
					sortAttributes: true,
					sortClassName: true,
					useShortDoctype: true
				}
			}
		]
	],
	devOptions: { secure: sslOptions },
	buildOptions: {
		out: 'dist',
		metaUrlPath: 'meta'
	}
};
