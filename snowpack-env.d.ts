/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-shadow */

interface ImportMeta {
	hot: {
		accept: Function,
		dispose: Function
	},
	env: {
		MODE: string,
		SNOWPACK_PUBLIC_URL: string
	}
}
