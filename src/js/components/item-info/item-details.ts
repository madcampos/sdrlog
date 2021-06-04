const dateFormater = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC', year: 'numeric' });
const sorter = new Intl.Collator('en-US', { caseFirst: 'upper', numeric: true, sensitivity: 'accent' });

const capitalizeString = ([first, ...other]: [string, string[]]) => `${first.toUpperCase()}${other.join('')}`;

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

const template = `<div id="item-details-content">
<header class="metadata">
	<span>SKU: <span id="item-details-sku"></span></span>
	<span>Edition: <span id="item-details-edition"></span></span>
	<span>Game date: <span id="item-details-gamedate"></span></span>
	<span id="item-details-category">Category: <abbr title=""></abbr></span>
	<span id="item-details-type">Type: <abbr title=""></abbr></span>
	<span>Release date: <span id="item-details-releasedate"></span></span>
	<span id="item-details-publisher">Publisher: <abbr title=""><img alt=""/></abbr></span>
	<!-- TODO: work on files? -->
	<!-- <details id="item-details-files">
		<summary>Files</summary>
		<ul>
			<li>
				<a class="item-details-file" href="">
					<img class="item-details-file-mime" src="">
					<span class="item-details-file-name"></span>
					<span class="item-details-file-size"></span>
				</a>
			</li>
		</ul>
	</details> -->
</header>
<figure class="image">
		<img alt="" id="item-details-image"/>
</figure>
<article class="content">
	<p id="item-details-notes"></p>
	<pre id="item-details-description"></pre>
</article>

</div>`;
