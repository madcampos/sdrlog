import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js';

import { SdrDropdownItem } from '../SdrDropdownItem';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-dropdown')
export class SdrDropdown extends LitElement {
	static readonly elementName = 'sdr-dropdown';

	static styles = unsafeCSS(style);

	@property({ type: String, reflect: true }) declare icon: string;
	@property({ type: Boolean, reflect: true }) declare open: boolean;

	@query('dialog') declare private dialog: HTMLDialogElement;

	@queryAssignedElements({ selector: SdrDropdownItem.elementName }) declare private items: SdrDropdownItem[];

	constructor() {
		super();

		this.icon = '';
		this.open = false;
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

		const rect = this.dialog.getBoundingClientRect();

		if (rect.right > window.innerWidth) {
			this.dialog.classList.add('right');
		}

		this.open = true;

		this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true, cancelable: true }));
	}

	focusNext() {
		if (document.activeElement && this.items.length > 0) {
			if (document.activeElement.parentElement !== this) {
				this.items[0].focus();
			} else {
				const index = this.items.findIndex((i) => i === document.activeElement);

				if (index + 1 === this.items.length) {
					this.items[0].focus();
				} else {
					this.items[index + 1].focus();
				}
			}
		}
	}

	focusPrevious() {
		if (document.activeElement && this.items.length > 0) {
			if (document.activeElement.parentElement !== this) {
				this.items[0].focus();
			} else {
				const index = this.items.findIndex((i) => i === document.activeElement);

				if (index - 1 < 0) {
					this.items[this.items.length - 1].focus();
				} else {
					this.items[index - 1].focus();
				}
			}
		}
	}

	connectedCallback() {
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

	render() {
		return html`
			<sdr-button
				icon-button

				icon="${this.icon}"

				@click="${() => this.toggle()}"
			></sdr-button>
			<dialog
				tabindex="-1"
				?inert="${!this.open}"
				?open="${this.open}"
			>
				<slot></slot>
			</dialog>
		`;
	}
}
