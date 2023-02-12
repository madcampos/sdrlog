import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { readFiles } from '../../js/files/file-import';
import { extractCoversFromFiles, importCoversFromFolder } from '../../js/covers/cover-fetch';
import { saveCoversToFolder, saveThumbsToFolder } from '../../js/covers/cover-export';
import { requestDataFileFromUser } from '../../js/data/data-import';
import { exportDataFile } from '../../js/data/data-export';
import { reportInconsistencies } from '../../js/data/analysis';
import { SearchEngine } from '../SdrSearchBox/search-engine';
import { SdrItemDetails } from '../../views/SdrItemDetails';
import { SdrInfoBox } from '../../views/SdrInfoBox';
import { SdrLanguageBox } from '../../views/SdrLanguageBox';
import { SdrThemeBox } from '../../views/SdrThemeBox';

import style from './style.css?inline' assert { type: 'css' };

interface FilterItem {
	icon: string,
	label: string,
	filter: string
}

interface MenuItem {
	icon: string,
	label: string,
	action(): void
}

@customElement('sdr-menu-bar')
export class SdrMenuBar extends LitElement {
	static styles = unsafeCSS(style);

	@state() private declare hasFileSystem: boolean;
	@state() private declare isDevMode: boolean;
	@state() private declare filters: (FilterItem | null)[];
	@state() private declare appMenuItems: (MenuItem | null)[];
	@state() private declare fileMenuItems: (MenuItem | null)[];
	@state() private declare devMenuItems: (MenuItem | null)[];

	constructor() {
		super();

		this.hasFileSystem = false;

		if ('showOpenFilePicker' in window) {
			this.hasFileSystem = true;
		}

		this.isDevMode = false;

		if (import.meta.env.DEV) {
			this.isDevMode = true;
		}

		this.filters = [
			{ icon: '📜', label: '$t{Sourcebooks}', filter: 'category: sourcebook' },
			{ icon: '📝', label: '$t{Rulebooks}', filter: 'category: rulebook' },
			{ icon: '🗺️', label: '$t{Adventures & Campaigns}', filter: 'category: mission' },
			{ icon: '📚', label: '$t{Novels}', filter: 'category: novel' },
			{ icon: '📰', label: '$t{Magazines}', filter: 'category: magazine' },
			{ icon: '♟️', label: '$t{Tabletop}', filter: 'category: boardgame' },
			{ icon: '🃏', label: '$t{Trading Card Game}', filter: 'category: tcg' },
			{ icon: '🎮', label: '$t{Video Games}', filter: 'category: videogame' },
			{ icon: '📓', label: '$t{Unofficial}', filter: 'category: unofficial' },
			{ icon: '🔣', label: '$t{Misc.}', filter: 'category: misc' },
			null,
			{ icon: '📚', label: '$t{All}', filter: 'category: all' }
		];

		this.appMenuItems = [
			{ icon: 'ℹ️', label: '$t{Tool Information}', action: SdrInfoBox.openModal },
			{ icon: '💬', label: '$t{Language Settings}', action: SdrLanguageBox.openModal },
			{ icon: '🌓', label: '$t{Theme Settings}', action: SdrThemeBox.openModal }
		];

		this.fileMenuItems = [
			null,
			{ icon: '📥', label: '$t{Import Files}', action: readFiles },
			{ icon: '📦', label: '$t{Import Data}', action: requestDataFileFromUser },
			null,
			{ icon: '📂', label: '$t{Import Covers}', action: importCoversFromFolder },
			{ icon: '🧩', label: '$t{Extract Covers}', action: extractCoversFromFiles },
			null,
			{ icon: '📤', label: '$t{Export Data}', action: exportDataFile },
			{ icon: '🎴', label: '$t{Export Thumbnails}', action: saveThumbsToFolder },
			{ icon: '🖼️', label: '$t{Export Covers}', action: saveCoversToFolder }
		];

		this.devMenuItems = [
			null,
			{ icon: '⛔️', label: '$t{Report Data Inconsistencies}', action: reportInconsistencies }
		];
	}

	render() {
		return html`
			<nav>
				<sdr-dropdown id="filters" icon="︙">
					${this.filters.map((filter) => {
						if (filter === null) {
							return html`<sdr-dropdown-item separator></sdr-dropdown-item>`;
						}

						return html`
							<sdr-dropdown-item
								icon="${filter.icon}"
								@click="${() => SearchEngine.updateSearchResults(filter.filter)}"
							>
								${filter.label}
							</sdr-dropdown-item>
						`;
					})}
				</sdr-dropdown>

				<sdr-button id="add-material" @click="${async () => SdrItemDetails.openModal()}" icon="➕"></sdr-button>

				<sdr-search-box></sdr-search-box>

				<sdr-dropdown id="app-menu" icon="⚙️" align-right>
					${this.appMenuItems.map((item) => {
						if (item === null) {
							return html`<sdr-dropdown-item separator></sdr-dropdown-item>`;
						}

						return html`
							<sdr-dropdown-item icon="${item.icon}" @click="${() => item.action()}">${item.label}</sdr-dropdown-item>`;
					})}

					${this.hasFileSystem
						? this.fileMenuItems.map((item) => {
							if (item === null) {
								return html`<sdr-dropdown-item separator></sdr-dropdown-item>`;
							}

							return html`
								<sdr-dropdown-item icon="${item.icon}" @click="${() => item.action()}">${item.label}</sdr-dropdown-item>`;
						})
						: ''
					}

					${this.isDevMode
						? this.devMenuItems.map((item) => {
							if (item === null) {
								return html`<sdr-dropdown-item separator></sdr-dropdown-item>`;
							}

							return html`
								<sdr-dropdown-item icon="${item.icon}" @click="${() => item.action()}">${item.label}</sdr-dropdown-item>`;
						})
						: ''
					}
				</sdr-dropdown>
			</nav>
		`;
	}
}
