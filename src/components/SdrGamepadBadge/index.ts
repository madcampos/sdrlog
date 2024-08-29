import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-gamepad-badge')
class SdrGamepadBadge extends LitElement {
	static override shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

	static override readonly styles = unsafeCSS(style);

	@property({ type: Boolean, reflect: true })
	accessor disabled: boolean;

	@property({ type: String, reflect: true })
	accessor button: string;

	@state()
	accessor #isPressed: boolean;

	constructor() {
		super();

		this.disabled = true;
		this.button = '';
		this.#isPressed = false;

		window.addEventListener('gamepadconnected', () => {
			this.disabled = false;
		});

		window.addEventListener('gamepaddisconnected', () => {
			this.disabled = true;
		});

		window.addEventListener('gamepadbuttondown', (evt) => {
			if (evt.detail.button === this.button) {
				this.#isPressed = true;
			}
		});

		window.addEventListener('gamepadbuttonup', (evt) => {
			if (evt.detail.button === this.button) {
				this.#isPressed = false;
			}
		});
	}

	get #buttonImage() {
		return import.meta.resolve(`/images/gamepad-buttons/${this.button}.svg`);
	}

	get #buttonPressedImage() {
		return import.meta.resolve(`/images/gamepad-buttons/${this.button}-pressed.svg`);
	}

	override render() {
		return html`
			<span id="icon" ?hidden="${this.disabled}">
				<img ?hidden="${this.#isPressed}" src="${this.#buttonImage}">
				<img ?hidden="${!this.#isPressed}" src="${this.#buttonPressedImage}">
			</span>
		`;
	}
}

export { SdrGamepadBadge };
