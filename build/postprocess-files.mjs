import { readdir, stat } from 'fs/promises';
import { extname, resolve } from 'path';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
// @ts-ignore - May error out if the project is not built yet
import * as env from '../dist/meta/env.js';

import { default as minifyJson } from './minify-json.mjs';
import { default as processXml } from './process-xml.mjs';

const buildFolder = `${resolve('')}/dist`;

const postprocessing = [
	minifyJson,
	processXml
];

/**
 * @param {string} dirPath
 * @returns {Promise<string[]>}
 */
async function readDirRecursive(dirPath) {
	/** @type {string[]} */
	const entries = [];
	const dirEntries = await readdir(dirPath);

	for await (const entry of dirEntries) {
		const entryPath = `${dirPath}/${entry}`;
		const entryStats = await stat(entryPath);

		if (entryStats.isDirectory()) {
			entries.push(...await readDirRecursive(entryPath));
		} else {
			entries.push(entryPath);
		}
	}

	return entries;
}

(async () => {
	const files = await readDirRecursive(buildFolder);

	for await (const file of files) {
		const extension = extname(file);

		for await (const processCallback of postprocessing) {
			await processCallback(file, extension, env);
		}
	}
})();
