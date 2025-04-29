import type {
	AbsoluteLink,
	KnownLocaleCodes,
	Material,
	MaterialPublisher,
	SDRLogData
} from '../../data/data';

import { SdrProgressOverlay } from '../../components/SdrProgressOverlay';
import { getFileHash } from '../files/file-import';
import { getAllIDBValues, getIDBItemByIndex, setIDBItem, setIDBItems } from './idb-persistence';

import { MATERIAL_CATEGORY_INFO, MATERIAL_LANGUAGES_INFO, MATERIAL_PUBLISHERS, MATERIAL_STATUS_INFO, MATERIAL_TYPE_INFO } from '../../data/constants';
import dataUrl from '../../data/data.json?url';
import { processCoverFile, THUMB_WIDTH } from '../covers/cover-extract';

export async function fetchData() {
	try {
		const res = await fetch(dataUrl);

		if (res.ok) {
			const parsedFile = await res.json() as SDRLogData;

			return parsedFile.items;
		}
	} catch (err) {
		console.error('Failed to load data.', err);
	}

	return [];
}

export async function fetchItems() {
	const currentData = await getAllIDBValues('items');
	const onlineData = await fetchData();
	const mergedData = new Map<string, Material>();

	for (const material of currentData) {
		// @ts-expect-error
		mergedData.set(material.sku[0] ?? '', material);
	}

	for (const material of onlineData) {
		mergedData.set(material.sku[0] ?? '', material);
	}

	await setIDBItems('items', [...mergedData.entries()]);

	return [...mergedData.values()];
}

// eslint-disable-next-line complexity
export function parseMaterial(material: Partial<Material | Record<string, unknown>>) {
	function handleArray<T>(value: unknown) {
		const ensureArray = Array.isArray(value) ? value : [];
		const ensureNonEmpty = ensureArray.filter((val) => val);
		const ensureString = ensureNonEmpty.map((val) => val.toString());
		const ensureUnique = [...new Set(ensureString)];

		return ensureUnique as [T, ...T[]];
	}

	function handleEnum<T extends string>(value: unknown, enumValues: Record<T, unknown>, fallback: T | '') {
		const ensureString = value?.toString() ?? '';
		const ensureValid = Object.keys(enumValues).includes(ensureString) ? ensureString : fallback;

		return ensureValid as T;
	}

	const parsedMaterial: Material = {
		name: material.name?.toString() ?? '',
		description: material.description?.toString() ?? '',
		notes: material.notes?.toString() ?? '',

		edition: Number.parseInt(material.edition?.toString() ?? '0') as Material['edition'],

		gameDate: ((/^\d{4}-\d{2}$/iu).test(material.gameDate?.toString() ?? '') ? material.gameDate?.toString() : '') as Material['gameDate'],

		category: handleEnum<Material['category']>(material.category, MATERIAL_CATEGORY_INFO, ''),
		status: handleEnum<Material['status']>(material.status, MATERIAL_STATUS_INFO, 'missing'),
		type: handleEnum<Material['type']>(material.type, MATERIAL_TYPE_INFO, ''),
		// @ts-expect-error
		publisher: handleArray<MaterialPublisher>(material.publisher).filter((pub) => MATERIAL_PUBLISHERS.includes(pub)),
		sku: handleArray<string>(material.sku),
		originalLanguage: handleEnum<KnownLocaleCodes>(material.originalLanguage, MATERIAL_LANGUAGES_INFO, ''),
		releaseDate: handleArray(material.releaseDate)
	};

	if (material.names !== null && typeof material.names === 'object') {
		parsedMaterial.names = {};

		for (const [lang, name] of Object.entries(material.names)) {
			if ((/^[a-z]-[A-Z]/u).test(lang) && typeof name === 'string') {
				// @ts-expect-error
				parsedMaterial.names[lang] = name;
			}
		}
	}

	if (material.links !== null && typeof material.links === 'object') {
		parsedMaterial.links = {};

		for (const [url, title] of Object.entries(material.links)) {
			if (typeof url === 'string' && typeof title === 'string') {
				parsedMaterial.links[url as AbsoluteLink] = title;
			}
		}
	}

	return parsedMaterial;
}

export async function requestDataFileFromUser() {
	const progressOverlay = SdrProgressOverlay.createOverlay({ title: 'Read data file' });

	try {
		const [fileHandle] = await window.showOpenFilePicker({
			id: 'dataFile',
			startIn: 'downloads',
			excludeAcceptAllOption: false,
			types: [{ description: 'JSON Files', accept: { 'text/json': ['.json'] } }]
		});

		await setIDBItem('files', undefined, {
			filePath: '/data.json',
			fileName: 'data.json',
			fileExtension: '.json',
			mimeType: 'text/json',
			handler: fileHandle,
			hash: await getFileHash(await (await fileHandle.getFile()).arrayBuffer())
		});

		const file = await fileHandle.getFile();

		const parsedFile = JSON.parse(await file.text()) as Partial<SDRLogData>;

		if (!parsedFile.items) {
			throw new Error('No items found in data file.');
		}

		const parsedItems = parsedFile.items.map((material) => parseMaterial(material));

		await setIDBItems('items', parsedItems.map((material) => [material.sku[0] ?? '', material]));
	} catch (err) {
		console.error('Failed to open data file.', err);
	}

	progressOverlay.remove();
}

export async function saveNewMaterialInfo(id: string, newMaterial: Material) {
	const { cover, files, ...materialToSave } = newMaterial;

	await setIDBItem('items', id, materialToSave);

	await Promise.all((files ?? []).map(async (file) => {
		const existingFile = await getIDBItemByIndex('files', 'hash', file.hash);

		if (!existingFile) {
			await setIDBItem('files', undefined, file);
		}
	}));

	if (cover) {
		try {
			const coverFile = await processCoverFile(cover, { name: `${id}.jpg` });
			const thumbFile = await processCoverFile(cover, { referenceWidth: THUMB_WIDTH, name: `${id}.jpg` });

			if (coverFile && thumbFile) {
				await setIDBItem('covers', id, coverFile);
				await setIDBItem('thumbs', id, thumbFile);
			}
		} catch (err) {
			console.error(`Failed to save material for id "${id}".`, err);
		}
	}
}
