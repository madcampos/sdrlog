import type { SdrButton } from '../button/button';
import type { DropdownMenuItem } from './dropdown-menu-item';

export class DropdownMenu extends HTMLElement {
	static get observedAttributes() { return ['icon']; }
	#root: ShadowRoot;
	#button: SdrButton;
	#dialog: HTMLDialogElement;

	constructor() {
		super();

		const template = document.querySelector('#dropdown-menu') as HTMLTemplateElement;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));

		this.#button = this.#root.querySelector('custom-button') as SdrButton;
		this.#dialog = this.#root.querySelector('dialog') as HTMLDialogElement;

		this.#button.addEventListener('click', (evt) => {
			evt.preventDefault();
			evt.stopPropagation();

			this.toggle();
			(document.activeElement as HTMLElement | undefined)?.blur();
		});

		window.addEventListener('click', () => {
			if (this.#dialog.hasAttribute('open')) {
				this.close();
			}
		});

		window.addEventListener('keydown', (evt) => {
			if (evt.key === 'Escape' && this.#dialog.hasAttribute('open')) {
				this.close();
			}
		});
	}

	get isClosed() {
		return this.#dialog.hasAttribute('open');
	}

	toggle() {
		if (this.#dialog.hasAttribute('open')) {
			this.close();
		} else {
			this.show();
		}
	}

	close() {
		this.#dialog.close();

		(document.activeElement as HTMLElement | undefined)?.blur();

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

		this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true, cancelable: true }));
	}

	focusNext() {
		const elements = [...this.querySelectorAll<DropdownMenuItem>('dropdown-menu-item:not([separator])')];

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
		const elements = [...this.querySelectorAll<DropdownMenuItem>('dropdown-menu-item:not([separator])')];

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

	attributeChangedCallback(_name: string, _oldValue: string, newValue: string) {
		this.#button.icon = newValue;
	}

	connectedCallback() {
		this.#button.icon = this.getAttribute('icon') ?? '';
	}
}

customElements.define('dropdown-menu', DropdownMenu);
