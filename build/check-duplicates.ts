#!/usr/bin/env -S node --experimental-strip-types
// oxlint-disable no-console
/// <reference types="@types/node" />

import { styleText } from 'node:util';
import { default as data } from '../public/data/index.json' with { type: 'json' };

let errorFiles = 0;
for (const item of data.items) {
	const itemsWithId = data.items.filter(({ sku }) => sku[0] === item.sku[0]);

	if (itemsWithId.length > 1) {
		errorFiles += 1;

		console.log(styleText('cyanBright', `${item.sku[0]} - ${item.name}`));

		itemsWithId.forEach((dupe) => {
			console.log(`\t${dupe.sku[0]} - ${dupe.name}`);
		});
	}
}

process.exit(errorFiles);
