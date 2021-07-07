import { getFiltersFromTagsString, getFiltersFromURL, getTagStringFromFilters, updateSearchFilter } from './update-filter';

class SearchBox extends HTMLElement {
	#root: ShadowRoot;
	#searchBox: HTMLInputElement;

	constructor() {
		super();

		const template = document.querySelector('#search-box') as HTMLTemplateElement;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));

		this.#searchBox = this.#root.querySelector('input') as HTMLInputElement;

		const initialFilters = getFiltersFromURL();
		const initialValue = getTagStringFromFilters(initialFilters);

		this.#searchBox.value = initialValue;

		// TODO: add button click

		this.#searchBox.addEventListener('change', () => {
			if (!this.#searchBox.value) {
				updateSearchFilter({});
			} else {
				const filters = getFiltersFromTagsString(this.#searchBox.value);

				updateSearchFilter(filters);
			}
		});

		window.addEventListener('search', () => {
			const filters = getFiltersFromURL();
			const tagString = getTagStringFromFilters(filters);

			if (this.#searchBox.value !== tagString) {
				this.#searchBox.value = tagString;
			}
		});

		window.addEventListener('keydown', (evt) => {
			if (evt.ctrlKey && evt.key === 'f') {
				evt.preventDefault();

				if (document.activeElement === this) {
					this.#searchBox.blur();
				} else {
					this.#searchBox.focus();
				}
			}
		});
	}
}

customElements.define('search-box', SearchBox);
