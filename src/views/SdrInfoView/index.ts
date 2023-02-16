import type { RouterView } from '../../router/router';

import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { Router } from '../../router/router';
import { I18n } from '../../js/intl/translations';
import { registerShortcut } from '../../js/util/keyboard';

import style from './style.css?inline' assert { type: 'css' };

@customElement('sdr-view-app-info')
export class SdrViewAppInfo extends LitElement implements RouterView {
	static readonly styles = unsafeCSS(style);

	@state() private declare open: boolean;

	constructor() {
		super();

		this.open = false;

		registerShortcut('i', () => {
			this.open = !this.open;
		});
	}

	#close() {
		this.open = false;

		void Router.navigate('/');
	}

	navigate() {
		this.open = true;

		return I18n.t`Information`;
	}

	render() {
		return html`
			<sdr-dialog ?open="${this.open}" @close="${() => this.#close()}">
				<span slot="title">${I18n.t`Information`}</span>

				<details open>
					<summary>
						<h2>${I18n.t`Collection Organization`}</h2>
					</summary>
					<p>${I18n.t`The material here presented is organized into the following categories:`}</p>
					<dl>
						<dt>${I18n.t`Sourcebooks`}</dt>
						<dd>${I18n.t`These books are a mix of rules and setting. As such, they contain setting information applicable to any edition of the game, and statistics that may need a little updating.`}</dd>

						<dt>${I18n.t`Rulebooks`}</dt>
						<dd>${I18n.t`These books are primarily rules, and tend to be replaced quickly when a new edition of the game is released. They can be difficult to use with other editions.`}</dd>

						<dt>${I18n.t`Adventures & Campaigns`}</dt>
						<dd>${I18n.t`Missions, adventures and campaigns including the`} <em>${I18n.t`Shadowrun Missions`}</em> ${I18n.t`seasons and the`} <em>${I18n.t`Enhanced Fiction`}</em> ${I18n.t`series.`}</dd>

						<dt>${I18n.t`Novels`}</dt>
						<dd>${I18n.t`The romances written with the Sixth World as a base.`}</dd>

						<dt>${I18n.t`Magazines`}</dt>
						<dd>${I18n.t`Official (or semi-official) magazines published about the Shadowrun Universe.`}</dd>

						<dt>${I18n.t`Tabletop`}</dt>
						<dd>${I18n.t`Tabletop, boardgames and other physical games.`}</dd>

						<dt><abbr title="${I18n.t`Trade Card Game`}">${I18n.t`T.C.G.`}</abbr></dt>
						<dd>${I18n.t`Trading Card Games based on the Shadowrun universe.`}</dd>

						<dt>${I18n.t`Video Games`}</dt>
						<dd>${I18n.t`Video Games produced based on the Shadowrun universe.`}</dd>

						<dt>${I18n.t`Unofficial`}</dt>
						<dd>${I18n.t`Items that influenced the game and have a historical importance but are not official.`}</dd>

						<dt>${I18n.t`Misc.`}</dt>
						<dd>${I18n.t`Conversion sheets, April's fool jokes and other items that don't go on the other categories.`}</dd>
					</dl>
				</details>

				<details>
					<summary>
						<h2>${I18n.t`Search Options`}</h2>
					</summary>
					<p>${I18n.t`The search is done by tags, which follow the format:`} <code>${I18n.t`tag: term`}</code>${I18n.t`, where tag is one of the listed below.`}</p>
					<p>${I18n.t`The default search is by name, so you don't need the tag for it, but if you use more than one tag for searching you will need to specify the`} <code>name</code> ${I18n.t`tag to search by name.`}</p>

					<h2>${I18n.t`Tags list`}</h2>
					<dl>
						<dt>${I18n.t`Name`} (<code>name</code>)</dt>
						<dd>${I18n.t`The name of the material. Also the default search tag, if none is provided it will be used.`}</dd>

						<dt>${I18n.t`Category`} (<code>category</code>)</dt>
						<dd>${I18n.t`The category the material fits in, it is one of the categories listed above.`}</dd>

						<dt>${I18n.t`SKU`} (<code>sku</code>)</dt>
						<dd>${I18n.t`The`} <abbr title="${I18n.t`Stock Keeping Unit`}">${I18n.t`SKU`}</abbr> ${I18n.t`of the item, it's used also as an identifier as most of them are unique.`}</dd>

						<dt>${I18n.t`Edition`} (<code>edition</code>)</dt>
						<dd>${I18n.t`The edition of the publication, ranging from`} <code>1</code> ${I18n.t`to`} <code>6</code>.</dd>

						<dt>${I18n.t`Type`} (<code>type</code>)</dt>
						<dd>
							<p>${I18n.t`The availability of the material, based on how it is more easely found or it's "best" version is presented.`}</p>
							<p>${I18n.t`It may be one of the following:`}</p>
							<ul>
								<li><strong>${I18n.t`Digital`} (<code>digital</code>):</strong> ${I18n.t`It is available in natively digital format.`}</li>
								<li><strong>${I18n.t`Print`} (<code>print</code>):</strong> ${I18n.t`It is available in printed format only, not having a scan or a digital version.`}</li>
								<li><strong>${I18n.t`Scan`} (<code>scan</code>):</strong> ${I18n.t`It is a scan of a printed material. Usually in a not so good quality, or without OCR/searching.`}</li>
								<li><strong>${I18n.t`OCR`} (<code>ocr</code>):</strong> ${I18n.t`An OCR scan of the printed format or searchable PDF, it is usually good quality.`}</li>
								<li><strong>${I18n.t`Physical`} (<code>physical</code>):</strong> ${I18n.t`The material is only available in physical format other than a book (set of cards, boardgame, miniatures, etc.) that would not make sense to have it "scanned".`}</li>
							</ul>
						</dd>

						<dt>${I18n.t`Status`} (<code>status</code>)</dt>
						<dd>
							<p>${I18n.t`If the material is in the scope of a digital collection.`}</p>
							<p>${I18n.t`May be one of the following:`}</p>
							<ul>
								<li><strong>${I18n.t`Missing`} (<code>missing</code>):</strong> ${I18n.t`The item is missing from the collection.`}</li>
								<li><strong>${I18n.t`Out of scope`} (<code>outofscope</code>):</strong> ${I18n.t`The item is either physical, limited edition or unreleased so it's out of the scope of the collection.`}</li>
								<li><strong>${I18n.t`Canceled`} (<code>canceled</code>):</strong> ${I18n.t`The item was announced but then canceled. It is kept here for historical reasons.`}</li>
							</ul>
						</dd>
					</dl>
				</details>

				<details>
					<summary>
						<h2>${I18n.t`Material Files naming convension`}</h2>
					</summary>

					<p>${I18n.t`To have a file associated to an item in the collection when using the`} <em>${I18n.t`"Import Files"`}</em> ${I18n.t`option the file name have to be in the following convension:`}
					</p>

					<blockquote>
						<code>${I18n.t`sku`}</code> (<code>${I18n.t`modifier`}</code>) - <code>${I18n.t`name`}</code>.<code>${I18n.t`extension`}</code>
					</blockquote>

					<dl>
						<dt><code>${I18n.t`sku`}</code></dt>
						<dd>${I18n.t`The item's first published SKU, it is used as an unique identifier.`}</dd>

						<dt><code>${I18n.t`modifier`}</code> ${I18n.t`(optional)`}</dt>
						<dd>
							<p>${I18n.t`One optional modifier to diferentiate this file from the "main" file(s) for this item.`}</p>
							<p>${I18n.t`May be one of the following`}</p>
							<ul>
								<li><strong>${I18n.t`A (attechement)`}</strong>: ${I18n.t`An attachement like a map, handout or sound file.`}</li>
								<li><strong>${I18n.t`D (draft)`}</strong>: ${I18n.t`An extra draft that is (semi-)official and add content to the main material.`}</li>
								<li><strong>${I18n.t`E (errata)`}</strong>: ${I18n.t`An simple errata or revision of the material.`}</li>
								<li><strong>${I18n.t`T (translation)`}</strong>: ${I18n.t`An important translation with additional content or with significant differences from the main item.`}</li>
								<li><strong>${I18n.t`X (extra)`}</strong>: ${I18n.t`A miscelanious extra to the main item.`}</li>
							</ul>
						</dd>

						<dt><code>${I18n.t`name`}</code></dt>
						<dd>${I18n.t`The item's name.`}</dd>

						<dt><code>${I18n.t`extension`}</code></dt>
						<dd>${I18n.t`The item's file extension.`}</dd>
					</dl>
				</details>
			</sdr-dialog>
		`;
	}
}
