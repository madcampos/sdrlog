interface ImportMeta {
	hot: {
		accept: Function,
		dispose: Function
	},
	env: {
		/** The app mode. Can be either `development` or `production`. */
		MODE: 'development' | 'production',

		/** The absolute path to the project root. */
		PUBLIC_URL: string,

		/** The app's full name. */
		APP_NAME: string,
		/** The app's short name, used for PWAs. */
		APP_SHORT_NAME: string,
		/** The app's description. */
		APP_DESCRIPTION: string,
		/** The app's keywords. */
		APP_KEYWORDS: string,
		/** The app's author. */
		APP_AUTHOR: string,
		/** The app's version */
		APP_VERSION: string,

		/** The app's theme color. */
		THEME_COLOR: string,
		/** The app's background color */
		BACKGROUND_COLOR: string,

		/** The icon used for Apple devices. */
		APPLE_ICON: string,
		/** The _small_ icon used for all other devices. */
		SMALL_ICON: string,
		/** The _small_ icon used for all other devices, with maskable background. */
		SMALL_ICON_BG: string,
		/** The _large_ icon used for all other devices. */
		LARGE_ICON: string,
		/** The _large_ icon used for all other devices, with maskable background. */
		LARGE_ICON_BG: string
	}
}
