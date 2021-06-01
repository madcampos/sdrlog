import type { ModalDialog } from '../dialog/dialog';
import infoDialogData from './info-dialog';

class MenuBar extends HTMLElement {
	#root: ShadowRoot;
	#infobox: ModalDialog;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<nav>
				<dropdown-menu type="toolbar" label="︙">
					<dropdown-menu-item icon="" data-action="sourcebook">📜 Sourcebooks</dropdown-menu-item>
					<dropdown-menu-item icon="" data-action="rulebook">📝 Rulebooks</dropdown-menu-item>
					<dropdown-menu-item icon="" data-action="mission">🗺️ Adventures &amp; Campaigns</dropdown-menu-item>
					<dropdown-menu-item icon="" data-action="novel">📚 Novels</dropdown-menu-item>
					<dropdown-menu-item icon="" data-action="magazine">📰 Magazines</dropdown-menu-item>
					<dropdown-menu-item icon="" data-action="boardgame">♟️ Tabletop</dropdown-menu-item>
					<dropdown-menu-item icon="" data-action="tcg">🃏 Trading Card Game</dropdown-menu-item>
					<dropdown-menu-item icon="" data-action="videogame">🎮 Video Games</dropdown-menu-item>
					<dropdown-menu-item icon="" data-action="unofficial">📓 Unofficial</dropdown-menu-item>
					<dropdown-menu-item icon="" data-action="misc">🔣 Misc.</dropdown-menu-item>
					<hr>
					<dropdown-menu-item icon="" data-action="all">All</dropdown-menu-item>
				</dropdown-menu>

				<modal-dialog>
					<button slot="trigger">ℹ️</button>
					<h1 slot="title">Information</h1>
					${infoDialogData}
				</modal-dialog>
			</nav>
		`;

		this.#infobox = this.#root.querySelector('modal-dialog') as ModalDialog;

		window.addEventListener('keydown', (evt) => {
			if (evt.ctrlKey && evt.key === 'i') {
				evt.preventDefault();
				this.#infobox.toggle();
			}
		});
	}
}

customElements.define('menu-bar', MenuBar);
