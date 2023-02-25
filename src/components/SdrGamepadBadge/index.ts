import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-gamepad-badge')
export class SdrGamepadBadge extends LitElement {
	static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static styles = unsafeCSS(style);

	@property({ type: Boolean, reflect: true }) declare disabled: boolean;
	@property({ type: String, reflect: true }) declare button: string;

	@state() declare private isPressed: boolean;

	constructor() {
		super();

		this.disabled = false;
		this.isPressed = false;
		this.button = '';

		window.addEventListener('gamepadconnected', () => {
			this.disabled = false;
		});

		window.addEventListener('gamepaddisconnected', () => {
			this.disabled = true;
		});

		window.addEventListener('gamepadbuttondown', (evt) => {
			if (evt.detail.button === this.button) {
				this.isPressed = true;
			}
		});

		window.addEventListener('gamepadbuttonup', (evt) => {
			if (evt.detail.button === this.button) {
				this.isPressed = false;
			}
		});
	}

	render() {
		return html`
			<span id="icon" ?hidden="${this.disabled}">
				<img ?hidden="${!this.isPressed}" src="${`images/gamepad-buttons/${this.button}.svg`}">
				<img ?hidden="${this.isPressed}" src="${`images/gamepad-buttons/${this.button}-pressed.svg`}">
			</span>
		`;
	}
}
