interface ImportMetaEnv {
	/** The app mode. Can be either `development` or `production`. */
	readonly MODE: 'development' | 'production';
	readonly PROD: boolean;
	readonly DEV: boolean;
}

interface ImportMeta {
	hot: {
		// oxlint-disable-next-line typescript/no-unsafe-function-type
		accept: Function,
		// oxlint-disable-next-line typescript/no-unsafe-function-type
		dispose: Function
	};
	readonly env: ImportMetaEnv;

	resolve(string): string;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
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
