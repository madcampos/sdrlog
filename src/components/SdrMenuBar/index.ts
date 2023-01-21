import type { Material } from '../../data/data';

import { registerComponent, SdrComponent } from '../SdrComponent';

import { readFiles } from '../../js/files-reader/files-reader';
import { extractCoversFromFiles, importCoversFromFolder } from '../../js/covers/fetch-covers';
import { saveCoversToFolder, saveThumbsToFolder } from '../../js/covers/cover-exporter';
import { requestDataFileFromUser } from '../../js/data-operations/data-import';
import { exportDataFile } from '../../js/data-operations/data-export';
import { updateSearchFilter } from '../SdrSearchBox/update-filter';
import { SdrItemDetails } from '../../views/SdrItemDetails';
import { SdrInfoBox } from '../../views/SdrInfoBox';
import { SdrLanguageBox } from '../../views/SdrLanguageBox';
import { SdrThemeBox } from '../../views/SdrThemeBox';

import template from './template.html?raw' assert { type: 'html' };
import style from './style.css?inline' assert { type: 'css' };

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
