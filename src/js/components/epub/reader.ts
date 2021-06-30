import '../../../../lib/zip/jszip';
import '../../../../lib/epub/epub';

import type { BookOptions } from '../../../../lib/epub/types/book';
import type Book from '../../../../lib/epub/types/book';
import type { NavItem } from '../../../../lib/epub/types/navigation';
import { getFile } from '../data-operations/idb-persistence';
import { getFilePermission } from '../files-reader/files-reader';

declare function ePub(urlOrData: string | ArrayBuffer, options?: BookOptions): Book;

const renderArea = document.querySelector('#book') as HTMLElement;
const nextButton = document.querySelector('#next') as HTMLButtonElement;
const prevButton = document.querySelector('#prev') as HTMLButtonElement;
const tocSelect = document.querySelector('#toc') as HTMLSelectElement;

document.querySelector('#open-book')?.addEventListener('click', async (evt) => {
	try {
		(evt.target as HTMLButtonElement).disabled = true;

		const url = new URL(window.location.toString());
		const params = new URLSearchParams(url.search);

		if (!params.has('file')) {
			throw new Error('Missing book file.');
		}

		const filePath = params.get('file') as string;
		const handler = await getFile(filePath) as FileSystemFileHandle | undefined;

		if (!handler) {
			throw new Error('Book does not exist.');
		}

		await getFilePermission(handler);

		const file = await handler.getFile();

		const book = ePub(await file.arrayBuffer());
		const { toc } = await book.loaded.navigation;
		const rendition = book.renderTo(renderArea, { width: '100%', height: '100%', flow: 'scrolled-doc' });

		rendition.themes.register('dark', './css/components/reader/theme.css');
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
			tocSelect.value = rendition.location.start.href;
		});
		nextButton.addEventListener('click', async () => {
			await rendition.next();
			tocSelect.value = rendition.location.start.href;
		});

		await rendition.display();
		document.querySelector('#load-overlay')?.remove();
	} catch (err) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		(document.querySelector('main') as HTMLElement).innerText = err?.message ?? err ?? 'Error';
	}
});
