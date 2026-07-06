import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// oxlint-disable-next-line no-magic-numbers
const OVERLAY_DISMISS_TIMEOUT_MS = 2 * 1000;

@customElement('file-operation-overlay')
export class FileOperationOverlay extends LitElement {
	@property({ type: Number, reflect: true })
	// oxlint-disable-next-line no-magic-numbers
	accessor max = 100;

	@property({ type: Number, reflect: true })
	accessor value = 0;

	@property({ type: String, reflect: true })
	accessor name = 'File Operation';

	#id = crypto.randomUUID();

	protected override createRenderRoot() {
		return this;
	}

	show() {
		this.querySelector('dialog')?.showModal();
	}

	hideAndRemove() {
		setTimeout(() => {
			this.querySelector('dialog')?.close();
			this.remove();
		}, OVERLAY_DISMISS_TIMEOUT_MS);
	}

	increment(text: string) {
		this.value += 1;

		// oxlint-disable-next-line typescript/no-non-null-assertion
		this.querySelector('p')!.textContent = text;
	}

	protected override render() {
		return html`
			<dialog>
				<header>
					<h2>${this.name}</h2>
				</header>

				<dialog-content>
					<img
						src="/images/base-covers/loading-anim.svg"
						width="256"
						height="256"
						alt="Animation of the Shadowrun logo. Showing a profile of a serpent forming the letter &quot;S&quot; in the purple color."
					/>
					<input-wrapper>
						<progress
							min="0"
							max="${this.max}"
							.value=${this.value}
							aria-labelledby="file-operation-text-${this.#id}"
							aria-describedby="file-operation-counter-${this.#id}"
						></progress>
						<input-infix>
							<output aria-live="polite" id="file-operation-counter-${this.#id}">
								<span>${this.value}</span>
								<sr-only>Items</sr-only>
								<span aria-hidden="true">/</span>
								<sr-only>of</sr-only>
								<span>${this.max}</span>
							</output>
						</input-infix>
					</input-wrapper>
					<p id="file-operation-text-${this.#id}"></p>
				</dialog-content>
			</dialog>
		`;
	}
}
