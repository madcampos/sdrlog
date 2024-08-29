import type { Material } from '../../data/data';
import { Router, type RouterView } from '../../router/router';

import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { SearchEngine } from '../../components/SdrSearchBox/search-engine';
import { saveCoversToFolder, saveThumbsToFolder } from '../../js/covers/cover-export';
import { extractCoversFromFiles, importCoversFromFolder } from '../../js/covers/cover-fetch';
import { reportInconsistencies } from '../../js/data/analysis';
import { exportDataFile } from '../../js/data/data-export';
import { fetchItems, requestDataFileFromUser } from '../../js/data/data-import';
import { readFiles } from '../../js/files/file-import';
import { createComparer } from '../../js/intl/formatting';

declare global {
	interface GlobalEventHandlersEventMap {
		itemloaded: CustomEvent<{
			index: number,
			total: number,
			name: string
		}>;
		apploaded: CustomEvent<undefined>;
	}
}

interface FilterItem {
	icon: string;
	label: string;
	filter: string;
}

interface MenuItem {
	icon: string;
	label: string;
	action(): void;
}

@customElement('sdr-view-main')
class SdrViewMain extends LitElement implements RouterView {
	static override shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

	@property({ type: Array })
	accessor cards: Pick<Material, 'category' | 'edition' | 'name' | 'sku' | 'status' | 'type'>[];

	@state()
	accessor #hasFileSystem: boolean;

	@state()
	accessor #isDevMode: boolean;

	@state()
	accessor #filters: (FilterItem | null)[];

	@state()
	accessor #appMenuItems: (MenuItem | null)[];

	@state()
	accessor #fileMenuItems: (MenuItem | null)[];

	@state()
	accessor #devMenuItems: (MenuItem | null)[];

	#hasLoadedData = false;

	constructor() {
		super();

		this.hidden = false;
		this.cards = [];

		this.#isDevMode = false;
		this.#hasFileSystem = false;

		this.#filters = [
			{ icon: '📜', label: 'Sourcebooks', filter: 'category: sourcebook' },
			{ icon: '📝', label: 'Rulebooks', filter: 'category: rulebook' },
			{ icon: '🗺️', label: 'Adventures & Campaigns', filter: 'category: mission' },
			{ icon: '📚', label: 'Novels', filter: 'category: novel' },
			{ icon: '📰', label: 'Magazines', filter: 'category: magazine' },
			{ icon: '♟️', label: 'Tabletop', filter: 'category: boardgame' },
			{ icon: '🃏', label: 'Trading Card Game', filter: 'category: tcg' },
			{ icon: '🎮', label: 'Video Games', filter: 'category: videogame' },
			{ icon: '📓', label: 'Unofficial', filter: 'category: unofficial' },
			{ icon: '🔣', label: 'Misc.', filter: 'category: misc' },
			null,
			{ icon: '📚', label: 'All', filter: 'category: all' }
		];

		this.#appMenuItems = [
			{ icon: 'ℹ️', label: 'Tool Information', action: async () => Router.navigate('/info') },
			// { icon: '💬', label: 'Language Settings', action: async () => Router.navigate('/settings/language') },
			{ icon: '🌓', label: 'Theme Settings', action: async () => Router.navigate('/settings/theme') }
		];

		this.#fileMenuItems = [
			null,
			{ icon: '📥', label: 'Import Files', action: readFiles },
			{ icon: '📦', label: 'Import Data', action: requestDataFileFromUser },
			null,
			{ icon: '📂', label: 'Import Covers', action: importCoversFromFolder },
			{ icon: '🧩', label: 'Extract Covers', action: extractCoversFromFiles },
			null,
			{ icon: '📤', label: 'Export Data', action: exportDataFile },
			{ icon: '🎴', label: 'Export Thumbnails', action: saveThumbsToFolder },
			{ icon: '🖼️', label: 'Export Covers', action: saveCoversToFolder }
		];

		this.#devMenuItems = [
			null,
			{ icon: '⛔️', label: 'Report Data Inconsistencies', action: reportInconsistencies },
			{ icon: '💬', label: 'Open CBZ reader', action: async () => Router.navigate('/cbz/test') },
			{ icon: '🕹️', label: 'Open Emulator', action: async () => Router.navigate('/emulator/test') },
			{ icon: '📖', label: 'Open Epub reader', action: async () => Router.navigate('/epub/test') }
		];

		if ('showOpenFilePicker' in window) {
			this.#hasFileSystem = true;
		}

		if (import.meta.env.DEV) {
			this.#isDevMode = true;
		}
	}

	override createRenderRoot() {
		return this;
	}

	navigate() {
		this.hidden = false;
	}

	override shouldUpdate(changedProperties: Map<string, unknown>) {
		return this.#hasLoadedData && super.shouldUpdate(changedProperties);
	}

	override render() {
		return html`
			<sdr-menu-bar>
				<sdr-dropdown id="filters" icon="︙" trigger-button="x">
					${
			this.#filters.map((filter) => {
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
			})
		}
				</sdr-dropdown>

				<sdr-button id="add-material" @click="${async () => Router.navigate('/item')}" icon="➕"></sdr-button>

				<sdr-search-box></sdr-search-box>

				<sdr-dropdown id="app-menu" icon="⚙️" align-right trigger-button="start">
					${
			this.#appMenuItems.map((item) => {
				if (item === null) {
					return html`<sdr-dropdown-item separator></sdr-dropdown-item>`;
				}

				return html`
							<sdr-dropdown-item icon="${item.icon}" @click="${() => item.action()}">${item.label}</sdr-dropdown-item>`;
			})
		}

					${
			this.#hasFileSystem
				? this.#fileMenuItems.map((item) => {
					if (item === null) {
						return html`<sdr-dropdown-item separator></sdr-dropdown-item>`;
					}

					return html`
								<sdr-dropdown-item icon="${item.icon}" @click="${() => item.action()}">${item.label}</sdr-dropdown-item>`;
				})
				: ''
		}

					${
			this.#isDevMode
				? this.#devMenuItems.map((item) => {
					if (item === null) {
						return html`<sdr-dropdown-item separator></sdr-dropdown-item>`;
					}

					return html`
								<sdr-dropdown-item icon="${item.icon}" @click="${() => item.action()}">${item.label}</sdr-dropdown-item>`;
				})
				: ''
		}
				</sdr-dropdown>
			</sdr-menu-bar>

			<main role="list">
				${
			this.cards.map(({ name, category, sku, type, edition, status }) =>
				html`
					<sdr-card
						id="${sku[0] ?? ''}"
						.sku="${sku}"
						name="${name}"
						category="${category}"
						type="${type}"
						edition="${edition}"
						status="${status}"
					></sdr-card>
				`
			)
		}
			</main>

			<sdr-update-notify></sdr-update-notify>
		`;
	}

	override async connectedCallback() {
		super.connectedCallback();

		const materials = await fetchItems();

		const sorter = createComparer();
		const sortedMaterials = materials.sort(({ name: nameA }, { name: nameB }) => sorter(nameA, nameB));

		for (const [index, material] of sortedMaterials.entries()) {
			this.cards.push({
				name: material.name,
				category: material.category,
				sku: material.sku,
				type: material.type,
				edition: material.edition,
				status: material.status
			});

			this.dispatchEvent(new CustomEvent('itemloaded', { bubbles: true, composed: true, detail: { item: index, total: sortedMaterials.length, name: material.name } }));
		}

		this.#hasLoadedData = true;
		this.requestUpdate();

		this.dispatchEvent(new CustomEvent('apploaded', { bubbles: true, composed: true }));
	}
}

export { SdrViewMain };
