import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import { I18n } from '../../js/intl/translations';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-update-notify')
export class SdrUpdateNotify extends LitElement {
	static readonly styles = [unsafeCSS(style)];

	@property({ type: String, reflect: true }) declare message: string;

	@query('aside') private declare popup: HTMLElement;

	constructor() {
		super();

		this.message = I18n.t`A new version of the app is available.`;
	}

	#update() {
		window.location.reload();
	}

	show(message: string) {
		this.popup.hidden = false;
		this.message = message;
	}

	hide() {
		this.popup.hidden = true;
	}

	render() {
		return html`
			<aside role="status" aria-live="polite" hidden>
				<p>${this.message}</p>
				<sdr-button
					icon="♻️"
					icon-button
					@click="${() => this.#update()}"
				></sdr-button>
			</aside>
		`;
	}
}
