/* eslint-env node */

import { resolve } from 'path';
import { mkdir, writeFile } from 'fs/promises';
import { default as data } from '../data/data.mjs';

const CHUNK_SIZE = 100;
const DEST_PATH = './dist/data';

(async () => {
	await mkdir(DEST_PATH, { recursive: true });

	let chunks = [];

	for await (const [i, item] of data.entries()) {
		chunks.push(item);

		if ((i + 1) % CHUNK_SIZE === 0 || i === data.length - 1) {
			const fileName = resolve(DEST_PATH, `./data-${Math.ceil((i + 1) / CHUNK_SIZE)}.json`);

			await writeFile(fileName, JSON.stringify(chunks));
			chunks = [];
		}
	}
})();
