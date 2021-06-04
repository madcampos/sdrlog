import { getCover, getMaterial } from '../data-operations/idb-persistence';
import { ItemDetails } from './item-details';

export class ItemCard extends HTMLElement {
	static get observedAttributes() { return ['id']; }

	#root: ShadowRoot;

	#title: HTMLHeadingElement;

	#thumb: HTMLImageElement;

	constructor(id?: string) {
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
				<h4>
					<progress></progress>
				</h4>
			</div>
		`;

		this.#title = this.#root.querySelector('h4') as HTMLHeadingElement;
		this.#thumb = this.#root.querySelector('img') as HTMLImageElement;

		this.setAttribute('role', 'listitem');
		this.setAttribute('tabindex', '0');

		if (this.getAttribute('id') ?? id) {
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			this.setMaterial(this.getAttribute('id') ?? id ?? '');
		}

		this.addEventListener('click', async () => {
			console.log('click');
			await ItemDetails.openMaterialModal(this.getAttribute('id') as string);
		});
	}

	async attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
		if (oldValue !== newValue) {
			await this.setMaterial(newValue);
		}
	}

	async setMaterial(id: string) {
		const material = await getMaterial(id);

		if (material) {
			this.#title.innerText = material.name;
			this.setAttribute('title', material.name);
			this.setAttribute('id', id);

			const cover = await getCover(id);

			if (cover) {
				this.#thumb.src = URL.createObjectURL(cover);
			}
		}
	}
}

customElements.define('item-card', ItemCard);
