import { updateSearchFilter } from './css-filter';

class SearchBox extends HTMLElement {
	#root: ShadowRoot;
	#searchBox: HTMLInputElement;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<div>
				<label title="Search">🔍<input type="search" placeholder="Search items..." role="search"/></label>
			</div>
		`;

		this.#searchBox = this.#root.querySelector('input') as HTMLInputElement;

		this.#searchBox.addEventListener('change', () => {
			const search = new URLSearchParams([['search', this.#searchBox.value]]);

			// @ts-expect-error setter can be a string.
			document.location = new URL(`?${search.toString()}`, window.location.origin).toString();
			updateSearchFilter(this.#searchBox.value);
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

		const params = new URLSearchParams(window.location.search);

		this.#searchBox.value = params.get('search') ?? '';
	}
}

customElements.define('search-box', SearchBox);
