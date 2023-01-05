import type { Material } from '../../../public/data/data';

import { FALLBACK_COVER, getThumbUrl } from '../../js/covers/fetch-covers';
import { getMaterial } from '../../js/data-operations/idb-persistence';
import { SdrComponent } from '../base/BaseComponent';
import { SdrItemDetails } from '../item-details/item-details';

import template from './template.html?raw';
import style from './style.css?raw';

const watchedAttributes = ['id', 'title', 'category', 'sku', 'type', 'edition', 'status'];

interface CreateCardOptions {
	name: string,
	id: string,
	category: Material['category'],
	sku: string[],
	type: Material['type'],
	edition: Material['edition'],
	status?: Material['status']
}

export interface SdrCard {
	id: string,
	title: string,
	category: Material['category'],
	sku: string[],
	type: Material['type'],
	edition: Material['edition'],
	status: Material['status'] | 'OK'
}

export class SdrCard extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }

	constructor() {
		super({
			name: 'sdr-card',
			watchedAttributes,
			props: [
				{ name: 'id', value: '', attributeName: 'id' },
				{ name: 'title', value: '', attributeName: 'title' },
				{ name: 'category', value: '', attributeName: 'category' },
				{ name: 'sku', value: '', attributeName: 'sku' },
				{ name: 'type', value: '', attributeName: 'type' },
				{ name: 'edition', value: '', attributeName: 'edition' },
				{ name: 'status', value: '', attributeName: 'status' }
			],
			template,
			style
		});

		this.addEventListener('click', async () => {
			await SdrItemDetails.openMaterialModal(this.id, this.title);
		});

		this.addEventListener('keyup', (evt) => {
			if (evt.code === 'Space' || evt.code === 'Enter') {
				evt.preventDefault();
				evt.stopPropagation();

				this.click();
			}
		});
	}

	connectedCallback() {
		super.connectedCallback();

		this.setAttribute('role', 'listitem');
		this.setAttribute('tabindex', '0');

		if (this.id !== '') {
			void this.setMaterial(this.id);
		}
	}

	async setMaterial(id: string) {
		if (!this.hasAttribute('title')) {
			const material = await getMaterial(id);

			if (material) {
				this.title = material.name;
				this.category = material.category;
				this.sku = material.sku;
				this.type = material.type;
				this.edition = material.edition;
				this.status = material.status ?? 'OK';
			}
		}

		const thumb = this.root.querySelector('img') as HTMLImageElement;

		thumb.src = `${import.meta.env.APP_PUBLIC_URL}thumbs/${id}.jpg`;

		thumb.addEventListener('error', async () => {
			thumb.src = await getThumbUrl(id) || FALLBACK_COVER;
		}, { capture: false, once: true, passive: true });
	}

	static createCard({ id, name, category, sku, type, edition, status }: CreateCardOptions) {
		const itemCard = document.createElement('sdr-card') as SdrCard;

		itemCard.id = id;
		itemCard.title = name;
		itemCard.category = category;
		itemCard.sku = sku;
		itemCard.type = type;
		itemCard.edition = edition;
		itemCard.status = status ?? 'OK';
		document.querySelector('main')?.appendChild(itemCard);
	}
}
