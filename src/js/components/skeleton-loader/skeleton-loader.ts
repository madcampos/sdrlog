export class SkeletonLoader extends HTMLElement {
	static get observedAttributes() { return ['loaded']; }

	#root: ShadowRoot;
	#content: HTMLSlotElement;
	#loader: HTMLDivElement;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<style>@import "${import.meta.url.replace(/js$/iu, 'css')}";</style>
			<div id="loader">
				loading...
			</div>
			<slot hidden></slot>
		`;

		this.#content = this.#root.querySelector('slot') as HTMLSlotElement;
		this.#loader = this.#root.querySelector('#loader') as HTMLDivElement;
	}

	get loaded() {
		return typeof this.getAttribute('loaded') === 'string';
	}

	set loaded(isLoaded: boolean) {
		if (isLoaded) {
			this.setAttribute('loaded', '');
		} else {
			this.removeAttribute('loaded');
		}
	}

	attributeChangedCallback() {
		if (this.getAttribute('loaded') === '') {
			this.#content.hidden = false;
			this.#loader.hidden = true;
		} else {
			this.#content.hidden = true;
			this.#loader.hidden = false;
		}
	}

	connectedCallback() {
		if (this.getAttribute('loaded')) {
			this.#content.hidden = false;
			this.#loader.hidden = true;
		}
	}
}

customElements.define('skeleton-loader', SkeletonLoader);
