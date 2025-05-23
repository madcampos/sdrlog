/* eslint-disable max-lines */

import type { RouteLocation, RouterView } from '../../router/router';

import type { SdrEditBox } from '../../components/SdrEditBox';
import type { SdrEditList } from '../../components/SdrEditList';
import type { SdrSelect } from '../../components/SdrSelect';
import type { SdrTextArea } from '../../components/SdrTextArea';
import type { FileSystemEntryForMaterial, KnownLocaleCodes, Material } from '../../data/data';

import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { guard } from 'lit/directives/guard.js';

import { SdrCard } from '../../components/SdrCard';
import { MATERIAL_CATEGORY_INFO, MATERIAL_LANGUAGES_INFO, MATERIAL_PUBLISHERS, MATERIAL_STATUS_INFO, MATERIAL_TYPE_INFO } from '../../data/constants';
import { getCoverUrl, LOADING_COVER } from '../../js/covers/cover-fetch';
import { copyItemToClipboard, exportDataItem } from '../../js/data/data-export';
import { parseMaterial, saveNewMaterialInfo } from '../../js/data/data-import';
import { getIDBItem, getIDBItemByIndex, getIDBItemsByIndex } from '../../js/data/idb-persistence';
import { getIconForFile } from '../../js/files/file-icons';
import { saveFile } from '../../js/files/file-import';
import { openFile } from '../../js/files/file-open';
import { formatFullDate } from '../../js/intl/formatting';
import { Router } from '../../router/router';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-view-item-details')
class SdrViewItemDetails extends LitElement implements RouterView {
	static override shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static override readonly styles = unsafeCSS(style);

	@property({ type: Boolean, reflect: true, attribute: 'disabled' })
	accessor isDisplaying: boolean;

	@state()
	accessor #open: boolean;

	@state({ hasChanged: (value, oldValue) => JSON.stringify(oldValue) !== JSON.stringify(value) })
	accessor #material: Material;

	@state()
	accessor #files: FileSystemEntryForMaterial[];

	@state()
	accessor #coverUrl: string;

	#coverFile: File | undefined;

	constructor() {
		super();

		this.isDisplaying = false;
		this.#open = false;

		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		this.#material = {
			category: '' as Material['category'],
			type: '' as Material['type'],
			sku: [] as unknown as Material['sku'],
			name: '',
			names: {},
			description: '',
			edition: 0 as Material['edition'],
			publisher: [] as unknown as Material['publisher'],
			gameDate: '' as `${number}-${number}`,
			releaseDate: [] as unknown as Material['releaseDate'],
			status: '' as Material['status'],
			originalLanguage: '' as KnownLocaleCodes,
			notes: '',
			links: {}
		} as Material;

		this.#files = [];

		this.#coverUrl = LOADING_COVER;
	}

	// TODO: add gamepad navigation on constructor

	#updateInputValue(evt: Event, prop: 'category' | 'description' | 'edition' | 'gameDate' | 'name' | 'notes' | 'originalLanguage' | 'status' | 'type') {
		const target = evt.target as SdrEditBox | SdrSelect | SdrTextArea;

		this.#material[prop] = (prop === 'edition' ? Number.parseInt(target.value) : target.value) as never;
	}

	#addItemToList(evt: CustomEvent, list: 'publisher' | 'releaseDate' | 'sku') {
		const target = evt.target as SdrEditList;
		const input = target.querySelector('sdr-edit-box, sdr-select') as SdrEditBox | SdrSelect;

		let validationMessage = '';

		if (this.#material[list]?.includes(input.value as never)) {
			validationMessage = 'Item already exists in the list.';
		} else if (input.value === '') {
			validationMessage = 'Please fill the field.';
		}

		input.setCustomValidity(validationMessage);

		const isValid = input.reportValidity();

		if (isValid) {
			this.#material[list]?.push(input.value as never);

			this.requestUpdate('material');
		}
	}

	#addItemToMap(evt: CustomEvent, map: 'links' | 'names') {
		const target = evt.target as SdrEditList;
		const [key, input] = target.querySelectorAll('sdr-edit-box, sdr-select');

		// @ts-expect-error
		const mapToAddItems = this.#material[map]?.[key.value];

		if (mapToAddItems !== undefined) {
			key?.setCustomValidity('Item already exists in the list.');
		} else if (key?.value === '') {
			key.setCustomValidity('Please fill the field.');
		}

		if (input?.value === '') {
			input.setCustomValidity('Please fill the field.');
		}

		const isValid = (key?.reportValidity() && input?.reportValidity()) ?? true;

		if (isValid) {
			this.#material[map] = {
				...(this.#material[map] ?? {}),
				[key?.value ?? '']: input?.value ?? ''
			};

			this.requestUpdate('material');
		}
	}

	#removeListItem(evt: CustomEvent<{ value: string }>) {
		const removedItem = evt.detail.value;
		const target = (evt.target as HTMLElement).closest('sdr-edit-list');

		if (!target) {
			return;
		}

		// @ts-expect-error
		const list = this.#material[target.id] as Record<string, string> | string[];

		if (Array.isArray(list)) {
			list.splice(list.indexOf(removedItem), 1);
		} else {
			// @ts-expect-error
			this.#material[target.id] = Object.fromEntries(Object.entries(list).filter(([key]) => key !== removedItem));
		}

		this.requestUpdate('material');
	}

	#addCover(evt: CustomEvent) {
		const file = evt.detail.file as File;

		this.#coverUrl = LOADING_COVER;
		this.#coverUrl = URL.createObjectURL(file);
		this.#coverFile = file;
	}

	async #addFile() {
		if (this.#material.sku.length > 0) {
			const [handler] = await window.showOpenFilePicker({
				id: 'newMaterialFile',
				startIn: 'downloads',
				excludeAcceptAllOption: false
			});

			const fileForMaterial = await saveFile(handler);

			this.#files.push(fileForMaterial);

			this.requestUpdate('files');
		}
	}

	async #openFile(evt: Event, fileHash: string) {
		evt.preventDefault();
		evt.stopPropagation();

		const fileInfo = await getIDBItemByIndex('files', 'hash', fileHash);

		if (fileInfo) {
			await openFile(fileInfo);
		}
	}

	async #saveItem() {
		const [id] = this.#material.sku;

		if (id) {
			this.isDisplaying = true;

			await saveNewMaterialInfo(id, {
				...this.#material,
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				cover: this.#coverFile!,
				files: this.#files
			});

			if (!document.querySelector(`sdr-card[id="${id}"]`)) {
				const card = new SdrCard({
					name: this.#material.name,
					id,
					sku: this.#material.sku,
					edition: this.#material.edition,
					category: this.#material.category,
					type: this.#material.type,
					status: this.#material.status
				});

				document.querySelector('main')?.append(card);
			}

			// eslint-disable-next-line no-alert
			alert(`Item # ${id} saved successfully.`);
		}
	}

	#close() {
		this.#open = false;

		void Router.navigate('/');
	}

	#getPublisherImageUrl(publisher: string) {
		return import.meta.resolve(`/images/publishers/${publisher}.png`);
	}

	async navigate(destination: RouteLocation<'/item/:id'>) {
		let title = 'New Material';

		if (destination.params.id) {
			this.resetMaterial();
			await this.setMaterial(destination.params.id);

			title = this.#material.name;
		}

		// TODO: move this handler elsewhere
		if ('launchQueue' in window) {
			window.launchQueue.setConsumer(async (launchParams) => {
				this.resetMaterial();

				for (const fileReference of launchParams.files) {
					if (fileReference.kind === 'file') {
						try {
							const file = await (fileReference as FileSystemFileHandle).getFile();
							const textContent = await file.text();
							const jsonContent = JSON.parse(textContent) as Partial<Material>;

							this.#material = parseMaterial(jsonContent);

							break;
						} catch (error) {
							console.error(error);
						}
					}
				}
			});
		}

		this.#open = true;

		return title;
	}

	resetMaterial() {
		this.isDisplaying = false;

		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		this.#material = {
			category: '' as Material['category'],
			type: '' as Material['type'],
			sku: [] as unknown as Material['sku'],
			name: '',
			names: {},
			description: '',
			edition: 0 as Material['edition'],
			publisher: [] as unknown as Material['publisher'],
			gameDate: '' as `${number}-${number}`,
			releaseDate: [] as unknown as Material['releaseDate'],
			status: '' as Material['status'],
			originalLanguage: '' as KnownLocaleCodes,
			notes: '',
			links: {}
		} as Material;

		this.#files = [];

		this.#coverUrl = LOADING_COVER;
	}

	async setMaterial(id: string) {
		const material = await getIDBItem('items', id);

		if (material) {
			this.isDisplaying = true;

			this.#material = material as Material;

			void getCoverUrl(material.sku[0] ?? '').then((coverUrl) => {
				this.#coverUrl = coverUrl;
			});

			void getIDBItemsByIndex('files', 'itemId', material.sku[0] ?? '').then((fileList) => {
				for (const file of fileList) {
					this.#files.push(file);
				}
			});
		}
	}

	override firstUpdated(changedProperties: Map<string, unknown>) {
		super.firstUpdated(changedProperties);

		this.renderRoot.querySelectorAll('sdr-edit-list').forEach((list) => {
			list.addEventListener('itemremoved', (evt) => {
				this.#removeListItem(evt);
			});
		});
	}

	override createRenderRoot() {
		return this;
	}

	override render() {
		return html`
			<!-- <style>${SdrViewItemDetails.styles}</style> -->
			<sdr-dialog ?open="${this.#open}" @close="${() => this.#close()}">
				<sdr-edit-box slot="title" ?disabled="${this.isDisplaying}" value="${this.#material.name}" @input="${(evt: Event) =>
			this.#updateInputValue(evt, 'name')}" @change="${(evt: Event) => this.#updateInputValue(evt, 'name')}"></sdr-edit-box>

				<div id="item-content">
					<sdr-drop-area id="cover-drop-area" ?disabled="${this.isDisplaying}" @dropfile="${(evt: CustomEvent) => this.#addCover(evt)}">
						<figure>
							<img width="100" height="160" id="cover" decoding="async" loading="lazy" role="presentation" src="${this.#coverUrl}" />
						</figure>
					</sdr-drop-area>

					<sdr-tabs id="item-details-tabs">
						<sdr-tab slot="tab">Description</sdr-tab>
						<sdr-tab-panel slot="tabpanel">
							<sdr-textarea id="notes" ?disabled="${this.isDisplaying}" ?hidden="${!this.#material.notes}" value="${this.#material.notes ?? ''}" @input="${(
			evt: Event
		) => this.#updateInputValue(evt, 'notes')}" @change="${(evt: Event) => this.#updateInputValue(evt, 'notes')}">
								<span slot="label">Notes</span>
							</sdr-textarea>

							<sdr-textarea id="description" required ?disabled="${this.isDisplaying}" value="${this.#material.description}" @input="${(evt: Event) =>
			this.#updateInputValue(evt, 'description')}" @change="${(evt: Event) => this.#updateInputValue(evt, 'description')}">
								<span slot="label">Description</span>
							</sdr-textarea>
						</sdr-tab-panel>

						<sdr-tab slot="tab">Info</sdr-tab>
						<sdr-tab-panel slot="tabpanel">
							<div id="item-info">
								<sdr-edit-list id="sku" open ?disabled="${this.isDisplaying}" @itemadded="${(evt: CustomEvent) => this.#addItemToList(evt, 'sku')}">
									<span slot="label">SKU</span>
									<sdr-edit-box slot="input" pattern="^[A-Z0-9](?:-?[A-Z0-9])+$" required></sdr-edit-box>

									${
			this.#material.sku.map((sku) =>
				html`
										<sdr-edit-list-item value="${sku}">${sku}</sdr-edit-list-item>
									`
			)
		}
								</sdr-edit-list>

								<sdr-edit-box type="number" min="1" max="6" step="1" required ?disabled="${this.isDisplaying}" value="${this.#material.edition}" @input="${(
			evt: Event
		) => this.#updateInputValue(evt, 'edition')}" @change="${(evt: Event) => this.#updateInputValue(evt, 'edition')}">
									<span slot="label">Edition</span>
								</sdr-edit-box>

								<sdr-select id="category" required ?disabled="${this.isDisplaying}" value="${this.#material.category}" @input="${(evt: Event) =>
			this.#updateInputValue(evt, 'category')}" @change="${(evt: Event) => this.#updateInputValue(evt, 'category')}">
									<span slot="label">Category</span>

									${
			guard(Object.keys(MATERIAL_CATEGORY_INFO), () =>
				Object.entries(MATERIAL_CATEGORY_INFO).map(([key, value]) =>
					html`
										<option value="${key}">${value.icon} ${value.name}</option>
									`
				))
		}
								</sdr-select>

								<sdr-select id="type" required ?disabled="${this.isDisplaying}" value="${this.#material.type}" @input="${(evt: Event) =>
			this.#updateInputValue(evt, 'type')}" @change="${(evt: Event) => this.#updateInputValue(evt, 'type')}">
									<span slot="label">Type</span>

									${
			guard(Object.keys(MATERIAL_TYPE_INFO), () =>
				Object.entries(MATERIAL_TYPE_INFO).map(([key, value]) =>
					html`
										<option value="${key}">${value.icon} ${value.name}</option>
									`
				))
		}
								</sdr-select>

								<sdr-select id="originalLanguage" required ?disabled="${this.isDisplaying}" value="${this.#material.originalLanguage}" @input="${(evt: Event) =>
			this.#updateInputValue(evt, 'originalLanguage')}" @change="${(evt: Event) => this.#updateInputValue(evt, 'originalLanguage')}">
									<span slot="label">Original Language</span>

									${
			guard(Object.keys(MATERIAL_LANGUAGES_INFO), () =>
				Object.entries(MATERIAL_LANGUAGES_INFO).map(([key, value]) =>
					html`
										<option value="${key}">${value.icon} ${value.name}</option>
									`
				))
		}
								</sdr-select>

								<sdr-edit-list id="releaseDate" open ?disabled="${this.isDisplaying}" @itemadded="${(evt: CustomEvent) => this.#addItemToList(evt, 'releaseDate')}">
									<span slot="label">Release date</span>
									<sdr-edit-box slot="input" type="date" required></sdr-edit-box>

									${
			this.#material.releaseDate?.map((releaseDate) =>
				html`
										<sdr-edit-list-item value="${releaseDate}">${formatFullDate(new Date(releaseDate))}</sdr-edit-list-item>
									`
			)
		}
								</sdr-edit-list>

								<sdr-select id="status" required ?disabled="${this.isDisplaying}" value="${this.#material.status}" @input="${(evt: Event) =>
			this.#updateInputValue(evt, 'status')}" @change="${(evt: Event) => this.#updateInputValue(evt, 'status')}">
									<span slot="label">Status</span>

									${
			guard(Object.keys(MATERIAL_STATUS_INFO), () =>
				Object.entries(MATERIAL_STATUS_INFO).map(([key, value]) =>
					html`
										<option value="${key}">${value.icon} ${value.name}</option>
									`
				))
		}
								</sdr-select>

								<sdr-edit-box id="gameDate" type="month" required ?disabled="${this.isDisplaying}" value="${this.#material.gameDate}" @input="${(evt: Event) =>
			this.#updateInputValue(evt, 'gameDate')}" @change="${(evt: Event) => this.#updateInputValue(evt, 'gameDate')}">
									<span slot="label">Game date</span>
								</sdr-edit-box>

								<sdr-edit-list id="names" ?disabled="${this.isDisplaying}" @itemadded="${(evt: CustomEvent) => this.#addItemToMap(evt, 'names')}">
									<span slot="label">Names published</span>

									<sdr-select slot="input" required>
										${
			guard(Object.keys(MATERIAL_LANGUAGES_INFO), () =>
				Object.entries(MATERIAL_LANGUAGES_INFO).map(([key, value]) =>
					html`
											<option value="${key}">${value.icon} ${value.name}</option>
										`
				))
		}
									</sdr-select>
									<sdr-edit-box slot="input" required placeholder="Name"></sdr-edit-box>

									${
			Object.entries(this.#material.names ?? {}).map(([language, name]) => {
				// @ts-expect-error
				const { name: languageName, icon } = MATERIAL_LANGUAGES_INFO[language];

				return html`
											<sdr-edit-list-item value="${language}">
												<abbr title="${languageName}">${icon}</abbr>:
												${name}
											</sdr-edit-list-item>
										`;
			})
		}
								</sdr-edit-list>

								<sdr-edit-list id="publisher" open ?disabled="${this.isDisplaying}" @itemadded="${(evt: CustomEvent) => this.#addItemToList(evt, 'publisher')}">
									<span slot="label">Publisher</span>
									<sdr-select slot="input" required>
										${
			guard(MATERIAL_PUBLISHERS, () =>
				MATERIAL_PUBLISHERS.map((publisher) =>
					html`
											<option>${publisher}</option>
										`
				))
		}
									</sdr-select>

									${
			this.#material.publisher.map((publisher) =>
				html`
										<sdr-edit-list-item value="${publisher}">
											<abbr title="${publisher}">
												<img alt="${publisher}" src="${this.#getPublisherImageUrl(publisher)}"/>
											</abbr>
										</sdr-edit-list-item>
									`
			)
		}
								</sdr-edit-list>
							</div>
						</sdr-tab-panel>

						<sdr-tab slot="tab">Files & Links</sdr-tab>
						<sdr-tab-panel slot="tabpanel" id="files">
							<sdr-edit-list id="files-list" ?disabled="${this.isDisplaying}" @itemadded="${async () => this.#addFile()}">
								<span slot="label">Files</span>
								<label slot="input">Add a file</label>

								${
			this.#files.map((file) =>
				html`
									<sdr-edit-list-item stretch value="${file.itemId ?? ''}">
										<a href="#" rel="noopener noreferrer" @click="${async (evt: Event) => this.#openFile(evt, file.hash)}">
											${getIconForFile(file.fileExtension ?? file.mimeType ?? '')} ${file.fileName}${file.fileExtension}
										</a>
									</sdr-edit-list-item>
								`
			)
		}
							</sdr-edit-list>

							<sdr-edit-list id="links" ?disabled="${this.isDisplaying}" @itemadded="${(evt: CustomEvent) => this.#addItemToMap(evt, 'links')}">
								<span slot="label">Online links</span>
								<sdr-edit-box slot="input" type="url" id="link-url" placeholder="URL" required></sdr-edit-box>
								<sdr-edit-box slot="input" type="text" id="link-title" placeholder="Name" required></sdr-edit-box>

								${
			Object.entries(this.#material.links ?? {}).map(([url, title]) =>
				html`
									<sdr-edit-list-item stretch value=${url}>
										<a href="${url}" rel="noopener noreferrer" target="_blank">${title}</a>
									</sdr-edit-list-item>
								`
			)
		}
							</sdr-edit-list>
						</sdr-tab-panel>
					</sdr-tabs>
				</div>

				<sdr-button class="edit-button" slot="footer" icon="❌" @click="${() => {
			this.isDisplaying = !this.isDisplaying;
		}}">
					Cancel
				</sdr-button>
				<sdr-button class="display-button" slot="footer" icon="✏️" @click="${() => {
			this.isDisplaying = !this.isDisplaying;
		}}">
					Edit
				</sdr-button>
				<sdr-button class="edit-button" slot="footer" icon="💾" @click="${async () => this.#saveItem()}">
					Save
				</sdr-button>
				<sdr-button class="display-button" slot="footer" icon="📥" @click="${async () => exportDataItem(this.#material)}">
					Export
				</sdr-button>
				<sdr-button class="display-button" slot="footer" icon="📋" @click="${async () => copyItemToClipboard(this.#material)}">
					Copy to clipboard
				</sdr-button>
			</sdr-dialog>
		`;
	}
}

export { SdrViewItemDetails };
