import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-select')
export class SdrSelect extends LitElement {
	static readonly elementName = 'sdr-select';
	static styles = unsafeCSS(style);

	@property({ type: String, reflect: true }) declare value: string;
	@property({ type: Array }) declare values: string[];
	@property({ type: Boolean, reflect: true }) declare disabled: boolean;
	@property({ type: Boolean, reflect: true }) declare required: boolean;
	@property({ type: Boolean, reflect: true }) declare readonly: boolean;

	@query('select') declare private select: HTMLSelectElement;

	@queryAssignedElements({ selector: 'optgroup, option' }) declare private items: (HTMLOptGroupElement | HTMLOptionElement)[];

	constructor() {
		super();

		this.value = '';
		this.values = [];
		this.disabled = false;
		this.required = false;
		this.readonly = false;
	}

	#input() {
		this.value = this.select.value;
		this.dispatchEvent(new CustomEvent('input', { bubbles: true, composed: true, cancelable: true }));
	}

	#change() {
		this.value = this.select.value;
		this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, cancelable: true }));
	}

	#moveItems() {
		this.items.forEach((item) => {
			this.select.appendChild(item);
		});
	}

	resetValue() {
		this.select.selectedIndex = 0;
	}

	focus() {
		this.select.focus();
	}

	render() {
		return html`
			<label for="select">
				<slot name="label"></slot>
			</label>

			<select
				id="select"

				?disabled="${this.disabled}"
				?required="${this.required}"
				?readonly="${this.readonly}"

				@change="${() => this.#change()}"
				@input="${() => this.#input()}"
			>
				<option selected disabled hidden value="">$t{Please select an option...}</option>
			</select>

			<div hidden>
				<slot @slotchange="${() => this.#moveItems()}"></slot>
			</div>
		`;
	}
}
