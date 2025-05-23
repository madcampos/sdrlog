import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-title-bar')
class SdrTitleBar extends LitElement {
	static override shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static override readonly styles = unsafeCSS(style);

	override render() {
		return html`
			<nav>
				<slot></slot>
			</nav>
		`;
	}
}

export { SdrTitleBar };
