import type { CustomButton } from '../button/button';

import { I18n } from '../intl/translations';

export class ModalDialog extends HTMLElement {
	static get observedAttributes() { return ['open']; }
	#root: ShadowRoot;
	#dialog: HTMLDialogElement;

	constructor() {
		super();

		const template = document.querySelector('#dialog') as HTMLTemplateElement;
		const translatedTemplate = I18n.translateElementsContent(template.content.cloneNode(true));

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(translatedTemplate);

		this.#dialog = this.#root.querySelector('dialog') as HTMLDialogElement;

		const triggerSlot = this.#root.querySelector('slot[name="trigger"]') as HTMLSlotElement;
		const [triggerButton] = triggerSlot.assignedElements() as (CustomButton | undefined)[];

		this.#root.addEventListener('slotchange', (evt) => {
			const slot = evt.target as HTMLSlotElement;
			const slotHasElements = slot.assignedElements().length > 0;

			if (slot.name === 'footer') {
				(this.#root.querySelector('footer') as HTMLElement).hidden = !slotHasElements;
			}
		});

		triggerButton?.addEventListener('click', (evt) => {
			evt.preventDefault();
			evt.stopPropagation();

			this.#dialog.showModal();
			this.#dialog.focus();
		});

		this.#root.querySelector('#close')?.addEventListener('click', () => {
			this.close();
		});

		this.#dialog.addEventListener('click', (evt) => {
			const target = evt.target as HTMLDialogElement;

			if (target === this.#dialog && this.open) {
				this.close();
			}
		});

		window.addEventListener('keydown', (evt) => {
			if (evt.key === 'Escape' && this.open) {
				evt.preventDefault();
				evt.stopPropagation();

				this.close();
			}
		});
	}
	get open() {
		return this.hasAttribute('open');
	}

	set open(isOpen: boolean) {
		if (isOpen) {
			this.setAttribute('open', '');
		} else {
			this.removeAttribute('open');
		}
	}

	show() {
		this.open = true;
	}

	close() {
		this.open = false;
	}

	toggle() {
		if (this.open) {
			this.close();
		} else {
			this.show();
		}
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (oldValue !== newValue) {
			if (name === 'open') {
				if (this.hasAttribute('open')) {
					this.#dialog.showModal();
					this.#dialog.focus();
					this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true, cancelable: true }));
				} else {
					this.#dialog.close();
					this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true, cancelable: true }));
				}
			}
		}
	}

	connectedCallback() {
		this.open = this.hasAttribute('open');
		I18n.translateElementsContent(this);
	}
}

customElements.define('modal-dialog', ModalDialog);
