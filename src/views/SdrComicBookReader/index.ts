import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { getIDBItemByIndex } from '../../js/data/idb-persistence';
import { getFilePermission } from '../../js/files/file-import';
import { createComparer } from '../../js/intl/formatting';
import { I18n } from '../../js/intl/translations';

import style from './style.css?inline' assert { type: 'css' };


interface Page {
	name: string,
	folder: string,
	url: string
}

type Pages = Record<string, Page[]>;

const comparer = createComparer({ ignorePunctuation: true, numeric: true });
const DEFAULT_FOLDER_NAME = I18n.t`Default section`;

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

@customElement('sdr-comic-book-reader')
export class SdrComicBookReader extends LitElement {
	static styles = unsafeCSS(style);

	@property({ type: String, reflect: true }) declare file: string;
	@property({ type: Boolean, reflect: true }) declare loaded: boolean;

	@state() declare private selectedPage: string;
	@state() declare private pages: Page[];
	@state() declare private toc: string[];
	@state() declare private nextPageVisibility: 'visible' | 'hidden';
	@state() declare private previousPageVisibility: 'visible' | 'hidden';

	#currentVisibleImage: HTMLImageElement | undefined;

	constructor() {
		super();

		this.#resetComicBook();

		document.addEventListener('keyup', (keyEvt) => {
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
			if (!evt.shiftKey) {
				evt.preventDefault();

				this.renderRoot.querySelector('article')?.scrollBy({ left: evt.deltaY, behavior: 'smooth' });
			}
		}, { capture: false, passive: false });
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

	async #loadFile() {
		try {
			if (!this.file) {
				throw new Error(I18n.t`Missing comic book file.`);
			}

			const { handler } = await getIDBItemByIndex('files', 'itemId', this.file) ?? {};

			if (!handler || handler.kind !== 'file') {
				throw new Error(I18n.t`Comic book does not exist.`);
			}

			await getFilePermission(handler);

			return await handler.getFile();
		} catch (err) {
			(this.renderRoot.querySelector('artice') as HTMLElement).innerText = err?.message ?? err ?? 'Error';
		}

		return undefined;
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

	async #loadComicBook() {
		const file = await this.#loadFile();
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
		this.file = '';
		this.loaded = false;
		this.selectedPage = '';
		this.toc = [];
		this.pages = [];
	}

	showNextPage() {
		this.#currentVisibleImage?.nextElementSibling?.scrollIntoView();
	}

	showPreviousPage() {
		this.#currentVisibleImage?.previousElementSibling?.scrollIntoView();
	}

	render() {
		return html`
			<sdr-menu-bar>
				<sdr-button
					icon-button
					visibility="${this.previousPageVisibility}"
					@click="${() => this.showPreviousPage()}"
				>⏮️</sdr-button>
				<select
					id="toc"
					.value="${this.selectedPage}"
					@change="${() => this.renderRoot.querySelector(`[data-folder="${this.selectedPage}"]`)?.scrollIntoView()}"
				>
					${this.toc}
				</select>
				<sdr-button
					icon-button
					visibility="${this.nextPageVisibility}"
					@click="${() => this.showNextPage()}"
				>⏭️</sdr-button>
			</sdr-menu-bar>
			<article id="comic">
				${this.pages.map((page) => html`
					<img src="${page.url}" alt="${page.name}" loading="lazy" decoding="async" data-folder="${page.folder}"/>
				`)}
			</article>
			<div id="comic-book-overlay">
				<sdr-button
					icon-button
					id="open-comic"
					@click="${async () => this.#loadComicBook()}"
				>▶️</sdr-button>
			</div>
		`;
	}

	static updateFromURL() {
		const url = new URL(window.location.toString());
		const params = new URLSearchParams(url.search);

		if (params.has('file')) {
			let readerElement = document.querySelector('sdr-comic-book-reader');

			if (!readerElement) {
				readerElement = document.createElement('sdr-comic-book-reader');

				document.body.appendChild(readerElement);
			}

			readerElement.file = params.get('file') as string;
		}
	}
}
