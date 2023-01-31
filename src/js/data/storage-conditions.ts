import { extractMetadataFromFileName } from '../files/file-import';
import { getIDBItem } from './idb-persistence';

const ONE_MB = 1048576;
const STORAGE_TRESHOLD = 0.7;
const MB_TRESHOLD = 512;

export const filterList: string[] = [
	// Magazines
	'NVP',
	'STLD',

	// Misc
	'7701',

	// Tabletop
	'7111',
	'TCG01',
	'TCG02',
	'27700',
	'WZK640X',

	// Rulebook
	'26100',
	'27100X',
	'28010',

	// Sourcebooks
	'27110',
	'45068'
];

export function isNameExcluded(name: string) {
	return filterList.some((filter) => name.includes(filter));
}

export async function canExtractCover(fileName: string, forceReplace = false) {
	const { id, modifier } = extractMetadataFromFileName(fileName);

	if (!id) {
		return false;
	}

	if (modifier) {
		return false;
	}

	if (!fileName.endsWith('.pdf') || isNameExcluded(fileName)) {
		return false;
	}

	const hasSavedCover = await getIDBItem('covers', id) !== undefined;
	const { quota, usage } = await navigator.storage.estimate();
	const isReachingQuota = (usage ?? 0) / (quota ?? 1) >= STORAGE_TRESHOLD;
	const isUsingTooMuchData = (usage ?? 0) / ONE_MB >= MB_TRESHOLD;
	const isToReplaceCover = !(hasSavedCover && !forceReplace);

	return isToReplaceCover && !isReachingQuota && !isUsingTooMuchData;
}

export async function canImportCover(file: File, forceReplace = false) {
	if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
		return false;
	}

	const id = file.name.replace(/\..+$/igu, '');
	const material = await getIDBItem('items', id);

	if (!material) {
		return false;
	}

	const hasSavedCover = await getIDBItem('covers', id) !== undefined;
	const { quota, usage } = await navigator.storage.estimate();
	const isReachingQuota = (usage ?? 0) / (quota ?? 1) >= STORAGE_TRESHOLD;
	const isUsingTooMuchData = (usage ?? 0) / ONE_MB >= MB_TRESHOLD;
	const isToReplaceCover = !(hasSavedCover && !forceReplace);

	return isToReplaceCover && !isReachingQuota && !isUsingTooMuchData;
}
