export default `
<details open>
	<summary>Collection Organization</summary>
	<p>The material here presented is organized into the following categories:</p>
	<dl>
		<dt>Sourcebooks</dt>
		<dd>These books are a mix of rules and setting. As such, they contain setting information applicable to any edition of the game, and statistics that may need a little updating.</dd>
		<dt>Rulebooks</dt>
		<dd>These books are primarily rules, and tend to be replaced quickly when a new edition of the game is released. They can be difficult to use with other editions.</dd>
		<dt>Adventures &amp; Campaigns</dt>
		<dd>Missions, adventures and campaigns including the <em>Shadowrun Missions</em> seasons and the <em>Enhanced Fiction</em> series.</dd>
		<dt>Novels</dt>
		<dd>The romances written with the Sixth World as a base.</dd>
		<dt>Magazines</dt>
		<dd>Magazines (Official and unofficial) published about the Shadowrun Universe.</dd>
		<dt>Tabletop</dt>
		<dd>Tabletop, boardgames, <abbr title="Trade Card Game">TCG</abbr> and other physical games.</dd>
		<dt>Video-games</dt>
		<dd>Video-games produced based on the Shadowrun universe.</dd>
		<dt>Misc. Itens</dt>
		<dd>Conversion sheets, April's fool jokes and other items that don't go on the other categories.</dd>
	</dl>
</details>
<details>
	<summary>Search Options</summary>
	<p>The search is done by tags, in the form: <code>tag: term</code>, where tag is one of the listed below with the respective terms if they exist.</p>
	<p>The default search is by name, so you don't need the tag for it, but if you use more than one tag for searching you will need to specify the <code>name</code> tag to search by name.</p>
	<h2>Tags</h2>
	<dl>
		<dt>Name (<code>name</code>)</dt>
		<dd>The name of the material. Also the default search tag, if none is provided it will be used.</dd>
		<dt>Category (<code>category</code> / <code>cat</code>)</dt>
		<dd>
			<p>The category the material fits in, it (almost) follows the folder organization proposed in the wikipedia article of Shadowrun books.</p>
			<p>It may be one of the following:</p>
			<ul>
				<li><strong>Rulebook:</strong> A book containing mostly rules that are compatible with only one edition of the game.</li>
				<li><strong>Sourcebook:</strong> A book containing settings, plot hooks and other stuff that is mostly background information, not rules.</li>
				<li><strong>Mission:</strong> A book containing information to be used on an adventure or campaign.</li>
				<li><strong>Magazine:</strong> A magazine publication with assosrted content.</li>
				<li><strong>Novel:</strong> A fictin book writen based on the Shadowrun universe.</li>
				<li><strong>Unofficial:</strong> Fan made publication specific for Shadowrun.</li>
				<li><strong>Videogame:</strong> Digital game setted in the Shadowrun world.</li>
				<li><strong>TCG:</strong> Trade Card Game based on the Shadowrun universe.</li>
				<li><strong>Boardgame:</strong> A boardgame or other physical game that is setted in the Shadowrun universe.</li>
				<li><strong>Miscellaneous (Misc.):</strong> Assorted matterials that don't fit in any of the above categories.</li>
			</ul>
		</dd>

		<dt>SKU (<code>sku</code>)</dt>
		<dd>The <abbr title="Stock Keeping Unit">SKU</abbr> of the item, it's used also as an identifier. Most of them are unique.</dd>

		<dt>Edition (<code>edition</code>)</dt>
		<dd>The edition of the publication, ranging from <code>1</code> to <code>5</code>.</dd>

		<dt>Type (<code>type</code>)</dt>
		<dd>
			<p>The availability of the material, based on how it is easily found.</p>
			<p>It may be one of the following:</p>
			<ul>
				<li><strong>Digital:</strong> The material is available in digital format.</li>
				<li><strong>Print:</strong> The material is available in printed format only.</li>
				<li><strong>Scan:</strong> The material is a scan of the printed format.</li>
				<li><strong>OCR:</strong> The material is a OCR scan of the printed format.</li>
				<li><strong>Physical:</strong> The material is only available in physical format other than a book (TCG, boardgame, etc.).</li>
			</ul>
		</dd>

		<dt>Status (<code>status</code>)</dt>
		<dd>
			<p>If the material is in the scope of a digital collection.</p>
			<p>May be one of the following:</p>
			<ul>
				<li><strong>Missing (<code>missing</code>):</strong> The item is missing from the collection.</li>
				<li><strong>Out of scope (<code>outofscope</code>):</strong> The item is either physical, limited edition or unreleased so it's out of the scope of the collection.</li>
				<li><strong>Canceled (<code>canceled</code>):</strong> The item was announced but then canceled.</li>
			</ul>
		</dd>
	</dl>
</details>
`;
