import type { SdrButton } from '../SdrButton';

import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import { GamepadHandler } from '../../js/gamepad/gamepad-events';
import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-dropdown-item')
class SdrDropdownItem extends LitElement {
	static override shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static formAssociated = true;
	static override readonly styles = unsafeCSS(style);

	@property({ type: String, reflect: true })
	accessor icon: string;

	@property({ type: Boolean, reflect: true })
	accessor separator: boolean;

	@query('sdr-button')
	// @ts-expect-error
	accessor #button: SdrButton;

	constructor() {
		super();

		this.icon = '';
		this.separator = false;

		window.addEventListener('gamepadbuttonpress', (evt) => {
			if (document.activeElement === this && evt.detail.button === 'a') {
				evt.stopPropagation();

				this.#button.click();

				window.requestAnimationFrame(() => {
					document.querySelector('sdr-card')?.focus();
					GamepadHandler.longVibration();
				});
			}
		});
	}

	override render() {
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

export { SdrDropdownItem };
