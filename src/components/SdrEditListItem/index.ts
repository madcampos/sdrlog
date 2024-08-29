import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

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
	accessor disabled: boolean;

	@property({ type: String, reflect: true })
	accessor value: string;

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
			<sdr-button
				icon-button
				small
				title="Remove item"
				id="remove-button"

				@click="${() => this.#removeItem()}"
			>❌</sdr-button>
		`;
	}
}

export { SdrEditListItem };
