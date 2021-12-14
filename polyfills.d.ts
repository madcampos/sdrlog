/* eslint-disable @typescript-eslint/no-shadow */

interface HTMLDialogElement {
	showModal?: VoidFunction,
	show?: VoidFunction,
	close?: VoidFunction
}

interface DisplayNameOptions {
	type: 'language'
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
