import type { Material } from '../../data/data';
import { extractMetadataFromFileName } from '../files/file-import';
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
				const response = await fetch(import.meta.resolve(`/images/covers/${id}.jpg`), {
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
				const response = await fetch(import.meta.resolve(`/images/thumbs/${id}.jpg`), {
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
		missingCovers: missingCovers.sort(),
		missingThumbs: missingThumbs.sort()
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

	return duplidateIds.sort();
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
		materialsWithMissingFiles: materialsWithMissingFiles.sort(),
		materialsWithOkStatusButMissingFiles: materialsWithOkStatusButMissingFiles.sort()
	};
}

async function findExtraFiles() {
	const data = await getAllIDBKeys('items');
	const files = await getAllIDBValues('files');
	const extraFiles: string[] = [];

	for await (const file of files) {
		if (file.handler.kind !== 'file') {
			continue;
		}

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

async function findFilesWithDuplicateIds() {
	const items = await getAllIDBValues('files');
	const duplicateIdFiles: string[][] = [];
	const duplicateIds: string[] = [];

	for await (const item of items) {
		const id = item.itemId;

		if (!id) {
			continue;
		}

		if (duplicateIds.includes(id)) {
			continue;
		}

		const filesWithSameId = items.filter((i) => i.itemId === id);
		const filesWithNameMetadata = filesWithSameId.map((i) => ({
			filePath: i.filePath,
			...extractMetadataFromFileName(i.filePath.split('/').pop() ?? '')
		}));
		const duplicatesForItem = filesWithNameMetadata.filter((i) => !i.modifier);

		if (duplicatesForItem.length > 1) {
			const duplicateFilePaths = duplicatesForItem.map((i) => i.filePath);

			duplicateIdFiles.push(duplicateFilePaths);
			duplicateIds.push(id);
		}
	}

	return duplicateIdFiles;
}

export async function reportInconsistencies() {
	const duplicateIds = await findDuplicateIds();
	const missingCovers = await findMissingCovers();
	const missingFiles = await findMissingFiles();
	const extraFiles = await findExtraFiles();
	const duplicateFiles = await findDuplicateFiles();
	const duplicateIdFiles = await findFilesWithDuplicateIds();

	// eslint-disable-next-line no-console
	console.log({
		duplicateIds,
		missingCovers,
		missingFiles,
		extraFiles,
		duplicateFiles,
		duplicateIdFiles
	});
}
