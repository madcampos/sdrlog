/* eslint-disable @typescript-eslint/consistent-type-imports, @typescript-eslint/no-unused-vars */
const JSZip: typeof import('jszip');

interface FilePickerOptions {
	id: string,
	startIn: 'documents' | 'downloads' | 'home' | 'music' | 'pictures' | 'videos' | 'removable' | 'devices' | 'recent' | 'unknown'
}

interface Gamepad {
	vibrationActuator?: {
		playEffect(type: 'dual-rumble', options: {
			startDelay: number,
			duration: number,
			weakMagnitude: number,
			strongMagnitude: number
		}): void
	}
}
