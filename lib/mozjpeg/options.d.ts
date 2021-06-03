import type { ColorSpaces } from './colorspaces';

/* eslint-disable @typescript-eslint/naming-convention, camelcase */
export interface MozJPEGOptions {
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

declare const defaultMozjpegOptions: MozJPEGOptions;

export default defaultMozjpegOptions;
