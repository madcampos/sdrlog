import type { SdrSelect } from '../../components/SdrSelect';

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { I18n } from '../../js/intl/translations';
import { registerShortcut } from '../../js/util/keyboard';

@customElement('sdr-language-box')
export class SdrLanguageBox extends LitElement {
	@state() private declare open: boolean;
	@state() declare private language: string;

	constructor() {
		super();

		this.open = false;
		this.language = 'en-US';

		registerShortcut('l', () => {
			this.open = !this.open;
		});
	}

	async #changeLanguage(event: Event) {
		const select = event.target as SdrSelect;

		if (select.value !== I18n.getLanguage()) {
			select.disabled = true;

			await I18n.setLanguage(select.value);

			location.reload();
		}
	}

	show() {
		this.open = true;

		window.history.pushState(null, `${I18n.t`Language Settings`} · ${import.meta.env.APP_NAME}`, `${import.meta.env.APP_PUBLIC_URL}#language`);
		window.document.title = `${I18n.t`Language Settings`} · ${import.meta.env.APP_NAME}`;
	}

	close() {
		this.open = false;

		window.history.pushState(null, import.meta.env.APP_NAME, `${import.meta.env.APP_PUBLIC_URL}`);
		window.document.title = import.meta.env.APP_NAME;
	}

	render() {
		return html`
			<sdr-dialog id="language-modal" ?open="${this.open}" @close="${() => this.close()}">
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

	private static getModal() {
		let modal = document.querySelector('sdr-language-box');

		if (!modal) {
			modal = document.createElement('sdr-language-box');

			document.body.appendChild(modal);
		}

		return modal;
	}

	static updateFromURL() {
		if (window.location.hash === '#language') {
			SdrLanguageBox.getModal().show();
		}
	}

	static openModal() {
		SdrLanguageBox.getModal().show();
	}

	static closeModal() {
		SdrLanguageBox.getModal().close();
	}

	connectedCallback() {
		super.connectedCallback();

		requestAnimationFrame(() => {
			this.language = I18n.getLanguage();
		});
	}
}
