import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { marked } from 'marked';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-textarea')
export class SdrTextArea extends LitElement {
	static readonly elementName = 'sdr-textarea';
	static styles = unsafeCSS(style);

	@property({ type: String, reflect: true }) declare value: string;
	@property({ type: Boolean, reflect: true }) declare disabled: boolean;
	@property({ type: Boolean, reflect: true }) declare required: boolean;
	@property({ type: Boolean, reflect: true }) declare readonly: boolean;

	@query('textarea') declare private textArea: HTMLTextAreaElement;
	@query('article') declare private renderedTextArea: HTMLElement;

	constructor() {
		super();

		this.value = '';
		this.disabled = false;
		this.required = false;
		this.readonly = false;
	}

	#input() {
		this.value = this.textArea.value;
		this.dispatchEvent(new CustomEvent('input', { bubbles: true, composed: true, cancelable: true }));
	}

	#change() {
		this.value = this.textArea.value;
		this.renderedTextArea.innerHTML = marked(this.value);
		this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, cancelable: true }));
	}

	resetValue() {
		this.value = '';
	}

	render() {
		return html`
		<label for="textarea">
			<slot name="label"></slot>
		</label>
		<div id="rendered-text">
			<article></article>
		</div>
		<textarea
			id="textarea"
			?disabled="${this.disabled}"
			?required="${this.required}"
			?readonly="${this.readonly}"

			.value="${this.value}"

			@change="${() => this.#change()}"
			@input="${() => this.#input()}"
		></textarea>
		`;
	}
}
