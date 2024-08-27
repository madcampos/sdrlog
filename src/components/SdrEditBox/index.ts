import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import style from './style.css?inline' assert { type: 'css' };

type InputType = 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week';

@customElement('sdr-edit-box')
export class SdrEditBox extends LitElement {
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

	@property({ type: String, reflect: true })
	accessor type: InputType = 'text';

	@property({ type: String, reflect: true })
	accessor pattern: string | undefined = undefined;

	@property({ type: Number, reflect: true })
	accessor minLength: number | undefined = undefined;

	@property({ type: Number, reflect: true })
	accessor maxLength: number | undefined = undefined;

	@property({ type: Number, reflect: true })
	accessor min: number | undefined = undefined;

	@property({ type: Number, reflect: true })
	accessor max: number | undefined = undefined;

	@property({ type: Number, reflect: true })
	accessor step: number | undefined = undefined;

	@query('input')
	// @ts-expect-error
	accessor #inputElement: HTMLInputElement;

	#internals: ElementInternals;

	constructor() {
		super();

		this.value = '';
		this.disabled = false;
		this.required = false;
		this.readonly = false;

		this.#internals = this.attachInternals();
	}

	// eslint-disable-next-line complexity
	#validate() {
		let message = '';
		const valueMissing = this.required && this.value === '';

		const typeMismatch = (this.type === 'url' && !(/^https?:\/\/.*/u).test(this.value)) || (this.type === 'email' && !(/^[^@]+@[^@]+$/u).test(this.value));
		const patternMismatch = this.pattern !== undefined && !new RegExp(this.pattern, 'u').test(this.value);

		const tooLong = this.maxLength !== undefined && this.value.length > this.maxLength;
		const tooShort = this.minLength !== undefined && this.value.length < this.minLength;
		let rangeOverflow = false;
		let rangeUnderflow = false;
		let stepMismatch = false;

		let badInput = false;

		if (this.type === 'number') {
			const value = Number(this.value);

			rangeOverflow = this.max !== undefined && value > this.max;
			rangeUnderflow = this.min !== undefined && value < this.min;
			stepMismatch = this.step !== undefined && (value % this.step !== 0);
			badInput = Number.isNaN(value);
		}

		if (this.type === 'date' || this.type === 'time' || this.type === 'datetime-local' || this.type === 'month' || this.type === 'week') {
			const value = new Date(this.value);

			rangeOverflow = this.max !== undefined && value > new Date(this.max);
			rangeUnderflow = this.min !== undefined && value < new Date(this.min);
			badInput = Number.isNaN(value.getTime());
		}

		if (tooLong || tooShort || rangeOverflow || rangeUnderflow || stepMismatch || badInput) {
			message = 'Invalid value';
		}

		if (valueMissing) {
			message = 'Required';
		}

		if (typeMismatch || patternMismatch) {
			message = 'Invalid format';
		}

		this.#internals.setValidity({
			valueMissing,
			typeMismatch,
			patternMismatch,
			tooLong,
			tooShort,
			rangeOverflow,
			rangeUnderflow,
			stepMismatch,
			badInput,
			customError: false
		}, message);
	}

	#input() {
		this.value = this.#inputElement.value;

		this.#validate();

		this.dispatchEvent(new CustomEvent('input', { bubbles: true, composed: true, cancelable: true }));
	}

	#change() {
		this.value = this.#inputElement.value;

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
		this.#inputElement.value = '';
	}

	override render() {
		return html`
			<label for="input">
				<slot name="label"></slot>
			</label>
			<input
				id="input"

				.value="${this.value}"

				placeholder="${ifDefined(this.placeholder)}"
				?readonly="${this.readonly}"
				?disabled="${this.disabled}"
				?required="${this.required}"

				type="${this.type}"
				pattern="${ifDefined(this.pattern)}"

				minlength="${ifDefined(this.minLength)}"
				maxlength="${ifDefined(this.maxLength)}"

				min="${ifDefined(this.min)}"
				max="${ifDefined(this.max)}"
				step="${ifDefined(this.step)}"

				@change="${() => this.#change()}"
				@input="${() => this.#input()}"
			/>
		`;
	}
}
