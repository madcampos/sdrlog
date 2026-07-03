import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { fetchData, fetchItems } from '../../js/data/data-import.ts';
import type { Material } from '../../js/data/data.ts';
import { getAllIDBKeys, getAllIDBValues, getIDBItem, getIDBItemsByIndex } from '../../js/data/idb-persistence.ts';
import { extractMetadataFromFileName } from '../../js/files/file-import.ts';

@customElement('stats-report')
export class StatsReport extends LitElement {
	@state()
	private accessor missingCoversHtml = html`
		<progress></progress>
	`;

	@state()
	private accessor duplicateIdsHtml = html`
		<progress></progress>
	`;

	@state()
	private accessor missingFilesHtml = html`
		<progress></progress>
	`;

	@state()
	private accessor extraFilesHtml = html`
		<progress></progress>
	`;

	@state()
	private accessor duplicateFilesHtml = html`
		<progress></progress>
	`;

	@state()
	private accessor fileswithDuplicateIdsHtml = html`
		<progress></progress>
	`;

	protected override createRenderRoot() {
		return this;
	}

	async #findMissingCovers() {
		const missingCovers: string[] = [];
		const missingThumbs: string[] = [];

		const materials = await fetchItems();

		await Promise.all(materials.map(async (item) => {
			const [id] = item.sku;

			const coverFromStorage = await getIDBItem('covers', id);
			const thumbFromStorage = await getIDBItem('thumbs', id);

			if (!coverFromStorage) {
				try {
					const response = await fetch(import.meta.resolve(item.cover), {
						method: 'HEAD'
					});

					if (!response.ok) {
						missingCovers.push(item.cover);
					}
				} catch {
					missingCovers.push(item.cover);
				}
			}

			if (!thumbFromStorage) {
				try {
					const response = await fetch(import.meta.resolve(item.thumbnail), {
						method: 'HEAD'
					});

					if (!response.ok) {
						missingThumbs.push(item.thumbnail);
					}
				} catch {
					missingThumbs.push(item.thumbnail);
				}
			}
		}));

		const sorter = new Intl.Collator('en', { usage: 'sort' });
		missingCovers.sort(sorter.compare);
		missingThumbs.sort(sorter.compare);

		this.missingCoversHtml = html`
			<dl>
				<div>
					<dt>Missing Thumbs</dt>
					<dd>
						<ol>
							${missingThumbs.map((thumb) => html`<a href="${thumb}">${thumb}</a>`)}
						</ol>
					</dd>
				</div>
				<div>
					<dt>Missing Covers</dt>
					<dd>
						<ol>
							${missingCovers.map((cover) => html`<a href="${cover}">${cover}</a>`)}
						</ol>
					</dd>
				</div>
			</dl>
		`;
	}

	async #findDuplicateIds() {
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

	async #findMissingFiles() {
		const { materialsWithMissingFiles, materialsWithOkStatusButMissingFiles } = (await Promise.all((await fetchItems()).map(async (material) => {
			const [id] = material.sku;

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

	async #findExtraFiles() {
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

	async #findDuplicateFiles() {
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

	async #findFilesWithDuplicateIds() {
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

	async #handleOpenDialog(evt: ToggleEvent) {
		if (evt.newState === 'closed') {
			return;
		}

		await Promise.all([
			this.#findMissingCovers()
		]);
	}

	protected override render() {
		return html`
			<dialog
				id="stats-report-dialog"
				popover="manual"
				@toggle=${this.#handleOpenDialog}
			>
				<header>
					<h2>Issue Report</h2>
					<button
						data-icon-button
						type="button"
						popovertarget="stats-report-dialog"
						popovertargetaction="hide"
					>
						<sr-only>Close Report</sr-only>
						<iconify-icon icon="mdi:close" aria-hidden="true"></iconify-icon>
					</button>
				</header>
				<dialog-content>
					<h3></h3>
				</dialog-content>
			</dialog>
		`;
	}
}
