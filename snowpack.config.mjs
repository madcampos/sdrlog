import { readFileSync } from 'fs';

const sslOptions = {
	cert: readFileSync('./snowpack.crt'),
	key: readFileSync('./snowpack.key')
};


/** @type {Record<Uppercase<string>, string>} */
const env = {
	PUBLIC_URL: 'https://localhost:8080/',

	THEME_COLOR: '#9400d3',
	BACKGROUND_COLOR: '#252525',

	APP_NAME: 'Shadowrun Catalog',
	APP_SHORT_NAME: 'SDRlog',
	APP_DESCRIPTION: 'An interactive list of Shadowrun material, with information about the item and can be linked to local files.',

	APPLE_ICON: './img/icons/maskable/apple-icon-180.png',
	SMALL_ICON: './img/icons/transparent/manifest-icon-192.png',
	SMALL_ICON_BG: './img/icons/maskable/manifest-icon-192.png',
	LARGE_ICON: './img/icons/transparent/manifest-icon-512.png',
	LARGE_ICON_BG: './img/icons/maskable/manifest-icon-512.png'
};

const manifest = readFileSync('./src/sdrlog.webmanifest', { encoding: 'utf8' }).replaceAll(/%(.+?)%/giu, (_, match) => env[match] || '');


/**
 * @param {import("http").IncomingMessage} _req
 * @param {import("http").ServerResponse} res
 * @returns {void}
 */
export function handleManifest(_req, res) {
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

/** @type {import("snowpack").SnowpackUserConfig } */
const config = {
	root: './src',
	env,
	mount: {
		src: '/',
		data: '/data',
		'images/covers': '/covers',
		'images/thumbs': '/thumbs',
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

export default config;
