import type { CustomButton } from '../button/button';

import '../../../../lib/zip/jszip';

import { getFile } from '../data-operations/idb-persistence';
import { getFilePermission } from '../files-reader/files-reader';
import { createComparer } from '../intl/formatting';
import { I18n } from '../intl/translations';

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

export class ComicBookReader extends HTMLElement {
	static get observedAttributes() { return ['file', 'loaded']; }

	#filePath = '';

	#root: ShadowRoot;
	#renderArea: HTMLElement;
	#nextButton: CustomButton;
	#prevButton: CustomButton;
	#tocSelect: HTMLSelectElement;
	#loadOverlay: HTMLDivElement;
	#currentVisibleImage: HTMLImageElement | undefined;

	constructor() {
		super();

		const template = document.querySelector('#cbz-reader') as HTMLTemplateElement;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));

		this.#renderArea = this.#root.querySelector('#comic') as HTMLElement;
		this.#nextButton = this.#root.querySelector('#next') as CustomButton;
		this.#prevButton = this.#root.querySelector('#prev') as CustomButton;
		this.#tocSelect = this.#root.querySelector('#toc') as HTMLSelectElement;
		this.#loadOverlay = this.#root.querySelector('#comic-load-overlay') as HTMLDivElement;

		this.#prevButton.addEventListener('click', () => this.showPreviousPage());
		this.#nextButton.addEventListener('click', () => this.showNextPage());

		this.#tocSelect.addEventListener('change', () => {
			this.#root.querySelector(`[data-folder="${this.#tocSelect.value}"]`)?.scrollIntoView();
		});

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

		this.#root.querySelector('#open-comic')?.addEventListener('click', async () => this.#loadComicBook());
	}

	#updateVisibleImage([entry]: IntersectionObserverEntry[]) {
		this.#currentVisibleImage = entry.target as HTMLImageElement;

		if (!this.#currentVisibleImage.previousElementSibling) {
			this.#prevButton.style.visibility = 'hidden';
		} else {
			this.#prevButton.style.visibility = 'visible';
		}

		if (!this.#currentVisibleImage.nextElementSibling) {
			this.#nextButton.style.visibility = 'hidden';
		} else {
			this.#nextButton.style.visibility = 'visible';
		}

		const currentValue = this.#currentVisibleImage.dataset.folder;
		const newIndex = [...this.#tocSelect.options].findIndex((option) => option.value === currentValue);

		this.#tocSelect.selectedIndex = newIndex;
	}

	async #loadComicBookFile() {
		try {
			if (!this.#filePath) {
				throw new Error(I18n.t`Missing comic file.`);
			}

			const handler = await getFile(this.#filePath) as FileSystemFileHandle | undefined;

			if (!handler) {
				throw new Error(I18n.t`Comic does not exist.`);
			}

			await getFilePermission(handler);

			return await handler.getFile();
		} catch (err) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
			this.#renderArea.innerText = err?.message ?? err ?? 'Error';
		}
	}

	async #parseZipFileImages(file?: File) {
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

		return pages;
	}

	#fillToc(pages: Pages) {
		const sortedFolders = Object.keys(pages).sort((folderA, folderB) => {
			if (folderB === DEFAULT_FOLDER_NAME) {
				return 1;
			}

			return comparer(folderA, folderB);
		});

		for (const folder of sortedFolders) {
			const tocItem = document.createElement('option');

			tocItem.innerText = folder;
			tocItem.value = encodeURIComponent(folder);
			this.#tocSelect.appendChild(tocItem);

			pages[folder] = pages[folder].sort(({ name: aName }, { name: bName }) => comparer(aName, bName));

			for (const page of pages[folder]) {
				const img = document.createElement('img');
				const observer = new IntersectionObserver((entries) => this.#updateVisibleImage(entries), { threshold: 1 });

				img.dataset.folder = encodeURIComponent(page.folder);
				img.src = page.url;
				img.loading = 'lazy';
				img.decoding = 'async';
				img.addEventListener('load', () => {
					observer.observe(img);
				});

				this.#renderArea.appendChild(img);
			}
		}
	}

	async #loadComicBook() {
		this.loaded = true;

		const file = await this.#loadComicBookFile();
		const pages = await this.#parseZipFileImages(file);

		this.#fillToc(pages);

		// Force start at the begining
		this.#tocSelect.selectedIndex = 0;
		this.#renderArea.querySelector('img:first-child')?.scrollIntoView();
	}

	#resetComicBook() {
		[...this.#renderArea.querySelectorAll('img')].forEach((img) => img.remove());
	}

	get file() {
		return this.#filePath;
	}

	set file(newValue: string) {
		this.#filePath = newValue;
		this.loaded = false;
		this.#resetComicBook();
	}

	get loaded() {
		return this.hasAttribute('loaded');
	}

	set loaded(newValue: boolean) {
		if (newValue) {
			this.setAttribute('loaded', '');
		} else {
			this.removeAttribute('loaded');
		}
	}

	showNextPage() {
		this.#currentVisibleImage?.nextElementSibling?.scrollIntoView();
	}

	showPreviousPage() {
		this.#currentVisibleImage?.previousElementSibling?.scrollIntoView();
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (oldValue !== newValue) {
			if (name === 'file') {
				this.file = newValue;
			} else if (name === 'loaded') {
				this.loaded = this.hasAttribute('loaded');
			}
		}
	}

	connectedCallback() {
		if (this.hasAttribute('file')) {
			this.file = this.getAttribute('file') ?? '';
		}
	}
}

customElements.define('cbz-reader', ComicBookReader);
