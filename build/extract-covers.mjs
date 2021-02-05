/* eslint-env node */
/* eslint-disable no-console */

/**
 * @file Extract covers from pdfs ussing GraphicsMagick.
 * @author madcampos <madcampos@outlook.com>
 * @version 1.0.0
 */

import { execSync as exec } from 'child_process';
import { existsSync } from 'fs';
import { mkdir } from 'fs/promises';
import { join, resolve as resolvePath } from 'path';
import { default as glob } from 'fast-glob';
import { createInterface } from 'readline';

import data from '../data/data.mjs';

const DEST_PATH = './covers';

await mkdir(DEST_PATH, { recursive: true });

try {
	exec('gm.exe -help', { windowsHide: true, encoding: 'utf8' });
} catch {
	throw new Error('GraphicsMagick not available');
}

const prompt = createInterface({ input: process.stdin, output: process.stdout });
const SRC_PATH = await new Promise((resolve) => {
	prompt.question('Please entre the path to files: ', (response) => {
		const normalizedResposne = response.trim().replaceAll(/^['"]|['"]$/giu, '').trim();

		resolve(normalizedResposne);

		prompt.close();
	});
});

for await (const item of data) {
	const fileName = join(DEST_PATH, `${item?.sku?.[0]}.jpg`);

	if (!existsSync(fileName)) {
		const [pdfFile] = await glob(`${SRC_PATH}/**/*${item?.sku?.[0]}*.pdf`);

		if (pdfFile) {
			try {
				const output = exec(`gm.exe convert -resize x2048 "${resolvePath(pdfFile)}[0]" "${resolvePath(fileName)}"`, { windowsHide: true, encoding: 'utf8' });

				console.log(output);
			} catch (err) {
				console.error(err);
			}
		} else {
			console.error(`File not found for #${item?.sku?.[0]}: "${item?.name}"`);
		}
	}
}
