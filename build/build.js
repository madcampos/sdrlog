/*eslint-env node */
const {promisify} = require('util');
const uglify = require('uglify-es');
const cssnano = require('cssnano');
const htmlnano = require('html-minifier');
const glob = promisify(require('glob'));
const fs = require('fs');
const imagemin = require('imagemin');
const imJpeg = require('imagemin-mozjpeg');
const imPng = require('imagemin-pngquant');
const imSvg = require('imagemin-svgo');
const imWebp = require('imagemin-webp');
const gm = require('gm');

//TODO: inject base url and social image url in html