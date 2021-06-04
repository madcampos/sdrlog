export class ModalDialog extends HTMLElement {
	#root: ShadowRoot;
	#dialog: HTMLDialogElement;
	#isDialogOpen = false;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		const template = document.createElement('template');

		template.innerHTML = `
			<slot name="trigger"></slot>
			<dialog>
				<form method="dialog">
					<header>
						<div>
							<slot name="title"></slot>
						</div>
						<button type="cancel">❌</button>
					</header>
					<article>
						<slot></slot>
					</article>
				</form>
			</dialog>
		`;

		this.#root.appendChild(template.content.cloneNode(true));
		this.#dialog = this.#root.querySelector('dialog') as HTMLDialogElement;

		const triggerSlot = this.#root.querySelector('slot[name=trigger]') as HTMLSlotElement;
		const [triggerButton] = triggerSlot.assignedElements() as (HTMLButtonElement | undefined)[];

		triggerButton?.addEventListener('click', (evt) => {
			evt.preventDefault();
			evt.stopPropagation();

			this.#dialog.showModal();
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
