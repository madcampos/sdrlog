import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-loader')
export class SdrLoader extends LitElement {
	static readonly elementName = 'sdr-loader';
	static readonly styles = unsafeCSS(style);

	@property({ type: Boolean, reflect: true }) declare loaded: boolean;

	constructor() {
		super();

		this.loaded = false;
	}

	render() {
		return html`
			<div id="loader">$t{Loading...}</div>
			<div id="content"><slot></slot></div>
		`;
	}
}
