/// <reference types="urlpattern-polyfill" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
	/** The app mode. Can be either `development` or `production`. */
	readonly MODE: 'development' | 'production';
	readonly PROD: boolean;
	readonly DEV: boolean;
}

interface ImportMeta {
	hot: {
		accept: Function,
		dispose: Function
	};
	readonly env: ImportMetaEnv;

	resolve(string): string;
}

const JSZip: typeof import('jszip');

interface FilePickerOptions {
	id: string;
	startIn: 'devices' | 'documents' | 'downloads' | 'home' | 'music' | 'pictures' | 'recent' | 'removable' | 'unknown' | 'videos';
}

interface Gamepad {
	vibrationActuator?: {
		playEffect(type: 'dual-rumble', options: {
			startDelay: number,
			duration: number,
			weakMagnitude: number,
			strongMagnitude: number
		}): void
	};
}

interface LaunchParams {
	readonly files: FileSystemHandle[];
	readonly targetURL: string;
}

interface LaunchQueue {
	setConsumer(consumer: (params: LaunchParams) => unknown): void;
}

interface Window {
	launchQueue: LaunchQueue;
}
