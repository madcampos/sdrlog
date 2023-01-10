import template from './template.html?raw';
import style from './style.css?raw';
import { SdrComponent } from '../base/BaseComponent';

const watchedAttributes = ['open'];

export interface SdrDialog {
	open: boolean
}

export class SdrDialog extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }
	#dialog: HTMLDialogElement;

	constructor() {
		super({
			name: 'sdr-dialog',
			watchedAttributes,
			props: [
				{
					name: 'open',
					value: (newValue = false) => {
						const parsedValue = newValue === '' || newValue === true;

						if (parsedValue) {
							this.#dialog.showModal();
							this.#dialog.focus();
							this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true, cancelable: true }));
						} else {
							this.#dialog.close();
							this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true, cancelable: true }));
						}

						return parsedValue;
					},
					attributeName: 'open'
				}
			],
			handlers: {
				closeModal: () => {
					this.close();
				}
			},
			watchedSlots: {
				footer: (evt) => {
					const slot = evt.target as HTMLSlotElement;
					const slotHasElements = slot.assignedElements().length > 0;

					(this.root.querySelector('footer') as HTMLElement).hidden = !slotHasElements;
				},
				trigger: (evt) => {
					const slot = evt.target as HTMLSlotElement;
					const [triggerButton] = slot.assignedElements() as (Element | undefined)[];

					triggerButton?.addEventListener('click', (triggerEvt) => {
						triggerEvt.preventDefault();
						triggerEvt.stopPropagation();

						this.open = true;
					});
				}
			},
			template,
			style
		});

		this.#dialog = this.root.querySelector('dialog') as HTMLDialogElement;

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
}
