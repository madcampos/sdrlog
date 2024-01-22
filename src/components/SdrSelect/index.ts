import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-select')
export class SdrSelect extends LitElement {
	static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static formAssociated = true;
	static readonly styles = unsafeCSS(style);

	@property({ type: String, reflect: true }) accessor value = '';
	@property({ type: Array }) accessor values: string[] = [];
	@property({ type: Boolean, reflect: true }) accessor disabled = false;
	@property({ type: Boolean, reflect: true }) accessor required = false;
	@property({ type: Boolean, reflect: true }) accessor readonly = false;

	@query('select') accessor #select: HTMLSelectElement;

	@queryAssignedElements({ selector: 'optgroup, option' }) accessor #items: (HTMLOptGroupElement | HTMLOptionElement)[];

	#internals: ElementInternals;

	constructor() {
		super();

		this.#internals = this.attachInternals();

		window.addEventListener('gamepadbuttondown', () => {
			// TODO: implement gamepad interaction
		});
	}

	#validate() {
		let message = '';
		const valueMissing = this.required && this.value === '';

		if (valueMissing) {
			message = 'Required';
		}

		this.#internals.setValidity({
			valueMissing,
			customError: false
		}, message);
	}

	#input() {
		this.value = this.#select.value;

		this.#validate();

		this.dispatchEvent(new CustomEvent('input', { bubbles: true, composed: true, cancelable: true }));
	}

	#change() {
		this.value = this.#select.value;

		this.#validate();

		this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, cancelable: true }));
	}

	#moveItems() {
		this.#items.forEach((item) => {
			this.#select.appendChild(item);
		});
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
		this.#select.selectedIndex = 0;
	}

	// TODO: implement custom select
	render() {
		return html`
			<label for="select">
				<slot name="label"></slot>
			</label>

			<span>
				<select
					id="select"

					.value="${this.value}"

					?disabled="${this.disabled}"
					?required="${this.required}"
					?readonly="${this.readonly}"

					@change="${() => this.#change()}"
					@input="${() => this.#input()}"
				>
					<option selected disabled hidden value="">Please select an option...</option>
				</select>

				<sdr-gamepad-badge button="a"></sdr-gamepad-badge>
			</span>

			<div hidden>
				<slot @slotchange="${() => this.#moveItems()}"></slot>
			</div>
		`;
	}
}
