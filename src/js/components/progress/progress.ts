import dialogPolyfill from '../../../../lib/dialog/dialog-polyfill';

export class ProgressOverlay extends HTMLElement {
	#root: ShadowRoot;

	#progress: HTMLProgressElement;
	#dialog: HTMLDialogElement;
	#count: HTMLSpanElement;

	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	#total = 100;
	#current = 0;

	constructor() {
		super();

		const template = document.querySelector('#progress') as HTMLTemplateElement;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));

		this.#progress = this.#root.querySelector('progress') as HTMLProgressElement;
		this.#dialog = this.#root.querySelector('dialog') as HTMLDialogElement;
		this.#count = this.#root.querySelector('span') as HTMLSpanElement;

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions
		if (!this.#dialog.showModal) {
			dialogPolyfill.registerDialog(this.#dialog);
		}
	}

	static createOverlay({ total, title, info }: { total?: number, title?: string, info?: string }) {
		const overlay = new ProgressOverlay();

		overlay.innerHTML = `
			<span slot="title">${title ?? ''}</span>
			<span slot="info">${info ?? ''}</span>
		`;

		// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
		if (total) {
			overlay.setTotal(total);
		} else {
			overlay.setIndefinite();
		}

		document.body.appendChild(overlay);
		overlay.show();

		return overlay;
	}

	setIndefinite() {
		this.#progress.max = 0;
		this.#count.hidden = true;
	}

	setTotal(total: number) {
		this.#total = total;
		this.#progress.max = total;
		this.#count.hidden = false;
		this.#count.innerText = `${this.#current} / ${this.#total}`;
	}

	setValue(value: number) {
		this.#current = value;
		this.#progress.value = value;
		this.#count.innerText = `${this.#current} / ${this.#total}`;
	}

	increment() {
		this.#current += 1;
		this.#progress.value = this.#current;
		this.#count.innerText = `${this.#current} / ${this.#total}`;
	}

	show() {
		this.#dialog.showModal();
		this.#dialog.focus();
	}

	close() {
		if (this.#dialog.hasAttribute('open')) {
			this.#dialog.close();
		}
	}
}

customElements.define('progress-overlay', ProgressOverlay);
