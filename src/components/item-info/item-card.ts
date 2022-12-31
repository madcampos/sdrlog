import type { Material } from '../../../public/data/data';

import { FALLBACK_COVER, getThumbUrl } from '../../js/covers/fetch-covers';
import { getMaterial } from '../../js/data-operations/idb-persistence';
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

		this.addEventListener('keyup', (evt) => {
			if (evt.code === 'Space' || evt.code === 'Enter') {
				evt.preventDefault();
				evt.stopPropagation();

				this.click();
			}
		});
	}

	attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
		if (oldValue !== newValue) {
			void this.setMaterial(newValue);
		}
	}

	connectedCallback() {
		this.setAttribute('role', 'listitem');
		this.setAttribute('tabindex', '0');

		this.#title.innerText = this.getAttribute('title') ?? '';

		if (this.hasAttribute('id')) {
			void this.setMaterial(this.getAttribute('id') as string);
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

		this.#thumb.src = `${import.meta.env.APP_PUBLIC_URL}thumbs/${id}.jpg`;

		this.#thumb.addEventListener('error', async () => {
			this.#thumb.src = await getThumbUrl(id) || FALLBACK_COVER;
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
