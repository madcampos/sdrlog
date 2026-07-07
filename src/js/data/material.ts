import dataFileUrl from '../../../public/data/index.json?url';
import { getAllIDBValues, setIDBItem, setIDBItems } from './idb-helpers.ts';
import type { Material, MaterialSku, NewMaterial, SDRLogData } from './schema.ts';

export async function fetchMaterials() {
	try {
		const res = await fetch(dataFileUrl);

		if (res.ok) {
			const parsedFile: SDRLogData = await res.json();

			return parsedFile.items;
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
