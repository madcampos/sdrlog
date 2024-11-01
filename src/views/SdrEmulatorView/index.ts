/* eslint-disable @typescript-eslint/naming-convention, no-underscore-dangle */
import type { RouteLocation, RouterView } from '../../router/router';

import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import { setIDBItem } from '../../js/data/idb-persistence';
import { getEmulatorFiles } from '../../js/files/file-emulator';
import { extractMetadataFromFileName } from '../../js/files/file-import';
import { loadFile } from '../../js/files/file-open';
import { Router } from '../../router/router';

import style from './style.css?inline' assert { type: 'css' };

interface EmulatorModule extends EmscriptenModule {
	canvas: HTMLCanvasElement;
	_cmd_savefiles(): void;
	_cmd_save_state(): void;
	_cmd_load_state(): void;
	_cmd_toggle_menu(): void;
	_cmd_undo_save_state(): void;
	_cmd_undo_load_state(): void;
	setCanvasSize(width: number, height: number): void;
	pauseMainLoop(): void;
	resumeMainLoop(): void;
	callMain(args: string[]): void;
	FS: typeof FS;
}

interface EmulatorInitializer {
	canvas: HTMLCanvasElement;
	onRuntimeInitialized(): Promise<void> | void;
}

type EmulatorInitializerFunction = (moduleInitializer: EmulatorInitializer) => EmulatorModule;

interface KeyData {
	key: string;
	code: string;
	keyCode: number;
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

@customElement('sdr-view-emulator')
class SdrViewEmulator extends LitElement implements RouterView {
	static override shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
	static override readonly styles = unsafeCSS(style);

	@property({ type: Boolean, reflect: true })
	accessor loaded: boolean;

	@query('#game-canvas')
	// @ts-expect-error
	accessor #canvas: HTMLCanvasElement;

	@query('#game-wrapper')
	// @ts-expect-error
	accessor #gameWrapper: HTMLDivElement;

	@query('#dpad')
	// @ts-expect-error
	accessor #dpad: HTMLDivElement;

	@state()
	accessor #open: boolean;

	@state()
	set paused(newValue: boolean) {
		if (newValue) {
			this.#emulator?.pauseMainLoop();
		} else {
			this.#emulator?.resumeMainLoop();
		}

		this.#isPaused = newValue;
	}

	get paused() {
		return this.#isPaused;
	}

	#isPaused = false;
	#emulator: EmulatorModule | null = null;

	constructor() {
		super();

		this.loaded = false;
		this.#open = false;

		this.#resetEmulator();

		// Avoid unwanted key presses to exit the game.
		document.addEventListener('keydown', (evt) => {
			const pdKeys = [
				'8',
				'9',
				'13',
				'19',
				'27',
				'32',
				'33',
				'34',
				'35',
				'36',
				'42',
				'44',
				'45',
				'91',
				'92',
				'93',
				'112',
				'113',
				'114',
				'115',
				'116',
				'117',
				'118',
				'119',
				'120',
				'121',
				'122',
				'123',
				'124',
				'125',
				'126',
				'127',
				'128',
				'129',
				'130',
				'131',
				'132',
				'133',
				'134',
				'135'
			];

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

	#close() {
		this.#open = false;

		void Router.navigate('/');
	}

	#sendKeyEvent(type: 'keydown' | 'keyup', key: keyof typeof keyMap) {
		this.#canvas.dispatchEvent(
			new KeyboardEvent(type, {
				bubbles: true,
				cancelable: false,
				shiftKey: false,
				ctrlKey: false,
				metaKey: false,
				altKey: false,
				...keyMap[key]
			})
		);
	}

	async #addDPadButtons() {
		const nipplejs = (await import('nipplejs')).default;
		const dpadElement = this.#dpad;
		const { width, height } = dpadElement.getBoundingClientRect();

		const dpad = nipplejs.create({
			zone: dpadElement,
			color: 'white',
			multitouch: false,
			// eslint-disable-next-line @typescript-eslint/no-magic-numbers
			position: { top: `${height / 2}px`, left: `${width / 2}px` },
			mode: 'static',
			restJoystick: true,
			shape: 'circle',
			follow: false,
			dynamicPage: true
		});

		let dpadDirection: string | null = null;

		dpad.on('move', (_, { direction }) => {
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
		const { width, height } = this.#gameWrapper.getBoundingClientRect();

		this.#emulator?.setCanvasSize(width, height);
	}

	#mkdirTree(path: string) {
		// @ts-expect-error - FS is not defined in the type definitions.
		this.#emulator?.FS.createPath('/', path, true, true);
	}

	async #loadEmulatorFiles() {
		const folderPath = '/home/web_user/retroarch/';

		const files = await getEmulatorFiles();

		this.#mkdirTree(folderPath);

		for (const [path, file] of files) {
			// eslint-disable-next-line no-await-in-loop
			const buffer = await file.arrayBuffer();

			if (file.type === 'application/x-directory') {
				this.#mkdirTree(`${folderPath}${file.name}`);
			} else {
				this.#emulator?.FS.writeFile(`${folderPath}${path}`, new Uint8Array(buffer));
			}
		}
	}

	async #loadGame(fileId: string) {
		const materialsFilter = new Map([
			['GENESIS', 'genesis_plus_gx'],
			['SEGA-CD', 'genesis_plus_gx'],
			['SNES', 'snes9x']
		]);

		const romFile = await loadFile(fileId);

		const { id } = extractMetadataFromFileName(romFile.name);

		const emulator = materialsFilter.get(id ?? '') ?? '';

		const emulatorImport = await import(/* @vite-ignore */ import.meta.resolve(`/lib/webretro/${emulator}_libretro.js`));
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
	}

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

	async navigate(destination: RouteLocation<'/cbz/:id'>) {
		this.#resetEmulator();

		if (!destination.params.id) {
			return;
		}

		await this.#loadGame(destination.params.id);
		this.#open = true;

		return 'Emulator';
	}

	override firstUpdated(changedProperties: Map<string, unknown>): void {
		super.firstUpdated(changedProperties);

		void this.#addDPadButtons();
	}

	override createRenderRoot() {
		return this;
	}

	override render() {
		return html`
			<style>${SdrViewEmulator.styles}</style>
			<sdr-dialog ?open="${this.#open}" @close="${() => this.#close()}">
				<sdr-button icon-button slot="title" @click="${() => this.#emulator?._cmd_toggle_menu()}">⚙️</sdr-button>
				<hr slot="title">
				<sdr-button icon-button slot="title" @click="${() => {
			this.paused = true;
		}}">⏸️</sdr-button>
				<hr slot="title">
				<sdr-button icon-button slot="title" @click="${() => this.#loadState()}">⏮️</sdr-button>
				<sdr-button icon-button slot="title" @click="${() => this.#saveState()}">⏭️</sdr-button>
				<hr slot="title">
				<sdr-button icon-button slot="title" @click="${async () => this.#toggleFullScreen()}">🖥️</sdr-button>

				<div id="emulator-wrapper">
					<aside class="controller" id="left-controller">
						<button
							id="button-select"

							@pointerup="${() => this.#sendKeyEvent('keyup', 'select')}"
							@pointerdown="${() => this.#sendKeyEvent('keydown', 'select')}"
						>Select</button>
						<button
							id="button-start"

							@pointerup="${() => this.#sendKeyEvent('keyup', 'start')}"
							@pointerdown="${() => this.#sendKeyEvent('keydown', 'start')}"
						>Start</button>
						<div id="dpad"></div>
					</aside>
					<article id="game-wrapper">
						<div id="game-overlay">
							<button
								type="button"
								id="pause-button"

								@click="${() => {
			this.paused = true;
		}}"
							>▶️</button>
						</div>
						<canvas id="game-canvas"></canvas>
					</article>
					<aside class="controller" id="right-controller">
						<button
							id="bumper-left"

							@pointerup="${() => this.#sendKeyEvent('keyup', 'leftBumper')}"
							@pointerdown="${() => this.#sendKeyEvent('keydown', 'leftBumper')}"
						>L</button>
						<button
							id="bumper-right"

							@pointerup="${() => this.#sendKeyEvent('keyup', 'rightBumper')}"
							@pointerdown="${() => this.#sendKeyEvent('keydown', 'rightBumber')}"
						>R</button>
						<button
							id="button-x"

							@pointerup="${() => this.#sendKeyEvent('keyup', 'x')}"
							@pointerdown="${() => this.#sendKeyEvent('keydown', 'x')}"
						>X</button>
						<button
							id="button-y"

							@pointerup="${() => this.#sendKeyEvent('keyup', 'y')}"
							@pointerdown="${() => this.#sendKeyEvent('keydown', 'y')}"
						>Y</button>
						<button
							id="button-a"

							@pointerup="${() => this.#sendKeyEvent('keyup', 'a')}"
							@pointerdown="${() => this.#sendKeyEvent('keydown', 'a')}"
						>A</button>
						<button
							id="button-b"

							@pointerup="${() => this.#sendKeyEvent('keyup', 'b')}"
							@pointerdown="${() => this.#sendKeyEvent('keydown', 'b')}"
						>B</button>
					</aside>
				</div>
			</sdr-dialog>
		`;
	}
}

export { SdrViewEmulator };
