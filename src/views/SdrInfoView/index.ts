import type { RouterView } from '../../router/router';

import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { Router } from '../../router/router';
import { registerShortcut } from '../../js/util/keyboard';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-view-app-info')
export class SdrViewAppInfo extends LitElement implements RouterView {
	static readonly styles = unsafeCSS(style);

	@state() accessor #open = false;

	constructor() {
		super();

		registerShortcut('i', () => {
			this.#open = !this.#open;
		});

		// TODO: add gamepad navigation
	}

	#close() {
		this.#open = false;

		void Router.navigate('/');
	}

	navigate() {
		this.#open = true;

		return 'Information';
	}

	createRenderRoot() {
		return this;
	}

	render() {
		return html`
			<style>${SdrViewAppInfo.styles}</style>
			<sdr-dialog ?open="${this.#open}" @close="${() => this.#close()}">
				<span slot="title">Information</span>

				<details open>
					<summary><h3>Collection Organization</h3></summary>
					<p>The material here presented is organized into the following categories:</p>
					<dl>
						<dt>Sourcebooks</dt>
						<dd>These books are a mix of rules and setting. As such, they contain setting information applicable to any edition of the game, and statistics that may need a little updating.</dd>

						<dt>Rulebooks</dt>
						<dd>These books are primarily rules, and tend to be replaced quickly when a new edition of the game is released. They can be difficult to use with other editions.</dd>

						<dt>Adventures & Campaigns</dt>
						<dd>Missions, adventures and campaigns including the <em>Shadowrun Missions</em> seasons and the <em>Enhanced Fiction</em> series.</dd>

						<dt>Novels</dt>
						<dd>The romances written with the Sixth World as a base.</dd>

						<dt>$Magazines</dt>
						<dd>Official (or semi-official) magazines published about the Shadowrun Universe.</dd>

						<dt>Tabletop</dt>
						<dd>Tabletop, boardgames and other physical games.</dd>

						<dt><abbr title="Trade Card Game">T.C.G.</abbr></dt>
						<dd>Trading Card Games based on the Shadowrun universe.</dd>

						<dt>Video Games</dt>
						<dd>Video Games produced based on the Shadowrun universe.</dd>

						<dt>Unofficial</dt>
						<dd>Items that influenced the game and have a historical importance but are not official.</dd>

						<dt>Misc.</dt>
						<dd>Conversion sheets, April's fool jokes and other items that don't go on the other categories.</dd>
					</dl>
				</details>

				<details>
					<summary><h3>Search Options</h3></summary>
					<p>The search is done by tags, which follow the format: <code>tag: term</code>, where tag is one of the listed below.</p>
					<p>The default search is by name, so you don't need the tag for it, but if you use more than one tag for searching you will need to specify the <code>name</code> tag to search by name.</p>

					<h4>Tags list</h4>
					<dl>
						<dt>Name (<code>name</code>)</dt>
						<dd>The name of the material. Also the default search tag, if none is provided it will be used.</dd>

						<dt>Category (<code>category</code>)</dt>
						<dd>The category the material fits in, it is one of the categories listed above.</dd>

						<dt>SKU (<code>sku</code>)</dt>
						<dd>The <abbr title="Stock Keeping Unit">SKU</abbr> of the item, it's used also as an identifier as most of them are unique.</dd>

						<dt>Edition (<code>edition</code>)</dt>
						<dd>The edition of the publication, ranging from <code>1</code> to <code>6</code>.</dd>

						<dt>Type (<code>type</code>)</dt>
						<dd>
							<p>The availability of the material, based on how it is more easely found or it's "best" version is presented.</p>
							<p>It may be one of the following:</p>
							<ul>
								<li><strong>Digital (<code>digital</code>):</strong> It is available in natively digital format.</li>
								<li><strong>Print (<code>print</code>):</strong> It is available in printed format only, not having a scan or a digital version.</li>
								<li><strong>Scan (<code>scan</code>):</strong> It is a scan of a printed material. Usually in a not so good quality, or without OCR/searching.</li>
								<li><strong>OCR (<code>ocr</code>):</strong> An OCR scan of the printed format or searchable PDF, it is usually good quality.</li>
								<li><strong>Physical (<code>physical</code>):</strong> The material is only available in physical format other than a book (set of cards, boardgame, miniatures, etc.) that would not make sense to have it "scanned".</li>
							</ul>
						</dd>

						<dt>Status (<code>status</code>)</dt>
						<dd>
							<p>If the material is in the scope of a digital collection.</p>
							<p>May be one of the following:</p>
							<ul>
								<li><strong>Missing (<code>missing</code>):</strong> The item is missing from the collection.</li>
								<li><strong>Out of scope (<code>outofscope</code>):</strong> The item is either physical, limited edition or unreleased so it's out of the scope of the collection.</li>
								<li><strong>Canceled (<code>canceled</code>):</strong> The item was announced but then canceled. It is kept here for historical reasons.</li>
							</ul>
						</dd>
					</dl>
				</details>

				<details>
					<summary><h3>Material Files naming convension</h3></summary>

					<p>To have a file associated to an item in the collection when using the <em>"Import Files"</em> option the file name have to be in the following convension:
					</p>

					<blockquote>
						<code>sku</code> (<code>modifier</code>) - <code>name</code>.<code>extension</code>
					</blockquote>

					<dl>
						<dt><code>sku</code></dt>
						<dd>The item's first published SKU, it is used as an unique identifier.</dd>

						<dt><code>modifier</code> (optional)</dt>
						<dd>
							<p>One optional modifier to diferentiate this file from the "main" file(s) for this item.</p>
							<p>May be one of the following</p>
							<ul>
								<li><strong>A (attechement)</strong>: An attachement like a map, handout or sound file.</li>
								<li><strong>D (draft)</strong>: An extra draft that is (semi-)official and add content to the main material.</li>
								<li><strong>E (errata)</strong>: An simple errata or revision of the material.</li>
								<li><strong>T (translation)</strong>: An important translation with additional content or with significant differences from the main item.</li>
								<li><strong>X (extra)</strong>: A miscelanious extra to the main item.</li>
							</ul>
						</dd>

						<dt><code>name</code></dt>
						<dd>The item's name.</dd>

						<dt><code>extension</code></dt>
						<dd>The item's file extension.</dd>
					</dl>
				</details>
			</sdr-dialog>
		`;
	}
}
