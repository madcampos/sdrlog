class DropArea extends HTMLElement {
	static get observedAttributes() { return ['type', 'accepts', 'show']; }
	#root: ShadowRoot;
	#overlay: HTMLDivElement;
	#type: 'file' | 'directory';
	#accepts: FilePickerAcceptType;
	#file: FileSystemHandle | undefined;

	constructor() {
		super();
		this.#root = this.attachShadow({ mode: 'closed' });

		this.#root.innerHTML = `
			<div>
				<div>
					<slot></slot>
				</div>
				<div id="overlay" hidden>
					<slot name="overlay">
						Click to select a item
						<br>
						Or drag the item here...
					</slot>
				</div>
			</div>
		`;

		this.#overlay = this.#root.querySelector('#overlay') as HTMLDivElement;
		this.#type = 'file';
		this.#accepts = { description: 'JPEG Images', accept: { 'image/jpeg': ['.jpg', '.jpeg'] } };

		this.#overlay.addEventListener('click', async () => {
			let handle: FileSystemHandle;

			if (this.#type === 'file') {
				[handle] = await window.showOpenFilePicker({
					// @ts-expect-error
					id: this.id,
					startIn: 'downloads',
					excludeAcceptAllOption: false,
					types: [this.#accepts]
				});
			} else {
				handle = await window.showDirectoryPicker({
					id: this.id,
					startIn: 'downloads'
				});
			}

			this.#file = handle;
			this.dispatchEvent(new CustomEvent('handler', { bubbles: true, composed: true, cancelable: true }));
		});

		this.#overlay.addEventListener('drop', async (evt) => {
			evt.preventDefault();
			evt.stopPropagation();

			for await (const item of (evt.dataTransfer?.items ?? []) as DataTransferItem[]) {
				// Drag and drop treats both as files
				if (item.kind === 'file') {
					const entry = await item.getAsFileSystemHandle();
					const mimes = Object.keys(this.#accepts.accept);

					if (entry?.kind === this.#type && mimes.includes(item.type)) {
						this.#file = entry;
						this.dispatchEvent(new CustomEvent('handler', { bubbles: true, composed: true, cancelable: true }));
					}
				}
			}
		});

		this.#overlay.addEventListener('dragstart', (evt) => {
			this.#overlay.classList.add('hint');

			if (evt.dataTransfer) {
				evt.dataTransfer.effectAllowed = 'link';
			}
		});

		this.#overlay.addEventListener('dragend', (evt) => {
			this.#overlay.classList.remove('hint');

			if (evt.dataTransfer) {
				evt.dataTransfer.dropEffect = 'link';
			}
		});

		this.addEventListener('dragenter', () => {
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
		return typeof this.getAttribute('show') === 'string';
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
			if (name === 'type' && (newValue === 'file' || newValue === 'directory')) {
				this.#type = newValue;
			} else if (name === 'accepts') {
				this.#accepts = JSON.parse(newValue) as FilePickerAcceptType;
			} else if (name === 'show') {
				const show = this.getAttribute('show');

				if (show === null || show === 'false') {
					this.#overlay.hidden = true;
				} else {
					this.#overlay.hidden = false;
				}
			}
		}
	}

	connectedCallback() {
		const type = this.getAttribute('type');

		if (type === 'file' || type === 'directory') {
			this.#type = type;
		}

		const accepts = JSON.parse(this.getAttribute('accept') ?? '{ accepts: {} }') as FilePickerAcceptType;

		if (Object.keys(accepts.accept).length) {
			this.#accepts = accepts;
		}
	}
}

customElements.define('drop-area', DropArea);
