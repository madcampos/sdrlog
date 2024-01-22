import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-button')
export class SdrButton extends LitElement {
	static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static formAssociated = true;
	static readonly styles = unsafeCSS(style);

	@property({ type: Boolean, reflect: true }) accessor disabled = false;
	@property({ type: String, reflect: true }) accessor icon = '';
	@property({ type: String, reflect: true, attribute: 'trigger-button' }) accessor triggerButton: string = 'a';

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
				<sdr-gamepad-badge button="${this.triggerButton}"></sdr-gamepad-badge>
			</button>
		`;
	}
}
