import type { RouterView } from '../../router/router';
import type { SdrSelect } from '../../components/SdrSelect';

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { Router } from '../../router/router';
import { I18n } from '../../js/intl/translations';
import { registerShortcut } from '../../js/util/keyboard';

@customElement('sdr-view-language-settings')
export class SdrViewLanguageSettings extends LitElement implements RouterView {
	@state() private declare open: boolean;
	@state() declare private language: string;

	constructor() {
		super();

		this.open = false;
		this.language = 'en-US';

		registerShortcut('l', () => {
			this.open = !this.open;
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
		this.open = false;

		void Router.navigate('/');
	}

	navigate() {
		this.open = true;
		(this.shadowRoot?.querySelector('#language-select') as SdrSelect).focus();

		return I18n.t`Language Settings`;
	}

	render() {
		return html`
			<sdr-dialog id="language-modal" ?open="${this.open}" @close="${() => this.#close()}">
				<span slot="title">$t{Language Settings}</span>

				<p>$t{Set the language for the application:}</p>
				<p><small><strong>$t{Note:}</strong> $t{The page will reload after changing the app language.}</small></p>

				<sdr-select
					id="language-select"

					.value="${this.language}"

					@change="${async (evt: Event) => this.#changeLanguage(evt)}"
				>
					<span slot="label">$t{App Language}</span>

					<option value="en-US">$t{English}</option>
					<option value="fr-FR">$t{French}</option>
					<option value="pt-BR">$t{Brazilian Portuguese}</option>
				</sdr-select>
			</sdr-dialog>
		`;
	}

	connectedCallback() {
		super.connectedCallback();

		requestAnimationFrame(() => {
			this.language = I18n.getLanguage();
		});
	}
}
