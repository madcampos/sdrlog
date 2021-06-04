import { getCover, getMaterial } from '../data-operations/idb-persistence';
import type { ModalDialog } from '../dialog/dialog';

const dateFormater = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC', year: 'numeric' });

const categories = new Map([
	['novel', '📚'],
	['sourcebook', '📜'],
	['mission', '🗺️'],
	['rulebook', '📝'],
	['misc', '🔣'],
	['magazine', '📰'],
	['boardgame', '♟️'],
	['videogame', '🎮'],
	['tcg', '🃏'],
	['unofficial', '📓']
]);

const types = new Map([
	['digital', '💽'],
	['scan', '📠'],
	['print', '🖨️'],
	['physical', '🎲']
]);

const publishers = new Map([
	['Heyne Verlag', 'heyne'],
	['Fantasy Productions', 'fanpro'],
	['other', 'other'],
	['Catalyst Game Labs', 'catalyst'],
	['FASA Corporation', 'fasa'],
	['unofficial', 'unofficial'],
	['WizKids Games', 'wizkids'],
	['Pegasus Spiele', 'pegasus'],
	['Cliffhanger Productions', 'clifhanger'],
	['Harebrained Schemes', 'harebrained']
]);

const languages = new Map([
	['de-DE', '🇩🇪'],
	['fr-FR', '🇫🇷'],
	['jp-JP', '🇯🇵'],
	['es-ES', '🇪🇸'],
	['hu-HU', '🇭🇺'],
	['it-IT', '🇮🇹'],
	['pt-BR', '🇧🇷'],
	['cs-CZ', '🇨🇿'],
	['he-IL', '🇮🇱'],
	['pl-PL', '🇵🇱'],
	['fi-FI', '🇫🇮'],
	['en-US', '🇺🇸']
]);

export class ItemDetails extends HTMLElement {
	static get observedAttributes() { return ['id']; }

	#root: ShadowRoot;
	#modal: ModalDialog;

	#name: HTMLSpanElement;
	#sku: HTMLSpanElement;
	#edition: HTMLSpanElement;
	#gamedate: HTMLSpanElement;
	#category: HTMLElement;
	#type: HTMLElement;
	#language: HTMLSpanElement;
	#releasedate: HTMLSpanElement;
	#publisher: HTMLElement;
	#status: HTMLSpanElement;
	#names: HTMLUListElement;
	#files: HTMLUListElement;
	#links: HTMLUListElement;
	#cover: HTMLImageElement;
	#notes: HTMLElement;
	#description: HTMLPreElement;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<style>@import "${import.meta.url.replace(/js$/iu, 'css')}";</style>
			<modal-dialog>
				<div>
					<span id="name" slot="title"></span>
					<header>
						<span>SKU: <span id="sku"></span></span>
						<span>Edition: <span id="edition"></span></span>
						<span>Game date: <span id="gamedate"></span></span>
						<span>Category: <abbr id="category"></abbr></span>
						<span>Type: <abbr id="type"></abbr></span>
						<span>Original Language: <span id="language"></span></span>
						<span>Release date: <span id="releasedate"></span></span>
						<span>Publisher: <span id="publisher"></span></span>
						<span>Status: <span id="status"></span>
					</header>
					<details>
						<summary>Names published</summary>
						<ul id="names"></ul>
					</details>
					<details>
						<summary>Files</summary>
						<ul id="files"></ul>
					</details>
					<details>
						<summary>Online links</summary>
						<ul id="links"></ul>
					</details>
					<figure>
							<img
								width=""
								id="cover"
								decoding="async"
								loading="lazy"
								role="presentation"
								src="/img/covers/fallback.svg"
							/>
					</figure>
					<article>
						<aside id="notes"></aside>
						<pre id="description"></pre>
					</article>
				</div>
			</modal-dialog>
		`;

		this.#modal = this.#root.querySelector('modal-dialog') as ModalDialog;

		this.#name = this.#root.querySelector('#name') as HTMLSpanElement;
		this.#sku = this.#root.querySelector('#sku') as HTMLSpanElement;
		this.#edition = this.#root.querySelector('#edition') as HTMLSpanElement;
		this.#gamedate = this.#root.querySelector('#gamedate') as HTMLSpanElement;
		this.#category = this.#root.querySelector('#category') as HTMLElement;
		this.#type = this.#root.querySelector('#type') as HTMLElement;
		this.#language = this.#root.querySelector('#language') as HTMLSpanElement;
		this.#releasedate = this.#root.querySelector('#releasedate') as HTMLSpanElement;
		this.#publisher = this.#root.querySelector('#publisher') as HTMLSpanElement;
		this.#status = this.#root.querySelector('#status') as HTMLSpanElement;
		this.#names = this.#root.querySelector('#names') as HTMLUListElement;
		this.#files = this.#root.querySelector('#files') as HTMLUListElement;
		this.#links = this.#root.querySelector('#links') as HTMLUListElement;
		this.#cover = this.#root.querySelector('#cover') as HTMLImageElement;
		this.#notes = this.#root.querySelector('#notes') as HTMLElement;
		this.#description = this.#root.querySelector('#description') as HTMLPreElement;
	}

	show() {
		this.#modal.show();
	}

	close() {
		this.#modal.close();
	}

	async setMaterial(id: string) {
		const material = await getMaterial(id);

		if (material) {
			this.#name.innerText = material.name;
			this.#sku.innerText = material.sku.join(', ');
			this.#edition.innerText = material.edition.toString();

			if (material.gameDate) {
				this.#gamedate.innerText = dateFormater.format(new Date(material.gameDate));
			}

			this.#category.innerText = categories.get(material.category) ?? '';
			this.#category.title = material.category;

			this.#type.innerText = types.get(material.type) ?? '';
			this.#type.title = material.type;

			this.#language.innerText = languages.get(material.originalLanguage ?? '') ?? '';

			if (material.releaseDate) {
				this.#releasedate.innerText = material.releaseDate.map((date) => dateFormater.format(new Date(date))).join(', ');
			}

			this.#publisher.innerHTML = '';
			material.publisher.forEach((publisher) => {
				this.#publisher.insertAdjacentHTML('beforeend', `
					<abbr title="${publisher}">
						<img
							role="presentation"
							src="/img/publishers/${publishers.get(publisher) ?? 'fallback'}.png"
						/>
					</abbr>
				`);
			});

			this.#status.innerText = material.status ?? '';

			this.#names.innerHTML = '';
			Object.entries(material.names ?? {}).forEach(([lang, name]) => {
				this.#names.insertAdjacentHTML('beforeend', `
					<li>${languages.get(lang) ?? ''} → ${name}</li>
				`);
			});

			// TODO: get files for material and link them
			this.#files.innerHTML = '';

			this.#links.innerHTML = '';
			material.links?.forEach((link) => {
				this.#links.insertAdjacentHTML('beforeend', `
					<a
						href="${link.url}"
						target="_blank"
						rel="noopener"
					>${link.title}</a>
				`);
			});

			const cover = await getCover(id);

			if (cover) {
				this.#cover.src = URL.createObjectURL(cover);
			}

			this.#notes.innerText = material.notes ?? '';
			this.#description.innerText = material.description;
		}
	}

	static async openMaterialModal(id: string) {
		let modal = document.querySelector<ItemDetails>('item-details');

		if (!modal) {
			modal = document.createElement('item-details') as ItemDetails;

			document.body.appendChild(modal);
		}

		modal.show();

		await modal.setMaterial(id);
	}
}

customElements.define('item-details', ItemDetails);
