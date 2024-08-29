import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-loader')
class SdrLoader extends LitElement {
	static override readonly styles = unsafeCSS(style);

	@property({ type: Boolean, reflect: true })
	accessor loaded: boolean;

	constructor() {
		super();

		this.loaded = false;
	}

	override render() {
		return html`
			<div id="loader">Loading...</div>
			<div id="content"><slot></slot></div>
		`;
	}
}

export { SdrLoader };
