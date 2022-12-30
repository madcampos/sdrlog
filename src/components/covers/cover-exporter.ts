import { ProgressOverlay } from '../progress/progress';
import { getAllCovers, getAllThumbs } from '../data-operations/idb-persistence';
import { I18n } from '../intl/translations';
import { Logger } from '../logger/logger';

export async function saveCoversToFolder() {
	const progressOverlay = ProgressOverlay.createOverlay({ title: I18n.t`Export Covers` });

	try {
		const coversFolder = await window.showDirectoryPicker({
			id: 'coversFolder',
			startIn: 'downloads'
		});
		const covers = await getAllCovers();

		progressOverlay.setTotal(covers.length);

		for await (const cover of covers) {
			progressOverlay.increment();

			try {
				// Will error out if the file doesn't exist
				// This is done to "skip" existing cover files.
				await coversFolder.getFileHandle(cover.name, { create: false });
			} catch {
				const file = await coversFolder.getFileHandle(cover.name, { create: true });
				const stream = await file.createWritable({ keepExistingData: false });

				await stream.truncate(0);
				await stream.write(cover);
				await stream.close();
			}
		}
	} catch (err) {
		Logger.error('Failed to save covers.', err);
	}

	progressOverlay.remove();
}

export async function saveThumbsToFolder() {
	const progressOverlay = ProgressOverlay.createOverlay({ title: I18n.t`Export Thumbnails` });

	try {
		const thumbsFolder = await window.showDirectoryPicker({
			id: 'thumbsFolder',
			startIn: 'downloads'
		});
		const thumbs = await getAllThumbs();

		progressOverlay.setTotal(thumbs.length);

		for await (const thumb of thumbs) {
			progressOverlay.increment();

			try {
				// Will error out if the file doesn't exist
				// This is done to "skip" existing cover files.
				await thumbsFolder.getFileHandle(thumb.name, { create: false });
			} catch {
				const file = await thumbsFolder.getFileHandle(thumb.name, { create: true });
				const stream = await file.createWritable({ keepExistingData: false });

				await stream.truncate(0);
				await stream.write(thumb);
				await stream.close();
			}
		}
	} catch (err) {
		Logger.error('Failed to save thmbs.', err);
	}

	progressOverlay.remove();
}
