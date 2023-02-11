import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-edit-list-item')
export class SdrEditListItem extends LitElement {
	static readonly elementName = 'sdr-edit-list-item';
	static readonly styles = unsafeCSS(style);

	@property({ type: Boolean, reflect: true }) declare disabled: boolean;
	@property({ type: String, reflect: true }) declare value: string;

	constructor() {
		super();

		this.disabled = false;
		this.value = '';
	}

	#removeItem() {
		this.dispatchEvent(new CustomEvent('remove-item', { bubbles: true, composed: true, cancelable: true }));
	}

	render() {
		return html`
			<slot></slot>
			<sdr-button
				icon-button
				small
				title="$t{Remove item}"
				id="remove-button"

				@click="${() => this.#removeItem()}"
			>❌</sdr-button>
		`;
	}
}
