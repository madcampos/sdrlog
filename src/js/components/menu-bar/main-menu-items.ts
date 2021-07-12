import type { Material } from '../../../../data/data';
import type { ModalDialog } from '../dialog/dialog';
import type { CustomButton } from '../button/button';

import { readFiles } from '../files-reader/files-reader';
import { extractCoversFromFiles, importCoversFromFolder } from '../covers/fetch-covers';
import { saveCoversToFolder, saveThumbsToFolder } from '../covers/cover-exporter';
import { requestDataFileFromUser } from '../data-operations/data-import';
import { exportDataFile } from '../data-operations/data-export';
import { updateSearchFilter } from '../search-box/update-filter';
import { ItemDetails } from '../item-info/item-details';

const infobox = document.querySelector('menu-bar modal-dialog') as ModalDialog;
const infoboxTrigger = document.querySelector('menu-bar modal-dialog > custom-button') as CustomButton;

infoboxTrigger.addEventListener('click', () => {
	window.history.pushState(null, window.document.title, `${import.meta.env.PUBLIC_URL}?info`);
});

window.addEventListener('keyup', (evt) => {
	if (evt.ctrlKey && evt.key === 'i') {
		evt.preventDefault();

		infobox.toggle();

		if (infobox.isDialogOpen) {
			window.history.pushState(null, window.document.title, `${import.meta.env.PUBLIC_URL}?info`);
		} else {
			window.history.pushState(null, window.document.title, `${import.meta.env.PUBLIC_URL}`);
		}
	}
}, { capture: false });

if (!('showDirectoryPicker' in window)) {
	(document.querySelector('menu-bar #import-materials') as HTMLElement).remove();
	(document.querySelector('menu-bar #extract-covers') as HTMLElement).remove();
	(document.querySelector('menu-bar #export-covers') as HTMLElement).remove();
}

document.querySelector('menu-bar #import-materials')?.addEventListener('click', async () => readFiles());
document.querySelector('menu-bar #import-data')?.addEventListener('click', async () => requestDataFileFromUser());

document.querySelector('menu-bar #import-covers')?.addEventListener('click', async () => importCoversFromFolder());
document.querySelector('menu-bar #extract-covers')?.addEventListener('click', async () => extractCoversFromFiles());

document.querySelector('menu-bar #export-data')?.addEventListener('click', async () => exportDataFile());
document.querySelector('menu-bar #export-covers')?.addEventListener('click', async () => saveCoversToFolder());
document.querySelector('menu-bar #export-thumbs')?.addEventListener('click', async () => saveThumbsToFolder());

document.querySelectorAll('#filters dropdown-menu-item').forEach((filterButton) => {
	filterButton.addEventListener('click', () => {
		const action = filterButton.getAttribute('action') as Material['category'] | 'all';

		updateSearchFilter({ category: action });
	});
});

document.querySelector('menu-bar #add-material')?.addEventListener('click', async () => ItemDetails.openMaterialModal());
