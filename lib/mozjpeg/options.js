const defaultMozjpegOptions = {
	quality: 75,
	baseline: false,
	arithmetic: false,
	progressive: true,
	optimizeCoding: true,
	smoothing: 0,
	// J_COLOR_SPACE.JCS_YCbCr
	colorSpace: 3,
	quantTable: 3,
	trellisMultipass: false,
	trellisOptZero: false,
	trellisOptTable: false,
	trellisLoops: 1,
	autoSubsample: true,
	chromaSubsample: 2,
	separateChromaQuality: false,
	chromaQuality: 75
};

export default defaultMozjpegOptions;
