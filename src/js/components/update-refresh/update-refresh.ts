import type { UpdateMessage } from './update-message';

class UpdateRefresh extends HTMLElement {
	#root: ShadowRoot;
	#button: HTMLButtonElement;
	#message: HTMLParagraphElement;
	#popup: HTMLElement;

	constructor() {
		super();

		const template = document.querySelector('#update-refresh') as HTMLTemplateElement;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));


		this.#button = this.#root.querySelector('button') as HTMLButtonElement;
		this.#message = this.#root.querySelector('p') as HTMLParagraphElement;
		this.#popup = this.#root.querySelector('aside') as HTMLElement;

		this.#button.addEventListener('click', () => {
			window.location.reload();
		});

		navigator.serviceWorker.addEventListener('message', (evt) => {
			const message = evt.data as UpdateMessage;
			const lastUpdated = localStorage.getItem('dataLastUpdated');

			if (message.updatedAt !== lastUpdated) {
				localStorage.setItem('dataLastUpdated', message.updatedAt);

				this.show('Data updated, please refresh the app.');
			}
		});
	}

	show(message: string) {
		this.#popup.hidden = false;
		this.#message.innerText = message;
	}

	hide() {
		this.#popup.hidden = true;
	}
}

customElements.define('update-refresh', UpdateRefresh);
