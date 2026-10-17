#!/usr/bin/env -S node --experimental-strip-types
// oxlint-disable no-console
/// <reference types="@types/node" />

import { readdir } from 'node:fs/promises';
import { basename, extname } from 'node:path';
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
const itemIds = (data.items as SDRLogData['items']).map(({ sku }) => sku[0]);

const files = (await readdir(options.dir, { encoding: 'utf-8', recursive: true }))
	.map((item) => ({
		...extractMetadataFromFileName(basename(item)),
		path: item
	}));

let errorFiles = 0;
for (const { id, path } of files) {
	if (!id || itemIds.includes(id)) {
		errorFiles += 1;

		console.log(path);
	}
}

process.exit(errorFiles);
