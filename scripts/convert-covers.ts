#!/usr/bin/env -S node --experimental-strip-types
// oxlint-disable no-await-in-loop no-console
/// <reference types="@types/node" />

import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readdir } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import { parseArgs, promisify, styleText } from 'node:util';

const { values: options } = parseArgs({
	options: {
		input: { type: 'string', short: 'i', required: true },
		covers: { type: 'string', short: 'c', required: true },
		thumbs: { type: 'string', short: 't', required: true }
	}
});

if (!options.input || !options.covers || !options.thumbs) {
	console.error('All parameters are required.');
	process.exit(1);
}

const run = promisify(execFile);
const files = await readdir(options.input, { withFileTypes: true });

await Promise.all([
	mkdir(options.covers, { recursive: true }),
	mkdir(options.thumbs, { recursive: true })
]);

for (const file of files.filter((item) => item.isFile())) {
	const input = join(options.input, file.name);
	const outputName = `${basename(file.name, extname(file.name))}.webp`;
	const coverPath = join(options.covers, outputName);
	const thumbPath = join(options.thumbs, outputName);

	if (!existsSync(coverPath)) {
		console.log(`Cover: ${styleText('magentaBright', outputName)}`);
		await run('magick', [input, '-resize', '1024x1024>', '-quality', '85', '-define', 'webp:method=6', coverPath]);
	}

	if (!existsSync(thumbPath)) {
		console.log(`Thumb: ${styleText('cyanBright', outputName)}`);
		await run('magick', [input, '-resize', '256x256>', '-quality', '70', '-define', 'webp:method=6', thumbPath]);
	}
}

process.exit(0);
