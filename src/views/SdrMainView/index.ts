import { Router, type RouterView } from '../../router/router';
import type { Material } from '../../data/data';

import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { fetchItems, requestDataFileFromUser } from '../../js/data/data-import';
import { createComparer } from '../../js/intl/formatting';
import { readFiles } from '../../js/files/file-import';
import { extractCoversFromFiles, importCoversFromFolder } from '../../js/covers/cover-fetch';
import { saveCoversToFolder, saveThumbsToFolder } from '../../js/covers/cover-export';
import { exportDataFile } from '../../js/data/data-export';
import { reportInconsistencies } from '../../js/data/analysis';
import { SearchEngine } from '../../components/SdrSearchBox/search-engine';

declare global {
	interface GlobalEventHandlersEventMap {
		itemloaded: CustomEvent<{
			index: number,
			total: number,
			name: string
		}>,
		apploaded: CustomEvent<undefined>
	}
}

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

@customElement('sdr-view-main')
export class SdrViewMain extends LitElement implements RouterView {
	static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

	@property({ type: Array }) declare cards: Pick<Material, 'name' | 'category' | 'sku' | 'type' | 'edition' | 'status'>[];

	@state() private declare hasFileSystem: boolean;
	@state() private declare isDevMode: boolean;
	@state() private declare filters: (FilterItem | null)[];
	@state() private declare appMenuItems: (MenuItem | null)[];
	@state() private declare fileMenuItems: (MenuItem | null)[];
	@state() private declare devMenuItems: (MenuItem | null)[];

	#hasLoadedData = false;

	constructor() {
		super();

		this.cards = [];
		this.hidden = false;

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
			{ icon: 'ℹ️', label: '$t{Tool Information}', action: async () => Router.navigate('/info') },
			{ icon: '💬', label: '$t{Language Settings}', action: async () => Router.navigate('/settings/language') },
			{ icon: '🌓', label: '$t{Theme Settings}', action: async () => Router.navigate('/settings/theme') }
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
			{ icon: '⛔️', label: 'Report Data Inconsistencies', action: reportInconsistencies },
			{ icon: '💬', label: 'Open CBZ reader', action: async () => Router.navigate('/cbz/test') },
			{ icon: '🕹️', label: 'Open Emulator', action: async () => Router.navigate('/emulator/test') },
			{ icon: '📖', label: 'Open Epub reader', action: async () => Router.navigate('/epub/test') }
		];

		// TODO: add gamepad scrolling
	}

	createRenderRoot() {
		return this;
	}

	navigate() {
		this.hidden = false;
	}

	shouldUpdate(changedProperties: Map<string, unknown>) {
		return this.#hasLoadedData && super.shouldUpdate(changedProperties);
	}

	render() {
		return html`
			<sdr-menu-bar>
				<sdr-dropdown id="filters" icon="︙" trigger-button="x">
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

				<sdr-button id="add-material" @click="${async () => Router.navigate('/item')}" icon="➕"></sdr-button>

				<sdr-search-box></sdr-search-box>

				<sdr-dropdown id="app-menu" icon="⚙️" align-right trigger-button="start">
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
			</sdr-menu-bar>

			<main role="list">
				${this.cards.map(({ name, category, sku, type, edition, status }) => html`
					<sdr-card
						id="${sku[0]}"
						.sku="${sku}"
						name="${name}"
						category="${category}"
						type="${type}"
						edition="${edition}"
						status="${status}"
					></sdr-card>
				`)}
			</main>

			<sdr-update-notify></sdr-update-notify>
		`;
	}

	async connectedCallback() {
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
