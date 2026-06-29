import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { SearchEngine, SearchUpdateEvent } from '../../js/search-engine.ts';

@customElement('top-bar')
export class TopBar extends LitElement {
	@state()
	private accessor value = SearchEngine.toString();

	@state()
	private accessor suggestions: string[] = [];

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

	#handleButtonClick(evt: MouseEvent) {
		if (!(evt.target instanceof HTMLButtonElement)) {
			return;
		}

		switch (evt.target.command) {
			case '--new-item':
				window.navigation.navigate('/new');
				break;
			case '--info':
				window.navigation.navigate('/info');
				break;
			case '--settings':
				window.navigation.navigate('/settings');
				break;
			case '--import-files':
				break;
			case '--import-data':
				break;
			case '--import-covers':
				break;
			case '--extract-covers':
				break;
			case '--export-data':
				break;
			case '--export-thumbs':
				break;
			case '--export-covers':
				break;
			case '--dev-issues':
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

	override render() {
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
						@submit=${this.#handleSearch}
					>
						<!-- TODO: use custom selet instead -->
						<button
							type="button"
							data-icon-button
							commandfor="search-filter-list"
							command="show-popover"
							data-dropdown-anchor
						>
							<sr-only>Filter Materials</sr-only>
							<iconify-icon icon="mdi:filter-variant" aria-hidden="true"></iconify-icon>
						</button>
						<dropdown-menu
							popover
							id="search-filter-list"
						>
							<menu>
								<button
									type="button"
									commandfor="search-filter-list"
									command="hide-popover"
									data-filter="category: sourcebook"
								>
									<iconify-icon icon="mdi:scroll-text" aria-hidden="true"></iconify-icon>
									<span>Sourcebook</span>
								</button>
								<button
									type="button"
									commandfor="search-filter-list"
									command="hide-popover"
									data-filter="category: rulebook"
								>
									<iconify-icon icon="mdi:pencil-ruler" aria-hidden="true"></iconify-icon>
									<span>Rulebook</span>
								</button>
								<button
									type="button"
									commandfor="search-filter-list"
									command="hide-popover"
									data-filter="category: mission"
								>
									<iconify-icon icon="mdi:map" aria-hidden="true"></iconify-icon>
									<span>Adventures & Campaigns</span>
								</button>
								<button
									type="button"
									commandfor="search-filter-list"
									command="hide-popover"
									data-filter="category: novel"
								>
									<iconify-icon icon="mdi:bookshelf" aria-hidden="true"></iconify-icon>
									<span>Novel</span>
								</button>
								<button
									type="button"
									commandfor="search-filter-list"
									command="hide-popover"
									data-filter="category: magazine"
								>
									<iconify-icon icon="mdi:book-open-variant" aria-hidden="true"></iconify-icon>
									<span>Magazines</span>
								</button>
								<button
									type="button"
									commandfor="search-filter-list"
									command="hide-popover"
									data-filter="category: boardgame"
								>
									<iconify-icon icon="mdi:dice-multiple" aria-hidden="true"></iconify-icon>
									<span>Boardgame/Tabletop</span>
								</button>
								<button
									type="button"
									commandfor="search-filter-list"
									command="hide-popover"
									data-filter="category: tcg"
								>
									<iconify-icon icon="mdi:cards-playing" aria-hidden="true"></iconify-icon>
									<span>Trading Card Game</span>
								</button>
								<button
									type="button"
									commandfor="search-filter-list"
									command="hide-popover"
									data-filter="category: videogame"
								>
									<iconify-icon icon="mdi:gamepad-classic" aria-hidden="true"></iconify-icon>
									<span>Video Game</span>
								</button>
								<button
									type="button"
									commandfor="search-filter-list"
									command="hide-popover"
									data-filter="category: unofficial"
								>
									<iconify-icon icon="mdi:flask" aria-hidden="true"></iconify-icon>
									<span>Unofficial</span>
								</button>
								<button
									type="button"
									commandfor="search-filter-list"
									command="hide-popover"
									data-filter="category: misc"
								>
									<iconify-icon icon="mdi:puzzle" aria-hidden="true"></iconify-icon>
									<span>Misc.</span>
								</button>

								<hr />

								<button
									type="button"
									commandfor="search-filter-list"
									command="hide-popover"
									data-filter=""
								>
									<iconify-icon icon="mdi:star" aria-hidden="true"></iconify-icon>
									<span>All</span>
								</button>
							</menu>
						</dropdown-menu>

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
							<button type="button" command="--info">
								<iconify-icon icon="mdi:information" aria-hidden="true"></iconify-icon>
								<span>App Info</span>
							</button>
							<button type="button" command="--settings">
								<iconify-icon icon="mdi:settings" aria-hidden="true"></iconify-icon>
								<span>Settings</span>
							</button>

							<div ?hidden=${!this.#hasFileSystem}>
								<hr />
								<button type="button" command="--import-files">
									<icon-wrapper>
										<iconify-icon icon="mdi:folder" aria-hidden="true"></iconify-icon>
										<iconify-icon icon="mdi:arrow-up-bold" aria-hidden="true" data-subicon></iconify-icon>
									</icon-wrapper>
									<span>Import Files</span>
								</button>
								<button type="button" command="--import-data">
									<icon-wrapper>
										<iconify-icon icon="mdi:database" aria-hidden="true"></iconify-icon>
										<iconify-icon icon="mdi:arrow-up-bold" aria-hidden="true" data-subicon></iconify-icon>
									</icon-wrapper>
									<span>Import Data</span>
								</button>
								<button type="button" command="--import-covers">
									<icon-wrapper>
										<iconify-icon icon="mdi:folder-image" aria-hidden="true"></iconify-icon>
										<iconify-icon icon="mdi:arrow-up-bold" aria-hidden="true" data-subicon></iconify-icon>
									</icon-wrapper>
									<span>Import Covers</span>
								</button>
								<button type="button" command="--extract-covers">
									<iconify-icon icon="mdi:image-auto-adjust" aria-hidden="true"></iconify-icon>
									<span>Extract Covers</span>
								</button>
								<hr />
								<button type="button" command="--export-data">
									<icon-wrapper>
										<iconify-icon icon="mdi:database" aria-hidden="true"></iconify-icon>
										<iconify-icon icon="mdi:arrow-down-bold" aria-hidden="true" data-subicon></iconify-icon>
									</icon-wrapper>
									<span>Export Data</span>
								</button>
								<button type="button" command="--export-thumbs">
									<icon-wrapper>
										<iconify-icon icon="mdi:folder-image" aria-hidden="true"></iconify-icon>
										<iconify-icon icon="mdi:arrow-down-bold" aria-hidden="true" data-subicon></iconify-icon>
									</icon-wrapper>
									<span>Export Thumbnails</span>
								</button>
								<button type="button" command="--export-covers">
									<icon-wrapper>
										<iconify-icon icon="mdi:folder-image" aria-hidden="true"></iconify-icon>
										<iconify-icon icon="mdi:arrow-down-bold" aria-hidden="true" data-subicon></iconify-icon>
									</icon-wrapper>
									<span>Export Covers</span>
								</button>
							</div>

							<div ?hidden=${!this.#isDevMode}>
								<hr />
								<button type="button" command="--dev-issues">
									<iconify-icon icon="mdi:alert" aria-hidden="true"></iconify-icon>
									<span>Report Data Issues</span>
								</button>
								<button type="button" command="--dev-cbz">
									<iconify-icon icon="mdi:comic-bubble" aria-hidden="true"></iconify-icon>
									<span>Open CBZ Reader</span>
								</button>
								<button type="button" command="--dev-emulator">
									<iconify-icon icon="mdi:gamepad-classic" aria-hidden="true"></iconify-icon>
									<span>Open Emulator</span>
								</button>
								<button type="button" command="--dev-epub">
									<iconify-icon icon="mdi:book" aria-hidden="true"></iconify-icon>
									<span>Open EPUB Reader</span>
								</button>
							</div>
						</menu>
					</dialog-content>
				</dialog>
			</nav>
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
