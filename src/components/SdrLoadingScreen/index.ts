import style from './style.css?url';

class SdrLoadingScreen extends HTMLElement {
	static observedAttributes = ['max'] as const;

	#internals: ElementInternals;
	#progress: HTMLProgressElement;
	#text: HTMLParagraphElement;

	constructor() {
		super();

		this.#internals = this.attachInternals();

		if (!this.#internals.shadowRoot) {
			this.attachShadow({ mode: 'open' });
		}

		if (!this.shadowRoot?.querySelector('link')) {
			const link = document.createElement('link');

			link.rel = 'stylesheet';
			link.href = style;

			this.shadowRoot?.append(link);
		}

		let progress = this.shadowRoot?.querySelector<HTMLProgressElement>('#load-progress');

		if (!progress) {
			progress = document.createElement('progress');
			progress.id = 'load-progress';

			this.shadowRoot?.append(progress);
		}

		this.#progress = progress;

		let text = this.shadowRoot?.querySelector<HTMLParagraphElement>('#load-text');

		if (!text) {
			text = document.createElement('p');
			text.id = 'load-text';

			this.shadowRoot?.append(text);
		}

		this.#text = text;

		this.reset();
	}

	get max() {
		return Number.parseInt(this.getAttribute('max') ?? '0');
	}

	set max(newValue: number) {
		this.setAttribute('max', newValue.toString());
		this.#progress.max = newValue;
	}

	reset() {
		// @ts-expect-error
		delete this.#progress.value;

		this.#progress.max = 10;
		this.#text.textContent = 'Loading Data...';
	}

	update(newStatus: string) {
		this.#text.textContent = newStatus;
		this.#progress.value += 1;
	}

	attributeChangedCallback(name: typeof SdrLoadingScreen.observedAttributes[number], oldValue: string | null, newValue: string | null) {
		if (oldValue !== newValue) {
			switch (name) {
				case 'max':
					this.max = Number.parseInt(newValue ?? '0');
					break;
				default:
			}
		}
	}
}

if (!customElements.get('sdr-loading-screen')) {
	customElements.define('sdr-loading-screen', SdrLoadingScreen);
}

export { SdrLoadingScreen };
