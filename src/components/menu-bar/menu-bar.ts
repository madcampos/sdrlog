import type { ModalDialog } from '../dialog/dialog';

import infoDialogData from './info-dialog';
import { readFiles } from '../files-reader/files-reader';
import { extractCoversFromFiles, importCoversFromFolder } from '../files-reader/cover-extractor';
import { saveCoversToFolder } from '../files-reader/cover-exporter';
import { requestDataFileFromUser } from '../data-operations/data-import';
import { exportDataFile } from '../data-operations/data-export';

class MenuBar extends HTMLElement {
	#root: ShadowRoot;
	#infobox: ModalDialog;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<nav>
				<dropdown-menu label="︙">
					<dropdown-menu-item data-action="sourcebook">📜 Sourcebooks</dropdown-menu-item>
					<dropdown-menu-item data-action="rulebook">📝 Rulebooks</dropdown-menu-item>
					<dropdown-menu-item data-action="mission">🗺️ Adventures &amp; Campaigns</dropdown-menu-item>
					<dropdown-menu-item data-action="novel">📚 Novels</dropdown-menu-item>
					<dropdown-menu-item data-action="magazine">📰 Magazines</dropdown-menu-item>
					<dropdown-menu-item data-action="boardgame">♟️ Tabletop</dropdown-menu-item>
					<dropdown-menu-item data-action="tcg">🃏 Trading Card Game</dropdown-menu-item>
					<dropdown-menu-item data-action="videogame">🎮 Video Games</dropdown-menu-item>
					<dropdown-menu-item data-action="unofficial">📓 Unofficial</dropdown-menu-item>
					<dropdown-menu-item data-action="misc">🔣 Misc.</dropdown-menu-item>
					<hr>
					<dropdown-menu-item data-action="all">📚 All</dropdown-menu-item>
				</dropdown-menu>

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
	}
}

customElements.define('menu-bar', MenuBar);
