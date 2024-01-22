import { SdrProgressOverlay } from '../../components/SdrProgressOverlay';
import { getAllIDBValues, getIDBItem, setIDBItem } from '../data/idb-persistence';
import { extractMetadataFromFileName, getFilePermission } from '../files/file-import';
import { extractCover, optimizeCover, processCoverFile, THUMB_WIDTH } from './cover-extract';
import { canExtractCover, canImportCover } from '../data/storage-conditions';

const TIMEOUT_BEFORE_RELOAD = 500;

export const FALLBACK_COVER = new URL('./images/base-covers/fallback.svg', import.meta.env.BASE_URL).toString();
export const LOADING_COVER = new URL('./images/base-covers/loading-anim.svg', import.meta.env.BASE_URL).toString();
export const LOADING_SIMPLE_COVER = new URL('./images/base-covers/loading-simple.svg', import.meta.env.BASE_URL).toString();

export async function getCoverUrl(id: string) {
	const currentCover = await getIDBItem('covers', id);

	if (currentCover) {
		return URL.createObjectURL(currentCover);
	}

	const response = await fetch(new URL(`./images/covers/${id}.jpg`, import.meta.env.BASE_URL));

	if (response.ok) {
		const responseData = await response.blob();
		const coverFile = new File([responseData], `${id}.jpg`, { type: 'image/jpeg' });

		return URL.createObjectURL(coverFile);
	}

	return FALLBACK_COVER;
}

export async function getThumbUrl(id: string) {
	const currentThumb = await getIDBItem('thumbs', id);

	if (currentThumb) {
		return URL.createObjectURL(currentThumb);
	}

	return FALLBACK_COVER;
}

export async function extractCoversFromFiles() {
	const progressOverlay = SdrProgressOverlay.createOverlay({ title: 'Extract Covers' });

	try {
		const files = await getAllIDBValues('files');

		progressOverlay.total = files.length;

		for await (const file of files) {
			progressOverlay.increment(file.fileName);

			if (file.handler.kind !== 'file') {
				continue;
			}

			const canSaveCover = await canExtractCover(file.fileName ?? file.handler.name);

			if (canSaveCover) {
				await getFilePermission(file.handler);

				const itemFile = await file.handler.getFile();
				const { cover, thumb } = await extractCover(itemFile);
				const optimizedCover = await optimizeCover(cover);
				const optimizedThumb = await optimizeCover(thumb);

				const { id } = extractMetadataFromFileName(file.fileName ?? file.handler.name);
				const fileName = `${id}.jpg`;

				const coverFile = new File([optimizedCover], fileName, { type: 'image/jpeg' });
				const thumbFile = new File([optimizedThumb], fileName, { type: 'image/jpeg' });

				await setIDBItem('covers', id, coverFile);
				await setIDBItem('thumbs', id, thumbFile);
			}
		}
	} catch (err) {
		console.error('Error extracting covers from files.', err);
	}

	progressOverlay.remove();

	setTimeout(() => {
		location.reload();
	}, TIMEOUT_BEFORE_RELOAD);
}

export async function importCoversFromFolder() {
	const progressOverlay = SdrProgressOverlay.createOverlay({ title: 'Import Covers' });

	try {
		const files = [];

		const dir = await window.showDirectoryPicker({
			id: 'originalCoversFolder',
			startIn: 'downloads'
		});

		for await (const entry of dir.values()) {
			if (entry.kind === 'file') {
				await getFilePermission(entry);

				files.push(await entry.getFile());
			}
		}

		progressOverlay.total = files.length;

		for await (const file of files) {
			progressOverlay.increment(file.name);

			const canSaveCover = await canImportCover(file, true);

			if (canSaveCover) {
				const id = file.name.replace(/\..+$/igu, '');

				try {
					const coverFile = await processCoverFile(file, { name: `${id}.jpg` });

					await setIDBItem('covers', id, coverFile);

					const thumbFile = await processCoverFile(file, { referenceWidth: THUMB_WIDTH, name: `${id}.jpg` });

					await setIDBItem('thumbs', id, thumbFile);
				} catch (err) {
					console.error(`Failed to import cover "${id}" from file.`, err);
				}
			}
		}
	} catch (err) {
		console.error('Failed to import covers from folder.', err);
	}

	progressOverlay.remove();

	setTimeout(() => {
		location.reload();
	}, TIMEOUT_BEFORE_RELOAD);
}
