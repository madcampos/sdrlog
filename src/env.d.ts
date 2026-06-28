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
