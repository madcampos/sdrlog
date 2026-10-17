#!/usr/bin/env -S node --experimental-strip-types
// oxlint-disable no-console
/// <reference types="@types/node" />

import { readdir } from 'node:fs/promises';
import { basename, extname } from 'node:path';
import { parseArgs, styleText } from 'node:util';
import { default as data } from '../public/data/index.json' with { type: 'json' };
import type { SDRLogData } from '../src/js/data/schema.ts';

const { values: options } = parseArgs({
	options: {
		input: { type: 'string', short: 'i', required: true }
	}
});

if (!options.input) {
	console.error('Input directory is required.');
	process.exit(1);
}

const files = await readdir(options.input, { withFileTypes: true });
const itemIds = (data.items as SDRLogData['items']).map(({ sku }) => sku[0] as string);

let errorFiles = 0;
for (const file of files.filter((item) => item.isFile())) {
	if (!itemIds.includes(basename(file.name, extname(file.name)))) {
		errorFiles += 1;

		console.log(styleText('cyanBright', file.name));
	}
}

process.exit(errorFiles);
