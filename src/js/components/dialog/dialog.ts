import type { CustomButton } from '../button/button';

import dialogPolyfill from '../../../../lib/dialog/dialog-polyfill';
import { I18n } from '../intl/translations';

export class ModalDialog extends HTMLElement {
	#root: ShadowRoot;
	#dialog: HTMLDialogElement;
	#isDialogOpen = false;

	constructor() {
		super();

		const template = document.querySelector('#dialog') as HTMLTemplateElement;
		const translatedTemplate = I18n.translateElementsContent(template.content.cloneNode(true));

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(translatedTemplate);

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

	connectedCallback() {
		I18n.translateElementsContent(this);
	}

	show() {
		this.#isDialogOpen = true;
		this.#dialog.showModal();
		this.#dialog.focus();
		this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true, cancelable: true }));
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
