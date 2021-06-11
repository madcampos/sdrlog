export const publishers = new Map([
	['Heyne Verlag', 'heyne'],
	['Fantasy Productions', 'fanpro'],
	['other', 'other'],
	['Catalyst Game Labs', 'catalyst'],
	['FASA Corporation', 'fasa'],
	['unofficial', 'unofficial'],
	['WizKids Games', 'wizkids'],
	['Pegasus Spiele', 'pegasus'],
	['Cliffhanger Productions', 'clifhanger'],
	['Harebrained Schemes', 'harebrained']
]);

// FIXME: remove comment after this is available/merged: https://github.com/microsoft/TypeScript/pull/44022
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
const getLangName = new Intl.DisplayNames(['en'], { type: 'language' }) as { of(lang: string): string };

export const languages = new Map([
	['de-DE', `🇩🇪 ${getLangName.of('de')}`],
	['fr-FR', `🇫🇷 ${getLangName.of('fr')}`],
	['jp-JP', `🇯🇵 ${getLangName.of('JPN')}`],
	['es-ES', `🇪🇸 ${getLangName.of('es')}`],
	['hu-HU', `🇭🇺 ${getLangName.of('hu')}`],
	['it-IT', `🇮🇹 ${getLangName.of('it')}`],
	['pt-BR', `🇧🇷 ${getLangName.of('pt')}`],
	['cs-CZ', `🇨🇿 ${getLangName.of('cs')}`],
	['he-IL', `🇮🇱 ${getLangName.of('he')}`],
	['pl-PL', `🇵🇱 ${getLangName.of('pl')}`],
	['fi-FI', `🇫🇮 ${getLangName.of('fi')}`],
	['en-US', `🇺🇸 ${getLangName.of('en')}`]
]);

export const categories = new Map([
	['novel', '📚 Novel'],
	['sourcebook', '📜 Sourcebook'],
	['mission', '🗺️ Mission'],
	['rulebook', '📝 Rulebook'],
	['misc', '🔣 Misc.'],
	['magazine', '📰 Magazine'],
	['boardgame', '♟️ Boardgame'],
	['videogame', '🎮 Videogame'],
	['tcg', '🃏 T.C.G.'],
	['unofficial', '📓 Unofficial']
]);

export const types = new Map([
	['digital', '💽 Digital'],
	['scan', '📠 Scan'],
	['print', '🖨️ Print'],
	['physical', '🎲 Physical']
]);

export const status = new Map([
	['ok', '✔️ OK'],
	['missing', '❌ Missing'],
	['outofscope', '⛔ Out of scope'],
	['canceled', '🚫 Canceled']
]);

export default `
<modal-dialog>
	<edit-box id="name" slot="title" placeholder="Item name"></edit-box>

	<header>
		<edit-list id="sku" open>
			<span slot="label">SKU</span>
			<input slot="input"/>
		</edit-list>

		<edit-box id="edition" type="number" min="1" max="6" step="1">
			<span slot="label">Edition</span>
		</edit-box>

		<edit-box type="date" id="gamedate">
			<span slot="label">Game date</span>
		</edit-box>

		<edit-select id="category">
			<span slot="label">Category</span>

			${[...categories.entries()].map(([value, name]) => `<option value="${value}">${name}</option>`).join('\n')}
		</edit-select>

		<edit-select id="type">
			<span slot="label">Type</span>

			${[...types.entries()].map(([value, name]) => `<option value="${value}">${name}</option>`).join('\n')}
		</edit-select>

		<edit-select id="language">
			<span slot="label">Original Language</span>

			${[...languages.entries()].map(([value, name]) => `<option value="${value}">${name}</option>`).join('\n')}
		</edit-select>

		<edit-list id="releasedate" open>
			<span slot="label">Release date</span>
			<input slot="input" type="date"/>
		</edit-list>

		<edit-list id="publisher" open>
			<span slot="label">Publisher</span>

			<select slot="input">

			${[...publishers.entries()].map(([value]) => `<option>${value}</option>`).join('\n')}
			</select>
		</edit-list>

		<edit-select id="status" hidden>
			<span slot="label">Status</span>

			${[...status.entries()].map(([value, name]) => `<option value="${value}">${name}</option>`).join('\n')}
		</edit-select>
	</header>

	<aside>
		<edit-list id="names">
			<span slot="label">Names published</span>

			<select slot="input">
				${[...languages.entries()].map(([value, name]) => `<option value="${value}">${name}</option>`).join('\n')}
			</select>

			<input slot="input"/>
		</edit-list>

		<edit-list id="files" hidden>
			<span slot="label">Files</span>
			<input slot="input"/>
		</edit-list>

		<edit-list id="links">
			<span slot="label">Online links</span>
			<input slot="input"/>
		</edit-list>
	</aside>

	<figure>
			<img
				width=""
				id="cover"
				decoding="async"
				loading="lazy"
				role="presentation"
				src="/img/covers/fallback.svg"
			/>
	</figure>

	<article>
		<edit-text id="notes">
			<span slot="label">Notes</span>
		</edit-text>

		<edit-text id="description">
			<span slot="label">Description</span>
		</edit-text>
	</article>
	<footer>
		<button id="edit">✏️ Edit</button>
		<button hidden id="save">💾 Save</button>
	</footer>
</modal-dialog>
`;
