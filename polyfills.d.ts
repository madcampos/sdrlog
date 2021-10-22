/* eslint-disable max-classes-per-file, @typescript-eslint/no-shadow */

interface HTMLDialogElement {
	showModal?: VoidFunction,
	show?: VoidFunction,
	close?: VoidFunction
}

interface DisplayNameOptions {
	type: 'language'
}

declare namespace Intl {
	// FIXME: remove comment after this is available/merged: https://github.com/microsoft/TypeScript/pull/44022
	class DisplayNames {
		constructor(languages: string[], options: DisplayNameOptions);
		// eslint-disable-next-line id-length
		of(lang: string): string;
	}

	// FIXME: remove comment after this is available/merged: https://github.com/microsoft/TypeScript/pull/39664
	class Locale {
		constructor(tag: string);
		language: string;
	}
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
