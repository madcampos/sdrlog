import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-edit-box')
export class SdrEditBox extends LitElement {
	static readonly elementName = 'sdr-edit-box';
	static styles = unsafeCSS(style);

	@property({ type: String, reflect: true }) declare value: string;
	@property({ type: Boolean, reflect: true }) declare disabled: boolean;
	@property({ type: Boolean, reflect: true }) declare required: boolean;
	@property({ type: Boolean, reflect: true }) declare readonly: boolean;
	@property({ type: String, reflect: true }) declare type: string;
	@property({ type: Number, reflect: true }) declare min?: number;
	@property({ type: Number, reflect: true }) declare max?: number;
	@property({ type: Number, reflect: true }) declare step?: number;

	@query('input') declare private input: HTMLInputElement;

	constructor() {
		super();

		this.value = '';
		this.disabled = false;
		this.required = false;
		this.readonly = false;
		this.type = 'text';
	}

	#input() {
		this.value = this.input.value;
		this.dispatchEvent(new CustomEvent('input', { bubbles: true, composed: true, cancelable: true }));
	}

	#change() {
		this.value = this.input.value;
		this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, cancelable: true }));
	}

	resetValue() {
		this.input.value = '';
	}

	focus() {
		this.input.focus();
	}

	render() {
		return html`
			<label for="input">
				<slot name="label"></slot>
			</label>
			<input
				id="input"

				.value="${this.value}"
				?readonly="${this.readonly}"
				?disabled="${this.disabled}"
				?required="${this.required}"

				type="${this.type}"
				min="${this.min}"
				max="${this.max}"
				step="${this.step}"

				@change="${() => this.#change()}"
				@input="${() => this.#input()}"
			/>
		`;
	}
}
