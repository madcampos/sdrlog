import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-progress-overlay')
export class SdrProgressOverlay extends LitElement {
	static readonly styles = unsafeCSS(style);

	@property({ type: String, reflect: true }) declare title: string;
	@property({ type: String, reflect: true }) declare info: string;
	@property({ type: Number, reflect: true }) declare total: number;
	@property({ type: String, reflect: true }) declare count: string;
	@property({ type: Number, reflect: true }) declare value: number;

	@property({ type: Boolean, reflect: true }) declare open: boolean;

	@query('dialog') private declare dialog: HTMLDialogElement;

	constructor() {
		super();

		this.title = '';
		this.info = '';
		this.total = 0;
		this.count = '';
		this.value = 0;
	}

	static createOverlay({ total, title, info }: { total?: number, title?: string, info?: string }) {
		const overlay = new SdrProgressOverlay();

		overlay.title = title ?? '';
		overlay.info = info ?? '';

		if (typeof total === 'number') {
			overlay.total = total;
		} else {
			overlay.setIndefinite();
		}

		document.body.appendChild(overlay);
		overlay.show();

		return overlay;
	}

	setIndefinite() {
		this.total = 0;
		this.value = 0;
		this.count = '';
	}

	increment() {
		this.value += 1;
	}

	show() {
		this.open = true;
	}

	close() {
		this.open = false;
	}

	updated(changedProperties: Map<string, unknown>): void {
		super.updated(changedProperties);

		if (changedProperties.has('open')) {
			if (this.open) {
				this.dialog.showModal();
				this.dialog.focus();

				this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true, cancelable: true }));
			} else {
				this.dialog.close();

				this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true, cancelable: true }));
			}
		}
	}

	render() {
		return html`
			<dialog>
				<h1>${this.title}</h1>
				<progress
					max="${this.total}"
					value="${this.value}"
				></progress>
				<p>${this.count}</p>
				<p>${this.info}</p>
			</dialog>
		`;
	}
}
