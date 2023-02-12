import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-dialog')
export class SdrDialog extends LitElement {
	static styles = unsafeCSS(style);

	@property({ type: Boolean, reflect: true }) declare open: boolean;

	@query('dialog') private declare dialog: HTMLDialogElement;

	@queryAssignedElements({ slot: 'trigger' }) private declare triggerElements: (HTMLElement | undefined)[];
	@queryAssignedElements({ slot: 'footer' }) private declare footerElements: HTMLElement[];

	#clickDialog(evt: MouseEvent) {
		const target = evt.target as HTMLDialogElement;

		if (target === this.dialog && this.open) {
			this.close();
		}
	}

	#updateFooter() {
		if (this.footerElements.length > 0) {
			this.dialog.querySelector('footer')?.removeAttribute('hidden');
		} else {
			this.dialog.querySelector('footer')?.setAttribute('hidden', '');
		}
	}

	show() {
		this.open = true;
	}

	close() {
		this.open = false;
	}

	toggle() {
		if (this.open) {
			this.close();
		} else {
			this.show();
		}
	}

	connectedCallback() {
		super.connectedCallback();

		window.addEventListener('keydown', (evt) => {
			if (evt.key === 'Escape' && this.open) {
				evt.preventDefault();
				evt.stopPropagation();

				this.close();
			}
		});

		const [triggerElement] = this.triggerElements;

		if (triggerElement) {
			triggerElement.addEventListener('click', (evt) => {
				evt.preventDefault();
				evt.stopPropagation();

				this.show();
			});
		}
	}

	protected updated(changedProperties: Map<string, unknown>): void {
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
			<slot name="trigger"></slot>
			<dialog
				tabindex="-1"
				@click=${(evt: MouseEvent) => this.#clickDialog(evt)}
			>
				<header>
					<h2>
						<slot name="title"></slot>
					</h2>
					<sdr-button
						icon-button
						title="$t{Close window}"
						@click=${() => this.close()}
					>❌</sdr-button>
				</header>
				<article>
					<slot></slot>
				</article>
				<footer hidden>
					<slot
						name="footer"

						@slotchange=${() => this.#updateFooter()}
					></slot>
				</footer>
			</dialog>
		`;
	}
}
