import type { Material } from '../../data/data';
import { fetchData, fetchItems } from './data-import';
import { getAllIDBKeys, getAllIDBValues, getIDBItem, getIDBItemsByIndex } from './idb-persistence';

async function findMissingCovers() {
	const items = await fetchItems();
	const missingCovers: string[] = [];
	const missingThumbs: string[] = [];

	for await (const item of items) {
		const [id] = item.sku;

		const coverFromStorage = await getIDBItem('covers', id);
		const thumbFromStorage = await getIDBItem('thumbs', id);

		if (!coverFromStorage) {
			try {
				const response = await fetch(`${import.meta.env.APP_PUBLIC_URL}images/covers/${id}.jpg`, {
					method: 'HEAD'
				});

				if (!response.ok) {
					missingCovers.push(id);
				}
			} catch {
				missingCovers.push(id);
			}
		}

		if (!thumbFromStorage) {
			try {
				const response = await fetch(`${import.meta.env.APP_PUBLIC_URL}images/thumbs/${id}.jpg`, {
					method: 'HEAD'
				});

				if (!response.ok) {
					missingThumbs.push(id);
				}
			} catch {
				missingThumbs.push(id);
			}
		}
	}

	return {
		missingCovers,
		missingThumbs
	};
}

async function findDuplicateIds() {
	const data = await fetchData();
	const ids = new Map<string, Material>();
	const duplidateIds: string[] = [];

	for (const material of data) {
		const [id] = material.sku;
		const exisitingMaterial = ids.get(id);

		if (exisitingMaterial) {
			duplidateIds.push(id);

			continue;
		}

		ids.set(id, material);
	}

	return duplidateIds;
}

async function findMissingFiles() {
	const data = await fetchItems();
	const materialsWithMissingFiles: string[] = [];
	const materialsWithOkStatusButMissingFiles: string[] = [];

	for await (const material of data) {
		const [id] = material.sku;

		const filesForMaterial = await getIDBItemsByIndex('files', 'itemId', id);

		if (filesForMaterial.length === 0 && material.status !== 'canceled') {
			materialsWithMissingFiles.push(id);
		}

		if (filesForMaterial.length === 0 && material.status === 'ok') {
			materialsWithOkStatusButMissingFiles.push(id);
		}
	}

	return {
		materialsWithMissingFiles,
		materialsWithOkStatusButMissingFiles
	};
}

async function findExtraFiles() {
	const data = await getAllIDBKeys('items');
	const files = await getAllIDBValues('files');
	const extraFiles: string[] = [];

	for await (const file of files) {
		const id = file.itemId;

		if (!id || !data.includes(id)) {
			extraFiles.push(file.filePath);
		}
	}

	return extraFiles;
}

async function findDuplicateFiles() {
	const items = await getAllIDBValues('files');
	const hashes = items.map((item) => item.hash);
	const duplicateFiles: string[][] = [];
	const duplicateHashes: string[] = [];

	for await (const [i, hash] of hashes.entries()) {
		if (duplicateHashes.includes(hash)) {
			continue;
		}

		if (hashes.indexOf(hash) !== i) {
			const duplicatesForItem = items.filter((item) => item.hash === hash);
			const duplicateFilePaths = duplicatesForItem.map((item) => item.filePath);

			duplicateFiles.push(duplicateFilePaths);
			duplicateHashes.push(hash);
		}
	}

	return duplicateFiles;
}

export async function reportInconsistencies() {
	const duplicateIds = await findDuplicateIds();
	const missingCovers = await findMissingCovers();
	const missingFiles = await findMissingFiles();
	const extraFiles = await findExtraFiles();
	const duplicateFiles = await findDuplicateFiles();

	// eslint-disable-next-line no-console
	console.log({
		duplicateIds,
		missingCovers,
		missingFiles,
		extraFiles,
		duplicateFiles
	});
}
