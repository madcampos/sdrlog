#!/usr/bin/env -S node --experimental-strip-types
// oxlint-disable no-console
/// <reference types="@types/node" />

import { readdir } from 'node:fs/promises';
import { basename } from 'node:path';
import { styleText } from 'node:util';
import { default as data } from '../public/data/index.json' with { type: 'json' };

const coversDir = 'public/covers';
const thumbsDir = 'public/thumbs';

const covers = (await readdir(coversDir, { encoding: 'utf-8', recursive: true })).map((item) => basename(item));
const thumbs = (await readdir(thumbsDir, { encoding: 'utf-8', recursive: true })).map((item) => basename(item));

let errorFiles = 0;

for (const item of data.items) {
	const cover = basename(item.cover);

	if (!covers.includes(cover)) {
		errorFiles += 1;

		console.log(`${styleText('magentaBright', '[cover]')}: ${item.sku} - ${item.name}`);
	}
}

for (const item of data.items) {
	const thumb = basename(item.thumbnail);

	if (!thumbs.includes(thumb)) {
		errorFiles += 1;

		console.log(`${styleText('redBright', '[thumb]')}: ${item.sku} - ${item.name}`);
	}
}

process.exit(errorFiles);
