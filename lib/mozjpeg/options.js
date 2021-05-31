/* eslint-disable @typescript-eslint/naming-convention, camelcase */

const defaultMozjpegOptions = {
	quality: 75,
	baseline: false,
	arithmetic: false,
	progressive: true,
	optimize_coding: true,
	smoothing: 0,
	// J_COLOR_SPACE.JCS_RGB
	in_color_space: 2,
	// J_COLOR_SPACE.JCS_YCbCr
	out_color_space: 3,
	quant_table: 3,
	trellis_multipass: false,
	trellis_opt_zero: false,
	trellis_opt_table: false,
	trellis_loops: 1,
	auto_subsample: true,
	chroma_subsample: 2,
	separate_chroma_quality: false,
	chroma_quality: 75
};

export default defaultMozjpegOptions;
