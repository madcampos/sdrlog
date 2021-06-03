/* eslint-disable @typescript-eslint/naming-convention, camelcase, no-inline-comments */

export enum ColorSpaces {
	JCS_UNKNOWN = 0 /* Error/unspecified */,
	JCS_GRAYSCALE = 1 /* Monochrome */,
	JCS_RGB = 2 /* Red/green/blue as specified by the RGB_RED, RGB_GREEN, RGB_BLUE, and RGB_PIXELSIZE macros */,
	JCS_YCbCr = 3 /* Y/Cb/Cr (also known as YUV) */,
	JCS_CMYK = 4 /* C/M/Y/K */,
	JCS_YCCK = 5 /* Y/Cb/Cr/K */,
	JCS_EXT_RGB = 6 /* Red/green/blue */,
	JCS_EXT_RGBX = 7 /* Red/green/blue/x */,
	JCS_EXT_BGR = 8 /* Blue/green/red */,
	JCS_EXT_BGRX = 9 /* Blue/green/red/x */,
	JCS_EXT_XBGR = 10 /* X/blue/green/red */,
	JCS_EXT_XRGB = 11 /* X/red/green/blue */,
	JCS_EXT_RGBA = 12 /* Red/green/blue/alpha */,
	JCS_EXT_BGRA = 13 /* Blue/green/red/alpha */,
	JCS_EXT_ABGR = 14 /* Alpha/blue/green/red */,
	JCS_EXT_ARGB = 15 /* Alpha/red/green/blue */,
	JCS_RGB565 = 16 /* 5-bit red/6-bit green/5-bit blue */
}
