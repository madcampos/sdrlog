export class ModalDialog extends HTMLElement {
	#root: ShadowRoot;
	#dialog: HTMLDialogElement;
	#isDialogOpen = false;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<slot name="trigger"></slot>
			<dialog>
				<header>
					<div>
						<slot name="title"></slot>
					</div>
					<button id="close" title="Close window">❌</button>
				</header>
				<article>
					<slot></slot>
				</article>
			</dialog>
		`;

		this.#dialog = this.#root.querySelector('dialog') as HTMLDialogElement;

		const triggerSlot = this.#root.querySelector('slot[name=trigger]') as HTMLSlotElement;
		const [triggerButton] = triggerSlot.assignedElements() as (HTMLButtonElement | undefined)[];

		triggerButton?.addEventListener('click', (evt) => {
			evt.preventDefault();
			evt.stopPropagation();

			this.#dialog.showModal();
		});

		this.#root.querySelector('#close')?.addEventListener('click', () => {
			this.#dialog.close();
		});

		this.#dialog.addEventListener('click', (evt) => {
			const target = evt.target as HTMLDialogElement;

			if (target.matches('dialog')) {
				target.close();
			}
		});
	}

	show() {
		this.#isDialogOpen = true;
		this.#dialog.showModal();
	}

	close() {
		this.#isDialogOpen = false;
		this.#dialog.close();
	}

	toggle() {
		if (this.#isDialogOpen) {
			this.#dialog.close();
		} else {
			this.#dialog.showModal();
		}
	}

	get isDialogOpen() {
		return this.#isDialogOpen;
	}
}

customElements.define('modal-dialog', ModalDialog);
