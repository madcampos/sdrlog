#!/usr/bin/env -S node --experimental-strip-types
/// <reference types="@types/node" />

import { readFile, writeFile } from 'node:fs/promises';
import type { ISOTimestamp, SDRLogData } from '../src/js/data/schema.ts';

const dataPath = 'public/data/index.json';

function sortMaterials(items: SDRLogData['items']) {
	const nameCollator = new Intl.Collator('zh-u-co-unihan', {
		numeric: true,
		sensitivity: 'base'
	});

	/**
	 * Compare item release dates taking into account missing dates for both items.
	 * Then compares them.
	 */
	const compareReleaseDates = (itemA?: string, itemB?: string) => {
		// INFO: If the date A is missing, check the second date...
		if (!itemA) {
			// INFO: If the date B is also missing, no change, else date A comes before date B.
			return !itemB ? 0 : 1;
		}

		// INFO: If date A exists but date B is missing, date B comes before date A.
		if (!itemB) {
			return -1;
		}

		const dateA = new Date(itemA);
		const dateB = new Date(itemB);

		if (dateA.getTime() < dateB.getTime()) {
			return -1;
		}

		return dateA.getTime() > dateB.getTime() ? 1 : 0;
	};

	const resolveTopPrecedence = (item: SDRLogData['items'][number]) => {
		// INFO: canceled items should always come first.
		if (item.status === 'canceled') {
			return 0;
		}

		// INFO: items with missing dates should come after canceled, but before other items.
		// oxlint-disable-next-line no-magic-numbers
		return !item.releaseDate?.[0] ? 1 : 2;
	};

	return items.toSorted(
		(itemA, itemB) =>
			resolveTopPrecedence(itemA) - resolveTopPrecedence(itemB) ||
			compareReleaseDates(itemA.releaseDate?.[0], itemB.releaseDate?.[0]) ||
			itemA.edition - itemB.edition ||
			(itemA.sku[0]?.localeCompare(itemB.sku[0] ?? '') ?? nameCollator.compare(itemA.name, itemB.name))
	)
		.map(({
			sku,
			name,
			category,
			type,
			originalLanguage,
			names,
			description,
			edition,
			publisher,
			releaseDate,
			gameDate,
			status,
			notes,
			links,
			cover,
			thumbnail
		}) => ({
			sku,
			name,
			category,
			type,
			originalLanguage,
			names,
			description,
			edition,
			publisher,
			releaseDate,
			gameDate,
			status,
			notes,
			links,
			cover,
			thumbnail
		}));
}

const file = await readFile(dataPath, { encoding: 'utf-8' });
const data: SDRLogData = JSON.parse(file);

data.items = sortMaterials(data.items);
// oxlint-disable-next-line typescript/consistent-type-assertions typescript/no-unsafe-type-assertion
data.lastUpdated = new Date().toISOString() as ISOTimestamp;

await writeFile(dataPath, JSON.stringify(data, null, '\t'), { encoding: 'utf-8' });

process.exit(0);
