/* eslint-disable @typescript-eslint/naming-convention, camelcase, no-underscore-dangle */
import { getEmulatorSaveFile, getFile, saveEmulatorSaveFile } from '../data-operations/idb-persistence';
import { extractMetadataFromFileName, getFilePermission } from '../files-reader/files-reader';
import { loadBundle } from './assets-bundle';
import { loadBios } from './bios-bundle';
import config from './config';

import './touch-input';

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
	callMain(args: string[]): void
}

declare const Module: EmulatorModule;

const materialsFilter = new Map([
	['GENESIS', { emulator: 'genesis_plus_gx' }],
	['SEGA-CD', { emulator: 'genesis_plus_gx' }],
	['SNES', { emulator: 'snes9x' }]
]);

let romFile: File | undefined;

function mkdirTree(path: string) {
	// @ts-expect-error
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	FS.createPath('/', path, true, true);
}

function togglePause() {
	const mainElement = document.querySelector('main') as HTMLElement;
	const isPaused = mainElement.hasAttribute('paused');

	if (isPaused) {
		mainElement.removeAttribute('paused');
		Module.resumeMainLoop();
	} else {
		mainElement.setAttribute('paused', '');
		Module.pauseMainLoop();
	}
}

function loadState() {
	Module._cmd_load_state();
}

function saveState() {
	const WAIT_BEFORE_SAVE = 1000;

	Module._cmd_savefiles();
	Module._cmd_save_state();

	window.setTimeout(async () => {
		const memoryStats = FS.stat('/home/web_user/retroarch/userdata/saves/rom.srm') as { size: number };
		const saveStats = FS.stat('/home/web_user/retroarch/userdata/states/rom.state') as { size: number };

		if (memoryStats.size > 0 && saveStats.size > 0) {
			Module.pauseMainLoop();

			const stateBuffer = FS.readFile('/home/web_user/retroarch/userdata/saves/rom.srm');
			const stateFile = new File([stateBuffer], `state_${romFile?.name ?? ''}`);

			const saveBuffer = FS.readFile('/home/web_user/retroarch/userdata/saves/rom.state');
			const saveFile = new File([saveBuffer], `save_${romFile?.name ?? ''}`);

			await saveEmulatorSaveFile(`state_${romFile?.name ?? ''}`, stateFile);
			await saveEmulatorSaveFile(`save_${romFile?.name ?? ''}`, saveFile);

			Module.resumeMainLoop();
		}
	}, WAIT_BEFORE_SAVE);
}

export function adjustCanvasSize() {
	const mainElement = document.querySelector('#game-wrapper') as HTMLElement;
	const { width, height } = mainElement.getBoundingClientRect();

	Module.setCanvasSize(width, height);
}

async function startGame() {
	adjustCanvasSize();

	const romData = await (romFile as File).arrayBuffer();

	FS.writeFile('/rom.bin', new Uint8Array(romData));

	const saveFile = await getEmulatorSaveFile(`save_${romFile?.name ?? ''}`);

	if (saveFile) {
		const saveData = await saveFile.arrayBuffer();

		mkdirTree('/home/web_user/retroarch/userdata/saves');
		FS.writeFile('/home/web_user/retroarch/userdata/saves/rom.srm', new Uint8Array(saveData));
	}

	const gameState = await getEmulatorSaveFile(`state_${romFile?.name ?? ''}`);

	if (gameState) {
		const stateData = await gameState.arrayBuffer();

		mkdirTree('/home/web_user/retroarch/userdata/states');
		FS.writeFile('/home/web_user/retroarch/userdata/states/rom.state', new Uint8Array(stateData));
	}

	mkdirTree('/home/web_user/retroarch/userdata');
	FS.writeFile('/home/web_user/retroarch/userdata/retroarch.cfg', config);

	Module.callMain(Module.arguments);
	adjustCanvasSize();
}

async function setEmulator() {
	try {
		const url = new URL(window.location.toString());
		const params = new URLSearchParams(url.search);

		if (!params.has('file')) {
			throw new Error('Missing ROM file.');
		}

		const filePath = params.get('file') as string;
		const handler = await getFile(filePath) as FileSystemFileHandle | undefined;

		if (!handler) {
			throw new Error('ROM file does not exist.');
		}

		// Add start handler to have a user action.
		document.querySelector('#start-button')?.addEventListener('click', async () => {
			await getFilePermission(handler);
			romFile = await handler.getFile();

			const { id } = extractMetadataFromFileName(romFile.name);
			const { emulator } = materialsFilter.get(id) ?? {};
			const emulatorScript = document.createElement('script');
			const BASE_URL = `${window.location.origin}${window.location.pathname.replace(/\/.+?\.html$/igu, '/')}`;

			emulatorScript.src = `${BASE_URL}lib/webretro/${emulator ?? ''}_libretro.js`;
			document.body.appendChild(emulatorScript);
		}, { once: true, capture: false });

		// Add resize handler.
		window.addEventListener('resize', () => {
			const isLoaded = document.querySelector('main')?.hasAttribute('loaded') ?? false;

			if (isLoaded) {
				adjustCanvasSize();
			}
		}, false);

		// Avoid unwanted key presses to exit the game.
		document.addEventListener('keydown', (evt) => {
			const isLoaded = document.querySelector('main')?.hasAttribute('loaded') ?? false;
			const pdKeys = ['8', '9', '13', '19', '27', '32', '33', '34', '35', '36', '42', '44', '45', '91', '92', '93', '112', '113', '114', '115', '116', '117', '118', '119', '120', '121', '122', '123', '124', '125', '126', '127', '128', '129', '130', '131', '132', '133', '134', '135'];

			if (isLoaded && pdKeys.includes(evt.code)) {
				evt.preventDefault();
			}
		}, false);

		// Save game on F2.
		document.addEventListener('keydown', (evt) => {
			const isLoaded = document.querySelector('main')?.hasAttribute('loaded') ?? false;

			if (isLoaded && evt.key === 'F2') {
				saveState();
			}
		}, false);

		// Load state on F3.
		document.addEventListener('keydown', (evt) => {
			const isLoaded = document.querySelector('main')?.hasAttribute('loaded') ?? false;

			if (isLoaded && evt.key === 'F3') {
				loadState();
			}
		}, false);

		// Toggle retroarch menu on F4.
		document.addEventListener('keydown', (evt) => {
			const isLoaded = document.querySelector('main')?.hasAttribute('loaded') ?? false;

			if (isLoaded && evt.key === 'F4') {
				Module._cmd_toggle_menu();
			}
		}, false);

		// Add pause toggle
		document.querySelector('#pause-button')?.addEventListener('click', () => {
			togglePause();
		});

		document.addEventListener('keydown', (evt) => {
			const isLoaded = document.querySelector('main')?.hasAttribute('loaded') ?? false;

			if (isLoaded && evt.key === 'Escape') {
				togglePause();
			}
		});

		document.addEventListener('visibilitychange', () => {
			const isVisible = document.visibilityState === 'visible';
			const isHidden = document.visibilityState === 'hidden';
			const isLoaded = document.querySelector('main')?.hasAttribute('loaded') ?? false;
			const isPaused = document.querySelector('main')?.hasAttribute('paused') ?? false;

			if (isLoaded && isHidden && !isPaused) {
				togglePause();
			}

			if (isLoaded && isVisible && isPaused) {
				togglePause();
			}
		}, false);
	} catch (err) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		(document.querySelector('main') as HTMLElement).innerText = err?.message ?? err ?? 'Error';
	}
}

// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
globalThis.Module = {
	canvas: document.querySelector('canvas') as HTMLCanvasElement,
	noInitialRun: true,
	arguments: ['/rom.bin', '--verbose'],
	async onRuntimeInitialized() {
		mkdirTree('/home/web_user/retroarch/bundle');
		await loadBundle();

		mkdirTree('/home/web_user/retroarch/userdata/system');
		await loadBios();

		await startGame();

		document.querySelector('main')?.setAttribute('loaded', '');
		document.querySelector('#start-overlay')?.remove();
	},
	print(text: string) {
		// eslint-disable-next-line no-console
		console.log(`stdout: ${text}`);
	},
	printErr(text: string) {
		// eslint-disable-next-line no-console
		console.log(`stderr: ${text}`);
	}
} as Partial<EmulatorModule>;

void setEmulator();
