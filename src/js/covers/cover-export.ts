import { SdrProgressOverlay } from '../../components/SdrProgressOverlay';
import { getAllIDBValues } from '../data/idb-persistence';

export async function saveCoversToFolder() {
	const progressOverlay = SdrProgressOverlay.createOverlay({ title: 'Export Covers' });

	try {
		const coversFolder = await window.showDirectoryPicker({
			id: 'coversFolder',
			startIn: 'downloads'
		});
		const covers = await getAllIDBValues('covers');

		progressOverlay.total = covers.length;

		for await (const cover of covers) {
			progressOverlay.increment(cover.name);

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
		console.error('Failed to save covers.', err);
	}

	progressOverlay.remove();
}

export async function saveThumbsToFolder() {
	const progressOverlay = SdrProgressOverlay.createOverlay({ title: 'Export Thumbnails' });

	try {
		const thumbsFolder = await window.showDirectoryPicker({
			id: 'thumbsFolder',
			startIn: 'downloads'
		});
		const thumbs = await getAllIDBValues('thumbs');

		progressOverlay.total = thumbs.length;

		for await (const thumb of thumbs) {
			progressOverlay.increment(thumb.name);

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
		console.error('Failed to save thmbs.', err);
	}

	progressOverlay.remove();
}
