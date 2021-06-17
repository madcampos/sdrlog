export class ModalDialog extends HTMLElement {
	#root: ShadowRoot;
	#dialog: HTMLDialogElement;
	#isDialogOpen = false;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<style>
				:host {
					display: flex;
					box-sizing: inherit;
				}

				::-webkit-scrollbar {
					width: 0.2rem;
					background-color: rgba(0, 0, 0, 0.2);
					border-radius: 100vmax;

					transition: 0.2s ease all;
				}

				::-webkit-scrollbar-thumb {
					border-radius: 100vmax;
					background: var(--theme-color);
					width: 0.5rem;
				}

				dialog[open] {
					display: flex;
					flex-direction: column;
					padding: 0;
					width: var(--dialog-width);
					height: var(--dialog-height);
					border: none;
					border-radius: 0.5rem;
					background: var(--bg-color);
					box-sizing: border-box;
					max-width: initial;
					max-height: initial;
				}

				dialog::backdrop {
					background: rgba(0, 0, 0, 0.5);
				}

				dialog header {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 1rem;
					height: 3rem;

					background: var(--accent-color);
					color: var(--theme-color);
				}

				dialog header ::slotted(*) {
					flex-grow: 1;
					margin-inline-end: 0.5rem;
				}

				dialog footer:not([hidden]) {
					display: flex;
					align-items: center;
					justify-content: flex-end;
					padding: 0.5rem 1rem;
					height: 3rem;

					background: var(--bg-color);
				}

				dialog article {
					padding: 1rem;
					flex-grow: 1;
					overflow: auto;
				}

				dialog button {
					background: transparent;
					border: medium transparent solid;
					border-radius: 0.3rem;
					width: var(--button-size);
					height: var(--button-size);
					padding: 0;

					transition: 0.2s ease all;

					font: inherit;
				}

				dialog button:focus {
					border-color: var(--theme-color);
					outline: none;
				}

				dialog button:active {
					background: var(--secondary-color);
				}
			</style>
			<slot name="trigger"></slot>
			<dialog>
				<header>
					<slot name="title"></slot>
					<button id="close" title="Close window">❌</button>
				</header>
				<article>
					<slot></slot>
				</article>
				<footer hidden>
					<slot name="footer"></slot>
				</footer>
			</dialog>
		`;

		this.#dialog = this.#root.querySelector('dialog') as HTMLDialogElement;

		const triggerSlot = this.#root.querySelector('slot[name="trigger"]') as HTMLSlotElement;
		const [triggerButton] = triggerSlot.assignedElements() as (HTMLButtonElement | undefined)[];

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
