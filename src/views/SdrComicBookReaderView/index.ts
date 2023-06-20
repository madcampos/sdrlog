import type { RouteLocation, RouterView } from '../../router/router';

import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { Router } from '../../router/router';
import { createComparer } from '../../js/intl/formatting';
import { loadFile } from '../../js/files/file-open';

interface Page {
	name: string,
	folder: string,
	url: string
}

type Pages = Record<string, Page[]>;

const comparer = createComparer({ ignorePunctuation: true, numeric: true });
const DEFAULT_FOLDER_NAME = 'Default section';

const mimeTypes = new Map([
	['.png', 'image/png'],
	['.apng', 'image/apng'],
	['.jpg', 'image/jpeg'],
	['.jpeg', 'image/jpeg'],
	['.jfif', 'image/jpeg'],
	['.pjpeg', 'image/jpeg'],
	['.pjp', 'image/jpeg'],
	['.avif', 'image/avif'],
	['.webp', 'image/webp'],
	['.bmp', 'image/bmp'],
	['.gif', 'image/gif']
]);

@customElement('sdr-view-cbz-reader')
export class SdrViewCbzReader extends LitElement implements RouterView {
	static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

	@property({ type: Boolean, reflect: true }) declare loaded: boolean;

	@state() declare private open: boolean;
	@state() declare private selectedPage: string;
	@state() declare private pages: Page[];
	@state() declare private toc: string[];
	@state() declare private nextPageVisibility: 'visible' | 'hidden';
	@state() declare private previousPageVisibility: 'visible' | 'hidden';

	#currentVisibleImage: HTMLImageElement | undefined;

	constructor() {
		super();

		this.open = false;
		this.#resetComicBook();

		document.addEventListener('keyup', (keyEvt) => {
			if (!this.loaded) {
				return;
			}

			// Left Key
			if (keyEvt.key === 'ArrowLeft') {
				this.showPreviousPage();
			}

			// Right Key
			if (keyEvt.key === 'ArrowRight') {
				this.showNextPage();
			}
		}, false);

		window.addEventListener('wheel', (evt) => {
			if (!this.loaded) {
				return;
			}

			if (!evt.shiftKey) {
				evt.preventDefault();

				this.renderRoot.querySelector('article')?.scrollBy({ left: evt.deltaY, behavior: 'smooth' });
			}
		}, { capture: false, passive: false });

		// TODO: add gamepad navigation
	}

	#close() {
		this.open = false;

		void Router.navigate('/');
	}

	#updateVisibleImage([entry]: IntersectionObserverEntry[]) {
		this.#currentVisibleImage = entry.target as HTMLImageElement;

		if (!this.#currentVisibleImage.previousElementSibling) {
			this.previousPageVisibility = 'hidden';
		} else {
			this.previousPageVisibility = 'visible';
		}

		if (!this.#currentVisibleImage.nextElementSibling) {
			this.nextPageVisibility = 'hidden';
		} else {
			this.nextPageVisibility = 'visible';
		}

		this.selectedPage = this.#currentVisibleImage.dataset.folder as string;
	}

	async #unzipImages(file?: File) {
		if (!file) {
			return {};
		}


		if (!('JSZip' in window)) {
			await import('jszip');
		}

		const zip = await JSZip.loadAsync(file);
		const pages: Pages = {};

		for await (const zipObject of Object.values(zip.files)) {
			if (!zipObject.dir) {
				const blob = await zipObject.async('blob');
				const [name, folder = DEFAULT_FOLDER_NAME] = zipObject.name.split('/').reverse();
				const testRegex = /(?<extension>\.[a-z0-9]{3,})$/u;
				const { extension } = testRegex.exec(name)?.groups ?? {};

				if (mimeTypes.has(extension)) {
					if (!(folder in pages)) {
						pages[folder] = [];
					}

					pages[folder].push({
						name,
						folder,
						url: URL.createObjectURL(blob)
					});
				}
			}
		}


		const sortedPages = Object.fromEntries(Object.keys(pages).sort((folderA, folderB) => {
			if (folderB === DEFAULT_FOLDER_NAME) {
				return 1;
			}

			return comparer(folderA, folderB);
		}).map((folder) => [folder, pages[folder]]));

		return sortedPages;
	}

	async #loadComicBook(id: string) {
		const file = await loadFile(id);
		const folders = await this.#unzipImages(file);

		for (const folder of Object.keys(folders)) {
			this.toc.push(folder);

			for (const page of folders[folder]) {
				this.pages.push(page);
			}
		}

		const observer = new IntersectionObserver((entries) => this.#updateVisibleImage(entries), { threshold: 1 });

		this.renderRoot.querySelectorAll('img').forEach((img) => observer.observe(img));

		this.loaded = true;

		// Force start at the begining
		[this.selectedPage] = this.toc;
		this.renderRoot.querySelector('article img:first-child')?.scrollIntoView();
	}

	#resetComicBook() {
		this.loaded = false;
		this.selectedPage = '';
		this.toc = [];
		this.pages = [];

		this.nextPageVisibility = 'hidden';
		this.previousPageVisibility = 'hidden';
	}

	showNextPage() {
		this.#currentVisibleImage?.nextElementSibling?.scrollIntoView();
	}

	showPreviousPage() {
		this.#currentVisibleImage?.previousElementSibling?.scrollIntoView();
	}

	async navigate(destination: RouteLocation<'/cbz/:id'>) {
		this.#resetComicBook();

		if (!destination.params.id) {
			return;
		}

		await this.#loadComicBook(destination.params.id);
		this.open = true;

		return 'Comic Book Reader';
	}

	createRenderRoot() {
		return this;
	}

	render() {
		return html`
			<sdr-dialog ?open="${this.open}" @close="${() => this.#close()}">
				<sdr-button
					icon-button
					slot="title"
					class="title-menu"
					style="visibility: ${this.previousPageVisibility}"
					@click="${() => this.showPreviousPage()}"
				>⏮️</sdr-button>
				<sdr-select
					id="toc"
					slot="title"
					class="title-menu"
					.value="${this.selectedPage}"
					@change="${() => this.renderRoot.querySelector(`[data-folder="${this.selectedPage}"]`)?.scrollIntoView()}"
				>
					${this.toc.map((folder) => html`<option>${folder}</option>`)}
				</sdr-select>
				<sdr-button
					icon-button
					slot="title"
					class="title-menu"
					style="visibility: ${this.nextPageVisibility}"
					@click="${() => this.showNextPage()}"
				>⏭️</sdr-button>

				<article id="comic">
					${this.pages.map((page) => html`
						<img src="${page.url}" alt="${page.name}" loading="lazy" decoding="async" data-folder="${page.folder}"/>
					`)}
				</article>

				<div id="comic-book-overlay">
					<progress></progress>
				</div>
			</sdr-dialog>
		`;
	}
}
