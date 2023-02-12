import type { FileForMaterial, IsoCode, Material, MaterialCategory, MaterialEdition, MaterialStatus, MaterialType } from '../../data/data';
import type { SdrEditBox } from '../../components/SdrEditBox';
import type { SdrSelect } from '../../components/SdrSelect';
import type { SdrTextArea } from '../../components/SdrTextArea';
import type { SdrEditList } from '../../components/SdrEditList';

import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { getIDBItem, getIDBItemByIndex, getIDBItemsByIndex } from '../../js/data/idb-persistence';
import { openFile } from '../../js/files/file-open';
import { getCoverUrl, LOADING_COVER } from '../../js/covers/cover-fetch';
import { saveFile } from '../../js/files/file-import';
import { exportDataItem } from '../../js/data/data-export';
import { getIconForFile } from '../../js/files/file-icons';
import { I18n } from '../../js/intl/translations';
import { formatFullDate } from '../../js/intl/formatting';
import { saveNewMaterialInfo } from '../../js/data/data-import';
import { MATERIAL_CATEGORY_INFO, MATERIAL_LANGUAGES_INFO, MATERIAL_PUBLISHERS, MATERIAL_STATUS_INFO, MATERIAL_TYPE_INFO } from '../../data/constants';
import { SdrCard } from '../../components/SdrCard';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-item-details')
export class SdrItemDetails extends LitElement {
	static readonly styles = [unsafeCSS(style)];

	@property({ type: Boolean, reflect: true, attribute: 'disabled' }) declare isDisplaying: boolean;
	@property({ type: Boolean, reflect: true }) declare open: boolean;

	@state({ hasChanged: (value, oldValue) => JSON.stringify(oldValue) !== JSON.stringify(value) }) private declare material: Material;
	@state() private declare files: FileForMaterial[];
	@state() private declare coverUrl: string;

	#coverFile: File | undefined;

	constructor() {
		super();

		this.resetMaterial();
	}

	#updateInputValue(evt: Event) {
		const target = evt.target as SdrEditBox | SdrSelect | SdrTextArea;

		this.material[target.id] = target.value;
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

		if (this.material[map]?.[key.value] !== undefined) {
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

		const list = this.material[target.id];

		if (Array.isArray(list)) {
			this.material[target.id].splice(this.material[target.id].indexOf(removedItem), 1);
		} else {
			this.material[target.id] = Object.fromEntries(Object.entries(this.material[target.id]).filter(([key]) => key !== removedItem));
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

	async #openFile(evt: Event, fileId: string) {
		evt.preventDefault();
		evt.stopPropagation();

		const fileInfo = await getIDBItemByIndex('files', 'itemId', fileId);

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
				SdrCard.createCard({
					name: this.material.name,
					id,
					sku: this.material.sku,
					edition: this.material.edition,
					category: this.material.category,
					type: this.material.type,
					status: this.material.status
				});
			}

			window.history.pushState(null, `${this.material.name} · ${import.meta.env.APP_NAME}`, `${import.meta.env.APP_PUBLIC_URL}${window.location.search}#${id}`);
			window.document.title = `${this.material.name} · ${import.meta.env.APP_NAME}`;

			// eslint-disable-next-line no-alert
			alert(`${I18n.t`Item #`} ${id} ${I18n.t`saved successfully.`}`);
		}
	}

	show() {
		let hash = '';
		let title = I18n.t`New Material`;

		if (this.material.sku[0]) {
			hash = `#item-${this.material.sku[0]}`;
			title = this.material.name;
		}

		this.open = true;

		window.history.pushState(null, `${title} · ${import.meta.env.APP_NAME}`, `${import.meta.env.APP_PUBLIC_URL}${window.location.search}${hash}`);
		window.document.title = `${title} · ${import.meta.env.APP_NAME}`;
	}

	close() {
		this.open = false;

		window.history.pushState(null, import.meta.env.APP_NAME, `${import.meta.env.APP_PUBLIC_URL}${window.location.search}`);
		window.document.title = import.meta.env.APP_NAME;
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

	protected firstUpdated(_changedProperties: Map<PropertyKey, unknown>) {
		super.firstUpdated(_changedProperties);

		this.renderRoot.querySelectorAll('sdr-edit-list').forEach((list) => {
			list.addEventListener('itemremoved', (evt) => {
				this.#removeListItem(evt);
			});
		});

		this.renderRoot.querySelectorAll('sdr-edit-box, sdr-select, sdr-textarea').forEach((editItem) => {
			editItem.addEventListener('input', (evt) => {
				this.#updateInputValue(evt);
			});

			editItem.addEventListener('change', (evt) => {
				this.#updateInputValue(evt);
			});
		});
	}

	render() {
		return html`
			<sdr-dialog ?open="${this.open}" @close="${() => this.close()}">
				<sdr-edit-box id="name" slot="title" ?disabled="${this.isDisplaying}" value="${this.material.name}"></sdr-edit-box>

				<div id="item-content">
					<header>
						<sdr-edit-list id="sku" open ?disabled="${this.isDisplaying}" @itemadded="${(evt: CustomEvent) => this.#addItemToList(evt, 'sku')}">
							<span slot="label">$t{SKU}</span>
							<sdr-edit-box slot="input" pattern="^[A-Z0-9](?:-?[A-Z0-9])+$" required></sdr-edit-box>

							${this.material.sku.map((sku) => html`
								<sdr-edit-list-item value="${sku}">${sku}</sdr-edit-list-item>
							`)}
						</sdr-edit-list>

						<sdr-edit-box id="edition" type="number" min="1" max="6" step="1" required ?disabled="${this.isDisplaying}" value="${this.material.edition}">
							<span slot="label">$t{Edition}</span>
						</sdr-edit-box>

						<sdr-select id="category" required ?disabled="${this.isDisplaying}" value="${this.material.category}">
							<span slot="label">$t{Category}</span>

							${Object.entries(MATERIAL_CATEGORY_INFO).map(([key, value]) => html`
								<option value="${key}">${value.icon} ${value.name}</option>
							`)}
						</sdr-select>

						<sdr-select id="type" required ?disabled="${this.isDisplaying}" value="${this.material.type}">
							<span slot="label">$t{Type}</span>

							${Object.entries(MATERIAL_TYPE_INFO).map(([key, value]) => html`
								<option value="${key}">${value.icon} ${value.name}</option>
							`)}
						</sdr-select>

						<sdr-select id="originalLanguage" required ?disabled="${this.isDisplaying}" value="${this.material.originalLanguage}">
							<span slot="label">$t{Original Language}</span>

							${Object.entries(MATERIAL_LANGUAGES_INFO).map(([key, value]) => html`
								<option value="${key}">${value.icon} ${value.name}</option>
							`)}
						</sdr-select>

						<sdr-edit-list id="releaseDate" open ?disabled="${this.isDisplaying}" @itemadded="${(evt: CustomEvent) => this.#addItemToList(evt, 'releaseDate')}">
							<span slot="label">$t{Release date}</span>
							<sdr-edit-box slot="input" type="date" required></sdr-edit-box>

							${this.material.releaseDate?.map((releaseDate) => html`
								<sdr-edit-list-item value="${releaseDate}">${formatFullDate(new Date(releaseDate))}</sdr-edit-list-item>
							`)}
						</sdr-edit-list>
					</header>

					<aside id="meta">
						<sdr-select id="status" required ?disabled="${this.isDisplaying}" value="${this.material.status}">
							<span slot="label">$t{Status}</span>

							${Object.entries(MATERIAL_STATUS_INFO).map(([key, value]) => html`
								<option value="${key}">${value.icon} ${value.name}</option>
							`)}
						</sdr-select>

						<sdr-edit-box id="gameDate" type="month" required ?disabled="${this.isDisplaying}" value="${this.material.gameDate}">
							<span slot="label">$t{Game date}</span>
						</sdr-edit-box>

						<sdr-edit-list id="names" ?disabled="${this.isDisplaying}" @itemadded="${(evt: CustomEvent) => this.#addItemToMap(evt, 'names')}">
							<span slot="label">$t{Names published}</span>

							<sdr-select slot="input" required>
								${Object.entries(MATERIAL_LANGUAGES_INFO).map(([key, value]) => html`
									<option value="${key}">${value.icon} ${value.name}</option>
								`)}
							</sdr-select>
							<sdr-edit-box slot="input" required placeholder="$t{Name}"></sdr-edit-box>

							${Object.entries(this.material.names ?? {}).map(([language, name]) => html`
								<sdr-edit-list-item value="${language}">
									<abbr title="${MATERIAL_LANGUAGES_INFO[language].name}">${MATERIAL_LANGUAGES_INFO[language].icon}</abbr>:
									${name}
								</sdr-edit-list-item>
							`)}
						</sdr-edit-list>

						<sdr-edit-list id="publisher" open ?disabled="${this.isDisplaying}" @itemadded="${(evt: CustomEvent) => this.#addItemToList(evt, 'publisher')}">
							<span slot="label">$t{Publisher}</span>
							<sdr-select slot="input" required>
								${MATERIAL_PUBLISHERS.map((publisher) => html`<option>${publisher}</option>`)}
							</sdr-select>

							${this.material.publisher.map((publisher) => html`
								<sdr-edit-list-item value="${publisher}">
									<abbr title="${publisher}">
										<img alt="${publisher}" src="${import.meta.env.APP_PUBLIC_URL}images/publishers/${publisher}.png"/>
									</abbr>
								</sdr-edit-list-item>
							`)}
						</sdr-edit-list>
					</aside>

					<aside id="files">
						<sdr-edit-list id="files-list" ?disabled="${this.isDisplaying}" @itemadded="${async () => this.#addFile()}">
							<span slot="label">$t{Files}</span>
							<label slot="input">$t{Add a file}</label>

							${this.files.map((file) => html`
								<sdr-edit-list-item stretch value="${file.itemId ?? ''}">
									<a href="#" rel="noopener noreferrer" @click="${async (evt: Event) => this.#openFile(evt, file.itemId ?? '')}">
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
					</aside>

					<sdr-drop-area id="cover-drop-area" ?disabled="${this.isDisplaying}" @dropfile="${(evt: CustomEvent) => this.#addCover(evt)}">
						<figure>
							<img width="100" height="160" id="cover" decoding="async" loading="lazy" role="presentation" src="${this.coverUrl}" />
						</figure>
					</sdr-drop-area>

					<article>
						<sdr-textarea id="notes" ?disabled="${this.isDisplaying}" value="${this.material.notes ?? ''}">
							<span slot="label">$t{Notes}</span>
						</sdr-textarea>

						<sdr-textarea id="description" required ?disabled="${this.isDisplaying}" value="${this.material.description}">
							<span slot="label">$t{Description}</span>
						</sdr-textarea>
					</article>
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

	private static getModal() {
		let modal = document.querySelector('sdr-item-details');

		if (!modal) {
			modal = document.createElement('sdr-item-details');

			document.body.appendChild(modal);
		}

		return modal;
	}

	static async updateFromURL() {
		const modal = SdrItemDetails.getModal();

		modal.resetMaterial();

		if (window.location.hash.startsWith('#item-')) {
			modal.id = window.location.hash.replace('#item-', '');
			await modal.setMaterial(modal.id);
			modal.show();
		}
	}

	static async openModal(id?: string) {
		const modal = SdrItemDetails.getModal();

		modal.resetMaterial();

		if (id) {
			modal.id = id;
			await modal.setMaterial(modal.id);
		}

		modal.show();
	}

	static closeModal() {
		SdrItemDetails.getModal().close();
	}
}
