import type { Material } from '../../../../data/data';

import { FALLBACK_COVER, getThumbUrl } from '../covers/fetch-covers';
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

		const template = document.querySelector('#item-card') as HTMLTemplateElement;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));

		this.#title = this.#root.querySelector('h4') as HTMLHeadingElement;
		this.#thumb = this.#root.querySelector('img') as HTMLImageElement;

		this.addEventListener('click', async () => {
			const id = this.getAttribute('id') as string;
			const title = this.getAttribute('title') as string;

			await ItemDetails.openMaterialModal(id, title);
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

		const coverUrl = await getThumbUrl(id);

		this.#thumb.src = coverUrl;

		this.#thumb.addEventListener('error', () => {
			this.#thumb.src = FALLBACK_COVER;
		}, { capture: false, once: true, passive: true });
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
