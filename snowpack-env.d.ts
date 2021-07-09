/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-shadow */

interface ImportMeta {
	hot: {
		accept: Function,
		dispose: Function
	},
	env: {
		MODE: string,
		SNOWPACK_PUBLIC_URL: string,
		SNOWPACK_THEME_COLOR: string,
		SNOWPACK_BACKGROUND_COLOR: string,
		SNOWPACK_APPLE_ICON: string,
		SNOWPACK_SMALL_ICON: string,
		SNOWPACK_SMALL_ICON_BG: string,
		SNOWPACK_LARGE_ICON: string,
		SNOWPACK_LARGE_ICON_BG: string
	}
}
