/* eslint-env node */
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
	}
];
