import { registerComponent, SdrComponent } from '../../components/base/BaseComponent';
import { SdrDialog } from '../../components/dialog/dialog';
import { I18n } from '../../js/intl/translations';
import { registerShortcut } from '../../js/util/keyboard';

import template from './template.html?raw';
import style from './style.css?raw';

export class SdrInfoBox extends SdrComponent {
	static readonly elementName = 'sdr-info-box';
	#modal: SdrDialog;

	constructor() {
		super({
			name: SdrInfoBox.elementName,
			template,
			style
		});

		this.#modal = this.root.querySelector(SdrDialog.elementName) as SdrDialog;

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
		let modal = document.querySelector<SdrInfoBox>(SdrInfoBox.elementName);

		if (!modal) {
			modal = document.createElement(SdrInfoBox.elementName) as SdrInfoBox;

			document.body.appendChild(modal);
		}

		if (window.location.hash === '#information') {
			modal.show();
		}
	}

	static openModal() {
		let modal = document.querySelector<SdrInfoBox>(SdrInfoBox.elementName);

		if (!modal) {
			modal = document.createElement(SdrInfoBox.elementName) as SdrInfoBox;

			document.body.appendChild(modal);
		}

		modal.show();
	}

	static closeModal() {
		let modal = document.querySelector<SdrInfoBox>(SdrInfoBox.elementName);

		if (!modal) {
			modal = document.createElement(SdrInfoBox.elementName) as SdrInfoBox;

			document.body.appendChild(modal);
		}

		modal.close();
	}
}

registerComponent(SdrInfoBox);
