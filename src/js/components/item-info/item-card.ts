import { getCover, getMaterial } from '../data-operations/idb-persistence';

export class ItemCard extends HTMLElement {
	static get observedAttributes() { return ['id']; }

	#root: ShadowRoot;

	#title: HTMLHeadingElement;

	#thumb: HTMLImageElement;

	constructor(id?: string) {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<figure>
				<img
					class="thumb"
					decoding="async"
					loading="lazy"
					role="presentation"
					src="/img/covers/fallback.svg"
				/>
			</figure>
			<h4></h4>
		`;

		this.#title = this.#root.querySelector('h4') as HTMLHeadingElement;
		this.#thumb = this.#root.querySelector('img') as HTMLImageElement;

		this.setAttribute('role', 'listitem');
		this.setAttribute('tabindex', '0');

		if (this.getAttribute('id') ?? id) {
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			this.setMaterial(this.getAttribute('id') ?? id ?? '');
		} else {
			this.remove();
		}
	}

	async attributeChangedCallback(_name: string, _oldValue: string, newValue: string) {
		await this.setMaterial(newValue);
	}

	async setMaterial(id: string) {
		const material = await getMaterial(id);

		if (material) {
			const cover = await getCover(id);

			this.#title.innerText = material.name;
			this.setAttribute('title', material.name);

			if (cover) {
				this.#thumb.src = URL.createObjectURL(cover);
			}
		}
	}
}

customElements.define('item-card', ItemCard);
