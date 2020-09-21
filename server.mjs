/* eslint-env node */
/**
 * @file Configuration for local web server.
 * @author madcampos <madcampos@outlook.com>
 * @version 1.0.0
 */

import { readFile } from 'fs/promises';
import { default as server } from 'live-server';

(async () => {
	const params = {
		file: 'index.html',
		host: 'localhost',
		https: {
			cert: await readFile('./localhost.crt'),
			key: await readFile('./localhost.key'),
			passphrase: '12345'
		},
		logLevel: 2,
		mount: [
			['/img/thumbs', './covers'],
			['/img/full', './covers']
		],
		open: true,
		port: 8000,
		root: './src',
		wait: 1000
	};

	server.start(params);
})();
