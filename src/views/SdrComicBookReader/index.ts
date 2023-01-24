// TODO: import lib async
import JSZip from 'jszip';
import { registerComponent, SdrComponent } from '../../components/SdrComponent';

import { getFile } from '../../js/data-operations/idb-persistence';
import { getFilePermission } from '../../js/files-reader/files-reader';
import { createComparer } from '../../js/intl/formatting';
import { I18n } from '../../js/intl/translations';

import template from './template.html?raw' assert { type: 'html' };
import style from './style.css?inline' assert { type: 'css' };

const watchedAttributes = ['file', 'loaded'];

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

export interface SdrComicBookReader {
	file: string,
	loaded: boolean,
	nextPageVisibility: 'visible' | 'hidden',
	previousPageVisibility: 'visible' | 'hidden'
}

export class SdrComicBookReader extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }
	static readonly elementName = 'sdr-comic-book-reader';

	#renderArea: HTMLElement;
	#tocSelect: HTMLSelectElement;
	#currentVisibleImage: HTMLImageElement | undefined;

	constructor() {
		super({
			name: SdrComicBookReader.elementName,
			watchedAttributes,
			props: [
				{
					name: 'file',
					value: (newValue = '') => {
						this.loaded = false;
						this.#resetComicBook();

						return newValue;
					},
					attributeName: 'file'
				},
				{ name: 'loaded', value: false, attributeName: 'loaded' },
				{ name: 'nextPageVisibility', value: 'visible' },
				{ name: 'previousPageVisibility', value: 'visible' }
			],
			handlers: {
				showPreviousPage: () => { this.showPreviousPage(); },
				showNextPage: () => { this.showNextPage(); },
				openComic: () => { void this.#loadComicBook(); },
				tocSelect: () => { this.root.querySelector(`[data-folder="${this.#tocSelect.value}"]`)?.scrollIntoView(); }
			},
			template,
			style
		});

		this.#renderArea = this.root.querySelector('#comic') as HTMLElement;
		this.#tocSelect = this.root.querySelector('#toc') as HTMLSelectElement;

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

				this.#renderArea.scrollBy({ left: evt.deltaY, behavior: 'smooth' });
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

		const currentValue = this.#currentVisibleImage.dataset.folder;
		const newIndex = [...this.#tocSelect.options].findIndex((option) => option.value === currentValue);

		this.#tocSelect.selectedIndex = newIndex;
	}

	async #loadFile() {
		try {
			if (!this.file) {
				throw new Error(I18n.t`Missing comic file.`);
			}

			const handler = await getFile<FileSystemFileHandle>(this.file);

			if (!handler) {
				throw new Error(I18n.t`Comic does not exist.`);
			}

			await getFilePermission(handler);

			return await handler.getFile();
		} catch (err) {
			this.#renderArea.innerText = err?.message ?? err ?? 'Error';
		}
	}

	async #unzipImages(file?: File) {
		if (!file) {
			return {};
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

	#appendTocItem(folder: string) {
		const tocItem = document.createElement('option');

		tocItem.innerText = folder;
		tocItem.value = encodeURIComponent(folder);
		this.#tocSelect.appendChild(tocItem);
	}

	#appendPage(page: Page) {
		const img = document.createElement('img');
		const observer = new IntersectionObserver((entries) => this.#updateVisibleImage(entries), { threshold: 1 });

		img.dataset.folder = encodeURIComponent(page.folder);
		img.src = page.url;
		img.loading = 'lazy';
		img.decoding = 'async';
		img.alt = page.name;

		img.addEventListener('load', () => {
			observer.observe(img);
		}, { once: true });

		this.#renderArea.appendChild(img);
	}

	async #loadComicBook() {
		const file = await this.#loadFile();
		const folders = await this.#unzipImages(file);

		for (const folder of Object.keys(folders)) {
			this.#appendTocItem(folder);

			for (const page of folders[folder]) {
				this.#appendPage(page);
			}
		}

		this.loaded = true;

		// Force start at the begining
		this.#tocSelect.selectedIndex = 0;
		this.#renderArea.querySelector('img:first-child')?.scrollIntoView();
	}

	#resetComicBook() {
		[...this.#renderArea.querySelectorAll('img')].forEach((img) => img.remove());
		[...this.#tocSelect.querySelectorAll('option')].forEach((option) => option.remove());
	}

	showNextPage() {
		this.#currentVisibleImage?.nextElementSibling?.scrollIntoView();
	}

	showPreviousPage() {
		this.#currentVisibleImage?.previousElementSibling?.scrollIntoView();
	}

	static updateFromURL() {
		const url = new URL(window.location.toString());
		const params = new URLSearchParams(url.search);

		if (params.has('file')) {
			let readerElement = document.querySelector<SdrComicBookReader>(SdrComicBookReader.elementName);

			if (!readerElement) {
				readerElement = document.createElement(SdrComicBookReader.elementName) as SdrComicBookReader;

				document.body.appendChild(readerElement);
			}

			readerElement.file = params.get('file') as string;
		}
	}
}

registerComponent(SdrComicBookReader);
