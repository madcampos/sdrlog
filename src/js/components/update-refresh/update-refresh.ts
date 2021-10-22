import type { CustomButton } from '../button/button';
import { I18n } from '../intl/translations';
import type { WorkerMessage } from '../../rpc-messages';

class UpdateRefresh extends HTMLElement {
	#root: ShadowRoot;
	#button: CustomButton;
	#message: HTMLParagraphElement;
	#popup: HTMLElement;

	constructor() {
		super();

		const template = document.querySelector('#update-refresh') as HTMLTemplateElement;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));


		this.#button = this.#root.querySelector('custom-button') as CustomButton;
		this.#message = this.#root.querySelector('p') as HTMLParagraphElement;
		this.#popup = this.#root.querySelector('aside') as HTMLElement;

		this.#button.addEventListener('click', () => {
			window.location.reload();
		});

		navigator.serviceWorker.addEventListener('message', (evt) => {
			const message = evt.data as WorkerMessage;

			if (message.type === 'update') {
				const lastUpdated = localStorage.getItem('dataLastUpdated');

				if (message.updatedAt !== lastUpdated) {
					localStorage.setItem('dataLastUpdated', message.updatedAt);

					this.show(I18n.t`Data updated, please refresh the app.`);
				}
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
