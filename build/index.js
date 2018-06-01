/*eslint-env node */
/*eslint-disable no-console, arrow-body-style*/
const {readFileSync} = require('fs');
const {outputFileSync, ensureDirSync, copySync, emptyDirSync} = require('fs-extra');
const {resolve, basename} = require('path');
const glob = require('glob').sync;

const DIST_PATH = resolve(process.cwd(), './dist');
ensureDirSync(DIST_PATH);
emptyDirSync(DIST_PATH);

console.log('Minifing JS...');
const uglify = require('uglify-es').minify;
glob('./js/**/*.js').forEach((jsFile) => outputFileSync(resolve(DIST_PATH, jsFile), uglify(readFileSync(jsFile, 'utf8')).code));
outputFileSync(resolve(DIST_PATH, './sw.js'), uglify(readFileSync(resolve(process.cwd(), './sw.js'), 'utf8')).code);

console.log('Minifing CSS...');
const csso = require('csso').minify;
glob('./css/**/*.css').forEach((cssFile) => outputFileSync(resolve(DIST_PATH, cssFile), csso(readFileSync(cssFile, 'utf8')).css));

console.log('Minifing HTML...');
const baseUrl = 'https://sdrlog.neocities.org';
const htmlmin = require('html-minifier').minify;
let htmlCode = readFileSync(resolve(process.cwd(), './index.html'), 'utf8');
htmlCode = htmlCode.replace('{{baseUrl}}', baseUrl);
outputFileSync(resolve(DIST_PATH, './index.html'), htmlmin(htmlCode, {
	collapseBooleanAttributes: true,
	collapseWhitespace: true,
	removeComments: true,
	removeEmptyAttributes: true,
	removeRedundantAttributes: true,
	removeOptionalTags: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	sortAttributes: true,
	sortClassName: true,
	useShortDoctype: true,
	trimCustomFragments: true
}));

console.log('Coping metadata...');
const manifest = JSON.parse(readFileSync(resolve(process.cwd(), './meta/site.webmanifest')));
outputFileSync(resolve(DIST_PATH, './meta/site.webmanifest'), JSON.stringify(manifest));
copySync(resolve(process.cwd(), './meta/browserconfig.xml'), resolve(DIST_PATH, './meta/browserconfig.xml'));

console.log('Creating data chunks...');
const chunkData = require('./chunk');
const data = require(resolve(process.cwd(), './data/data.js'));
ensureDirSync(resolve(DIST_PATH, './data'));
chunkData(data, resolve(DIST_PATH, './data'));

console.log('Optimize images...');
const imagemin = require('imagemin');
const imJpeg = require('imagemin-mozjpeg');
const imPng = require('imagemin-pngquant');
const imSvg = require('imagemin-svgo');
const jimp = require('jimp');
copySync(resolve(process.cwd(), './favicon.ico'), resolve(DIST_PATH, './favicon.ico'));
ensureDirSync(resolve(process.cwd(), './img/thumbs'));
Promise.all(glob('./img/full/*.{pn,jp}g').map((imageFile) => {
	return jimp.read(imageFile).then((img) => {
		return img.resize(jimp.AUTO, 256, jimp.RESIZE_BICUBIC).write(resolve('./img/thumbs', basename(imageFile)));
	}).catch((err) => {
		console.error(`Error in file: ${imageFile}`);
		console.error(err);
	});
})).then(() => {
	console.log('Minifying images...');
	//TODO: work on images minification with cache
	return Promise.all(glob('./img/**/*.{pn,jp,sv}g').map((imageFile) => {
		return imagemin([imageFile], {
			plugins: [
				imJpeg({quality: 55, tune: 'hvs-psnr', dcScanOpt: 2, quantTable: 4, dct: 'float', sample: ['4x2', '2x1'], smooth: 10}),
				imPng({floyd: 0, nofs: true, quality: 80, speed: 1}),
				imSvg()
			]
		}).then(([result]) => {
			return outputFileSync(resolve(DIST_PATH, imageFile), result.data);
		}).catch((err) => {
			console.error(`Error in file: ${imageFile}`);
			console.error(err);
		});
	}));
}).then(() => console.log('Done!'));