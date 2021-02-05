/* eslint-env node */
/* eslint-disable no-await-in-loop, no-fallthrough, max-depth, no-console */
/**
 * @file Generate browser assets (icons and splashes).
 * @author madcampos <madcampos@outlook.com>
 * @version 1.0.0
 */

const FORCE_REGENERATE = false;

import { extname, join, resolve } from 'path';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';

import { default as imagemin } from 'imagemin';

import { default as puppeteer } from 'puppeteer';

import mozjpg from 'imagemin-mozjpeg';
import optipng from 'imagemin-optipng';
import svgo from 'imagemin-svgo';

import assetList from './asset-list.mjs';

const imageminOptions = {
	plugins: [
		mozjpg({ progressive: true, quality: 75 }),
		optipng({ optimizationLevel: 7 }),
		svgo()
	]
};

(async () => {
	const browser = await puppeteer.launch({
		ignoreHTTPSErrors: true
	});

	const page = await browser.newPage();

	for (const item of assetList) {
		const resourcePath = resolve(item.resource);
		const destinationFolder = resolve(item.destination);

		mkdir(destinationFolder, { recursive: true });

		for (const asset of item.assets) {
			const filePath = join(destinationFolder, asset.fileName);
			let fileData = null;

			if (item.mode === 'dark') {
				await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
			} else {
				await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
			}

			await page.setViewport({
				height: asset.height,
				width: asset.width
			});

			if (!existsSync(filePath) || FORCE_REGENERATE) {
				if (extname(asset.fileName) === '.svg') {
					if (extname(item.resource) === '.svg') {
						fileData = await readFile(resourcePath);
						fileData = await imagemin.buffer(fileData, imageminOptions);
						writeFile(filePath, fileData);
					} else {
						console.error('Can\'t convert from html to svg.');
					}

					// eslint-disable-next-line no-continue
					continue;
				}

				// TODO: handle ico files

				await page.goto(`file:///${resourcePath}`, { waitUntil: 'load' });

				fileData = await page.screenshot({
					omitBackground: true,
					type: extname(asset.fileName).replace('.', '')
				});

				fileData = await imagemin.buffer(fileData, imageminOptions);
				writeFile(filePath, fileData);
			}
		}
	}

	await browser.close();
})();
