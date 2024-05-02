/// <reference types="urlpattern-polyfill" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
	/** The app mode. Can be either `development` or `production`. */
	readonly MODE: 'development' | 'production',
	readonly PROD: boolean,
	readonly DEV: boolean
}

interface ImportMeta {
	hot: {
		accept: Function,
		dispose: Function
	},
	readonly env: ImportMetaEnv
}
