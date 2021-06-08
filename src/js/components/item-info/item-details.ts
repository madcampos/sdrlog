import { getMaterial } from '../data-operations/idb-persistence';
import { fetchCover } from '../covers/fetch-covers';
import type { ModalDialog } from '../dialog/dialog';
import type { EditBox } from '../edit-box/edit-box';
import type { EditList } from '../edit-box/edit-list';
import type { EditSelect } from '../edit-box/edit-select';
import type { EditText } from '../edit-box/edit-text';

const dateFormater = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC', year: 'numeric' });

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
	#editButton: HTMLButtonElement;
	#saveButton: HTMLButtonElement;

	#isEditing = false;

	#name: EditBox;
	#sku: EditList;
	#edition: EditBox;
	#gameDate: EditBox;
	#category: EditSelect;
	#type: EditSelect;
	#language: EditSelect;
	#releaseDate: EditList;
	#publisher: EditList;
	#status: EditSelect;
	#names: EditList;
	#files: EditList;
	#links: EditList;
	#cover: HTMLImageElement;
	#notes: EditText;
	#description: EditText;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<style>@import "${import.meta.url.replace(/js$/iu, 'css')}";</style>
			<modal-dialog>
				<edit-box id="name" slot="title" placeholder="Item name"></edit-box>

				<header>
					<edit-list id="sku" open>
						<span slot="label">SKU</span>
						<input slot="input"/>
					</edit-list>

					<edit-box id="edition" type="number" min="1" max="6" step="1">
						<span slot="label">Edition</span>
					</edit-box>

					<edit-box type="date" id="gamedate">
						<span slot="label">Game date</span>
					</edit-box>

					<edit-select id="category">
						<span slot="label">Category</span>

						<option value="novel">📚 Novel</option>
						<option value="sourcebook">📜 Sourcebook</option>
						<option value="mission">🗺️ Mission</option>
						<option value="rulebook">📝 Rulebook</option>
						<option value="misc">🔣 Misc.</option>
						<option value="magazine">📰 Magazine</option>
						<option value="boardgame">♟️ Boardgame</option>
						<option value="videogame">🎮 Videogame</option>
						<option value="tcg">🃏 T.C.G.</option>
						<option value="unofficial">📓 Unofficial</option>
					</edit-select>

					<edit-select id="type">
						<span slot="label">Type</span>

						<option value="digital">💽 Digital</option>
						<option value="scan">📠 Scan</option>
						<option value="print">🖨️ Print</option>
						<option value="physical">🎲 Physical</option>
					</edit-select>

					<edit-select id="language">
						<span slot="label">Original Language</span>

						<option value="en-US">🇺🇸 English</option>
						<option value="de-DE">🇩🇪 Deutch</option>
						<option value="fr-FR">🇫🇷 French</option>
						<option value="jp-JP">🇯🇵 Japanese</option>
						<option value="es-ES">🇪🇸 Spanish</option>
						<option value="hu-HU">🇭🇺 Hungarian</option>
						<option value="it-IT">🇮🇹 Italian</option>
						<option value="pt-BR">🇧🇷 Portuguese</option>
						<option value="cs-CZ">🇨🇿 Czech</option>
						<option value="he-IL">🇮🇱 Hebrew</option>
						<option value="pl-PL">🇵🇱 Polish</option>
						<option value="fi-FI">🇫🇮 Finish</option>
					</edit-select>

					<edit-list id="releasedate" open>
						<span slot="label">Release date</span>
						<input slot="input" type="date"/>
					</edit-list>

					<edit-list id="publisher" open>
						<span slot="label">Publisher</span>

						<select slot="input">
							<option>Heyne Verlag</option>
							<option>Fantasy Productions</option>
							<option>other</option>
							<option>Catalyst Game Labs</option>
							<option>FASA Corporation</option>
							<option>unofficial</option>
							<option>WizKids Games</option>
							<option>Pegasus Spiele</option>
							<option>Cliffhanger Productions</option>
							<option>Harebrained Schemes</option>
						</select>
					</edit-list>

					<edit-select id="status" hidden>
						<span slot="label">Status</span>

						<option value="ok">✔️ OK</option>
						<option value="missing">❌ Missing</option>
						<option value="outofscope">⛔ Out of scope</option>
						<option value="canceled">🚫 Canceled</option>
					</edit-select>
				</header>

				<aside>
					<edit-list id="names">
						<span slot="label">Names published</span>

						<select slot="input">
							<option value="en-US">🇺🇸 English</option>
							<option value="de-DE">🇩🇪 Deutch</option>
							<option value="fr-FR">🇫🇷 French</option>
							<option value="jp-JP">🇯🇵 Japanese</option>
							<option value="es-ES">🇪🇸 Spanish</option>
							<option value="hu-HU">🇭🇺 Hungarian</option>
							<option value="it-IT">🇮🇹 Italian</option>
							<option value="pt-BR">🇧🇷 Portuguese</option>
							<option value="cs-CZ">🇨🇿 Czech</option>
							<option value="he-IL">🇮🇱 Hebrew</option>
							<option value="pl-PL">🇵🇱 Polish</option>
							<option value="fi-FI">🇫🇮 Finish</option>
						</select>

						<input slot="input"/>
					</edit-list>

					<edit-list id="files" hidden>
						<span slot="label">Files</span>
						<input slot="input"/>
					</edit-list>

					<edit-list id="links">
						<span slot="label">Online links</span>
						<input slot="input"/>
					</edit-list>
				</aside>

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
					<edit-text id="notes">
						<span slot="label">Notes</span>
					</edit-text>

					<edit-text id="description">
						<span slot="label">Description</span>
					</edit-text>
				</article>
				<footer>
					<button id="edit">✏️ Edit</button>
					<button hidden id="save">💾 Save</button>
				</footer>
			</modal-dialog>
		`;

		this.#modal = this.#root.querySelector('modal-dialog') as ModalDialog;
		this.#editButton = this.#root.querySelector('#edit') as HTMLButtonElement;
		this.#saveButton = this.#root.querySelector('#save') as HTMLButtonElement;

		this.#name = this.#root.querySelector('#name') as EditBox;
		this.#sku = this.#root.querySelector('#sku') as EditList;
		this.#edition = this.#root.querySelector('#edition') as EditBox;
		this.#gameDate = this.#root.querySelector('#gamedate') as EditBox;
		this.#category = this.#root.querySelector('#category') as EditSelect;
		this.#type = this.#root.querySelector('#type') as EditSelect;
		this.#language = this.#root.querySelector('#language') as EditSelect;
		this.#releaseDate = this.#root.querySelector('#releasedate') as EditList;
		this.#publisher = this.#root.querySelector('#publisher') as EditList;
		this.#status = this.#root.querySelector('#status') as EditSelect;
		this.#names = this.#root.querySelector('#names') as EditList;
		this.#files = this.#root.querySelector('#files') as EditList;
		this.#links = this.#root.querySelector('#links') as EditList;
		this.#cover = this.#root.querySelector('#cover') as HTMLImageElement;
		this.#notes = this.#root.querySelector('#notes') as EditText;
		this.#description = this.#root.querySelector('#description') as EditText;

		this.#editButton.addEventListener('click', () => {
			this.toggleEdit();
		});

		this.#saveButton.addEventListener('click', () => {
			// TODO: save material
		});
	}

	get isEditing() {
		return this.#isEditing;
	}

	set isEditing(isEditing: boolean) {
		this.#isEditing = isEditing;
	}

	attributeChangedCallback() {
		const id = this.getAttribute('id');

		if (id) {
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			this.setMaterial(id);
		} else {
			this.resetMaterial();
		}
	}

	show() {
		this.#modal.show();
	}

	close() {
		this.#modal.close();
	}

	toggleEdit(resetState?: boolean, isNew?: boolean) {
		const editingStatus = resetState ?? !this.isEditing;

		this.isEditing = editingStatus;

		this.#name.edit = editingStatus;
		this.#sku.edit = editingStatus;
		this.#edition.edit = editingStatus;
		this.#gameDate.edit = editingStatus;
		this.#category.edit = editingStatus;
		this.#type.edit = editingStatus;
		this.#language.edit = editingStatus;
		this.#releaseDate.edit = editingStatus;
		this.#publisher.edit = editingStatus;
		this.#status.edit = editingStatus;
		this.#names.edit = editingStatus;
		this.#files.edit = editingStatus;
		this.#links.edit = editingStatus;
		this.#notes.edit = editingStatus;
		this.#description.edit = editingStatus;

		if (this.#status.value === '') {
			this.#status.hidden = !editingStatus;
		}

		if (isNew === true) {
			this.#editButton.hidden = true;
		} else {
			this.#editButton.hidden = false;
		}

		if (this.isEditing) {
			this.#editButton.innerText = '❌ Cancel edit';
			this.#saveButton.hidden = false;
		} else {
			this.#editButton.innerText = '✏️ Edit Material';
			this.#saveButton.hidden = true;
		}
	}

	resetMaterial() {
		this.#name.resetValue();
		this.#sku.resetValues();
		this.#edition.resetValue();
		this.#gameDate.resetValue();
		this.#category.resetValue();
		this.#type.resetValue();
		this.#language.resetValue();
		this.#releaseDate.resetValues();
		this.#publisher.resetValues();
		this.#status.resetValue();
		this.#status.hidden = true;
		this.#names.resetValues();
		this.#files.resetValues();
		this.#links.resetValues();
		this.#cover.src = '/img/covers/fallback.svg';
		this.#notes.resetValue();
		this.#description.resetValue();
	}

	async setMaterial(id: string) {
		this.resetMaterial();
		this.toggleEdit(false);

		const material = await getMaterial(id);

		if (material) {
			this.#name.value = material.name;

			material.sku.forEach((sku) => {
				this.#sku.insertAdjacentHTML('beforeend', `
					<edit-list-item>${sku}</edit-list-item>
				`);
			});

			this.#edition.value = material.edition.toString();
			this.#gameDate.value = material.gameDate ?? '';
			this.#category.value = material.category;
			this.#type.value = material.type;
			this.#language.value = material.originalLanguage;

			material.releaseDate?.forEach((releaseDate) => {
				this.#releaseDate.insertAdjacentHTML('beforeend', `
					<edit-list-item>
						${dateFormater.format(new Date(releaseDate))}
					</edit-list-item>
				`);
			});

			material.publisher.forEach((publisher) => {
				this.#publisher.insertAdjacentHTML('beforeend', `
					<edit-list-item>
						<abbr title="${publisher}">
							<img
								role="presentation"
								src="/img/publishers/${publishers.get(publisher) ?? 'fallback'}.png"
							/>
						</abbr>
					</edit-list-item>
				`);
			});

			if (material.status) {
				this.#status.hidden = false;
			}

			this.#status.value = material.status ?? 'ok';

			Object.entries(material.names ?? {}).forEach(([lang, name]) => {
				this.#names.insertAdjacentHTML('beforeend', `
					<edit-list-item>${languages.get(lang) ?? ''} → ${name}</edit-list-item>
				`);
			});

			this.#names.loaded = true;

			// TODO: get files for material and link them

			material.links?.forEach((link) => {
				this.#links.insertAdjacentHTML('beforeend', `
					<edit-list-item>
						<a
							href="${link.url}"
							target="_blank"
							rel="noopener"
						>${link.title}</a>
					</edit-list-item>
				`);
			});

			this.#links.loaded = true;

			const cover = await fetchCover(id);

			if (cover) {
				this.#cover.src = URL.createObjectURL(cover);
			}

			this.#notes.value = material.notes ?? '';
			this.#description.value = material.description;
		}
	}

	static async openMaterialModal(id?: string) {
		let modal = document.querySelector<ItemDetails>('item-details');

		if (!modal) {
			modal = document.createElement('item-details') as ItemDetails;

			document.body.appendChild(modal);
		}

		modal.show();

		if (id) {
			await modal.setMaterial(id);
		} else {
			modal.toggleEdit(true);
		}
	}
}

customElements.define('item-details', ItemDetails);
