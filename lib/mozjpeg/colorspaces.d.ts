export enum ColorSpaces {
	/* Error/unspecified */
	JCS_UNKNOWN = 0,
	/* Monochrome */
	JCS_GRAYSCALE = 1,
	/* Red/green/blue as specified by the RGB_RED, RGB_GREEN, RGB_BLUE, and RGB_PIXELSIZE macros */
	JCS_RGB = 2,
	/* Y/Cb/Cr (also known as YUV) */
	JCS_YCbCr = 3,
	/* C/M/Y/K */
	JCS_CMYK = 4,
	/* Y/Cb/Cr/K */
	JCS_YCCK = 5,
	/* Red/green/blue */
	JCS_EXT_RGB = 6,
	/* Red/green/blue/x */
	JCS_EXT_RGBX = 7,
	/* Blue/green/red */
	JCS_EXT_BGR = 8,
	/* Blue/green/red/x */
	JCS_EXT_BGRX = 9,
	/* X/blue/green/red */
	JCS_EXT_XBGR = 10,
	/* X/red/green/blue */
	JCS_EXT_XRGB = 11,
	/* Red/green/blue/alpha */
	JCS_EXT_RGBA = 12,
	/* Blue/green/red/alpha */
	JCS_EXT_BGRA = 13,
	/* Alpha/blue/green/red */
	JCS_EXT_ABGR = 14,
	/* Alpha/red/green/blue */
	JCS_EXT_ARGB = 15,
	/* 5-bit red/6-bit green/5-bit blue */
	JCS_RGB565 = 16,
}
