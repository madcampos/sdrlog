/*eslint-env node */
const {writeFileSync} = require('fs');
const {resolve} = require('path');
const data = require('../data/data.js');

const CHUNK_SIZE = 100;
let chunk = [];

data.forEach((item, i) => {
	chunk.push(item);

	if ((i + 1) % CHUNK_SIZE === 0 || i === (data.length - 1)) {
		writeFileSync(resolve(__dirname, `../data/data-${Math.ceil((i + 1) / CHUNK_SIZE)}.json`), JSON.stringify(chunk));
		chunk = [];
	}
});