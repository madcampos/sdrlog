import type { Material } from '../../../../data/data';
import type { ModalDialog } from '../dialog/dialog';

import { readFiles } from '../files-reader/files-reader';
import { extractCoversFromFiles, importCoversFromFolder } from '../covers/fetch-covers';
import { saveCoversToFolder } from '../covers/cover-exporter';
import { requestDataFileFromUser } from '../data-operations/data-import';
import { exportDataFile } from '../data-operations/data-export';
import { updateSearchFilter } from '../search-box/update-filter';
import { ItemDetails } from '../item-info/item-details';

class MenuBar extends HTMLElement {
	#root: ShadowRoot;
	#infobox: ModalDialog;

	constructor() {
		super();

		const template = document.querySelector('#menu-bar') as HTMLTemplateElement;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));

		this.#infobox = this.#root.querySelector('modal-dialog') as ModalDialog;

		window.addEventListener('keydown', (evt) => {
			if (evt.ctrlKey && evt.key === 'i') {
				evt.preventDefault();
				this.#infobox.toggle();
			}
		});

		if (!('showDirectoryPicker' in window)) {
			(this.#root.querySelector('#import-materials') as HTMLElement).remove();
			(this.#root.querySelector('#extract-covers') as HTMLElement).remove();
			(this.#root.querySelector('#export-covers') as HTMLElement).remove();
		}

		this.#root.querySelector('#import-materials')?.addEventListener('click', async () => readFiles());
		this.#root.querySelector('#import-data')?.addEventListener('click', async () => requestDataFileFromUser());

		this.#root.querySelector('#import-covers')?.addEventListener('click', async () => importCoversFromFolder());
		this.#root.querySelector('#extract-covers')?.addEventListener('click', async () => extractCoversFromFiles());

		this.#root.querySelector('#export-data')?.addEventListener('click', async () => exportDataFile());
		this.#root.querySelector('#export-covers')?.addEventListener('click', async () => saveCoversToFolder());

		this.#root.querySelectorAll('#filters dropdown-menu-item').forEach((filterButton) => {
			filterButton.addEventListener('click', () => {
				const action = filterButton.getAttribute('action') as Material['category'] | 'all';

				updateSearchFilter({ category: action });
			});
		});

		this.#root.querySelector('#add-material')?.addEventListener('click', async () => ItemDetails.openMaterialModal());
	}
}

customElements.define('menu-bar', MenuBar);
