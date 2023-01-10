import { SdrComponent } from '../../components/base/BaseComponent';
import type { SdrDialog } from '../../components/dialog/dialog';
import { I18n } from '../../js/intl/translations';
import { registerShortcut } from '../../js/util/keyboard';

import template from './template.html?raw';

export class SdrInfoBox extends SdrComponent {
	#modal: SdrDialog;

	constructor() {
		super({
			name: 'sdr-info-modal',
			template
		});

		this.#modal = this.root.querySelector('sdr-dialog') as SdrDialog;

		this.#modal.addEventListener('close', () => {
			this.close();
		}, { capture: false });

		registerShortcut('i', () => {
			if (!this.#modal.hasAttribute('open')) {
				this.show();
			} else {
				this.close();
			}
		});
	}

	show() {
		window.history.pushState(null, `${I18n.t`Information`} · ${import.meta.env.APP_NAME}`, `${import.meta.env.APP_PUBLIC_URL}#information`);
		window.document.title = `${I18n.t`Information`} · ${import.meta.env.APP_NAME}`;

		this.#modal.show();
	}

	close() {
		window.history.pushState(null, import.meta.env.APP_NAME, `${import.meta.env.APP_PUBLIC_URL}`);
		window.document.title = import.meta.env.APP_NAME;

		this.#modal.close();
	}

	static updateFromURL() {
		let modal = document.querySelector<SdrInfoBox>('sdr-info-box');

		if (!modal) {
			modal = document.createElement('sdr-info-box') as SdrInfoBox;

			document.body.appendChild(modal);
		}

		if (window.location.hash === '#information') {
			modal.show();
		}
	}

	static openModal() {
		let modal = document.querySelector<SdrInfoBox>('sdr-info-box');

		if (!modal) {
			modal = document.createElement('sdr-info-box') as SdrInfoBox;

			document.body.appendChild(modal);
		}

		modal.show();
	}

	static closeModal() {
		let modal = document.querySelector<SdrInfoBox>('sdr-info-box');

		if (!modal) {
			modal = document.createElement('sdr-info-box') as SdrInfoBox;

			document.body.appendChild(modal);
		}

		modal.close();
	}
}
