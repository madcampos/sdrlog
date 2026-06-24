import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import style from './style.css?inline' with { type: 'css' };

declare global {
	interface GlobalEventHandlersEventMap {
		itemremoved: CustomEvent<{ value: string }>;
	}
}

@customElement('sdr-edit-list-item')
class SdrEditListItem extends LitElement {
	static override shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static override readonly styles = unsafeCSS(style);

	@property({ type: Boolean, reflect: true })
	disabled: boolean;

	@property({ type: String, reflect: true })
	value: string;

	constructor() {
		super();

		this.disabled = false;
		this.value = '';
	}

	#removeItem() {
		this.dispatchEvent(new CustomEvent('itemremoved', { bubbles: true, composed: true, cancelable: true, detail: { value: this.value } }));
	}

	override render() {
		return html`
			<slot></slot>
			<button
				id="remove-button"

				@click="${() => this.#removeItem()}"
			>
				<sr-only>Remove Item</sr-only>
				<iconify-icon icon="mdi:close" aria-hidden="true"></iconify-icon>
			</button>
		`;
	}
}

export { SdrEditListItem };
