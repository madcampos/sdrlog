import type { Material } from '../../../../data/data';
import type { ModalDialog } from '../dialog/dialog';

import infoDialogData from './info-dialog';
import { readFiles } from '../files-reader/files-reader';
import { extractCoversFromFiles, importCoversFromFolder } from '../covers/fetch-covers';
import { saveCoversToFolder } from '../covers/cover-exporter';
import { requestDataFileFromUser } from '../data-operations/data-import';
import { exportDataFile } from '../data-operations/data-export';
import { updateSearchFilter } from '../search-box/update-filter';

class MenuBar extends HTMLElement {
	#root: ShadowRoot;
	#infobox: ModalDialog;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<nav>
				<dropdown-menu id="filters" label="︙">
					<dropdown-menu-item action="sourcebook">📜 Sourcebooks</dropdown-menu-item>
					<dropdown-menu-item action="rulebook">📝 Rulebooks</dropdown-menu-item>
					<dropdown-menu-item action="mission">🗺️ Adventures &amp; Campaigns</dropdown-menu-item>
					<dropdown-menu-item action="novel">📚 Novels</dropdown-menu-item>
					<dropdown-menu-item action="magazine">📰 Magazines</dropdown-menu-item>
					<dropdown-menu-item action="boardgame">♟️ Tabletop</dropdown-menu-item>
					<dropdown-menu-item action="tcg">🃏 Trading Card Game</dropdown-menu-item>
					<dropdown-menu-item action="videogame">🎮 Video Games</dropdown-menu-item>
					<!-- <dropdown-menu-item action="unofficial">📓 Unofficial</dropdown-menu-item> -->
					<dropdown-menu-item action="misc">🔣 Misc.</dropdown-menu-item>
					<hr>
					<dropdown-menu-item action="all">📚 All</dropdown-menu-item>
				</dropdown-menu>
				<search-box></search-box>
				<modal-dialog>
					<button slot="trigger">ℹ️</button>
					<h1 slot="title">Information</h1>
					${infoDialogData}
				</modal-dialog>
				<dropdown-menu label="⚙️">
					<dropdown-menu-item id="import-materials">📥 Import Materials</dropdown-menu-item>
					<dropdown-menu-item id="import-data">📦 Import Data</dropdown-menu-item>
					<hr>
					<dropdown-menu-item id="import-covers">📂 Import Covers</dropdown-menu-item>
					<dropdown-menu-item id="extract-covers">🧩 Extract Covers</dropdown-menu-item>
					<hr>
					<dropdown-menu-item id="export-data">📤 Export Data</dropdown-menu-item>
					<dropdown-menu-item id="export-covers">🖼️ Export Covers</dropdown-menu-item>
				</dropdown-menu>
			</nav>
		`;

		this.#infobox = this.#root.querySelector('modal-dialog') as ModalDialog;

		window.addEventListener('keydown', (evt) => {
			if (evt.ctrlKey && evt.key === 'i') {
				evt.preventDefault();
				this.#infobox.toggle();
			}
		});

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
	}
}

customElements.define('menu-bar', MenuBar);
