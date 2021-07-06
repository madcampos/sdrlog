/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return */

import { readdir, readFile, stat, writeFile } from 'fs/promises';
import { extname, resolve } from 'path';

const buildFolder = `${resolve('')}/dist`;

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
	const jsonFiles = files.filter((file) => extname(file) === '.json' || extname(file) === '.webmanifest');

	for await (const file of jsonFiles) {
		const content = await readFile(file, { encoding: 'utf8' });
		const minifiedContent = JSON.stringify(JSON.parse(content));

		await writeFile(file, minifiedContent, { encoding: 'utf8' });
	}
})();
