import type { CustomButton } from '../button/button';

import dialogPolyfill from '../../../../lib/dialog/dialog-polyfill';

export class ModalDialog extends HTMLElement {
	#root: ShadowRoot;
	#dialog: HTMLDialogElement;
	#isDialogOpen = false;

	constructor() {
		super();

		const template = document.querySelector('#dialog') as HTMLTemplateElement;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));

		this.#dialog = this.#root.querySelector('dialog') as HTMLDialogElement;

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions
		if (!this.#dialog.showModal) {
			dialogPolyfill.registerDialog(this.#dialog);
		}

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
			if (this.#dialog.hasAttribute('open')) {
				this.#dialog.close();
				this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true, cancelable: true }));
			}
		});

		this.#dialog.addEventListener('click', (evt) => {
			const target = evt.target as HTMLDialogElement;

			if (target.matches('dialog') && target.hasAttribute('open')) {
				target.close();
				this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true, cancelable: true }));
			}
		});
	}

	show() {
		this.#isDialogOpen = true;
		this.#dialog.showModal();
		this.#dialog.focus();
	}

	close() {
		this.#isDialogOpen = false;
		this.#dialog.close();
	}

	toggle() {
		if (this.#isDialogOpen) {
			this.close();
		} else {
			this.show();
		}
	}

	get isDialogOpen() {
		return this.#isDialogOpen;
	}
}

customElements.define('modal-dialog', ModalDialog);
