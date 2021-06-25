/* eslint-disable camelcase, @typescript-eslint/naming-convention */

import { getFile } from '../data-operations/idb-persistence';

type EmulatorSystems = 'snes' | 'segaMD' | 'segaCD';

interface EmulatorJsVars {
	EJS_player: '#game',
	EJS_pathtodata: string,
	EJS_gameUrl: string,
	EJS_biosUrl?: string,
	EJS_core: EmulatorSystems,
	EJS_mouse: boolean,
	EJS_multitap: boolean
}

async function setEmulator() {
	try {
		const emulatorSystems = ['snes', 'segaMD', 'segaCD'];
		const global: typeof globalThis & EmulatorJsVars = globalThis as typeof globalThis & EmulatorJsVars;
		const url = new URL(window.location.toString());
		const params = new URLSearchParams(url.search);

		global.EJS_player = '#game';
		global.EJS_pathtodata = '/lib/emulatorjs/';
		global.EJS_mouse = false;
		global.EJS_multitap = false;

		if (!emulatorSystems.includes(params.get('system') ?? '')) {
			throw new Error('Emulator system not recognized.');
		}

		const system = params.get('system') as EmulatorSystems;

		if (system.startsWith('sega')) {
			global.EJS_biosUrl = '/lib/emulatorjs/sega-cd-bios-jp.bin';
		}

		global.EJS_core = system;

		if (params.has('file')) {
			const file = await getFile(params.get('file') ?? '');

			if (!file) {
				throw new Error('ROM file does not exist.');
			}

			global.EJS_gameUrl = URL.createObjectURL(file);
		}

		const loader = document.createElement('script');

		loader.src = '/lib/emulatorjs/loader.js';
		document.body.appendChild(loader);
	} catch (err) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		(document.querySelector('main') as HTMLElement).innerText = err?.message ?? err ?? 'Error';
	}
}

void setEmulator();
