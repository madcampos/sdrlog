/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, prefer-named-capture-group, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment */

import { readFileSync } from 'fs';

const sslOptions = {
	cert: readFileSync('./snowpack.crt'),
	key: readFileSync('./snowpack.key')
};

const env = readFileSync('./.env', { encoding: 'utf8' }).split('\n').filter((line) => !line.startsWith('#')).map((line) => line.split('=')).reduce((envMap, [name, value]) => {
	envMap[name] = value;

	return envMap;
}, {});
const manifest = readFileSync('./src/sdrlog.webmanifest', { encoding: 'utf8' }).replaceAll(/%(.+?)%/giu, (_, match) => env[match] ?? '');

function handleManifest(_req, res) {
	res.setHeader('Content-Type', 'text/javascript');

	return res.end(manifest);
}

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
		thumbs: '/thumbs',
		lib: '/lib'
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
	],
	exclude: ['**/*.schema.json'],
	optimize: {
		minify: true,
		target: 'es2020'
	},
	plugins: [
		'@snowpack/plugin-dotenv',
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
