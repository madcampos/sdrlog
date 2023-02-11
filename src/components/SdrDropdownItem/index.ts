import type { SdrButton } from '../SdrButton';

import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';


import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-dropdown-item')
export class SdrDropdownItem extends LitElement {
	static readonly elementName = 'sdr-dropdown-item';
	static styles = unsafeCSS(style);

	@property({ type: String, reflect: true }) declare icon: string;
	@property({ type: Boolean, reflect: true }) declare separator: boolean;

	@query('sdr-button') declare private button: SdrButton;

	constructor() {
		super();

		this.icon = '';
		this.separator = false;
	}

	focus() {
		this.button.focus();
	}

	render() {
		if (this.separator) {
			return html`<hr />`;
		}

		return html`
			<sdr-button
				wide
				icon="${this.icon}"
			>
				<slot></slot>
			</sdr-button>
		`;
	}
}
