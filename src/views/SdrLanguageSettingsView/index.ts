import type { RouterView } from '../../router/router';

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { I18n } from '../../js/intl/translations';
import { registerShortcut } from '../../js/util/keyboard';
import { Router } from '../../router/router';

@customElement('sdr-view-language-settings')
class SdrViewLanguageSettings extends LitElement implements RouterView {
	@state()
	private open: boolean;

	@state()
	private language: string;

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
		// oxlint-disable-next-line typescript/consistent-type-assertions typescript/no-unsafe-type-assertion
		const select = event.target as HTMLSelectElement;

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
		this.shadowRoot?.querySelector<HTMLSelectElement>('#language-select')?.focus();

		return 'Language Settings';
	}

	override createRenderRoot() {
		return this;
	}

	override render() {
		return html`
			<dialog id="language-modal" ?open="${this.open}" @close="${() => this.#close()}">
				<header>
					<h2>Language Settings</h2>
				</header>

				<dialog-content>
					<p>Set the language for the application:</p>
					<p><small><strong>Note:</strong> The page will reload after changing the app language.</small></p>

					<select
						id="language-select"

						.value="${this.language}"

						@change="${async (evt: Event) => this.#changeLanguage(evt)}"
					>
						<span slot="label">App Language</span>

						<option value="en">English</option>
						<option value="fr">French</option>
						<option value="pt-BR">Brazilian Portuguese</option>
					</select>
				</dialog-content>
			</dialog>
		`;
	}

	override connectedCallback() {
		super.connectedCallback();

		requestAnimationFrame(() => {
			this.language = I18n.getLanguage();
		});
	}
}

export { SdrViewLanguageSettings };
