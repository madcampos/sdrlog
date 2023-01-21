import { I18n } from '../../js/intl/translations';
import { registerComponent, SdrComponent } from '../SdrComponent';

import template from './template.html?raw' assert { type: 'html' };
import style from './style.css?inline' assert { type: 'css' };

const watchedAttributes = ['disabled'];

export interface SdrDropArea {
	disabled: boolean
}

export class SdrDropArea extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }
	static readonly elementName = 'sdr-drop-area';
	#overlay: HTMLDivElement;
	#accepts: FilePickerAcceptType = {
		description: I18n.t`Image Files`,
		accept: {
			'image/jpeg': ['.jpg', '.jpeg'],
			'image/png': ['.png'],
			'image/webp': ['.webp']
		}
	};
	#file: File | undefined;

	constructor() {
		super({
			name: SdrDropArea.elementName,
			watchedAttributes,
			props: [{ name: 'disabled', value: false, attributeName: 'disabled' }],
			handlers: {
				clickToPickFile: async () => {
					const [handle] = await window.showOpenFilePicker({
						id: this.id,
						startIn: 'downloads',
						excludeAcceptAllOption: false,
						types: [this.#accepts]
					});

					this.#file = await handle.getFile();

					this.dispatchEvent(new CustomEvent('drop', { bubbles: true, composed: true, cancelable: true }));
				},
				dropFile: (evt) => {
					evt.preventDefault();
					evt.stopPropagation();

					if (this.disabled) {
						return;
					}

					const [file] = Array.from((evt as DragEvent).dataTransfer?.files ?? []);
					const fileType = file.type;
					const mimes = Object.keys(this.#accepts.accept);

					if (mimes.includes(fileType)) {
						this.#file = file;
						this.dispatchEvent(new CustomEvent('drop', { bubbles: true, composed: true, cancelable: true }));
					}

					this.#overlay.classList.remove('drop');
				}
			},
			template,
			style
		});

		this.#overlay = this.root.querySelector('#overlay') as HTMLDivElement;

		this.addEventListener('dragover', (evt) => {
			evt.preventDefault();
			this.#overlay.classList.add('drop');
		});

		this.addEventListener('dragleave', () => {
			this.#overlay.classList.remove('drop');
		});

		document.addEventListener('paste', (evt) => {
			if (this.disabled) {
				return;
			}

			const clipboardData = evt.clipboardData as DataTransfer;
			const { files } = clipboardData;
			const mimes = Object.keys(this.#accepts.accept);
			const file = [...files].find((potentialFile) => mimes.includes(potentialFile.type));

			if (file) {
				this.#file = file;
				this.dispatchEvent(new CustomEvent('drop', { bubbles: true, composed: true, cancelable: true }));
			}
		});
	}

	get file() {
		return this.#file;
	}
}

registerComponent(SdrDropArea);
