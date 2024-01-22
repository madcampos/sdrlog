import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { marked } from 'marked';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-textarea')
export class SdrTextArea extends LitElement {
	static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static formAssociated = true;
	static readonly styles = unsafeCSS(style);

	@property({ type: String, reflect: true }) accessor value = '';
	@property({ type: String, reflect: true }) accessor placeholder: string | undefined;
	@property({ type: Boolean, reflect: true }) accessor disabled = false;
	@property({ type: Boolean, reflect: true }) accessor required = false;
	@property({ type: Boolean, reflect: true }) accessor readonly = false;
	@property({ type: Number, reflect: true }) accessor minLength: number | undefined;
	@property({ type: Number, reflect: true }) accessor maxLength: number | undefined;

	@query('article') accessor #renderedTextArea: HTMLElement;

	#internals: ElementInternals;

	constructor() {
		super();

		this.#internals = this.attachInternals();
	}

	#validate() {
		let message = '';
		const valueMissing = this.required && this.value === '';

		const tooLong = this.maxLength !== undefined && this.value.length > this.maxLength;
		const tooShort = this.minLength !== undefined && this.value.length < this.minLength;

		if (tooLong || tooShort) {
			message = 'Invalid value';
		}

		if (valueMissing) {
			message = 'Required';
		}

		this.#internals.setValidity({
			valueMissing,
			tooLong,
			tooShort,
			customError: false
		}, message);
	}

	#input(evt: Event) {
		const target = evt.target as HTMLTextAreaElement;

		this.value = target.value;

		this.#validate();

		this.dispatchEvent(new CustomEvent('input', { bubbles: true, composed: true, cancelable: true }));
	}

	async #change(evt: Event) {
		const target = evt.target as HTMLTextAreaElement;

		this.value = target.value;
		this.#renderedTextArea.innerHTML = await marked(this.value);

		this.#validate();

		this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, cancelable: true }));
	}

	get form() { return this.#internals.form; }
	get name() { return this.getAttribute('name'); }
	get validity() { return this.#internals.validity; }
	get validationMessage() { return this.#internals.validationMessage; }
	get willValidate() { return this.#internals.willValidate; }

	checkValidity() { return this.#internals.checkValidity(); }
	reportValidity() { return this.#internals.reportValidity(); }
	setCustomValidity(message: string) { this.#internals.setValidity({ customError: message !== '' }, message); }

	resetValue() {
		this.value = '';
	}

	async updated(changedProperties: Map<string, unknown>) {
		super.updated(changedProperties);

		if (changedProperties.has('value')) {
			this.#renderedTextArea.innerHTML = await marked(this.value);
		}
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

			.value="${this.value}"

			placeholder="${this.placeholder}"
			?disabled="${this.disabled}"
			?required="${this.required}"
			?readonly="${this.readonly}"

			minlength="${this.minLength}"
			maxlength="${this.maxLength}"

			@change="${async (evt: Event) => this.#change(evt)}"
			@input="${(evt: Event) => this.#input(evt)}"
		></textarea>
		`;
	}
}
