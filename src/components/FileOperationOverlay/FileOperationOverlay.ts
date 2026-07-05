import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

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

	hide() {
		this.querySelector('dialog')?.close();
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
						width="189"
						height="189"
						alt="Animation of the Shadowrun logo. Showing a profile of a serpent forming the letter &quot;S&quot; in the purple color."
					/>
					<progress
						min="0"
						max="${this.max}"
						.value=${this.value}
						aria-labelledby="file-operation-text-${this.#id}"
					></progress>
					<p id="file-operation-text-${this.#id}"></p>
				</dialog-content>
			</dialog>
		`;
	}
}
