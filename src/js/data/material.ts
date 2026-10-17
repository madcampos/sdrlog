import dataFileUrl from '../../../public/data/index.json?url';
import { getAllIDBValues, setIDBItem, setIDBItems } from './idb-helpers.ts';
import type { Material, MaterialSku, NewMaterial, SDRLogData } from './schema.ts';

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
	);
}

export async function fetchMaterials() {
	try {
		const res = await fetch(dataFileUrl);

		if (res.ok) {
			const parsedFile: SDRLogData = await res.json();

			return sortMaterials(parsedFile.items);
		}
	} catch (err) {
		console.error('Failed to load data.', err);
	}

	return [];
}

export async function saveMaterials(newItems: Material[]) {
	const currentItems = await getAllIDBValues('items');
	const mergedItems = new Map<MaterialSku, Material>();

	for (const material of currentItems) {
		const [sku] = material.sku;

		if (!sku) {
			continue;
		}

		mergedItems.set(sku, material);
	}

	for (const material of newItems) {
		const [sku] = material.sku;

		if (!sku) {
			continue;
		}

		const existingMaterial = mergedItems.get(sku);

		mergedItems.set(sku, {
			...existingMaterial,
			...material
		});
	}

	await setIDBItems('items', mergedItems);

	return [...mergedItems.values()];
}

export async function saveNewMaterial(newMaterial: NewMaterial) {
	// TODO: validate material
	const { files, cover, thumbnail, ...materialToSave } = newMaterial;

	// TODO: handle cover and thumbnail

	await setIDBItem('items', materialToSave.sku[0], materialToSave);

	await Promise.all((files ?? []).map(async (file) => {
		// TODO: save handle
	}));
}
