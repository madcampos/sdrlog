import type { RouterView } from '../../router/router';
import type { SdrRadioGroup } from '../../components/SdrRadioGroup';

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { Router } from '../../router/router';
import { registerShortcut } from '../../js/util/keyboard';

@customElement('sdr-view-theme-settings')
export class SdrViewThemeSettings extends LitElement implements RouterView {
	@state() private open: boolean;
	@state() private theme: string;

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

	#close() {
		this.open = false;

		void Router.navigate('/');
	}

	navigate() {
		this.open = true;

		return 'Theme Settings';
	}

	createRenderRoot() {
		return this;
	}

	render() {
		return html`
		<sdr-dialog id="theme-modal" ?open="${this.open}" @close="${() => this.#close()}">
			<span slot="title">Theme Settings</span>

			<p>Set the theme for the application:</p>

			<sdr-radio-group
				value="${this.theme}"

				@change="${(evt: Event) => this.#changeTheme(evt)}"
			>
				<sdr-radio-item icon="🌓" value="system">
					<span slot="title">System Theme</span>
					<span>Follows the system defined theme.</span>
				</sdr-radio-item>
				<sdr-radio-item icon="🌞" value="light">
					<span slot="title">Light Theme</span>
					<span>Always use a light theme.</span>
				</sdr-radio-item>
				<sdr-radio-item icon="🌚" value="dark">
					<span slot="title">Dark Theme</span>
					<span>Always use a dark theme.</span>
				</sdr-radio-item>
			</sdr-radio-group>
		</sdr-dialog>
		`;
	}
}
