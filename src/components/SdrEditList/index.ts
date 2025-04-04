import type { SdrEditListItem } from '../SdrEditListItem';

import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

declare global {
	interface GlobalEventHandlersEventMap {
		itemadded: CustomEvent;
	}
}

@customElement('sdr-edit-list')
class SdrEditList extends LitElement {
	static override shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static override readonly styles = unsafeCSS(style);

	#isDisabled = false;

	get disabled() {
		return this.#isDisabled;
	}

	@property({ type: Boolean, reflect: true })
	set disabled(value: boolean) {
		const oldValue = this.#isDisabled;

		this.#isDisabled = value;

		this.#items.forEach((item) => {
			item.disabled = value;
		});

		this.requestUpdate('disabled', oldValue);
	}

	@property({ type: Boolean, reflect: true })
	accessor open: boolean;

	@queryAssignedElements({ selector: 'sdr-edit-list-item' })
	// @ts-expect-error
	accessor #items: SdrEditListItem[];

	constructor() {
		super();

		this.open = false;
	}

	#updateSlots() {
		this.#items.forEach((item) => {
			item.disabled = this.disabled;
		});
	}

	resetValue() {
		this.#items.forEach((item) => {
			item.remove();
		});
	}

	#addItem() {
		this.dispatchEvent(new CustomEvent('itemadded', { bubbles: true, composed: true, cancelable: true }));
	}

	override render() {
		return html`
			<details
				?open="${this.open}"
			>
				<summary>
					<slot name="label"></slot>
				</summary>

				<div id="input-container" hidden>
					<slot name="input"></slot>
					<sdr-button
						icon-button
						id="add-button"
						title="Add item"

						@click="${() => this.#addItem()}"
					>➕</sdr-button>
				</div>

				<article id="items-container">
					<slot @slotchange="${() => this.#updateSlots()}"></slot>
				</article>
			</details>
		`;
	}
}

export { SdrEditList };
