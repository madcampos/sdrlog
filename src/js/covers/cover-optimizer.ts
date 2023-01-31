/* eslint-disable @typescript-eslint/naming-convention */
enum ColorSpaces {
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
	JCS_RGB565 = 16
}

interface MozJPEGOptions {
	quality?: number,
	baseline?: boolean,
	arithmetic?: boolean,
	progressive?: boolean,
	optimizeCoding?: boolean,
	smoothing?: number,
	colorSpace?: ColorSpaces,
	quantTable?: number,
	trellisMultipass?: boolean,
	trellisOptZero?: boolean,
	trellisOptTable?: boolean,
	trellisLoops?: number,
	autoSubsample?: boolean,
	chromaSubsample?: number,
	separateChromaQuality?: boolean,
	chromaQuality?: number
}

declare type ImagePointer = number;

interface MozJPEGModule extends EmscriptenModule {
	encode(image: BufferSource, imageWidth: number, imageHeight: number, inputChannels: number, outputOptions: MozJPEGOptions): ImagePointer,
	getImage(imagePointer: ImagePointer): ArrayBuffer,
	freeImage(imagePointer: ImagePointer): void
}

type MozJPEGModuleImport = (mozjpeg?: { onRuntimeInitialized(): void }) => Promise<MozJPEGModule>;

const IMAGE_CHANNELS = 4;

const defaultEncodeOptions = {
	quality: 75,
	baseline: !1,
	arithmetic: !1,
	progressive: !0,
	optimizeCoding: !0,
	smoothing: 0,
	colorSpace: 3,
	quantTable: 3,
	trellisMultipass: !1,
	trellisOptZero: !1,
	trellisOptTable: !1,
	trellisLoops: 1,
	autoSubsample: !0,
	chromaSubsample: 2,
	separateChromaQuality: !1,
	chromaQuality: 75
};

let mozjpegModule: MozJPEGModuleImport | undefined;

export async function optimize(imageArray: BufferSource, { width, height }: { width: number, height: number }) {
	if (!('WebAssembly' in window)) {
		return imageArray;
	}

	if (!mozjpegModule) {
		// eslint-disable-next-line require-atomic-updates
		mozjpegModule = (await import(/* @vite-ignore */ `${import.meta.env.APP_PUBLIC_URL}/lib/mozjpeg/mozjpeg.js`)).default as MozJPEGModuleImport;
	}

	const mozjpeg = await mozjpegModule();

	const imagePointer = mozjpeg.encode(imageArray, width, height, IMAGE_CHANNELS, defaultEncodeOptions);

	const result = mozjpeg.getImage(imagePointer);

	mozjpeg.freeImage(imagePointer);

	return result;
}
