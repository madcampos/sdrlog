import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import { I18n } from '../../js/intl/translations';

import style from './style.css?inline' assert { type: 'css' };

declare global {
	interface GlobalEventHandlersEventMap {
		dropfile: CustomEvent<{ file: File }>
	}
}

@customElement('sdr-drop-area')
export class SdrDropArea extends LitElement {
	static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static styles = unsafeCSS(style);

	@property({ type: Boolean, reflect: true }) declare disabled: boolean;

	@query('#overlay') private declare overlay: HTMLDivElement;

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

		this.dispatchEvent(new CustomEvent('dropfile', { bubbles: true, composed: true, cancelable: true, detail: { file: this.#file } }));
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

			this.dispatchEvent(new CustomEvent('dropfile', { bubbles: true, composed: true, cancelable: true, detail: { file: this.#file } }));
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
				this.dispatchEvent(new CustomEvent('dropfile', { bubbles: true, composed: true, cancelable: true, detail: { file: this.#file } }));
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

				tabindex="0"
				autofocus

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
