import type { SdrDropdownItem } from '../SdrDropdownItem';

import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js';

import { GamepadHandler } from '../../js/gamepad/gamepad-events';
import { Router } from '../../router/router';
import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-dropdown')
export class SdrDropdown extends LitElement {
	static override shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static override readonly styles = unsafeCSS(style);

	@property({ type: String, reflect: true })
	accessor icon: string;

	@property({ type: Boolean, reflect: true })
	accessor open: boolean;

	@property({ type: String, reflect: true, attribute: 'trigger-button' })
	accessor triggerButton: string;

	@query('dialog')
	// @ts-expect-error
	accessor #dialog: HTMLDialogElement;

	@queryAssignedElements({ selector: 'sdr-dropdown-item' })
	// @ts-expect-error
	accessor #items: SdrDropdownItem[];

	constructor() {
		super();

		this.icon = '';
		this.open = false;
		this.triggerButton = '';

		window.addEventListener('keydown', (evt) => {
			if (evt.key === 'Escape' && this.open) {
				evt.preventDefault();
				evt.stopPropagation();

				this.close();

				window.requestAnimationFrame(() => {
					document.querySelector('sdr-card')?.focus();
				});
			}
		});

		window.addEventListener('gamepadbuttonpress', (evt) => {
			if (Router.currentPath === '/' && !this.open && evt.detail.button === this.triggerButton) {
				evt.stopPropagation();

				this.show();

				window.requestAnimationFrame(() => {
					this.#items[0]?.focus();
					GamepadHandler.shortVibration();
				});
			}

			if (this.open && evt.detail.button === 'b') {
				evt.stopPropagation();

				this.close();

				window.requestAnimationFrame(() => {
					document.querySelector('sdr-card')?.focus();
					GamepadHandler.shortVibration();
				});
			}

			if (this.open && (evt.detail.button === 'up' || evt.detail.button === 'left')) {
				evt.stopPropagation();

				this.#focusPrevious();
			}

			if (this.open && (evt.detail.button === 'down' || evt.detail.button === 'right')) {
				evt.stopPropagation();

				this.#focusNext();
			}
		});

		window.addEventListener('gamepadstickmove', (evt) => {
			if (this.open && (evt.detail.directionY === 'up' || evt.detail.directionX === 'left')) {
				evt.stopPropagation();

				this.#focusPrevious();
			}

			if (this.open && (evt.detail.directionY === 'down' || evt.detail.directionX === 'right')) {
				evt.stopPropagation();

				this.#focusNext();
			}
		});
	}

	toggle() {
		if (this.open) {
			this.close();
		} else {
			this.show();
		}
	}

	close() {
		(document.activeElement as HTMLElement | undefined)?.blur();

		this.open = false;

		this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true, cancelable: true }));
	}

	show() {
		// Close all other menus
		document.body.click();

		const rect = this.#dialog.getBoundingClientRect();

		if (rect.right > window.innerWidth) {
			this.#dialog.classList.add('right');
		}

		this.open = true;

		window.requestAnimationFrame(() => {
			this.#items[0]?.focus();
		});

		this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true, cancelable: true }));
	}

	#focusNext() {
		const selectedIndex = this.#items.findIndex((i) => i === document.activeElement);
		let nextIndex = selectedIndex + 1;

		if (nextIndex === this.#items.length) {
			nextIndex = 0;
		}

		if (this.#items[nextIndex]?.separator) {
			nextIndex += 1;
		}

		this.#items[nextIndex]?.focus();
	}

	#focusPrevious() {
		const selectedIndex = this.#items.findIndex((i) => i === document.activeElement);
		let nextIndex = selectedIndex - 1;

		if (nextIndex < 0) {
			nextIndex = this.#items.length - 1;
		}

		if (this.#items[nextIndex]?.separator) {
			nextIndex -= 1;
		}

		this.#items[nextIndex]?.focus();
	}

	override connectedCallback() {
		super.connectedCallback();

		window.addEventListener('click', () => {
			if (this.open) {
				this.close();
			}
		}, { capture: true, passive: true });

		window.addEventListener('keydown', (evt) => {
			if (evt.key === 'Escape' && this.open) {
				this.close();
			}
		});
	}

	override render() {
		return html`
			<sdr-button
				icon-button

				icon="${this.icon}"

				@click="${() => this.toggle()}"
			></sdr-button>
			<sdr-gamepad-badge button="${!this.open ? this.triggerButton : 'b'}"></sdr-gamepad-badge>
			<dialog
				?inert="${!this.open}"
				?open="${this.open}"
			>
				<slot></slot>
			</dialog>
		`;
	}
}
