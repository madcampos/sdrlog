import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-select')
export class SdrSelect extends LitElement {
	static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static formAssociated = true;
	static readonly styles = unsafeCSS(style);

	@property({ type: String, reflect: true }) declare value: string;
	@property({ type: Array }) declare values: string[];
	@property({ type: Boolean, reflect: true }) declare disabled: boolean;
	@property({ type: Boolean, reflect: true }) declare required: boolean;
	@property({ type: Boolean, reflect: true }) declare readonly: boolean;

	@query('select') private declare select: HTMLSelectElement;

	@queryAssignedElements({ selector: 'optgroup, option' }) private declare items: (HTMLOptGroupElement | HTMLOptionElement)[];

	#internals: ElementInternals;

	constructor() {
		super();

		this.#internals = this.attachInternals();

		this.value = '';
		this.values = [];
		this.disabled = false;
		this.required = false;
		this.readonly = false;

		window.addEventListener('gamepadbuttondown', (evt) => {
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
		this.value = this.select.value;

		this.#validate();

		this.dispatchEvent(new CustomEvent('input', { bubbles: true, composed: true, cancelable: true }));
	}

	#change() {
		this.value = this.select.value;

		this.#validate();

		this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true, cancelable: true }));
	}

	#moveItems() {
		this.items.forEach((item) => {
			this.select.appendChild(item);
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
		this.select.selectedIndex = 0;
	}

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
					<option selected disabled hidden value="">$t{Please select an option...}</option>
				</select>

				<sdr-gamepad-badge button="a"></sdr-gamepad-badge>
			</span>

			<div hidden>
				<slot @slotchange="${() => this.#moveItems()}"></slot>
			</div>
		`;
	}
}
