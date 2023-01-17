import { SdrComponent } from '../../components/base/BaseComponent';
import type { SdrDialog } from '../../components/dialog/dialog';
import type { SdrRadioGroup } from '../../components/radio-group/radio-group';
import { I18n } from '../../js/intl/translations';
import { registerShortcut } from '../../js/util/keyboard';

import template from './template.html?raw';

export interface SdrThemeBox {
	theme: string
}

export class SdrThemeBox extends SdrComponent {
	#modal: SdrDialog;

	constructor() {
		super({
			name: 'sdr-theme-modal',
			props: [{ name: 'theme', value: 'system' }],
			handlers: {
				changeTheme: (event: Event) => {
					const theme = event.target as SdrRadioGroup;

					localStorage.setItem('appTheme', theme.value);

					const [themeClass] = [...document.body.classList.values()].filter(([key]) => key.startsWith('theme-'));

					if (themeClass) {
						document.body.classList.remove(themeClass);
					}

					document.body.classList.add(`theme-${theme.value}`);

					this.theme = theme.value;
				}
			},
			template
		});

		this.#modal = this.root.querySelector('sdr-dialog') as SdrDialog;

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

		if (localStorage.getItem('theme')) {
			this.theme = localStorage.getItem('theme') as string;
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
		let modal = document.querySelector<SdrThemeBox>('sdr-info-box');

		if (!modal) {
			modal = document.createElement('sdr-info-box') as SdrThemeBox;

			document.body.appendChild(modal);
		}

		if (window.location.hash === '#theme') {
			modal.show();
		}
	}

	static openModal() {
		let modal = document.querySelector<SdrThemeBox>('sdr-info-box');

		if (!modal) {
			modal = document.createElement('sdr-info-box') as SdrThemeBox;

			document.body.appendChild(modal);
		}

		modal.show();
	}

	static closeModal() {
		let modal = document.querySelector<SdrThemeBox>('sdr-info-box');

		if (!modal) {
			modal = document.createElement('sdr-info-box') as SdrThemeBox;

			document.body.appendChild(modal);
		}

		modal.close();
	}
}
