import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { GamepadHandler } from '../../js/gamepad/gamepad-events';

import { registerShortcut } from '../../js/util/keyboard';
import { Router } from '../../router/router';
import { SearchEngine } from './search-engine';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-search-box')
class SdrSearchBox extends LitElement {
	static override shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static formAssociated = true;
	static override readonly styles = unsafeCSS(style);

	@property({ type: String, reflect: true })
	accessor value: string;

	@query('input')
	// @ts-expect-error
	accessor #input: HTMLInputElement;

	constructor() {
		super();

		this.value = '';

		registerShortcut('f', () => {
			if (document.activeElement === this) {
				this.blur();
			} else {
				this.focus();
			}
		});

		this.value = SearchEngine.updateFromURL();

		window.addEventListener('gamepadbuttonpress', (evt) => {
			if (Router.currentPath === '/' && evt.detail.button === 'y') {
				evt.stopPropagation();

				this.#input.focus();
				GamepadHandler.longVibration();
			}

			if (document.activeElement === this && evt.detail.button === 'b') {
				evt.stopPropagation();

				document.querySelector('sdr-card')?.focus();
				GamepadHandler.shortVibration();
			}

			// TODO: add gamepad and keyboard support for search suggestions
		});
	}

	#updateSuggestions() {
		this.value = this.#input.value;

		window.requestAnimationFrame(() => {
			const datalist = this.renderRoot.querySelector('datalist') as HTMLDataListElement;

			SearchEngine.updateSuggestions(this.value, datalist);
		});
	}

	#updateFilter() {
		this.value = this.#input.value;

		SearchEngine.updateSearchResults(this.value);
	}

	#searchClick() {
		this.#input.dispatchEvent(new Event('change'));
	}

	override render() {
		return html`
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

					.value="${this.value}"

					@input="${() => this.#updateSuggestions()}"
					@change="${() => this.#updateFilter()}"
				/>
				<datalist id="search-suggestions"></datalist>
				<span id="icon-container">
					<sdr-gamepad-badge button="y"></sdr-gamepad-badge>
				</span>
				<sdr-button icon="🔍" @click="${() => this.#searchClick()}"></sdr-button>
			</label>
		`;
	}
}

export { SdrSearchBox };
