import type { CustomButton } from '../button/button';

import '../../../../lib/zip/jszip';

import { getFile } from '../data-operations/idb-persistence';
import { getFilePermission } from '../files-reader/files-reader';

interface Page {
	name: string,
	folder: string,
	url: string
}

type Pages = Record<string, Page[]>;

const renderArea = document.querySelector('#comic') as HTMLElement;
const nextButton = document.querySelector('#next') as CustomButton;
const prevButton = document.querySelector('#prev') as CustomButton;
const tocSelect = document.querySelector('#toc') as HTMLSelectElement;

const comparer = new Intl.Collator('en-US', { ignorePunctuation: true, numeric: true });
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

let currentVisibleImage: HTMLImageElement | undefined;

function updateVisibleImage([entry]: IntersectionObserverEntry[]) {
	currentVisibleImage = entry.target as HTMLImageElement;

	if (!currentVisibleImage.previousElementSibling) {
		prevButton.style.visibility = 'hidden';
	} else {
		prevButton.style.visibility = 'visible';
	}

	if (!currentVisibleImage.nextElementSibling) {
		nextButton.style.visibility = 'hidden';
	} else {
		nextButton.style.visibility = 'visible';
	}

	const currentValue = currentVisibleImage.dataset.folder;
	const newIndex = [...tocSelect.options].findIndex((option) => option.value === currentValue);

	tocSelect.selectedIndex = newIndex;
}

tocSelect.addEventListener('change', () => {
	document.querySelector(`[data-folder="${tocSelect.value}"]`)?.scrollIntoView();
});

prevButton.addEventListener('click', () => {
	currentVisibleImage?.previousElementSibling?.scrollIntoView();
});

nextButton.addEventListener('click', () => {
	currentVisibleImage?.nextElementSibling?.scrollIntoView();
});

document.addEventListener('keyup', (keyEvt) => {
	// Left Key
	if (keyEvt.key === 'ArrowLeft') {
		currentVisibleImage?.previousElementSibling?.scrollIntoView();
	}

	// Right Key
	if (keyEvt.key === 'ArrowRight') {
		currentVisibleImage?.nextElementSibling?.scrollIntoView();
	}
}, false);

window.addEventListener('wheel', (evt) => {
	if (!evt.shiftKey) {
		evt.preventDefault();

		renderArea.scrollBy({ left: evt.deltaY, behavior: 'smooth' });
	}
}, { capture: false, passive: false });

document.querySelector('#open-comic')?.addEventListener('click', async (evt) => {
	try {
		(evt.target as CustomButton).disabled = true;

		const url = new URL(window.location.toString());
		const params = new URLSearchParams(url.search);

		if (!params.has('file')) {
			throw new Error('Missing comic file.');
		}

		const filePath = params.get('file') as string;
		const handler = await getFile(filePath) as FileSystemFileHandle | undefined;

		if (!handler) {
			throw new Error('Comic does not exist.');
		}

		await getFilePermission(handler);

		const file = await handler.getFile();
		const zip = await JSZip.loadAsync(file);
		const pages: Pages = {};

		for await (const zipObject of Object.values(zip.files)) {
			if (!zipObject.dir) {
				const blob = await zipObject.async('blob');
				const [name, folder = DEFAULT_FOLDER_NAME] = zipObject.name.split('/').reverse();
				const testRegex = /(?<extension>\.[a-z0-9]{3,})$/u;
				const { extension } = testRegex.exec(name)?.groups ?? {};

				if (mimeTypes.has(extension)) {
					// eslint-disable-next-line max-depth
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

		const sortedFolders = Object.keys(pages).sort((folderA, folderB) => {
			if (folderB === DEFAULT_FOLDER_NAME) {
				return 1;
			}

			return comparer.compare(folderA, folderB);
		});

		for (const folder of sortedFolders) {
			const tocItem = document.createElement('option');

			tocItem.innerText = folder;
			tocItem.value = encodeURIComponent(folder);
			tocSelect.appendChild(tocItem);

			pages[folder] = pages[folder].sort(({ name: aName }, { name: bName }) => comparer.compare(aName, bName));

			for (const page of pages[folder]) {
				const img = document.createElement('img');
				const observer = new IntersectionObserver(updateVisibleImage, { threshold: 1 });

				img.dataset.folder = encodeURIComponent(page.folder);
				img.src = page.url;
				img.loading = 'lazy';
				img.decoding = 'async';
				img.addEventListener('load', () => {
					observer.observe(img);
				});

				renderArea.appendChild(img);
			}
		}

		// Force start at the begining
		tocSelect.selectedIndex = 0;
		document.querySelector('main > img:first-child')?.scrollIntoView();

		document.querySelector('#load-overlay')?.remove();
	} catch (err) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		(document.querySelector('main') as HTMLElement).innerText = err?.message ?? err ?? 'Error';
	}
});
