import type { SdrButton } from '../button/button';
import type { SdrDialog } from '../dialog/dialog';
import type { SdrInput } from '../edit-box/edit-box';
import type { SdrEditList } from '../edit-list/edit-list';
import type { SdrSelect } from '../edit-select/edit-select';
import type { SdrTextArea } from '../edit-textarea/edit-textarea';
import type { FileForMaterial, Material } from '../../../public/data/data';
import type { SdrEditListItem } from '../edit-list-item/edit-list-item';
import type { SdrDropArea } from '../drop-area/drop-area';
import type { NewMaterialProperties } from '../../js/data-operations/create-material';

import { formatFile, formatLink, formatPublisher, formatReleaseDate, formatSku, formatTranslatedName, setCategories, setLanguages, setPublishers, setStatus, setTypes } from './details-template';
import { setMaterialDetails } from './build-details';
import { getMaterial, saveFile } from '../../js/data-operations/idb-persistence';
import { ItemCard } from './item-card';
import { saveNewMaterialInfo } from '../../js/data-operations/create-material';
import { openFile } from '../../js/files-reader/open-file';
import { LOADING_COVER } from '../../js/covers/fetch-covers';
import { associateFileWithData } from '../../js/files-reader/files-reader';
import { exportDataItem } from '../../js/data-operations/data-export';
import { I18n } from '../../js/intl/translations';

export class ItemDetails extends HTMLElement {
	static get observedAttributes() { return ['id']; }

	#root: ShadowRoot;
	#modal: SdrDialog;

	#editButton: SdrButton;
	#saveButton: SdrButton;
	#exportButton: SdrButton;

	#isEditing = false;

	#formFields: {
		name: SdrInput,
		sku: SdrEditList,
		edition: SdrInput,
		gameDate: SdrInput,
		category: SdrSelect,
		type: SdrSelect,
		originalLanguage: SdrSelect,
		releaseDate: SdrEditList,
		publisher: SdrEditList,
		status: SdrSelect,
		names: SdrEditList,
		files: SdrEditList,
		links: SdrEditList,
		notes: SdrTextArea,
		description: SdrTextArea
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
	#coverDropArea: SdrDropArea;
	#coverFile: File | undefined;

	constructor() {
		super();

		const template = document.querySelector('#item-details') as HTMLTemplateElement;
		const translatedTemplate = I18n.translateElementsContent(template.content.cloneNode(true));

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(translatedTemplate);

		this.#modal = this.#root.querySelector('sdr-dialog') as SdrDialog;

		this.#editButton = this.#root.querySelector('#edit') as SdrButton;
		this.#saveButton = this.#root.querySelector('#save') as SdrButton;
		this.#exportButton = this.#root.querySelector('#export') as SdrButton;

		this.#formFields = {
			name: this.#root.querySelector('#name') as SdrInput,

			sku: this.#root.querySelector('#sku') as SdrEditList,

			edition: this.#root.querySelector('#edition') as SdrInput,
			gameDate: this.#root.querySelector('#gamedate') as SdrInput,

			category: this.#root.querySelector('#category') as SdrSelect,

			type: this.#root.querySelector('#type') as SdrSelect,

			originalLanguage: this.#root.querySelector('#language') as SdrSelect,

			releaseDate: this.#root.querySelector('#releasedate') as SdrEditList,

			publisher: this.#root.querySelector('#publisher') as SdrEditList,

			status: this.#root.querySelector('#status') as SdrSelect,

			names: this.#root.querySelector('#names') as SdrEditList,

			files: this.#root.querySelector('#files-list') as SdrEditList,

			links: this.#root.querySelector('#links') as SdrEditList,

			notes: this.#root.querySelector('#notes') as SdrTextArea,
			description: this.#root.querySelector('#description') as SdrTextArea
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
		setLanguages(this.#formFields.originalLanguage);
		setPublishers(this.#editInputs.publisher);
		setStatus(this.#formFields.status);
		setLanguages(this.#editInputs.namesLang);

		this.#cover = this.#root.querySelector('#cover') as HTMLImageElement;
		this.#coverDropArea = this.#root.querySelector('#cover-drop-area') as SdrDropArea;


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

				const targetParent = target.closest('edit-list-item') as SdrEditListItem;
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
			this.#coverDropArea.isAcceptingFiles = false;
			this.#cover.src = LOADING_COVER;

			this.#coverFile = this.#coverDropArea.file as File;
			this.#cover.src = URL.createObjectURL(this.#coverFile);

			this.#coverDropArea.isAcceptingFiles = true;
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

			window.history.pushState(null, `${this.#formFields.name.value} · ${import.meta.env.APP_NAME}`, `${import.meta.env.APP_PUBLIC_URL}${window.location.search}#${id}`);
			window.document.title = `${this.#formFields.name.value} · ${import.meta.env.APP_NAME}`;

			this.toggleEdit(false, false);

			// eslint-disable-next-line no-alert
			alert(`${I18n.t`Item # `}${id}${I18n.t` saved successfully.`}`);
		});

		this.#exportButton.addEventListener('click', async () => {
			const values = Object.entries(this.#formFields).reduce((inputValues, [name, input]) => {
				if ('values' in input) {
					inputValues[name] = input.values;

					if (['links', 'files', 'names'].includes(name)) {
						inputValues[name] = input.values.map((value) => decodeURI(value));
					}
				} else {
					inputValues[name] = input.value;
				}

				return inputValues;
			// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
			}, {} as Omit<NewMaterialProperties, 'cover'>);

			await exportDataItem(values);
		});

		this.#modal.addEventListener('close', () => {
			window.history.pushState(null, import.meta.env.APP_NAME, `${import.meta.env.APP_PUBLIC_URL}${window.location.search}`);
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
			void this.setMaterial(id);
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

		window.history.pushState(null, `${title} · ${import.meta.env.APP_NAME}`, `${import.meta.env.APP_PUBLIC_URL}${window.location.search}${hash}`);
		window.document.title = `${title} · ${import.meta.env.APP_NAME}`;
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

		this.#coverDropArea.isAcceptingFiles = editingStatus;

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

		this.#editButton.disabled = false;
		this.#saveButton.disabled = false;
		this.#exportButton.disabled = false;

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

			this.#coverDropArea.isAcceptingFiles = true;
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
		this.#coverDropArea.isAcceptingFiles = false;

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
