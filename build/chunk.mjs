/* eslint-env node */
/**
 * @file Chunk data to smaller pieces.
 * @author madcampos <madcampos@outlook.com>
 * @version 1.0.0
 */
import { resolve } from 'path';
import { writeFileSync } from 'fs';

/**
 * Chunk data in smaller pieces.
 *
 * @param {object[]} data The data object to chunk.
 * @param {string} dir The output directory.
 */
export default function chunkData(data, dir) {
	const CHUNK_SIZE = 100;
	let chunk = [];

	data.forEach((item, i) => {
		chunk.push(item);

		if ((i + 1) % CHUNK_SIZE === 0 || i === data.length - 1) {
			writeFileSync(resolve(dir, `./data-${Math.ceil((i + 1) / CHUNK_SIZE)}.json`), JSON.stringify(chunk));
			chunk = [];
		}
	});
}
