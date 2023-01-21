import { SdrDropdownItem } from '../SdrDropdownItem';

import { registerComponent, SdrComponent } from '../SdrComponent';

import template from './template.html?raw' assert { type: 'html' };
import style from './style.css?inline' assert { type: 'css' };

const watchedAttributes = ['icon', 'open'];

export interface SdrDropdown {
	icon: string,
	open: boolean
}

export class SdrDropdown extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }
	static readonly elementName = 'sdr-dropdown';
	#dialog: HTMLDialogElement;

	constructor() {
		super({
			name: SdrDropdown.elementName,
			watchedAttributes,
			props: [
				{ name: 'icon', value: '', attributeName: 'icon' },
				{ name: 'open', value: false, attributeName: 'open' }
			],
			handlers: {
				toggleMenu: (evt) => {
					evt.preventDefault();
					evt.stopPropagation();

					this.toggle();
					(document.activeElement as HTMLElement | undefined)?.blur();
				}
			},
			template,
			style
		});

		this.#dialog = this.root.querySelector('dialog') as HTMLDialogElement;

		window.addEventListener('click', () => {
			if (this.open) {
				this.close();
			}
		});

		window.addEventListener('keydown', (evt) => {
			if (evt.key === 'Escape' && this.open) {
				this.close();
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
		this.#dialog.close();

		(document.activeElement as HTMLElement | undefined)?.blur();

		this.open = false;

		this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true, cancelable: true }));
	}

	show() {
		// Close all other menus
		document.body.click();

		this.#dialog.show();

		const rect = this.#dialog.getBoundingClientRect();

		if (rect.right > window.innerWidth) {
			this.#dialog.classList.add('right');
		}

		this.open = true;

		this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true, cancelable: true }));
	}

	focusNext() {
		const elements = [...this.querySelectorAll<SdrDropdownItem>(SdrDropdownItem.elementName)];

		if (document.activeElement && elements.length > 0) {
			if (document.activeElement.parentElement !== this) {
				elements[0].focus();
			} else {
				const index = elements.findIndex((i) => i === document.activeElement);

				if (index + 1 === elements.length) {
					elements[0].focus();
				} else {
					elements[index + 1].focus();
				}
			}
		}
	}

	focusPrevious() {
		const elements = [...this.querySelectorAll<SdrDropdownItem>(SdrDropdownItem.elementName)];

		if (document.activeElement && elements.length > 0) {
			if (document.activeElement.parentElement !== this) {
				elements[0].focus();
			} else {
				const index = elements.findIndex((i) => i === document.activeElement);

				if (index - 1 < 0) {
					elements[elements.length - 1].focus();
				} else {
					elements[index - 1].focus();
				}
			}
		}
	}
}

registerComponent(SdrDropdown);
