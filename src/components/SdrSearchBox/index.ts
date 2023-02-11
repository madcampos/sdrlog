import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import { registerShortcut } from '../../js/util/keyboard';
import { SearchEngine } from './search-engine';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-search-box')
export class SdrSearchBox extends LitElement {
	static readonly elementName = 'sdr-search-box';
	static styles = unsafeCSS(style);

	@property({ type: String, reflect: true }) declare value: string;

	@query('input') declare private input: HTMLInputElement;

	constructor() {
		super();

		registerShortcut('f', () => {
			if (document.activeElement === this) {
				this.blur();
			} else {
				this.focus();
			}
		});

		this.value = SearchEngine.updateFromURL();
	}

	#updateSuggestions() {
		this.value = this.input.value;

		window.requestAnimationFrame(() => {
			const datalist = this.renderRoot.querySelector('datalist') as HTMLDataListElement;

			SearchEngine.updateSuggestions(this.value, datalist);
		});
	}

	#updateFilter() {
		this.value = this.input.value;

		SearchEngine.updateSearchResults(this.value);
	}

	#searchClick() {
		this.input.dispatchEvent(new Event('change'));
	}

	focus() {
		this.input.focus();
	}

	blur() {
		this.input.blur();
	}

	render() {
		return html`
			<label
				for="search-input"
				title="$t{Search}"
			>
				<input
					id="search-input"
					type="search"
					list="search-suggestions"
					placeholder="$t{Search items...}"
					role="search"

					.value="${this.value}"

					@input="${() => this.#updateSuggestions()}"
					@change="${() => this.#updateFilter()}"
				/>
				<datalist id="search-suggestions"></datalist>
				<sdr-button icon="🔍" @click="${() => this.#searchClick()}"></sdr-button>
			</label>
		`;
	}
}
