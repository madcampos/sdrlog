/* eslint-env node */
/**
 * @file JS minify process.
 * @author madcampos <madcampos@outlook.com>
 * @version 1.0.0
 */

import { mkdir, readFile, writeFile } from 'fs/promises';
import { dirname } from 'path';

import { default as csso } from 'csso';
const { minify } = csso;

import { default as glob } from 'fast-glob';

const SRC_PATH = './src';
const DEST_PATH = './dist';
const EXT = '.css';

const options = {};

await mkdir(DEST_PATH, { recursive: true });

const files = await glob(`${SRC_PATH}/**/*${EXT}`);

for await (const file of files) {
	const fileName = file.replace(SRC_PATH, DEST_PATH);
	const minifiedFile = await minify(await readFile(file, { encoding: 'utf-8' }), options);

	await mkdir(dirname(fileName), { recursive: true });
	await writeFile(fileName, minifiedFile.css);
}
