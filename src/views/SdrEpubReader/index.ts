import type Section from 'epubjs/types/section';
import type { Location as BookLocation, NavItem, Rendition } from 'epubjs';
import type { SdrButton } from '../../components/SdrButton';
// TODO: import lib async
import 'jszip';

// TODO: import lib async
import { default as ePub } from 'epubjs';
import darkTheme from './dark-theme.css?url';

import { getFile } from '../../js/data-operations/idb-persistence';
import { getFilePermission } from '../../js/files-reader/files-reader';
import { I18n } from '../../js/intl/translations';
import { registerComponent, SdrComponent } from '../../components/SdrComponent';

import template from './template.html?raw' assert { type: 'html' };
import style from './style.css?inline' assert { type: 'css' };

const watchedAttributes = ['file', 'loaded'];

export interface SdrEpubReader {
	file: string,
	loaded: boolean,
	prevButtonDisabled: boolean,
	nextButtonDisabled: boolean
}

export class SdrEpubReader extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }
	static readonly elementName = 'sdr-epub-reader';

	#renderArea: HTMLElement;
	#tocSelect: HTMLSelectElement;

	#rendition: Rendition | undefined;

	constructor() {
		super({
			name: SdrEpubReader.elementName,
			watchedAttributes,
			props: [
				{
					name: 'file',
					value: (newValue = '') => {
						this.loaded = false;
						this.#resetBook();

						return newValue;
					},
					attributeName: 'file'
				},
				{ name: 'loaded', value: false, attributeName: 'loaded' },
				{ name: 'prevButtonDisabled', value: false },
				{ name: 'nextButtonDisabled', value: false }
			],
			handlers: {
				showPreviousPage: () => { void this.showPreviousPage(); },
				showNextPage: () => { void this.showNextPage(); },
				openBook: async (evt) => {
					const target = evt.target as SdrButton;

					target.disabled = true;
					await this.#loadBook();
					target.disabled = false;
				},
				tocSelect: (evt) => {
					const chapterHref = (evt.target as HTMLSelectElement).value;

					void this.#rendition?.display(chapterHref);
				}
			},
			template,
			style
		});

		this.#renderArea = this.root.querySelector('#book') as HTMLElement;
		this.#tocSelect = this.root.querySelector('#toc') as HTMLSelectElement;
	}

	#keyboardNavigation(evt: KeyboardEvent) {
		// Left Key
		if (evt.key === 'ArrowLeft') {
			void this.showPreviousPage();
		}

		// Right Key
		if (evt.key === 'ArrowRight') {
			void this.showNextPage();
		}
	}

	#loadToc(toc: NavItem[]) {
		const appendOptions = (chapter: NavItem) => {
			const option = document.createElement('option');

			option.textContent = chapter.label;
			option.value = decodeURI(chapter.href);

			this.#tocSelect.appendChild(option);

			chapter.subitems?.forEach(appendOptions);
		};

		toc.forEach(appendOptions);
	}

	async #loadFile() {
		try {
			if (!this.file) {
				throw new Error(I18n.t`Missing book file.`);
			}

			const handler = await getFile<FileSystemFileHandle>(this.file);

			if (!handler) {
				throw new Error(I18n.t`Book does not exist.`);
			}

			await getFilePermission(handler);

			return await handler.getFile();
		} catch (err) {
			this.#renderArea.innerText = err?.message ?? err ?? 'Error';
		}
	}

	async #loadBook() {
		const file = await this.#loadFile();

		if (!file) {
			return;
		}

		try {
			const book = ePub(await file.arrayBuffer());
			const { toc } = await book.loaded.navigation;

			this.#rendition = book.renderTo(this.#renderArea, { width: '100%', height: '100%', flow: 'scrolled-doc' });

			this.#rendition.themes.register('dark', darkTheme);
			this.#rendition.themes.select('dark');

			this.#loadToc(toc);

			this.#rendition.on('keyup', (evt: KeyboardEvent) => this.#keyboardNavigation(evt));
			document.addEventListener('keyup', (evt) => this.#keyboardNavigation(evt));

			this.#rendition.on('rendered', (section: Section) => {
				const newIndex = [...this.#tocSelect.options].findIndex((option) => option.value === section.href);

				this.#tocSelect.selectedIndex = newIndex;
			});

			this.#rendition.on('relocated', (bookLocation: BookLocation) => {
				if (bookLocation.atEnd) {
					this.nextButtonDisabled = true;
				} else {
					this.nextButtonDisabled = false;
				}

				if (bookLocation.atStart) {
					this.prevButtonDisabled = true;
				} else {
					this.prevButtonDisabled = false;
				}
			});

			await this.#rendition.display();

			this.loaded = true;
		} catch (err) {
			this.#renderArea.innerText = err?.message ?? err ?? 'Error';
		}
	}

	#resetBook() {
		this.#rendition?.destroy();
		this.#rendition = undefined;

		this.#renderArea.innerHTML = '';
		[...this.#tocSelect.querySelectorAll('option')].forEach((option) => option.remove());
	}

	async showNextPage() {
		await this.#rendition?.next();
	}

	async showPreviousPage() {
		await this.#rendition?.prev();
	}

	static updateFromURL() {
		const url = new URL(window.location.toString());
		const params = new URLSearchParams(url.search);

		if (params.has('file')) {
			let readerElement = document.querySelector<SdrEpubReader>(SdrEpubReader.elementName);

			if (!readerElement) {
				readerElement = document.createElement(SdrEpubReader.elementName) as SdrEpubReader;

				document.body.appendChild(readerElement);
			}

			readerElement.file = params.get('file') as string;
		}
	}
}

registerComponent(SdrEpubReader);
