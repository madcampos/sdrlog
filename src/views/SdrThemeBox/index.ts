import type { SdrRadioGroup } from '../../components/SdrRadioGroup';

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { I18n } from '../../js/intl/translations';
import { registerShortcut } from '../../js/util/keyboard';

@customElement('sdr-theme-box')
export class SdrThemeBox extends LitElement {
	static readonly elementName = 'sdr-theme-box';

	@state() private declare open: boolean;
	@state() private declare theme: string;

	constructor() {
		super();

		this.open = false;
		this.theme = 'system';

		registerShortcut('t', () => {
			this.open = !this.open;
		});

		if (localStorage.getItem('app-theme')) {
			this.theme = localStorage.getItem('app-theme') as string;

			document.body.classList.add(`theme-${this.theme}`);
		}
	}

	#changeTheme(event: Event) {
		const theme = event.target as SdrRadioGroup;

		localStorage.setItem('app-theme', theme.value);

		const themeClasses = [...document.body.classList].filter((key) => key.startsWith('theme-'));

		themeClasses.forEach((themeClass) => {
			document.body.classList.remove(themeClass);
		});

		document.body.classList.add(`theme-${theme.value}`);

		this.theme = theme.value;
	}

	show() {
		this.open = true;

		window.history.pushState(null, `${I18n.t`Theme Settings`} · ${import.meta.env.APP_NAME}`, `${import.meta.env.APP_PUBLIC_URL}#theme`);
		window.document.title = `${I18n.t`Theme Settings`} · ${import.meta.env.APP_NAME}`;
	}

	close() {
		this.open = false;

		window.history.pushState(null, import.meta.env.APP_NAME, `${import.meta.env.APP_PUBLIC_URL}`);
		window.document.title = import.meta.env.APP_NAME;
	}

	render() {
		return html`
		<sdr-dialog id="theme-modal" ?open="${this.open}" @close="${() => this.close()}">
			<span slot="title">$t{Theme Settings}</span>

			<p>$t{Set the theme for the application:}</p>

			<sdr-radio-group
				value="${this.theme}"

				@change="${(evt: Event) => this.#changeTheme(evt)}"
			>
				<sdr-radio-item icon="🌓" value="system">
					<span slot="title">$t{System Theme}</span>
					<span>$t{Follows the system defined theme.}</span>
				</sdr-radio-item>
				<sdr-radio-item icon="🌞" value="light">
					<span slot="title">$t{Light Theme}</span>
					<span>$t{Always use a light theme.}</span>
				</sdr-radio-item>
				<sdr-radio-item icon="🌚" value="dark">
					<span slot="title">$t{Dark Theme}</span>
					<span>$t{Always use a dark theme.}</span>
				</sdr-radio-item>
			</sdr-radio-group>
		</sdr-dialog>
		`;
	}

	private static getModal() {
		let modal = document.querySelector('sdr-theme-box');

		if (!modal) {
			modal = document.createElement('sdr-theme-box');

			document.body.appendChild(modal);
		}

		return modal;
	}

	static updateFromURL() {
		if (window.location.hash === '#theme') {
			SdrThemeBox.getModal().show();
		}
	}

	static openModal() {
		SdrThemeBox.getModal().show();
	}

	static closeModal() {
		SdrThemeBox.getModal().close();
	}
}
