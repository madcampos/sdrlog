import type { CustomButton } from '../button/button';

import dialogPolyfill from '../../../../lib/dialog/dialog-polyfill';

class DropdownMenu extends HTMLElement {
	static get observedAttributes() { return ['icon']; }
	#root: ShadowRoot;
	#button: CustomButton;
	#dialog: HTMLDialogElement;

	constructor() {
		super();

		const template = document.querySelector('#dropdown-menu') as HTMLTemplateElement;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));

		this.#button = this.#root.querySelector('custom-button') as CustomButton;
		this.#dialog = this.#root.querySelector('dialog') as HTMLDialogElement;

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions
		if (!this.#dialog.showModal) {
			dialogPolyfill.registerDialog(this.#dialog);
		}

		this.#button.addEventListener('click', (evt) => {
			evt.preventDefault();
			evt.stopPropagation();

			this.#dialog.show();
			this.#dialog.focus();

			const rect = this.#dialog.getBoundingClientRect();

			if (rect.right > window.innerWidth) {
				this.#dialog.classList.add('right');
			}
		});

		window.addEventListener('click', () => {
			if (this.#dialog.hasAttribute('open')) {
				this.#dialog.close();
			}
		});

		this.addEventListener('keypress', (evt) => {
			if (evt.key === 'Escape' && this.#dialog.hasAttribute('open')) {
				this.#dialog.close();
			}
		});
	}

	attributeChangedCallback(_name: string, _oldValue: string, newValue: string) {
		this.#button.icon = newValue;
	}

	connectedCallback() {
		this.#button.icon = this.getAttribute('icon') ?? '';
	}
}

customElements.define('dropdown-menu', DropdownMenu);
