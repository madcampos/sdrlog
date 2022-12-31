import type { SdrButton } from '../button/button';
import type { Location as BookLocation, NavItem } from 'epubjs';
import type { BookOptions } from 'epubjs/types/book';
import type Section from 'epubjs/types/section';
import type Book from 'epubjs/types/book';

import 'jszip';
import 'epubjs';

import { getFile } from '../../js/data-operations/idb-persistence';
import { getFilePermission } from '../../js/files-reader/files-reader';
import { I18n } from '../../js/intl/translations';

declare function ePub(urlOrData: string | ArrayBuffer, options?: BookOptions): Book;

const renderArea = document.querySelector('#book') as HTMLElement;
const nextButton = document.querySelector('#next') as SdrButton;
const prevButton = document.querySelector('#prev') as SdrButton;
const tocSelect = document.querySelector('#toc') as HTMLSelectElement;

document.querySelector('#open-book')?.addEventListener('click', async (evt) => {
	try {
		(evt.target as SdrButton).disabled = true;

		const url = new URL(window.location.toString());
		const params = new URLSearchParams(url.search);

		if (!params.has('file')) {
			throw new Error(I18n.t`Missing book file.`);
		}

		const filePath = params.get('file') as string;
		const handler = await getFile(filePath) as FileSystemFileHandle | undefined;

		if (!handler) {
			throw new Error(I18n.t`Book does not exist.`);
		}

		await getFilePermission(handler);

		const file = await handler.getFile();

		const book = ePub(await file.arrayBuffer());
		const { toc } = await book.loaded.navigation;
		const rendition = book.renderTo(renderArea, { width: '100%', height: '100%', flow: 'scrolled-doc' });

		rendition.themes.register('dark', './css/components/epub/theme.css');
		rendition.themes.select('dark');
		const appendOptions = (chapter: NavItem) => {
			const option = document.createElement('option');

			option.textContent = chapter.label;
			option.value = decodeURI(chapter.href);

			tocSelect.appendChild(option);

			chapter.subitems?.forEach(appendOptions);
		};

		toc.forEach(appendOptions);

		tocSelect.addEventListener('change', async () => {
			const chapterHref = tocSelect.value;

			await rendition.display(chapterHref);
		});

		prevButton.addEventListener('click', async () => {
			await rendition.prev();
		});

		nextButton.addEventListener('click', async () => {
			await rendition.next();
		});

		rendition.on('keyup', async (keyEvt: KeyboardEvent) => {
			// Left Key
			if (keyEvt.key === 'ArrowLeft') {
				await rendition.prev();
			}

			// Right Key
			if (keyEvt.key === 'ArrowRight') {
				await rendition.next();
			}
		});

		document.addEventListener('keyup', async (keyEvt) => {
			// Left Key
			if (keyEvt.key === 'ArrowLeft') {
				await rendition.prev();
			}

			// Right Key
			if (keyEvt.key === 'ArrowRight') {
				await rendition.next();
			}
		}, false);

		rendition.on('rendered', (section: Section) => {
			const newIndex = [...tocSelect.options].findIndex((option) => option.value === section.href);

			tocSelect.selectedIndex = newIndex;
		});

		rendition.on('relocated', (bookLocation: BookLocation) => {
			if (bookLocation.atEnd) {
				nextButton.style.visibility = 'hidden';
			} else {
				nextButton.style.visibility = 'visible';
			}

			if (bookLocation.atStart) {
				prevButton.style.visibility = 'hidden';
			} else {
				prevButton.style.visibility = 'visible';
			}
		});

		await rendition.display();
		document.querySelector('#load-overlay')?.remove();
	} catch (err) {
		(document.querySelector('main') as HTMLElement).innerText = err?.message ?? err ?? 'Error';
	}
});
