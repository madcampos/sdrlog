import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { type SearchSuggestion, SearchEngine, SearchUpdateEvent } from '../../js/search-engine.ts';

@customElement('top-bar')
export class TopBar extends LitElement {
	@state()
	private accessor value = SearchEngine.toString();

	@state()
	private accessor suggestions: SearchSuggestion[] = [];

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

	override render() {
		return html`
			<button data-icon-button>
				<sr-only>Add Material</sr-only>
				<iconify-icon icon="mdi:playlist-add"></iconify-icon>
			</button>

			<search role="search">
				<form
					action=""
					method="get"
					@submit=${this.#handleSearch}
				>
					<label
						for="search-input"
						title="Search"
					>
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
						<datalist>
							${this.suggestions.map(({ value, text }) => html`<option value="${value}">${text}</option>`)}
						</datalist>
						<button
							type="submit"
							data-icon-button
						>
							<sr-only>Search</sr-only>
							<iconify-icon icon="mdi:search" aria-hidden="true"></iconify-icon>
						</button>
					</label>
				</form>
			</search>

			<button data-icon-button>
				<sr-only>Menu</sr-only>
				<iconify-icon icon="mdi:ellipsis-horizontal"></iconify-icon>
			</button>
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
		// TODO: register shortcut to search (Ctrl + F)
		// TODO: register gamepad shortcut (Y to trigger, B to cancel)
	}
}
