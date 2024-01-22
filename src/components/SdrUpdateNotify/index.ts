import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-update-notify')
export class SdrUpdateNotify extends LitElement {
	static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static readonly styles = [unsafeCSS(style)];

	@property({ type: String, reflect: true }) accessor message = 'A new version of the app is available.';

	@query('aside') accessor #popup: HTMLElement;

	#update() {
		window.location.reload();
	}

	show(message: string) {
		this.#popup.hidden = false;
		this.message = message;
	}

	hide() {
		this.#popup.hidden = true;
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
