import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { importCoversFromFolder, importFiles, importMaterialsFromFile } from '../../js/data/import.ts';
import { extractCoversFromFiles } from '../../js/data/pdf-extract-cover.ts';
import { MATERIAL_CATEGORY, MATERIAL_CATEGORY_ICONS } from '../../js/data/schema.ts';
import { SearchEngine, SearchUpdateEvent } from '../../js/search-engine.ts';

@customElement('top-bar')
export class TopBar extends LitElement {
	@state()
	private accessor value = SearchEngine.toString();

	@state()
	private accessor suggestions: string[] = [];

	@state()
	private accessor areActionsDisabled = false;

	#isDevMode = import.meta.env.DEV;

	#hasFileSystem = 'showOpenFilePicker' in window;

	protected override createRenderRoot() {
		return this;
	}

	#handleSearch(evt: SubmitEvent) {
		evt.preventDefault();

		if (!(evt.target instanceof HTMLFormElement)) {
			return;
		}

		const searchInput = this.querySelector('input[type="search"]');

		if (!searchInput) {
			return;
		}

		SearchEngine.parseTagsFromString(searchInput.value);
	}

	#updateSuggestions(evt: InputEvent) {
		requestAnimationFrame(() => {
			if (!(evt.target instanceof HTMLInputElement)) {
				return;
			}

			this.suggestions = SearchEngine.getSuggestions(evt.target.value);
		});
	}

	async #handleButtonClick(evt: MouseEvent) {
		if (!(evt.target instanceof HTMLButtonElement)) {
			return;
		}

		switch (evt.target.command) {
			case '--dev-issues':
			case '--new-item':
			case '--info':
			case '--settings':
				evt.target.closest('dialog')?.hidePopover();
				break;
			case '--import-files':
				this.areActionsDisabled = true;
				await importFiles();
				this.areActionsDisabled = false;
				break;
			case '--import-data':
				this.areActionsDisabled = true;
				await importMaterialsFromFile();
				this.areActionsDisabled = false;
				break;
			case '--import-covers':
				this.areActionsDisabled = true;
				await importCoversFromFolder();
				this.areActionsDisabled = false;
				break;
			case '--extract-covers':
				this.areActionsDisabled = true;
				await extractCoversFromFiles();
				this.areActionsDisabled = false;
				break;
			case '--export-data':
				break;
			case '--export-thumbs':
				break;
			case '--export-covers':
				break;
			case '--dev-cbz':
				window.navigation.navigate('/comic-reader');
				break;
			case '--dev-emulator':
				window.navigation.navigate('/emulator');
				break;
			case '--dev-epub':
				window.navigation.navigate('/epub-reader');
				break;
			default:
		}
	}

	#handleFilterChange(evt: InputEvent) {
		if (!(evt.target instanceof HTMLSelectElement)) {
			return;
		}

		const searchInput = this.querySelector('input[type="search"]');

		if (!searchInput) {
			return;
		}

		if (!evt.target.value) {
			searchInput.value = '';
			SearchEngine.resetSearch();
			return;
		}

		searchInput.value = searchInput.value.replace(/category:\s?".+?"/iu, '');

		if (searchInput.value) {
			searchInput.value += ' ';
		}

		searchInput.value += evt.target.value;
		searchInput.form?.requestSubmit();
	}

	override render() {
		const categories = SearchEngine.toJSON().category ?? [];
		const categoryFiltersHtml = html`
			<option value="category: &quot;sourcebook&quot;" ?selected=${categories.includes('sourcebook')}>
				<icon-wrapper>
					<iconify-icon icon="${MATERIAL_CATEGORY_ICONS.sourcebook}" aria-hidden="true"></iconify-icon>
					<iconify-icon icon="mdi:filter-variant" aria-hidden="true" data-subicon></iconify-icon>
				</icon-wrapper>
				<span>${MATERIAL_CATEGORY.sourcebook}</span>
			</option>
			<option value="category: &quot;rulebook&quot;" ?selected=${categories.includes('rulebook')}>
				<icon-wrapper>
					<iconify-icon icon="${MATERIAL_CATEGORY_ICONS.rulebook}" aria-hidden="true"></iconify-icon>
					<iconify-icon icon="mdi:filter-variant" aria-hidden="true" data-subicon></iconify-icon>
				</icon-wrapper>
				<span>${MATERIAL_CATEGORY.rulebook}</span>
			</option>
			<option value="category: &quot;mission&quot;" ?selected=${categories.includes('mission')}>
				<icon-wrapper>
					<iconify-icon icon="${MATERIAL_CATEGORY_ICONS.mission}" aria-hidden="true"></iconify-icon>
					<iconify-icon icon="mdi:filter-variant" aria-hidden="true" data-subicon></iconify-icon>
				</icon-wrapper>
				<span>${MATERIAL_CATEGORY.mission}</span>
			</option>
			<option value="category: &quot;novel&quot;" ?selected=${categories.includes('novel')}>
				<icon-wrapper>
					<iconify-icon icon="${MATERIAL_CATEGORY_ICONS.novel}" aria-hidden="true"></iconify-icon>
					<iconify-icon icon="mdi:filter-variant" aria-hidden="true" data-subicon></iconify-icon>
				</icon-wrapper>
				<span>${MATERIAL_CATEGORY.novel}</span>
			</option>
			<option value="category: &quot;magazine&quot;" ?selected=${categories.includes('magazine')}>
				<icon-wrapper>
					<iconify-icon icon="${MATERIAL_CATEGORY_ICONS.magazine}" aria-hidden="true"></iconify-icon>
					<iconify-icon icon="mdi:filter-variant" aria-hidden="true" data-subicon></iconify-icon>
				</icon-wrapper>
				<span>${MATERIAL_CATEGORY.magazine}</span>
			</option>
			<option value="category: &quot;boardgame&quot;" ?selected=${categories.includes('boardgame')}>
				<icon-wrapper>
					<iconify-icon icon="${MATERIAL_CATEGORY_ICONS.boardgame}" aria-hidden="true"></iconify-icon>
					<iconify-icon icon="mdi:filter-variant" aria-hidden="true" data-subicon></iconify-icon>
				</icon-wrapper>
				<span>${MATERIAL_CATEGORY.boardgame}</span>
			</option>
			<option value="category: &quot;tcg&quot;" ?selected=${categories.includes('tcg')}>
				<icon-wrapper>
					<iconify-icon icon="${MATERIAL_CATEGORY_ICONS.tcg}" aria-hidden="true"></iconify-icon>
					<iconify-icon icon="mdi:filter-variant" aria-hidden="true" data-subicon></iconify-icon>
				</icon-wrapper>
				<span>${MATERIAL_CATEGORY.tcg}</span>
			</option>
			<option value="category: &quot;videogame&quot;" ?selected=${categories.includes('videogame')}>
				<icon-wrapper>
					<iconify-icon icon="${MATERIAL_CATEGORY_ICONS.videogame}" aria-hidden="true"></iconify-icon>
					<iconify-icon icon="mdi:filter-variant" aria-hidden="true" data-subicon></iconify-icon>
				</icon-wrapper>
				<span>${MATERIAL_CATEGORY.videogame}</span>
			</option>
			<option value="category: &quot;unofficial&quot;" ?selected=${categories.includes('unofficial')}>
				<icon-wrapper>
					<iconify-icon icon="${MATERIAL_CATEGORY_ICONS.unofficial}" aria-hidden="true"></iconify-icon>
					<iconify-icon icon="mdi:filter-variant" aria-hidden="true" data-subicon></iconify-icon>
				</icon-wrapper>
				<span>${MATERIAL_CATEGORY.unofficial}</span>
			</option>
			<option value="category: &quot;misc&quot;" ?selected=${categories.includes('misc')}>
				<icon-wrapper>
					<iconify-icon icon="${MATERIAL_CATEGORY_ICONS.misc}" aria-hidden="true"></iconify-icon>
					<iconify-icon icon="mdi:filter-variant" aria-hidden="true" data-subicon></iconify-icon>
				</icon-wrapper>
				<span>${MATERIAL_CATEGORY.misc}</span>
			</option>
		`;

		return html`
			<nav>
				<button
					data-icon-button
					command="--new-item"
					@click=${this.#handleButtonClick}
				>
					<sr-only>Add Material</sr-only>
					<iconify-icon icon="mdi:playlist-add" aria-hidden="true"></iconify-icon>
				</button>

				<search role="search">
					<form
						action=""
						method="get"
						novalidate
						@submit=${this.#handleSearch}
					>
						<label for="search-filter">
							<sr-only>Filter Materials</sr-only>
						</label>
						<select
							id="search-filter"
							@change=${this.#handleFilterChange}
						>
							<button
								type="button"
								data-icon-button
							>
								<selectedcontent></selectedcontent>
							</button>

							${categoryFiltersHtml}

							<hr />

							<option value="" ?selected=${categories.length === 0}>
								<iconify-icon icon="mdi:star" aria-hidden="true"></iconify-icon>
								<iconify-icon icon="mdi:filter-variant" aria-hidden="true"></iconify-icon>
								<span>All</span>
							</option>
						</select>

						<input-wrapper>
							<label for="search-input">
								<sr-only>Search</sr-only>
							</label>
							<input
								id="search-input"
								type="search"
								list="search-suggestions"
								placeholder="Search items..."
								role="search"
								value="${this.value}"
								@input=${this.#updateSuggestions}
								@change=${this.#updateSuggestions}
							/>
							<datalist id="search-suggestions">
								${this.suggestions.map((suggestion) => html`<option>${suggestion}</option>`)}
							</datalist>
						</input-wrapper>
						<button
							type="submit"
							data-icon-button
						>
							<sr-only>Search</sr-only>
							<iconify-icon icon="mdi:search" aria-hidden="true"></iconify-icon>
						</button>
					</form>
				</search>

				<button
					data-icon-button
					type="button"
					popovertarget="app-menu"
					popovertargetaction="show"
				>
					<sr-only>Open Menu</sr-only>
					<iconify-icon icon="mdi:ellipsis-horizontal" aria-hidden="true"></iconify-icon>
				</button>
				<dialog
					id="app-menu"
					popover
				>
					<header>
						<h2>Menu</h2>
						<button
							data-icon-button
							type="button"
							popovertarget="app-menu"
							popovertargetaction="hide"
						>
							<sr-only>Close Menu</sr-only>
							<iconify-icon icon="mdi:close" aria-hidden="true"></iconify-icon>
						</button>
					</header>
					<dialog-content>
						<menu @click=${this.#handleButtonClick}>
							<button
								type="button"
								command="--info"
								popovertarget="app-info"
								popovertargetaction="show"
								?disabled=${this.areActionsDisabled}
							>
								<iconify-icon icon="mdi:information" aria-hidden="true"></iconify-icon>
								<span>App Info</span>
							</button>
							<button
								type="button"
								command="--settings"
								?disabled=${this.areActionsDisabled}
							>
								<iconify-icon icon="mdi:settings" aria-hidden="true"></iconify-icon>
								<span>Settings</span>
							</button>

							<div ?hidden=${!this.#hasFileSystem}>
								<hr />
								<button
									type="button"
									command="--import-files"
									?disabled=${this.areActionsDisabled}
								>
									<icon-wrapper>
										<iconify-icon icon="mdi:folder" aria-hidden="true"></iconify-icon>
										<iconify-icon icon="mdi:arrow-up-bold" aria-hidden="true" data-subicon></iconify-icon>
									</icon-wrapper>
									<span>Import Files</span>
								</button>
								<button
									type="button"
									command="--import-data"
									?disabled=${this.areActionsDisabled}
								>
									<icon-wrapper>
										<iconify-icon icon="mdi:database" aria-hidden="true"></iconify-icon>
										<iconify-icon icon="mdi:arrow-up-bold" aria-hidden="true" data-subicon></iconify-icon>
									</icon-wrapper>
									<span>Import Data</span>
								</button>
								<button
									type="button"
									command="--import-covers"
									?disabled=${this.areActionsDisabled}
								>
									<icon-wrapper>
										<iconify-icon icon="mdi:folder-image" aria-hidden="true"></iconify-icon>
										<iconify-icon icon="mdi:arrow-up-bold" aria-hidden="true" data-subicon></iconify-icon>
									</icon-wrapper>
									<span>Import Covers</span>
								</button>
								<button
									type="button"
									command="--extract-covers"
									?disabled=${this.areActionsDisabled}
								>
									<iconify-icon icon="mdi:image-auto-adjust" aria-hidden="true"></iconify-icon>
									<span>Extract Covers</span>
								</button>
								<hr />
								<button
									type="button"
									command="--export-data"
									?disabled=${this.areActionsDisabled}
								>
									<icon-wrapper>
										<iconify-icon icon="mdi:database" aria-hidden="true"></iconify-icon>
										<iconify-icon icon="mdi:arrow-down-bold" aria-hidden="true" data-subicon></iconify-icon>
									</icon-wrapper>
									<span>Export Data</span>
								</button>
								<button
									type="button"
									command="--export-thumbs"
									?disabled=${this.areActionsDisabled}
								>
									<icon-wrapper>
										<iconify-icon icon="mdi:folder-image" aria-hidden="true"></iconify-icon>
										<iconify-icon icon="mdi:arrow-down-bold" aria-hidden="true" data-subicon></iconify-icon>
									</icon-wrapper>
									<span>Export Thumbnails</span>
								</button>
								<button
									type="button"
									command="--export-covers"
									?disabled=${this.areActionsDisabled}
								>
									<icon-wrapper>
										<iconify-icon icon="mdi:folder-image" aria-hidden="true"></iconify-icon>
										<iconify-icon icon="mdi:arrow-down-bold" aria-hidden="true" data-subicon></iconify-icon>
									</icon-wrapper>
									<span>Export Covers</span>
								</button>
							</div>

							<div ?hidden=${!this.#isDevMode}>
								<hr />
								<button
									type="button"
									command="--dev-issues"
									popovertarget="stats-report"
									popovertargetaction="show"
								>
									<iconify-icon icon="mdi:alert" aria-hidden="true"></iconify-icon>
									<span>Report Data Issues</span>
								</button>
								<button
									type="button"
									command="--dev-cbz"
									?disabled=${this.areActionsDisabled}
								>
									<iconify-icon icon="mdi:comic-bubble" aria-hidden="true"></iconify-icon>
									<span>Open CBZ Reader</span>
								</button>
								<button
									type="button"
									command="--dev-emulator"
									?disabled=${this.areActionsDisabled}
								>
									<iconify-icon icon="mdi:gamepad-classic" aria-hidden="true"></iconify-icon>
									<span>Open Emulator</span>
								</button>
								<button
									type="button"
									command="--dev-epub"
									?disabled=${this.areActionsDisabled}
								>
									<iconify-icon icon="mdi:book" aria-hidden="true"></iconify-icon>
									<span>Open EPUB Reader</span>
								</button>
							</div>
						</menu>
					</dialog-content>
				</dialog>
			</nav>
			<app-info></app-info>
			<stats-report></stats-report>
		`;
	}

	handleEvent(evt: Event) {
		if (evt instanceof SearchUpdateEvent) {
			const newSearchString = evt.searchString;

			if (this.value !== newSearchString) {
				this.value = newSearchString;
			}
		}
	}

	override connectedCallback() {
		super.connectedCallback();

		document.addEventListener('--search-update', this);

		// TODO: add search event listener and update local search
		// TODO: register shortcut to search (Alt + F), menu (A lt + M), new (Alt + N)
		// TODO: register gamepad shortcut (Y to trigger search, select for menu, start for new material, B to cancel)
	}
}
