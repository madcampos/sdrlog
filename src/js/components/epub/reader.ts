import '../../../../lib/zip/jszip';
import '../../../../lib/epub/epub';

import type { BookOptions } from '../../../../lib/epub/types/book';
import type Book from '../../../../lib/epub/types/book';

declare function ePub(urlOrData: string | ArrayBuffer, options?: BookOptions): Book;

const renderArea = document.querySelector('#book') as HTMLElement;
const nextButton = document.querySelector('#next') as HTMLButtonElement;
const prevButton = document.querySelector('#prev') as HTMLButtonElement;
const tocSelect = document.querySelector('#toc') as HTMLSelectElement;

document.querySelector('input')?.addEventListener('change', async (evt) => {
	const input = evt.target as HTMLInputElement;
	const [file] = Array.from(input.files ?? []);

	const book = ePub(await file.arrayBuffer());
	const { toc } = await book.loaded.navigation;
	const rendition = book.renderTo(renderArea);

	rendition.themes.register('dark', './css/components/reader/theme.css');
	rendition.themes.select('dark');

	toc.forEach((chapter) => {
		const option = document.createElement('option');

		option.textContent = chapter.label;
		option.value = chapter.href;

		tocSelect.appendChild(option);
	});

	tocSelect.addEventListener('change', async () => {
		const url = tocSelect.value;

		await rendition.display(url);
	});

	prevButton.addEventListener('click', async () => rendition.prev());
	nextButton.addEventListener('click', async () => rendition.next());

	await rendition.display();
});
