/* eslint-env node */
/* eslint-disable no-console */

import { existsSync } from 'fs';
import { basename } from 'path';
import { readdir } from 'fs/promises';
import { createInterface } from 'readline';

import { default as glob } from 'fast-glob';

import data from '../data/data.mjs';

(async () => {
	const prompt = createInterface({ input: process.stdin, output: process.stdout });
	const MATERIAL_PATH = await new Promise((fulfill) => {
		prompt.question('Please entre the path to files: ', (response) => {
			const normalizedResposne = response.trim().replaceAll(/^['"]|['"]$/giu, '').trim();

			fulfill(normalizedResposne);

			prompt.close();
		});
	});

	const sorter = new Intl.Collator('en').compare;

	let newData = data.filter((item) => !existsSync(`./covers/${item.sku[0]}.jpg`));

	newData = newData.map(({ name, sku }) => ({
		sku: sku[0],
		name
	}));

	newData = newData.sort((first, last) => sorter(first.sku, last.sku));

	const skus = [...new Set(data.map((item) => item.sku[0]))];

	const covers = await glob('./covers/**');
	const extraCovers = [];

	for await (const cover of covers) {
		if (!skus.includes(basename(cover, '.jpg'))) {
			extraCovers.push(basename(cover));
		}
	}

	let files = await readdir(MATERIAL_PATH);

	files = files.filter((folder) => folder !== 'Unofficial');
	files = await Promise.all(files.map((folder) => glob(`${MATERIAL_PATH}/${folder}/**`)));
	files = files.flat();

	const filesSkus = files.map((file) => basename(file).replace(/^(?<sku>.*?) - .*$/u, '$<sku>'));

	const missingMaterial = data.reduce((list, { name, sku, status }) => {
		if (!status) {
			if (!filesSkus.includes(sku[0])) {
				list.push({
					sku: sku[0],
					name
				});
			}
		}

		return list;
	}, []);

	const extraMaterial = filesSkus.filter((item) => !skus.includes(item));

	const missing = data.filter((item) => item.status === 'missing').map(({ name, sku }) => ({
		sku: sku[0],
		name
	}));

	const canceled = data.filter((item) => item.status === 'canceled').map(({ name, sku }) => ({
		sku: sku[0],
		name
	}));

	const outOfScope = data.filter((item) => item.status === 'outofscope').map(({ name, sku }) => ({
		sku: sku[0],
		name
	}));

	console.log('Missing pdfs:');
	console.log(missingMaterial);
	console.log('Extra pdfs:');
	console.log(extraMaterial);
	console.log('Missing covers:');
	console.log(newData);
	console.log('Extra covers:');
	console.log(extraCovers);
	console.log('Missing files:');
	console.log(missing.sort((first, last) => sorter(first.sku, last.sku)));
	console.log('Canceled files:');
	console.log(canceled.sort((first, last) => sorter(first.sku, last.sku)));
	console.log('"Out of scope" files:');
	console.log(outOfScope.sort((first, last) => sorter(first.sku, last.sku)));
})();
