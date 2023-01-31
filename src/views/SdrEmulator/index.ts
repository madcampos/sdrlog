/* eslint-disable @typescript-eslint/naming-convention, no-underscore-dangle */

import { getAllIDBEntries, getIDBItem, setIDBItem } from '../../js/data/idb-persistence';
import { extractMetadataFromFileName, getFilePermission } from '../../js/files/file-import';
import { I18n } from '../../js/intl/translations';
import { registerComponent, SdrComponent } from '../../components/SdrComponent';

import template from './template.html?raw' assert { type: 'html' };
import style from './style.css?inline' assert { type: 'css' };

interface EmulatorModule extends EmscriptenModule {
	canvas: HTMLCanvasElement,
	_cmd_savefiles(): void,
	_cmd_save_state(): void,
	_cmd_load_state(): void,
	_cmd_toggle_menu(): void,
	_cmd_undo_save_state(): void,
	_cmd_undo_load_state(): void,
	setCanvasSize(width: number, height: number): void,
	pauseMainLoop(): void,
	resumeMainLoop(): void,
	callMain(args: string[]): void,
	FS: typeof FS
}

interface EmulatorInitializer {
	canvas: HTMLCanvasElement,
	onRuntimeInitialized(): Promise<void> | void
}

type EmulatorInitializerFunction = (moduleInitializer: EmulatorInitializer) => EmulatorModule;

interface KeyData {
	key: string,
	code: string,
	keyCode: number
}

const keyMap: Record<string, KeyData> = {
	select: { key: 'Enter', code: 'Enter', keyCode: 13 },
	start: { key: ' ', code: 'Space', keyCode: 32 },
	leftBumber: { key: 'E', code: 'KeyE', keyCode: 69 },
	rightBumber: { key: 'P', code: 'KeyP', keyCode: 32 },
	up: { key: 'ArrowUp', code: 'ArrowUp', keyCode: 38 },
	down: { key: 'ArrowDown', code: 'ArrowDown', keyCode: 40 },
	left: { key: 'ArrowLeft', code: 'ArrowLeft', keyCode: 37 },
	right: { key: 'ArrowRight', code: 'ArrowRight', keyCode: 39 },
	a: { key: 'H', code: 'KeyH', keyCode: 72 },
	b: { key: 'G', code: 'KeyG', keyCode: 71 },
	x: { key: 'Y', code: 'KeyY', keyCode: 89 },
	y: { key: 'T', code: 'KeyT', keyCode: 84 }
};

const watchedAttributes = ['file', 'paused', 'loaded'];

export interface SdrEmulator {
	file: string,
	paused: boolean,
	loaded: boolean
}

export class SdrEmulator extends SdrComponent {
	static get observedAttributes() { return watchedAttributes; }
	static readonly elementName = 'sdr-emulator';

	#emulator: EmulatorModule | null = null;
	#canvas: HTMLCanvasElement;
	constructor() {
		super({
			name: SdrEmulator.elementName,
			watchedAttributes,
			props: [
				{
					name: 'file',
					value: (newValue = '') => {
						this.loaded = false;
						this.#resetEmulator();

						return newValue;
					},
					attributeName: 'file'
				},
				{
					name: 'paused',
					value: (newValue = false) => {
						const parsedValue = newValue === '' || newValue === true;

						if (parsedValue) {
							this.#emulator?.pauseMainLoop();
						} else {
							this.#emulator?.resumeMainLoop();
						}

						return parsedValue;
					},
					attributeName: 'paused'
				},
				{ name: 'loaded', value: false, attributeName: 'loaded' }
			],
			handlers: {
				buttonDown: (evt) => this.#sendKeyEvent('keydown', (evt.target as HTMLButtonElement).dataset.key as string),
				buttonUp: (evt) => this.#sendKeyEvent('keyup', (evt.target as HTMLButtonElement).dataset.key as string),
				pause: () => { this.paused = true; },
				loadGame: async () => this.#loadGame()
			},
			template,
			style
		});

		this.#canvas = document.createElement('canvas');
		this.#canvas.id = 'canvas';
		this.appendChild(this.#canvas);

		// Avoid unwanted key presses to exit the game.
		document.addEventListener('keydown', (evt) => {
			const pdKeys = ['8', '9', '13', '19', '27', '32', '33', '34', '35', '36', '42', '44', '45', '91', '92', '93', '112', '113', '114', '115', '116', '117', '118', '119', '120', '121', '122', '123', '124', '125', '126', '127', '128', '129', '130', '131', '132', '133', '134', '135'];

			if (this.loaded && pdKeys.includes(evt.code)) {
				evt.preventDefault();
			}
		}, { capture: false, passive: true });

		// Save game on F2.
		document.addEventListener('keydown', (evt) => {
			if (this.loaded && evt.key === 'F2') {
				this.#saveState();
			}
		}, { capture: false, passive: true });

		// Load state on F3.
		document.addEventListener('keydown', (evt) => {
			if (this.loaded && evt.key === 'F3') {
				this.#loadState();
			}
		}, { capture: false, passive: true });

		// Toggle retroarch menu on F4.
		document.addEventListener('keydown', (evt) => {
			if (this.loaded && evt.key === 'F4') {
				this.#emulator?._cmd_toggle_menu();
			}
		}, { capture: false, passive: true });

		// Toggle pause on escape.
		document.addEventListener('keydown', (evt) => {
			if (this.loaded && evt.key === 'Escape') {
				this.paused = !this.paused;
			}
		});

		// Pause on tab change.
		document.addEventListener('visibilitychange', () => {
			const isVisible = document.visibilityState === 'visible';
			const isHidden = document.visibilityState === 'hidden';

			if (this.loaded && isHidden && !this.paused) {
				this.paused = true;
			}

			if (this.loaded && isVisible && this.paused) {
				this.paused = false;
			}
		}, false);
	}

	#sendKeyEvent(type: 'keydown' | 'keyup', key: keyof typeof keyMap) {
		this.#canvas.dispatchEvent(new KeyboardEvent(type, {
			bubbles: true,
			cancelable: false,
			shiftKey: false,
			ctrlKey: false,
			metaKey: false,
			altKey: false,
			...keyMap[key]
		}));
	}

	async #addDPadButtons() {
		const nipplejs = await import('nipplejs');
		const dpadElement = this.root.querySelector('#dpad') as HTMLDivElement;
		const { top, left, width, height } = dpadElement.getBoundingClientRect();

		const dpad = nipplejs.create({
			zone: dpadElement,
			color: 'white',
			multitouch: false,
			// eslint-disable-next-line @typescript-eslint/no-magic-numbers
			position: { top: `${top + (height / 2)}px`, left: `${left + (width / 2)}px` },
			mode: 'static',
			restJoystick: true,
			shape: 'circle',
			follow: false,
			dynamicPage: true
		});

		let dpadDirection: string | null = null;

		dpad.on('move', (_, { direction }) => {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			dpadDirection = direction?.angle ?? null;

			if (dpadDirection) {
				this.#sendKeyEvent('keydown', dpadDirection);
			}
		});

		dpad.on('end', () => {
			if (dpadDirection) {
				this.#sendKeyEvent('keyup', dpadDirection);
			}
		});
	}

	#adjustCanvasSize() {
		const { width, height } = this.root.querySelector('#game-wrapper')?.getBoundingClientRect() ?? { width: 0, height: 0 };

		this.#emulator?.setCanvasSize(width, height);
	}

	#mkdirTree(path: string) {
		// @ts-expect-error - FS is not defined in the type definitions.
		this.#emulator?.FS.createPath('/', path, true, true);
	}

	async #loadEmulatorFiles() {
		const folderPath = '/home/web_user/retroarch/';

		const mimeTypes = new Map([
			['png', 'image/png'],
			['ttf', 'font/ttf'],
			['cfg', 'text/plain']
		]);

		let files = await getAllIDBEntries('emulator');

		if (files.length === 0) {
			const response = await fetch(`${import.meta.env.APP_PUBLIC_URL}lib/webretro/bundle.zip`);
			const fileBlob = await response.blob();
			const zipFile = new File([fileBlob], 'bundle.zip', { type: 'application/zip' });

			if (!('JSZip' in window)) {
				await import('jszip');
			}

			const zip = await JSZip.loadAsync(zipFile);

			for await (const zipObject of Object.values(zip.files)) {
				if (!zipObject.dir) {
					const blob = await zipObject.async('blob');
					const name = zipObject.name.split('/').pop() ?? '';
					const [extension] = name.split('.').reverse();

					const file = new File([blob], name, { type: mimeTypes.get(extension) ?? 'application/octet-stream' });

					await setIDBItem('emulator', zipObject.name, file);
				} else {
					const file = new File([zipObject.name], zipObject.name, { type: 'application/x+directory' });

					await setIDBItem('emulator', zipObject.name, file);
				}
			}

			files = await getAllIDBEntries('emulator');
		}

		this.#mkdirTree(folderPath);

		for await (const [path, file] of files) {
			const buffer = await file.arrayBuffer();

			if (file.type === 'application/x+directory') {
				this.#mkdirTree(`${folderPath}${file.name}`);
			} else {
				this.#emulator?.FS.writeFile(`${folderPath}${path}`, new Uint8Array(buffer));
			}
		}
	}

	async #loadFile() {
		if (!this.file) {
			throw new Error(I18n.t`Missing ROM file.`);
		}

		const handler = await getIDBItem('files', this.file);

		if (!handler || handler.kind !== 'file') {
			throw new Error(I18n.t`ROM does not exist.`);
		}

		await getFilePermission(handler);

		return handler.getFile();
	}

	async #loadGame() {
		try {
			const materialsFilter = new Map([
				['GENESIS', 'genesis_plus_gx'],
				['SEGA-CD', 'genesis_plus_gx'],
				['SNES', 'snes9x']
			]);

			const romFile = await this.#loadFile();

			const { id } = extractMetadataFromFileName(romFile.name);

			const emulator = materialsFilter.get(id) ?? '';

			const emulatorImport = await import(/* @vite-ignore */ `${import.meta.env.APP_PUBLIC_URL}lib/webretro/${emulator}_libretro.js`);
			const emulatorInit = emulatorImport.default as EmulatorInitializerFunction;

			this.#emulator = emulatorInit({
				canvas: this.#canvas,
				onRuntimeInitialized: async () => {
					this.#adjustCanvasSize();

					await this.#loadEmulatorFiles();

					const romData = await romFile.arrayBuffer();

					this.#emulator?.FS.writeFile('/rom.bin', new Uint8Array(romData));

					this.#emulator?.callMain(this.#emulator.arguments);
					this.#adjustCanvasSize();

					this.loaded = true;
				}
			});
		} catch (err) {
			(this.root.querySelector('#game-wrapper') as HTMLElement).innerText = err?.message ?? err ?? 'Error';
		}
	}

	// eslint-disable-next-line no-unused-private-class-members
	async #toggleFullScreen() {
		if (document.fullscreenElement) {
			await document.exitFullscreen();
		} else {
			await this.requestFullscreen({ navigationUI: 'hide' });
		}
	}

	#loadState() {
		this.#emulator?._cmd_load_state();
	}

	#saveState() {
		const WAIT_BEFORE_SAVE = 1000;

		this.#emulator?._cmd_savefiles();
		this.#emulator?._cmd_save_state();

		window.setTimeout(async () => {
			const statePath = '/home/web_user/retroarch/userdata/saves/rom.srm';
			const savePath = '/home/web_user/retroarch/userdata/states/rom.state';

			const memoryStats = this.#emulator?.FS.stat(statePath) ?? { size: 0 };
			const saveStats = this.#emulator?.FS.stat(savePath) ?? { size: 0 };

			if (memoryStats.size > 0 && saveStats.size > 0) {
				this.#emulator?.pauseMainLoop();

				const stateBuffer = this.#emulator?.FS.readFile(statePath) ?? new Uint8Array();
				const stateFile = new File([stateBuffer], statePath);

				const saveBuffer = this.#emulator?.FS.readFile(savePath) ?? new Uint8Array();
				const saveFile = new File([saveBuffer], savePath);

				await setIDBItem('emulator', statePath, stateFile);
				await setIDBItem('emulator', savePath, saveFile);

				this.#emulator?.resumeMainLoop();
			}
		}, WAIT_BEFORE_SAVE);
	}

	#resetEmulator() {
		this.#emulator = null;
		this.loaded = false;
	}

	connectedCallback() {
		super.connectedCallback();

		void this.#addDPadButtons();
	}

	static updateFromURL() {
		const url = new URL(window.location.toString());
		const params = new URLSearchParams(url.search);

		if (params.has('file')) {
			let emulatorElement = document.querySelector<SdrEmulator>(SdrEmulator.elementName);

			if (!emulatorElement) {
				emulatorElement = document.createElement(SdrEmulator.elementName) as SdrEmulator;

				document.body.appendChild(emulatorElement);
			}

			emulatorElement.file = params.get('file') as string;
		}
	}
}

registerComponent(SdrEmulator);
