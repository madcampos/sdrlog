import { type TemplateResult, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { getAllIDBKeys, getAllIDBValues, getIDBItem, getIDBItemsByIndex } from '../../js/data/idb-helpers.ts';
import { extractMetadataFromFileName } from '../../js/data/import.ts';
import { fetchMaterials } from '../../js/data/material.ts';
import type { Material, SavedFileMetadata } from '../../js/data/schema.ts';

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
	private accessor duplicateIdFilesHtml = html`
		<progress></progress>
	`;

	protected override createRenderRoot() {
		return this;
	}

	async #findMissingCovers() {
		const missingCoversHtml: TemplateResult[] = [];
		const missingThumbsHtml: TemplateResult[] = [];

		const materials = await fetchMaterials();

		await Promise.all(materials.map(async (material) => {
			const [id] = material.sku;

			if (!id) {
				return;
			}

			const coverFromStorage = await getIDBItem('covers', id);
			const thumbFromStorage = await getIDBItem('thumbs', id);

			if (!coverFromStorage) {
				try {
					const response = await fetch(import.meta.resolve(material.cover), {
						method: 'HEAD',
						headers: {
							Accept: 'image/*'
						}
					});

					if (!response.ok) {
						missingCoversHtml.push(html`
							<li>
								<inline-card>
									<header>
										<strong>${id}</strong>
										&bull;
										<em>${material.name}</em>
									</header>
									<card-content>
										<a href="${ifDefined(material.cover)}">${material.cover ?? ''}</a>
									</card-content>
								</inline-card>
							</li>
						`);
					}
				} catch {
					missingCoversHtml.push(html`
						<li>
							<inline-card>
								<header>
									<strong>${id}</strong>
									&bull;
									<em>${material.name}</em>
								</header>
								<card-content>
									<a href="${ifDefined(material.cover)}">${material.cover ?? ''}</a>
								</card-content>
							</inline-card>
						</li>
					`);
				}
			}

			if (!thumbFromStorage) {
				try {
					const response = await fetch(import.meta.resolve(material.thumbnail), {
						method: 'HEAD',
						headers: {
							Accept: 'image/*'
						}
					});

					if (!response.ok) {
						missingThumbsHtml.push(html`
							<li>
								<inline-card>
									<header>
										<strong>${id}</strong>
										&bull;
										<em>${material.name}</em>
									</header>
									<card-content>
										<a href="${ifDefined(material.thumbnail)}">${material.thumbnail ?? ''}</a>
									</card-content>
								</inline-card>
							</li>
						`);
					}
				} catch {
					missingThumbsHtml.push(html`
						<li>
							<inline-card>
								<header>
									<strong>${id}</strong>
									&bull;
									<em>${material.name}</em>
								</header>
								<card-content>
									<a href="${ifDefined(material.thumbnail)}">${material.thumbnail ?? ''}</a>
								</card-content>
							</inline-card>
						</li>
					`);
				}
			}
		}));

		this.missingCoversHtml = html`
			<div>
				<h3>Missing Thumbs</h3>
				<ul>
					${missingThumbsHtml}
				</ul>
			</div>
			<div>
				<h3>Missing Covers</h3>
				<ul>
					${missingCoversHtml}
				</ul>
			</div>
		`;
	}

	async #findDuplicateIds() {
		const data = await fetchMaterials();
		const ids = new Map<string, Material[]>();

		for (const material of data) {
			const [id] = material.sku;

			if (!id) {
				continue;
			}

			if (!ids.has(id)) {
				ids.set(id, []);
			}

			ids.get(id)?.push(material);
		}

		const duplicateIdsListHtml = [...ids.entries()]
			.map(([id, materials]) => {
				if (materials.length === 1) {
					return undefined;
				}

				return html`
					<li>
						<inline-card>
							<header>
								<strong>${id}</strong>
							</header>
							<card-content>
								<ul>
									${materials.map(({ name }) => html`<li>${name}</li>`)}
								</ul>
							</card-content>
						</inline-card>
					</li>
				`;
			})
			.filter((item) => item !== undefined);

		this.duplicateIdsHtml = html`
			<ul>
				${duplicateIdsListHtml}
			</ul>
		`;
	}

	async #findMissingFiles() {
		const data = await fetchMaterials();
		const missingFilesHtml: TemplateResult[] = [];
		const markedOkButMissingfilesHtml: TemplateResult[] = [];

		await Promise.all(data.map(async (material) => {
			const [id] = material.sku;

			if (!id) {
				return;
			}

			const filesForMaterial = await getIDBItemsByIndex('files', 'itemId', id);

			if (filesForMaterial.length === 0 && material.status !== 'canceled') {
				missingFilesHtml.push(html`
					<li>
						<inline-card>
							<header>
								<strong>${id}</strong>
							</header>
							<card-content>
								<em>${material.name}</em>
							</card-content>
						</inline-card>
					</li>
				`);
			}

			if (filesForMaterial.length === 0 && material.status === 'ok') {
				markedOkButMissingfilesHtml.push(html`
					<li>
						<inline-card>
							<header>
								<strong>${id}</strong>
							</header>
							<card-content>
								<em>${material.name}</em>
							</card-content>
						</inline-card>
					</li>
				`);
			}
		}));

		this.missingFilesHtml = html`
			<div>
				<h3>Missing Files</h3>
				<ul>
					${missingFilesHtml}
				</ul>
			</div>
			<div>
				<h3>Marked "OK" but missing</h3>
				<ul>
					${markedOkButMissingfilesHtml}
				</ul>
			</div>
		`;
	}

	async #findExtraFiles() {
		const data = await getAllIDBKeys('items');
		const files = await getAllIDBValues('files');
		const extraFiles: TemplateResult[] = [];

		for (const file of files) {
			if (file.mimeType === 'application/x-directory') {
				continue;
			}

			const id = file.itemId;

			if (!id || !data.includes(id)) {
				extraFiles.push(html`
					<li>
						<inline-card>
							<header>
								<strong>${file.itemId ?? ''}</strong>
								&bull;
								<em>${file.fileName}</em>
							</header>
							<card-content>
								<span>${file.path}</span>
							</card-content>
						</inline-card>
					</li>
				`);
			}
		}

		this.extraFilesHtml = html`
			<ul>
				${extraFiles}
			</ul>
		`;
	}

	async #findDuplicateFiles() {
		const items = await getAllIDBValues('files');
		const duplicateFiles = new Map<string, SavedFileMetadata[]>();

		for (const item of items) {
			if (!duplicateFiles.has(item.hash)) {
				duplicateFiles.set(item.hash, []);
			}

			duplicateFiles.get(item.hash)?.push(item);
		}

		const duplicateFilesListHtml = [...duplicateFiles.entries()]
			.map(([hash, files]) => {
				if (files.length === 1) {
					return undefined;
				}

				return html`
					<li>
						<inline-card>
							<header>
								<strong>${hash}</strong>
							</header>
							<card-content>
								<ul>
									${files.map(({ path: filePath }) => html`<li>${filePath}</li>`)}
								</ul>
							</card-content>
						</inline-card>
					</li>
				`;
			})
			.filter((item) => item !== undefined);

		this.duplicateFilesHtml = html`
			<ul>
				${duplicateFilesListHtml}
			</ul>
		`;
	}

	async #findFilesWithDuplicateIds() {
		const items = await getAllIDBValues('files');
		const duplicateIdFiles = new Map<string, SavedFileMetadata[]>();
		const filesWithoutId: TemplateResult[] = [];

		for (const item of items) {
			const id = item.itemId;

			if (!id) {
				filesWithoutId.push(html`
					<li>
						<inline-card>
							<header>
								<strong>${item.fileName}</strong>
							</header>
							<card-content>
								<span>${item.path}</span>
							</card-content>
						</inline-card>
					</li>
				`);
				continue;
			}

			const fileMetadata = extractMetadataFromFileName(item.fileName);

			if (!fileMetadata.id) {
				filesWithoutId.push(html`
					<li>
						<inline-card>
							<header>
								<strong>${item.fileName}</strong>
								&bull;
								<em>(Failed to parse ID)</em>
							</header>
							<card-content>
								<span>${item.path}</span>
							</card-content>
						</inline-card>
					</li>
				`);
				continue;
			}

			if (!duplicateIdFiles.has(fileMetadata.id)) {
				duplicateIdFiles.set(fileMetadata.id, []);
			}

			duplicateIdFiles.get(fileMetadata.id)?.push(item);
		}

		const duplicateIdFilesListHtml = [...duplicateIdFiles.entries()]
			.map(([hash, files]) => {
				if (files.length === 1) {
					return undefined;
				}

				return html`
					<li>
						<inline-card>
							<header>
								<strong>${hash}</strong>
							</header>
							<card-content>
								<ul>
									${files.map(({ path: filePath }) => html`<li>${filePath}</li>`)}
								</ul>
							</card-content>
						</inline-card>
					</li>
				`;
			})
			.filter((item) => item !== undefined);

		this.duplicateIdFilesHtml = html`
			<div>
				<h3>Duplicate ID Files</h3>
				<ul>
					${duplicateIdFilesListHtml}
				</ul>
			</div>
			<div>
				<h3>Files Without ID</h3>
				<ul>
					${filesWithoutId}
				</ul>
			</div>
		`;
	}

	async #handleOpenDialog(evt: ToggleEvent) {
		if (evt.newState === 'closed') {
			return;
		}

		await Promise.all([
			this.#findMissingCovers(),
			this.#findDuplicateIds(),
			this.#findMissingFiles(),
			this.#findExtraFiles(),
			this.#findDuplicateFiles(),
			this.#findFilesWithDuplicateIds()
		]);
	}

	protected override render() {
		return html`
			<dialog
				id="stats-report"
				popover="manual"
				@toggle=${this.#handleOpenDialog}
			>
				<header>
					<h2>Issue Report</h2>
					<button
						data-icon-button
						type="button"
						popovertarget="stats-report"
						popovertargetaction="hide"
					>
						<sr-only>Close Report</sr-only>
						<iconify-icon icon="mdi:close" aria-hidden="true"></iconify-icon>
					</button>
				</header>
				<dialog-content>
					<details open>
						<summary>Missing Covers</summary>
						${this.missingCoversHtml}
					</details>

					<details open>
						<summary>Duplicate IDs</summary>
						${this.duplicateIdsHtml}
					</details>

					<details open>
						<summary>Missing Files</summary>
						${this.missingFilesHtml}
					</details>

					<details open>
						<summary>Extra Files</summary>
						${this.extraFilesHtml}
					</details>

					<details open>
						<summary>Duplicate Files</summary>
						${this.duplicateFilesHtml}
					</details>

					<details open>
						<summary>Files with Duplicate IDs</summary>
						${this.duplicateIdFilesHtml}
					</details>
				</dialog-content>
			</dialog>
		`;
	}
}
