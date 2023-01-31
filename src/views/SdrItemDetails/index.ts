/* eslint-disable max-lines */

import { SdrDialog } from '../../components/SdrDialog';
import type { FileForMaterial, IsoCode, MaterialCategory, MaterialEdition, MaterialLink, MaterialNames, MaterialPublisher, MaterialStatus, MaterialType } from '../../data/data';
import { SdrEditListItem } from '../../components/SdrEditListItem';
import type { SdrDropArea } from '../../components/SdrDropArea';
import type { SdrEditBox } from '../../components/SdrEditBox';
import type { SdrSelect } from '../../components/SdrSelect';
import type { SdrTextArea } from '../../components/SdrTextArea';

import { getFilesForMaterial, getMaterial, saveFile } from '../../js/data/idb-persistence';
import { SdrCard } from '../../components/SdrCard';
import { openFile } from '../../js/files/file-open';
import { getCoverUrl, LOADING_COVER } from '../../js/covers/cover-fetch';
import { associateFileWithData } from '../../js/files/file-import';
import { exportDataItem } from '../../js/data/data-export';
import { getIconForFile } from '../../js/files/file-icons';
import { I18n } from '../../js/intl/translations';
import { registerComponent, SdrComponent } from '../../components/SdrComponent';

import template from './template.html?raw' assert { type: 'html' };
import style from './style.css?inline' assert { type: 'css' };
import { formatFullDate } from '../../js/intl/formatting';
import { SdrEditList } from '../../components/SdrEditList';
import { saveNewMaterialInfo } from '../../js/data/data-import';

const watchedAttributes = ['id', 'loading', 'disabled'];

export interface SdrItemDetails {
	id: string,
	loading: boolean,
	isDisplaying: boolean,
	name: string,
	description: string,
	sku: string,
	skus: string[],
	edition: string,
	gameDate: string,
	category: MaterialCategory,
	type: MaterialType,
	originalLanguage: string,
	releaseDate: string,
	releaseDates: string[],
	publisher: string,
	publishers: MaterialPublisher[],
	status: MaterialStatus | 'ok',
	translatedLanguage: string,
	translatedName: string,
	translatedNames: MaterialNames,
	files: FileForMaterial[],
	linkUrl: string,
	linkTitle: string,
	links: MaterialLink[],
	notes: string
}

export class SdrItemDetails extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }
	static readonly elementName = 'sdr-item-details';

	#modal: SdrDialog | null;

	#cover: HTMLImageElement;
	#coverDropArea: SdrDropArea;
	#coverFile: File | undefined;

	constructor() {
		super({
			name: SdrItemDetails.elementName,
			watchedAttributes,
			props: [
				{ name: 'id', value: '', attributeName: 'id' },
				{ name: 'loading', value: false, attributeName: 'loading' },
				{ name: 'isDisplaying', value: false, attributeName: 'disabled' },

				{ name: 'name', value: '' },
				{ name: 'description', value: '' },
				{ name: 'edition', value: '' },
				{ name: 'gameDate', value: '' },
				{ name: 'category', value: '' },
				{ name: 'type', value: '' },
				{ name: 'originalLanguage', value: '' },
				{ name: 'status', value: '' },
				{ name: 'notes', value: '' },

				{ name: 'sku', value: '' },
				{ name: 'skus', value: [] },

				{ name: 'releaseDate', value: '' },
				{ name: 'releaseDates', value: [] },

				{ name: 'publisher', value: '' },
				{ name: 'publishers', value: [] },

				{ name: 'translatedLanguage', value: '' },
				{ name: 'translatedName', value: '' },
				{ name: 'translatedNames', value: [] },

				{ name: 'files', value: [] },

				{ name: 'linkUrl', value: '' },
				{ name: 'linkTitle', value: '' },
				{ name: 'links', value: [] }
			],
			handlers: {
				updateInputValue: (evt) => {
					const target = evt.target as SdrEditBox | SdrSelect | SdrTextArea;

					if (this[target.id] !== target.value) {
						this[target.id] = target.value;
					}
				},

				updateSku: (evt) => {
					const target = evt.target as HTMLInputElement;
					let validationMessage = '';

					if (this.skus.includes(target.value)) {
						validationMessage = I18n.t`SKU already exists in the list.`;
					} else if (!target.value) {
						validationMessage = I18n.t`Please fill out the SKU.`;
					}

					target.setCustomValidity(validationMessage);

					const isValid = target.reportValidity();

					if (isValid) {
						this.sku = target.value;
					} else {
						this.sku = '';
					}
				},
				addSku: () => {
					const newSku = new SdrEditListItem();

					newSku.setAttribute('value', this.sku);
					newSku.textContent = this.sku;
					newSku.disabled = this.isDisplaying;

					this.root.querySelector('#sku-list')?.appendChild(newSku);

					this.skus.push(this.sku);
					this.sku = '';
				},
				removeSku: (evt) => {
					const sku = (evt as CustomEvent).detail.value;

					this.skus.splice(this.skus.indexOf(sku), 1);
				},

				updateReleaseDate: (evt) => {
					const target = evt.target as HTMLInputElement;
					let validationMessage = '';

					if (this.releaseDates.includes(target.value)) {
						validationMessage = I18n.t`Release date already exists in the list.`;
					} else if (!target.value) {
						validationMessage = I18n.t`Please fill out the release date.`;
					}

					target.setCustomValidity(validationMessage);

					const isValid = target.reportValidity();

					if (isValid) {
						this.releaseDate = target.value;
					} else {
						this.releaseDate = '';
					}
				},
				addReleaseDate: () => {
					const newReleaseDate = new SdrEditListItem();

					newReleaseDate.setAttribute('value', this.releaseDate);
					newReleaseDate.textContent = formatFullDate(new Date(this.releaseDate));
					newReleaseDate.disabled = this.isDisplaying;

					this.root.querySelector('#release-date-list')?.appendChild(newReleaseDate);

					this.releaseDates.push(this.releaseDate);
					this.releaseDate = '';
				},
				removeReleaseDate: (evt) => {
					const releaseDate = (evt as CustomEvent).detail.value;

					this.releaseDates.splice(this.releaseDates.indexOf(releaseDate), 1);
				},

				updatePublisher: (evt) => {
					const target = evt.target as HTMLSelectElement;
					let validationMessage = '';

					if (!target.value) {
						validationMessage = I18n.t`Please select a publisher.`;
					}

					target.setCustomValidity(validationMessage);

					const isValid = target.reportValidity();

					if (isValid) {
						this.publisher = target.value;
					} else {
						this.publisher = '';
					}
				},
				addPublisher: () => {
					const newPublisher = new SdrEditListItem();

					newPublisher.setAttribute('value', this.publisher);
					newPublisher.disabled = this.isDisplaying;
					newPublisher.innerHTML = `<abbr title="${this.publisher}"><img alt="${this.publisher}" src="${import.meta.env.APP_PUBLIC_URL}images/publishers/${this.publisher}.png"/></abbr>`;

					this.root.querySelector('#publisher-list')?.appendChild(newPublisher);

					this.publishers.push(this.publisher as MaterialPublisher);
					this.publisher = '';
				},
				removePublisher: (evt) => {
					const publisher = (evt as CustomEvent).detail.value;

					this.publishers.splice(this.publishers.indexOf(publisher), 1);
				},

				updateTranslatedName: (evt) => {
					const target = evt.target as HTMLInputElement | HTMLSelectElement;
					let validationMessage = '';

					if (target instanceof HTMLInputElement && !target.value) {
						validationMessage = I18n.t`Please fill out the translated name.`;
					} else if (!target.value) {
						validationMessage = I18n.t`Please select a language.`;
					}

					// TODO: Check if the translated name already exists in the list.

					target.setCustomValidity(validationMessage);

					const isValid = target.reportValidity();

					if (isValid) {
						this.root.querySelector('#translated-name-list')?.setAttribute('value', 'valid-name');

						if (target instanceof HTMLInputElement) {
							this.translatedName = target.value;
						} else {
							this.translatedLanguage = target.value;
						}
					} else {
						this.root.querySelector('#translated-name-list')?.setAttribute('value', '');
					}
				},
				addTranslatedName: () => {
					const newTranslatedName = new SdrEditListItem();

					newTranslatedName.setAttribute('value', this.translatedLanguage);
					newTranslatedName.textContent = `[${this.translatedLanguage}]: ${this.translatedName}`;
					newTranslatedName.disabled = this.isDisplaying;

					this.root.querySelector('#translated-name-list')?.appendChild(newTranslatedName);

					this.translatedNames[this.translatedLanguage] = this.translatedName;

					this.translatedLanguage = '';
					this.translatedName = '';
				},
				removeTranslatedName: (evt) => {
					const language = (evt as CustomEvent).detail.value as IsoCode;

					if (this.translatedNames[language]) {
						// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
						delete this.translatedNames[language];
					}
				},

				updateLink: (evt) => {
					const target = evt.target as HTMLInputElement;
					let validationMessage = '';

					if (target.id === 'link-url' && !target.value) {
						validationMessage = I18n.t`Please fill out the link URL.`;
					} else if (!target.value) {
						validationMessage = I18n.t`Please fill out the link title.`;
					}

					target.setCustomValidity(validationMessage);

					const isValid = target.reportValidity();

					if (isValid) {
						this.root.querySelector('#link-list')?.setAttribute('value', 'valid-link');

						if (target.id === 'link-url') {
							this.linkUrl = target.value;
						} else {
							this.linkTitle = target.value;
						}
					} else {
						this.root.querySelector('#link-list')?.setAttribute('value', '');
					}
				},
				addLink: () => {
					const newLink = new SdrEditListItem();
					const link = document.createElement('a');

					link.href = this.linkUrl;
					link.textContent = this.linkTitle;
					link.rel = 'noopener noreferrer';
					link.target = '_blank';

					newLink.value = JSON.stringify({
						url: this.linkUrl,
						title: this.linkTitle
					});

					newLink.appendChild(link);
					this.root.querySelector('#link-list')?.appendChild(newLink);

					this.links.push({
						url: this.linkUrl,
						title: this.linkTitle
					});

					this.linkUrl = '';
					this.linkTitle = '';
				},
				removeLink: (evt) => {
					const link = (evt as CustomEvent).detail.value;

					this.links.splice(this.links.indexOf(link), 1);
				},

				addFile: async () => {
					if (this.skus.length === 0) {
						// eslint-disable-next-line no-alert
						alert(I18n.t`Please add an SKU first before adding a file.`);
					} else {
						const [handle] = await window.showOpenFilePicker({
							id: 'newMaterialFile',
							startIn: 'downloads',
							excludeAcceptAllOption: false
						});

						const file = await handle.getFile();
						const fileForMaterial = await associateFileWithData(handle.name, `/${file.lastModified}/${file.name}`, file.type) as FileForMaterial;

						await saveFile(`/${handle.name}`, handle);

						const newFileItem = new SdrEditListItem();
						const fileLink = document.createElement('a');

						newFileItem.value = JSON.stringify(fileForMaterial);
						newFileItem.setAttribute('stretch', '');

						fileLink.href = '#';
						fileLink.classList.add('file-link');
						fileLink.textContent = `${getIconForFile(fileForMaterial.mimeType, fileForMaterial.fileExtension)} ${fileForMaterial.fileName}${fileForMaterial.fileExtension}`;

						newFileItem.appendChild(fileLink);
						this.root.querySelector('#files-list')?.appendChild(newFileItem);

						this.files.push(fileForMaterial);
					}
				},
				removeFile: (evt) => {
					const file = (evt as CustomEvent).detail.value;

					this.files.splice(this.files.indexOf(file), 1);
				},

				addCover: () => {
					this.#coverDropArea.disabled = true;
					this.#cover.src = LOADING_COVER;

					this.#coverFile = this.#coverDropArea.file as File;
					this.#cover.src = URL.createObjectURL(this.#coverFile);

					this.#coverDropArea.disabled = false;
				},

				save: async () => {
					const [id] = this.skus;

					if (id) {
						await saveNewMaterialInfo(id, {
							name: this.name,
							description: this.description,
							sku: this.skus,
							edition: Number.parseInt(this.edition) as MaterialEdition,
							gameDate: this.gameDate as `${number}-${number}`,
							category: this.category,
							type: this.type,
							originalLanguage: this.originalLanguage as IsoCode,
							releaseDate: this.releaseDates as `${number}-${number}-${number}`[],
							publisher: this.publishers,
							status: this.status,
							names: this.translatedNames,
							files: this.files,
							links: this.links,
							notes: this.notes,
							cover: this.#coverFile
						});

						if (!document.querySelector(`${SdrCard.elementName}[id="${id}"]`)) {
							SdrCard.createCard({
								name: this.name,
								id,
								sku: this.skus,
								edition: Number.parseInt(this.edition) as MaterialEdition,
								category: this.category,
								type: this.type,
								status: this.status
							});
						}
					}

					window.history.pushState(null, `${this.name} · ${import.meta.env.APP_NAME}`, `${import.meta.env.APP_PUBLIC_URL}${window.location.search}#${id}`);
					window.document.title = `${this.name} · ${import.meta.env.APP_NAME}`;

					this.isDisplaying = true;

					// eslint-disable-next-line no-alert
					alert(`${I18n.t`Item # `}${id}${I18n.t` saved successfully.`}`);
				},
				'export': async () => {
					await exportDataItem({
						name: this.name,
						sku: this.skus,
						edition: Number.parseInt(this.edition) as MaterialEdition,
						gameDate: this.gameDate as `${number}-${number}`,
						category: this.category,
						type: this.type,
						originalLanguage: this.originalLanguage as IsoCode,
						releaseDate: this.releaseDates as `${number}-${number}-${number}`[],
						publisher: this.publishers,
						status: this.status,
						names: this.translatedNames,
						links: this.links,
						notes: this.notes,
						description: this.description
					});
				},
				edit: () => {
					this.isDisplaying = !this.isDisplaying;
				}
			},
			template,
			style
		});

		this.#modal = this.root.querySelector<SdrDialog>(SdrDialog.elementName);

		this.#cover = this.root.querySelector('#cover') as HTMLImageElement;
		this.#coverDropArea = this.root.querySelector('#cover-drop-area') as SdrDropArea;

		this.#modal?.addEventListener('close', () => {
			window.history.pushState(null, import.meta.env.APP_NAME, `${import.meta.env.APP_PUBLIC_URL}${window.location.search}`);
			window.document.title = import.meta.env.APP_NAME;

			this.close();
		});

		this.root.querySelector('#files-list')?.addEventListener('click', async (evt) => {
			const target = evt.target as HTMLLinkElement;

			if (target.matches('a.file-link')) {
				evt.preventDefault();
				evt.stopPropagation();

				const targetParent = target.closest(SdrEditListItem.elementName) as SdrEditListItem;
				const fileInfo = JSON.parse(targetParent.value) as FileForMaterial;

				await openFile(fileInfo);
			}
		});
	}

	show() {
		let hash = '';
		let title = I18n.t`New Material`;

		if (this.id) {
			hash = `#item-${this.id}`;
			title = this.name;
		}

		this.#modal?.show();
		this.setAttribute('open', '');

		window.history.pushState(null, `${title} · ${import.meta.env.APP_NAME}`, `${import.meta.env.APP_PUBLIC_URL}${window.location.search}${hash}`);
		window.document.title = `${title} · ${import.meta.env.APP_NAME}`;
	}

	close() {
		this.#modal?.close();
		this.removeAttribute('open');
	}

	resetMaterial() {
		this.isDisplaying = false;
		this.loading = false;

		this.id = '';
		this.name = '';
		this.sku = '';
		this.skus.length = 0;
		this.edition = '';
		this.gameDate = '';
		this.category = '' as MaterialCategory;
		this.type = '' as MaterialType;
		this.originalLanguage = '';
		this.releaseDate = '';
		this.releaseDates.length = 0;
		this.publisher = '';
		this.publishers.length = 0;
		this.status = '' as MaterialStatus;
		this.translatedLanguage = '';
		this.translatedName = '';
		this.linkTitle = '';
		this.linkUrl = '';
		this.links.length = 0;
		this.notes = '';
		this.description = '';
		this.files.length = 0;

		this.#cover.src = LOADING_COVER;

		[...Object.keys(this.translatedNames)].forEach((key) => {
			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			delete this.translatedNames[key];
		});

		[...this.root.querySelectorAll(SdrEditList.elementName)].forEach((list) => {
			(list as SdrEditList).resetValue();
		});
	}

	async setMaterial(id: string) {
		this.isDisplaying = true;

		const material = await getMaterial(id);

		if (material) {
			this.isDisplaying = true;
			this.loading = false;

			[this.id] = material.sku;
			this.name = material.name;
			this.skus.push(...material.sku);
			this.edition = material.edition.toString();
			this.gameDate = material.gameDate;
			this.category = material.category;
			this.type = material.type;
			this.originalLanguage = material.originalLanguage;
			this.releaseDates.push(...material.releaseDate ?? []);
			this.publishers.push(...material.publisher);
			this.status = material.status;
			this.translatedNames = material.names ?? {};
			this.links.push(...material.links ?? []);
			this.notes = material.notes ?? '';
			this.description = material.description;

			this.skus.forEach((sku) => {
				const newSku = new SdrEditListItem();

				newSku.setAttribute('value', sku);
				newSku.textContent = sku;
				newSku.disabled = this.isDisplaying;

				this.root.querySelector('#sku-list')?.appendChild(newSku);
			});

			this.releaseDates.forEach((releaseDate) => {
				const newReleaseDate = new SdrEditListItem();

				newReleaseDate.setAttribute('value', releaseDate);
				newReleaseDate.textContent = formatFullDate(new Date(releaseDate));
				newReleaseDate.disabled = this.isDisplaying;

				this.root.querySelector('#release-date-list')?.appendChild(newReleaseDate);
			});

			this.publishers.forEach((publisher) => {
				const newPublisher = new SdrEditListItem();

				newPublisher.setAttribute('value', publisher);
				newPublisher.disabled = this.isDisplaying;
				newPublisher.innerHTML = `<abbr title="${publisher}"><img alt="${publisher}" src="${import.meta.env.APP_PUBLIC_URL}images/publishers/${publisher}.png"/></abbr>`;

				this.root.querySelector('#publisher-list')?.appendChild(newPublisher);
			});

			Object.entries(this.translatedNames).forEach(([language, name]) => {
				const newTranslatedName = new SdrEditListItem();

				newTranslatedName.setAttribute('value', language);
				newTranslatedName.textContent = `[${language}]: ${name}`;
				newTranslatedName.disabled = this.isDisplaying;

				this.root.querySelector('#translated-name-list')?.appendChild(newTranslatedName);
			});

			this.links.forEach(({ title, url }) => {
				const newLink = new SdrEditListItem();
				const link = document.createElement('a');

				link.href = url;
				link.textContent = title;
				link.rel = 'noopener noreferrer';
				link.target = '_blank';

				newLink.value = JSON.stringify({ url, title });

				newLink.appendChild(link);
				this.root.querySelector('#link-list')?.appendChild(newLink);
			});

			void getCoverUrl(material.sku[0]).then((coverUrl) => {
				this.#cover.src = coverUrl;
			});

			void getFilesForMaterial(material.sku[0]).then((fileList) => {
				if (fileList) {
					for (const file of fileList) {
						const newFileItem = new SdrEditListItem();
						const fileLink = document.createElement('a');

						newFileItem.value = JSON.stringify(file);
						newFileItem.setAttribute('stretch', '');
						newFileItem.disabled = this.isDisplaying;

						fileLink.href = '#';
						fileLink.classList.add('file-link');
						fileLink.textContent = `${getIconForFile(file.mimeType, file.fileExtension)} ${file.fileName}${file.fileExtension}`;

						newFileItem.appendChild(fileLink);
						this.root.querySelector('#files-list')?.appendChild(newFileItem);

						this.files.push(file);
					}
				}
			});
		}
	}

	static async updateFromURL() {
		let modal = document.querySelector<SdrItemDetails>(SdrItemDetails.elementName);

		if (!modal) {
			modal = document.createElement(SdrItemDetails.elementName) as SdrItemDetails;

			document.body.appendChild(modal);
		}

		modal.resetMaterial();

		if (window.location.hash.startsWith('#item-')) {
			modal.id = window.location.hash.replace('#item-', '');
			await modal.setMaterial(modal.id);
			modal.show();
		}
	}

	static async openModal(id?: string) {
		let modal = document.querySelector<SdrItemDetails>(SdrItemDetails.elementName);

		if (!modal) {
			modal = document.createElement(SdrItemDetails.elementName) as SdrItemDetails;

			document.body.appendChild(modal);
		}

		modal.resetMaterial();
		modal.isDisplaying = false;

		if (id) {
			modal.id = id;
			await modal.setMaterial(modal.id);
		}

		modal.show();
	}

	static closeModal() {
		let modal = document.querySelector<SdrItemDetails>(SdrItemDetails.elementName);

		if (!modal) {
			modal = document.createElement(SdrItemDetails.elementName) as SdrItemDetails;

			document.body.appendChild(modal);
		}

		modal.close();
	}
}

registerComponent(SdrItemDetails);
