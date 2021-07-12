import type { CustomButton } from '../button/button';
import type { ModalDialog } from '../dialog/dialog';
import type { EditBox } from '../edit-box/edit-box';
import type { EditList } from '../edit-box/edit-list';
import type { EditSelect } from '../edit-box/edit-select';
import type { EditText } from '../edit-box/edit-text';
import type { FileForMaterial, Material } from '../../../../data/data';
import type { EditListItem } from '../edit-box/edit-list-item';
import type { DropArea } from '../drop-area/drop-area';

import { formatFile, formatLink, formatPublisher, formatReleaseDate, formatSku, formatTranslatedName, setCategories, setLanguages, setPublishers, setStatus, setTypes } from './details-template';
import { setMaterialDetails } from './build-details';
import { getMaterial, saveFile } from '../data-operations/idb-persistence';
import { ItemCard } from './item-card';
import { saveNewMaterialInfo } from '../data-operations/create-material';
import { openFile } from '../files-reader/open-file';
import { LOADING_COVER } from '../covers/fetch-covers';
import { associateFileWithData } from '../files-reader/files-reader';

export class ItemDetails extends HTMLElement {
	static get observedAttributes() { return ['id']; }

	#root: ShadowRoot;
	#modal: ModalDialog;
	#editButton: CustomButton;
	#saveButton: CustomButton;

	#isEditing = false;
	#isUpdatingExistingMaterial = false;

	#name: EditBox;
	#sku: EditList;
	#skuInput: HTMLInputElement;
	#edition: EditBox;
	#gameDate: EditBox;
	#category: EditSelect;
	#type: EditSelect;
	#language: EditSelect;
	#releaseDate: EditList;
	#releaseDateInput: HTMLInputElement;
	#publisher: EditList;
	#publisherInput: HTMLSelectElement;
	#status: EditSelect;
	#names: EditList;
	#namesLangInput: HTMLSelectElement;
	#namesValueInput: HTMLInputElement;
	#files: EditList;
	#links: EditList;
	#linksNameInput: HTMLInputElement;
	#linksUrlInput: HTMLInputElement;
	#cover: HTMLImageElement;
	#coverDropArea: DropArea;
	#coverFile: File | undefined;
	#notes: EditText;
	#description: EditText;

	constructor() {
		super();

		const template = document.querySelector('#item-details') as HTMLTemplateElement;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));

		this.#modal = this.#root.querySelector('modal-dialog') as ModalDialog;
		this.#editButton = this.#root.querySelector('#edit') as CustomButton;
		this.#saveButton = this.#root.querySelector('#save') as CustomButton;

		this.#name = this.#root.querySelector('#name') as EditBox;

		this.#sku = this.#root.querySelector('#sku') as EditList;
		this.#skuInput = this.#root.querySelector('#sku input') as HTMLInputElement;

		this.#edition = this.#root.querySelector('#edition') as EditBox;
		this.#gameDate = this.#root.querySelector('#gamedate') as EditBox;

		this.#category = this.#root.querySelector('#category') as EditSelect;
		setCategories(this.#category);

		this.#type = this.#root.querySelector('#type') as EditSelect;
		setTypes(this.#type);

		this.#language = this.#root.querySelector('#language') as EditSelect;
		setLanguages(this.#language);

		this.#releaseDate = this.#root.querySelector('#releasedate') as EditList;
		this.#releaseDateInput = this.#root.querySelector('#releasedate') as HTMLInputElement;

		this.#publisher = this.#root.querySelector('#publisher') as EditList;
		this.#publisherInput = this.#root.querySelector('#publisher select') as HTMLSelectElement;
		setPublishers(this.#publisherInput);

		this.#status = this.#root.querySelector('#status') as EditSelect;
		setStatus(this.#status);

		this.#names = this.#root.querySelector('#names') as EditList;
		this.#namesLangInput = this.#root.querySelector('#names select') as HTMLSelectElement;
		this.#namesValueInput = this.#root.querySelector('#names input') as HTMLInputElement;
		setLanguages(this.#namesLangInput);

		this.#files = this.#root.querySelector('#files-list') as EditList;

		this.#links = this.#root.querySelector('#links') as EditList;
		this.#linksNameInput = this.#root.querySelector('#links input[type="text"]') as HTMLInputElement;
		this.#linksUrlInput = this.#root.querySelector('#links input[type="text"]') as HTMLInputElement;

		this.#cover = this.#root.querySelector('#cover') as HTMLImageElement;
		this.#coverDropArea = this.#root.querySelector('#cover-drop-area') as DropArea;

		this.#notes = this.#root.querySelector('#notes') as EditText;
		this.#description = this.#root.querySelector('#description') as EditText;

		this.#sku.addEventListener('additem', () => {
			const { value } = this.#skuInput;

			this.#sku.insertAdjacentHTML('beforeend', formatSku(value, true));
		});

		this.#releaseDate.addEventListener('additem', () => {
			const { value } = this.#releaseDateInput;

			this.#releaseDate.insertAdjacentHTML('beforeend', formatReleaseDate(value, true));
		});

		this.#publisher.addEventListener('additem', () => {
			const { value } = this.#publisherInput;

			this.#publisher.insertAdjacentHTML('beforeend', formatPublisher(value, true));
		});

		this.#names.addEventListener('additem', () => {
			const { value: lang } = this.#namesLangInput;
			const { value: name } = this.#namesValueInput;

			this.#names.insertAdjacentHTML('beforeend', formatTranslatedName(lang, name, true));
		});

		this.#links.addEventListener('additem', () => {
			const title = this.#linksNameInput.value;
			const url = this.#linksUrlInput.value;

			this.#links.insertAdjacentHTML('beforeend', formatLink({ url, title }, true));
		});

		this.#files.addEventListener('click', async (evt) => {
			const target = evt.target as HTMLLinkElement;

			if (target.matches('a.file-link')) {
				evt.preventDefault();
				evt.stopPropagation();

				const targetParent = target.closest('edit-list-item') as EditListItem;
				const fileInfo = JSON.parse(decodeURI(targetParent.value)) as FileForMaterial;

				await openFile(fileInfo);
			}
		});

		this.#files.addEventListener('additem', async () => {
			if (this.#sku.values.length === 0) {
				// eslint-disable-next-line no-alert
				alert('Please add an SKU first before adding a file.');
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
				this.#files.insertAdjacentHTML('beforeend', formatFile(fileForMaterial));
			}
		});

		this.#coverDropArea.addEventListener('handler', () => {
			this.#coverDropArea.show = false;
			this.#cover.src = LOADING_COVER;

			this.#coverFile = this.#coverDropArea.file as File;
			this.#cover.src = URL.createObjectURL(this.#coverFile);

			this.#coverDropArea.show = true;
		});

		this.#editButton.addEventListener('click', () => {
			this.toggleEdit();
		});

		this.#saveButton.addEventListener('click', async () => {
			this.#saveButton.disabled = true;

			const [id] = this.#sku.values;

			if (id) {
				await saveNewMaterialInfo(id, {
					name: this.#name.value,
					sku: this.#sku.values,
					edition: this.#edition.value,
					gameDate: this.#gameDate.value,
					category: this.#category.value,
					type: this.#type.value,
					originalLanguage: this.#language.value,
					releaseDate: this.#releaseDate.values,
					publisher: this.#publisher.values,
					status: this.#status.value,
					names: this.#names.values,
					notes: this.#notes.value,
					description: this.#description.value,
					files: this.#files.values,
					links: this.#links.values,
					cover: this.#coverFile
				});

				if (!this.#isUpdatingExistingMaterial) {
					ItemCard.createCard({
						name: this.#name.value,
						id,
						sku: this.#sku.values,
						edition: Number.parseInt(this.#edition.value),
						category: this.#category.value as Material['category'],
						type: this.#type.value as Material['type'],
						status: this.#status.value as Material['status']
					});
				}
			}

			this.#saveButton.disabled = false;

			window.history.pushState(null, `${this.#name.value} ● ${import.meta.env.APP_NAME}`, `${import.meta.env.PUBLIC_URL}#${id}${window.location.search}`);
			window.document.title = `${this.#name.value} ● ${import.meta.env.APP_NAME}`;

			// eslint-disable-next-line no-alert
			alert(`Item # ${id} saved successfully.`);
		});

		this.#modal.addEventListener('close', () => {
			window.history.pushState(null, import.meta.env.APP_NAME, `${import.meta.env.PUBLIC_URL}${window.location.search}`);
			window.document.title = import.meta.env.APP_NAME;
		});
	}

	get isEditing() {
		return this.#isEditing;
	}

	set isEditing(isEditing: boolean) {
		this.#isEditing = isEditing;
	}

	attributeChangedCallback() {
		const id = this.getAttribute('id');

		if (id) {
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			this.setMaterial(id);
		} else {
			this.resetMaterial();
		}
	}

	show() {
		this.#modal.show();

		window.history.pushState(null, `New Material ● ${import.meta.env.APP_NAME}${window.location.search}`);
		window.document.title = `New Material ● ${import.meta.env.APP_NAME}`;
	}

	close() {
		this.#modal.close();
	}

	toggleEdit(resetState?: boolean, isNew?: boolean) {
		const editingStatus = resetState ?? !this.isEditing;

		this.isEditing = editingStatus;

		this.#name.edit = editingStatus;
		this.#sku.edit = editingStatus;
		this.#edition.edit = editingStatus;
		this.#gameDate.edit = editingStatus;
		this.#category.edit = editingStatus;
		this.#type.edit = editingStatus;
		this.#language.edit = editingStatus;
		this.#releaseDate.edit = editingStatus;
		this.#publisher.edit = editingStatus;
		this.#status.edit = editingStatus;
		this.#names.edit = editingStatus;
		this.#links.edit = editingStatus;
		this.#files.edit = editingStatus;
		this.#notes.edit = editingStatus;
		this.#description.edit = editingStatus;
		this.#coverDropArea.show = editingStatus;

		if (this.#status.value === '') {
			this.#status.hidden = !editingStatus;
		}

		if (this.#notes.value === '') {
			this.#notes.hidden = !editingStatus;
		}

		if (this.#files.values.length < 1) {
			this.#files.hidden = !editingStatus;
		}

		if (!('showDirectoryPicker' in window)) {
			this.#files.hidden = true;
		}

		if (this.#links.values.length < 1) {
			this.#links.hidden = !editingStatus;
		}

		this.#editButton.hidden = false;
		this.#saveButton.hidden = true;

		if (this.isEditing) {
			this.#editButton.innerText = 'Cancel';
			this.#editButton.icon = '❌';
			this.#saveButton.hidden = false;
		} else {
			this.#editButton.innerText = 'Edit';
			this.#editButton.icon = '✏️';
			this.#saveButton.hidden = true;
		}

		if (isNew === true) {
			this.#editButton.hidden = true;
			this.#saveButton.hidden = false;

			this.#name.loaded = true;
			this.#sku.loaded = true;
			this.#edition.loaded = true;
			this.#gameDate.loaded = true;
			this.#category.loaded = true;
			this.#type.loaded = true;
			this.#language.loaded = true;
			this.#releaseDate.loaded = true;
			this.#publisher.loaded = true;
			this.#status.loaded = true;
			this.#names.loaded = true;
			this.#links.loaded = true;
			this.#notes.loaded = true;
			this.#description.loaded = true;
			this.#coverDropArea.show = true;
		}
	}

	resetMaterial() {
		this.#isUpdatingExistingMaterial = false;

		this.#name.resetValue();
		this.#sku.resetValues();
		this.#edition.resetValue();
		this.#gameDate.resetValue();
		this.#category.resetValue();
		this.#type.resetValue();
		this.#language.resetValue();
		this.#releaseDate.resetValues();
		this.#publisher.resetValues();
		this.#status.resetValue();
		this.#status.hidden = true;
		this.#names.resetValues();
		this.#files.resetValues();
		this.#files.hidden = true;
		this.#files.value = '📄';
		this.#links.resetValues();
		this.#links.hidden = true;
		this.#cover.src = LOADING_COVER;
		this.#coverDropArea.show = false;
		this.#notes.resetValue();
		this.#notes.hidden = true;
		this.#description.resetValue();
	}

	async setMaterial(id: string) {
		this.resetMaterial();
		this.toggleEdit(false);

		const material = await getMaterial(id);

		if (material) {
			this.#isUpdatingExistingMaterial = true;

			window.history.pushState(null, `${material.name} ● ${import.meta.env.APP_NAME}`, `${import.meta.env.PUBLIC_URL}#${id}${window.location.search}`);
			window.document.title = `${material.name} ● ${import.meta.env.APP_NAME}`;

			await setMaterialDetails(material, {
				name: this.#name,
				sku: this.#sku,
				edition: this.#edition,
				gameDate: this.#gameDate,
				category: this.#category,
				type: this.#type,
				language: this.#language,
				releaseDate: this.#releaseDate,
				publisher: this.#publisher,
				status: this.#status,
				names: this.#names,
				links: this.#links,
				files: this.#files,
				cover: this.#cover,
				notes: this.#notes,
				description: this.#description
			});
		}
	}

	static async openMaterialModal(id?: string) {
		let modal = document.querySelector<ItemDetails>('item-details');

		if (!modal) {
			modal = document.createElement('item-details') as ItemDetails;

			document.body.appendChild(modal);
		}

		modal.show();

		if (id) {
			await modal.setMaterial(id);
		} else {
			modal.resetMaterial();
			modal.toggleEdit(true, true);
		}
	}
}

customElements.define('item-details', ItemDetails);
