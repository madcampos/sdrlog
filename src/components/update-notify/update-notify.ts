import { I18n } from '../../js/intl/translations';
import type { WorkerMessage } from '../../types/rpc-messages';

import { registerComponent, SdrComponent } from '../base/BaseComponent';

import template from './template.html?raw' assert { type: 'html' };
import style from './style.css?inline' assert { type: 'css' };

export interface SdrUpdateNotify {
	message: string
}

export class SdrUpdateNotify extends SdrComponent {
	static readonly elementName = 'sdr-update-notify';

	#popup: HTMLElement;

	constructor() {
		super({
			name: SdrUpdateNotify.elementName,
			props: [{ name: 'message', value: '' }],
			handlers: {
				update: () => {
					window.location.reload();
				}
			},
			template,
			style
		});

		this.#popup = this.root.querySelector('aside') as HTMLElement;

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
		this.message = message;
	}

	hide() {
		this.#popup.hidden = true;
	}
}

registerComponent(SdrUpdateNotify);
