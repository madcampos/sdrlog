import type { SdrButton } from '../SdrButton';

import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };
import { GamepadHandler } from '../../js/gamepad/gamepad-events';

@customElement('sdr-dropdown-item')
export class SdrDropdownItem extends LitElement {
	static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static formAssociated = true;
	static readonly styles = unsafeCSS(style);

	@property({ type: String, reflect: true }) declare icon: string;
	@property({ type: Boolean, reflect: true }) declare separator: boolean;

	@query('sdr-button') private declare button: SdrButton;

	constructor() {
		super();

		this.icon = '';
		this.separator = false;

		window.addEventListener('gamepadbuttonpress', (evt) => {
			if (document.activeElement === this && evt.detail.button === 'a') {
				evt.stopPropagation();

				this.button.click();

				window.requestAnimationFrame(() => {
					document.querySelector('sdr-card')?.focus();
					GamepadHandler.longVibration();
				});
			}
		});
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
