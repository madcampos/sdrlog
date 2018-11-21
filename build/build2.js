//TODO: Use posthtml (plugins: posthtml-expressions, posthtml-inline-assets, postcss, cssnext, htmlnano, cssnano, autoprefixer, terser)
/*eslint-env node*/
const {accessSync, appendFileSync, readFileSync} = require('fs');
const {resolve} = require('path');

const IMAGES_PATH = './images/';
const FILE_PATH = resolve(process.cwd(), './test.html');

const data = require(resolve(process.cwd(), './data.js'));
const dateFormater = new Intl.DateTimeFormat('en-US', {timeZone: 'UTC', month: 'short', year: 'numeric'});
const capitalizeString = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const categories = new Map([
	['novel', '📚'],
	['sourcebook', '📜'],
	['mission', '🗺️'],
	['rulebook', '📝'],
	['misc', '🔣'],
	['magazine', '📰'],
	['boardgame', '♟️'],
	['videogame', '🎮'],
	['tcg', '🃏'],
	['unofficial', '📓']
]);
const types = new Map([
	['digital', '💽'],
	['scan', '📠'],
	['print', '🖨️'],
	['physical', '🎲']
]);

appendFileSync(FILE_PATH, '<!doctype html><html lang="en-US"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Shadowrun Catalog - TEST</title><style>pre{margin: 0;padding: 0;font-family: inherit;font-size: inherit;white-space: pre-wrap;-webkit-hyphens: auto;-ms-hyphens: auto;hyphens: auto;}</style></head><body class="notranslate" translate="no"><main>\n');

data.forEach(([id, item]) => {
	const imagePath = resolve(process.cwd(), IMAGES_PATH, `${id}.jpg`);
	let image = 'data:image/jpeg;base64,';

	try {
		accessSync(imagePath);
		image += readFileSync(imagePath).toString('base64');
	} catch (err) {
		console.error(err); //eslint-disable-line no-console
		image += readFileSync(resolve(process.cwd(), IMAGES_PATH, './000-fallback.jpg')).toString('base64');
	}

	appendFileSync(FILE_PATH, `<article>
	<header><h1>${item.name}</h1></header>
	<section>${item.notes ? `<p>Notes: ${item.notes}</p>` : ''}<pre>${item.description}</pre></section>
	<!-- FIGURE BEGIN -->
	<figure><img width="200" src="${image}"></figure>
	<!-- FIGURE END -->
	<aside>
		<span>SKU: ${item.sku.join(', ')}</span><span>Edition: ${item.edition}</span>
		<span>Game date: ${item.gameDate ? dateFormater.format(new Date(item.gameDate)) : 'Unknown date'}</span>
		<span>Category: <abbr title="${capitalizeString(item.category)}">${categories.get(item.category)}</abbr></span>
		<span>Type: <abbr title="${capitalizeString(item.type)}">${types.get(item.type)}</abbr></span>
		<span>Release date: ${item.releaseDate ? item.releaseDate.map((date) => dateFormater.format(new Date(date))).join(', ') : 'Unknown date'}</span>
		<span>Publisher: ${item.publisher.map((publisher) => capitalizeString(publisher)).join(', ')}</span>
	</aside>
</article>
`);
});

appendFileSync(FILE_PATH, '</main></body></html>');