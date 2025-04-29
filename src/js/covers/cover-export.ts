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

		for (const cover of covers) {
			let { name, arrayBuffer } = cover as File;

			if (cover instanceof FileSystemFileHandle) {
				const file = await cover.getFile();

				({ name, arrayBuffer } = file);
			}

			progressOverlay.increment(name);

			try {
				// Will error out if the file doesn't exist
				// This is done to "skip" existing cover files.
				await coversFolder.getFileHandle(name, { create: false });
			} catch {
				const file = await coversFolder.getFileHandle(name, { create: true });
				const stream = await file.createWritable({ keepExistingData: false });

				await stream.truncate(0);
				await stream.write(await arrayBuffer());
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

		for (const thumb of thumbs) {
			let { name, arrayBuffer } = thumb as File;

			if (thumb instanceof FileSystemFileHandle) {
				const file = await thumb.getFile();

				({ name, arrayBuffer } = file);
			}

			progressOverlay.increment(name);

			try {
				// Will error out if the file doesn't exist
				// This is done to "skip" existing cover files.
				await thumbsFolder.getFileHandle(name, { create: false });
			} catch {
				const file = await thumbsFolder.getFileHandle(name, { create: true });
				const stream = await file.createWritable({ keepExistingData: false });

				await stream.truncate(0);
				await stream.write(await arrayBuffer());
				await stream.close();
			}
		}
	} catch (err) {
		console.error('Failed to save thmbs.', err);
	}

	progressOverlay.remove();
}
