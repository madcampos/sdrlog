import type { Material } from '../../../../data/data';

import { fetchThumb } from '../covers/fetch-covers';
import { getMaterial } from '../data-operations/idb-persistence';
import { ItemDetails } from './item-details';

interface CreateCardOptions {
	name: string,
	id: string,
	category: Material['category'],
	sku: string[],
	type: Material['type'],
	edition: Material['edition'],
	status?: Material['status']
}

export class ItemCard extends HTMLElement {
	static get observedAttributes() { return ['id']; }

	#root: ShadowRoot;

	#title: HTMLHeadingElement;

	#thumb: HTMLImageElement;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<style>:host { display: none; }</style>
			<link rel="stylesheet" href="${import.meta.url.replace(/js$/iu, 'css')}"/>
			<figure>
				<img
					decoding="async"
					loading="lazy"
					width="200"
					height="200"
					role="presentation"
					src="/img/covers/fallback.svg"
				/>
			</figure>
			<h4></h4>
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

		if (this.hasAttribute('id')) {
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			this.setMaterial(this.getAttribute('id') as string);
		}
	}

	async setMaterial(id: string) {
		if (!this.hasAttribute('title')) {
			const material = await getMaterial(id);

			if (material) {
				this.#title.innerText = material.name;
				this.setAttribute('title', material.name);
				this.setAttribute('id', id);
			}
		}

		const cover = await fetchThumb(id);

		if (cover) {
			this.#thumb.src = URL.createObjectURL(cover);
		}
	}

	static createCard({ id, name, category, sku, type, edition, status }: CreateCardOptions) {
		const itemCard = document.createElement('item-card');

		itemCard.id = id;
		itemCard.title = name;
		itemCard.dataset.category = category;
		itemCard.dataset.sku = sku.join(' ');
		itemCard.dataset.type = type;
		itemCard.dataset.edition = edition.toString();
		itemCard.dataset.status = status ?? '';
		document.querySelector('main')?.appendChild(itemCard);
	}
}

customElements.define('item-card', ItemCard);
