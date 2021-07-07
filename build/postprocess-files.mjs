/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return */

import { readdir, stat } from 'fs/promises';
import { extname, resolve } from 'path';

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

		// eslint-disable-next-line @typescript-eslint/no-loop-func
		await Promise.all(postprocessing.map(async (callback) => {
			await callback(file, extension, env);
		}));
	}
})();
