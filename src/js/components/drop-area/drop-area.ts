import fileOpen from '../../../../lib/file-system/file-open';

export class DropArea extends HTMLElement {
	static get observedAttributes() { return ['multiple', 'accepts', 'show']; }
	#root: ShadowRoot;
	#overlay: HTMLDivElement;
	#multiple = false;
	#accepts: FilePickerAcceptType = {
		description: 'Image Files',
		accept: {
			'image/jpeg': ['.jpg', '.jpeg'],
			'image/png': ['.png'],
			'image/webp': ['.webp']
		}
	};
	#file: File | File[] | undefined;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<style>:host { display: none; }</style>
			<link rel="stylesheet" href="${import.meta.url.replace(/js$/iu, 'css')}"/>
			<div id="content">
				<slot></slot>
			</div>
			<div id="overlay" hidden>
				<slot name="overlay">
					Click to select a item
					<br>
					Or drag the item here...
				</slot>
			</div>
		`;

		this.#overlay = this.#root.querySelector('#overlay') as HTMLDivElement;

		this.#overlay.addEventListener('click', async () => {
			if ('showOpenFilePicker' in window) {
				// @ts-expect-error
				const [handle] = await window.showOpenFilePicker({
					id: this.id,
					startIn: 'downloads',
					multiple: this.#multiple,
					excludeAcceptAllOption: false,
					types: [this.#accepts]
				});

				this.#file = await handle.getFile();
			} else {
				this.#file = await fileOpen({
					mimeTypes: Object.keys(this.#accepts.accept),
					multiple: this.#multiple
				});
			}

			this.dispatchEvent(new CustomEvent('handler', { bubbles: true, composed: true, cancelable: true }));
		});

		this.#overlay.addEventListener('drop', async (evt) => {
			evt.preventDefault();
			evt.stopPropagation();

			if (!this.show) {
				return;
			}

			let files = Array.from(evt.dataTransfer?.files ?? []);

			if (!this.#multiple) {
				const [firstFile] = files;

				files = [firstFile];
			}

			for await (const file of files) {
				const fileType = file.type;
				const mimes = Object.keys(this.#accepts.accept);

				if (mimes.includes(fileType)) {
					this.#file = file;
					this.dispatchEvent(new CustomEvent('handler', { bubbles: true, composed: true, cancelable: true }));
				}

				this.#overlay.classList.remove('drop');
			}
		});

		this.addEventListener('dragover', (evt) => {
			evt.preventDefault();
			this.#overlay.classList.add('drop');
		});

		this.addEventListener('dragleave', () => {
			this.#overlay.classList.remove('drop');
		});
	}

	get file() {
		return this.#file;
	}
	get show() {
		return this.hasAttribute('show');
	}

	set show(isShowing: boolean) {
		if (isShowing) {
			this.setAttribute('show', '');
		} else {
			this.removeAttribute('show');
		}
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (newValue !== oldValue) {
			if (name === 'type') {
				this.#multiple = this.hasAttribute('multiple');
			} else if (name === 'accepts') {
				this.#accepts = JSON.parse(decodeURI(newValue)) as FilePickerAcceptType;
			} else if (name === 'show') {
				const isShowing = this.hasAttribute('show');

				if (!isShowing) {
					this.#overlay.hidden = true;
				} else {
					this.#overlay.hidden = false;
				}
			}
		}
	}

	connectedCallback() {
		const accepts = JSON.parse(decodeURI(this.getAttribute('accept') ?? encodeURI('{ "accept": {} }'))) as FilePickerAcceptType;

		if (Object.keys(accepts.accept).length) {
			this.#accepts = accepts;
		}

		this.#multiple = this.hasAttribute('multiple');
	}
}

customElements.define('drop-area', DropArea);
