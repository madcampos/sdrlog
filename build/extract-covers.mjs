/* eslint-env node */
/* eslint-disable no-console */

import { execSync as exec } from 'child_process';
import { existsSync } from 'fs';
import { mkdir, readdir } from 'fs/promises';
import { join, resolve as resolvePath } from 'path';
import { createInterface } from 'readline';

import data from '../data/data.mjs';

const DEST_PATH = './covers';

async function getFilesRecursive(rootPath) {
	const files = new Map();

	async function readDir(dirPath) {
		const dir = await readdir(dirPath, { withFileTypes: true });

		for await (const item of dir) {
			const itemPath = join(dirPath, item.name);

			if (item.isDirectory()) {
				await readDir(itemPath);
			} else {
				files.set(item.name, itemPath);
			}
		}
	}

	await readDir(rootPath);

	return files;
}

(async () => {
	await mkdir(DEST_PATH, { recursive: true });

	try {
		exec('magick --version', { windowsHide: true, encoding: 'utf8' });
	} catch {
		throw new Error('ImageMagick not available');
	}

	const prompt = createInterface({ input: process.stdin, output: process.stdout });
	const SRC_PATH = await new Promise((resolve) => {
		prompt.question('Please enter the path to files: ', (response) => {
			const normalizedResposne = response.trim().replaceAll(/^['"]|['"]$/giu, '').trim();

			resolve(normalizedResposne);

			prompt.close();
		});
	});

	const filePaths = await getFilesRecursive(SRC_PATH);
	const fileNames = [...filePaths.keys()];

	for await (const item of data) {
		const fileName = join(DEST_PATH, `${item?.sku?.[0]}.jpg`);

		if (!existsSync(fileName)) {
			const pdfFile = fileNames.find((name) => name.startsWith(item.sku[0]) && name.endsWith('.pdf') && !name.includes('Errata') && !name.includes('errata'));

			if (pdfFile) {
				try {
					exec(`magick.exe convert -resize x2048 "${filePaths.get(pdfFile)}[0]" "${resolvePath(fileName)}"`, { windowsHide: true, encoding: 'utf8' });

					console.log(`\x1b[1;32mSuccess: ${pdfFile}\x1b[1;0m`);
				} catch (err) {
					console.error(err);
				}
			} else {
				console.error(`\x1b[1;31mFile not found for #${item?.sku?.[0]}: "${item?.name}"\x1b[1;0m`);
			}
		}
	}
})();
