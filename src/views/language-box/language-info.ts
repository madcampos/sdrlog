import { registerComponent, SdrComponent } from '../../components/base/BaseComponent';
import { SdrDialog } from '../../components/dialog/dialog';
import type { SdrSelect } from '../../components/edit-select/edit-select';
import { I18n } from '../../js/intl/translations';
import { registerShortcut } from '../../js/util/keyboard';

import template from './template.html?raw';

export interface SdrLanguageBox {
	language: string
}

export class SdrLanguageBox extends SdrComponent {
	static readonly elementName = 'sdr-language-box';

	#modal: SdrDialog;

	constructor() {
		super({
			name: SdrLanguageBox.elementName,
			props: [{ name: 'language', value: 'en-US' }],
			handlers: {
				changeLanguage: async (event: Event) => {
					const select = event.target as SdrSelect;

					if (select.value !== I18n.getLanguage()) {
						select.disabled = true;

						await I18n.setLanguage(select.value);

						location.reload();
					}
				}
			},
			template
		});

		this.#modal = this.root.querySelector(SdrDialog.elementName) as SdrDialog;

		this.#modal.addEventListener('close', () => {
			this.close();
		}, { capture: false });

		registerShortcut('l', () => {
			if (!this.#modal.hasAttribute('open')) {
				this.show();
			} else {
				this.close();
			}
		});

		this.language = I18n.getLanguage();
	}

	show() {
		window.history.pushState(null, `${I18n.t`Language Settings`} · ${import.meta.env.APP_NAME}`, `${import.meta.env.APP_PUBLIC_URL}#language`);
		window.document.title = `${I18n.t`Language Settings`} · ${import.meta.env.APP_NAME}`;

		this.#modal.show();
	}

	close() {
		window.history.pushState(null, import.meta.env.APP_NAME, `${import.meta.env.APP_PUBLIC_URL}`);
		window.document.title = import.meta.env.APP_NAME;

		this.#modal.close();
	}

	static updateFromURL() {
		let modal = document.querySelector<SdrLanguageBox>(SdrLanguageBox.elementName);

		if (!modal) {
			modal = document.createElement(SdrLanguageBox.elementName) as SdrLanguageBox;

			document.body.appendChild(modal);
		}

		if (window.location.hash === '#language') {
			modal.show();
		}
	}

	static openModal() {
		let modal = document.querySelector<SdrLanguageBox>(SdrLanguageBox.elementName);

		if (!modal) {
			modal = document.createElement(SdrLanguageBox.elementName) as SdrLanguageBox;

			document.body.appendChild(modal);
		}

		modal.show();
	}

	static closeModal() {
		let modal = document.querySelector<SdrLanguageBox>(SdrLanguageBox.elementName);

		if (!modal) {
			modal = document.createElement(SdrLanguageBox.elementName) as SdrLanguageBox;

			document.body.appendChild(modal);
		}

		modal.close();
	}
}

registerComponent(SdrLanguageBox);
