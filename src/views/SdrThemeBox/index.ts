import { registerComponent, SdrComponent } from '../../components/SdrComponent';
import { SdrDialog } from '../../components/SdrDialog';
import type { SdrRadioGroup } from '../../components/SdrRadioGroup';
import { I18n } from '../../js/intl/translations';
import { registerShortcut } from '../../js/util/keyboard';

import template from './template.html?raw' assert { type: 'html' };

export interface SdrThemeBox {
	theme: string
}

export class SdrThemeBox extends SdrComponent {
	static readonly elementName = 'sdr-theme-box';
	#modal: SdrDialog;

	constructor() {
		super({
			name: SdrThemeBox.elementName,
			props: [{ name: 'theme', value: 'system' }],
			handlers: {
				changeTheme: (event: Event) => {
					const theme = event.target as SdrRadioGroup;

					localStorage.setItem('app-theme', theme.value);

					const themeClasses = [...document.body.classList].filter((key) => key.startsWith('theme-'));

					themeClasses.forEach((themeClass) => {
						document.body.classList.remove(themeClass);
					});

					document.body.classList.add(`theme-${theme.value}`);

					this.theme = theme.value;
				}
			},
			template
		});

		this.#modal = this.root.querySelector(SdrDialog.elementName) as SdrDialog;

		this.#modal.addEventListener('close', () => {
			this.close();
		}, { capture: false });

		registerShortcut('t', () => {
			if (!this.#modal.hasAttribute('open')) {
				this.show();
			} else {
				this.close();
			}
		});

		if (localStorage.getItem('app-theme')) {
			this.theme = localStorage.getItem('app-theme') as string;

			document.body.classList.add(`theme-${this.theme}`);
		}
	}

	show() {
		window.history.pushState(null, `${I18n.t`Theme Settings`} · ${import.meta.env.APP_NAME}`, `${import.meta.env.APP_PUBLIC_URL}#theme`);
		window.document.title = `${I18n.t`Theme Settings`} · ${import.meta.env.APP_NAME}`;

		this.#modal.show();
	}

	close() {
		window.history.pushState(null, import.meta.env.APP_NAME, `${import.meta.env.APP_PUBLIC_URL}`);
		window.document.title = import.meta.env.APP_NAME;

		this.#modal.close();
	}

	static updateFromURL() {
		let modal = document.querySelector<SdrThemeBox>(SdrThemeBox.elementName);

		if (!modal) {
			modal = document.createElement(SdrThemeBox.elementName) as SdrThemeBox;

			document.body.appendChild(modal);
		}

		if (window.location.hash === '#theme') {
			modal.show();
		}
	}

	static openModal() {
		let modal = document.querySelector<SdrThemeBox>(SdrThemeBox.elementName);

		if (!modal) {
			modal = document.createElement(SdrThemeBox.elementName) as SdrThemeBox;

			document.body.appendChild(modal);
		}

		modal.show();
	}

	static closeModal() {
		let modal = document.querySelector<SdrThemeBox>(SdrThemeBox.elementName);

		if (!modal) {
			modal = document.createElement(SdrThemeBox.elementName) as SdrThemeBox;

			document.body.appendChild(modal);
		}

		modal.close();
	}
}

registerComponent(SdrThemeBox);
