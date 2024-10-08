import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-select')
class SdrSelect extends LitElement {
	static override shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static formAssociated = true;
	static override readonly styles = unsafeCSS(style);

	@property({ type: String, reflect: true })
	accessor value: string;

	@property({ type: Array })
	accessor values: string[];

	@property({ type: Boolean, reflect: true })
	accessor disabled: boolean;

	@property({ type: Boolean, reflect: true })
	accessor required: boolean;

	@property({ type: Boolean, reflect: true })
	accessor readonly: boolean;

	@query('select')
	// @ts-expect-error
	accessor #select: HTMLSelectElement;

	@queryAssignedElements({ selector: 'optgroup, option' })
	// @ts-expect-error
	accessor #items: (HTMLOptGroupElement | HTMLOptionElement)[];

	#internals: ElementInternals;

	constructor() {
		super();

		this.#internals = this.attachInternals();

		this.value = '';
		this.values = [];
		this.disabled = false;
		this.required = false;
		this.readonly = false;

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
		this.#select.selectedIndex = 0;
	}

	// TODO: implement custom select
	override render() {
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

export { SdrSelect };
