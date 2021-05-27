/* eslint-env node */

import { mkdir, readFile, writeFile } from 'fs/promises';
import { dirname } from 'path';

import { minify } from 'terser';
import { default as glob } from 'fast-glob';

const SRC_PATH = './src';
const DEST_PATH = './dist';
const EXT = '.js';

const options = {
	ecma: '2020',
	module: true
};

(async () => {
	await mkdir(DEST_PATH, { recursive: true });

	const files = await glob(`${SRC_PATH}/**/*${EXT}`);

	for await (const file of files) {
		const fileName = file.replace(SRC_PATH, DEST_PATH);
		const minifiedFile = await minify(await readFile(file, { encoding: 'utf-8' }), options);

		await mkdir(dirname(fileName), { recursive: true });
		await writeFile(fileName, minifiedFile.code);
	}
})();
