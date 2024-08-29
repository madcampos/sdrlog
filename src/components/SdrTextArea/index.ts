import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { marked } from 'marked';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-textarea')
class SdrTextArea extends LitElement {
	static override shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static formAssociated = true;
	static override readonly styles = unsafeCSS(style);

	@property({ type: String, reflect: true })
	accessor value: string;

	@property({ type: String, reflect: true })
	accessor placeholder: string | undefined = undefined;

	@property({ type: Boolean, reflect: true })
	accessor disabled: boolean;

	@property({ type: Boolean, reflect: true })
	accessor required: boolean;

	@property({ type: Boolean, reflect: true })
	accessor readonly: boolean;

	@property({ type: Number, reflect: true })
	accessor minLength: number | undefined = undefined;

	@property({ type: Number, reflect: true })
	accessor maxLength: number | undefined = undefined;

	@query('article')
	// @ts-expect-error
	accessor #renderedTextArea: HTMLElement;

	#internals: ElementInternals;

	constructor() {
		super();

		this.#internals = this.attachInternals();

		this.value = '';
		this.disabled = false;
		this.required = false;
		this.readonly = false;
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

	get form() {
		return this.#internals.form;
	}
	get name() {
		return this.getAttribute('name');
	}
	get validity() {
		return this.#internals.validity;
	}
	get validationMessage() {
		return this.#internals.validationMessage;
	}
	get willValidate() {
		return this.#internals.willValidate;
	}

	checkValidity() {
		return this.#internals.checkValidity();
	}
	reportValidity() {
		return this.#internals.reportValidity();
	}
	setCustomValidity(message: string) {
		this.#internals.setValidity({ customError: message !== '' }, message);
	}

	resetValue() {
		this.value = '';
	}

	override async updated(changedProperties: Map<string, unknown>) {
		super.updated(changedProperties);

		if (changedProperties.has('value')) {
			this.#renderedTextArea.innerHTML = await marked(this.value);
		}
	}

	override render() {
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

			placeholder="${ifDefined(this.placeholder)}"
			?disabled="${this.disabled}"
			?required="${this.required}"
			?readonly="${this.readonly}"

			minlength="${ifDefined(this.minLength)}"
			maxlength="${ifDefined(this.maxLength)}"

			@change="${async (evt: Event) => this.#change(evt)}"
			@input="${(evt: Event) => this.#input(evt)}"
		></textarea>
		`;
	}
}

export { SdrTextArea };
