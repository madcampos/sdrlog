import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-loader')
export class SdrLoader extends LitElement {
	static readonly styles = unsafeCSS(style);

	@property({ type: Boolean, reflect: true }) accessor loaded = false;

	render() {
		return html`
			<div id="loader">Loading...</div>
			<div id="content"><slot></slot></div>
		`;
	}
}
