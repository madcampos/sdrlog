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
 * @property {('web'|'android'|'ios'|'windows'|'safari')} [platform='web'] The platform this resource will be used.
 *
 * Can be one of the following:
 * - **web**: PWA Resources, declared nad used by a instalable app with a `manifest`.
 * - **android**: Resources used by cordova to build for Android.
 * - **ios**: Resources used by cordova to build for iOS.
 * - **windows**: Resources used by cordova to build for Windows or by legacy Edge and IE.
 * - **safari**: Resources for Safari Web Clips (icons, pinned tab icon and splash screen).
 *
 * @property {('icon'|'maskable'|'splash'|'notification')} [type='icon'] The place the asset will be used.
 *
 * Can be one of the following:
 * - **icon**: The item will be used as an icon.
 * - **maskable**: The item will be used as a maskable icon, where the image have a solid background and the device can cut parts of it.
 * - **splash**: The item will be used as a splash screen.
 * - **notification**: The item will be used for notifications.
 * - **screenshot**: The item will be used as a screenshot.
 *
 * @property {('light'|'dark'|'both')} [mode='both'] The mode of the asset, `'light'` or `'dark'`.
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
				fileName: 'favicon-16x16.png',
				height: 16,
				width: 16
			},
			{
				fileName: 'favicon-32x32.png',
				height: 32,
				width: 32
			},
			{
				fileName: 'favicon.ico',
				height: 32,
				width: 32
			},
			{
				fileName: '../../favicon.ico',
				height: 32,
				width: 32
			},
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
		type: 'icon'
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
		type: 'icon'
	},
	{
		assets: [
			{
				fileName: 'apple-touch-icon-152x152.png',
				height: 152,
				width: 152
			}
		],
		destination: BASE_PATH,
		platform: 'safari',
		resource: 'assets/icon-bg.html',
		type: 'maskable'
	},
	{
		assets: [
			{
				fileName: 'safari-pinned-tab.svg',
				height: 180,
				width: 180
			}
		],
		destination: BASE_PATH,
		platform: 'safari',
		resource: 'assets/icon-mono.svg',
		type: 'icon'
	},
	{
		assets: [
			{
				fileName: 'msapplication-icon-70x70.png',
				height: 70,
				width: 70
			},
			{
				fileName: 'msapplication-icon-144x144.png',
				height: 144,
				width: 144
			},
			{
				fileName: 'msapplication-icon-150x150.png',
				height: 150,
				width: 150
			},
			{
				fileName: 'msapplication-icon-310x150.png',
				height: 150,
				width: 310
			},
			{
				fileName: 'msapplication-icon-310x310.png',
				height: 310,
				width: 310
			}
		],
		destination: BASE_PATH,
		mode: 'dark',
		platform: 'windows',
		resource: 'assets/icon-mono.html',
		type: 'icon'
	},
	{
		assets: [
			{
				fileName: 'apple-launch-1125x2436.png',
				height: 2436,
				width: 1125
			},
			{
				fileName: 'apple-launch-750x1334.png',
				height: 1334,
				width: 750
			},
			{
				fileName: 'apple-launch-1242x2208.png',
				height: 2208,
				width: 1242
			},
			{
				fileName: 'apple-launch-640x1136.png',
				height: 1136,
				width: 640
			},
			{
				fileName: 'apple-launch-1536x2048.png',
				height: 2048,
				width: 1536
			},
			{
				fileName: 'apple-launch-1668x2224.png',
				height: 2224,
				width: 1668
			},
			{
				fileName: 'apple-launch-2048x2732.png',
				height: 2732,
				width: 2048
			}
		],
		destination: BASE_PATH,
		platform: 'ios',
		resource: 'assets/splash.html',
		type: 'splash'
	}
];
