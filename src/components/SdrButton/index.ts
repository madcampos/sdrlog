import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-button')
export class SdrButton extends LitElement {
	static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static formAssociated = true;
	static readonly styles = unsafeCSS(style);

	@property({ type: Boolean, reflect: true }) disabled: boolean;
	@property({ type: String, reflect: true }) icon: string;
	@property({ type: String, reflect: true, attribute: 'trigger-button' }) triggerButton?: string;

	constructor() {
		super();

		this.disabled = false;
		this.icon = '';
	}

	render() {
		return html`
			<button
				type="button"
				?disabled=${this.disabled}
			>
				<span id="button-icon">${this.icon}</span>
				<span id="button-text">
					<slot></slot>
				</span>
				<sdr-gamepad-badge button="${this.triggerButton ?? 'a'}"></sdr-gamepad-badge>
			</button>
		`;
	}
}
