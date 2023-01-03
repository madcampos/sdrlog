import type { SdrDialog } from '../dialog/dialog';
import type { FileForMaterial, IsoCode, Material, MaterialStatus } from '../../../public/data/data';
import type { SdrEditListItem } from '../edit-list-item/edit-list-item';
import type { SdrDropArea } from '../drop-area/drop-area';

import { getMaterial, saveFile } from '../../js/data-operations/idb-persistence';
import { SdrCard } from '../item-card/item-card';
import { saveNewMaterialInfo } from '../../js/data-operations/create-material';
import { openFile } from '../../js/files-reader/open-file';
import { LOADING_COVER } from '../../js/covers/fetch-covers';
import { associateFileWithData } from '../../js/files-reader/files-reader';
import { exportDataItem } from '../../js/data-operations/data-export';
import { I18n } from '../../js/intl/translations';
import { SdrComponent } from '../base/BaseComponent';

import template from './template.html?raw';
import style from './style.css?raw';

const watchedAttributes = ['id', 'edit', 'name', 'description', 'sku', 'edition', 'game-date', 'category', 'type', 'original-language', 'release-date', 'publisher', 'status', 'names', 'files', 'links', 'notes'];

export interface SdrItemDetails {
	id: string,
	edit: boolean,
	name: string,
	description: string,
	sku: string[],
	edition: string,
	gameDate: string,
	category: string,
	type: string,
	originalLanguage: string,
	releaseDate: string[],
	publisher: string,
	status: string,
	names: string[],
	files: FileForMaterial[],
	links: string[],
	notes: string
}

export class SdrItemDetails extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }

	#modal: SdrDialog;

	#cover: HTMLImageElement;
	#coverDropArea: SdrDropArea;
	#coverFile: File | undefined;

	constructor() {
		super({
			name: 'sdr-item-details',
			watchedAttributes,
			props: [
				{ name: 'id', value: '', attributeName: 'id' },
				{ name: 'edit', value: false, attributeName: 'edit' },
				{ name: 'name', value: '' },
				{ name: 'description', value: '' },
				{ name: 'sku', value: [] },
				{ name: 'edition', value: '' },
				{ name: 'gameDate', value: '' },
				{ name: 'category', value: '' },
				{ name: 'type', value: '' },
				{ name: 'originalLanguage', value: '' },
				{ name: 'releaseDate', value: [] },
				{ name: 'publisher', value: '' },
				{ name: 'status', value: '' },
				{ name: 'names', value: [] },
				{ name: 'files', value: [] },
				{ name: 'links', value: [] },
				{ name: 'notes', value: '' }
			],
			handlers: {
				addSku: () => {
					// FormatSku(this.#editInputs.sku.value);
				},
				addReleaseDate: () => {
					// FormatReleaseDate(this.#editInputs.releaseDate.value);
				},
				addPublisher: () => {
					// FormatPublisher(evt?.target.value);
				},
				addName: () => {
					// FormatTranslatedName(this.#editInputs.namesLang.value, this.#editInputs.namesValue.value);
				},
				addLink: () => {
					// FormatLink(this.#editInputs.linksName.value, this.#editInputs.linksUrl.value);
				},
				addFile: async () => {
					if (this.sku.length === 0) {
						// eslint-disable-next-line no-alert
						alert(I18n.t`Please add an SKU first before adding a file.`);
					} else {
						const [handle] = await window.showOpenFilePicker({
							// @ts-expect-error
							id: 'newMaterialFile',
							startIn: 'downloads',
							excludeAcceptAllOption: false
						});

						const file = await handle.getFile();
						const fileForMaterial = await associateFileWithData(handle.name, `/${file.lastModified}/${file.name}`, file.type) as FileForMaterial;

						await saveFile(`/${handle.name}`, handle);
						// This.#formFields.files.insertAdjacentHTML('beforeend', formatFile(fileForMaterial));
					}
				},
				addCover: () => {
					this.#coverDropArea.isAcceptingFiles = false;
					this.#cover.src = LOADING_COVER;

					this.#coverFile = this.#coverDropArea.file as File;
					this.#cover.src = URL.createObjectURL(this.#coverFile);

					this.#coverDropArea.isAcceptingFiles = true;
				},
				save: async () => {
					const [id] = this.sku;

					if (id) {
						await saveNewMaterialInfo(id, {
							name: this.name,
							description: this.description,
							sku: this.sku,
							edition: this.edition,
							gameDate: this.gameDate as `${number}-${number}`,
							category: this.category as Material['category'],
							type: this.type as Material['type'],
							originalLanguage: this.originalLanguage as IsoCode,
							releaseDate: this.releaseDate as `${number}-${number}-${number}`[],
							publisher: this.publisher as unknown as Material['publisher'],
							status: this.status as MaterialStatus,
							names: this.names,
							files: this.files as unknown as string[],
							links: this.links,
							notes: this.notes,
							cover: this.#coverFile
						});

						if (!document.querySelector(`item-card[id="${id}"]`)) {
							SdrCard.createCard({
								name: this.name,
								id,
								sku: this.sku,
								edition: Number.parseInt(this.edition),
								category: this.category as Material['category'],
								type: this.type as Material['type'],
								status: this.status as Material['status']
							});
						}
					}

					window.history.pushState(null, `${this.name} · ${import.meta.env.APP_NAME}`, `${import.meta.env.APP_PUBLIC_URL}${window.location.search}#${id}`);
					window.document.title = `${this.name} · ${import.meta.env.APP_NAME}`;

					this.edit = false;

					// eslint-disable-next-line no-alert
					alert(`${I18n.t`Item # `}${id}${I18n.t` saved successfully.`}`);
				},
				'export': async () => {
					await exportDataItem({
						name: this.name,
						sku: this.sku,
						edition: this.edition,
						gameDate: this.gameDate as `${number}-${number}`,
						category: this.category as Material['category'],
						type: this.type as Material['type'],
						originalLanguage: this.originalLanguage as IsoCode,
						releaseDate: this.releaseDate as `${number}-${number}-${number}`[],
						publisher: this.publisher as unknown as Material['publisher'],
						status: this.status as MaterialStatus,
						names: this.names,
						files: this.files as unknown as string[],
						links: this.links,
						notes: this.notes,
						description: this.description
					});
				},
				edit: () => {
					this.edit = !this.edit;
				},
				openFile: async (evt) => {
					const target = evt.target as HTMLLinkElement;

					if (target.matches('a.file-link')) {
						evt.preventDefault();
						evt.stopPropagation();

						const targetParent = target.closest('edit-list-item') as SdrEditListItem;
						const fileInfo = JSON.parse(decodeURI(targetParent.value)) as FileForMaterial;

						await openFile(fileInfo);
					}
				}
			},
			template,
			style
		});

		this.#modal = this.root.querySelector('sdr-dialog') as SdrDialog;

		this.#cover = this.root.querySelector('#cover') as HTMLImageElement;
		this.#coverDropArea = this.root.querySelector('#cover-drop-area') as SdrDropArea;

		this.#modal.addEventListener('close', () => {
			window.history.pushState(null, import.meta.env.APP_NAME, `${import.meta.env.APP_PUBLIC_URL}${window.location.search}`);
			window.document.title = import.meta.env.APP_NAME;
		});
	}

	show(title = I18n.t`New Material`, id?: string) {
		let hash = '';

		if (id) {
			hash = `#${id}`;
		}

		this.#modal.show();
		this.setAttribute('open', '');

		window.history.pushState(null, `${title} · ${import.meta.env.APP_NAME}`, `${import.meta.env.APP_PUBLIC_URL}${window.location.search}${hash}`);
		window.document.title = `${title} · ${import.meta.env.APP_NAME}`;
	}

	close() {
		this.#modal.close();
		this.removeAttribute('open');
	}

	resetMaterial() {
		this.edit = false;
		// This.#formFields.files.value = '📄';

		this.#cover.src = LOADING_COVER;
	}

	async setMaterial(id: string) {
		this.resetMaterial();
		this.edit = false;

		const material = await getMaterial(id);

		if (material) {
			this.name = material.name;
			this.sku = material.sku;
			this.edition = material.edition.toString();
			this.gameDate = material.gameDate ?? '';
			this.category = material.category;
			this.type = material.type;
			this.originalLanguage = material.originalLanguage;
			this.releaseDate = material.releaseDate ?? [];
			this.publisher = material.publisher.join();
			this.status = material.status ?? 'OK';
			this.names = Object.values(material.names ?? {});
			// This.links = material.links;
			this.notes = material.notes ?? '';
			this.description = material.description;

			// Void fetchCover(material.sku[0]).then((coverFile) => {
			// 	If (coverFile) {
			// 		Cover.src = URL.createObjectURL(coverFile);
			// 	} else {
			// 		Cover.src = FALLBACK_COVER;
			// 	}
			// });

			// Void getFilesForMaterial(material.sku[0]).then((fileList) => {
			// 	If (fileList) {
			// 		For (const file of fileList) {
			// 			Files.insertAdjacentHTML('beforeend', formatFile(file));
			// 		}

			// 		If (fileList.length > 0) {
			// 			Files.hidden = false;
			// 		}
			// 	}

			// 	Files.loaded = true;
			// });
		}
	}

	static async openMaterialModal(id?: string, title?: string) {
		let modal = document.querySelector<SdrItemDetails>('item-details');

		if (!modal) {
			modal = document.createElement('item-details') as SdrItemDetails;

			document.body.appendChild(modal);
		}

		modal.show(title, id);

		if (id) {
			await modal.setMaterial(id);
		} else {
			modal.resetMaterial();
			modal.edit = true;
		}
	}
}

customElements.define('sdr-item-details', SdrItemDetails);
