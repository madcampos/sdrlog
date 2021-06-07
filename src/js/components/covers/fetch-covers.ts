import { ProgressOverlay } from '../progress/progress';
import { getAllFiles, getCover, getThumb, saveCover, saveThumb } from '../data-operations/idb-persistence';
import { extractMetadataFromFileName, getFilePermission } from '../files-reader/files-reader';
import { extractCover, optimizeCover, processCoverFile, THUMB_WIDTH } from './cover-extractor';
import { canExtractCover, canImportCover } from '../data-operations/storage-conditions';

export async function fetchCover(id: string) {
	let currentCover = await getCover(id);

	if (!currentCover) {
		// TODO: fetch from network
		// TODO: save new cover
	}

	return currentCover;
}

export async function fetchThumb(id: string) {
	let currentThumb = await getThumb(id);

	if (!currentThumb) {
		// TODO: fetch from network
		// TODO: save new cover
	}

	return currentThumb;
}

export async function extractCoversFromFiles() {
	const progressOverlay = ProgressOverlay.createOverlay({ title: 'Extract covers' });

	try {
		const files = await getAllFiles();

		progressOverlay.setTotal(files.length);

		for await (const file of files) {
			progressOverlay.increment();

			const canSaveCover = await canExtractCover(file.name);

			if (canSaveCover) {
				await getFilePermission(file);

				const itemFile = await file.getFile();
				const { cover, thumb } = await extractCover(itemFile);
				const optimizedCover = await optimizeCover(cover);
				const optimizedThumb = await optimizeCover(thumb);

				const { id } = extractMetadataFromFileName(file.name);
				const fileName = `${id}.jpg`;

				const coverFile = new File([optimizedCover], fileName, { type: 'image/jpeg' });
				const thumbFile = new File([optimizedThumb], fileName, { type: 'image/jpeg' });

				await saveCover(id, coverFile);
				await saveThumb(id, thumbFile);
			}
		}
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err);
	}

	progressOverlay.remove();
}

export async function importCoversFromFolder() {
	const progressOverlay = ProgressOverlay.createOverlay({ title: 'Import covers' });

	try {
		const dir = await window.showDirectoryPicker({
			id: 'coversFolder',
			startIn: 'downloads'
		});

		for await (const entry of dir.values()) {
			if (entry.kind === 'file') {
				await getFilePermission(entry);

				const file = await entry.getFile();
				const canSaveCover = await canImportCover(file, true);

				if (canSaveCover) {
					const id = file.name.replace(/\..+$/igu, '');

					// eslint-disable-next-line max-depth
					try {
						const coverFile = await processCoverFile(file);

						await saveCover(id, coverFile);

						const thumbFile = await processCoverFile(file, { referenceWidth: THUMB_WIDTH });

						await saveThumb(id, thumbFile);
					} catch (err) {
						// eslint-disable-next-line no-console
						console.error(id, err);
					}
				}
			}
		}
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err);
	}

	progressOverlay.remove();
}
