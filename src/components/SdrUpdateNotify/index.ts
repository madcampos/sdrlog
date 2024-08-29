import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-update-notify')
class SdrUpdateNotify extends LitElement {
	static override shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static override readonly styles = [unsafeCSS(style)];

	@property({ type: String, reflect: true })
	accessor message: string;

	@query('aside')
	// @ts-expect-error
	accessor #popup: HTMLElement;

	constructor() {
		super();

		this.message = 'A new version of this page is available.';
	}

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

	override render() {
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

export { SdrUpdateNotify };
