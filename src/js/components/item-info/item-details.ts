import type { ModalDialog } from '../dialog/dialog';
import type { EditBox } from '../edit-box/edit-box';
import type { EditList } from '../edit-box/edit-list';
import type { EditSelect } from '../edit-box/edit-select';
import type { EditText } from '../edit-box/edit-text';
import type { IsoCode, Material } from '../../../../data/data';

import detailsTemplate, { formatPublisher, formatReleaseDate, formatSku, formatTranslatedName } from './details-template';
import { setMaterialDetails } from './build-details';
import { getMaterial, saveMaterial } from '../data-operations/idb-persistence';

export class ItemDetails extends HTMLElement {
	static get observedAttributes() { return ['id']; }

	#root: ShadowRoot;
	#modal: ModalDialog;
	#editButton: HTMLButtonElement;
	#saveButton: HTMLButtonElement;

	#isEditing = false;

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
	#linksInput: HTMLInputElement;
	#cover: HTMLImageElement;
	#notes: EditText;
	#description: EditText;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<style>@import "${import.meta.url.replace(/js$/iu, 'css')}";</style>
			${detailsTemplate}
		`;

		this.#modal = this.#root.querySelector('modal-dialog') as ModalDialog;
		this.#editButton = this.#root.querySelector('#edit') as HTMLButtonElement;
		this.#saveButton = this.#root.querySelector('#save') as HTMLButtonElement;

		this.#name = this.#root.querySelector('#name') as EditBox;

		this.#sku = this.#root.querySelector('#sku') as EditList;
		this.#skuInput = this.#root.querySelector('#sku input') as HTMLInputElement;

		this.#edition = this.#root.querySelector('#edition') as EditBox;
		this.#gameDate = this.#root.querySelector('#gamedate') as EditBox;
		this.#category = this.#root.querySelector('#category') as EditSelect;
		this.#type = this.#root.querySelector('#type') as EditSelect;
		this.#language = this.#root.querySelector('#language') as EditSelect;

		this.#releaseDate = this.#root.querySelector('#releasedate') as EditList;
		this.#releaseDateInput = this.#root.querySelector('#releasedate') as HTMLInputElement;

		this.#publisher = this.#root.querySelector('#publisher') as EditList;
		this.#publisherInput = this.#root.querySelector('#publisher select') as HTMLSelectElement;

		this.#status = this.#root.querySelector('#status') as EditSelect;

		this.#names = this.#root.querySelector('#names') as EditList;
		this.#namesLangInput = this.#root.querySelector('#names select') as HTMLSelectElement;
		this.#namesValueInput = this.#root.querySelector('#names input') as HTMLInputElement;

		this.#files = this.#root.querySelector('#files') as EditList;

		this.#links = this.#root.querySelector('#links') as EditList;
		this.#linksInput = this.#root.querySelector('#links') as HTMLInputElement;

		this.#cover = this.#root.querySelector('#cover') as HTMLImageElement;
		this.#notes = this.#root.querySelector('#notes') as EditText;
		this.#description = this.#root.querySelector('#description') as EditText;

		this.#sku.addEventListener('additem', () => {
			const { value } = this.#skuInput;

			this.#sku.insertAdjacentHTML('beforeend', formatSku(value));
		});

		this.#releaseDate.addEventListener('additem', () => {
			const { value } = this.#releaseDateInput;

			this.#releaseDate.insertAdjacentHTML('beforeend', formatReleaseDate(value));
		});

		this.#publisher.addEventListener('additem', () => {
			const { value } = this.#publisherInput;

			this.#publisher.insertAdjacentHTML('beforeend', formatPublisher(value));
		});

		this.#names.addEventListener('additem', () => {
			const { value: lang } = this.#namesLangInput;
			const { value: name } = this.#namesValueInput;

			this.#names.insertAdjacentHTML('beforeend', formatTranslatedName(lang, name));
		});

		this.#links.addEventListener('additem', () => {
			const { value } = this.#linksInput;

			this.#links.insertAdjacentHTML('beforeend', formatReleaseDate(value));
		});

		this.#editButton.addEventListener('click', () => {
			this.toggleEdit();
		});

		this.#saveButton.addEventListener('click', async () => {
			let status: Material['status'] | undefined;
			const names = {};

			if (this.#status.value !== 'ok') {
				status = this.#status.value as Material['status'];
			}

			this.#names.values.forEach((item) => {
				const [lang, name] = item.split(' → ');

				names[lang as IsoCode] = name;
			});

			await saveMaterial(this.id, {
				name: this.#name.value,
				sku: this.#sku.values,
				edition: Number.parseInt(this.#edition.value),
				gameDate: this.#gameDate.value,
				category: this.#category.value as Material['category'],
				type: this.#type.value as Material['type'],
				originalLanguage: this.#language.value as Material['originalLanguage'],
				releaseDate: this.#releaseDate.values,
				publisher: this.#publisher.values,
				status,
				names,
				notes: this.#notes.value,
				description: this.#description.value
			});
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
		this.#notes.edit = editingStatus;
		this.#description.edit = editingStatus;

		if (this.#status.value === '') {
			this.#status.hidden = !editingStatus;
		}

		if (isNew === true) {
			this.#editButton.hidden = true;
		} else {
			this.#editButton.hidden = false;
		}

		if (this.isEditing) {
			this.#editButton.innerText = '❌ Cancel edit';
			this.#saveButton.hidden = false;
		} else {
			this.#editButton.innerText = '✏️ Edit Material';
			this.#saveButton.hidden = true;
		}
	}

	resetMaterial() {
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
		this.#links.resetValues();
		this.#cover.src = '/img/covers/fallback.svg';
		this.#notes.resetValue();
		this.#description.resetValue();
	}

	async setMaterial(id: string) {
		this.resetMaterial();
		this.toggleEdit(false);

		const material = await getMaterial(id);

		if (material) {
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
			modal.toggleEdit(true);
		}
	}
}

customElements.define('item-details', ItemDetails);
