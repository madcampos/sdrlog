import type { Material } from '../../data/data';
import { extractMetadataFromFileName } from '../files/file-import';
import { fetchData, fetchItems } from './data-import';
import { getAllIDBKeys, getAllIDBValues, getIDBItem, getIDBItemsByIndex } from './idb-persistence';

async function findMissingCovers() {
	const { missingCovers, missingThumbs } = (await Promise.all((await fetchItems()).map(async (item) => {
		const [id = ''] = item.sku;

		let missingCover: string | undefined;
		let missingThumb: string | undefined;

		const coverFromStorage = await getIDBItem('covers', id);
		const thumbFromStorage = await getIDBItem('thumbs', id);

		if (!coverFromStorage) {
			try {
				const response = await fetch(import.meta.resolve(`/images/covers/${id}.jpg`), {
					method: 'HEAD'
				});

				if (!response.ok) {
					missingCover = id;
				}
			} catch {
				missingCover = id;
			}
		}

		if (!thumbFromStorage) {
			try {
				const response = await fetch(import.meta.resolve(`/images/thumbs/${id}.jpg`), {
					method: 'HEAD'
				});

				if (!response.ok) {
					missingThumb = id;
				}
			} catch {
				missingThumb = id;
			}
		}

		return {
			missingCover,
			missingThumb
		};
	}))).reduce<{ missingCovers: string[], missingThumbs: string[] }>((results, { missingCover, missingThumb }) => {
		if (missingCover) {
			results.missingCovers.push(missingCover);
		}

		if (missingThumb) {
			results.missingThumbs.push(missingThumb);
		}

		return results;
	}, { missingCovers: [], missingThumbs: [] });

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
		const [id = ''] = material.sku;
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
	const { materialsWithMissingFiles, materialsWithOkStatusButMissingFiles } = (await Promise.all((await fetchItems()).map(async (material) => {
		const [id = ''] = material.sku;

		let missingFile: string | undefined;
		let okButMissing: string | undefined;

		const filesForMaterial = await getIDBItemsByIndex('files', 'itemId', id);

		if (filesForMaterial.length === 0 && material.status !== 'canceled') {
			missingFile = id;
		}

		if (filesForMaterial.length === 0 && material.status === 'ok') {
			okButMissing = id;
		}

		return {
			missingFile,
			okButMissing
		};
	}))).reduce<{ materialsWithMissingFiles: string[], materialsWithOkStatusButMissingFiles: string[] }>((results, { missingFile, okButMissing }) => {
		if (missingFile) {
			results.materialsWithMissingFiles.push(missingFile);
		}

		if (okButMissing) {
			results.materialsWithOkStatusButMissingFiles.push(okButMissing);
		}

		return results;
	}, { materialsWithMissingFiles: [], materialsWithOkStatusButMissingFiles: [] });

	return {
		materialsWithMissingFiles: materialsWithMissingFiles.sort(),
		materialsWithOkStatusButMissingFiles: materialsWithOkStatusButMissingFiles.sort()
	};
}

async function findExtraFiles() {
	const data = await getAllIDBKeys('items');
	const files = await getAllIDBValues('files');
	const extraFiles: string[] = [];

	for (const file of files) {
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

	for (const [i, hash] of hashes.entries()) {
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

	for (const item of items) {
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
