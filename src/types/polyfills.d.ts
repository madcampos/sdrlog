/* eslint-disable @typescript-eslint/no-shadow */

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
