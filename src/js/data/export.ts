// oxlint-disable no-await-in-loop
import { checkFileExists, getFileHandle } from '@mad-c/file-system-helpers';
import { getHandle, getUserSaveFileHandle } from '@mad-c/file-system-helpers/access';
import { encode } from 'zod';
import { FileOperationOverlay } from '../../components/FileOperationOverlay/FileOperationOverlay.ts';
import { getAllIDBValues } from './idb-helpers';
import { type ISOTimestamp, type Material, JSONToMaterial, JSONToSDRLogData } from './schema';

export async function exportDataToFile() {
	const overlay = document.querySelector<FileOperationOverlay>('file-operation-overlay') ?? new FileOperationOverlay();

	document.body.insertAdjacentElement('beforeend', overlay);

	try {
		const items = await getAllIDBValues('items');

		if (!items.length) {
			return;
		}

		overlay.name = 'Data export';
		overlay.show();

		const handle = await getUserSaveFileHandle({
			id: 'dataFile',
			startIn: 'downloads',
			suggestedName: 'data.json',
			excludeAcceptAllOption: true,
			types: [{ description: 'JSON Files', accept: { 'text/json': ['.json'] } }]
		});

		if (!handle) {
			return;
		}

		const jsonString = encode(JSONToSDRLogData, {
			$schema: './data.schema.json',
			// oxlint-disable-next-line typescript/consistent-type-assertions typescript/no-unsafe-type-assertion
			lastUpdated: new Date().toISOString() as ISOTimestamp,
			items
		});

		const file = await handle.createWritable();

		await file.truncate(0);
		await file.write(jsonString);
		await file.close();
	} catch (err) {
		console.error('Failed to export data file.', err);
	} finally {
		overlay.hideAndRemove();
	}
}

export async function exportMaterialToFile(data: Material) {
	const handle = await getUserSaveFileHandle({
		id: 'dataFile',
		startIn: 'downloads',
		suggestedName: `${data.sku[0]}.json`,
		excludeAcceptAllOption: true,
		types: [{ description: 'JSON Files', accept: { 'text/json': ['.json'] } }]
	});

	if (!handle) {
		return;
	}

	const jsonString = encode(JSONToMaterial, data);
	const file = await handle.createWritable();

	await file.truncate(0);
	await file.write(jsonString);
	await file.close();
}

export async function copyMaterialToClipboard(data: Material) {
	const jsonString = encode(JSONToMaterial, data);

	await navigator.clipboard.writeText(jsonString);
}

async function exportImagesToFolder(collection: 'covers' | 'thumbs', folderId: string, overlayTitle: string) {
	const overlay = document.querySelector<FileOperationOverlay>('file-operation-overlay') ?? new FileOperationOverlay();

	document.body.insertAdjacentElement('beforeend', overlay);

	try {
		const hashes = await getAllIDBValues(collection);

		if (!hashes.length) {
			return;
		}

		const destFolder = await window.showDirectoryPicker({
			id: folderId,
			startIn: 'downloads'
		});

		overlay.max = hashes.length;
		overlay.name = overlayTitle;
		overlay.show();

		for (const hash of hashes) {
			const { handle: sourceHandle } = await getHandle(hash) ?? {};

			if (!(sourceHandle instanceof FileSystemFileHandle)) {
				continue;
			}

			overlay.increment(sourceHandle.name);

			if (!(await checkFileExists(sourceHandle.name, { rootDir: destFolder }))) {
				const sourceFile = await sourceHandle.getFile();
				const destHandle = await getFileHandle(sourceHandle.name, { touch: true, rootDir: destFolder });
				const stream = await destHandle.createWritable({ keepExistingData: false });

				await stream.truncate(0);
				await stream.write(sourceFile);
				await stream.close();
			}
		}
	} catch (err) {
		console.error('Failed to save covers.', err);
	} finally {
		overlay.hideAndRemove();
	}
}

export async function exportCoversToFolder() {
	await exportImagesToFolder('covers', 'coversFolder', 'Covers Export');
}

export async function exportThumbsToFolder() {
	await exportImagesToFolder('thumbs', 'thumbsFolder', 'Thumbnails Export');
}
