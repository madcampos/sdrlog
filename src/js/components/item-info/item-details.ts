import type { CustomButton } from '../button/button';
import type { ModalDialog } from '../dialog/dialog';
import type { EditBox } from '../edit-box/edit-box';
import type { EditList } from '../edit-box/edit-list';
import type { EditSelect } from '../edit-box/edit-select';
import type { EditText } from '../edit-box/edit-text';
import type { FileForMaterial, Material } from '../../../../data/data';
import type { EditListItem } from '../edit-box/edit-list-item';
import type { DropArea } from '../drop-area/drop-area';
import type { NewMaterialProperties } from '../data-operations/create-material';

import { formatFile, formatLink, formatPublisher, formatReleaseDate, formatSku, formatTranslatedName, setCategories, setLanguages, setPublishers, setStatus, setTypes } from './details-template';
import { setMaterialDetails } from './build-details';
import { getMaterial, saveFile } from '../data-operations/idb-persistence';
import { ItemCard } from './item-card';
import { saveNewMaterialInfo } from '../data-operations/create-material';
import { openFile } from '../files-reader/open-file';
import { LOADING_COVER } from '../covers/fetch-covers';
import { associateFileWithData } from '../files-reader/files-reader';
import { exportDataItem } from '../data-operations/data-export';
import { I18n } from '../intl/translations';

export class ItemDetails extends HTMLElement {
	static get observedAttributes() { return ['id']; }

	#root: ShadowRoot;
	#modal: ModalDialog;

	#editButton: CustomButton;
	#saveButton: CustomButton;
	#exportButton: CustomButton;

	#isEditing = false;

	#formFields: {
		name: EditBox,
		sku: EditList,
		edition: EditBox,
		gameDate: EditBox,
		category: EditSelect,
		type: EditSelect,
		language: EditSelect,
		releaseDate: EditList,
		publisher: EditList,
		status: EditSelect,
		names: EditList,
		files: EditList,
		links: EditList,
		notes: EditText,
		description: EditText
	};

	#editInputs: {
		sku: HTMLInputElement,
		releaseDate: HTMLInputElement,
		publisher: HTMLSelectElement,
		namesLang: HTMLSelectElement,
		namesValue: HTMLInputElement,
		linksName: HTMLInputElement,
		linksUrl: HTMLInputElement
	};

	#cover: HTMLImageElement;
	#coverDropArea: DropArea;
	#coverFile: File | undefined;

	constructor() {
		super();

		const template = document.querySelector('#item-details') as HTMLTemplateElement;
		const translatedTemplate = I18n.translateElementsContent(template.content.cloneNode(true));

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(translatedTemplate);

		this.#modal = this.#root.querySelector('modal-dialog') as ModalDialog;

		this.#editButton = this.#root.querySelector('#edit') as CustomButton;
		this.#saveButton = this.#root.querySelector('#save') as CustomButton;
		this.#exportButton = this.#root.querySelector('#export') as CustomButton;

		this.#formFields = {
			name: this.#root.querySelector('#name') as EditBox,

			sku: this.#root.querySelector('#sku') as EditList,

			edition: this.#root.querySelector('#edition') as EditBox,
			gameDate: this.#root.querySelector('#gamedate') as EditBox,

			category: this.#root.querySelector('#category') as EditSelect,

			type: this.#root.querySelector('#type') as EditSelect,

			language: this.#root.querySelector('#language') as EditSelect,

			releaseDate: this.#root.querySelector('#releasedate') as EditList,

			publisher: this.#root.querySelector('#publisher') as EditList,

			status: this.#root.querySelector('#status') as EditSelect,

			names: this.#root.querySelector('#names') as EditList,

			files: this.#root.querySelector('#files-list') as EditList,

			links: this.#root.querySelector('#links') as EditList,

			notes: this.#root.querySelector('#notes') as EditText,
			description: this.#root.querySelector('#description') as EditText
		};

		this.#editInputs = {
			sku: this.#root.querySelector('#sku input') as HTMLInputElement,
			releaseDate: this.#root.querySelector('#releasedate') as HTMLInputElement,
			publisher: this.#root.querySelector('#publisher select') as HTMLSelectElement,
			namesLang: this.#root.querySelector('#names select') as HTMLSelectElement,
			namesValue: this.#root.querySelector('#names input') as HTMLInputElement,
			linksName: this.#root.querySelector('#links input[type="text"]') as HTMLInputElement,
			linksUrl: this.#root.querySelector('#links input[type="text"]') as HTMLInputElement
		};

		setCategories(this.#formFields.category);
		setTypes(this.#formFields.type);
		setLanguages(this.#formFields.language);
		setPublishers(this.#editInputs.publisher);
		setStatus(this.#formFields.status);
		setLanguages(this.#editInputs.namesLang);

		this.#cover = this.#root.querySelector('#cover') as HTMLImageElement;
		this.#coverDropArea = this.#root.querySelector('#cover-drop-area') as DropArea;


		this.#formFields.sku.addEventListener('additem', () => {
			const { value } = this.#editInputs.sku;

			this.#formFields.sku.insertAdjacentHTML('beforeend', formatSku(value, true));
		});

		this.#formFields.releaseDate.addEventListener('additem', () => {
			const { value } = this.#editInputs.releaseDate;

			this.#formFields.releaseDate.insertAdjacentHTML('beforeend', formatReleaseDate(value, true));
		});

		this.#formFields.publisher.addEventListener('additem', () => {
			const { value } = this.#editInputs.publisher;

			this.#formFields.publisher.insertAdjacentHTML('beforeend', formatPublisher(value, true));
		});

		this.#formFields.names.addEventListener('additem', () => {
			const { value: lang } = this.#editInputs.namesLang;
			const { value: name } = this.#editInputs.namesValue;

			this.#formFields.names.insertAdjacentHTML('beforeend', formatTranslatedName(lang, name, true));
		});

		this.#formFields.links.addEventListener('additem', () => {
			const title = this.#editInputs.linksName.value;
			const url = this.#editInputs.linksUrl.value;

			this.#formFields.links.insertAdjacentHTML('beforeend', formatLink({ url, title }, true));
		});

		this.#formFields.files.addEventListener('click', async (evt) => {
			const target = evt.target as HTMLLinkElement;

			if (target.matches('a.file-link')) {
				evt.preventDefault();
				evt.stopPropagation();

				const targetParent = target.closest('edit-list-item') as EditListItem;
				const fileInfo = JSON.parse(decodeURI(targetParent.value)) as FileForMaterial;

				await openFile(fileInfo);
			}
		});

		this.#formFields.files.addEventListener('additem', async () => {
			if (this.#formFields.sku.values.length === 0) {
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
				this.#formFields.files.insertAdjacentHTML('beforeend', formatFile(fileForMaterial));
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

			const [id] = this.#formFields.sku.values;

			if (id) {
				const values = Object.entries(this.#formFields).reduce((inputValues, [name, input]) => {
					if ('values' in input) {
						inputValues[name] = input.values;
					} else {
						inputValues[name] = input.value;
					}

					return inputValues;
				// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
				}, {} as Omit<NewMaterialProperties, 'cover'>);

				await saveNewMaterialInfo(id, {
					...values,
					cover: this.#coverFile
				});

				if (!document.querySelector(`item-card[id="${id}"]`)) {
					ItemCard.createCard({
						name: this.#formFields.name.value,
						id,
						sku: this.#formFields.sku.values,
						edition: Number.parseInt(this.#formFields.edition.value),
						category: this.#formFields.category.value as Material['category'],
						type: this.#formFields.type.value as Material['type'],
						status: this.#formFields.status.value as Material['status']
					});
				}
			}

			this.#saveButton.disabled = false;
			this.#exportButton.disabled = false;

			window.history.pushState(null, `${this.#formFields.name.value} ● ${import.meta.env.APP_NAME}`, `${import.meta.env.PUBLIC_URL}${window.location.search}#${id}`);
			window.document.title = `${this.#formFields.name.value} ● ${import.meta.env.APP_NAME}`;

			// eslint-disable-next-line no-alert
			alert(`${I18n.t`Item # `}${id}${I18n.t` saved successfully.`}`);
		});

		this.#exportButton.addEventListener('click', async () => {
			const values = Object.entries(this.#formFields).reduce((inputValues, [name, input]) => {
				if ('values' in input) {
					inputValues[name] = input.values;
				} else {
					inputValues[name] = input.value;
				}

				return inputValues;
			// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
			}, {} as Omit<NewMaterialProperties, 'cover'>);

			await exportDataItem(values);
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

	show(title = I18n.t`New Material`, id?: string) {
		let hash = '';

		if (id) {
			hash = `#${id}`;
		}

		this.#modal.show();
		this.setAttribute('open', '');

		window.history.pushState(null, `${title} ● ${import.meta.env.APP_NAME}`, `${import.meta.env.PUBLIC_URL}${window.location.search}${hash}`);
		window.document.title = `${title} ● ${import.meta.env.APP_NAME}`;
	}

	close() {
		this.#modal.close();
		this.removeAttribute('open');
	}

	toggleEdit(resetState?: boolean, isNew?: boolean) {
		const editingStatus = resetState ?? !this.isEditing;

		this.isEditing = editingStatus;

		Object.values(this.#formFields).forEach((field) => {
			field.edit = editingStatus;
		});

		this.#coverDropArea.show = editingStatus;

		if (this.#formFields.notes.value === '') {
			this.#formFields.notes.hidden = !editingStatus;
		}

		if (this.#formFields.files.values.length < 1) {
			this.#formFields.files.hidden = !editingStatus;
		}

		if (!('showDirectoryPicker' in window)) {
			this.#formFields.files.hidden = true;
		}

		if (this.#formFields.links.values.length < 1) {
			this.#formFields.links.hidden = !editingStatus;
		}

		this.#editButton.hidden = false;
		this.#saveButton.hidden = true;

		if (this.isEditing) {
			this.#editButton.innerText = I18n.t`Cancel`;
			this.#editButton.icon = '❌';
			this.#saveButton.hidden = false;
			this.#exportButton.hidden = true;
		} else {
			this.#editButton.innerText = I18n.t`Edit`;
			this.#editButton.icon = '✏️';
			this.#saveButton.hidden = true;
			this.#exportButton.hidden = false;
		}

		if (isNew === true) {
			this.#editButton.hidden = true;
			this.#saveButton.hidden = false;

			Object.values(this.#formFields).forEach((field) => {
				field.loaded = true;
			});

			this.#coverDropArea.show = true;
		}
	}

	resetMaterial() {
		Object.values(this.#formFields).forEach((field) => {
			field.resetValue();
		});

		this.#formFields.links.hidden = true;
		this.#formFields.notes.hidden = true;
		this.#formFields.files.hidden = true;
		this.#formFields.files.value = '📄';

		this.#cover.src = LOADING_COVER;
		this.#coverDropArea.show = false;

		this.#editButton.disabled = true;
		this.#exportButton.disabled = true;
	}

	async setMaterial(id: string) {
		this.resetMaterial();
		this.toggleEdit(false);

		const material = await getMaterial(id);

		if (material) {
			setMaterialDetails(material, {
				cover: this.#cover,
				...this.#formFields
			});

			this.#editButton.disabled = false;
			this.#exportButton.disabled = false;
		}
	}

	static async openMaterialModal(id?: string, title?: string) {
		let modal = document.querySelector<ItemDetails>('item-details');

		if (!modal) {
			modal = document.createElement('item-details') as ItemDetails;

			document.body.appendChild(modal);
		}

		modal.show(title, id);

		if (id) {
			await modal.setMaterial(id);
		} else {
			modal.resetMaterial();
			modal.toggleEdit(true, true);
		}
	}
}

customElements.define('item-details', ItemDetails);
