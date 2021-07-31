import type { CustomButton } from '../button/button';
import { I18n } from '../intl/translations';

import { getFiltersFromTagsString, getFiltersFromURL, getTagStringFromFilters, updateSearchFilter } from './update-filter';

class SearchBox extends HTMLElement {
	#root: ShadowRoot;
	#searchBox: HTMLInputElement;
	#searchButton: CustomButton;

	constructor() {
		super();

		const template = document.querySelector('#search-box') as HTMLTemplateElement;
		const translatedTemplate = I18n.translateElementsContent(template.content.cloneNode(true));

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(translatedTemplate);

		this.#searchBox = this.#root.querySelector('input') as HTMLInputElement;
		this.#searchButton = this.#root.querySelector('custom-button') as CustomButton;

		const initialFilters = getFiltersFromURL();
		const initialValue = getTagStringFromFilters(initialFilters);

		this.#searchBox.value = initialValue;

		this.#searchButton.addEventListener('click', () => {
			this.#searchBox.dispatchEvent(new Event('change'));
		});

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

		window.addEventListener('keyup', (evt) => {
			if (evt.ctrlKey && evt.key === 'f') {
				evt.preventDefault();

				if (document.activeElement === this) {
					this.#searchBox.blur();
				} else {
					this.#searchBox.focus();
				}
			}
		}, { capture: false });
	}
}

customElements.define('search-box', SearchBox);
