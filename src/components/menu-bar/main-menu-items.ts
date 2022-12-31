import type { Material } from '../../../public/data/data';

import { readFiles } from '../../js/files-reader/files-reader';
import { extractCoversFromFiles, importCoversFromFolder } from '../../js/covers/fetch-covers';
import { saveCoversToFolder, saveThumbsToFolder } from '../../js/covers/cover-exporter';
import { requestDataFileFromUser } from '../../js/data-operations/data-import';
import { exportDataFile } from '../../js/data-operations/data-export';
import { updateSearchFilter } from '../search-box/update-filter';
import { ItemDetails } from '../item-info/item-details';
import { openInfoModal } from '../info-box/info-box';
import { openLanguageModal } from '../../js/intl/language-info';
import { openThemeModal } from '../theme-box/theme-box';

if (!('showDirectoryPicker' in window)) {
	(document.querySelector('menu-bar #import-materials') as HTMLElement).remove();
	(document.querySelector('menu-bar #extract-covers') as HTMLElement).remove();
	(document.querySelector('menu-bar #export-covers') as HTMLElement).remove();
}

document.querySelector('menu-bar #tool-info')?.addEventListener('click', () => openInfoModal());
document.querySelector('menu-bar #lang-settings')?.addEventListener('click', () => openLanguageModal());
document.querySelector('menu-bar #theme-settings')?.addEventListener('click', () => openThemeModal());

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
