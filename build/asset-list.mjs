/**
 * @file Assets list to generate.
 * @author madcampos <madcampos@outlook.com>
 * @version 1.0.0
 */

const BASE_PATH = 'dist/img/icons';

/**
 * @typedef {object} ResultAsset
 * @property {string} fileName The file name of the resulting asset.
 * @property {number} width The width of the resulting asset.
 * @property {number} height The height of the resulting asset.
 */

/**
 * @typedef {object} Asset
 * @property {string} resource The path of the resource. It may be a svg or a html. In both cases it will be rendered and a screenshot will be taken.
 *
 * @property {'light'|'dark'} [mode='light'] The mode of the asset, `'light'` or `'dark'`.
 *
 * @property {string} destination The destination folder of the generated assets.
 *
 * @property {ResultAsset[]} assets The list of assets to generate using this configuration.
 */
/** @type {Asset[]} */
export default [
	{
		assets: [
			{
				fileName: 'favicon.svg',
				height: 128,
				width: 128
			}
		],
		destination: BASE_PATH,
		platform: 'web',
		resource: 'assets/logo.svg',
		type: 'icon'
	},
	{
		assets: [
			{
				fileName: 'android-chrome-192x192.png',
				height: 192,
				width: 192
			},
			{
				fileName: 'android-chrome-512x512.png',
				height: 512,
				width: 512
			}
		],
		destination: BASE_PATH,
		platform: 'web',
		resource: 'assets/icon.html',
		type: 'icon',
		mode: 'light'
	},
	{
		assets: [
			{
				fileName: 'android-chrome-192x192-dark.png',
				height: 192,
				width: 192
			},
			{
				fileName: 'android-chrome-512x512-dark.png',
				height: 512,
				width: 512
			}
		],
		destination: BASE_PATH,
		platform: 'web',
		resource: 'assets/icon.html',
		type: 'icon',
		mode: 'dark'
	},
	{
		assets: [
			{
				fileName: 'android-chrome-maskable-192x192.png',
				height: 192,
				width: 192
			},
			{
				fileName: 'android-chrome-maskable-512x512.png',
				height: 512,
				width: 512
			}
		],
		destination: BASE_PATH,
		platform: 'web',
		resource: 'assets/icon-bg.html',
		type: 'icon',
		mode: 'light'
	},
	{
		assets: [
			{
				fileName: 'android-chrome-maskable-192x192-dark.png',
				height: 192,
				width: 192
			},
			{
				fileName: 'android-chrome-maskable-512x512-dark.png',
				height: 512,
				width: 512
			}
		],
		destination: BASE_PATH,
		platform: 'web',
		resource: 'assets/icon-bg.html',
		type: 'icon',
		mode: 'dark'
	}
];
