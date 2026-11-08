#!/usr/bin/env -S node --experimental-strip-types
// oxlint-disable no-console
/// <reference types="@types/node" />

import { readdir, stat } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import { parseArgs } from 'node:util';
import { default as data } from '../public/data/index.json' with { type: 'json' };
import type { MaterialSku, SDRLogData } from '../src/js/data/schema.ts';

const { values: options } = parseArgs({
	options: {
		dir: {
			type: 'string',
			short: 'd',
			required: true
		}
	}
});

const sizeUnits = ['b', 'kb', 'mb', 'gb'];
const numberFormat = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });

export function formatFileSize(bytes: number) {
	const UNIT_SIZE = 1024;
	let size = bytes;
	let unit = 0;

	while (size >= UNIT_SIZE && unit < sizeUnits.length - 1) {
		size /= UNIT_SIZE;
		unit += 1;
	}

	return `${numberFormat.format(size)} ${sizeUnits[unit]}`;
}

if (!options.dir) {
	console.error('Missing files directory');
	process.exit(1);
}

export function extractMetadataFromFileName(fileName: string) {
	const testRegex = /^(?:(?<id>[A-Z0-9](?:-?[A-Z0-9])+)(?: \((?<modifier>[ADETX])\))? - )?(?<name>.*?)?(?<extension>\.\w+)$/u;
	const { name, modifier, id, extension } = testRegex.exec(fileName)?.groups ?? {};
	const modifierMap = new Map([
		['A', 'attachement'],
		['D', 'draft'],
		['E', 'errata'],
		['T', 'translation'],
		['X', 'extra']
	]);

	return {
		name: name ?? basename(fileName),
		modifier: modifierMap.get(modifier ?? ''),
		// oxlint-disable-next-line typescript/consistent-type-assertions typescript/no-unsafe-type-assertion
		id: id as MaterialSku | undefined,
		extension: extension ?? extname(fileName)
	};
}

// oxlint-disable-next-line typescript/consistent-type-assertions typescript/no-unsafe-type-assertion
const items = (data.items as SDRLogData['items'])
	.filter(({ type, status }) => (type === 'scan' || type === 'print') && status === 'ok');

const files = (await readdir(options.dir, { withFileTypes: true, encoding: 'utf-8', recursive: true }))
	.filter((item) => item.isFile())
	.map((item) => ({
		...extractMetadataFromFileName(basename(item.name)),
		path: join(item.parentPath, item.name)
	}));

const results = [];
for (const { id, path, modifier, name } of files) {
	const item = items.find(({ sku }) => sku[0] === id);
	if (item) {
		// oxlint-disable-next-line no-await-in-loop
		const fileStat = await stat(path);

		results.push({
			id,
			size: formatFileSize(fileStat.size),
			name,
			type: item.type,
			category: item.category,
			modifier
		});
	}
}

console.table(results);

process.exit(results.length);
