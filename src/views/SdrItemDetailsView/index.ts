import type { RouteLocation, RouterView } from '../../router/router';

import type { FileForMaterial, IsoCode, Material, MaterialCategory, MaterialEdition, MaterialStatus, MaterialType } from '../../data/data';
import type { SdrEditBox } from '../../components/SdrEditBox';
import type { SdrSelect } from '../../components/SdrSelect';
import type { SdrTextArea } from '../../components/SdrTextArea';
import type { SdrEditList } from '../../components/SdrEditList';

import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { guard } from 'lit/directives/guard.js';

import { Router } from '../../router/router';
import { getIDBItem, getIDBItemByIndex, getIDBItemsByIndex } from '../../js/data/idb-persistence';
import { openFile } from '../../js/files/file-open';
import { getCoverUrl, LOADING_COVER } from '../../js/covers/cover-fetch';
import { saveFile } from '../../js/files/file-import';
import { exportDataItem } from '../../js/data/data-export';
import { getIconForFile } from '../../js/files/file-icons';
import { I18n } from '../../js/intl/translations';
import { formatFullDate } from '../../js/intl/formatting';
import { parseMaterial, saveNewMaterialInfo } from '../../js/data/data-import';
import { MATERIAL_CATEGORY_INFO, MATERIAL_LANGUAGES_INFO, MATERIAL_PUBLISHERS, MATERIAL_STATUS_INFO, MATERIAL_TYPE_INFO } from '../../data/constants';
import { SdrCard } from '../../components/SdrCard';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-view-item-details')
export class SdrViewItemDetails extends LitElement implements RouterView {
	static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static readonly styles = unsafeCSS(style);

	@property({ type: Boolean, reflect: true, attribute: 'disabled' }) declare isDisplaying: boolean;

	@state() private declare open: boolean;
	@state({ hasChanged: (value, oldValue) => JSON.stringify(oldValue) !== JSON.stringify(value) }) private declare material: Material;
	@state() private declare files: FileForMaterial[];
	@state() private declare coverUrl: string;

	#coverFile: File | undefined;

	constructor() {
		super();

		this.resetMaterial();

		// TODO: add gamepad navigation
	}

	#updateInputValue(evt: Event, prop: 'category' | 'type' | 'name' | 'description' | 'edition' | 'gameDate' | 'status' | 'originalLanguage' | 'notes') {
		const target = evt.target as SdrEditBox | SdrSelect | SdrTextArea;

		this.material[prop] = (prop === 'edition' ? Number.parseInt(target.value) : target.value) as never;
	}

	#addItemToList(evt: CustomEvent, list: 'sku' | 'publisher' | 'releaseDate') {
		const target = evt.target as SdrEditList;
		const input = target.querySelector('sdr-edit-box, sdr-select') as SdrEditBox | SdrSelect;

		let validationMessage = '';

		if (this.material[list]?.includes(input.value as never)) {
			validationMessage = I18n.t`Item already exists in the list.`;
		} else if (input.value === '') {
			validationMessage = I18n.t`Please fill the field.`;
		}

		input.setCustomValidity(validationMessage);

		const isValid = input.reportValidity();

		if (isValid) {
			this.material[list]?.push(input.value as never);

			this.requestUpdate('material');
		}
	}

	#addItemToMap(evt: CustomEvent, map: 'names' | 'links') {
		const target = evt.target as SdrEditList;
		const [key, input] = target.querySelectorAll('sdr-edit-box, sdr-select');

		// @ts-expect-error
		const mapToAddItems = this.material[map]?.[key.value];

		if (mapToAddItems !== undefined) {
			key.setCustomValidity(I18n.t`Item already exists in the list.`);
		} else if (key.value === '') {
			key.setCustomValidity(I18n.t`Please fill the field.`);
		}

		if (input.value === '') {
			input.setCustomValidity(I18n.t`Please fill the field.`);
		}

		const isValid = key.reportValidity() && input.reportValidity();

		if (isValid) {
			this.material[map] = {
				...(this.material[map] ?? {}),
				[key.value]: input.value
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
		const list = this.material[target.id] as string[] | Record<string, string>;

		if (Array.isArray(list)) {
			list.splice(list.indexOf(removedItem), 1);
		} else {
			// @ts-expect-error
			this.material[target.id] = Object.fromEntries(Object.entries(list).filter(([key]) => key !== removedItem));
		}

		this.requestUpdate('material');
	}

	#addCover(evt: CustomEvent) {
		const file = evt.detail.file as File;

		this.coverUrl = LOADING_COVER;
		this.coverUrl = URL.createObjectURL(file);
	}

	async #addFile() {
		if (this.material.sku.length > 0) {
			const [handler] = await window.showOpenFilePicker({
				id: 'newMaterialFile',
				startIn: 'downloads',
				excludeAcceptAllOption: false
			});

			const fileForMaterial = await saveFile(handler);

			this.files.push(fileForMaterial);

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
		const [id] = this.material.sku;

		if (id) {
			this.isDisplaying = true;

			await saveNewMaterialInfo(id, {
				...this.material,
				cover: this.#coverFile,
				files: this.files
			});

			if (!document.querySelector(`sdr-card[id="${id}"]`)) {
				const card = new SdrCard({
					name: this.material.name,
					id,
					sku: this.material.sku,
					edition: this.material.edition,
					category: this.material.category,
					type: this.material.type,
					status: this.material.status
				});

				document.querySelector('main')?.append(card);
			}

			// eslint-disable-next-line no-alert
			alert(`${I18n.t`Item #`} ${id} ${I18n.t`saved successfully.`}`);
		}
	}

	#close() {
		this.open = false;

		void Router.navigate('/');
	}

	async navigate(destination: RouteLocation<'/item/:id'>) {
		let title = I18n.t`New Material`;

		if (destination.params.id) {
			this.resetMaterial();
			await this.setMaterial(destination.params.id);

			title = this.material.name;
		}

		if ('launchQueue' in window) {
			window.launchQueue.setConsumer(async (launchParams) => {
				this.resetMaterial();

				for await (const fileReference of launchParams.files) {
					if (fileReference.kind === 'file') {
						try {
							const file = await (fileReference as FileSystemFileHandle).getFile();
							const textContent = await file.text();
							const jsonContent = JSON.parse(textContent) as Partial<Material>;

							this.material = parseMaterial(jsonContent);

							break;
						} catch (error) {
							console.error(error);
						}
					}
				}
			});
		}

		this.open = true;

		return title;
	}

	resetMaterial() {
		this.isDisplaying = false;

		this.material = {
			category: '' as MaterialCategory,
			type: '' as MaterialType,
			sku: [],
			name: '',
			names: {},
			description: '',
			edition: 0 as MaterialEdition,
			publisher: [],
			gameDate: '' as `${number}-${number}`,
			releaseDate: [],
			status: '' as MaterialStatus,
			originalLanguage: '' as IsoCode,
			notes: '',
			links: {}
		};

		this.files = [];

		this.coverUrl = LOADING_COVER;
	}

	async setMaterial(id: string) {
		const material = await getIDBItem('items', id);

		if (material) {
			this.isDisplaying = true;

			this.material = material;

			void getCoverUrl(material.sku[0]).then((coverUrl) => {
				this.coverUrl = coverUrl;
			});

			void getIDBItemsByIndex('files', 'itemId', material.sku[0]).then((fileList) => {
				for (const file of fileList) {
					this.files.push(file);
				}
			});
		}
	}

	firstUpdated(changedProperties: Map<string, unknown>) {
		super.firstUpdated(changedProperties);

		this.renderRoot.querySelectorAll('sdr-edit-list').forEach((list) => {
			list.addEventListener('itemremoved', (evt) => {
				this.#removeListItem(evt);
			});
		});
	}

	createRenderRoot() {
		return this;
	}

	render() {
		return html`
			<style>${SdrViewItemDetails.styles}</style>
			<sdr-dialog ?open="${this.open}" @close="${() => this.#close()}">
				<sdr-edit-box slot="title" ?disabled="${this.isDisplaying}" value="${this.material.name}" @input="${(evt: Event) => this.#updateInputValue(evt, 'name')}" @change="${(evt: Event) => this.#updateInputValue(evt, 'name')}"></sdr-edit-box>

				<div id="item-content">
					<sdr-drop-area id="cover-drop-area" ?disabled="${this.isDisplaying}" @dropfile="${(evt: CustomEvent) => this.#addCover(evt)}">
						<figure>
							<img width="100" height="160" id="cover" decoding="async" loading="lazy" role="presentation" src="${this.coverUrl}" />
						</figure>
					</sdr-drop-area>

					<sdr-tabs id="item-details-tabs">
						<sdr-tab slot="tab">$t{Description}</sdr-tab>
						<sdr-tab-panel slot="tabpanel">
							<sdr-textarea id="notes" ?disabled="${this.isDisplaying}" ?hidden="${!this.material.notes}" value="${this.material.notes ?? ''}" @input="${(evt: Event) => this.#updateInputValue(evt, 'notes')}" @change="${(evt: Event) => this.#updateInputValue(evt, 'notes')}">
								<span slot="label">$t{Notes}</span>
							</sdr-textarea>

							<sdr-textarea id="description" required ?disabled="${this.isDisplaying}" value="${this.material.description}" @input="${(evt: Event) => this.#updateInputValue(evt, 'description')}" @change="${(evt: Event) => this.#updateInputValue(evt, 'description')}">
								<span slot="label">$t{Description}</span>
							</sdr-textarea>
						</sdr-tab-panel>

						<sdr-tab slot="tab">$t{Info}</sdr-tab>
						<sdr-tab-panel slot="tabpanel">
							<div id="item-info">
								<sdr-edit-list id="sku" open ?disabled="${this.isDisplaying}" @itemadded="${(evt: CustomEvent) => this.#addItemToList(evt, 'sku')}">
									<span slot="label">$t{SKU}</span>
									<sdr-edit-box slot="input" pattern="^[A-Z0-9](?:-?[A-Z0-9])+$" required></sdr-edit-box>

									${this.material.sku.map((sku) => html`
										<sdr-edit-list-item value="${sku}">${sku}</sdr-edit-list-item>
									`)}
								</sdr-edit-list>

								<sdr-edit-box type="number" min="1" max="6" step="1" required ?disabled="${this.isDisplaying}" value="${this.material.edition}" @input="${(evt: Event) => this.#updateInputValue(evt, 'edition')}" @change="${(evt: Event) => this.#updateInputValue(evt, 'edition')}">
									<span slot="label">$t{Edition}</span>
								</sdr-edit-box>

								<sdr-select id="category" required ?disabled="${this.isDisplaying}" value="${this.material.category}" @input="${(evt: Event) => this.#updateInputValue(evt, 'category')}" @change="${(evt: Event) => this.#updateInputValue(evt, 'category')}">
									<span slot="label">$t{Category}</span>

									${guard(Object.keys(MATERIAL_CATEGORY_INFO), () => Object.entries(MATERIAL_CATEGORY_INFO).map(([key, value]) => html`
										<option value="${key}">${value.icon} ${value.name}</option>
									`))}
								</sdr-select>

								<sdr-select id="type" required ?disabled="${this.isDisplaying}" value="${this.material.type}" @input="${(evt: Event) => this.#updateInputValue(evt, 'type')}" @change="${(evt: Event) => this.#updateInputValue(evt, 'type')}">
									<span slot="label">$t{Type}</span>

									${guard(Object.keys(MATERIAL_TYPE_INFO), () => Object.entries(MATERIAL_TYPE_INFO).map(([key, value]) => html`
										<option value="${key}">${value.icon} ${value.name}</option>
									`))}
								</sdr-select>

								<sdr-select id="originalLanguage" required ?disabled="${this.isDisplaying}" value="${this.material.originalLanguage}" @input="${(evt: Event) => this.#updateInputValue(evt, 'originalLanguage')}" @change="${(evt: Event) => this.#updateInputValue(evt, 'originalLanguage')}">
									<span slot="label">$t{Original Language}</span>

									${guard(Object.keys(MATERIAL_LANGUAGES_INFO), () => Object.entries(MATERIAL_LANGUAGES_INFO).map(([key, value]) => html`
										<option value="${key}">${value.icon} ${value.name}</option>
									`))}
								</sdr-select>

								<sdr-edit-list id="releaseDate" open ?disabled="${this.isDisplaying}" @itemadded="${(evt: CustomEvent) => this.#addItemToList(evt, 'releaseDate')}">
									<span slot="label">$t{Release date}</span>
									<sdr-edit-box slot="input" type="date" required></sdr-edit-box>

									${this.material.releaseDate?.map((releaseDate) => html`
										<sdr-edit-list-item value="${releaseDate}">${formatFullDate(new Date(releaseDate))}</sdr-edit-list-item>
									`)}
								</sdr-edit-list>

								<sdr-select id="status" required ?disabled="${this.isDisplaying}" value="${this.material.status}" @input="${(evt: Event) => this.#updateInputValue(evt, 'status')}" @change="${(evt: Event) => this.#updateInputValue(evt, 'status')}">
									<span slot="label">$t{Status}</span>

									${guard(Object.keys(MATERIAL_STATUS_INFO), () => Object.entries(MATERIAL_STATUS_INFO).map(([key, value]) => html`
										<option value="${key}">${value.icon} ${value.name}</option>
									`))}
								</sdr-select>

								<sdr-edit-box id="gameDate" type="month" required ?disabled="${this.isDisplaying}" value="${this.material.gameDate}" @input="${(evt: Event) => this.#updateInputValue(evt, 'gameDate')}" @change="${(evt: Event) => this.#updateInputValue(evt, 'gameDate')}">
									<span slot="label">$t{Game date}</span>
								</sdr-edit-box>

								<sdr-edit-list id="names" ?disabled="${this.isDisplaying}" @itemadded="${(evt: CustomEvent) => this.#addItemToMap(evt, 'names')}">
									<span slot="label">$t{Names published}</span>

									<sdr-select slot="input" required>
										${guard(Object.keys(MATERIAL_LANGUAGES_INFO), () => Object.entries(MATERIAL_LANGUAGES_INFO).map(([key, value]) => html`
											<option value="${key}">${value.icon} ${value.name}</option>
										`))}
									</sdr-select>
									<sdr-edit-box slot="input" required placeholder="$t{Name}"></sdr-edit-box>

									${Object.entries(this.material.names ?? {}).map(([language, name]) => {
										// @ts-expect-error
										const { name: languageName, icon } = MATERIAL_LANGUAGES_INFO[language];

										return html`
											<sdr-edit-list-item value="${language}">
												<abbr title="${languageName}">${icon}</abbr>:
												${name}
											</sdr-edit-list-item>
										`;
									})}
								</sdr-edit-list>

								<sdr-edit-list id="publisher" open ?disabled="${this.isDisplaying}" @itemadded="${(evt: CustomEvent) => this.#addItemToList(evt, 'publisher')}">
									<span slot="label">$t{Publisher}</span>
									<sdr-select slot="input" required>
										${guard(MATERIAL_PUBLISHERS, () => MATERIAL_PUBLISHERS.map((publisher) => html`
											<option>${publisher}</option>
										`))}
									</sdr-select>

									${this.material.publisher.map((publisher) => html`
										<sdr-edit-list-item value="${publisher}">
											<abbr title="${publisher}">
												<img alt="${publisher}" src="${import.meta.env.BASE_URL}images/publishers/${publisher}.png"/>
											</abbr>
										</sdr-edit-list-item>
									`)}
								</sdr-edit-list>
							</div>
						</sdr-tab-panel>

						<sdr-tab slot="tab">$t{Files & Links}</sdr-tab>
						<sdr-tab-panel slot="tabpanel" id="files">
							<sdr-edit-list id="files-list" ?disabled="${this.isDisplaying}" @itemadded="${async () => this.#addFile()}">
								<span slot="label">$t{Files}</span>
								<label slot="input">$t{Add a file}</label>

								${this.files.map((file) => html`
									<sdr-edit-list-item stretch value="${file.itemId ?? ''}">
										<a href="#" rel="noopener noreferrer" @click="${async (evt: Event) => this.#openFile(evt, file.hash)}">
											${getIconForFile(file.fileExtension ?? file.mimeType ?? '')} ${file.fileName}${file.fileExtension}
										</a>
									</sdr-edit-list-item>
								`)}
							</sdr-edit-list>

							<sdr-edit-list id="links" ?disabled="${this.isDisplaying}" @itemadded="${(evt: CustomEvent) => this.#addItemToMap(evt, 'links')}">
								<span slot="label">$t{Online links}</span>
								<sdr-edit-box slot="input" type="url" id="link-url" placeholder="$t{URL}" required></sdr-edit-box>
								<sdr-edit-box slot="input" type="text" id="link-title" placeholder="$t{Name}" required></sdr-edit-box>

								${Object.entries(this.material.links ?? {}).map(([url, title]) => html`
									<sdr-edit-list-item stretch value=${url}>
										<a href="${url}" rel="noopener noreferrer" target="_blank">${title}</a>
									</sdr-edit-list-item>
								`)}
							</sdr-edit-list>
						</sdr-tab-panel>
					</sdr-tabs>
				</div>

				<sdr-button id="cancel-button" slot="footer" icon="❌" @click="${() => { this.isDisplaying = !this.isDisplaying; }}">
					$t{Cancel}
				</sdr-button>
				<sdr-button id="edit-button" slot="footer" icon="✏️" @click="${() => { this.isDisplaying = !this.isDisplaying; }}">
					$t{Edit}
				</sdr-button>
				<sdr-button id="save-button" slot="footer" icon="💾" @click="${async () => this.#saveItem()}">
					$t{Save}
				</sdr-button>
				<sdr-button id="export-button" slot="footer" icon="📥" @click="${async () => exportDataItem(this.material)}">
					$t{Export}
				</sdr-button>
			</sdr-dialog>
		`;
	}
}
