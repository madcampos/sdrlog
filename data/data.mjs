/* eslint-disable max-lines */
/**
 * @file Data about materials.
 * @author madcampos <madcampos@outlook.com>
 * @version 1.0.0
 */

/*
Add materials:
https://www.rpggeek.com/rpgitem/303831/der-almanach-sonderpublikation-zum-gratisrollenspi

Sources to check:
https://shadowiki.de/Liste_der_Shadowrun_Romane
https://shadowiki.de/Liste_der_Quellen-_und_Regelbücher
https://shadowiki.de/Liste_der_Abenteuer-_und_Kampagnenbände
https://www.shadowiki.de/Kategorie:Quellen_(Kurzgeschichten)
https://shadowhelix.de/Kategorie:Quellen_(Gratis)
https://www.shadowiki.de/Kategorie:Quellen_(Online)
https://www.shadowrunsixthworld.com/
https://www.drivethrurpg.com/browse.php?filters=1700_0_0_0_0

***REMOVED***
***REMOVED***
*/

/**
 * The format the material on this collection are organized.
 *
 * @typedef {object} Material
 * @property {("rulebook"|"sourcebook"|"mission"|"magazine"|"novel"|"videogame"|"tcg"|"boardgame"|"misc")} category The category the material fits in, it (almost) follows the folder organization proposed in the wikipedia article of Shadowrun books. It may be one of the following:
 * - **Rulebook**: A book containing mostly rules that are compatible with only one edition of the game.
 * - **Sourcebook**: A book containing settings, plot hooks and other stuff that is mostly background information, not rules.
 * - **Mission**: A book containing information to be used on an adventure or campaign.
 * - **Magazine**: A magazine publication with assosrted content.
 * - **Novel**: A fiction book writen based on the Shadowrun universe.
 * - **Videogame**: Digital game setted in the Shadowrun world.
 * - **TCG**: Trade Card Game based on the Shadowrun universe.
 * - **Boardgame**: A boardgame or other physical game that is setted in the Shadowrun universe.
 * - **Miscellaneous**: Assorted matterials that don't fit in any of the above categories.
 *
 * @property {("digital"|"print"|"scan"|"ocr"|"physical")} type The type of the material. It may be one of the following:
 * - **Digital**: The material is available primarily in digital format.
 * - **Print**: The material is available in printed format only.
 * - **Scan**: The material is available as a low quality (non OCR) scan of the printed format.
 * - **OCR**: The material is a OCR scan of the printed format, usually smaller in size and with better quality.
 * - **Physical**: The material is only available in a physical format other than a book (Eg.: TCG, boardgame, etc.).
 *
 * @property {string[]} sku The numbers that identifies the material within the publishers, some may be infered or unofficial.
 *
 * @property {string} name The original name of the material.
 *
 * @property {object} [names] A list with translated names for the material, in the format: `'<ISO code>': '<name>'`.
 *
 * **Note:** Some materials are released in multiple languages but have significant changes from the base material, so they are listed separataly.
 *
 * @property {string} description A description or synopsis of the material.
 *
 * @property {number} edition The edition of the publication, ranging from `1` to `6`.
 *
 * @property {string[]} publisher A list of enterprises who published the material.
 *
 * @property {string} [gameDate] The in game date of the material.
 *
 * @property {string[]} [releaseDate] The date the material was released and it's rereleases. If not present the material is considered unreleased.
 *
 * @property {("missing"|"outofscope"|"canceled")} [status] The status of the item, one of the following:
 * - **Missing**: The item is not present on the archives.
 * - **Out of Scope**: The item is not available or is really hard to obtain and don't add anything new.
 * - **Canceled**: The item was canceled.
 *
 * @property {string} [originalLanguage] The original language the material was released.
 *
 * @property {string} [notes] Some notes about the material, used to explain the status or reasonig for the material.
 */

/** @type {Material[]} */
export default [
	{
		category: 'rulebook',
		description: 'The year is 2072. Magic has returned and creatures of myth and legend walk among us as megacorps bleed the world dry. You’re a shadowrunner—a deniable asset, a corporate pawn—using bleeding-edge science and magic to make your meat body and mind better-than-flesh. Stay on the edge, and you may survive another run on the mean sprawl streets.',
		edition: 4,
		gameDate: '2070',
		name: 'Shadowrun 4th Edition',
		names: {
			'de-DE': 'Shadowrun Version 4.01D',
			'fr-FR': 'Shadowrun Quatrième Édition',
			'jp-JP': 'シャドウラン 4th Edition'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Fantasy Productions',
			'Catalyst Game Labs',
			'Black Book Editions',
			'新紀元社'
		],
		releaseDate: [
			'2005-10',
			'2006-06',
			'2007-06-04',
			'2008-02'
		],
		sku: [
			'26000',
			'26001',
			'23000',
			'23000S',
			'SR01'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: "The Shadows Have Evolved\n\nThe year is 2070. The world is not only Awakened—-it's wired. Cyber and bioware implants make your meat body better-than-flesh, while the wireless Matrix enhances your perceptions with hyper-real senses. Deals are made in steel and lead more often than gold or nuyen; success and failure live only a razor's edge apart. Creatures of myth and legend walk the streets, while the arcane skills of spellslingers are in high demand. Above it all, monolithic megacorps bleed the world dry, sabotaging each other in covert cutthroat competition as they go to war over the bottom line.\n\nYou're a shadowrunner, a street operative, scratching out a living on the mean sprawl streets. You may be human, elf, dwarf, ork or troll. From lethal street samurai to well-connected info brokers, spell-slinging mages or code-cracking hackers. No matter what, you're a professional corporate pawn or \"deniable asset,\" you get the job done.\n\nShadowrun, Fourth Edition offers a completely new rules system that is simple, integrated and accessible. The state-of-the-art has also been advanced, introducing a new level of augmented reality, new gear, new magical discoveries, and more.\n\nThis hardcover rulebook contains all the rules gamemasters and players need to create characters and ongoing adventures set in the popular Shadowrun universe. Note that the Shadowrun, Fourth Edition will replace the Shadowrun, Third Edition rules set. Source material from previous editions will still be compatible.",
		edition: 4,
		gameDate: '2070-08',
		name: 'Augmentation',
		names: {
			'de-DE': 'BodyTech',
			'fr-FR': 'Augmentations',
			'jp-JP': 'ーグメンテーショオン'
		},
		notes: 'The German "Bodytech" contains the latest errata for "augmentation" as well as 5 additional cybersuites (which are twice as many as in the original).',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Black Book Editions',
			'新紀元 社',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2008-08-23',
			'2009-01',
			'2011'
		],
		sku: [
			'26002A',
			'46010',
			'SR08'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: "Street Magic is the advanced magic rulebook for Shadowrun, Fourth Edition. It provides background details on everything known to magic in the year 2070, from the nature of mana and astral space to and its effects on society and the Awakened. It also covers a few things that aren't known - or at least understood - such as the metaplanes and hostile spirits. It also contains advanced rules for magic traditions and groups, initiation and metamagic, enchanting, and new spells and adept powers.",
		edition: 4,
		gameDate: '2070-04',
		name: 'Street Magic',
		names: {
			'de-DE': 'Straßenmagie',
			'fr-FR': 'La Magie des Ombres',
			'jp-JP': 'ストリート・マジック'
		},
		notes: 'The German 2nd edition has an aditional translation of "Digital Grimoire".',
		originalLanguage: 'en-US',
		publisher: [
			'Fantasy Productions',
			'Catalyst Game Labs',
			'Black Book Editions',
			'新紀元社',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2006-06',
			'2008-08',
			'2009',
			'2007-09-05'
		],
		sku: [
			'26001',
			'26004',
			'23005',
			'46035',
			'SR06'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "[Tommy Talon Series No.#3] Boston Metroplex - Low-level programmer Roy Kilaro wants nothing more but to become a Seraphim, an elite corporation operative, and experience some real live action in the shadow ops between megacorporations. He gets more than he ever wanted when a routine business trip to Boston lands him at ground zero of a running battle for survival. The combatants: a group of hardened 'runners trying to finish a job, the ruthless anti-elven terrorist group known as the Knights of the Red Branch, and a powerful sorceress who wants revenge upon them all...",
		edition: 2,
		gameDate: '2061',
		name: 'The Burning Time',
		names: {
			'de-DE': 'Zeit in Flammen'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Heyne Verlag'
		],
		releaseDate: [
			'2001',
			'2002'
		],
		sku: [
			'5839',
			'27824'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "There's a new \"drug\" on the streets, promising a phenomenal--and deadly--high. But this time the dealers aren't selling a substance. They're working with a creature called a \"corpse light\"--a creature of pure magic that gives the customer a euphoric rush...as it drains the poor sap's life away.\nRomulus was the first to see this new scourge in action. As a shapeshifter, he's a freelance agent to the Lone Star police department. His wolfish strength and sense of smell keep him useful--and keep from being admitted into the regular force. So when Jane, a beautiful, amnesiac woman, is caught in a dangerous web with the dealers, there's no way for Romulus to be assigned to the investigation. But that won't stop him from trying to save her, and to discover how she is tied into this case...",
		edition: 3,
		gameDate: '2060',
		name: 'The Forever Drug',
		names: {
			'de-DE': 'Das neunte Leben'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1999-06',
			'2004-02'
		],
		sku: [
			'5749',
			'27823'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "[Tommy Talon Series No.#1] In the magical world of 2060, street mage Tommy Talon has hit the big time. He's a member of Assets, Inc., one of the best shadow-teams in the business, but now he's drawn back to his home town of Boston by secrets from his past. Secrets that lead him into conflicts with megacorporations, yakuza gangsters, and a powerful spirit that's hunting for him.\nTalon must call on all of his magical powers and the abilities of his shadowrunning friends to unravel the mystery. Along the way, he finds out some unexpected things about his past, himself, and his true enemy: someone very close to him indeed...",
		edition: 3,
		gameDate: '2060',
		name: 'Crossroads',
		names: {
			'de-DE': 'Am Kreuzweg'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1999-04',
			'2003-06'
		],
		sku: [
			'5742',
			'27818'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "When a shadowrunner managed to extract PCI's most vital employee, it was Alma's job as security expert to get him back--no matter the cost. But all the evidence pointed to the one person who couldn't have done it...herself. Branded a traitor, Alma has one shot at redemption: find the real culprit. But she's never faced an enemy like this one.\nThis 'runner not only looks like Alma--she's also equipped with Alma's top-of-the-line cybernetic implants, and she's backed by the powerful magic of the Chinese underworld. Now, the expert in defense must attack--and risk it all to bring down a rival so much like herself that there can be only one shocking explanation...",
		edition: 3,
		gameDate: '2062',
		name: 'Tails You Lose',
		names: {
			'de-DE': 'Kopf oder Zahl'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'2001-02',
			'2003-06'
		],
		sku: [
			'5819',
			'27825'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "[Tommy Talon Series No.#2] In the twenty-first century, magic brings out the best in people--and the worst. Tommy Talon should know. As head of a successful shadow-running team, it's the dark side of people that brings him business. This time he's hired to hunt a murderous archaeologist and recover a magical relic. But Talon's not hunting alone.\nSomeone else wants the artifact too--someone very powerful. And Talon and his team must outwit the world's most potent megacorporation on its own turf if they're to have any chance of returning the treasure--or any chance of returning at all...",
		edition: 3,
		gameDate: '2061',
		name: 'Ragnarock',
		names: {
			'de-DE': 'Ragnarock'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'2000-02',
			'2001',
			'2003-06'
		],
		sku: [
			'5775',
			'27822'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: "The 32 page Contacts and Adventures booklet, which features a variety of NPCs with complete stats; over 30 plot hooks covering a wide range of shadowrunning possibilities; the SR3 to SR4 character conversion rules, and two pages of additional tables that we couldn't squeeze onto the GM Screen itself.",
		edition: 4,
		gameDate: '2070',
		name: 'Contacts & Adventures',
		names: {
			'de-DE': 'Connections & Szenarien',
			'fr-FR': 'Contacts & aventures\u200e'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Fantasy Productions',
			'Black Book Editions'
		],
		releaseDate: [
			'2006-03',
			'2007'
		],
		sku: [
			'26002X',
			'23002X',
			'SR02X'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: "All the important Shadowrun info you need, free!\nDon't spend time flipping through a book to find the tables you need. When you're on a run, time matters, and this PDF version of the Shadowrun GM Screen gets you that info, fast!",
		edition: 4,
		gameDate: '2070',
		name: "Game Master's Screen - Aniversary Edition",
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2011-08-17'],
		sku: ['26100X'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: "The year is 2072. Magic has returned and creatures of myth and legend walk among us as megacorps bleed the world dry. You're a shadowrunner—a deniable asset, a corporate pawn—using bleeding-edge science and magic to make your meat body and mind better-than-flesh. Stay on the edge, and you may survive another run on the mean sprawl streets.\nShadowrun, Fourth Edition offers a completely new rules system that is simple, integrated, and accessible. The state-of-the-art has also been advanced, introducing a new level of augmented reality, new gear, and new magical discoveries. This full-color rulebook contains all the rules gamemasters and players need to create characters and ongoing adventures set in the popular Shadowrun universe.\nShadowrun, Fourth Edition 20th Anniversary Core Rulebook is fully compatible with all Shadowrun, Fourth Edition books.",
		edition: 4,
		gameDate: '2072',
		name: 'Shadowrun 4th Edition - 20th Anniversary Core Book',
		names: {
			'de-DE': 'Shadowrun Grundregelwerk 4. Edition',
			'fr-FR': 'Shadowrun Édition 20e anniversaire',
			'jp-JP': 'シャドウラン 20th Anniversary Edition'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele',
			'Black Book Editions',
			'新紀元社'
		],
		releaseDate: [
			'2009-03-12',
			'2009-09-03',
			'2010',
			'2012-09-10'
		],
		sku: [
			'2600A',
			'2600LE',
			'SRA01',
			'45000'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: "Nobody Knows All Magic\n\nDigital Grimoire is the Master's Class of Magic--expanding on Street Magic, it details additional traditions, magical groups & threats, spirits, enchanting expansions, and a handful of new spells and adept powers. Traditions: Egyptian, Rastafarian, Psionic Magical Groups: Shrine of the Southern Winds, The Oxford Grand Lodge, Código 515 Magical Threats: Toxic Paths, Shadow Spirits, Insect Spirits Digital Grimoire is 18 pages (including cover): a bite-sized expansion to Shadowrun, Fourth Edition and Street Magic.",
		edition: 4,
		gameDate: '2070',
		name: 'Digital Grimoire',
		names: {
			'fr-FR': 'Grimoire numérique'
		},
		notes: 'The German edition of Street Magic incorporates the translation of Digital Grimoire.',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Black Book Editions'
		],
		releaseDate: [
			'2008-11-15',
			'2011-05-18'
		],
		sku: ['26600'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Hiding from the Heat \n\nIf it hasn’t happened to you yet, it will. A run will go south. People will be looking for you. Their eyes will be everywhere—your home, your friends’ houses, the places you hang out, even the spots where you buy your soykaf. They’re looking for you, waiting for you, and when they find you, they’re not going to talk. It’ll be a single shot, or a flash of sharp steel, and you’ll be done.\nTo avoid this, you need to lay low. You need a place where no one will look for you, and where you’ll have enough of life’s basics to get you by. Don’t know where to find such a place? You’re in luck, chummer—we’ve got the guide for you. Whether your acquiring and stocking your own bolt hole or engaging professional safehouse managers, we’ve got the info you need to live to fight another day.',
		edition: 4,
		gameDate: '2074-08',
		name: 'Safehouses',
		names: {
			'de-DE': 'Safehouses - Wenn der Boden zu heiß wird'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2012-02-15',
			'2012-08-18'
		],
		sku: ['26S013'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'Life in the shadows has never been as dangerous, and runners need every edge they can get. Runner’s Companion opens up a world of expanded options for Shadowrun players with dozens of New Qualities, Advanced Contact and Lifestyle Rules, and handy tips on running, travelling and smuggling, and operating in a surveillance society.',
		edition: 4,
		gameDate: '2071-07',
		name: "Runner's Companion",
		names: {
			'de-DE': 'Runnerkompendium',
			'fr-FR': 'Le Guide du runner',
			'jp-JP': 'ランナーズ·コンパニオン'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele',
			'Black Book Editions',
			'新紀元 社'
		],
		releaseDate: [
			'2008-08-20',
			'2009-10-22',
			'2015-04-30'
		],
		sku: [
			'26005A',
			'46030',
			'SR13'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: "The Shadowrun, Fourth Edition Gamemaster's Screen & Contacts and Adventures booklet eBook version contains the following documents:\nThe 32 page Contacts and Adventures booklet, which features a variety of NPCs with complete stats; over 30 plot hooks covering a wide range of shadowrunning possibilities; the SR3 to SR4 character conversion rules, and two pages of additional tables that we couldn't squeeze onto the GM Screen itself.\nThe full GM Screen, front and back, in one giant 33 by 11 inch file.\nAll four panels of the GM Screen, plus the two pages of tables from the Contacts & Adventures booklet, in easily printed pages formatted for Letter sized paper.",
		edition: 4,
		gameDate: '2070',
		name: "Game Master's Screen 4th Edition",
		names: {
			'de-DE': 'Spielleiterschirm Vierte Edition',
			'fr-FR': 'Écran du MJ Quatrième édition'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Fantasy Productions',
			'Black Book Editions'
		],
		releaseDate: [
			'2006-03',
			'2007'
		],
		sku: [
			'26002',
			'23002',
			'SR02'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'HACK THE PLANET!\n\nUnwired is the advanced Matrix rulebook for Shadowrun, Fourth Edition. For everyday users, it explains how the Matrix works in easy-to-understand terms, and provides new software, qualities, and gear. For hackers and technomancers, it introduces new hacking tricks, malware, echoes, and sprites. It also covers system security and new Matrix phenomenon, from AIs to the resonance realms.Unwired contains everything players and gamemasters need for exploring the Matrix in Shadowrun.',
		edition: 4,
		gameDate: '2071-05',
		name: 'Unwired',
		names: {
			'de-DE': 'Vernetzt',
			'fr-FR': 'Unwired - matrice 2.0',
			'jp-JP': 'アンワイアード'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele',
			'Black Book Editions',
			'新紀元社'
		],
		releaseDate: [
			'2008-07-29',
			'2008-06-21',
			'2009-04',
			'2010-03',
			'2014-10-31'
		],
		sku: [
			'26004',
			'45000',
			'SR12'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'When corpsec is raining lead down on your position, a wardrobe malfunction will get you dead. To survive against gangs, syndicates, and megacorps, shadowrunners need the best gear they can make, buy, or steal.\nArsenal covers everything a runner team needs, from weapons and armor to advanced electronics and spy toys to the latest state-of-the-art drones. It also covers the intricacies of the black market and drug trade and provides advanced rules for combat and martial arts, mixing your own chemicals and explosives, and modifying your weapons and vehicles.',
		edition: 4,
		gameDate: '2071-04',
		name: 'Arsenal',
		names: {
			'de-DE': 'Arsenal 2070',
			'fr-FR': 'Arsenal',
			'jp-JP': 'アーセナル'
		},
		notes: 'The German edition has aditional equipamente regarding the ADL.',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Black Book Editions',
			'新紀元 社',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2008-08',
			'2009',
			'2011-06',
			'2013-07-13'
		],
		sku: [
			'26003A',
			'SR11'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "Argent is the best shadowrunner in the biz...with one flaw: he's got a conscience. That's why he can't leave a chummer hanging. Only Andi Sencio is more than just a friend. She's his former partner--and lover. And now she's in the deepest drekpot of her life. Heading an op on a datasnatch turned bad, she's been stranded by the megacorp she works for--and targeted for flatlining by two more. Unless Argent gets to her first...\nRecruiting a top-notch team for the exfiltration shadowrun, Argent is risking it all--his money, his reputation, and his life--for the woman who once walked away from him. It's suicide mission through high-caliber hell. But that's never stopped the steel-armed, street samurai before...",
		edition: 3,
		gameDate: '2060',
		name: 'Run Hard, Die Fast',
		names: {
			'de-DE': 'Runner sterben schnell'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1999-02',
			'2001',
			'2003-06'
		],
		sku: [
			'5741',
			'27835'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "Jacked-In, Revved-Up, And Armed To The Teeth\nIt's fast and furious inside the Combat Biker maze, where armor-plated hogs and juiced-up rice grinders blast, pound, and pummel each other for points. But it's just barely up to speed for Jonathon and Tamara, two elven bikers at the head of the Los Angeles Sabers. With a simsense link between them that allows them to act virtually as one, they're been tearing up the league and making headlines.\nBut all that changes when Tamara takes a brutal hit from the cyberspurs of Dougan Rose, lead linebiker for the New Orleans Buzzsaws and the most respected player in the league. When Tamara gets slammed, Jonathon's out for revenge. But it isn't going to be easy. Because there's a lot more to this sabotage than meets the eye - and if the megacorp agents, simsense industry operatives, and hostile mages don't kill him, the truth probably will...",
		edition: 2,
		gameDate: '2057',
		name: 'Dead Air',
		names: {
			'de-DE': 'Funkstille'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Heyne Verlag'
		],
		releaseDate: ['1996-10'],
		sku: [
			'5542',
			'27810'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "When ace shadowrunner Jack Skater leads his team of commandos in a raid on an elven ocean freighter, things get a little sticky. Yakuza hitmen crash the party, and a Japanese shaman whips up a titanic sea creature just to make sure nobody gets out alive. Now, having escaped with his troops by the skin of their teeth, Skater wants to find out who set him up.\nBut it isn't going to be easy. Because the runners are stuck up to their pointy ears in a sinister super-scheme that involves Skater's ex-wife, two elven gene corporations, a ruthless mafioso named McKenzie, and stolen data disks containing secrets worth killing for. It's a high-tech mega-mess with no way out. And as a ghastly virus hits Seattle, unleashing hordes of homicidal cannibals onto the streets, Skater and company have to bring in some heavy artillery just to stay alive....",
		edition: 2,
		gameDate: '2053',
		name: 'Preying for Keeps',
		names: {
			'de-DE': 'Auf Beutezug'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Heyne Verlag'
		],
		releaseDate: ['1996-07'],
		sku: [
			'5540',
			'27834'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "Sword Of The Serpent\nMachiko is second-in-command of the Green Serpent Guard, an elite corps of Elven samurai who are sworn to defend the Chairman of Nagato Corporation. But she soon gets a promotion - after her superior is ruthlessly cut down in a slew of attacks aimed at the famous Guard itself.\nOnly the wealthiest can afford assassins with enough muscle to take on the Green Serpent Guard, and Machiko turns up evidence that points ot Nagato's biggest rival, Fuchi Corp. It looks like Fuchi has designs on Nagato's sensitive research division, where the incredible future of the communications matrix is taking shape.\nWhen magical attacks and sabotage begin taking out more of Nagato's personnel, things between the two megacorporations really heat up. But behind the growing hostilities with Fuchi looms a more sinister threat, requiring far more of Machikos talents than her flashing sword. And staying alive may require defeating a high-tech foe with virtually unlimited powers - and absolutely no mercy...",
		edition: 2,
		gameDate: '2057',
		name: 'Steel Rain',
		names: {
			'de-DE': 'Stahlregen'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Heyne Verlag'
		],
		releaseDate: ['1997-03'],
		sku: [
			'5627',
			'27811'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'In its efforts to control all information in the Shadowrun universe, a giant corporation inadvertently calls up a violent spirit from another dimension, and only a young girl can save the universe from the ensuing havoc.',
		edition: 2,
		gameDate: '2053',
		name: 'The Lucifer Deck',
		names: {
			'de-DE': 'Das Luzifer Deck'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Heyne Verlag'
		],
		releaseDate: ['1997-01'],
		sku: ['5594'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'MegaCorp enlists an elite decker, who reunited with old friends from England to try to keep a megacorp from being blackmailed by a super hacker. They come to discover that ancient powers are clashing to prevent a secret from being told. This is the 3rd book with renegade elven mage Serrin Shamander and British Lord Geraint Llanfrechfa.',
		edition: 2,
		gameDate: '2057',
		name: 'Black Madonna',
		names: {
			'de-DE': 'Schwarze Madonna'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Heyne Verlag'
		],
		releaseDate: ['1996-04'],
		sku: ['5539'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Venturing to the Kingdom of Hawaii when a megacorporate exec demands payment of an old debt, shadowrunner Dirk Montgomery finds himself having to outrun the corrupt factions battling for control of the island.',
		edition: 2,
		gameDate: '2053',
		name: 'House of the Sun',
		names: {
			'de-DE': 'Haus der Sonne'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1995-07',
			'2003-06'
		],
		sku: ['5495'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "From the distant forests of Maine comes the deadly Weretiger known as Striper, seeking nature's own special justice.\nFrom the shadowed heart of the South Bronx comes the shaman called Bandit, interested only in the pursuit of his arcane arts, and the reconciliation with nature that Raccoon demands.\nFrom the nightmare streets of Newark come Monk and Minx, seeking life itself.\nWho is predator and who is prey? The assassin? The shaman? The kids with the flashing eyes? The Director of Resource for Hurley-Cooper Labs, or HCL's dedicated scientist? Or is it the elves? Or the mystery man from the Department of Water and Wastewater Management with a technical rating higher than God's?\nBefore they are done, a killer will learn the meaning of mercy, and one who honored life will discover the necessity of ruthless destruction....",
		edition: 2,
		gameDate: '2055',
		name: 'Who Hunts the Hunter',
		names: {
			'de-DE': 'Jäger und Gejagte'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1995-05',
			'2003-06'
		],
		sku: [
			'5448',
			'27836'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "Andy is happy as a shadowrunner wannabe, but when he accidentally gets involved with real runners, the game of Let's Pretend is over. So is his safe corporate life. Andy's half brother, UCAS Army Major Tom Rocquette, has some doubts about what he's involved with too. Why, for example, is he being ordered to mercilessly massacre the Compensation Army, a group that, like him, only seeks justice?\nAndy and Tom, along with runners Markowitz and Kit, are finding out things that could put many lives in danger and point to a sinister web of dirty politicians, dishonorable officers, and misused tech and magic--a conspiracy that could dismantle the UCAS government! Can Andy and Tom find enough evidence to prove it--and stop it--before the nation's capital is buried under a heap of bloody corpses...?",
		edition: 2,
		gameDate: '2053',
		name: 'Just Compensation',
		names: {
			'de-DE': 'Gerade noch ein Patt'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1996-01',
			'2003-06'
		],
		sku: [
			'5537',
			'27809'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Spawned in the realm between the worlds, a Horror comes.\nDefeated in battle centuries before by the elven mage Aina, it walks again, seeking vengeance on the mortal lands.\nIf Aina fails to convince the courts of Tir na nOg and Tir Tairngire of the danger, she will have to face the Horror alone once more--or watch the world end.\n<small>NOTE: This story was originally written to conclude the Immortals trilogy; of which the first two parts were <em>Earthdawn</em> novels still unpublished at the time. <strong><em>Scars</em></strong> was published in 2005, and <strong><em>Little Treasures</em></strong> remains unpublished in English.</small>',
		edition: 2,
		gameDate: '2056',
		name: 'Worlds Without End',
		names: {
			'de-DE': 'Die endlosen Welten'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1995-10',
			'2003-06'
		],
		sku: [
			'5496',
			'27806'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "Too Hot To Handle\nFor Two Bears, a dwarf mercenary accustomed to running the shadows, the job sounded like an easy way to make a huge stack of cash: track down and discover the meaning of the word \"IronHell.\" But when the decker he approaches for help gets her brain fried on the Matrix, Two Bears konws he's up to his stout little shoulders in drek.\nToo Cool To Give Up\nRealizing that IronHell must be the title of something - or somebody - very powerful, Two Bears looks for some backup to make sure he gets through this job alive. He lines up a street troll called Thumbs, a slick decker named Silver, a suit-wearing samurai called Delphia, and Moonfeather, a magic-wielding disciple of the Cat totem. Together they blast their way through a stream of megacorp] operatives, giant meta-beasts, and high-tech pirates, desperate to unravel the incredible secret of IronHell - before it unravels the world ....",
		edition: 2,
		gameDate: '2058',
		name: 'Shadowboxer',
		names: {
			'de-DE': 'Schattenboxer'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1997-05',
			'2003-06'
		],
		sku: [
			'5628',
			'27813'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'The adventures of Wolfgang Kies, soldier of fortune. Together with a group of cyborg bounty hunters and computer wizards, he assists elf lord Dr. Richard Raven in keeping humanity safe from preying monsters—both magical and technological! But crime lord Etienne LaPlante interferes with their vigilantism, preparing to strike at Raven and those who serve him....',
		edition: 3,
		gameDate: '2060',
		name: 'Wolf & Raven',
		names: {
			'de-DE': 'Wolf & Rabe'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1998-07',
			'2003-06'
		],
		sku: ['5712'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "He awoke in a body bag, his brain fried, a black hole where his memory should be. If not for the cool carbon-fiber blade concealed in the bones of his arm, he would've been dead for sure. But Michael Bishop--a.k.a. Babel, messiah of the Matrix--is back in the game.\nRenraku Computer Systems has defied the accords of the Corporate Court. Now they must decipher the secrets of the otaku--and Babel is the technoshaman reborn for the job. But Netwalking in the shadows of the electron jungle means initiation into deadly megacorporate intrigue--and discovering more about Babel's own team than he fears he should know.\nAs allies become adversaries, Babel breaks through the dreaded black ice security to find a doorway to the future--and signs of a corp war looming on the horizon--one that could destroy the technoworld and beyond...forever.",
		edition: 2,
		gameDate: '2059',
		name: 'Technobabel',
		names: {
			'de-DE': 'Technobabel'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1998-05',
			'2003-06'
		],
		sku: [
			'5711',
			'27815'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Seattle - A conspiracy arrives to spread a plague of vampires. Warren Storey must discover the reason for the plague before time runs out.',
		edition: 3,
		gameDate: '2060',
		name: 'The Terminus Experiment',
		names: {
			'de-DE': 'Das Terminus-Experiment'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1999-01',
			'2003-06'
		],
		sku: ['5714'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "It started out as a simple Matrix run, but now five deckers are trapped inside a nightmarish virtual landscape where jacking out is an impossibility--and what waits has all the hallmarks of the afterlife: tunnels of brilliant light, greetings from long-dead friends and family...and the terrifying sense of being juggled between Heaven and Hell. But in this computer-generated netherworld, there is only one thing that can be trusted. And it isn't the senses....\n...THE COUNTDOWN BEGINS\nIt's the uncommon experience the deckers have in common: a near brush with death. It has brought them together in this hell-raising realm and under the influence of a twisted intelligence with diabolical plans for the unwary travelers in grid-time. Having their minds and souls extinguished before the Matrix-scape crashdown is only the beginning of the puzzle. Discovering why will be the end. A dead end.",
		edition: 3,
		gameDate: '2060',
		name: 'Psychotrope',
		names: {
			'de-DE': 'Psychotrop'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1998-10',
			'2003-06'
		],
		sku: [
			'5713',
			'27819'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'The Enemies with unlimited powers, ultimate evil is about to arrive, Ryan Mercury and his runners have only two options left: Victory or Death',
		edition: 2,
		gameDate: '2057',
		name: 'Beyond the Pale: Dragon Heart Saga, Volume 3',
		names: {
			'de-DE': 'Bis zum bitteren Ende (Drachenherz-Saga Teil 3)'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1998-03',
			'2003-06'
		],
		sku: ['5710'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "Somebody aced the dragon Dunkelzahn, and one of the mysterious links to the assassination is flat on his back in slab city: a double agent with two identities--both out of commission. Now he's the most-wanted carcass in Tacoma. Jack Skater's mission? Sleaze past the high-tech funeral security, outwit the Knight Errants, cop the stiff, and keep it on ice long enough to get the answer to the shadowrunners' life-and-death question: what's so hot about a stone-cold corpse?\nAnd that isn't all that's dropped Skater elf-deep in drek--the UCAS Secret Service is also after the dead man's secret--and the government blue crews are prepared to liquidate anything in sight to get to it first...",
		edition: 3,
		gameDate: '2060',
		name: 'Headhunters',
		names: {
			'de-DE': 'Kopfjäger'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1997-10',
			'2003-06'
		],
		sku: [
			'5630',
			'27833'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "Dunkelzahn the dragon's election as President of the United Canadian American States promised the dawn of a new era. But the hopes of a nation disintegrate with the powerful explosion that assassinates him. On that same fateful evening Dunkelzahn's most trusted special agent, Ryan Mercury, is on a secret mission of great urgency involving dangerous magic. And only a miracle can save the world from total destruction...",
		edition: 3,
		gameDate: '2060',
		name: 'Stranger Souls: Dragon Heart Saga, Volume 1',
		names: {
			'de-DE': 'Fremde Seelen (Drachenherz-Saga Teil 1)'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1997-07',
			'2003-06'
		],
		sku: [
			'5629',
			'27814'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "Mama Grande streaked through Leni's life like a bad dream. She arrived out of nowhere, claiming to be the ex-Lone Star detective's grandmother. She prophesied rivers of blood and an earth in flames. But her murder was even more bizarre: she died at the hands of two Yucatán missionaries hiding a secret of the Gods.\nWith combat biker wannabe Rafael in tow, Leni dives into Mama Grande's past... and hurtles into the dark heart of Aztlan - where human sacrifice is all the rage, and where ancient ceremonial games could trigger the end of the world. Are they crazy cultists of true harbingers of doom? The closer Leni and Rafael get to the answer, the nearer they move to the brink of oblivion. Either way, their futures could be cancelled...",
		edition: 3,
		gameDate: '2060',
		name: 'Blood Sport',
		names: {
			'de-DE': 'Blutige Jagd'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1998-01',
			'2003-06'
		],
		sku: [
			'5709',
			'27816'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "The maelstrom of cyber-magic and political intrigue following President Dunkelzahn's assassination rages out of control. Ryan Mercury, Dunkelzahn's secret agent, is torn between his duty and his desire to find a killer. But when a spirit wrongly concludes that Ryan is working for the enemy, he anoints a cyberzombie to carry out a hit of its own. Now with an impressive arsenal of allies, weaponry, and the Dragon Heart, Ryan just might pull off the save of the century—if he doesn't lose his life first!",
		edition: 2,
		gameDate: '2057',
		name: 'Clockwork Asylum: Dragon Heart Saga, Volume 2',
		names: {
			'de-DE': 'Der Cyberzombie (Drachenherz-Saga Teil 2)'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1997-11',
			'2003-06'
		],
		sku: [
			'5631',
			'27817'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'You’re not a noob. You’re not a poseur. You’re a shadowrunner. When you pick a weapon, it’s with a purpose, and 99 times out of 100, that purpose is to bring suckers down. You’re going to choose your weapon carefully, and you know that the more options you have, the better your final choice will be.\nThese 33 weapon cards feature guns first seen in the recently released Gun H(e)aven 3. Available in both PDF and POD form, these cards have everything you need to start shooting right away!',
		edition: 5,
		gameDate: '2075',
		name: 'Gun H(e)aven 3 Cards',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2013-12-27'],
		sku: ['27S0405'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: "Where Man Meets Magic & Machine\nThe year is 2060. Magic is as real as the mean streets of the mega-sprawls. Corporations call the shots while nailing each other through covert operatives in cutthroat competition. Flesh and machines have merged -- the street samurai with his smartguns and impossibly fast reflexes, the decker who can plug his own brain into the worldwide computer network, the rigger who links his mind to his vehicle and takes hairpin turns at fantastic speeds. And you're a part of this wired world, where corporate skyscrapers glitter over the dark shadows they cast. You live in those shadows. You're a shadowrunner -- a street operative.\nYou may be human or troll, dwarf or elf. You may throw fireballs, pull out your trusty Uzi or slice through computer security with a program as elegant and deadly as a stiletto. No matter what, you get the job done. You're a shadowrunner -- a professional. You don't just survive in the shadows -- you thrive there ... for now.",
		edition: 3,
		gameDate: '2060',
		name: 'Shadowrun Third',
		names: {
			'de-DE': 'Shadowrun version 3.01D',
			'es-ES': 'Shadowrun Tercera Edición',
			'fr-FR': 'Shadowrun Troisiéme Édition',
			'hu-HU': 'Shadowrun Szabálykönyv 3. kiadás'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'WizKids Games',
			'Beholder Kiadó Bt.',
			'Descartes Editeur',
			'La Factoría de Ideas'
		],
		releaseDate: [
			'1998-09',
			'2000-06',
			'2001',
			'2004-02'
		],
		sku: [
			'7000',
			'7001',
			'10660',
			'25000',
			'LFSH001',
			'LFSH001L'
		],
		type: 'scan'
	},
	{
		category: 'rulebook',
		description: 'Everyone in the Sixth World wants to geek the mage first. Your job is to make sure that won’t happen by being faster, deadlier, and more powerful than they are. Shadowrun Spell Cards, Series 1 make spellcasting faster and easier, with easy-to-reference game statistics for 54 different spells. Grab a pack and use it to call down a whole hellstorm of mana when you need it most!',
		edition: 5,
		gameDate: '2075',
		name: 'Spell Cards, Series 1',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2013-11'],
		sku: ['27502'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'Man. Machine. Magic.\n\nShadowrun. The Sixth World. Orks in pinstripe suits with uzis; mohawked dwarves jacked into vehicles racing through megasprawls at breakneck speed; humans casting fireballs at corporate-trained paracritters; elves hacking the Matrix for a datasteal of the latest tech or working to topple an upstart corp. It’s where man meets magic and machine.\nDive into a cyberpunk dystopia and become a shadowrunner, a deniable asset who does the jobs no one else can—or will—do. It’s not an easy life, but it beats selling your soul to the megacorps. You’ll break into top-secret labs, stand up to gangs bent on destruction and chaos, encounter dark spirits hiding even darker secrets, and come face to face with some of the infinite dangers the Sixth World can throw at you. And you’ll come out on top—because if you don’t, you don’t get paid.\nShadowrun: Anarchy is a new way to get into the best cyberpunk/urban fantasy action around. Based upon the rules-light and easy-to-learn Cue System, Shadowrun: Anarchy is a narrative-focused game experience that has everything you need to quickly grab some gear, load up on spells, and get to throwing the dice. With loads of characters and missions, the book makes it simple to get up and running. Immerse yourselves in the Sixth World!',
		edition: 5,
		gameDate: '2075',
		name: 'Shadowrun: Anarchy',
		names: {
			'de-DE': 'Shadowrun: Anarchy'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2016-08-04',
			'2016-09-30',
			'2016-11-30',
			'2017-05-29'
		],
		sku: [
			'27010',
			'45215',
			'45216'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'Man. Machine. Magic.\n\nShadowrun. The Sixth World. Orks in pinstripe suits with uzis; mohawked dwarves jacked into vehicles racing through megasprawls at breakneck speed; humans casting fireballs at corporate-trained paracritters; elves hacking the Matrix for a datasteal of the latest tech or working to topple an upstart corp. It’s where man meets magic and machine.\nDive into a cyberpunk dystopia and become a shadowrunner, a deniable asset who does the jobs no one else can—or will—do. It’s not an easy life, but it beats selling your soul to the megacorps. You’ll break into top-secret labs, stand up to gangs bent on destruction and chaos, encounter dark spirits hiding even darker secrets, and come face to face with some of the infinite dangers the Sixth World can throw at you. And you’ll come out on top—because if you don’t, you don’t get paid.\nShadowrun: Anarchy is a new way to get into the best cyberpunk/urban fantasy action around. Based upon the rules-light and easy-to-learn Cue System, Shadowrun: Anarchy is a narrative-focused game experience that has everything you need to quickly grab some gear, load up on spells, and get to throwing the dice. With loads of characters and missions, the book makes it simple to get up and running. Immerse yourselves in the Sixth World!',
		edition: 5,
		gameDate: '2075',
		name: 'Shadowrun: Anarchy (Prototype)',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2016-09'],
		sku: ['27010X'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'If you’re a shadowrunner, you know that danger is always waiting around the next corner. You better be ready for it. The right gun, the right vehicle, or the right piece of equipment can be the difference between life and death. So make sure you have what you need and can use it fast.\nShadowrun Gear Cards, Series 1 provide quick reference to 54 different pieces of gear, making it easy to use them in a game. Containing game stats and illustrations of guns, vehicles, drones, and more, these cards are a handy reference to keep the game moving and make sure characters have what they need to come out on top.',
		edition: 5,
		gameDate: '2075',
		name: 'Gear Cards, Series 1',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2013-11'],
		sku: ['27500'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'Ride the Crashing Wave\n\nMagic is wild. Magic is undisciplined. You can try to impose order and understanding on it, but that’s just surface. Underneath is chaos, an erratic heart beating to a staggering rhythm. You don’t control it, any more than a surfer controls twenty-meter-tall wave; you don’t direct the wave, you ride it, capture a piece of its power, and hope to survive. If you do it right, though, you catch a portion of unimaginable power—power those who control the Sixth World don’t want you to have. All the more reason to push past their boundaries and grab it.',
		edition: 5,
		gameDate: '2075',
		name: 'Forbidden Arcana',
		names: {
			'de-DE': 'Verbotene Künste'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2017-05-02',
			'2017-10-19',
			'2017-11-05'
		],
		sku: [
			'27011',
			'45059'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: "This gamemaster's aid contains all the charts and tables needed to run Shadowrun in a convenient, easy-to-use format. For use with Shadowrun Third Edition.",
		edition: 3,
		gameDate: '2060',
		name: "Game Master's Screen 3rd Edition",
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions'
		],
		releaseDate: [
			'1998-12',
			'2004-07'
		],
		sku: [
			'7002',
			'25008'
		],
		type: 'scan'
	},
	{
		category: 'rulebook',
		description: "Man... or Monster?\n\nCyberware can increase your speed, enhance your strength and sharpen your reflexes. It can put a computer in your head, armor under your skin and weapons in your arms. There are implants to improve every internal organ and devices that let you interface with machines... but you'd better know when to stop. Too much cyberware and you're a cyberzombie—more machine than man.",
		edition: 3,
		gameDate: '2061',
		name: 'Man & Machine: Cyberware',
		names: {
			'de-DE': 'Mensch und Maschine 3.01D',
			'fr-FR': 'La Chair & le Chrome',
			'hu-HU': 'Ember és gép: Kiberver'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Beholder Kiadó Bt.',
			'Descartes Editeur',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'2000-05',
			'2003',
			'2004-04'
		],
		sku: [
			'7126',
			'10663',
			'25001'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: "No shadowrunning team is complete without a rigger. Commanding the vehicles that provide fire support, surveillance, and a way out if things go bad, a teaM's rigger is as important as its street samurai or combat mage. And riggers are never without the vehicles they control.The Rigger Black Book features every kind of vehicle, from urban runabouts to hunter-seeker combat drones and everything in between, and rules for modifying that off-the-dealer's-floor model into the lean machine of every rigger's dreams.",
		edition: 1,
		gameDate: '2050',
		name: 'Rigger Black Book',
		names: {
			'de-DE': 'Rigger Handbuch'
		},
		notes: 'The german version of Rigger Black Book updated to the rules of the 2nd edition of Shadowrun. It also contains additional vehicles from other sourcebooks that had been published between the original release of the Rigger Black Book and 1996, for example Corporate Security Handbook and Fields of Fire.',
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions'
		],
		releaseDate: [
			'1991-12',
			'1996'
		],
		sku: [
			'7108',
			'10717'
		],
		type: 'scan'
	},
	{
		category: 'rulebook',
		description: 'The GM Screen for the second edition, contains tables for use in game.',
		edition: 2,
		gameDate: '2053',
		name: "Game Master's Screen 2nd Edition",
		names: {
			'de-DE': 'Spielleiterschirm (zweite Edition)',
			'es-ES': 'Pantalla para el árbitro / Pantalla del Director de Juego, segunda versión',
			'fr-FR': 'Écran deuxième édition',
			'hu-HU': 'Játékmester Paraván',
			'it-IT': "Schermo Dell'Arbitro",
			'pt-BR': 'Escudo do Mestre, Segunda Edição'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Beholder Kiadó Bt.',
			'Fantasy Productions',
			'Ediciones Zinco',
			'Diseños Orbitales',
			'Nexus',
			'Descartes Editeur'
		],
		releaseDate: [
			'1992-06',
			'1993-01',
			'1994',
			'1995',
			'1997'
		],
		sku: [
			'7902',
			'10701',
			'5002',
			'S11'
		],
		type: 'scan'
	},
	{
		category: 'rulebook',
		description: 'Contacts booklet that accompanied the 2nd Ed. GM Screen.',
		edition: 2,
		gameDate: '2053',
		name: 'Contacts',
		names: {
			'es-ES': 'Contactos',
			'hu-HU': 'Kapcsolatok és Archeotípusok',
			'pt-BR': 'Contatos'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Ediouro',
			'Ediciones Zinco',
			'Beholder Kiadó Bt.'
		],
		releaseDate: [
			'1992-06',
			'1994',
			'1995'
		],
		sku: [
			'7902X',
			'S11',
			'92542'
		],
		type: 'scan'
	},
	{
		category: 'rulebook',
		description: "The world has changed, some say Awakened.\nMagic has returned to the world and elves, dwarfs, orks and trolls have assumed their true forms. Creatures of the wild have changed as well, becoming things of myth and legend. And technology has changed people, too. No longer mere flesh, many humans have turned to artificial enhancements called cyberware, and become more than human. Modern man is stronger, smarter, and faster.\nIn the world of 2053, when the megacorporations want something done but don't want to dirty their hands, it'sa shadowrun they need, and they come to. Though your existence is not listed in any governmental or corporate database, the demand for your services is high. You might be a decker, sliding through the virtualized databases of giant corporations, spiriting away the only thing of real value--information. Or perhaps you are a street samurai, an enforcer whose combat skills make you the ultimate urban predator. Or perhaps a magician with the ability to wield the magical energies that soround the Earth.\nAnd that's exactally the kind of firepower you'll need to make a shadowrun...",
		edition: 2,
		gameDate: '2053',
		name: 'Shadowrun Second',
		names: {
			'cs-CZ': 'Druhé vydání Shadowrun',
			'de-DE': 'Shadowrun Version 2.01D',
			'es-ES': 'Shadowrun, segunda edición / Shadowrun: Manual del Jugador Segunda Edicion (2a Edicion Corregida)',
			'fr-FR': 'Shadowrun Deuxième Édition',
			'he-IL': 'מהצללים המהדורה השניה',
			'hu-HU': 'Árnyvadász Shadowrun Szerepjáték',
			'jp-JP': 'シャドウラン ルールブック',
			'pl-PL': 'Shadowrun Druga Edycja',
			'pt-BR': 'Shadowrun Segunda Edição'
		},
		notes: 'The japanese edition has an aditional 10 pages about the city of Tokyo and the shadows of Japan.',
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Descartes Editeur',
			'Fantasy Productions',
			'Blackfire Games',
			'Beholder Kiadó Bt.',
			'Diseños Orbitales',
			'Ediciones Zinco',
			'Olive Books of Israel',
			'ISA Sp. Zoo',
			'Devir',
			'富士 見 書房'
		],
		releaseDate: [
			'1992',
			'1993',
			'1994',
			'1995',
			'1996',
			'1997-06'
		],
		sku: [
			'7900',
			'7901',
			'10700',
			'1273',
			'4829172398'
		],
		type: 'scan'
	},
	{
		category: 'rulebook',
		description: "\"Faster, meaner, smarter...\nMan, I hate the technology\ncurve. It's back to school boys\n& girls, the kid gloves are OFF\"\n-FASTJACK, decker",
		edition: 1,
		gameDate: '2051',
		name: 'Virtual Realities',
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1991-07',
			'2011-08-31'
		],
		sku: ['7107'],
		type: 'scan'
	},
	{
		category: 'rulebook',
		description: 'The year is 2050.\nThe bending of technology and human flesh began in the late 20th century. Interfacing the human mind with computers was just the first step. Implants that "jack up" reflexes and cybernetic replacements followed quickly. Then came the awakening. A five-thousend-year lull in the flow of mystical energies subsided, and Magic returned to the world. Elfes, Dwarfs, and Trolls assumed their true form, throwing off their human guise.',
		edition: 1,
		gameDate: '2050',
		name: 'Shadowrun: Where Man Meets Magic and Machine',
		names: {
			'de-DE': 'Shadowrun - The Cyberpunk RPG',
			'fi-FI': 'Shadowrun - Kyberfantasiaroolipeli',
			'fr-FR': "Shadowrun - Quand l'Homme ne fait plus qu'un avec la magic et la machine"
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Hexagonal',
			'PRO Games',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1989',
			'1990-07',
			'1991',
			'2010-02-15'
		],
		sku: [
			'7100',
			'7101',
			'00900',
			'10700'
		],
		type: 'scan'
	},
	{
		category: 'rulebook',
		description: "With the Shadowrun Quick Start Rules, you need nothing more than a vivid imagination and a handful of dice to jump into the world's most popular science-fiction/fantasy universe. An introduction for new players to the Shadowrun, Third Edition game system, the Shadowrun Quick Start Rules provides all the rules you need to start playing. This book features background material, advice for beginners, eight pre-generated characters and a complete adventure so you can learn as you go. The Shadowrun Quick Start Rules lets you dive right into the action. Welcome to the shadows, chummer!",
		edition: 3,
		gameDate: '2060',
		name: 'Shadowrun Third Edition: Quick Start Rules',
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1999-08',
			'2005-02'
		],
		sku: ['7003'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: "Power.\nSome people want to study it, some want to outlaw it, some drekheads even pretend id dosen't exist, but the genie's been out of the bottle since that day in 2011 when the first newborn magician in our world made the magic happen.",
		edition: 1,
		gameDate: '2050',
		name: 'The Grimoire: The Manual of Practical Thaumaturgy 14th Edition, 2050',
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: ['1990-07'],
		sku: ['7106'],
		type: 'scan'
	},
	{
		category: 'rulebook',
		description: "When the going get tough, the tough go shopping!\nYou're the ultimate fighting machine. A predator-for-hire in the savage urban world of Shadowrun. You've devoted your life to honing your combat and martial skills. The tools of your trade are airfoil grenades, form-fitting body armor, and an Ares Crusader machine pistol.\nAn expansion for Shadowrun, the Street Samurai Catalog will let you outfit yourself with the latest equipment available on the black market: retractable hand razors, ultrasonic sights, enhanced reflexes, and maybe a rangefinder for your cybereyes. Whatever you need to get the job done, you can find it here, but it won't be cheap. And remember to watch your back before someone decides to make you yesterday's news.",
		edition: 1,
		gameDate: '2050',
		name: 'Street Samurai Catalog',
		names: {
			'de-DE': 'StraßensamuraiKatalog'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions'
		],
		releaseDate: [
			'1989',
			'1993'
		],
		sku: [
			'7104',
			'10702'
		],
		type: 'scan'
	},
	{
		category: 'rulebook',
		description: "When the going get tough, the tough go shopping!\nYou're the ultimate fighting machine. A predator-for-hire in the savage urban world of Shadowrun. You've devoted your life to honing your combat and martial skills. The tools of your trade are airfoil grenades, form-fitting body armor, and an Ares Crusader machine pistol.\nAn expansion for Shadowrun, the Street Samurai Catalog will let you outfit yourself with the latest equipment available on the black market: retractable hand razors, ultrasonic sights, enhanced reflexes, and maybe a rangefinder for your cybereyes. Whatever you need to get the job done, you can find it here, but it won't be cheap. And remember to watch your back before someone decides to make you yesterday's news.",
		edition: 2,
		gameDate: '2050',
		name: 'Street Samurai Catalog (Revised)',
		names: {
			'de-DE': 'Straßensamurai Catalog Edition 2053',
			'es-ES': 'Catálogo del samurái urbano / Catálogo del samurái callejero',
			'fi-FI': 'Katusamurai',
			'fr-FR': 'Catalog of Samouraï des Rues',
			'hu-HU': 'Utcai szamuráj katalógus',
			'pl-PL': 'Catalog Ulicznego Samuraja',
			'pt-BR': 'Catálogo do Samurai Urbano'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Diseños Orbitales',
			'Ediciones Zinco',
			'Fantasy Productions',
			'Hexagonal',
			'Ediouro',
			'Catalyst Game Labs',
			'PRO Games',
			'Beholder Kiadó Bt.',
			'ISA Sp. Zoo'
		],
		releaseDate: [
			'1989',
			'1991',
			'1992',
			'1993',
			'1994',
			'1995',
			'1996',
			'1998',
			'2010-03-02'
		],
		sku: [
			'7104X',
			'S14',
			'10702',
			'00100301'
		],
		type: 'scan'
	},
	{
		category: 'rulebook',
		description: 'PREMIUM RUSH\n\nSpin your wheels over slick sprawl streets while drifting away from hot pursuit. Fly through narrow canyons ahead of missiles twisting their way after you. Shrink down to insect size to get an eye on places outsiders aren’t supposed to see. These are just some of the ways riggers jack up their seemingly unending adrenaline rush, as they show that the hardest shadowrunners to hit are the ones that stay in motion.\nRigger 5.0 is the ultimate hot-rod, jet plane, speedboat, and more companion for Shadowrun. With dozens of new vehicles and drones, more detailed rules for vehicle chase and combat, and customization rules, this is a book that every rigger needs to get ahead of the competition and stay there. Get the feel of laying down hot rubber in the cold shadows of the Sixth World and a taste for speed, danger, and a good, clean getaway.',
		edition: 5,
		gameDate: '2075',
		name: 'Rigger 5.0',
		names: {
			'de-DE': 'Asphaltkrieger'
		},
		notes: 'In contrast to the original English version, the German edition contains alternative model names to the individual vehicles and drones in the book. These were created among other things by users of the Pegasus forum.',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2015-12-17',
			'2016-05-28',
			'2016-06-16'
		],
		sku: ['27007'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'The only friend you’ll ever need. The last friend you’ll ever have. Your gun is the one thing in your life that should be dependable, that should always make a nice loud bang when you squeeze the trigger, and should always bring down whoever you think should fall. Of course, if your weapon is going to be that important to you, you’ll need one that suits you perfectly. And to find the right match, it’s best if you have a lot of choices.\nWelcome back to Gun Heaven, where your next best friend is waiting for you. Dozens of options await, from the troll-friendly Krime Cannon to the foldable Terracotta Arms Mordred, from the stylish Shiawase Arms K2072 to the true tool of the desperate, the Barrens Special. And on top of that is a new breakthrough in ammo that gives you a better chance to hit your intended target.',
		edition: 4,
		gameDate: '2072-11',
		name: 'Gun H[e]aven 2',
		names: {
			'de-DE': 'Feuerkraft 2'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: ['2012-05'],
		sku: ['26S016'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'Run on Water\n\nMore than two-thirds of the Earth’s surface is covered by water. That means that two-thirds of the Earth is covered in escape routes, infiltration points, and hiding places that people stuck on land constantly overlook. If you want to know how to use all that blue to your advantage, you need to know the boats that are out there, what they can do, and how your competition is putting them to use.\nDeadly Waves collects information about thirty different watercraft, from the fast and agile Wave Cutter to the luxurious, self-maintaining Zeppelinwerke Elite Cruiser to the hulking yet surprisingly quick Maersk-Jorgenson Fast Freighter. Runners can use this book to gain all sorts of options for taking to the water, whether they’re planning a quick jaunt or embarking on a long voyage.',
		edition: 4,
		gameDate: '2073-07',
		name: 'Deadly Waves',
		names: {
			'de-DE': 'Tödliche Wogen'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: ['2011-07'],
		sku: ['26S011'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'Sew ’Em Up, Ride ’Em Out\n\nThe only reason shadowrunners have scars to show off during their downtime is that when they got hit, someone had the guts, the skill, and the speed to pull them out of whatever drekstorm they’d gotten themselves into. Maybe it was a DocWagon High Threat Response team who rode in to save the day, or maybe a teammate who’d picked up some handy medical skills in the course of their career in the shadows patched them up enough to keep them moving. Either way, having someone who can pull your hoop out of the fire is handy in any situation. Make sure you thank them and buy ’em a drink—assuming, of course, they made it out with you.',
		edition: 5,
		gameDate: '2076-05',
		name: 'Bullets & Bandages',
		names: {
			'de-DE': 'Kugeln & Bandagen',
			'fr-FR': 'Balles & Pansements',
			'pt-BR': 'Balas e Bandagens'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele',
			'Black Book Editions',
			'New Order Editora'
		],
		releaseDate: [
			'2014-06-03',
			'2014-11-06',
			'2016-12-27'
		],
		sku: [
			'26S027',
			'SRL501'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: "Sometimes you look at a catalog to see if there's anything in it that you want. And sometimes you look to see what you need to avoid.\nYou'll find both types of things in here. The tech heads of the Sixth World remain busy, coming up with more ways to slaughter metahumans with maximum efficiency. And they have plenty of battlegrounds in the world where they can test their toys out. There are things in here that shadowrunners would be exceedingly lucky to get their hands on, and things whose very appearance serves to tell them they’re having a very bad day indeed. From automated strike drones to nearly invisible tactical aircraft, from the ground-clearing Dassault Zeta Bravo to the drone killing Bridgette Tactical Vehicle, Mil Spec Tech 2 has the latest and greatest tools of war – along with a host of missiles to keep anyone in a war zone on their toes.",
		edition: 4,
		gameDate: '2074-07',
		name: 'MilSpec Tech 2',
		names: {
			'de-DE': 'MilSpec Tech-Katalog 2'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2012-07',
			'2012-10-28'
		],
		sku: ['26S021'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'Look, we all know that there are plenty of runs that go best when you don’t fire a shot. But we also know how foolish you’d be to go out without your trusted sidearm, because you never know when things are going to go south. Or when you’re going to be hired simply because you’re the person who’s got the right weapons for the job.\nIf you’re looking for a new weapon to add to your arsenal, Gun Heaven is the place to go. Featuring thirty-two guns—complete with descriptions, information on their use, game statistics, and full-color illustrations of each item—Gun Heaven collects older weapons and newer designs, ranging from the SIG P298 hold-out pistol, with its slim-line design, to the massive Ogre Hammer and its devastating punch. Get caught up on the predecessors of the legendary Ares Predator IV, or check out one of the most recent offerings from Onotari Arms, the assault-rifle/shotgun combo Xfactor III.',
		edition: 4,
		gameDate: '2073-06',
		name: 'Gun H[e]aven',
		names: {
			'de-DE': 'Feuerkraft'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: ['2011-06'],
		sku: ['26S010'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'They’re Not Old—They’re Classic We’d all like access to bleeding-edge, state-of-the-art tech, but we can’t always have it. Sometimes your nuyen’s gotta be spent somewhere else, or sometimes you haven’t got any nuyen to spend. And sometimes those old designs that everyone’s written off show up and kick your ass, proving it’s too soon for them to be forgotten. This Old Drone is a Shadowrun supplement containing information on 30 classic drones that appeared in older Shadowrun sourcebooks but haven’t made the transition to Shadowrun, Fourth Edition—until now. From the rail-mounted, wireless-shunning Ares Sentinel “P” Series to the old MQ-8 Fire Scout roto-drone, This Old Drone contains the info, rules, and stats you need to bring classic drones into the modern era of Shadowrun.',
		edition: 4,
		gameDate: '2072-07',
		name: 'This Old Drone',
		names: {
			'de-DE': 'Vertraute Drohnen'
		},
		notes: "The revised version is the colored version included in \"Runner's Black Book\".",
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2010-10-29',
			'2011-11-25',
			'2013-01-19'
		],
		sku: ['26S001'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'It’s a big world, and not all of the work that’s available is sitting right outside your front door. Sometimes you might need to hop across a country, across a continent, or across an ocean. Other times you might look to the air to find a way across a border that’s too tough to cross on the ground. And then there are the times you might need something in the air that can pack a much-needed punch.\nUnfriendly Skies provides descriptions and game information for thirty-two aircraft, including the EuroWars-tested MiG-63, the slow but easy-to-overlook Skyswimmer, and the luxurious Platinum II. The book also includes information on the basics of air travel in 2073, including information on which paths you may or may not follow if you are trying to lay low.',
		edition: 4,
		gameDate: '2072-09',
		name: 'Unfriendly Skies',
		names: {
			'de-DE': 'Gefahr in den Wolken'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2011-05',
			'2011-11-07'
		],
		sku: ['26S009'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'The corporations of the Sixth World love a good challenge—as long as it suits them. Ending world hunger? Not interested. Eliminating poverty? There’s no margin in that. Finding creative and more effective ways to blow things up and/or reduce them to rubble? That, they can do.\nWar is raging on the Aztlan-Amazonia border, and there are plenty of other places in the world where people are willing to fork over piles of nuyen to buy that tank or fighter that would help them sleep better at night. There is good demand for military technology, and the corps are stepping up with the supply.',
		edition: 4,
		gameDate: '2073-02',
		name: 'MilSpec Tech',
		names: {
			'de-DE': 'MilSpec Tech-Katalog'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2011-01',
			'2012-09-11'
		],
		sku: ['26S002'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: "Over the Edges\n\nThe Sixth World has been carefully divided and partitioned to keep people in their place, living under the thumbs of those who draw the lines. Shadowrunners, though, have never been good at staying where they’re supposed to be. They've got goods to smuggle, bounties to avoid, and a host of other reasons to cross the walls and borders the rest of the world has put up.\nThese crossings aren’t always easy, and that’s where Coyotes come in—trained professionals with nerves of steel and steady hands who can help you sneak, talk, or just blast your way past almost any border. You may have to dig deep in your pocket to pay their asking price, but it'll be worth it when you see the heavily armed checkpoint fading in the rear view mirror.",
		edition: 5,
		gameDate: '2075-11',
		name: 'Coyotes',
		names: {
			'de-DE': 'Kojoten',
			'fr-FR': 'Coyotes',
			'pt-BR': 'Coiotes'
		},
		notes: 'The German edition contains aditional material about Europe.',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele',
			'Black Book Editions',
			'New Order Editora'
		],
		releaseDate: [
			'2013-12-14',
			'2013-03-23',
			'2016-12-27'
		],
		sku: [
			'26S035',
			'SRL503'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'The Cost of Greatness\n\nEvery step, every advantage, every millisecond counts. The streets of the Sixth World are mean, and if they want to stay alive, shadowrunners need every advantage they can get to gain a step on the opposition. Fortunately, Run Faster is full of them. With it, you can learn about more metatypes for characters, including hobgoblins, giants, centaurs, and sasquatch; acquire new qualities, such as Disgraced, Hawk Eye, and Lightning Reflexes; and, if you dare, dabble with the dangerous and deadly Infected.\n\nRun Faster also has advice on fleshing out characters of different metatypes, expanded contact and lifestyle rules, and alternate character creation methods to help ensure that players can build exactly the character they want.\n\nAll these options make Run Faster a crucial companion to players who want to get the most out of their Shadowrun, Fifth Edition core rulebook.\n\nRun Faster Limited Edition book includes a bonded red leather cover with gold foil stamp and a de-bossed graphic.',
		edition: 5,
		gameDate: '2076',
		name: 'Run Faster',
		names: {
			'de-DE': 'Schattenläufer',
			'fr-FR': 'Run Faster',
			'pt-BR': 'Run Faster'
		},
		notes: 'The German version has aditional life modules based on the ADL.',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele',
			'Black Book Editions',
			'New Order Editora'
		],
		releaseDate: [
			'2014-12-18',
			'2015-02-18',
			'2015-07-19',
			'2015-10-18',
			'2016-12-17',
			'2017-03',
			'2018'
		],
		sku: [
			'27004',
			'27400S',
			'45028',
			'SR506'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'Paying with Your Soul\n\nMagic can burn your brain and sear your soul. It can inject power into every millimeter of your veins, or leave you a lump of ashes at the end of a dark alley. It’s dangerous, but to spellslingers in the Sixth World, it’s worth it. Because magic is power, and power in the Sixth World needs to be grabbed with both hands.\nSpells, rituals, alchemical preparations, adept powers, metamagics—all of those elements and more can be used to help an Awakened shadowrunner move off the streets and get a taste of the high life. Street Grimoire has more options for Shadowrun players, along with information on magical traditions, magic societies, and the dangers and benefits of living as a spellcaster in a world where "geek the mage first" is a common adage. With more options, deeper rules, deadlier threats, and dozens of way to have fun with magic, Street Grimoire is an essential book for anyone playing Shadowrun, Fifth Edition.',
		edition: 5,
		gameDate: '2075',
		name: 'Street Grimoire',
		names: {
			'de-DE': 'Straßengrimoire',
			'fr-FR': 'Grimoire des Ombres'
		},
		notes: 'The German version has aditional spells and traditions.',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele',
			'Black Book Editions'
		],
		releaseDate: [
			'2014-06-30',
			'2015-04-15',
			'2015-05-23',
			'2016-02-12',
			'2017-10-19'
		],
		sku: [
			'27003',
			'45023',
			'45025',
			'SR505'
		],
		type: 'digital'
	},
	{
		category: 'misc',
		description: 'Being a spellcaster is all about taking the inconveniences and problems of reality and making them work for you. But reality is a complicated thing, and if you really want to shape it right, you need plenty of spells at your disposal. And not just any spells—the right ones, the ones that get the job done. Street Grimoire Spell Cards have summaries of 54 spells from Street Grimoire, with stats, a brief statement of what the spell does, and references to help you find more information. Use them to shift reality from the way it is to the way it should be.',
		edition: 5,
		gameDate: '2075',
		name: 'Magic Cards: Street Grimoire',
		notes: 'Set of cards available at Gen Con 2014.',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2014-08-11'],
		sku: ['27003X'],
		status: 'outofscope',
		type: 'print'
	},
	{
		category: 'rulebook',
		description: 'THE INFINITE FRONTIER\n\nThe last great undiscovered country is vast, wild, and weirder than you can possibly imagine. And it’s nearby, waiting, accessible by the press of a button, or a simple gesture, or even just a thought. The Matrix holds a whole lot more than selfies and cat videos—it has artificial intelligences, electronic ghosts of people formerly alive (or perhaps still living), and deep wells of pure data that can swallow you whole. Oh, and a copy of every secret ever recorded electronically. The possible rewards of exploration are great, and the dangers are greater.',
		edition: 5,
		gameDate: '2076',
		name: 'Data Trails',
		names: {
			'de-DE': 'Datenpfade'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2015-05-26',
			'2015-10-01'
		],
		sku: [
			'27006',
			'45024'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'EDGE OF THE POSSIBLE\n\nShadowrunners cannot be limited by what their bodies can—or cannot—do. They have to do more, stretch farther, surpass any limits, and accomplish the impossible. Some runners can rely on magic; for everyone else, there are augmentations. From shiny chrome that makes your body into a humanoid semitruck to genetech that alters you at the most fundamental level to drugs and chemicals that give you a quick and dirty boost, Chrome Flesh provides dozens of new ways to alter Shadowrun characters and make them better, stronger, faster, and altogether readier to kick ass and take names on the streets.',
		edition: 5,
		gameDate: '2077',
		name: 'Chrome Flesh',
		names: {
			'de-DE': 'Bodyshop',
			'fr-FR': 'Guide des Augmentations'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele',
			'Black Book Editions'
		],
		releaseDate: ['2015-06'],
		sku: [
			'27005',
			'45036',
			'SR507'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'Bullseye!\n\nGuns and ammo cost nuyen. Mastering martial arts takes time. And learning how to use explosives without blowing yourself up takes patience and a steady hand. These weapons and more are out there, waiting for you. You have the chance to use them to become deadlier, faster, more dangerous than the next guy—and more dangerous than you were yesterday. You’ll have to pay the price to get what you want, but this is the Sixth World. Don’t you always?',
		edition: 5,
		gameDate: '2075',
		name: 'Run & Gun',
		names: {
			'de-DE': 'Kreuzfeuer',
			'fr-FR': 'Run & Gun'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele',
			'Black Book Editions'
		],
		releaseDate: [
			'2014-04-09',
			'2014-07-16',
			'2014-09',
			'2015-05-03',
			'2015-07-31',
			'2017-10-20'
		],
		sku: [
			'27002',
			'54021',
			'45053',
			'SR503'
		],
		type: 'digital'
	},
	{
		category: 'misc',
		description: 'When the bullets start flying, when you desperately need to bring someone down, you need the right weapon at your side and the right armor covering your hoop. There are plenty of options out there, so there’s no excuse for not having the tool that will get the job done. This deck has fifty-four choices, cards with full-color illustrations and game stats for weapons and armor from Run & Gun. Choose the right one, and live to see another day.',
		edition: 5,
		gameDate: '2075',
		name: 'Run & Gun Cards',
		notes: 'Print only set of gear cards, Available at Gen Con 2014',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2014-08-11'],
		sku: ['27002X'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'rulebook',
		description: "Lethal Force\n\nYou're not a noob. You're not a poseur. You're a shadowrunner. When you pick a weapon, it's with a purpose, and 99 times out of 100, that purpose is to bring suckers down. You're going to choose your weapon carefully, and you know that the more options you have, the better your final choice will be.\nGun H(e)aven 3 is about options. Pistols, rifles, machine guns, even a flamethrower—they're all in here, ready to take out to the streets. Take a look, check your options, and then pick a weapon that will stop your enemies in their tracks. Because when the guns come out, you want it ended quick and ended right—with you still in your feet.",
		edition: 5,
		gameDate: '2075-12',
		name: 'Gun H[e]aven 3',
		names: {
			'de-DE': 'Feuer und Stahl',
			'pt-BR': 'Abrigo de Armas 3'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele',
			'New Order Editora'
		],
		releaseDate: [
			'2013-12-14',
			'2014-02-03'
		],
		sku: ['26S040'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: "The Job of Death\n\nSome people call it wetwork. Others call it murder. A small group calls it justice. It's assassination and it's one of the jobs shadowrunners might be hired to do. And given that people are, you know, pretty protective about their lives, anyone who takes such a job is going to have to be at the top of their game to pull the job off and collect a payday. Especially if they plan to make it a regular activity.\nThe Assassin's Primer is a vital guide for assassins in the Sixth World. With tips on tools to use, techniques to employ, and the different kinds of killers you may meet in the field, this is a critical reference for anyone looking to bring an assassination flavor into their Shadowrun games. And it has a new sniper rifle and a handful of new Qualities for shadowrunners to boot!",
		edition: 5,
		gameDate: '2075',
		name: "The Assassin's Primer",
		names: {
			'de-DE': 'Assassinen Handbuch',
			'fr-FR': "Manuel de l'assassin",
			'pt-BR': 'A norma do Assassino'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele',
			'Black Book Editions',
			'New Order Editora'
		],
		releaseDate: [
			'2013-10-25',
			'2013-12-11',
			'2016-12-27'
		],
		sku: [
			'26S036',
			'SRL502'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'There are cracks in the world. They’re slender, dark, and often cold, but they are the only things that keep you hidden. Keep you alive. They are the shadows of the world, and they are where you live.\nYou are a shadowrunner, thriving in the margins, doing the jobs no one else can. You have no office, no permanent home, no background to check. You are whatever you make yourself. Will you seek justice? Sow seeds of chaos? Sell out to the highest bidder? It’s up to you, but this much is certain: If you do nothing, the streets will eat you alive.\nYou can survive, even flourish, as long as you do what it takes. Sacrifice part of your soul for bleeding-edge gear. Push the limits of your will learning new and dangerous magic. Wire yourself into the Matrix, making your mind one with screaming streams of data. It’ll cost you something—everything does—but you can make it worth the price.',
		edition: 5,
		gameDate: '2075',
		name: 'Shadowrun 5th Edition Core Rulebook',
		names: {
			'de-DE': 'Shadowrun Fünfte Edition Grundregelwerk',
			'fr-FR': 'Shadowrun Livre de Base 5ieme Edition',
			'pt-BR': 'Shadowrun 5ª Edição - Livro Básico'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele',
			'Black Book Editions',
			'New Order Editora'
		],
		releaseDate: [
			'2013-06-14',
			'2013-07-11',
			'2013-08',
			'2013-10',
			'2013-12',
			'2014-05',
			'2015-07'
		],
		sku: [
			'27000',
			'27000LE',
			'45010',
			'45011',
			'SR501',
			'SR5C02',
			'SR5C01',
			'45013'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'LEARN THE WAYS OF POWER\n\nSomething is happening to the adepts of the Sixth World. They’re becoming stronger, faster—some of them are even becoming more charming. Studies indicate that the improvements are fixing on the most disciplined of adepts, those who integrate their abilities into the greater whole known as a Way. By following these Ways, adepts are reaching new levels of power.',
		edition: 4,
		gameDate: '2072-08',
		name: 'The Way of the Adept',
		names: {
			'de-DE': 'Der Weg des Adepten'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2011-04-26',
			'2011-10-20'
		],
		sku: ['26S007'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "status: Mitch Truman, heir apparent to an entertainment megacorporation. He may have fled his parents for the sake of love, but if magic is involved the reason could be darker...\nWEALTHY: Dan Truman, CEO of media giant Truman Technologies, doesn't care how much it costs--he wants his son back. He'll hire the best to find his heir, even if their motives are suspect...\nEXPERIENCED: Kyle Teller's done this job before. He knows the tricks of the trade, and not only because he's a mage. He thinks finding the missing boy will be easy. Why shouldn't it be?\nBut will money and experience be enough to defeat the terrible power growing beneath the city of Chicago?",
		edition: 2,
		gameDate: '2055',
		name: 'Burning Bright',
		names: {
			'de-DE': 'Nuke City'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1994-11',
			'2003-06'
		],
		sku: [
			'5445',
			'27807'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'When magic returns, its power calls Sam Verner. As Sam searches for his sister through the slick and scary streets of 2050, his quest leads him across the ocean to England, where druids rule the streets... and the throne. But all is not what it seems, and Sam and his new shadow friends are plunged into a maze of madness on the trail of destruction. Only when Sam accepts his destiny as a shaman can he embrace the power he needs. But what waits for him in the final confrontation of technology and human flesh is a secret much darker than anything he knew waiting in the shadows...',
		edition: 2,
		gameDate: '2053',
		name: 'Choose Your Enemies Carefully: Secrets of Power, Volume 2',
		names: {
			'de-DE': 'Wähl deine Feinde mit Bedacht (Trilogie der Macht 2)'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1991-02',
			'2003-06'
		],
		sku: [
			'5125',
			'27801'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'The year is 2050. The power of magic and the creatures that accompany it have returned to Earth. For Sam Verner, living in the womb of the Renraku conglomerate was easy, until his sister disappeared and reality began to disintegrate. Now Sam wants out, but he must face the world of Shadowrun.',
		edition: 2,
		gameDate: '2053',
		name: 'Never Deal with a Dragon: Secrets of Power, Volume 1',
		names: {
			'de-DE': 'Laß ab von Drachen (Trilogie der Macht 1)'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1990-12',
			'2003-06'
		],
		sku: [
			'5078',
			'27800'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "He was only a \"beginner\" shaman, but Sam Verner had to find a cure to ward off the curse on his sister. Only something of great magic would do the trick. It was this quest that took him to a mystical citadel in Australia, where, with the aid of his shadowrunner friends, he recovered the strange artifact he hoped would prove helpful. But instead of anything that even remotely resembled help, an unexpected and ancient terror was released—a terror that erupted into a shadow war for dominion over an awakened earth. And while the evil kept growing, inexorably drawing him into battle, the curse's power over his sister was also growing, bringing her closer and closer to death. Soon a truly desperate Sam realized that the last and only hope for saving his sister was to find the greatest shaman of the Sixth World, former leader of the Great Ghost Dance—a man who may no longer exist...",
		edition: 2,
		gameDate: '2053',
		name: 'Find Your Own Truth: Secrets of Power, Volume 3',
		names: {
			'de-DE': 'Such deine eigene Wahrheit (Trilogie der Macht 3)'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1991-06',
			'2003-06'
		],
		sku: [
			'5145',
			'27802'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'The year is 2050\n\nThe blending of technology and human flesh began in the late 20th century. Interfacing the human mind with computers Then came the Awakening . A five-thousand-year zero in the flow of certain energy subsided, and magic returned to the world. Elves , Trolls , and Orcs assume their true form, throwing off their human guise. Dragons awoke from their long sleep and re-emerged into the world.\nWelcome to the world of Shadowrun . A world where technology and magic co-exist. A world filled with only two types of people. The quick on the dead. Your hosts on this run through the shadows are:\n\n\t - Ken St. Andre\n\t - Robert Charette\n\t - Elizabeth T. Danforth\n\t - Tom Dowd\n\t - Paul R. Hume\n\t - Lorelei Shannon\n\t - Nyx Smith\n\t - Michael A. Stackpole\nIn this brainded anthology, a mid-level executive makes his bid for the big time, and when superiors stand in his way, assassination and blackmail are the order of the day. Sorcerers , Yakuza , Street Samurai , The Ancients - on the Elven biker gangway - and the hopelessness of this dark future are the backdrop to this journey Into the Shadows.',
		edition: 1,
		gameDate: '2050',
		name: 'Into the Shadows',
		names: {
			'de-DE': 'Der Weg in die Schatten'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Heyne Verlag'
		],
		releaseDate: [
			'1990-02',
			'1992-10'
		],
		sku: [
			'5143',
			'7601'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Mitte des 21. Jahrhunderts: Nach der Rückkehr der Magie in die Welt hat sich auch Europa grundlegend verändert Deutschland ist zu einem losen Staatenbund zerfaller und Schauplatz globaler Machtkämpfe von Konzernen. HighTech-Zentren beherrschen den Süden, anarchistische Projekte dominieren Berlin und Hamburg, Slums wie der riesige Rhein-Ruhr-Sprawl sind chaotische Ballungszentren, daneben Ghettos aller Couleurs, ein Kirchenstaat Westphalen und ein Trollkönigreich im Schwarzwald. Pandur, alias Thor Walez, ist ein Shadowrunner, der als Decker auf eigene Rechnung arbeitet. Im Auftrag meist anonymer Kunden unternimmt er Datenraubzüge. Nicht selten sind es Himmelfahrtskommandos, vor allem, wenn er an einen Unberechenbaren oder gar an einen Irren gerät, der nur Terror machen will und brutale Typen schickt, wenn es ans Bezahlen geht, um alle Spuren zu beseitigen.',
		edition: 2,
		gameDate: '2050',
		name: 'Das zerrissene Land (Deutschland in den Schatten 1)',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: ['1994'],
		sku: ['3453077563'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Mitte des 21. Jahrhunderts: Nach der Rückkehr der Magie in die Welt hat sich auch Europa grundlegend verändert. Deutschland ist zu einem losen Staatenbund zerfallen und Schauplatz globaler Machtkämpfe von Konzernen. High-Tech-Zentren beherrschen den Süden, anarchistische Projekte dominieren Berlin und Hamburg, Slums wie der riesige Rhein-Ruhr-Sprawl sind chaotische Ballungszentren, daneben Ghettos aller Couleurs, ein Kirchenstaat Westphalen und ein Trollkönigreich im Schwarzwald. Der Shadowrunner Pandur, alias Thor Walez, ist bei den Hovercraftpiraten der Nordsee untergeschlüpft und glaubt, den geheimnisvollen Mächten entkommen zu sein, die ihn manipuliert und gnadenlos gejagt haben. Aber die Vergangenheit holt ihn ein, als die Piraten vor der Arcologie Bremerhaven auf einen unbekannten Gegner treffen. Pandur sieht keinen anderen Weg, als in die Schatten zurückzukehren, und läßt sich zusammen mit dem Rigger Festus und der Magierin Jessi für einen neuen Run in Hamburg verpflichten. Im Computer der mächtigen AG Chemie stößt er auf brisante Daten, die der Megakon um jeden Preis geheimhalten will. Offenbar stehen die Daten im Zusammenhang mit den virenverseuchten Cyberaugen, die den Rigger in den Wahnsinn treiben. Gehetzt von alten und neuen Feinden, versuchen die Shadowrunner, dem Geheimnis auf die Spur zu kommen.',
		edition: 2,
		gameDate: '2050',
		name: 'Die Augen des Riggers (Deutschland in den Schatten 2)',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: ['1994'],
		sku: ['3453077571'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Mitte des 21. Jahrhunderts: Nach der Rückkehr der Magie in die Welt hat sich auch Europa grundlegend verändert Deutschland ist zu einem losen Staatenbund zerfaller und Schauplatz globaler Machtkämpfe von Konzernen. HighTech-Zentren beherrschen den Süden, anarchistische Projekte dominieren Berlin und Hamburg, Slums wie der riesige Rhein-Ruhr-Sprawl sind chaotische Ballungszentren, daneben Ghettos aller Couleurs, ein Kirchenstaat Westphalen und ein Trollkönigreich im Schwarzwald. Der Shadowrunner Pandur, alias Thor Walez, ist vom Gejagten zum Jäger geworden. Im anarchistischen Berlin gelingt es ihm endlich, den Mächten auf die Spur zu kommen, die sein Leben ruiniert haben. Konzerngardisten, Straßensamurais und Yakuzakiller im Nacken, arbeiten sich Pandur und seine Freunde an das Versteck der geheimnisvollen Grauen Eminenz heran, aber ihr Feind scheint jeden ihrer Züge bereits eingeplant zu haben.',
		edition: 2,
		gameDate: '2050',
		name: 'Die graue Eminenz (Deutschland in den Schatten 3)',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: ['1995'],
		sku: ['345307971X'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Vor einigen Jahren war Donner noch eine große Nummer in den Schatten - inzwischen ist er alt und grau. Als sich jedoch die falsche Person einmal zuviel über ihn lustig macht und ihn dann auch noch fast elendig ertrinken läßt, schwört er Rache. Gemeinsam mit seinem Freund, dem jungen und etwas seltsamen Ork Pepi, macht er sich auf die Jagd. Auf ihrem Weg durch Wien - und schließlich bis tief in die Alpen - stoßen sie nicht nur auf alte Freunde und Feinde, sondern entdecken auch etwas, womit sie niemals gerechnet hätten: Eine merkwürdige Substanz, das Wiener Blei, bedroht die österreichische Hauptstadt und das ganze Land, ein Gift, das eine viel heimtückischere Wirkung hat als seine Opfer einfach nur zu töten...',
		edition: 2,
		gameDate: '2050',
		name: 'Wiener Blei',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: ['1998'],
		sku: ['10555'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Eigentlich wollte sich Sparkplug bei Doktor E.R. nur eine neue Headware implantieren lassen, doch als er aus der Narkose erwacht, liegen der Straßendoc und seine hübsche Assistentin in einer Blutlache am Boden. Rasch wird dem Rigger klar, dass man ihm das Verbrechen anhängen will, und so schleppt er sich mit letzter Kraft zu seinen Riggerfreunden. Sparkplug taucht in den Barrens von Seattle unter, aber nicht nur die Cops, sondern auch mächtige Konzerne sind ihm auf den Fersen. Um seine Unschuld zu beweisen, macht sich Sparkplug auf die Suche nach den Mördern. Wer war der Doc in Wirklichkeit, und wer hatte ein Interesse daran, ihn zu ermorden? Bald stellt sich heraus, dass Doktor E.R. dem Rigger den Prototyp einer neuen und revolutionären Geheimwaffe in den Schädel eingebaut hat. Die Spur führt zu einem geheimen Konzernlabor in Deutschland...',
		edition: 2,
		gameDate: '2050',
		name: 'TAKC 3000',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: ['2002'],
		sku: ['345321319X'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Nichts ist ihm geblieben. Keine Erinnerung an sein früheres Leben, nicht einmal ein Name, der ihm sagen könnte, wer er war oder ist. Doch offensichtlich wissen andere Mächte von ihm, denn sie haben sich bereits auf seine Spur gesetzt. Bedroht durch eine elfische Profi-Killerin, verfolgt von einem großen Waffenkonzern und gestrandet in der dunkelsten Ecke des Rhein-Ruhr-Megaplexes, versucht ein Mann ohne Erinnerungen, die Schleier seiner Amnesie zu durchdringen und seine Identität wiederzufinden. Unterstützt wird er auf dieser gefährlichen Suche, die ihn bis in den Kirchenstaat Westphalen führt, von einer Magierin, die selbst die Schatten ihrer eigenen Erinnerungen verdrängen will.\nGefangen zwischen einer verlorenen Vergangenheit und einer unsicheren Zukunft, stellt sich schließlich die Frage, ob er die Antworten auf seine Gedächtnislücken wirklich wissen will und ob der Preis für diese Antworten nicht doch zu hoch ist.',
		edition: 2,
		gameDate: '2050',
		name: 'Nachtstreife',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: [
			'1999',
			'2002'
		],
		sku: ['3453213203'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Eine Serie brutaler Morde im Zweibrücker Milieu versetzt die Bevölkerung in Angst und Schrecken. Die Beamten des Landeskriminalamts ermitteln fieberhaft, um die rätselhaften Verbrechen rasch aufzuklären, und auch Poolitzers berufliche Neugier ist geweckt. Zunächst gehen die Ermittler von einem fanatischen Einzeltäter aus, doch die Präzision der Schüsse, mit denen die Opfer niedergestreckt wurden, sowie die Verwendung einer bislang unbekannten Munition deuten darauf hin, dass ein neuartiges Gefechtsmodul zum Einsatz kam, das von einem der großen Rüstungskonzerne in der hermetisch abgeriegelten Sonderzone entwickelt wurde. Bei seinen Recherchen am Tatort eines neuerlichen Verbrechens stößt Poolitzer auf Gee Gee, die als Einzige das Massaker in dem Nachtclub überlebt hat, und schon bald verfällt der Reporter den Reizen der attraktiven Schauspielerin. Doch Gee Gee, die ihren Freund und Mentor verloren hat, kennt nur ein Ziel: sie will sich an den Verantwortlichen rächen...',
		edition: 2,
		gameDate: '2050',
		name: 'Gottes Engel',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: ['2002'],
		sku: ['3453863224'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Bei seinen Recherchen in der magischen Szene Thüringens wird Poolitzer auf eine mysteriöse Diebstahlserie aufmerksam: Nahezu identische Kassetten sind aus verschiedenen Sammlungen und Museen verschwunden. Die letzte dieser magisch gesicherten Kassetten wird im Tresor der Weimarer Universitätsbibliothek verwahrt. Doch dann kommt noch eine weitere Kassette zum Vorschein: Das Team der Black Barons hat bei einem Auswärtsspiel in Moskau unter verlustreichen Kämpfen eines der begehrten Stücke erbeutet. Poolitzer reist nach Mainz und taucht ein in die faszinierende Welt der Stadtkriegspieler und ihres gefeierten Stars, der Elfin Tattoo. Und allmählich zeichnet sich ab, wer hinter den Diebstählen steckt: der skrupellose Kunsthändler Zozoria, Chef von Antique Enterprises, der alles daran setzt, Aeternitas, den Schlüssel zum ewigen Leben, in seine Hände zu bekommen, der sich in einer der Kassetten befindet...',
		edition: 2,
		gameDate: '2050',
		name: 'Aeternitas',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: ['2003-07-01'],
		sku: ['3453870581'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Eine brutale Verbrechensserie im Großraum Stuttgart versetzt die Bevölkerung in helle Aufregung. Poolitzer wittert eine sensationelle Story, denn der Täter imitiert die Verbrechen von Jack the Ripper und anderen legendären Kriminellen. Zusammen mit seinem Troll-Freund Ultra, der in seine Fußstapfen als Reporter treten will, stellt er eigene Nachforschungen an und stößt auf den Hypnotiseur Ranjit, dessen Auftritt in einem Ludwigsburger Nachtclub in einem Debakel endete. Mitten in einer Hypnose-Vorführung stürmten jugendliche Rabauken um den reichen Schnösel Johann von Boesche die Bühne und richteten ein Chaos an, woraufhin einer der Hypnotisierten spurlos verschwand. Jetzt gilt es, den Unbekannten zu finden und aus seiner Trance zu erwecken, um das Morden zu beenden. Poolitzer wähnt sich fast am Ziel, da stellt sich heraus, dass Ranjit gar nicht der ist, der er zu sein scheint...',
		edition: 2,
		gameDate: '2050',
		name: '05:58',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: ['2004'],
		sku: ['3453520076'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Ihr erster Run sollte eine Art Mutprobe sein. Doch er endet im Chaos, bevor er richtig angefangen hat. Psycho, Rock, Tank und Red Eye wird schnell klar, dass es nicht nur an mangelnder Erfahrung lag. Ihr Schieber - Tommy, der Fuchs - hat sie gelinkt. Jetzt sitzen sie zwischen allen Stühlen und müssen ums nackte Überleben kämpfen - in einer Liga, in der sie, die Anfänger, nicht den Hauch einer Chance haben. Doch es gibt mehr Mitspieler als erwartet, und auch der Schieber muss bald erkennen, dass er nicht am Ende der "Nahrungskette" steht...',
		edition: 2,
		gameDate: '2050',
		name: 'Die Anfänger',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: [
			'2002',
			'2005'
		],
		sku: ['3890645720'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Holdo Kraif ist ein begeisterter All-Area-Combat-Golfer, der mit illegalen Wettkämpfen eine Menge Geld verdient. Doch bedauerlicherweise gilt seine Leidenschaft auch dem Glücksspiel und schönen Frauen, und so hat er in den vergangenen Monaten die immense Summe von 100.000 Nuyen Schulden aufgehäuft, die sein Gläubiger, ein Düsseldorfer Yakuza-Gangsterboss, nun binnen weniger Tage zurückhaben will, andernfalls ist Holdo ein toter Mann. Daher kann Holdo seinen jüngsten Sieg, den er mit seiner Buchmacherin Mousse in deren Club feiert, auch nicht richtig genießen. Nach ein paar Flaschen billigem Sekt sieht er nur einen Ausweg aus seiner Misere: Er springt auf die Bühne und präsentiert dem staunenden Publikum die Wette seines Lebens - er wettet, dass er es schafft, eine Woche am Leben zu bleiben, selbst wenn die besten Killer der ADL gegen ihn antreten....',
		edition: 2,
		gameDate: '2050',
		name: 'Jede Wette',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: ['2005'],
		sku: ['3453520939'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Zehn Jahre ist es her, seit Lulatsch, Clown, Grizzly und Madame Trix ihren letzten Coup gelandet haben. Und ein Jahrzehnt ist in der sechsten Welt eine lange Zeit, vor allem für die kurzlebigen Orks und Trolle. Sie haben die Straßen der ADL hinter sich gelassen, aber wie heißt es so schön: Niemand verlässt die Schatten ganz. So holt die Vergangenheit die Runner ein und lässt sie erkennen, dass sie im Jahr 2064 vor allem eines sind: Altes Eisen...',
		edition: 2,
		gameDate: '2050',
		name: 'Altes Eisen',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: ['2005-09-02'],
		sku: ['3453521099'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Der Straßensamurai Jaywalker rettet einen sechsjährigen Jungen vor einem Wahnsinnigen. Er nimmt ihn mit und versucht; mit Hilfe seines Teams herauszufinden, was es mit dem Kind auf sich hat. Doch dann steht plötzlich eine andere Partei quasi vor der Tür. Jaywalker und seinem Team bleibt nichts anderes übrig als unterzutauchen. In der Enge ihres Unterschlupfes kommen die Runner sich näher, als ihnen lieb ist. Alte Spannungen werden plötzlich explosiv und zu allem Überfluss entwickeln sich Gefühle zwischen Jaywalker und der querschnittsgelähmten Deckerin Phoenix, für die in dieser Situation kein Platz ist. Denn ihre Verfolger scheinen jede Bewegung der Runner vorauszusehen.',
		edition: 2,
		gameDate: '2050',
		name: 'Pesadillas',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: [
			'2001',
			'2006'
		],
		sku: ['3811851454'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "Devil's Playground und ihr Sänger Ash stehen kurz vor dem Durchbruch. Ihre Konzerte sind ausverkauft und ihre Fans lieben sie. Auch, oder gerade weil sich die Band in ihren Liedern für Toleranz zwischen Menschen und Metamenschen einsetzen. Ansichten, die einem lokalen Policlub ein Dorn im Auge sind. Ein feiger Anschlag auf Ashs Leben ist eine erste Warnung. Doch wer lässt sich schon einschüchtern, wenn er gerade auf dem Weg nach oben ist? Und da wäre noch Quickshot, der mysteriöse Runner, der gleich einem Geist in den Schatten auftaucht und wieder verschwindet. Doch um in den Schatten zu überleben, braucht man Freunde. Menschen, denen man vertrauen kann. Besonders, wenn auf den eigenen Kopf eine Belohnung ausgesetzt ist.",
		edition: 2,
		gameDate: '2050',
		name: 'Ash',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: [
			'2001',
			'2007'
		],
		sku: ['3890645747'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Walker ist ein vollendeter Gentleman mit eiskaltem Verstand und herausragenden Manieren. Simmons ist ein großschnäuziger Orkdetektiv mit eiskaltem Bier und herausragenden Hauern. Gemeinsam sollen sie im weihnachtlichen Seattle einen brutalen Mord aufklären. Bald stellt sich heraus, dass mehr dahinter steckt - mehr als die beiden sich hätten träumen lassen und vielleicht sogar mehr, als sie ertragen können.',
		edition: 2,
		gameDate: '2050',
		name: 'Shelley',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: [
			'2003',
			'2007-04-02'
		],
		sku: ['3890645801'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Ein Jahr ist verstrichen, seit Ash aus Seattle fliehen musste. Die Welt hält ihn für tot, und an manchen Tagen wünscht er sich, es wäre auch so. Denn obwohl er einen ganzen Ozean zwischen sich und sein früheres Leben gebracht hat, kann er ihm nicht entkommen. Als er schließlich von Kopfgeldjägern aufgespürt wird, muss er sich der Vergangenheit stellen. Seine Flucht führt ihn zurück nach Seattle. In die Stadt, die ihm mehr Ärger eingebracht hat als jede andere. Leider bleibt Ashs Ankunft nicht unbemerkt. Unerwartet taucht ein alter Bekannter auf und bietet ihm einen Job an. Einen riskanten Run, bei dem einiges schief gehen kann. Doch was tut man nicht alles, um eine offene Rechnung zu begleichen?',
		edition: 2,
		gameDate: '2050',
		name: 'Quickshot',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: [
			'2005',
			'2007'
		],
		sku: ['389064595X'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'In einem riskanten Balanceakt bewegt sich Vertigo im Grenzbereich zwischen zwei Welten. Dabei ist es wohl hauptsächlich ihrem Glück und ihren guten Beziehungen zuzuschreiben, dass sich die Katzenschamanin zum oberen Mittelfeld der Schattengemeinde zählen kann: Wenn man dem Rigger Silent Glauben schenken will, dann würde sie im Alleingang niemals auch nur einen Run hinbekommen. Doch auf ihren gefährlichen Gratwanderungen zwischen Licht und Dunkel scheint sich immer wieder alles zu ihren Gunsten zu fügen - bis sich ein geheimnisvoller Schatten in ihr Leben drängt und das labile Gleichgewicht ins Wanken bringt. Was harmlos beginnt, gerät bald außer Kontrolle. Doch Vertigo begreift erst viel zu spät, dass das alles kein Spiel mehr ist.',
		edition: 2,
		gameDate: '2050',
		name: 'Vertigo',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: [
			'2002-09',
			'2007-11-01'
		],
		sku: ['389064581X'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Gottes Wege sind unergründlich.Das muss auch Mark, bekennender Katholik und angehender Mönch, erkennen, als man ihm einen Mord anhängt und er in die Schatten fliehen muss. Ausgerechnet ein für Runs gegen die Kirche bekanntes Runnerteam unter der Führung der Planerin Quiz kommt ihm zur Hilfe. Mark muss mit der rauen Trollsamurai Ferrum, dem Decker Mikropuls und dem Elsternschamanen Glitzer zurechtkommen - und umgekehrt. Bald jedoch erkennt das Team, dass hinter Marks Erlebnissen viel mehr steckt als ein kleiner Machtkampf innerhalb der Kirche. Es steht viel auf dem Spiel, und der Preis, den das Team zahlen muss, ist hoch...',
		edition: 2,
		gameDate: '2050',
		name: 'Im Namen des Herrn',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: [
			'2004-09',
			'2007'
		],
		sku: ['3890645941'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Wenn es nach ihm gegangen wäre, hätte der Brite Daniel P. Fox seinen verdienten Erholungsurlaub von geheimen Regierungsgeschäften eigentlich ruhiger angehen lassen, doch als sein alter Chummer Oz aus Seattle ihm einen lukrativen Leibwächterjob in Übersee anbietet, kommt alles anders. Die unscheinbare Deckerin Eliza Young hat bei einem Run Daten erbeutet, die es anscheinend wert sind, um jeden Preis wiederbeschafft zu werden. Fox und ein Team von ausgesuchten Schattenläufern tauchen mit ihrer Auftraggeberin unter, bekommen aber bald zu spüren, dass man bei einem Gegner wie dem ihren zwar rennen, sich aber nicht verstecken kann. Bald kommt Fox ein beunruhigender Verdacht - Ist er selbst und nicht Eliza das wirkliche Ziel des übermächtig scheinenden Gegners?',
		edition: 2,
		gameDate: '2050',
		name: 'Das Bronzetor / Hand am Hort',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: [
			'2003-03',
			'2008-05-05'
		],
		sku: ['3890645836'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Der dreizehnjährige Boris wächst behütet als Sohn eines Konzernangestellten auf und träumt - inspiriert von Trideo und Matrixspielen - von einem abenteuerlichen Leben in den Schatten. Während eines Kurzurlaubs in München brennt er schließlich durch, um sich seinen Traum zu erfüllen: Er will Runner werden! Mit Credsticks, die er seinem Vater geklaut hat, bezahlt er die Runner Theseus, Cinque und Key, damit sie ihn ausbilden. Doch während er Schießen lernt und seinem ersten Job entgegenfiebert, hat sich längst das Team eines skrupellosen Zwergs an seine Fersen geheftet - denn unter den von Boris mitgenommenen Credsticks befindet sich einer, der viel mehr beinhaltet als Geld und den sein einflussreicher Besitzer unter allen Umständen zurückwill. Bald dämmert Boris, dass die realen Schatten viel dunkler sind als die aus dem Trideo.',
		edition: 2,
		gameDate: '2050',
		name: 'Der Schattenlehrling',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: [
			'2006',
			'2008'
		],
		sku: ['3890644821'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "Der Auftrag sieht voll nach Routine aus: Personenschutz ist angesagt. Aber 'schon bald entwickelt sich die Sache für das Runner-Team Pik Dame zu einem Fiasko ersten Grades. Ein mysteriöser Unbekannter taucht auf und verstrickt die Runner in ein Komplott innerhalb des Big Business. Trotz der Unterstützung illustrer Gestalten aus der Szene schließt sich das Netz um Pik Dame immer enger. Ein Entkommen aus den Klauen der Konzerne scheint unmöglich...",
		edition: 2,
		gameDate: '2050',
		name: 'Auf dem Sprung',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: [
			'2000',
			'2003'
		],
		sku: ['3811851365'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Hamburg mitten im 21. Jahrhundert: Glitzer und Gosse liegen dicht beinander, und in dieser Welt schlägt sich eine Gruppe von Runnern - das Team Pik Dame - von einem Job zum anderen durch. Diesmal erhält sie den Auftrag, Personenschutz für die charismatische Sängerin Eternity zu stellen. Gleichzeitig wird die Hamburger Musikszene von einer Mordserie erschüttert. Stars und einflussreiche Persönlichkeiten fallen unerklärlichen Mental-Attacken zum Opfer, aber auch gedungene Attentäter treiben ihr blutiges Unwesen. Pik Dames zunächst einfach aussehender Auftrag wird zur mittleren Katastrophe, als sich die steife Hamburger Brise zu einem Orkan des Terrors auswächst...',
		edition: 2,
		gameDate: '2050',
		name: 'Töne der Unendlichkeit',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: [
			'2001',
			'2003'
		],
		sku: ['3811851373'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Zunächst hat Poolitzer die AG Chemie Beiersdorf im Verdacht, sie wolle einen Umweltskandal vertuschen. Als jedoch hochmoderne Sharkskin-Powerboote vom Testgelände einer Werft verschwinden und ein Schiff mit atomarem Sondermüll gekapert wird, argwöhnt der Reporter, dass Terroristen im Ostseeraum ihr Unwesen treiben. Steckt etwa sein alter Widersacher, Staatsanwalt Mathias Fröhlich-Eisner, dahinter? Der charismatische Politiker ist der neue Star der einstmals rechtsradikalen Deutschnationalen Partei, und unter dem Deckmantel der Gesetzestreue und Ordnungsliebe steht er kurz davor, einen grandiosen Wahlsieg zu erringen. Poolitzer lässt sich von diesem scheinbaren Gesinnungswandel nicht täuschen und findet heraus, dass Fröhlich-Eisner in Verbindung mit Aktivisten der Nationalen Aktion steht, die Anschläge mit Massenvernichtungswaffen gegen das Elfenreich Herzogtum Pomorya vorbereiten. Doch der Reporter hat seinen Gegner sträflich unterschätzt...',
		edition: 2,
		gameDate: '2050',
		name: 'Sturmvogel',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: ['2004-07'],
		sku: ['345387904X'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Das Runnerteam Pik-Dame existiert nicht mehr. Paul, Pandora, Claw, Zack, Snap und Chet gehen längst ihre eigenen Wege. Doch dann taucht eine alte Bedrohung aus der gemeinsamen Vergangenheit auf und zwingt die Runner, sich wieder zusammenzuschließen. Die Feinde sind heute mächtiger als je zuvor — und es gibt sogar Anzeichen dafür, dass ein Verräter in den eigenen Reihen lauert.\n\nElementares Wissen ist der Abschluss und Höhepunkt von Harri Aßmanns Nordlichter-Trilogie.',
		edition: 2,
		gameDate: '2050',
		name: 'Elementares Wissen',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: [
			'2002',
			'2004'
		],
		sku: ['3890645704'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Zu viele Köche verderben den Brei, sagt man – und zu viele Shadowrunner, die hinter der gleichen Zielperson her sind, verderben der Schattenläuferin Karo Ass mächtig die Laune. Nicht zuletzt deshalb, weil auch die Zielperson, Österreichs Vizekanzler Hacklhuber, nicht untätig bleibt und verzweifelt versucht, den Kopf aus der Schlinge zu ziehen. Ein dramatischer Wettlauf durch die Schatten beginnt...',
		edition: 2,
		gameDate: '2050',
		name: 'Cash',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: ['2009-02'],
		sku: ['9783453525153'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Flynn, Straßensamurai aus Seattle, ist nach Hamburg gekommen, um unterzutauchen. Jetzt ist er hier schon wieder auf der Flucht vor zwei unbekannten Runnern. Die etwas von ihm fordern, das er nicht hat. Von dem er nicht einmal weiß, was es ist. Er ist zur falschen Zeit am falschen Ort gewesen. Kann er in der fremden Stadt den Hals aus der Schlinge ziehen? Unfreiwillige Unterstützung erhält er von Wildcard. Die Straßenkämpferin macht jeden Gegenstand zur Waffe und hält Beziehungen für eine Krankheit. Aspen, Wildcards Mechaniker, ein Überlebenskünstler und Träumer, würde alles geben für ein richtiges Abenteuer. Er soll mehr Abenteuer bekommen, als ihm lieb ist.',
		edition: 2,
		gameDate: '2050',
		name: 'Flynns Weg',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: ['2003-06'],
		sku: ['3890645852'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Anthologie mit Shadowrun-Storys deutscher Autoren. Mitherausgeberin Maike Hallmann, selbst Autorin dieser Reihe, hat durch einen Wettbewerb die vielversprechendsten neuen Talente der deutschen Shadowrunszene ermittelt und lässt sie hier kraftvoll zu Wort kommen.',
		edition: 2,
		gameDate: '2050',
		name: 'Matrixfeuer',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: ['2003-12'],
		sku: ['3890645879'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Was wird aus Rachedurstgelüsten, wenn sie vier Jahre Zeit haben, vor sich hinzugären? Der Straßensamurai Jaywalker macht sich auf, um das herauszufinden. Vier Jahre nach dem Zerfall seines Teams kehrt er nach Seattle zurück. Seine Ankunft löst heilloses Chaos aus. Vor allem Conquistador, der sich längst aus den Schatten zurückgezogen hat, sieht sich mit der Frage konfrontiert, welchen Preis er für seine Rache zu zahlen bereit ist. Doch da ist auch noch der Magier Sokata. Und der hat sehr genaue Vorstellungen davon, wie er mit dem Problem >Jaywalker< verfahren will.',
		edition: 2,
		gameDate: '2050',
		name: 'Wiedergänger',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: ['2005-04'],
		sku: ['3890645933'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'In einem kleinen Laden soll ein Koffer mit gestohlener High-Tech übergeben werden, doch die Aktion geht schief. Der zufällig anwesende Rabenschamane Spider kriegt das Diebesgut in die Finger - und flüchtet mit seinem Kumpel Ali in den Untergrund. Jade und sein Team werden angeheuert, die beiden ausfindig zu machen und die Ware wiederzubeschaffen. Eine chaotische Suche beginnt, die nicht nur durch Jades persönliche Probleme erschwert wird. Doch nicht nur diese beiden Parteien sind hinter dem Koffer her und bekanntlich heißt es ja: Wenn Zwei sich streiten, freut sich der Dritte.',
		edition: 2,
		gameDate: '2050',
		name: 'Im Fadenkreuz',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: ['2005-07'],
		sku: ['3890645437'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Kyon als zynischen Mistkerl zu bezeichnen wäre eine Beleidigung für alle zynischen Mistkerle der sechsten Welt. Der Ex-Agent mit den ätzenden Sprüchen und dem Charme eines erwachten Stinktiers hält sich mit kleinen Gaunereien und Botenjobs über Wasser, bis er wieder einmal für einen ordentlichen Run angeheuert wird. Doch dieser "einfache Datenraub" droht dem Misanthropen über den Kopf zu wachsen...',
		edition: 2,
		gameDate: '2050',
		name: 'Feuerzauber',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: ['2005-05'],
		sku: ['3890645194'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'novel',
		description: "Kaum ist endlich genug Gras über eine Sache gewachsen, kommt irgend ein Esel daher, und frisst es wieder weg.\n\nDas ist besonders ärgerlich, wenn man Spitzenpolitiker ist und es auch bleiben möchte. So ist es dem Vizekanzler Hacklhuber gar nicht recht, dass ausgerechnet zu beginn des Wahlkampfs ein paar pikante Details aus seiner Zeit aus den Eurokriegen an die Öffentlichkeit dringen könnten. Deswegen ist er auch gar nicht gut auf die Schattenläufer Karo Ass, Topolino und Peperoni zu sprechen, aber diese 'Esel' lassen sich nicht so einfach zum Schweigen bringen, kaum dass sie sich im ersten Band dieses Zweiteilers zu einem schlagkräftigen Team zusammen geschlossen haben...",
		edition: 2,
		gameDate: '2050',
		name: 'GmbH',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: ['2006'],
		sku: ['3890644635'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Der russische Kommando-Soldat Mischko erhält einen letzen Auftrag, bevor er der Armee den Rücken kehrt: Er soll mit seinem Kameraden Nikita und einem Team deutscher Söldner eine illegale Ladung quer durch die Steppe nach Sibirien bringen. Die beiden russischen Soldaten müssen mit Leuten zusammenarbeiten, die sich selbst als Shadowrunner bezeichnen, weder Ehre noch Pflicht kennen und nur zu willig sind, ihren Auftraggeber über den Tisch zu ziehen. Und dann bricht zwischen den Steppennomaden ein Krieg aus. Mit einer Kurzgeschichte von Martina Noeth.',
		edition: 2,
		gameDate: '2050',
		name: 'Kettenhund',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: ['2005-11'],
		sku: ['3890645488'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Zuviele Köche verderben den Brei, so sagt man, und zu viele Shadowrunner, die hinter der gleichen Zielperson herhecheln, verderben Karo Ass die Laune. Jetzt, wo sie ihr Team endlich um sich geschart hat, und bereit ist loszuschlagen, kommt ihr ungebetene Konkurrenz alles andere als gelegen. Nicht zuletzt deshalb, weil auch die Zielperson, Österreichs Vizekanzler Hacklhuber, nicht untätig bleibt und verzweifelt versucht, den Kopf aus der Schlinge zu ziehen, die sich immer enger um seinen Hals zusammenzieht.',
		edition: 2,
		gameDate: '2050',
		name: 'Cash Flow',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: ['2006'],
		sku: ['389064483X'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Kyon, der Zyniker ("Feuerzauber") und Mark, der Betbruder ("Im Namen des Herrn"), könnten unterschiedlicher nicht sein. Dennoch stehen sie sich näher, als sie ahnen. Jetzt kommen sie zusammen, um - im wahrsten Sinne des Wortes das - Abenteuer ihres Lebens zu bestehen. Zusammen mit ihren Gefährten Quiz, Glitzer, Kl und Marie setzen sie sich auf die Spur eines heimtückischen Mörders mit bekanntem Gesicht und treffen auf alte Feinde in neuem Gewand.',
		edition: 2,
		gameDate: '2050',
		name: 'Böses Erwachen',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: ['1006'],
		sku: ['3890644732'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Dresden 2061: Bei einem Unfall in einer Chemiefabrik, kommen ein Runnerteam und alles beteiligte Sicherheitspersonal bis auf Seth Morgan ums Leben. Er verliert durch die schweren Verletzungen und eine Vergiftung, einen großen Teil seiner Essenz, sowie seine magischen Fähigkeiten komplett. Seth Morgan findet sich zwei Jahre später in der Unterschicht Dresdens wieder. Seine Vergiftung konnte er nicht heilen, aber einen Teil seiner Magie mit einem experimentellen Medikament wieder herstellen. Dieses ist eigentlich als Gift erfunden worden und er ist inzwischen von der Substanz abhängig. Seth muss ständig Geld auftreiben um seine Medikamente zu bezahlen. Ein Fernziel ist es, Geld in die Forschung nach einer endgültigen Heilung stecken zu können. Seine letzte Möglichkeit ist es, sich auf die Seite der ehemaligen Gegner zu schlagen und ein Runner zu werden. Es gibt jedoch einen wichtigen Unterschied: Es geht für Seth nicht um Geld, sondern um Alles.',
		edition: 2,
		gameDate: '2050',
		name: 'Junx: Die Schatten Dresdens',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: ['2010'],
		sku: ['9783839154137'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'novel',
		description: '...Schwere Unwetter fegen über München hinweg und verwandeln den Sprawl in ein Chaos. Der Sturm bricht aber auch im Untergrund los, denn in den Elendsvierteln tobt eine gnadenlose Hexenjagd. Sie droht die aufgehetzte Bevölkerung zu erfassen und die Straßen in Blut und Asche versinken zu lassen. Auf der Suche nach einem unsichtbaren Gegner sind die gejagten Runner vielleicht der entscheidende Faktor, der die Zivilisation, wie wir sie kennen, in den Abgrund stürzen könnte. Ein gefährliches Bündnis mit dem Feind des Feindes scheint die einzige Möglichkeit, den drohenden Kollaps zu verhindern. Immer vorausgesetzt, die manipulierten Marionetten blasen sich vorher nicht gegenseitig das Licht aus.',
		edition: 2,
		gameDate: '2050',
		name: 'Digitaler Albtraum',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: ['2008-02'],
		sku: ['9783890641232'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Das Schicksal hat einen merkwürdigen Sinn für Humor, muss der elfische Ki-Adept Renegade feststellen. Es zwingt ihn, den zwergischen Juwelier Stephen zu retten. Vor Verfolgern, einem freien Geist der Flammen und allzu oft vor sich selbst. Ist das silberne Amulett, das Stephen in die Hände gefallen ist und mit dem alle Probleme begannen, all den Ärger wert? Ähnliches fragt sich auch ein ungleiches Paar, die orkische Riggerin Hammer und Cox, seines Zeichens etwas zu emotionaler, menschlicher Magier. Doch während Stephen mit dem Zurückgewinnen seiner bürgerlichen Existenz alle Hände voll zu tun hat, steht für Hammer und Cox mehr auf dem Spiel. Ein mächtiger freier Flammengeist wurde in unsere Welt gerufen und es ist an den beiden, ihn in Vergessenheit und damit allen Sicherheit zu bringen.',
		edition: 2,
		gameDate: '2050',
		name: 'Flammenmeer',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: ['2007'],
		sku: ['9783890644974'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Jari, ein Schieber in London, nimmt von einem sehr undurchsichtigen Auftraggeber einen hochprofitablen Job an: die Tränen Fatimas zu bergen und an einen sicheren Ort zu bringen. Nur handelt es sich dabei um heilige Artefakte einer muslimischen Sekte, die Tränen gelten als magisch, und der "sichere Ort" befindet sich im Norden Afghanistans. Die Shadowrunner, die den Auftrag erfüllen sollen, sind rasch gefunden: Flechette, die italienisch-deutsche Runnerin, nimmt ihn an, um ihrerseits einen Gefallen einzufordern, Reynard, ein sehr junger Runner aus gutem Haus, will Abenteuer erleben, und der Adlerschamane Voiata hat keine andere Wahl. Aber er hat andere Pläne - und Rechnungen zu begleichen.',
		edition: 2,
		gameDate: '2050',
		name: 'Fatimas Tränen',
		originalLanguage: 'de-DE',
		publisher: ['Heyne Verlag'],
		releaseDate: ['2007'],
		sku: ['3890645131'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Riggs liebt die einfachen Dinge des Lebens: Actionfilme des letzten Jahrtausends, Aldi-Burger mit extra Röstzwiebelaroma und unkomplizierte Aufträge. Leider meint es das Schicksal nicht besonders gut mit ihm, als es ihn zu einer eigentlich recht unaufregend klingenden Datenextraktion in den Süden der ADL verschlägt. Denn es kommt, wie immer, anders als geplant: Ein kurioser und verlustreicher Run folgt dem nächsten. Bald fühlt sich Riggs wie der Hauptdarsteller in einem Adventure-Trid.\nDoch dann wird er persönlich in das Geflecht aus Schuld, Gewalt und Erbe aus Vergangenheit und Gegenwart verstrickt. Der Weg durch die Schatten wird eine Horrorstory – aus der es vielleicht kein Entrinnen mehr gibt.',
		edition: 5,
		gameDate: '2075',
		name: 'Der vitruvianische Moment',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2018-10-19'],
		sku: ['35010'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'novel',
		description: '2078. Die Welt hat sich verändert. Einige sagen sie sei erwacht. Seit Jahrzehnten zählen Zwerge, Elfen, Orks und Trolle zur Metamenschheit. Drachen wurden Präsidenten und ermordet. Großkonzerne bestimmen das Geschick der Länder. Wer Geld hat, verbessert sich mit Bio- und Cyberware. Wer Glück hat, kann Magie wirken. Und alle sind in der weltumspannenden Matrix unterwegs, die aus dem letzten Netz-Crash allumfassender erwuchs als je zuvor. Das Ruhrgebiet, Köln und Düsseldorf sind zu einem riesigen Moloch zusammengewuchert – dem Rhein-Ruhr-Megaplex. Während die Arkologien der Megakonzerne in Licht erstrahlen, versinken ganze Stadtgebiete in Schatten und Chaos. Der junge Hacker Iwan stammt aus einem dieser Gebiete, der Dortmunder Nordstadt. Er versucht alles, um einen Weg ans Licht zu finden. Als er scheitert, ist seine letzte Hoffnung die Seelie Mae. Doch ein dunkles Geheimnis umgibt diese Fee. Und sie ist auf der Flucht, verfolgt von skrupellosen Mördern. Der brutalste unter ihnen ist Rhoslyn, der sich in einer Schneise der Zerstörung durch die für ihn neue Welt von Matrix und Maschinen fräst. Auch ein Team Shadowrunner wird zur Jagd auf Mae erpresst. Jäger und Gejagte erzeugen einen Strudel aus Gewalt und Alpträumen, der Iwan für immer zu verschlingen droht.',
		edition: 5,
		gameDate: '2078',
		name: 'Iwans Weg',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2018-03-29'],
		sku: ['3957891728'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Wo niemand deinen Namen kennt\n\nDer Rhein-Ruhr-Megaplex. Eine Verheißung für Schattenläufer. Jedenfalls für die Gewitzten. Gestalt gewordenes Chaos, das volle Taschen oder durchsiebte Körper verspricht. Rex hat es nicht leicht in diesem brodelnden Megaplex. Er führt nicht nur als Ork ein aufstrebendes Runnerteam an, er ist auch nicht bereit, für einen schnellen Euro seine moralischen Grundsätze über Bord zu werfen. Da klingt der Auftrag des Schmidt fast zu gut: Einbruch in eine BuMoNa-Klinik. Gut bezahlt. Das eigene Team im Rücken. Was soll da schon schiefgehen? Doch auf einmal muß Rex alles retten, was ihm lieb und teuer ist: seinen Ruf, seine Familie, sein Team. Und um das zu schaffen, liegt ein schier unmöglicher Run vor ihm.',
		edition: 5,
		gameDate: '2075',
		name: 'Orks weinen nicht',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2018-07'],
		sku: ['35008'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Alles im Alleingang\n\nDer Berliner Großstadtdschungel des Jahres 2076 ist ein Schmelztigel aus skrupellosen Konzernen, der allgegenwärtigen Sprawlguerilla und türkischen Nationalisten. Um sich nicht in dem Gewirr aus Gier, Macht und Digitalen Drogen zu verirren, hat Paul Dante nicht mehr viel aufzubieten. Die Karriere des Privatschnüfflers liegt in Trümmern, seine Magie ist nahezu ausgebrannt, und auf seiner Kontaktliste stehen mehr Feinde als er zählen kann.\n\nAls ihm ein Auftrag aus der Sonnenseite des Metroplexes auf den virtuellen Schreibtisch flattert, zögert er nicht lange. Die Zeta-Imp-Chem Managerin Mailin Nowak auf der Suche nach einem verschwundenen Lokalpolitiker und bereit, dem Privatdetektiv einen großen Batzen Euros zu zahlen, sollte er den Vermissten ausfindig machen. Paul ahnt noch nicht, dass er sich auf die gefährlichste Reise seines Lebens begibt, bei der er weitaus mehr zu verlieren hat, als nur den Verstand.',
		edition: 5,
		gameDate: '2075',
		name: 'Alter Ego',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2018-09-21'],
		sku: ['35009'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'novel',
		description: "In the abandoned factory known as the Crypt, society's castoffs have found a place to call home. Some of the Crypt's denizens are hiding or on the run; some have nowhere left to go. But the Crypt protects its own, providing care for street kids as well as medical and magical healing for those in need. It also sports an illegal tap into the Matrix, and hosts a coven of some of the most successful shadowrunners around.\nWhen a disgraced corporate mover takes an interest in the Crypt - and in a valuable secret long hidden in its foundations - he doesn't intend to let the dregs of Seattle keep him from making the score of a lifetime. But he's about to discover that the Crypt's inhabitants aren't going to be buried so easily....",
		edition: 3,
		gameDate: '2063',
		name: 'A Fistful of Data',
		names: {
			'de-DE': 'Für eine Handvoll Daten'
		},
		originalLanguage: 'en-US',
		publisher: [
			'WizKids Games',
			'Heyne Verlag'
		],
		releaseDate: ['2006-10'],
		sku: [
			'46116-9',
			'27832'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "[Kellan Colt Trilogy #3] Kellan Colt has come far in her magical training. but all her accomplishments haven't satisfied her desire to know the truth about her shadowrunner mother, and to learn the secrets of the amulet she found among her mother's possessions. Kellan is determined to find answers - and to earn the respect of her fellow runners in the process.\nLately Kellan has been troubled by disturbing dreams. Something seems to be calling her, but before she can figure out who - or what - she joins a run into the paranoiac elven homeland of Tir Tairngire. Trapped deep inside foreign territory, she suddenly discovers the answers to her questions, but then she must unravel the most difficult riddle of all: Who can she really trust in the shadows?",
		edition: 3,
		gameDate: '2063',
		name: 'Fallen Angels',
		originalLanguage: 'en-US',
		publisher: ['WizKids Games'],
		releaseDate: ['2006-03'],
		sku: [
			'46076-6',
			'27830'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "[Kellan Colt Trilogy #2] Kellan Colt has been making a name for herself as one of Seattle's up-and-coming shadowrunners, and she believes she's ready to break out on her own. Opportunity knocks when she learns the location of a secret weapons cache abandoned by the U.S. military. With the right buyer, a score this big has the potential to secure Kellan's reputation - and her bank account.\nWith a team of fellow shadowrunners assisting her, Kellan descends deep into the heart of the Awakened wilderness to extract the weapons. But the supernatural entities lurking in the forest beome the least of her worries when a rival facton appears seeking the cache - and the greatest threat to them all is revealed....",
		edition: 3,
		gameDate: '2063',
		name: 'Poison Agendas',
		originalLanguage: 'en-US',
		publisher: ['WizKids Games'],
		releaseDate: ['2006-01'],
		sku: [
			'46063-4',
			'27829'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'The troll known as Hood and his fellow Shadowrunners steal some biotechnological agriculture from the Plantech Corporation--only to find themselves framed for murder and tied to an even greater conspiracy.',
		edition: 3,
		gameDate: '2063',
		name: 'Aftershock',
		names: {
			'de-DE': 'Aftershocks'
		},
		originalLanguage: 'en-US',
		publisher: [
			'WizKids Games',
			'Heyne Verlag'
		],
		releaseDate: ['2006-07'],
		sku: [
			'46101-0',
			'27828'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "Bannickburn is a burned-out Scottish mage with little power and fewer prospects when he falls into fast company. A notorious crime boss, Bigio family caporegime Quinn Bailey offers him a job that could turn hs life around. Soon Bannickburn is living once again in the style he's accustomed to.\nBut then Bannickburn tries to leave the family, Bailey calls in his markers, and Bannickburn must aid the Bigios as they pit themselves against a rival mob in a power struggle that moves from the Seattle sprawl to the elven enclaive of Portland. Leading a handpicked crew of shadowrunners, Bannickburn is about to hit the jackpot - and learn that in every game, winners can turn into losers with the squeeze of a trigger....",
		edition: 3,
		gameDate: '2063',
		name: 'Drops of Corruption',
		names: {
			'de-DE': 'Machtgelüste'
		},
		originalLanguage: 'en-US',
		publisher: [
			'WizKids Games',
			'Heyne Verlag'
		],
		releaseDate: ['2006-05'],
		sku: [
			'46083-9',
			'27827'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Murder, Mystery, Intrigue and Betrayal! A story in foggy old England of 2054, the 1st book with elven mage Serrin Shamander and British Lord Geraint Llanfrechfa.',
		edition: 2,
		gameDate: '2054',
		name: 'Streets of Blood',
		names: {
			'de-DE': 'Blutige Straßen'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Heyne Verlag'
		],
		releaseDate: ['1992-12'],
		sku: ['5199'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "In 2055, Newark is an over-crowded urban nightmare populated by hordes of SINless indigents. Millions live in abject poverty. Violence is rampant. Brutal gangs and vicious criminals control many sections of the city like feudal lords.\nAmid this harrowing landscape, Rico gathers his team: Shank, Thorvin, Piper, and the eccentric shaman known as Bandit. The job is to free a man from a corporate contract that is the moral equivalent of slavery, but that is only the beginning. The runners' diverse skills and talents are swiftly put to the test. Rico's challenge is to keep the team alive as they sort through a maze of corporate intrigue and misdirection, but without discarding honor, for without honor a man is nothing.\nHonor alone distinguishes a man from the ravaging dogs that fill the streets, and as the runners soon learn, the price of honor is high.",
		edition: 2,
		gameDate: '2054',
		name: 'Fade to Black',
		names: {
			'de-DE': 'In die Dunkelheit'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1994-04',
			'2003-06'
		],
		sku: [
			'5365',
			'27808'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Prey for the hunter.\nFor the world of humans knows her as Striper, the deadly Asian assassin and kick-artist. She has come to the City of Brotherly Love seeking revenge and made it her killing ground. But she is not the only predator stalking the dark underbelly of the Philadelphia metroplex. There are other hunters prowling the night, and some possess a power even greater than hers.\nSome may even want her dead.\nWhen the moon rises full and brilliant into the dark pall of the night, the bestial side of her nature battles for dominion, demanding vengeance and death.\nWho will survive?\nWho dares to hunt the hunter?',
		edition: 2,
		gameDate: '2053',
		name: 'Striper Assassin',
		names: {
			'de-DE': 'Die Attentäterin'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1993-06',
			'2003-06'
		],
		sku: [
			'5313',
			'27805'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Mage and part-time shadowrunner Serrin Shamander and his companions desperately flee a relentless, demonic enemy out to eliminate humankind from the face of the earth. This is the 2nd book with renegade elven mage Serrin Shamander and British Lord Geraint Llanfrechfa.',
		edition: 2,
		gameDate: '2053',
		name: 'Nosferatu',
		names: {
			'de-DE': 'Nosferatu 2055'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1994-08',
			'2003-06'
		],
		sku: ['5427'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "With gangs conquering the streets of Seattle, Rick Larson, doing undercover work for Lone Star, Seattle's contracted police force, finds himself on the wrong side of the law.",
		edition: 2,
		gameDate: '2053',
		name: 'Lone Wolf',
		names: {
			'de-DE': 'Der Einzelgänger'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1994-02',
			'2003-06'
		],
		sku: ['5367'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "For years, Jason Chase was at the head of the pack, shadowrunning with the best in the business. When time dulled his flesh and cybernetic edge, he knew it was time to get out, or get dead.\nNow, his past has come back to haunt him. To protect a young girl from the terrorists who want her dead, Chase must rely on his years of experience, and whatever his body has left to give. And everything he's got, he'll need as he comes face-to-face with a part of his life he thought he'd left behind, and an enemy left for dead.",
		edition: 2,
		gameDate: '2053',
		name: "Night's Pawn",
		names: {
			'de-DE': 'Spielball der Nacht'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1993-04',
			'2003-06'
		],
		sku: [
			'5310',
			'27803'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Chicago - Peter Clarris was a human boy who changed into a troll. He grows up surviving as a shadowrunner.',
		edition: 2,
		gameDate: '2052',
		name: 'Changeling',
		names: {
			'de-DE': 'Der Wechselbalg'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1992-06',
			'2003-06'
		],
		sku: ['5218'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Private Detective Dirk Montgomery thinks he knows the streets. He watched the change of the world, as magic grows and alter the balance of power, he thinks he understands the deepest shadows and the darkest of hearts. He was wrong….',
		edition: 2,
		gameDate: '2052',
		name: '2XS',
		names: {
			'de-DE': '2XS'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs',
			'Heyne Verlag'
		],
		releaseDate: [
			'1992-02',
			'2003-07'
		],
		sku: ['5210'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "Sly is a veteran. She's run more shadows than she cares to remember, and has the physical and emotional scars to prove it. But no matter how violent it became, it had always been business as usual. Until now. Falcon is a kid. He thinks he hears the call of magic, and the voice of one of the Great Spirits seems to whisper in his hear. He's gone to Seattle, the urban jungle, to seek his calling. Thrown together, veteran and novice, Sly and Falcon find themselves embroiled in a deadly confrontation between the world's most powerful corporations. If this confrontation is not stopped it could turn into all-out warfare, spilling out of the shadows and onto the streets themselves.",
		edition: 2,
		gameDate: '2053',
		name: 'Shadowplay',
		names: {
			'de-DE': 'Schattenspiele'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Heyne Verlag'
		],
		releaseDate: ['1997-02'],
		sku: ['5302'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'When Kham, an ork living in the Seattle ghetto in the year 2053, is suddenly snatched from his day-to-day existence and thrust into a world of dragons, he learns the hard way whom to trust.',
		edition: 2,
		gameDate: '2053',
		name: 'Never Trust an Elf',
		names: {
			'de-DE': 'Trau keinem Elf'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Heyne Verlag'
		],
		releaseDate: [
			'1992-08',
			'2003-06'
		],
		sku: [
			'5220',
			'27804'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: '[Kellan Colt Trilogy #1] Seattle Metroplex - Kellan Colt goes to Seattle to learn how to be a professional shadowrunner and discover her past.',
		edition: 3,
		gameDate: '2063',
		name: 'Born to Run',
		originalLanguage: 'en-US',
		publisher: ['WizKids Games'],
		releaseDate: ['2005-11'],
		sku: ['46058-8'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Thanksgiving, 2075. Shadowrunning vampire-mage Rick “Red” Lang used to make his living hunting dangerous insect spirits and twisted mages, but when he awakens after twelve years of involuntary hibernation, he finds the rest of the world has gotten even stranger.\nRed begins piecing together what had happened during his lost time—and who put him under in the first place. But as he journeys through the neon-drenched ruins of Chicago and its augmented facades, Red uncovers an even larger plot involving eldritch forces seeking to invade from beyond our reality. He teams up with the few allies he can trust—Pretty, a beautiful ghoul, and Slim, a hacker extraordinaire—as they head into the middle of multiple schemes and power plays surrounding a dangerous new conflict threatening to shatter the uneasy peace into all-consuming chaos.',
		edition: 5,
		gameDate: '2075',
		name: 'Crimson',
		names: {
			'de-DE': 'Karmesin'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: ['2015-04-01'],
		sku: ['26854'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Kazuma Tetsu is a technomancer—one of the rare people who can manipulate the Matrix without technology, using only the power of their mind. But he’s on a more personal mission—he’s searching for his missing sister, Hitori. Following her trail leads him into a tangled web of corp execs, mercenaries, and double-crossing rogues—usually just another day in the Sixth World.\nBut as Kazuma digs deeper, he uncovers a plot that could bring about the end of the world. Upon seeing a simulation of the Resonances Realms accessible to technomancers, an A.I. declares it will use the realms to ascend to a higher plane of consciousness. The intelligence’s goal seems impossible, until an imprisoned and manipulated group of technomancers accesses dissonance to open a gateway to a new realm—possibly the heaven the A.I. seeks. But opening this dissonant hole in the Matrix could trigger global disaster, and it’s up to a team of shadowrunners, including a couple of denizens of the fabled JackPoint, to free the trapped technomancers and stop the Dark Resonance before it destroys the entire Matrix—and worse …',
		edition: 5,
		gameDate: '2075',
		name: 'Dark Resonance',
		names: {
			'de-DE': 'Dunkle Resonanz'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: ['2014-12-28'],
		sku: ['26853'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Shadowrunner Katar Hawke knows the score on the streets. Every job is to be executed swiftly and simply—no muss, no fuss, and with as little help as possible. But when an extraction of a seemingly ordinary grad student from a Central American dig goes south in a big way, Hawke has to keep them both alive while he figures out what he’s stumbled into—and how to get out of it in one piece.\nBut nothing about this shadowrun is remotely ordinary. The student, Rachel Gordon, has unearthed an artifact linking the Sixth World and the long gone, magical Second World. The discovery sets off a lethal chain reaction of feuding megacorporations and cold-blooded killers who will do anything to get their hands on her and what she knows.\nCaught in the hardest of hard places, Hawke must break his cardinal rule and assemble his own shadowrunning team to survive what’s coming at him. But in the end, it all comes down to one question: will he sell out Rachel to the highest bidder, or join her on a quest that could change the face of the Sixth World forever?',
		edition: 5,
		gameDate: '2075',
		name: 'Deniable Assets',
		names: {
			'de-DE': 'Ein ganz normaler Auftrag'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: ['2016-02-06'],
		sku: ['26856'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'JackPointer mage Winterhawk left the shadows at the top of his game: these days he indulges his curiosity about all things mysterious and magical on his own terms. But he’s about to discover that the shadows are hard to leave behind, and old enemies have their ways of drawing him back in.\nDosed with an exotic arcane poison that will kill him in days unless he retrieves a powerful magical artifact, ‘Hawk has to assemble a team fast and think even faster, because he’s not the only one tracking down the prize. His team is hardly the well-oiled machine he’s accustomed to: an old friend with major trust issues, an old rival who hates everything ‘Hawk stands for, a decker who annoys everyone he meets, a samurai who’s only in it for the money, and a gunslinger who may have her own agenda.\nWith his life on the line and the clock ticking fast, ‘Hawk must survive the mean streets of Los Angeles and the magical hells cape of the Australian Outback while keeping his mismatched team from imploding before they finish the job. But when the artifact is revealed to be far more than it seems, Winterhawk is forced to make a choice that could affect the lives of millions—to say nothing of his own.',
		edition: 5,
		gameDate: '2075',
		name: 'Borrowed Time',
		names: {
			'de-DE': 'Geborgte Zeit'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: ['2015-05-26'],
		sku: ['26855'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Six shadowrunners. Three mysterious packages. And twelve kilometers of a dangerous, dilapidated bridge across one of the wildest sprawls of the Sixth World.\nIt should be a simple job. Retrieve three sealed packages, then take them across the city of Lagos to their destination. All the runners’ skills will be tested—they’ll face ambushes, double-crosses, and more, and along the way they might be able to answer the question of just what’s in those packages, and why they’re so important.\nThe team has a lot on their side, including a street samurai who’s a legend on the streets, a hotshot rigger with a lot of enemies, a young shaman seeking justice, a decker with a dark secret, and a pair of pros from Seattle trying to keep up with everything the unfamiliar sprawl throws at them. But the deadly streets and sinister neighborhoods of Lagos contain their own unique dangers, and it’ll take every trick the runners know to complete their mission and escape the city in one piece…',
		edition: 5,
		gameDate: '2075',
		name: 'Hell on Water',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2014-12-28'],
		sku: ['26852'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Arcano-archaeologist Elijah knows that digging into the past can be its own reward—or peril. When he’s hired to find an ancient map purported to lead to a mysterious location at the bottom of the world, his professional curiosity is more than roused. But his quest to simply get his hands on the map is more dangerous than he expected—even for a shadow runner.\nHe and his own team of runners—including everything from a goblin rigger to a troll street samurai—follow a murky trail that takes them from the ruins of Chicago to the jungles of Amazonia. Along the way, they discover that they’re not the only ones looking for this map—and that it may lead to a treasure even greater than anyone could have known. Elijah and his crew plan to get both the map and to its riches first—assuming they survive the very dangerous road trip to get there…',
		edition: 5,
		gameDate: '2075',
		name: 'Fire & Frost',
		names: {
			'de-DE': 'Feuer und Frost'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2014-07-02',
			'2014-08-26'
		],
		sku: ['26851'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Welcome to the year 2072…\n…And a world unlike anything you’ve ever imagined. A world where magic and machines exist side-by-side. Where cybernetics can replace organs or entire limbs with ease, and arcane spells can make the impossible happen. Where the Matrix has become an artificial world of its own, filled with all kinds of pleasure, treasure, and trouble. Where dwarves, elves, orks and trolls walk alongside humans every day. Some work for megacorporations whose invisible tentacles wrap around every aspect of modern life. Others choose a much less legal career, doing whatever dirty work the corp executives need done—for a price.\nWelcome to Shadowrun\nFeaturing fifteen stories about the men and women who make their living in the shadows of the Sixth World, Spells & Chrome takes you into the dark and dirty streets of the future. Whether risking their lives to execute a mission for an employer who might be planning to double-cross them anyway, or just doing whatever they need to do to survive another day, shadowrunners use everything they’ve got—cyberware, spells, or a very big gun—to get the job done.',
		edition: 4,
		gameDate: '2072',
		name: 'Spells & Chrome',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: [
			'2010-05-14',
			'2010-12-22'
		],
		sku: ['26850'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Most folks see Puyallup as the worst Seattle’s got to offer; a tangled mess of metahumanity and greed, poverty and ghettoes, vice and corruption, where the crime is more organized than the government. They call it a Barrens, an armpit, a cesspool.\nJimmy Kincaid, though, calls it home. Walking the line between the shadows and the desperate light, semi-legit like only a Puyallup brat and former cop can be, he insists Puyallup has a heart and a soul, that it’s a place of life, magic, and starving hope. A former combat mage, now as burnt out as his neighborhood, he does what he can to police the worst excesses of the crime-riddled city he loves.\nIn the darkness of the Seattle Sprawl, what’s one more murder?\nTo Kincaid, it’s everything. He’s got a dead mentor, a hermetic group in need, and a mysterious file that might have been worth killing for. To unlock the data and get a little justice, he’ll face the worst the Sprawl has to offer, wading through blood, darkness, and a murderous web of lies.\nIt’s a good thing he’s got friends—in high and low places...',
		edition: 5,
		gameDate: '2075',
		name: 'Shaken (No Job Too Small)',
		names: {
			'de-DE': 'Für alle Fälle: Kincaid'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: ['2015-06-13'],
		sku: ['26858'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Mr. Johnson. You know the name. You probably know the face—smooth, implacable, professional. He’s got the nuyen and resources you want, and he knows it. He may not have your skills, but he doesn’t care. That’s what he has the nuyen for—so he can buy yours. He’s corporate through and through, and you can’t ever forget that, because if you do, that’s when he sells you out for the good of his corp. But he’ll stay professional, of course, right up until the moment he slides the knife smoothly into your back. He’s useful, that Mr. Johnson, but every time you meet him, every time you have to deal with his double-crosses, his condescending put-downs, his smug superiority, you wish that the day would come when the tables were turned, when he was forced out on the street with nothing but his wits and street skills—whatever those might be—to keep him alive.\nWell, good news. Sometimes wishes come true, even in the Sixth World. Mr. Johnson is about to meet the street, and you’ve got a ringside seat.',
		edition: 5,
		gameDate: '2075',
		name: 'Nothing Personal',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2014-08-10'],
		sku: ['26S038'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Yuri Yehzov has been off the streets for a long while, surviving by following a few simple rules. Don’t stick your neck out. Don’t get involved in something that is none of your business. And above all, don’t piss off the ferocious mobsters of the Vory y Zakone.\nYuri doesn’t have much left from his shadowrunning days except his cyberears, but that’s enough to get him in trouble. When he hears something he cannot ignore, one by one his rules fall by the wayside until he has cold-blooded killers, vicious shapeshifters, and a ruthless Vory leader all after him. His gear is broken, his reflexes are shot, and he’s about to face the toughest opponents he’s ever been against. The streets have one more chance to claim his life—and he has one more chance to break the rules, beat the odds, and find a way to stay alive.',
		edition: 5,
		gameDate: '2075',
		name: 'The Vladivostok Gauntlet',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2013-09-16'],
		sku: ['26S030'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'The Sixth World doesn’t give people much time to grow up. Whoever you are, wherever you live, there’s going to come a time when the world is going to throw you some serious curveballs, and if all you can do is bitch and moan about how you’re not ready for what’s coming your way, you’re not going to last long. Get strong, grow up, and figure out how to survive—that’s what everyone else has done. Except for those lying two meters underground.\nOne of those tests is about to hit Lena, a young woman living in the Sioux Nation. She’s going to learn a lot about how life in the Sixth World works, and just how far people will go to get what they want, but before she can process any of that, she is going to have to survive criminals, smugglers, and worse. She doesn’t have much to help her, except for some new powers she does not understand. Using them, and drawing on some unexpected allies, is the only way she will live out the day.',
		edition: 5,
		gameDate: '2075',
		name: 'Wolf & Buffalo',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2015-08-19'],
		sku: ['26S047'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Thomas McCallister’s area of expertise—the virus that turns metahumans into flesh-eating monsters—has taken him into some dark corners of the Sixth World. When he came face to face with the serial murderer known as the Mealtime Killer, he had hoped that a particularly dark chapter of his life had come to a close. But when night falls in the sprawls of the world, blood is still being shed, and people are still dying. Another killer is still out there, one that needs to be found and stopped, but the challenge McAllister is about to face is one he never could have anticipated. His resolve will be tested in ways he never anticipated in his darkest nightmares.',
		edition: 5,
		gameDate: '2075',
		name: 'Sail Away Sweet Sister',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2014-04-22'],
		sku: ['26S041'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'DocWagon—saviors of the needy, rescuers of the desperate. Willing to go anywhere, rescue anyone, as long as that “anyone” has forked out enough advance cash to justify the effort.\nReporter Amelia Hart has embedded herself with a DocWagon team to see what their life is really like, and she’s in for a wild ride. From an OD’ing celebrity to an aggressive team of hackers, from pesky gangs to an extremely rich and powerful client teetering at death’s door, this night will give the team all they can handle. But will they survive long enough to remember that in the Sixth World, nothing is truly random?',
		edition: 5,
		gameDate: '2075',
		name: 'DocWagon 19',
		names: {
			'de-DE': 'DocWagon 19'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: ['2015-03-19'],
		sku: ['26NV002'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'THE TAROT HAS AWAKENED…\n…And nothing will ever be the same again.\nThe Tarot, a mystical divination deck of cards, has appeared in the Sixth World as a powerful artifact. It works its will on anyone who finds one of its magical cards, from runners surviving on the street to corp executives battling in the boardroom. And not just people’s lives will be changed, for the Awakened Tarot deck is more than just a formidable magic item, it has an agenda all its own, and will seek to use those it comes in contact with to set its plans in motion…',
		edition: 5,
		gameDate: '2075',
		name: 'Drawing Destiny (Tarot Anthology)',
		names: {
			'de-DE': 'Karten des Schicksals (Anthologie)'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: ['2016-09-03'],
		sku: ['26871'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'The Sixth World is a dangerous place, with deadly hazards lurking around every corner. Everywhere shadowrunners go, from the top of the world to the deepest, darkest Sprawl neighborhood, someone’s always looking to make their rep by taking you down.\nWorld of Shadows is the second anthology of original Shadowrun short stories, each one showcasing some of the most far-flung, treacherous locations around the world. From a scientific mission gone wrong in the snowy wilds of Russia to an AR nightclub in Morocco sheltering runners on the lam to a recovering runner drawn into a deadly web of intrigue in the darkest alleys of Hong Kong, these eighteen original short stories explore exotic settings far off the beaten path. Featuring stories by Michael A. Stackpole, Mel Odom, Jean Rabe, Aaron Rosenberg, Phaedra Weldon, Annie Bellet, Chris A. Jackson and many others, find out what happens when shadowrunners have to battle not only with ever-present threat of the corps and Mr. Johnson, but also the dangers of the very land they stand on.',
		edition: 5,
		gameDate: '2075',
		name: 'World of Shadows',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2016-02-06'],
		sku: ['26862'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "Slacker corp mage Cody's bad day is about to get a lot worse.\nLosing his job is crappy enough, but when his talismonger uncle turns up dead and dissected in his shop, Cody finds himself on the run from some very nasty people who want something they think he has.\nThe problem is, Cody has no idea what it is.\nTurning for help to old friends from his Barrens roots, Cody soon learns that his problems are bigger than any of them can handle. To survive, he'll need some heavy hitters on his side--but can he trust them not to sell him out?",
		edition: 5,
		gameDate: '2075',
		name: 'Big Dreams',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2016-12-02'],
		sku: ['26NV002A'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'James Kincaid is the type of guy who might be described as down on his luck, if only he’d had some luck to begin with. Like so many people in the shadows of Seattle, he’s trying to get by with what he has. In his case, that includes a lively spirit, a sadly diminished magical talent, quick wits, and good knowledge of the twists and turns of Seattle’s dingy streets and back alleys. He puts all that to the service of whatever clients he can dig up, solving whatever cases they’re willing to pay him to take on. With any luck, he’ll scrape up enough nuyen to buy a few rounds of his favorite drink—whiskey, neat.\nHis latest case seems simple enough—find a girl who’s gone missing. But throw in a couple of feuding megacorporations, a few organized crime families, and a full selection of the odd denizens of Seattle’s streets, and you’ve got a case that’s anything but easy. It’s up to Kincaid to see how many people he can keep alive—including (and especially) himself.',
		edition: 4,
		gameDate: '2070',
		name: 'Neat',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2012-11-10'],
		sku: ['26NV001'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'The Universe of Magic\n\nMagic cannot be contained or easily defined. It can barely be controlled. It is large, omnipresent, and multi-faceted. It contains multitudes.\nA few of those multitudes are in this book, such as Pierre Dubois, media personality and Psionist researcher; a band of fortune seekers known as Treasure Hunters, Inc.; strange crystalline entities who may be forming a dangerous alliance; a spell to turn an unfortunate victim’s blood into a sludgy mess; and an adept power that temporarily blanks out memory, making an individual immune to interrogation.\nThese and more are here—spells, adept powers, rituals, and a host of magical knowledge. It may be a single meter would compared to the nigh-infinite length of the full scroll of magical knowledge, but as any shadowrunner can tell you, in a pinch a meter can make all the difference in the world.',
		edition: 5,
		gameDate: '2076-09',
		name: 'Shadow Spells',
		names: {
			'de-DE': 'Schattenzauber',
			'pt-BR': 'Feitiços das Sombras'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele',
			'New Order Editora'
		],
		releaseDate: [
			'2014-09-25',
			'2014-12-10'
		],
		sku: ['26S048'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Illegally entering the Sioux Nation is hard. So is crossing the Sioux National Police. Doing both? That will earn you a good payday or a bullet in the head. But that’s the job that’s been offered. And what shadowrunner worth their mettle can resist the chance to make some powerful friends and even more powerful enemies?\nMika, a shadowrunner active on JackPoint, is hiring, and players have a great chance to make a pile of nuyen while showing just how much skill they have. They’ll have to move fast, stay alert, and make sure they hit whatever they’re aiming at. Just like they always do.',
		edition: 5,
		gameDate: '2077-10',
		name: 'Shadows in Focus: Sioux Nation: Counting Coup',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2015-10'],
		sku: ['26S046'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'The Wild Calls\n\nGangers. Corp security. Mr. Johnson. Organized crime. Other shadowrunners. Running in the Sixth World does not exactly lack for obstacles, but only foolish runners worry solely about metahuman opponents. There are plenty of other ways the world can kill you, from throat-ripping martachoras to blood-sucking chupacabras, from the aggressive gamma spider to the swarming harpy. While most runners would be happy to simply avoid these threats, it’s not always possible. Critters may be used as security, they may swarm in abandoned areas runners must investigate, or they may carry valuable reagents runners need. Some of them may even hold the keys to unlocking the sort of powers runners covet.',
		edition: 5,
		gameDate: '2075',
		name: 'Howling Shadows',
		names: {
			'de-DE': 'Critterkompendium'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2016-05-16',
			'2017-01'
		],
		sku: [
			'27008',
			'45044'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'When the Lights Go Down\n\nMoney? Check. Political turmoil leading to scrambling for power? You bet. Megacorps jockeying for position while working to take their rivals down a notch? Of course! A festering hive of corruption set next to one of the most scenic bays ever colonized by humans? Absolutely! San Francisco has all of the ingredients needed to make a nice, festering stew for shadowrunners. With the former imperialistic fascist General Saito out of power and the entire bay area united as a single sprawl, there is power and money to be had, which means business in the shadows is booming. San Francisco is a shadowrunner’s guide to the people, places, and plots that make up this city, providing the paydata they need to navigate the hilly streets and cruel back roads of a sprawl whose aura of sophistication can’t mask its deadly heart.',
		edition: 5,
		gameDate: '2075',
		name: 'Shadows in Focus: City by Shadow: San Francisco Metroplex',
		names: {
			'pt-BR': 'Sombras em Foco: Cidade nas Sombras: São Francisco'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'New Order Editora'
		],
		releaseDate: ['2016-01'],
		sku: ['26S050'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'If there’s anything shadowrunners have learned over and over again, it’s that the veneer of civilization coating much of the world is extremely thin (in the Barrens, of course, it’s non-existent). There are so many tensions in the Sixth World that altering the delicate balances just a hair or two can bring chaos and conflict to areas that had previously managed to scrape together a peaceful appearance.\nIf you want to cause that chaos, all that’s needed is a little gentle pressure on one of the essential arteries that keeps civilization alive. And no artery is as susceptible to this pressure as the food supply.\nStripped of a lucrative position and exiled from his family, Theo Two-Hearts has a score to settle, and he’s going to take it out on the entire Sioux Nation. Like many vengeance-minded people before him, he’s turned to shadowrunners to do his dirty work. If they sign on to his plan, they’re going to confront some of the toughest forces the Sioux Nation can throw at them. The first bit of chaos they create will rain down on them—if they survive, much more will follow.',
		edition: 5,
		gameDate: '2077',
		name: 'Shadows in Focus: Sioux Nation: Starving the Masses',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2015-04'],
		sku: ['26S044'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'All Kinds of Power\n\nArcane sites crackling with magical energy. High-stakes corporate maneuvering, complete with draconic influence. Smugglers and shamans, charismatic chiefs and feckless rogues. All this and more waits in the Sioux Nation for runners looking to branch out and run headfirst into new challenges in the unending quest to earn a few nuyen while staying alive and free from corporate detention facilities.\nShadows in Focus: Sioux Nation is the first in a new series of Shadowrun e-books providing a detailed look at geographical spots that have not been covered recently—or at all—in previous books. Starting with an overview of the Sioux Nation—including corporate powers, magical sites, major cities, adventure hooks, and more—the series will continue with spotlights on two major cities, Cheyenne and Butte, adventures set in the Sioux Nation, and an Enhanced Fiction story providing more flavor of what it’s like to run in the Sioux Nation. While the full collection of e-books will provide a detailed look at a nation reconciling old traditions with life on the bleeding edge of magic and technology, the Sioux Nation book has all you need to bring your Shadowrun game into this locale and see if runners can handle the full range of challenges it will throw at them.',
		edition: 5,
		gameDate: '2076-12',
		name: 'Shadows in Focus: Sioux Nation',
		names: {
			'pt-BR': 'Sombras em Foco: Nação Sioux'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'New Order Editora'
		],
		releaseDate: ['2015-01'],
		sku: ['26S042'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'This Is Not for You\n\nMetrópole was not built with shadowrunners in mind. Or even metahumans, for that matter. In the Awakened country of Amazonia, the great dragon Hualpa reigns, critters walk the streets under full protection of the law, and the people struggle to figure out how they’re supposed to fit into this huge mess.\nAnd huge it is. With many kilometers of coastline, thousands of tangled streets, and millions of residents, the city is packed with power, money, and intrigue—everything shadowrunners need to do their work. Yeah, the job might come with a slightly elevated chance of becoming dragon food—if that worries you, maybe the work down South America way is not for you. But if you have enough courage and an appetite for the strange, Metrópole is a great way to fill it.',
		edition: 5,
		gameDate: '2075',
		name: 'Shadows in Focus: City by Shadow: Metrópole',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2016-10-22'],
		sku: ['26S038A'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'One of the tricks of shadowrunning in the Sioux Nation is keeping your eye on the things you can’t see. It’s not just the spirits and the unseen magical beings of the world—though that’s part of it—but the dangers underground. The poisons seeping into the earth from abandoned mines, and the vast complex that has been built underground, out of sight of the rest of the population. A spot where money flows and the sun never shines—what more could shadowrunners want?',
		edition: 5,
		gameDate: '2077',
		name: 'Shadows in Focus: City by Shadow: Butte',
		names: {
			'pt-BR': 'Sombras em Foco: Cidade nas Sombras: Butte'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'New Order Editora'
		],
		releaseDate: ['2015-09'],
		sku: ['26S043A'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'The Minefield of Opportunity\n\nThe number of ways you can step wrong in Cheyenne are higher than a lot of shadowrunners can count. There are political, ethnic, tribal, and racial divides, and stepping on the wrong side of them can not only end your job prospects, but it can put you in a hastily dug hole in the ground. Move quickly and be agile, though, and you can slip through the snares that trip up lesser runners, accumulating the street rep and nuyen that will put you at the top of the runner heap.',
		edition: 5,
		gameDate: '2077-02',
		name: 'Shadows in Focus: City by Shadow: Cheyenne',
		names: {
			'pt-BR': 'Sombras em Foco: Cidade nas Sombras: Cheyenne'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'New Order Editora'
		],
		releaseDate: ['2015-02-17'],
		sku: ['26S043'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'You have seen it. You have felt it. The dream where you are falling, falling, and you cannot see the ground but you know it is there waiting. You may try to brace yourself, you may try to force yourself awake—you do anything to avoid the impact that keeps rushing toward you.\nThe Seelie Court is the realm of the hidden, the rumored, and the unknown. Fairies, spirits, and enchanted creatures mingle there, building alliances, plotting, scheming, toying with the realm of humans—and with each other. The Court has long held a distant attachment to the material plane, influencing it like a dream influences our waking hours. But now a new connection has emerged, allowing humans to infiltrate the courts and influence its proceedings. At a time when magical power is ever in the rise, the mix of human and fae could set both worlds into a calamitous plunge, and no one will want to be awake when they hit bottom.',
		edition: 5,
		gameDate: '2075',
		name: 'Court of Shadows',
		names: {
			'de-DE': 'Hof der Feen'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: ['2016-07'],
		sku: [
			'27009',
			'45055'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Lions, Tigers, and Bears…\nYou Should Be So Lucky.\nMagic has returned to the world, and with it has come all manner of beasts. Genetic material, long dormant with the absence of magic, has been reactivated, transforming mundane animals into creatures once believed supernatural, even mythical. Juggernauts rome the plains, Firedrakes infest the woods, Leviathans swim in the oceans, and Devil Rats now hunt Man in the shattered Sprawls that he has created.',
		edition: 1,
		gameDate: '2051',
		name: 'Paranormal Animals of North America',
		names: {
			'de-DE': 'Handbuch der Erwachten Wesen: Band 1 Nordamerika'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1990-06',
			'1994',
			'2005-08-26'
		],
		sku: [
			'7105',
			'10713'
		],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: "Build from a thousand kilometers of flesh and steel. It writhes in the passions of those who live in it. Everyone and everything is connected here; there are no accidents. Talk a walk down any street and read the writing on the wall:\n\"Welcome to the Sprawl, chummer. Too bad you could make it.\"\nSprawl Sites is a sourcebook for Shadowrun, First Edition, and includes hundreds of encounters of every type, from blood-crazed gangs and mystic magicians to mild-mannered Orks and back-stabbing Corporate Cops. Plus, you'll find Location Archetypes covering typical Sprawl locations from all sides of town, eight new Player Archetypes, and dozens of Non-Player Contacts. Round that out with additional essays and rules concerning sprawl law and credsticks, and you've got a whole new adventure on your hands. Your Shadowrun campaign will never be the same.",
		edition: 1,
		gameDate: '2050',
		name: 'Sprawl Sites',
		names: {
			'de-DE': 'Asphaltdschungel',
			'fi-FI': 'Megapleksin menoa'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'PRO Games'
		],
		releaseDate: [
			'1990-04-01',
			'1991',
			'1992'
		],
		sku: [
			'7103',
			'10704'
		],
		type: 'scan'
	},
	{
		category: 'rulebook',
		description: "THE BEST JUST GOT BETTER!\n\nThink you're already hot stuff, eh chummer? Guess again. There's a leaner, meaner machine on the streets these days, a machine whose parts aren't built, they're grown.",
		edition: 1,
		gameDate: '2052',
		name: 'Shadowtech',
		names: {
			'de-DE': 'Shadowtech',
			'es-ES': 'Shadowtech',
			'fr-FR': 'Shadowtech'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Descartes Editeur',
			'Ediciones Zinco',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1992-08',
			'1995',
			'2009-08-06'
		],
		sku: [
			'7110',
			'10714',
			'S15'
		],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: "The beat's on the street, and that's where you have to be if you wanna be in on what's happenin'.\nShadowbeat makes it easy by dishing out the scoop on music, media, sports and entertainment in the 2050s. Discover the best way to stardom in the sims.\nLearn how to get the dirt on the stars. Get down and dirty as an Urban Brawler. All this, and the toys that make it happen, are included in…Shadowbeat!",
		edition: 1,
		gameDate: '2053',
		name: 'Shadowbeat',
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: ['1992-09'],
		sku: ['7109'],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: 'PAIN POINTS\n\nChaos is horrible for business—unless your business is shadowrunning. The Big Ten megacorporations of the Sixth World are reeling, with scandals, disasters, and crippling attacks coming at them from all angles. NeoNET is scrambling to maintain AAA status, Ares is trying not to let the secret rot at the heart of the corp become public, while Aztechnology, fresh from taking on a dragon in Amazonia, is looking at a facedown with another great dragon. And that’s not all—every corp is a pile of schemes, turmoil, upheaval, and teetering chaos, because that’s how they operate.',
		edition: 5,
		gameDate: '2075',
		name: 'Market Panic',
		names: {
			'de-DE': 'Megakons 2078'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2016-03-02',
			'2016-05-25'
		],
		sku: [
			'27451',
			'45043'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'THE CLOAK OF DEATH\n\nIt’s thick. Luxurious. Concealing. The cloak of death will make you feared, envied, and maybe even wealthy. It will also smother your soul. The best assassins in the Sixth World can gain untold wealth and make the whole world shake, but they also will be hunted and stalked until the end of their days. Assuming their conscience doesn’t eat them alive.\nHard Targets is a shadow runner’s guide to bringing death, with information on getting into wetwork, tactics for doing the job, and critical gear. It also contains plot details and adventure hooks, including an in-depth look at the city of Havana in the Caribbean League, a political and criminal hotspot that lends itself to all sorts of wetwork jobs. The work is there—if you can deaden your soul enough to take it.',
		edition: 5,
		gameDate: '2077-11',
		name: 'Hard Targets',
		names: {
			'de-DE': 'Harte Ziele'
		},
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2015-10'],
		sku: [
			'27201',
			'45040'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Stolen Souls\n\nThose were among FastJack’s parting words to JackPoint when he left, the victim of a condition that divided his mind against itself. He’s not the only one that has been so afflicted. Miles Lanier, formerly of NeoNET, has the same condition. And across the Sixth World, people’s minds are in schism, as new personalities emerge at unpredictable times.\nThis has thrown the world into chaos, and there is a sudden demand for new extractions. Infected people need to be forcibly removed from their positions. People who might understand something about what’s happening need to be removed so they can tell what they know. And people covering secrets need to be removed so that they, and their secrets, can be buried somewhere out of reach.\nStolen Souls is a Deep Shadows sourcebook for Shadowrun that contains plot updates and adventure hooks, as well as information, techniques, and gear to help runners up their game when it comes to extraction jobs. They’ll also get the chance to dig deeper into a new mystery that has torn through the Sixth World—and discover just how deep the conspiracies and cover-ups go.',
		edition: 5,
		gameDate: '2076-04',
		name: 'Stolen Souls',
		names: {
			'de-DE': 'Gestohlene Seelen',
			'fr-FR': 'Âmes volées'
		},
		notes: 'The German version has aditional material about the ADL.',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele',
			'Black Book Editions'
		],
		releaseDate: [
			'2014-05-15',
			'2014-10-10',
			'2015-05-03'
		],
		sku: [
			'27200',
			'45022',
			'SR504'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'The voices are getting louder. Strange voices, dissonant voices, sometimes babbling nonsense, sometimes telling stories too unbelievable to be true. People are falling prey to the voices, losing their identities as someone or something else slips into their skin. It’s affecting people at all levels of society, from squatters in burned-out warehouses to corporate CEOs. It’s spreading, and no one can figure out how to stop it. Boston-based NeoNET is at the center of this storm, and panic is spreading through the streets of the northeastern sprawl. People are scared and people are dying, which means that there are large sums of money to be made by any shadowrunner willing to brave those chaotic streets. Finding work won’t be the problem. Getting out of the sprawl, however, will be.',
		edition: 5,
		gameDate: '2076-09',
		name: 'Lockdown',
		names: {
			'de-DE': 'Sperrzone Boston',
			'fr-FR': 'Lockdown'
		},
		notes: 'The German Edition has an aditional adventure for German characters called "Operation Baybreaker".',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele',
			'Black Book Editions'
		],
		releaseDate: ['2015-05'],
		sku: ['27300'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Hit Your Marks\n\nThe hotel bartender who slips you a guest’s room number because he thinks it will help him get lucky. The security guard who lets a team into a top-secret facility because he thinks he’s pitching in on covert-ops training. The business suit who drops ten thousand nuyen on a project because he thinks it’ll earn him fifty thousand.\nMarks, all of them, and the Sixth World is full of them. Yeah, blasting your way into a well-guarded facility is fun, but talking your way in, smooth and subtle, might be more rewarding. Almost every kind of shadowrun involves at least a little con artistry, and some of them are full-on long cons. That means you need to sharpen your con game. With tips, plot updates, spells, gear, and more to improve characters’ con abilities, Cutting Aces gives players the swagger and skills they need to swindle the world. It also includes information on one of the Sixth World’s hottest spots for running a con—Istanbul, City of the World’s Desire.',
		edition: 5,
		gameDate: '2075',
		name: 'Cutting Aces',
		names: {
			'de-DE': 'Mit Tricks und Finesse'
		},
		note: 'The German edition has an aditional chapter about Frankfurt.',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2016-12-09',
			'2017-10-19'
		],
		sku: [
			'27202',
			'45058'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Causes of Blood\n\nThere is no way to sugarcoat it—people in the Sixth World spend an awful lot of time coming up with reasons to kill each other. When it comes to moral codes, people don’t think they’re better than others because they don’t kill and others do—they compare the reasons for killing, ranking them, trying to justify the oft-unjustifiable. You can talk to a hundred people and get a hundred different opinions about what’s justified and what’s not, and about which motivations are worse than others, but consistently at the bottom of the list are those who would kill innocents for a cause, who would instill terror in people for political gain, because they see no other recourse.\n10 Terrorists covers ten groups in the Shadowrun setting who add chaos and violence to an already chaotic and violent world to further their own twisted causes. From Seed, a Matrix terrorism group that split off Ex Pacis, to Logos, a group that combines environmental extremism with talislegging, these are groups that can add and danger and plot hooks to Shadowrun campaigns. Whether runners are infiltrating the groups, avoiding them, or dealing with the fallout from the chaos they cause, 10 Terrorists can increase the threat level of any Shadowrun game.',
		edition: 5,
		gameDate: '2077',
		name: 'Ten Terrorists',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2015-04'],
		sku: ['26S037'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'It’s so easy to forget about plants, especially for sprawl-hardened runners who never have anything underfoot besides plascrete. But you forget about them to your peril. After all, where do you think your deepweed comes from? How about those useful, memory-wiping doses of laés? And what was it about the Brazilian kiwi that made Dunkelzahn so interested in it?\nIgnoring plants means ignoring a possible source of income, and what self-respecting runner would ever do that? Parabotany is the guide runners need to help them locate plants that will enhance their abilities and grow their income, and it also provides useful tips, such as how to avoid plants that might be inclined to devour you.\nAlong with descriptions and full-color art for dozens of plants and a garden full of plot hooks, Parabotany has new rules on creating Awakened flora, gathering reagents, and creating powerful new magical compounds. Unlock the secrets of Sixth World plants, and use your knowledge to give your foes a defeat they’ll never forget—unless, of course, you dose them with laés.',
		edition: 4,
		gameDate: '2074-03',
		name: 'Parabotany',
		names: {
			'de-DE': 'Parabotanik'
		},
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2012-04'],
		sku: ['26S012'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'The Edge of Now\n\nSome people think that being state-of-the-art means being on the bleeding-edge of technology. That’s part of it, but only a small part. If you really want to be current, if you want to know what’s going on in the world and how it might affect you, you need to know about a lot more than new tech. You need to know about current events—like the speech Hestaby gave to the United Nations that put the dragons of the Sixth World into an uproar. You need to know what you’ll see on the roads, from new vehicles to re-purposed classics. You need to know about the latest research on Awakened plants and the exceedingly creative uses scientists are putting them to.\n\nTake those elements and stir in up-to-date information on important people and places—like cagey intelligence ace Samantha Roth and the tumultuous nation of Thailand—and you have a dossier that can help runners stay current and make sure they know what’s happening now in the Sixth World. Because the runner caught up in yesterday is a runner that’s been left behind.\n\nState of the Art: 2073 is for use with Shadowrun, Twentieth Anniversary Edition.',
		edition: 4,
		gameDate: '2073-12',
		name: 'State of the Art: 2073',
		names: {
			'de-DE': 'State of the Art: 2073'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2011-12-20',
			'2012-05-23'
		],
		sku: ['26S006'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Unusual Suspects\n\nTen people. Ten very different people. A pirate who has made himself into one of the most wanted men in the world. A datathief whose skill is only matched by his flair and panache. Two corporate giants whose personalities—and actual physical makeup—couldn’t be more different. A troll whose name has a history much older than herself. And other individuals with stories and secrets of their own.\nSome of them are people you want on your side, and some of them are people who could be very dangerous enemies if you aren’t careful. All of them are people you should know, because all of them have something—money, power, knowledge, or all three—that you can use.\nStreet Legends Supplemental follows the format of the Street Legends book by presenting information on ten characters from the Shadowrun universe, sharing stories about their activities in the Sixth World and also offering complete game information and statistics for them. Each character also comes with plot information gamemasters can use as they develop their campaigns. While it is a companion to Street Legends, Street Legends Supplemental can be enjoyed entirely on its own.',
		edition: 4,
		gameDate: '2073-12',
		name: 'Street Legends Supplemental',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2012-01'],
		sku: ['26S015'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Step Up\n\nDear Applicant:\nThank you for applying for membership in our revered magical society. We are certain you understand that we receive more applications than we can accept, due in part to the prestige we enjoy in the Sixth World. We are a group who attracts notice. The mundane citizens of the world look at us with suspicion, while the Awakened look at us with envy, for they believe that we harbor dark secrets and world-changing schemes, and it of course is quite possible that they are right.\nSo we understand why you would seek to join us. We hope you can show us something special. We hope you can show us something new. We hope you can give us a reason why you should associate with our members by showing us what we can gain from having you among us. If you think first about what you can give, then you will have the opportunity to think about what you can get. Of course, if the rumors about us are true, the answer to that last item is simple: the world.\nWe look forward to your trial, and we hope you survive it. Should you wish, you may cancel that ordeal and instead attempt to join one of the other, lesser magical societies in the world. If you believe you can be satisfied with that.\nWe would wish you luck, but if you are skilled, you should not need it.',
		edition: 4,
		gameDate: '2074-05',
		name: 'Magical Societies',
		names: {
			'de-DE': 'Magische Gesellschaften'
		},
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: [
			'2012-06',
			'2012-10-09'
		],
		sku: ['26S014'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Beware the Beasts! The Awakening had a dramatic effect on the world, and those effects have not stopped shaking things up. Across the Sixth World, magic and other environmental factors continue to twist and distort all variety of living things, and the results can be deadly—or useful, to those who know how to harness the powers let loose in the animal kingdom. Parazoology brings several critters from earlier editions of Shadowrun into Fourth Edition, while also introducing brand-new beasts. Inside you’ll find the stealthy and predatory cactus cat, the mind-altering stone toad, the horrific sea wolf, and twenty-seven other critters. Complete with full-color illustrations and game statistics for every beast, Parazoology provides a host of challenges, dangers, and potential resources for your Shadowrun game.',
		edition: 4,
		gameDate: '2072-08',
		name: 'Parazoology',
		names: {
			'de-DE': 'Parazoologie'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2011-03',
			'2011-10-20'
		],
		sku: ['26S003'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Everyone knows the score between the Yaks, Mafia, and Triad, but when you get down to it, the ganger on the corner is just as likely to try and kill you. Here is the download on ten mid-sized gangs that are looking to make a name for themselves.\n10 Gangs is a Shadowrun product, designed to supplement any campaign and utilizes the Gang rating system from Vice. Each gang comes with plot hooks and stats for gamemasters and players to use for run ideas, contacts, and keeping an eye on the competition.',
		edition: 4,
		gameDate: '2072',
		name: '10 Gangs',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2010-02'],
		sku: ['26504'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Find Your Way Into Wealth or Out of Danger\n\nIf your run the shadows long enough and manage to stay alive, you’ll find your way into all sorts of places—from bank vaults where the wealthy store their most previous possessions to densely packed warrens that pack dozens of the poor into tight spaces. Maybe you’ll need to break a patient out of a tightly guarded hospital, or maybe you’ll need to help your client sneak into an exclusive party on the top floor of a luxurious mansion.\nWherever you’re going, it helps to have a map—and some knowledge of who you might run into while you’re there. Sprawl Sites: High Society and Low Lifeprovides eight full-color maps, including a train station, an airport terminal, an automobile chop shop, and a department store, where shadowrunners might encounter all kinds of challenges. Each map is keyed on one side, while the other provides floor plans that can be given to players clever enough to find them. The book also provides information on who runners are likely to meet at each location, security at those locations, and plot hooks to help gamemasters involve the players at each spot.',
		edition: 4,
		gameDate: '2074',
		name: 'Sprawl Sites: High Society and Low Life',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2013-01-12'],
		sku: ['26501'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: "Everyone's Watching Everyone.\nThe problem with keeping files about ne'er-do-wells is they're a curious and clever lot. Curious and clever enough to pilfer those files from the corporate compiler, repost them, and add their own commentary-providing a level of meta-information like you've never seen before. Get the scoop on Jackpoint-posters like Kay St. Irregular, Ecotope, Man-of-Many-Names, and Turbo Bunny.\nRemember: not everything you read is true. When the two sources of information are Horizon and Jackpoint ... all bets are off.\nThe Jackpointers presented in this download are: Baka Dabora, Ecotope, Fianchetto, Kay St. Irreggular, Lei Kung, Lyran, Man-of-Many-Names, Orbital DK, Riser, and Turbo Bunny. Each has a 2 or 3 page profile.",
		edition: 4,
		gameDate: '2072-03',
		name: '10 Jackpointers',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2010-03'],
		sku: ['26651'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Dominated by the Manhattan Development Consortium (MDC), the City represents the largest contiguous corporate enclave in the Sixth World. This volume grants a look into the neighborhoods of Manhattan, the constant scrutiny of its security, and the activities of the thirteen corporations that oversee its development.\nThis setting is a crucial part of the New York City Shadowrun Missions campaign. This 32-page volume serves as a guide to players so that they can prepare their characters to deal with the finer details of the setting. Gamemasters are also well suited to use this book, as it grants them a deeper insight into the neighborhoods of Manhattan than can be provided in scenarios.',
		edition: 4,
		gameDate: '2072-10',
		name: 'Manhattan: The Rotten Apple',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2009-03-22'],
		sku: ['26602'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Honor. Skill. And Exceptionally Sharp Blades\n\nThey are legends. They are dangerous. They are feared. They are to be avoided—unless you have one of them on your side. They are street samurai. That title covers a variety of skill sets, from the accuracy to nail a target from a thousand meters away to the stealth needed to sneak into a tightly guarded environment and cut someone’s throat before they—or their security—know you’re there. Street samurai know they need to use every tool at their disposal if they want to maintain that all-important edge on their competition. Luckily, some new tools just became available.',
		edition: 4,
		gameDate: '2075-01',
		name: 'The Way of The Samurai',
		names: {
			'de-DE': 'Der Weg des Samurai'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2013-01-13',
			'2013-02-27'
		],
		sku: ['26S017'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Stretch Your Reality\n\nThere are waking dreams, there are active hallucinations, there are feverish visions that cannot be classified. And then there are the metaplanes, an adrenaline-fused combination of all of these, and more. Everything you dream of, everything you fear, everything beautiful and everything grotesque can be found out there. If you travel to the planes, you may lose your life, lose your mind, or if you’re lucky, just lose your way. But you may find hidden secrets of magic and perhaps make powerful allies. It’ll be a change from everyday life in the sprawls of the Sixth World, but may well be worth it. Are you ready for something entirely different?\nAetherology offers a grand tour of many metaplanes—the wild, the weird, the dangerous, and the everything in between. Prepare for mind-bending journeys to alternate realms of existence and the opportunity to encounter a new host of dangerous spirits and creatures. With rules on astral phemonena and new powers for the critters detailed in the book, Aetherology offers a whole new twist to your Shadowrun games.\nAetherology is dual-statted, meaning the spirits and creatures inside can be used in both Shadowrun, Fifth Edition and Shadowrun, Twentieth Anniversary Edition.',
		edition: 5,
		gameDate: '2076-04',
		name: 'Ætherology',
		names: {
			'de-DE': 'Ätherologie',
			'pt-BR': 'Éterologia'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele',
			'New Order Editora'
		],
		releaseDate: [
			'2014-12-01',
			'2015-02-28',
			'2018'
		],
		sku: ['26S032'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Great White Shadows\n\nBikers and go-gangs roam the streets of Montreal in 2074. Organized crime outfits struggle for territory. And neo-anarchists add spice and danger to the streets. All this would seem to be nothing more than lawless chaos except for one thing—money. Cheap real estate and savvy moves by the megacorporations have brought some cash into town, and a new city is being built on the remains of the old. And as every runner knows, when you shine the light of money onto the darkness of a ruined city, you get one thing: shadows.\nMontreal 2074 gives adventurous runners the chance to take their talents to a new locale, doing business on the isle of Montreal. Whether they are dodging the gangs of the West Island or looking to bargain with the Mafiosi of Saint Leonard, runners will find plenty of opportunities in Montreal. They just need to make sure they don’t end up as part of the piles of rubble—and they also need to watch out for the fast, brutal group known as Les Frères Chasseurs.\nMontreal 2074 contains information on neighborhoods, gangs, and activities that bring the city to life in the Sixth World setting. With plot hooks and NPC stats, the book provides everything players and gamemasters need to take a trip to the Great White North.',
		edition: 4,
		gameDate: '2074-12',
		name: 'Montreal 2074',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2012-12'],
		sku: ['26S026'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Hired guns. People without a country who know no loyalty. Opportunists, bottom-feeders, scavengers, vultures. Soldiers without a soul who will go to the worst hells on Earth and do just about anything for a buck.\nThat’s how they talk about mercenaries. But that’s how they talk about shadowrunners, too.\nThere’s a fine line between mercenaries and shadowrunners, and it’s a line that gets crossed repeatedly. Sometimes runners will find themselves in the battlefield, working with a mercenary group and doing their best to survive as all kinds of fire rain down on their heads. Other times, they’ll find themselves in the sights of a skilled and deadly mercenary corps, trying to stay alive against superior numbers and firepower.\nEither way, they should know about the mercenary units out there, to either improve their bargaining position or help them stay alive. 10 Mercs profiles ten different mercenary outfits, including Ryan Mercury’s New Assets, the unconventional skill of Bravo Company, and the deadly magic of Task Force Magus. These groups present an array of threats or a bounty of opportunities—depending on which end of the barrel you’re at.\nAlong with the unit profiles, 10 Mercs provides NPC stats for each unit along with information on vehicles used by many of the units. If mercenaries are going to play a role in your campaign, 10 Mercs is a critical resource for adding flavor, plot hooks, and rules to your Shadowrun game.',
		edition: 4,
		gameDate: '2075-06',
		name: '10 Mercs',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2013-02'],
		sku: ['26S034'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Natural Born Killers!\n\nSome shadowrunners long to escape the dirt and danger of the Sixth World’s sprawls for the supposed peace and tranquility of nature. Thing is, the ones that actually try it generally find themselves quickly scurrying back to the city once they discover what’s waiting for them out there in the wild. From the sharp-toothed, lightning-fast ammit to the sneaky, venomous greater dancing white lady, nature in the Sixth World is full of ways to kill the unsuspecting and incautious.\nParazoology 2 is here to make sure shadowrunners are prepared for the dangers that lie in wait. With full details on dozens of Sixth World critters as well as firsthand accounts of encounters with mysterious creatures in their natural habitats, Parazoology 2 is a critical book for runners making their way into the wilds—even if that means the dark alleys just down the road.',
		edition: 4,
		gameDate: '2075-08',
		name: 'Parazoology 2',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2013-08'],
		sku: ['26S033'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Tír Tairngire Wants You!\n\nTír Tairngire has changed. The predominantly elven nation has an ork at its head, and the residents have become more welcoming to outsiders, in the sense that they don’t always immediately threaten to shoot them when they come in sight.\nThere is enough wealth and power in Tír Tairngire to make even the slightest crack in the nation’s façade tempting. Every shadowrunner knows that elves, especially powerful elves, do not rank high on the trustworthiness scale, but that doesn’t have to be a deal breaker.\nAnticipating lies and betrayals from the people runners work with is part of the game. Runners should just be sure to gather critical information about getting in to the Tír, the major cities, and the dominant personalities before they go in, since forewarned is forearmed.',
		edition: 4,
		gameDate: '2070',
		name: 'The Land of Promise',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2012-09-05'],
		sku: ['26S025'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: "Grab Some Wheels and Ride\n\nIt's nice when you can spend the time and the money to pick the exact right vehicle to suit your needs, but time and money are two luxuries shadowrunners don't always have. Sometimes you need just two characteristics in a vehicle: It's cheap, and it moves.\nUsed Car Lotprovides an assortment of vehicles for Shadowrun so that runners can have plenty of options, from the practical, affordable Ford Americar to the ridiculously luxurious Rolls Royce Phaeton. Motorcycles, sports cars, limousines, and trucks, and more—they're all here. A lot of the vehicles here may not be state-of-the-art, but they'll get you from point A to point B, they may help you blend in with the rest of the populace, and they'll save you a few nuyen while you're at it. Because a good shadowrunner knows how to use fancy toys, but a great shadowrunner knows how to be awesome with simpler tools.",
		edition: 4,
		gameDate: '2074-02',
		name: 'Used Car Lot',
		names: {
			'de-DE': 'Vertraute Fahrzeuge'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2012-07-13',
			'2012-09-30'
		],
		sku: ['26S019'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'This is the way it works—if you want to know what the main cause of World War II was, look at World War I. If you want to understand the United States of America in the late twentieth century, make sure you understand the Vietnam War and all of its ramifications. The point is this: Even if you didn’t fight in a war, even if you weren’t born when the war started, the conflicts still shape the world you live in. They shape you.\nThe hottest flames of the Euro Wars have faded, but the embers still burn. Whether it’s tanks, missiles, planes, or guns from that conflict that are still in use today, or people in the shadows who carry old grudges and dark secrets, the impact of the Euro Wars remains strong in the Sixth World.',
		edition: 4,
		gameDate: '2075-02',
		name: 'Euro War Antiques',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2013-05'],
		sku: ['26S018'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'The Sixth World is full of seductions, and perhaps no siren song is sweeter than that of simsense. Feel the rush of new love without the work of having to date another person. Skydive from the upper reaches of the atmosphere without leaving your couch. Experience every emotion humans are capable of feeling, and do it with a greater intensity than most humans will ever feel. Just don’t spend too much time wondering what it’s doing to your brain.\nAlleys and backrooms of every major sprawl in the world are littered with better-than-life junkies who can do nothing but think about their next fix. Reality is nothing more a pale shadow of the vitality and energy they experience with the right chips and downloads. Their need is deep—which, in the hallowed tradition of the Sixth World, means they are ripe for exploitation.',
		edition: 4,
		gameDate: '2074-12',
		name: 'Sim Dreams and Nightmares',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2013-03'],
		sku: ['26S024'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'When you’re a shadowrunner, you look for every ally you can get, any advantage you can grab. Which means that if the ground beneath your feet can either help you or hurt the other guy, you’re going to find a way to make that happen.\nThe earth is full of magic. Mana lines wriggle and writhe in different locales, and strange elements bubble up from the core of the planet. Some areas boost magic to seemingly impossible heights, while others drain it away, sucking mana into nothingness. There are powers out there, just waiting for you to call on—powers that may also be waiting to swallow you whole.',
		edition: 4,
		gameDate: '2074-11',
		name: 'Parageology',
		names: {
			'de-DE': 'Parageologie'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2012-11',
			'2015-02-16'
		],
		sku: ['26S020'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: "the Chaotic state of the UCAS!\n\nThe United Canadian and American States is in turmoil. In the past year, the great dragon Dunkelzahn won a special presidential election--and was assassinated on the night of his triumph. Savage riots broke out and have barely subsided; inexplicable magical phenomena have triggered a vicious anti-Awakened backlash; and corporate backstabbing and political intrigue are reaching new lows as everyone who can makes a play for the big time. And nowhere in the UCAS are the aftershocks as fierce as in three of its greatest cities: Boston, Detroit and Chicago.\n\nBoston, home of the East Cost Stock Exchange, has been neutral territory for years. But now Richard Villiers of Fuchi Corporation is rumored to be undertaking a secret operation there, and Boston's shadows are jumping.\n\nDetroit is the ulimate company town, home base of Ares Macrotechnology and Damien Knight's personal fiefdom. But all is not well in Aresville-Knight's ego is getting too big for his bottom line, and bad trouble is brewing.\n\nAnd Chicago, better known as Bug City, has finally been cured of the insect spirits that infested it ... or has it? And could the cure be worse than the disease?\n\nTarget: UCAS contains a wealth of information for players and gamemasters: adventure frameworks that allow gamemaster to jump right into these explosive cities, rules for ghoul player characters and free bug spirits, and more. Target: UCAS is intended for gamemasters and player of all experience levels. For use with Shadowrun and the Shadowrun Companion: Beyond the Shadows.",
		edition: 2,
		gameDate: '2058-02',
		name: 'Target: UCAS',
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1997-06',
			'2011-07-14'
		],
		sku: ['7214'],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: "Secret Leaders\n\nCorporate Government\n\nTight Borders\n\nConstant War\n\nStrange Magic\n\nOnly one place has it all in 2056 -- Aztlan, the world's only corporate nation.\nBuilt on the drug trade, consolidated country by country through ruthless business deals, run by a powerful and mysterious corporation and sustained by a national faith in the Aztec gods, Aztlan can be a runner's greatest dream or his most chilling nightmare. For at the heart of war-torn Aztlan lies Aztechnology, a potential mother lode of paydata and newtech, and an almost certain source of death. Listen carefully to the rumors and judge for yourself which are true or false—Aztlan guards its secrets well, and Aztechnology will kill to keep it that way.",
		edition: 2,
		gameDate: '2056-05',
		name: 'Aztlán',
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs'
		],
		releaseDate: ['1995-07'],
		sku: ['7213'],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: "Seattle's got it all: movers and shakers from all of the megacorporations, high-stakes political conflicts and even vicious mob wars--and it's surrounded by hostile countries! Every runner and wannabe comes to Seattle to learn their chops, hone their skills and make those big scores.\nNew Seattle takes the players on a tour of the most exciting city in the world of 2060. Each section of Seattle contains information on gangs, corporations, politics, hideouts, major players, criminal organizations and everything else players and gamemasters need to create both straightforward adventures and complex campaigns.",
		edition: 3,
		gameDate: '2060',
		name: 'New Seattle',
		names: {
			'de-DE': 'New Seattle',
			'fr-FR': 'Seattle 2060'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Descartes Editeur'
		],
		releaseDate: [
			'1999-03',
			'2001-02',
			'2001-07',
			'2003',
			'2005-02'
		],
		sku: [
			'7216',
			'10657',
			'25009'
		],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: 'BIG MONE¥!\n\nWhere can you sell body parts to voodoo priests? Where do Siberian shapeshifters buy military goods? What weird experiments are going on in corporate aquashperes? Where do t-bird smugglers hide from the military patrols? Learn the skinny here, chummer.\nThe Target: Smuggler Havens sourcebook allows you to jump right into the exciting cities of New Orleans and Vladivostok. It contains a wealth of information on smuggling, including adventure frameworks for new locations, rules for t-bird smuggling and border partols, free voodoo spirits, and information on awakened Siberia. Target: Smuggler Havens is intended for gamemasters and players of all experience levels. For use with Shadowrun.',
		edition: 2,
		gameDate: '2059-02',
		name: 'Target: Smuggler Havens',
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs'
		],
		releaseDate: ['1998-04'],
		sku: ['7215'],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: "A MILE HIGH AND SIX FEET UNDER\n\nWelcome to the Front Range Free Zone . It's a subdivided drek-infested, dead-dry tinderbox waiting for some political pyromaniac with slippery fingers to drop a match. Aztlan , CAS , Pueblo , Sioux , Ute , and UCAS . It's the center of the black market for most of North America and the crossroads of six nations. They get along with each other about as well as the rest of us, all jandering for position and a little bigger piece of the turf. It's the home of the Nexus , the Denver Data Haven, more information than Maria Mercurial's diary (maybe).\n\nIt's all waiting for you, chummer . Can you handle it?",
		edition: 2,
		gameDate: '2055-05',
		name: 'Denver: The City of Shadows',
		notes: 'This is a box set with two books: one for players and another for GMs.',
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: ['1994-11'],
		sku: ['7212'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: "THE LAND OF SUN, FUN... AND RUN\n\nWhich California are you comin' to for biz, chummer? The Central Valley, ground zero of the water wars between small farmers and big corps? Green-and-gorgeous Northern California, with a thousand mutually hostile small towns and crack Tir troops stepping right up to the tripwire? Or try your luck along the Big Sur coastline-you can either die from environmental poisons or get carved into tiny pieces by the pirates and smugglers who own the palce. How about Los Angeles, where rich simsense stars and even richer producers live just the other side of a plascrete wall from starving ork kids and strug-out chip heads?\nStill think the Golden State is a great place for a shadowrun?",
		edition: 2,
		gameDate: '2057-01',
		name: 'California Free State',
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1996-03',
			'2010-10-28'
		],
		sku: ['7209'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: "Grab the kids! Hide the wife! The Neo-Anarchists are back!\nThis time, those fun-loving Anarchists speak out on everything from transorbital travel and security systems to coffin motels and fast food. Nothing is sacred, profanity reigns, and there's more data than you can shake a chip at.\nThe Neo-Anarchist's Guide to Real Life provides useful information about the Shadowrun world in a fictionalized format along with new, specific game systems for each of the subjects covered.",
		edition: 2,
		gameDate: '2053',
		name: "The Neo-Anarchist's Guide to Real Life",
		names: {
			'de-DE': 'Real Life: Der Neo-Anarchisten Reiseführer ins wahre Leben'
		},
		notes: 'In the German translation it misses two chapters of the original publication ("One-way Communication" and "Guarding the Till")',
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1992-10',
			'1997',
			'2005-08-26'
		],
		sku: [
			'7208',
			'10723'
		],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: "The land of faery,\nWhere nobody gets old and godly and grave,\nWhere nobody gets old and crafty and wise....\n- W.B. Yeats, \"The Land of Heart's Desire\"\n\nTír na Nog, the Land of Youth. Long protected by a powerful Veil, the former nation of Ireland now stands revealed in its Awakened power. Who are its masters? Where did they come from? And what does its emergence hold for the world of 2054?",
		edition: 2,
		gameDate: '2053',
		name: 'Tír na nÓg',
		names: {
			'fr-FR': 'Tír na nÓg'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Descartes Editeur',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1993-09',
			'2000',
			'2005-03-17'
		],
		sku: ['7211'],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: 'A Nation of the Future, Built on the Traditions of the Past\n\nLong shrouded in mystery, now one brave voice dares to speak the truth of the Land of Promise, Tir Tairngire. How did it come to be? Who holds its reigns of power? And what does its future hold? The Tir Tairngire sourcebook reveals the Elven Nation for the first time, in all its glory and danger. Journey there and beware.',
		edition: 2,
		gameDate: '2054',
		name: 'Tir Tairngire: The Land of Promise',
		names: {
			'fr-FR': 'Tír Tairngire'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Descartes Editeur',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1993-05',
			'1994',
			'2005-03-17'
		],
		sku: ['7210'],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: 'Can you hack it?\nThe Matrix is for everyone; a worldwide computer network made up of pocket universes and virtual realities. You can make deals in virtual bars, sharpen reactions in game simulations or score new gear from an online store. Deckers and non-deckers alike base most of their lives in the Matrix, the place where information lives and breeds, bought and sold like trinkets on a street corner. In shadowy data havens and behind the brain-frying defense in megacorporate data archives, information is power.',
		edition: 3,
		gameDate: '2061-08',
		name: 'Target: Matrix',
		names: {
			'de-DE': 'Brennpunkt: Matrix'
		},
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: [
			'2000-01',
			'2002'
		],
		sku: [
			'7219',
			'10756'
		],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: 'Infinite Shadows\n\nIt’s the shadowrunning capital of the world for a reason. Seattle offers an unparalleled intersection of corporate, political, and criminal powers. This is where icons are made — like the Ancients, the Halloweeners, the Finnigan Crime Family, the Skraacha, Dante’s Inferno, Renraku Arcology, the Big Rhino, and the Alabaster Maiden. And this is where runners like Dodger, Sally Tsung, Dirk Montgomery, Jake Armitage, Twist, Kellan Colt, and James Kincaid made their names, sometimes made their fortunes, and occasionally experienced horrible losses. This is where you go to test your mettle. This is how you show you’re at the top of the heap.\nA sprawl this big can’t be contained in a single book, so we made a box. Inside you’ll find:\n\t- Emerald Shadows, a book outlining the geography of the sprawl and the notable powers and locations in each district;\n\t- Ruling the Queen City, a deeper examination of the power and history of Seattle, including a look at the people who rule over the city—and the people who control them;\n\t- Tangled Threads, holding plot hooks and adventures to help launch or continue your Seattle-based game;\n\t- Character cards, fully statted out cards of Seattle denizens that can be used as easy-reference NPCs of even pre-generated PCs;\n\t- Modular map cards, a deck of cards showing maps of different types of rooms that can be combined into a never-ender variety of buildings;\n\t- Gang reference card, providing a quick listing of gangs of the sprawl, their colors, and where they operate;\n\t- And a poster-sized map of Seattle like Shadowrun has never seen before.\nAll this will bring the sprawl to lifew while making it easier for players and gamemasters to dive into the shadowy depths that make Seattle legendary—and see if they can keep their head above water.',
		edition: 5,
		gameDate: '2075',
		name: 'Seattle Sprawl Digital Box Set',
		names: {
			'de-DE': 'Seattle Box - Stadt der Schatten'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: ['2016-04'],
		sku: ['27110', '45027G'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Eye of the Eagle\nSeattle isn’t the only place where danger lurks. Conspiracy also grows to the north, threatening to tear the Tsimshian Nation apart and shatter its government. The radicals behind it are willing to die for their cause. Their tools are the weapons of terror: violence, fear, chaos and the ultimate weapon, something so dark and terrible it should have been left buried.',
		edition: 1,
		gameDate: '2051',
		name: 'Native American Nations Volume Two',
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1991-12',
			'2015-03-11'
		],
		sku: ['7207'],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: "Think corps security means a donut-snarfing security guard and a high fence? Think again, chummer! You want inside the corp enclaves, first get past the security wage mages, drek-hot deckers, and really big guys with really big guns ... plus a few hellhounds and watcher spirits just to keep you on your toes. The blackest ice, the toughest barriers, and the trickiest booby traps are just waiting for you to make one mistake ... your last! Want to survive your next run against the megacorps? Read this book and learn how they'll try to stop you. Once you know how the enemy thinks, you've won the first battle.",
		edition: 2,
		gameDate: '2055-09',
		name: 'Corporate Security Handbook',
		names: {
			'de-DE': 'Handbuch Konzernsicherheit'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1995-05',
			'1998',
			'2010-06-06'
		],
		sku: [
			'7118',
			'10735'
		],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: 'In The Darkness, Something Terrible Breeds...\n\nFor years, a shadow war has raged against the Universal Brotherhood and its savage masters -- parasitic insect spirits that feed on human hosts. Now, Chicago has become the final battleground in the war against the bugs. Overrun by the horrible predators, the city has been quarantined by the UCAS military, leaving its inhabitants to fend for themselves while "other solutions" are considered. Hundreds of thousands remain trapped within the walled Containment Zone, at war with brutal gangs and ruthless warlords that rage unchecked -- and the unnatural menance that threatens them all.',
		edition: 2,
		gameDate: '2055-08',
		name: 'Bug city',
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: ['1994-12'],
		sku: ['7117'],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: "\"Used to be, magic was pretty simple. Well, OK, not simple exactaly... but you knew where people stood with it. A magician was either a guy in the robes with the formulas or the guy summoning spirits in the wild with the bearskin and the rattle.\nNow the guy next door to me says he's a houngan practicing some mojo called voudoun. The kid down the block slings his juju based on an old flat-vid superhero show. Seems like the longer the Sixth World coes on, the more there is to learn about how magic works. And believe me, you'd better learn it--'cause in this biz, what you don't know can kill you.\"\n--Not Horatio, troll magician, Street Lectures Online",
		edition: 2,
		gameDate: '2057-01',
		name: 'Awakenings: New Magic in 2057',
		names: {
			'de-DE': 'Almanach der Hexerei'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions'
		],
		releaseDate: [
			'1995-12',
			'1997-10'
		],
		sku: [
			'7120',
			'10732'
		],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: "Want a little edge in that street fight? A little flash? A little chrome in street-light to make the punks think twice? Then take a look inside these pages. Cybertechnology tells you everything you want to know about the latest, wizzest, and handiest cyberware. Learn what works and why. From cybereye laser sights to move-by-wire systems that can make you the fastest and deadliest thing on two feet, Cybertechnology has it all.\nAnd then there's cybermancy, for the real hard-core street samurai. Cybermancy gives you edge in spades... if you can pay the price. How much cyberware can a body take before it's no longer human? Cybermancy pushes that limit beyond your wildest dreams. This combination of state-of-the-art magic and technology can make you a virtually unstoppable cyborg, more metal than flesh. Of course, there are a few side effects...\nThe Cybertechnology sourcebook describes new cyberware, accessories, and enhancements, and offers optional and expanded rules for dealing with cyberware in all types of situations. The book also contains complete cybermancy rules and new archtypes, including cyborgs.",
		edition: 2,
		gameDate: '2056-03',
		name: 'Cybertechnology',
		names: {
			'de-DE': 'Cybertechnology'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1995-09',
			'1997-01',
			'2009-08-20'
		],
		sku: [
			'7119',
			'10722'
		],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: 'When you care enough to run with the very best\nDeckers, Riggers, Terrorists, Newshounds, Fixers, and more. Prime Runners presents forty-one of the best of the shadows, ready to inhabit any Shadowrun campaign. Eachcharacter profile comes complete with alleged background, apparent motivations, rumored history, most-recent description, and as-acurate-as-anyone-can-guess Shadowrun, Second Edition game statistics. From Michael Sutherland, cultured decker-extraordinarie, to the elusive McBean, who seems to have been everywhere and done everything; from Yakusa bosses to hate-mongers to people not quite human, these are the prime runners, the best of the best, with enough plot hooks to snare event the most "been there, killed thet"shadowrunner.',
		edition: 2,
		gameDate: '2055-03',
		name: 'Prime Runners',
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: ['1994-10'],
		sku: ['7116'],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: 'In the world of 2054, money still makes the world go ‘round, and no one holds more of it than the megacorporations. Unchecked by the laws of any nation and bolstered by private armies of the hottest hitters and cyberjocks money can buy. These giants command commercial empires that span the globe. Constantly competing to increase their all-important profit margins, these behemoths will stop at nothing to achieve their ends and don’t care who gets reeked along the way. All fiercely protect their privacy, however, and prefer to wage their wars in the shadows—making them an unending source of biz for the runner.\nCorporate Shadowfiles reveals the secrets of the megacorporations for the first time—their histories, assets, personnel, the works. So if you’re looking for a little background on your corporate clients, or maybe planning that big score that wills et you up for life, open your capture file and read away—but be ready to beat feet, ‘cause the corps will kill to protect this data.',
		edition: 2,
		gameDate: '2054',
		name: 'Corporate Shadowfiles',
		names: {
			'de-DE': 'Megakons'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1993-12',
			'1996',
			'2015-03-11'
		],
		sku: [
			'7113',
			'10724'
		],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: 'The glorious creatures of the mythic past and horrors undreamt of dwell in the Europe of 2054. Gargoyles and goblins stalk the streets of London. Centaurs and satyrs roam the countryside. A mysterious and menacing menagerie of creatures, both fearsome and friendly, now populates the European landscape.\nParanormal Animals of Europe is a field guide to these magically awakened creatures. Detailed de',
		edition: 2,
		gameDate: '2053',
		name: 'Paranormal Animals of Europe',
		names: {
			'es-ES': 'Animales paranormales de Europa',
			'fr-FR': 'Les Métacréatures Européennes'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Descartes Editeur',
			'Ediciones Zinco',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1993-03',
			'1995',
			'1997-01',
			'2013'
		],
		sku: [
			'7112',
			'S16',
			'2-7408-0145-9'
		],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: "YOU WANNA CALL THE COPS CHUMMER?\nWE ARE THE COPS.\nTO SERVE AND PROTECT?NGet Actual. Go-gangers, chipmongers, muscleboys--the sprawl breeds 'em all like so vermin. And the first lesson any cop learns is frag them before they frag you.\nWelcome to the world of lone star.\nSome call 'em civilization's last hope against anarchy--but anyone in the know will tell you they've simply the world's biggest street gangs--a bunch of bullboys with badges, armed with the most novahot hardware money can buy.",
		edition: 2,
		gameDate: '2054',
		name: 'Lone Star',
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: ['1994-06'],
		sku: ['7115'],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: 'The streets are a violent place, as dangerous as any battlefield. And the lessons men and women learn on those fields of fire can save their reputations-and their lives-in any combat situation.\nFields of Fire is the mercenary sourcebook for Shadowrun. Information on how to act like a professional merc, and pages of new weapons, support gear, and optional combat-rules clarifications and expansions make this book something no merc, or runner, should live without.',
		edition: 2,
		gameDate: '2054',
		name: 'Fields of Fire',
		names: {
			'de-DE': 'Kreuzfeuer',
			'fr-FR': 'Les Chiens de Guerre'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Descartes Editeur',
			'Fantasy Productions',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1994-04',
			'1997-01',
			'1995',
			'2010-03-02'
		],
		sku: [
			'7114',
			'10720'
		],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: "FACT?\nFICTION?\nPARANOIA?\nYOU MAKE THE CALL - AND PRAY YOU'RE RIGHT!\n\nThey're out there, chumlies. You know they're out there -- the puppeteers who pull the strings on everybody from CEO Damien Knight to the scroffiest born-yesterday street rat. I'm talking bug spirits you can't tell apart from human beings ... magical cabals who want to make us all slaves in their mage-o-cratic utopia ... hate groups so powerful they make the megacorps look like kiddie crooks ... artificial intelligences jerking our chains from so deep inside the Matrix that the hottest decker can't reach them. They're taking over the world -- and NO ONE CAN STOP THEM. In fact, you just might be working for them right now ...",
		edition: 2,
		gameDate: '2057-01',
		name: 'Threats',
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: ['1996-06'],
		sku: ['7121'],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: "From the chaos of grater London to the majesty of the Welsh Wild Lands and the fey court of Rhiannon Glendower of Snowdonia, the lands of the modern United Kingdom are shrouded in power and mystery. The nobility, megacorporations, and ruling druidic government are all locked in an intrincate dance of domination as the land itself fights against the toxic death man has brought her. Here, magic reigns, oppression rules, and the shadows run black and deep. Welcome to she Smoke, term. It's party time.",
		edition: 1,
		gameDate: '2051',
		name: 'London Sourcebook',
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: ['1991-09'],
		sku: ['7203'],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: 'Over thirty years ago, the violent formation of the Native American Nations shattered the United States of America and altered the geo-political boundaries of North America. Now, someone’s setting out to prove that turn-about is not fair play and to bring about a little change of their own. Is it payback? Or something deeper? Regardless, it’s a mad chase through the Native American Nations, full of the chaos one expects in a Shadowrun adventure.',
		edition: 1,
		gameDate: '2051',
		name: 'Native American Nations Volume One',
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1991-05',
			'2015-03-11'
		],
		sku: ['7202'],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: 'See the sights!\nTake a tour of North America with the slightly warped. Learn the ins and outs of major cities like Atlanta, Chicago, Dallas/Fort Worth, New York, San Francisco, and Washington D.C. Make your next vacation an exciting one, one they’ll never forget.\nThe Neo-Anarchist’s Guide to North America details the countries, states, and politics of Shadowrun’s North America. This sourcebook covers the laws, relative costs of goods, what to smuggle and to whom, corporate activity, who’s bought whom and just what are they really up to, and life in general and how to screw it up in style.',
		edition: 1,
		gameDate: '2051',
		name: "Neo-Anarchist's Guide to North America",
		names: {
			'fr-FR': "Le Guide Néo-Anarchiste de l'Amérique du Nord"
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Descartes Editeur',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1991-05',
			'1994-06',
			'2013-03-13'
		],
		sku: ['7206'],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: 'Forged in the chaos of the Awakening and the Euro-Wars, the German Alliance is a land torn by strife, rebellion, political turmoil and powerful magic. From the towering glass-and-chrome skyscrapers of Frankfurt to the anarchy of Berlin, from the GreenWar camps of the Rhine-Ruhr megaplex to the Troll Kingdom of the Black Forest, 21st-century Germany teems with opportunities and unseen dangers for the shadowrunner.',
		edition: 2,
		gameDate: '2053',
		name: 'Germany Sourcebook',
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: ['1994-02'],
		sku: ['7204'],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: 'Deutschland in den Schatten: Ein Quellenbuch für Shadowrun. Das Rollenspiel einer finsteren Zukunft, in der die Skylines gigantischer Städte den Himmel verdunkeln, in der internationale Megakonzerne ganze Staaten aufkaufen, und in der Korruption einer der wichtigsten Wirtschaftszweige ist. … Wer im Labyrinth der Hamburger Kanäle, im gesetzlosen Berlin, der verstrahlten SOX und in den Chrompalästen der Megakonzerne überleben will, der braucht mehr als nur Überzeugungskraft einer Walther Secura: Cyberware oder Zauberei, der Blick hinter die glänzende Fassade, unf der Mut, ausgetretene Bahnen zu verlassen, unterscheiden den erfolgreichen vom erfolglosen Runner, den Individualisten von der Masse - und die Lebenden von den Toten.',
		edition: 2,
		gameDate: '2053',
		name: 'Deutschland in den Schatten',
		notes: 'In the English translation "Germany Sourcebook" the following chapters are missing from the original "Germany in the Shadow":\n\t- "The eyes of the Riggers" - short story / novel excerpt\n\t- "Hamburg: Venice of the North"\n\t- "Connections"\n\t- "Archetypes"\n\t- "Equipment" and\n\t- the map of the ADL\n\nSome of the other chapters are arranged and arranged in completely different order. In addition, the English translation also contains a glossary with pronunciation tips and the chapter "Game Information" In addition, almost all inGame advertising of the German original (including the color pages) was replaced by completely different advertisements, and also replaced part of the original Shadowtalks to certain, particularly bizarre ideas of German authors (such as the " Gore " in Berlin) to relativize.',
		originalLanguage: 'de-DE',
		publisher: ['Fantasy Productions'],
		releaseDate: [
			'1992',
			'1993'
		],
		sku: ['10708'],
		type: 'ocr'
	},
	{
		category: 'sourcebook',
		description: 'Tir Tairngire\n\nTír na nÓg\n\nPomorya\n\nDies sind die klingenden Namen der Staaten, die Elfen für sich und ihresgleichen gründeten. Sie klingen jedoch unterschiedlich, ja nachdem, wer sie hört.\nFür die einen sind sie wahrhaft Länder der Verheissung, wo, frei von Rassismus und Unterdrückung, die Elfen und andere Metarassen den Weg gehen können, der ihnen bestimmt ist.\nFür andere jedoch haben diese Namen einen unangenehmen Unterton. Wie sieht er denn aus, der vorbestimmte Weg der Elfen? Ist es das Leben im Einklang mit der Natur oder der Versuch einer heimlichen Weltherrschaft? Ist das Leben in diesen Ländern frei, oder tauscht man nur die eine Unterdrückung gegen die andere, subtiler vielleicht, aber um so stärker? Wer sind die wahren Herrscher dieser Länder, und was ist dran an den Grüchten über unsterbliche Elfen?\nDie Wege, die diese drei Länder gewählt haben, sind unterschiedlich, doch Gemeinsamkeiten sind unübersehbar. Ganz gleich, ob Runner in diesen Ländern arbeiten, ob nur eine Spur dorthin führt oder ob Herr Schmidt behauptet, in ihrem Namen zu handeln. Gegen die Intrigen eines Elfenhofes machen sich Machtkämpfe im Aufsichtsrat eines Megakons aus wie ein gemütlicher Plausch zum Tee. Kein Runner kann es sich leisten, unvorbereitet zu sein.\nDie Länder der Verheißung enthält die wesentlichen Teile der Originalausgaben von Tir Tairngire, Tír na nÓg und als Welterstveröffentlichung die Betrachtung Pomoryas, des deutschen Elfenstaates.',
		edition: 2,
		gameDate: '2053',
		name: 'Die Länder der Verheißung',
		notes: 'The German version of The Lands of Promisse (Tír Tairngire & Tír na nÓg), contains the elemental parts of the original issues of Tir Tairngire, Tír na nÓg and as a world first publication a view into Pomorya, the german elvenstate.',
		originalLanguage: 'de-DE',
		publisher: ['Fantasy Productions'],
		releaseDate: ['1998'],
		sku: ['10738'],
		type: 'ocr'
	},
	{
		category: 'sourcebook',
		description: 'In den Fünfziger Jahren des einundzwanzigsten Jahrhunderts sind die Vereinigten Staaten von Amerika nur noch eine Erinnerung, abgelöst von den rivalisierenden Staatsgebilden der amerikanischen Ureinwohner und der weißen Siedler.\nMan könnte sagen: Ein Flickenteppich - aber Minenfeld wäre wohl die korrektere Bezeichnung...\nDas dies das richtige Umfeld für Shadowrunner ist, versteht sich fast von selbst. Ob als Samurai in den Straßenschluchten Manhattans, als Söldner an der Grenze zwischen Texas und Aztlan, als Rigger auf der weiten Prärie der Sioux Nation oder als Decker in den Datenbanken von Washington FDC, überall warten lohnende Aufträge für echte Profis - seid ihr bereit?\nDas Nordamerika-Quellenbuch enthält Informationen zu den United Canadian and American States, den Confederated American States, der Republic of Québec und den Native American Nations sowie den wichtigsten Städten des nordamerikanischen Kontinents.',
		edition: 2,
		gameDate: '2053',
		name: 'Nordamerika Quellenbuch',
		notes: "Combines material of Native American Nations Volumes 1 & 2 as well as the Neo-Anarchists Guide to North America into one volume. Not included are the Native American Nation's adventures and the description of California Free State and San Francisco.",
		originalLanguage: 'de-DE',
		publisher: ['Fantasy Productions'],
		releaseDate: ['1997'],
		sku: ['10728'],
		type: 'ocr'
	},
	{
		category: 'mission',
		description: "Langeweile? Keine Kohle mehr? Leerlauf? Arbeitslos? Dann wird's mal wieder Zeit, in die Schatten abzutauchen und für Abwechslung zu sorgen! Euer Schieber kann euch zur Zeit vier nette Jobs in Deutschland und der Schweiz anbieten:\nDas Buch der Hölle fängt scheinbar harmlos an, entwickelt sich aber nach einigen Tagen zu einem echten Höllentrip. Wer da magisch nichts drauf hat, kann sich direkt ein sonniges Plätzchen am Styx reservieren lassen!\nUmcir führt (genauso harmlos) in die Schweiz, um eine Person ausfindig zu machen. Falls ihr jetzt an ruhige Klettertouren in den Alpen und gemütliche Tage in einem schweizer Kurhotel denkt, solltet ihr euch ernsthaft Gedanken über euren Ruhestand machen...\n12 Stunden Zeit habt ihr, um einen Kurierjob zu erledigen. Runner, die es mit der Pünktlichkeit nicht so genau nehmen, könnten dabei schon mal den Kopf verlieren. Oder wisst ihr etwa nicht, wie Cortexbomen funktionieren?\nFestlichkeiten sind ja eigentlich etwas schönes - vorausgesetzt, der Anlass zum Feiern geht einem nicht gegen den Strich. Dann ist Ärger vorprogrammiert!\nSchattenlichter ist ein Abenteuerband zu Deutschland in den Schatten und Chrom und Dioxin, den Shadowrun-Quellenbänden zu Deutschland und der Schweiz in den 2050ern. Beide genannten Bände sind zum Durchspielen und Leiten der Abenteuer nicht unbedingt nötig, aber ausgesprochen empfehlenswert.",
		edition: 2,
		gameDate: '2053',
		name: 'Schattenlichter',
		notes: 'A German adventure book with 4 short-adventures.',
		originalLanguage: 'de-DE',
		publisher: ['Fantasy Productions'],
		releaseDate: ['1997'],
		sku: ['10730'],
		type: 'print'
	},
	{
		category: 'mission',
		description: 'SCHLAGSCHATTEN\n\nErleben Sie die Schattenseiten des zukünftigen Deutschland in drei packenden SHADOWRUN-Abenteuern:\n\t- MurderMedia: Ein Privatsender im Ruhrplex, eine perverse Show, die Yakuza und ein internationaler Medienkonzern - und die Runner wie üblich mittendrin! von Björn Lippold\n\t- Lösegeld für eine Leiche: Wenn der Chef einer renommierten Sicherheitsfirma seinen Sohn bei einem mysteriösen Attentat verliert und die Polizei den Fall zu den Akten legt, ist es Zeit, die Schatten zu kontaktieren. von Stefan Willkofer\n\t- Proemtheus: Hamburg 2053: Was bezweckt der verrückte Wissenschaftler Dr. Surgental mit seiner bizarren Kreuzung aus einem erwachten Wesen und einer Wagenladung Cyberware? von Armin Schmiege!\nEnthält Datenanhänge für alle wichtigen Waffen und Fahrzeuge! Voll kompatibel zu SHADOWRUN 2.01D',
		edition: 2,
		gameDate: '2053',
		name: 'Schlagschatten',
		notes: '"Schlagschatten" (Drop Shadow) is a German Shadowrun adventure collection set in the Germany of 2053. It contains three adventures.',
		originalLanguage: 'de-DE',
		publisher: ['Fantasy Productions'],
		releaseDate: ['1993'],
		sku: ['10709'],
		type: 'print'
	},
	{
		category: 'sourcebook',
		description: "Hey, hier gibt's nichts zu sehen... gehen sie weiter!\n\n\"Jeder von uns hat seine dunklen Geheimnisse, Chummer. Siehst du das Cybergirl mit der Fetisch-Halskette dort drüben? Sie könnte eine Kultistin sein, die ihre verlorene Magie durch blutige Rituale wiederherzustellen versucht. Oder den Schlipsträger, der drüben in der Ecke seinen Whiskey runterschlingt? Er könnte der Laufbursche irgendeiner supergeheimen Regierungsverschwörung sein, die die NAN stürzen will. Und der Freak da hinter dir? Drek, der ist noch nichtmal menschlich...\"\nBedrohliche 6. Welt beschreibt neunzehn einflussreiche Organisationen und Wesen, die alle ihre eigenen geheimen Ziele in der Welt von Shadowrun verfolgen. Die von ihnen ausgehende Bedrohung betrifft die verschiedensten Aspekte des Lebens, von seltsamen Geistern, die in magischen Foki lauern, bis zu wahnsinnig gewordenen KIs, die sich selbst umprogrammieren und die Matrix übernehmen wollen. Jede dieser Bedrohungen kann als immer wiederkehrender Oberbösewicht verwendet werden, der den Charakteren das Leben schwer macht und sie für seine eigenen dunklen Ziele zu manipulieren versucht. ",
		edition: 3,
		gameDate: '2062',
		name: 'Bedrohliche 6. Welt',
		notes: 'This sourcebook is the German translation of two original Shadowrun titles: Threats and Threats 2',
		originalLanguage: 'de-DE',
		publisher: ['Fantasy Productions'],
		releaseDate: ['2003'],
		sku: ['10757'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Willkommen zu Hause, Omae.\n\nDu kennst dich aus in deinem Sprawl? Du weißt, wer bei der Regierung die Fäden zieht? Wie sie dich in den Knast verfrachten können und wie du wieder raus kommst? Du glaubst zu wissen, was Hexen und Magier hier treiben oder was in der Szene läuft, nur weil du Karl Kombatmage guckst? Du weißt, was beim Hoverball wirklich läuft und wer daran verdient, wenn du es dir live im Trideo reinziehst? Und du bist dir sicher, dass der Schatten hinter den Mülltonnen bloß eine Ratte war? Wird Zeit, dass du dein Zuhause wirklich kennen lernst, Chummer!\n\nBrennpunkt: ADL erlaubt einen Blick hinter die Kulissen der Allianz Deutscher Länder, von dem Parteien- und Regierungssystem der Allianz und ihrem Justizapparat über die verschiedenen Wege der Magie und den Jagd und Domestizierungsmöglichkeiten bei hiesigen Crittern bis zu den aktuellen Sport- und Medientrends, und gibt Einblick in die wichtigsten Subkulturen der Allianzländer. Diese Informationen füllen den Hintergrund der ADL weiter aus und geben Spielleitern wie Spielern viele neue Möglichkeiten und Ideen an die Hand.',
		edition: 3,
		gameDate: '2063',
		name: 'Brennpunkt: ADL',
		notes: 'It mainly deals with areas of the ADL society that could not be covered in detail in Deutschland in den Schatten II: politics, police , judiciary and prison system, magic - from the university magician training on the witches and the Theurgen Westphalens to the psionics - as well as the media, professional sports , the neo-anarchists in the east of the re-divided Berlin and various subcultures.',
		originalLanguage: 'de-DE',
		publisher: ['Fantasy Productions'],
		releaseDate: ['2004'],
		sku: ['22004'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Wir schreiben das Jahr 2062\n\nWer aber erwartet, die Schatten wären ruhiger geworden, der irrt sich gewaltig. Die rasante Entwicklung in der ADL ist nicht aufzuhalten, und gerade die letzten Jahre haben gezeigt, dass die Sechste Welt auch in Deutschland noch ein paar Überraschungen parat hat. Kämpfende Drachen über Frankfurt, Orichalkumfunde in vielen Gebieten, Hungersnöten in Berlin und ein spurlos verschwundener Herrscher sind nur ein paar der Ereignisse, über die ein Runner Bescheid wissen sollte, wenn er im Geschäft bleiben will.\nJede Region hat ihr ganz eigenes Gesicht und ihre eigenen Regeln, und wer diese Regeln nicht kennt, verlässt den Plex in einem Sarg. Information ist alles, wenn man Deutschlands Schatten weiterhin eine große Nummer bleiben will.\nDeutschland in den Schatten II liefert einen vollständigen Überblick über die Allianz Deutscher Länder im Jahr 2062. Hier finden Sie detaillierte Informationen zu sämtlichen Regionen und Plexen in deutschen Landen sowie Hintergründe, Fakten und Beschreibungen zum Leben als Runner in der ADL. Lifestyle, Recht und Gesetz und die Probleme des täglichen Lebens geben Ihnen die Möglichkeit, die Welt von Shadowrun noch besser mit Leben füllen. Dieses Buch liefert zum ersten Mal eine komplette Zusammenfassung und Überarbeitung über die bisherigen Publikationen und ist für Einsteiger gleichermaßen geeignet wie für die Veteranen in Deutschlands Schatten. ',
		edition: 3,
		gameDate: '2062',
		name: 'Deutschland in den Schatten II',
		notes: '"Deutschland in den Schatten II" (Germany in the Shadows II) is the successor to the Germany Sourcebook. It details the German territories in the year 2062.',
		originalLanguage: 'en-US',
		publisher: ['Fantasy Productions'],
		releaseDate: ['2001'],
		sku: ['10753'],
		type: 'ocr'
	},
	{
		category: 'sourcebook',
		description: 'Walzer tanzt man, wenn es Nacht wird in Österreich. Doch in den Schatten der Innenstadt oder im Ghetto der vereinigten Wohnparks kämpfen zur gleichen Zeit Menschen um ihr Überleben.\nPunks beherrschen die Straßen Berlins. Doch die Konzerne haben ihre eigenen Pläne für das Tor zum Osten Europas, und sie kennen kein Pardon für die, die sich ihren Zukunftsvisionen für eine neue Weltstadt in den Weg stellen.\nSchwarzes Ice sichert die Pläne und die Errungenschaften der neuen Spieler auf Deutschlands Wirtschaftsbühne. Proteus und die Draco-Foundation heißen die Machtfaktoren, die noch niemand einzuschätzen weiß.\nWalzer, Punks & Schwarzes Ice ist ein Quellenband für Shadowrun 2.01D. Er bietet die jüngsten Enzwicklungen in der ADL, der Schweiz und einen großen Östereich-Teil, die Veränderungen in Berlin seit dem Ende der Anarchie, neue Ausrüstung und mehr, denn im Jahr 2058 heißt Wissen: Überleben.',
		edition: 2,
		gameDate: '2058',
		name: 'Walzer, Punks & Schwarzes Ice',
		notes: "The book is inGame 2058, after Dunkelzahn's death, and includes a comprehensive chapter of Austria . In addition, there is a \"culture shock\" chapter for the ADL that describes life and work, fashion lawmakers, cultural trends and subcultures in the Alliance and was intended as a German equivalent to the American \"Neo-Anarchists' Guide to Real Life\". It also contains updates on Proteus AG and the Draco Foundation in the Alliance and on Berlin after the corporate invasion, as well as one chapter for SOX and one for Bremen. Finally, the book is rounded off by a short Switzerland-update.",
		originalLanguage: 'en-US',
		publisher: ['Fantasy Productions'],
		releaseDate: ['1997'],
		sku: ['10733'],
		type: 'ocr'
	},
	{
		category: 'sourcebook',
		description: 'Everything about Tokyo in 2054\nFrom the detailed descriptions of each districts, to the Japanese magic and critters.',
		edition: 2,
		gameDate: '2053',
		name: 'TOKYOソースブック',
		notes: 'This was the sourcebook of Tokyo and Japan Imperial State in 2050, in Japanese. Non-cannon.',
		originalLanguage: 'jp-JP',
		publisher: ['富士 見 書房'],
		releaseDate: ['1996'],
		sku: ['4-8291-7337-8'],
		status: 'outofscope',
		type: 'print'
	},
	{
		category: 'sourcebook',
		description: "Visit Beautiful Seattle, An Interesting Place to Live\nA modern frontier town, sandwiched between the Elven nation of Tir Tairngire and the Native American Nations, Seattle is a place where cultures mix—often with explosive results.\nA City of Opportunity\nMegacorps with private armies trade in technology and information. Crime bosses rule the underworld of illegal trade, violence, and extortion. There is always plenty of work for people who are willing to get their hands dirty, because the turnover is…brisk.\nFun, Friendly People\nSeattle is home to over 300,000 squatters who are willing to kill their mother for a pair of shoes. Fortunately, most never knew their mothers.\nSightsee Along Our Breathtaking Waterfront.\nJust don't stay out after dark. If the Elven street gangs don't get you, the city cops will, and maybe just for target practice.",
		edition: 1,
		gameDate: '2051',
		name: 'Seattle Sourcebook',
		names: {
			'de-DE': 'Seattle Quellenbuch',
			'fr-FR': 'Le Guide de Seattle'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Descartes Editeur',
			'Fantasy Productions',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1990-04',
			'1994-02',
			'2012-12-18'
		],
		sku: [
			'7201',
			'10719',
			'2-7408-0061-4'
		],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: "Honor. Respect. Family.\n\nThe Underworld Sourcebook describes in detail the \"Big Four\" international crime syndicates: the Mafia, the Yakuza, the Triads and the Seoulpa Rings. Each syndicate's markets, business practices, traditions, histories and secret rituals are revealed, along with loads of informtion on gangs, terorists, assassins and other groups who rule the shadows through no law but their own.\nThe Underworld Sourcebook includes guidelines for building campaigns around organized crime and customizing them for local settings, and alternate campaign rules that allow players to play members of organized crime syndicates. It provides a wealth of adventure hooks, story starters, background information and rules for use in any Shadowrun campaign.",
		edition: 2,
		gameDate: '2058-01',
		name: 'Underworld Sourcebook',
		names: {
			'de-DE': 'Unterwelt Quellenbuch'
		},
		notes: 'The German edition has rules updated to the third edition and an aditional chapter about the ADL.',
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions'
		],
		releaseDate: [
			'1997-03',
			'2000'
		],
		sku: [
			'7123',
			'10750'
		],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: "Dunkelzahn Assassinated!\n\nStunned World Awaits Dragon's Last Will and Testament\n\nOn Inauguration Night 2057, the newly sworn-in President of the UCAS is assassinated--and the Awakened world will never be the same. Dunkelzahn, the powerful and charismatic great dragon, has been murdered by unknown enemies ... but he left behind a Last Will and Testament, a legacy that will change the world. Some will get rich--others will learn that dealings with the dragon can extend beyond the grave. Will Dunkelzahn's legacy be a gift to the world ... or a curse?",
		edition: 2,
		gameDate: '2057-08',
		name: "Portfolio of a Dragon: Dunkelzahn's Secrets",
		names: {
			'de-DE': 'Portfolio eines Drachen: Dunkelzahns Geheimnisse'
		},
		notes: 'The German version was released for Shadowrun 3, eight years after the original publication.',
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1996-10',
			'2004',
			'2005-02-04'
		],
		sku: [
			'7122',
			'22007'
		],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: 'Meet\nthe\nNew\nBoss...\n\nThe corporate war is over, but the corps need the shadows now more than ever as they scramble for position in the new power structure. Fuchi is dead, Novatech has risen from its ashes, and Wuxing and Cross have elbowed their way onto the Corporate Court. The corps have ceased their open conflict, but the guns are still drawn under the table...\nCorporate Download describes the history, power players and business interests of the ten top megacorps. Corporate Download focuses on information that runners need: the latest security trends, secret plans, dirty tricks, people to know and how to use them. Players will learn what working for each corp means for their characters, and gamemasters will find new rules for using and rating the megacorps in their campaigns.',
		edition: 3,
		gameDate: '2061-02',
		name: 'Corporate Download',
		names: {
			'fr-FR': 'Corporate Download'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Descartes Editeur'
		],
		releaseDate: [
			'1999-09',
			'2001-05'
		],
		sku: ['7125'],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: "Forget those old stories of pirates swinging from the rigging with swords. In the 21st century, pirates have guns, cyberware and magic... and they'll use them to take anything from anyone if it'll net them a profit. They'll cut you open to watch the sharks eat you, and film the whole thing just to make a couple more bucks on the black market. They know where to get teh good, where to sell them and where to get more. Hitting a dockside warehouse, jumping a cruise ship or going toe-to-toe with another pirate crew for a shipment of weapons - they'll do whatever it takes to survive and come out on top. On the high seas, it's win or die.\nTake your shadowrunner out of the urban sprawl's mean streets and into the even meaner waterways of the world. Cyberpirates offers you a whole new realm to play in ... the world of smugglers and pirates. Become a swashbuckling, risk-taking Carribean League pirate or earn big money helping the corps exploit Africa's Ivory Coast. Or team up with a dragon to help free the Philippines and the grip of Imperial Japan. Cyberpirates offer colorful and detailed descriptions of piracy and smuggling in the Caribbean, the Philippeans and the West Coast of Africa, plus a portrait of the smuggling biz around the world. It also includes rules for underwater exploration, ship operations and combat, and loads of new toys. For use with Shadowrun.",
		edition: 2,
		gameDate: '2059-01',
		name: 'Cyberpirates!',
		names: {
			'de-DE': 'Cyberpiraten!'
		},
		notes: 'The German translation/publication features 8 additional pages on pirates of the North Seas and additional equipment.',
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions'
		],
		releaseDate: [
			'1997-11',
			'1998'
		],
		sku: [
			'7124',
			'10736'
		],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: 'Unfold the World\n\nThe Sixth World is full of dark alleys, twisted corridors, and hidden locations for nefarious activities. Shadowrunners and 16th century explorers both know the same truth—the difference between death and survival when entering a hazardous area may be a good map.\nSprawl Sites: North America presents eight full-color maps that can be used in a variety of sprawls, making it simple for gamemasters to call up a number of different locations when they need it. From a luxury hotel to a collection of blocks in an urban barrens, from a shopping mall to a trideo studio, the collection includes maps that can be used in many different situations. The maps are double-sided, with a key on one side, making them useful as both a guide for players and a reference for gamemasters. The package also includes a booklet providing details on security and other personnel found in the location, along with plot hooks to help involve these spots in your game.',
		edition: 4,
		gameDate: '2072',
		name: 'Sprawl Sites: North America',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2012-06-19'],
		sku: ['26500'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: "The Shadowrun Digital Tools Box is 2 box sets in 1! Whether you're just getting into Shadowrun or you're a runner that's been hitting the streets since the 2050s, you'll find useful material here for running any type of game.",
		edition: 5,
		gameDate: '2075',
		name: 'Digital Tools Box',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2014-01-30'],
		sku: ['27100X'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: "THE RIGHT TOOLS FOR THE NEXT RUN\n\nSCAN THIS, CHUMMERS\n\n\t- Have you tackled the Beginner Box and are ready to move up in the Sixth World\n\t- Are you a gamemaster ready to give Shadowrun a shot, and you want a few extra tools at your disposal from the first toss of your dice?\n\t- Do you play Shadowrun now, and are you looking for a set of tools that'll allow you to easily introduce new gamers to your favorite RPG at your local games store or hangout.\nSay yes to any of those, than Runner's Toolkit: Alphaware is the box set for you.\n\nDesigned as the perfect stepping-stone between the Shadowrun Beginner Box and Shadowrun, Fifth Edition, this Box can fill a number of roles. Wether you're looking for more adventures and options to move beyond the Beginner Box, laying the groundwork for your gaming group to move fully onto Shadowrun, Fifth Edition, or providing adventures, maps and other tools to use in conjunction with the core rulebook, you'll find this kit invaluable.\n\nALPHAWARE INCLUDES:\n\n\t- Rules of the Street: A rulebook, designed to be accessible and simple to use.\n\t- The Edge of now gives the flavour and background of the Sixth World\n\t- Plots and Paydata: Adventures and tips for any Shadowrun gamemaster.\n\t- Eight double-sided maps to help the players and GMs track the action.\n\t- Spell, weapon and gear cards for quick reference.\n\t- Pre-generated characters, players can use right away.\n\t- A double-sided poster: North America map and killer art.\n\t- And of course, handfuls of six-sided dice for Shadowrun action.",
		edition: 5,
		gameDate: '2075',
		name: "Shadowrun Runner's Toolkit: Alphaware",
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2014'],
		sku: ['27102'],
		type: 'print'
	},
	{
		category: 'rulebook',
		description: "MAN, MAGIC & MACHINE!\n\nWELCOME TO THE SIXTH WORLD!\n\nMegacorporations dominate the world. Dragons prowl the skies -- and corporate boardrooms. Magicans sling fire and lightning, ice and acid. Hackers break in the darkest corners of the Matrix, digging out secrets while risking feedback that could fry their synapses and people on the edge of society, those that have been pushed into the shadows, fight to stay free.\n\nThe Shadowrun Beginner Box is the easiest way to dive into the intrigue, grit and action of one of the most enduring role-playing settings of all time!\n\nTailor-designed for an easy-on-the-credstick entry, the Beginner Box includes the following:\n\t- A Universe Primer: A 24-page exploration of the Shadowrun world.\n\t- Quick-start Rules: Fast rules and a quick adventure to wet your appetite for more.\n\t- A pre-generated character booklet: Allows for a gamemaster and one person to run a solo adventure.\n\t- 4 pre-generated character sheets: Details that'll allow up to four players to play with the help of a gamemaster.\n\t- Dice: Never forget your handful of D6s!\n\t- Whether you are new to Shadowrun or new to roleplaying, this package will get you into the fun of hacking, shooting and spellslinging your way to the top!",
		edition: 5,
		gameDate: '2075',
		name: 'Shadowrun Beginner Box Set',
		names: {
			'fr-FR': "Boite d'initiation",
			'pt-BR': 'Shadowrun: Caixa Introdutória'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Black Book Editions',
			'New Order Editora'
		],
		releaseDate: [
			'2014',
			'2018'
		],
		sku: [
			'27101',
			'SR5B01'
		],
		type: 'print'
	},
	{
		category: 'rulebook',
		description: 'REALITY IS FOR THOSE WHO LACK IMAGINATION\n\nConnect to the world-wide net known as the Matrix ® and create a universe of your own. No matter what your status is in the real world Megacorp President Or Synthmeat Street Vendor You Can Imagine The Lord Of All You Can Imagine. Access virtual clubs and test your skills in total-reality games. Ransack massive databases and pillage corporate systems for payday - and try to stay alive long enough to enjoy the results.\n\nMatrix Expands on the basic rules decking provided in Shadowrun, Third Edition , and offers advanced rules for programming, deck construction, system security and Accessing the matrix. Matrix includes rules for information searches and new updates on artificial intelligence and otaku characters .',
		edition: 3,
		gameDate: '2061',
		name: 'Matrix',
		names: {
			'de-DE': 'Matrix',
			'es-ES': 'La Matriz',
			'fr-FR': 'La Matrice'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Descartes Editeur',
			'La Factoría de Ideas'
		],
		releaseDate: [
			'2000-08',
			'2001',
			'2004',
			'2005'
		],
		sku: [
			'7909',
			'10747',
			'LFSH009'
		],
		type: 'scan'
	},
	{
		category: 'rulebook',
		description: "More Bang for the Buck...\n\nWhen the shadows are full of flying lead, chummer, you need an edge -- and I got it right here. You want a specialized blade? I can sell you a monosword. You want a gun to make the other guy think twice? How about the new laser pistol? Maybe you want to forge your whole body into a weapon -- I know someone who can train you in Wildcat-style martial arts. The big boys don't have all the best toys...",
		edition: 3,
		gameDate: '2061',
		name: 'Cannon Companion',
		names: {
			'de-DE': 'Arsenal 2060',
			'es-ES': 'Gran Caliber',
			'fr-FR': 'Cannon Companion',
			'hu-HU': 'Fegyverek kézikönyve'
		},
		notes: 'The German edition has diffrent equipament, based on German sources.',
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Descartes Editeur',
			'La Factoría de Ideas',
			'Beholder Kiadó Bt.',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'2000-07',
			'2001-06',
			'2002',
			'2003-12'
		],
		sku: [
			'7908',
			'10659',
			'10744',
			'LFSH005'
		],
		type: 'scan'
	},
	{
		category: 'rulebook',
		description: 'These Quick-Start Rules offer a streamlined rule set along with pregenerated characters, quick-reference sheets and a first adventure: Foodfight 4.0!',
		edition: 4,
		gameDate: '2072',
		name: 'Shadowrun 4th Ed.: Quick Start Rules',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2011-02'],
		sku: ['SR4QS'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'These Quick-Start Rules offer a streamlined rule set along with pregenerated characters, quick-reference sheets and a first adventure: Foodfight 4.0!',
		edition: 4,
		gameDate: '2072',
		name: 'Shadowrun 4th Ed.: Quick Start Rules (Free RPG Day 2012)',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2012-06'],
		sku: ['26FRP12'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'These Quick-Start Rules offer a streamlined rule set along with pregenerated characters, quick-reference sheets and a first adventure: Return to Sender',
		edition: 4,
		gameDate: '2075',
		name: 'Shadowrun 5th Ed.: Quick Start Rules (Free RPG Day 2015)',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2015-07'],
		sku: ['27FRP15'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: "Shadowrun, Fifth Edition is here and there's no better way to dive into the Sixth World than with these Shadowrun Quick-Start Rules. Take on the role of a Combat Adept, Decker, Street Shaman, or Street Samurai in a brawl against fast-food goodfellas using this set of streamlined rules perfect for both those new to Shadowrun or long-time players getting back into the game.",
		edition: 5,
		gameDate: '2075',
		name: 'Shadowrun Fifth Edition: Quick Start Rules',
		names: {
			'de-DE': 'Shadowrun Fünfte Edition Schnellstartregeln',
			'pt-BR': 'Shadowrun Regrás Rapidas'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegssus Spiele',
			'New Order Editora'
		],
		releaseDate: ['2013-07'],
		sku: ['27QSR'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: "PLANES,\nDRONES and\nAUTOMOBILES\n\nLiving is rigging, omae. Like burning rubber down the highway at 150 klicks and hour with only your brain to guide you. What about making a drone an extension of yourself, or undermining the security of a whole building, manipulating every camera, motion detector or security door. But the biggest kick is blowing up a car full of goons without even jacking out — weapons of destruction at your mental command … now that's road rage, my friend.",
		edition: 3,
		gameDate: '2061',
		name: 'Rigger 3',
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: ['2001-01'],
		sku: ['7910'],
		type: 'scan'
	},
	{
		category: 'rulebook',
		description: "PLANES,\nDRONES and\nAUTOMOBILES\n\nLiving is rigging, omae. Like burning rubber down the highway at 150 klicks and hour with only your brain to guide you. What about making a drone an extension of yourself, or undermining the security of a whole building, manipulating every camera, motion detector or security door. But the biggest kick is blowing up a car full of goons without even jacking out — weapons of destruction at your mental command … now that's road rage, my friend.",
		edition: 3,
		gameDate: '2061',
		name: 'Rigger 3 (Revised)',
		names: {
			'de-DE': 'Rigger 3.01D'
		},
		originalLanguage: 'en-US',
		publisher: ['Fantasy Productions'],
		releaseDate: [
			'2003-09',
			'20013-08-28'
		],
		sku: [
			'10662',
			'10743'
		],
		type: 'scan'
	},
	{
		category: 'rulebook',
		description: "So, You Think You Know Magic?\n\nChummer, I can write a book on wht you don't know. Can you design a spell or enchant a dagger? Can you invoke a great spirit or divine the future? Have you bared your soul to the Dweller on the Threshold during an astral quest? You've got a lot to learn--not even dragons know all there is to know about Magic in the Shadows.",
		edition: 3,
		gameDate: '2060',
		name: 'Magic in the Shadows',
		names: {
			'de-DE': 'Schattenzauber 3.01D',
			'es-ES': 'Magia en las Sombras',
			'fr-FR': 'La magic du Sixième moons',
			'hu-HU': 'Mágia az árnyakban'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Descartes Editeur',
			'La Factoría de Ideas',
			'Beholder Kiadó Bt.',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1998-12-16',
			'1999',
			'2001',
			'2003-06',
			'2006-10'
		],
		sku: [
			'7907',
			'10658',
			'10742',
			'LFSH004'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: "'There I was, standing next to Joe on the corner, when outta nowhere comes this overgrown troll riding the hugest Harley Scorpion I've ever seen, blastin' away from all three firmpoints. What really scared teh bejeezus outta me were his arms - coupla big chainsaws, buzzin' away like a hundred million wasps. He rode right up and sliced through Joe like a hot knife though butter! Joe flickered a bit, his face contorting into a pirmal scream, and disappeared. I hotfooted it back to the squat with the words, 'Buy Mitsuhama' running through my brain - don't ask me why, \"Then Joe's brother unhooked us from the Matrix...\n...AND THE REAL NIGHTMARE BEGAN.\"",
		edition: 2,
		gameDate: '2055-07',
		name: 'Virtual Realities 2.0',
		names: {
			'de-DE': 'Virtual Realities 2.01D',
			'es-ES': 'Realidades Virtuales 2.0',
			'fr-FR': 'Réalités Virtuelles 2.0'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Descartes Editeur',
			'La Factoría de Ideas',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1995-10',
			'1996',
			'1998-05',
			'2011-08-23'
		],
		sku: [
			'7904',
			'10710',
			'SH1201'
		],
		type: 'scan'
	},
	{
		category: 'rulebook',
		description: 'The grimoire is the book of magical power for the Shadowrun world. Inside, gamemasters and players will find essays on the magical world and roleplaying magicians. It includes rules on sepll design, finding and forming magical groups, initiation into the higher forms of magic, enchanting, alchemy, free and ally spirits, the exploration of the metaplanes, and powerful magical threats.',
		edition: 2,
		gameDate: '2053',
		name: 'Grimoire: Manual of Practical Thaumaturgy 15th Edition, 2053',
		names: {
			'de-DE': 'Grimoire: Handbuch der praktischen Thaumaturgie 9. überarbeitete deutsche Auflage, Heidelberg 2054',
			'es-ES': 'El grimorio: Manual de Thaumaturgia Practica 15ª Edicion Año 2053',
			'fr-FR': 'Le Grimoire: Manuel de la Thaumaturgy Practique, 15e Edition, 2053',
			'hu-HU': 'Grimoire: Varázslatok könyve: A Gyrakoalati Thaumaturgia Kétikönyve 15, Kiadás, 2053',
			'pl-PL': 'Grimoire: Podręcznik Praktycznij Taumaturgii 15 · ta Edycja, 2053'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Descartes Editeur',
			'Ediciones Zinco',
			'Beholder Kiadó Bt.',
			'ISA Sp. Zoo'
		],
		releaseDate: [
			'1992-12',
			'1993',
			'1994',
			'1997',
			'1998'
		],
		sku: [
			'7903',
			'10706',
			'S12',
			'ISA00100302'
		],
		type: 'scan'
	},
	{
		category: 'rulebook',
		description: "GEAR HEADS,\nGREASE MONKEYS\nAND SPEED JUNKIES\n\nRIGGERS ARE BACK!\nTaking the datajack cable from under the dash, I plug it into the jack under my ear. Then I sit back as the virtual display blossoms before my eyes. Dizziness hits me for a split second; then my mind adjusts to the blizzard of input from the view screens and sensors that are arrayed before me. The screens show views from every angle, as well as numerous data displays - from the amount of fuel in my 'copter's tank to the infrared displays of the people here at the landing pad. As the datafeed pours into my brain, I'm no longer just the human named Zagger. Instead, I am now my machine. I AM the Yellowjacket helicopter. I AM A RIGGER!\nRigger 2 overhauls and expands on the rules for riggers in Shadowrun. From creating a rigger character to down-and-dirty vehicle combat to electronic warfare, this book offers clear, concise rules for practically every aspect of playing a Rigger or dealing with a rigger's vehicles and drones. Also included are the rules for robotics, vehicle construction and modification, using security riggers in your game, and a comprehensive list of every vehicle in Shadowrun products published to date.",
		edition: 2,
		gameDate: '2058',
		name: 'Rigger 2',
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: ['1997-10'],
		sku: ['7906'],
		type: 'scan'
	},
	{
		category: 'rulebook',
		description: "BEEN THERE. RUN THAT.\n\nIt's time to go beyond the shadows and take a look around.\nAnd you'll find lots of surprises...\n\nMake the most of your character! Expanded character creation rules let you customize your character with Edges and Flaws.\nA revised Skill Web and new rules for training give your character more bang for the buck in learning and using skills.\nThe flip side of contacts—enemies! New rules let you create foes large and small to keep your characters on their toes.\nWhen you really need Karma, how do you collect? Optional Karma rules offer you new ways to get, keep and use Karma.\nWhy stick with shadowrunning? Play a DocWagon High-Threat Response Team, a street gang, a government covert-operations unit or even a shapeshifter!\n\nThe Shadowrun Companion: Beyond the Shadows is a unique rules expansion for players and gamemasters.\nFrom character creation to retirement, from epic campaigns to one-shot adventures, from streamlined skill rules to options for tailoring the way magic works to best suit your game, The Shadowrun Companion has it all. This book expands and clarifies rules for character creation, skill use and defaults, contacts, Karma, magic and cyberware, and includes new rules for playing metahuman variants and shapeshifters. A guide to creating adventures and campaigns offers step-by-step techniques to help gamemasters get the most out of the Shadowrun universe. The Shadowrun Companion: Beyond the Shadows is compatible with all Shadowrun sourcebooks.",
		edition: 2,
		gameDate: '2057',
		name: 'Shadowrun Companion: Beyond the Shadows',
		names: {
			'de-DE': 'Shadowrun Kompendium: Jenseits Der Schatten',
			'pl-PL': 'Shadowrun Kompan: Poza Cieniami'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'ISA Sp. Zoo'
		],
		releaseDate: [
			'1996-12',
			'1997',
			'1999'
		],
		sku: [
			'7905',
			'10731',
			'ISA00100303'
		],
		type: 'scan'
	},
	{
		category: 'rulebook',
		description: "Been There. Run That.\n\nFor Players:\nExpanded character creation rules allow you to customize your character's background with Edges and Flaws and play ghouls or shapeshifters. Also includes rules for running, jumping and even being an escape artist!\n\nFor Gamemasters:\nProvides expanded contact rules and introduces Enemies—the evil side of contacts. Plus campaign and scenario creation, prime runners, training rules and security rules for gas traps, trip wires and sensor plates!\n\nFor New Campaigns:\nPlay a street gang or a government covert ops team, a DocWagon high-threat response team or even the cops!",
		edition: 3,
		gameDate: '2060',
		name: 'Shadowrun Companion (Revised)',
		names: {
			'de-DE': 'Shadowrun Kompendium 3.01D',
			'es-ES': 'Guía de Shadowrun',
			'hu-HU': 'Árnyvadász kézikönyv'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Beholder Kiadó Bt.',
			'La Factoría de Ideas',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1999-03',
			'2001',
			'2003-09',
			'2004-06',
			'2005'
		],
		sku: [
			'10656',
			'25010'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: "NEVER GO IN UNARMED!\n\nWhen you go into a tight spot, you go in prepared. One gun might be good, but two is better. And two guns and a grenade launcher is better still. Throw in a spellslinger to watch your back, and you're on to something. Runner's Toolkit is the well-stocked arsenal all runners should have, the ultimate accessory to the Shadowrun, Twentieth Anniversary core rulebook. Inside you'll find:\n\n\t- A deluxe, four-panel gamemaster's screen that puts critical information directly in front of you;\n\t- On the Run , one of Shadowrun's most popular introductory adventures;\n\t- Contacts, Adventures and Sprawl Sites, a booklet that gives you the who, what, and where to launch runners on new missions;\n\t- 4 laminated maps of Sprawl Site locations;\n\t- The Pre-generated Auxiliary Character and Kit System, a modular system that makes character and NPC generation simple while keeping characters highly customizable;\n\t- Anatomy of a Shadowrun , a two-column book; one column tells the story of a high-stakes run, while the other details the players and those involved in the run-up encounter, giving gamers a look at how a Shadowrun game flows;\n\t- Six quick-reference sheets, with the gamemaster's screen, greatly reduces the time spent flipping through books to find a particular rule;\n\t- A Shadowrun logo sticker;\n\t- A poster of the Sixth World Seattle skyline, and\n\t- A book compiling tables from Arsenal, Street Magic, Augmentation and Unwired - it's the ultimate shopping list for runners!\n\nRunner's Toolkit is an adrenaline shot to the heart of your Shadowrun game, jolting your runners and keeping them moving up and down. NE SORTEZ PAS SANS LUI!",
		edition: 4,
		gameDate: '2072',
		name: "Runner's Toolkit",
		names: {
			'de-DE': 'Schattenrüstzeug',
			'fr-FR': 'Kit du runner'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2011-02-29',
			'2011',
			'2012-07'
		],
		sku: [
			'26100',
			'45100',
			'SR17'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'HANDWERKSZEUG FÜR DIE SCHATTEN\n\nSchattenwerkzeug ist ein Zusatzband für Shadowrun 4, der neue Kontakte, Abenteuerbeispiele und -orte beschreibt und vorstellt. Zudem enthält er das CGHS, ein modulares System zur simplen und schnellen Erstellung von Spieler- und Nichtspielercharakteren, sowie die „Anatomie eines Shadowruns“. Letzteres beschreibt einen typischen Shadowrun und bringt dem Spielleiter anhand dieses Runs gleichzeitig die Regeln, die Proben und die Systematik eines Abenteuers nahe.\n\nSchattenwerkzeug ist als Printprodukt Bestandteil der Schattenrüstzeug-Box.',
		edition: 4,
		gameDate: '2072',
		name: 'Schattenwerkzeug',
		notes: "A soft cover book containing some of the material from Runner's Toolkit German edition and a new adventure.",
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Verlag'],
		releaseDate: ['2011'],
		sku: ['45100G'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'misc',
		description: 'More spells. More weapons. More augmentations. More gear. This deck has more of the things you need to survive the shadows and make your living on the streets. Selected from the gera, spells and weapons in Runner’s Toolkit: Alphaware, these cards offer players more optins, with game stats for each item or spell. As in the Alphaware deck, gear items have color illustrations, and some common items are on multiple cards so that more than one player can have easy access to the game information.',
		edition: 4,
		gameDate: '2072',
		name: 'Alphaware 2.0: Weapons, Spells, Gear & Augmentations',
		notes: 'Set of cards available at Gen Con 2014.',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2011-08'],
		sku: ['26100A'],
		status: 'outofscope',
		type: 'print'
	},
	{
		category: 'sourcebook',
		description: 'The Tangled Web of Truth\n\nWar rages in Central America, tensions between dragons are on the rise, and the Watergate Rift has been closed in a display of power that shook the city of DeeCee to its core. To many, the world is becoming more disordered and unpredictable—but there are those who look underneath the surface chaos and see order, or even a plan. They see people and organizations who pull the strings and make the world shake, and they wonder if they can find out what these people are up to before it’s too late.\nConspiracy Theories is a deep dive into the underbelly of the Sixth World, a place filled with crackpot theories and insane ideas that would be laughable if it weren’t for the fact that some of them are most assuredly true. If they want to stay alive, shadowrunners need to know this information to keep them a step ahead of the forces that may be massing against them behind the scenes. If they want to do more than survive—if they want to prosper—they really need to know this data, because any runner worth a damn knows that manipulating people based on what they believe to be true is a great way to make a few nuyen.\nBringing together plot elements from War!, Spy Games, and the Dawn of the Artifacts series, Conspiracy Theories adds a twisted element to Shadowrun games. Conspiracy Theories is for use with Shadowrun, Twentieth Anniversary Edition.',
		edition: 4,
		gameDate: '2073-10',
		name: 'Conspiracy Theories',
		names: {
			'de-DE': 'Verschwörungstheorien'
		},
		notes: 'The German edition has an aditional chapter about the ADL.',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2011-11-20',
			'2012-05-11'
		],
		sku: [
			'26208',
			'470158'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Listen to the whispers—they’re all over town. People have secrets, millions of secrets, and some of them are so explosive they could shift the balance of power in the Treaty City of Denver. Normally, the great dragon Ghostwalker’s tight grip would keep the city under control, but some of the whispers moving around town say that Ghostwalker hasn’t been himself lately. The powers of Denver are scrambling, the Treaty is about to be renegotiated, and information is the hottest commodity in town.\nSpy Games brings Shadowrun players to the espionage-filled city of Denver, where secrets are bought and sold, and sometimes the price is paid in blood. Accessing these secrets may mean using cutting-edge surveillance gear or powerful magic, or it could mean turning back the clock and breaking out low-tech cloak-and-dagger approaches that the techheads of the world would never expect. Spy Games provides the setting information, gear statistics, and game rules players need to dive into Sixth World spycraft. ',
		edition: 4,
		gameDate: '2073-05',
		name: 'Spy Games',
		names: {
			'de-DE': 'Machtspiele: Handbuch für Spione'
		},
		notes: 'The German edition has an aditional chapter about the ADL.',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2011-05',
			'2012-02'
		],
		sku: [
			'26207',
			'47000'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'The Ends of the Earth And Beyond\n\nDark alleys, abandoned buildings, wet streets stabbed with neon light—shadowrunners know all these places. They also know that they aren’t the only places work gets done. A good shadowrunner should be open to anything, to runs that might take them anywhere. From the cold of Antarctica to the heat of the Sahara, from the life-filled dark of the deep oceans to the empty void of outer space, there is work to be had for runners brave and resourceful enough to take it. Of course, there are also dozens of new ways to die, so you should probably see if Mr. Johnson will chip in a little extra pay.',
		edition: 4,
		gameDate: '2074-04',
		name: 'Hazard Pay',
		names: {
			'de-DE': 'Gefahrenzuschlag - Todeszonen der 6. Welt'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2012-05',
			'2012-10'
		],
		sku: [
			'26210',
			'47025'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'CASTING A LONG SHADOW\n\nAt the end of a run, you’ve either got a good story to tell or you’re dead. Live long enough, and you’ll get enough stories to fill a book, and some of them will be killer. There is a certain class of people out on the streets that runners love to talk about, the people at the center of the stories swapped late at night over a round of wiper-fluid hooch. Some of them are good, some of them are lucky, and some of them are among the most powerful creatures of the Sixth World. All of them, in their own way, are legends.\nStreet Legends profiles more than thirty renowned figures in the Sixth World, including JackPoint stalwarts such as Haze, Rigger X, and Puck; classic runners like Serrin Shamander and Tommy Talon; and powerful behind-the-scenes figures including Lugh Surehand, Nadja Daviar, and the great dragon Lofwyr. Learn about hunting vampires with Martin de Vries, running guns in a war zone with Marcos, and trying to put a face to the elusive Hans Brackhaus.\nStreet Legends contains short fiction bringing these characters to life, as well as text describing each person and what makes them a legend. Also, each and every person profiled has complete game stats. Even the dragons.',
		edition: 4,
		gameDate: '2073-08',
		name: 'Street Legends',
		names: {
			'de-DE': 'Straßenlegenden'
		},
		notes: 'The German edition has aditional information about German characters.',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2011-08',
			'2012-02'
		],
		sku: [
			'26209',
			'47005'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: "The diplomats have failed. The tensions have only grown worse. Each side has pushed the other too far, so there's nothing left to do but fight. At the border of Aztlan and Amazonia, war has broken out. The streets of Bogotá are being pummeled, mercenaries are being hired and killed in approximately equal numbers, and blood is being spilled in dark rooms to give strength to mages on the battlefield. Most importantly, runners are being hired by the score.",
		edition: 4,
		gameDate: '2073',
		name: 'War!',
		names: {
			'de-DE': 'Fronteinsatz'
		},
		notes: 'The German edition has aditional content about the Bundeswehr and MET2000 and a translation of the "MilSpec Tech".',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: ['2010-12'],
		sku: [
			'26206',
			'46090'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Walk on the Wild Side\n\nIn the decaying urban wilds, war-torn cityscapes, and cancerous megabarrens of these "Feral Cities" are just one thing that is certain - they all have their dangerous domains, factions and secrets.\nSprawls where the usual rules and constants of civilized society do not apply, where the hazards and pay-offs are unique.\nRunners cast out of their comfort zones and dared to challenge the ravaged urban wilderness of Chicago and the darkest heart of Africa, Lagos.\nRuled by lawlessness and survival of the fittest; Bogota, GeMiTo, Geneva, Karavan, and Sarajevo are also profiled.',
		edition: 4,
		gameDate: '2071-10',
		name: 'Feral Cities',
		names: {
			'de-DE': 'Krisenzonen',
			'fr-FR': 'Jungles urbaines'
		},
		notes: 'The French edition has an aditional chapter about Clermont-Ferrand.',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele',
			'Black Book Editions'
		],
		releaseDate: [
			'2008-12',
			'2010',
			'2011'
		],
		sku: [
			'26202',
			'46055',
			'SR15'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Are You Ready to Sell Your Soul?\n\nCorporate Enclaves shines the spotlight on two very different bastions of corporate power in the Sixth World: Los Angeles and Neo-Tokyo. Controlled and exploited by the iron hand of the megacorps, these sprawls are home to corporate powerhouses, their political minions, powerful crime factions, and plenty of intrigue and opportunities for enterprising and resourceful shadowrunners. The second in an ongoing series of themed setting books for Shadowrun, Fourth Edition, Corporate Enclaves also briefly visits the unique corporate dominions of Dubai, Europort, Manhattan, Nairobi, and Tenochtitlán, and provides guidelines for developing your own corp-controlled settings.',
		edition: 4,
		gameDate: '2071-02',
		name: 'Corporate Enclaves',
		names: {
			'de-DE': 'Konzernenklaven',
			'fr-FR': 'Enclaves Corporatistes'
		},
		notes: 'Both the German and the French editions have an aditional chapters about Lille (French), Frankfurt (German) and Manhattan (both).',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele',
			'Black Book Editions'
		],
		releaseDate: [
			'2008-08',
			'2009-05',
			'2009-10-22',
			'2012-01-11'
		],
		sku: [
			'26201',
			'46025',
			'SR10'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'THE SIXTH WORLD IS YOURS\n\nWhat was the VITAS outbreak like for the people who were there? What was Renraku Arcology—and its operating software—like before it became a total nightmare? How does it feel to get off a plane and set foot in the ghoul kingdom of Asamondo? The Sixth World Almanac is the ultimate compendium of Sixth World energy, history, and geography. With the most detailed timeline in Shadowrun’s history and write-ups of nearly forty major nations, this book immerses players and gamemasters in the Sixth World deeper than they have ever been. The Almanac is full of Shadowrun firsts, including the first-ever full-color map of the entire Sixth World and new fiction covering historic eras that have never been detailed in past sourcebooks. Open the Almanac and fall into the Sixth World—let the art, the maps, and the writing bring you more completely into one of the most exciting, enduring role-playing settings of all time!',
		edition: 4,
		gameDate: '2072-11',
		name: 'Sixth World Almanac',
		names: {
			'de-DE': 'Almanach der Sechsten Welt'
		},
		notes: 'The English almanac was riddled with content and formal errors that were removed by Pegasus in consultation with CGL in the German version. These include duplicate or incorrect info boxes, flags in illustrations, which did not exist at the time of the depicted scene, and incorrect coastal and borderlines.',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: ['2010-06'],
		sku: ['26205'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: "Illegal is a strong word.\n\nIt means you're doing something that the government doesn't want you to do. You'd never do anything like that, right? Or would you?\nIt might be that some laws are... Misguided.\nIt's civil disobedience and a moral imperative to oppose those laws.\nGandhi taught us that.\nMy friends and I—we're here to help you make these difficult moral choices. We'll even provide you with a support network, if someone objects to your strong moral compass. And, hey, if everything works out, maybe all of us might come out ahead. Don't worry! We’ve got your back.",
		edition: 4,
		gameDate: '2072-02',
		name: 'Vice',
		names: {
			'de-DE': 'Unterwelten',
			'fr-FR': 'Vices'
		},
		notes: 'The German edition has a translation of 10 Gangs and aditional material regarding Germany.',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Black Book Editions',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2009-12',
			'2010-06'
		],
		sku: [
			'26203',
			'46060'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: "Claws At Your Throat\n\nNever, ever deal with a dragon. Shadowrunners have heard that dictum so often, they frequently say those words in their sleep. But what the aphorism forgets to tell you is this—what if you don’t have a choice?\nThe tension between dragons has been growing, and the big lizards are throwing every weapon they have at each other, including shadowrunners—especially shadowrunners. Extractions, industrial sabotage, theft, wetwork—there's plenty of jobs in all those areas, and dragons are finding ways to get reluctant runners to work for them. Maybe they’ll hide their involvement in the run, or maybe they’ll bribe the runners with large piles of nuyen or blackmail them with their past activities. Or maybe they’ll just tell the runners they have a simple choice of working for them or being eaten.\nWhatever tactics they choose, the dragons are going to be active and aggressive, and if runners want to survive, they better be on their toes. They need to know who the draconic players are, what they’re up to, and what might happen to them if they fall into a dragon’s grip. They need to be ready for anything, because when dragons go at each other, the world shakes, the earth beneath them burns—and far too often, shadowrunners die.",
		edition: 4,
		gameDate: '2074-07',
		name: 'The Clutch of Dragons',
		names: {
			'de-DE': 'Drachenbrut'
		},
		notes: 'The German edition has some aditions regarding German dragons.',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2012-08-08',
			'2013'
		],
		sku: [
			'26211',
			'47030'
		],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'The Crash of 2064 ruined the lives of millions. Some died in the Matrix or went insane, many lost everything they owned, and still others found their identities completely erased. A small percentage changed into something altogether different, with the strange and inexplicable ability to affect the new Matrix with their minds. Now, in 2070, the existence of these technomancers becomes frontpage news, leading to widespread paranoia and witch hunts. The Emergence campaign setting involves the runners in a series of pivotal events that may change the way they view the world and the Matrix—and each other.',
		edition: 4,
		gameDate: '2070-08',
		name: 'Emergence',
		names: {
			'de-DE': 'Emergenz: Digitales Erwachen',
			'fr-FR': 'Émergence'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele',
			'Black Book Editions'
		],
		releaseDate: [
			'2008-08',
			'2009-05'
		],
		sku: [
			'26301',
			'46015',
			'SR07'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: "Eat 'em Up, Spit 'em Out! They can have their offices, their paychecks, their 2.2 kids and their robot-trimmed lawns. Screw ‘em. They trudge through life, doing what other people tell them to do, never having an original thought, burying themselves so deep down inside they might never come out. You’re not them. The world’s not giving you anything, so you’re going to take what you can get. You’re on the streets, on your own. Maybe you’re helping an orxploitation band shoot to the top, maybe you’re climbing up the street brawl ladder, or maybe you’re getting famous just for being you. Whatever you do, you’ll do it your way, because dying always beats selling out. Attitude helps shadowrunners live the untethered life by giving them the lowdown on music, entertainment, sports, and other scenes where they can make their mark without selling their soul. A repository of Sixth World culture along with a treasury of new ways to run in the shadows, Attitude is an indispensable resource for all Shadowrun players.",
		edition: 4,
		gameDate: '2073-03',
		name: 'Attitude',
		names: {
			'de-DE': 'Lifestyle 2073'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2011-03',
			'2011-09'
		],
		sku: [
			'26241',
			'46080'
		],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Four artifacts have been found. Some of the most powerful people in the Sixth World have been after them, and many people have died in the globetrotting hunt to bring these objects together. Now that they have been recovered, their powers can be unleashed—or the artifacts can be scattered, lost again until another generation summons the courage and the knowledge to dredge them up.\nArtifacts Unbound concludes the Dawn of the Artifacts campaign in a way that makes gamemasters and players free to determine many events of their campaign. Filled with plot details, adventure seeds, basic setting information, and NPC statistics, Artifacts Unbound lets gamemasters select the elements that would work best in their campaign and design a thrilling story for their game. Easy to use and flexible, this book can be used with players who have gone through the entire Dawn of the Artifacts campaign, or with players just learning about the artifacts and their effect on the Sixth World.',
		edition: 4,
		gameDate: '2073-09',
		name: 'Artifacts Unbound',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2011-10'],
		sku: ['26450'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'A Bad Beat Rocks the Street\n\nThe shadows are abuzz about the new drug in the sprawl: tempo. It takes the user on a unique trip, better than anything experienced before. Druggies can’t get enough of the stuff, and even beetleheads are giving it a shot. Tempo’s popularity shifts the balance of power between the syndicates and soon the blood and bullets are flowing.\nGhost Cartels drops the runners into the action, involving them in the drug deals and power plays shaking up Seattle, Los Angeles, and Hong Kong—even taking them all the way to the jungles of South America.',
		edition: 4,
		gameDate: '2071-11',
		name: 'Ghost Cartels',
		names: {
			'de-DE': 'Geisterkartelle',
			'fr-FR': 'Cartels fantômes'
		},
		notes: 'Both the German and the French editions have additions based on Europe. The german version includes a CD with aditional material.',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele',
			'Black Book Editions'
		],
		releaseDate: [
			'2008-10',
			'2010',
			'2012-11-09'
		],
		sku: [
			'26302',
			'46040',
			'SR14'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Welcome Home\n\nIt’s a screwed up city. Isolated from the rest of the UCAS, it’s haven for criminals—smugglers, syndicates, gangers. Legal criminals, too—megacorporations, governments, politicians.\nAs beautiful as she is dysfunctional, Seattle is urban sprawl amid rolling hills and forests nestled up to man-made wonders next door to natural and man-made disasters. Whether you’re a native or not, Seattle will draw you in like no other.\nYou can run for a lifetime and never leave Seattle, but some say you can’t run for a lifetime without entering.',
		edition: 4,
		gameDate: '2072',
		name: 'Seattle 2072',
		names: {
			'fr-FR': 'Seattle 2072'
		},
		notes: 'The French edition also contains 2 of the Missions adventures.',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Black Book Editions'
		],
		releaseDate: [
			'2009-08-23',
			'2009-10',
			'2013'
		],
		sku: ['26240'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'It’s been a tense couple of years (or couple of decades, if we’re being accurate) in the Sixth World. Aztlan and Amazonia have been slugging it out. Great dragons have turned on each other, testing old alliances and forging new ones. Governor Kenneth Brackhaven of Seattle is facing pressure unlike ever he’s ever seen, and scandals seem on the verge of overwhelming him. In Denver, a powerful dragon and an angry elf are set to butt heads in ways that will shake up the whole city—and provide new opportunities for an old enemy. And on top of that, a new plague is spreading through the world, and the denizens of JackPoint aren’t immune to its effects.',
		edition: 5,
		gameDate: '2075-01',
		name: 'Storm Front',
		names: {
			'de-DE': 'Sturmfront'
		},
		notes: 'German translation of Storm Front, as an abridged pdf with SR5 rules. Includes additional texts for the German setting.',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2013-03',
			'2014'
		],
		sku: [
			'26213',
			'47000'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: "Digging in the dirt\n\nPolitics is only a dirty word when it's not working for you. For shadowrunners, politics aren’t about debates and position papers—they’re about taking some of the money people are throwing around.\nDuring election season, when power is up for grabs, people are willing to do just about anything to get a piece of the pie. If you can help them get what they want, they’ve got a job for you. It may be peeking in the windows of the rich and famous. Or finding dirt on the opposition (or making some up). Or, if things get really desperate, ensuring the other guy doesn’t win because he’s too busy taking a dirt nap.\nHow much money you take in and how dirty your fingers get is up to you and your desire to not see the stars above you when you sleep. You’ll probably have to make some compromises along the way, but since when has life in the Sixth World—or politics—been any different?",
		edition: 4,
		gameDate: '2074-11',
		name: 'Dirty Tricks',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2012-11-06'],
		sku: ['26212'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: "Chrome eyes. Computers called \"decks.\" Big hair, big cyberlimbs and bigger guns. It's Shadowrun in the year it all started. Take a step back to Shadowrun's roots with Shadowrun 2050, a book that combines Fourth Edition rules — the smoothest, most accessible rule set Shadowrun has ever had - with the setting that first made the Sixth World a legend.\nShadowrun 2050 has everything players and gamemasters need to dive into the grimy beauty that kicked off one of the greatest roleplaying settings of all time. With information on how to adapt Fourth Edition Matrix, gear, and magic rules for the 2050 setting, as well as in-universe information about the powers of the world, what shadowrunners will be up to, and who they'll be running into, Shadowrun 2050 puts a new twist on the classic setting.\nCaptain Chaos. Maria Mercurial. The Laughing Man. Sally Tsung. JetBlack. Hatchetman. Nightfire. And the Shadowland poster who just called himself The Big \"D.\" These people and many others are waiting for you in the year that started it all, a setting brought back to life with new, full-color artwork showing the chrome, dirt, neon, and darkness that was in the heart of Shadowrun when it started and remains at its core today.",
		edition: 4,
		gameDate: '2050',
		name: 'Shadowrun 2050',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2012-07'],
		sku: ['26230'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: "THE CENTERS OF POWER\n\nThere is nothing in the sixth world more powerful than the megacorporations . Even great dragons scratch and claw to the power wielded by the Big Ten . If you're running the shadows , you'll need to know about the megas, because they'll deal with the biggest payday-and, if you cross them, the harshest paybacks.\n\nCorporate Guide helps runners learn what the ten AAA-rated corporations are up to in 2072 and answers questions such as: How is Aztechnology dealing with Amazonia these days? How is Horizon's continuing prominence affecting its laid-back culture? How many times can Richard Villiers have one mega rise from the ashes of another?\n\nCorporate Guide offers details on all of the Big Ten megacorporations and briefings on some of the rising powers of the corp world. It therefore provides the basics every shadowrunner should know about how corporations work and what life is like the drones trapped inside them, along with the rules for greater interaction of player characters with monoliths of power.",
		edition: 4,
		gameDate: '2072-05',
		name: 'Corporate Guide',
		names: {
			'de-DE': 'Konzerndossier'
		},
		notes: 'The German edition has an aditional chapter about the ADL.',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2010-06',
			'2011-03'
		],
		sku: [
			'26221',
			'46075'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: "\"In this day and age, things change so nearly did the centrifugal force of progress will shear your head right off. Shadow Runners like us need to keep up with the latest Developments. When you run a B&E, you need to know what nasty new security It's the state of the art, chummer - it'll make you cred or get you dead. \"\n\nState of the art covers groundbreaking Developments in the year 2063 . It details the current state of genetics technology and corporate security, and describes advances in metamagic and mercenary operations. It also provides briefs on the latest trends in mainstream culture, sports and entertainment, with an eye on shadowing opportunities. These sections include a selection of new gear, vehicles, techniques and rules for both players and gamemasters.",
		edition: 3,
		gameDate: '2063-01',
		name: 'State of the Art: 2063',
		names: {
			'de-DE': 'State Of The Art 2063.01D'
		},
		notes: 'The German edition has an aditional chapter about the ADL.',
		originalLanguage: 'en-US',
		publisher: ['Fantasy Productions'],
		releaseDate: ['2003'],
		sku: [
			'10664',
			'25013',
			'10754'
		],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: "The Map Is Not The Territory\n\nThere's nothing worse than dropping into some backwater sprawl in the country next door to quietly take care of some job, then realizing too late that your sprawl studs and street lingo stick out like a troll's thumb. North America ain't what it used to be, chummer--every time you cross a border, you enter a different world. Ask an anglophone in Québec, an ork in San Fran, or a mage in the NAN. The rules are different, both in the shadows and in the sunlight, and if you don't keep up with the local game, you're gonna lose. Shadows of North America tells shadowrunners what they need to know about the 13 countries and city-states of North America, including the Native American Nations and the dragon-ruled city of Denver. Each state is covered in detail, from hot spots to power players, all from a shadowrunner's point of view. Designed for Shadowrun, Third Edition, but usable for any edition.",
		edition: 3,
		gameDate: '2062-08',
		name: 'Shadows of North America',
		names: {
			'de-DE': 'Nordamerika in den Schatten',
			'fr-FR': "L'Amérique des Ombres"
		},
		originalLanguage: 'en-US',
		publisher: [
			'Fantasy Productions',
			'Descartes Editeur',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'2002-07',
			'2003-05',
			'2004-08',
			'2005',
			'2006'
		],
		sku: [
			'10655',
			'25015',
			'2-7408-0231-5'
		],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: "Street Smart?\nNew to the sprawl kid? Wise up fast, cuz wiz wires or spell juice alone won't save your ass on the hungry streets. You flash your credstick in the wrong alley, drop a name in the wrong company, or flick out a spur at a gunfight and your organs will be next up for auction. Reps are built on etiquette and connections, not just chill attitude and piles of corpses. You need to know when to deal and when to wheel, or you're just another skidmark on the streets of the sprawl.",
		edition: 3,
		gameDate: '2063-04',
		name: 'Sprawl Survival Guide',
		names: {
			'de-DE': 'Sprawl Überlebenshandbuch'
		},
		originalLanguage: 'en-US',
		publisher: ['Fantasy Productions'],
		releaseDate: ['2004-02'],
		sku: [
			'10667',
			'10764'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: "Enter the dragons\n\"What's that you say? Never deal with a dragon? Chummer, if a wizworm involves you in its intrincate plots, you'll either deal or be the next meal.\"\nDragons of the Sixth World gets under the scales of the world's most dangerous and manipulative repitiles. It provides details on the life cycle, biology, magic and culture of dragons, and investigates their servants, allies and pawns. Dossiers are provided on ten of the world'sforemost great dragons, with shorter bios given on over a dozen others. The Draco Foundation, pursuing the schemes of its ounders, the dead dragon Dunkelzah, is also described.",
		edition: 3,
		gameDate: '2063-02',
		name: 'Dragons of The Sixth World',
		names: {
			'de-DE': 'Drachen der 6. Welt'
		},
		originalLanguage: 'en-US',
		publisher: ['Fantasy Productions'],
		releaseDate: ['2003-10'],
		sku: [
			'10666',
			'10761'
		],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: "Abandon All Hope, Ye Who Enter Here\n\n\"An old fixer once told me that shadowrunning is about going places you're not supposed to go. That's what gives us the buzz, right? The excitement of traveling to exotic and secret places, meeting intresting people, and extracting or killing them. Belive me, chummer, sometimes shadowrunning takes yuo to places you really don't want to go--and that you're lucky to get out alive.\"",
		edition: 3,
		gameDate: '2062-09',
		name: 'Target: Wastelands',
		names: {
			'de-DE': 'Niemandsland'
		},
		originalLanguage: 'en-US',
		publisher: ['Fantasy Productions'],
		releaseDate: [
			'2002-07',
			'2003'
		],
		sku: [
			'10653',
			'10758'
		],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: "THE SKY IS FALLING!\n\nThe year 2061 marks the return of Halley's Comet and the 50th anniversary of the Awakening-do you celebrate or run for cover? Each day brings a new surprise. Will you transform into a genetic changeling or fall prey to a doomsday cult? Will you be in Denver when the dragon runs amok or in Japan when the Ring of Fire deals death to the Empire? Will you fight toxic spirits in the Yucatán or run from the walking dead?",
		edition: 3,
		gameDate: '2061-01',
		name: 'Year of the Comet',
		names: {
			'de-DE': 'Das Jahr des Kometen',
			'fr-FR': "L'Année de la Comête"
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Descartes Editeur'
		],
		releaseDate: [
			'2000-09',
			'2001',
			'2002-02',
			'2003-06'
		],
		sku: [
			'7127',
			'10650',
			'10748',
			'S531'
		],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: "Nothing to see here... Move along\nEveryone's got a dark secret, chummer. See that chromed-out razorgirl with the shain of fetishes? She could be a cultist who uses blood rituals to restore her lost magic. See that suit slugging down whiskey in the corner? He could be the errand-boy of some supra-governamental conspiracy to overthrow the NANs. And that freak behind you? Drek, chummer, he's not even human...",
		edition: 3,
		gameDate: '2061-12',
		name: 'Threats 2',
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions'
		],
		releaseDate: [
			'2001',
			'2003-06'
		],
		sku: [
			'7128',
			'10652'
		],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: "If the mana storms don't get you... the bunyips will!\nYou think Bug City was bad? Chummer, you ain't seen nothin' like Australia's Outback. Mana storms sneaks up on you, dropping acid or fire or turning your transport into melted slag. You can run for cover, but the cave you hibe in may actually be some astral mirage that doesn't really exist. If you're lucky, Awakened dingos won't eat you and you'll crawl back to the sprawl... only to die of thirst when you don't have the cred to buy precious drinking water.",
		edition: 3,
		gameDate: '2062-06',
		name: 'Target: Awakened Lands',
		names: {
			'de-DE': 'Erwachte Länder',
			'fr-FR': "Terres d'Éveil"
		},
		originalLanguage: 'en-US',
		publisher: [
			'Fantasy Productions',
			'Descartes Editeur'
		],
		releaseDate: [
			'2001',
			'2002-04',
			'2002-06'
		],
		sku: ['10651'],
		type: 'scan'
	},
	{
		category: 'rulebook',
		description: 'More Data Than Your Rap Sheet\nYour shadowrunner has more safehouses than a slumlord, more false identities than a schizophrenic and a criminal record that takes up more memory than a Black Hammer utility. So where do you keep track of all that info? The Shadowrun Character Dossier provides 16 pages to record all of your character’s details, from skills to implants to spells. All of the archetypes are covered, from adepts to riggers to otaku, and space is included for edges and flaws, Karma expenditures, character background and more. The Dossier also features handy reference tables to make combat, skill use and healing run more smoothly. Store your runner’s info here and put Mr. Johnson’s files to shame!',
		edition: 3,
		gameDate: '2064',
		name: 'The Shadowrun Character Dossier',
		originalLanguage: 'en-US',
		publisher: ['Fantasy Productions'],
		releaseDate: ['2003-09'],
		sku: ['10673'],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: 'The End of the Matrix... as We Know It\n\nThe year is 2064, and all is not well. A struggling megacorp makes a drastic decision to stave off impending doom. A psychopathic artifical intelligence thought to be dead again, attempting to take over the entire matrix. And behind the scenes, apocalyptic terrorists prepare to strike at key points around the world, completing their first steps toward a vision of Armageddon. Across the globe, shadowrunners find out more about the Sixth World?\n\nSystem Failure details the events leading up to and following these dramatic, world - shaking events. In addition to in-depth treatments of the three main plotlines and adventure frameworks for each one of them, there are also numerous postshocks and spin-off events. For use with Shadowrun.\n\nSystem Failure is set in 2064, and exposes the events that lead to the technology changes that paved the way for Shadowrun, Fourth Edition.',
		edition: 3,
		gameDate: '2064-03',
		name: 'System Failure',
		names: {
			'de-DE': 'Systemausfall'
		},
		notes: 'The German edition has an aditional chapter about the ADL.',
		originalLanguage: 'en-US',
		publisher: [
			'Fantasy Productions',
			'WizKids Games'
		],
		releaseDate: ['2005-09'],
		sku: [
			'25014',
			'22008'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'This book collects material published online by the authors of the canceled book describing various locations in Latin America.',
		edition: 3,
		gameDate: '2064',
		name: 'Shadows of Latin America',
		originalLanguage: 'en-US',
		publisher: ['unofficial'],
		releaseDate: ['2011'],
		sku: ['25011'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'GO WILD!\n\nSome people like to talk about the peace and tranquility of nature. Their eyes glaze over, and they rave about cool breezes, fresh air, and flittering butterflies.\nThey’re not paying attention, and that makes them easy pickings for any of the predators, including me. The Sixth World’s a place of eating or being eaten. Sometimes the critters are waiting deep in the jungle; other times they’re hiding in your bedroom closet.\nProving you’re the fittest only ends when you aren’t anymore. Know your prey — it’s the only way to catch them. But remember, you just might be something’s prey too.\nRunning Wild is a sourcebook for Shadowrun, Fourth Edition. It presents a detailed overview of the animals, spirits, and other non-metahuman entities that dwell in the Sixth World: from mundane animals that have survived the incursions of mankind, to paranormals that have Awakened, to emergent animals that have found their own ways to embrace the Matrix, to the spirits and feral AIs that may not even acknowledge metahumanity. Game rules and mechanics are provided for these beings and their unusual abilities, but so are rules for characters to interact with, to augment, and to train the critters presented. Every living being is constantly in search of its ecological niche, Running Wild can make a campaign home to hundreds of them.',
		edition: 4,
		gameDate: '2072-07',
		name: 'Running Wild',
		names: {
			'de-DE': 'Wildwechsel - Das Critterdossier',
			'fr-FR': 'Créatures du Sixième Monde'
		},
		notes: 'The French version has a translation of "Parazoology" and the German version has aditional animals from the ADL.',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele',
			'Black Book Editions'
		],
		releaseDate: [
			'2009-07-18',
			'2010-03',
			'2012'
		],
		sku: [
			'26101',
			'46050',
			'SR16'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: "Across the Globe, Biz is Biz!\n\nThis first core setting introduces the players to two of the world's premier shadowrunner sprawls: Seattle and Hong Kong . Each city is described in detail for a shadowrunner's point-of-view, covering key topics such as the balance of power, corporate and underworld affairs, places to see, strange magics, and key features of interest. A wealth of plot hooks are also included. Four other runner-favored cities - Cape Town , Caracas , Hamburg , and Istanbul - are also covered in lesser detail, and gamemaster advice is provided for any specific urban locale into a shadow hotspot.",
		edition: 4,
		gameDate: '2070-02',
		name: 'Runner Havens',
		names: {
			'de-DE': 'Schattenstädte',
			'fr-FR': 'Capitales des ombres'
		},
		notes: 'The German edition added a chapter about Hamburg and the French edition a chapter about Marseille. The revised German edition has both chapters.',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Fantasy Productions',
			'Pegasus Spiele',
			'Black Book Editions'
		],
		releaseDate: [
			'2006-08-29',
			'2006-07-19',
			'2010-01-11'
		],
		sku: [
			'26005',
			'23004',
			'46045',
			'SR05'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: "Asia. The East. A land of contrasts, from glittering megacorp skyscrapers to humble sacred temples. Japan, Malaysia and Hong Kong set the world's accelerated pace of progress, but next door in Indochina and Indonesia it's still last century. It's a mystery to most, but if you know your drek, you’ll find it's a land of opportunity. Anything you want is here. Cred. Gear. Flesh. Hell, I even heard of a guy finding enlightenment. There’s always a price, of course, whether it's selling your soul to the corps or your sister to the slave trade.",
		edition: 3,
		gameDate: '2064-04',
		name: 'Shadows of Asia',
		originalLanguage: 'en-US',
		publisher: [
			'Fantasy Productions',
			'Catalyst Game Labs'
		],
		releaseDate: ['2005-05'],
		sku: [
			'10670',
			'25007'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: "\"I've got a job for you.\"\n\n\"Call me Mr. Johnson. I'm like a fixer for the corps. I know everybody who's anybody from suit-and-tie boardroom predators to bottom-feeder street-level scavengers. I know the best sprawl sites for scoring new talent, exchanging goods without interruption or hiding out from the hit men on your tail. I like to ensure that the people I hire can execute a well-planned black ops job and keep their faces from being splashed all over the screamsheets. My files on you say that you're right for what I have in mind. Interested?\"",
		edition: 3,
		gameDate: '2064',
		name: "Mr. Johnson's Little Black Book",
		names: {
			'de-DE': 'Auftraggeber-Handbuch'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Fantasy Productions',
			'Catalyst Game Labs'
		],
		releaseDate: ['2004-08'],
		sku: [
			'10672',
			'25003',
			'22002'
		],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: "A new world in the shell of the old.\n\"Clashes of cultures. That's what Europe is, term. One day you're fighting Moroccan pirates on the docks of Lisbon, and the next you're hobnobbing with the academic elite of Prague. It's a friggin' maze of people and places, all acting like a big dysfunctional family. The Euro shadows are treacherous to navigate, but believe me, chum, the oportunities are umbelievable.\"",
		edition: 3,
		gameDate: '2063',
		name: 'Shadows Of Europe',
		names: {
			'de-DE': 'Europa in den Schatten',
			'fr-FR': "L'Europe des ombres"
		},
		originalLanguage: 'en-US',
		publisher: [
			'Fantasy Productions',
			'Black Book Editions'
		],
		releaseDate: [
			'2003-06',
			'2007'
		],
		sku: [
			'10668',
			'25002',
			'22001',
			'SR04'
		],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: "Who's Got Your Back?\n\nCorps don't give a drek about the runners they hire that's why they call us expendable assets. Forget working for the Mob or the Yakuza, too once you're in, you're part of their family for the rest of your life. Lucky for us, there are swarms of other groups looking to claim their piece of sprawl and who are willing to bypass the law to do it. Policlubs, magical orders, religious factions, black marketers these are just a few of the species struggling for survival in the shadow ecology. Hooking up with such an organization has its advantages resources, steady employment, backup but pick the wrong outfit to run with and you'll regret it when they kick you to curb. So what's it going to be, chummer? You can't roll solo forever.",
		edition: 3,
		gameDate: '2064-02',
		name: 'Loose Alliances',
		names: {
			'de-DE': 'Feind meines Feindes'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Fantasy Productions',
			'Catalyst Game Labs'
		],
		releaseDate: ['2005-04'],
		sku: [
			'10669',
			'25006',
			'2003'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: "The Shadows Never Stop\n\nNew toys hit the street every week, omae. Wiz new tech to exploit security holes, rapid-assembly weapons disguised as Nerps to sneak past the scanners, wicked new adept fu to kick some major hoop. To keep up with the Johnsons, ya gotta scan what's coming down the pipe, otherwise you'll end up as the unfortunate example in a field-test report.",
		edition: 3,
		gameDate: '2063-12',
		name: 'State of The Art: 2064',
		names: {
			'de-DE': 'State Of The Art 2064.01D'
		},
		originalLanguage: 'en-US',
		publisher: ['Fantasy Productions'],
		releaseDate: ['2004-10'],
		sku: [
			'10671',
			'25004',
			'22006'
		],
		type: 'scan'
	},
	{
		category: 'mission',
		description: 'When you’re working the Denver shadows, it’s not just a matter of keeping the names and the faces straight. You need to remember which faction each person is working for. Parliament of Thieves introduces the runners to Denver, and exposes them to a number of the different factions of the city’s underworld.\nThe adventure focuses on a short run from one sector (Pueblo) of Denver to another (UCAS). The characters are sneaking a hardcopy treaty letter from the Koshari to the sottocapo of the Chavez Mafia family. It already bears the signature of the Koshari council, and simply requires the sottocapo’s signature. The characters don’t have to worry about returning it. They were hired because both sides wanted the transport handled by a “neutral third party.” Other elements of the Denver underground will encounter the team, because they want to know the terms of the treaty.',
		edition: 4,
		gameDate: '2070',
		name: 'Parliament of Thieves',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2006'],
		sku: ['SRM02-01'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'The runners are hired by Jaron Falcone, a retired fixer, to bring back Jonathan Belenkiy. They are working against the clock, as the ransom for Belenkiy is due in less than twenty four hours. Through investigation of his room, the runners find clues that lead them to the Black Cats. Legwork also turns up that Belenkiy hasn’t been entirely clean with all of his dealings.\nAs the night goes on, the runners can meet with Sioux warriors and Mafia soldiers, on Belenkiy’s trail. HammerJack will get nervous and approach them himself to try and have them turn against Falcone. If they are lucky, the runners will complete their mission without getting trapped in Ares’ internal politics or being placed on the hit list of the Casquilho family.',
		edition: 4,
		gameDate: '2070',
		name: 'Best Served Cold',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2006'],
		sku: ['SRM02-02'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: "Griffin Biotechnology has been a revolving door for shadowrunners. Runners from all over the sprawl have had at least one opportunity to scout the place or sneak a peek at what's going on inside. Word is that \"the big one\" has hit the streets - big nuyen to steal one of Griffin's hottest prototypes. Will Knight Errant be able to keep out this latest attack against the Everett based firm?",
		edition: 3,
		gameDate: '2064',
		name: 'Duplicity',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2005'],
		sku: ['SRM01-08'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'In the corporate world, fights are not only in boardrooms, but in the streets. What if the future of an entire company were held in the hands of a team of shadowrunners?',
		edition: 3,
		gameDate: '2064',
		name: 'For Whom the Bell Tolls',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2005'],
		sku: ['SRM01-09'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'The runners are hired to bring in a known smuggler who has gone to ground after ditching his goods half a klick from the border. Don Casquilho comes across as a nice old man with more grandchildren than hair left on his head and the Don says he just wants to talk.\nMeanwhile the Vory V Zakone are moving heavily into the smuggling business and ensuring that anyone who talks with the Mafia is pushing daisies by the end of the week. The runners will be introduced to Vory thugs, Avtoritey lieutenants, and have to decide which syndicate they are falling in line with. ',
		edition: 4,
		gameDate: '2070',
		name: 'The Flip Side',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2006'],
		sku: ['SRM02-06'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Doc Tico hires the runners to go in and bring back a quantity of the drug that he hopes will bring him more paying customers. He tells them where they can best get the drug in quantity, at the DocWagon PCC facility. Once the runners are in far enough that they can’t back out, the hospital becomes awash with injuries brought in from a prison break attempt at the maximumsecurity detention center that’s roughly a mile away. How much harder the run just got depends on what technique they chose to infiltrate.\nWhen they return to Doc Tico with the drugs they have a strong chance of learning that the doctor has been supplying parts to the Tamanous, though only what would otherwise be considered “medical waste“ and nothing from anyone unwilling. They are then faced with an ethical dilemma: turn the doctor in and put the clinic out of business, or keep hush and let the downtrodden continue to get their low-cost yet decentquality medical care.',
		edition: 4,
		gameDate: '2070',
		name: 'An Ounce Of Prevention',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2006'],
		sku: ['SRM02-07'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Tina, a technomancer, and an independent sprite named Taske, are on a crime spree of attacking corporations that are developing newer security for commlinks and the Matrix. Their weapon is an army of BTL addicts, conditioned to launch agents via an interactive AR program. In their first crime, they pin it on Mafia lieutenant, Dean. The Runners are hired by Don Casquilho, to investigate the crime and bring a little ‘family justice’ to the criminals.\nAfter figuring out how the crimes are committed, the ‘runners then have to deal with Tina and Taske and provide evidence to Don Casquilho of the completed job.',
		edition: 4,
		gameDate: '2070',
		name: 'Through A Rose Colored Display Link',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2006'],
		sku: ['SRM02-05'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'The runners are contacted via commlink by an Asian Ms. Johnson. She informs them that she wishes to hire them to perform a simple extraction. When negotiations are complete, Ms. Johnson produces a photograph of a young girl, approximately age eleven, and a name: Catherine Westmore.\nThis little girl is the target.\nThe assignment is simple: Do some basic legwork to locate the target, determine the best circumstances in which to stage the extraction, retrieve the girl, and deliver her safely (and most importantly, unharmed) to a second team who will be awaiting her arrival at a safe house in the Aurora Warrens. Once the girl is safely delivered into the second team’s care, the remainder of the runners’ fees will be transferred into their accounts.\nThe runners will have to contend in some way with Jack “Frost” McPherson (a highly trained ex-marine who now works as Catherine’s personal bodyguard) and his friends who comprise the whole of local runner team The Trinity.\nOnce the runners have the target in hand, they will find themselves ambushed en route to the Aurora Warrens safehouse by The Trinity, attempting to get the girl back and help save their former comrade-inarms’ reputation and his career.\nWith the final obstacle neutralized, the runners can deliver the girl safely to the Aurora Warrens safehouse, after which they can go on about their business content that their rent is once again paid, and they don’t have to worry about missing any meals. The following morning they will get a rude awakening when they turn on their trids to discover that an innocent little girl by the name of Catherine Westmore died in a ransom drop gone wrong, when Lone Star officials failed to notice the sniper lurking on a nearby rooftop…\nMore humane runners may stop to consider, perhaps for the first time (perhaps not), just how strong an impact their lives can have--for better, or worse. Less humane runners may take a more cynical stance, facing the harsh truth that if they hadn’t done the job someone else would have, and they would instead be the ones falling behind on their bills.\nBut none of that will change the fact that their utilities won’t be cut off this month, their stomachs won’t growl, and a child is dead in the street; and there isn’t one damn thing they can do about it…\nYet.',
		edition: 4,
		gameDate: '2070',
		name: 'The Grab',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2006'],
		sku: ['SRM02-03'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Mr. Johnson hires the runners to disrupt operations of a facility run by Rocky Mountain Dynamics (RMD), to “encourage” them to sell the property to his company. The runners are left to their own devices to determine how to harass RMD. As the tempo of their activities increase, the plant manager’s connection to the Mafia may complicate the job for the runners. Although the runners are not told how many acts of harassment should occur, their actions will trigger the sale of the facility after two or three successful operations. Unfortunately, although RMD does sell the embattled facility, it is not to the buyer expected.',
		edition: 4,
		gameDate: '2070',
		name: 'Thrash the Body Electric',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2006'],
		sku: ['SRM02-04'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Mr. Johnson has some serious personal problems with a certain corporate executive. He would like for you to help in reducing these problems – permanently…',
		edition: 3,
		gameDate: '2064',
		name: 'Double Cross',
		originalLanguage: 'en-US',
		publisher: ['Fantasy Productions'],
		releaseDate: ['2004'],
		sku: ['SRM01-01'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'You’re hired to extract some VIPs from a secure facility and then destroy any evidence or witnesses that you were there. Of course, there are strings attached: the VIPs are not very cooperative and must be unharmed. You always did enjoy a challenge!',
		edition: 3,
		gameDate: '2064',
		name: 'Strings Attached',
		originalLanguage: 'en-US',
		publisher: ['Fantasy Productions'],
		releaseDate: ['2004'],
		sku: ['SRM01-02'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'It was a dark and stormy night - traveling near Glow City in the Redmond Barrens during a hail storm is not your idea of a good time, especially when things go bump in the night!',
		edition: 3,
		gameDate: '2061',
		name: 'A Dark and Stormy Night',
		originalLanguage: 'en-US',
		publisher: ['Fantasy Productions'],
		releaseDate: ['2004'],
		sku: ['SRM00-05'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'The ancient ninjas were more than assassins, they were also experts in spying and inteligence gathering. A new research facility has just ben built, and someone wants to get as much paydata on their operations in case future incursions are necessary. Become the modern ninja and name your pay!',
		edition: 3,
		gameDate: '2061',
		name: 'FORCEd RECON',
		originalLanguage: 'en-US',
		publisher: ['Fantasy Productions'],
		releaseDate: ['2004'],
		sku: ['SRM00-03'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'A runner’s gotta do what a runner has to do. Or does s/he? For once, you get a choice of two different runs. Time limits your choice to one or the other, but not both. But remember chummer that looks can be deceiving, and that all that glitters is not gold--like the hyper velocity gel round of an angry Lone Star Cop, just as an example…',
		edition: 3,
		gameDate: '2061',
		name: "A Fork in Fate's Path",
		originalLanguage: 'en-US',
		publisher: ['Fantasy Productions'],
		releaseDate: ['2004'],
		sku: ['SRM00-04'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: "It's a simple job. Something was stolen and someone wants it back. How complicated could it be?",
		edition: 3,
		gameDate: '2064',
		name: 'Lost and Found',
		originalLanguage: 'en-US',
		publisher: ['Fantasy Productions'],
		releaseDate: ['2005'],
		sku: ['SRM01-06'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'What happens when a corporation grows too fast? Sooner or later, someone is going to make a mistake, someone will have to pay the cost, and someone will have to clean up the mess. Who is really holding the keys to the asylum?',
		edition: 3,
		gameDate: '2064',
		name: 'Keys to the Asylum',
		originalLanguage: 'en-US',
		publisher: ['Fantasy Productions'],
		releaseDate: ['2005'],
		sku: ['SRM01-07'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Will you do anything for money? How about escort a group of wealthy clients for a day? Is it just a walk in the park, or something more?',
		edition: 3,
		gameDate: '2064',
		name: 'A Walk in the Park',
		originalLanguage: 'en-US',
		publisher: ['Fantasy Productions'],
		releaseDate: ['2005'],
		sku: ['SRM01-05'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'The members of an urban tribe are brutally murdered and left for dead. Who could do such a thing? Vampires, ghouls, gangs, or just some crazed lunatic? Nope, a greedy corporation that needs fresh organs! Help recover the evidence before it is destroyed and stop them!',
		edition: 3,
		gameDate: '2064',
		name: 'Harvest Time',
		originalLanguage: 'en-US',
		publisher: ['Fantasy Productions'],
		releaseDate: ['2004'],
		sku: ['SRM01-03'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'An opportunity for a payday! Your fixer lets you know that a client is looking for a datasteal in a previously scouted location. Get in, get the paydata, and get out, all without leaving a trace or a trail of destruction. Know when to hold ‘em and know when to fold ‘em.',
		edition: 3,
		gameDate: '2064',
		name: 'The Gambler',
		originalLanguage: 'en-US',
		publisher: ['Fantasy Productions'],
		releaseDate: ['2004'],
		sku: ['SRM01-04'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Harold Benson hires the runners to prevent one of his researchers, Marvin Fitz, from being extracted. Benson knows the extraction is voluntary, but does not disclose this information. He explains that Marvin has a non-working prototype with him that must be kept out of the competition’s hands at all costs.\nBenson suggests that the PCs start at Fitz’s apartment, where they may learn that his extraction was voluntary. From there, they catch up to Marvin in the plaza of the Happy Canyon shopping mall in Chinatown.\nAfter a quick negotiation, the real extraction team, a professional squad working for the Vory, ambushes them. The Vory team knows Fitz has implanted his research project into his own head, and that it works, but they don’t know what it does. The opposing team also knows that the extraction is a scam: Fitz is actually being captured to be sold to the highest bidder.\nFrom there, it’s a matter of safely securing Fitz and deciding what to do with him.',
		edition: 4,
		gameDate: '2070',
		name: 'Career Path',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2007'],
		sku: ['SRM02-20'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'This adventure focuses on gathering information about some non-sanctioned biz in Triad territory. The Golden Triangle has received word that a Johnson has been hiring runners for several months now to smuggle goods through Chinatown. They know that he works out of a local bar/nightclub called Happenstance. Despite the fact that Happenstance is controlled by the Casquilhos, Triad forces attempt to crash Mr. Johnson’s party. The runners are among the witnesses. During the melee, runners see Mr. Johnson and his team. Having seen their faces, the Golden Triangle hires the runners to find out all they can about Mr. Johnson, the meet, and the biz.\nDespite being a simple package delivery, the runners find they are not alone. The Casquilhos, the Koshari, and the Vory are interested in the delivery. Along the way, the package stops at a warehouse, crosses the CAS/UCAS border, and ends in the Aurora Mall. The runners find that the package is destined for Tamanous organleggers. Can they get out with their skins intact?',
		edition: 4,
		gameDate: '2070',
		name: 'Happenstance',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2007'],
		sku: ['SRM02-21'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'The Kirillov Vory have made inroads into the Warrens, rolling street gangs where possible and destroying others. With their growing influence, the Golden Triangle has lost a number of brothels and enforcers. Mikael Petrov has formulated a plan to drive a wedge between the Triad syndicates by specifically targeting the Golden Triangle and not harming the White Lotus.\nIn addition to the wedge Petrov wants to drive between the Triads, he is cleaning up a few loose ends of his own. He is trying to deal with the now defunct Fomin Vory, Tamanous (ghoul organleggers), and the Fronts – a local gang who has become a recurring thorn in his side (see SRM02-10 Twist and Insult). ',
		edition: 4,
		gameDate: '2070',
		name: 'By Any Means Necessary',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2007'],
		sku: ['SRM02-19'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: "The team is sent to the Yakuza casino on the advice of a trusted fixer. When they arrive, the AR system goes down, and the Yakuza hire the team (with a level of courtesy based on the teaM's relationship with the Yakuza) to find out who had done it and bring them to justice – permanently. The team starts to track the phenomenon, and finds a similar occurrence at a local mental health facility. Investigating, they find that a patient named \"Mary\" was admitted with extreme schizophrenic psychosis, but suddenly recovered and checked herself out. The team tracks her to the University Psychology Department's library, where she is working. She avoids questions like a pro, but tries to slip the team a clue when the AR system goes down and Knight Errant is called.\nThe team escapes and is contacted by the Yakuza, who now have security tapes available. The team discovers that Mary was on the scene at the casino. When they track her down, they find that she has holed up in an automated factory that builds drones, vehicles, and display links, among other things. They find that Mary is the unwilling host of Taske, a free sprite from SRM02-05 Through a Rose Colored Display Link. The team has a nasty fight with the factory's equipment, and (hopefully) brings the culprit to justice.",
		edition: 4,
		gameDate: '2070',
		name: 'Patient Zero',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2007'],
		sku: ['SRM02-17'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: "It's a bad day. The Frog Sorcerer (from ancient Pueblo legends) has come into power and has used it to cause a large mana storm. During the height of the storm, the Frog Sorcerer creates an astral rift and a Displacement Alchera (SM p.115) manifests, but he's not powerful enough to \"jump ship\" and become a free spirit, escaping the planes.\nMeanwhile, the runners find the worst luck following them just trying to get to a job downtown in this weather. When they finally get to the meet, they find Mr. Johnson dead, and no nuyen on him to compensate for the trip to the Hub.\nJust then, another opportunity shows up at the bar where they were to meet the late Mr. Johnson. Aaron Drey has been watching the storm anticipating something. When the Alchera opens, he recognizes the landscape. He believes that, through the alchera, the runners can locate the spirit Yuichotol for him. When the Runners get into the mountains of the Alchera, they unknowingly move through the rift into the metaplane of the ancient Pueblo.\nThe runners get off on the wrong foot as bad luck still lingers around them, but can obtain guidance in their search for Yuichotol. After battling mythical creatures and the Frog Sorcerer himself, the runners search comes up empty as Yuichotol has moved from this metaplane. However, the runners may recover a vessel for Yuichotol.\nAs the runners leave, they find that they’ve exited the metaplane at a different part of the alchera, and wind up in the office building across the street. They have to get out of that building, run back across the street, and present the skull to Aaron, who attempts to \"Reverse Engineer\" the spirit formula from the Construct in a creative Chaos style of magic.",
		edition: 4,
		gameDate: '2070',
		name: 'A Very Bad Day',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2007'],
		sku: ['SRM02-18'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'An item known as The Dragon Stone has been in circulation in the Denver shadows for a bit. While it started out in Yakuza control, the events of SRM02-08 Chasing the Dragon put it in the hands of a Triad lieutenant. During SRM02-24 Hubris and Humility, she lost the item. Now, there’s a mad scramble in Denver’s Underworld to recover the item. The team unwittingly finds that they have the rare artifact. The question that is raised is – to whom will they give it?\nThe various factions of Denver all want a piece of the action. However, Ghostwalker is interested as well. The team must decide the level of risk that they’re willing to undertake to achieve their reward.',
		edition: 4,
		gameDate: '2070',
		name: 'Done Deal',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2007'],
		sku: ['SRM02-25'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Over the last two years, the Vory have made deep inroads into several areas of Denver. They still do not have direct control over any province but have an increasing power base with only a few stumbling blocks in their way. The road to power has had its own set of hardships and now alliances must be reforged or broken. Irina Klavikov has worked her way into Mikael Petrov’s bed and presented a gift that may be enough to buy his loyalty away from the ties of blood and the Kirillov Vory.\nIn SRM 02-13, Irina and Mikael gathered blackmail material on Lin Yao after her attempt to hire shadowrunners to kill An Peng and kidnap another Triad member. Unfortunately, their control over Lin is incomplete. Lin has agreed to complete the task they have approached her on, but plans on having a backdoor. Meanwhile, the Triad has learned about Lin Yao’s indiscretions and takes their own action.',
		edition: 4,
		gameDate: '2070',
		name: 'Hubris and Humility',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2007'],
		sku: ['SRM02-24'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'The Chavez family has recently had some setbacks due to Koshari interference with their business operations, in spite of the Lakeside treaty. Deciding that enough was enough, they chose to make an object lesson of a known Koshari Johnson and took his bodyguard captive for leverage to attempt to turn a known corporate fixer to their own services.\nMatt Greyfox, the bodyguard, is a former lover and still close friend of Tabby’s. She is irate that Omar Chavez is attempting to use her friend to blackmail her, but she is also in a bind as the bodyguard is the son of one of Tabby’s corporate contacts. Unhappy about his son’s choice to become a bodyguard in the shadows, but believing that each person must choose their own path, the suit was unwilling to force the issue. Instead, he asked Tabby to strike up an acquaintance with his son and keep an eye on him. She honored that request but it became something more. Tabby now finds herself concerned about how the father may react if he learns about the affair and how his son has become a bargaining chip. She wants the situation resolved quickly. Once she heard about the runners’ plight and discovered where Matt was being held, she contacted the team. She believes they are the perfect people to teach Omar Chavez a lesson that he should take to heart, while maintaining her corporate connections.',
		edition: 4,
		gameDate: '2070',
		name: 'Backlash',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2007'],
		sku: ['SRM02-22'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'As any made-man can tell you, switching sides once you’re in is just asking for a double-tap in the back of the head. But, what if the defector is simply too valuable to the organization? They may know too much or hold a strategic position. The reasons don’t really matter. In the end, they can’t be released nor can they simply be killed. What then?\nThis is the position between the Koshari and Nathaniel Howlingcoyote, aka Alesandro Ibáñez. (see SRM02-14 Wetwork Pure and Simple for more of Nathaniel’s back story.)\nA few weeks ago, through various sources, the Koshari discovered Alesandro’s duplicity. While remaining on the surface at least, a loyal Koshari, he was secretly smuggling certain rare and esoteric materials into Denver through a company called XCR and, in turn, to the Vory. The Vory were moving the materials to a secret Tamanous hideout located underneath the Aurora Mall. They’d made a deal to supply the organleggers with chemicals and apparatus along with ‘raw materials’ for their operation. These chemicals were being used for fetus farming (see SRM02-21 Happenstance and SRM02-15 Critical Care).\nNormally, a Koshari underling found to be working with another crime organization would be loudly and publicly murdered along with any and all accomplices and left as a warning that such behavior would not be tolerated. But Alesandro was a special case. He was the majority shareholder of XCR and its current CEO. Killing him would deprive the Koshari of millions of nuyen, not to mention the inroads with Evo, and the company’s potential utility to the Koshari’s own smuggling operations. Since killing him was out of the question, the only answer left was to bring him back into the fold.\nThe easiest way to do this is to ensure that the Vory have reason for wanting him dead. Then Alesandro will have no choice but to return to the Koshari in the hopes that they will protect him. Since the Vory do not accept excuses nor do they forgive failure, this shouldn’t be too difficult. All it should take is a series of late, lost, or simply stolen deliveries.',
		edition: 4,
		gameDate: '2070',
		name: 'Prodigal Son',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2007'],
		sku: ['SRM02-23'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'With the exodus from Mother Russia, the Avtoritey and Vory have been bringing their families to North America and settling into their old ways. Six months ago, several of these families made their way to Denver. After dividing the city along the national boundaries, each Vor and Avtoritet began to slowly expand through their own means.\nMaria Kirillova, the only daughter of Nikolai Kirillov, began seeing Tony a few months ago.  After realizing that Tony was second in command, she did what any good Vory wife would have done and killed the leader of the gang.  Unfortunately, Tony was distraught over Jonny’s death and so Maria never told him. Now Tony wants to runaway from the gang and Denver, so that he and Maria can get married and live together.\nMeanwhile, Nikolai Kirillov has learnt of the death of the leader of the Three Kings and wants to make his move to absorb the gang before they join someone else. The runners have just completed a run for him so they are immediately at hand when he decides to move.',
		edition: 4,
		gameDate: '2070',
		name: 'Twist and Insult',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2006'],
		sku: ['SRM02-10'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'The runners are hired by Tabby to raid a Yakuza parlor. The 3-story building is situated in the UCAS sector. It’s an old but well maintained beige brick building in a quiet part of town. The Yakuza discreetly run an illegal brothel and casino from there.\nThe first floor serves as a posh welcoming lobby and lounge. Prostitutes and geishas not serving anyone lounge around and are on display for incoming clients. A kitchen also prepares small meals and snacks for customers, whether gamblers or those enjoying the services of the prostitutes. The back rooms serve as security HQ for the operation. Yakuza soldiers monitor camera feeds and other security measures, as well as standing-by in case of trouble.\nThe 2 stories above ground are simply hotel-like rooms where customers enjoy the services of the prostitutes. There are about a half a dozen rooms per floor, so a dozen in total. Yakuza security is discreet here. Nothing much of interest for the runners.\nThe building also has a basement, where the casino is. The usual attractions can be found, ranging from cards to roulette to mah jong. The setting continues to be posh, but security here is more obvious and well armed, reminding customers that cheating is a very bad idea, as well as protecting valuables. There are also a number of customers, employees and waitresses.\nThe runners’ target is a small room connected to this casino. It is protected by additional security measures, and it holds important offline data. The runner team will have to access this server to obtain the paydata they are after. The mainframe will be hackable, especially for a team with a competent hacker or technomancer. An alternate method would be to force a captured Yakuza technician to give them access codes.',
		edition: 4,
		gameDate: '2070',
		name: 'Rising Sin',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2006'],
		sku: ['SRM02-11'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: "The runners are hired by a Ms. Johnson—Junko “Lady Jade” Tetsuya or Donna Westmore, depending—to locate and bring to justice the murderer of 11-year-old Catherine Westmore, whose fate was sealed by the events of SRM02-03: The Grab. Finding Catherine’s killer requires all of the team’s ingenuity and resolve. Eventually, they find Takeshi Modori, former lover of Lady Jade and prime suspect in Catherine’s murder investigations hiding at Mystic Curiosities, a Talismonger's shop in CAS.  Takeshi tells them that he witnessed Catherine gunned down by her own father.\nTheir investigation resumes on the trail of Kazuya “The Dragon” Hotomi: an ex-Yakuza assassin. Kazuya has cut a deal with Lin Yao, a White Lotus Triad lieutenant for protection. To bring Kazuya to justice, the runners will have to deal with Lin Yao or infiltrate Klub Karma: a Triad controlled club in the heart of Chinatown. By doing so, they risk earning the enmity of the powerful organization.\nOnce Catherine’s killer is in their hands, they are to take him to an abandoned flophouse in the Aurora Warrens—the very spot where Catherine’s life ended. There, Ms. Johnson exacts her revenge either by using the runners to brutally torture Kazuya or, if the runners were involved in Catherine’s death, by betraying them and attempting to bring their lives to a fitting end.",
		edition: 4,
		gameDate: '2070',
		name: 'Chasing the Dragon',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2006'],
		sku: ['SRM02-08'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'During the excavation for the foundation of a new building, a forgotten drainage pipe was found. Wuxing, who owns the building site, suspects it leads under the nearby sector border into the neighboring sector. They sent in an exploration team. This team reported some disturbing findings via commlink. Then all communication broke down.\nEnter the runners. Wuxing hires them to explore the drainage system, find the first exploration team and bring them back alive, if possible.\nIt all comes down to a bit of a dungeon crawl with the runners never knowing what horrors lurk around the corner. Along the way, they may find one very disturbed member of the first exploration team.\nThe finale has the runners entering the final chamber where Enrico Trebol, an Aztec Blood Mage, is just finishing a nasty sacrifice ritual on the survivors of the missing team. Trebol is crazed and confused.  He’s spent years living alone in the tunnels, forgotten by the corp when Ghostwalker threw Aztechnology out of Denver. He has spent years transforming the tunnels to accommodate his crazy delusions.',
		edition: 4,
		gameDate: '2070',
		name: 'Tunnel Vision',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2006'],
		sku: ['SRM02-09'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Ardent’s head hurt. He felt bruised all over, like bailing without a parachute. Everything was hazy, he couldn’t remember what happened the last few…hours…days. “Did I crash? Wait, no, I landed”, he thought.\nMemories started coming back. He remembered that he landed, taxied to the hangar, the Koshari met him, and then everything went black; black and painful. The Koshari weren’t pleased that the cargo was missing. He tried to explain that he saw a ZDF plane coming at him and he dumped the cargo. Unfortunately he couldn’t explain why he was so far off course. They thought he sold it to a competitor. Ardent mumbled to himself, “Should have kept flying.” The Koshari don’t like mistakes, and this was Ardent’s second.\nHis first only cost him repayment plus interest. A light sitting on a table pushed the shadows back. Ardent was seated in a chair with his hands tied behind his back. The room was vast beyond the darkness. Even with thermal and lowlight in his cyber eyes, there wasn’t much to make out.\nFootsteps echoed behind Ardent. “Good news, Mr. Ardent, your plane’s logs confirm your statement. You can be on your way. Any further obligations we had with you are terminated as your services are no longer needed,” said a voice from behind him.\nA figure of a man walked just past Ardent. It resembled the Mr. Johnson who hired him, though with the Hopi mask, it was impossible to be sure. The man continued as he put down a case and opened it, “Before you go, there is the matter of payment. Cash isn’t optional.”\nArdent looked up confused. When he saw the man turn around holding a scalpel, he finally understood…',
		edition: 4,
		gameDate: '2070',
		name: 'Winter Wonderland',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2007'],
		sku: ['SRM02-12'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'A DocWagon executive, Brent Fuller, hires the team to investigate a situation regarding patients that are disappearing. They are told that the investigation must be kept absolutely quiet for public relations purposes. He gives them the files on the three missing women.\nLegwork provides the runners with leads on a fake DocWagon ambulance, potential additional victims, and the grunts responsible for the kidnappings.\nEventually, the runners learn about the Farm – a site where metahumans are grown for organ harvesting. To their horror, they discover ghouls run the site. The run concludes as the team fights their way free with the survivors while the ghouls or their associates pursue.',
		edition: 4,
		gameDate: '2070',
		name: 'Critical Care',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2007'],
		sku: ['SRM02-15'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'When precious resources are in transit inside Denver, it’s difficult for the various factions to stay idle. And when every faction has a reason to try to get hold of it, that leaves many decisions to the runners about their allegiance.\nIn this adventure, the runners are hired by the Casquilho mafia to retrieve two bioengineered animal specimens on display during an international scientific conference on wildlife preservation. The Yamato Yakuza clan is providing protection for the animals. These highly intelligent animals will follow the runners until their delivery.  Between the retrieval and the delivery, other factions hear about that and make their offers to the runners to get the animals for themselves.',
		edition: 4,
		gameDate: '2070',
		name: 'Primal Forces',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2007'],
		sku: ['SRM02-16'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'After taking a call to meet at the Splatter Bar, the runners are contracted to collect black mail material on Lin Yao. The Vory want the runners to eliminate another team of runners and take a job from Lin Yao. It is important that they record the meeting, and after completing the secondary run bring one of the participants (Chun Xiang) from that run back to the Vory.\nLin Yao’s job involves kidnapping a woman who is the current lover of a member of the Triad and the former lover of Lin Yao. It’s believed that the recording plus the risk of harm to Chun will give them sufficient leverage on Lin to get what the Vory want. The fact that Chun is also a skilled smuggler is just an additional bonus in Fomin’s mind.\nOnce the team decides who they’re actually willing to work for and how they’ll follow through on the run, they need to deal with at least one of several Johnsons all looking for a double cross.',
		edition: 4,
		gameDate: '2070',
		name: 'Take Out Service',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2007'],
		sku: ['SRM02-13'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'This run focuses on an assassination near the town of Leadville. The characters are hired because Mr. Johnson (a Koshari plant) believes that his superiors had his corporate wife murdered and that one of his rivals gave the order.  The runners will have to cross the border into PCC territory, travel through almost 200 km of PCC territory, kill the target, and return.  Mr. Johnson will also stipulate that the run must be completed in three days, the death must appear accidental, and collateral damage must be kept to a minimum.\nOn the way there and back, they will have to deal with tightened security at the borders, getting around a gang turf war, altitude sickness (and other high-altitude problems), and overly curious PuebSec officers.  The target’s residence contains a corp bodyguard team, magic and mundane defenses, and a few surprises.',
		edition: 4,
		gameDate: '2070',
		name: 'Wetwork Pure and Simple',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'WizKids Games'
		],
		releaseDate: ['2007'],
		sku: ['SRM02-14'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'No Longer Hidden\n\nThe Bastard, upright. A man in clown makeup stands in a broken skyraker window over another man on the verge of a long plummet. Near the clown’s hand, a white rose. Opportunity, adventure, but also mania and frenzy. 404, upright. A woman crouches on the edge of a rooftop, holding a white rose. In the distance is the image of a woman in a red dress. Destruction, failure, collapse. Queen of coins. A woman in a red dress, lounging amidst luxury. She has material wealth but emptiness of soul. Upright, she is opulence, magnificent. Inverse is suspense, fear.\nOpportunity and adventure abounds. Destruction and failure loom. Will the result be magnificence—or fear?\nBook of the Lost takes the intricate art of the Sixth World Tarot and turns it into stories and campaigns for Shadowrun players. Full of plot hooks and adventure seeds, this book is a treasure trove of ideas, mysteries, and enigmas that can make memorable games. Open it and explore knowledge that had been lost but is now, here, rediscovered. And waiting for you.',
		edition: 5,
		gameDate: '2079-02',
		name: 'Book of the Lost',
		names: {
			'de-DE': 'Buch der Verlorenen'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: ['2017-03'],
		sku: [
			'27452',
			'45048'
		],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'A scared megacorporation does not run and hide in the shadows. Instead it lashes out, swiping with sharp claws, not caring who is hit by the blows. Many of the megacorps are currently reeling, hit by multiple harsh wallops. NeoNET and Evo are dealing with the fallout of the CFD virus, Ares has powerful forces eating it away from inside, Horizon backed the losing side of the Aztlan-Amazonia war, and the Japanacorps are rearing back to take on the world—and each other. When the corps get aggressive, shadowrunners get called, and blood gets shed.',
		edition: 5,
		gameDate: '2077-02',
		name: 'Bloody Business',
		names: {
			'de-DE': 'Blutige Geschäfte',
			'fr-FR': 'Bloody Business'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele',
			'Black Book Editions'
		],
		releaseDate: [
			'2015-05',
			'2016-03',
			'2018-09'
		],
		sku: [
			'27450',
			'45037',
			'SR509'
		],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Shadowrunning can take you all sorts of different places and give you the chance to have all sorts of different guns pointed at you. Whether you’re exploring mysterious islands off the coast of Seattle, collecting bounties on the tightly guarded streets of Manhattan, or trying to survive the chaos and conflict in Bogotá, you’re likely to find yourself in trouble and in the line of fire. Because that’s where you’re paid to be.\nFiring Line collects four Shadowrun Missions developed especially for the large summer gaming conventions, making them available for the first time to the gaming public. The adventures have all the statistics and game information needed for both Shadowrun, Fourth Edition and Shadowrun, Fifth Edition, meaning that a wide range of shadowrunners will have everything they need to dive into the adventures and get themselves in some high-paying trouble!',
		edition: 5,
		gameDate: '2075',
		name: 'Firing Line',
		names: {
			'de-DE': 'Im Fadenkreuz'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2013-08-28',
			'2014-10-16',
			'2015-05-03'
		],
		sku: [
			'27481',
			'45029'
		],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'You live in any sprawl long enough, you’ll find out that there’s a lot more to it than businessmen and soykaf stalls. Any sprawl worth its mettle has its dark corners, its forgotten places, its spots that are just as wild and untamed as the deepest rainforest.\nSeattle, the prime metroplex in the world for shadowrunning, is filled with such places, and Sprawl Wilds gives shadowrunners a chance to tour them. From a fortress-like Barrens farm recovering from a mysterious attack to a dark secret hidden in a clinic, runners have a chance to see the sites most people never encounter, and uncover information that some people want to stay secret at any cost. They’ll meet jaded smugglers, wary police officers, passionate activists, hardened criminals, wounded warriors, and at least one deranged killer. The questions are, will they survive long enough to collect a paycheck—and how much of the sprawl will be nothing more than dust when they’re done with it?',
		edition: 5,
		gameDate: '2075',
		name: 'Sprawl Wilds',
		notes: 'The German translation is split in two books: "Licht aus der Asche" and "Trittbrettfahrer".',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2013-07'],
		sku: ['27480'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'TO: Willing recruits\n\nFROM: The people who can pay you\n\nCome to Manhattan. We will pay.\n\nWe won’t bother with appeals to patriotism, or to your best instincts, or to anything the least bit noble. Come to Manhattan because there is a fight breaking out. Fighting is what you are paid for. Fighting is what you were born for. Come because there is money to be made.\nYou don’t need to pick a side. Sides shift, sides change. In the end, the only consistent thing is that you are the only one you can count on. You fight for yourself. That is something you should be used to. That is how you live.\nCome to Manhattan because the corporations are spoiling for a fight. Most of the time, we’re good at keeping our spats clean and civilized. We lie, we cheat, we steal, but we do not engage in anything as vulgar as open street fighting. Sometimes, though, we can’t help ourselves. Sometimes, the tension gets to be too much, and it breaks, and it bursts into the open.\nThat time is coming.\nBring your skills, bring your wits, and definitely bring your guns. You’ll need everything you got. We are anxious to take advantage of what you have.\nCome to Manhattan. We’re waiting for you.',
		edition: 5,
		gameDate: '2076',
		name: 'Boardroom Backstabs 3: Battle of Manhattan',
		names: {
			'de-DE': 'Krieg um Manhattan'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2015-02',
			'2016-05'
		],
		sku: [
			'27409',
			'45041'
		],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'The Sixth World is many things, including a stunning series of case studies on the mechanisms of hate. There are some true experts out there, people who know that just walking up to someone or something you don’t like and throwing a solid punch is satisfying, but nowhere near as satisfying as causing destruction that runs deep and lasts forever.\nThe Aurora Warrens of Denver hold a dark secret, as some people trusted to help its residents are instead giving full rein to their darkest impulses. Shadowruuners typically are not heroes riding in to save the day, but in this case the work they’re being offered gives them a chance to dig into these secrets, perhaps fix some of them, and maybe even bring a few people to justice—however they happen to define justice. With dark secrets, double-crosses, and plenty of nuyen flying around, Serrated Edge gives players plenty of chaos to keep up with while launching them into a series of adventures that will shake up the city of spies and maybe bring about a better future. Or curse it to worse.',
		edition: 5,
		gameDate: '2075',
		name: 'Serrated Edge (Denver Adventure 1)',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2016-03'],
		sku: ['27401'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Federal Agent Seth Dietrich has a secret. Actually, multiple secrets. One of them made him go underground, hiding from the people desperate to learn just how much he knows. And the other is keeping him from surfacing, because he’s found he can’t even trust himself.\nIf Dietrich were in his right mind, he’d cover his tracks like a pro, and no one would find him. Especially not shadowrunners getting their feel for life on the streets. But he’s not in his right mind, which means a group of shadowrunners finds themselves in possession of some very valuable information—information the highest powers in Seattle want for themselves. What started as a simple job turns into a scramble for their lives, a scramble that could become profitable if the runners play their cards right.',
		edition: 5,
		gameDate: '2075',
		name: 'Splintered State',
		names: {
			'de-DE': 'Tödliche Fragmente',
			'fr-FR': 'Fragmentation'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele',
			'Black Book Editions'
		],
		releaseDate: [
			'2013-09-30',
			'2013-12',
			'2014-07',
			'2014-11'
		],
		sku: [
			'27400',
			'45016',
			'SR502'
		],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'The Denver sprawl has always been a battleground, but lately it seems to be at war with reality. People are disappearing from the streets, never to be seen again. Strange creatures are materializing out of nowhere, and sometimes they bring entire landscapes with them. Something has gone desperately wrong, and the stakes are so high that two enemies who had been locked in combat are setting aside their fight to find out what is happening and why.\nIf investigations into bizarre occurrences need to happen, then there are shadowruns to be done. The right team will have the chance to bring in an impressive payday, but they’ll have to navigate their way past old grudges, tainted magic, and creatures of pure destructive power waiting to be turned loose on the sprawl.',
		edition: 5,
		gameDate: '2075',
		name: 'Ripping Reality (Denver Adventure 3)',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2017-06'],
		sku: ['27403'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'The ruling powers of Sixth World sprawls are content to let the little people of their cities engage in all sorts of shenanigans and scheming so long as it doesn’t affect their master plans. But when the chaos gets too out of hand—or the little people start acting too arrogant—then those powers turn their angry gaze to the people they would rather ignore, and the everyday chaos of life erupts into something worse, and considerably more dangerous.\nRecent attacks on the Paladin Medical Health Center in the Aurora Warrens have drawn the attention of some of Denver’s powers, and they’re not going to ignore the situation. They’re also not going to just send in the police, because that’s not how things are done—instead, they will launch schemes of their own, with the opportunity to create chaos that makes the previous wildness seem like a sunny day in the Rockies.',
		edition: 5,
		gameDate: '2075',
		name: 'False Flag (Denver Adventure 2)',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2016-12'],
		sku: ['27402'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Smoke & Shadows\nLondon—where the thick fog (sounds nicer than smog, doesn’t it) makes for some truly deep shadows. Every crooked street, every cramped building holds a secret or two, as well as a person or two who will go to great lengths to ensure those secrets are kept. There is, for instance, the dark secret of a minor noble who has not been seen in Parliament in months. And the researcher who has a startlingly large amount of people interested in his work. The courier who carries one secret in his head and another in his gut. And an explosive secret that has been festering in the West End Underplex for years or even decades.\nSkilled runners have the chance to uncover these secrets and more, but they’d better be ready for the forces of the world that would prefer to keep things covered up. They are tenacious, dangerous, and, perhaps most surprising for England, not at all polite.',
		edition: 5,
		gameDate: '2075',
		name: 'London Falling',
		names: {
			'de-DE': 'Mission London'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2014-12-01',
			'2015-04-08'
		],
		sku: [
			'27482',
			'45032'
		],
		type: 'digital'
	},
	{
		category: 'mission',
		description: "It was a simple job, and the pay was good. Snatch Euphoria, the simsense star, sit on her for a weekend, and let her go. Easy.\nIf you believe that, you've never run the shadows.\nBecause now she's been snatched for a second time... and the corps think you did it.\nWhat does all this have to do with - Ambergel, the most popular junk food in Seattle?\nA former Coyote shaman?\nAn evil power so strong it threatens all mankind?\nFind the Queen. Find the answers.\nHURRY!",
		edition: 1,
		gameDate: '2050',
		name: 'Queen Euphoria',
		names: {
			'de-DE': 'Königin Euphoria',
			'fr-FR': 'La Reine Euphoria'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Descartes Editeur'
		],
		releaseDate: [
			'1990-09-01',
			'1993',
			'1994'
		],
		sku: [
			'7304',
			'10712'
		],
		type: 'scan'
	},
	{
		category: 'mission',
		description: "The Year is 2050\n\nLadies of the night are being murdered and butchered with the skill of a surgeon. The Gaslight Ghoul has returned, and he stalks the streets of Seattle! in Shadowrun, the rampant substance abuse of the 19th and 20th centuries are now as archaic as 8-track audio tapes. Now the escape of choice is the BTL, or Better Than Life chip. Plug it in and all physical pleasures, desires, and hopes suddenly pale by comparison. Some 'experimental' chips are missing, and you've been hired to find them. But an investigation of simple theft is turning into a grisly trail that seems to have no rhyme or reason. Now you are beginning to wonder … can these chips program someone to be a serial killer?",
		edition: 1,
		gameDate: '2050',
		name: 'Dreamchipper',
		names: {
			'de-DE': 'Dreamchipper',
			'es-ES': 'Chip soñador',
			'fr-FR': 'Les Voleurs de Narcopuces'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Descartes Editeur',
			'Diseños Orbitales',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1989-04',
			'1993',
			'1993',
			'1995-01',
			'2011-05'
		],
		sku: [
			'7303',
			'10701'
		],
		type: 'digital'
	},
	{
		category: 'mission',
		description: '"Imagine a hatred that has endured for 5000 years...."\nThe shadowrunners are sent on a string of missions, collecting obscure items, all seemingly unrelated... or are there? From the streets of Seattle to the frigid heights of the Bavarian Alps, from the magical mayhem of Columbia, Missouri to the headwaters of the Amazon, the adventure unfolds.\nWho would go to all this trouble to destroy one man... and why?\n\tA datafile\n\tAn ancient magic tome\n\tA Flower\n\tA collection of Elven ears\n\tThe manuscript of a soon-to-be-released bestseller\n\tA young woman of mysterious heritage\n\tA world-famous Elven social theorist\nAll are pieces to the puzzle.\nFinding them is one thing.\nPutting it all together is another!',
		edition: 1,
		gameDate: '2051',
		name: 'Harlequin',
		names: {
			'de-DE': 'Harlekin',
			'es-ES': 'Arlequín'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'La Factoriá',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1991-01',
			'1995',
			'2002-05',
			'2005-03-17'
		],
		sku: [
			'7306',
			'10715'
		],
		type: 'scan'
	},
	{
		category: 'mission',
		description: "Bottle, Bottle, who's got the Bottle?\nThe shadowrunners meet a very disturbed man who hires them as bodyguards on a business deal.\nBottle, Bottle, who wants the Bottle?\nNow the man is dead, and they don't know why.\nBottle, Bottle — what's in the Bottle?\nThe bottle is a mysterious artifact covered with ancient cryptic runes. Why are some people willing to kill for it? Why are some people willing to die for it? And the most sensible advice the runners receive is the one thing they can't seem to do — get rid of it.\nNo Deposit! No Return! Please dispose of property!",
		edition: 1,
		gameDate: '2050',
		name: 'Bottled Demon',
		names: {
			'de-DE': 'Flaschendämon',
			'fi-FI': 'Pullotettu demoni',
			'fr-FR': 'Le Démon dans la Bouteille'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Descartes Editeur',
			'PRO Games',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1990-07-01',
			'1992',
			'1994-04',
			'1997',
			'2012-11'
		],
		sku: [
			'7305',
			'10707'
		],
		type: 'scan'
	},
	{
		category: 'mission',
		description: "A blast of light punches my eyes as I walk down the ramp from street level. The dance floor is an amorphous beast, writhing with a thousand limbs, and the beat of the music red-lines my pulse into overdrive. On the stage, a nova is dancing.\nSearing beams of the spotlights catch the mirror-bright metal arms, legs, and face, reflecting them back in a dazzling cascade of color and light. The next thing you see is the hair flaring golden in the glare, surrounding her face like a solar corona around a silver moon. While Maria Mercurial dances, nothing else matters.\nOf course, something else does matter - biz. That's why you're here, chummier, to protect the silver lady with no past. The money's good, the job's easy; what could go wrong? Except maybe the lady's past is catching up with her.",
		edition: 1,
		gameDate: '2050',
		name: 'Mercurial',
		names: {
			'de-DE': 'Mercurial',
			'es-ES': 'Mercurial',
			'fr-FR': 'Mercurial',
			'he-IL': 'מאריה כספיתי'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Hexagonal'
		],
		releaseDate: [
			'1990-11',
			'1991'
		],
		sku: [
			'7302',
			'10705',
			'1-55560-116-2'
		],
		type: 'scan'
	},
	{
		category: 'mission',
		description: "You've been hired to infiltrate Mitsuhama's Cavilard research center in Bellevue to steal Silver Angel. Your employer Eve Donovan was rather unclear what Silver Angel was apart from the fact that it was a file stored on a secure computer system inside the facility.\nSince Bellevue is tight on the security you decide to infiltrate using one of the Russel Overland trucks that regularly make nightly deliveries of Hazardous Materials. For that you need their schedules so you can hi-jack a truck before it enters Bellevue.\nSo here you are on a lil boat in the nightly waters of Puget Sound, cursing the others who stayed behind for their own legwork. You are wondering if they are freezing too.",
		edition: 1,
		gameDate: '2050',
		name: 'Silver Angel',
		names: {
			'de-DE': 'Silver Angel',
			'fr-FR': 'Silver Angel'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Hexagonal'
		],
		releaseDate: [
			'1989',
			'1990',
			'1993'
		],
		sku: [
			'7102X',
			'10701'
		],
		type: 'scan'
	},
	{
		category: 'mission',
		description: 'Elizabeth Nunn, a delightful woman who happens to have an odd habit of hanging out in hospitals and abandoned churches, has a grudge. A deep grudge. The kind of grudge that requires professional help to work out, and we’re not talking about a psychotherapist. She needs shadowrunners, and if they’re willing to take on the job, they’ll encounter fierce gangers, wild critters, and members of a secret magical society who fiercely guard their mysteries. If the runners can survive, they can find out just what Nunn is mad about—and how far she is willing to go for her revenge.',
		edition: 5,
		gameDate: '2077-08',
		name: 'Boundless Mercy',
		names: {
			'de-DE': 'Gnade ohne Grenzen'
		},
		notes: 'The German edition also has a summary of "Montreal 2074".',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2015-10-16',
			'2016-12'
		],
		sku: [
			'27485',
			'45045'
		],
		type: 'digital'
	},
	{
		category: 'mission',
		description: "Biogene Technologies, a mid-sized genetic engineering firm, hires the runners to make a datasteal on a competitor, the powerful Aztechnology. The job is simply to break into Aztechnology's Tacoma Resarch Park, snatch some data and some samples, and deliver it all to the client for payment.\nSimple, yes, but nothing in the shadows of Seattle is as simple as it seems...",
		edition: 1,
		gameDate: '2050',
		name: 'DNA/DOA',
		names: {
			'de-DE': 'DNA/DOA',
			'es-ES': 'DNA/DOA',
			'pt-BR': 'METAGEN'
		},
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: [
			'1990-03',
			'1991',
			'1997'
		],
		sku: [
			'7301',
			'10703'
		],
		type: 'scan'
	},
	{
		category: 'mission',
		description: 'Unlock the potentials of your mind and body. Turn your back on the shallow and mundane - join the Universal Brotherhood and be a part of something wonderful!\n\nWho are the Brotherhood? Possibly the largest humanitarian organization in the world? To the grime-encrusted inhabitants of the sprawl they are a shining ray of hope in an otherwise hopeless world. This is their way out of the darkness, their key to personal fulfillment and understanding. They are on every corner. THey knock on every door. And they want to save you too.\nNow someone has been on the inside of the Brotherhood. The objectives and purpose of the Brotherhood have been exposed. Some of the questions are answered. But the truth is even more chilling....',
		edition: 1,
		gameDate: '2050',
		name: 'Universal Brotherhood: Unleash Your Inner Abilities / Missing Blood',
		names: {
			'de-DE': 'Die Universelle Bruderschaft',
			'fr-FR': 'La Confrérie Universelle'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Descartes Editeur',
			'Fantasy Productions',
			'Catalyst Game Labs'
		],
		releaseDate: ['1990-10'],
		sku: [
			'7205',
			'10716'
		],
		type: 'scan'
	},
	{
		category: 'mission',
		description: 'Shadowrunners have a lot of rules, and each and every one of them can be overruled by the proper amount of nuyen. So when shadowrunners talk about “never trusting an elf,” that’s more of a bargaining position than anything else.\nLuckily for them, some elves have plenty of scratch they can use as a persuasive tool. And for the tasks they have in front of them, they’re going to need it. There’s money waiting for runners if they’re willing to venture into elven territory and take on a host of odd jobs. Jobs like: Tracking down reagents from cranky critters. Messing around in the affairs of Tír royalty. Dealing with a number of different punks and thugs, none of whom like you. And intervening in a leadership challenge of the most powerful elven street gang there is.\nElven Blood is a compilation of five different Missions that have been written to premiere at summer 2012 conventions. They can, however, be played by anyone. Whether you’re playing at a con, in a game store, or in the comfort of your own home, Elven Blood has an adventure for you. Taking you from the mean streets of Seattle to the wild lands of Tír Tairngire, Elven Blood offers exciting and inventive adventures for all Shadowrun fans.',
		edition: 4,
		gameDate: '2074',
		name: 'Elven Blood',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2012-09'],
		sku: ['26CMP10'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Sixth World scholars have long hypothesized the cyclical nature of magic. For years corporations, collectors and other factions have spent fortunes hunting down surviving relics of this mythical age. The shadows whisper of lost lore and a secret history to the world. A privileged few have come into possession of ancient items of great power and mysterious purpose, artifacts from before recorded history. Now it’s your turn...\nOn the surface, the job seems simple: escort and assist Ms. Johnson as she follows the trail of a man across the globe. The target? An agent of the Atlantean Foundation tracking a priceless stolen artifact. And the trail? It leads to Lagos, the most dangerous sprawl on earth, where simply surviving the day can be a run in its own right. Add in the biggest black market auction of the century, a powerful African king, and a plethora of the biggest players in the artifacts trade, from the Atlantean Foundation to Aztechnology... well, welcome to the underside of the artifact business. If you survive, there’s more work a-coming… and maybe even some answers to your questions.',
		edition: 4,
		gameDate: '2072',
		name: 'Dawn of the Artifacts 1: Dusk',
		names: {
			'de-DE': 'Dämmerung - Erster Teil der Artefaktjagd-Kampagne'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2009-07',
			'2012-03-20'
		],
		sku: ['26400'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Sixth World scholars have long hypothesized the cyclical nature of magic. For years corporations, collectors and other factions have spent fortunes hunting down surviving relics of this mythical age. The shadows whisper of lost lore and a secret history to the world. A privileged few have come into possession of ancient items of great power and mysterious purpose, artifacts from before recorded history. Now it’s your turn… Eighteen months ago, the Phaistos Disk was stolen from the Herakleion Museum in Athens. Now, Mr. Johnson needs you to find it and bring it back. The hunt will take the runners through the shadows of Europe, and lead to interactions with smugglers, art dealers, and archaeologists. If they survive Interpol, Aztechnology, and an eccentrically violent shadowrunner team, they may just learn who is behind the hunt and why.',
		edition: 4,
		gameDate: '2072',
		name: 'Dawn of the Artifacts 3: Darkest Hour',
		names: {
			'de-DE': 'In Dunkelster Stunde - Dritter Teil der Artefaktjagd-Kampagne'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2010-08',
			'2012-04-19'
		],
		sku: ['26402'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'There are deep secrets in the Sixth World, and there are people who will do anything to uncover them. Some secrets reach into the ancient past, but they still have the power to shake the world. What they will do depends on whose hands they fall into...\nDusk was only the beginning. Jane "Frosty" Foster is back and ready to continue her artifact hunt. If they’re game, runners will join her in a chase across North America, from the frozen, bug-filled wastes of Chicago to the political hotbed of Denver to the Deep Lacuna lurking under Los Angeles.',
		edition: 4,
		gameDate: '2070',
		name: 'Dawn Of The Artifacts 2: Midnight',
		names: {
			'de-DE': 'Mitternacht - Zweiter Teil der Artefaktjagd-Kampagne'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2009-12',
			'2012-03-31'
		],
		sku: ['26401'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: "The megacorp probe race to be the first to reach Halley's Comet is in its final rounds. With only a few contenders left, your shadowrunner team can make a difference, deciding who wins and who loses.\nWake of the Comet ™ includes three adventures that wrap the sample race first in Year of the Comet ™ . Time is running out of the shadowrunners are hired to sabotage the competition and ensure that only one corp reaches the comet first. Wake of the Comet is for players and masters of all experience levels.",
		edition: 3,
		gameDate: '2061',
		name: 'Wake of the Comet',
		names: {
			'de-DE': 'Schweif des Kometen'
		},
		originalLanguage: 'en-US',
		publisher: ['Fantasy Productions'],
		releaseDate: [
			'2002-07',
			'2003'
		],
		sku: ['10654'],
		type: 'scan'
	},
	{
		category: 'mission',
		description: 'This introductory adventure for Shadowrun, Fourth Edition sends the players in pursuit of an archaic media chip with priceless contents, mixing them up with a media legend’s ancient history.\nThis adventure is seeded with helpful advice to immediately acquaint new gamemasters with running Shadowrun and also includes a number of tips that veteran gamemasters will find useful.\nIt is also intentionally designed to familiarize gamemasters and players with various key aspects of the Shadowrun universe. On the Run is perfect as a stand-alone adventure—and is also the first in a continuing series of adventures.',
		edition: 4,
		gameDate: '2070',
		name: 'On the Run',
		names: {
			'de-DE': 'On the Run',
			'fr-FR': 'En pleine course'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Fantasy Productions',
			'Black Book Editions'
		],
		releaseDate: ['2006-06-30'],
		sku: [
			'26003',
			'23003',
			'SR03'
		],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Ancient Tradition Violated...\n\nA New Order Declared...\n\nThe death of the great dragon Dunkelzahn kicked off a series of events that are only now reaching climax. A challenge is declared as antediluvian customs clash with the methods of the modern world. The shadowrunners are involved in a string of unrelated missions that begin to tie themselves together. From the ruins of Tehran to the jungles of Amazonia, from the towers of Hong Kong to the deep metaplanes, the machinations of a reptilian chess game begin to unfold.\nSurvival of the Fittest is a series of seven adventures that can be played consecutively or interwoven into an existing campaign.',
		edition: 3,
		gameDate: '2062-06',
		name: 'Survival of the Fittest',
		names: {
			'de-DE': 'Fressen oder gefressen werden'
		},
		originalLanguage: 'en-US',
		publisher: ['Fantasy Productions'],
		releaseDate: ['2004-05'],
		sku: [
			'10665',
			'10760'
		],
		type: 'scan'
	},
	{
		category: 'mission',
		description: 'One more artifact. One more chance for a big payday. One more run to distant lands and high seas, racing against time and the wealthy, ruthless powers who want the artifact for themselves. At the end of this, if you succeed, four powerful artifacts will be gathered together, and they will be poised to shake the world.\nTo finish the quest for the artifacts, runners will have to travel to Hong Kong, track down the mobile city of Karavan, penetrate the corp enclave of Neo-Tokyo, and survive an assault on the high seas. The final adventure in the Dawn of the Artifacts series, New Dawn brings the story of the gathering of the artifacts to a rollicking conclusion while setting the stage for the changes the Sixth World will experience once the true power of these artifacts is tapped and unleashed.',
		edition: 4,
		gameDate: '2072',
		name: 'Dawn Of The Artifacts 4: New Dawn',
		names: {
			'de-DE': 'Morgengrauen - Vierter Teil der Artefaktjagd-Kampagne'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2011-08',
			'2012-05-01'
		],
		sku: ['26403'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Step this way! There’s no need for you to wait in line with the riff-raff, the common clay of dirty humanity. You can have something better. You can have the good life, filled with the finest food, the most expensive wines, and the most interesting people in the world. There’s a price to pay, of course. There always is. But take a ride, just once, in the aircraft the upper crust uses, and see if you don’t like it. Get a taste of this lifestyle, and see if you won’t do anything to keep it.\nIn Jet Set, shadowrunners get the chance to rub elbows with the rich and powerful of the world—the socialites, the corporate elite, the royalty, the movers, and the shakers. These are people who know how to get what they want, no matter who they need to step over to get it. The runners may be the help they need to get rid of their latest obstacle—or they could be the next bodies the rich and powerful leave in an expanding trail behind them.',
		edition: 4,
		gameDate: '2074-02',
		name: 'Jet Set',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2012-02'],
		sku: ['26452'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'You could dabble in organized crime. You could do some smash-and-grabs. You could find all sorts of ways to pick up a few nuyen here and there. But everyone in the Sixth World knows that if you want to make a play for the big bucks, the real high-level stuff, you’ve got to get in bed with the corps.\nThe corps have the money, and they’ve got all the power that comes with it. If you want to have some of that cash and some of that pull for yourself, you’re going to need to stay alert, move quickly, and remember that while corps are willing to pay for things that help them, deep down they really hate sharing what they’ve got with anyone. Including shadowrunners. Especially shadowrunners.',
		edition: 4,
		gameDate: '2073-12',
		name: 'Corporate Intrigue',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2011-12'],
		sku: ['26451'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'In Bad Moon Rising in the East, a team of shadowrunners is hired to track down the source of a new drug shipping into Hong Kong. Directly connected to the Ghost Cartels campaign, the team of six Caracas natives are thrust into a criminal underworld far from their home. With few contacts to turn to, they may find themselves deeply involved in a vicious underworld conflict.\nThis 22-page scenario was used for the Gen Con 2008 Shadowrun tournament. While it may be used with other characters, the included team of shadowrunners are fully fleshed out with contacts, backgrounds, and motivations. This complete package allows for a night or two of Shadowrun with little prep work for the gamemaster or the players.',
		edition: 4,
		gameDate: '2070',
		name: 'Bad Moon Rising in the East',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2009-02'],
		sku: ['26601'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'The Horizon Corporation is everywhere. They’re in the trids you watch, the music you listen to, and the news you consume. They’re propping up hundreds of major brands of products across the planet with their public relations skill. And they’re spending countless hours studying how you—that’s right, you—think so that they can lead your mind like a master leads a spaniel.\nDenizens of the Sixth World have long suspected that there is a dark side to Horizon, if only because the corporation seemed too good to be true. If there is a dark side, it seems likely to come out soon, as the corporation has been under tremendous pressure recently—technomancers are plotting against it, spirits are causing problems in the Mojave, and Aztechnology is on the offensive, intent on keeping the competition down. That pressure is going to result in an explosion somewhere, and when it does, Horizon and the Sixth World will be changed forever.',
		edition: 4,
		gameDate: '2074-03',
		name: 'The Twilight Horizon',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2012-03'],
		sku: ['26463'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'In 2072, Roger Soaring Owl, CEO of Knight Errant, resigned.\nIn 2073, Roger Soaring Owl was attacked on the streets of Denver. Witnesses were not clear on just what attacked him, but most say it was meaner, stronger, and faster than any metahuman.\nNow it’s 2074. It’s time to find out what Roger Soaring Owl learned.\nCorporate machinations don’t get any meaner than this. Rivals of the megacorporation are certain it’s hiding some dark secrets, and they’re willing to spend significant nuyen to uncover this information. Runners are going to have to infiltrate an Ares subsidiary and gain the corporation’s trust if they want to discover the secret—and if they do, they will have to find a way to survive with what they have learned.',
		edition: 4,
		gameDate: '2074',
		name: 'Boardroom Backstabs 2: Sacrificial Limb',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2012-10'],
		sku: ['26410'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'The only shadowrunners in the world who don’t understand the importance of eliminating the competition are the ones who have already been eliminated by someone else. The Horizon Corporation wants its stable of music artists to sell a few more albums and its brain trust has decided that the best way to accomplish this is to move some artists at the top of the charts out of the way. Outright killing the competition is no good—that often just boosts the deceased’s album sales. The secret is to get the public to stop wanting what they’re currently buying, and Horizon has developed some creative ways to make that happen.\nAnarchy: Subsidized is a complete adventure that takes shadowrunners to Neo-Tokyo and plunges them into corporate intrigue involving street gangs, vandals, scandal-mongers, and one of the most impressive technological innovations the entertainment industry has ever seen. ',
		edition: 4,
		gameDate: '2073',
		name: 'Horizon Adventure 2: Anarchy Subsidized',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2011-09'],
		sku: ['26406'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Nothing’s as simple as it seems—any runner knows that. So what seems like a simple job guarding some precious cargo on the set of a trideo shoot is bound to get complicated. And it does—but are you ready to travel the full length the long, twisted road ahead? A Fistful of Credsticks begins a new series of adventures centered on the machinations of the Horizon Corporation. Runners will learn more about the dark side of Horizon, leading to future developments that could change the shape of the entire corporation. Runners that see this adventure to the finish will encounter trideo makers, music celebrities, showbiz leeches, some gang members bent on fame, and a very peculiar corporate experiment.',
		edition: 4,
		gameDate: '2072',
		name: 'Horizon Adventure 1: A Fistful of Credsticks',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2011-04'],
		sku: ['26405'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: "When the great dragon Hestaby leveled Saeder-Krupp’s arcology in Dubai, a lot of people wondered if the success of her act meant that Lofwyr & co. were off their game. And of course, the corps of the Sixth World aren’t ones to just sit around and speculate—instead, they act. All of the sudden, corporations of all sizes are on the move, snatching up any Saeder-Krupp clients they can pry away, telling them that S-K can’t be trusted in the current turmoil.\nSaeder-Krupp, though, is not about to let anyone believe they are weak. They're going to show that they should never be trifled with, and that clients would be well served to stay with them—or risk the wrath of Lofwyr. They’re bringing runners to Dubai to demonstrate that the largest megacorporation in the world still has strength to spare.\nDamage Control is the first in the new Boardroom Backstabs series of adventures for Shadowrun. The series explores one of the classic Shadowrunthemes—corporate machinations where every handshake is made with crossed fingers, and the hand you can’t see is always holding a knife. There’s a lot of money to be made on this job, but runners better keep their wits about them if they want to keep all those corporate sharks from feeding on them.",
		edition: 4,
		gameDate: '2073-08',
		name: 'Boardroom Backstabs 1: Damage Control',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2012-03'],
		sku: ['26408'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'If you’re going to win in modern warfare, you have to use every weapon in your arsenal. Guns, tanks, and bombs are great, but if that’s all you put into play, you’re going to lose. Information and propaganda have been a major part of war efforts for more than a century, and falling behind in those areas will doom you.\nAmazonia has gone to war with Aztlan, which is supported by the greatest public relations machine the world has ever seen. Ready to fight fire with fire, Amazonia has brought in Horizon to sway public opinion, and possibly the tide of the war, to their side. To make their case, they’ll need stealthy runs, fast moves, and quick thinking. And they’ll need it fast, because Aztlan is pressing hard and not inclined to show any mercy.\nColombian Subterfuge is a complete adventure that brings shadowrunners into the war raging in Bogotá while enlisting them in Horizon’s propaganda efforts. It contains all the information gamemasters need, from plot details to NPC statistics, to plunge players into the chaos of war.',
		edition: 4,
		gameDate: '2073',
		name: 'Horizon Adventure 3: Colombian Subterfuge',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2011-12'],
		sku: ['26407'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Every day in the Sixth World people die in a thousand different ways. Every day blood is spilled. Every place that rain falls, it washes away some of the red that stains the streets.\nEliminating every killer in the Sixth World is as impossible as drying up every raindrop in a storm, but Thomas McAllister doesn’t want to get rid of all of them. Just one. He’s been on this killer’s trail for a while, and he knows he’s getting closer. The only question is if he’ll be able to handle getting as close as he’s about to be, or if his blood will join the stream that regularly flows into the gutters of the sprawls.',
		edition: 4,
		gameDate: '2070',
		name: 'Another Rainy Night',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2013-09-13'],
		sku: ['26S022'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Mob wars are ugly things, but not all ugliness is created equal. Things are going bad in Bangkok, and one Yakuza leader named Shinoda Yoshinori has been receiving a series of unsettling messages: bodies of other members of his gumi, packaged and delivered in a decidedly unique fashion. If Yoshinori wants to preserve his gumi—and save his life—he’s going to have to take action. Due to the depleted manpower in his gumi, he’s ready to turn to shadowrunners for help.\n99 Bottles introduces Shadowrun’s new Enhanced Fiction line, in which short stories are accompanied by information and statistics that allows you to incorporate elements of the story into your game. In this book, the story kicks off a short adventure that is presented with all the information gamemasters and players need, from plot points to NPC stats to details of specific locations in the seething, energetic city of Bangkok. Let the new fiction set the stage for a plunge into one of the Sixth World’s seamiest spots!',
		edition: 4,
		gameDate: '2072',
		name: '99 Bottles',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2011-09'],
		sku: ['26S005'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'In the shadows you learn or you die\n\nFirst Run! features three complete adventures that help novice gamemasters and players learn the rules of Shadowrun, Third Edition\nIN THE SHADOWS YOU LEARN OR YOU DIE...\n...while playing. From a basic gun battle to a run against a corporate research facility to smuggling, this product lets players and gamemasters encounter the unique elements of Shadowrun. First Run! offers gamemasters suggestions for overcoming the most difficult aspects of running a game, and provides guidelines for building ongoing campaigns. Each adventure also includes hint for increasing the difficulty to challenge experianced player. For use with Shadowrun, Third Edition.',
		edition: 3,
		gameDate: '2060',
		name: 'First Run',
		names: {
			'de-DE': 'First Run',
			'es-ES': 'Primera Incursión',
			'fr-FR': 'Premier Run'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Descartes Editeur',
			'La Factoría de Ideas',
			'Fantasy Productions'
		],
		releaseDate: ['1999'],
		sku: [
			'7329',
			'10741'
		],
		type: 'scan'
	},
	{
		category: 'mission',
		description: "Something mysterious and terrible has shut down the Renraku Arcology . The doors are sealed, the Matrix is off-line, and 100,000 inhabitants are trapped inside. The UCAS Army seals Renraku knows what's going on. Renraku Arcology: Shutdown! tells who's behind it, and what horrible events are occurring inside. This Shadowrun adventure offers a dark and gritty technological setting complete with new drones, mysterious enemies, and new rules for otaku. It provides everything gamemasters need to take their players in the arcology nightmare, whether extracting trapped relatives, liberating abandoned research, or just getting out alive. Intended for gamemasters and players of all experience levels.",
		edition: 3,
		gameDate: '2060-02',
		name: 'Renraku Arcology: Shutdown',
		names: {
			'de-DE': 'Renraku Arkologie: Shutdown',
			'es-ES': 'El Colapso de la Arcología Renraku'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'La Factoría de Ideas'
		],
		releaseDate: [
			'1998-11',
			'2000'
		],
		sku: [
			'7328',
			'10745',
			'LFSH104'
		],
		type: 'scan'
	},
	{
		category: 'mission',
		description: "Don't Mess With My Head!\nWhat if your mind was no longer your?\nWhat if you could no longer distinguish fantasy from reality?\nWhat if your brain had an off switch, and someone else helt the remote?\nBrainscan is a campaign of five linked adventures that drop the characters squarely into the middle of a titanic struggle for identity, control and freedom.",
		edition: 3,
		gameDate: '2061',
		name: 'Brainscan',
		names: {
			'de-DE': 'Brainscan'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions'
		],
		releaseDate: ['2000'],
		sku: [
			'7331',
			'10749'
		],
		type: 'scan'
	},
	{
		category: 'mission',
		description: "You're a shadowrunner, not some corporate lackey. No 9-to-5 shackles or power-tie chains for you. Every time you take on a run, you sign up to be used and abused. But you've got the smarts to come out on top.\nCorporate Punishment consists of three adventures in which the runners serve as pawns in a brutal corporate power struggle. They use their wits and weapons to take what the corps throw at them and survive with a smile—because the alternative is to hang up their Uzis and get a day job.",
		edition: 3,
		gameDate: '2061',
		name: 'Corporate Punishment',
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'2000',
			'2006-12-03'
		],
		sku: ['7330'],
		type: 'scan'
	},
	{
		category: 'mission',
		description: 'Your chance at the big time – a friend has tipped you off about a job opportunity to do some bodyguard work for a group of exclusive clientele. You have been trying to break into the Seattle shadow scene, and these are just the kind of people that can help. All you have to do is make sure that their meeting doesn’t get interrupted. It’s a simple walk in the park, natch!',
		edition: 3,
		gameDate: '2061',
		name: 'Mission Briefing',
		originalLanguage: 'en-US',
		publisher: ['Fantasy Productions'],
		releaseDate: ['2004'],
		sku: ['SRM00-01'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Runners are rule-breakers. Lawless. Independent. But their dirty secret is that they don’t break all the rules—they just are more open in choosing which rule sets they should follow. And sometimes, they just make up their own rules. Some of those rules are based on what brings them the most money. Others talk about honor and loyalty, concepts that are incredibly important to some runners and derided as useless baubles by others.\nWhatever rules runners invent for themselves, there are times they are tested. And one of those times is coming up.\nPlenty of runs don’t end like they should, but what’s really rare is when runners get to take a run that blows up and stick on their own ending. What starts as an extraction quickly goes south, and the runners are going to have to figure out which rules they’re going to follow to make the ending stick. Who will be happy, who will be angry, who will get paid, who will get dead—runners will have to invent rules that can help make all those questions come out right.',
		edition: 5,
		gameDate: '2075',
		name: 'Jumping Ship',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2017-04'],
		sku: ['27PM005'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Sometimes drek just needs to get blown up. And when it does, you’re the folks that they call to do it. It’s all in the job description, chummer.',
		edition: 3,
		gameDate: '2061',
		name: 'Demolition Run',
		originalLanguage: 'en-US',
		publisher: ['Fantasy Productions'],
		releaseDate: ['2004'],
		sku: ['SRM00-02'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Auslander. If you haven’t heard the name, you’re lucky. If you have heard it, then you know enough to be worried. But not scared, because fear’s not part of the job. Which is good, because the job Mr. Johnson’s got in store for you is a big one—going to Auslander’s home metaplane and talking him out, once and for all.\nIt’s not safe. Of course it’s not. Even the act of getting to the metaplane will cost blood, and nothing gets easier from there. Every type of assault will be thrown at the runners, and they will need every milligram of their considerable skills if they want to succeed and, somehow, survive.',
		edition: 5,
		gameDate: '2075',
		name: 'A Holy Piece of Wetwork',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2016-10'],
		sku: ['27PM002'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'There’s stuff—good stuff, important stuff, stuff a lot of people want—that’s stuck. Sitting where it can’t do anyone a bit of good. And to people who know how to make money from such things, the fact that the goods aren’t moving is incredibly upsetting. Upsetting enough to make even the most kind-hearted individuals want to punch a baby seal in the face.\nThe goods aren’t going to sit there forever, though. Plans are hatching to get the goods moving and out into the world. This being the Sixth World, those plans involve twists, turns, and the kind of complications that keep shadowrunners on their toes. But if they’re brave and resourceful enough, they might be able to make some money off the cargo sitting on the good ship Free Taiwan.',
		edition: 4,
		gameDate: '2072',
		name: 'Free Taiwan',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2012-04'],
		sku: ['26APR12'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: "For three years the Mayan Cutter terrorized the metahumans of Seattle and many point to their inability to stop him as the reason Lone Star lost it's Seattle contract. Shortly after Knight Errant took over, the killings stopped and the Tin Men took credit for bringing him down. But now the killings have started again. Is it a copycat or is it the real deal? You'll have the chance to find out when a grief-stricken Mr. Johnson calls you to track him down so he can get revenge.",
		edition: 4,
		gameDate: '2070',
		name: 'Copycat Killer',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2012'],
		sku: ['CMP10-02'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'There are certain things shadowrunners know. They know Mr. Johnson will not tell you everything. They know sometimes the things you don’t know can kill you. And they know that one of the keys to survival is staying one step ahead of the opposition—or, in times when you are working for a devious Mr. Johnson, not falling too many steps behind.\nThe corporate enclave of Manhattan is the scene for some high-stakes manipulation that will test just how skilled shadowrunners are. Killing Pawn is a Prime Mission, a higher-level challenge designed for characters that have already triumphed in a large number of regular Missions and are ready for something tougher. Runners will have to think fast and shoot even faster if they want to come out ahead in this game—or at least not get captured in the first few moves.',
		edition: 5,
		gameDate: '2075',
		name: 'Killing Pawn',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2016-03'],
		sku: ['27PM001'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'An hour or so outside Chicago is a group of Amish—a group containing humans, metahumans, and centaurs—nicknamed the Neutral Amish because they are complete pacifists and stay to themselves. The Neutral Amish have many excellent craftsmen, and they build everything from commercial shipping pallets to fine furniture and wooden figurines. Simon Andrews was visiting this group to purchase miniatures for a game for one of Saeder-Krupp’s subsidiaries when a herd-gang of centaurs known as the Bronies (yeah, you read that correctly) attacked the Neutral Amish, demanding food, money, and handmade garments. The Bronies killed an Amish family and burned their farm to the ground in the attack. This should be viewed as an isolated act of violence, not an indictment of all who bear the name “brony.”\nThe Amish held a community benefit auction to raise money to hire shadowrunners to deal with the problem. Simon Andrews offered up his services as a fixer for them, free of charge, because Simon is a softy who loves hand-crafted furniture.\nOnce hired, the shadowrunners will go to NuerTagDorf and investigate. While the runners are investigating, the Bronies will return and kidnap one of the Amish girls on the other side of town. The team will locate the Bronies’ barn, only to find it empty save for a group of followers. From there they will return to the village to find an attack underway, as the Bronies are displeased with the lack of homemade garments, and think they need to teach the Neutral Amish that they are serious. There the final battle will take place. ',
		edition: 5,
		gameDate: '2075',
		name: 'Friendship Is Tragic',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2015-04'],
		sku: ['SMH201501'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Louis Gilbertson has a problem—a big problem.\nSeven years ago his father passed away and left him sole owner/proprietor/promoter of GameCon, the largest of the few remaining independent gaming conventions in the world. At first, he was honored to carry on his father’s legacy, as Gilbertson is a lifelong gamer nerd himself who learned about gaming and the industry from his father, Louis Senior. For the first five years after Louis Senior’s death, no one could touch GameCon. Various corporate sponsors and gaming companies continued to flock to GameCon as they had in decades past, using it to showcase their latest products.\nHowever, since Louis Senior’s death, there’s been a small shadow-war between GameCon and upstart rival DarkestShadowCon. So far, Gilbertson and GameCon have been able to hold DarkestShadowCon at bay (barely) by keeping its numbers up. However, that hasn’t stopped DarkestShadowCon from engaging in a bit of sabotage augmented with numerous smear campaigns and flame wars on the Matrix. While their attendance numbers are higher than ever, GameCon has barely broken even monetarily over the last three years after dealing with DarkestShadowCon’s shenanigans.\nNow it seems DarkestShadowCon is poised to deliver a coup de grace. ',
		edition: 5,
		gameDate: '2075',
		name: 'UnCONventional Warfare',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2016-04'],
		sku: ['SMH201601'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Sid Gambetti contact the runners to meet him at the Hawthorne Grill to discuss a job. Once the team arrives at the restaurant, Sid lays out the details of the run and negotiates. The team is to meet with two clients near an MCT Research Facility for an extraction. Once they are secured, the team and clients are to go to the nearby docks to escape via boat. At the end of negotiations, the restaurant gets robbed with the team still inside.\nThe team loads into a VTOL commuter aircraft and begins the trip to a remote coastal town in Chile. The VTOL stops to allow the runners to parachute to the rendezvous coordinates, drawing the Chilean force’s attention. After the runners parachute out of the plane, it is hit with a missile and spirals out of control. Pieces of the VTOL break apart and smash into containment biodomes outside of the MCT Research Facility—freeing dangerous research specimens into the night.',
		edition: 5,
		gameDate: '2075',
		name: 'Scene It All Before',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2017-04'],
		sku: ['SMH201701'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: "Killing the competition is no longer a figure of speech...\n\nThe boardrooms become war rooms as the movers and shakers shift their fights from the stock exchange to the streets. Using everything from military-scale assaults on ultra-secure company compounds to stealth missions and sabotage, the fat cats have gone to war. Dunkelzahn's will made the head of security for Fuchi Industrial Electronics a voting member of Renraku's board of directors – and all hell broke loose. Now Fuchi is in a civil war that may destroy the corporation. Renraku is under siege on every front and must turn to an old enemy to survive, as Ares goes on the offensive to purge itself of traitors. Even minor-leaguer Yamatetsu must fight its way out of Japan when a metahuman takes over the helm.\nThe most desired asset in this upheaval isn't a stack of stocks or a portfolio of investments, but a professional shadowrun team willing to keep its mouth shut and do the job.",
		edition: 2,
		gameDate: '2057-08',
		name: 'Blood in the Boardroom',
		names: {
			'de-DE': 'Konzernkrieg'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1998',
			'2010-06-06'
		],
		sku: [
			'7327',
			'10737'
		],
		type: 'scan'
	},
	{
		category: 'mission',
		description: "Dark Angel\nMusic worth dying for.\n\nWhen the only known recording of a late, great street musician appears in the hands of a major record company, it's up to the runners to find out the truth.\nJust what was that corp willing to do to get that recording?",
		edition: 2,
		gameDate: '2051',
		name: 'Dark Angel',
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1993-12',
			'2012-11-16'
		],
		sku: ['7313'],
		type: 'ocr'
	},
	{
		category: 'mission',
		description: "One False Step...\n...& the Fat Lady Sings!\n\nWhen Mr. Johnson hires shadowrunners to discover the brains behind repeated attempts to sabotage a major corporation's latest acquisition, their first wrong move could be their last.",
		edition: 2,
		gameDate: '2053',
		name: 'One Stage Before',
		names: {
			'fr-FR': 'Des Pourris et des Ombres'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Descartes Editeur'
		],
		releaseDate: [
			'1992',
			'1996-11'
		],
		sku: [
			'7312',
			'4775'
		],
		type: 'scan'
	},
	{
		category: 'mission',
		description: 'Renowned as a land of wonders, Tir Na Nog brims with ancient elven art and sophisticated elven nobles, powerful magic and cutting-edge technologies. But beneath this cultured facade lies a dark mix of long-simmering feuds and Machiavellian plots. Now add a dash of good old UCAS politics, and you have a Byzantine brew of betrayal and bloodshed, a Mickey Finn with a lethal kick.',
		edition: 2,
		gameDate: '2053',
		name: 'Celtic Double-Cross',
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: ['1993'],
		sku: ['7315'],
		type: 'ocr'
	},
	{
		category: 'mission',
		description: 'URBAN BRAWL\n\n"TWO BALLS, TWO GOALS, AND ABOUT THREE THOUSAND ROUNDS OF ARMOR-PIERCING AMMUNITION!"\n\nSome call it the ultimate game, the supreme test of cunning and strength. Others find it a barbaric blood sport, nothing more than barely contained mayhem that appeals to the most primitive blood lust lurking in the human psyche. For the shadowrunner, the world of Urban Brawl holds a Byzantine maze of betrayal, buried secrets, and sudden violence. So how about it are you ready to rock and roll with the big boys?',
		edition: 2,
		gameDate: '2054',
		name: 'A Killing Glare',
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: ['1993-01'],
		sku: ['7314'],
		type: 'scan'
	},
	{
		category: 'mission',
		description: "Ever try to find someone in the Sprawl?\nSorta like findin' a smooth spot on a troll.\nNevertheless, someone needs to be found, and fast.\nIt's hid and seek, search and destroy.\nThink you can handle it, shummers?",
		edition: 1,
		gameDate: '2051',
		name: 'Ivy & Chrome',
		names: {
			'fr-FR': 'La Dame de Cœur'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Descartes Editeur'
		],
		releaseDate: [
			'1991-05',
			'1995-04'
		],
		sku: [
			'7311',
			'2-7408-0103-3'
		],
		type: 'scan'
	},
	{
		category: 'mission',
		description: "The word is out, chummer. If you want blazing rock and roll, there's only one band to see: The Elementals. The buzz is they're about to become the next local band hit the big time\nThere's just one problem. The elementals have broken their recording contract, and in the world of corporate domination, nobody goes solo.\nThe runners' job? Find the band and bring them home. Alive.",
		edition: 1,
		gameDate: '2051',
		name: 'Total Eclipse',
		names: {
			'fr-FR': 'Eclipse Totale'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Descartes Editeur'
		],
		releaseDate: [
			'1991-11',
			'1993-01'
		],
		sku: ['7308'],
		type: 'scan'
	},
	{
		category: 'mission',
		description: "Dragon Hunt\n\nIn this Shadowrun adventure, the shadowrunners are hired to find a lost identity. The only problem is that some of the biggest corporations in Seattle don't want it found. Hide and seek, cross and double-cross, a dragon's deeds and desires… Ah, business as usual in the shadows…",
		edition: 1,
		gameDate: '2051',
		name: 'Dragon Hunt',
		names: {
			'de-DE': 'Drachenjagd',
			'fr-FR': 'Tirez sur le Dragon'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Descartes Editeur',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1991-03',
			'1993',
			'1995',
			'2010-06-07'
		],
		sku: [
			'7307',
			'7441',
			'10721'
		],
		type: 'scan'
	},
	{
		category: 'mission',
		description: 'Elven Fire\n\nGang violence strikes at the heart of Seattle.\nWhat are they?\nNight after night, senseless violence and destruction turn the metroplex into a war zone.\nWhat do they want?\nBy day, citizens move quickly from place to place, alert for the first signs of danger. By night, they hide where they feel safe, praying that the only death they see before dawn is on the trideo.\nHow can they be stopped?\nTonight, the streets run with blood. Elven Fire is an adventure for Shadowrun.',
		edition: 1,
		gameDate: '2053',
		name: 'Elven Fire',
		names: {
			'fr-FR': 'Elven Fire'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Descartes Editeur'
		],
		releaseDate: [
			'1992-01',
			'1996-01'
		],
		sku: ['7310'],
		type: 'scan'
	},
	{
		category: 'mission',
		description: "GREAT BRITAIN AWAITS!\n\nThere's bound to be trouble when Seattle-based shadowrunners are imported to take care of business in the United Kingdom. A valuable employee of one of Britain's largest megacorporations may be missing, and Transys Neuronet will be damned if they're going to let anyone on their side of the pond know about it.\nThe search takes the runners through Scotland, the city of Edinburgh, and to darker corners of the Matrix than they ever dreamed existed. It's a complex puzzle of betrayal, friendship, isolation, hatred, blinding love, vengeance, and, in the most bizarre twist of all - life after death.",
		edition: 2,
		gameDate: '2053',
		name: 'Imago',
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1992',
			'2011-07-22'
		],
		sku: ['7309'],
		type: 'scan'
	},
	{
		category: 'mission',
		description: "THEY SAY THE EYE RETAINS THE IMAGE OF THE LAST THING IT SEES...\nAccording to some, parts is parts. But when one of those parts contains a motive for murder, betrayal. And corporate espionage, can a shadowrun be far behind?\nEye witness takes a team of shadowrunners on a quest for justice across Deattle, into the boardroom of a corrupt corp, the darkest corners of the sprawl's slums, and the noxious depths of Seattle's underworld.",
		edition: 2,
		gameDate: '2055',
		name: 'Eye Witness',
		names: {
			'fr-FR': 'Témoin Oculaire'
		},
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: [
			'1994',
			'1997-07'
		],
		sku: ['7316'],
		type: 'ocr'
	},
	{
		category: 'mission',
		description: 'It used to be simple, right? When you went out into the wild, if you ran into something that didn’t like you much, you mainly worked to steer clear of the business end of their claws and teeth. Maybe there were a few spitters or stingers out there, but not many, and a lot of them weren’t too nasty. But that was then, before the Awakening.\nNow, there are critters out there that can mess with your mind, that can breathe fire, and that can freeze you with their gaze or hurt you with their scream. And you might come after them with fire, ice, or good, old-fashioned bullets, and they might shrug your attack right off. Maybe you think you can avoid them—stay in the city and out of the wild. Nope, because in a lot of places, the city is the wild. The critters are there, and they’re waiting for you.',
		edition: 3,
		gameDate: '2057-09',
		name: 'Predator and Prey',
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: ['1998'],
		sku: ['7324'],
		type: 'ocr'
	},
	{
		category: 'mission',
		description: "You've got a choice —\nfight back or get out of the way!\n\nShadows of the Underworld is a collection of five Shadowrun adventures, set against the chaos of the United Canadian and American States Presidential election of 2057. The runners get entangled with everything from political agents to fanatical cults, from a gun fight on the top of New York City's most famous building to the secret world of Oakland's metahuman underground. Shadows of the Underworld is intended for gamesters and players of all experience levels.",
		edition: 2,
		gameDate: '2057-05',
		name: 'Shadows of the Underworld',
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1996-12',
			'2010-07-17'
		],
		sku: ['7323'],
		type: 'scan'
	},
	{
		category: 'mission',
		description: "Struggle in the sprawl!\nCan the death of one man forever change the balance of power in the shadowy underworld of Seattle? Can one man's death spark a blaze of violence guaranteed to burn everyone from the lowliest chip dealers to the CEOs of megacorps? When the dead man is Don James O'Malley, head of Seattle Mafia, the answer is yes. There's infighting in \"the Family\", and every other syndicate is determined to take advantage of the chaos to grab themselves a bigger share of the nuyen. As the Triads battle the Yakuza for control of Seattle's docks, the Mafia defends its upscale gambling dens agains the Yakuza attacks--and the Seoulpa Rings take over anything that's not nailed down. The Seattle underworld has erupted in violence and no one is safe from the...\n...MOB WAR!",
		edition: 2,
		gameDate: '2058-01',
		name: 'Mob War!',
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: ['1997'],
		sku: ['7326'],
		type: 'scan'
	},
	{
		category: 'mission',
		description: "SCUM GO ON SHADOWRUNS - YOU ACCEPT MISSIONS\nFor every shadowrunner in the sprawl, there's someone like you working the other side of the shadows. Your kind try to make a difference. As part of a DocWagon High Threat Response team, you've been on the receiving end of a firefight while trying to retrieve a client. You might wear the Lone Star badge, with orders to go undercover into the shadows you've sworn to eliminate. You may owe your loyalty to a corporation, proud to defend its secrets and assets from others who are ready and willing to take you down. As a reporter, you are committed to exposing those same secrets. If you love your country above all else, you may have dedicated your life to work for your government, ready to perform any task required.\nMissions is a collection of four Shadowrun adventures that allow players and gamesters to experiment with the alternate campaigns presented in the Shadowrun Companion: Beyond the Shadows. In these adventures, the players can play a DocWagon High Threat Response team, Lone Star undercover police, corporate security agents, government commandos or even a media investigative team. Missions includes suggestions for translating these adventures into campaigns and for incorporating an existing shadowrun team into these adventures. Missions in intended for gamesters and players of all experience levels.",
		edition: 2,
		gameDate: '2058',
		name: 'Missions',
		names: {
			'pl-PL': 'Misje'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'ISA Sp. Zoo'
		],
		releaseDate: [
			'1996',
			'2000'
		],
		sku: [
			'7325',
			'00100304'
		],
		type: 'scan'
	},
	{
		category: 'mission',
		description: "VOTE EARLY! VOTE OFTEN!\nVOTE THE WAY THE TROLL WITH THE GUN WANTS YOU TO!\nSure, running against the corps is hard. But there's nothing in this world slimier, colder and deadlier than taking a run for some political slag. You're pawns, toys, nice at the mercy of a fat and nasty cat. They say never trust a dragon - I say never trust a politician.\nSuper Tuesday is a collection of five Shadowrun adventures set during the chaotic United Canadian and American States Election of 2057. From breaking into Bug City, to stopping a psycho toxic shaman on a death mission, to tangling with a secret society on a quest for a magical talisman, the player characters find out what it means when politicians enter the shadows.",
		edition: 2,
		gameDate: '2057-05',
		name: 'Super Tuesday!',
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1996-12',
			'2011-08'
		],
		sku: ['7322'],
		type: 'scan'
	},
	{
		category: 'mission',
		description: "To the corporations, everything's an asset to be charted., inventoried, and maintained. Everything is accounted for - even people. But what happens when a particular asset - namely an eight-year-old boy - becomes a pawn in a messy piece of corporate extraction? That's up to the Shadowrunners to decide. Unfortunately, all the firepower and magic in teh world won't help solve the problem.",
		edition: 2,
		gameDate: '2055-07',
		name: 'Divided Assets',
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: ['1994'],
		sku: ['7318'],
		type: 'ocr'
	},
	{
		category: 'mission',
		description: "A run in Hawai'i, paradise of sun and surf, should be the answer to every shadowrunner's dream. But when runners need to track down a piece of valuable, stolen tech in the island kingdom, they find that bright, cheerful Hawai'i hides dark intrigues and darker dangers.",
		edition: 2,
		gameDate: '2054',
		name: 'Paradise Lost',
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1994',
			'2011-06-25'
		],
		sku: ['7317'],
		type: 'ocr'
	},
	{
		category: 'mission',
		description: "Harlequin's Back…\n…and the world may never be the same!\nIt's long been said that trouble follows Harlequin around like a loyal dog, but this time he's taking the lead and dragging some shadowrunners along on his waking nightmare. It's clear that the level of magic is rising in the Sixth World, and bigger magic makes the world a more dangerous place. But the particular danger Harlequin's worried about isn't supposed to be a problem for another two thousand years…",
		edition: 2,
		gameDate: '2055',
		name: "Harlequin's Back",
		names: {
			'de-DE': 'Harlekins Rückkehr'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Catalyst Game Labs'
		],
		releaseDate: [
			'1994-12',
			'1996',
			'2010-11-24'
		],
		sku: [
			'7320',
			'10729'
		],
		type: 'scan'
	},
	{
		category: 'mission',
		description: "The recently formed organization known as Project Hope has embarked on a seemingly imposible task of restoring life and prosperity to the Glow City region of the Redmond Barrens. To achieve its noble goal, Project Hope uses the resources of a community largely ignored by society: Seattle's teeming homeless population. Through a well-orchestred procedure, the homeless and destitute can apply at the Project's downtown Seattle office for admission to one of Project Hope's ten relief campos. For those down on their luck, the lure of free food and shelter and the chance to join a prospering new comunity far outweight the hard work demanded of them and the risks of living in the Glow City neibrhood.\nOf course, nothing is as it seems. Behind Project Hope's benevolent community-work camps and free medical services lies a deception of nightmarish propositions involving Renraku Computer Systems, the Universal Brotherhood, and a powerful Ant Queen.",
		edition: 2,
		gameDate: '2055-08',
		name: 'Double Exposure',
		names: {
			'fr-FR': 'Glow City Blues'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Descartes Editeur'
		],
		releaseDate: [
			'1994-12',
			'1998-09'
		],
		sku: ['7319'],
		type: 'scan'
	},
	{
		category: 'misc',
		description: 'Sprawl Maps contains 8 new, full-color maps of sites in the sprawl, including a monorail/subway station, a warehouse, a park, low- and no-rent apartments, a street, and a nightclub.',
		edition: 2,
		gameDate: '2053',
		name: 'Sprawl Maps',
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: ['1994'],
		sku: ['7401'],
		type: 'scan'
	},
	{
		category: 'misc',
		description: 'Shadowrun, Fifth Edition introduces some rule tweaks for shadowrunners and this guide will help you move from SR4 to SR5.',
		edition: 5,
		gameDate: '2075',
		name: 'Shadowrun 5th: Conversion rules',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2013-07-16'],
		sku: ['27CCG'],
		type: 'digital'
	},
	{
		category: 'misc',
		description: 'Shadowrun, Sixth Edition introduces some rule tweaks for shadowrunners and this guide will help you move from SR5 to SR6.',
		edition: 6,
		gameDate: '2080',
		name: 'Shadowrun 6th: Conversion rules',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2019'],
		sku: ['28CCG'],
		type: 'digital'
	},
	{
		category: 'misc',
		description: 'D.M.Z. is a game of urban comat in the near future. It is a future that may resemble your darkes nightmares or your deepest dreams. In the year of 2050, the integration of technology and the Human form has changed global society profoundly. It is a time of ultimate luxury for the rich and bottomless despair for the poor. Multinational corporations rule, their needs and desires overshadowing the wills of nations. In the streets, violence holds sway, with sybernetically enhanced wariors battling for control of buildings, blocks, and even cities. The police forces, now operated by corporate subcontractors, seek to maintain control. The slide towards anarchy see,s irrevocable.\nAt the same time, the very nature of the planet has changed, too. Magic has returned to the world in force, and with it, the rebirth of ancient races of Elves, Dwarfs, Orks and Trolls. But this is not one of the great civilizations of old; this is one of power and greed, of evil in the board room and anarchy in the streets. The animals of mithology have also returned to roam the Earth: Vampires, Ghouls, Gargoyles, Hell Hounds, and Dragons. With the return of magic, mankind once more remembers its ways and its uses. Magician flourish, exerting their influence equally in the corporate board rooms and on the streets.',
		edition: 1,
		gameDate: '2050',
		name: 'D.M.Z.: Downtown Militarized Zone',
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: ['1990-10'],
		sku: ['7111'],
		type: 'scan'
	},
	{
		category: 'misc',
		description: "BEST EVER\nAn Eighth World Adventure\nA product 45 years in the making! Though most of those years were concurrent!\n\nAs BattleTech celebrates its 25th anniversary and Shadowrun celebrates its 20th, the visionaries at Catalyst Game Labs have, for the first time ever, brought these two worlds together! Join us in a universe that combines the best of two fantastic game universes in a tournament to decide who is the best warrior of all time!\n\nMany warriors have fallen, and only four remain in the Best Ever Tournament: Kieran McCool, the wily immortal elf who pilots the most feared 'Mech on the battlefield; Asmodeal el Angel de la Muerte, the Manei Domini blood mage who is so evil that his mere presence destroys all photons in the immediate vicinity; Nadja Daviar, a refugee from the 21st century who has lost none of her wiles or extreme sex appeal; and newcomer Jonas Hadry, a MechWarrior and battlefield commander so charismatic and beloved that it seems that possibly the deck was a little stacked in his favor.\n\nThe Best Ever is a bold venture that bridges two universes. Exciting, visionary, and often a bit deranged, this is the project that no one was asking for but everyone will love!\n\nContains a summary of the new Eighth World setting, nine new character archetypes, and a roleplaying adventure that involves your characters in the excitement, glamor and sheer ludicrousness of the Best Ever Tournament.\n\nThe Best Ever is kind of compatible with Shadowrun, 4th Edition, and A Time of War: The BattleTech RPG, elbow grease to make fully compatible not included.",
		edition: 4,
		gameDate: '2070',
		name: 'BattleRun: Best Ever - An Eighth World Adventure',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2009-04'],
		sku: ['2635A'],
		type: 'digital'
	},
	{
		category: 'misc',
		description: 'Rules for convertion from 3rd to 4th edition.',
		edition: 4,
		gameDate: '2070',
		name: 'Shadowrun 4th: Conversion Rules',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2005'],
		sku: ['26CCG'],
		type: 'digital'
	},
	{
		category: 'misc',
		description: "High-Tech & Low-Life: The Art of Shadowrun brings to life the cyberpunk, neo-fantasy and science fiction elements of Shadowrun. It includes eight years worth of luminous interior pages and dramatic covers from FASA's futuristic roleplaying universe and, for the first time, assembles them in a single volume.\nThe work of many of the artists featured in this book also appeared in Spectrum, an annual compilation of the best of fantastic art, including Luis Royo, John Zeleznik, Doug Andersen, Brom, Rick Berry, Jim Nelson, Tom Baxa, Joel Biske, and Jeff Laubenstein.",
		edition: 2,
		gameDate: '2053',
		name: 'High Tech and Low Life: The Art of Shadowrun',
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: ['1997-06'],
		sku: ['7701'],
		type: 'scan'
	},
	{
		category: 'misc',
		description: 'We love riggers. We want them to have toys. But when we gathered the freelancers at the clubhouse (saltines are free, but bring your own beverage. And a chair), we quickly noticed that they were struggling to come up with ideas.\nThis puts us in a pinch. We thought we could try making our scary face at them to intimidate them into genius creativity, but we have been told in the past that our scary face looks like a mildly peeved newspaper delivery boy, so that wasn’t really going to get us anywhere. Besides, we like to offer carrots instead of sticks whenever possible. Though as we thought more about it, the whole concept of sticks seemed alluring. Maybe we could beat them into creativity!\nSo we set about them, making sure to work the torso and not leave any marks on their beautiful faces. After a while they started complaining that they’d really like to lie down for a while, so I broke out the sleeping bags and had them settle down on the clubhouse floor. I hoped that once they woke up, the genius would start flowing.\nAs you’ll see in these pages, our hopes were well and truly met—and then some. While this compilation may be slightly shorter than rigger books of past editions, we think you’ll agree that no rigger book in the history of Shadowrun has presented a series of vehicles and drones quite like this one. Only the right minds, treated the right way, could come up with the information this book contains. So it is with great pride that we present you: Rigger 4! Enjoy!',
		edition: 4,
		gameDate: '2075',
		name: 'Rigger 4',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2013-04'],
		sku: ['26APR13'],
		type: 'digital'
	},
	{
		category: 'misc',
		description: 'When developing Shadowrun, we come across all sorts of ideas. Good ideas. Crazy ideas. Ideas guaranteed to make us require yet more expensive psychotherapy bills. Yet we don’t believe there are bad ideas—only ideas that need the right outlet. Street Legends: Home Edition is our way of providing a place for those ideas that, in normal circumstances, leave us shaking our heads in confusion and/or despair.\nMeet an ork in a sequined white jumpsuit, a ninja elf stripper, a set of triplets with an unusual bond, and the most enthusiastic, cheerful shadowrunner you’ll ever meet. They may not be you’re typical runners, but they’re all legends—in the sense of, if you met them, you’d still have trouble believing they existed.',
		edition: 4,
		gameDate: '2072',
		name: 'Street Legends: Home Edition',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2012-04'],
		sku: ['26APR3p'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'A girl is missing. Finding her would be a nobler mission than most shadowrunners normally pursue, which means there must be a catch. And there is. The runners’ job starts at a talismongers and then brings them to a Barrens orphanage. If they’re observant enough, they’ll be launched on a journey that will take them through dark tunnels, past dangerous entities, and, eventually, to a supposedly abandoned building that holds at least two dark secrets. If they’re lucky, they’ll find Ruth alive. If they’re unlucky, they’ll find her alive and transformed.',
		edition: 4,
		gameDate: '2072',
		name: 'Brothers United (Artifact Rush, Part 4)',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2012-05'],
		sku: ['SRM04-08'],
		type: 'scan'
	},
	{
		category: 'mission',
		description: 'If constant friction makes things hot, then the Ork Underground is ready to blaze. Proposition 23, known to some as “Project Freedom,” is coming closer to a vote, and it could make the Ork Underground a full district of the city of Seattle. People on both sides are willing to do just about anything to make the vote go their way, and they’re demonstrating that willingness with blades, bullets, explosives, and more. This has become more than a fight for votes—it’s a struggle for survival.',
		edition: 4,
		gameDate: '2072',
		name: 'Burn (Buried Underground, Part 4)',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2012-02'],
		sku: ['SRM04-07'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'A missing shadowrunner. An artifact with mysterious, blood-fed powers. And astral beings with horrible grudges. All of these elements—and more—are coming together to give shadowrunners a long day and a longer night, as they move from trying to find what has been lost to struggling for their survival. And with what they’re up against, survival would be a very notable accomplishment.\nWhether you have played previous Missions in Season Four or are just now diving into this plotline, SRM 04-10: Romero and Juliette provides a test for any group of shadowrunners while also increasing the intensity of the hunt for artifacts in Seattle. This one will give runners a story to tell over the next round of drinks, as long as they an stay alive long enough to buy one.',
		edition: 4,
		gameDate: '2072',
		name: 'Romero & Juliette (Artifact Rush, Part 5)',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2012-09'],
		sku: ['SRM04-10'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'The debate over the future of the Ork Underground is heating up. Proposition 23, which will decide whether or not the Underground becomes an official district of the city of Seattle, is coming up for a vote, and people on all sides are getting desperate. There are those, though, who understand that desperation can breed opportunity, and they are hatching plots that can help them take advantage of the chaos that is sure to rain down on the city. And there are others for who chaos is an end in and of itself.',
		edition: 4,
		gameDate: '2072',
		name: 'Assassin Nation (Buried Underground, Part 5)',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2012-08'],
		sku: ['SRM04-09'],
		type: 'scan'
	},
	{
		category: 'mission',
		description: 'The Sixth World is full of dark crevasses and corners where people can hide. Where they can go when the rest of the world has told them they don’t belong. Where they can be forgotten. People who disappear into these places become secrets, whispered threats of a mysterious something that lurks just out of sight.\nSome people—the normal ones, the sane ones—avoid these dark corners and any danger they might be hiding, but shadowrunners don’t have that choice. The dark corners are where they live. So when Mr. Johnson needs some information that’s hidden in one of these places, you know that he’s not going after it himself. He’ll send some runners instead and let them deal with whatever might be waiting for them.',
		edition: 4,
		gameDate: '2072',
		name: 'Hard Target (Artifact Rush, Part 3)',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2012-01'],
		sku: ['SRM04-06'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Whoever wins the war for the future of the Ork Underground is not going to leave a single weapon holstered. From waging outright violence to employing political subterfuge, both sides in the struggle are willing to use any tactics they can dream of to advance their cause.\nAnti-metahuman sentiment has long been a hot-button issue in Seattle, and some members of the Ork Rights Committee have decided to expose one of Governor Brackhaven’s cronies for the racist they believe him to be. The only trouble is, people with a high public profile are usually very careful about keeping up appearances. If the ORC is going to support their accusations of racism, they may need some help in getting—or manufacturing—the evidence they need. That, of course, is where shadowrunners come in.',
		edition: 4,
		gameDate: '2072',
		name: 'Rally Cry (Buried Underground, Part 2)',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2011-07'],
		sku: ['SRM04-03'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Parker Acson is a hot property. Horizon has just hired him, but they’re the only ones who want him. Acson has gotten the attention of plenty of players in the magical arena, and several of them are interested in getting a piece of him. The runners have been hired to extract Acson by a mysterious Mr. Johnson, and they’re going to have to move quickly to get him out safely. There is plenty of competition out there, and not all of them are interested in Acson staying alive and intact.',
		edition: 4,
		gameDate: '2072',
		name: 'Extraction (Artifact Rush, Part 1)',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2011-05'],
		sku: ['SRM04-02'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: "A year ago your fixer's daughter was killed by the Mayan Cutter copycat. He always suspected that someone else was pulling the strings, someone highly placed. Now he believes he has proof, but that someone isn't going down without a fight. The stakes are higher than ever aand someone's trying to stop you before you even start! Are you ready to serve up a side of revenge?",
		edition: 4,
		gameDate: '2072',
		name: 'On A Silver Platter (Artifact Rush, Part 3)',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2011-12'],
		sku: ['SRM04-05'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Crossing the border into Salish-Shidhe territory is not easy under the best of circumstances. Crossing when you’re carrying an item that lights up the astral plane like a phosphorus bomb is even trickier. But the stakes are rising in the fight over magical artifacts that keep finding their way into the Seattle area, and that means the possible payouts are going up as well. If you can play the role of a smuggler to the hilt and make all the right contacts, you have the chance for a serious payday. Of course, you also stand a good chance of making some very powerful enemies, but isn’t that always the way?',
		edition: 4,
		gameDate: '2072',
		name: "Smuggler's Blues (Artifact Rush, Part 2)",
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2011-09'],
		sku: ['SRM04-04'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'When the campaigning is done, the debates are over, and the voters are heading out to cast their votes, it’s time for the final push. Whether you’re fighting for a particular candidate or a specific cause, you don’t want to feel like there was more you could have done, that there was one more gambit you could have pulled to put your side over the top. Now is your final chance to make a difference before the votes are counted.\nIt’s Election Day in Seattle, and there’s plenty up for grabs, including the future of the Ork Underground. The power players of the sprawl want things to go their way—whatever way that may be—and they’re not pulling any punches. They’re dumping out their bags of tricks, and naturally some of those tricks involve giving money to shadowrunners. Whether they’re being asked to start riots between voters or find an operative who is sitting on too many secrets, they’re going to have a busy day, and their actions will shape the future of Seattle. With any luck, they’ll be alive to see it.',
		edition: 4,
		gameDate: '2072',
		name: 'Election Day (Buried Underground, Part 5)',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2012-11'],
		sku: ['SRM04-11'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'When the curtain goes up on a shadowrun in Chicago, you never know who’s going to take the stage. There are all sorts of creepy players out there, ghouls and gangers and more, and once the overture’s done, runners better be ready to dance with whoever emerges, with the rat-a-tat-tat of bullets keeping time.\nThe cast of characters in this mission includes a good-hearted street doc looking to expand, a pit-fighting elf, a pugnacious gang leader with an historical bent, and one of the oddest tribal gatherings ever seen inside a major sprawl. That’s not all, of course—what would a good shadowrun be without a few surprise guests? Runners will have plenty to keep them on their toes, and hopefully by the end they’ll have moved up a spot or two in the Chicago shadowrunner cast list. Assuming, of course, that they haven’t dropped six feet under.',
		edition: 5,
		gameDate: '2075',
		name: "Critic's Choice",
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2014-04'],
		sku: ['SRM05-02'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'It’s been nearly twenty years since disaster struck the city of Chicago, transforming it into an urban hellscape, and some people now believe it’s suffered enough. The Governor of Illinois has initiated and ambitious plan called Project: Takeback to reclaim the feral urban jungle. What’s more, he’s put money into the effort, and that’s the language every corporation on Earth understands. Suddenly, the race is on as the megacorps scramble to claim pieces of the Windy City. They’ll be butting up against the dangers of the Containment Zone and each other, so they’re going to need all sorts of deniable assets. The shadows of Chicago are coming back to life.',
		edition: 5,
		gameDate: '2075',
		name: "Chasin' the Wind",
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2013-09'],
		sku: ['SRM05-01'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Every shadowrunner knows the fear that comes with the words “milk run.” Anytime something is supposed be easy in the Sixth World, it’s guaranteed to come with unexpected headaches and danger, and that holds especially true for Chicago. Lothan the Wise, an egotistical troll mage who is extra irritating because he has the skills to back up his braggadocio, says he has a simple job. There’s no question that things will get more complicated than he expects—the only question is how things will go wrong, and which of the dangerous denizens of the feral sprawl will leap up to cause trouble. Runners will have to be fast, flexible, and able to think on their feet—but isn’t that part of the basic job description anyway?',
		edition: 5,
		gameDate: '2075',
		name: 'Liberation',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2014-12'],
		sku: ['SRM05-04'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'This isn’t your first run in Chicago. You may not know every street corner and alleyway, but you know the sprawl well enough that when someone tells you they’ve got a job that “should be easy”—well, it won’t be. It never is. So when you’re offered some money to go retrieve personal items left behind in a pharmaceutical office back before the whole town went to hell, you know you’re going to be dealing with more than dust and a few rats. Once you venture into the Containment Zone, something—probably more than one thing—is going to try to kill you. Not in some vague future, but right now. But you know that about Chicago. You’re ready for something to come after you, and you know that part of the fun is finding out just what it is.',
		edition: 5,
		gameDate: '2075',
		name: 'Gone Long Gone',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2014-08'],
		sku: ['SRM05-03'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: "The players are lined up. The goals are clear. The waiting is over. The ultimate rush is beginning, and it’s going to pull a lot of dangerous elements closer and closer together until they explode.\nThe shadows of Seattle have been heaved this way and that in the Great Seattle Artifact Rush, and a fair number of artifacts have been collected (in exchange for a handful of deaths and a helping of destruction). The powers of the magical world have been alerted, and they ready to get their hands on as many artifacts as possible. This means shadowruns, which means plenty of runners are about to be caught up in one of the worst mana-based drek-storms to hit the city in a long while.\nWhat starts as an investigation into a museum heist rapidly grows into a conflagration that could consume a good part of the sprawl. Clever players will need to see if they can survive, and how much nuyen they can wrangle out of the fight. Hopefully they'll get enough for a nice vacation or significant medical treatment, because chances are that they're going to need both.",
		edition: 4,
		gameDate: '2072',
		name: 'Showcase (Artifact Rush, Part 6)',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2013-02'],
		sku: ['SRM04-12'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'If the Ork Underground is going to become an official district in Seattle, it’s going to need some cleaning up. Even if it’s not, some of the criminals down there have a pesky habit of bringing their activities to the surface, and plenty of people want them eliminated. Seattle law enforcement has had enough, and ADA Dana Oaks is determined to bring down some of the higher-profile criminals of the Underground—starting with a mob enforcer who goes by the name of Junior.\nCriminals in the Underground don’t go down easy, though, and shadowrunners are going to have to use all their skills to track Junior down. When they find him, they might discover that their task isn’t quite as straightforward as they may have thought.',
		edition: 4,
		gameDate: '2072',
		name: 'Hiding in the Dark (Buried Underground, Part 1)',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2011-03'],
		sku: ['SRM04-01'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'A little milk run like this should be no problem. Though, it sounds like you don’t get much time. Non-lethal rounds and no legal complications makes these “security consultant” gigs the best in the Big Apple.\nMr. Johnson wants someone to test his security systems. Everything should be perfectly routine and above board. After all, things never go horribly wrong during a shadowrun, right? No reason to have any back-up plans ready for this. It’s all just wonderfully straightforward. What’re you giving me that look for? This 25-page scenario includes a complete adventure, player handouts, and record handling sheets for participating in the Shadowrun Missions (SRM) campaign.',
		edition: 4,
		gameDate: '2070',
		name: 'Monkeywrench',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2009-08'],
		sku: ['SRM03-04'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'The voice on the other end of the comm sounded desperate. The kind that pays well. Then he asked, “How much do you know about demolitions?”\nMr. Johnson is at the end of his rope, and he needs some serious income. He latches onto a desperate and tragically dangerous scheme that just might get him what he needs, though it might cost hundreds of lives in the process. The team needs to decide if the pay is worth the risk and the ethical quandry. This 27-page scenario includes a complete adventure, player handouts, and record handling sheets for participating in the Shadowrun Missions (SRM) campaign.',
		edition: 4,
		gameDate: '2070',
		name: 'Burning Bridges',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2009-06'],
		sku: ['SRM03-03'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Defend a truck – What could possibly go wrong?',
		edition: 4,
		gameDate: '2070',
		name: 'Jackknifed',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2010-01'],
		sku: ['SRM03-06'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: "A stool pigeon is ready to name names. Mr. Johnson wants to make sure they're the right names. He needs you to break into the NYPD Inc. holding facility and deliver a message. This 25-page scenario includes a complete adventure, player handouts, and record handling sheets for participating in the Shadowrun Missions (SRM) campaign.",
		edition: 4,
		gameDate: '2070',
		name: 'In and Out',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2009-11'],
		sku: ['SRM03-05'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'What starts as a petty fight could degenerate to a full-scale war. When things are turning sour who said mediators had to be neutral?\nA fixer hires the team for what seems like little more than a complicated prank. However, sometimes, people have a hard time keeping their vengeance proportionate. When two veterans of the business conflict enter the fray, the team needs to make some hard choices. In not time, things go from humorous to deadly. This 26-page scenario includes a complete adventure, player handouts, and record handling sheets for participating in the Shadowrun Missions (SRM) campaign.',
		edition: 4,
		gameDate: '2070',
		name: 'Block War',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2009-05'],
		sku: ['SRM03-02'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'By 2070, life literally imitates art. Some people have a fetish for it and it’s your job to see that it’s delivered and still breathing.\nThe team is forced to confront the challenges of Manhattan security, when Mr. Johnson asks them to perform a major heist. From there, things spiral into a double helix of complexity as motivations are abruptly twisted. This 24-page scenario includes a complete adventure, player handouts, and record handling sheets for participating in the Shadowrun Missions (SRM) campaign.',
		edition: 4,
		gameDate: '2070',
		name: 'Ready, Set, Gogh!',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2009-04'],
		sku: ['SRM03-01'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Sometimes following up on a job really means following. You’ve been hired to track down an old acquaintance who’s fled across the continent.\nIn the first scenario of the New York City Shadowrun Missions campaign, characters are introduced to the challenges of running among the bright lights of Manhattan. Provisions allow characters who participated in the Denver campaign to transition their characters to this new location. This 25-page scenario includes a complete adventure, player handouts, and record handling sheets for participating in the Shadowrun Missions (SRM) campaign.',
		edition: 4,
		gameDate: '2070',
		name: "Everyone's Your Friend",
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2009-03'],
		sku: ['SRM03-00'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Eight teams escorting eight Damien Knights. Will the real Damien Knight please stand up.',
		edition: 4,
		gameDate: '2070',
		name: 'Knight At The Opera',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2010-02'],
		sku: ['SRM03-07'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'It’s a simple job: find a missing girl. Of course, nothing is ever simple in the shadows, and a whole lot of people seem to be interested in this job for one reason or another.\nWelcome to Season Four of the Missions Campaign, which returns home to the Emerald Sprawl, Seattle. Biz is good as a political fight is brewing to determine the fate of the vast Ork Underground, and everyone seems to be fighting over the mysterious artifacts flowing into the city. If you’re going to get through this, remember the basics: Shoot straight, watch your back, and never, ever deal with a dragon. Oh, and collect a hefty payday along the way!',
		edition: 4,
		gameDate: '2072',
		name: 'Back In Business',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2011-01'],
		sku: ['SRM04-00'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'You’ve had quite a time in the Rotten Apple—you’ve seen some weird people, done some strange things, and made some narrow escapes. Hopefully you’ve made some friends, and most likely you’ve made some enemies. But a strong wind getting ready to blow through town, and it just might take you away with it. Just make sure you leave alive.\nElevator Ride to Hell concludes the Manhattan series of Missions, giving the Big Apple a dramatic sendoff. The adventure contains character stats, maps, and everything you need to plunge a group into the treacherous heart of New York. So jump on, press the “close door” button, and get ready for a ride that might hurdle clever runners to the peak of Manhattan fame—or slam them to the ground in a burning, wrecked hulk.',
		edition: 4,
		gameDate: '2070',
		name: 'Elevator Ride to Hell',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2010-11'],
		sku: ['SRM03-12'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'As any artist will tell you, the art scene can be brutal, especially in a high-octane setting like Manhattan. There are plenty of horror stories to go around—but none of them can touch what’s about to go down at the Guggenheim.\nIn this Mission, Shadowrun players will find themselves in the middle of an art opening unlike any other, with chaos and screaming and dancing statues. Unless they keep their wits about them, the latest masterpiece in the museum will be painted in blood—and to make things worse, if they can’t defuse the situation, they might not get paid.',
		edition: 4,
		gameDate: '2070',
		name: 'Something Completely Different',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2010-08'],
		sku: ['SRM03-09'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: "It's the Easy Ones that Get You.\nIf you've survived enough runs, you know that the ones that sound easy are the ones that get you. And what could be easier than recovering a runaway drone?\nAs it turns out, plenty. The drone is acting strangely--strange enough that two megacorporations are interested in its fate. And there are others, who are no fans of the megacorps, who have got the scent of what's going on as well. The chase for the drone is putting a lot of people on a crash course, and when they collide, guns are going to come out. Can you survive the crossfire?",
		edition: 4,
		gameDate: '2070',
		name: 'Firestorm',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2010-07'],
		sku: ['SRM03-08'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'People die every day. People without SINs die even more frequently. That’s not news. But when people without SINs are being poisoned, when it looks like they’re being targeted somehow—well, that’s no good. If someone’s going after people without SINs, that means the next target could be one of your contacts, or your fixer, or even you. \nThat would be incentive enough for most runners to look into this spate of poisoning, but Mr. Johnson’s got some cash to throw around, and maybe some hints of where to start looking. In Food Poisoning, runners have the chance to trace the spate of poisonings to its source, and to uncover the double-crosses and machinations behind all the deaths.',
		edition: 4,
		gameDate: '2070',
		name: 'Food Poisoning',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2010-10'],
		sku: ['SRM03-11'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Journalists have faced plenty of accusations of acting with a hive-mind mentality, but some covert operations in Manhattan are about to take things to a new level. What starts out for runners as a simple investigation into gang activities turns into an exploration of some of the city’s darkest secrets—the kind of things that tend to make anyone who finds out about them turn up dead. If the runners are going to survive this mission, they’re going to have to fight hard, make tough decisions, and possibly join forces with some unusual allies.',
		edition: 4,
		gameDate: '2070',
		name: 'Spin Control',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2010-09'],
		sku: ['SRM03-10'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'You build walls for two reasons: to keep things out, and to keep things in. Walls were erected around the Chicago Containment Zone many years ago, keeping people from the outside away from the dangers within, and locking secrets inside that are still waiting to be discovered. Though the longer they stay hidden, the clearer it is that some secrets don’t want to be found.\nIn the latest Shadowrun Mission, runners have a chance to solve one of the longest-standing mysteries of the Containment Zone, namely: What happened to Melissa Truman, the missing heir of a media empire? Digging up the right information will be hard enough, but if the runners are lucky and skilled enough to uncover the truth, they’ll have a harder question in front of them. What do they do with what they’ve found?',
		edition: 5,
		gameDate: '2075',
		name: 'Tick Tock',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2016-06'],
		sku: ['SRM06-04'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'For years, the Containment Zone of Chicago has held many levels of wrong. One level is the bad things that frequently happen there—the various assaults against CZ residents, and the people who go missing or turn up dead. That level of wrong is bad enough, but it gets worse for the people who are foolish enough to look into the reasons behind the wrongs. The scope and range of evil in the CZ is enough to warp even the most stable of minds, and only the desperate or deranged voluntarily look into the darkest corners of the sprawl.\nThat, of course, means that shadowrunners find themselves diving into those corners all the time, and another chance is about to come their way. A young woman has gone missing, and Becky 99, leader of the Desolation Angels, wants her found. The runners will face the challenge of digging through the darkness of the CZ to find this woman—and then living with whatever it is they discover.',
		edition: 5,
		gameDate: '2075',
		name: 'Ancient Rumblings',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2016-05'],
		sku: ['SRM06-03'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Tensions don’t simmer for long in the Sixth World. They build, and then they explode. In Chicago’s Containment Zone, that time has come. From the hunt for the missing Samantha Villiers (in her various guises) to rising gang tensions to mysterious strangers building power bases for secretive purposes, there are plenty of unstable reagents mixing in the CZ, and they’re about to blow. Shadowrunners are going to be right in the middle of it all—aren’t they always?—and they’ll have to see how many lives they can save. Including their own.',
		edition: 5,
		gameDate: '2075',
		name: 'Falling Angels',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2016-09'],
		sku: ['SRM06-06'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Chicago’s Containment Zone may be a hellish landscape where a formerly thriving sprawl turned into a nightmare, but it’s got this going for it—there’s sure a wide variety of runs there. Finding missing people? Check. Locating data in abandoned facilities? Check. Big game hunting? Time to add that one to the list.\nSome mysterious attacks have left some dead, badly mauled bodies behind, and people who care about life in the CZ want to find out what’s behind the attacks. In the best big game hunting tradition, they want the creature (or creatures, or whatever) brought back alive, the better to find out what’s happening, and why.\nThis is Chicago, though, so nothing is going to be easy, and nothing is going to be straightforward. The runners are going to need their full breadth of skills if they want to make at least one corner of hell a little safer.',
		edition: 5,
		gameDate: '2075',
		name: 'Healing the Sick',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2016-08'],
		sku: ['SRM06-05'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'The Chicago sprawl is host to all manner of strange creatures—ghouls, toxic spirits, hellhounds, barghests, and chickens. Yes, chickens. The city is mostly urbanized, but there are also large swathes of vacant land, and some enterprising souls have been farming that land. This is the Sixth World, though, which means that whenever you have someone trying something bold, you have a dozen other people thinking, "How can I use that to hurt other people?"\nThe runners are going to have some unusual jobs on this mission, including spreading some poisons and making sure innocent lives are spared (if they’re so inclined). They’ll have to be on their toes to steer clear of the authorities, get all the pieces of this particular scheme in place, and in particular answer the pressing question: Just what is Mr. Johnson up to?',
		edition: 5,
		gameDate: '2075',
		name: 'Amber Waves of Grain',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2016-01'],
		sku: ['SRM06-02'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'No matter what Mr. Johnson says, shadowrunners are never hired to do anything easy. If the job were easy, Mr. Johnson would do it himself. Sharp shadowrunners learn to recognize when a job is going to present extra challenges. There are certain signs, such as: 1) Mr. Johnson is openly auditioning multiple teams, both to find the right people and to set the auditioning parties on edge. 2) Mr. Johnson doesn’t seem too anxious to reveal relevant details of the job; and worst of all, 3) Mr. Johnson claims it will be easy.\nSarah Silverleaf has a job for the runners, but unfortunately all of the above criteria are met. Danger is waiting for the runners, and she’s not about to tell them what it is. They’ll have to walk in the dark, navigate the unknown, and survive whatever comes at them. Because that’s the job.',
		edition: 5,
		gameDate: '2075',
		name: 'Take a Chance',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2015-10'],
		sku: ['SRM05-06'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'One of the things the Sixth World excels at is inventing millions of ways to piss people off. Chicago, particularly the Containment Zone, has a special gift for inciting tempers, with its pockmarked roads, feral gangs, bad-tempered thugs, drugged-out vagrants, and many other elements that are irritating at best, fatal at worst.\nFight promoter Sid Gambetti has a lot of pressures piling on him at once, including financial strain and a massive blackmail demand, and if he doesn’t get some relief, he’s likely to blow. Unfortunately, it seems like just about everyone who has become involved with Sid is just as pressured and just as irritated. Any shadowrunners who take on the job that Sid has for them are going to be walking through a minefield of hot-tempered, bulked-out, Sixth World crazies who are just looking for an excuse to put the hurt on someone. Yeah, there’s a pile of nuyen on the other side of the gauntlet, but it will take some quick thinking and fast moving to claim it without being on the receiving end of huge doses of pain.',
		edition: 5,
		gameDate: '2075',
		name: 'While the City Sleeps',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2015-03'],
		sku: ['SRM05-05'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Darkness gathers in certain corners of the Sixth World, where no light can enter. The Containment Zone of Chicago has long been one of these dark spots, but government and corporate forces have combined their heft to bring some light to that benighted area, if only because they believe there is profit to be extracted. They have considerable powers at their disposal—but there is also considerable darkness pooled in the ruined sprawl. It will be a battle, and as usual, shadowrunners will be used as the front-line soldiers.\nIn this Mission, runners will be called to investigate the case of some missing people and stolen augmentations. Answers are not easy to come by in the CZ, but trouble is, and runners will encounter plenty. If they want to dig deep into the heart of what’s happening in the CZ, they better stay on their toes and ready for anything.',
		edition: 5,
		gameDate: '2075',
		name: 'Ten Fifty-Seven',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2015-12'],
		sku: ['SRM06-01'],
		type: 'digital'
	},
	{
		category: 'magazine',
		description: 'Although this is a magazine, the page numbering starts on the first page, excluding the covers.\nCover Art: Bottled Demon by John Zeleznik',
		edition: 2,
		gameDate: '2054',
		name: 'Shadowland #1',
		originalLanguage: 'en-US',
		publisher: ['other'],
		releaseDate: ['1995'],
		sku: ['SOK201'],
		type: 'ocr'
	},
	{
		category: 'magazine',
		description: "Index:\nCover (John Zeleznik)\nLunatic Fringe (Fiction - Phillip T. Adams)\nDrak's Drek (D. L. Knox)\nMcKissack's Chameleon (Critter - Andrew Ragland)\nGift Horse (Fiction - Erik Kjerland)\nA Runner's Guide to Magic (Background - Linda Naughton)\nThe Gross-Frankfurt Sprawl (city description - Jonathan Szeto)\nLearning and Improving Skills (Skill rules - Linda Naughton)\nPath of the Tiger (Totems - Gabriel Salazar)\nHeadaches: Social Animals (Adventure - Chris Hussey)\nThe Hermetic Lodge (Spells - Chris Hussey)",
		edition: 2,
		gameDate: '2054',
		name: 'Shadowland #2',
		originalLanguage: 'en-US',
		publisher: ['other'],
		releaseDate: ['1995'],
		sku: ['SOK202'],
		type: 'ocr'
	},
	{
		category: 'magazine',
		description: 'Three fiction articles, new gear, new spells, new groups and a new adventure.\nCover Art: Jeff Laubenstein',
		edition: 2,
		gameDate: '2054',
		name: 'Shadowland #3',
		originalLanguage: 'en-US',
		publisher: ['other'],
		releaseDate: ['1996'],
		sku: ['SOK203'],
		type: 'ocr'
	},
	{
		category: 'magazine',
		description: 'Table of Contents\nPg 3: The Shopping Mall (Gear, by Erik Jameson)\nPg 7: The Street Gang Compaign (Campaign suggestion, by Steve Kenson)\nPg 9: Serious Buckshot (Gear, By Kevin Montanaro)\nPg 12: 2056 Harley Davidson Ultra-Glide (Gear, By Kevin Montanaro)\nPg 13: The Ahvaz Diaspora (Magical phenomena, by Erik Jameson)\nPg 20: VatJob (Adventure, by Andrew Ragland)\nPg 46: A star is Dead (Andventure, by Chris Hussey)\nPg 52: Dead Air Novel excerpt, by Jak Koke)',
		edition: 2,
		gameDate: '2054',
		name: 'Shadowland #4',
		originalLanguage: 'en-US',
		publisher: ['other'],
		releaseDate: ['1996'],
		sku: ['SOK204'],
		type: 'ocr'
	},
	{
		category: 'magazine',
		description: 'This is the fifth issue of Shadowland, an official publication devoted to Shadowrun.\nCover: Jeff Laubenstein',
		edition: 2,
		gameDate: '2054',
		name: 'Shadowland #5',
		originalLanguage: 'en-US',
		publisher: ['other'],
		releaseDate: ['1996'],
		sku: ['SOK205'],
		type: 'ocr'
	},
	{
		category: 'magazine',
		description: 'Cover Art: Jeff Laubenstein',
		edition: 2,
		gameDate: '2054',
		name: 'Shadowland #6',
		originalLanguage: 'en-US',
		publisher: ['other'],
		releaseDate: ['1997'],
		sku: ['SOK206'],
		type: 'ocr'
	},
	{
		category: 'magazine',
		description: "The cover is not included in the page numbers.\nIndex:\nFront page (Mark Nelson)\n1 Index & Credits\n2 Download (Editorial - Chris Hussey)\n3 Expect the Unexpected (Fiction - Andrew Hamilton)\n6 Getting Physical (Physical Adept powers - Ken Sato)\n7 Friendship & Honor (Fiction - Steven Warnock)\n12 Gen Con Wrap-up\n13 Technobabel (Preview - Steven Kenson)\n15 Cyberpirates Preview\n17 The Knight Shift (Prime Runners - Unknown)\n28 The New Tools of Anti-Social Behavior (Firearms - Brian Downes)\n31 Gotcha! (Hit locations - Ben Zitterkoph, Jason Shockley)\n33 Nature's Shadows (Plant Totems - Anonymous)\n37 Nothing Personal - Just Business (Fiction - Jon Szeto)\n46 Shadowrun CCG List (Mike Mulvihill)\n49 High Noon (Fiction - Jay Fugiel)\n50 Way of the hunter (Physical Adept path, skills & powers - Jonathan Szeto)\n52 Hermetic Lodge (Spells - Chris Hussey)\n54 Newsline (News from the Shadowrun universe)\n55 Writer's Guidelines\n56 Shadowland Disclosure Form",
		edition: 2,
		gameDate: '2054',
		name: 'Shadowland #7',
		originalLanguage: 'en-US',
		publisher: ['other'],
		releaseDate: ['1997'],
		sku: ['SOK207'],
		type: 'ocr'
	},
	{
		category: 'magazine',
		description: "Index:\n1 Front page (Sean Parrack)\n2 Notes from the Net (Index, Editorial - Jim Long)\n3 Notes from the Net (Letters)\n4 Paterson's Guide to Paranormal Animals (Alicanto, Calchuna, Onaqui - Stephen Kenson)\n10 KA*GE Fiction (Wonderland - Chad Olson)\n17 Shadows (Troll Ranger archetype - Bryan Walker)\n18 Turing's Guide to Organizations (Armour International, part 1 - Chad Olson)\n23 KA*GE Fiction (Business Unusual - Vicki Kirchhoff)\n28 Off the shelf (16 new pieces of gear - Stephen Kenson)\n38 FASA Product list\n39 AWOL Product list\n40 AWOL order form\n41 Paydata (Upcoming from FASA and Ral Partha)\n42 Paydata (Reviews: Corporate Shadowfiles, A Killing Glare, Tir Tairngire)\n44 Calendar of Events\n45 Shadowrun Network membership form\n46 Network Member Graffiti\n47 Writing on the Wall (News from the Shadowrun Universe)\n48 Rear Page",
		edition: 2,
		gameDate: '2054',
		name: 'KA•GE: Issue 9',
		originalLanguage: 'en-US',
		publisher: ['other'],
		releaseDate: ['1993'],
		sku: ['KAGE-09'],
		type: 'print'
	},
	{
		category: 'magazine',
		description: "Index:\n0 Front page\n1 Introduction\n2 Sysop's Notes (Editorial)\n3 KA*GE Fiction (Squasher and Squeeker - George Pace)\n8 Contacts: Fetish Monger & Limo Driver\n9 Location Archetype: High Security Warehouse\n11 KA*GE scenario: Go Fish!\n13 Profile: Danté: Inside the Black Box\n16 Archetype: Investigative Reporter (Free-lance Reporter)\n17 Q & A\n18 Vehicle Stats: Grumman Cargomaster Van\n19 Off the shelf: New gear\n22 On the Street: Rumors from the sprawl (Writing on the Wall: News from the Shadowrun Universe)\n23 Rear page",
		edition: 2,
		gameDate: '2054',
		name: 'KA•GE: Issue 0',
		originalLanguage: 'en-US',
		publisher: ['other'],
		releaseDate: ['1991'],
		sku: ['KAGE-00'],
		type: 'print'
	},
	{
		category: 'magazine',
		description: 'Index:\n0 Front page\n1 Net Notes: Welcome To The Shadows (Editorial - Jim Long)\n2 KA*GE Fiction (Lucy - James D. Long)\n11 KA*GE Credits\n12 KA*GE Author and Artist Guidelines\n14 CYCO Circuits (corporation description)\n15 Scenario: No Free Parking (adventure)\n17 CYCO Circuits (continued)\n19 Archetype: Former Company Decker\n20 Contacts: Hairstylist & E-Wizzard\n21 CYCO Circuits: Matrix Map\n23 Off The Shelf: Cyberdeck Utilities, Cyberdeck Gear & CYCO Cyberdecks\n26 Q&A: FASA explains it all to you\n27 Up and comming from FASA\n28 Reviews: London Sourcebook, Native American Nations: Volume One & Virtual Realities \n31 Rear page',
		edition: 2,
		gameDate: '2054',
		name: 'KA•GE: Issue 1',
		originalLanguage: 'en-US',
		publisher: ['other'],
		releaseDate: ['1991'],
		sku: ['KAGE-01'],
		type: 'print'
	},
	{
		category: 'magazine',
		description: 'Articles & Authors (where known):\n* Net Notes (editorial & letters, James D. Long),\n* Ragfeather (short story, GB Pace),\n* Privat Investigator (archetype),\n* Contacts\n* The Dwarven Technical Guild (corporation description),\n* A Short In The Dark (adventure),\n* Stranges In The Night (scenario ideas),\n* The Torque Wrench (location description),\n* Off The Shelf (equipment),\n* Sprawl Survival (tips for characters),\n* Paydata (reviews),\n* Writing On The Wall (world background)',
		edition: 2,
		gameDate: '2054',
		name: 'KA•GE: Issue 3',
		originalLanguage: 'en-US',
		publisher: ['other'],
		releaseDate: ['1992'],
		sku: ['KAGE-03'],
		type: 'print'
	},
	{
		category: 'magazine',
		description: "Articles & Authors (where known):\n* Notes From The Net (editorial & letters, James D. Long),\n* Paterson's Guide To Paranormal Animals (critters),\n* Lone Star File (gang description),\n* Shadows (archetype & contacts),\n* The Awakened Citizen (2050s legal hassle),\n* The Retching Rat (adventure),\n* Off The Shelf (equipment),\n* Neo-Anarchists Guide (Boston city description, Stephen Kenson),\n* AWOL Release Form (1992 legal hassle),\n* Paydata (reviews, James D. Long),\n* Graffiti (classifieds),\n* Writing on the Wall (world background)",
		edition: 2,
		gameDate: '2054',
		name: 'KA•GE: Issue 4',
		originalLanguage: 'en-US',
		publisher: ['other'],
		releaseDate: ['1992'],
		sku: ['KAGE-04'],
		type: 'print'
	},
	{
		category: 'magazine',
		description: "Index:\n1 Front page (Sean Parrack)\n2 Notes from the Net (Editorial, Letters, Index, Credits - Jim Long)\n4 Paterson's Guide to Paranormal Animals (Sewer Gator)\n6 KA*GE Fiction (Vengeance - Brantley Bryant)\n10 Lone Star File\n11 Scenario Ideas (Night Encounters)\n13 Shadows (NPC: Niedertracht)\n14 Shadows (Paranaturalist Archetype, Medical Examiner Contact, Hospital Orderly Contact)\n16 The Awakened Citizen (Legal systems of 2053 - Terry Reinsch)\n18 The Awakened Citizen (Lawyer contacts: Judge, Bail Bondsman - Terry Reinsch)\n19 Turring's Guide to Organizations (Major corporations of Minneapolis-St. Paul, Timeline of MSP - Michael W. Harris)\n25 Neo-Anarchist Guide (Minneapolis-St. Paul metroplex - Michael W. Harris)\n31 FASA Product list\n32 AWOL Product list\n33 AWOL Order Form\n34 Off the Shelf (Gear - James Buchanan)\n40 Paydata (Reviews: Shadowland, 10-860 Corporat Dragon, 20-507 Go-Gangers, 20-516 Mercs and Bouncers, 20-517\nShapeshifters, 20-518 Shadowbeat, 20-519 Tribals)\n43 Combat Laws (Myrphy's Laws of Combat)\n44 Upcoming from Ral Parthe, Upcoming from FASA\n45 Shadowrun Network membership form\n46 Network Member Grafitti\n47 Writing on the Wall (News from the Shadwrun Universe)\n48 Rear Page",
		edition: 2,
		gameDate: '2054',
		name: 'KA•GE: Issue 5',
		originalLanguage: 'en-US',
		publisher: ['other'],
		releaseDate: ['1992'],
		sku: ['KAGE-05'],
		type: 'print'
	},
	{
		category: 'magazine',
		description: "Index:\n1 Front Page (Sean Parrack)\n2 Notes from the Net (Editorial, Index, Credits - Jim Long)\n3 Notes from the Net (Letters)\n4 Paterson's Guide to Paranormal Animals (Carrion Crow, Cooper's Fox, Fenris Wolf - Michael W. Harris)\n10 KA*GE Fiction (The Night's Change of Plans - Chad Olson)\n16 Shadows (Archetypes: Former Electronic Warfare Specialist, Former Combat Engineer - James Buchanan)\n18 Shadows (Contacts: Sporting Goods Salesman, Arcade Owner)\n19 Neo-Anarchists Guide (Minneapolis-St. Paul metroplex - Michael W. Harris)\n23 Turring's Guide to Organizations (MSP Corporations - Michael W. Harris)\n27 KA*GE Fiction (Jolly Ol' Elf - Victoria Kirchoff & Curtis Martin)\n32 Off the Shelf (Spells and Plasma Shock Weapons - Michael W. Harris, Dentalware - James Rommell, Bomb Sniffer - Jeff Hosty)\n37 AWOL Product List\n38 AWOL Order Form\n39 Paydata (Questions and Answers)\n41 Paydata (Upcoming from FASA, Upcoming from Ral Partha)\n42 Paydata (Reviews: The Grimoire II, Paranormal Animals of Europe, Tir Tairngire, Total Eclipse, One Stage Before)\n45 Shadowrun Network Membership Form\n46 Network Member Grafitti\n47 Writing on the Wall (News from the Shadowrun Universe)\n48 Rear Page",
		edition: 2,
		gameDate: '2054',
		name: 'KA•GE: Issue 6',
		originalLanguage: 'en-US',
		publisher: ['other'],
		releaseDate: ['1992'],
		sku: ['KAGE-06'],
		type: 'print'
	},
	{
		category: 'magazine',
		description: "Index:\n1 Front page (Sean Parrack)\n2 Notes from the Net (Editorial, Credits and Index - Jim Long)\n3 Notes from the Net (Letters - Steve Scott)\n4 Paterson's Guide to Paranormal Animals (Gaki, Goblin Spider, Greater Carp - Stephen Kenson)\n10 KA*GE Fiction (A Closer Look - Chad Olson)\n16 Shadows (Former KE Guard, Former KE Decker, Former KE Security Mage archetypes - Brian Walker)\n19 Neo-Anarchist Guide (Australiasia History, Brisbane Sprawl - Craig Gaffney)\n25 Turring's Guide to Organizations (ANZAC - Craig Gaffney)\n27 The Awakened Citizen (Life in Australiasia - Craig Gaffney)\n30 KA*GE Fiction (An Ounce of Prevention - Robert Frager)\n36 Questions and Answers\n40 Paydata\n46 Network Member Graffiti\n47 Writing on the Wall (News from the Shadowrun Universe)\n48 Rear Page",
		edition: 2,
		gameDate: '2054',
		name: 'KA•GE: Issue 7',
		originalLanguage: 'en-US',
		publisher: ['other'],
		releaseDate: ['1993'],
		sku: ['KAGE-07'],
		type: 'print'
	},
	{
		category: 'magazine',
		description: "Index:\n1 Front page (Corey Gulley)\n2 Notes from the Net (Editorial, Credits and Index - Jim Long)\n3 Notes from the Net (Letters)\n4 Paterson's Guide to Paranormal Animals (The Greater Toad, Hengeyokai, Hsing-sing - Stephen Kenson)\n10 KA*GE Fiction (First Contact - Chad Olson)\n16 Shadows (Dwarven Stoic Physical Adept archetype - Brian Walker)\n17 Neo-Anarchist Guide (Boston Sprawl - Stephen Kenson)\n24 Turring's Guide to Organizations (The Black Lotus - Stephen Kenson)\n30 KA*GE Fiction (Instructions Takes A Turn - Simon Foster)\n34 FASA Product list\n35 AWOL Product list\n36 AWOL Order Form\n37 Paydata (Upcoming from FASA and Ral Partha)\n38 Paydata (Official errata for Shadowrun II)\n40 Paydata (Official errata for Grimoire II)\n41 Paydata (Reviews: 20-508 Riggers and Rockers, 20-520 Yakuza, 20-521 Ork Biker, 20-522 Meta-Human Tribal, 20-528 Black ICE Icons, 20-529 Wasp Male Spirits, 20-530 Wasp Queen Human Host, 20-531 Combat Mages)\n44 Calendar of Events\n45 Shadowrun Network membership form\n46 Network Member Graffiti\n47 Writing on the Wall (News from the Shadowrun Universe)\n48 Rear page",
		edition: 2,
		gameDate: '2052',
		name: 'KA•GE: Issue 8',
		originalLanguage: 'en-US',
		publisher: ['other'],
		releaseDate: ['1993'],
		sku: ['KAGE-08'],
		type: 'print'
	},
	{
		category: 'magazine',
		description: "Index:\n0 Front page (Sean Parrack)\n1 Net notes (Editorial - Jim Long)\n2 KA*GE Fiction (Just Another Night... - George Pace)\n9 Corporate profile (Turring's Annoted Guide to Modern Organizations: Advanced Weapons and Systems, Incorporated - AWS Inc.)\n12 Contacts (Body Shop Tech, Independent Hauler)\n14 Archetype (Former DocWagon TM Paramedic)\n15 Scenario (A Night in the Sound)\n17 Personalities (AWS NPC's)\n18 Upcoming from FASA\n19 Run for it (Scenario Ideas)\n23 Q&A (FASA explains it all to you)\n24 Off the Shelf (New gear)\n27 Reviews (Total Eclipse, Native American Nations Volume 2, 20-500 Shadowrunners, 20-501 Deckers, 20-502 Human Street Samurai, 20-503 Mages, 20-504 Meta-Human Street Samurai, 20-505 Elves)\n30 Writing on the Wall (News from the Shadowrun Universe)\n31 Rear page",
		edition: 2,
		gameDate: '2052',
		name: 'KA•GE: Issue 2',
		originalLanguage: 'en-US',
		publisher: ['other'],
		releaseDate: ['1991'],
		sku: ['KAGE-02'],
		type: 'print'
	},
	{
		category: 'magazine',
		description: "Index:\n1 Frontpage (Sean Parrack)\n2 Notes from the Net (Index, Editorial - Jim Long)\n3 Statmet of Ownership (James D. Long)\n4 Patterson's Guide to Paranormal Animals (Hide, Tzitsimne)\n8 KA*GE Fiction (Chasing Ghosts, part 2 - Chad Olson)\n15 Shadows (Contacts: Model, Hustler, Stock Analyst, Stock Broker, Archetype: Hermetic Hitman - Sean Parrack)\n18 Turring's Guide to Organizations (Armor International, part 2 - Chad Olson)\n31 KA*GE Fiction (Who Your Friends Are - Vicki Kirchhoff)\n37 FASA Product list\n38 AWOL Product list\n39 AWOL Order Form\n40 Paydata (Upcoming from FASA & Ral Partha)\n41 Paydata (Reviews: Tir na nOg Sourcebook, Celtic Double Cross, 20-534 Spirit of Man, 20-535 Spirit of Water, 20-532 Piasma, 20-533 Dzoo-Noo-Qua, 10-861 Feathered Serpent)\n44 Calendar of Events\n45 Shadowrun Network membership form\n46 Network Member Grafitti\n47 Writing on the Wall (News from the Shadowrun Universe)\n48 Rear page",
		edition: 2,
		gameDate: '2052',
		name: 'KA•GE: Issue 10',
		originalLanguage: 'en-US',
		publisher: ['other'],
		releaseDate: ['1993'],
		sku: ['KAGE-10'],
		type: 'print'
	},
	{
		category: 'magazine',
		description: "Index:\n1 Front page (Eric von Haas)\n2 Notes from the net (Editorial, Staff and Index)\n3 Notes from the net (Letters)\n4 Patterson's Guide to Paranormal Animals (Mist Viper, Arachnis - Peter Williams, Sean Parrack & Corey Gulley)\n8 Ka*ge Fiction (If As Beast You Don't Succeed, Part One - Michael A. Stackpole)\n20 Shadows (Two Archetypes: Former Combat Medic, Ex-Brawler, Two Contacts: Foreign Dignitary, Social Worker - Sean Parrack, J.B. Buchanan)\n23 Corporate Shadow Files (European Business Machines and Magic - Stephen Kenson)\n27 Ka*ge Fiction (There Are Shadowruns, And Then There is... - Chris Hussey)\n33 Paydata (FASA Products, AWOL Products, Order Form, Upcoming from FASA, Reviews: Lone Wolf, The Germany Sourcebook, Eye Witness)\n39 Calendar of Events (Cons)\n40 Turring's Guide to Organizations (Coven of the Crimson Moon - Stephen Kenson)\n44 New Gear (8 new pieces of gear - Teras Cassidy & Michael Morris)\n48 Network Member Graffiti\n49 Writing on the Wall (News from the Shadowrun Universe)\n51 Shadowrun Network application form\n52 Rear page",
		edition: 2,
		gameDate: '2052',
		name: 'KA•GE: Issue 11',
		originalLanguage: 'en-US',
		publisher: ['other'],
		releaseDate: ['1994'],
		sku: ['KAGE-11'],
		type: 'print'
	},
	{
		category: 'magazine',
		description: 'This was the last issue of KA*GE before the publisher went AWOL. The issue was published late, and the was promises of further issues being on time.\nThe issue contains:\nLetters, errata, paranormal critter, fiction, archetypes, contacts, magic theory, new gear, new organizations, scenario ideas, new spells, merchandizing, slang, event calender and newsnet downloads. --user description',
		edition: 2,
		gameDate: '2052',
		name: 'KA•GE: Issue 12',
		originalLanguage: 'en-US',
		publisher: ['other'],
		releaseDate: ['1994'],
		sku: ['KAGE-12'],
		type: 'print'
	},
	{
		category: 'mission',
		description: 'Work in Chicago long enough and you get used to a lot of weird things, so when one corp puts out the feelers for a team of runners to pull off a sabotage job on another, it seems refreshingly simple. It’s a classic shadowrun set up—two corps beat up on each other for a little while, runners make themselves a few nuyen, and the world keeps moving around.\nBut it’s not that simple. Of course it isn’t. If something of value is going through Chicago’s Containment Zones, people are going to catch its scent—and when they do, they’re going to want a piece of it. Runners are going to find themselves caught between multiple forces in the city, faced with the kind of choice that always seems extra difficult in the Sixth World: Figuring out what’s the right thing to do?',
		edition: 5,
		gameDate: '2075',
		name: 'A Little Wetwork',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2017-05'],
		sku: ['SRM07-05'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'The Lost Colony\nMaybe you might misplace a commlink. Or lose a box holding a few stray bullets. But who loses an entire community? Well, it’s Chicago’s Containment Zone, where a large group of people disappearing is not the strangest thing to happen this month. Or this week. Or today. But even if it’s not the strangest thing, it’s the one someone is willing to pay runners to investigate. So it’s important.\nThe thing is, a whole group of people doesn’t just disappear easily. Or nicely. Some of the powers that like to stay hidden in the Containment Zone are going to make themselves visible, and shadowrunners need to survive their appearance. And see if they can save some lives while they’re at it.',
		edition: 5,
		gameDate: '2075',
		name: 'Windy City Chaos',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2017-09-11'],
		sku: ['SRM07-06'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'The Price of Power\nValue is not a secret. When something is worth a lot of money, or conveys a lot of power, or both, people of the Sixth World know. They make it their business to know. That means that when you’re tracking down something with a lot of value, be cautious. You won’t be the only one after it.\nIn Lethal Forces, Mr. Johnson comes along spinning tales about secret research in a highly secure facility, which is definitely the sort of thing that has a lot of value. Mr. Johnson may not tell the runners who else might come calling, but what self-respecting team of runners relies on Mr. Johnson to give them the information they need? They’ll have to stay alert, keep their wits about them, and be ready for any and all opposition—including ones with scales.',
		edition: 5,
		gameDate: '2075',
		name: 'Lethal Forces',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2017-09-19'],
		sku: ['26S051'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Piercing the Night\n\nYou heard the scream. It’s important to remember that. Sometimes, when it’s late, and you hear something that sounds like a scream echoing through dark alleys, you try to convince yourself that it was something else. An animal. An illusion. Anything but what it sounded like.\nBut it was a scream. You heard it, and you’ll hear it again, because in the Sixth World, the supply of terror is growing. Bug spirits work to devour corporations from within. Shedim claim dead bodies and mobilize to their own dark ends. And the hidden corners of the metaplanes and the Matrix contain creatures that are best not imagined, because to imagine them is to sever ties with reason.\nDark Terrors is a catalog of the horrors lurking under the surface of the Sixth World. With plot updates and hooks, critter stats, and campaign information presented in an immersive style, it’s an invaluable resource for players ready to stay on the edge of their seats. It is for use with Shadowrun, Fifth Edition and Shadowrun: Anarchy.',
		edition: 5,
		gameDate: '2075',
		name: 'Dark Terrors',
		names: {
			'de-DE': 'Im Herz der Dunkelheit'
		},
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: [
			'2017-11-26',
			'2018-03-15'
		],
		sku: [
			'27231',
			'45063'
		],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'The quintessential Chicago shadowrun is a full-to-bursting package with a variety of ingredients and flavors. And it doesn’t even need to include bug spirits. If you want the true Chicago experience, it’s here waiting for you. What ingredients does it contain? How about a rush job on a tight deadline, occasionally hostile crowds of locals, panicky security, explosions, stealth, open firefights in the streets, vicious traps, burning buildings, a crazed hermit, and a pack of drug-addicted dogs.\nThose are all ingredients in the stew that is this run, and Mr. Johnson is paying good money for you to wolf it down as fast as you can. Get moving!',
		edition: 5,
		gameDate: '2075',
		name: 'Collective Action',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2016-12'],
		sku: ['SRM07-02'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'The only shadowrunners who don’t ask the above question are ones who have been dead so long that no one remembers their name. Which, for most runners, means two months. The point being, any runner knows that a job that can be described in a simple, straightforward sentence at the beginning of the day is going to become a tumbled, tangled mess by the end of the day, the simple sentence exploding into a story that you’ll tell over a few drinks some night—unless the story got messy enough that you joined those forgotten shadowrunners in some shallow grave.\nThe simple sentence at the beginning of this job is this: “Retrieve a stolen cyberdeck prototype.” Sounds easy enough, but add “in Chicago’s Containment Zone” to the end of the sentence, and already the complications have begun to mount. And they’ll continue—by the time the runners are done, they’ll see double-crosses, deceits, lies, and betrayals speeding past them, and they’ll have to do their best to figure out what’s really going on before they get overwhelmed and overran.',
		edition: 5,
		gameDate: '2075',
		name: 'The Deck Job',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2016-11'],
		sku: ['SRM07-01'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Every runner knows there are times when you need to throw grenades at gasoline trucks, and other times when more discretion and subtlety is called for. True pros distinguish themselves with precise operations that are noticed by no one besides their target—but those targets see enough to push them over the edge of sanity.\nIn this Mission, runners get an assignment that is easy to describe but difficult to execute. The job? Ruin a life. The method? That’s where the runners come in. They’ll have to exercise all their creativity and sneakiness to plan and pull off this job—unless they want the police and some nasty corporate security putting their work to an early end. Do runners have the smarts, stealth, and deviousness to pull this off? As always, the answer is another question: How badly do they want to get paid?',
		edition: 5,
		gameDate: '2075',
		name: 'Do No Harm',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2017-02'],
		sku: ['SRM07-04'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Collecting evidence. Visiting medical examiners. Questioning suspects. The cops may be a pain in shadowrunners’ hoops, but what kid didn’t play cops and robbers when they were growing up? Sometimes playing on the cops side, even? Now they have a chance to play for real. There’s been a death in the Chicago/Milwaukee sprawl—well, several, but one that got the attention of Detective Nick Ryder. It’s the sort of case he’d have trouble looking into alone, so he’s turned to the shadows. Runners will have the chance to crack the case—right down to the difficult work of bringing the perp to justice.',
		edition: 5,
		gameDate: '2075',
		name: 'Special Investigation Unit',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2017-01'],
		sku: ['SRM07-03'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Big, bad, and awesome\n\nThey can call you a trog. Sure they can. Let ’em think it’s smear. Let them show you what they don’t know. Let them ignore history, the great accomplishments orks and trolls have made in every field in the Sixth World, the homes and enclaves they’ve built out of nothing. There’s enough talent in the trog population to punch, hack, rig, charm, or enchant that smug smile right off their face. You know what you are. They’ll learn—fast, if they know what’s good for them.\nThe Complete Trog is the definitive guide for ork and troll characters in Shadowrun. With information on what it’s like to be an ork or troll in dozens of spots across the globe, details on working in corps as a trog (including in ork- and troll-dominated corps) and the heroes and enemies of trog culture, the book helps players add flavor and depth to their characters and the world around them. On top of that, it has gear, qualities, and life modules compatible with both Shadowrun, Fifth Edition and Shadowrun: Anarchy. Plunge into the rich culture of trogs and watch them turn that slur on its head.',
		edition: 5,
		gameDate: '2079-08',
		name: 'The Complete Trog',
		names: {
			'de-DE': 'Mit Hauern und Hörnern - Almanach der Orks und Trolle'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: ['2017-07'],
		sku: [
			'27506',
			'45062'
		],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Lucas, a gifted shaman and member of the Salish-Shidhe Council, is respected for his arcane talents among his tribe. When he’s blinded during a shadowrun on an Evo Corporation outpost, he’s fitted with a set of cybereyes during his recovery. But upon his return to the Council, the tribe banishes him, saying the cyberware he’s accepted makes him unfit to be a shaman. Distraught, Lucas heads to Seattle and spends time in the Barrens attempting to scrape by.\nWanting revenge against Evo, he teams up with a group of shadowrunners, influencing them to take runs against the megacorporation. During one such run, they determine that Evo is retrieving an arcane artifact from a dig site located in Salish-Shidhe territory. Lucas convinces his team to take the initiative and either stop the dig or steal the artifact. But when a team member double-crosses Lucas and the others, he must race against time to discover the true masterminds behind this shadowrun…and stop the thief before they escape with both the artifact and Lucas’s last chance for redemption…',
		edition: 5,
		gameDate: '2075',
		name: 'Blind Magic',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2017-03-17'],
		sku: ['26NV003'],
		type: 'digital'
	},
	{
		category: 'misc',
		description: "The Sixth World Tarot Deck for Shadowrun is much more than just a tarot deck. Created by Echo and Lazarus Chernik for Catalyst Game Labs, the deck is a multi-tiered, masterfully illustrated game accessory for Shadowrun, Fifth Edition, and includes hundreds of puzzles, plots, and enigmas that can be at the heart of compelling campaigns. The Sixth World Tarot comes complete with 78 full-color tarot cards and a guidebook. The cards are 2.5' x 5' tall, with gilded edges.",
		edition: 5,
		gameDate: '2075',
		name: 'Sixth World Tarot',
		names: {
			'de-DE': 'Tarot der Sechsten Welt'
		},
		notes: "Available first only at Gen Con 2016. Now on the creator's site. Print only.",
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: ['2016'],
		sku: [
			'27511',
			'45049'
		],
		status: 'outofscope',
		type: 'print'
	},
	{
		category: 'novel',
		description: "Someone - or something - is killing nightclub entertainers in Kings Cross, Australia. Striking from the shadows, methodical and heinous, the murderer has wrapped the bawdy, colorful neighborhood in a suffocating blanket of terror.\nNinniniru \"Ninn\" Tossinn, a troubled private investigator on the run from her past, joins forces with Barega, an elderly Aborigine shaman, to uncover the truth behind the malevolent force - and put themselves on the Cross Slayer's list. But can they defeat the darkness, survive Sydney's powerful mana storm, and reach the true heart of the evil threatening the city? Their search takes them from gritty alleys filled with gang symbols and worse to beneath the squatter-filled harbor bridge over shark-infested waters.\nAs their investigation deepens, soon the Cross Slayer isn't the only foe stalking them. Ninn and Barega have to put all their trust in each other if they're going to bring the slayer to justice, uncover the conspiracy behind the murders, and stay alive long enough to do both.",
		edition: 5,
		gameDate: '2075',
		name: 'Shadows Down Under',
		names: {
			'de-DE': 'Schatten Down Under'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: ['2016-07-22'],
		sku: ['26860'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Vaquita has had a rough go of it lately. She was doing all right, building a career as a London-based rigger, when something went wrong inside her head. Suddenly the mental space that used to be hers alone was shared as a foreign personality carved out a section of brain for itself. It wasn’t exactly madness, but it sure felt like it.\nIt also made for some tough going for a time, and several lost jobs, but lately Vaquita’s gotten her swagger back. Her life may be a little trickier than the average runner’s, but she’s also got some skills she didn’t have before, not to mention new ways of bringing in the danger. And she has the perfect testing ground for her new abilities—the hulking, abandoned Angel Towers Arcology. Filled with squatters, gangs, vicious critters, and certain areas people only talk about in whispers, Angel Towers has enough danger and hidden caches of tech to keep a dozen teams of shadowrunners busy. And with her small, new team, Vaquita’s going to use it to not only rebuild her rep, but take it to the next level.\nBut the arcology’s secrets and dangers go far deeper than Vaquita realizes, and she’ll have to deal with the perils at every turn—as well as the people who put them there.',
		edition: 5,
		gameDate: '2075',
		name: 'Undershadows',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2016-06-11'],
		sku: ['26857'],
		type: 'digital'
	},
	{
		category: 'tcg',
		description: 'This game takes fantasy with magic, elves, dwarves, orcs, trolls etc., and puts them in a cyberpunk world 60 years in the future.\nThere are 7 types of cards...\n\t- Runners - You collect groups of these characters and use them to make runs on objectives. Some of these can support the group through computers while staying safe at home. These cards have symbols on them that represent their abilities and these are use to bypass threats without actually having to face them.\n\t- Objectives - These are what you are making runs on. They are worth reputation points and usually have a task that you must best or a number of symbols that you have to match with the symbols on your runners.\n\t- Challenge - You assign these to the objectives as additional hurdles that you have to get by before you can tackle the objective. Usually you can bypass them with the right symbols but if not they can represent nasty things you will have to fight or things that will just hurt you.\n\t- Gear - This is stuff that you assign to runners to help them make runs. Some gear requires you to have a runner with a matching symbol.\n\t- Locations - These represent places that you control and can help you in various ways.\n\t- Contacts - These represent people that will help you.\n\t- Specials - These are instants that you play to affect the current situation.\n\t- Everything is driven by money which is hard to come by. It costs money to acquire almost every card and a lot of cards require money spent just to keep them in play or every time you use them.',
		edition: 2,
		gameDate: '2050',
		name: 'Shadowrun: Trading Card Game',
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: ['1997'],
		sku: ['TCG01'],
		type: 'physical'
	},
	{
		category: 'tcg',
		description: 'This game takes fantasy with magic, elves, dwarves, orcs, trolls etc., and puts them in a cyberpunk world 60 years in the future.\nThere are 7 types of cards...\n\t- Runners - You collect groups of these characters and use them to make runs on objectives. Some of these can support the group through computers while staying safe at home. These cards have symbols on them that represent their abilities and these are use to bypass threats without actually having to face them.\n\t- Objectives - These are what you are making runs on. They are worth reputation points and usually have a task that you must best or a number of symbols that you have to match with the symbols on your runners.\n\t- Challenge - You assign these to the objectives as additional hurdles that you have to get by before you can tackle the objective. Usually you can bypass them with the right symbols but if not they can represent nasty things you will have to fight or things that will just hurt you.\n\t- Gear - This is stuff that you assign to runners to help them make runs. Some gear requires you to have a runner with a matching symbol.\n\t- Locations - These represent places that you control and can help you in various ways.\n\t- Contacts - These represent people that will help you.\n\t- Specials - These are instants that you play to affect the current situation.\n\t- Everything is driven by money which is hard to come by. It costs money to acquire almost every card and a lot of cards require money spent just to keep them in play or every time you use them.',
		edition: 2,
		gameDate: '2050',
		name: 'Shadowrun: Trading Card Game - Underworld',
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: ['1997'],
		sku: ['TCG02'],
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: 'Male human vigilante',
		edition: 3,
		gameDate: '2060',
		name: 'Shadowrun: Duels - The Street Deacon',
		originalLanguage: 'en-US',
		publisher: ['WizKids Games'],
		releaseDate: ['2003-06'],
		sku: ['WZK6400'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: 'Female Yakuza assassin',
		edition: 3,
		gameDate: '2060',
		name: 'Shadowrun: Duels - Kyushi',
		originalLanguage: 'en-US',
		publisher: ['WizKids Games'],
		releaseDate: ['2003-06'],
		sku: ['WZK6401'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: 'Female elf mage',
		edition: 3,
		gameDate: '2060',
		name: 'Shadowrun: Duels - Liada',
		originalLanguage: 'en-US',
		publisher: ['WizKids Games'],
		releaseDate: ['2003-06'],
		sku: ['WZK6402'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: 'Male ork bouncer',
		edition: 3,
		gameDate: '2060',
		name: 'Shadowrun: Duels - G-Dogg',
		originalLanguage: 'en-US',
		publisher: ['WizKids Games'],
		releaseDate: ['2003-06'],
		sku: ['WZK6403'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: 'Male troll mage',
		edition: 3,
		gameDate: '2060',
		name: 'Shadowrun: Duels - Lothan the Wise',
		originalLanguage: 'en-US',
		publisher: ['WizKids Games'],
		releaseDate: ['2003-06'],
		sku: ['WZK6404'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: 'Male dwarf rigger',
		edition: 3,
		gameDate: '2060',
		name: 'Shadowrun: Duels - Silver Max',
		originalLanguage: 'en-US',
		publisher: ['WizKids Games'],
		releaseDate: ['2003-06'],
		sku: ['WZK6405'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: 'Female human mage',
		edition: 3,
		gameDate: '2060',
		name: 'Shadowrun: Duels - Kellan Colt',
		originalLanguage: 'en-US',
		publisher: ['WizKids Games'],
		releaseDate: ['2003-10'],
		sku: ['WZK6406'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: 'Male street samurai',
		edition: 3,
		gameDate: '2060',
		name: 'Shadowrun: Duels - Karkhov',
		originalLanguage: 'en-US',
		publisher: ['WizKids Games'],
		releaseDate: ['2003-12'],
		sku: ['WZK6407'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: 'Female elf cat-burglar',
		edition: 3,
		gameDate: '2060',
		name: 'Shadowrun: Duels - Midnight',
		originalLanguage: 'en-US',
		publisher: ['WizKids Games'],
		releaseDate: ['2003-12'],
		sku: ['WZK6408'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: 'Male human shaman',
		edition: 3,
		gameDate: '2060',
		name: 'Shadowrun: Duels - Natokah',
		originalLanguage: 'en-US',
		publisher: ['WizKids Games'],
		releaseDate: ['2003-12'],
		sku: ['WZK6409'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: 'Male ork bodyguard',
		edition: 3,
		gameDate: '2060',
		name: 'Shadowrun: Duels - Kross',
		originalLanguage: 'en-US',
		publisher: ['WizKids Games'],
		releaseDate: ['2003-12'],
		sku: ['WZK6410'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: 'Male troll ganger',
		edition: 3,
		gameDate: '2060',
		name: 'Shadowrun: Duels - Wolf Nev',
		originalLanguage: 'en-US',
		publisher: ['WizKids Games'],
		releaseDate: ['2003-12'],
		sku: ['WZK6411'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: 'Male dwarf',
		edition: 3,
		gameDate: '2060',
		name: 'Shadowrun: Duels - Draven von Drekill',
		originalLanguage: 'en-US',
		publisher: ['WizKids Games'],
		releaseDate: ['2003-12'],
		sku: ['WZK6412'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: "The shadows of the Sixth World have every kind of danger you can imagine: ultra-violent gangers, flesh-eating ghouls, mages that summon spirits from toxic waste, backstabbing corporate raiders, hard-nosed police officers, and even dragons. You don't have much — mainly your guts, your wits, and your friends — but maybe that's enough. Between you and your teammates, you can sling spells, hack the Matrix, talk a tiger out of his stripes, and bring down a charging ork from a hundred yards away. Will that be enough to face down the worst the mean streets can throw at you? You're about to find out.",
		edition: 5,
		gameDate: '2075',
		name: 'Shadowrun: Crossfire',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2014'],
		sku: ['27700'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: 'Shadowrunners are nothing if not individuals and Character Expansion Pack 2 gives you plenty to use in your Shadowrun: Crossfire game. It includes a new set of upgrade stickers, adding options for making the exact character you envision, five street legend cards for players who want to leap into the shadows with a head start, and 20 standard character cards with new art for players designing runners from the ground up. You can hit the streets ready to take down any obstacles that dare rear their heads.',
		edition: 5,
		gameDate: '2075',
		name: 'Shadowrun Crossfire: Character Expansion Pack 2: Street Legends',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2016'],
		sku: ['27704'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: 'You’re tougher. Meaner. Better equipped. You’ve taken on a drekload of challenges the Sixth World has thrown at you, and you’ve survived. Barely, sometimes, but that’s enough. You’re walking with a certain confidence, maybe even a little strut. You’re ready for the next thing the streets are going to throw at you.\nAt least, you think you are. Now you’re going to find out.\nHigh Caliber Ops is a massive expansion for the award-winning Shadowrun: Crossfire deck-building game. How massive? How does two new character roles, more than a dozen new Black Market cards, fifty new obstacles, and a large bundle of new Karma upgrades sound? On top of that, we’ve got five brand-new missions, and a set of basic cards with new art. Taken together, you have the tools for high-powered, high-risk, high-reward shadowruns. Add High Caliber Ops to your Crossfire game to see just how much danger you can take on!',
		edition: 5,
		gameDate: '2075',
		name: 'Shadowrun Crossfire: High Caliber Ops',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2015'],
		sku: ['27703'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: 'Vegas: A Night on the Strip\nThis mini expansion was a GAMA Trade Show retailer exclusive. It comes with new missions and 2 copies each of 5 stickers that add an ability to a Runner card only during Vegas missions. It also adds 8 new cards to the game. Gambling and tourism are the major thematic elements of the game.',
		edition: 5,
		gameDate: '2075',
		name: 'Shadowrun Crossfire: Las Vegas',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2016'],
		sku: ['27700-G16'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: 'The Character Expansion Pack 1 has character cards with new art, a starting deck for each character that includes one new piece of art per deck, and a full set of upgrade stickers. With this pack, players can branch out, creating whatever shadowrunner concept comes to mind, starting them on the path to being a legend. Or they can bring new players into the game, sending them on the path to designing their own character and discovering the story the mean streets are waiting to tell.',
		edition: 5,
		gameDate: '2075',
		name: 'Shadowrun Crossfire: Character Expansion Pack 1',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2014'],
		sku: ['27701'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: "Harlequin's Shadow is a promo Crossfire Deck card given out during GenCon 2014. It is used in Close The Portal scenario available for download from Catalyst Game Labs website.",
		edition: 5,
		gameDate: '2075',
		name: "Shadowrun Crossfire: Harlequin's Shadow Promo Card",
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2014'],
		sku: ['27700-G14'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: 'An additional Shadowrun: Crossfire character card included with pre-ordered base sets. Oni is basically an ork character with Oni Evolution sticker and 5 Karma printed on the sheet. It also features a race-specific art and description.',
		edition: 5,
		gameDate: '2075',
		name: 'Shadowrun Crossfire: Oni Promo Card',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2014'],
		sku: ['27700A'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: 'In Shadowrun: Hostile Takeover, players assume the role of megacorporations attempting to assert dominance over the city of Seattle.\nHostile Takeover is a game of intrigue, shifting alliances, and secretive schemes in the most famous futuristic megaplex of Shadowrun’s Sixth World. The most wealthy and influential megacorps of the city contend for dominance of Seattle, and they use shady dealings and deniable assets to wage a war in the shadows for supremacy.',
		edition: 5,
		gameDate: '2075',
		name: 'Shadowrun: Hostile Takeover',
		notes: "Announced fo the Year of Shadowrun but never released. Some \"developer diary\" posts are available on Shadowrun's blog.",
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		sku: ['27780'],
		status: 'canceled',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: 'Sprawl Gangers is a competitive, skirmish-level miniatures game for 2 players, with everything needed to game right in the box. Players will take on the task of building gangs (Ancients, Halloweeners, First Nation, and so on) following specific point values of a scenario, and modifying the various miniatures based upon what new resources (weapons/gear/magic/tech) a player gained through previous games. Gangs won’t simply fight for the sake of fighting, but will actively building their turfs and resources. Among other things, this will allow for the hiring of the exact right shadowrunner when they need that ace in the hole. All this adds up to the experience of watching your gang grow and expand through exciting play across a swath of games.',
		edition: 5,
		gameDate: '2075',
		name: 'Shadowrun: Sprawl Gangers',
		notes: "Announced fo the Year of Shadowrun but never released. Some \"developer diary\" posts are available on Shadowrun's blog.",
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		sku: ['27800'],
		status: 'canceled',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: 'The year is 2078. The worlds’ megacorporations straddle the sprawls of the Sixth World, goliaths that intimidate even nations as they suck in souls in their drive for the almighty nuyen. Between the cracks, shadowrunners carve out a living as deniable and disposable assets that megacorps fire at each other for datasteals, personnel extractions, or even wetwork. Whether casting manabolts of magic, riding the electrons of the Matrix with just the brain, or slinging good, old-fashioned flying lead while firing at speed enhanced by the latest in bio-engineering, runners live dangerously and hope their skills are good enough to let them survive another day.\nEncounters: Shadowrun is a 1-8 player fast-paced, pushed-your-luck dice and card game. Players take the role of Mr. Johnson, arranging the megacorps’ dirty work and adding new shadowrunners to their already-assembled teams. They send their teams into the shadows of the mean sprawl streets of the Sixth World, collecting though paydata to beat down their rivals. Grab some dice, make a team, and show ’em who’s the boss.\nThe goal of the game is to be the first player to acquire ¥30.\nEach player starts the game with (1) runner and 6 dice. At the start of your turn you flip over location card, that has effects aka breaks the rules, on every turn until a new environment card comes into play. You then flip over the top Event card form the deck and try and roll an exact match of the number on the card. If you succeed you place a die on the. You could stop then and receive ¥1 or flip a card and continue to press your luck. If you fail the next player starts a new run with a chance to collect n the ¥ you forfeited.\n¥ are used as victory points as well as currency to buy additional runners.',
		edition: 5,
		gameDate: '2078',
		name: 'Encounters: Shadowrun',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2016'],
		sku: ['27750'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'videogame',
		description: "Shadowrun is an adaptation of the FASA tabletop role-playing game of the same name. The storyline of the video game is loosely based on the first Shadowrun novel, Never Deal with a Dragon, written by Robert N. Charrette.[4] The narrative opens in Seattle, Washington in the year 2050, where the protagonist Jake Armitage is shown being gunned down in the street. A shapeshifting vulpine figure rushes to his side and is seen casting a spell over Jake before leaving hastily as the medics arrive on the scene. Jake awakens in a morgue with a complete memory loss. Soon, he is approached by the \"Dog\", a shamanistic totem who gives him a warning before vanishing.\nThe rest of the story is spent investigating the events leading to Jake's shooting, learning the identity of the shapeshifter who saved him, as well the person who ordered his assassination, a mysterious crime lord named \"Drake\". Most of the information is found by piecing together snippets of data found by hacking various protected computer systems. Along the way, he has encounters with gangs, criminals, and magically awakened creatures while under constant threat of attack from contract killers. Jake also discovers and develops his own latent magical abilities. Apart from his totem spirit, his only allies are the hired services of shadowrunners. It is eventually revealed that Jake is a data courier who was carrying a program in a computer built inside his brain. The program was designed to destroy a malevolent artificial intelligence, which the Aneki Corporation is trying to protect. The company is being aided by Drake, who turns out to be a dragon and the mastermind behind the plot.",
		edition: 2,
		gameDate: '2053',
		name: 'Shadowrun',
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: ['1993'],
		sku: ['SNES'],
		type: 'digital'
	},
	{
		category: 'videogame',
		description: "Shadowrun's story begins on January 31, 2058 in Seattle, United Canadian and American States. In the wilderness of the newly reclaimed Amerindian lands of the Salish-Shidhe, a small team of shadowrunners is brutally ambushed by unknown forces. The massacre is over quickly, but is captured in video by one of the slain member's cybereyes; the video is recovered and made national news. The last man to die in the video was a shadowrunner known as Michael, Joshua's brother.\nJoshua spends his last nuyen and flies to Seattle, vowing to avenge his brother's death. He arrives at Sea-Tac Airport and traces back Michael's last credstick transaction to \"Stoker's Coffin Motel\", in the Redmond Barrens. Joshua travels there to inquire about his brother, only to be told by the owner that Michael never paid his bill and in fact has some belongings being held. He strikes a deal with Joshua, and by beginning to do small shadowruns for a small-time Mr. Johnson, called Gunderson, he gains enough money to pay his brother's bills. In Michael's belongings, he finds three \"holopix\": one of a young woman, Tabatha Shale; of an Amerindian, David Owlfeather, and of Seattle General Hospital Dr. Heaversheen. There is also a low grade cyberdeck, along with a credstick containing 500 nuyen, which could have been used to pay off Michael's bill (the irony of this is one of the game's many humorous points).",
		edition: 2,
		gameDate: '2053',
		name: 'Shadowrun',
		originalLanguage: 'en-US',
		publisher: ['other'],
		releaseDate: ['1994'],
		sku: ['GENESIS'],
		type: 'digital'
	},
	{
		category: 'videogame',
		description: 'The game has a 1990s manga-based visual style loosely based on a contemporary Japanese manga series which was based on the Shadowrun franchise. Unlike the other Shadowrun video games which are set in Seattle and surrounding areas, this game is set entirely in Japan. In the fictional Shadowrun setting, Japan maintains a practice of exiling all orcs and trolls; thus there are no characters of those races in this game. The combat system is turn-based, and six-sided dice appear rolling on the screen determine the results of combat—the conflict resolution system used in the Shadowrun table-top game.',
		edition: 2,
		gameDate: '2053',
		name: 'Shadowrun (シャドウラン)',
		originalLanguage: 'jp-JP',
		publisher: ['other'],
		releaseDate: ['1996'],
		sku: ['SEGA-CD'],
		type: 'digital'
	},
	{
		category: 'videogame',
		description: 'According to the ancient Mayan calendar, magic is cyclical, leaving the world and returning every 5000 years. Magic enters the world, grows, peaks, and eventually retreats. When magic was last at its peak, a powerful Ziggurat was constructed near what would be modern day Santos, Brazil. The purpose of this construct is shrouded in the mists of history. Even the Chancela family, who secretly maintained the ziggurat for thousands of years, did not know its purpose. Nor did they know the purpose of the strange artifact somehow connected to the ziggurat. In the millennia since its construction the ziggurat was eventually buried, hidden in the side of a mountain. Then, on December 24, 2012, magic began returning to the world, leaving change and confusion in its wake.\nThe years after magic’s return wrought change on a global scale. RNA Global, a powerful multinational corporation, sent a research team to Santos, Brazil. Their job was to explore and research the strange energies coming from a mountainside along one edge of Santos. Armed with an artifact from ancient times, the research team sought to channel and control the magical energies they were exploring. Instead they caused a magical accident that destroyed half the city and brought down the mountainside, revealing the ziggurat to all. Deflecting blame for the incident to an Ork paramilitary organization, RNA retreated from the city while rethinking its strategy.\nAfter a time, RNA Global returned to Santos, this time armed with a government contract that provided them control over the city. Vowing to keep the peace and clean up Santos, RNA’s first actions were to enact martial law and declare a curfew for all citizens. The locals, still upset over the initial accident and trying to rebuild on their own, began resisting RNA’s efforts. The resistance was helped greatly by the leadership of the Chancela family who were dedicated to defending the ziggurat and recovering the artifact. Resistance turned to conflict, conflict turned to skirmish and skirmish eventually plunged the city into all-out war. Eventually, forces began to organize themselves under the Chancela family, and became known as "The Lineage".\nThe battle between these two sides has grown to great proportions as of 2031, as the struggle for the artifact continues between RNA Global forces and The Lineage.',
		edition: 4,
		gameDate: '2070',
		name: 'Shadowrun',
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: ['2007'],
		sku: ['XBOX'],
		type: 'digital'
	},
	{
		category: 'videogame',
		description: 'MAN MEETS MAGIC & MACHINE. The year is 2054. Magic has returned to the world, awakening powerful creatures of myth and legend. Technology merges with flesh and consciousness. Elves, trolls, orks and dwarves walk among us, while ruthless corporations bleed the world dry. You are a shadowrunner - a mercenary living on the fringes of society, in the shadows of massive corporate arcologies, surviving day-by-day on skill and instinct alone. When the powerful or the desperate need a job done, you get it done... by any means necessary.\nIn the urban sprawl of the Seattle metroplex, the search for a mysterious killer sets you on a trail that leads from the darkest slums to the city’s most powerful megacorps. You will need to tread carefully, enlist the aid of other runners, and master powerful forces of technology and magic in order to emerge from the shadows of Seattle unscathed.\nThe unique cyberpunk-meets-fantasy world of Shadowrun has gained a huge cult following since its creation nearly 25 years ago. Now, creator Jordan Weisman returns to the world of Shadowrun, modernizing this classic game setting as a single player, turn-based tactical RPG.',
		edition: 5,
		gameDate: '2054',
		name: 'Shadowrun Returns',
		notes: 'Not present for beeing multiplatform and huge in size.',
		originalLanguage: 'en-US',
		publisher: ['Harebrained Schemes'],
		releaseDate: ['2013-07-25'],
		sku: ['RET-01'],
		status: 'outofscope',
		type: 'digital'
	},
	{
		category: 'videogame',
		description: 'Man Meets Magic & Machine\nIn 2012, magic returned to our world, awakening powerful creatures of myth and legend. Among them was the Great Dragon Feuerschwinge, who emerged without warning from the mountains of Germany, unleashing fire, death, and untold destruction across the countryside. It took German forces nearly four months to finally shoot her down - and when they did, their victory became known as The Dragonfall.\nIt’s 42 years later - 2054 - and the world has changed. Unchecked advances in technology have blurred the line between man and machine. Elves and trolls walk among us, ruthless corporations bleed the world dry, and Feuerschwinge’s reign of terror is just a distant memory. Germany is splintered - a stable anarchy known as the “Flux State” controls the city of Berlin. It’s a place where power is ephemeral, almost anything goes, and the right connections can be the difference between success and starvation. For you and your team of battle-scarred shadowrunners, there’s no better place to earn a quick payday.\nNow, a new threat is rising, one that could mean untold chaos and devastation. One that soon has you and your team caught on the wrong side of a deadly conspiracy. The only clue: whispers of the Dragonfall. Rumors that the Great Dragon Feuerschwinge may still be alive, waiting for the right moment to return…',
		edition: 5,
		gameDate: '2054',
		name: 'Shadowrun Returns: Dragonfall',
		notes: 'Not present for beeing multiplatform and huge in size.',
		originalLanguage: 'en-US',
		publisher: ['Harebrained Schemes'],
		releaseDate: ['2014-09-18'],
		sku: ['RET-02'],
		status: 'outofscope',
		type: 'digital'
	},
	{
		category: 'videogame',
		description: 'Shadowrun: Hong Kong - Extended Edition is the definitive version of Shadowrun: Hong Kong, the third standalone game in Harebrained Schemes’ critically-acclaimed Shadowrun cRPG series. This Extended Edition adds the all-new, 6+ hr Shadows of Hong Kong Bonus Campaign to the game as a free upgrade - delivering on a funding goal achieved by fans in Harebrained Schemes’ wildly successful Shadowrun: Hong Kong Kickstarter. The Extended Edition also adds audio commentary to the game, and a long list of improvements since the game’s initial launch - including new visual effects, updated dialogue, and new editor features (for User-Generated Content). Experience the most impressive Shadowrun RPG yet, hailed as one of the best RPGs and strategy games of 2015!\nHONG KONG. A stable and prosperous port of call in a sea of chaos, warfare, and political turmoil. The Hong Kong Free Enterprise Zone is a land of contradictions - it is one of the most successful centers of business in the Sixth World, and home to one of the world’s most dangerous sprawl sites. A land of bright lights, gleaming towers, and restless spirits where life is cheap and everything is for sale.',
		edition: 5,
		gameDate: '2054',
		name: 'Shadowrun Returns: Hong-Kong',
		notes: 'Not present for beeing multiplatform and huge in size.',
		originalLanguage: 'en-US',
		publisher: ['Harebrained Schemes'],
		releaseDate: ['2015-08-20'],
		sku: ['RET-03'],
		status: 'outofscope',
		type: 'digital'
	},
	{
		category: 'misc',
		description: 'If you aren’t familiar with Shadowrun, or just want a quick refresher, here’s a document Mike Mulvihill brought to us from the old days. It covers a little bit of everything, and should give you a good idea what the World of Shadowrun world is all about. Enjoy!\n\n(Note that this document is several years old and was originally designed for internal use – in other words, it ain’t proofread folks.)',
		edition: 4,
		gameDate: '2060',
		name: 'World of Shadowrun: A Primer',
		notes: 'A semi-internal doc about the world of Shadowrun.',
		originalLanguage: 'en-US',
		publisher: ['Harebrained Schemes'],
		releaseDate: ['2011'],
		sku: ['PRIMER'],
		type: 'digital'
	},
	{
		category: 'misc',
		description: 'A list of Jackpoint Users.',
		edition: 4,
		gameDate: '2060',
		name: 'Jackpoint User List',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		sku: ['JUL'],
		type: 'digital'
	},
	{
		category: 'misc',
		description: 'December 21st marks the end of the Mayan calendar, which launched the return of magic and the beginning of Shadowrun’s “Sixth World.” In our own world, this date launches The Year of Shadowrun, where we bring you an avalanche of superb games set in the ever-popular and fantastic Shadowrun universe, one of the most dynamic and long-standing fictional settings of all time.',
		edition: 5,
		gameDate: '2060',
		name: 'The Year of Shadowrun',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2012-12-21'],
		note: 'This is a promo folio containing info about the launch of the 5th edition.',
		sku: ['PROMO1'],
		type: 'digital'
	},
	{
		category: 'videogame',
		description: 'Lead your team of Runners to survive a corrupt megacorporation’s intrigue threatening thousands of lives in this new action-strategy game set in the most popular cyberpunk universe of all times – Shadowrun. Blending X-Com style gameplay with RPG elements in the unique Shadowrun setting and adding an extensive single- and co-op campaign, Shadowrun Chronicles offers the next generation of tactical turn based action games.\nEntrapped in a city plagued by a deadly virus, assaulted by the minions of a megacorporation, attacked by infected and with a dragon on a rampage through the city you have to unearth the secret conspiracy that connects it all.\nAs the leader of your team of Shadowrunners, you will have to use magic, technology and every weapon available to you, to save the lives of thousands in a city at the brink of extinction. Grow you character, plan your missions and control your team in combat or play live co-op with other players to overcome the challenges ahead of you. Meet your fellow runners in the Back Alley or hire henchmen to help you succeed.\nSet in the dystopian near future of our world, where magic has awakened and blends with technology, creatures of myth and legend have returned. Elves, Dwarves, Orks and Trolls walk among the neon-lit streets, while the matrix connects everyone and everything as the corporate towers cast their long shadows across the globe. You are a Shadowrunner - a secret operative on the edge of society, hired for the jobs no one wants to be connected with. A cyberpunk rebel surviving by skill and instinct in the shadows of the corporate towers!\n\nWelcome to the dark side of the future, chummer. It’s going to be a hell of a ride.',
		edition: 5,
		gameDate: '2075',
		name: 'Shadowrun Chronicles: Boston Lockdown',
		notes: 'Not present for beeing multiplatform and huge in size.',
		originalLanguage: 'en-US',
		publisher: ['Cliffhanger Productions'],
		releaseDate: ['2015-04-28'],
		sku: ['ONLINE'],
		status: 'outofscope',
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'The Boston Lockdown Campaign book companion to the video game.',
		edition: 5,
		gameDate: '2075',
		name: 'Shadowrun Chronicles: Boston Adventues',
		originalLanguage: 'en-US',
		publisher: ['Cliffhanger Productions'],
		releaseDate: ['2015-04-28'],
		sku: ['SCBA'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: "Roll Out!\nShadowrunners do a lot of things, but one thing they don't do is sit still. There are places to go, people to shoot—they need the right vehicles to get them there and the right drones to take care of business when they arrive.\nThis deck has 54 drones and vehicle cards, with a full-color picture and complete stats, that make it easy to players and gamemasters to reference stats at the game table while illustrating what they're driving, piloting or riding. With selections from a range of Shadowrun, Twentieth Anniversary Edtion products, this deck will prepare you for some serious moving violations.",
		edition: 4,
		gameDate: '2075',
		name: 'Gear Cards [Drones & Vehicles, Volume 1]',
		notes: 'Print only cards.',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2013-02'],
		sku: ['26531'],
		status: 'outofscope',
		type: 'print'
	},
	{
		category: 'rulebook',
		description: 'Designed to make game play simpler, more colorful and more fun, Shadowrun Weapon Cards contain pictures and Shadowrun, Fourth Edition stats for a whole range of guns, making it easy for players and gamemasters to reference at the game table. These cards also bring the Sixth World to life through full-color art for each piece of gear. This deck contains 54 guns for use with Shadowrun, Fourth Edition, selected from a range of Shadowrun products.\nOnly sold at 2012 conventions.\nDeal them out and start shooting!',
		edition: 4,
		gameDate: '2072',
		name: 'Weapon Cards [Guns, Volume 1]',
		notes: 'Print only cards.',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2013-10'],
		sku: ['26530'],
		status: 'outofscope',
		type: 'print'
	},
	{
		category: 'sourcebook',
		description: 'FLAUNT IT!\n\nYou’ve got the talent. You hopefully have lived long enough to collect a decent amount of nuyen. So show it off! Get a better gun. A bigger boat. A zeppelin that can sneak you across borders where no one thinks to look. All these toys are here, and many, many more. Runner’s Black Book is a shopping catalog for the ambitious and successful runner—and it’s a guide to the weapons, drones, and vehicles that the various forces of the Sixth World may send against you as you sneak through the shadows.\nRunner’s Black Book collects material from Shadowrun’s successful PDF line of products, compiling Deadly Waves, Gun Heaven, MilSpecTech, This Old Drone, and Unfriendly Skies in their entirety, along with updated art and information. On top of that, the book includes new pieces of gear developed specifically for this volume, including the punishing Kriss X Submachine Gun and small, smooth TPP light pistol. Each piece of gear is accompanied by a full color illustration providing a look at the item’s complete details and features.',
		edition: 4,
		gameDate: '2072',
		name: "Runner's Black Book",
		names: {
			'de-DE': 'Schattenkatalog',
			'fr-FR': "Runner's Black Book"
		},
		notes: 'Originally print only, this book is a compilation of other books with few added material.\nThe German edition has a few items from Germany and the French edition has the items from "Used Car Lot" and "Gun Haven 2".',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele',
			'Black Book Editions'
		],
		releaseDate: [
			'2011-09-14',
			'2011-09-28',
			'2012-05',
			'2012-10-30',
			'2016-01-12'
		],
		sku: [
			'26104',
			'26104LE',
			'47010',
			'SR4A04'
		],
		status: 'outofscope',
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Asking a shadowrunner if they really need another gun is like asking someone if they need all that oxygen floating around them. Are you ever going to use all that air? Maybe not. But you’re sure as hell not going to be one of those suckers who’s going to be caught short. RUNNER’S BLACK BOOK 2074 is about options, giving runners more choices of guns, weapons, vehicles, and other gear so that they can build a load out that suits them. Whether they want bleeding-edge gear built for those fighting the world’s latest wars or classic vehicles that have stood the test of time—or old crap they can get for cheap—RUNNER’S BLACK BOOK 2074 has what they need. Collecting gear from digital products Gun H(e)aven 2, Used Car Lot, MilSpec Tech 2, and Euro War Antiques along with exclusive material for this book, RUNNER’S BLACK BOOK 2074 contains full-color illustrations, detailed descriptions, and complete game statistics for each item. It’s an essential resource for runners looking to do some shopping—or to learn more about the guns that might be pointed at them in the near future.',
		edition: 4,
		gameDate: '2074',
		name: "Runner's Black Book 2074",
		names: {
			'de-DE': 'Schattenkatalog 2'
		},
		notes: 'Originally print only, this book is a compilation of other books with few added material.\nThe German edition have a few itens from Germany.',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2012',
			'2013-02-05',
			'2016-01-12'
		],
		sku: [
			'26105',
			'47011'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Der Shadowrun Schattenkatalog 3 kommt bald, sprich zur RPC 2013, raus und er wird alle noch nicht auf Papier gedruckten PDFs enthalten, die bisher erschienen sind – allerdings nur die Regel- und Hintergrund-PDFs, nicht die kostenfreien oder Abenteuer-PDFs. Dafür gibt es im Band wieder 10 Seiten ADL-Zusatz – die sich mit Drohnen und deutschen Autobahnen beschäftigen werden.',
		edition: 4,
		gameDate: '2074',
		name: 'Schattenkatalog 3',
		notes: 'A print only German compilation of: "Parazoologie", "Parabotanik", "Magische Gesellschaften", "Der Weg des Adepten", "Der Weg des Samurai", "Safehouses" und "State of the Art 2073" and a few extra pages.',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2013-05-23'],
		sku: ['47012'],
		status: 'outofscope',
		type: 'print'
	},
	{
		category: 'rulebook',
		description: "Every shadowrunner knows the value of good information. The right fact, the perfect piece of data, can be the difference between success and failure on a run, between life and death. And in the right hands, information can be more than valuable-it can be powerful.The Shadowrun Gamemaster Screen provides a collection of useful tables from Shadowrun, Fifth Edition for ease of reference in game play. With range tables, action lists, combat modifiers, social modifiers, and more, this is a critical game aid to make your Shadowrun games faster and more fun. And to provide that all-important secrecy so that the players don't know what you're up to. This screen is for use with Shadowrun, Fifth Edition.Note: This reprint (with a brand new graphic!)",
		edition: 5,
		gameDate: '2075',
		name: "Shadowrun Game Master's Screen 5th Etidion",
		names: {
			'de-DE': 'Spielleiterschirm Fünfte Edition'
		},
		notes: 'Print only.',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: ['2013-11'],
		sku: ['27050'],
		status: 'missing',
		type: 'print'
	},
	{
		category: 'novel',
		description: 'Along with many other features, this anthology includes Locks and Keys and The Art of Shadowrun Returns.',
		edition: 5,
		gameDate: '2053',
		name: 'Shadowrun: Returns: Anthology',
		originalLanguage: 'en-US',
		publisher: ['Harebrained Schemes'],
		releaseDate: ['2013'],
		sku: ['RET-ANT'],
		type: 'digital'
	},
	{
		category: 'boardgame',
		description: "You are the contagion. You are the fear. You are the thing that makes the megacorporations of the world tremble. In the world of Shadowrun, the corps think they have everyone and everything under their thumb, but they don't have you - the hacker in the Matrix, the fly in the ointment. You know where the world's deepest secrets are buried - and you have the weapons needed to fight to bring them out.",
		edition: 5,
		gameDate: '2075',
		name: 'Shadowrun: Zero Day',
		notes: 'Physical card game. Announced at Gen Con 2017.',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2017'],
		sku: ['27760'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'novel',
		description: 'MEAN STREETS? YOU HAVE NO IDEA...\n\nThe Sixth World is a dangerous place, and nowhere is that more obvious than in Seattle, the so-called Emerald City. Surrounding its neon-drenched heart is kilometer after kilometer of Sprawl, where millions of people scratch out a living among hazardous, slowly decaying neighborhoods and even more dangerous neighbors.\nSprawl Stories contains four Shadowrun novellas that explore Seattle through the eyes of the people who live there every day. A burned-out mage detective tackles a missing person case that quickly threatens to spiral out of control. A reporter goes on the ride-along of her life with a high-octane DocWagon team, and uncovers a conspiracy on live triedeo. A young ex-wagesalve is caught between powerful forces while investigating his uncle’s death. And a shaman must deal with a serious injury that threatens his very way of life–but not before taking vengeance on those who double-crossed him.\nSo take a walk on the true wild side of the Seattle Sprawl If you’re good–and lucky–you might even come back out in one piece...\n\nSprawl Stories contains the following novellas:\n\t"Neat" by Russell Zimmerman\n\t"DocWagon 19" by Jennifer Brozek\n\t"Big Dreams" by R. L. King\n\t"Blind Magic" by Dylan Birtolo',
		edition: 5,
		gameDate: '2075',
		name: 'Sprawl Stories Vol. 1',
		notes: 'A compilation of previously released novels.',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		sku: ['26874'],
		status: 'missing',
		type: 'print'
	},
	{
		category: 'novel',
		description: 'HONG KONG. A stable and prosperous port of call in a sea of chaos, warfare, and political turmoil. The Hong Kong Free Enterprise Zone is a land of contradictions - it is one of the most successful centers of business in the Sixth World, and home to one of the world’s most dangerous sprawl sites. A land of bright lights, gleaming towers, and restless spirits where life is cheap and everything is for sale.',
		edition: 5,
		gameDate: '2075',
		name: 'Hong Kong',
		originalLanguage: 'en-US',
		publisher: ['Harebrained Schemes'],
		releaseDate: ['2016'],
		sku: ['RET-NOV'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Seven and a half million people crammed into about 1,100 square kilometers. Nearly 6,800 people per square kilometer. Not the tightest-packed city in the world, at least not in terms of people, but still up there. But in terms of wealth, secrets, intrigue, and double-crosses? No place in the world is more densely packed. With seven and a half million people, you have seven and a half million personal agendas, and fifteen or twenty million schemes to get ahead in the world, because nobody has just one. Those plans run from the wealthiest corporations jockeying for politically and magically advantageous positions in the city to the poorest of the poor, fighting to avoid being devoured by the horrors that lurk in the Kowloon Walled City. Step into the sprawl and prepare to trip over conflicting agendas, spiraling plots, and secrets nested in secrets.',
		edition: 5,
		gameDate: '2055',
		name: 'Shadorwun Returns: Hong Kong Sourcebook',
		originalLanguage: 'en-US',
		publisher: ['Harebrained Schemes'],
		releaseDate: ['2016-02'],
		sku: ['RET-SBK'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: "Originally included with the Shadowrun, Third Edition, Gamemaster's Screen, this book is a complete catalogue of paranormal critters for Shadowrun. In addition to critter stats and short descriptions, it includes all of the rules you need for using critter powers. 48 Pages.",
		edition: 3,
		gameDate: '2060',
		name: 'Critters',
		names: {
			'de-DE': 'Critter',
			'fr-FR': 'Les Métacréatures'
		},
		originalLanguage: 'en-US',
		publisher: [
			'FASA Corporation',
			'Fantasy Productions',
			'Descartes Editeur'
		],
		releaseDate: [
			'1998-12',
			'1999',
			'2000',
			'2004-07'
		],
		sku: [
			'7002X',
			'25008',
			'10739'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'First GM Screen, bundled with "Silver Angel" adventure.',
		edition: 1,
		gameDate: '2050',
		name: "Shadowrun Game Master's Screen",
		names: {
			'de-DE': 'Spielleiterschirm Erste Edition',
			'fr-FR': "L'Écran première édition"
		},
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		releaseDate: [
			'1989',
			'1990-01'
		],
		sku: [
			'7102',
			'10701'
		],
		type: 'scan'
	},
	{
		category: 'novel',
		description: 'The last FASA novel, announced in Europe, but never released.',
		edition: 3,
		gameDate: '2060',
		name: 'Private Agenda',
		notes: 'This was the last FASA novel, announced but never released. Here for historical reasons.',
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		sku: [
			'58XX',
			'n/a'
		],
		status: 'canceled',
		type: 'physical'
	},
	{
		category: 'mission',
		description: 'A unreleased adventure announced by FASA.',
		edition: 3,
		gameDate: '2060',
		name: 'Running Short',
		notes: 'An adventure announced by FASA, never released. Here for historical reasons.',
		originalLanguage: 'en-US',
		publisher: ['FASA Corporation'],
		sku: ['7321'],
		status: 'canceled',
		type: 'physical'
	},
	{
		category: 'mission',
		description: "CMP 2013-01 Jailbreak Rock\nIf the payday is high enough, are you willing to bust a dragon out of a Denver jail? Shadowrun 5th Living Campaign. Help a fellow Runner out. A fellow Chummer is locked behind bars in Denver and is looking for help getting out. Brave the Cold and the Dragon to help a Runner.\n\nCMP 2013-02 Berlin Waltz\nEscort an injured Mr. Johnson to Berlin, with a dragon's minions on your tail! Shadowrun 5th Living Campaign. Welcome to Deutschland, come for the Schnitzel stay for the Neu-yen. When Mr. Johnson needs a hand moving some valuble items who's he gonna call.\n\nCMP 2013-03 Neo-Tokyo Fusion\nThe Ragin' Gaijin are the hottest indy band in Neo-Tokyo, but now they need to be rescued. Shadowrun 5th Living Campaign. Mr. Johnson's favorite Japanese Pop band has gone Missing, help locate the missing Musicians and the Wasabi Rolls are on him, Fail and you may find yourself turning Japanese. \n\nCMP 2013-04 Ballroom Blitz\nThere's a party at Underworld 93 and everyone's invited. Everyone. Shadowrun 5th Living Campaign. All roads lead to Seattle, Mr Johnson has one last run, to protect his assets from would be Assassins. Enjoy all the fine Dining Downtown has to offer...it may be your last night on the town.",
		edition: 5,
		gameDate: '2075',
		name: 'CMP 2013: Dragon Song Series',
		notes: 'A series of adventures played at conventions, not relesed afterwards.',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		sku: ['26CMP13-1'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'mission',
		description: "CMP 2013-05 Rolling the Dice\nWelcome to the Sixth World, shadowrunner. This time, your fixer has you lined up for a job in the California Free State. It's a straightforward acquisition from Ares Arms - or at least that's what you're told.\n\nCMP 2013-06 Double Down\nDeeper into the shadows of San Francisco and CalFree! The shadowrunners must recover a drone shot down in the mountains. Out of the city and into the wilderness - fresh air, fresh challenges, and fresh ways to get fragged...\n\nCMP 2013-07 Full House\nA big part of being a shadowrunner is breaking things for money. This time, Mr. Johnson wants you to break an entire MCT facility. No smash & grab, just smash! But is it really that simple?\n\nCMP 2013-08 Going for Broke\nOne more job in San Francisco, CalFree. A simple bodyguard job, keeping a computer programmer safe. Easy nuyen, right? Sure, chummer, if you say so... Theres a hit out for a software designer, and its your job to keep him alive. Think you can pull it off?",
		edition: 5,
		gameDate: '2075',
		name: 'CMP 2013: Dangerous Games Series',
		notes: 'A series of adventures played at conventions, not relesed afterwards.',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		sku: ['26CMP13-2'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'mission',
		description: 'CMP 2014-05 Silence is Golden\nMr. Johnson needs a job done quietly, in and out without being seen. Think your team is up to the task? A Shadowrun Missions Living Campaign adventure. Shadowrun 5th Edition character needed.\n\nCMP 2014-06 A Night’s Work\nSounds like a simple job, but don’t they all? Either way runners get paid for a simple night’s work, right? A Shadowrun Missions Living Campaign adventure. Shadowrun 5th Edition character needed. Please check out Welcome to the 6th World events to learn the system and make a character...\n\nCMP 2014-07 Run out the Guns\n“Rumor has it that Ares is about to unveil a breakthrough in firearms technology. Would you kindly go steal that for me?” A Shadowrun Missions Living Campaign adventure. Shadowrun 5th Edition character needed.\n\nCMP 2014-08 Demolition Run\nSometimes the Johnson wants it quiet. Sometimes he wants it loud and noisy. Tonight, he wants the latter. A Shadowrun Missions Living Campaign adventure. Shadowrun 5th Edition character needed.',
		edition: 5,
		gameDate: '2075',
		name: 'CMP 2014: Company Man Series',
		notes: 'A series of adventures played at conventions, not relesed afterwards.',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		sku: ['26CMP14'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'mission',
		description: 'CMP 2015-01 Copperhead Road\nCMP 2015-02 Rolling on the River\nCMP 2015-03 Cinco de Mayo in Memphis\nCMP 2015-04 Leavin’ Tennessee',
		edition: 5,
		gameDate: '2075',
		name: 'CMP 2015: Tennessee Suite Series',
		notes: 'A series of adventures played at conventions, not relesed afterwards.',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		sku: ['26CMP15-1'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'mission',
		description: 'CMP 2015-05 Carrying the Torch\nCMP 2015-06 Opening Ceremonies\nCMP 2015-07 Citius Altius Fortius\nCMP 2015-08 Closing Ceremonies',
		edition: 5,
		gameDate: '2075',
		name: 'CMP 2015: Deadly Competition Series',
		notes: 'A series of adventures played at conventions, not relesed afterwards.',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		sku: ['26CMP15-2'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'mission',
		description: 'CMP 2016-01 - Broke Down in KC\nThe definitive Maria Mecurial tribute singer has gone missing, but why? Engine trouble lands your team in KC. Coincidentally, a local Mr. Johnson has a milk run for you. Quick and easy nuyen, right?\n\nCMP 2016-02 - The Midwest Farmer\'s Daughter\nAllied with the KC Mob, Agri-Seeds, is expanding and everyone sells… or else. A team is hired to protect an executive’s family from aggressive negotiations during an attempted hostile takeover. Simple and easy, right?\n\nCMP 2016-03 - Today Isn\'t Your Day, Tomorrow Isn\'t Looking Good Either\nWhat happens when the hit team becomes the targets?\n\nCMP 2016-04 - Mage Without A Face\nThe mob loves hitters, but they love cleaning up loose ends even more.',
		edition: 5,
		gameDate: '2075',
		name: 'CMP 2016: BBQ Bob Series',
		notes: 'A series of adventures played at conventions, not relesed afterwards.',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		sku: ['26CMP16-1'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'mission',
		description: 'CMP 2016-05 - Casablanca\nAfter a successful run, you have three days to wait in the legendary African port city before your contact shows up with your payment. What could possibly go wrong?\n\nCMP 2016-06 - Cape Town\nMaybe this time you can actually lay low while laying low. With any luck, you won’t run into the same trouble on the southern end of the continent that you did on the northern end.\n\nCMP 2016-07 - Mumbai\nThere’s one problem in hiding needles amidst a stack of needles. Everyone is sharp.\n\nCMP 2016-08 - Singapore\nIn a city locked down by the most prolific police force on the planet, opportunity abounds for the intrepid shadowrunner. The only question being is the job worth the cost?',
		edition: 5,
		gameDate: '2075',
		name: 'CMP 2016: World Tour',
		notes: 'A series of adventures played at conventions, not relesed afterwards.',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		sku: ['26CMP16-2'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'mission',
		description: 'CMP 2011-01 Moving Day\nExtracting one person can be tough. Extracting an entire family? That’s on a whole different level. They say “Never deal with a dragon,” but maybe they should add “Never do a job involving grade schoolers and hormonal teens”!\n\nCMP 2011-02 The Prize of Failure\nEvery Johnson promises an easy job, and this one’s no exception. Scare an unwilling scientist into extracting willingly. You don’t even have to do the extraction yourself. How hard could this be?\n\nCMP 2011-03 Threads of the Past\nA rockslide on Mt. Rainier has uncovered an ancient ship embedded in the rock, and a tunnel leading into previously unknown caverns inside the volcanic mountain. Grab some rope, lanterns, and a 3 meter pole, because you’ve just been hired to explore this ancient cavern.\n\nCMP 2011-05 Burn Notice\nNever deal with a dragon? How do you tell him no when Perianwyr calls you to his club in Denver with a job offer? A rogue spy has been causing no end of headache for the Great Dragon Ghostwalker, and he wants this spy burned down. Succeed and you’ll get a great payday. Fail and you could end up lunch.\n\nCMP 2011-06 TRO 2073\nThe new season of Desert Wars are brewing, and Ares has a new toy it wants to unveil: A 30 foot tall mech. It’s unwieldy, ungainly, and totally impracticable for modern warfare, but it makes for one hell of a publicity stunt. Ares needs a team of mercs to pilot and/or escort this so-called battlemech. Can the runners keep it in one piece and survive the opening round of Desert Wars 2073?\n\nCMP 2011-07 Super Brawl Sunday\nIt’s Super Brawl 2073, and the fix is in! When you’re hired to infiltrate and fix the biggest sporting event of the year, can you handle the pressure? And more importantly, will you get a pair of sneakers named after you?\n\nCMP 2011-08 Ain’t That a Kick in the Head?\nBarry Mana, the troll with a voice like Sinatra and dance moves like Astaire, has once again come under death threats from ant-metahuman rights groups. When he narrowly escapes two assassination attempts in one night, he decides it’s time to call in some help. Ring-a-ding-ding, baby. Keep this cat alive while he pulls of the show of his career in the City of Lights, Las Vegas!',
		edition: 4,
		gameDate: '2073',
		name: 'CMP 2011',
		notes: 'A series of adventures played at conventions, not relesed afterwards.',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		sku: ['26CMP11'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'mission',
		description: 'CMP 2018-01 - Viva Las Vegas: Dead Man\'s Hand\nThe team is called out to Las Vegas to help a gambler out with a goon issue. When the Johnson doesn\'t show up for the meet, they only have so long before their paycheck becomes a mirage.\n\nCMP 2018-02 - Viva Las Vegas: You\'re Nobody till Somebody Loves You\nThe heart wants what it wants, but there are those who don\'t approve of this union. The team is hired to extract a mafia princess from the family, but is it love or leverage Mr. J is looking for?\n\nCMP 2018-03 - Viva Las Vegas: Sin City Sabotage\nA new resort is opening up on the strip, and the VIP weekend is coming up. Mr Johnson wants you to make this a particularly memorable event for all the investors.\n\nCMP 2018-04 - Viva Las Vegas: Ain\'t That a Kick in the Head?\nIn Las Vegas, a single night out can make or break anyone. Mr Johnson decides to let it ride on the runners, in a bid to knock over a casino. The security may be state of the art, but a single pull of the lever can change a life.',
		edition: 5,
		gameDate: '2080',
		name: 'CMP 2018: Viva Las Vegas',
		notes: 'A series of adventures played at conventions, not relesed afterwards.',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		sku: ['26CMP18-1'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'mission',
		description: 'CMP 2018-05 - Cerulean Shadows: Letter of Marque\nCargo ships are turning up missing on their way to Metropole, and the owners aren\'t too happy about it. The team is hired to crew a decoy vessel in order to capture the elusive Pirate before they can strike again.\n\nCMP 2018-06 - Cerulean Shadows: Honor Amongst Thieves\nBusiness is business, right? The team gets an interesting offer from someone they just had arrested. A little nuyen goes a long way toward forgiveness.\n\nCMP 2018-07 - Cerulean Shadows: No Prey, No Pay\nAn offer comes in from an independent Johnson looking to turn the screws on some of the shipping corporations operating in the Caribbean, and hopefully fund out why boatloads of people have gone missing. Taking down a cargo ship, the team finds more than they signed on for.\n\nCMP 2018-08 - Cerulean Shadows: X Marks the Spot\nNothing stays hidden forever. Even the best kept secrets eventually come to light. A mysterious private island with a corporate facility, and hundreds of brainwashed prisoners stand between the runners and a real payday.',
		edition: 5,
		gameDate: '2080',
		name: 'CMP 2018: Cerulean Shadows',
		notes: 'A series of adventures played at conventions, not relesed afterwards.',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		sku: ['26CMP18-2'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'mission',
		description: 'CMP 2017-01 - Ante Up\nMrs. Johnson needs to extract an executive, but there is always a catch. Can you beat Knight Errant when extracting them from a brothel run by spirits all the while meeting exacting standards?\n\nCMP 2017-02 - Double or Nothing\nMrs. Johnson needs a demolition run on a rival biomedical company to delay production. Will the shadowrunners go in loud & hard or find a subtler approach?\n\nCMP 2017-03 - Let it Ride\nMrs. Johnson has an internal rival that she needs leverage on. All you need to do is find changeling child & prove paternity to disgrace the rival, but is it ever that simple?\n\nCMP 2017-04 - Cash Out\nMrs. Johnson needs a team to raid an underground lab & torch it. What could possibly be in this lab & who is running it... or does that really matter with a paycheck like this?\n\nCMP 2017-05 - The Heart of it All\nYou\'ve been sent to Columbus, Ohio to rescue a wealthy, corporate kid from a gang of Triads. It turns out he is a Yakuza boss\' son. Now, you just have to prevent an all-out war in the shadows. When the son of an international crime lord\'s son goes missing a gang war is ready to erupt out of the shadows; and that would be bad for biz. Perhaps some neutral, outsiders can run the shadows quick enough to keep the peace - such as it is.\n\nCMP 2017-06 - A Friend in Need\nA friend of a friend needs his hoop pulled from the fire. Then, his friends want to send a message to those who run in the shadows by arranging revenge against the one who burned him. The revenge needs to be public and precise. Keep your friends close and well... When a deep, undercover operative is double crossed he needs his hoop pulled from the flames. Then, there is the small matter of dealing with the one who betrayed him.',
		edition: 5,
		gameDate: '2080',
		name: 'CMP 2017',
		notes: 'A series of adventures played at conventions, not relesed afterwards.',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		sku: ['26CMP17'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'mission',
		description: 'A strange package given into the care of the runners leads them in a high stakes fight through Manhattan as supernatural forces try to recover it. Who can the runners trust? Where can they turn?',
		edition: 4,
		gameDate: '2070',
		name: 'Hunters Hunted',
		notes: 'An Prime Mission announced for the Year of Shadowrun but never released.',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		sku: ['X27PM001'],
		status: 'canceled',
		type: 'physical'
	},
	{
		category: 'mission',
		description: 'A missing persons case, ritual magic, and corporate intrigue come together in Denver, with the runners stuck in the middle. Can you get out in one piece?',
		edition: 4,
		gameDate: '2070',
		name: 'Well Preserved',
		notes: 'An Prime Mission announced for the Year of Shadowrun but never released.',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		sku: ['X27PM002'],
		status: 'canceled',
		type: 'physical'
	},
	{
		category: 'novel',
		description: 'FOUR CLASSICS. ONE VOLUME. PURE SHADOWRUN\nShadowrun fans know. They love the dark alleys and darker plots of the Sixth World, and they know that Nigel Findley wrote some of the best Shadowrun novels ever. Now, for the first time, his four iconic books are collected in a single volume.\nWhether you’ve loved Shadowrun fiction for years or are just now being introduced to it, the novels of Nigel Findley are a superb place to start. This exclusive edition contains:\n\t• 2XS, which introduces private detective Dirk Montgomery and pits him against the mysterious sources of a chip even more addictive than the strongest BTLs;\n\t• Shadowplay, featuring a veteran decker and a young shaman who stumble on lost technology that puts them up against one of the world’s largest megacorporations—and the Corporate Court itself;\n\t• Lone Wolf, where an undercover Lone Star operative finds himself in the middle of an exploding gang war; and\n\t• House of the Sun, which brings back Dirk Montgomery and sends him to Hawai’i, where he runs afoul of the government, a ritual sacrifice, powerful elves, and very unpleasant bugs.\n\tThis omnibus provides a unique opportunity to dive into the complete novel output of one of Shadowrun’s finest writers. Let Nigel Findley show you what it really feels like to run in the shadows!',
		edition: 4,
		gameDate: '2050',
		name: 'Nigel Findley Omnibus',
		notes: 'Bundle of 4 novels.',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2010-05-06'],
		sku: ['26404'],
		status: 'outofscope',
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Wer den Wind sät, wird den Sturm ernten! (Hosea, Kapitel 8 , Vers 7)\n\n"Dich kann nichts mehr erschrecken? Du meinst, dein Leben wäre ein endloser Prozess der Wiederholung der gleichen dreckigen Straßen und Städte? Nichts ist, wie es ist, glaub mir! Du hast nur noch nicht für die Großen gearbeitet. Für diejenigen, die das Geschick der Welt mitbestimmen und dich unter ihren Fingern zerquetschen können, wenn du nicht schnell bist - und besser als die anderen. Aber wenn du dich hineinziehen lässt in das große Geschäft, dann pass auf, dass du nicht zwischen die Fronten gerätst. Und dass du dein Geld ausgibst, bevor es dich erwischt, denn im Spiel der Götter kannst du nur verlieren!"\n\nSchockwellen ist ein Kampagnen-Band, der die Runner in den Kampf zweier Giganten hineinzieht und nicht mehr daraus entkommen lässt. Er wird sie in die dunklen Straßenschluchten deutscher Megaplexe führen, an die Strände der Südsee, in die Fjorde der Skandinavischen Union, tief unter die Fluten der toxischen Nordsee und noch viel, viel weiter. Dabei werden sie Geheimnisse erfahren, die sie lieber nicht hätten wissen wollen, und endlich einen entscheidenden Blick hinter die Kulissen des mysteriösen Konzerns aus der Nordsee werfen - nichts wird bleiben, wie es war.\n\nSchockwellen besteht aus zehn zusammenhängenden Abenteuern, die nachhaltig das Schicksal der Proteus AG bestimmen werden und bietet außerdem umfassende Hintergrundinformationen über den Giganten aus der Nordsee und die weiteren Protagonisten der Kampagne. Dabei wird die Storyline der ADL weitergeschrieben.',
		edition: 3,
		gameDate: '2063',
		name: 'Schockwellen',
		names: {
			'en-US': 'Shockwaves'
		},
		originalLanguage: 'de-DE',
		publisher: ['Fantasy Productions'],
		releaseDate: [
			'2003',
			'2006'
		],
		sku: ['10763'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: "Découvrez la France de 'an 2057!\n\nUn Pays moderne fortement bouleversé par de puissants conflicts ayant conduit à l'instauration de la domination de quatre grandes familles siégeant au Conseil Oligarchique aux côte d'un cardinal, d'un rand druide et d'un représentant de la famille Villiers.\n\nVisitez les nouvelles régions françaises!\n\nParmi toutes les provinces présentées, n'hésitez pas à aller explorer la Bretagne dont une partie est restée prisonnière de la Brume, un étrange phénomène inexpliqué ayant ouvert le passage à des Ankous, des êtres humanoïdes cadavériques aux longs cheveux blancs animés des pires intentions. Mais attendez-vous à bien des surprises dans les autres régions et duchés.\n\nAllez faire une virée à Paris!\n\nMais il faut être solide survivre dans une mégalopole d'un diamètre d'environ 90 km où sévissent les gangs les plus sauvages, où tant de choses ont changé sous la pression de l'affluence de populations pas toujours avide d'honnêteté. Quartier par quartier, secteur par secteur, et même par sous-sol, explorez une ville où toutes les bonnes affaires (et les autres) sont possibles.\n\nSHADOWRUN FRANCE est un supplément pour le jeu de rôle Shadowrun conçu pour permettre la mise en place de véritables campagnes dans la France de années 2057. Bien qu'il soit plus praticulièrement destiné aux maîtres de jeu, les joueurs peuvent aussi y trouver une foule d'informations susceptibles de les intéresser directement tant elle seront utiles à leurs shadowrunners. En dehors d'une description détaillée du fonctionnement économique et politique du pays, d'une pésentation complète des événements historiques qui ont permis l'avènement du régime actuel, une foule de renseignements pratiques touchant tous les domaines d'activité et des règles particulières à la magie de Bretagne accompagnent la description de nouveaux équipments et de métacréatures inédites. Des cartes géographiques originales, la descrition approfondie des plus grandes villes françaises et des illustrations de qualité font de ce supplément une source de renseignements indispensable.",
		edition: 2,
		gameDate: '2057-02',
		name: 'France',
		notes: 'A complete description of France from the world of Shadowrun in 2057, with its history, political system, organization of society, organized crime, most powerful duchies, new creatures, new equipment, new spells, etc. French only. Considered semi/non-cannon.',
		originalLanguage: 'fr-FR',
		publisher: ['Descartes Editeur'],
		releaseDate: ['1997'],
		sku: [
			'SRF',
			'2-7408-0147-5'
		],
		status: 'missing',
		type: 'print'
	},
	{
		category: 'mission',
		description: 'Unreleased Adventure.',
		edition: 3,
		gameDate: '2064',
		name: 'Running Wild',
		notes: 'Unreleased adventure.',
		originalLanguage: 'en-US',
		publisher: ['Fantasy Productions'],
		sku: [
			'10674',
			'25005'
		],
		status: 'canceled',
		type: 'print'
	},
	{
		category: 'novel',
		description: "One morning, Oliver Martin wakes up to find he no longer exists, with no job, SIN, nuyen, or even a place to live. He's been completely wiped from the Matrix, with a new identity replacing his. Only this one's on Lone Star's Most Wanted List, and Oliver's usual morning turns into the first run of his life. Boston's mean streets hold the keys to Oliver's fight to reclaim himself and discover who's behind his redacted identity. Falling in with a shadowrun team, he uncovers a conspiracy within MIT&T that could bring down the corporate walls of the city before it's through and take him right along with it.",
		edition: 5,
		gameDate: '2064',
		name: 'Identity Crisis',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2020-05-20'],
		sku: ['26859'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "Jimmy Kincaid, burned-out mage and P. I., has a lot on his plate. Gang wars, feuding mobsters, unreliable magical power, and an encrypted data file that's already cost him friends, but he can't even access. When the troubles of the Seattle sprawl deepen into a bloody conspiracy with ties to neighboring nations and inhuman powers, he knows he's on the job of his life. Luckily, he's not alone. A man like Jimmy can't walk these shadowed streets without making enemies, but he's made allies, too.\nHopefully those allies will be able to save Jimmy from the dark, powerful forces converging on him...before it's too late for everyone...",
		edition: 5,
		gameDate: '2064',
		name: 'Stirred',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2020-08-21'],
		sku: ['26861'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Die neue Lichtaura der Metropole lässt Berlin wie einen Stern im Dunkel der ADL erscheinen. Hier zeigt es sich, dass die Konzerne für die Metamenschheit sorgen. Du willst Strom, Nahrung, einen Arbeitsplatz? Dann lass dich registrieren, begib dich in die behütenden Arme der neuen Ordnung, und bald schon wirst du feststellen: Auch du hast deinen festen Platz in der Gesellschaft.\n\nlaSS DiCh niCHt vOn Der KonZERnPROPAgaNda täUscHEN! diE AuToNoMe SZEnE isT nichT ToT. DORT WO dIe kiEZE sIch iLleGal aNs sTrOMNeTz HängEN, Wo Der TrOlL mIT dEr sCHrOTFlinTE Im ERDgESChosS DEiN bester FReuNd ISt, Wo Du miT DEn FALSCHen GangfARBeN erSChosSEn WIrst, GILt DaS lEtZte GESETz! Die SChAtteN IN bERLin sind TIEF..., dIE sOzIalen netze EnG – PAsS alsO AuF, Wann du für wen WAS erLedigsT. sonST GEHST du im HaifiSCHbeCKEn UntER.\n\nDas Berlinbuch\n\nDer Führer durch Licht und Schatten des Megaplex. Mit zwei beschriebenen Stadtvierteln, 16 Locations mit Grundrissen, Bezirksbeschreibungen, Konzerndossier, illegalen Machtgruppen, urbane Mythen und weiteren unerlässlichen Informationen über das große B an der Spree.',
		edition: 4,
		gameDate: '2074',
		name: 'Berlin',
		notes: 'German sourcebook about Berlin.',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: [
			'2010-10',
			'2012-01-15'
		],
		sku: [
			'45201',
			'45200'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Die Allianz Deutscher Länder – ein Flickenland, eine Region voller Gegensätze, ein tief mit den Schatten verwobenes Land. Hier finden sich Trollrepubliken, Elfenstaaten, toxisch verseuchte Zonen und riesige Megaplexe. Berlin mit seinem ewigen Konflikt zwischen anarchistischen Kiezen und Konzernhochburgen. Hamburg mit seinen überfluteten Straßen und dem Sprungbrett zur verseuchten Nordsee. Der Rhein-Ruhr-Megaplex, ein Schmelztiegel aus Ghettos, Stadtzentren, Industrie und Konzernen – über dem der Drache Lofwyr in Neu-Essen thront. Und gerade weil die ADL so heterogen ist, eine Mischung aus wuchernder Wildnis und wimmelnder Urbanität, entlegenen Fluchtorten und überbauten Städten, Erwachten Mysterien und verseuchten Landstrichen, sollten sich Runner hier gut auskennen. Sonst fressen einen die Schatten schneller, als man die nächste Grenze erreichen kann.\nDatapuls: ADL ist ein Hardcover-Quellenbuch für Shadowrun 5, das einen Überblick über die aktuelle Lage in der Allianz Deutscher Länder im Jahre 2078 präsentiert. Es bietet dabei neue Einblicke, gibt aber auch Zusammenfassungen des schon Bekannten, um neuen wie alten Spielgruppen die ADL zur Heimat für ihre Runs und Runner zu machen. Neben Beschreibungen des Lifestyles, der Konzern- und Staatswelt, von Subkulturen, Magie und Matrix wird ein Fokus auf die drei Plexe Berlin, Hamburg und Rhein-Ruhr-Megaplex gelegt. Aber auch Kurzbeschreibungen der SOX, der Trollrepublik, des Kirchenstaats Westphalen und des Elfenherzogtums Pomorya sind zu finden, genauso wie Einblicke in dunkle Metaplot-Mysterien, neue NSCs und Grundrisse für den direkten Gebrauch am Spieltisch. Immer wieder unterbrochen von Datapuls-Nachrichten der neuesten Ereignisse – denn uninformierte Runner sind tote Runner.',
		edition: 5,
		gameDate: '2078',
		name: 'Datapuls: ADL',
		notes: 'German sourcebook about Germany.',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2016-10-12'],
		sku: [
			'47020',
			'47021'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Hamburg – ein Runnerparadies. Der Sprawl bietet einen Ausgangspunkt für diverse Schattenaktivitäten, national und international. Von den Villenvierteln in Lauenburg bis zu den dreckigen Hinterhöfen von Klein-Russland, von den Hafenkaschemmen der Wattsammler bis zu den Hochglanz-AR-Kinos der Musikinsel, von den wilden Vergnügungen der Reeperbahn bis zum täglichen Kampf ums Überleben im Slum Wildost – der Edelstein an der Elbe glänzt in den unterschiedlichste Facetten. Und hinter jedem Glanz lauert Schatten: Medienkonzerne ringen um Marktanteile, Voodoo-Zirkel jagen toxische Magier, Verschwörer nehmen Einfluss auf die Politik, in überschwemmten U-Bahntunneln werden illegale Waren gehandelt, grüne Terroristen wollen die Metamenschheit zerstören. Und in der Unterwelt tobt ein Schattenkrieg zwischen Triaden, Vory und Likedeelern, der selbst die Schattengemeinde zerreißen könnte.\nDatapuls: Hamburg ist ein Quellenbuch für Shadowrun 5. Es bietet detaillierte Hintergrundinformationen zu den einzelnen Stadtteilen, vielen unterschiedlichen Locations, Hotspots wie dem Ohlsdorfer Friedhof oder der Sardinenstadt, Mächtegruppen aus Unterwelt und Politik, einflussreiche Konzerne im Megaplex sowie den Schattenseiten der Elbmetropole. Neben Beschreibungen von Wildost, magischen Gruppen und den Gefahren des Watts und der Nordsee wird auch viel Material für den Spielleiter geboten, um Hamburg zu einer einzigartigen Heimat für Runner zu machen. Abgerundet wird der Rundblick durch große Karten von Hamburg, Wildost und der Neuen Mitte, die dem Buch beiliegen und die mehr als 300 beschriebenen Locations genau verorten.',
		edition: 5,
		gameDate: '2078',
		name: 'Datapuls: Hamburg',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2018-10-07'],
		sku: ['45061'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Manchmal reicht es nicht, alle Informationen zu besitzen. Manchmal muss es einfach mehr sein. Manchmal muss man mit den Informationen spielen können, sie praktisch nutzen, tiefer in etwas eintauchen. Das gilt nicht nur für die Schatten der Sechsten Welt, es gilt auch für den heimatlichen Spieltisch. Hamburg, der Megaplex an der Elbe, ist ein Spielplatz für Runner, der mehr verlangt und deswegen auch mehr bietet. Damit man noch weiter unter die Oberfläche des dunklen und allgegenwärtigen Wassers des Venedigs an der Elbe vordringen kann.\nDer Zusatzpack zu Hamburg für Shadowrun 5 bietet nicht nur einen speziellen Spielleiterschirm. Es liefert zudem einen Kurzroman zur Stadt, eine Inplay-Werbebroschüre für Runner und andere Schattentouristen, mehr als zwanzig Charaktere aus dem Sprawl mit Bild und Spielwerten auf praktischen Karteiblättern, kleinere Übersichtskarten zu Gangaktivitäten, der Innenstadt und dem öffentlichen Nahverkehr sowie Daten für den Download eines ganz besonderen Soundtracks. So haben Runner Hamburg noch nie erlebt.',
		edition: 5,
		gameDate: '2078',
		name: 'Hamburg - Zusatzpack',
		notes: 'Complementary material to Datapuls: Hamburg, contains maps, booklets and a GM Screen.',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2018-10-07'],
		sku: ['45068'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Urbaner Schmelztiegel\n\nBerlin, Megaplex an der Spree. Für manche Zeichen der Konzernherrschaft. Für andere eine anarchistische Arche Noah. Für viele Bewohner der Ort, mit dem ihr Leben und ihr Schicksal unabänderlich verknüpft sind. Während in den Schatten neue Machtspieler des organisierten Verbrechens aufsteigen, breitet der Berlinkonzern seine Arme wie eine Krake über den Plex.\nDatapuls Berlin beleuchtet diesen Moloch der Sechsten Welt und liefert zusätzliche Informationen zu denen, die schon im Datapuls ADL publiziert wurden: neuste Verwicklungen und Ränkespiele, ein tiefer Blick in die Machtstrukturen der Berlin AG, neue Gangs und Banden in den anarchistischen Vierteln. Zudem werden in diversen Karten Locations und andere wichtige Orte aufgeführt und sowohl das Wedding als auch das Emirat Berlin genauer beschrieben.',
		edition: 5,
		gameDate: '2075',
		name: 'Datapuls: Berlin',
		notes: 'German sourcebook about Berlin.',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2018-02-16'],
		sku: ['470D1'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Trolle und Erwachter Wald\n\nDer Schwarzwald, seit dem Erwachen der Sechsten Welt ein Ort voller Gefahren, Geister, wilder Magie und gefährlichen Crittern. Für manche ist es eine lebensfeindliche Umgebung, für andere ist es lukratives, aber tödliches Jagdrevier. Und für die Einwohner der Trollrepublik ist es schlicht ihre Heimat. Doch während die meisten Trolle, Orks und Riesen einfach nur Ruhe und Frieden suchen, braut sich im Inneren und an den Grenzen ein Sturm zusammen.\nDatapuls Trollrepublik und Schwarzwald beleuchtet das Land im Südwesten der ADL und seine hocherwachte Natur mit all ihren Mythen und arkanen Mysterien. Zudem liefert der Datapuls einen Einblick in politische Machtspiele, die Agenda des Trollthings, Unterweltorganisationen sowie verdächtige Konzernaktivitäten in der Republik. Und in die Möglichkeiten, die sich Shadowrunnern in den Schatten der dunklen Tannen bieten – sollten sie es lebend wieder herausschaffen.',
		edition: 5,
		gameDate: '2075',
		name: 'Datapuls: Trollrepublik und Schwarzwald',
		notes: 'German sourcebook about the ADL.',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2018-03-11'],
		sku: ['470D2'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Magie und Militär\n\nAuf den Straßen regieren die Soldaten. Die Bundeswehr hat die Stadt unter Kontrolle, verhängt Ausgangssperren und sorgt für Sicherheit und Ordnung. Aber hinter diesem Vorhang des Alltäglichen wartet die Bedrohung: In der magischen Fächerstadt erwachen arkane Phänomene. Geomantie und paranormale Erscheinungen werden von den ansässigen Instituten und Konzernen erforscht. Und gefährliche Geheimbünde flechten in den Schatten ihre ganz eigenen, finsteren Verschwörungen.\nDatapuls Karlsruhe wirft ein Licht auf die Sonderverwaltungszone Karlsruhe als Bundeswehr-Stadt und Fokus astraler Energien. Es liefert einen Einblick in Ränkespiele von versteckten Logen, den Alltag der Stadt, die ansässigen Mächtegruppen und bietet zudem eine tiefere Sicht in die Bundeswehr der Allianz Deutscher Länder. Hier können Runner ganz neue Abenteuer erleben – und sich mit Mächten anlegen, denen nur wenige gewachsen sind.',
		edition: 5,
		gameDate: '2075',
		name: 'Datapuls: Karlsruhe',
		notes: 'German sourcebook about the ADL.',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2018-03-23'],
		sku: ['470D3'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Wiener Walzer und wilde Schatten\n\nÖsterreich, das Nachbarland der ADL. Von Kriegen gezeichnet, von einer ganz eigenen Kultur geprägt, durchsetzt von Lebenslust, wilder Natur, Konzernintrigen und seinen Schatten, in denen sich Ausländer erst einmal zurecht finden müssen. Denn wenn Dr. Nowak, der österreichische Herr Schmidt, jemanden anheuert, könnten bald nicht nur die Mozartkugeln fliegen.\nDatapuls Österreich bietet einen neuen und aktuellen Einblick in den Alpenstaat. Vorgestellt wird nicht nur das Leben und die Besonderheiten der einzelnen Regionen, sondern auch die Machtgruppen und die Unterwelt, die Konzerne und die Staatsgewalt. Und natürlich die Schatten. Einen besonderen Fokus erhält Wien, inklusive eigener Stadtkarte. Und natürlich auch die Alpenzone mit ihrer erwachten Fauna. Wer in Österreich in die Schatten möchte, sollte sich also gut informieren – bevor er zwischen Salzburg und Wien verschollen geht.',
		edition: 5,
		gameDate: '2075',
		name: 'Datapuls: Österreich',
		notes: 'German sourcebook about Austria.',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2018-04-09'],
		sku: ['470D4'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'SOX – drei Buchstaben mit großer Bedeutung. Die Sonderzone Saar-Lothringen-Luxemburg entstand nach dem großen Reaktorunfall in Cattenom und ist seit dem ein Mysterium, denn die verseuchte Region bringt Tod und lebt doch. Sie beherbergt irre Sektenpaktierer, verstrahlte Glowpunk-Horden, Aussteiger und abgeschottete Konzernarkologien in einem einzigartigen Landstrich aus urbanen Ruinen, verheertem Ödland, wildwuchernder Natur, gefährlichen und mutierten Crittern und einer völlig unberechenbaren Manasphäre.\nDatapuls SOX beleuchtet dieses Land am Rande der ADL und jenseits der Grenzen der Gesellschaft. Innerhalb der streng überwachten Perimetermauern herrscht der Konzernrat oder es gilt das Recht des Stärkeren. Der Datapuls beschreibt unter anderem Schmuggler, versteckte Kommunen, besondere Orte, neue Critter und Gefahren, dunkle Geheimnisse und toxische Kräfte – Details, die ein Runner kennen sollte, wenn er hier sein Glück machen will. Damit er wenigstens nicht unwissend stirbt.',
		edition: 5,
		gameDate: '2075',
		name: 'Datapuls: SOX',
		notes: 'German sourcebook about the SOX.',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2018-04-09'],
		sku: ['470D5'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Die Fabeln erwachen!\nDie Sechste Welt dreht sich weiter. Immer neue paranormale Phänomene tauchen auf und wollen von der Metamenschheit erforscht werden. So auch in der Zoologie. Unbekannte Wesen warten an den unterschiedlichsten Orten rund um die erwachte Erde: Von Australien bis in die Alpen, vom Himmel bis in die Tiefen der Ozeane.\nNach dem Standardwerk Wildwechsel präsentiert Parazoologie neue Critter für die Welt von Shadowrun 4. Vom Abramshummer bis zum Wolpertinger - denn ob toxisch oder erwacht: Jeder sollte das Tier kennen, das hinter dem nächsten Strauch auf einen lauert.',
		edition: 5,
		gameDate: '2075',
		name: 'Parazoologie 2075',
		notes: 'German translation of Parazoology and Parazoology 2 - updated with rules for Shadowrun, 5th Edition.',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2014'],
		sku: ['47000GA'],
		type: 'digital'
	},
	{
		category: 'misc',
		description: '',
		edition: 5,
		gameDate: '2075',
		name: 'Systemdaten',
		notes: 'This item consists of a folio to store notes and character sheets as well as a sturdy cardboard version of the German SR5 character sheet. It was released by Pegasus for Gratisrollenspieltag 2014 (German Free RPG Day).',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2014'],
		sku: ['47000GC'],
		status: 'outofscope',
		type: 'print'
	},
	{
		category: 'mission',
		description: 'IT’S GOING DOWN\n\nIn any given sprawl, there are a few million people who hate a few million other people in an endless cycle of grudges and hostility. What keeps the peace is that most of the people lack the power to do anything about their anger, so a status quo of simmering tension is maintained. Problem is, if some of the angry parties got their hands on enough power of any kind, those simmering tensions would explode. DeeCee, the UCAS capital, is full of all kinds of power, and enough factions are grabbing for it that the prospect of open fighting or worse is growing.\nThis is especially worrisome since some of the factions have nothing on their mind other than utter destruction. The law firm of Stark, Theissen, and Van Der Mar is making too much money from the status quo to want it to change, and they’re about to discover that shadowrunners might be the only thing that can stop the advancing secret plots from plunging the sprawl into complete disaster.\nToxic Alleys is a complete adventure for use with Shadowrun, Fifth Edition. While it draws on existing plot lines, it stands on its own and can be enjoyed by any team of runners looking for a challenge.',
		edition: 5,
		gameDate: '2075',
		name: 'Toxic Alleys',
		names: {
			'de-DE': 'Toxische Wege'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Spiele'
		],
		releaseDate: [
			'2018-05-01',
			'2018-10-07'
		],
		sku: ['27405'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Hamburg kennt viele Arten von Wasser. Trübes Wasser, Brackwasser, steigendes und fallendes Wasser. Giftiges Wasser. Und in den wenigsten lauert etwas Gutes. Wer im Sprawl an der Waterkant Runs durchführt und in seinen Schatten Geld verdienen möchte, sollte auf nasse Überraschungen vorbereitet sein: auf dunkle Geheimnisse im Watt und auf Verfolgungsjagden durch die Kanäle von Wildost. Aber auch an Land warten Bedrohungen – selbst hinter den Kulissen der allgegenwärtigen Vergnügungen.\nEbbe und Flut ist ein Abenteuerband mit drei Abenteuern für Shadowrun 5, die in die Schatten Hamburgs führen. Die Runner begleiten Combat-Golfer bei Hole in One, untersuchen merkwürdige Vorkommnisse An der Nordseeküste und erleben Abenteuer Im Schatten der Scheinwerfer. Alle Abenteuer sind komplett spielfertig, inklusive Grundrisszeichnungen und Pläne. Es handelt sich um eine Eigenproduktion von Pegasus Press.',
		edition: 5,
		gameDate: '2075',
		name: 'Ebbe und Flut',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2018-10-07'],
		sku: ['45067'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Tipps für Assassinen, neuste Waffentechnologie, tödliche Paracritter: Das Schattenhandbuch bringt neues Material für Shadowrun 5 an die Spieltische, mit dem Spieler und Spielleiter die Sechste Welt noch näher erfahren können. Ob es um Schmuggel und unerlaubte Grenzübergänge geht, die Moral verdingter Killer, toxische Katzen oder einfach nur die Auswahl des nächsten Einsatzgefährts der Runnertruppe: Hier wird man fündig!\n\nDas Schattenhandbuch setzt die Tradition der Schattenkataloge aus der vorangegangenen Edition für Shadowrun 5 fort. In ihm enthalten sind die PDFs Feuer und Stahl, Kojoten und das Assassinen-Handbuch. Zudem präsentiert es Parazoologie 1 und das bisher noch nie auf deutsch veröffentlichte Parazoologie 2 – beide komplett aufbereitet für Shadowrun 5. Und zu guter Letzt darf auch ein exklusives ADL-AddOn mit brandneuen Vans und Waffen nicht fehlen.',
		edition: 5,
		gameDate: '2075',
		name: 'Schattenhandbuch',
		notes: 'Schattenhandbuch (Shadow Handbook) is a print compilation of several PDF publications and some new material.\nIt contains:\n\tCoyotes\n\tThe Assassin’s Primer\n\tGun Heaven 3\n\tParazoology\n\tParazoology 2\n\tKAPOWW (Shadowrun Germany)\n\tRAZANNG (Shadowrun Germany)\n\nSchattenhandbuch was published in a numbered limited edition with a print run of 3000 books.',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2014'],
		sku: ['45019'],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: 'Limited print edition of various SR5 pdfs.\nThis volume includes:\n\t- Schattenzauber (Shadow Spells)\n\t- Parabotanik 2075 (Parabotany, updated for SR5)\n\t- Parageologie (Parageology, updated for SR5)\n\t- Ätherologie (Aetherology)\n\t- Kugeln & Bandagen (Bullets & Bandages)\n\t- ADL Magie Update',
		edition: 5,
		gameDate: '2075',
		name: 'Schattenhandbuch 2',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2015'],
		sku: ['45034'],
		type: 'scan'
	},
	{
		category: 'sourcebook',
		description: 'Das Schattenhandbuch 3 ist der Nachfolger der Schattenhandbücher 1 und 2 – und führt die Reihe damit fort. Auch dieser Band enthält mehrere PDFs von der Plattform www.pegasusdigital.de für Shadowrun 5 in gedruckter Fassung, die sich alle dem deutschsprachigen Raum widmen:\n\t- Datapuls Berlin (ein neuer und tieferer Blick auf das große B an der Spree mit vielen Kiezkarten, Neuigkeiten aus der Unterwelt und Beschreibung des Berlin-Konzerns);\n\t- Datapuls Trollrepublik & Schwarzwald (ein Rundgang durch die Erwachte Welt des Schwarzwalds und durch die neue politische Lage der Trollrepublik);\n\t- Datapuls Karlsruhe (ein Besuch in der Sonderverwaltungszone, in der die Bundeswehr herrscht und deren merkwürdige arkane Phänomene dunkle Logen und Geheimbünde anziehen);\n\t- Datapuls Österreich (zu Gast in den österreichischen Schatten mit einem genaueren Blick auf Wien);\n\t- Datapuls SOX (eine Reise in die toxische Verbotszone, mit all ihren Glowpunks, Manalöchern, Crittern, Ghulstämmen und düsteren Konzernmachenschaften).\nHinzukommt ein kleiner, exklusiver ADL-Zusatz, der sich nur in diesem Buch finden und sich Fahrzeugen aus dem Nahverkehr der ADL widmet.',
		edition: 5,
		gameDate: '2075',
		name: 'Schattenhandbuch 3',
		notes: 'A German printed edition of the previeously released "Datapuls" series, with public transportation maps as an addition.',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2015'],
		sku: ['45039'],
		type: 'scan'
	},
	{
		category: 'mission',
		description: 'Es herrscht Krieg in den Straßen - doch nicht um Geld oder Macht, sondern um Punkte. Die Stadtkrieg-Saison hat wieder begonnen, die DeMeKo flutet die Medien mit Werbung für die Mannschaften, und die Fans machen sich auf einen heißen Sommer gefasst. In den Straßen und auf den Plätzen der geräumten Wohngebiete laufen die Stars der Chromlegion Bremen, der Naniten Nürnberg und der Berliner Cybears auf, um den Zuschauern ein Spektakel besonderer Art zu bieten - im blutigen Kampf um zwei Bälle und zwei Torzonen. Wen jucken da noch der jüngste Vereinsskandal oder die vertriebenen Bewohner der Spielareals?\nBlut und Spiele, von Pegasus für die deutsche Spielerschaft produziert, ist ein Abenteuerband für Shadowrun 4, der sich mit Stadtkrieg befasst - einer der brutalsten Sportarten der Sechsten Welt. In vier Abenteuern wird das Thema lose aufgenommen. In einem Zusatzkapitel wird der Sport genauer beleuchtet, die Liga in der Allianz Deutscher Länder beschrieben, hinter die Kulissen der Vereinsstrukturen geschaut. Neben Werten für Spieler und Sportpersonal ist auch die Beschreibung eines besonderen Sportevents enthalten - mit der man die vier Abenteuer im Band zu einer Kampagne der besonderen Art verknüpfen kann. Damit es auch bei den Runnern ankommt: Es ist wieder KRIEG!\nBlut und Spiele, Abenteuerband zu Shadowrun von Pegasus Press; ca. 200 Seiten, Hardcover',
		edition: 4,
		gameDate: '2074',
		name: 'Blut & Spiele',
		notes: 'German 200 page adventure.',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2011-06'],
		sku: ['46085'],
		type: 'scan'
	},
	{
		category: 'mission',
		description: 'Willkommen in Sioux Nation\n\nArkane Orte voller Macht. Megakonzerne mit finsteren Plänen. Schmuggler und Schamanen, Stammeshäuptlinge und rebellische Einzelgänger. All dies erwartet Runner bei einem Besuch in der Sioux Nation – und noch vieles mehr.\n\nMission Sioux Nation enthält einen detaillierten Einblick in die junge nordamerikanische Nation, in der Konzerne, Magie und alte Stammesriten das Schicksal bestimmen. Arkane Stätten voller Macht, gierige Megakons, große Städte und wilde Natur, all dies findet sich in diesem Band für Shadowrun 5, zusätzlich zu zwei großen Abenteuern: In Hungerbringer wandern die Runner auf dem schmalen Grad des Chaos entlang, während sie für Theo Two-Hearts einen wichtigen Job erledigen müssen – und dabei auf eine der stärksten Mächte der Sioux Nation treffen. In Eine strahlende Zukunft müssen die Runner für einen JackPoint-Kontakt nicht nur illegal über die Grenze kommen, sondern sich auch mit der Sioux National Police anlegen.',
		edition: 5,
		gameDate: '2075',
		name: 'Mission Sioux Nation',
		notes: 'A compilation of: "Shadows in Focus: Sioux Nation", "Starving the Masses" and "Counting Coup"',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2018-04-25'],
		sku: ['46065'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: "People in Boston are going crazy! Even crazier than at a Sox game, apparently - in fact, the whole town has been sealed off! It's a Yanks fan's dream come true.",
		edition: 5,
		gameDate: '2075',
		name: 'Gefahr in Boston',
		notes: 'A Shadowrun supplement released at Gratisrollenspiltag 2016.',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2016'],
		sku: ['GRST-2016'],
		type: 'scan'
	},
	{
		category: 'mission',
		description: 'Chicago. Eine Stadt mit düsterer Geschichte. Hier tobte der letzte Kampf gegen die Universelle Bruderschaft. Hier stellte sich die Metamenschheit der vernichtenden Plage der Insektengeister. Hier griff man zu einer nuklearen Sprengung als letzten Ausweg. Jahrzehnte später hat Chicago sich immer noch nicht erholt. In der Stadt herrscht das Gesetz des Stärkeren. Neue und versteckte Schaben und Wespen-Nester formen sich im Untergrund und in den Ruinen von Downtown. Nuyen zählen auf den Straßen weniger als eine geladene Waffe und ein paar Medikamente zum Tausch. Und in den Außenbezirken etablieren sich die Großkonzerne, um mit ihren geheimen Experimenten den größtmöglichen Profit aus der vergangenen Katastrophe und den unzähmbaren Insektengeistern zu schlagen.',
		edition: 5,
		gameDate: '2075',
		name: 'Mission Chicago',
		notes: "Collects three Shadowrun Missions adventures (SRM 5A-01 Chasin' the Wind, SRM 5A-02 Critic's Choice, SRM 5A-03 Gone long gone) and a description of the city of Chicago.",
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2014'],
		sku: ['45033'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Denver, die Stadt der Spione. Die Stadt des Großen Drachen Ghostwalker. Ein wichtiger Dreh- und Angelpunkt der Sechsten Welt. In diesem Moloch aus Intrigen und politischen Ränken zieht es die Runner in ein Netz aus Machtkämpfen, dunklen Geheimnissen und Schattenspielen. Es beginnt in den Slums der Aurora Warrens, in denen die Runner tief im Dreck ominöser Machenschaften wühlen und damit das Fundament der Stadt erschüttern. Und die Wellen dieser Erschütterung ziehen sich langsam aber sicher bis zu den Mächtigsten, bis zur Spitze der Nahrungskette. Denver verwandelt sich in einen Kampfplatz von Kräften, die lieber nicht entfesselt werden sollten. Und während die Runner sich mit befleckter Magie, altem Neid und tödlichen Kreaturen auseinandersetzen müssen, droht der ganze Plex zu fallen.\nChaos über Denver bietet eine komplette und abgeschlossene Kampagne mit mehreren Abenteuern in drei Kapiteln für Shadowrun 5. Alle Abenteuer sind komplett spielfertig und bieten spannenden Spielspaß in einer dramatischen Story, gespickt mit Höhepunkten und Action. In den verschiedenen Plots müssen die Shadowrunner all ihr Können und ihre Erfahrung einsetzen, um ihren Job zu erledigen und dabei vielleicht die Stadt vor dem Untergang zu bewahren. Oder sie gehen selbst unter.',
		edition: 5,
		gameDate: '2075',
		name: 'Chaos über Denver',
		notes: 'This is a collection of the Denver Adventures',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2017-12-15'],
		sku: ['45060'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Chicago. Wespengeister. Schaben in Kleinwagengröße. Brutale Banden und toxische Schamanen. All dies fällt einem ein, wenn man den Namen der einstigen Metropole hört. Aber das ist noch lange nicht alles! In der Nachbarschaft von Medikamentenschiebern und am Rande des Kraters einer nuklearen Explosion gibt es auch die Reichen, die Großkonzerne und die Profiteure der anarchischen Zustände. Die Runner erwartet eine Reise von ganz unten nach ganz oben, eine Achterbahnfahrt durch Chicago: von Forschungsanlagen, über Gang-Territorien bis in die tiefe Vergangenheit der Stadt.\nSchatten über Chicago enthält drei Abenteuer für Shadowrun 5, die in Chicago angesiedelt sind, sowie die Kurzbeschreibung der Stadt samt Übersichtskarte, die auch schon in Mission Chicago enthalten war. Der Band ist unabhängig von seinem Vorgänger spielbar und liefert ausformulierte Abenteuer mit allen relevanten Werten – direkt für den Spieltisch.',
		edition: 5,
		gameDate: '2075',
		name: 'Schatten über Chicago',
		notes: 'Collects three Shadowrun Missions adventures (SRM05-04: Liberation, SRM05-05: While the City Sleeps, SRM05-06: Take a Chance) and a description of the city of Chicago.',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2016'],
		sku: ['45035'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'misc',
		description: 'DAS KARRENQUARTETT FÜR SHADOWRUN 5\nDieses für 2-5 Personen gedachte Spiel folgt den klassischen Quartett-Regeln: Ihr versucht, komplette Sätze (A-H) zu sammeln. Natürlich könnt ihr mit den zahlreichen auf den Karten aufgelisteten Fahrzeugwerten das Spiel auch als klassisches Stechquartett verwenden.',
		edition: 5,
		gameDate: '2075',
		name: 'Karrenquartett',
		notes: 'Shadowrun Karren Quartett is a set of 32 cards depicting various vehicles of the Shadowrun universe with Shadowrun 5 game stats.',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2016'],
		sku: ['45042'],
		status: 'outofscope',
		type: 'print'
	},
	{
		category: 'misc',
		description: 'Waffenpower!\nOb Planung, Intrigen, Infiltration: Echte Runner wissen, dass es Zeiten gibt, in denen das letzte Wort gesprochen wurde. Dann gilt nur noch, wer sich im Kampf behauptet, wer den Schusswechsel überlebt – und wer die größeren Waffen hat.\nDas Wummenquartett für Shadowrun 5 mit seinen großzügigen, vierfarbigen Illustrationen enthält auf 32 Karten bekannte Waffen aus dem Shadowrun-Universum: von der kleinen Pistole bis zum großen Scharfschützengewehr. Neben der Möglichkeit, es als normales Quartett zu spielen, kannst du es dank der angegebenen Waffenwerte auch als Stechquartett nutzen – und sogar im Rollenspiel als Ausrüstungskarten verwenden.\nInklusive eines Freischalt-Codes für Shadowrun Online, der einen exklusiven Ausrüstungsgegenstand verfügbar macht.',
		edition: 5,
		gameDate: '2075',
		name: 'Wummenquartett',
		notes: 'Shadowrun Wummen Quartett is a set of 32 cards depicting various weapons of the Shadowrun universe with Shadowrun5 game stats. It also includes an activation code for Shadowrun Online.',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2014'],
		sku: ['45020'],
		status: 'outofscope',
		type: 'print'
	},
	{
		category: 'mission',
		description: 'Die Gefahr lauert hinter vielen Ecken, auch in Deutschland. Für Runner bietet das Land in seiner ganzen Variabilität einen Hort der Möglichkeiten: um entweder reich und berühmt in den Schatten zu werden oder dort für immer zu verschwinden. Manchmal etwa lassen sich Studenten in dunkle Geheimnisse aus finsteren Kapiteln der Geschichte hineinziehen. Ein anderes Mal zieht das organisierte Verbrechen die Strippen hinter einem eigentlich vergnüglichen Event. Oder es verschlägt die Runner ins Venedig an der Elbe, um im wahrsten Sinne des Wortes im Trüben zu fischen. So oder so wer überlebt, darf die Beute behalten.\nAuf dunklen Pfaden ist der erste Abenteuerband für Shadowrun 5, der komplett in der Allianz Deutscher Länder spielt. Er präsentiert drei komplett ausformulierte Abenteuer inklusive aller Werte und detaillierter Grundrisse der Locations.',
		edition: 5,
		gameDate: '2075',
		name: 'Auf dunklen Pfaden',
		notes: 'German adventure based on the book "Blut & Spiele".',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2017'],
		sku: ['45046'],
		type: 'print'
	},
	{
		category: 'mission',
		description: 'Die Karten werden neu gemischt\nDie Karten des Tarot-Spiels können auf sehr unterschiedliche Weise Runner in ihren Bann ziehen und neue Schicksalsfäden in ihr Lebensnetz knüpfen. Nicht nur die Magie ist durch das Erwachen der Sechsten Welt stark geworden und hat dem Tarot neue Tiefe verliehen – auch andere Mächte nutzen die Bilder und Symbole: Was bedeuten die merkwürdigen Nachrichten im Berliner Netz? Welches Geheimnis verbirgt sich hinter der kostbaren Fracht in den verseuchten Gewässern an der norddeutschen Küste? Und wie können die Kräfte des Schicksals durch die Ränkespiele im Schatten des Rhein-Ruhr-Plexes führen? Egal was die Karten sagen werden, jeder Runner hat sein Schicksal selbst in der Hand ... oder nicht?\nIm Bann der Karten ist ein Abenteuerband für Shadowrun 5, der komplett in der Allianz Deutscher Länder spielt. Er präsentiert drei komplett ausformulierte Abenteuer, die sich mit dem Shadowrun-Tarot beschäftigen und Tarot-Karten ins Spiel integrieren. Der Band kann aber auch ohne das Shadowrun-Tarot gespielt werden.',
		edition: 5,
		gameDate: '2075',
		name: 'Im Bann der Karten',
		notes: 'Three short scenarios for use with the Tarot Deck.',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2017'],
		sku: ['45056'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: "München Noir is a Shadowrun sourcebook detailing the city and region of Munich, Germany. It also contains a 60-page adventure campaign set in Munich.\nThe book covers the following topics:\n\t- Overview over the city districts\n\t- Bavarian economy\n\t- Media in Munich\n\t- Munich's upper class\n\t- Organised Crime\n\t- Important characters of the Munich runner scene\n\nThe campaign (also titled München Noir) throws the player characters into a struggle between a manager of the Bavaria Movie Studios and a dangerous neo anarchist terrorist. It consists of six adventures that lead the characters through different parts of Munich. The finale takes place on the Oktoberfest.",
		edition: 4,
		gameDate: '2074',
		name: 'München Noir',
		originalLanguage: 'de-DE',
		publisher: ['Fantasy Productions'],
		releaseDate: ['2006'],
		sku: ['23001'],
		type: 'print'
	},
	{
		category: 'misc',
		description: '',
		edition: 4,
		gameDate: '2069',
		name: 'Shadowrun: Die 6. Welt',
		notes: "This book was poublished in 2005 by Fanpro. It features a comprehensive look at the history, influence and mechanics of Shadowrun from 1989 to date. It includes a collection of articles on Shadowrun-related topics, short stories and a collector's guide listing all Shadowrun publications and novels in English and German.",
		originalLanguage: 'de-DE',
		publisher: ['Fantasy Productions'],
		releaseDate: ['2005'],
		sku: ['21008'],
		status: 'missing',
		type: 'print'
	},
	{
		category: 'sourcebook',
		description: 'Am Anfang war der GAU. Seitdem ist das Gebiet Saar-Lorraine-Luxemburg das Verheerte Land im Herzen Europas, eine Sonderrechtszone des Kontrollrates, Paradies und Hölle für seine Einwohner, eine offene Wunde am Körper der Mutter Natur. Hier leben strahlenverseuchte Menschen, wildernde Ghule durch die urbanen Wüsten, werden verbotene Experimente von Konzernen durchgeführt, treiben Manaverzerrungen Erwachte in den Wahnsinn. Mutierte Critter jagen durch die Wälder, Strahlensenken bringen den unsichtbaren Tod - und Runner versuchen ihr Glück, denn so manches Geheimnis liegt in den sechzig Jahre alten Trümmern verborgen. Doch pass auf, Fremder: auf deine Gesundheit, auf deinen Rücken, auf deinen Verstand - denn dies ist die SOX - lass alle Hoffnung fahren!',
		edition: 4,
		gameDate: '2072',
		name: 'SOX',
		names: {
			'fr-FR': "SOX - Ombres Radioactives d'Europe"
		},
		notes: '"SOX" covers a description of the Saar-Lorraine-Luxemburg containment zone and two related adventures ("Hoffnungsstrahlen" and "Mauvais Présage"). It is a French-German cooperation.',
		originalLanguage: 'de-DE',
		publisher: ['Fantasy Productions', 'Black Book Editions'],
		releaseDate: ['2007', '2009', '2011'],
		sku: ['23006', 'SR09'],
		type: 'ocr'
	},
	{
		category: 'sourcebook',
		description: 'Die Schatten werden größer!\nÜber Hannover und die Machtspiele in der ADL ist noch längst nicht alles gesagt. Und ehe sich große Veränderungen anbahnen, sollte man den Status Quo kennen. Wer verbirgt sich hinter der Daedalus-Gesellschaft? Wer sind die Schockwellenreiter? Und was kann man alles in Hannovers Club Nikita erleben - vor und hinter den Kulissen?\nNetzstücke ist ein frei erhältlicher deutscher Zusatz zum Printbuch Machtspiele - Handbuch für Spione für Shadowrun 4. Neben einflussreichen Gruppen und Nebenakteuren auf dem politischen Parkett bietet es Abenteueraufhänger und eine Reihe neuer Locations für die Allianzhauptstadt der deutschen Länder.\nUnd denk immer daran Chummer - es kostet nichts, aber es ist nie umsonst.',
		edition: 4,
		gameDate: '2074',
		name: 'Netzstücke (Machtspiele: Handbuch für Spione)',
		notes: 'Netzstücke is an expansion for the German version of Spy Games (Machtspiele). It features additional material for campaigns in Germany.',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2012'],
		sku: ['47000GX'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Im Schatten des Drachen\n\nDer Rhein-Ruhr-Megaplex. 25 Millionen Metamenschen. Luxusviertel, extraterritoriale Konzerngelände, Slums, Massenarbeitslosigkeit, Ausbeutung. Nirgendwo in der ADL leben so viele Menschen zusammengedrängt beieinander. Wo zwischen Büdchen und Städtetag kommunale Politik gemacht wird, wo die Grenze zwischen Arbeiterverein und radikaler Sprawlguerilla fließend ist, wo alle Kulturen Europas sich zu einer heterogenen Masse vermischen – dort geht die gute alte Polizei auf Streife, dort hat die italienische Mafia das Heft in der Hand, dort sind die Schatten rußig, rau und blutig. Und dort thront wie ein König in seinem Weltreich der goldene Drache und zieht wie eine Spinne seine Netze zusammen.\n\nRhein-Ruhr-Megaplex beschreibt den größten Sprawl der ADL, der sich von Unna bis Bonn zieht. Neben einem genauen Blick auf Saeder-Krupp und seine Pläne mit Essen werden die trendigsten Orte, die dreckigsten Slums, die toxischsten Zonen für Spieler und Spielleiter beleuchtet. Neben Abenteuerideen, Grundrissen und einer Beschreibung der Saeder-Krupp-Arkologie mit Planausschnitten findet sich auch ein vollfarbiger Werbeprospekt von Saeder-Krupp in diesem Quellenbuch für Shadowrun 4, bei dem es sich um eine weitere deutsche Eigenentwicklung handelt.',
		edition: 4,
		gameDate: '2074',
		name: 'Rhein-Ruhr-Megaplex',
		notes: 'Rhein-Ruhr-Megaplex (Rhine Ruhr Megaplex) is a German Shadowrun sourcebook that provides detailed information about the Ruhr area and parts of the Rhineland.\nMain Topics of the book are:\n\t- Megaplex overview\n\t- A tour through the Megaplex areas\n\t- Culture\n\t- Saeder-Krupp\n\t- Powers and Organizations\n\t- Points of Interest\n\t- Maps, locations, and adventure hooks',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2011'],
		sku: ['46095', '46096'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Die Allianz Deutscher Länder: ein Flickenteppich.\nUralte magische Orte und hochmoderne Konzernarkologien. Ödes Brachland und überbaute Straßenschluchten. Toxische Piraten und Alpen-Aktivisten. Wicca-Hexen und Universitätsmagier. Man reist durch ein Land, in dem jeder Quadratmeter Geschichte, Gefahren oder neue Möglichkeiten präsentiert. Nirgendwo liegen die Gegensätze so nah aneinander, nirgendwo sind die Gemeinsamkeiten so klar. Und daher sollte man sich auskennen. Nicht nur, um zu überleben, sondern auch, um seine Chancen zu nutzen.\nDer Reiseführer in die deutschen Schatten ist ein Quellenbuch für Shadowrun 4. Er bietet neues Material für das Spiel in der ADL: Beschreibungen von Stuttgart, dem Harz oder Pomorya, Einblicke in Schattenjobs, Besonderheiten der deutschen Runnerszene, berühmte und berüchtigte Personen und eine Vielzahl spannender Locations und Settings – reich bebildert mit Illustrationen, Karten, Grundrissen und insgesamt 24 Farbseiten, darunter eine Übersicht der Proteusarkologie auf Helgoland.\nDie Allianz Deutscher Länder: ein Runner-Spielplatz.',
		edition: 4,
		gameDate: '2074',
		name: 'Reiseführer in die deutschen Schatten',
		notes: 'German sourcebook for Shadowrun detailing various aspcets of shadowrunning in Germany, including organized crime, famous shadowrunners, possible targets and certain interesting regions.',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2012'],
		sku: ['45210'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Modernste Waffentechnik, uralte Magie, neuste Mode-Trends, Fahrzeugtechnik von Autoduellisten und erwachte Wildnis dies alles kann man in der Allianz Deutscher Länder finden. Und für einen Runner in diesen Breiten ist es überlebenswichtig zu wissen, wo und wann man all dies findet. Denn es macht einen gravierenden Unterschied, ob man in die Mündung der neusten Altmayr-Pistole schaut oder ihren Abzug am Finger hält. Ob die neusten Proteus-Wachcritter Jagd auf einen machen oder man selbst der Jäger ist. Oder ob man beim richtigen Schieber die neuste Drohne kauft, anstatt sich von ihr beim nächsten Run erschießen zu lassen.\nState of the Art ADL ist ein Ausrüstungsbuch für Shadowrun 5, das mit einem großen Haufen Spielzeug für Runner daherkommt. Es bietet neue Waffen, Archetypen, Fahrzeuge, Drohnen, Critter, magische Gruppen und Schutzgeister aus der Allianz Deutscher Länder und beschreibt zudem die wichtigsten Spieler auf den unterschiedlichen Märkten und ihre Schattenseiten in denen sich die Runner mit all dem neuen Kram eindecken können. Oder von ihm auffressen lassen.',
		edition: 5,
		gameDate: '2075',
		name: 'State of the Art: ADL',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2017-05-29'],
		sku: ['45047'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: '…Mindezek mellett igaz, hogy az ország a korlátlan lehetőségek hazája. Nem sok különbség van az árnyvadászok és az egyszeri emberek között. Mindenki fegyverrel, lehetőleg páncélozott autókban jár. A megvesztegetés nem különlegesség, az élet része. A hirtelen meggazdagodás könnyű, de nagyon veszélyes. …" – Részlet egy Magyarországról szóló dekás tájékoztatóból – Shadowland, 2056.\n\nKell egy hely, ahol a cégek nem lépnek folyton a nyakadra? Kell egy hely, ahol virágzik az árnyvadász szakma? Ahol el lehet tűnni a balhé után, és ahol nem kérik a RASSZ-odat? Nos, cimbora, ez esetben azt tanácsoljuk, tedd át a székhelyed Magyarországra. Persze, ha idejössz, nem árt, ha néhány dolgot észben tartasz. Tudd, hogy itt csak magadra számíthatsz. Magyarországon tiéd ugyan a pálya – de ugyanez igaz nálad sokkal nagyobb halakra is, akik nem tétováznak, ha félre kell tenni valakit az útból. Ha életben akarsz maradni, tartsd be az utca íratlan játékszabályait. Ja, és még valami: ügyelj rá, hogy ne menj a Fertőzött zónák közelébe.\n\nA Shadowrun szerepjáték a közeli jövőben játszódik, amikor a világot óriási mamutcégek, mindenhová elérő számítógépes hálózat, és mágikusan aktív, „felébredt” teremtmények uralják. Ennek az amerikai játéktervezők által megálmodott világnak a mintájára képzeltük el, milyen lenne Magyarország a Shadowrun fantasztikus utópiája szerint. Az ÁrnyékMagyarország önállóan is élvezhető olvasmány, ha azonban ismered a magyarul is kiadott Shadowrun szerepjátékot, akkor az ÁrnyékMagyarország egyben egy szerepjáték kiegészítő is, amely lehetővé teszi, hogy árnyvadászaitok a jövő Magyarországán kalandozzanak.',
		edition: 2,
		gameDate: '2050',
		name: 'Árnyék Magyarország',
		notes: 'Shadowrun Hungary sourcebook (Hungarian)',
		originalLanguage: 'hu-HU',
		publisher: ['other'],
		releaseDate: ['1996'],
		sku: ['963-85454-9-6'],
		status: 'missing',
		type: 'print'
	},
	{
		category: 'sourcebook',
		description: 'Hoi Chummers! Da sind wir wieder - mit den neuesten Updates zu den teutschen Landen, präsentiert im üblichen offenen Format. Wir haben einfach mal hochgeladen, was uns an relevantem Material in den letzten Monaten erreicht hat, das heißt, einmal quer durch die Platte: Von Hamburg und der Lüneburger Heide über die Deutschkatholen in Westphalen bis runter zum Frankfurt Plex (eine solide, aus den UCAS betriebene Recherche, also recht unabhängiges Material).',
		edition: 2,
		gameDate: '2056',
		name: 'Chrom & Dioxin',
		notes: 'Chrom & Dioxin succeeds in making the years 2054-2056 playable for german Runners, too. Filled with lots of information on the latest events and developments in politics, economy and technology, plus a special treat: the Switzerland. With its many paranormal beings and rigid security politics a challenge for every Runner. There are also sections dealing with the Lueneburg Heath in northern Germany and the city of Karlsruhe.',
		originalLanguage: 'en-US',
		publisher: ['Fantasy Productions'],
		releaseDate: ['1996'],
		sku: ['10727'],
		type: 'scan'
	},
	{
		category: 'mission',
		description: 'Weihnachten 2070 steht vor der Tür und nicht zum ersten Mal fragt ihr euch, ob die ganze Stadt verrückt geworden ist. Die große Werbeoffensive von DeMeKo hat bereits vor Wochen jedes vernünftige Maß weit hinter sich gelassen und gleicht immer mehr einem wahnsinnigen Gehirnwäschefeldzug. Kitschige Werbejingles donnern an jeder Straßenecke aus den Lautsprechern, unterbrochen nur vom ständigen Ho-Ho-Ho der Weihnachtsmänner. Armeen von Werbe-AROs bombardieren die Horden der Einkaufswütigen mit Schnäppchenangeboten und treiben sie wie hirntote Zombies durch die überfüllten Straßen und Kanäle zu den Konsumtempeln.\nAber Rettung naht: Heiligabend steht kurz bevor. Nur noch wenige Tage, dann werdet ihr friedvolle sechs Monate ohne Weihnachtswerbung durchleben können. Bis der ganze Wahnsinn wieder von vorne beginnt...',
		edition: 4,
		gameDate: '2074',
		name: 'Geben und Nehmen',
		notes: "Winning entry of Pegasus' 2009 adventure competition for Shadowrun. Subsequently released as a free pdf.",
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2009'],
		sku: ['P2009A'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Sucked Back In\nFormer shadowrunner Yuri Yehzov has discovered that the shadows have long tendrils. Life pushed him and Soren, his new partner in crime (and everything else), to Seattle, where they’ll have to do what thousands have done before them—figure out how to scrape by and attempt to build a life.\nIf there’s one thing the darker corners of the Sixth World have in common, it’s the tendency to explode into violence at any moment. Yuri will discover that Seattle’s shadows are merciless and unkind, but also full of opportunity for those who can think on their feet and keep flying lead from piercing their skin. Can Yuri move fast enough to stay upright in the worldwide capital of shadowrunning? He’s about to find out.\nThe Seattle Gambit is new Shadowrun fiction that also includes NPC, gear, and other rules that appear in the story. Read the story, then use the rules to dive into the action! The Seattle Gambit’s rules are for use with Shadowrun, Fifth Edition, though the basic concepts and story can also be used with Shadowrun: Anarchy.',
		edition: 5,
		gameDate: '2075',
		name: 'The Seattle Gambit',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2017-12'],
		sku: ['26056S'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Raised Stakes\n\nChicago has been dangerous for a long time. But only the foolish think it can’t get worse. When so many ways to die are concentrated in a single place, sometimes they prey on the innocent, and sometimes they go head to head with each other. Sometimes, they do both.\nIn SRM 08-01 Keep Your Friends Close, the Chicago Missions begin speeding toward their dramatic conclusion as the powers of the Containment Zone mobilize and start causing an even higher-than-normal level of chaos. Whether you’ve seen the twists and turns of the storyline through several Missions or you’re looking to jump in now, this Mission will give your team all the danger they can handle in the race to save lives. Their own being a top priority.',
		edition: 5,
		gameDate: '2075',
		name: 'Keep Your Friend Close',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2017-12'],
		sku: ['SRM08-01'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Smoke Gets In Your Eyes\n\nIn mass combat, you might be blinded by the fog of war. In hand-to-hand combat, you might have to deal with tunnel vision. And when running the shadows of Chicago, you just might have to contend with the fumes from a fire in an abandoned plastics factory that no one can seem to put out.\nWhich is what’s happening when a new job comes your way. This job doesn’t really need anything to make it more difficult—when some people have disappeared, and then the first team that went to find them also vanished, you know something very wrong is lurking ahead. Can the runners find the threat and defeat it, despite the now-omnipresent smoke? Only one way to find out!',
		edition: 5,
		gameDate: '2075',
		name: 'Can You Dig It?',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2017-12'],
		sku: ['SRM08-02'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'MAXIMUM FLAVOR\n\nPit fighters. Gangers. Insect spirits. Warlords. Broken roads, no Matrix signal, no cops, and plenty of people trying to mess with what you’re doing. They’re all ingredients in the tasty stew that is Sixth World Chicago. Runners are about to dive into the full flavor—and see how spicy it gets. Chicago’s waiting. Go survive it.\nShadowrun Missions 08-03: Cell Block Tango is an adventure for Shadowrun, Fifth Edition.',
		edition: 5,
		gameDate: '2075',
		name: '10 Block Tango',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2020-01-21'],
		sku: ['SRM08-03'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Prepare for Everything\n\nChicago’s Containment Zone is the most uncontrolled of environments, where anything can and will be thrown at you. Ferocious gangers, hungry Infected, nefarious corp operatives—they’re just the starters. There’s a full buffet of obstacles waiting for you, and Mr. Johnson is offering a nice sum of money to encourage you to chow down.\n\nThere’s a critical piece of data squirreled away in a lost, offline server, and Mr. Johnson wants it retrieved. Doing so will require running a Containment Zone gauntlet, with an array of dangers that will test any running team. But if it wasn’t hard, Mr. Johnson wouldn’t be paying you to do it, would he?',
		edition: 5,
		gameDate: '2075',
		name: 'Dirty Laundry',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2020-02-24'],
		sku: ['SRM08-04'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'A Dream of Shadows\n\nWhat do you want from a nation you’re going to run in? How about a place with access to cutting-edge technology while also retaining a firm footing in old traditions? How about a population focused on cutting deals and making things happen? How about a system of government that can be appallingly harsh but also, when they can be made to see the benefits, rather forgiving? And how about access to a dragon’s hoard worth of goods flowing into and out of the nation daily?\nIf all this sounds like the shadowrunning haven of your dreams, then you want to run in Morocco. Shadows in Focus: Morocco provides an overview of this nation, with details on how to get in, how to get out, where to go, who to meet, and what to do. It also details some of the ways you might get into trouble and offers some hints on getting out of it.\nWith plenty of tips for running games in this country as well as rules for building Morocco-based characters, Shadows in Focus: Morocco adds a new element to Shadowrun, Fifth Edition games. The setting information can also be used in Shadowrun: Anarchy games. ',
		edition: 5,
		gameDate: '2075',
		name: 'Shadows in Focus: Morocco',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2018-01-27'],
		sku: ['26S057'],
		type: 'digital'
	},
	{
		category: 'boardgame',
		description: 'In Shadowrun: Sprawl Ops, players lead a team of shadowrunners gunning for the big score!\nAlong the way they’ll have the chance to hire more seasoned runners, outfit their team with cutting-edge technology—from the latest weapons to cyberware enhancements—and take on increasingly dangerous contracts on the mean streets of the Seattle Metroplex.\nEach payout increases your chances for a more lethal combination of gear, training, and skill. All leading to that final score as you take on one of the world’s megacorporations. But you’ve got to hit it before another team steals your ticket to the big time—hold off too long to grab that ring, and you’ll lose it all!',
		edition: 5,
		gameDate: '2075',
		name: 'Shadowrun: Sprawl Ops',
		notes: 'Announced as a kickstarter campaign. Possible a retake on Hostile Takeover.',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2019-06-01'],
		sku: ['KS001'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: 'Kickstarter extras.',
		edition: 5,
		gameDate: '2075',
		name: 'Shadowrun: Sprawl Ops – Kikstarter extras',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2019-06-01'],
		sku: ['KS002'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: 'The Co-Op Expansion introduces a threat that the usually combative teams of shadowrunners within the sprawls of the Sixth World cannot ignore. This turns Shadowrun: Sprawl Ops from a competitive game into a fun cooperative experience where players either work together toward victory or lose together.\n\nFrom the Sprawl Ops KickStarter description: "This is an exclusive product only, which means it will only be available here on Kickstarter, through the pledge manager and through Catalyst or Lynnvander directly and/or at a variety of conventions while supplies last. This is a limited print product."',
		edition: 5,
		gameDate: '2075',
		name: 'Shadowrun: Sprawl Ops – Co-Op Expansion',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2019-06-01'],
		sku: ['KS003'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: '5-6 player expansion for the Shadowrun: Sprawl Ops base game.\n\nContents: Rulesheet, 6 Starting Shadowrunner cards, 11 Shadowrunner cards, 10 Gear cards, 15 Upgrade cards, 10 Mission cards, 2 Runner boards, 8 pawns for two unique runner teams.',
		edition: 5,
		gameDate: '2075',
		name: 'Shadowrun: Sprawl Ops – 5-6 Player Expansion',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2019-06-01'],
		sku: ['KS004'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: 'The shadows of the Sixth World have every kind of danger you can imagine. Ultra-violent gangers, flesh-eating ghouls, mages that summon spirits from toxic waste, backstabbing corporate raiders, hard-nosed police officers, and even dragons. You don’t have much—mainly your guts, your wits, and your friends. But maybe that’s enough. Between you and your teammates, you can sling spells, hack the Matrix, talk a tiger out of his stripes, and bring down a charging ork from a hundred yards away. Will that be enough to face down the worst the mean streets can throw at you? You’re about to find out.\nShadowrun: Crossfire is a deck-building game set in one of the most popular game settings of all time. Crossing cyberpunk with fantasy and plunging players into a world dominated by ruthless megacorporations. Crossfire gives players the chance to dive into the world’s shadows and see if they can survive. The Prime Runner Edition adds new upgrades to make the game even better—with more missions, improved rules, and new character screens, this is the best version of Crossfire ever!\nFeaturing fast, cooperative game play and stacks of dangerous obstacles and opponents to overcome. Shadowrun: Crossfire will launch you into nonstop action. You’ll even have the chance to get stronger the more you play, tackling harder and harder obstacles as you become more dangerous. Leap into the shadows for deck-building adventure like you’ve never experienced!',
		edition: 5,
		gameDate: '2075',
		name: 'Shadowrun: Crossfire: Prime Runner Edition',
		notes: 'Announced at GenCon 2018.',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		sku: ['27705'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'boardgame',
		description: 'If you have a Shadowrun: Crossfire set, you might have seen the update to the game called the Shadowrun: Crossfire: Prime Runner Edition, and maybe you’re thinking that it would be good to be able to get something that has only the changed materials—the updated rules, the changed cards, the new missions—so that you’d have all the benefits of the latest edition without having to buy everything again.\nYou’re right—it would be good! So here it is! The Prime Runner Refit Kit brings all the changes of the Prime Runner Edition to your Crossfire game, including updated rules, adjusted character stats, newly designed character screens, more missions, and a full range of upgrade stickers, including the set from the High Caliber Ops expansion. With this kit, your game will be ready to roll with any Crossfire game out there!\nNote: The Prime Runner Refit Kit is for use only with the first edition of Shadowrun Crossfire. If you don’t have Shadowrun: Crossfire or if you have the Crossfire: Prime Runner Edition, you do not need this Refit Kit!',
		edition: 5,
		gameDate: '2075',
		name: 'Shadowrun: Crossfire: Prime Runner Refit Kit',
		notes: 'Announced at GenCon 2018.',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		sku: ['27706'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'rulebook',
		description: 'The Matrix is unknowable because it is infinite. There is always one more corner behind which things can hide, one more hole where secrets can be buried. Your job isn’t to know everything about the Matrix—it’s to know more than the people you are hunting. Or who are hunting you.\nKill Code will help give Sixth World hackers the edge they need to stay alive and get ahead. From a guide to Matrix basics and operations to more ways to build ace deckers to dozens of new options for technomancers, the book can help everyone who tries to make their living on the Matrix, providing something to give them an edge when riding the Matrix’s datastreams. They’ll also learn about who their opposition might be—and how they might be attacked. The Matrix is full of kill codes waiting to be executed. Just as with the Sixth World’s many firearms, your job is to make sure they’re pointed in the right direction when they go off.',
		edition: 5,
		gameDate: '2075',
		name: 'Kill Code',
		names: {
			'de-DE': 'Letaler Code'
		},
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs', 'Pegasus Spiele'],
		releaseDate: ['2018-06-27', '2018-10-07'],
		sku: ['27013'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'Street fighting is only chaotic for amateurs. When you’re a pro, when you know what you’re doing, you’re precise. You know what your opponents might do, and you know ten different ways to respond. The options give you strength. They give you power. They make you dangerous enough that the smart ones on the street will know at a glance that they shouldn’t test you. The dumb ones will suffer.\nStreet Lethal contains the data, tools, and options players need to maximize their characters’ combat skills. With briefings on the security techniques of major corporations, information on major mercenary groups and their operations, and a whole truckload of firearms options, this book has all runners need to make sure they’re the ones left standing at the end of a fight.',
		edition: 5,
		gameDate: '2075',
		name: 'Street Lethal',
		names: {
			'de-DE': 'Tödliche Schatten'
		},
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs', 'Pegasus Spiele'],
		releaseDate: ['2018-06-17', '2018-06-26'],
		sku: ['27012', '45064'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Righteous Fire\n\nKill or be killed. Eye for an eye. Get yours while you can. Shadowrunners—and most of the other residents of the Sixth World—are told from birth that those are the principles you must follow to survive. Thinking of others is for suckers. Take care of your own and hope you don’t die early.\n\nBut some runners think that’s no way to live. They know the world is stacked against them, and they’ve decided they like those odds. They choose to fight for what they think is right. They use shadowruns to take from people who don’t deserve what they have and give to those who need it. They seek hidden information that can right wrongs. It’s not easy, and it doesn’t always pay as well as outright theft, but who do they tell stories about centuries later—Robin Hood, or the jerk thief from a few forests away who only thought of himself?\n\nBetter than Bad is a shadowrunners’ guide to hooding, the art of committing crime to help those in need. With plot information, shadowrunning techniques and tactics, and advice to help runners work to bring good into the world, the book is the first definitive guide to shadowrunning with a conscience. It also includes information on a hot spot for working to right wrongs—Pretoria, in the African nation of Azania.',
		edition: 5,
		gameDate: '2075',
		name: 'Better than Bad',
		namse: {
			'de-DE': 'Schattenhelden'
		},
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs', 'Pegasus Spiele'],
		releaseDate: ['2018-11-23'],
		sku: ['27203'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: "Les Nations des Américains d'Origine est la traduction-compilation de deux suppléments américains (Native American Nations Volume 1 et Native American Nations Volume 2) écrits par FASA, sauf le scénario Peacekeeper tiré du premier volume qui sera traduit séparément sous le titre Alerte Rouge. Il traite donc des nations apparues en Amérique du Nord (Aztlan et Tir Taingire exceptés) à la suite de l'Éveil et de la révolte des peuples indiens. Ce guide se conclut par un scénario se déroulant dans la nation Tsimshian.",
		edition: 1,
		gameDate: '2060',
		name: "Les Nations des Américains d'Origine",
		notes: 'A condensed edition with: Native American Nations Volume 1, Native American Nations Volume 2 without the adventure "Peacekeeper".',
		originalLanguage: 'fr-FR',
		publisher: ['Descartes Editeur'],
		releaseDate: ['1995-01'],
		sku: ['2-7408-0105-X'],
		status: 'outofscope',
		type: 'print'
	},
	{
		category: 'mission',
		description: "Voilà trente ans, la naissance tumultueuse des Nations des Américan d'Origine ébranlait les États-Unis d'Amérique et bouleversait les frontières géo-politiques de l'Amérique du Nord. Aujourd'hui, quelqu'un qui n'apprécie pas cette tournure des événements travaille à un nouveau bouleversement de son cru. Est-ce une venegeance? Ou quelque chose de plus profond? Quoiqu'il en soit, cette sombre histoire vous entraîne dans une longue traque à travers les nations tribales. Mais si vous êtes les chasseurs, pourquoi cette impression que les mâchoires du piège se referment sur vous?",
		edition: 2,
		gameDate: '2060',
		name: 'Alerte Rouge',
		notes: 'A translation of the adventure "Peacekeeper".',
		originalLanguage: 'fr-FR',
		publisher: ['Descartes Editeur'],
		releaseDate: ['1995-09'],
		sku: ['2-7408-0112-2'],
		status: 'outofscope',
		type: 'print'
	},
	{
		category: 'rulebook',
		description: 'DIE ERDE IM JAHR 2070\n\nDie Magie ist zurückgekehrt. Unzählige Menschen haben sich in Elfen und Zwerge, Trolle und Orks verwandelt. Drachen und andere Fabelwesen sind aus ihrem Schlummer erwacht. Die Welt, wie wir sie kennen, ist im Chaos versunken. Nur die größten Konzerne haben überdauert und die Macht übernommen. Als Shadowrunner bist du ein Geist: Nirgends registriert, offiziell geleugnet, erledigst du die Drecksjobs für die Konzerne.\nOb du ein bis an die Grenze mit Implantaten aufgerüsteter Straßensamurai bist oder ein machtvolle Zauber webender Magier, ein gedankenschnell das weltweite kabellose Computernetz der "Matrix" durchsurfender Hacker oder ein, mit seinen Maschinen verschmelzender Rigger - Du hast die Zukunft der Welt in der Hand.\nWenn du das Spiel lange genug überlebst.\nSPIEL MIT!',
		edition: 4,
		gameDate: '2060',
		name: 'Shadowrun Einsteigerregeln',
		notes: 'The German version of the "Start Rules". Contains the adventure "Freier Markt".',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2009'],
		sku: ['45050'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Devils in the White City\n\nCasablanca-Rabat is a sprawl with millions of secrets and a willingness—an eagerness, even—to sell them. That means there is plenty of work for shadowrunners, but also a need for care, since revealing the wrong secret at the wrong time can lead to disaster. So get to know the city, get to know the culture, and learn how to play the game. Then take your running to the next level in one of the most vital sprawls of the Sixth World.\n\nShadows in Focus: Casablanca-Rabat follows Shadows in Focus: Morocco to fill in details of Africa’s northwestern shore, and you can either use both books to build in-game knowledge or focus on this one to help you launch shadowruns in a sprawl with a deep history of intrigue.',
		edition: 5,
		gameDate: '2075',
		name: 'Shadows in Focus: City by Shadow: Casablanca-Rabat',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2018-11-24'],
		sku: ['26057S'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'CHICAGO CHAOS THE DEEPEST DISORDER\n\nFor years, the heart of Chicago has been a wasteland, but not a barren one. Squatters and scroungers compete with ghouls, insect spirits, and creatures that haven’t even been named yet in the quest to carve out a piece of this inhospitable territory for themselves. That’s all changing, though. Some of the powers of the world have decided there might be things of worth inside Chicago’s Containment Zone, so they’re looking to open it up. The fight for the soul of Chicago is on.\n\nChicago Chaos contains Contract Briefs, characters, and plot information for Shadowrun: Anarchy players, providing the details and resources needed to let players jump into the chaos, fighting bizarre enemies, digging up pieces of the buried past, and seeing what they can make out of a once-broken city. There are also new qualities and Shadow Amps to help players flesh out their Anarchy characters. Chicago Chaos is for use with Shadowrun: Anarchy.',
		edition: 5,
		gameDate: '2075',
		name: 'Chicago Chaos',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2019-01-21'],
		sku: ['27486'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'SCREAM YOUR TRUTH\n\nThe voices will be heard. The powers of the Sixth World want to control everything, keeping the world pacified through bland entertainment and milquetoast messages.\n\nBut they can’t keep everyone quiet. People have ideas screaming to get out and the tools to record and spread them. Whether they’re starting a new band, recording guerrilla trid dramas, or launching a pirate tridcast where someone tells the truth for once, they can grab audiences by the throat and get them to listen.\n\nThey’re out of patience, and everyone else is out of time. No Future is the Shadowrun guide to Sixth World culture, including information on music acts, trid movies and series, media sources, and sports, with a look at some of the voices bubbling up from the underground and demanding attention. With detailed setting information and relevant rules, No Future adds new elements and depth to Sixth World role-playing.\n\nNo Future is a cyberPUNK sourcebook that details the culture and everyday life of the Shadowrun setting and is useful for whatever version of Shadowrun you play!',
		edition: 5,
		gameDate: '2075',
		name: 'No Future (A Cyberpunk Sourcebook)',
		names: {
			'de-DE': 'Lifestyle 2080'
		},
		notes: 'The German version has an aditional 20 pages of the life in ADL.',
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Verlag'
		],
		releaseDate: [
			'2019-01-21',
			'2019-03-19'
		],
		sku: [
			'27453',
			'45071G'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: "ALL IN!\n\nThey're all here. Everyone of them. The legends, the liars, the betrayers, the winners, the craven, the brave, the powerful, the down-trodden. The people who leaked secrets and got killed for it, and the secrets that no one has discovered yet. The dark bargains, the shady deals, the desperate maneuvers. Everything that makes the Sixth World the high-revving nightmare machine its residents know too well is right here, between these two covers.\n\nThe Neo-Anarchist Streetpedia is your definitive guide to the Shadowrun universe. With hundreds of entries, it covers corporations, shadowrunners, politicians, nations, cities, criminal organizations, and more. Even better, it gets to the point and tells you what you need to know now, so you can hit the streets a little smarter than you were when you woke up this morning.\n\nThe Neo-Anarchist Streetpedia is for use with whatever form of Shadowrun you play. Don't play Shadowrun? Read this, learn about the Sixth World, and then find a game to dive into!",
		edition: 6,
		gameDate: '2080',
		name: 'The Neo-Anarchist Streetpedia',
		names: {
			'de-DE': 'Neoanarchistische Enzyklopädie'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Verlag'
		],
		releaseDate: [
			'2019-06-13',
			'2019-07-10'
		],
		sku: [
			'27454',
			'45073G'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'RISK IT ALL!\n\nThe odds are against you. They always are. The other side has more people, more firepower, more money—more everything. What they don’t have is you—your brains, your guts, and your willingness to put everything on the line to come out on top.\n\nShadowrun, Sixth World is the latest edition of one of the most popular role-playing games of all time. In 2080, the world is controlled by all-powerful megacorps that draw on vast hoards of technology and magic to keep rest of the population under their heels. But some people refuse the seductive lure of corporate safety. These rebels refuse to sell out, and they survive by doing the dirty work no one else will do. They are shadowrunners, and they’re ready for you to join their ranks.\n\nBecome an elf shaman, an ork street samurai, a dwarf rigger, or any of hundreds of other possibilities. Find your skill set and unique expertise and use all of it on wild chances that will keep you alive, that give you one more chance at freedom. So you can survive until the next one.\n\nThe Shadowrun, Sixth World Core Rulebook contains everything you need to play besides six-sided dice. Launch into a dark, thrilling world of gaming fun as your shadowrunner sets out on the road to greatness!',
		edition: 6,
		gameDate: '2080',
		name: 'Shadowrun: Sixth World',
		names: {
			'de-DE': 'Shadowrun Grundregelwerk Sechste Edition',
			'fr-FR': 'Shadowrun Sixième Monde',
			'it-IT': 'Shadowrun, iI Sesto Mondo!'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Verlag',
			'Black Book Editions',
			'Wyrd Edizioni'
		],
		releaseDate: [
			'2019-08-26',
			'2019-10'
		],
		sku: [
			'28000',
			'46100G',
			'46103G'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'This Shadowrun, Sixth World Gamemaster’s Screen is what you want it to be. How do we know? Because you get to shape it. A player-facing large pocket lets you share scene inserts to change up the players’ visual experience, with many inserts included with the screen. Card pockets on the GM side help them track current NPCs and other game stats, while the GM side also displays commonly used tables. Reference sheets for the players provide easy access to critical information. Finally, and most unique, a series of Reputation/Heat trackers are built directly into the screen, enabling a runner team to track their pressure on them from any rival they face, watching them change as they play. Enclosed stickers let you choose just who is putting the Heat on the players. Make the screen what you want it to be, then use it to make your games awesome.',
		edition: 6,
		gameDate: '2080',
		name: "Shadowrun Sixth World: Gamemaster's Screen",
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2020-01-22'],
		sku: ['28001'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'Are you ready to risk everything? The Sixth World. One of the most enduring RPG settings ever created, with shadows growing deeper and darker in its latest edition. Dominated by enormous, world-striding megacorporations strangling metahumanity in their clutches, by 2080 most of the planet has surrendered to these corporate overlords. But from the darkest shadows, defiance flickers in people known as shadowrunners. They risk everything—wrestling magical energies, channeling them into power; putting their minds against the electronic void of the Matrix; trading flesh and blood for chrome and steel. Stand up, join them, and dare to risk it all!\nShadowrun: Sixth World builds on Shadowrun’s amazingly successful legacy, becoming easier to learn and play while still providing role-playing depth. Welcome to the marquee event of the game’s 30th Anniversary year! It all starts with the Shadowrun: Sixth World Beginner Box, releasing in June.',
		edition: 6,
		gameDate: '2080',
		name: 'Shadowrun: Sixth World: Beginner Box',
		names: {
			'de-DE': 'Shadowrun Sechste Edition Starterpaket'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Verlag'
		],
		releaseDate: [
			'2019-06',
			'2019-07-19'
		],
		sku: [
			'28010',
			'28100'
		],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Experimente mit Metamenschen. Dunkle Geheimnisse in toxischen Arkologien. Umweltbeeinflussungen durch Magie und Technik. Genmanipulierte Wachcritter und Verschwörungen: Viel wird vom Nordseekonzern Proteus berichtet und doch ist kaum etwas bekannt. Es ist Zeit, zumindest einen Teil des Schleiers zu lüften ...\nDatapuls Proteus wirft ein Licht auf den AA-Konzern Proteus, dessen Geschichte und Machenschaften die Schatten der ADL schon mehrmals durchgerüttelt und geprägt haben.',
		edition: 5,
		gameDate: '2075',
		name: 'Datapuls: Proteus',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2019-04-29'],
		sku: ['470D6'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Das Nachbarland der ADL in den Alpen besteht nicht nur aus Schokolade und Käsefondue. Mächtige Banken bestimmen von hier das Geschick der Weltwirtschaft - und in ihren Schließfächern lagern manche dunklen Geheimnisse. Die Erwachte Alpeninterdiktszone ist ein Tummelplatz seltener und wertvoller, aber auch extrem gefährlicher Critter. Und auch in den großen Städten wie Zürich oder Basel sind die Schatten nie still ...\nDatapuls Schweiz wirft ein Licht auf die Eidgenossenschaft im Süden der ADL. Das PDF präsentiert einen Rundblick über die Schweiz: etwa auf Regierung, Konzerne und Unterwelt sowie ein paar der größeren Städte des Landes.',
		edition: 5,
		gameDate: '2075',
		name: 'Datapuls: Schweiz',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2019-04-29'],
		sku: ['470D7'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Nicht nur die großen Konzerne spinnen ihre Netze in den Schatten. Auch die Geheimdienste manipulieren in den Schatten und verfolgen verborgene Ziele ihrer Regierungen ... oder ganz eigene. Diese mächtigen Spieler, frei von Konzernpolitik und Aufsichtsratkontrollen sind Gegner, die Runner lieber nicht aus dem Blick verlieren sollten.\nDatapuls Verschlusssache wirft ein Licht auf die Geheimdienste der ADL - vor allem das Bundestamt für Innere Sicherheit, mächtiges Kontrollwerkzeug der Regierung, und Argus: den Nachrichtendienst der MET2000.',
		edition: 5,
		gameDate: '2075',
		name: 'Datapuls: Verschlusssache',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2019-04-29'],
		sku: ['470D8'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Während die Reichen und Mächtigen in ihren Glastürmen thronen und die Innenstadt der Mainmetropole mittels modernster Technik kontrollieren, brodelt es in den Schatten des Plexes Groß-Frankfurt. Drogenküchen, Critter im Spessart und im Odenwald, alte Magie in Heidelberg, Verbrechen und Intrigen, all dies findet sich im Fundament des Sprawls, der nur äußerlich strahlt und glänzt. Doch noch schlimmer sind die Ränke der Mächtigen, des FBV und der AG Chemie, die hier ihre Burgen stehen haben.\nDatapuls Frankfurt wirft ein Licht auf den Groß-Frankfurt-Plex: auf seine offenen und versteckten Machthaber, auf die Sicherheitstruppen, auf Städte wie Mannheim, Heidelberg oder Mainz, auf diverse urbane Hotspots und auf das, was hinter der Fassade lauert und Runnern ihr Auskommen sichert.',
		edition: 5,
		gameDate: '2075',
		name: 'Datapuls: Frankfurt',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2019-04-29'],
		sku: ['470D9'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Viel Tradition existiert in der ADL. Zu alten Zeiten gab es Schwertkampf und Fechtschulen, die heute wieder erstarken und sich der Techniken von damals bedienen. Alte Magie wird wiederentdeckt und von Erwachten genutzt. Aber auch neue Fahrzeuge und Drohnen kommen immer wieder auf den Markt – und des Runners liebstes Spielzeug: Waffen.\nDatapuls SOTA 2080 ist ein Magie- und Ausrüstungs-PDF für Shadowrun. Es behandelt Nahkampfschulen alter Schule, Klingenwaffen und Klappspaten, neue Feuerwaffen wie den Kanonenschlag und Fahrzeuge sowie Drohnen. Zudem liefert es detaillierte Hintergrundinformationen zu einigen, teils neuen ADL-Magietraditionen und neue Schutzgeister. ',
		edition: 5,
		gameDate: '2075',
		name: 'Datapuls: SOTA 2080',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2019-04-29'],
		sku: ['470D0'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'ON A COLLISION COURSE…\nIt was supposed be a simple extraction from the Brussels2Rome party train. With an eclectic crowd, a willing target, and a lot of nuyen at stake, what could go wrong?\nEverything—as Makeda Red discovers the hard way. There’s more than one target on the train, and more than one shadowrunner team in play. When someone sabotages the tracks in the middle of the Swiss Alps, she’s forced to extract her client much earlier than planned.\nTo complicate matters, other survivors are also fleeing the crash for their own reasons. One of them is trying to escape his corporate masters as well, and offers to pay Makeda to escort him to his safe haven.\nA paying client is a paying client, and his corp won’t be looking for three people traveling together. Makeda knows it’s a risk, but one she’s willing to take. In the shadows, however, nothing and no one is what they seem. Before it’s over, this already complicated run may be Makeda’s last...',
		edition: 6,
		gameDate: '2080',
		name: 'Makeda Red',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		sku: ['26866'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "BEWARE THE SCORPION'S STING..\n\nRashida bint Tariq bin Feroze al-Nazari steals through the deadliest shadows in the world: Dubai, in the Caliphate of Arabia. In a merciless land policed by the Caliphate Guard, under a government that exacts harsh penalties against any shadowrunner, Rashida has to break into the Saqr Tower and get out with the intel she’s getting paid to retrieve.\nHired to steal a black op software package from Raqmu Enterprises, Rashida calls on her team of shadowrunners to help with the smash-and-grab. And this run isn’t just for the nuyen. The people behind Raqmu Enterprises killed Rashida's family. Failure isn't an option.\nBut death doesn't scare Rashida. A Scorpion shaman, she fights for her life every day against the spirit that grants her the power to destroy her enemies, but ultimately seeks to consume her very essence. Amid the treacherous desert sands, Rashida must battle enemies within and without if she is going to survive...",
		edition: 6,
		gameDate: '2080',
		name: 'Tower of the Scorpion',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2019-10-24'],
		sku: ['26904NV'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'AGE IS MORE THAN JUST A NUMBER\nKeandra’s been around for a long time, outliving most Shadowrunners twice over. With a legacy of runs under her belt, she has the solid reputation and wisdom that comes with surviving the shadows longer than most.\nLooking for a way to cash in on her street cred, Keandra comes up with a novel idea: Why not set herself up as a Johnson? With her rep, she could take on the high-paying jobs, act as the in-between, and collect payment with no risk? With her rep, she could take on high paying jobs and farm them out to other capable teams, minus a small cut as a finder’s fee. Everyone wins, and no one’s the wiser…unless someone makes the wrong call.\nAnd when a run goes south, Keandra and her team must scramble to salvage more than just their reputations. They are thrust into a situation which could start a new world war, and have to figure out who to trust, and fast…but trust is hard to come by in the shadows…',
		edition: 6,
		gameDate: '2080',
		name: 'The Johnson Run',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2019-10-24'],
		sku: ['26865'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'FIVE RUNNERS. ONE JOB. AND A WHOLE LOT OF TROUBLE...\nIt should have been a simple walk in the corp. Stroll into a mid-level corporation disguised as a nameless mid-level manager in a suit, deliver an unknown data package to an isolated network, and stroll out again.\nBut nothing is ever simple in the shadows.\nNow five shadowrunners are on the run themselves. Framed by their employer, the mysterious Mr. Johnson, and marked for termination by every hired cop, corp security, and fellow shadowrunner in Seattle, the team must find out who set them up, why they did it, and figure out how to deliver payback—without getting killed in the process.\nThe Frame Job, Part 1 is the first in a brand-new, six-novella story set in the gritty, dark future, magic-and-machine world of Shadowrun. This ZIP file contains both the Kindle (.mobi) and the ebook versions of the story.',
		edition: 6,
		gameDate: '2080',
		name: 'The Frame Job, Part 1: Yu',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2019-05-01'],
		sku: ['28901NV'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "PART TWO OF THE ORIGINAL SHADOWRUN SIXTH WORLD EDITION NOVELLA SERIES!\nFIVE RUNNERS. ONE JOB. AND A WHOLE LOT OF TROUBLE...\nNow that the shadowrunning team knows they've been double-crossed by one of the largest megacorps in the Sixth World, they've got two jobs to do: clear their name and deliver payback with a vengeance.\n\nWhile hiding out on the outskirts of Seattle, Aussie rigger Emu begins taking steps toward that exact plan by trying to find out who set them up with Knight Errant, but she's also got other problems; juggling an outstanding mob debt and handling a side courier run for a friend in exchange for intel on the corp Johnson.\nHowever, even the best laid plans can go wrong, and Emu has to find a way to accomplish all all three jobs while staying one step ahead of her enemies...and their bullets.",
		edition: 6,
		gameDate: '2080',
		name: 'The Frame Job, Part 2: Emu',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2019-05-01'],
		sku: ['28902NV'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "PART THREE OF THE ORIGINAL SHADOWRUN SIXTH WORLD EDITION NOVELLA SERIES!\nFIVE RUNNERS. ONE JOB. AND A WHOLE LOT OF TROUBLE...\nAfter being double-crossed by one of the largest megacorps in the Sixth World, the shadowrunner team sets their own plans in motion: clear their names and deliver payback with a vengeance.\nRude didn't have much planned after the Telestrian run...sleep in and wait for his share of the payday. But when Zipfile calls asking him to run stealthy back-up on Yu's meet with the Johnson for payment, the troll heads to the warehouse district to keep an eye on things...and finds a lot more than he bargained for.\nNow, after fighting his way through the high-level ambush that nearly killed Yu, Rude hits the streets looking for information on who tried to kill them...and who hired them to do it.\nBut in Seattle, it's always good to remember that the streets can hit back...and often do...",
		edition: 6,
		gameDate: '2080',
		name: 'The Frame Job, Part 3: Rude',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2019-05-01'],
		sku: ['28903NV'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "PART THREE [sic] OF THE ORIGINAL SHADOWRUN SIXTH WORLD EDITION NOVELLA SERIES!\nFIVE RUNNERS. ONE JOB. AND A WHOLE LOT OF TROUBLE...\nAfter being double-crossed by one of the largest megacorps in the Sixth World, the shadowrunner team sets their own plans in motion: clear their names and deliver payback with a vengeance.\nBefore they can put their plans into action, Frostburn needs to check on her family to make sure they haven't been targeted by the megacorp for payback. But her complicated relationship with the rest of her family is strained even further when a relative falls under the sway of a charismatic activist who has dark designs on Frostburn and her family...and will go to any lengths to get what he wants—including sacrificing idealistic kids to a doomed run against a corporation.\nBefore the night is over, Frostburn will have to draw on every bit of magic and street smarts she has to both save her relative and survive...",
		edition: 6,
		gameDate: '2080',
		name: 'The Frame Job, Part 4: Frostburn',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2019-05-01'],
		sku: ['28904NV'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'PART THREE [sic] OF THE ORIGINAL SHADOWRUN SIXTH WORLD EDITION NOVELLA SERIES!\nFIVE RUNNERS. ONE JOB. AND A WHOLE LOT OF TROUBLE...\nAfter being double-crossed by one of the largest megacorps in the Sixth World, the shadowrunner team sets their own plans in motion: clear their names and deliver payback with a vengeance.\nWhile everyone else is running around in the real world, the team’s resident decker, Zipfile, takes to the Matrix to find out all she can about who set them up and who that Johnson was working for. If she can get those answers, they’ll be one step closer getting their sweet revenge.\nBut the infinite pixels of the Matrix only lead to more questions at first, until the resourceful dwarf approaches their problem from a new angle…that nearly gets her and another team member killed.\nBefore their run is over, Zipfile uncovers even more danger in the neon sprawl of the Matrix…and those bits and bytes of data could prove more deadly than anything in the meat world…',
		edition: 6,
		gameDate: '2080',
		name: 'The Frame Job, Part 5: Zipfile',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2019-05-01'],
		sku: ['28905NV'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: "THE THRILLING CONCLUSION OF THE FRAME JOB SERIES!\nDouble-crossed. Ambushed. One, and possibly two megacorps out for their heads...\nYu, Emu, Rude, Frostburn, and Zipfile have been through a lot in the last few days. Their backs are against the wall. And when that happens, there’s only one thing left to do—come out swinging (or in Rude’s case, shooting).\nTheir recon and data-gathering has all paid off. They know who to hit, where to hit them, and how. Now all they gotta do is infiltrate a heavily secure corp building in a busy business area of Seattle in broad daylight and bring it down…from the inside. And all that stands in their way is Mr. Johnson himself, corp security, and another hundred and one things that could go wrong…\nAnd, assuming they can pull this mission off, there’s still the matter of the second Johnson who hired them…and who might want to ensure there are no loose ends after this job. Will the Frame Job be the team's last one, or will they use everything they have to find a way to come out on top?",
		edition: 6,
		gameDate: '2080',
		name: 'The Frame Job, Part 6: Retribution',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2019-05-01'],
		sku: ['28906NV'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: '-',
		edition: 6,
		gameDate: '2080',
		name: 'Between a Corp and a Hard Place',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2020-01'],
		sku: ['2690ANV'],
		type: 'digital'
	},
	{
		category: 'misc',
		description: 'A brochure of Hamburg.',
		edition: 5,
		gameDate: '2075',
		name: 'Hamburg-Werbebroschüre',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2018-10-07'],
		sku: ['HWB'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Märchenhafte Erweckung\n\nEs war einmal, vor langer Zeit: In uralten Fabeln, in Mythen und Sagen erklärten sich früher die Menschen ihre Welt. Sie gaben dunklen Gestalten Form und flüsterten ihren Söhnen und Töchtern Schauergeschichten am Bett zu. Nun aber ist die Magie erwacht. Die Ungeheuer, Feenpakte und Legenden aus diesen vergangenen Zeiten kommen zum Leben und manifestieren sich in der märchenreichen ADL. Kinder werden gejagt, alte Versprechen angemahnt und Mythen fordern ihren Blutzoll. Gut für alle, die noch die Hintergründe und Ursprünge dieser alten Märchen kennen. Wenn sie am Ende nicht sterben wollen.\n\nGrimmes Erwachen ist ein Abenteuerband für Shadowrun 5, der in der Allianz Deutscher Länder spielt. Er präsentiert drei Abenteuer, die sich alle um erwachte Sagen und Märchen drehen. Zudem enthält der Band Hintergründe und Anregungen, um selbst Legenden zu beleben und Shadowrunner tief in diese Mythen abtauchen zu lassen.',
		edition: 5,
		gameDate: '2075',
		name: 'Grimmes Erwachen',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2019-01-28'],
		sku: ['45070'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'mission',
		description: "Power Play\n\nThe Seattle sprawl is an iconic part of the Sixth World, and it's about to take the next step in its evolution. Its mother country to the east, the UCAS, is flailing, and pressure is building for Seattle to make its own path and go independent. Lots of power players are trying to force the city's hand one way or another, and lots of money is flowing to the shadows to help or hinder those efforts.\nThere is a roster of luminaries descending on the city, and some people want them safe, and some people want them dead. Shadowrunners have lots of chances to make money, and also plenty of chances to get people gunning for them. They'll have to navigate the increasingly challenging conditions of the city, dealing with corrupt politicians, enraged gangers, conniving spies, and other runners bent on fouling up their business. All this might lead to a new era for Seattle—or at least, for whatever residents survive to see it.\nFree Seattle is an adventure for Shadowrun, Sixth World, designed to immerse you in this edition and help you learn how the rules work.",
		edition: 6,
		gameDate: '2080',
		name: 'Free Seattle',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2019-12-11'],
		sku: ['28401'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'TOTAL DARK\n\nVoice scream in the darkness. Voices of the lost drift through the night. Their sound is despair, sorrow, and terror. The noise grinds at your soul, but only thing worse than listening to the chorus of pain is joining it.\nThe world is changing. Desperate times require desperate measures, and the ground beneath your feet will shake when those measures are meted out. Hold on, buckle up, and try to survive. Parts of the world are cutting to black—so keep your guard up, be prepared, and don’t let the dark consume you.\nCutting Black is a campaign book to help launch players and gamemasters into Shadowrun, Sixth World. With breaking news and world-shaking events, it provides material to carry players through months of games. If they can survive that long.',
		edition: 6,
		gameDate: '2080',
		name: 'Cutting Black',
		names: {
			'de-DE': 'Blackout'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Verlag'
		],
		releaseDate: ['2020-02'],
		sku: ['28300'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Missions - Hamburg was developed by Pegasus Verlag as a street-level campaign in Hamburg, and is offered by the official supporters in game rounds at a number of conventions in Germany such as the "NordCon". Afterwards, the individual missions in Pdf format should be made available for free download on their homepage. - In fact, only the first of the missions was published.',
		edition: 4,
		gameDate: '2072',
		name: 'Missions: Hamburg',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Verlag'],
		sku: ['SRM-HAM'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'A New Shadowrun Short Story!\n\nMost Awakened folks in the Sixth World have Mentor Spirits to help them navigate the vast, often confusing world of magic. Many times, the mage chooses a spirit that compliments them, and can help them out in tough situations.\nAnd then there’s Jimmy Kincaid.\nKincaid’s never been one for taking the easy road, and to say his life is complicated is like saying water’s wet. And when a simple trace job leads to a nest of Humanis thugs that have captured a metahuman hostage, well the voice of his Mentor Spirit isn’t whispering peace and goodwill in the P.I.’s ear.\nBecause Kincaid’s Mentor Spirit is Adversary … and Adversary just wants to see the world burn… Will Jimmy resist his mentor’s siren call of death and destruction… or give in to those darker instincts and just level the entire place?',
		edition: 6,
		gameDate: '2080',
		name: 'Adversary',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2020-01-12'],
		sku: ['26062S'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Ein lächerlich einfacher Run, eine unerwartete Begegnung und ein Angebot, das sie nicht ablehnen können: Aydem und Glinda wollen in eine höhere Liga aufsteigen und sehen endlich ihre Chance, sich in den Hamburger Schatten einen Namen zu machen. Der Auftrag scheint simpel, der Ex-Polizist und die Riggerin sollen eine verlorene Tochter finden und in Sicherheit bringen. Doch die Sache hat einen Haken: Die junge Frau steckt längst in den Fängen einer skrupellosen Organisation, die mit ihren Machenschaften die gesamte Hafenstadt bedroht. Schon bald wird die Rettungsaktion zum Kampf ums nackte Überleben, dem sich eine junge Rabenschamanin anschließt – eine dringend notwendige Verstärkung gegen die tödliche Magie der Gegner.',
		edition: 6,
		gameDate: '2080',
		name: 'Toxische Erlösung',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Verlag'],
		releaseDate: ['2019-11'],
		sku: ['35013G'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Berlin. Kein Sprawl in der ADL ist so berüchtigt und berühmt wie der dystopische Megaplex an der Spree. Die Jahre der Anarchie haben das Stadtbild und die Metamenschen geprägt, die Rückeroberung der Konzerngebiete hat neue Farbe in die Berliner Schatten gebracht. Von den gesicherten Konzernmeilen rund um Tegel und Tempelhof bis zu den düstersten Ecken in Xhain, von den Critter-Farmen in Schönwalde bis zu den Freidenker-Kommunen in Köpenick: Nirgendwo treffen so viele und so scharfe Fronten in Gedanken und an Stadtteilgrenzen aufeinander. Und nirgendwo sind die Gefahren präsenter: Konzernintrigen bedrohen Kieze, Sprawlguerilla bedroht Konzerne, das organisierte Verbrechen bedroht die Freiheit in den anarchistischen Gebieten, und noch dunklere Geheimnisse bedrohen die ganze Stadt. Und mittendrin, zwischen aufgerüsteten Berlinern, Konzerngardisten, Soldaten der Vory und Gangern auf Kamikaze, suchen Runner in den Schatten ihr Glück. Berlin 2080 ist das erste Quellenbuch für Shadowrun 6 und eine deutsche Eigenproduktion. Es bietet detaillierte Hintergrundinformationen zu den einzelnen Stadtvierteln, vielen unterschiedlichen Locations, Hotspots wie der Autonomen Inselfestung Eiswerder oder den Sorben im Spreewald, Mächtegruppen aus der Unterwelt und den Konzernen. Neben Beschreibungen des Dreamland-Sprawls, der Diskordianer und des versteckten Lebens unter der Stadt wird zudem viel Zusatzmaterial geboten: NSC-Werte, Grundrisse, Flairtipps für den Spieltisch, Waffen und Fahrzeuge sowie ein herausnehmbares, großformatiges Poster mit Karten Berlins, der Berliner Mitte und des Dreamlands, auf denen Hunderte Locations genau verortet sind.',
		edition: 6,
		gameDate: '2080',
		name: 'Berlin 2080',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Verlag'],
		releaseDate: ['2019-10'],
		sku: ['46110G'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'NIGHT FALLS...IT WILL ONLY GET WORSE\n\nThe first night of a citywide blackout usually has rioting and lawlessness. The second night continues the chaos. The third night? Well, whoever heard about a citywide blackout going three nights?\n\nIt’s about to happen, and shadowrunners caught in the middle will have to deal with more than darkness. There will be howling critters roaming free. Strange spirits and twisted metaplanar beings appearing and pursuing unknown goals. And mysterious vans that somehow still have power slowly roaming the streets, sending out some sort of signal.\n\nThe streets will be getting more dangerous, and shadowrunners will be in the middle of it, first trying to survive, then trying to earn some cash, and finally trying to uncover the secrets the blackout was supposed to hide.',
		edition: 6,
		gameDate: '2080',
		name: '30 Nights',
		names: {
			'de-DE': '30 Nächte und 3 Tage'
		},
		originalLanguage: 'en-US',
		publisher: [
			'Catalyst Game Labs',
			'Pegasus Verlag'
		],
		releaseDate: ['2020-02-13'],
		sku: ['28400'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Großkonzerne hatten in Berlin immer schon einen schweren Stand. Und so reagieren sie besonders alarmiert, wenn Meinungsmache und Massenmanipulation gegen sie gerichtet wird. Dann aktivieren sie Runner, die tief in den Hexenkessel des Megaplex an der Spree hinabtauchen sollen, um Schattentricks aufzudecken, ohne sich selbst in diesen zu verfangen.\nSchattentricks ist ein Abenteuer für Shadowrun 6 im Berlin des Jahres 2080. Für das Abenteuer ist lediglich das Grundregelwerk für Shadowrun 6 notwendig. Das Quellenbuch Berlin 2080 liefert weiteren Hintergrund und Werkzeuge für Flair und Ambiente.',
		edition: 6,
		gameDate: '2080',
		name: 'Schattentricks',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Verlag'],
		releaseDate: ['2019-10-24'],
		sku: ['STTRK'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Bist du stark genug!\n\nWährend die Runner nach einer vermissten Person suchen, ziehen sich die Schatten um sie herum langsam zusammen. Einer Fährte folgend, stoßen sie bald auf ein gefährliches Geheimnis - bei dem sie eine folgenschwere Entscheidung zu treffen haben.\n\nSchattenkrieg ist ein komplett ausgearbeitetes Abenteuer für Shadowrun 4 - inklusive Handouts und Grundrissplänen. Es richtet sich sowohl an erfahrene Runner, wie auch an Neulinge im Sumpf der Sechsten Welt: wegbegleitend mit Tipps und Tricks für Gruppe und Spielleiter. Das Abenteuer ist als Print-Produkt in "Schattenrüstzeug" enthalten.',
		edition: 4,
		gameDate: '2070',
		name: 'Schattenkrieg',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Verlag'],
		releaseDate: ['2011-12-23'],
		sku: ['DEA001'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'SCHATTENHANDBUCH VIER\n\nDas Schattenhandbuch 4 ist der Nachfolger der Schattenhandbücher 1-3 – und führt die Reihe damit fort. Auch dieser Band enthält mehrere PDFs von der Plattform www.pegasusdigital.de für Shadowrun 5 in gedruckter Fassung, die sich alle dem deutschsprachigen Raum widmen:\n\n- Im Datapuls: Schweiz wird die Nation im Süden der ADL beleuchtet. Großkonzerne, erwachter Alpenraum und Metamenschen-Vorbehalte prägen das Bild des immer um Neutralität bemühten Staats. - Der Datapuls: Verschlusssache schaut hinter die Vorhänge der deutschen Geheimdienste, ganz besonders von Argus und dem BIS. - Im Datapuls: Frankfurt wird der Großraum Frankfurt mit Heidelberg, Mannheim, Wiesbaden und all den anderen verschluckten Städten beschrieben – das Reich des Frankfurter Bankenvereins und der AG Chemie. - Der Datapuls: Proteus führt tief in die Geheimnisse des Nordseekonzerns und seiner abgeschlossenen Arkologien, um den Antagonisten für den Spieltisch neu aufzupolieren. - Und im Datapuls: SOTA 2080 findet der Runner von Welt deutsche Wertprodukte aus den Bereichen Schusswaffen, Fahrzeugen, Drohnen, sowie Neuigkeiten aus dem Reich der Magie.',
		edition: 5,
		gameDate: '2073',
		name: 'Schattenhandbuch 4',
		notes: 'The book contains the printed version of several "Datapuls" supplements previously only published as eBooks: "Datapuls"-Ergänzungen: "Datapuls: Schweiz", "Datapuls: Verschlusssache", "Datapuls: Frankfurt", "Datapuls: Proteus" and "Datapuls: SOTA 2080" and - as an exclusive addition - "Datapuls: Auf der Jagd" with interesting facts about the federal police authorities of the ADL with a focus on BGS and BKA.',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Verlag'],
		releaseDate: ['2019-07'],
		sku: ['45072G'],
		status: 'missing',
		type: 'print'
	},
	{
		category: 'novel',
		description: "THE SHADOWS OF A MAN'S PAST ARE LONG…\n\nCole Danvers is a small-time shadowrunner scratching out a living in the dangerous, divided sprawl of Denver, Colorado. But when a lucrative heist to steal an AmerIndian amulet goes terribly wrong, costing him both his teammates and nearly his life, Cole hits the streets intent on only one thing — vengeance.\nBut as he tracks down the Johnson that sent him on this deadly mission, Cole quickly realizes he’s stumbled onto a plot much bigger than stealing a piece of jewelry — and that it’s somehow connected to his own shadowed past. Soon, he’s sucked into machinations that involve Native Americans, wily shamans, and impossibly, himself. And even sooner, Cole realizes he needs help to take down his enemies — before he gets killed for real this time.\nAssembling a motley crew of shadowrunners using every bit of guile and charisma he possesses, Cole sets out to solve the mystery of who tried to double-cross him and why… and what, if anything it has to do with his own murky background. But the answers may do more than just shock him… before it’s all over, they may just be the death of him…",
		edition: 6,
		gameDate: '2080',
		name: 'Shadow Dance',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2020-01-21'],
		sku: ['26864'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Marlene Dietrich erwacht im Rhein-Ruhr-Megaplex des Jahres 2078. Megakonzerne wollen ihre Persönlichkeit, Shadowrunner ihren Körper und Marlene will überleben. In einer Welt in der die Magie erwacht ist, Menschen, Elfen, Zwerge, Orks und Trolle ihren Körper mit Cyberware erweitern und alle in der Matrix unterwegs sind, gerät die Diva, der Vamp, die Legende zwischen alle Fronten; übermächtige Drachen, menschenfressende Guhle, Execs die Angestellte versklaven und zu willenloser Sexarbeit zwingen, gnadenlose Runner und der Abschaum in den Schatten. Wird Marlene die sechste Welt überstehen und das Rätsel ihrer Existenz lösen?',
		edition: 6,
		gameDate: '2080',
		name: 'Marlene Lebt',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Verlag'],
		releaseDate: ['2019-07-31'],
		sku: ['35012G'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Sie sind die härtesten Transportfahrer der ADL: die Männer und Frauen von Überlandexpress, einer Schattenorganisation, die Personen und Waren befördert – schnell, unbemerkt und ohne Fragen zu stellen. In ihren aufgemotzten Fahrzeugen jagen sie über die Bundesstraßen der Allianz. Sie kennen auch die unscheinbarste Nebenroute und die letzte Tankstelle in der Einsamkeit.\n\nCowboy und Nitro sind zwei dieser Fahrer. Als ihnen für eine Tour von Berchtesgaden nach Groß-Frankfurt eine Unsumme geboten wird, ahnen sie, dass sie dabei Ärger bekommen könnten. Hätten sie nur gewusst, wie viel! Denn das Artefakt, das sie befördern, stammt direkt aus dem Hort des ermordeten Drachen Nachtmeister. Und wenn es sein Ziel erreicht, könnte es das Gleichgewicht der Kräfte in der ganzen ADL ins Wanken bringen.',
		edition: 6,
		gameDate: '2080',
		name: 'Nachtmeisters Erben',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Verlag'],
		releaseDate: ['2020-05-18'],
		sku: ['35014G'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'Berlin, 2079. Etwas ist faul im Sprawl an der Spree. Metamenschen verschwinden, offenkundig sinnfreie Geschäfte werden von Unbekannten getätigt, und jemand scheint die antike Kabelmatrix zu reaktivieren, die seit Jahren unter der Stadt brach liegt. Mächte bringen sich in Stellung, doch niemand erahnt das Gewitter, das am Horizont aufzuziehen droht. Und welches die Stadt in ihren Grundfesten erschüttern könnte.\n\nAggi und Paul Dante, einst unzertrennliche Freunde, haben sich längst nichts mehr zu sagen. Als sie ihn nun herbeiruft, muss er aus seiner anhaltenden Abwärtsspirale ausbrechen, denn nur gemeinsam können sie sich der Bedrohung stellen.',
		edition: 6,
		gameDate: '2080',
		name: 'Alter Ratio',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Verlag'],
		releaseDate: ['2020-10-15'],
		sku: ['35015G'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: "Quelque chose de pourri se trame dans l'Hexagone...\n\nParis, 2076. Le peuple gronde et la VIe République menace de s'effondrer. Le président, Yohann de Kervelec, sent l'étau se resserrer. La noblesse veut sa tête pour avoir révélé la Cabale, les corporations veulent qu'il disparaisse pour avoir les coudées franches et tous ses alliés l'ont abandonné. Acculé, il tente un dernier coup, qui va plonger un groupe de shadowrunners dans la tourmente qui va s'emparer dans la France jusqu'en 2080. Entre rencontres de PNJ français emblématiques et exploration des recoins de la capitale, les PJ mèneront de périlleuses excursions au cœur de la Brume de Bretagne et dans la fange radioactive de la SOX. Au bout du compte, ils seront les seuls à pouvoir révéler les sombres secrets qui se cachent derrière la Néo-Révolution – s'ils y survivent.\nNéo-Révolution est une campagne en cinq scénarios pour Shadowrun, Cinquième édition et Shadowrun Anarchy, accompagnée d'un guide détaillé de Paris en 2080. La campagne invite ses joueurs à prendre part aux événements qui mèneront à la Néo-Révolution, un bouleversement politique qui changera à jamais le visage de la France de Shadowrun.",
		edition: 5,
		gameDate: '2076',
		name: 'Néo-Révolution',
		notes: 'Campaign and sourcebook for France and in particular the capital Paris.',
		originalLanguage: 'fr-FR',
		publisher: ['Black Book Editions'],
		releaseDate: ['2018-07-13'],
		sku: ['BBESR602'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'magazine',
		description: 'Schattenload is a monthly, free newsletter from Pegasus Verlag, which publishes game material for the German setting. It first appeared on January 27, 2019 as a replacement for the NovaPuls, the release of which - for the time being - has been discontinued because the "InGame Newsfax" in December 2018 was several months ahead of the InGame data of the US publications from Catalyst Games Lab.',
		edition: 5,
		gameDate: '2076',
		name: 'SchattenLoad',
		notes: 'As it is released monthly, some itens are missing.',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Verlag'],
		sku: ['STLD'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'magazine',
		description: 'NovaPuls is an in-game newsletter from Pegasus games. After initially only three newsletters have been published in Pdf format (one for Nordcon 2009 and two more for Nordcon 2011), the Novapuls has actually been published monthly since December 2012 as originally planned.',
		edition: 4,
		gameDate: '2070',
		name: 'NovaPuls',
		notes: 'It has been replaced by SchattenLoad.',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Verlag'],
		releaseDate: ['2009'],
		sku: ['NVP'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'Someone, somewhere, is about to get hurt.\n\nGuns will come out. Swords will unsheathe. Damage will be done. The same questions are at the center of it all: Who will suffer, and who will survive?\n\nShadowrunners stare violence in the face daily, deciding how much they’ll inflict, figuring out how they’ll remain alive. They know the prices that must be paid—the hard work of training, the challenge of recovery, and the continual effort to live with what you’ve done. Some shadowrunners develop a code to help them know what to do and what to avoid. Others decide to just develop a short memory.\n\nFiring Squad is the book to help shadowrunners pay those costs. It has new weapons, qualities, and techniques to hone shadowrunners’ combat abilities while also looking at how to develop characters based on the codes they follow and the violence they face. Take your character through new twists and turns and experience the shadows in a brand-new way.',
		edition: 6,
		gameDate: '2080',
		name: 'Firing Squad',
		names: {
			'de-DE': 'Feuer Frei'
		},
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2020-05-26'],
		sku: ['28002'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'The Other Shoe\nSome people working on bringing the core of Chicago back to life are brimming with optimism about its future. Others have spent the whole time waiting for the other shoe to drop. Well, it’s about to stomp down—hard. If the runners have ever wondered just how bad things might be in the tunnels under the Containment Zone, they’re about to find out, since that’s where Mr. Johnson wants them to go. What’s waiting for them will shake the foundations of the sprawl—as long as they survive long enough to tell someone what they discover.',
		edition: 5,
		gameDate: '2075',
		name: 'Sleeping Giants',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2020-04-06'],
		sku: ['SRM08-05'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'All Over\n\nIs the chaos spreading or concentrating? Either way, it’s increasing, and shadowrunners are sure to be caught in the middle of it. People have been pouring a lot of energy into the core of Chicago, and a final reckoning is about to take place. It’s up to the runners to decide where the pain hits.\n\nFinal Countdown is the grand finale of the Chicago series ofShadowrun Missions. After four seasons of Missions, the climax is here, and it’s going to be a doozy. Buckle up, hold on, and try to survive the ride!',
		edition: 5,
		gameDate: '2075',
		name: 'Final Countdown',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2020-05-26'],
		sku: ['SRM08-06'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'LOVE VERSUS DUTY…\n\nWhen Sartorial meets Kintsugi at a jabber — an illegal warehouse party — he falls hard and fast for the beautiful human girl. She is everything he didn’t know he wanted — and everything his family hates.\n\nKintsugi is drawn to the handsome elf boy like no other, but her future has already been planned. A future she intends to thwart. But now there’s something worth staying around for, she’s torn over what to do.\n\nUnfortunately, they both have secrets that will not be kept, and powerful families that have their own goals. It seems like the entire world is trying to keep them apart. Can Sartorial and Kintsugi overcome all obstacles to be together — even after their secrets are revealed?',
		edition: 6,
		gameDate: '2080',
		name: 'A Kiss to Die For',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2020-06-17'],
		sku: ['26006NV'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'STREETS ON FIRE…\n\nA vicious magical assault on a street gang isn’t a case paranormal P.I. Jimmy Kincaid would normally pick up. But when a fellow private eye asks him to look into it, and he learns the gang was doing a charity run for a church — a church Jimmy knows quite well — when they were attacked, his professional curiosity is raised. His investigation quickly leads to a tangled maze of clues and dead-ends. Someone — or something — is prowling the streets of Puyallup, looking to incinerate whoever crosses their path. And Jimmy’s got to find them — and stop them — before the entire neighborhood goes up in flames.\n\nBut whoever’s looking to light innocent victims on fire made one mistake — they’re doing it in Kincaid’s backyard. And Jimmy’s never taken kindly to trespassers…',
		edition: 6,
		gameDate: '2080',
		name: 'Chaser',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2020-06-17'],
		sku: ['26012NV'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'FUN—AND FEAR—IN THE SUN…\n\nEverything’s irie in the Caribbean. What could be better than a week of sun, fun, and parties at the bi-annual Caribbean League political conference in Havana, with every shadowrunner, pirate, and low-life in attendance looking for work? What could possibly go wrong?\n\nAnd when the Rastafarian troll shaman T’ing and his crew are approached by an official from Haiti to investigate rumors involving their old enemies, the dark voodoo Kofo cult, it looks like an opportunity for payback and profit combined.\n\nDigging deeper, however, T’ing and his runners discover a genocidal plot that threatens the entire region, possibly even resulting in an all-out shooting war between several major Sixth World players. There’s nothing to do but round up all their badass runner contacts, light up a spliff, and kick some ass. But this run will take them under the sea to a top-secret covert lab where Kofo cultists are hiding a weapon that could change the face of the entire Caribbean…and only T’ing and his hard-partying—and even harder-charging—crew stand in their way...',
		edition: 6,
		gameDate: '2080',
		name: 'Crocodile Tears',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2020-06-17'],
		sku: ['26008NV'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'misc',
		description: 'PICKING UP THE PIECES! Pre-order from our first-ever series of jigsaw puzzles for Shadowrun, printed right here in the USA! Five different images, done in high-quality foil and cut to a 500-standard piece puzzle. Each assembled puzzle is 18″ x 24″ and suitable for framing when complete. These puzzles are all limited to foiled print runs of 1000. Once they are gone, that’s it. These are a “while supplies last” offer. If they appear again, they will be in standard paper, not foiled.',
		edition: 6,
		gameDate: '2080',
		name: 'Foil and Puzzles',
		notes: 'Print only puzzles and folios of the game. See more at: http://www.shadowruntabletop.com/2020/06/announcing-shadowrun-foil-puzzles-and-foil-posters/',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2020-06-12'],
		sku: ['FOIL'],
		status: 'outofscope',
		type: 'print'
	},
	{
		category: 'mission',
		description: 'Erste Schatten\n\nDie Konzernintrige eines neuen AAA-Megakonzerns löst eine Spirale von Ereignissen aus, die einen lange schwelenden Konflikt erneut auflodern lässt. Doch dieser Konflikt ist weit mehr, als nur ein Wirtschaftskrieg: Es geht um Geheimnisse zaubermächtiger Drachen und um grimmige Drachentöter, um alte Schatzkammern und um neuen Hass, um falsche Loyalität und um wohlkalkulierten Verrat. Runner, die Im Schatten der Drachen ihre Jobs erledigen, erleben die Anfänge eines Untergrundkriegs, der die Allianz Deutscher Länder noch lange beschäftigen wird. Und können dabei selbst Geschichte schreiben.\n\nIm Schatten der Drachen ist eine Anthologie für Shadowrun 6 mit vier Einzelabenteuern. Alle Abenteuer sind komplett spielfertig, inklusive Grundrissen und Plänen. Als Kunstdiebe, Leibwächter, Spione und Kopfgeldjäger tauchen die Runner in die Schatten im Süden der Allianz Deutscher Länder ein: Schatten, die sich nach und nach zu einer bedrohlichen Finsternis zusammenziehen.',
		edition: 6,
		gameDate: '2080',
		name: 'Im Schatten der Drachen',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Verlag'],
		releaseDate: [
			'2020-05-31',
			'2020-06-15'
		],
		sku: ['46114G'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'misc',
		description: 'Draw, Chummer!\n\nAnd color. And do puzzles. And bask in the wonders of the mighty Sixth World dystopia! If you need something to pass the time, if you’re feeling a little isolated, or if you just want to soak in the Shadowrun setting for a while, this activity book is for you! It has tons of classic black-and-white art you can bring to glorious, colorful life, word searches, a crossword, and a bunch of other puzzles. Pay whatever you want for the PDF, then dive in and pass the time!',
		edition: 6,
		gameDate: '2080',
		name: 'Sixth World Activity Book',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2020-05-25'],
		sku: ['28507'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'NOTHING BUT SHREDS\nNOTHING IS REAL. EVERYTHING IS REAL.\n\nWhat you think is real rips and shreds, and the unreality beneath spills out. Everything you dreamed of. Everything you fear. The past returns, distorted and dark. The future sparks in glimpses and flashes. You see it all at once. You can try to deny it. But it is real. Everything is real. Which is that same as nothing being real.\n\nReality is tearing apart. The holes are everywhere. Dive into them.',
		edition: 6,
		gameDate: '2080',
		name: 'Slip Streams',
		names: {
			'de-DE': 'Schlagschatten'
		},
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: [
			'2020-08-24',
			'2020-10-15'
		],
		sku: [
			'28301',
			'46118G'
		],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'Falls from Grace\n\nOnce they were at the top of their field, or on the way there. Pro athletes, looking to make bank through fat contracts and endorsement deals, only to have their careers derailed by serious injuries and maybe a bad choice or two. Once their value on the playing field is done, they’re left high and dry, cut loose by the teams and corps who used to love them.\n\nSo when you’re income is gone but you’ve still got some physical skills, where else do you go to make a living but the shadows? Ingentis Athletes rounds up ten characters, giving their backgrounds and game statistics, with plot hooks that can help them be used in a wide variety of campaigns. On top of that, each character is a troll variant, so the book has information on making troll variant characters, including giants, fomorians, cyclops, and minotaurs. Broaden your game and character options with this book!',
		edition: 6,
		gameDate: '2080',
		name: 'Shadow Stock: Ingentis Athletes',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2020-07-17'],
		sku: ['28881S'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'Big Bang Boom\n\nLook, do you want a really nice gun, or do you want something that’s going to do the job? When you’re firing a projectile at high speeds, do you really need frills like blued steel, personalized grips, or a safety? And when you’re a real-sized being—like a troll or an ork, instead of one of the punier things—don’t you want something that was designed from the ground up with you in mind?\n\nAll of this is why Krime exists—to give you what you want. From the beefy Krime Heater handgun to the overstuffed Krime Soldier to the rapid-firing Krime Monster, this catalog includes a full range of weapons, along with vehicles like the barely street legal Krime Wageslave and the abomination known as the Krime DeTruck Sports Truck. Oh, and some ammo and grenades thrown in, because that’s the Krime way!',
		edition: 6,
		gameDate: '2080',
		name: 'Krime Katalog',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2020-07-08'],
		sku: ['27002S'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Layers of Power\n\nThe topmost layers of power have been scraped away, some wealth has been removed, but that doesn’t mean the western borders of the UCAS have nothing of worth. Hidden weapons may yet be found. Secret powers may rise. And maneuvering for wealth? What would the Sixth World be without it?\n\nAge of Rust shines a spotlight on a part of the UCAS that is disintegrating but still has plenty of intrigue and shadow-work happening—maybe more than before, since the higher powers who might tamp it down have left town, leaving the layers below to rise up and fight.\n\nTales from the UCAS\n\nCombining immersive materials with spotlights on specific areas of the UCAS, the Tales from the UCAS series provides plot hooks, rules, and other material to add intrigue and excitement to your Shadowrun game while exploring how the changes that hit the UCAS will continue to shape the nation—and how shadowrunners will adapt and exploit what they encounter.',
		edition: 6,
		gameDate: '2080',
		name: 'Tales from the UCAS: Age of Rust',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2020-05-01'],
		sku: ['28840S'],
		type: 'digital'
	},
	{
		category: 'misc',
		description: 'Yo, Chummer! Ready to bash into the party and get tactical? Ain’t no one you want backing your six more than Sledge. Street Sam. Big gauge. Heavy rep. And he always packs a couple of good cigars for the afterparty at Dante’s!\n\nThis Limited Edition resin statue is 6.5″ high (with base), with a Sprawl-approved master paint scheme. The first of a planned series, Sledge is sure to bring some Sixth World attitude to any collection.\n\nThis is a limited edition item and will not be offered again. Only 750 will be released.',
		edition: 6,
		gameDate: '2080',
		name: 'Sledge Limited Edition Statue',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2020-06-01'],
		sku: ['SLEDGE'],
		type: 'physical',
		status: 'outofscope'
	},
	{
		category: 'misc',
		description: 'They\'re rough. Tough. Ready for action. And you can fit five of them in your hand. Bring Sledge the ork street samurai, Coydog the elf shaman, Gentry the human decker, Hardpoint the dwarf rigger, and Blanco, the troll weapons specialist to your game table and let them unleash chaos!\n\nWhether you\'re playing Shadowrun (and you should definitely play Shadowrun) or any other game, these cyberpunk-crossed-with-fantasy minis will bring atmosphere and action to your game!',
		edition: 6,
		gameDate: '2080',
		name: 'Prime Runner Miniatures',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2020-06-01'],
		sku: ['28880'],
		type: 'physical',
		status: 'outofscope'
	},
	{
		category: 'misc',
		description: 'Keep Shadowrun action moving with cyberpunk style! Whether you’re calculating your dice pools on the fly or using some of your most common rolls, the app features themed dice with individual animations and sounds to make your dice easy to roll and easy to count. Features include:\n\nSpecially designed dice with Shadowrun themes, each with unique animations and sounds.\nStreet samurai dice included, with a sample die of each of the other types included, namely: mage die, adept die, decker die, face die, rigger die, and shaman die. Once you try them all out, you can purchase more of your favorites.\nAutomatic calculation of hits and glitches, while also tallying the total pips rolled for initiative purposes.\nDice pools as small as 1, as large as 40.\nRoll by touching the screen—or by shaking your device.\nWhen you buy dice beyond the free sample die, you get an accompanying piece of Shadowrun art that can be used as an app backdrop.\n\nWorks with any edition of Shadowrun—or any game that includes rolling D6s. Keep the action moving and the dice rolling. And never again worry about whether your hands can hold all the dice you’re going to roll!',
		edition: 6,
		gameDate: '2080',
		name: 'Shadowrun Dice roller',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2019-12-18'],
		sku: ['DRA'],
		type: 'digital'
	},
	{
		category: 'misc',
		description: "Whether on the desperate streets or in the Machiavellian high-rises of the corporate elite, dangerous people lurk in every corner of the Sixth World. And they're in here, too, with a quick backstory, a hook, and streamlined game stats. Bring the Shadowrun universe to life by putting these characters at your fingertips and in your game!\n\nContents:\n27 Street NPCs\n5 Elite NPCs\n15 Veteran NPCs\n3 Legendary NPCs\n8 Reference Cards",
		edition: 6,
		gameDate: '2080',
		name: "Rogue's Gallery: An NPC Deck",
		notes: 'A deck of printed NPC cards.',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2019-12-18'],
		sku: ['28500'],
		status: 'missing',
		type: 'print'
	},
	{
		category: 'sourcebook',
		description: 'Schatten sind alle schwarz? Das stimmt nicht, Chummer. Ihnen mag das Licht fehlen, aber wer in den Schatten der ADL sein Geld verdienen will, der sollte sich gut auskennen. In Westphalen, wo die Kirche regiert und erwachte Theurgen dich jagen. In Pomorya, dem Elfenstaat an der Ostsee mit seinen Adelsgeschlechtern und seiner modernen Öko-Industrie. In München, dem Megaplex der Schwarzen Sheriffs und der Schickeria. An der Nordseeküste, wo Piraten von verlassenen Ölplattformen und im toxischen Watt gegen Giftgeister und Konzerne kämpfen. Und du solltest dabei schauen, dass deine Ausrüstung immer auf dem neuesten Stand bleibt … sonst wird die Dunkelheit der Schatten dich irgendwann verschlingen.\n\nDas Schattendossier I ist der erste Sammelband der bisher erschienenen PDFs für die ADL für Shadowrun 6. In ihm sind die Datapulse für Westphalen, München, Pomorya, Piraten der Deutschen Bucht und das SOTA 2081 zusammengefasst, inklusive einer kleinen, exklusiven Erweiterung zur Seucheninsel in der Ostsee. Das Schattendossier I ist streng limitiert und die einzelnen Bücher durchnummeriert.',
		edition: 6,
		gameDate: '2080',
		name: 'Schattendossier 1',
		notes: 'A collection of PDFs.',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Verlag'],
		releaseDate: ['2020-06-15'],
		sku: ['46115'],
		status: 'outofscope',
		type: 'print'
	},
	{
		category: 'sourcebook',
		description: 'Verheißung und Vernichtung\n\nVon Kap Arkona bis Stralsund: das Elfenreich Pomorya war schon immer ein Land der Verheißung. Es verspricht die Rückkehr zur Natur, belebt alte Naturreligionen und verspricht seinen Einwohnern Sicherheit. Aber zu welchen Kosten? Was muss dafür vernichtet werden, was wird dafür unterdrückt? Was lauert – sprichwörtlich – unter der Oberfläche des nach außen so sauber wirkenden Staats? Denn wo viel Licht ist, da lauert auch viel Schatten.\n\nDatapuls Pomorya wirft ein Licht auf den Elfenstaat Pomorya in der Ostseeküste der ADL. Es liefert einen Einblick in Intrigen zwischen den Kurfürsten, den Alltag mit der Natur, die ansässigen Mächtegruppen und bietet zudem eine tiefere Sicht in das Machtgeflecht aus Politik und Wirtschaft. Hier können Runner Abenteuer erleben – in ganz natürlicher Umgebung...',
		edition: 6,
		gameDate: '2080',
		name: 'Datapuls: Pomorya',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Verlag'],
		releaseDate: ['2020-04-23'],
		sku: ['480D1'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Schickeria und Schwarze Sheriffs\n\nWährend auf der Wiesn Hunderttausende feiern und dem Alltag entfliehen, während die Schickeria in ihrer Bussi-Bussi-Gesellschaft eine heile Welt vorspielt, während Traditionalisten München stabil halten wollen ... währenddessen bleiben die Schatten in der bayerischen Metropole nicht inaktiv. Die Megakonzerne ziehen ihre Strippen, Drachen kämpfen um ihre Pfründe und Runner verdienen in der Medienbranche hinter der Kamera gutes Geld.\n\nDatapuls München wirft ein Licht auf den Metroplex München als größter Plex der ADL im Süden. Es liefert einen Einblick in Ränkespiele von Geheimgesellschaften, den Alltag der Stadt, die ansässigen Mächtegruppen und bietet zudem eine tiefere Sicht in die Politik und die Konzernwelt des Plex. Hier können Runner Abenteuer erleben – im Licht und auch in den Schattenwelten.',
		edition: 6,
		gameDate: '2080',
		name: 'Datapuls: München',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Verlag'],
		releaseDate: ['2020-04-23'],
		sku: ['480D2'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Ausrüstungsudpate\n\nWenn Plan A mal wieder nicht funktioniert, wenn die Kacke in den Ventilator fliegt, wenn die Schwarzen Sheriffs, der Sternschutz und die Konzerntruppen die Kreise um die Runner enger ziehen und mit Waffen, Drohnen und Unterstützung aus dem Astralraum aufmarschieren, dann hilft oft nur noch: die richtige Ausrüstung parat haben für den Plan B. Mehr Waffen. Mehr Drohnen. Mehr Unterstützung aus dem Astralraum.\n\nDatapuls SOTA 2081 präsentiert mehr Ausrüstung für Shadowrun 6. Insgesamt 12 Waffen und 12 Fahrzeuge bzw. Drohnen, die Hälfte davon noch nie in einer Publikation erwähnt, die andere Hälfte mit neuem Flufftext und Werten für Shadowrun 6. Dazu eine Übersicht über die Waffen- und Fahrzeugproduzenten in der ADL, sowie neue Schutzgeister für die magischen Erwachten.',
		edition: 6,
		gameDate: '2080',
		name: 'Datapuls: SOTA 2081',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Verlag'],
		releaseDate: ['2020-04-23'],
		sku: ['480D3'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Im Schatten der Kreuze\n\nWestphalen - eine Enklave des Glaubens und der Segnungen. Ein Landstrich mit hoher Agrarkultur und einer festen Gemeinde deutsch-katholischer Christen unter der theokratischen Führung der Kirche. Doch ist wirklich alles so heilig im gelobten Land? Was geht in den Schatten der Beichtstühle vor und warum ist die Bischofsgarde so gut bewaffnet?\n\nDatapuls Westphalen wirft ein Licht auf den Kirchenstaat Westphalen im Norden Deutschlands. Es liefert einen Einblick in die Kirchenstruktur, in das Leben unter dem Kreuz, in Ordensstrukturen und natürlich auch in die Schatten der Deutsch-Katholischen Kirche. Zwischen gesegneten Technomancern und von Gott mit heiliger Kraft ausgestatteten Theurgen erledigen auch hier Runner die Drecksarbeit.',
		edition: 6,
		gameDate: '2080',
		name: 'Datapuls: Westphalen',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Verlag'],
		releaseDate: ['2020-04-23'],
		sku: ['480D4'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Toxische Wogen\n\nDie Deutsche Bucht - giftige Nordseefluten, agressive Geister, mutierte Critter, versteckte Schätze im Watt, ominöse Küstenbewohner und Piratenverstecke. Und wertvolle Fracht auf den Schiffen der Konzerne. Hier treffen sich Seeräuber und Entermannschaften und planen ihren nächsten großen Coup, rauben Containerriesen aus, verbünden sich mit den Friesen und belagern ganze Bohrplattformen. Immer im Ungewissen, ob am Ende der nächsten Fahrt eine satte Prise oder der Meeresboden wartet.\n\nDatapuls Piraten der Deutschen Bucht wirft ein Licht auf die deutsche Nordsee und die Küstengebiete mit besonderem Fokus auf die Piraten in dieser Region. Es bietet einen tieferen Einblick in die Piratennationen, die Möglichkeiten für Mannschaften auf See und im Watt, beschreibt mystische Orte, Konzernaktivitäten, wichtige Machtspieler. Zudem werden einige Wasserfahrzeuge präsentiert, sowie ein Piratennationbaukasten, ein nautisches Glossar und NSC von der Küste.',
		edition: 6,
		gameDate: '2080',
		name: 'Datapuls: Piraten der Deutschen Bucht',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Verlag'],
		releaseDate: ['2020-04-23'],
		sku: ['480D5'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Übersicht ist alles\n\nHier kommen sie - die Cheat Sheets für die 6. Edition. Um den Überblick in jeder Situation zu behalten, können Spielleiter und Spieler mit diesen Cheat Sheets arbeiten, die für ein noch flüssigeres Spielerlebnis sorgen. Ob im Kampf, bei Beschwörungen oder wenn mal wieder IC das Blut des Deckers in seinen Adern gefrieren lässt - die Cheat Sheets liegen stets zur Seite.\n\nCheat Sheets SR6 sind Übersichtsblätter für Shadowrun 6 für die Bereiche Kampf, Rigging, Matrix, Magie und allgemeine Regeln. Diese Cheat Sheets sind Bestandteil des Spielschirm-Bundles, das es in analoger Form zu kaufen gibt. Dies ist die digitale Version (nur der Cheat Sheets).',
		edition: 6,
		gameDate: '2080',
		name: 'Cheat Sheets SR6',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Verlag'],
		releaseDate: ['2020-05-18'],
		sku: [''],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Bühne frei\n\nNicht nur Runner müssen sich in den Schatten ständig Gedanken machen, damit sie mit Credsticks in der Tasche und nicht mit Blei im Körper von ihren Aufträgen zurückkehren. Auch die Spieler der Charaktere stehen vor diversen Entscheidungen: Wen will ich spielen, warum und wo? Wie verknüpfe ich meinen jungen Decker mit dem alten Haudegen der Gruppe? Wie kann ich meine Hintergrundgeschichte weiter ausgestalten?\n\nFür spannende Geschichten in der Sechsten Welt bedarf es zudem gut konzipierte Abenteuer, vielleicht sogar ganzer Kampagnen und Settings. Es bedarf vielschichtiger Gegenspieler, interessanter Locations und vielleicht darf es ja auch mal etwas anderes sein als die Schießerei in einer zwielichtigen Gasse.\n\nHinter dem Vorhang ist eine weitere Eigenproduktion und ein Regelband für Shadowrun 6, der kaum Regeln enthält. Neben ein paar optionalen Vorschlägen Veränderungen finden sich vor allem Werkzeuge für Spieler und Spielleiter: Informationen zum Charakterausbau, zur Gruppenzusammenführung, zur Abenteuerplanung, zu alternativen Einstiegen, zu Kampagnen-Konzepten. Du brauchst schnell einen zusammengewürfelten NSC, ein Abenteuer am Rand des eigentlichen Abenteuers, eine Automatenrestaurant-Speisekarte, einen Alltagshost oder willst wissen, was der Wachmann gerade zufällig in der Tasche oder auf dem Kommlink hatte? Hier wirst du fündig.',
		edition: 6,
		gameDate: '2080',
		name: 'Hinter dem Vorhang',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Verlag'],
		releaseDate: ['2020-10-15'],
		sku: ['46117'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'Unerwartete Wettgewinne, merkwürdige Vorgänge im Untergrund, geplünderte Konten und gefährliche BTL-Chips: Berlin droht ein tödliches Gewitter. Und während sich die Wolken zusammenziehen, werden die Runner immer tiefer zwischen die Fronten bewaffneter Kieze, skrupelloser Konzernforscher, dissonanter Technomancer, wütender Vory und einem dunklen Geheimnis aus uralter Technik gezogen. Die Blitzeinschläge kommen näher. Deckung suchen ist keine Option mehr. Und während es um Moral, Gewinn und Überleben geht, kann vielleicht nur noch ein mysteriöser Verbündeter aus Code und Kristall helfen.\n\nNetzgewitter ist ein Kampagnenband für Shadowrun 6, der im Megasprawl an der Spree spielt. In mehreren Kapiteln durchleben die Runner eine spannende Story um alte Verbindungen und neuen Hass, die eng mit dem Metaplot der ADL verknüpft ist. Netzgewitter ist eine deutsche Eigenproduktion und bietet fertige Abenteuer in einer zum Teil modular aufgebauten Handlung. Und an deren Ende wartet ein fulminanter Showdown, der nicht nur über das Schicksal der Runner entscheiden wird.',
		edition: 6,
		gameDate: '2080',
		name: 'Netzgewitter',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Verlag'],
		releaseDate: ['2020-10-15'],
		sku: ['46121'],
		status: 'missing',
		type: 'digital'
	},
	{
		category: 'boardgame',
		description: 'Wir schreiben das Jahr 2076. Die Erde hat sich weitergedreht. Orks, Trolle, Elfen und Zwerge bevölkern eine Welt, in der Megakonzerne regieren und modernste Technik sich mit mystischer Magie vermischt. In diesen Zeiten sind sogenannte Shadowrunner gefragte Aktivposten, denn sie erledigen für die Mächtigen die Drecksarbeit in den dunklen Gassen der riesigen Städte. Mit futuristischer Ausrüstung, Zaubersprüchen und Drohnen ziehen sie ins Gefecht.\n\nShadowrun Schattenland ist ein packendes, taktisches Brettspiel mit einem Schwerpunkt auf Erzählung und freie Spielentscheidungen. Angeleitet von einem Spielleiter durchleben die Spieler zahlreiche Szenarien in einer atemberaubenden, dystopischen Zukunft. Mit ihren Charakteren erkunden sie verschiedene Orte und treten gegen gefährliche Gegner an, die ihren Weg zu Ruhm, Geld und neuer Ausrüstung für den nächsten Job versperren. Das eigenständige Brettspiel Schattenland basiert auf der beliebten Rollenspielwelt von Shadowrun und schöpft aus deren faszinierenden Themen. Das macht es zum einem äußerst atmosphärischen Erlebnis, welches jedoch keine Vorkenntnis der Spielwelt erfordert.',
		edition: 6,
		gameDate: '2080',
		name: 'Shadowrun: Schattenland',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Verlag'],
		releaseDate: ['2020-12-15'],
		sku: ['45015'],
		status: 'outofscope',
		type: 'physical'
	},
	{
		category: 'rulebook',
		description: 'The Colt Secret Agent. The Ultimax 71. The Izom Artemis. These and many more are in this weapon pack, with each card having game stats and art. Includes weapons from Shadowrun, Sixth World and Firing Squad.',
		edition: 6,
		gameDate: '2080',
		name: 'Gun Rack (Weapon Cards)',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2020-08-24'],
		sku: ['28504'],
		type: 'digital'
	},
	{
		category: 'misc',
		description: 'Tossing a handful of dice to out-maneuver or out-gun your opponent always brings a rush. Especially when you’re spending some Edge to boost your actions. Add more dice to your Shadowrun game, along with a great way to track your Edge!',
		edition: 6,
		gameDate: '2080',
		name: 'Dice & Edge Tokens',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2019'],
		sku: ['28501'],
		status: 'outofscope',
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'Lighting the Electric Town\n\nNeo-Tokyo, where the bright neon makes for some deep shadows. It’s not the easiest place to navigate, but the rewards for learning how it works are high. Want a shot at the big time? Then you have to start somewhere. And there are always openings at the bottom.\n\nThat doesn’t mean life will be either safe or boring. Dedicated runners can be caught in the mayhem of a troll metal concert, look for the right way to shake down a business, show some punks who’s the boss, and give a corp drone what’s coming to him. There may be bigger-paying jobs out there, but getting these jobs right is the first step to getting them.',
		edition: 6,
		gameDate: '2080',
		name: 'Started from the Bottom',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2020-11-02'],
		sku: ['SRM09-01'],
		type: 'digital'
	},
	{
		category: 'sourcebook',
		description: 'DO THE COLLAPSE!\n\nSome are careful, others are chaotic. Some are new, others old. Some are ruthlessly calculating and logical, others have only the barest acquaintance with sanity. But they’re all in the shadows, they’re all dangerous, and they’re all things you need to know.\n\nCollapsing Now details ten organizations poised to make an impact on the ever-shifting structures of the Sixth Word—ten organizations shadowrunners could encounter. Maybe they’ll be helpful, maybe harmful, maybe both, but whatever the case, runners need to know what they’re about. Because the last thing a good runner ever wants to be is surprised.',
		edition: 6,
		gameDate: '2080',
		name: 'Collapsing Now',
		languages: {
			'de-DE': 'Phantome'
		},
		notes: 'The german edition has an additional part discussing groups such as the "Disciples of the Cleansing Fire" or the "SiegfriedBund".',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2021-01-08'],
		sku: ['28450'],
		type: 'digital'
	},
	{
		category: 'novel',
		description: 'BLOOD IS THICKER THAN SHADOWS…\n\nJackPointer mage Winterhawk hadn’t planned to accompany the expert team he’d hired to study ley lines in Boston’s Quarantine Zone. But he also hadn’t planned on a shocking and unexpected secret from his past catching up with him either.\n\nWhen the trip inside the Zone goes catastrophically wrong, ’Hawk finds himself alone in hostile territory—but his presence hasn’t gone unnoticed. His only way out is to do something a shadowrunner is never, ever supposed to do: make a deal with a dragon.\n\nFaced with three separate missions to complete and limited time to do them, ’Hawk needs allies fast. He finds them in unexpected places—including his original target, who needs a lot less rescuing than he thought. But she’s also nothing like he expected—and the complications she brings with her jeopardizes their chances of escaping the Zone alive.',
		edition: 6,
		gameDate: '2080',
		name: 'Veiled Extraction',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2020-09-28'],
		sku: ['26863'],
		type: 'digital'
	},
	{
		category: 'mission',
		description: 'SCHNELLSTART-ABENTEUER FÜR SHADOWRUN 6\n\nBATTLE ROYAL\n\nBattle Royal ist ein Schnellstart-Abenteuer für Shadowrun 6, das für die Schnellstartregeln konzipiert wurde. Tauche ein in die Schatten und lerne die neuste Edition der Sechsten Welt kennen.',
		edition: 6,
		gameDate: '2080',
		name: 'Battle Royale',
		originalLanguage: 'de-DE',
		publisher: ['Pegasus Spiele'],
		releaseDate: ['2019-07'],
		sku: ['QSA6D'],
		type: 'digital'
	},
	{
		category: 'rulebook',
		description: 'Power Surge\n\nThe power to shape the world can also tear it apart. The power to summon spirits and gain allies can also conjure enemies and lead to your own destruction. And the power to fill objects with magic is also the ability to make them blow up in your face.\n\nShadowrunners learn about power the hard way—by being on the wrong end of it. That means they often gather it to them however they can, consequences be damned. Street Wyrd is a guide to all sorts of Awakened power, from spells to adept powers to new spirits to enhanced enchanting rules. It also gives runners the power to make their own spells to unleash on their enemies. Because runners know that the power you grab for yourself is the only thing that stays with you.',
		edition: 6,
		gameDate: '2080',
		name: 'Street Wyrd',
		originalLanguage: 'en-US',
		publisher: ['Catalyst Game Labs'],
		releaseDate: ['2021-02-09'],
		sku: ['28003'],
		type: 'digital'
	}
];
