export class SkeletonLoader extends HTMLElement {
	static get observedAttributes() { return ['loaded']; }

	#root: ShadowRoot;
	#content: HTMLSlotElement;
	#loader: HTMLDivElement;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<style>
				:host { box-sizing: inherit; }
				#loader {
					max-width: 20rem;
					border-radius: 0.5rem;
					background-color: var(--accent-color);
					background-image: linear-gradient(-60deg, var(--bg-color) 40%, transparent, var(--bg-color) 60%);
					background-size: 200% 100%;
					background-position: 100%;
					color: transparent;
					user-select: none;

					animation: loader 2s linear infinite;
					opacity: 0.2;
				}

				@keyframes loader {
					from {
						background-position: 100%;
					}
					to {
						background-position: -100%;
					}
				}
			</style>
			<div id="loader">
				Loading...
			</div>
			<slot hidden></slot>
		`;

		this.#content = this.#root.querySelector('slot') as HTMLSlotElement;
		this.#loader = this.#root.querySelector('#loader') as HTMLDivElement;
	}

	get loaded() {
		return this.hasAttribute('loaded');
	}

	set loaded(isLoaded: boolean) {
		if (isLoaded) {
			this.setAttribute('loaded', '');
		} else {
			this.removeAttribute('loaded');
		}
	}

	attributeChangedCallback() {
		if (this.hasAttribute('loaded')) {
			this.#content.hidden = false;
			this.#loader.hidden = true;
		} else {
			this.#content.hidden = true;
			this.#loader.hidden = false;
		}
	}

	connectedCallback() {
		if (this.hasAttribute('loaded')) {
			this.#content.hidden = false;
			this.#loader.hidden = true;
		}
	}
}

customElements.define('skeleton-loader', SkeletonLoader);
