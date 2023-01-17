/* eslint-disable no-underscore-dangle */
import type { EmulatorInitializerFunction, EmulatorModule } from '../../../public/lib/webretro/webretro';
import type { SdrButton } from '../../components/button/button';

import nipplejs from 'nipplejs';

import { getEmulatorSaveFile, getFile, saveEmulatorSaveFile } from '../../js/data-operations/idb-persistence';
import { extractMetadataFromFileName, getFilePermission } from '../../js/files-reader/files-reader';
import { I18n } from '../../js/intl/translations';
import { loadBundle } from './assets-bundle';
import { loadBios } from './bios-bundle';
import config from './config';
import { Logger } from '../../js/util/logger';

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

const materialsFilter = new Map([
	['GENESIS', { emulator: 'genesis_plus_gx' }],
	['SEGA-CD', { emulator: 'genesis_plus_gx' }],
	['SNES', { emulator: 'snes9x' }]
]);

function mkdirTree(fileSystem: typeof FS | undefined, path: string) {
	if (fileSystem) {
		// @ts-expect-error
		fileSystem.createPath('/', path, true, true);
	}
}

export class Emulator extends HTMLElement {
	static get observedAttributes() { return ['file', 'paused', 'loaded']; }

	#filePath = '';
	#emulator: EmulatorModule | null = null;

	#root: ShadowRoot;
	#canvas: HTMLCanvasElement;
	#gameWrapper: HTMLElement;
	// eslint-disable-next-line no-unused-private-class-members
	#loadButton: SdrButton;
	#pauseButton: SdrButton;

	#selectButton: HTMLButtonElement;
	#startButton: HTMLButtonElement;
	#bumperLeft: HTMLButtonElement;
	#bumperRight: HTMLButtonElement;
	#aButton: HTMLButtonElement;
	#bButton: HTMLButtonElement;
	#xButton: HTMLButtonElement;
	#yButton: HTMLButtonElement;
	#dpad: HTMLDivElement;

	constructor() {
		super();

		const template = document.querySelector('#rom-emulator') as HTMLTemplateElement;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));
		this.#gameWrapper = this.#root.querySelector('#game-wrapper') as HTMLElement;
		this.#loadButton = this.#root.querySelector('#start-buttom') as SdrButton;
		this.#pauseButton = this.#root.querySelector('#pause-button') as SdrButton;

		this.#selectButton = this.#root.querySelector('#button-select') as HTMLButtonElement;
		this.#startButton = this.#root.querySelector('#button-start') as HTMLButtonElement;
		this.#bumperLeft = this.#root.querySelector('#bumper-left') as HTMLButtonElement;
		this.#bumperRight = this.#root.querySelector('#bumper-right') as HTMLButtonElement;
		this.#aButton = this.#root.querySelector('#button-a') as HTMLButtonElement;
		this.#bButton = this.#root.querySelector('#button-b') as HTMLButtonElement;
		this.#xButton = this.#root.querySelector('#button-x') as HTMLButtonElement;
		this.#yButton = this.#root.querySelector('#button-y') as HTMLButtonElement;
		this.#dpad = this.#root.querySelector('#dpad') as HTMLDivElement;

		this.#canvas = document.createElement('canvas');
		this.#canvas.id = 'canvas';
		this.appendChild(this.#canvas);

		this.#root.querySelector('#start-button')?.addEventListener('click', async () => this.#loadGame());

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

		// Add pause toggle
		this.#pauseButton.addEventListener('click', () => {
			this.#togglePause();
		});

		document.addEventListener('keydown', (evt) => {
			if (this.loaded && evt.key === 'Escape') {
				this.#togglePause();
			}
		});

		document.addEventListener('visibilitychange', () => {
			const isVisible = document.visibilityState === 'visible';
			const isHidden = document.visibilityState === 'hidden';

			if (this.loaded && isHidden && !this.paused) {
				this.#togglePause();
			}

			if (this.loaded && isVisible && this.paused) {
				this.#togglePause();
			}
		}, false);

		// Gamepad buttons
		this.#selectButton.addEventListener('pointerdown', () => this.#sendKeyEvent('keydown', 'select'));
		this.#selectButton.addEventListener('pointerup', () => this.#sendKeyEvent('keyup', 'select'));

		this.#startButton.addEventListener('pointerdown', () => this.#sendKeyEvent('keydown', 'start'));
		this.#startButton.addEventListener('pointerup', () => this.#sendKeyEvent('keyup', 'start'));

		this.#bumperLeft.addEventListener('pointerdown', () => this.#sendKeyEvent('keydown', 'leftBumber'));
		this.#bumperLeft.addEventListener('pointerup', () => this.#sendKeyEvent('keyup', 'leftBumber'));

		this.#bumperRight.addEventListener('pointerdown', () => this.#sendKeyEvent('keydown', 'rightBumper'));
		this.#bumperRight.addEventListener('pointerup', () => this.#sendKeyEvent('keyup', 'rightBumper'));

		this.#aButton.addEventListener('pointerdown', () => this.#sendKeyEvent('keydown', 'a'));
		this.#aButton.addEventListener('pointerup', () => this.#sendKeyEvent('keyup', 'a'));

		this.#bButton.addEventListener('pointerdown', () => this.#sendKeyEvent('keydown', 'b'));
		this.#bButton.addEventListener('pointerup', () => this.#sendKeyEvent('keyup', 'b'));

		this.#xButton.addEventListener('pointerdown', () => this.#sendKeyEvent('keydown', 'x'));
		this.#xButton.addEventListener('pointerup', () => this.#sendKeyEvent('keyup', 'x'));

		this.#yButton.addEventListener('pointerdown', () => this.#sendKeyEvent('keydown', 'y'));
		this.#yButton.addEventListener('pointerup', () => this.#sendKeyEvent('keyup', 'y'));
	}

	get paused() {
		return this.hasAttribute('paused');
	}

	set paused(newValue: boolean) {
		if (newValue) {
			this.setAttribute('paused', '');
			this.#emulator?.pauseMainLoop();
		} else {
			this.removeAttribute('paused');
			this.#emulator?.resumeMainLoop();
		}
	}

	get loaded() {
		return this.hasAttribute('loaded');
	}

	set loaded(newValue: boolean) {
		if (newValue) {
			this.setAttribute('loaded', '');
		} else {
			this.removeAttribute('loaded');
		}
	}

	get file() {
		return this.getAttribute('file') ?? '';
	}

	set file(newValue: string) {
		this.#resetEmulator(newValue);
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

	#adjustCanvasSize() {
		const { width, height } = this.#gameWrapper.getBoundingClientRect();

		this.#emulator?.setCanvasSize(width, height);
	}

	async #startGame(romFile: File) {
		this.#adjustCanvasSize();

		const romData = await romFile.arrayBuffer();

		this.#emulator?.FS.writeFile('/rom.bin', new Uint8Array(romData));

		const saveFile = await getEmulatorSaveFile(`save_${romFile.name}`);

		if (saveFile) {
			const saveData = await saveFile.arrayBuffer();

			mkdirTree(this.#emulator?.FS, '/home/web_user/retroarch/userdata/saves');
			this.#emulator?.FS.writeFile('/home/web_user/retroarch/userdata/saves/rom.srm', new Uint8Array(saveData));
		}

		const gameState = await getEmulatorSaveFile(`state_${romFile.name}`);

		if (gameState) {
			const stateData = await gameState.arrayBuffer();

			mkdirTree(this.#emulator?.FS, '/home/web_user/retroarch/userdata/states');
			this.#emulator?.FS.writeFile('/home/web_user/retroarch/userdata/states/rom.state', new Uint8Array(stateData));
		}

		mkdirTree(this.#emulator?.FS, '/home/web_user/retroarch/userdata');
		this.#emulator?.FS.writeFile('/home/web_user/retroarch/userdata/retroarch.cfg', config);

		this.#emulator?.callMain(this.#emulator.arguments);
		this.#adjustCanvasSize();
	}

	async #loadGameFile() {
		try {
			if (!this.#filePath) {
				throw new Error(I18n.t`Missing ROM file.`);
			}

			const handler = await getFile(this.#filePath) as FileSystemFileHandle | undefined;

			if (!handler) {
				throw new Error(I18n.t`ROM file does not exist.`);
			}

			await getFilePermission(handler);

			return await handler.getFile();
		} catch (err) {
			Logger.error('Failed to load game file.', err);
			this.#gameWrapper.innerText = err?.message ?? err ?? 'Error';
		}
	}

	async #loadEmulatorScript(romFile: File) {
		const { id } = extractMetadataFromFileName(romFile.name);
		const { emulator } = materialsFilter.get(id) ?? {};

		try {
			const { 'default': emulatorInit } = (await import(`${import.meta.env.APP_PUBLIC_URL}lib/webretro/${emulator ?? ''}_libretro.js`)) as { default: EmulatorInitializerFunction };

			this.#emulator = emulatorInit({
				canvas: this.#canvas,
				onRuntimeInitialized: async () => {
					mkdirTree(this.#emulator?.FS, '/home/web_user/retroarch/bundle');
					await loadBundle(this.#emulator?.FS);

					mkdirTree(this.#emulator?.FS, '/home/web_user/retroarch/userdata/system');
					await loadBios(this.#emulator?.FS);

					await this.#startGame(romFile);

					this.loaded = true;
				}
			});
		} catch {
			throw new Error(I18n.t`Unable to load emulator.`);
		}
	}

	async #loadGame() {
		const romFile = await this.#loadGameFile();

		if (romFile) {
			await this.#loadEmulatorScript(romFile);
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

	#togglePause() {
		this.paused = !this.paused;
	}

	#loadState() {
		this.#emulator?._cmd_load_state();
	}

	#saveState() {
		const WAIT_BEFORE_SAVE = 1000;

		this.#emulator?._cmd_savefiles();
		this.#emulator?._cmd_save_state();

		window.setTimeout(async () => {
			const memoryStats = this.#emulator?.FS.stat('/home/web_user/retroarch/userdata/saves/rom.srm') as { size: number };
			const saveStats = this.#emulator?.FS.stat('/home/web_user/retroarch/userdata/states/rom.state') as { size: number };

			if (memoryStats.size > 0 && saveStats.size > 0) {
				this.#emulator?.pauseMainLoop();

				const stateBuffer = this.#emulator?.FS.readFile('/home/web_user/retroarch/userdata/saves/rom.srm') ?? new Uint8Array();
				const stateFile = new File([stateBuffer], 'emulator_state');

				const saveBuffer = this.#emulator?.FS.readFile('/home/web_user/retroarch/userdata/saves/rom.state') ?? new Uint8Array();
				const saveFile = new File([saveBuffer], 'emulator_save');

				await saveEmulatorSaveFile('emulator_state', stateFile);
				await saveEmulatorSaveFile('emulator_save', saveFile);

				this.#emulator?.resumeMainLoop();
			}
		}, WAIT_BEFORE_SAVE);
	}

	#resetEmulator(newFilePath: string) {
		this.#emulator = null;
		this.#filePath = newFilePath;
		this.loaded = false;
		this.paused = false;
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (oldValue !== newValue) {
			if (name === 'file') {
				this.file = newValue;
			} else if (name === 'paused') {
				this.paused = this.hasAttribute('paused');
			} else if (name === 'loaded') {
				this.loaded = this.hasAttribute('loaded');
			}
		}
	}

	connectedCallback() {
		const DPAD_LOAD_TIMEOUT = 200;

		this.#resetEmulator(this.getAttribute('file') ?? '');

		setTimeout(() => {
			const { top, left, width, height } = this.#dpad.getBoundingClientRect();
			const dpad = nipplejs.create({
				zone: this.#dpad,
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
		}, DPAD_LOAD_TIMEOUT);
	}
}

customElements.define('rom-emulator', Emulator);
