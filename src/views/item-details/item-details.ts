/* eslint-disable max-lines */

import { SdrDialog } from '../../components/dialog/dialog';
import type { FileForMaterial, IsoCode, Material, MaterialLink, MaterialStatus } from '../../data/data';
import { SdrEditListItem } from '../../components/edit-list-item/edit-list-item';
import type { SdrDropArea } from '../../components/drop-area/drop-area';
import type { SdrEditBox } from '../../components/edit-box/edit-box';
import type { SdrSelect } from '../../components/edit-select/edit-select';
import type { SdrTextArea } from '../../components/edit-textarea/edit-textarea';

import { getFilesForMaterial, getMaterial, saveFile } from '../../js/data-operations/idb-persistence';
import { SdrCard } from '../../components/item-card/item-card';
import { getIconForFile, saveNewMaterialInfo } from '../../js/data-operations/create-material';
import { openFile } from '../../js/files-reader/open-file';
import { FALLBACK_COVER, fetchCover, LOADING_COVER } from '../../js/covers/fetch-covers';
import { associateFileWithData } from '../../js/files-reader/files-reader';
import { exportDataItem } from '../../js/data-operations/data-export';
import { I18n } from '../../js/intl/translations';
import { registerComponent, SdrComponent } from '../../components/base/BaseComponent';

import template from './template.html?raw' assert { type: 'html' };
import style from './style.css?inline' assert { type: 'css' };
import { formatFullDate } from '../../js/intl/formatting';

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
	category: string,
	type: string,
	originalLanguage: string,
	releaseDate: string,
	releaseDates: string[],
	publisher: string,
	publishers: string[],
	status: string,
	translatedLanguage: string,
	translatedName: string,
	translatedNames: [string, string][],
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
					const publisherImage = document.createElement('img');

					newPublisher.setAttribute('value', this.publisher);

					publisherImage.src = `${import.meta.env.APP_PUBLIC_URL}images/publishers/${this.publisher}.png`;
					publisherImage.alt = this.publisher;

					newPublisher.appendChild(publisherImage);
					this.root.querySelector('#publisher-list')?.appendChild(newPublisher);

					this.publishers.push(this.publisher);
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
					const translatedNameData = JSON.stringify([
						this.translatedLanguage,
						this.translatedName
					]);

					newTranslatedName.setAttribute('value', translatedNameData);
					newTranslatedName.textContent = `[${this.translatedLanguage}]: ${this.translatedName}`;

					this.root.querySelector('#translated-name-list')?.appendChild(newTranslatedName);

					this.translatedNames.push([
						this.translatedLanguage,
						this.translatedName
					]);

					this.translatedLanguage = '';
					this.translatedName = '';
				},
				removeTranslatedName: (evt) => {
					const name = (evt as CustomEvent).detail.value;

					this.translatedNames.splice(this.translatedNames.indexOf(name), 1);
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
							edition: this.edition,
							gameDate: this.gameDate as `${number}-${number}`,
							category: this.category as Material['category'],
							type: this.type as Material['type'],
							originalLanguage: this.originalLanguage as IsoCode,
							releaseDate: this.releaseDates as `${number}-${number}-${number}`[],
							publisher: this.publishers,
							status: this.status as MaterialStatus,
							names: this.translatedNames,
							files: this.files,
							links: this.links,
							notes: this.notes,
							cover: this.#coverFile
						});

						if (!document.querySelector(`item-card[id="${id}"]`)) {
							SdrCard.createCard({
								name: this.name,
								id,
								sku: this.skus,
								edition: Number.parseInt(this.edition),
								category: this.category as Material['category'],
								type: this.type as Material['type'],
								status: this.status as Material['status']
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
						edition: this.edition,
						gameDate: this.gameDate as `${number}-${number}`,
						category: this.category as Material['category'],
						type: this.type as Material['type'],
						originalLanguage: this.originalLanguage as IsoCode,
						releaseDate: this.releaseDates as `${number}-${number}-${number}`[],
						publisher: this.publishers,
						status: this.status as MaterialStatus,
						names: this.translatedNames,
						files: this.files,
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

	show(title = I18n.t`New Material`, id?: string) {
		let hash = '';

		if (id) {
			hash = `#${id}`;
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
		this.isDisplaying = true;
		// This.#formFields.files.value = '📄';

		this.#cover.src = LOADING_COVER;
	}

	async setMaterial(id: string) {
		this.resetMaterial();
		this.isDisplaying = true;

		const material = await getMaterial(id);

		if (material) {
			this.name = material.name;
			this.skus = material.sku;
			this.edition = material.edition.toString();
			this.gameDate = material.gameDate ?? '';
			this.category = material.category;
			this.type = material.type;
			this.originalLanguage = material.originalLanguage;
			this.releaseDates = material.releaseDate ?? [];
			this.publisher = material.publisher.join();
			this.status = material.status ?? 'OK';
			this.translatedNames = Object.entries(material.names ?? {});
			this.links = material.links ?? [];
			this.notes = material.notes ?? '';
			this.description = material.description;

			void fetchCover(material.sku[0]).then((coverFile) => {
				if (coverFile) {
					this.#cover.src = URL.createObjectURL(coverFile);
				} else {
					this.#cover.src = FALLBACK_COVER;
				}
			});

			void getFilesForMaterial(material.sku[0]).then((fileList) => {
				if (fileList) {
					for (const file of fileList) {
						const newFileItem = new SdrEditListItem();
						const fileLink = document.createElement('a');

						newFileItem.value = JSON.stringify(file);
						newFileItem.setAttribute('stretch', '');

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

	// TODO: remove method and merge with updateFromURL
	static checkForMatchingId(idToCheck: string) {
		if (window.location.hash === '#information') {
			return false;
		}

		const id = window.location.hash.replace('#', '');

		return id === idToCheck;
	}

	static updateFromURL(id: string, title: string) {
		let modal = document.querySelector<SdrItemDetails>(SdrItemDetails.elementName);

		if (!modal) {
			modal = document.createElement(SdrItemDetails.elementName) as SdrItemDetails;

			document.body.appendChild(modal);
		}

		modal.show(title, id);
	}

	static async openModal(id?: string, title?: string) {
		let modal = document.querySelector<SdrItemDetails>(SdrItemDetails.elementName);

		if (!modal) {
			modal = document.createElement(SdrItemDetails.elementName) as SdrItemDetails;

			document.body.appendChild(modal);
		}

		modal.show(title, id);

		if (id) {
			await modal.setMaterial(id);
		} else {
			modal.resetMaterial();
			modal.isDisplaying = false;
		}
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
