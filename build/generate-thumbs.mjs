/* eslint-env node */
/**
 * @file JS minify process.
 * @author madcampos <madcampos@outlook.com>
 * @version 1.0.0
 */

import { mkdir, writeFile } from 'fs/promises';
import { dirname } from 'path';

import { default as Jimp } from 'jimp';

import { default as imagemin } from 'imagemin';
import mozjpg from 'imagemin-mozjpeg';

import { default as glob } from 'fast-glob';

const SRC_PATH = './covers';
const DEST_PATH = './dist/img/thumbs';
const EXT = '.jpg';
const THUMB_SIZE = 256;

const imageminOptions = {
	plugins: [mozjpg({ progressive: true, quality: 75 })]
};

(async () => {
	await mkdir(DEST_PATH, { recursive: true });

	const files = await glob(`${SRC_PATH}/**/*${EXT}`);

	for await (const file of files) {
		const fileName = file.replace(SRC_PATH, DEST_PATH);

		await mkdir(dirname(fileName), { recursive: true });

		const img = await Jimp.read(file);

		img.resize(Jimp.AUTO, THUMB_SIZE, Jimp.RESIZE_BICUBIC);

		const fileData = await imagemin.buffer(await img.getBufferAsync(Jimp.MIME_JPEG), imageminOptions);

		await writeFile(fileName, fileData);
	}
})();
