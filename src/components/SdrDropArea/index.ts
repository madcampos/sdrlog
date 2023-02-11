import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import { I18n } from '../../js/intl/translations';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-drop-area')
export class SdrDropArea extends LitElement {
	static readonly elementName = 'sdr-drop-area';

	static styles = unsafeCSS(style);

	@property({ type: Boolean, reflect: true }) declare disabled: boolean;

	@query('#overlay') declare private overlay: HTMLDivElement;

	#accepts: FilePickerAcceptType = {
		description: I18n.t`Image Files`,
		accept: {
			'image/jpeg': ['.jpg', '.jpeg'],
			'image/png': ['.png'],
			'image/webp': ['.webp']
		}
	};
	#file: File | undefined;

	async #clickToPickFile() {
		const [handle] = await window.showOpenFilePicker({
			id: this.id,
			startIn: 'downloads',
			excludeAcceptAllOption: false,
			types: [this.#accepts]
		});

		this.#file = await handle.getFile();

		this.dispatchEvent(new CustomEvent('drop', { bubbles: true, composed: true, cancelable: true }));
	}

	#dropFile(evt: DragEvent) {
		evt.preventDefault();
		evt.stopPropagation();

		if (this.disabled) {
			return;
		}

		const [file] = Array.from(evt.dataTransfer?.files ?? []);
		const fileType = file.type;
		const mimes = Object.keys(this.#accepts.accept);

		if (mimes.includes(fileType)) {
			this.#file = file;

			this.dispatchEvent(new CustomEvent('drop', { bubbles: true, composed: true, cancelable: true }));
		}

		this.overlay.classList.remove('drop');
	}

	get file() {
		return this.#file;
	}

	connectedCallback() {
		super.connectedCallback();

		this.addEventListener('dragover', (evt) => {
			evt.preventDefault();
			this.overlay.classList.add('drop');
		});

		this.addEventListener('dragleave', () => {
			this.overlay.classList.remove('drop');
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

	render() {
		return html`
			<div id="content">
				<slot></slot>
			</div>
			<div
				id="overlay"
				@click=${async () => this.#clickToPickFile()}
				@drop=${(evt: DragEvent) => this.#dropFile(evt)}
			>
				<slot name="overlay">
					${I18n.t`Click to select a item`}
					<br>
					${I18n.t`Or drag the item here...`}
				</slot>
			</div>
		`;
	}
}
