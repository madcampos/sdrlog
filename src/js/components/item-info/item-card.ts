import { getMaterial, getThumb } from '../data-operations/idb-persistence';
import { ItemDetails } from './item-details';

export class ItemCard extends HTMLElement {
	static get observedAttributes() { return ['id']; }

	#root: ShadowRoot;

	#title: HTMLHeadingElement;

	#thumb: HTMLImageElement;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<style>@import "${import.meta.url.replace(/js$/iu, 'css')}";</style>
			<div>
				<figure>
					<img
						width="200"
						height="200"
						decoding="async"
						loading="lazy"
						role="presentation"
						src="/img/covers/fallback.svg"
					/>
				</figure>
				<h4></h4>
			</div>
		`;

		this.#title = this.#root.querySelector('h4') as HTMLHeadingElement;
		this.#thumb = this.#root.querySelector('img') as HTMLImageElement;

		this.addEventListener('click', async () => {
			await ItemDetails.openMaterialModal(this.getAttribute('id') as string);
		});
	}

	attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
		if (oldValue !== newValue) {
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			this.setMaterial(newValue);
		}
	}

	connectedCallback() {
		this.setAttribute('role', 'listitem');
		this.setAttribute('tabindex', '0');

		this.#title.innerText = this.getAttribute('title') ?? '';

		if (this.getAttribute('id')) {
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			this.setMaterial(this.getAttribute('id') as string);
		}
	}

	async setMaterial(id: string) {
		if (!this.getAttribute('title')) {
			const material = await getMaterial(id);

			if (material) {
				this.#title.innerText = material.name;
				this.setAttribute('title', material.name);
				this.setAttribute('id', id);
			}
		}

		const cover = await getThumb(id);

		if (cover) {
			this.#thumb.src = URL.createObjectURL(cover);
		}
	}
}

customElements.define('item-card', ItemCard);
