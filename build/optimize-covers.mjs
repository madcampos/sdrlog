/* eslint-env node */
/**
 * @file JS minify process.
 * @author madcampos <madcampos@outlook.com>
 * @version 1.0.0
 */

import { mkdir, readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { dirname } from 'path';

import { default as imagemin } from 'imagemin';
import mozjpg from 'imagemin-mozjpeg';

import { default as glob } from 'fast-glob';

const SRC_PATH = './covers';
const DEST_PATH = './dist/img/full';
const EXT = '.jpg';
const FORCE_REGENERATE = false;

const imageminOptions = {
	plugins: [mozjpg({ progressive: true, quality: 75 })]
};

await mkdir(DEST_PATH, { recursive: true });

const files = await glob(`${SRC_PATH}/**/*${EXT}`);

for await (const file of files) {
	const fileName = file.replace(SRC_PATH, DEST_PATH);

	await mkdir(dirname(fileName), { recursive: true });

	if (!existsSync(file) || FORCE_REGENERATE) {
		const fileData = await imagemin.buffer(await readFile(file), imageminOptions);

		await writeFile(fileName, fileData);
	}
}
