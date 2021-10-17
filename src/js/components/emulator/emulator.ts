/* eslint-disable no-underscore-dangle */

import type { EmulatorInitializerFunction, EmulatorModule } from '../../../../lib/webretro/webretro';

import { getEmulatorSaveFile, getFile, saveEmulatorSaveFile } from '../data-operations/idb-persistence';
import { extractMetadataFromFileName, getFilePermission } from '../files-reader/files-reader';
import { I18n } from '../intl/translations';
import { loadBundle } from './assets-bundle';
import { loadBios } from './bios-bundle';
import config from './config';

import './touch-input';

const materialsFilter = new Map([
	['GENESIS', { emulator: 'genesis_plus_gx' }],
	['SEGA-CD', { emulator: 'genesis_plus_gx' }],
	['SNES', { emulator: 'snes9x' }]
]);

function mkdirTree(path: string) {
	// @ts-expect-error
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	FS.createPath('/', path, true, true);
}

export class Emulator extends HTMLElement {
	static get observedAttributes() { return ['file', 'paused', 'loaded']; }

	#filePath = '';
	#emulator: EmulatorModule | null = null;

	#root: ShadowRoot;
	#canvas: HTMLCanvasElement;
	#gameWrapper: HTMLElement;
	#loadOverlay: HTMLDivElement;
	#pauseButton: HTMLButtonElement;

	constructor() {
		super();

		const template = document.querySelector('#rom-emulator') as HTMLTemplateElement;

		this.#root = this.attachShadow({ mode: 'closed' });
		this.#root.appendChild(template.content.cloneNode(true));

		this.#canvas = this.#root.querySelector('canvas') as HTMLCanvasElement;
		this.#gameWrapper = this.#root.querySelector('#game-wrapper') as HTMLElement;
		this.#loadOverlay = this.#root.querySelector('#emulator-load-overlay') as HTMLDivElement;
		this.#pauseButton = this.#root.querySelector('#pause-button') as HTMLButtonElement;

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
	}

	get paused() {
		return this.hasAttribute('paused');
	}

	set paused(newValue: boolean) {
		if (newValue) {
			this.removeAttribute('paused');
			this.#emulator?.resumeMainLoop();
		} else {
			this.setAttribute('paused', '');
			this.#emulator?.pauseMainLoop();
		}
	}

	get loaded() {
		return this.hasAttribute('loaded');
	}

	set loaded(newValue: boolean) {
		if (newValue) {
			this.removeAttribute('loaded');
		} else {
			this.setAttribute('loaded', '');
		}
	}

	#hideLoadOverlay() {
		this.#loadOverlay.hidden = true;
	}

	#resetLoadOverlay() {
		this.#loadOverlay.hidden = false;
	}

	#adjustCanvasSize() {
		const { width, height } = this.#gameWrapper.getBoundingClientRect();

		this.#emulator?.setCanvasSize(width, height);
	}

	async #startGame(romFile: File) {
		this.#adjustCanvasSize();

		const romData = await romFile.arrayBuffer();

		FS.writeFile('/rom.bin', new Uint8Array(romData));

		const saveFile = await getEmulatorSaveFile(`save_${romFile.name}`);

		if (saveFile) {
			const saveData = await saveFile.arrayBuffer();

			mkdirTree('/home/web_user/retroarch/userdata/saves');
			FS.writeFile('/home/web_user/retroarch/userdata/saves/rom.srm', new Uint8Array(saveData));
		}

		const gameState = await getEmulatorSaveFile(`state_${romFile.name}`);

		if (gameState) {
			const stateData = await gameState.arrayBuffer();

			mkdirTree('/home/web_user/retroarch/userdata/states');
			FS.writeFile('/home/web_user/retroarch/userdata/states/rom.state', new Uint8Array(stateData));
		}

		mkdirTree('/home/web_user/retroarch/userdata');
		FS.writeFile('/home/web_user/retroarch/userdata/retroarch.cfg', config);

		this.#emulator?.callMain(this.#emulator.arguments);
		this.#adjustCanvasSize();
	}

	// eslint-disable-next-line consistent-return
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
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
			this.#gameWrapper.innerText = err?.message ?? err ?? 'Error';
		}
	}

	async #loadEmulatorScript(romFile: File) {
		const { id } = extractMetadataFromFileName(romFile.name);
		const { emulator } = materialsFilter.get(id) ?? {};
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const { 'default': emulatorInit } = (await import(`${import.meta.env.PUBLIC_URL}lib/webretro/${emulator ?? ''}_libretro.js`)) as { default: EmulatorInitializerFunction };

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		this.#emulator = emulatorInit({
			canvas: this.#canvas,
			onRuntimeInitialized: async () => {
				mkdirTree('/home/web_user/retroarch/bundle');
				await loadBundle();

				mkdirTree('/home/web_user/retroarch/userdata/system');
				await loadBios();

				await this.#startGame(romFile);

				this.setAttribute('loaded', '');
				this.#hideLoadOverlay();
			}
		});
	}

	async #loadGame() {
		const romFile = await this.#loadGameFile();

		if (romFile) {
			await this.#loadEmulatorScript(romFile);
		}
	}

	#togglePause() {
		const isPaused = this.hasAttribute('paused');

		if (isPaused) {
			this.removeAttribute('paused');
		} else {
			this.setAttribute('paused', '');
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
			const memoryStats = FS.stat('/home/web_user/retroarch/userdata/saves/rom.srm') as { size: number };
			const saveStats = FS.stat('/home/web_user/retroarch/userdata/states/rom.state') as { size: number };

			if (memoryStats.size > 0 && saveStats.size > 0) {
				this.#emulator?.pauseMainLoop();

				const stateBuffer = FS.readFile('/home/web_user/retroarch/userdata/saves/rom.srm');
				const stateFile = new File([stateBuffer], 'emulator_state');

				const saveBuffer = FS.readFile('/home/web_user/retroarch/userdata/saves/rom.state');
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
		this.#resetLoadOverlay();
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (oldValue !== newValue) {
			if (name === 'file') {
				this.#resetEmulator(newValue);
			} else if (name === 'paused') {
				this.paused = this.hasAttribute('paused');
			} else if (name === 'loaded') {
				this.paused = this.hasAttribute('loaded');
			}
		}
	}

	connectedCallback() {
		this.#filePath = this.getAttribute('file') ?? '';
	}
}

customElements.define('rom-emulator', Emulator);
