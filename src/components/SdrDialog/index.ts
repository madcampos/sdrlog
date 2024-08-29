import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-dialog')
class SdrDialog extends LitElement {
	static override readonly styles = unsafeCSS(style);

	@property({ type: Boolean, reflect: true })
	accessor open: boolean;

	@query('dialog')
	// @ts-expect-error
	accessor #dialog: HTMLDialogElement;

	@queryAssignedElements({ slot: 'trigger' })
	// @ts-expect-error
	accessor #triggerElements: HTMLElement[];

	@queryAssignedElements({ slot: 'footer' })
	// @ts-expect-error
	accessor #footerElements: HTMLElement[];

	constructor() {
		super();

		this.open = false;

		window.addEventListener('keydown', (evt) => {
			if (evt.key === 'Escape' && this.open) {
				evt.preventDefault();
				evt.stopPropagation();

				this.close();

				window.requestAnimationFrame(() => {
					document.querySelector('sdr-card')?.focus();
				});
			}
		});

		window.addEventListener('gamepadbuttonpress', (evt) => {
			if (evt.detail.button === 'b' && this.open) {
				evt.stopPropagation();

				this.close();

				window.requestAnimationFrame(() => {
					document.querySelector('sdr-card')?.focus();
				});
			}
		});
	}

	#clickDialog(evt: MouseEvent) {
		const target = evt.target as HTMLDialogElement;

		if (target === this.#dialog && this.open) {
			this.close();
		}
	}

	#updateFooter() {
		if (this.#footerElements.length > 0) {
			this.#dialog.querySelector('footer')?.removeAttribute('hidden');
		} else {
			this.#dialog.querySelector('footer')?.setAttribute('hidden', '');
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

	override connectedCallback() {
		super.connectedCallback();

		const [triggerElement] = this.#triggerElements;

		if (triggerElement) {
			triggerElement.addEventListener('click', (evt) => {
				evt.preventDefault();
				evt.stopPropagation();

				this.show();
			});
		}
	}

	override updated(changedProperties: Map<string, unknown>): void {
		super.updated(changedProperties);

		if (changedProperties.has('open')) {
			if (this.open) {
				this.#dialog.showModal();
				this.#dialog.focus();

				this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true, cancelable: true }));
			} else {
				this.#dialog.close();

				this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true, cancelable: true }));
			}
		}
	}

	override render() {
		return html`
			<slot name="trigger"></slot>
			<dialog
				tabindex="-1"
				@click=${(evt: MouseEvent) => this.#clickDialog(evt)}
			>
				<header>
					<slot name="title"></slot>
					<sdr-button
						icon-button
						keep-trigger-button
						trigger-button="b"
						title="Close window"
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

export { SdrDialog };
