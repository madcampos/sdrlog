#!/usr/bin/env -S node --experimental-strip-types

/// <reference types="@types/node" />

import { exec } from 'node:child_process';
import { parseArgs, promisify } from 'node:util';

const { values: options } = parseArgs({
	options: {
		date: {
			type: 'string',
			short: 'd',
			required: true
		}
	}
});

const execAsync = promisify(exec);
const dataPath = 'public/data/index.json';

function parseDate(value: string | undefined) {
	if (!value || !/^\d{4}-\d{2}-\d{2}$/u.test(value)) {
		throw new Error('Usage: build/data-status-diff.ts YYYY-MM-DD');
	}

	const date = new Date(`${value}T00:00:00.000Z`);

	if (Number.isNaN(date.getTime())) {
		throw new Error(`Invalid date: ${value}`);
	}

	return date;
}

async function getDataAt(date: Date) {
	const nextDay = new Date(date);
	nextDay.setUTCDate(nextDay.getUTCDate() + 1);

	const { stdout: commit } = await execAsync(
		`git log -1 --format=%H --before=${nextDay.toISOString()} -- ${dataPath}`,
		{ cwd: new URL('..', import.meta.url) }
	);

	if (!commit.trim()) {
		throw new Error(`No ${dataPath} state found by ${date.toISOString()}`);
	}

	// TODO: better handle buffer
	const { stdout } = await execAsync(`git show ${commit.trim()}:${dataPath}`, {
		cwd: new URL('..', import.meta.url),
		// oxlint-disable-next-line no-magic-numbers
		maxBuffer: 10 * 1024 * 1024
	});

	// oxlint-disable-next-line typescript/consistent-type-assertions typescript/no-unsafe-type-assertion
	return JSON.parse(stdout) as {
		items: { name: string, sku: string[], status: string }[]
	};
}

try {
	const date = parseDate(options.date);
	const previousDate = new Date(date);
	previousDate.setUTCDate(previousDate.getUTCDate() - 1);

	const [newData, oldData] = await Promise.all([getDataAt(date), getDataAt(previousDate)]);
	const oldItems = new Map(oldData.items.map((item) => [item.sku[0], item]));
	const okayItems: string[] = [];
	const newlyMissingItems: string[] = [];

	for (const item of newData.items) {
		const previousItem = oldItems.get(item.sku[0]);
		const label = `${item.name} (${item.sku.join(', ')})`;

		if (item.status === 'ok' && previousItem?.status !== 'ok') {
			okayItems.push(label);
		}

		if (item.status === 'missing' && !previousItem) {
			newlyMissingItems.push(label);
		}
	}

	// TODO: output that to a file
} catch (error) {
	console.error(error);
	process.exitCode = 1;
}
