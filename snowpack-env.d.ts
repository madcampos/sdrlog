/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-shadow */

interface ImportMeta {
	hot: {
		accept: Function,
		dispose: Function
	},
	env: {
		MODE: string,

		PUBLIC_URL: string,

		THEME_COLOR: string,
		BACKGROUND_COLOR: string,

		APP_NAME: string,
		APP_SHORT_NAME: string,
		APP_DESCRIPTION: string,

		APPLE_ICON: string,
		SMALL_ICON: string,
		SMALL_ICON_BG: string,
		LARGE_ICON: string,
		LARGE_ICON_BG: string
	}
}
