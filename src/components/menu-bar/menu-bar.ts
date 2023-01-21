import type { Material } from '../../../public/data/data';

import { registerComponent, SdrComponent } from '../base/BaseComponent';

import { readFiles } from '../../js/files-reader/files-reader';
import { extractCoversFromFiles, importCoversFromFolder } from '../../js/covers/fetch-covers';
import { saveCoversToFolder, saveThumbsToFolder } from '../../js/covers/cover-exporter';
import { requestDataFileFromUser } from '../../js/data-operations/data-import';
import { exportDataFile } from '../../js/data-operations/data-export';
import { updateSearchFilter } from '../search-box/update-filter';
import { SdrItemDetails } from '../../views/item-details/item-details';
import { SdrInfoBox } from '../../views/info-box/info-box';
import { SdrLanguageBox } from '../../views/language-box/language-info';
import { SdrThemeBox } from '../../views/theme-box/theme-box';

import template from './template.html?raw';
import style from './style.css?raw';

export class SdrMenuBar extends SdrComponent {
	static readonly elementName = 'sdr-menu-bar';

	constructor() {
		super({
			name: SdrMenuBar.elementName,
			handlers: {
				openInfoModal: () => SdrInfoBox.openModal(),
				openLanguageModal: () => SdrLanguageBox.openModal(),
				openThemeModal: () => SdrThemeBox.openModal(),
				readFiles,
				requestDataFileFromUser,
				importCoversFromFolder,
				extractCoversFromFiles,
				exportDataFile,
				saveCoversToFolder,
				saveThumbsToFolder,
				updateSearchFilter: (evt) => {
					const target = evt.target as HTMLElement;
					const action = target.getAttribute('action') as Material['category'] | 'all';

					updateSearchFilter({ category: action });
				},
				openMaterialModal: async () => SdrItemDetails.openModal()
			},
			template,
			style
		});

		if (!('showOpenFilePicker' in window)) {
			this.setAttribute('no-file-system', '');
		}
	}
}

registerComponent(SdrMenuBar);
