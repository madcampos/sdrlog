import type { SdrSelect } from '../../components/SdrSelect';
import type { RouterView } from '../../router/router';

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { I18n } from '../../js/intl/translations';
import { registerShortcut } from '../../js/util/keyboard';
import { Router } from '../../router/router';

@customElement('sdr-view-language-settings')
class SdrViewLanguageSettings extends LitElement implements RouterView {
	@state()
	accessor #open: boolean;

	@state()
	accessor #language: string;

	constructor() {
		super();

		this.#open = false;
		this.#language = 'en-US';

		registerShortcut('l', () => {
			this.#open = !this.#open;
		});

		// TODO: add gamepad navigation
	}

	async #changeLanguage(event: Event) {
		const select = event.target as SdrSelect;

		if (select.value !== I18n.getLanguage()) {
			select.disabled = true;

			await I18n.setLanguage(select.value);

			location.reload();
		}
	}

	#close() {
		this.#open = false;

		void Router.navigate('/');
	}

	navigate() {
		this.#open = true;
		(this.shadowRoot?.querySelector('#language-select') as SdrSelect).focus();

		return 'Language Settings';
	}

	override createRenderRoot() {
		return this;
	}

	override render() {
		return html`
			<sdr-dialog id="language-modal" ?open="${this.#open}" @close="${() => this.#close()}">
				<span slot="title">Language Settings</span>

				<p>Set the language for the application:</p>
				<p><small><strong>Note:</strong> The page will reload after changing the app language.</small></p>

				<sdr-select
					id="language-select"

					.value="${this.#language}"

					@change="${async (evt: Event) => this.#changeLanguage(evt)}"
				>
					<span slot="label">App Language</span>

					<option value="en">English</option>
					<option value="fr">French</option>
					<option value="pt-BR">Brazilian Portuguese</option>
				</sdr-select>
			</sdr-dialog>
		`;
	}

	override connectedCallback() {
		super.connectedCallback();

		requestAnimationFrame(() => {
			this.#language = I18n.getLanguage();
		});
	}
}

export { SdrViewLanguageSettings };
