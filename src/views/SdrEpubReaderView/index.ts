import type { RouteLocation, RouterView } from '../../router/router';

import type { Book, Location as BookLocation, NavItem, Rendition } from 'epubjs';
import type Section from 'epubjs/types/section';

import { html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import darkTheme from './dark-theme.css?url';

import { loadFile } from '../../js/files/file-open';
import { Router } from '../../router/router';

@customElement('sdr-view-epub-reader')
class SdrViewEpubReader extends LitElement implements RouterView {
	#rendition: Rendition | undefined;

	@property({ type: Boolean, attribute: 'loaded' })
	accessor loaded: boolean;

	@state()
	accessor open: boolean;

	@state()
	accessor #toc: NavItem[];

	@state()
	accessor #selectedPage: string;

	@state()
	accessor #nextPageVisibility: 'hidden' | 'visible';

	@state()
	accessor #previousPageVisibility: 'hidden' | 'visible';

	@query('#book')
	// @ts-expect-error
	accessor #renderArea: HTMLElement;

	constructor() {
		super();

		this.open = false;
		this.loaded = false;
		this.#toc = [];
		this.#selectedPage = '';
		this.#nextPageVisibility = 'hidden';
		this.#previousPageVisibility = 'hidden';

		this.#resetBook();

		// TODO: add gamepad navigation
	}

	#close() {
		this.open = false;

		void Router.navigate('/');
	}

	#keyboardNavigation(evt: KeyboardEvent) {
		if (!this.loaded) {
			return;
		}

		// Left Key
		if (evt.key === 'ArrowLeft') {
			void this.showPreviousPage();
		}

		// Right Key
		if (evt.key === 'ArrowRight') {
			void this.showNextPage();
		}
	}

	async #loadBook(id: string) {
		const file = await loadFile(id);

		if (!('JSZip' in window)) {
			await import('jszip');
		}

		if (!('ePub' in window)) {
			// @ts-expect-error - Loading the dist version of the module instead of the default one
			await import('epubjs/dist/epub.min.js');
		}

		// @ts-expect-error - ePub should be available in the window object
		const book = ePub(await file.arrayBuffer()) as Book;
		const { toc } = await book.loaded.navigation;

		this.#rendition = book.renderTo(this.#renderArea, { width: '100%', height: '100%', flow: 'scrolled-doc' });

		this.#rendition.themes.register('dark', darkTheme);
		this.#rendition.themes.select('dark');

		this.#toc = toc;

		this.#rendition.on('keyup', (evt: KeyboardEvent) => this.#keyboardNavigation(evt));
		document.addEventListener('keyup', (evt) => this.#keyboardNavigation(evt));

		this.#rendition.on('rendered', (section: Section) => {
			this.#selectedPage = section.href;
		});

		this.#rendition.on('relocated', (bookLocation: BookLocation) => {
			if (bookLocation.atEnd) {
				this.#nextPageVisibility = 'hidden';
			} else {
				this.#nextPageVisibility = 'visible';
			}

			if (bookLocation.atStart) {
				this.#previousPageVisibility = 'hidden';
			} else {
				this.#previousPageVisibility = 'visible';
			}
		});

		await this.#rendition.display();

		this.loaded = true;
	}

	#resetBook() {
		this.loaded = false;

		this.#toc = [];
		this.#selectedPage = '';
		this.#nextPageVisibility = 'hidden';
		this.#previousPageVisibility = 'hidden';

		this.#rendition?.destroy();
		this.#rendition = undefined;
	}

	async showNextPage() {
		await this.#rendition?.next();
	}

	async showPreviousPage() {
		await this.#rendition?.prev();
	}

	async navigate(destination: RouteLocation<'/epub/:id'>) {
		this.#resetBook();
		this.#renderArea.innerHTML = '';

		if (!destination.params.id) {
			return;
		}

		await this.#loadBook(destination.params.id);
		this.open = true;

		return 'Epub Reader';
	}

	override createRenderRoot() {
		return this;
	}

	override render() {
		return html`
			<sdr-dialog ?open=${this.open} @close=${() => this.#close()}>
				<sdr-button
					icon-button
					slot="title"
					class="title-menu"
					style="visibility: ${this.#previousPageVisibility}"
					@click="${async () => this.showPreviousPage()}"
				>⏮️</sdr-button>
				<sdr-select
					id="toc"
					slot="title"
					class="title-menu"
					.value="${this.#selectedPage}"
					@change="${async (evt: InputEvent) => this.#rendition?.display((evt.target as HTMLSelectElement).value)}"
				>
					${
			this.#toc.map((chapter) => {
				if (chapter.subitems) {
					return html`
								<optgroup label="${chapter.label}">
									${chapter.subitems.map((subChapter) => html`<option value="${subChapter.href}">${subChapter.label}</option>`)}
								</optgroup>
							`;
				}

				return html`<option value="${chapter.href}">${chapter.label}</option>`;
			})
		}
				</sdr-select>
				<sdr-button
					icon-button
					slot="title"
					class="title-menu"
					style="visibility: ${this.#nextPageVisibility}"
					@click="${async () => this.showNextPage()}"
				>⏭️</sdr-button>
				<article id="book">
				</article>
				<div id="load-overlay">
					<progress></progress>
				</div>
			</sdr-dialog>
		`;
	}
}

export { SdrViewEpubReader };
