/**
 * The format the material on this collection is organized.
 * @typedef Object Material
 * @prop {"rulebook"|"sourcebook"|"mission"|"magazine"|"novel"|"unofficial"|"videogame"|"tcg"|"boardgame"|"misc"} category The category the material fits in, it (almost) follows the folder organization of the collection.
 *
 * It may be one of the following:
 * - *Rulebook*: A book containing mostly rules that are compatible with only one edition of the game.
 * - *Sourcebook*: A book containing settings, plot hooks and other stuff that is mostly background information, not rules.
 * - *Mission*: A book containing information to be used on an adventure or campaign.
 * - *Magazine*: A magazine publication with assosrted content.
 * - *Novel*: A fictin book writen based on the Shadowrun universe.
 * - *Unofficial*: Fan made publication specific for Shadowrun.
 * - *Videogame*: Digital game setted in the Shadowrun world.
 * - *TCG*: Trade Card Game based on the Shadowrun universe.
 * - *Boardgame*: A boardgame or other physical game that is setted in the Shadowrun universe.
 * - *Miscellaneous*: Assorted matterials that don't fit in any of the above categories.
 *
 * @prop {"digital"|"print"|"scan"|"ocr"|"physical"} type The type of the material.
 *
 * It may be one of the following:
 * - *Digital*: The material is available in digital format.
 * - *Print*: The material is available in printed format only.
 * - *Scan*: The material is a scan of the printed format.
 * - *OCR*: The material is a OCR scan of the printed format.
 * - *Physical*: The material is only available in physical format other than a book (TCG, boardgame, etc.).
 *
 * @prop {String[]} sku The number that identifies the material within the publisher, some are infered (mostly for unofficial material).
 * @prop {String} name The name of the material (used in search).
 * @prop {String} description A description or synopsis of the material.
 * @prop {1..5} edition The edition of the publication, ranging from `1` to `5`.
 * @prop {String[]} publisher The enterprise who published the material.
 * @prop {String} [image] The image name to find, it will be used instead of the sku if present.
 * @prop {String} [gameDate] The in game date of the material.
 * @prop {String[]} [releaseDate] The date the material was released, it is an `Array` if the material was rereleased. If not present the material is considered unreleased.
 * @prop {Object[]} [files] A list of the material files.
 * @prop {String} [files.path] The path of the file, relative to the root folder of the colection.
 * @prop {String} [files.mime] The mime type of the material.
 * @prop {String} [files.url] A url to the file if it's hosted somewhere else.
 * @prop {String} [files.name] A name to the file that will be presented for the URL or the path if present.
 * @prop {String} [files.size] The size in bytes of the file.
 * @prop {String} [files.store] The store in witch the file is available.
 * @prop {Boolean|"outOfScope"} [missing] If the file is missing or is out of the scope of this colection, (for been physical or multi-platform, for example).
 * @prop {String} [notes] Some notes about the material, useful when it's missing to explain why.
 */
export default new Map([
	[
		'26000',
		{
			sku: ['26000', '26001'],
			category: 'rulebook',
			type: 'digital',
			name: 'Shadowrun Fourth Edition',
			releaseDate: ['2005-10', '2008-02'],
			description: 'The year is 2072. Magic has returned and creatures of myth and legend walk among us as megacorps bleed the world dry. Youâre a shadowrunnerâa deniable asset, a corporate pawnâusing bleeding-edge science and magic to make your meat body and mind better-than-flesh. Stay on the edge, and you may survive another run on the mean sprawl streets.',
			gameDate: '2070',
			edition: 4,
			publisher: ['fanpro', 'catalyst'],
			files: [
				{
					path: './Rulebooks/26000 - Shadowrun Fourth Edition.pdf',
					size: '82515706',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/26000 - 4th Ed. Errata v15.pdf',
					size: '234585',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26002A',
		{
			sku: ['26002A'],
			category: 'rulebook',
			type: 'digital',
			name: 'Augmentation',
			releaseDate: ['2008-08'],
			description: 'Augmentation is the advanced medtech rulebook for Shadowrun, Fourth Edition, covering everything you need to know about implantsâincluding new cyberware and bioware and where to score the surgery. It provides detailed overviews of genetics and nanotechnology, from regrowing limbs to lethal cutter swarms. It also previews the bleeding-edge of medtech: bio-drones, cybermancy, and full-body cyborgs. Augmentation contains everything players and gamemasters need for implants and body modification in Shadowrun.',
			gameDate: '2070-08',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/26002A - Augmentation.pdf',
					size: '18684242',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26004',
		{
			sku: ['26004', '26001'],
			category: 'rulebook',
			type: 'digital',
			name: 'Street Magic',
			releaseDate: ['2006-06', '2008-08'],
			description: 'Street Magic is the advanced magic rulebook for Shadowrun, Fourth Edition. It provides background details on everything known to magic in the year 2070, from the nature of mana and astral space to and its effects on society and the Awakened. It also covers a few things that aren\'t known - or at least understood - such as the metaplanes and hostile spirits. It also contains advanced rules for magic traditions and groups, initiation and metamagic, enchanting, and new spells and adept powers.',
			gameDate: '2070-04',
			edition: 4,
			publisher: ['fanpro', 'catalyst'],
			files: [
				{
					path: './Rulebooks/26001 - Street Magic.pdf',
					size: '21117410',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/26001 - Street Magic Errata v1.2.pdf',
					size: '210127',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'5839',
		{
			sku: ['5839', '27824'],
			category: 'novel',
			type: 'digital',
			name: 'The Burning Time',
			releaseDate: ['2001'],
			description: '[Tommy Talon Series No.#3] Boston Metroplex - Low-level programmer Roy Kilaro wants nothing more but to become a Seraphim, an elite corporation operative, and experience some real live action in the shadow ops between megacorporations. He gets more than he ever wanted when a routine business trip to Boston lands him at ground zero of a running battle for survival. The combatants: a group of hardened \'runners trying to finish a job, the ruthless anti-elven terrorist group known as the Knights of the Red Branch, and a powerful sorceress who wants revenge upon them all...',
			gameDate: '2061',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Novels/5839 - The Burning Time.epub',
					size: '394050',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5749',
		{
			sku: ['5749', '27823'],
			category: 'novel',
			type: 'digital',
			name: 'The Forever Drug',
			releaseDate: ['1999-06', '2004-02'],
			description: 'There\'s a new "drug" on the streets, promising a phenomenal--and deadly--high. But this time the dealers aren\'t selling a substance. They\'re working with a creature called a "corpse light"--a creature of pure magic that gives the customer a euphoric rush...as it drains the poor sap\'s life away.\nRomulus was the first to see this new scourge in action. As a shapeshifter, he\'s a freelance agent to the Lone Star police department. His wolfish strength and sense of smell keep him useful--and keep from being admitted into the regular force. So when Jane, a beautiful, amnesiac woman, is caught in a dangerous web with the dealers, there\'s no way for Romulus to be assigned to the investigation. But that won\'t stop him from trying to save her, and to discover how she is tied into this case...',
			gameDate: '2060',
			edition: 3,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5749 - The Forever Drug.epub',
					size: '400308',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5742',
		{
			sku: ['5742', '27818'],
			category: 'novel',
			type: 'digital',
			name: 'Crossroads',
			releaseDate: ['1999-04', '2003-06'],
			description: '[Tommy Talon Series No.#1] In the magical world of 2060, street mage Tommy Talon has hit the big time. He\'s a member of Assets, Inc., one of the best shadow-teams in the business, but now he\'s drawn back to his home town of Boston by secrets from his past. Secrets that lead him into conflicts with megacorporations, yakuza gangsters, and a powerful spirit that\'s hunting for him.\nTalon must call on all of his magical powers and the abilities of his shadowrunning friends to unravel the mystery. Along the way, he finds out some unexpected things about his past, himself, and his true enemy: someone very close to him indeed...',
			gameDate: '2060',
			edition: 3,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5742 - Crossroads.epub',
					size: '397732',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5819',
		{
			sku: ['5819', '27825'],
			category: 'novel',
			type: 'digital',
			name: 'Tails You Lose',
			releaseDate: ['2001-02', '2003-06'],
			description: 'When a shadowrunner managed to extract PCI\'s most vital employee, it was Alma\'s job as security expert to get him back--no matter the cost. But all the evidence pointed to the one person who couldn\'t have done it...herself. Branded a traitor, Alma has one shot at redemption: find the real culprit. But she\'s never faced an enemy like this one.\nThis \'runner not only looks like Alma--she\'s also equipped with Alma\'s top-of-the-line cybernetic implants, and she\'s backed by the powerful magic of the Chinese underworld. Now, the expert in defense must attack--and risk it all to bring down a rival so much like herself that there can be only one shocking explanation...',
			gameDate: '2062',
			edition: 3,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5819 - Tails You Lose.epub',
					size: '419225',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5775',
		{
			sku: ['5775', '27822'],
			category: 'novel',
			type: 'digital',
			name: 'Ragnarock',
			releaseDate: ['2000-02', '2003-06'],
			description: '[Tommy Talon Series No.#2] In the twenty-first century, magic brings out the best in people--and the worst. Tommy Talon should know. As head of a successful shadow-running team, it\'s the dark side of people that brings him business. This time he\'s hired to hunt a murderous archaeologist and recover a magical relic. But Talon\'s not hunting alone.\nSomeone else wants the artifact too--someone very powerful. And Talon and his team must outwit the world\'s most potent megacorporation on its own turf if they\'re to have any chance of returning the treasure--or any chance of returning at all...',
			gameDate: '2061',
			edition: 3,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5775 - Ragnarock.epub',
					size: '410268',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'26002X',
		{
			sku: ['26002X'],
			category: 'rulebook',
			type: 'digital',
			name: 'Contacts and Adventures',
			releaseDate: ['2006-03'],
			description: 'The 32 page Contacts and Adventures booklet, which features a variety of NPCs with complete stats; over 30 plot hooks covering a wide range of shadowrunning possibilities; the SR3 to SR4 character conversion rules, and two pages of additional tables that we couldn\'t squeeze onto the GM Screen itself.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/26002X - Contacts and Adventures.pdf',
					size: '2577028',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26100X',
		{
			sku: ['26100X'],
			category: 'rulebook',
			type: 'digital',
			name: 'Gamemaster Screen SR4A',
			releaseDate: ['2011-08-17'],
			description: 'All the important Shadowrun info you need, free!\nDon\'t spend time flipping through a book to find the tables you need. When you\'re on a run, time matters, and this PDF version of the Shadowrun GM Screen gets you that info, fast!',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/26100X - Gamemaster Screen SR4A.pdf',
					size: '5966278',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'2600A',
		{
			sku: ['2600A', '2600LE'],
			category: 'rulebook',
			type: 'digital',
			name: 'Shadowrun 4th Edition - 20th Anniversary Core Book',
			releaseDate: ['2009-03'],
			description: 'The year is 2072. Magic has returned and creatures of myth and legend walk among us as megacorps bleed the world dry. Youâre a shadowrunnerâa deniable asset, a corporate pawnâusing bleeding-edge science and magic to make your meat body and mind better-than-flesh. Stay on the edge, and you may survive another run on the mean sprawl streets.',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/2600A - Shadowrun 4th Edition - 20th Anniversary Core Book.pdf',
					size: '57971222',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26600',
		{
			sku: ['26600'],
			category: 'rulebook',
			type: 'digital',
			name: 'Digital Grimoire',
			releaseDate: ['2008-11'],
			description: 'Nobody Knows All Magic Digital Grimoire is the Master\'s Class of Magic--expanding on Street Magic, it details additional traditions, magical groups & threats, spirits, enchanting expansions, and a handful of new spells and adept powers. Traditions: Egyptian, Rastafarian, Psionic Magical Groups: Shrine of the Southern Winds, The Oxford Grand Lodge, CÃ³digo 515 Magical Threats: Toxic Paths, Shadow Spirits, Insect Spirits Digital Grimoire is 18 pages (including cover): a bite-sized expansion to Shadowrun, Fourth Edition and Street Magic.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/26600 - Digital Grimoire.pdf',
					size: '2778794',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S013',
		{
			sku: ['26S013'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Safehouses',
			releaseDate: ['2012-02'],
			description: 'If it hasnât happened to you yet, it will. A run will go south. People will be looking for you. Their eyes will be everywhereâyour home, your friendsâ houses, the places you hang out, even the spots where you buy your soykaf. Theyâre looking for you, waiting for you, and when they find you, theyâre not going to talk. Itâll be a single shot, or a flash of sharp steel, and youâll be done.\nTo avoid this, you need to lay low. You need a place where no one will look for you, and where youâll have enough of lifeâs basics to get you by. Donât know where to find such a place? Youâre in luck, chummerâweâve got the guide for you. Whether your acquiring and stocking your own bolt hole or engaging professional safehouse managers, weâve got the info you need to live to fight another day.',
			gameDate: '2074-08',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26S013 - Safehouses.pdf',
					size: '6094077',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26005A',
		{
			sku: ['26005A'],
			category: 'rulebook',
			type: 'digital',
			name: 'Runner\'s Companion',
			releaseDate: ['2008-08'],
			description: 'Life in the shadows has never been as dangerous, and runners need every edge they can get. Runnerâs Companion opens up a world of expanded options for Shadowrun players with dozens of New Qualities, Advanced Contact and Lifestyle Rules, and handy tips on running, travelling and smuggling, and operating in a surveillance society.',
			gameDate: '2071-07',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/26005A - Runner\'s Companion.pdf',
					size: '16818745',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26002',
		{
			sku: ['26002'],
			category: 'rulebook',
			type: 'digital',
			name: 'GM\'s screen',
			releaseDate: ['2006-03'],
			description: 'The Shadowrun, Fourth Edition Gamemaster\'s Screen & Contacts and Adventures booklet eBook version contains the following documents:\nThe 32 page Contacts and Adventures booklet, which features a variety of NPCs with complete stats; over 30 plot hooks covering a wide range of shadowrunning possibilities; the SR3 to SR4 character conversion rules, and two pages of additional tables that we couldn\'t squeeze onto the GM Screen itself.\nThe full GM Screen, front and back, in one giant 33 by 11 inch file.\nAll four panels of the GM Screen, plus the two pages of tables from the Contacts & Adventures booklet, in easily printed pages formatted for Letter sized paper.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/26002 - GM\'s screen.pdf',
					size: '2260933',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/26002 - GM\'s screen (back).pdf',
					size: '521639',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26004',
		{
			sku: ['26004'],
			category: 'rulebook',
			type: 'digital',
			name: 'Unwired',
			releaseDate: ['2008-08'],
			description: 'Unwired is the advanced Matrix rulebook for Shadowrun, Fourth Edition. For everyday users, it explains how the Matrix works in easy-to-understand terms, and provides new software, qualities, and gear. For hackers and technomancers, it introduces new hacking tricks, malware, echoes, and sprites. It also covers system security and new Matrix phenomenon, from AIs to the resonance realms.Unwired contains everything players and gamemasters need for exploring the Matrix in Shadowrun.',
			gameDate: '2071-05',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/26004 - Unwired.pdf',
					size: '19477518',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26003A',
		{
			sku: ['26003A'],
			category: 'rulebook',
			type: 'digital',
			name: 'Arsenal',
			releaseDate: ['2008-08'],
			description: 'When corpsec is raining lead down on your position, a wardrobe malfunction will get you dead. To survive against gangs, syndicates, and megacorps, shadowrunners need the best gear they can make, buy, or steal.\nArsenal covers everything a runner team needs, from weapons and armor to advanced electronics and spy toys to the latest state-of-the-art drones. It also covers the intricacies of the black market and drug trade and provides advanced rules for combat and martial arts, mixing your own chemicals and explosives, and modifying your weapons and vehicles.',
			gameDate: '2071-04',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/26003A - Arsenal.pdf',
					size: '13196131',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'5741',
		{
			sku: ['5741', '27835'],
			category: 'novel',
			type: 'digital',
			name: 'Run Hard, Die Fast',
			releaseDate: ['1999-02', '2003-06'],
			description: 'Argent is the best shadowrunner in the biz...with one flaw: he\'s got a conscience. That\'s why he can\'t leave a chummer hanging. Only Andi Sencio is more than just a friend. She\'s his former partner--and lover. And now she\'s in the deepest drekpot of her life. Heading an op on a datasnatch turned bad, she\'s been stranded by the megacorp she works for--and targeted for flatlining by two more. Unless Argent gets to her first...\nRecruiting a top-notch team for the exfiltration shadowrun, Argent is risking it all--his money, his reputation, and his life--for the woman who once walked away from him. It\'s suicide mission through high-caliber hell. But that\'s never stopped the steel-armed, street samurai before...',
			gameDate: '2060',
			edition: 3,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5741 - Run Hard, Die Fast.epub',
					size: '365167',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5542',
		{
			sku: ['5542', '27810'],
			category: 'novel',
			type: 'digital',
			name: 'Dead Air',
			releaseDate: ['1996-10'],
			description: 'Jacked-In, Revved-Up, And Armed To The Teeth\nIt\'s fast and furious inside the Combat Biker maze, where armor-plated hogs and juiced-up rice grinders blast, pound, and pummel each other for points. But it\'s just barely up to speed for Jonathon and Tamara, two elven bikers at the head of the Los Angeles Sabers. With a simsense link between them that allows them to act virtually as one, they\'re been tearing up the league and making headlines.\nBut all that changes when Tamara takes a brutal hit from the cyberspurs of Dougan Rose, lead linebiker for the New Orleans Buzzsaws and the most respected player in the league. When Tamara gets slammed, Jonathon\'s out for revenge. But it isn\'t going to be easy. Because there\'s a lot more to this sabotage than meets the eye - and if the megacorp agents, simsense industry operatives, and hostile mages don\'t kill him, the truth probably will...',
			gameDate: '2057',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Novels/5542 - Dead Air.epub',
					size: '468240',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5540',
		{
			sku: ['5540', '27834'],
			category: 'novel',
			type: 'digital',
			name: 'Preying for Keeps',
			releaseDate: ['1996-07'],
			description: 'When ace shadowrunner Jack Skater leads his team of commandos in a raid on an elven ocean freighter, things get a little sticky. Yakuza hitmen crash the party, and a Japanese shaman whips up a titanic sea creature just to make sure nobody gets out alive. Now, having escaped with his troops by the skin of their teeth, Skater wants to find out who set him up.\nBut it isn\'t going to be easy. Because the runners are stuck up to their pointy ears in a sinister super-scheme that involves Skater\'s ex-wife, two elven gene corporations, a ruthless mafioso named McKenzie, and stolen data disks containing secrets worth killing for. It\'s a high-tech mega-mess with no way out. And as a ghastly virus hits Seattle, unleashing hordes of homicidal cannibals onto the streets, Skater and company have to bring in some heavy artillery just to stay alive....',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Novels/5540 - Preying for Keeps.epub',
					size: '434878',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5627',
		{
			sku: ['5627', '27811'],
			category: 'novel',
			type: 'digital',
			name: 'Steel Rain',
			releaseDate: ['1997-03'],
			description: 'Sword Of The Serpent\nMachiko is second-in-command of the Green Serpent Guard, an elite corps of Elven samurai who are sworn to defend the Chairman of Nagato Corporation. But she soon gets a promotion - after her superior is ruthlessly cut down in a slew of attacks aimed at the famous Guard itself.\nOnly the wealthiest can afford assassins with enough muscle to take on the Green Serpent Guard, and Machiko turns up evidence that points ot Nagato\'s biggest rival, Fuchi Corp. It looks like Fuchi has designs on Nagato\'s sensitive research division, where the incredible future of the communications matrix is taking shape.\nWhen magical attacks and sabotage begin taking out more of Nagato\'s personnel, things between the two megacorporations really heat up. But behind the growing hostilities with Fuchi looms a more sinister threat, requiring far more of Machikos talents than her flashing sword. And staying alive may require defeating a high-tech foe with virtually unlimited powers - and absolutely no mercy...',
			gameDate: '2057',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Novels/5627 - Steel Rain.epub',
					size: '439051',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5594',
		{
			sku: ['5594'],
			category: 'novel',
			type: 'digital',
			name: 'The Lucifer Deck',
			releaseDate: ['1997-01'],
			description: 'In its efforts to control all information in the Shadowrun universe, a giant corporation inadvertently calls up a violent spirit from another dimension, and only a young girl can save the universe from the ensuing havoc.',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Novels/5594 - The Lucifer Deck.epub',
					size: '403521',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5539',
		{
			sku: ['5539'],
			category: 'novel',
			type: 'digital',
			name: 'Black Madonna',
			releaseDate: ['1996-04'],
			description: 'MegaCorp enlists an elite decker, who reunited with old friends from England to try to keep a megacorp from being blackmailed by a super hacker. They come to discover that ancient powers are clashing to prevent a secret from being told. This is the 3rd book with renegade elven mage Serrin Shamander and British Lord Geraint Llanfrechfa.',
			gameDate: '2057',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Novels/5539 - Black Madonna.epub',
					size: '368715',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5495',
		{
			sku: ['5495'],
			category: 'novel',
			type: 'digital',
			name: 'House of the Sun',
			releaseDate: ['1995-07', '2003-06'],
			description: 'Venturing to the Kingdom of Hawaii when a megacorporate exec demands payment of an old debt, shadowrunner Dirk Montgomery finds himself having to outrun the corrupt factions battling for control of the island.',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5495 - House of the Sun.epub',
					size: '460963',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5448',
		{
			sku: ['5448', '27836'],
			category: 'novel',
			type: 'digital',
			name: 'Who Hunts the Hunter',
			releaseDate: ['1995-05', '2003-06'],
			description: 'From the distant forests of Maine comes the deadly Weretiger known as Striper, seeking nature\'s own special justice.\nFrom the shadowed heart of the South Bronx comes the shaman called Bandit, interested only in the pursuit of his arcane arts, and the reconciliation with nature that Raccoon demands.\nFrom the nightmare streets of Newark come Monk and Minx, seeking life itself.\nWho is predator and who is prey? The assassin? The shaman? The kids with the flashing eyes? The Director of Resource for Hurley-Cooper Labs, or HCL\'s dedicated scientist? Or is it the elves? Or the mystery man from the Department of Water and Wastewater Management with a technical rating higher than God\'s?\nBefore they are done, a killer will learn the meaning of mercy, and one who honored life will discover the necessity of ruthless destruction....',
			gameDate: '2055',
			edition: 2,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5448 - Who Hunts the Hunter.epub',
					size: '473952',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5537',
		{
			sku: ['5537', '27809'],
			category: 'novel',
			type: 'digital',
			name: 'Just Compensation',
			releaseDate: ['1996-01', '2003-06'],
			description: 'Andy is happy as a shadowrunner wannabe, but when he accidentally gets involved with real runners, the game of Let\'s Pretend is over. So is his safe corporate life. Andy\'s half brother, UCAS Army Major Tom Rocquette, has some doubts about what he\'s involved with too. Why, for example, is he being ordered to mercilessly massacre the Compensation Army, a group that, like him, only seeks justice?\nAndy and Tom, along with runners Markowitz and Kit, are finding out things that could put many lives in danger and point to a sinister web of dirty politicians, dishonorable officers, and misused tech and magic--a conspiracy that could dismantle the UCAS government! Can Andy and Tom find enough evidence to prove it--and stop it--before the nation\'s capital is buried under a heap of bloody corpses...?',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5537 - Just Compensation.epub',
					size: '524409',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5496',
		{
			sku: ['5496', '27806'],
			category: 'novel',
			type: 'digital',
			name: 'Worlds Without End',
			releaseDate: ['1995-10', '2003-06'],
			description: 'Spawned in the realm between the worlds, a Horror comes.\nDefeated in battle centuries before by the elven mage Aina, it walks again, seeking vengeance on the mortal lands.\nIf Aina fails to convince the courts of Tir na nOg and Tir Tairngire of the danger, she will have to face the Horror alone once more--or watch the world end.\n<small>NOTE: This story was originally written to conclude the Immortals trilogy; of which the first two parts were <em>Earthdawn</em> novels still unpublished at the time. <strong><em>Scars</em></strong> was published in 2005, and <strong><em>Little Treasures</em></strong> remains unpublished in English.</small>',
			gameDate: '2056',
			edition: 2,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5496 - Worlds Without End.epub',
					size: '325406',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5628',
		{
			sku: ['5628', '27813'],
			category: 'novel',
			type: 'digital',
			name: 'Shadowboxer',
			releaseDate: ['1997-05', '2003-06'],
			description: 'Too Hot To Handle\nFor Two Bears, a dwarf mercenary accustomed to running the shadows, the job sounded like an easy way to make a huge stack of cash: track down and discover the meaning of the word "IronHell." But when the decker he approaches for help gets her brain fried on the Matrix, Two Bears konws he\'s up to his stout little shoulders in drek.\nToo Cool To Give Up\nRealizing that IronHell must be the title of something - or somebody - very powerful, Two Bears looks for some backup to make sure he gets through this job alive. He lines up a street troll called Thumbs, a slick decker named Silver, a suit-wearing samurai called Delphia, and Moonfeather, a magic-wielding disciple of the Cat totem. Together they blast their way through a stream of megacorp] operatives, giant meta-beasts, and high-tech pirates, desperate to unravel the incredible secret of IronHell - before it unravels the world ....',
			gameDate: '2058',
			edition: 2,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5628 - Shadowboxer.epub',
					size: '424146',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5712',
		{
			sku: ['5712'],
			category: 'novel',
			type: 'digital',
			name: 'Wolf & Raven',
			releaseDate: ['1998-07', '2003-06'],
			description: 'The adventures of Wolfgang Kies, soldier of fortune. Together with a group of cyborg bounty hunters and computer wizards, he assists elf lord Dr. Richard Raven in keeping humanity safe from preying monstersâboth magical and technological! But crime lord Etienne LaPlante interferes with their vigilantism, preparing to strike at Raven and those who serve him....',
			gameDate: '2060',
			edition: 3,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5712 - Wolf & Raven.epub',
					size: '384187',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5711',
		{
			sku: ['5711', '27815'],
			category: 'novel',
			type: 'digital',
			name: 'Technobabel',
			releaseDate: ['1998-05', '2003-06'],
			description: 'He awoke in a body bag, his brain fried, a black hole where his memory should be. If not for the cool carbon-fiber blade concealed in the bones of his arm, he would\'ve been dead for sure. But Michael Bishop--a.k.a. Babel, messiah of the Matrix--is back in the game.\nRenraku Computer Systems has defied the accords of the Corporate Court. Now they must decipher the secrets of the otaku--and Babel is the technoshaman reborn for the job. But Netwalking in the shadows of the electron jungle means initiation into deadly megacorporate intrigue--and discovering more about Babel\'s own team than he fears he should know.\nAs allies become adversaries, Babel breaks through the dreaded black ice security to find a doorway to the future--and signs of a corp war looming on the horizon--one that could destroy the technoworld and beyond...forever.',
			gameDate: '2059',
			edition: 2,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5711 - Technobabel.epub',
					size: '433582',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5714',
		{
			sku: ['5714'],
			category: 'novel',
			type: 'digital',
			name: 'The Terminus Experiment',
			releaseDate: ['1999-01', '2003-06'],
			description: 'Seattle - A conspiracy arrives to spread a plague of vampires. Warren Storey must discover the reason for the plague before time runs out.',
			gameDate: '2060',
			edition: 3,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5714 - The Terminus Experiment.epub',
					size: '330853',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5713',
		{
			sku: ['5713', '27819'],
			category: 'novel',
			type: 'digital',
			name: 'Psychotrope',
			releaseDate: ['1998-10', '2003-06'],
			description: 'It started out as a simple Matrix run, but now five deckers are trapped inside a nightmarish virtual landscape where jacking out is an impossibility--and what waits has all the hallmarks of the afterlife: tunnels of brilliant light, greetings from long-dead friends and family...and the terrifying sense of being juggled between Heaven and Hell. But in this computer-generated netherworld, there is only one thing that can be trusted. And it isn\'t the senses....\n...THE COUNTDOWN BEGINS\nIt\'s the uncommon experience the deckers have in common: a near brush with death. It has brought them together in this hell-raising realm and under the influence of a twisted intelligence with diabolical plans for the unwary travelers in grid-time. Having their minds and souls extinguished before the Matrix-scape crashdown is only the beginning of the puzzle. Discovering why will be the end. A dead end.',
			gameDate: '2060',
			edition: 3,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5713 - Psychotrope.epub',
					size: '367802',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5710',
		{
			sku: ['5710'],
			category: 'novel',
			type: 'digital',
			name: 'Beyond the Pale: Dragon Heart Saga, Volume 3',
			releaseDate: ['1998-03', '2003-06'],
			description: 'The Enemies with unlimited powers, ultimate evil is about to arrive, Ryan Mercury and his runners have only two options left: Victory or Death',
			gameDate: '2057',
			edition: 2,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5710 - Beyond the Pale.epub',
					size: '450688',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5630',
		{
			sku: ['5630', '27833'],
			category: 'novel',
			type: 'digital',
			name: 'Headhunters',
			releaseDate: ['1997-10', '2003-06'],
			description: 'Somebody aced the dragon Dunkelzahn, and one of the mysterious links to the assassination is flat on his back in slab city: a double agent with two identities--both out of commission. Now he\'s the most-wanted carcass in Tacoma. Jack Skater\'s mission? Sleaze past the high-tech funeral security, outwit the Knight Errants, cop the stiff, and keep it on ice long enough to get the answer to the shadowrunners\' life-and-death question: what\'s so hot about a stone-cold corpse?\nAnd that isn\'t all that\'s dropped Skater elf-deep in drek--the UCAS Secret Service is also after the dead man\'s secret--and the government blue crews are prepared to liquidate anything in sight to get to it first...',
			gameDate: '2060',
			edition: 3,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5630 - Headhunters.epub',
					size: '436544',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5629',
		{
			sku: ['5629', '27814'],
			category: 'novel',
			type: 'digital',
			name: 'Stranger Souls: Dragon Heart Saga, Volume 1',
			releaseDate: ['1997-07', '2003-06'],
			description: 'Dunkelzahn the dragon\'s election as President of the United Canadian American States promised the dawn of a new era. But the hopes of a nation disintegrate with the powerful explosion that assassinates him. On that same fateful evening Dunkelzahn\'s most trusted special agent, Ryan Mercury, is on a secret mission of great urgency involving dangerous magic. And only a miracle can save the world from total destruction...',
			gameDate: '2060',
			edition: 3,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5629 - Stranger Souls.epub',
					size: '418089',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5709',
		{
			sku: ['5709', '27816'],
			category: 'novel',
			type: 'digital',
			name: 'Blood Sport',
			releaseDate: ['1998-01', '2003-06'],
			description: 'Mama Grande streaked through Leni\'s life like a bad dream. She arrived out of nowhere, claiming to be the ex-Lone Star detective\'s grandmother. She prophesied rivers of blood and an earth in flames. But her murder was even more bizarre: she died at the hands of two YucatÃ¡n missionaries hiding a secret of the Gods.\nWith combat biker wannabe Rafael in tow, Leni dives into Mama Grande\'s past... and hurtles into the dark heart of Aztlan - where human sacrifice is all the rage, and where ancient ceremonial games could trigger the end of the world. Are they crazy cultists of true harbingers of doom? The closer Leni and Rafael get to the answer, the nearer they move to the brink of oblivion. Either way, their futures could be cancelled...',
			gameDate: '2060',
			edition: 3,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5709 - Blood Sport.epub',
					size: '465955',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5631',
		{
			sku: ['5631', '27817'],
			category: 'novel',
			type: 'digital',
			name: 'Clockwork Asylum: Dragon Heart Saga, Volume 2',
			releaseDate: ['1997-11', '2003-06'],
			description: 'The maelstrom of cyber-magic and political intrigue following President Dunkelzahn\'s assassination rages out of control. Ryan Mercury, Dunkelzahn\'s secret agent, is torn between his duty and his desire to find a killer. But when a spirit wrongly concludes that Ryan is working for the enemy, he anoints a cyberzombie to carry out a hit of its own. Now with an impressive arsenal of allies, weaponry, and the Dragon Heart, Ryan just might pull off the save of the centuryâif he doesn\'t lose his life first!',
			gameDate: '2057',
			edition: 2,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5631 - Clockwork Asylum.epub',
					size: '409802',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'27S0405',
		{
			sku: ['27S0405'],
			category: 'rulebook',
			type: 'digital',
			name: 'Gun H(e)aven 3 Cards',
			releaseDate: ['2013-12-27'],
			description: 'Youâre not a noob. Youâre not a poseur. Youâre a shadowrunner. When you pick a weapon, itâs with a purpose, and 99 times out of 100, that purpose is to bring suckers down. Youâre going to choose your weapon carefully, and you know that the more options you have, the better your final choice will be.\nThese 33 weapon cards feature guns first seen in the recently released Gun H(e)aven 3. Available in both PDF and POD form, these cards have everything you need to start shooting right away!',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/27S0405 - Gun H(e)aven 3 Cards.pdf',
					size: '3104413',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7000',
		{
			sku: ['7000', '7001', '10660', '25000'],
			category: 'rulebook',
			type: 'scan',
			name: 'Shadowrun Third',
			releaseDate: ['1998-09', '2003-09', '2004-02'],
			description: 'Where Man Meets Magic & Machine\nThe year is 2060. Magic is as real as the mean streets of the mega-sprawls. Corporations call the shots while nailing each other through covert operatives in cutthroat competition. Flesh and machines have merged -- the street samurai with his smartguns and impossibly fast reflexes, the decker who can plug his own brain into the worldwide computer network, the rigger who links his mind to his vehicle and takes hairpin turns at fantastic speeds. And you\'re a part of this wired world, where corporate skyscrapers glitter over the dark shadows they cast. You live in those shadows. You\'re a shadowrunner -- a street operative.\nYou may be human or troll, dwarf or elf. You may throw fireballs, pull out your trusty Uzi or slice through computer security with a program as elegant and deadly as a stiletto. No matter what, you get the job done. You\'re a shadowrunner -- a professional. You don\'t just survive in the shadows -- you thrive there ... for now.',
			gameDate: '2060',
			edition: 3,
			publisher: ['fasa', 'fanpro'],
			files: [
				{
					path: './Rulebooks/7001 - Shadowrun Third.pdf',
					size: '112507704',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27502',
		{
			sku: ['27502'],
			category: 'rulebook',
			type: 'digital',
			name: 'Spell Cards, Series 1',
			releaseDate: ['2013-11'],
			description: 'Everyone in the Sixth World wants to geek the mage first. Your job is to make sure that wonât happen by being faster, deadlier, and more powerful than they are. Shadowrun Spell Cards, Series 1 make spellcasting faster and easier, with easy-to-reference game statistics for 54 different spells. Grab a pack and use it to call down a whole hellstorm of mana when you need it most!',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/27502 - Spell Cards, Series 1.pdf',
					size: '3889564',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27010',
		{
			sku: ['27010'],
			category: 'rulebook',
			type: 'digital',
			name: 'Anarchy',
			releaseDate: ['2016-09'],
			description: 'Shadowrun. The Sixth World. Orks in pinstripe suits with uzis; mohawked dwarves jacked into vehicles racing through megasprawls at breakneck speed; humans casting fireballs at corporate-trained paracritters; elves hacking the Matrix for a datasteal of the latest tech or working to topple an upstart corp. Itâs where man meets magic and machine.\nDive into a cyberpunk dystopia and become a shadowrunner, a deniable asset who does the jobs no one else canâor willâdo. Itâs not an easy life, but it beats selling your soul to the megacorps. Youâll break into top-secret labs, stand up to gangs bent on destruction and chaos, encounter dark spirits hiding even darker secrets, and come face to face with some of the infinite dangers the Sixth World can throw at you. And youâll come out on topâbecause if you donât, you donât get paid.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/27010 - Anarchy.pdf',
					size: '12998976',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27010X',
		{
			sku: ['27010X'],
			category: 'rulebook',
			type: 'digital',
			name: 'Anarchy (Prototype)',
			releaseDate: ['2016-09'],
			description: 'Shadowrun. The Sixth World. Orks in pinstripe suits with uzis; mohawked dwarves jacked into vehicles racing through megasprawls at breakneck speed; humans casting fireballs at corporate-trained paracritters; elves hacking the Matrix for a datasteal of the latest tech or working to topple an upstart corp. Itâs where man meets magic and machine.\nDive into a cyberpunk dystopia and become a shadowrunner, a deniable asset who does the jobs no one else canâor willâdo. Itâs not an easy life, but it beats selling your soul to the megacorps. Youâll break into top-secret labs, stand up to gangs bent on destruction and chaos, encounter dark spirits hiding even darker secrets, and come face to face with some of the infinite dangers the Sixth World can throw at you. And youâll come out on topâbecause if you donât, you donât get paid.\nShadowrun: Anarchy is a new way to get into the best cyberpunk/urban fantasy action around. Based upon the rules-light and easy-to-learn Cue System, Shadowrun: Anarchy is a narrative-focused game experience that has everything you need to quickly grab some gear, load up on spells, and get to throwing the dice. With loads of characters and missions, the book makes it simple to get up and running. Immerse yourselves in the Sixth World!',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/27010X - Anarchy (Prototype).pdf',
					size: '86899847',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27500',
		{
			sku: ['27500'],
			category: 'rulebook',
			type: 'digital',
			name: 'Gear Cards, Series 1',
			releaseDate: ['2013-11'],
			description: 'If youâre a shadowrunner, you know that danger is always waiting around the next corner. You better be ready for it. The right gun, the right vehicle, or the right piece of equipment can be the difference between life and death. So make sure you have what you need and can use it fast.\nShadowrun Gear Cards, Series 1 provide quick reference to 54 different pieces of gear, making it easy to use them in a game. Containing game stats and illustrations of guns, vehicles, drones, and more, these cards are a handy reference to keep the game moving and make sure characters have what they need to come out on top.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/27500 - Gear Cards Series 1.pdf',
					size: '7525831',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27011',
		{
			sku: ['27011'],
			category: 'rulebook',
			type: 'digital',
			name: 'Forbidden Arcana',
			releaseDate: ['2017-05'],
			description: 'Magic is wild. Magic is undisciplined. You can try to impose order and understanding on it, but thatâs just surface. Underneath is chaos, an erratic heart beating to a staggering rhythm. You donât control it, any more than a surfer controls twenty-meter-tall wave; you donât direct the wave, you ride it, capture a piece of its power, and hope to survive. If you do it right, though, you catch a portion of unimaginable powerâpower those who control the Sixth World donât want you to have. All the more reason to push past their boundaries and grab it.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/27011 - Forbidden Arcana.pdf',
					size: '13175916',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7002',
		{
			sku: ['7002', '25008'],
			category: 'rulebook',
			type: 'scan',
			name: 'GM Screen',
			releaseDate: ['1998-12', '2004-07'],
			description: 'This gamemaster\'s aid contains all the charts and tables needed to run Shadowrun in a convenient, easy-to-use format. For use with Shadowrun Third Edition.',
			gameDate: '2060',
			edition: 3,
			publisher: ['fasa', 'fanpro'],
			files: [
				{
					path: './Rulebooks/7002 - GM Screen.pdf',
					size: '1387053',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/7002 - GM Screen (Back).pdf',
					size: '585323',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7126',
		{
			sku: ['7126', '10663', '25001'],
			category: 'rulebook',
			type: 'scan',
			name: 'Man & Machine',
			releaseDate: ['2000-05', '2004-04'],
			description: 'Cyberware can increase your speed, enhance your strength and sharpen your reflexes. It can put a computer in your head, armor under your skin and weapons in your arms. There are implants to improve every internal organ and devices that let you interface with machines ... but you\'d better know when to stop. Too much cyberware and you\'re a cyberzombieâmore machine than man.',
			gameDate: '2061',
			edition: 3,
			publisher: ['fasa', 'fanpro'],
			files: [
				{
					path: './Rulebooks/7126 - Man and Machine.pdf',
					size: '106185636',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7108',
		{
			sku: ['7108'],
			category: 'rulebook',
			type: 'scan',
			name: 'Rigger Black Book',
			releaseDate: ['1991-12'],
			description: 'No shadowrunning team is complete without a rigger. Commanding the vehicles that provide fire support, surveillance, and a way out if things go bad, a teaM\'s rigger is as important as its street samurai or combat mage. And riggers are never without the vehicles they control.The Rigger Black Book features every kind of vehicle, from urban runabouts to hunter-seeker combat drones and everything in between, and rules for modifying that off-the-dealer\'s-floor model into the lean machine of every rigger\'s dreams.',
			gameDate: '2050',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Rulebooks/7108 - Rigger Black Book.pdf',
					size: '44632079',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7902',
		{
			sku: ['7902'],
			category: 'rulebook',
			type: 'scan',
			name: 'Shadowrun GM Screen',
			releaseDate: ['1992-06'],
			description: 'The GM Screen for the second edition, contains tables for use in game.',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Rulebooks/7902 - Shadowrun GM Screen.pdf',
					size: '1697893',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7902X',
		{
			sku: ['7902X'],
			category: 'rulebook',
			type: 'scan',
			name: 'Contacts',
			releaseDate: ['1992-06'],
			description: 'Contacts booklet that accompanied the 2nd Ed. GM Screen.',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Rulebooks/7902X - Contacts.pdf',
					size: '28235048',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7900',
		{
			sku: ['7900', '7901'],
			category: 'rulebook',
			type: 'scan',
			name: 'Shadowrun Second',
			releaseDate: ['1992'],
			description: 'The world has changed, some say Awakened.\nMagic has returned to the world and elves, dwarfs, orks and trolls have assumed their true forms. Creatures of the wild have changed as well, becoming things of myth and legend. And technology has changed people, too. No longer mere flesh, many humans have turned to artificial enhancements called cyberware, and become more than human. Modern man is stronger, smarter, and faster.\nIn the world of 2053, when the megacorporations want something done but don\'t want to dirty their hands, it\'sa shadowrun they need, and they come to. Though your existence is not listed in any governmental or corporate database, the demand for your services is high. You might be a decker, sliding through the virtualized databases of giant corporations, spiriting away the only thing of real value--information. Or perhaps you are a street samurai, an enforcer whose combat skills make you the ultimate urban predator. Or perhaps a magician with the ability to wield the magical energies that soround the Earth.\nAnd that\'s exactally the kind of firepower you\'ll need to make a shadowrun...',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Rulebooks/7901 - Shadowrun Second.pdf',
					size: '74525161',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7107',
		{
			sku: ['7107'],
			category: 'rulebook',
			type: 'scan',
			name: 'Virtual Realities',
			releaseDate: ['1991-07'],
			description: '"Faster, meaner, smarter...\nMan, I hate the technology\ncurve. It\'s back to school boys\n& girls, the kid gloves are OFF"\n-FASTJACK, decker',
			gameDate: '2051',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Rulebooks/7107 - Virtual Realities.pdf',
					size: '76479006',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7101',
		{
			sku: ['7101'],
			category: 'rulebook',
			type: 'scan',
			name: 'Shadowrun: Where Man Meets Magic and Machine',
			releaseDate: ['1990-07'],
			description: 'The year is 2050.\nThe bending of technology and human flesh began in the late 20th century. Interfacing the human mind with computers was just the first step. Implants that "jack up" reflexes and cybernetic replacements followed quickly. Then came the awakening. A five-thousend-year lull in the flow of mystical energies subsided, and Magic returned to the world. Elfes, Dwarfs, and Trolls assumed their true form, throwing off their human guise.',
			gameDate: '2050',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Rulebooks/7101 - Shadowrun.pdf',
					size: '45325936',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/7101 - Shadowrun (OCR).pdf',
					size: '25393889',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7003',
		{
			sku: ['7003'],
			category: 'rulebook',
			type: 'digital',
			name: 'Shadowrun 3rd - Quick Start Rules',
			releaseDate: ['1999-08', '2005-02'],
			description: 'With the Shadowrun Quick Start Rules, you need nothing more than a vivid imagination and a handful of dice to jump into the world\'s most popular science-fiction/fantasy universe. An introduction for new players to the Shadowrun, Third Edition game system, the Shadowrun Quick Start Rules provides all the rules you need to start playing. This book features background material, advice for beginners, eight pre-generated characters and a complete adventure so you can learn as you go. The Shadowrun Quick Start Rules lets you dive right into the action. Welcome to the shadows, chummer!',
			gameDate: '2060',
			edition: 3,
			publisher: ['fasa', 'fanpro'],
			files: [
				{
					path: './Rulebooks/7003 - Shadowrun 3rd - Quick Start Rules.pdf',
					size: '3262190',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7106',
		{
			sku: ['7106'],
			category: 'rulebook',
			type: 'scan',
			name: 'The Grimoire: The Manual of Practical Thaumaturgy 14th Edition, 2050',
			releaseDate: ['1990-07'],
			description: 'Power.\nSome people want to study it, some want to outlaw it, some drekheads even pretend id dosen\'t exist, but the genie\'s been out of the bottle since that day in 2011 when the first newborn magician in our world made the magic happen.',
			gameDate: '2050',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Rulebooks/7106 - The Grimoire - The Manual of Practical Thaumaturgy.pdf',
					size: '29480654',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7104',
		{
			sku: ['7104'],
			category: 'rulebook',
			type: 'scan',
			name: 'Street Samurai Catalog',
			releaseDate: ['1990-05-01'],
			description: 'When the going get tough, the tough go shopping!\nYou\'re the ultimate fighting machine. A predator-for-hire in the savage urban world of Shadowrun. You\'ve devoted your life to honing your combat and martial skills. The tools of your trade are airfoil grenades, form-fitting body armor, and an Ares Crusader machine pistol.\nAn expansion for Shadowrun, the Street Samurai Catalog will let you outfit yourself with the latest equipment available on the black market: retractable hand razors, ultrasonic sights, enhanced reflexes, and maybe a rangefinder for your cybereyes. Whatever you need to get the job done, you can find it here, but it won\'t be cheap. And remember to watch your back before someone decides to make you yesterday\'s news.',
			gameDate: '2050',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Rulebooks/7104 - Street Samurai Catalog.pdf',
					size: '127924821',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7104X',
		{
			sku: ['7104X'],
			category: 'rulebook',
			type: 'scan',
			name: 'Street Samurai Catalog (Revised)',
			releaseDate: ['1992'],
			description: 'When the going get tough, the tough go shopping!\nYou\'re the ultimate fighting machine. A predator-for-hire in the savage urban world of Shadowrun. You\'ve devoted your life to honing your combat and martial skills. The tools of your trade are airfoil grenades, form-fitting body armor, and an Ares Crusader machine pistol.\nAn expansion for Shadowrun, the Street Samurai Catalog will let you outfit yourself with the latest equipment available on the black market: retractable hand razors, ultrasonic sights, enhanced reflexes, and maybe a rangefinder for your cybereyes. Whatever you need to get the job done, you can find it here, but it won\'t be cheap. And remember to watch your back before someone decides to make you yesterday\'s news.',
			gameDate: '2050',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Rulebooks/7104X - Street Samurai Catalog (Revised).pdf',
					size: '46247434',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27007',
		{
			sku: ['27007'],
			category: 'rulebook',
			type: 'digital',
			name: 'Rigger 5.0',
			releaseDate: ['2015-12'],
			description: 'Spin your wheels over slick sprawl streets while drifting away from hot pursuit. Fly through narrow canyons ahead of missiles twisting their way after you. Shrink down to insect size to get an eye on places outsiders arenât supposed to see. These are just some of the ways riggers jack up their seemingly unending adrenaline rush, as they show that the hardest shadowrunners to hit are the ones that stay in motion.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/27007 - Rigger 5.0.pdf',
					size: '22579325',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S016',
		{
			sku: ['26S016'],
			category: 'rulebook',
			type: 'digital',
			name: 'Gun H[e]aven 2',
			releaseDate: ['2012-05'],
			description: 'The only friend youâll ever need. The last friend youâll ever have. Your gun is the one thing in your life that should be dependable, that should always make a nice loud bang when you squeeze the trigger, and should always bring down whoever you think should fall. Of course, if your weapon is going to be that important to you, youâll need one that suits you perfectly. And to find the right match, itâs best if you have a lot of choices.\nWelcome back to Gun Heaven, where your next best friend is waiting for you. Dozens of options await, from the troll-friendly Krime Cannon to the foldable Terracotta Arms Mordred, from the stylish Shiawase Arms K2072 to the true tool of the desperate, the Barrens Special. And on top of that is a new breakthrough in ammo that gives you a better chance to hit your intended target.',
			gameDate: '2072-11',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/26S016 - Gun Heaven 2.pdf',
					size: '21700796',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S011',
		{
			sku: ['26S011'],
			category: 'rulebook',
			type: 'digital',
			name: 'Deadly Waves',
			releaseDate: ['2011-07'],
			description: 'More than two-thirds of the Earthâs surface is covered by water. That means that two-thirds of the Earth is covered in escape routes, infiltration points, and hiding places that people stuck on land constantly overlook. If you want to know how to use all that blue to your advantage, you need to know the boats that are out there, what they can do, and how your competition is putting them to use.\nDeadly Waves collects information about thirty different watercraft, from the fast and agile Wave Cutter to the luxurious, self-maintaining Zeppelinwerke Elite Cruiser to the hulking yet surprisingly quick Maersk-Jorgenson Fast Freighter. Runners can use this book to gain all sorts of options for taking to the water, whether theyâre planning a quick jaunt or embarking on a long voyage.',
			gameDate: '2073-07',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/26S011 - Deadly Waves.pdf',
					size: '5588922',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S027',
		{
			sku: ['26S027'],
			category: 'rulebook',
			type: 'digital',
			name: 'Bullets & Bandages',
			releaseDate: ['2014-06'],
			description: 'The only reason shadowrunners have scars to show off during their downtime is that when they got hit, someone had the guts, the skill, and the speed to pull them out of whatever drekstorm theyâd gotten themselves into. Maybe it was a DocWagon High Threat Response team who rode in to save the day, or maybe a teammate whoâd picked up some handy medical skills in the course of their career in the shadows patched them up enough to keep them moving. Either way, having someone who can pull your hoop out of the fire is handy in any situation. Make sure you thank them and buy âem a drinkâassuming, of course, they made it out with you.',
			gameDate: '2076-05',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/26S027 - Bullets & Bandages.pdf',
					size: '9632772',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S021',
		{
			sku: ['26S021'],
			category: 'rulebook',
			type: 'digital',
			name: 'MilSpec Tech 2',
			releaseDate: ['2012-07'],
			description: 'Sometimes you look at a catalog to see if there\'s anything in it that you want. And sometimes you look to see what you need to avoid.\nYou\'ll find both types of things in here. The tech heads of the Sixth World remain busy, coming up with more ways to slaughter metahumans with maximum efficiency. And they have plenty of battlegrounds in the world where they can test their toys out. There are things in here that shadowrunners would be exceedingly lucky to get their hands on, and things whose very appearance serves to tell them theyâre having a very bad day indeed. From automated strike drones to nearly invisible tactical aircraft, from the ground-clearing Dassault Zeta Bravo to the drone killing Bridgette Tactical Vehicle, Mil Spec Tech 2 has the latest and greatest tools of war â along with a host of missiles to keep anyone in a war zone on their toes.',
			gameDate: '2074-07',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/26S021 - MilSpec Tech 2.pdf',
					size: '2725630',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S010',
		{
			sku: ['26S010'],
			category: 'rulebook',
			type: 'digital',
			name: 'Gun H[e]aven',
			releaseDate: ['2011-06'],
			description: 'Look, we all know that there are plenty of runs that go best when you donât fire a shot. But we also know how foolish youâd be to go out without your trusted sidearm, because you never know when things are going to go south. Or when youâre going to be hired simply because youâre the person whoâs got the right weapons for the job.\nIf youâre looking for a new weapon to add to your arsenal, Gun Heaven is the place to go. Featuring thirty-two gunsâcomplete with descriptions, information on their use, game statistics, and full-color illustrations of each itemâGun Heaven collects older weapons and newer designs, ranging from the SIG P298 hold-out pistol, with its slim-line design, to the massive Ogre Hammer and its devastating punch. Get caught up on the predecessors of the legendary Ares Predator IV, or check out one of the most recent offerings from Onotari Arms, the assault-rifle/shotgun combo Xfactor III.',
			gameDate: '2073-06',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/26S010 - Gun Heaven.pdf',
					size: '5998051',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S001',
		{
			sku: ['26S001'],
			category: 'rulebook',
			type: 'digital',
			name: 'This Old Drone',
			releaseDate: ['2012-11'],
			description: 'Theyâre Not OldâTheyâre Classic Weâd all like access to bleeding-edge, state-of-the-art tech, but we canât always have it. Sometimes your nuyenâs gotta be spent somewhere else, or sometimes you havenât got any nuyen to spend. And sometimes those old designs that everyoneâs written off show up and kick your ass, proving itâs too soon for them to be forgotten. This Old Drone is a Shadowrun supplement containing information on 30 classic drones that appeared in older Shadowrun sourcebooks but havenât made the transition to Shadowrun, Fourth Editionâuntil now. From the rail-mounted, wireless-shunning Ares Sentinel âPâ Series to the old MQ-8 Fire Scout roto-drone, This Old Drone contains the info, rules, and stats you need to bring classic drones into the modern era of Shadowrun.',
			gameDate: '2072-07',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/26S001 - This Old Drone.pdf',
					size: '10039004',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S001A',
		{
			sku: ['26S001A'],
			category: 'rulebook',
			type: 'digital',
			name: 'This Old Drone (Revised)',
			releaseDate: ['2012-10-29'],
			description: 'Theyâre Not OldâTheyâre Classic Weâd all like access to bleeding-edge, state-of-the-art tech, but we canât always have it. Sometimes your nuyenâs gotta be spent somewhere else, or sometimes you havenât got any nuyen to spend. And sometimes those old designs that everyoneâs written off show up and kick your ass, proving itâs too soon for them to be forgotten. This Old Drone is a Shadowrun supplement containing information on 30 classic drones that appeared in older Shadowrun sourcebooks but havenât made the transition to Shadowrun, Fourth Editionâuntil now. From the rail-mounted, wireless-shunning Ares Sentinel âPâ Series to the old MQ-8 Fire Scout roto-drone, This Old Drone contains the info, rules, and stats you need to bring classic drones into the modern era of Shadowrun.',
			gameDate: '2072-07-30',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/26S001 - This Old Drone - Revised.pdf',
					size: '5817164',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S009',
		{
			sku: ['26S009'],
			category: 'rulebook',
			type: 'digital',
			name: 'Unfriendly Skies',
			releaseDate: ['2011-05'],
			description: 'Itâs a big world, and not all of the work thatâs available is sitting right outside your front door. Sometimes you might need to hop across a country, across a continent, or across an ocean. Other times you might look to the air to find a way across a border thatâs too tough to cross on the ground. And then there are the times you might need something in the air that can pack a much-needed punch.\nUnfriendly Skies provides descriptions and game information for thirty-two aircraft, including the EuroWars-tested MiG-63, the slow but easy-to-overlook Skyswimmer, and the luxurious Platinum II. The book also includes information on the basics of air travel in 2073, including information on which paths you may or may not follow if you are trying to lay low.',
			gameDate: '2072-09',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/26S009 - Unfriendly Skies.pdf',
					size: '5357581',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S002',
		{
			sku: ['26S002'],
			category: 'rulebook',
			type: 'digital',
			name: 'MilSpecTech',
			releaseDate: ['2011-01'],
			description: 'The corporations of the Sixth World love a good challengeâas long as it suits them. Ending world hunger? Not interested. Eliminating poverty? Thereâs no margin in that. Finding creative and more effective ways to blow things up and/or reduce them to rubble? That, they can do.\nWar is raging on the Aztlan-Amazonia border, and there are plenty of other places in the world where people are willing to fork over piles of nuyen to buy that tank or fighter that would help them sleep better at night. There is good demand for military technology, and the corps are stepping up with the supply.',
			gameDate: '2073-02',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/26S002 - MilSpecTech.pdf',
					size: '10764641',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S035',
		{
			sku: ['26S035'],
			category: 'rulebook',
			type: 'digital',
			name: 'Coyotes',
			releaseDate: ['2013-12'],
			description: 'The Sixth World has been carefully divided and partitioned to keep people in their place, living under the thumbs of those who draw the lines. Shadowrunners, though, have never been good at staying where theyâre supposed to be. They\'ve got goods to smuggle, bounties to avoid, and a host of other reasons to cross the walls and borders the rest of the world has put up.\nThese crossings arenât always easy, and thatâs where Coyotes come inâtrained professionals with nerves of steel and steady hands who can help you sneak, talk, or just blast your way past almost any border. You may have to dig deep in your pocket to pay their asking price, but it\'ll be worth it when you see the heavily armed checkpoint fading in the rear view mirror.',
			gameDate: '2075-11',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/26S035 - Coyotes.pdf',
					size: '6780438',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27004',
		{
			sku: ['27004', '27400S'],
			category: 'rulebook',
			type: 'digital',
			name: 'Run Faster',
			releaseDate: ['2015-02', '2017-03'],
			description: 'Every step, every advantage, every millisecond counts. The streets of the Sixth World are mean, and if they want to stay alive, shadowrunners need every advantage they can get to gain a step on the opposition. Fortunately, Run Faster is full of them. With it, you can learn about more metatypes for characters, including hobgoblins, giants, centaurs, and sasquatch; acquire new qualities, such as Disgraced, Hawk Eye, and Lightning Reflexes; and, if you dare, dabble with the dangerous and deadly Infected.',
			gameDate: '2076',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/27004 - Run Faster.pdf',
					size: '21952712',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27003',
		{
			sku: ['27003'],
			category: 'rulebook',
			type: 'digital',
			name: 'Street Grimoire',
			releaseDate: ['2014-06'],
			description: 'Magic can burn your brain and sear your soul. It can inject power into every millimeter of your veins, or leave you a lump of ashes at the end of a dark alley. Itâs dangerous, but to spellslingers in the Sixth World, itâs worth it. Because magic is power, and power in the Sixth World needs to be grabbed with both hands.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/27003 - Street Grimoire.pdf',
					size: '18801947',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27003X',
		{
			sku: ['27003X'],
			category: 'misc',
			type: 'print',
			name: 'Magic Cards: Street Grimoire',
			releaseDate: ['2014-08-11'],
			description: 'Being a spellcaster is all about taking the inconveniences and problems of reality and making them work for you. But reality is a complicated thing, and if you really want to shape it right, you need plenty of spells at your disposal. And not just any spellsâthe right ones, the ones that get the job done. Street Grimoire Spell Cards have summaries of 54 spells from Street Grimoire, with stats, a brief statement of what the spell does, and references to help you find more information. Use them to shift reality from the way it is to the way it should be.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			missing: 'outOfScope',
			notes: 'Set of cards available at Gen Con 2014.'
		}
	],
	[
		'27006',
		{
			sku: ['27006'],
			category: 'rulebook',
			type: 'digital',
			name: 'Data Trails',
			releaseDate: ['2015-05'],
			description: 'The last great undiscovered country is vast, wild, and weirder than you can possibly imagine. And itâs nearby, waiting, accessible by the press of a button, or a simple gesture, or even just a thought. The Matrix holds a whole lot more than selfies and cat videosâit has artificial intelligences, electronic ghosts of people formerly alive (or perhaps still living), and deep wells of pure data that can swallow you whole. Oh, and a copy of every secret ever recorded electronically. The possible rewards of exploration are great, and the dangers are greater.',
			gameDate: '2076',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/27006 - Data Trails.pdf',
					size: '17333012',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27005',
		{
			sku: ['27005'],
			category: 'rulebook',
			type: 'digital',
			name: 'Chrome Flesh',
			releaseDate: ['2015-06'],
			description: 'Shadowrunners cannot be limited by what their bodies canâor cannotâdo. They have to do more, stretch farther, surpass any limits, and accomplish the impossible. Some runners can rely on magic; for everyone else, there are augmentations. From shiny chrome that makes your body into a humanoid semitruck to genetech that alters you at the most fundamental level to drugs and chemicals that give you a quick and dirty boost, Chrome Flesh provides dozens of new ways to alter Shadowrun characters and make them better, stronger, faster, and altogether readier to kick ass and take names on the streets.',
			gameDate: '2077',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/27005 - Chrome Flesh.pdf',
					size: '15452417',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27002',
		{
			sku: ['27002'],
			category: 'rulebook',
			type: 'digital',
			name: 'Run & Gun',
			releaseDate: ['2014-04'],
			description: 'Guns and ammo cost nuyen. Mastering martial arts takes time. And learning how to use explosives without blowing yourself up takes patience and a steady hand. These weapons and more are out there, waiting for you. You have the chance to use them to become deadlier, faster, more dangerous than the next guyâand more dangerous than you were yesterday. Youâll have to pay the price to get what you want, but this is the Sixth World. Donât you always?',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/27002 - Run & Gun.pdf',
					size: '24776080',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27002X',
		{
			sku: ['27002X'],
			category: 'misc',
			type: 'physical',
			name: 'Run & Gun Cards',
			releaseDate: ['2014-08-11'],
			description: 'When the bullets start flying, when you desperately need to bring someone down, you need the right weapon at your side and the right armor covering your hoop. There are plenty of options out there, so thereâs no excuse for not having the tool that will get the job done. This deck has fifty-four choices, cards with full-color illustrations and game stats for weapons and armor from Run & Gun. Choose the right one, and live to see another day.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			missing: 'outOfScope',
			notes: 'Print only set of gear cards, Available at Gen Con 2014'
		}
	],
	[
		'26S040',
		{
			sku: ['26S040'],
			category: 'rulebook',
			type: 'digital',
			name: 'Gun H[e]aven 3',
			releaseDate: ['2013-12'],
			description: 'You\'re not a noob. You\'re not a poseur. You\'re a shadowrunner. When you pick a weapon, it\'s with a purpose, and 99 times out of 100, that purpose is to bring suckers down. You\'re going to choose your weapon carefully, and you know that the more options you have, the better your final choice will be.\nGun H(e)aven 3 is about options. Pistols, rifles, machine guns, even a flamethrowerâthey\'re all in here, ready to take out to the streets. Take a look, check your options, and then pick a weapon that will stop your enemies in their tracks. Because when the guns come out, you want it ended quick and ended rightâwith you still in your feet.',
			gameDate: '2075-12',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/26S040 - Gun H(e)aven 3.pdf',
					size: '9661645',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S036',
		{
			sku: ['26S036'],
			category: 'rulebook',
			type: 'digital',
			name: 'The Assassin\'sÂ Primer',
			releaseDate: ['2013-10'],
			description: 'Some people call it wetwork. Others call it murder. A small group calls it justice. It\'s assassination and it\'s one of the jobs shadowrunners might be hired to do. And given that people are, you know, pretty protective about their lives, anyone who takes such a job is going to have to be at the top of their game to pull the job off and collect a payday. Especially if they plan to make it a regular activity.\nThe Assassin\'s Primer is a vital guide for assassins in the Sixth World. With tips on tools to use, techniques to employ, and the different kinds of killers you may meet in the field, this is a critical reference for anyone looking to bring an assassination flavor into their Shadowrun games. And it has a new sniper rifle and a handful of new Qualities for shadowrunners to boot!',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/26S036 - The Assassin\'sÂ Primer.pdf',
					size: '2934863',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27000',
		{
			sku: ['27000', '27000LE'],
			category: 'rulebook',
			type: 'digital',
			name: 'Shadowrun 5th Edition',
			releaseDate: ['2013-07'],
			description: 'There are cracks in the world. Theyâre slender, dark, and often cold, but they are the only things that keep you hidden. Keep you alive. They are the shadows of the world, and they are where you live.\nYou are a shadowrunner, thriving in the margins, doing the jobs no one else can. You have no office, no permanent home, no background to check. You are whatever you make yourself. Will you seek justice? Sow seeds of chaos? Sell out to the highest bidder? Itâs up to you, but this much is certain: If you do nothing, the streets will eat you alive.\nYou can survive, even flourish, as long as you do what it takes. Sacrifice part of your soul for bleeding-edge gear. Push the limits of your will learning new and dangerous magic. Wire yourself into the Matrix, making your mind one with screaming streams of data. Itâll cost you somethingâeverything doesâbut you can make it worth the price.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/27000 - Shadowrun 5th Edition.pdf',
					size: '42934903',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S007',
		{
			sku: ['26S007'],
			category: 'rulebook',
			type: 'digital',
			name: 'The Way of the Adept',
			releaseDate: ['2011-04'],
			description: 'Something is happening to the adepts of the Sixth World. Theyâre becoming stronger, fasterâsome of them are even becoming more charming. Studies indicate that the improvements are fixing on the most disciplined of adepts, those who integrate their abilities into the greater whole known as a Way. By following these Ways, adepts are reaching new levels of power.',
			gameDate: '2072-08',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/26S007 - Way of the Adept.pdf',
					size: '5036260',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'5445',
		{
			sku: ['5445', '27807'],
			category: 'novel',
			type: 'digital',
			name: 'Burning Bright',
			releaseDate: ['1994-11', '2003-06'],
			description: 'MISSING: Mitch Truman, heir apparent to an entertainment megacorporation. He may have fled his parents for the sake of love, but if magic is involved the reason could be darker...\nWEALTHY: Dan Truman, CEO of media giant Truman Technologies, doesn\'t care how much it costs--he wants his son back. He\'ll hire the best to find his heir, even if their motives are suspect...\nEXPERIENCED: Kyle Teller\'s done this job before. He knows the tricks of the trade, and not only because he\'s a mage. He thinks finding the missing boy will be easy. Why shouldn\'t it be?\nBut will money and experience be enough to defeat the terrible power growing beneath the city of Chicago?',
			gameDate: '2055',
			edition: 2,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5445 - Burning Bright.epub',
					size: '452817',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5125',
		{
			sku: ['5125', '27801'],
			category: 'novel',
			type: 'digital',
			name: 'Choose Your Enemies Carefully: Secrets of Power, Volume 2',
			releaseDate: ['1991-02', '2003-06'],
			description: 'When magic returns, its power calls Sam Verner. As Sam searches for his sister through the slick and scary streets of 2050, his quest leads him across the ocean to England, where druids rule the streets... and the throne. But all is not what it seems, and Sam and his new shadow friends are plunged into a maze of madness on the trail of destruction. Only when Sam accepts his destiny as a shaman can he embrace the power he needs. But what waits for him in the final confrontation of technology and human flesh is a secret much darker than anything he knew waiting in the shadows...',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5125 - Choose Your Enemies Carefully.epub',
					size: '1045450',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5078',
		{
			sku: ['5078', '27800'],
			category: 'novel',
			type: 'digital',
			name: 'Never Deal with a Dragon: Secrets of Power, Volume 1',
			releaseDate: ['1990-12', '2003-06'],
			description: 'The year is 2050. The power of magic and the creatures that accompany it have returned to Earth. For Sam Verner, living in the womb of the Renraku conglomerate was easy, until his sister disappeared and reality began to disintegrate. Now Sam wants out, but he must face the world of Shadowrun.',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5078 - Never Deal with a Dragon.epub',
					size: '1037806',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5145',
		{
			sku: ['5145', '27802'],
			category: 'novel',
			type: 'digital',
			name: 'Find Your Own Truth: Secrets of Power, Volume 3',
			releaseDate: ['1991-06', '2003-06'],
			description: 'He was only a "beginner" shaman, but Sam Verner had to find a cure to ward off the curse on his sister. Only something of great magic would do the trick. It was this quest that took him to a mystical citadel in Australia, where, with the aid of his shadowrunner friends, he recovered the strange artifact he hoped would prove helpful. But instead of anything that even remotely resembled help, an unexpected and ancient terror was releasedâa terror that erupted into a shadow war for dominion over an awakened earth. And while the evil kept growing, inexorably drawing him into battle, the curse\'s power over his sister was also growing, bringing her closer and closer to death. Soon a truly desperate Sam realized that the last and only hope for saving his sister was to find the greatest shaman of the Sixth World, former leader of the Great Ghost Danceâa man who may no longer exist...',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5145 - Find Your Own Truth.epub',
					size: '959485',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5143',
		{
			sku: ['5143', '7601'],
			category: 'novel',
			type: 'digital',
			name: 'Into the Shadows',
			releaseDate: ['1990-02', '1992-10'],
			description: 'First Shadowrun fiction-only release. A trade paperback short story anthology set in 2050. The stories loosely interacted with one another.',
			gameDate: '2050',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Novels/5143 - Into the Shadows.epub',
					size: '920875',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'46116-9',
		{
			sku: ['46116-9', '27832'],
			category: 'novel',
			type: 'digital',
			name: 'A Fistful of Data',
			releaseDate: ['2006-10'],
			description: 'In the abandoned factory known as the Crypt, society\'s castoffs have found a place to call home. Some of the Crypt\'s denizens are hiding or on the run; some have nowhere left to go. But the Crypt protects its own, providing care for street kids as well as medical and magical healing for those in need. It also sports an illegal tap into the Matrix, and hosts a coven of some of the most successful shadowrunners around.\nWhen a disgraced corporate mover takes an interest in the Crypt - and in a valuable secret long hidden in its foundations - he doesn\'t intend to let the dregs of Seattle keep him from making the score of a lifetime. But he\'s about to discover that the Crypt\'s inhabitants aren\'t going to be buried so easily....',
			gameDate: '2063',
			edition: 3,
			publisher: ['wizkids'],
			files: [
				{
					path: './Novels/46116-9 - A Fistful of Data.epub',
					size: '457154',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'46076-6',
		{
			sku: ['46076-6', '27830'],
			category: 'novel',
			type: 'digital',
			name: 'Fallen Angels',
			releaseDate: ['2006-03'],
			description: '[Kellan Colt Trilogy #3] Kellan Colt has come far in her magical training. but all her accomplishments haven\'t satisfied her desire to know the truth about her shadowrunner mother, and to learn the secrets of the amulet she found among her mother\'s possessions. Kellan is determined to find answers - and to earn the respect of her fellow runners in the process.\nLately Kellan has been troubled by disturbing dreams. Something seems to be calling her, but before she can figure out who - or what - she joins a run into the paranoiac elven homeland of Tir Tairngire. Trapped deep inside foreign territory, she suddenly discovers the answers to her questions, but then she must unravel the most difficult riddle of all: Who can she really trust in the shadows?',
			gameDate: '2063',
			edition: 3,
			publisher: ['wizkids'],
			files: [
				{
					path: './Novels/46076-6 - Fallen Angels.epub',
					size: '443678',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'46063-4',
		{
			sku: ['46063-4', '27828'],
			category: 'novel',
			type: 'digital',
			name: 'Poison Agendas',
			releaseDate: ['2006-01'],
			description: '[Kellan Colt Trilogy #2] Kellan Colt has been making a name for herself as one of Seattle\'s up-and-coming shadowrunners, and she believes she\'s ready to break out on her own. Opportunity knocks when she learns the location of a secret weapons cache abandoned by the U.S. military. With the right buyer, a score this big has the potential to secure Kellan\'s reputation - and her bank account.\nWith a team of fellow shadowrunners assisting her, Kellan descends deep into the heart of the Awakened wilderness to extract the weapons. But the supernatural entities lurking in the forest beome the least of her worries when a rival facton appears seeking the cache - and the greatest threat to them all is revealed....',
			gameDate: '2063',
			edition: 3,
			publisher: ['wizkids'],
			files: [
				{
					path: './Novels/46063-4 - Poison Agendas.epub',
					size: '364957',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'46101-0',
		{
			sku: ['46101-0', '27828'],
			category: 'novel',
			type: 'digital',
			name: 'Aftershock',
			releaseDate: ['2006-07'],
			description: 'The troll known as Hood and his fellow Shadowrunners steal some biotechnological agriculture from the Plantech Corporation--only to find themselves framed for murder and tied to an even greater conspiracy.',
			gameDate: '2063',
			edition: 3,
			publisher: ['wizkids'],
			files: [
				{
					path: './Novels/46101-0 - Aftershock.epub',
					size: '548401',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'46083-9',
		{
			sku: ['46083-9', '27827'],
			category: 'novel',
			type: 'digital',
			name: 'Drops of Corruption',
			releaseDate: ['2006-05'],
			description: 'Bannickburn is a burned-out Scottish mage with little power and fewer prospects when he falls into fast company. A notorious crime boss, Bigio family caporegime Quinn Bailey offers him a job that could turn hs life around. Soon Bannickburn is living once again in the style he\'s accustomed to.\nBut then Bannickburn tries to leave the family, Bailey calls in his markers, and Bannickburn must aid the Bigios as they pit themselves against a rival mob in a power struggle that moves from the Seattle sprawl to the elven enclaive of Portland. Leading a handpicked crew of shadowrunners, Bannickburn is about to hit the jackpot - and learn that in every game, winners can turn into losers with the squeeze of a trigger....',
			gameDate: '2063',
			edition: 3,
			publisher: ['wizkids'],
			files: [
				{
					path: './Novels/46083-9 - Drops of Corruption.epub',
					size: '482701',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5199',
		{
			sku: ['5199'],
			category: 'novel',
			type: 'digital',
			name: 'Streets of Blood',
			releaseDate: ['1992-12'],
			description: 'Murder, Mystery, Intrigue and Betrayal! A story in foggy old England of 2054, the 1st book with elven mage Serrin Shamander and British Lord Geraint Llanfrechfa.',
			gameDate: '2054',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Novels/5199 - Streets of Blood.epub',
					size: '1009932',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5365',
		{
			sku: ['5365', '27808'],
			category: 'novel',
			type: 'digital',
			name: 'Fade to Black',
			releaseDate: ['1994-04', '2003-06'],
			description: 'In 2055, Newark is an over-crowded urban nightmare populated by hordes of SINless indigents. Millions live in abject poverty. Violence is rampant. Brutal gangs and vicious criminals control many sections of the city like feudal lords.\nAmid this harrowing landscape, Rico gathers his team: Shank, Thorvin, Piper, and the eccentric shaman known as Bandit. The job is to free a man from a corporate contract that is the moral equivalent of slavery, but that is only the beginning. The runners\' diverse skills and talents are swiftly put to the test. Rico\'s challenge is to keep the team alive as they sort through a maze of corporate intrigue and misdirection, but without discarding honor, for without honor a man is nothing.\nHonor alone distinguishes a man from the ravaging dogs that fill the streets, and as the runners soon learn, the price of honor is high.',
			gameDate: '2054',
			edition: 2,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5365 - Fade to Black.epub',
					size: '374919',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5313',
		{
			sku: ['5313', '27805'],
			category: 'novel',
			type: 'digital',
			name: 'Striper Assassin',
			releaseDate: ['1993-06', '2003-06'],
			description: 'Prey for the hunter.\nFor the world of humans knows her as Striper, the deadly Asian assassin and kick-artist. She has come to the City of Brotherly Love seeking revenge and made it her killing ground. But she is not the only predator stalking the dark underbelly of the Philadelphia metroplex. There are other hunters prowling the night, and some possess a power even greater than hers.\nSome may even want her dead.\nWhen the moon rises full and brilliant into the dark pall of the night, the bestial side of her nature battles for dominion, demanding vengeance and death.\nWho will survive?\nWho dares to hunt the hunter?',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5313 - Striper Assassin.epub',
					size: '406201',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5427',
		{
			sku: ['5427'],
			category: 'novel',
			type: 'digital',
			name: 'Nosferatu',
			releaseDate: ['1994-08', '2003-06'],
			description: 'Mage and part-time shadowrunner Serrin Shamander and his companions desperately flee a relentless, demonic enemy out to eliminate humankind from the face of the earth. This is the 2nd book with renegade elven mage Serrin Shamander and British Lord Geraint Llanfrechfa.',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5427 - Nosferatu.epub',
					size: '990880',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5367',
		{
			sku: ['5367'],
			category: 'novel',
			type: 'digital',
			name: 'Lone Wolf',
			releaseDate: ['1994-02', '2003-06'],
			description: 'With gangs conquering the streets of Seattle, Rick Larson, doing undercover work for Lone Star, Seattle\'s contracted police force, finds himself on the wrong side of the law.',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5367 - Lone Wolf.epub',
					size: '947253',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5310',
		{
			sku: ['5310', '27803'],
			category: 'novel',
			type: 'digital',
			name: 'Night\'s Pawn',
			releaseDate: ['1993-04', '2003-06'],
			description: 'For years, Jason Chase was at the head of the pack, shadowrunning with the best in the business. When time dulled his flesh and cybernetic edge, he knew it was time to get out, or get dead.\nNow, his past has come back to haunt him. To protect a young girl from the terrorists who want her dead, Chase must rely on his years of experience, and whatever his body has left to give. And everything he\'s got, he\'ll need as he comes face-to-face with a part of his life he thought he\'d left behind, and an enemy left for dead.',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5310 - Night\'s Pawn.epub',
					size: '775169',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5218',
		{
			sku: ['5218'],
			category: 'novel',
			type: 'digital',
			name: 'Changeling',
			releaseDate: ['1992-06', '2003-06'],
			description: 'Chicago - Peter Clarris was a human boy who changed into a troll. He grows up surviving as a shadowrunner.',
			gameDate: '2038,2052',
			edition: 2,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5218 - Changeling.epub',
					size: '329911',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5210',
		{
			sku: ['5210'],
			category: 'novel',
			type: 'digital',
			name: '2XS',
			releaseDate: ['1992-02', '2003-07'],
			description: 'Private Detective Dirk Montgomery thinks he knows the streets. He watched the change of the world, as magic grows and alter the balance of power, he thinks he understands the deepest shadows and the darkest of hearts. He was wrongâ¦.',
			gameDate: '2052',
			edition: 2,
			publisher: ['fasa', 'catalyst'],
			files: [
				{
					path: './Novels/5210 - 2XS.epub',
					size: '413550',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5302',
		{
			sku: ['5302'],
			category: 'novel',
			type: 'digital',
			name: 'Shadowplay',
			releaseDate: ['1997-02'],
			description: 'Sly is a veteran. She\'s run more shadows than she cares to remember, and has the physical and emotional scars to prove it. But no matter how violent it became, it had always been business as usual. Until now. Falcon is a kid. He thinks he hears the call of magic, and the voice of one of the Great Spirits seems to whisper in his hear. He\'s gone to Seattle, the urban jungle, to seek his calling. Thrown together, veteran and novice, Sly and Falcon find themselves embroiled in a deadly confrontation between the world\'s most powerful corporations. If this confrontation is not stopped it could turn into all-out warfare, spilling out of the shadows and onto the streets themselves.',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Novels/5302 - Shadowplay.epub',
					size: '1026731',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'5220',
		{
			sku: ['5220', '27804'],
			category: 'novel',
			type: 'digital',
			name: 'Never Trust an Elf',
			releaseDate: ['1992-08', '2003-06'],
			description: 'When Kham, an ork living in the Seattle ghetto in the year 2053, is suddenly snatched from his day-to-day existence and thrust into a world of dragons, he learns the hard way whom to trust.',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Novels/5220 - Never Trust an Elf.epub',
					size: '906784',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'46058-8',
		{
			sku: ['46058-8'],
			category: 'novel',
			type: 'digital',
			name: 'Born to Run',
			releaseDate: ['2005-11'],
			description: '[Kellan Colt Trilogy #1] Seattle Metroplex - Kellan Colt goes to Seattle to learn how to be a professional shadowrunner and discover her past.',
			gameDate: '2063',
			edition: 3,
			publisher: ['wizkids'],
			files: [
				{
					path: './Novels/46058-8 - Born to Run.epub',
					size: '345860',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'26854',
		{
			sku: ['26854'],
			category: 'novel',
			type: 'digital',
			name: 'Crimson',
			releaseDate: ['2015-04-01'],
			description: 'Thanksgiving, 2075. Shadowrunning vampire-mage Rick âRedâ Lang used to make his living hunting dangerous insect spirits and twisted mages, but when he awakens after twelve years of involuntary hibernation, he finds the rest of the world has gotten even stranger.\nRed begins piecing together what had happened during his lost timeâand who put him under in the first place. But as he journeys through the neon-drenched ruins of Chicago and its augmented facades, Red uncovers an even larger plot involving eldritch forces seeking to invade from beyond our reality. He teams up with the few allies he can trustâPretty, a beautiful ghoul, and Slim, a hacker extraordinaireâas they head into the middle of multiple schemes and power plays surrounding a dangerous new conflict threatening to shatter the uneasy peace into all-consuming chaos.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Novels/26854 - Crimson.epub',
					size: '895363',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'26853',
		{
			sku: ['26853'],
			category: 'novel',
			type: 'digital',
			name: 'Dark Resonance',
			releaseDate: ['2014-12-28'],
			description: 'Kazuma Tetsu is a technomancerâone of the rare people who can manipulate the Matrix without technology, using only the power of their mind. But heâs on a more personal missionâheâs searching for his missing sister, Hitori. Following her trail leads him into a tangled web of corp execs, mercenaries, and double-crossing roguesâusually just another day in the Sixth World.\nBut as Kazuma digs deeper, he uncovers a plot that could bring about the end of the world. Upon seeing a simulation of the Resonances Realms accessible to technomancers, an A.I. declares it will use the realms to ascend to a higher plane of consciousness. The intelligenceâs goal seems impossible, until an imprisoned and manipulated group of technomancers accesses dissonance to open a gateway to a new realmâpossibly the heaven the A.I. seeks. But opening this dissonant hole in the Matrix could trigger global disaster, and itâs up to a team of shadowrunners, including a couple of denizens of the fabled JackPoint, to free the trapped technomancers and stop the Dark Resonance before it destroys the entire Matrixâand worse â¦',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Novels/26853 - Dark Resonance.epub',
					size: '1061871',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'26856',
		{
			sku: ['26856'],
			category: 'novel',
			type: 'digital',
			name: 'Deniable Assets',
			releaseDate: ['2016-02-06'],
			description: 'Shadowrunner Katar Hawke knows the score on the streets. Every job is to be executed swiftly and simplyâno muss, no fuss, and with as little help as possible. But when an extraction of a seemingly ordinary grad student from a Central American dig goes south in a big way, Hawke has to keep them both alive while he figures out what heâs stumbled intoâand how to get out of it in one piece.\nBut nothing about this shadowrun is remotely ordinary. The student, Rachel Gordon, has unearthed an artifact linking the Sixth World and the long gone, magical Second World. The discovery sets off a lethal chain reaction of feuding megacorporations and cold-blooded killers who will do anything to get their hands on her and what she knows.\nCaught in the hardest of hard places, Hawke must break his cardinal rule and assemble his own shadowrunning team to survive whatâs coming at him. But in the end, it all comes down to one question: will he sell out Rachel to the highest bidder, or join her on a quest that could change the face of the Sixth World forever?',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Novels/26856 - Deniable Assets.epub',
					size: '1049863',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'26855',
		{
			sku: ['26855'],
			category: 'novel',
			type: 'digital',
			name: 'Borrowed Time',
			releaseDate: ['2015-05-26'],
			description: 'JackPointer mage Winterhawk left the shadows at the top of his game: these days he indulges his curiosity about all things mysterious and magical on his own terms. But heâs about to discover that the shadows are hard to leave behind, and old enemies have their ways of drawing him back in.\nDosed with an exotic arcane poison that will kill him in days unless he retrieves a powerful magical artifact, âHawk has to assemble a team fast and think even faster, because heâs not the only one tracking down the prize. His team is hardly the well-oiled machine heâs accustomed to: an old friend with major trust issues, an old rival who hates everything âHawk stands for, a decker who annoys everyone he meets, a samurai whoâs only in it for the money, and a gunslinger who may have her own agenda.\nWith his life on the line and the clock ticking fast, âHawk must survive the mean streets of Los Angeles and the magical hells cape of the Australian Outback while keeping his mismatched team from imploding before they finish the job. But when the artifact is revealed to be far more than it seems, Winterhawk is forced to make a choice that could affect the lives of millionsâto say nothing of his own.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Novels/26855 - Borrowed Time.epub',
					size: '952660',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'26852',
		{
			sku: ['26852'],
			category: 'novel',
			type: 'digital',
			name: 'Hell on Water',
			releaseDate: ['2014-12-28'],
			description: 'Six shadowrunners. Three mysterious packages. And twelve kilometers of a dangerous, dilapidated bridge across one of the wildest sprawls of the Sixth World.\nIt should be a simple job. Retrieve three sealed packages, then take them across the city of Lagos to their destination. All the runnersâ skills will be testedâtheyâll face ambushes, double-crosses, and more, and along the way they might be able to answer the question of just whatâs in those packages, and why theyâre so important.\nThe team has a lot on their side, including a street samurai whoâs a legend on the streets, a hotshot rigger with a lot of enemies, a young shaman seeking justice, a decker with a dark secret, and a pair of pros from Seattle trying to keep up with everything the unfamiliar sprawl throws at them. But the deadly streets and sinister neighborhoods of Lagos contain their own unique dangers, and itâll take every trick the runners know to complete their mission and escape the city in one pieceâ¦',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Novels/26852 - Hell on Water.epub',
					size: '289282',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'26851',
		{
			sku: ['26851'],
			category: 'novel',
			type: 'digital',
			name: 'Fire & Frost',
			releaseDate: ['2014-07-02', '2014-08-26'],
			description: 'Arcano-archaeologist Elijah knows that digging into the past can be its own rewardâor peril. When heâs hired to find an ancient map purported to lead to a mysterious location at the bottom of the world, his professional curiosity is more than roused. But his quest to simply get his hands on the map is more dangerous than he expectedâeven for a shadow runner.\nHe and his own team of runnersâincluding everything from a goblin rigger to a troll street samuraiâfollow a murky trail that takes them from the ruins of Chicago to the jungles of Amazonia. Along the way, they discover that theyâre not the only ones looking for this mapâand that it may lead to a treasure even greater than anyone could have known. Elijah and his crew plan to get both the map and to its riches firstâassuming they survive the very dangerous road trip to get thereâ¦',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Novels/26851 - Fire & Frost.epub',
					size: '490789',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'26850',
		{
			sku: ['26850'],
			category: 'novel',
			type: 'digital',
			name: 'Spells & Chrome',
			releaseDate: ['2010-05-14', '2010-12-22'],
			description: 'Welcome to the year 2072â¦\nâ¦And a world unlike anything youâve ever imagined. A world where magic and machines exist side-by-side. Where cybernetics can replace organs or entire limbs with ease, and arcane spells can make the impossible happen. Where the Matrix has become an artificial world of its own, filled with all kinds of pleasure, treasure, and trouble. Where dwarves, elves, orks and trolls walk alongside humans every day. Some work for megacorporations whose invisible tentacles wrap around every aspect of modern life. Others choose a much less legal career, doing whatever dirty work the corp executives need doneâfor a price.\nWelcome to Shadowrun\nFeaturing fifteen stories about the men and women who make their living in the shadows of the Sixth World, Spells & Chrome takes you into the dark and dirty streets of the future. Whether risking their lives to execute a mission for an employer who might be planning to double-cross them anyway, or just doing whatever they need to do to survive another day, shadowrunners use everything theyâve gotâcyberware, spells, or a very big gunâto get the job done.',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Novels/26850 - Spells & Chrome.epub',
					size: '550660',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'26858',
		{
			sku: ['26858'],
			category: 'novel',
			type: 'digital',
			name: 'Shaken (No Job Too Small)',
			releaseDate: ['2015-06-13'],
			description: 'Most folks see Puyallup as the worst Seattleâs got to offer; a tangled mess of metahumanity and greed, poverty and ghettoes, vice and corruption, where the crime is more organized than the government. They call it a Barrens, an armpit, a cesspool.\nJimmy Kincaid, though, calls it home. Walking the line between the shadows and the desperate light, semi-legit like only a Puyallup brat and former cop can be, he insists Puyallup has a heart and a soul, that itâs a place of life, magic, and starving hope. A former combat mage, now as burnt out as his neighborhood, he does what he can to police the worst excesses of the crime-riddled city he loves.\nIn the darkness of the Seattle Sprawl, whatâs one more murder?\nTo Kincaid, itâs everything. Heâs got a dead mentor, a hermetic group in need, and a mysterious file that might have been worth killing for. To unlock the data and get a little justice, heâll face the worst the Sprawl has to offer, wading through blood, darkness, and a murderous web of lies.\nItâs a good thing heâs got friendsâin high and low placesâ¦',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Novels/26858 - Shaken (No Job Too Small).epub',
					size: '968826',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'26S038',
		{
			sku: ['26S038'],
			category: 'novel',
			type: 'digital',
			name: 'Nothing Personal',
			releaseDate: ['2014-08-10'],
			description: 'Mr. Johnson. You know the name. You probably know the faceâsmooth, implacable, professional. Heâs got the nuyen and resources you want, and he knows it. He may not have your skills, but he doesnât care. Thatâs what he has the nuyen forâso he can buy yours. Heâs corporate through and through, and you canât ever forget that, because if you do, thatâs when he sells you out for the good of his corp. But heâll stay professional, of course, right up until the moment he slides the knife smoothly into your back. Heâs useful, that Mr. Johnson, but every time you meet him, every time you have to deal with his double-crosses, his condescending put-downs, his smug superiority, you wish that the day would come when the tables were turned, when he was forced out on the street with nothing but his wits and street skillsâwhatever those might beâto keep him alive.\nWell, good news. Sometimes wishes come true, even in the Sixth World. Mr. Johnson is about to meet the street, and youâve got a ringside seat.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Novels/26S038 - Nothing Personal.epub',
					size: '845821',
					mime: 'application/epub+zip'
				},
				{
					path: './Adventures and Campaigns/Enhanced Fiction/26S038 - Nothing Personal.pdf',
					size: '1472878',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S030',
		{
			sku: ['26S030'],
			category: 'novel',
			type: 'digital',
			name: 'The Vladivostok Gauntlet',
			releaseDate: ['2013-09-16'],
			description: 'Yuri Yehzov has been off the streets for a long while, surviving by following a few simple rules. Donât stick your neck out. Donât get involved in something that is none of your business. And above all, donât piss off the ferocious mobsters of the Vory y Zakone.\nYuri doesnât have much left from his shadowrunning days except his cyberears, but thatâs enough to get him in trouble. When he hears something he cannot ignore, one by one his rules fall by the wayside until he has cold-blooded killers, vicious shapeshifters, and a ruthless Vory leader all after him. His gear is broken, his reflexes are shot, and heâs about to face the toughest opponents heâs ever been against. The streets have one more chance to claim his lifeâand he has one more chance to break the rules, beat the odds, and find a way to stay alive.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Novels/26S030 - The Vladivostok Gauntlet.epub',
					size: '855625',
					mime: 'application/epub+zip'
				},
				{
					path: './Adventures and Campaigns/Enhanced Fiction/26S030 - The Vladivostok Gauntlet.pdf',
					size: '500680',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S047',
		{
			sku: ['26S047'],
			category: 'novel',
			type: 'digital',
			name: 'Wolf & Buffalo',
			releaseDate: ['2015-08-19'],
			description: 'The Sixth World doesnât give people much time to grow up. Whoever you are, wherever you live, thereâs going to come a time when the world is going to throw you some serious curveballs, and if all you can do is bitch and moan about how youâre not ready for whatâs coming your way, youâre not going to last long. Get strong, grow up, and figure out how to surviveâthatâs what everyone else has done. Except for those lying two meters underground.\nOne of those tests is about to hit Lena, a young woman living in the Sioux Nation. Sheâs going to learn a lot about how life in the Sixth World works, and just how far people will go to get what they want, but before she can process any of that, she is going to have to survive criminals, smugglers, and worse. She doesnât have much to help her, except for some new powers she does not understand. Using them, and drawing on some unexpected allies, is the only way she will live out the day.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Novels/26S047 - Wolf & Buffalo.epub',
					size: '851566',
					mime: 'application/epub+zip'
				},
				{
					path: './Adventures and Campaigns/Enhanced Fiction/26S047 - Wolf & Buffalo.pdf',
					size: '1929605',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S041',
		{
			sku: ['26S041'],
			category: 'novel',
			type: 'digital',
			name: 'Sail Away Sweet Sister',
			releaseDate: ['2014-04-22'],
			description: 'Thomas McCallisterâs area of expertiseâthe virus that turns metahumans into flesh-eating monstersâhas taken him into some dark corners of the Sixth World. When he came face to face with the serial murderer known as the Mealtime Killer, he had hoped that a particularly dark chapter of his life had come to a close. But when night falls in the sprawls of the world, blood is still being shed, and people are still dying. Another killer is still out there, one that needs to be found and stopped, but the challenge McAllister is about to face is one he never could have anticipated. His resolve will be tested in ways he never anticipated in his darkest nightmares.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Novels/26S041 - Sail Away Sweet Sister.epub',
					size: '732677',
					mime: 'application/epub+zip'
				},
				{
					path: './Adventures and Campaigns/Enhanced Fiction/26S041 - Sail Away Sweet Sister.pdf',
					size: '1498451',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26NV002',
		{
			sku: ['26NV002'],
			category: 'novel',
			type: 'digital',
			name: 'DocWagon 19',
			releaseDate: ['2015-03-19'],
			description: 'DocWagonâsaviors of the needy, rescuers of the desperate. Willing to go anywhere, rescue anyone, as long as that âanyoneâ has forked out enough advance cash to justify the effort.\nReporter Amelia Hart has embedded herself with a DocWagon team to see what their life is really like, and sheâs in for a wild ride. From an ODâing celebrity to an aggressive team of hackers, from pesky gangs to an extremely rich and powerful client teetering at deathâs door, this night will give the team all they can handle. But will they survive long enough to remember that in the Sixth World, nothing is truly random?',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Novels/26NV002 - DocWagon 19.epub',
					size: '628902',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'26871',
		{
			sku: ['26871'],
			category: 'novel',
			type: 'digital',
			name: 'Drawing Destiny (Tarot Anthology)',
			releaseDate: ['2016-09-03'],
			description: 'THE TAROT HAS AWAKENEDâ¦\nâ¦And nothing will ever be the same again.\nThe Tarot, a mystical divination deck of cards, has appeared in the Sixth World as a powerful artifact. It works its will on anyone who finds one of its magical cards, from runners surviving on the street to corp executives battling in the boardroom. And not just peopleâs lives will be changed, for the Awakened Tarot deck is more than just a formidable magic item, it has an agenda all its own, and will seek to use those it comes in contact with to set its plans in motionâ¦',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Novels/26871 - Drawing Destiny (Tarot Anthology).epub',
					size: '1086112',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'26862',
		{
			sku: ['26862'],
			category: 'novel',
			type: 'digital',
			name: 'World of Shadows',
			releaseDate: ['2016-02-06'],
			description: 'The Sixth World is a dangerous place, with deadly hazards lurking around every corner. Everywhere shadowrunners go, from the top of the world to the deepest, darkest Sprawl neighborhood, someoneâs always looking to make their rep by taking you down.\nWorld of Shadows is the second anthology of original Shadowrun short stories, each one showcasing some of the most far-flung, treacherous locations around the world. From a scientific mission gone wrong in the snowy wilds of Russia to an AR nightclub in Morocco sheltering runners on the lam to a recovering runner drawn into a deadly web of intrigue in the darkest alleys of Hong Kong, these eighteen original short stories explore exotic settings far off the beaten path. Featuring stories by Michael A. Stackpole, Mel Odom, Jean Rabe, Aaron Rosenberg, Phaedra Weldon, Annie Bellet, Chris A. Jackson and many others, find out what happens when shadowrunners have to battle not only with ever-present threat of the corps and Mr. Johnson, but also the dangers of the very land they stand on.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Novels/26862 - World of Shadows.epub',
					size: '716901',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'26NV002A',
		{
			sku: ['26NV002A'],
			category: 'novel',
			type: 'digital',
			name: 'Big Dreams',
			releaseDate: ['2016-12-02'],
			description: 'Slacker corp mage Cody\'s bad day is about to get a lot worse.\nLosing his job is crappy enough, but when his talismonger uncle turns up dead and dissected in his shop, Cody finds himself on the run from some very nasty people who want something they think he has.\nThe problem is, Cody has no idea what it is.\nTurning for help to old friends from his Barrens roots, Cody soon learns that his problems are bigger than any of them can handle. To survive, he\'ll need some heavy hitters on his side--but can he trust them not to sell him out?',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Novels/26NV002A - Big Dreams.epub',
					size: '877575',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'26NV001',
		{
			sku: ['26NV001'],
			category: 'novel',
			type: 'digital',
			name: 'Neat',
			releaseDate: ['2012-11-10'],
			description: 'James Kincaid is the type of guy who might be described as down on his luck, if only heâd had some luck to begin with. Like so many people in the shadows of Seattle, heâs trying to get by with what he has. In his case, that includes a lively spirit, a sadly diminished magical talent, quick wits, and good knowledge of the twists and turns of Seattleâs dingy streets and back alleys. He puts all that to the service of whatever clients he can dig up, solving whatever cases theyâre willing to pay him to take on. With any luck, heâll scrape up enough nuyen to buy a few rounds of his favorite drinkâwhiskey, neat.\nHis latest case seems simple enoughâfind a girl whoâs gone missing. But throw in a couple of feuding megacorporations, a few organized crime families, and a full selection of the odd denizens of Seattleâs streets, and youâve got a case thatâs anything but easy. Itâs up to Kincaid to see how many people he can keep aliveâincluding (and especially) himself.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Novels/26NV001 - Neat.epub',
					size: '188917',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'26S048',
		{
			sku: ['26S048'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Shadow Spells',
			releaseDate: ['2014-09'],
			description: 'Magic cannot be contained or easily defined. It can barely be controlled. It is large, omnipresent, and multi-faceted. It contains multitudes.\nA few of those multitudes are in this book, such as Pierre Dubois, media personality and Psionist researcher; a band of fortune seekers known as Treasure Hunters, Inc.; strange crystalline entities who may be forming a dangerous alliance; a spell to turn an unfortunate victimâs blood into a sludgy mess; and an adept power that temporarily blanks out memory, making an individual immune to interrogation.\nThese and more are hereâspells, adept powers, rituals, and a host of magical knowledge. It may be a single meter would compared to the nigh-infinite length of the full scroll of magical knowledge, but as any shadowrunner can tell you, in a pinch a meter can make all the difference in the world.',
			gameDate: '2076-09',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26S048 - Shadow Spells.pdf',
					size: '5914121',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S046',
		{
			sku: ['26S046'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Shadows in Focus: Sioux Nation: Counting Coup',
			releaseDate: ['2015-10'],
			description: 'Illegally entering the Sioux Nation is hard. So is crossing the Sioux National Police. Doing both? That will earn you a good payday or a bullet in the head. But thatâs the job thatâs been offered. And what shadowrunner worth their mettle can resist the chance to make some powerful friends and even more powerful enemies?\nMika, a shadowrunner active on JackPoint, is hiring, and players have a great chance to make a pile of nuyen while showing just how much skill they have. Theyâll have to move fast, stay alert, and make sure they hit whatever theyâre aiming at. Just like they always do.',
			gameDate: '2077-10',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26S046 - Shadows in Focus - Sioux Nation - Counting Coup.pdf',
					size: '4876616',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27008',
		{
			sku: ['27008'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Howling Shadows',
			releaseDate: ['2016-05'],
			description: 'Gangers. Corp security. Mr. Johnson. Organized crime. Other shadowrunners. Running in the Sixth World does not exactly lack for obstacles, but only foolish runners worry solely about metahuman opponents. There are plenty of other ways the world can kill you, from throat-ripping martachoras to blood-sucking chupacabras, from the aggressive gamma spider to the swarming harpy. While most runners would be happy to simply avoid these threats, itâs not always possible. Critters may be used as security, they may swarm in abandoned areas runners must investigate, or they may carry valuable reagents runners need. Some of them may even hold the keys to unlocking the sort of powers runners covet.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/27008 - Howling Shadows.pdf',
					size: '21241460',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S050',
		{
			sku: ['26S050'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Shadows in Focus: City by Shadow: San Francisco Metroplex',
			releaseDate: ['2016-01'],
			description: 'Money? Check. Political turmoil leading to scrambling for power? You bet. Megacorps jockeying for position while working to take their rivals down a notch? Of course! A festering hive of corruption set next to one of the most scenic bays ever colonized by humans? Absolutely! San Francisco has all of the ingredients needed to make a nice, festering stew for shadowrunners. With the former imperialistic fascist General Saito out of power and the entire bay area united as a single sprawl, there is power and money to be had, which means business in the shadows is booming. San Francisco is a shadowrunnerâs guide to the people, places, and plots that make up this city, providing the paydata they need to navigate the hilly streets and cruel back roads of a sprawl whose aura of sophistication canât mask its deadly heart.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26S050 - Shadows in Focus - City by Shadow - San Francisco Metroplex.pdf',
					size: '1487084',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S044',
		{
			sku: ['26S044'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Shadows in Focus: Sioux Nation: Starving the Masses',
			releaseDate: ['2015-04'],
			description: 'If thereâs anything shadowrunners have learned over and over again, itâs that the veneer of civilization coating much of the world is extremely thin (in the Barrens, of course, itâs non-existent). There are so many tensions in the Sixth World that altering the delicate balances just a hair or two can bring chaos and conflict to areas that had previously managed to scrape together a peaceful appearance.\nIf you want to cause that chaos, all thatâs needed is a little gentle pressure on one of the essential arteries that keeps civilization alive. And no artery is as susceptible to this pressure as the food supply.\nStripped of a lucrative position and exiled from his family, Theo Two-Hearts has a score to settle, and heâs going to take it out on the entire Sioux Nation. Like many vengeance-minded people before him, heâs turned to shadowrunners to do his dirty work. If they sign on to his plan, theyâre going to confront some of the toughest forces the Sioux Nation can throw at them. The first bit of chaos they create will rain down on themâif they survive, much more will follow.',
			gameDate: '2077',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26S044 - Shadows in Focus - Sioux Nation - Starving the Masses.pdf',
					size: '8217502',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S042',
		{
			sku: ['26S042'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Shadows in Focus: Sioux Nation',
			releaseDate: ['2015-01'],
			description: 'Arcane sites crackling with magical energy. High-stakes corporate maneuvering, complete with draconic influence. Smugglers and shamans, charismatic chiefs and feckless rogues. All this and more waits in the Sioux Nation for runners looking to branch out and run headfirst into new challenges in the unending quest to earn a few nuyen while staying alive and free from corporate detention facilities.\nShadows in Focus: Sioux Nation is the first in a new series of Shadowrun e-books providing a detailed look at geographical spots that have not been covered recentlyâor at allâin previous books. Starting with an overview of the Sioux Nationâincluding corporate powers, magical sites, major cities, adventure hooks, and moreâthe series will continue with spotlights on two major cities, Cheyenne and Butte, adventures set in the Sioux Nation, and an Enhanced Fiction story providing more flavor of what itâs like to run in the Sioux Nation. While the full collection of e-books will provide a detailed look at a nation reconciling old traditions with life on the bleeding edge of magic and technology, the Sioux Nation book has all you need to bring your Shadowrun game into this locale and see if runners can handle the full range of challenges it will throw at them.',
			gameDate: '2076-12',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26S042 - Shadows in Focus - Sioux Nation.pdf',
					size: '16134481',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S038A',
		{
			sku: ['26S038A'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Shadows in Focus: City by Shadow: MetrÃ³pole',
			releaseDate: ['2016-10'],
			description: 'MetrÃ³pole was not built with shadowrunners in mind. Or even metahumans, for that matter. In the Awakened country of Amazonia, the great dragon Hualpa reigns, critters walk the streets under full protection of the law, and the people struggle to figure out how theyâre supposed to fit into this huge mess.\nAnd huge it is. With many kilometers of coastline, thousands of tangled streets, and millions of residents, the city is packed with power, money, and intrigueâeverything shadowrunners need to do their work. Yeah, the job might come with a slightly elevated chance of becoming dragon foodâif that worries you, maybe the work down South America way is not for you. But if you have enough courage and an appetite for the strange, MetrÃ³pole is a great way to fill it.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26S038A - Shadows in Focus - City by Shadow - MetrÃ³pole.pdf',
					size: '1844389',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S043A',
		{
			sku: ['26S043A'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Shadows in Focus: City by Shadow: Butte',
			releaseDate: ['2015-09'],
			description: 'One of the tricks of shadowrunning in the Sioux Nation is keeping your eye on the things you canât see. Itâs not just the spirits and the unseen magical beings of the worldâthough thatâs part of itâbut the dangers underground. The poisons seeping into the earth from abandoned mines, and the vast complex that has been built underground, out of sight of the rest of the population. A spot where money flows and the sun never shinesâwhat more could shadowrunners want?',
			gameDate: '2077',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26S043A - Shadows in Focus - City by Shadow - Butte.pdf',
					size: '3706998',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S043',
		{
			sku: ['26S043'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Shadows in Focus: Cheyenne',
			releaseDate: ['2015-02'],
			description: 'The number of ways you can step wrong in Cheyenne are higher than a lot of shadowrunners can count. There are political, ethnic, tribal, and racial divides, and stepping on the wrong side of them can not only end your job prospects, but it can put you in a hastily dug hole in the ground. Move quickly and be agile, though, and you can slip through the snares that trip up lesser runners, accumulating the street rep and nuyen that will put you at the top of the runner heap.',
			gameDate: '2077-02',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26S043 - Shadows in Focus - Cheyenne.pdf',
					size: '14186733',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27009',
		{
			sku: ['27009'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Court of Shadows',
			releaseDate: ['2016-07'],
			description: 'You have seen it. You have felt it. The dream where you are falling, falling, and you cannot see the ground but you know it is there waiting. You may try to brace yourself, you may try to force yourself awakeâyou do anything to avoid the impact that keeps rushing toward you.\nThe Seelie Court is the realm of the hidden, the rumored, and the unknown. Fairies, spirits, and enchanted creatures mingle there, building alliances, plotting, scheming, toying with the realm of humansâand with each other. The Court has long held a distant attachment to the material plane, influencing it like a dream influences our waking hours. But now a new connection has emerged, allowing humans to infiltrate the courts and influence its proceedings. At a time when magical power is ever in the rise, the mix of human and fae could set both worlds into a calamitous plunge, and no one will want to be awake when they hit bottom.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/27009 - Court of Shadows.pdf',
					size: '9729889',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7105',
		{
			sku: ['7105'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Paranormal Animals of North America',
			releaseDate: ['1990-06'],
			description: 'Lions, Tigers, and Bearsâ¦\nYou Should Be So Lucky.\nMagic has returned to the world, and with it has come all manner of beasts. Genetic material, long dormant with the absence of magic, has been reactivated, transforming mundane animals into creatures once believed supernatural, even mythical. Juggernauts rome the plains, Firedrakes infest the woods, Leviathans swim in the oceans, and Devil Rats now hunt Man in the shattered Sprawls that he has created.',
			gameDate: '2051',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7105 - Paranormal Animals of North America.pdf',
					size: '59738074',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7103',
		{
			sku: ['7103'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Sprawl Sites',
			releaseDate: ['1990-04-01'],
			description: 'Build from a thousand kilometers of flesh and steel. It writhes in the passions of those who live in it. Everyone and everything is connected here; there are no accidents. Talk a walk down any street and read the writing on the wall:\n"Welcome to the Sprawl, chummer. Too bad you could make it."\nSprawl Sites is a sourcebook for Shadowrun, First Edition, and includes hundreds of encounters of every type, from blood-crazed gangs and mystic magicians to mild-mannered Orks and back-stabbing Corporate Cops. Plus, you\'ll find Location Archetypes covering typical Sprawl locations from all sides of town, eight new Player Archetypes, and dozens of Non-Player Contacts. Round that out with additional essays and rules concerning sprawl law and credsticks, and you\'ve got a whole new adventure on your hands. Your Shadowrun campaign will never be the same.',
			gameDate: '2050',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7103 - Sprawl Sites.pdf',
					size: '75430349',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7110',
		{
			sku: ['7110'],
			category: 'rulebook',
			type: 'scan',
			name: 'Shadowtech',
			releaseDate: ['1992-08'],
			description: 'Think you\'re already hot stuff, eh chummer? Guess again. There\'s a leaner, meaner machine on the streets these days, a machine whose parts aren\'t built, they\'re grown.',
			gameDate: '2052',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Rulebooks/7110 - Shadowtech.pdf',
					size: '49016386',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7109',
		{
			sku: ['7109'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Shadowbeat',
			releaseDate: ['1992-09'],
			description: 'The beat\'s on the street, and that\'s where you have to be if you wanna be in on what\'s happenin\'.\nShadowbeat makes it easy by dishing out the scoop on music, media, sports and entertainment in the 2050s. Discover the best way to stardom in the sims.\nLearn how to get the dirt on the stars. Get down and dirty as an Urban Brawler. All this, and the toys that make it happen, are included inâ¦Shadowbeat!',
			gameDate: '2053',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7109 - Shadowbeat.pdf',
					size: '122314743',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27451',
		{
			sku: ['27451'],
			category: 'mission',
			type: 'digital',
			name: 'Market Panic',
			releaseDate: ['2016-03-02'],
			description: 'Chaos is horrible for businessâunless your business is shadowrunning. The Big Ten megacorporations of the Sixth World are reeling, with scandals, disasters, and crippling attacks coming at them from all angles. NeoNET is scrambling to maintain AAA status, Ares is trying not to let the secret rot at the heart of the corp become public, while Aztechnology, fresh from taking on a dragon in Amazonia, is looking at a facedown with another great dragon. And thatâs not allâevery corp is a pile of schemes, turmoil, upheaval, and teetering chaos, because thatâs how they operate.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/27451 - Market Panic.pdf',
					size: '16819261',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27201',
		{
			sku: ['27201'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Hard Targets',
			releaseDate: ['2015-10'],
			description: 'Itâs thick. Luxurious. Concealing. The cloak of death will make you feared, envied, and maybe even wealthy. It will also smother your soul. The best assassins in the Sixth World can gain untold wealth and make the whole world shake, but they also will be hunted and stalked until the end of their days. Assuming their conscience doesnât eat them alive.',
			gameDate: '2077-11',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/27201 - Hard Targets.pdf',
					size: '19414058',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27200',
		{
			sku: ['27200'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Stolen Souls',
			releaseDate: ['2014-05'],
			description: 'Not all has been right in our shadows of late. Especially in the dark shadows of my mind.\nThose were among FastJackâs parting words to JackPoint when he left, the victim of a condition that divided his mind against itself. And the condition is spreading. Across the Sixth World, peopleâs minds are in schism, as new personalities emerge and battle the old. The world is in chaos, and there is a dramatically increased demand for extractions, to get infected people out of sensitive positions and to steal the insights of people who might know whatâs gone wrong.',
			gameDate: '2076-04',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/27200 - Stolen Souls.pdf',
					size: '15413486',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27300',
		{
			sku: ['27300'],
			category: 'mission',
			type: 'digital',
			name: 'Lockdown',
			releaseDate: ['2015-05'],
			description: 'The voices are getting louder. Strange voices, dissonant voices, sometimes babbling nonsense, sometimes telling stories too unbelievable to be true. People are falling prey to the voices, losing their identities as someone or something else slips into their skin. Itâs affecting people at all levels of society, from squatters in burned-out warehouses to corporate CEOs. Itâs spreading, and no one can figure out how to stop it. Boston-based NeoNET is at the center of this storm, and panic is spreading through the streets of the northeastern sprawl. People are scared and people are dying, which means that there are large sums of money to be made by any shadowrunner willing to brave those chaotic streets. Finding work wonât be the problem. Getting out of the sprawl, however, will be.',
			gameDate: '2076-09',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/27300 - Lockdown.pdf',
					size: '28735529',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27202',
		{
			sku: ['27202'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Cutting Aces',
			releaseDate: ['2016-12'],
			description: 'The hotel bartender who slips you a guestâs room number because he thinks it will help him get lucky. The security guard who lets a team into a top-secret facility because he thinks heâs pitching in on covert-ops training. The business suit who drops ten thousand nuyen on a project because he thinks itâll earn him fifty thousand.\nMarks, all of them, and the Sixth World is full of them. Yeah, blasting your way into a well-guarded facility is fun, but talking your way in, smooth and subtle, might be more rewarding. Almost every kind of shadowrun involves at least a little con artistry, and some of them are full-on long cons. That means you need to sharpen your con game. With tips, plot updates, spells, gear, and more to improve charactersâ con abilities, Cutting Aces gives players the swagger and skills they need to swindle the world. It also includes information on one of the Sixth Worldâs hottest spots for running a conâIstanbul, City of the Worldâs Desire.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/27202 - Cutting Aces.pdf',
					size: '9343507',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S037',
		{
			sku: ['26S037'],
			category: 'sourcebook',
			type: 'digital',
			name: '10 Terrorists',
			releaseDate: ['2015-04'],
			description: 'There is no way to sugarcoat itâpeople in the Sixth World spend an awful lot of time coming up with reasons to kill each other. When it comes to moral codes, people donât think theyâre better than others because they donât kill and others doâthey compare the reasons for killing, ranking them, trying to justify the oft-unjustifiable. You can talk to a hundred people and get a hundred different opinions about whatâs justified and whatâs not, and about which motivations are worse than others, but consistently at the bottom of the list are those who would kill innocents for a cause, who would instill terror in people for political gain, because they see no other recourse.\n10 Terrorists covers ten groups in the Shadowrun setting who add chaos and violence to an already chaotic and violent world to further their own twisted causes. From Seed, a Matrix terrorism group that split off Ex Pacis, to Logos, a group that combines environmental extremism with talislegging, these are groups that can add and danger and plot hooks to Shadowrun campaigns. Whether runners are infiltrating the groups, avoiding them, or dealing with the fallout from the chaos they cause, 10 Terrorists can increase the threat level of any Shadowrun game.',
			gameDate: '2077',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26S037 - 10 Terrorists.pdf',
					size: '5964998',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S012',
		{
			sku: ['26S012'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Parabotany',
			releaseDate: ['2012-04'],
			description: 'Itâs so easy to forget about plants, especially for sprawl-hardened runners who never have anything underfoot besides plascrete. But you forget about them to your peril. After all, where do you think your deepweed comes from? How about those useful, memory-wiping doses of laÃ©s? And what was it about the Brazilian kiwi that made Dunkelzahn so interested in it?\nIgnoring plants means ignoring a possible source of income, and what self-respecting runner would ever do that? Parabotany is the guide runners need to help them locate plants that will enhance their abilities and grow their income, and it also provides useful tips, such as how to avoid plants that might be inclined to devour you.\nAlong with descriptions and full-color art for dozens of plants and a garden full of plot hooks, Parabotany has new rules on creating Awakened flora, gathering reagents, and creating powerful new magical compounds. Unlock the secrets of Sixth World plants, and use your knowledge to give your foes a defeat theyâll never forgetâunless, of course, you dose them with laÃ©s.',
			gameDate: '2074-03',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26S012 - Parabotany.pdf',
					size: '17360861',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S006',
		{
			sku: ['26S006'],
			category: 'sourcebook',
			type: 'digital',
			name: 'State of the Art: 2073',
			releaseDate: ['2011-12'],
			description: 'n this day and age, things change so fast that the centrifugal force of progress will shear your head right off. Shadowrunners like us need to keep up with the latest developments. When you run a B&E, you need to know what nasty new security feature might try to cut you in two as much as you need to know which nova new magic formula is worth snatching. It\'s the state of the art, chummer, it\'ll make you cred or get you dead.',
			gameDate: '2073-12',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26S006 - State of the Art - 2073.pdf',
					size: '13236907',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S015',
		{
			sku: ['26S015'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Street Legends Supplemental',
			releaseDate: ['2012-01'],
			description: 'Ten people. Ten very different people. A pirate who has made himself into one of the most wanted men in the world. A datathief whose skill is only matched by his flair and panache. Two corporate giants whose personalitiesâand actual physical makeupâcouldnât be more different. A troll whose name has a history much older than herself. And other individuals with stories and secrets of their own.\nSome of them are people you want on your side, and some of them are people who could be very dangerous enemies if you arenât careful. All of them are people you should know, because all of them have somethingâmoney, power, knowledge, or all threeâthat you can use.\nStreet Legends Supplemental follows the format of the Street Legends book by presenting information on ten characters from the Shadowrun universe, sharing stories about their activities in the Sixth World and also offering complete game information and statistics for them. Each character also comes with plot information gamemasters can use as they develop their campaigns. While it is a companion to Street Legends, Street Legends Supplemental can be enjoyed entirely on its own.',
			gameDate: '2073-12',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26S015 - Street Legends Supplemental.pdf',
					size: '7539123',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S014',
		{
			sku: ['26S014'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Magical Societies',
			releaseDate: ['2012-06'],
			description: 'Dear Applicant:\nThank you for applying for membership in our revered magical society. We are certain you understand that we receive more applications than we can accept, due in part to the prestige we enjoy in the Sixth World. We are a group who attracts notice. The mundane citizens of the world look at us with suspicion, while the Awakened look at us with envy, for they believe that we harbor dark secrets and world-changing schemes, and it of course is quite possible that they are right.\nSo we understand why you would seek to join us. We hope you can show us something special. We hope you can show us something new. We hope you can give us a reason why you should associate with our members by showing us what we can gain from having you among us. If you think first about what you can give, then you will have the opportunity to think about what you can get. Of course, if the rumors about us are true, the answer to that last item is simple: the world.\nWe look forward to your trial, and we hope you survive it. Should you wish, you may cancel that ordeal and instead attempt to join one of the other, lesser magical societies in the world. If you believe you can be satisfied with that.\nWe would wish you luck, but if you are skilled, you should not need it.',
			gameDate: '2074-05',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26S014 - Magical Societies.pdf',
					size: '9135008',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S003',
		{
			sku: ['26S003'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Parazoology',
			releaseDate: ['2011-03'],
			description: 'Beware the Beasts! The Awakening had a dramatic effect on the world, and those effects have not stopped shaking things up. Across the Sixth World, magic and other environmental factors continue to twist and distort all variety of living things, and the results can be deadlyâor useful, to those who know how to harness the powers let loose in the animal kingdom. Parazoology brings several critters from earlier editions of Shadowrun into Fourth Edition, while also introducing brand-new beasts. Inside youâll find the stealthy and predatory cactus cat, the mind-altering stone toad, the horrific sea wolf, and twenty-seven other critters. Complete with full-color illustrations and game statistics for every beast, Parazoology provides a host of challenges, dangers, and potential resources for your Shadowrun game.',
			gameDate: '2072-08',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26S003 - Parazoology.pdf',
					size: '4963757',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26504',
		{
			sku: ['26504'],
			category: 'sourcebook',
			type: 'digital',
			name: '10 Gangs',
			releaseDate: ['2010-02'],
			description: 'Everyone knows the score between the Yaks, Mafia, and Triad, but when you get down to it, the ganger on the corner is just as likely to try and kill you. Here is the download on ten mid-sized gangs that are looking to make a name for themselves.\n10 Gangs is a Shadowrun product, designed to supplement any campaign and utilizes the Gang rating system from Vice. Each gang comes with plot hooks and stats for gamemasters and players to use for run ideas, contacts, and keeping an eye on the competition.',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26504 - 10 Gangs.pdf',
					size: '2755473',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26501',
		{
			sku: ['26501'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Sprawl Sites: High Society and Low Life',
			releaseDate: ['2013-01'],
			description: 'If your run the shadows long enough and manage to stay alive, youâll find your way into all sorts of placesâfrom bank vaults where the wealthy store their most previous possessions to densely packed warrens that pack dozens of the poor into tight spaces. Maybe youâll need to break a patient out of a tightly guarded hospital, or maybe youâll need to help your client sneak into an exclusive party on the top floor of a luxurious mansion.\nWherever youâre going, it helps to have a mapâand some knowledge of who you might run into while youâre there. Sprawl Sites: High Society and Low Lifeprovides eight full-color maps, including a train station, an airport terminal, an automobile chop shop, and a department store, where shadowrunners might encounter all kinds of challenges. Each map is keyed on one side, while the other provides floor plans that can be given to players clever enough to find them. The book also provides information on who runners are likely to meet at each location, security at those locations, and plot hooks to help gamemasters involve the players at each spot.',
			gameDate: '2074',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26501 - Sprawl Sites - High Society and Low Life.pdf',
					size: '7831176',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26651',
		{
			sku: ['26651'],
			category: 'sourcebook',
			type: 'digital',
			name: '10 Jackpointers',
			releaseDate: ['2010-03'],
			description: 'Everyone\'s Watching Everyone.\nThe problem with keeping files about ne\'er-do-wells is they\'re a curious and clever lot. Curious and clever enough to pilfer those files from the corporate compiler, repost them, and add their own commentary-providing a level of meta-information like you\'ve never seen before. Get the scoop on Jackpoint-posters like Kay St. Irregular, Ecotope, Man-of-Many-Names, and Turbo Bunny.\nRemember: not everything you read is true. When the two sources of information are Horizon and Jackpoint ... all bets are off.\nThe Jackpointers presented in this download are: Baka Dabora, Ecotope, Fianchetto, Kay St. Irreggular, Lei Kung, Lyran, Man-of-Many-Names, Orbital DK, Riser, and Turbo Bunny. Each has a 2 or 3 page profile.',
			gameDate: '2072-03',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26651 - 10 Jackpointers.pdf',
					size: '3112574',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26602',
		{
			sku: ['26602'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Manhattan: The Rotten Apple',
			releaseDate: ['2009-03'],
			description: 'Dominated by the Manhattan Development Consortium (MDC), the City represents the largest contiguous corporate enclave in the Sixth World. This volume grants a look into the neighborhoods of Manhattan, the constant scrutiny of its security, and the activities of the thirteen corporations that oversee its development.\nThis setting is a crucial part of the New York City Shadowrun Missions campaign. This 32-page volume serves as a guide to players so that they can prepare their characters to deal with the finer details of the setting. Gamemasters are also well suited to use this book, as it grants them a deeper insight into the neighborhoods of Manhattan than can be provided in scenarios.',
			gameDate: '2072-10',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26602 - Manhattan - The Rotten Apple.pdf',
					size: '6962394',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S017',
		{
			sku: ['26S017'],
			category: 'sourcebook',
			type: 'digital',
			name: 'The Way of The Samurai',
			releaseDate: ['2013-01'],
			description: 'They are legends. They are dangerous. They are feared. They are to be avoidedâunless you have one of them on your side. They are street samurai. That title covers a variety of skill sets, from the accuracy to nail a target from a thousand meters away to the stealth needed to sneak into a tightly guarded environment and cut someoneâs throat before theyâor their securityâknow youâre there. Street samurai know they need to use every tool at their disposal if they want to maintain that all-important edge on their competition. Luckily, some new tools just became available.',
			gameDate: '2075-01',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26S017 - The Way of The Samurai.pdf',
					size: '2877812',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S032',
		{
			sku: ['26S032'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Aetherology',
			releaseDate: ['2014-11'],
			description: 'There are waking dreams, there are active hallucinations, there are feverish visions that cannot be classified. And then there are the metaplanes, an adrenaline-fused combination of all of these, and more. Everything you dream of, everything you fear, everything beautiful and everything grotesque can be found out there. If you travel to the planes, you may lose your life, lose your mind, or if youâre lucky, just lose your way. But you may find hidden secrets of magic and perhaps make powerful allies. Itâll be a change from everyday life in the sprawls of the Sixth World, but may well be worth it. Are you ready for something entirely different?',
			gameDate: '2076-04',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26S032 - Aetherology.pdf',
					size: '5767050',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S026',
		{
			sku: ['26S026'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Montreal 2074',
			releaseDate: ['2012-12'],
			description: 'Bikers and go-gangs roam the streets of Montreal in 2074. Organized crime outfits struggle for territory. And neo-anarchists add spice and danger to the streets. All this would seem to be nothing more than lawless chaos except for one thingâmoney. Cheap real estate and savvy moves by the megacorporations have brought some cash into town, and a new city is being built on the remains of the old. And as every runner knows, when you shine the light of money onto the darkness of a ruined city, you get one thing: shadows.\nMontreal 2074 gives adventurous runners the chance to take their talents to a new locale, doing business on the isle of Montreal. Whether they are dodging the gangs of the West Island or looking to bargain with the Mafiosi of Saint Leonard, runners will find plenty of opportunities in Montreal. They just need to make sure they donât end up as part of the piles of rubbleâand they also need to watch out for the fast, brutal group known as Les FrÃ¨res Chasseurs.\nMontreal 2074 contains information on neighborhoods, gangs, and activities that bring the city to life in the Sixth World setting. With plot hooks and NPC stats, the book provides everything players and gamemasters need to take a trip to the Great White North.',
			gameDate: '2074-12',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26S026 - Montreal 2074.pdf',
					size: '2544513',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S034',
		{
			sku: ['26S034'],
			category: 'sourcebook',
			type: 'digital',
			name: '10 Mercs',
			releaseDate: ['2013-02'],
			description: 'Hired guns. People without a country who know no loyalty. Opportunists, bottom-feeders, scavengers, vultures. Soldiers without a soul who will go to the worst hells on Earth and do just about anything for a buck.\nThatâs how they talk about mercenaries. But thatâs how they talk about shadowrunners, too.\nThereâs a fine line between mercenaries and shadowrunners, and itâs a line that gets crossed repeatedly. Sometimes runners will find themselves in the battlefield, working with a mercenary group and doing their best to survive as all kinds of fire rain down on their heads. Other times, theyâll find themselves in the sights of a skilled and deadly mercenary corps, trying to stay alive against superior numbers and firepower.\nEither way, they should know about the mercenary units out there, to either improve their bargaining position or help them stay alive. 10 Mercs profiles ten different mercenary outfits, including Ryan Mercuryâs New Assets, the unconventional skill of Bravo Company, and the deadly magic of Task Force Magus. These groups present an array of threats or a bounty of opportunitiesâdepending on which end of the barrel youâre at.\nAlong with the unit profiles, 10 Mercs provides NPC stats for each unit along with information on vehicles used by many of the units. If mercenaries are going to play a role in your campaign, 10 Mercs is a critical resource for adding flavor, plot hooks, and rules to your Shadowrun game.',
			gameDate: '2075-06',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26S034 - 10 Mercs.pdf',
					size: '4664215',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S033',
		{
			sku: ['26S033'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Parazoology 2',
			releaseDate: ['2013-08'],
			description: 'Natural Born Killers!\nSome shadowrunners long to escape the dirt and danger of the Sixth Worldâs sprawls for the supposed peace and tranquility of nature. Thing is, the ones that actually try it generally find themselves quickly scurrying back to the city once they discover whatâs waiting for them out there in the wild. From the sharp-toothed, lightning-fast ammit to the sneaky, venomous greater dancing white lady, nature in the Sixth World is full of ways to kill the unsuspecting and incautious.\nParazoology 2 is here to make sure shadowrunners are prepared for the dangers that lie in wait. With full details on dozens of Sixth World critters as well as firsthand accounts of encounters with mysterious creatures in their natural habitats, Parazoology 2 is a critical book for runners making their way into the wildsâeven if that means the dark alleys just down the road.',
			gameDate: '2075-08',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26S033 - Parazoology 2.pdf',
					size: '3211423',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S025',
		{
			sku: ['26S025'],
			category: 'sourcebook',
			type: 'digital',
			name: 'The Land of Promise',
			releaseDate: ['2012-09-05'],
			description: 'TÃ­r Tairngire has changed. The predominantly elven nation has an ork at its head, and the residents have become more welcoming to outsiders, in the sense that they donât always immediately threaten to shoot them when they come in sight.\nThere is enough wealth and power in TÃ­r Tairngire to make even the slightest crack in the nationâs faÃ§ade tempting. Every shadowrunner knows that elves, especially powerful elves, do not rank high on the trustworthiness scale, but that doesnât have to be a deal breaker.\nAnticipating lies and betrayals from the people runners work with is part of the game. Runners should just be sure to gather critical information about getting in to the TÃ­r, the major cities, and the dominant personalities before they go in, since forewarned is forearmed.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/26S025 - The Land of Promise.pdf',
					size: '1628556',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S019',
		{
			sku: ['26S019'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Used Car Lot',
			releaseDate: ['2012-06'],
			description: 'It\'s nice when you can spend the time and the money to pick the exact right vehicle to suit your needs, but time and money are two luxuries shadowrunners don\'t always have. Sometimes you need just two characteristics in a vehicle: It\'s cheap, and it moves.\nUsed Car Lotprovides an assortment of vehicles for Shadowrun so that runners can have plenty of options, from the practical, affordable Ford Americar to the ridiculously luxurious Rolls Royce Phaeton. Motorcycles, sports cars, limousines, and trucks, and moreâthey\'re all here. A lot of the vehicles here may not be state-of-the-art, but they\'ll get you from point A to point B, they may help you blend in with the rest of the populace, and they\'ll save you a few nuyen while you\'re at it. Because a good shadowrunner knows how to use fancy toys, but a great shadowrunner knows how to be awesome with simpler tools.',
			gameDate: '2074-02',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26S019 - Used Car Lot.pdf',
					size: '3030357',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S018',
		{
			sku: ['26S018'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Euro War Antiques',
			releaseDate: ['2013-05'],
			description: 'This is the way it worksâif you want to know what the main cause of World War II was, look at World War I. If you want to understand the United States of America in the late twentieth century, make sure you understand the Vietnam War and all of its ramifications. The point is this: Even if you didnât fight in a war, even if you werenât born when the war started, the conflicts still shape the world you live in. They shape you.\nThe hottest flames of the Euro Wars have faded, but the embers still burn. Whether itâs tanks, missiles, planes, or guns from that conflict that are still in use today, or people in the shadows who carry old grudges and dark secrets, the impact of the Euro Wars remains strong in the Sixth World.',
			gameDate: '2075-02',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26S018 - Euro War Antiques.pdf',
					size: '4511077',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S024',
		{
			sku: ['26S024'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Sim Dreams and Nightmares',
			releaseDate: ['2013-03'],
			description: 'The Sixth World is full of seductions, and perhaps no siren song is sweeter than that of simsense. Feel the rush of new love without the work of having to date another person. Skydive from the upper reaches of the atmosphere without leaving your couch. Experience every emotion humans are capable of feeling, and do it with a greater intensity than most humans will ever feel. Just donât spend too much time wondering what itâs doing to your brain.\nAlleys and backrooms of every major sprawl in the world are littered with better-than-life junkies who can do nothing but think about their next fix. Reality is nothing more a pale shadow of the vitality and energy they experience with the right chips and downloads. Their need is deepâwhich, in the hallowed tradition of the Sixth World, means they are ripe for exploitation.',
			gameDate: '2074-12',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26S024 - Sim Dreams and Nightmares.pdf',
					size: '1546116',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S020',
		{
			sku: ['26S020'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Parageology',
			releaseDate: ['2012-11'],
			description: 'When youâre a shadowrunner, you look for every ally you can get, any advantage you can grab. Which means that if the ground beneath your feet can either help you or hurt the other guy, youâre going to find a way to make that happen.\nThe earth is full of magic. Mana lines wriggle and writhe in different locales, and strange elements bubble up from the core of the planet. Some areas boost magic to seemingly impossible heights, while others drain it away, sucking mana into nothingness. There are powers out there, just waiting for you to call onâpowers that may also be waiting to swallow you whole.',
			gameDate: '2074-11',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26S020 - Parageology.pdf',
					size: '9165295',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7214',
		{
			sku: ['7214'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Target: UCAS',
			releaseDate: ['1997-06'],
			description: 'HOW MANY DIFFERENT WAYS CAN THINGS GO WRONG?\nUCAS, 2058. Less than a year earlier, the great dragon Dunkelzahn had stunned the world by being elected president. Then stunned the world again by dying on his inauguration day. The unrest unleashed by that event hasnât faded, and itâs not like everything else in the UCAS is going well. Travel to three of the nationâs great cities, and youâll find plenty of trouble to go around.\nIn Boston, Richard Villiers of the Fuchi Corporation gained a fair amount of stock from Dunkelzahnâs will, but he also lost his head of security to Renraku. Heâs feeling both powerful and insecure, which is bad news for the cityâs powers that be but great news for the shadows. Meanwhile, in Detroit, everyone and their Doberman are lining up against Damien Knight and Ares, and Knight is going to have to scramble to keep his power. And in Chicago, a nuke and an astral âdiseaseâ supposedly cleaned the town up, so the Chicago Containment Zone is open. Outsiders can get inside the core city nowâand whatever is inside can get out.\nTarget: UCAS takes Shadowrun players back to one of the most tumultuous years in the Sixth Worldâs history, providing the information they need to pull off runs in each of these three key cities. Ghouls and bug spirits await, but theyâre nothing compared to the fiends that wear suits.',
			gameDate: '2058-02',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7214 - Target UCAS.pdf',
					size: '44127981',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7213',
		{
			sku: ['7213'],
			category: 'sourcebook',
			type: 'scan',
			name: 'AztlÃ¡n',
			releaseDate: ['1995-07'],
			description: 'Secret Leaders\n\nCorporate Government\n\nTight Borders\n\nConstant War\n\nStrange Magic\n\nOnly one place has it all in 2056 -- Aztlan, the world\'s only corporate nation.\nBuilt on the drug trade, consolidated country by country through ruthless business deals, run by a powerful and mysterious corporation and sustained by a national faith in the Aztec gods, Aztlan can be a runner\'s greatest dream or his most chilling nightmare. For at the heart of war-torn Aztlan lies Aztechnology, a potential mother lode of paydata and newtech, and an almost certain source of death. Listen carefully to the rumors and judge for yourself which are true or falseâAztlan guards its secrets well, and Aztechnology will kill to keep it that way.',
			gameDate: '2056-05',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7213 - AztlÃ¡n.pdf',
					size: '66537927',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7216',
		{
			sku: ['7216', '10657', '25009'],
			category: 'sourcebook',
			type: 'scan',
			name: 'New Seattle',
			releaseDate: ['1999-03', '2003', '2005-02'],
			description: 'Seattle\'s got it all: movers and shakers from all of the megacorporations, high-stakes political conflicts and even vicious mob wars--and it\'s surrounded by hostile countries! Every runner and wannabe comes to Seattle to learn their chops, hone their skills and make those big scores.\nNew Seattle takes the players on a tour of the most exciting city in the world of 2060. Each section of Seattle contains information on gangs, corporations, politics, hideouts, major players, criminal organizations and everything else players and gamemasters need to create both straightforward adventures and complex campaigns.',
			gameDate: '2060',
			edition: 3,
			publisher: ['fasa', 'fanpro'],
			files: [
				{
					path: './Sourcebooks/7216 - New Seattle.pdf',
					size: '51194536',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7215',
		{
			sku: ['7215'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Target: Smuggler Havens',
			releaseDate: ['1998-04'],
			description: 'Where can you sell body parts to voodoo priests? Where do Siberian shapeshifters buy military goods? What weird experiments are going on in corporate aquashperes? Where do t-bird smugglers hide from the military patrols? Learn the skinny here, chummer.\nThe Target: Smuggler Havens sourcebook allows you to jump right into the exciting cities of New Orleans and Vladivostok. It contains a wealth of information on smuggling, including adventure frameworks for new locations, rules for t-bird smuggling and border partols, free voodoo spirits, and information on awakened Siberia. Target: Smuggler Havens is intended for gamemasters and players of all experience levels. For use with Shadowrun.',
			gameDate: '2059-02',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7215 - Target Smuggler Havens.pdf',
					size: '41207932',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7212',
		{
			sku: ['7212'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Denver: The City of Shadows',
			releaseDate: ['1994-11'],
			description: '"Face your fraggers, Denver is a sub-divided, pain-wracked, schizophrenic, self-serving, epileptic, sado-mazochistic haven for the divinely warped.\nAnd I love each and every one of you bitter, thrice-damned souls."\n-- Right Reverend Donald R. Byrne, New Church of the Final Unction',
			gameDate: '2055-05',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7212 - Denver - The City of Shadows.pdf',
					size: '70112579',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7209',
		{
			sku: ['7209'],
			category: 'sourcebook',
			type: 'scan',
			name: 'California Free State',
			releaseDate: ['1996-03'],
			description: 'Which California are you comin\' to for biz, chummer? The Central Valley, ground zero of the water wars between small farmers and big corps? Green-and-gorgeous Northern California, with a thousand mutually hostile small towns and crack Tir troops stepping right up to the tripwire? Or try your luck along the Big Sur coastline-you can either die from environmental poisons or get carved into tiny pieces by the pirates and smugglers who own the palce. How about Los Angeles, where rich simsense stars and even richer producers live just the other side of a plascrete wall from starving ork kids and strug-out chip heads?\nStill think the Golden State is a great place for a shadowrun?',
			gameDate: '2057-01',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7209 - California Free State.pdf',
					size: '36668069',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7208',
		{
			sku: ['7208'],
			category: 'sourcebook',
			type: 'scan',
			name: 'The Neo-Anarchist\'s Guide to Real Life',
			releaseDate: ['1992-10'],
			description: 'Grab the kids! Hide the wife! The Neo-Anarchists are back!\nThis time, those fun-loving Anarchists speak out on everything from transorbital travel and security systems to coffin motels and fast food. Nothing is sacred, profanity reigns, and there\'s more data than you can shake a chip at.\nThe Neo-Anarchist\'s Guide to Real Life provides useful information about the Shadowrun world in a fictionalized format along with new, specific game systems for each of the subjects covered.',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7208 - The Neo-Anarchists Guide to Real Life.pdf',
					size: '42887008',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7211',
		{
			sku: ['7211'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Tir na nÃg',
			releaseDate: ['1993-09'],
			description: 'The land of faery,\nWhere nobody gets old and godly and grave,\nWhere nobody gets old and crafty and wise....\n- W.B. Yeats, "The Land of Heart\'s Desire"\n\nTir na Nog, the Land of Youth. Long protected by a powerful Veil, the former nation of Ireland now stands revealed in its Awakened power. Who are its masters? Where did they come from? And what does its emergence hold for the world of 2054?',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7211 - Tir Na Nog.pdf',
					size: '68780604',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7210',
		{
			sku: ['7210'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Tir Tairngire: The Land of Promise',
			releaseDate: ['1993-05'],
			description: 'Long shrouded in mystery, now one brave voice dares to speak the truth of the Land of Promise, Tir Tairngire. How did it come to be? Who holds its reigns of power? And what does its future hold? The Tir Tairngire sourcebook reveals the Elven Nation for the first time, in all its glory and danger. Journey there and beware.',
			gameDate: '2054',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7210 - Tir Tairngire.pdf',
					size: '41122608',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7219',
		{
			sku: ['7219'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Target: Matrix',
			releaseDate: ['2000'],
			description: 'Can you hack it?\nThe Matrix is for everyone; a worldwide computer network made up of pocket universes and virtual realities. You can make deals in virtual bars, sharpen reactions in game simulations or score new gear from an online store. Deckers and non-deckers alike base most of their lives in the Matrix, the place where information lives and breeds, bought and sold like trinkets on a street corner. In shadowy data havens and behind the brain-frying defense in megacorporate data archives, information is power.',
			gameDate: '2061-08',
			edition: 3,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7219 - Target Matrix.pdf',
					size: '50299910',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27110',
		{
			sku: ['27110'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Seattle Sprawl Digital Box Set',
			releaseDate: ['2016-04'],
			description: 'Itâs the shadowrunning capital of the world for a reason. Seattle offers an unparalleled intersection of corporate, political, and criminal powers. This is where icons are madeâlike the Ancients, the Halloweeners, the Finnigan Crime Family, the Skraacha, Danteâs Inferno, Renraku Arcology, the Big Rhino, and the Alabaster Maiden. And this is where runners like Dodger, Sally Tsung, Dirk Montgomery, Jake Armitage, Twist, Kellan Colt, and James Kincaid made their names, sometimes made their fortunes, and occasionally experienced horrible losses. This is where you go to test your mettle. This is how you show youâre at the top of the heap.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/27110 - Seattle Sprawl/27110 - Seattle Box Instruction Sheet.pdf',
					size: '841094',
					mime: 'application/pdf'
				},
				{
					path: './Sourcebooks/27110 - Seattle Sprawl/27110 - Ruling the Queen City.pdf',
					size: '7217956',
					mime: 'application/pdf'
				},
				{
					path: './Sourcebooks/27110 - Seattle Sprawl/27110 - Tangled Threads.pdf',
					size: '3424217',
					mime: 'application/pdf'
				},
				{
					path: './Sourcebooks/27110 - Seattle Sprawl/27110 - Seattle Sprawl Map.pdf',
					size: '11919433',
					mime: 'application/pdf'
				},
				{
					path: './Sourcebooks/27110 - Seattle Sprawl/27110 - Map Reference Card.pdf',
					size: '702775',
					mime: 'application/pdf'
				},
				{
					path: './Sourcebooks/27110 - Seattle Sprawl/27110 - Emerald Shadows.pdf',
					size: '8290392',
					mime: 'application/pdf'
				},
				{
					path: './Sourcebooks/27110 - Seattle Sprawl/27110 - Character Cards.pdf',
					size: '1809776',
					mime: 'application/pdf'
				},
				{
					path: './Sourcebooks/27110 - Seattle Sprawl/27110 - Map Cards.pdf',
					size: '407422',
					mime: 'application/pdf'
				},
				{
					path: './Sourcebooks/27110 - Seattle Sprawl/27110 - Gang Card.pdf',
					size: '835528',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7207',
		{
			sku: ['7207'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Native American Nations Volume Two',
			releaseDate: ['1991-12'],
			description: 'Eye of the Eagle\nSeattle isnât the only place where danger lurks. Conspiracy also grows to the north, threatening to tear the Tsimshian Nation apart and shatter its government. The radicals behind it are willing to die for their cause. Their tools are the weapons of terror: violence, fear, chaos and the ultimate weapon, something so dark and terrible it should have been left buried.',
			gameDate: '2051',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7207 - Native American Nations Volume Two.pdf',
					size: '39987759',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7118',
		{
			sku: ['7118'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Corporate Security Handbook',
			releaseDate: ['1995-05'],
			description: 'Think corps security means a donut-snarfing security guard and a high fence? Think again, chummer! You want inside the corp enclaves, first get past the security wage mages, drek-hot deckers, and really big guys with really big guns ... plus a few hellhounds and watcher spirits just to keep you on your toes. The blackest ice, the toughest barriers, and the trickiest booby traps are just waiting for you to make one mistake ... your last! Want to survive your next run against the megacorps? Read this book and learn how they\'ll try to stop you. Once you know how the enemy thinks, you\'ve won the first battle.',
			gameDate: '2055-09',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7118 - Corporate Security Handbook.pdf',
					size: '42071607',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7117',
		{
			sku: ['7117'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Bug city',
			releaseDate: ['1994-12'],
			description: 'For years, a shadow war has raged against the Universal Brotherhood and its savage masters -- parasitic insect spirits that feed on human hosts. Now, Chicago has become the final battleground in the war against the bugs. Overrun by the horrible predators, the city has been quarantined by the UCAS military, leaving its inhabitants to fend for themselves while "other solutions" are considered. Hundreds of thousands remain trapped within the walled Containment Zone, at war with brutal gangs and ruthless warlords that rage unchecked -- and the unnatural menance that threatens them all.',
			gameDate: '2055-08',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7117 - Bug city.pdf',
					size: '52847190',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7120',
		{
			sku: ['7120'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Awakenings: New Magic in 2057',
			releaseDate: ['1995-12'],
			description: '"Used to be, magic was pretty simple. Well, OK, not simple exactaly... but you knew where people stood with it. A magician was either a guy in the robes with the formulas or the guy summoning spirits in the wild with the bearskin and the rattle.\nNow the guy next door to me says he\'s a houngan practicing some mojo called voudoun. The kid down the block slings his juju based on an old flat-vid superhero show. Seems like the longer the Sixth World coes on, the more there is to learn about how magic works. And believe me, you\'d better learn it--\'cause in this biz, what you don\'t know can kill you."\n--Not Horatio, troll magician, Street Lectures Online',
			gameDate: '2057-01',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7120 - Awakenings.pdf',
					size: '65045925',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7119',
		{
			sku: ['7119'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Cybertechnology',
			releaseDate: ['1995-09'],
			description: 'Want a little edge in that street fight? A little flash? A little chrome in street-light to make the punks think twice? Then take a look inside these pages. Cybertechnology tells you everything you want to know about the latest, wizzest, and handiest cyberware. Learn what works and why. From cybereye laser sights to move-by-wire systems that can make you the fastest and deadliest thing on two feet, Cybertechnology has it all.\nAnd then there\'s cybermancy, for the real hard-core street samurai. Cybermancy gives you edge in spades... if you can pay the price. How much cyberware can a body take before it\'s no longer human? Cybermancy pushes that limit beyond your wildest dreams. This combination of state-of-the-art magic and technology can make you a virtually unstoppable cyborg, more metal than flesh. Of course, there are a few side effects...\nThe Cybertechnology sourcebook describes new cyberware, accessories, and enhancements, and offers optional and expanded rules for dealing with cyberware in all types of situations. The book also contains complete cybermancy rules and new archtypes, including cyborgs.',
			gameDate: '2056-03',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7119 - Cybertechnology.pdf',
					size: '26691133',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7116',
		{
			sku: ['7116'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Prime Runners',
			releaseDate: ['1994-10'],
			description: 'When you care enough to run with the very best\nDeckers, Riggers, Terrorists, Newshounds, Fixers, and more. Prime Runners presents forty-one of the best of the shadows, ready to inhabit any Shadowrun campaign. Eachcharacter profile comes complete with alleged background, apparent motivations, rumored history, most-recent description, and as-acurate-as-anyone-can-guess Shadowrun, Second Edition game statistics. From Michael Sutherland, cultured decker-extraordinarie, to the elusive McBean, who seems to have been everywhere and done everything; from Yakusa bosses to hate-mongers to people not quite human, these are the prime runners, the best of the best, with enough plot hooks to snare event the most "been there, killed thet"shadowrunner.',
			gameDate: '2055-03',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7116 - Prime Runners.pdf',
					size: '23523490',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7113',
		{
			sku: ['7113'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Corporate Shadowfiles',
			releaseDate: ['1993-12'],
			description: 'In the world of 2054, money still makes the world go âround, and no one holds more of it than the megacorporations. Unchecked by the laws of any nation and bolstered by private armies of the hottest hitters and cyberjocks money can buy. These giants command commercial empires that span the globe. Constantly competing to increase their all-important profit margins, these behemoths will stop at nothing to achieve their ends and donât care who gets reeked along the way. All fiercely protect their privacy, however, and prefer to wage their wars in the shadowsâmaking them an unending source of biz for the runner.\nCorporate Shadowfiles reveals the secrets of the megacorporations for the first timeâtheir histories, assets, personnel, the works. So if youâre looking for a little background on your corporate clients, or maybe planning that big score that wills et you up for life, open your capture file and read awayâbut be ready to beat feet, âcause the corps will kill to protect this data.',
			gameDate: '2054',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7113 - Corporate Shadowfiles.pdf',
					size: '100649902',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7112',
		{
			sku: ['7112'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Paranormal Animals of Europe',
			releaseDate: ['1993-03'],
			description: 'The glorious creatures of the mythic past and horrors undreamt of dwell in the Europe of 2054. Gargoyles and goblins stalk the streets of London. Centaurs and satyrs roam the countryside. A mysterious and menacing menagerie of creatures, both fearsome and friendly, now populates the European landscape.\nParanormal Animals of Europe is a field guide to these magically awakened creatures. Detailed de',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7112 - Paranormal Animals of Europe.pdf',
					size: '32032584',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7115',
		{
			sku: ['7115'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Lone Star',
			releaseDate: ['1994-06'],
			description: 'TO SERVE AND PROTECT?NGet Actual. Go-gangers, chipmongers, muscleboys--the sprawl breeds \'em all like so vermin. And the first lesson any cop learns is frag them before they frag you.\nWelcome to the world of lone star.\nSome call \'em civilization\'s last hope against anarchy--but anyone in the know will tell you they\'ve simply the world\'s biggest street gangs--a bunch of bullboys with badges, armed with the most novahot hardware money can buy.',
			gameDate: '2054',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7115 - Lone Star.pdf',
					size: '30829906',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7114',
		{
			sku: ['7114'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Fields of Fire',
			releaseDate: ['1994-04'],
			description: 'The streets are a violent place, as dangerous as any battlefield. And the lessons men and women learn on those fields of fire can save their reputations-and their lives-in any combat situation.\nFields of Fire is the mercenary sourcebook for Shadowrun. Information on how to act like a professional merc, and pages of new weapons, support gear, and optional combat-rules clarifications and expansions make this book something no merc, or runner, should live without.',
			gameDate: '2054',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7114 - Fields of Fire.pdf',
					size: '6393877',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7121',
		{
			sku: ['7121'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Threats',
			releaseDate: ['1996-06'],
			description: 'They\'re out there, chumlies. You know they\'re out there -- the puppeteers who pull the strings on everybody from CEO Damien Knight to the scroffiest born-yesterday street rat. I\'m talking bug spirits you can\'t tell apart from human beings ... magical cabals who want to make us all slaves in their mage-o-cratic utopia ... hate groups so powerful they make the megacorps look like kiddie crooks ... artificial intelligences jerking our chains from so deep inside the Matrix that the hottest decker can\'t reach them. They\'re taking over the world -- and NO ONE CAN STOP THEM. In fact, you just might be working for them right now ...',
			gameDate: '2057-01',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7121 - Threats.pdf',
					size: '44014523',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7203',
		{
			sku: ['7203'],
			category: 'sourcebook',
			type: 'scan',
			name: 'London Sourcebook',
			releaseDate: ['1991-09'],
			description: 'From the chaos of grater London to the majesty of the Welsh Wild Lands and the fey court of Rhiannon Glendower of Snowdonia, the lands of the modern United Kingdom are shrouded in power and mystery. The nobility, megacorporations, and ruling druidic government are all locked in an intrincate dance of domination as the land itself fights against the toxic death man has brought her. Here, magic reigns, oppression rules, and the shadows run black and deep. Welcome to she Smoke, term. It\'s party time.',
			gameDate: '2051',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7203 - London Sourcebook.pdf',
					size: '58027843',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7202',
		{
			sku: ['7202'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Native American Nations Volume One',
			releaseDate: ['1991-05'],
			description: 'Over thirty years ago, the violent formation of the Native American Nations shattered the United States of America and altered the geo-political boundaries of North America. Now, someoneâs setting out to prove that turn-about is not fair play and to bring about a little change of their own. Is it payback? Or something deeper? Regardless, itâs a mad chase through the Native American Nations, full of the chaos one expects in a Shadowrun adventure.',
			gameDate: '2051',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7202 - Native American Nations Volume One.pdf',
					size: '81919603',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7206',
		{
			sku: ['7206'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Neo-Anarchist\'s Guide to North America',
			releaseDate: ['1991-05'],
			description: 'See the sights!\nTake a tour of North America with the slightly warped. Learn the ins and outs of major cities like Atlanta, Chicago, Dallas/Fort Worth, New York, San Francisco, and Washington D.C. Make your next vacation an exciting one, one theyâll never forget.\nThe Neo-Anarchistâs Guide to North America details the countries, states, and politics of Shadowrunâs North America. This sourcebook covers the laws, relative costs of goods, what to smuggle and to whom, corporate activity, whoâs bought whom and just what are they really up to, and life in general and how to screw it up in style.',
			gameDate: '2051',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7206 - Neo-Anarchist\'s Guide to North America.pdf',
					size: '35777155',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7204',
		{
			sku: ['7204'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Germany Sourcebook',
			releaseDate: ['1994-02'],
			description: 'Forged in the chaos of the Awakening and the Euro-Wars, the German Alliance is a land torn by strife, rebellion, political turmoil and powerful magic. From the towering glass-and-chrome skyscrapers of Frankfurt to the anarchy of Berlin, from the GreenWar camps of the Rhine-Ruhr megaplex to the Troll Kingdom of the Black Forest, 21st-century Germany teems with opportunities and unseen dangers for the shadowrunner.',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7204 - Germany Sourcebook.pdf',
					size: '87375019',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'10708',
		{
			sku: ['10708'],
			category: 'sourcebook',
			type: 'print',
			name: 'Deutschland in den Schatten',
			releaseDate: ['1993'],
			description: 'Forged in the chaos of the Awakening and the Euro-Wars, the German Alliance is a land torn by strife, rebellion, political turmoil and powerful magic. From the towering glass-and-chrome skyscrapers of Frankfurt to the anarchy of Berlin, from the GreenWar camps of the Rhine-Ruhr megaplex to the Troll Kingdom of the Black Forest, 21st-century Germany teems with opportunities and unseen dangers for the shadowrunner.',
			gameDate: '2053',
			edition: 2,
			publisher: ['fanpro'],
			missing: true,
			notes: 'The US version underwent some changes in regards to the original German version. Here is a list of the most important changes. Missing in the US version: Introductory short story (about 10 pages), Hamburg Chapter (about 18 pages), New Gear (about 10 pages), Chapters on organized crime, connections, and archetypes (about 12 pages total)'
		}
	],
	[
		'10738',
		{
			sku: ['10738'],
			category: 'sourcebook',
			type: 'print',
			name: 'Die LÃ¤nder der Verheissung',
			releaseDate: ['1998'],
			description: 'Tir Tairngire\n\nTÃ­r na nÃg\n\nPomorya\n\nDies sind die klingenden Namen der Staaten, die Elfen fÃ¼r sich und ihresgleichen grÃ¼ndeten. Sie klingen jedoch unterschiedlich, ja nachdem, wer sie hÃ¶rt.\nFÃ¼r die einen sind sie wahrhaft LÃ¤nder der Verheissung, wo, frei von Rassismus und UnterdrÃ¼ckung, die Elfen und andere Metarassen den Weg gehen kÃ¶nnen, der ihnen bestimmt ist.\nFÃ¼r andere jedoch haben diese Namen einen unangenehmen Unterton. Wie sieht er denn aus, der vorbestimmte Weg der Elfen? Ist es das Leben im Einklang mit der Natur oder der Versuch einer heimlichen Weltherrschaft? Ist das Leben in diesen LÃ¤ndern frei, oder tauscht man nur die eine UnterdrÃ¼ckung gegen die andere, subtiler vielleicht, aber um so stÃ¤rker? Wer sind die wahren Herrscher dieser LÃ¤nder, und was ist dran an den GrÃ¼chten Ã¼ber unsterbliche Elfen?\nDie Wege, die diese drei LÃ¤nder gewÃ¤hlt haben, sind unterschiedlich, doch Gemeinsamkeiten sind unÃ¼bersehbar. Ganz gleich, ob Runner in diesen LÃ¤ndern arbeiten, ob nur eine Spur dorthin fÃ¼hrt oder ob Herr Schmidt behauptet, in ihrem Namen zu handeln. Gegen die Intrigen eines Elfenhofes machen sich MachtkÃ¤mpfe im Aufsichtsrat eines Megakons aus wie ein gemÃ¼tlicher Plausch zum Tee. Kein Runner kann es sich leisten, unvorbereitet zu sein.\nDie LÃ¤nder der VerheiÃung enthÃ¤lt die wesentlichen Teile der Originalausgaben von Tir Tairngire, TÃ­r na nÃg und als WelterstverÃ¶ffentlichung die Betrachtung Pomoryas, des deutschen Elfenstaates.',
			gameDate: '2053',
			edition: 2,
			publisher: ['fanpro'],
			missing: true,
			notes: 'The German version of The Lands of Promisse, contains the elemental parts of the original issues of Tir Tairngire, TÃ­r na nÃg and as a world first publication a view into Pomorya, the german elvenstate.'
		}
	],
	[
		'10728',
		{
			sku: ['10728'],
			category: 'sourcebook',
			type: 'print',
			name: 'Nordamerika-Quellenbuch',
			releaseDate: ['1997'],
			description: '',
			gameDate: '2053',
			edition: 2,
			publisher: ['fanpro'],
			missing: true,
			notes: 'Combines material of NAN 1 and 2 as well as the Neo-Anarchists Guide to North America into one volume. Not included are the NAN-adventures and some portions of the Neo-Anarchists Guide to North America.'
		}
	],
	[
		'10723',
		{
			sku: ['10723'],
			category: 'sourcebook',
			type: 'print',
			name: 'Real-Life: Der Neo-Anarchisten ReisefÃ¼hrer ins wahre Leben',
			releaseDate: ['1997'],
			description: '',
			gameDate: '2053',
			edition: 2,
			publisher: ['fanpro'],
			missing: true,
			notes: 'This is the German translation of the The Neo-Anarchist\'s Guide to Real Life sourcebook for Shadowrun, 2nd Edition. It misses two chapters of the original publication ("One-way Communication" and "Guarding the Till")'
		}
	],
	[
		'10717',
		{
			sku: ['10717'],
			category: 'rulebook',
			type: 'print',
			name: 'Rigger Handbuch',
			releaseDate: ['1996'],
			description: 'Motoren heulen, Reifen quietschen, SchÃ¼sse peitschen ...\n... Zeit fÃ¼r den Rigger.\nKein Runner-Team kommt ohne einen Rigger aus. Er kontrolliert die Fahrzeuge, die dem Team UnterstÃ¼tzung und Ãberwachung liefern - und oft ist der Rigger die letzte MÃ¶glichkeit zur Flucht, wenn sich die Chancen gegen die Runner stellen. Das macht den Rigger ebenso wichtig wie den StraÃensamurai oder den Kampfmagier. Und kein Rigger kommt ohne seine Fahrzeuge daher ...\nDas Rigger Handbuch beschreibt alle mÃ¶glichen Arten von Fahrzeugen, vom Vollplastik-Elektromotorrad bis hin zur tÃ¶dlichen Kanpfdrohne (und jede Menge Typen dazwischen), dazu alle nÃ¶tigen Regeln, um aus einem harmlosen Serienfahrzeug den chromglÃ¤nzenden, sensorenbestÃ¼ckten und waffenstarrenden Hochgeschwindigkeitstraum eines jeden Riggers zusammenzubauen.',
			gameDate: '2053',
			edition: 2,
			publisher: ['fanpro'],
			missing: true,
			notes: 'The Rigger Handbuch is the german version of Rigger Black Book updated to the rules of the 2nd edition of Shadowrun. It also contains additional vehicles from other sourcebooks that had been published between the original release of the Rigger Black Book and 1996, for example Corporate Security Handbook and Fields of Fire.'
		}
	],
	[
		'10730',
		{
			sku: ['10730'],
			category: 'mission',
			type: 'print',
			name: 'Schattenlichter',
			releaseDate: ['1997'],
			description: 'Langeweile? Keine Kohle mehr? Leerlauf? Arbeitslos? Dann wird\'s mal wieder Zeit, in die Schatten abzutauchen und fÃ¼r Abwechslung zu sorgen! Euer Schieber kann euch zur Zeit vier nette Jobs in Deutschland und der Schweiz anbieten:\nDas Buch der HÃ¶lle fÃ¤ngt scheinbar harmlos an, entwickelt sich aber nach einigen Tagen zu einem echten HÃ¶llentrip. Wer da magisch nichts drauf hat, kann sich direkt ein sonniges PlÃ¤tzchen am Styx reservieren lassen!\nUmcir fÃ¼hrt (genauso harmlos) in die Schweiz, um eine Person ausfindig zu machen. Falls ihr jetzt an ruhige Klettertouren in den Alpen und gemÃ¼tliche Tage in einem schweizer Kurhotel denkt, solltet ihr euch ernsthaft Gedanken Ã¼ber euren Ruhestand machen...\n12 Stunden Zeit habt ihr, um einen Kurierjob zu erledigen. Runner, die es mit der PÃ¼nktlichkeit nicht so genau nehmen, kÃ¶nnten dabei schon mal den Kopf verlieren. Oder wisst ihr etwa nicht, wie Cortexbomen funktionieren?\nFestlichkeiten sind ja eigentlich etwas schÃ¶nes - vorausgesetzt, der Anlass zum Feiern geht einem nicht gegen den Strich. Dann ist Ãrger vorprogrammiert!\nSchattenlichter ist ein Abenteuerband zu Deutschland in den Schatten und Chrom und Dioxin, den Shadowrun-QuellenbÃ¤nden zu Deutschland und der Schweiz in den 2050ern. Beide genannten BÃ¤nde sind zum Durchspielen und Leiten der Abenteuer nicht unbedingt nÃ¶tig, aber ausgesprochen empfehlenswert.',
			gameDate: '2053',
			edition: 2,
			publisher: ['fanpro'],
			missing: true,
			notes: 'A German adventure book with 4 short-adventures.'
		}
	],
	[
		'10709',
		{
			sku: ['10709'],
			category: 'mission',
			type: 'print',
			name: 'Schlagschatten',
			releaseDate: ['1993'],
			description: '',
			gameDate: '2053',
			edition: 2,
			publisher: ['fanpro'],
			missing: true,
			notes: '"Schlagschatten" (Drop Shadow) is a German Shadowrun adventure collection set in the Germany of 2053. It contains three adventures.'
		}
	],
	[
		'10757',
		{
			sku: ['10757'],
			category: 'sourcebook',
			type: 'print',
			name: 'Bedrohliche 6. Welt',
			releaseDate: ['2003'],
			description: '',
			gameDate: '2062',
			edition: 3,
			publisher: ['fanpro'],
			missing: true,
			notes: 'This sourcebook is the German translation of two original Shadowrun titles: Threats and Threats 2'
		}
	],
	[
		'22004',
		{
			sku: ['22004'],
			category: 'mission',
			type: 'print',
			name: 'Brennpunkt: ADL',
			releaseDate: ['2004'],
			description: 'Brennpunkt: ADL erlaubt einen Blick hinter die Kulissen der Allianz deutscher LÃ¤nder, von dem Parteien- und Regierungssystem der Allianz und ihrem Justizapparat Ã¼ber die verschiedenen WWege der Magieund den Jagd- und DomestitzierungsmÃ¶glichkeiten bei hiesigen Crittern bis zu den aktuellen Sport- und Medientrends, und gibt Einblickin die wichtigsten Subkuluren der AllianzlÃ¤nder. Diese Informationen fÃ¼llen den Hintergrund der ADL weiter aus und geben Spielleitern wie Spielern viele neue MÃ¶glichkeiten und Ideen an die Hand.',
			gameDate: '2063',
			edition: 3,
			publisher: ['fanpro'],
			missing: true,
			notes: 'Shadowrun Campaign setting Germany 2063'
		}
	],
	[
		'10753',
		{
			sku: ['10753'],
			category: 'sourcebook',
			type: 'print',
			name: 'Deutschland in den Schatten II',
			releaseDate: ['2001'],
			description: '',
			gameDate: '2062',
			edition: 3,
			publisher: ['fanpro'],
			missing: true,
			notes: '"Deutschland in den Schatten II" (Germany in the Shadows II) is the successor to the Germany Sourcebook. It details the German territories in the year 2062.'
		}
	],
	[
		'10733',
		{
			sku: ['10733'],
			category: 'sourcebook',
			type: 'print',
			name: 'Walzer, Punks & Schwarzes Ice',
			releaseDate: ['1997'],
			description: 'Walzer tanzt man, wenn es Nacht wird in Ãsterreich. Doch in den Schatten der Innenstadt oder im Ghetto der vereinigten Wohnparks kÃ¤mpfen zur gleichen Zeit Menschen um ihr Ãberleben.\nPunks beherrschen die StraÃen Berlins. Doch die Konzerne haben ihre eigenen PlÃ¤ne fÃ¼r das Tor zum Osten Europas, und sie kennen kein Pardon fÃ¼r die, die sich ihren Zukunftsvisionen fÃ¼r eine neue Weltstadt in den Weg stellen.\nSchwarzes Ice sichert die PlÃ¤ne und die Errungenschaften der neuen Spieler auf Deutschlands WirtschaftsbÃ¼hne. Proteus und die Draco-Foundation heiÃen die Machtfaktoren, die noch niemand einzuschÃ¤tzen weiÃ.\nWalzer, Punks & Schwarzes Ice ist ein Quellenband fÃ¼r Shadowrun 2.01D. Er bietet die jÃ¼ngsten Enzwicklungen in der ADL, der Schweiz und einen groÃen Ãstereich-Teil, die VerÃ¤nderungen in Berlin seit dem Ende der Anarchie, neue AusrÃ¼stung und mehr, denn im Jahr 2058 heiÃt Wissen: Ãberleben.',
			gameDate: '2058',
			edition: 2,
			publisher: ['fanpro'],
			missing: true,
			notes: 'Walzer, Punks & Schwarzes Eis is a sourcebook for Shadowrun 2.01D, offering the latest developments in the ADL, the Switzerland and also a huge section about Austria, plus: changes in Berlin since the end of the Anarchy, new equipment and much more. Because in the year 2058 knowledge equals survival.'
		}
	],
	[
		'4829173378',
		{
			sku: ['4829173378'],
			category: 'sourcebook',
			type: 'print',
			name: 'TOKYOã½ã¼ã¹ããã¯',
			releaseDate: ['1996'],
			description: 'Everything about Tokyo in 2054\nFrom the detailed descriptions of each districts, to the Japanese magic and critters.',
			gameDate: '2053',
			edition: 2,
			publisher: ['kadokawashoten'],
			missing: true,
			notes: 'This was the sourcebook of Tokyo and Japan Imperial State in 2050, written by Japanese people.'
		}
	],
	[
		'4829172398',
		{
			sku: ['4829172398'],
			category: 'rulebook',
			type: 'print',
			name: 'ã·ã£ãã¦ã©ã³ ã«ã¼ã«ããã¯',
			releaseDate: ['1992'],
			description: '',
			gameDate: '2050',
			edition: 2,
			publisher: ['kadokawashoten'],
			missing: true,
			notes: 'Japanese translation of the 2nd Edition Shadowrun. Core rules featuring ten additional pages on Tokyo in the shadows. Color pages from the original are included in B/W.'
		}
	],
	[
		'7201',
		{
			sku: ['7201'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Seattle Sourcebook',
			releaseDate: ['1990-04'],
			description: 'Visit Beautiful Seattle, An Interesting Place to Live\nA modern frontier town, sandwiched between the Elven nation of Tir Tairngire and the Native American Nations, Seattle is a place where cultures mixâoften with explosive results.\nA City of Opportunity\nMegacorps with private armies trade in technology and information. Crime bosses rule the underworld of illegal trade, violence, and extortion. There is always plenty of work for people who are willing to get their hands dirty, because the turnover isâ¦brisk.\nFun, Friendly People\nSeattle is home to over 300,000 squatters who are willing to kill their mother for a pair of shoes. Fortunately, most never knew their mothers.\nSightsee Along Our Breathtaking Waterfront.\nJust don\'t stay out after dark. If the Elven street gangs don\'t get you, the city cops will, and maybe just for target practice.',
			gameDate: '2051',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7201 - Seattle Sourcebook.pdf',
					size: '64846368',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7123',
		{
			sku: ['7123'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Underworld Sourcebook',
			releaseDate: ['1997-03'],
			description: 'Honor. Respect. Family.\nThe Underworld Sourcebook describes in detail the "Big Four" international crime syndicates: the Mafia, the Yakuza, the Triads and the Seoulpa Rings. Each syndicate\'s markets, business practices, traditions, histories and secret rituals are revealed, along with loads of informtion on gangs, terorists, assassins and other groups who rule the shadows through no law but their own.\nThe Underworld Sourcebook includes guidelines for building campaigns around organized crime and customizing them for local settings, and alternate campaign rules that allow players to play members of organized crime syndicates. It provides a wealth of adventure hooks, story starters, background information and rules for use in any Shadowrun campaign.',
			gameDate: '2058-01',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7123 - Underworld Sourcebook.pdf',
					size: '38484312',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'10750',
		{
			sku: ['10750'],
			category: 'sourcebook',
			type: 'print',
			name: 'Unterwelt Quellenbuch',
			releaseDate: ['2000'],
			description: 'Ehre. Respekt. Familie.\nOhne diese Werte wÃ¤re ich nicht mehr als Drek - ein verdammter Shadowrunner. Ehre und Respekt - das unterscheidet die "Familie" von dem Abschaum, der verlangt, was rechtmÃ¤Ãig uns zusteht. Schmuggel, Schutzgeldringe, Bordelle... unsere Ahnen vergossen ihr Blut, um diese Imperien zu errichten. Und auch mein Blut wird flieÃen, um die Macht der Familie zu bewahren. SchwÃ¤che ist keine Option. Sie entehrt die Familie. Und wer die Familie entehrt, der bÃ¼Ãt mit seinem Leben.\nWer uns keinen Respekt erweist oder nimmt, was uns gehÃ¶rt, dem schicken wir eine Botschaft. Erst verletzen wir ihn, dann verletzen wie seine GeschÃ¤fte, dann seine Freunde und seine Familie. Und wenn das immer noch nicht reicht... dann tÃ¶ten wir ihn.\nDas Unterwelt-Quellenbuch beschreibt detailliert die "groÃen vier" internationalen kriminellen Organisationen: die Mafia, die Yakuza, die Triaden und die Seoulpa-Ringe. Es vermittelt dem Spielleiter einen tiefen Einblick in die MÃ¤rkte, Unternehmungen und Traditionen der Syndikate und enthÃ¼llt ihre Vergangenheit und ihre geheimen Rituale. DarÃ¼ber hinaus enthÃ¤lt es fÃ¼r Spieler wie Spielleiter ausfÃ¼hrliche Informationen Ã¼ber Gangs, Terroristen, Assassinen und andere Gruppen, die in den Schatten nach ihren eigenen Gesetzen herrschen.\nDas Unterwelt-Quellenbuch bietet dem Spielleiter Richtlinien fÃ¼r die Entwicklung von Kampagnen rund um die organisierte KriminalitÃ¤t sowie ihre Anpassung an unterschiedliche SchauplÃ¤tze. Es gibt ihm umfassende Regeln fÃ¼r alternative Kampagnen an die Hand, in denen die Spielercharaktere groÃen Syndikaten angehÃ¶ren.\nDas Unterwelt-Quellenbuch bietet eine FÃ¼lle von Abenteuer-VorschlÃ¤gen, Kampagnen-Ideen, Hintergrundinformationen und viele neue Regeln fÃ¼r alles Shadowrun-Kampagnen. Dieses Quellenbuch ist fÃ¼r die Verwendung mit Shadowrun 3.01D und den ErgÃ¤nzungsbÃ¤nden Shadowrun-Kompendium: Jenseits der Schatten sowie Schattenzauber 3.01D gedacht.\nAls besonderen Bonus finden Sie in diesem Buch aktuelle Informationen Ã¼ber die Gangs und Syndikate, die in der Unterwelt der ADL den Ton angeben.',
			gameDate: '2060',
			edition: 3,
			publisher: ['fanpro'],
			missing: true,
			notes: 'The Unterwelt Quellenbuch is the german version of the Underworld Sourcebook with additional material about the german underworld.'
		}
	],
	[
		'7122',
		{
			sku: ['7122'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Portfolio of a Dragon: Dunkelzahn\'s Secrets',
			releaseDate: ['1996-10'],
			description: 'Dunkelzahn Assassinated!\n\nStunned World Awaits Dragon\'s Last Will and Testament\n\nOn Inauguration Night 2057, the newly sworn-in President of the UCAS is assassinated--and the Awakened world will never be the same. Dunkelzahn, the powerful and charismatic great dragon, has been murdered by unknown enemies ... but he left behind a Last Will and Testament, a legacy that will change the world. Some will get rich--others will learn that dealings with the dragon can extend beyond the grave. Will Dunkelzahn\'s legacy be a gift to the world ... or a curse?',
			gameDate: '2057-08',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7122 - Portfolio of a Dragon - Dunkelzahn\'s Secrets.pdf',
					size: '15378157',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'22007',
		{
			sku: ['22007'],
			category: 'sourcebook',
			type: 'print',
			name: 'Portfolio eines Drachen: Dunkelzahns Geheimnisse',
			releaseDate: ['2004'],
			description: 'Dunkelzahn Assassinated!\n\nStunned World Awaits Dragon\'s Last Will and Testament\n\nOn Inauguration Night 2057, the newly sworn-in President of the UCAS is assassinated--and the Awakened world will never be the same. Dunkelzahn, the powerful and charismatic great dragon, has been murdered by unknown enemies ... but he left behind a Last Will and Testament, a legacy that will change the world. Some will get rich--others will learn that dealings with the dragon can extend beyond the grave. Will Dunkelzahn\'s legacy be a gift to the world ... or a curse?',
			gameDate: '2060',
			edition: 3,
			publisher: ['fanpro'],
			missing: true,
			notes: 'German Translation of Portfolio of a Dragon: Dunkelzahn\'s Secrets . The German version was released for Shadowrun 3, eight years after the original publication.'
		}
	],
	[
		'7125',
		{
			sku: ['7125'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Corporate Download',
			releaseDate: ['1999-09'],
			description: 'The corporate war is over, but the corps need the shadows now more than ever as they scramble for position in the new power structure. Fuchi is dead, Novatech has risen from its ashes, and Wuxing and Cross have elbowed their way onto the Corporate Court. The corps have ceased their open conflict, but the guns are still drawn under the table...\nCorporate Download describes the history, power players and business interests of the ten top megacorps. Corporate Download focuses on information that runners need: the latest security trends, secret plans, dirty tricks, people to know and how to use them. Players will learn what working for each corp means for their characters, and gamemasters will find new rules for using and rating the megacorps in their campaigns.',
			gameDate: '2061-02',
			edition: 3,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7125 - Corporate Download.pdf',
					size: '32294897',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7124',
		{
			sku: ['7124'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Cyberpirates!',
			releaseDate: ['1997-11'],
			description: 'Forget those old stories of pirates swinging from the rigging with swords. In the 21st century, pirates have guns, cyberware and magic... and they\'ll use them to take anything from anyone if it\'ll net them a profit. They\'ll cut you open to watch the sharks eat you, and film the whole thing just to make a couple more bucks on the black market. They know where to get teh good, where to sell them and where to get more. Hitting a dockside warehouse, jumping a cruise ship or going toe-to-toe with another pirate crew for a shipment of weapons - they\'ll do whatever it takes to survive and come out on top. On the high seas, it\'s win or die.\nTake your shadowrunner out of the urban sprawl\'s mean streets and into the even meaner waterways of the world. Cyberpirates offers you a whole new realm to play in ... the world of smugglers and pirates. Become a swashbuckling, risk-taking Carribean League pirate or earn big money helping the corps exploit Africa\'s Ivory Coast. Or team up with a dragon to help free the Philippines and the grip of Imperial Japan. Cyberpirates offer colorful and detailed descriptions of piracy and smuggling in the Caribbean, the Philippeans and the West Coast of Africa, plus a portrait of the smuggling biz around the world. It also includes rules for underwater exploration, ship operations and combat, and loads of new toys. For use with Shadowrun.',
			gameDate: '2059-01',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7124 - Cyberpirates.pdf',
					size: '67598492',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'10736',
		{
			sku: ['10736'],
			category: 'sourcebook',
			type: 'print',
			name: 'Cyberpiraten!',
			releaseDate: ['1998'],
			description: '',
			gameDate: '2059-01',
			edition: 2,
			publisher: ['fanpro'],
			missing: true,
			notes: 'Cyberpiraten is the German translation/publication of Cyberpirates. It features 8 additional pages on pirates of the North Seas and additional equipment.'
		}
	],
	[
		'26500',
		{
			sku: ['26500'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Sprawl Sites: North America',
			releaseDate: ['2012-06'],
			description: 'The Sixth World is full of dark alleys, twisted corridors, and hidden locations for nefarious activities. Shadowrunners and 16th century explorers both know the same truthâthe difference between death and survival when entering a hazardous area may be a good map.\nSprawl Sites: North America presents eight full-color maps that can be used in a variety of sprawls, making it simple for gamemasters to call up a number of different locations when they need it. From a luxury hotel to a collection of blocks in an urban barrens, from a shopping mall to a trideo studio, the collection includes maps that can be used in many different situations. The maps are double-sided, with a key on one side, making them useful as both a guide for players and a reference for gamemasters. The package also includes a booklet providing details on security and other personnel found in the location, along with plot hooks to help involve these spots in your game.',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26500 - Sprawl Sites - North America.pdf',
					size: '8950798',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27100X',
		{
			sku: ['27100X'],
			category: 'rulebook',
			type: 'digital',
			name: 'Digital Toolbox',
			releaseDate: ['2014-01-30'],
			description: 'The Shadowrun Digital Tools Box is 2 box sets in 1! Whether you\'re just getting into Shadowrun or you\'re a runner that\'s been hitting the streets since the 2050s, you\'ll find useful material here for running any type of game.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/27100X - Digital Toolbox/Alphaware Content/27100X - Poster and Map.pdf',
					size: '1336837',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/27100X - Digital Toolbox/Alphaware Content/27100X - Plots and Paydata.pdf',
					size: '12921296',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/27100X - Digital Toolbox/Alphaware Content/27100X - Sledge Record Sheet.pdf',
					size: '594437',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/27100X - Digital Toolbox/Alphaware Content/27100X - Rules of the Street.pdf',
					size: '10663185',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/27100X - Digital Toolbox/Alphaware Content/27100X - Ms Myth Record Sheet.pdf',
					size: '593707',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/27100X - Digital Toolbox/Alphaware Content/27100X - Hardpoint Record Sheet.pdf',
					size: '592405',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/27100X - Digital Toolbox/Alphaware Content/27100X - GM Screen and Character Ref Sheet.pdf',
					size: '539732',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/27100X - Digital Toolbox/Alphaware Content/27100X - Maps.pdf',
					size: '4000000',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/27100X - Digital Toolbox/Alphaware Content/27100X - Hardpoint.pdf',
					size: '1001263',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/27100X - Digital Toolbox/Alphaware Content/27100X - Sledge.pdf',
					size: '1012393',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/27100X - Digital Toolbox/Beginner Box Content/27100X - QSR Character Sheet Hardpoint.pdf',
					size: '826784',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/27100X - Digital Toolbox/Beginner Box Content/27100X - QSR Character Sheet Gentry.pdf',
					size: '795134',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/27100X - Digital Toolbox/Beginner Box Content/27100X - QSR Character Sheet Sledge.pdf',
					size: '878826',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/27100X - Digital Toolbox/Beginner Box Content/27100X - QSR Character Sheet Ms Myth.pdf',
					size: '810801',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/27100X - Digital Toolbox/Beginner Box Content/27100X - QSR Character Sheet Coydog.pdf',
					size: '828416',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/27100X - Digital Toolbox/Beginner Box Content/27100X - Fire & Frost Excerpt.pdf',
					size: '3074073',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/27100X - Digital Toolbox/Beginner Box Content/27100X - Edge of Now.pdf',
					size: '3415980',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/27100X - Digital Toolbox/Beginner Box Content/27100X - Ms Myth Booklet.pdf',
					size: '994199',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/27100X - Digital Toolbox/Beginner Box Content/27100X - Instructions (This is where it all starts!).pdf',
					size: '464175',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/27100X - Digital Toolbox/Alphaware Content/27100X - Gentry.pdf',
					size: '968461',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/27100X - Digital Toolbox/Alphaware Content/27100X - Coydog Record Sheet.pdf',
					size: '593219',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/27100X - Digital Toolbox/Alphaware Content/27100X - Alphaware Instruction Sheet - Start Here.pdf',
					size: '541555',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/27100X - Digital Toolbox/Alphaware Content/27100X - Alphaware Cards.pdf',
					size: '2445690',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/27100X - Digital Toolbox/Alphaware Content/27100X - Coydog.pdf',
					size: '937415',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/27100X - Digital Toolbox/Alphaware Content/27100X - Gentry Record Sheet.pdf',
					size: '594759',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/27100X - Digital Toolbox/Beginner Box Content/27100X - Quick-Start Rules.pdf',
					size: '2793653',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7909',
		{
			sku: ['7909'],
			category: 'rulebook',
			type: 'scan',
			name: 'Matrix',
			releaseDate: ['2000-08'],
			description: 'Can You Hack It?',
			gameDate: '2061',
			edition: 3,
			publisher: ['fasa'],
			files: [
				{
					path: './Rulebooks/7909 - Matrix.pdf',
					size: '90842258',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7908',
		{
			sku: ['7908', '10659'],
			category: 'rulebook',
			type: 'scan',
			name: 'Cannon Companion',
			releaseDate: ['2000-07', '2003-12'],
			description: 'When the shadows are full of flying lead, chummer, you need an edge -- and I got it right here. You want a specialized blade? I can sell you a monosword. You want a gun to make the other guy think twice? How about the new laser pistol? Maybe you want to forge your whole body into a weapon -- I know someone who can train you in Wildcat-style martial arts. The big boys don\'t have all the best toys...',
			gameDate: '2061',
			edition: 3,
			publisher: ['fasa', 'fanpro'],
			files: [
				{
					path: './Rulebooks/7908 - Cannon Companion.pdf',
					size: '80954335',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SR4QS',
		{
			sku: ['SR4QS'],
			category: 'rulebook',
			type: 'digital',
			name: 'Shadowrun 4th Ed.: Quick Start Rules',
			releaseDate: ['2011-02'],
			description: 'These Quick-Start Rules offer a streamlined rule set along with pregenerated characters, quick-reference sheets and a first adventure: Foodfight 4.0!',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/SR4QS - Shadowrun 4th Ed. - Quick-Start Rules.pdf',
					size: '5699702',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26FRP12',
		{
			sku: ['26FRP12'],
			category: 'rulebook',
			type: 'digital',
			name: 'Shadowrun 4th Ed.: Quick Start Rules (Free RPG Day 2012)',
			releaseDate: ['2012-06'],
			description: 'These Quick-Start Rules offer a streamlined rule set along with pregenerated characters, quick-reference sheets and a first adventure: Foodfight 4.0!',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/26FRP12 - Shadowrun 4th Ed. - Quick-Start Rules.pdf',
					size: '9055468',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27QSR',
		{
			sku: ['27QSR'],
			category: 'rulebook',
			type: 'digital',
			name: 'Shadowrun Fifth Edition: Quick Start Rules',
			releaseDate: ['2013-07'],
			description: 'Shadowrun, Fifth Edition is here and there\'s no better way to dive into the Sixth World than with these Shadowrun Quick-Start Rules. Take on the role of a Combat Adept, Decker, Street Shaman, or Street Samurai in a brawl against fast-food goodfellas using this set of streamlined rules perfect for both those new to Shadowrun or long-time players getting back into the game.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/27QSR - Shadowrun Fifth Edition Quick Start Rules.pdf',
					size: '3495632',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7910',
		{
			sku: ['7910', '10662'],
			category: 'rulebook',
			type: 'scan',
			name: 'Rigger 3',
			releaseDate: ['2001-01', '2003-09-01'],
			description: 'Living is rigging, omae. Like burning rubber down the highway at 150 klicks and hour with only your brain to guide you. What about making a drone an extension of yourself, or undermining the security of a whole building, manipulating every camera, motion detector or security door. But the biggest kick is blowing up a car full of goons without even jacking out â weapons of destruction at your mental command â¦ now that\'s road rage, my friend.',
			gameDate: '2061',
			edition: 3,
			publisher: ['fasa'],
			files: [
				{
					path: './Rulebooks/7910 - Rigger 3.pdf',
					size: '109444880',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'10662',
		{
			sku: ['10662'],
			category: 'rulebook',
			type: 'scan',
			name: 'Rigger 3 (Revised)',
			releaseDate: ['2003-09'],
			description: 'Living is rigging, omae. Like burning rubber down the highway at 150 klicks and hour with only your brain to guide you. What about making a drone an extension of yourself, or undermining the security of a whole building, manipulating every camera, motion detector or security door. But the biggest kick is blowing up a car full of goons without even jacking out â weapons of destruction at your mental command â¦ now that\'s road rage, my friend.',
			gameDate: '2061',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Rulebooks/10662 - Rigger 3 (Revised).pdf',
					size: '44807740',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7907',
		{
			sku: ['7907', '10658'],
			category: 'rulebook',
			type: 'scan',
			name: 'Magic in the Shadows',
			releaseDate: ['1998-12-16', '2003-06'],
			description: 'So, You Think You Know Magic?\nChummer, I can write a book on wht you don\'t know. Can you design a spell or enchant a dagger? Can you invoke a great spirit or divine the future? Have you bared your soul to the Dweller on the Threshold during an astral quest? You\'ve got a lot to learn--not even dragons know all there is to know about Magic in the Shadows.',
			gameDate: '2060',
			edition: 3,
			publisher: ['fasa'],
			files: [
				{
					path: './Rulebooks/7907 - Magic in the Shadows.pdf',
					size: '123917505',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7904',
		{
			sku: ['7904'],
			category: 'rulebook',
			type: 'scan',
			name: 'Virtual Realities 2.0',
			releaseDate: ['1995-10'],
			description: '\'There I was, standing next to Joe on the corner, when outta nowhere comes this overgrown troll riding the hugest Harley Scorpion I\'ve ever seen, blastin\' away from all three firmpoints. What really scared teh bejeezus outta me were his arms - coupla big chainsaws, buzzin\' away like a hundred million wasps. He rode right up and sliced through Joe like a hot knife though butter! Joe flickered a bit, his face contorting into a pirmal scream, and disappeared. I hotfooted it back to the squat with the words, \'Buy Mitsuhama\' running through my brain - don\'t ask me why, "Then Joe\'s brother unhooked us from the Matrix...\n...AND THE REAL NIGHTMARE BEGAN."',
			gameDate: '2055-07',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Rulebooks/7904 - Virtual Realities 2.0.pdf',
					size: '20807343',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7903',
		{
			sku: ['7903'],
			category: 'rulebook',
			type: 'scan',
			name: 'Grimoire: Manual of Practical Thaumaturgy 15th Edition, 2053',
			releaseDate: ['1992-12'],
			description: 'The grimoire is the book of magical power for the Shadowrun world. Inside, gamemasters and players will find essays on the magical world and roleplaying magicians. It includes rules on sepll design, finding and forming magical groups, initiation into the higher forms of magic, enchanting, alchemy, free and ally spirits, the exploration of the metaplanes, and powerful magical threats.',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Rulebooks/7903 - Grimoire.pdf',
					size: '24588184',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7906',
		{
			sku: ['7906'],
			category: 'rulebook',
			type: 'scan',
			name: 'Rigger 2',
			releaseDate: ['1997-10'],
			description: 'GEAR HEADS,\nGREASE MONKEYS\nAND SPEED JUNKIES\n\nRIGGERS ARE BACK!\nTaking the datajack cable from under the dash, I plug it into the jack under my ear. Then I sit back as the virtual display blossoms before my eyes. Dizziness hits me for a split second; then my mind adjusts to the blizzard of input from the view screens and sensors that are arrayed before me. The screens show views from every angle, as well as numerous data displays - from the amount of fuel in my \'copter\'s tank to the infrared displays of the people here at the landing pad. As the datafeed pours into my brain, I\'m no longer just the human named Zagger. Instead, I am now my machine. I AM the Yellowjacket helicopter. I AM A RIGGER!\nRigger 2 overhauls and expands on the rules for riggers in Shadowrun. From creating a rigger character to down-and-dirty vehicle combat to electronic warfare, this book offers clear, concise rules for practically every aspect of playing a Rigger or dealing with a rigger\'s vehicles and drones. Also included are the rules for robotics, vehicle construction and modification, using security riggers in your game, and a comprehensive list of every vehicle in Shadowrun products published to date.',
			gameDate: '2058',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Rulebooks/7906 - Rigger 2.pdf',
					size: '68523379',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7905',
		{
			sku: ['7905', '10656', '25010'],
			category: 'rulebook',
			type: 'scan',
			name: 'Shadowrun Companion: Beyond the Shadows',
			releaseDate: ['1996-12'],
			description: 'For Players:\nExpanded character creation rules allow you to customize your character\'s background with Edges and Flaws and play ghouls or shapeshifters. Also includes rules for running, jumping and even being an escape artist!\n\nFor Gamemasters:\nProvides expanded contact rules and introduces Enemiesâthe evil side of contacts. Plus campaign and scenario creation, prime runners, training rules and security rules for gas traps, trip wires and sensor plates!\n\nFor New Campaigns:\nPlay a street gang or a government covert ops team, a DocWagon high-threat response team or even the cops!',
			gameDate: '2057',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Rulebooks/7905 - Shadowrun Companion - Beyond the Shadows.pdf',
					size: '25691697',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7905',
		{
			sku: ['7905', '10656', '25010'],
			category: 'rulebook',
			type: 'scan',
			name: 'Shadowrun Companion (Revised)',
			releaseDate: ['1999-03', '2003-09', '2004-06'],
			description: 'For Players:\nExpanded character creation rules allow you to customize your character\'s background with Edges and Flaws and play ghouls or shapeshifters. Also includes rules for running, jumping and even being an escape artist!\n\nFor Gamemasters:\nProvides expanded contact rules and introduces Enemiesâthe evil side of contacts. Plus campaign and scenario creation, prime runners, training rules and security rules for gas traps, trip wires and sensor plates!\n\nFor New Campaigns:\nPlay a street gang or a government covert ops team, a DocWagon high-threat response team or even the cops!',
			gameDate: '2060',
			edition: 3,
			publisher: ['fasa', 'fanpro'],
			files: [
				{
					path: './Rulebooks/7905 - Shadowrun Companion (Revised).pdf',
					size: '19573021',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26100',
		{
			sku: ['26100'],
			category: 'rulebook',
			type: 'digital',
			name: 'Runner\'s Toolkit',
			releaseDate: ['2011-08'],
			description: 'NEVER GO IN UNARMED! When you go into a tight spot, you go in prepared. One gun might be good, but two is better. And two guns and a grenade launcher is better still. Throw in a spellslinger to watch your back, and you\'re on to something. Runner\'s Toolkit is the well-stocked arsenal all runners should have, the ultimate accessory to the Shadowrun, Twentieth Anniversary core rulebook.',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/26100 - Runner\'s Toolkit/26100 - Anatomy Of A Shadowrun.pdf',
					size: '3962868',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/26100 - Runner\'s Toolkit/26100 - Contacts, Adventures and Sprawl Sites.pdf',
					size: '5403875',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/26100 - Runner\'s Toolkit/26100 - Compiled Tables.pdf',
					size: '10431627',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/26100 - Runner\'s Toolkit/26100 - Quick Reference Sheets.pdf',
					size: '11176004',
					mime: 'application/pdf'
				},
				{
					path: './Rulebooks/26100 - Runner\'s Toolkit/26100 - PACKS.pdf',
					size: '5727454',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26100X',
		{
			sku: ['26100X'],
			category: 'misc',
			type: 'print',
			name: 'Alphaware 2.0: Weapons, Spells, Gear & Augmentations',
			releaseDate: ['2011-08'],
			description: 'More spells. More weapons. More augmentations. More gear. This deck has more of the things you need to survive the shadows and make your living on the streets. Selected from the gera, spells and weapons in Runnerâs Toolkit: Alphaware, these cards offer players more optins, with game stats for each item or spell. As in the Alphaware deck, gear items have color illustrations, and some common items are on multiple cards so that more than one player can have easy access to the game information.',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			missing: 'outOfScope',
			notes: 'Set of cards available at Gen Con 2014.'
		}
	],
	[
		'26208',
		{
			sku: ['26208'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Conspiracy Theories',
			releaseDate: ['2011-11'],
			description: 'War rages in Central America, tensions between dragons are on the rise, and the Watergate Rift has been closed in a display of power that shook the city of DeeCee to its core. To many, the world is becoming more disordered and unpredictableâbut there are those who look underneath the surface chaos and see order, or even a plan. They see people and organizations who pull the strings and make the world shake, and they wonder if they can find out what these people are up to before itâs too late.\nConspiracy Theories is a deep dive into the underbelly of the Sixth World, a place filled with crackpot theories and insane ideas that would be laughable if it werenât for the fact that some of them are most assuredly true. If they want to stay alive, shadowrunners need to know this information to keep them a step ahead of the forces that may be massing against them behind the scenes. If they want to do more than surviveâif they want to prosperâthey really need to know this data, because any runner worth a damn knows that manipulating people based on what they believe to be true is a great way to make a few nuyen.',
			gameDate: '2073-10',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26208 - Conspiracy Theories.pdf',
					size: '10346803',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26207',
		{
			sku: ['26207'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Spy Games',
			releaseDate: ['2011-05'],
			description: 'Listen to the whispersâtheyâre all over town. People have secrets, millions of secrets, and some of them are so explosive they could shift the balance of power in the Treaty City of Denver. Normally, the great dragon Ghostwalkerâs tight grip would keep the city under control, but some of the whispers moving around town say that Ghostwalker hasnât been himself lately. The powers of Denver are scrambling, the Treaty is about to be renegotiated, and information is the hottest commodity in town.\nSpy Games brings Shadowrun players to the espionage-filled city of Denver, where secrets are bought and sold, and sometimes the price is paid in blood. Accessing these secrets may mean using cutting-edge surveillance gear or powerful magic, or it could mean turning back the clock and breaking out low-tech cloak-and-dagger approaches that the techheads of the world would never expect. Spy Games provides the setting information, gear statistics, and game rules players need to dive into Sixth World spycraft. ',
			gameDate: '2073-05',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26207 - Spy Games.pdf',
					size: '17913045',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26210',
		{
			sku: ['26210'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Hazard Pay',
			releaseDate: ['2012-05'],
			description: 'Dark alleys, abandoned buildings, wet streets stabbed with neon lightâshadowrunners know all these places. They also know that they arenât the only places work gets done. A good shadowrunner should be open to anything, to runs that might take them anywhere. From the cold of Antarctica to the heat of the Sahara, from the life-filled dark of the deep oceans to the empty void of outer space, there is work to be had for runners brave and resourceful enough to take it. Of course, there are also dozens of new ways to die, so you should probably see if Mr. Johnson will chip in a little extra pay.',
			gameDate: '2074-04',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26210 - Hazard Pay.pdf',
					size: '11478374',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26209',
		{
			sku: ['26209'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Street Legends',
			releaseDate: ['2011-08'],
			description: 'At the end of a run, youâve either got a good story to tell or youâre dead. Live long enough, and youâll get enough stories to fill a book, and some of them will be killer. There is a certain class of people out on the streets that runners love to talk about, the people at the center of the stories swapped late at night over a round of wiper-fluid hooch. Some of them are good, some of them are lucky, and some of them are among the most powerful creatures of the Sixth World. All of them, in their own way, are legends.\nStreet Legends profiles more than thirty renowned figures in the Sixth World, including JackPoint stalwarts such as Haze, Rigger X, and Puck; classic runners like Serrin Shamander and Tommy Talon; and powerful behind-the-scenes figures including Lugh Surehand, Nadja Daviar, and the great dragon Lofwyr. Learn about hunting vampires with Martin de Vries, running guns in a war zone with Marcos, and trying to put a face to the elusive Hans Brackhaus.\nStreet Legends contains short fiction bringing these characters to life, as well as text describing each person and what makes them a legend. Also, each and every person profiled has complete game stats. Even the dragons. ',
			gameDate: '2073-08',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26209 - Street Legends.pdf',
					size: '15494344',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26206',
		{
			sku: ['26206'],
			category: 'sourcebook',
			type: 'digital',
			name: 'War!',
			releaseDate: ['2010-12'],
			description: 'The diplomats have failed. The tensions have only grown worse. Each side has pushed the other too far, so there\'s nothing left to do but fight. At the border of Aztlan and Amazonia, war has broken out. The streets of BogotÃ¡ are being pummeled, mercenaries are being hired and killed in approximately equal numbers, and blood is being spilled in dark rooms to give strength to mages on the battlefield. Most importantly, runners are being hired by the score.',
			gameDate: '2073',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26206 - War!.pdf',
					size: '15078197',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26202',
		{
			sku: ['26202'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Feral Cities',
			releaseDate: ['2008-12'],
			description: 'In the decaying urban wilds, war-torn cityscapes, and cancerous megabarrens of these Feral Cities only one thing is certain - they all harbor singular opportunities for those brave and foolhardy enough to explore their dangerous domains, factions and secrets.',
			gameDate: '2071-10',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26202 - Feral Cities.pdf',
					size: '18366468',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26201',
		{
			sku: ['26201'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Corporate Enclaves',
			releaseDate: ['2008-08'],
			description: 'Corporate Enclaves shines the spotlight on two very different bastions of corporate power in the Sixth World: Los Angeles and Neo-Tokyo. Controlled and exploited by the iron hand of the megacorps, these sprawls are home to corporate powerhouses, their political minions, powerful crime factions, and plenty of intrigue and opportunities for enterprising and resourceful shadowrunners. The second in an ongoing series of themed setting books for Shadowrun, Fourth Edition, Corporate Enclaves also briefly visits the unique corporate dominions of Dubai, Europort, Manhattan, Nairobi, and TenochtitlÃ¡n, and provides guidelines for developing your own corp-controlled settings.',
			gameDate: '2071-02',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26201 - Corporate Enclaves.pdf',
					size: '12057795',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26205',
		{
			sku: ['26205'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Sixth World Almanac',
			releaseDate: ['2010-06'],
			description: 'What was the VITAS outbreak like for the people who were there? What was Renraku Arcologyâand its operating softwareâlike before it became a total nightmare? How does it feel to get off a plane and set foot in the ghoul kingdom of Asamondo? The Sixth World Almanac is the ultimate compendium of Sixth World energy, history, and geography. With the most detailed timeline in Shadowrunâs history and write-ups of nearly forty major nations, this book immerses players and gamemasters in the Sixth World deeper than they have ever been. The Almanac is full of Shadowrun firsts, including the first-ever full-color map of the entire Sixth World and new fiction covering historic eras that have never been detailed in past sourcebooks. Open the Almanac and fall into the Sixth Worldâlet the art, the maps, and the writing bring you more completely into one of the most exciting, enduring role-playing settings of all time!',
			gameDate: '2072-11',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26205 - Sixth World Almanac.pdf',
					size: '41901351',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26203',
		{
			sku: ['26203'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Vice',
			releaseDate: ['2009-12'],
			description: 'It means you\'re doing something that the government doesn\'t want you to do. You\'d never do anything like that, right? Or would you?\nIt might be that some laws are... Misguided.\nIt\'s civil disobedience and a moral imperative to oppose those laws.\nGandhi taught us that.\nMy friends and Iâwe\'re here to help you make these difficult moral choices. We\'ll even provide you with a support network, if someone objects to your strong moral compass. And, hey, if everything works out, maybe all of us might come out ahead. Don\'t worry! Weâve got your back.',
			gameDate: '2072-02',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26203 - Vice.pdf',
					size: '23360092',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26211',
		{
			sku: ['26211'],
			category: 'sourcebook',
			type: 'digital',
			name: 'The Clutch of Dragons',
			releaseDate: ['2012-08'],
			description: 'Never, ever deal with a dragon. Shadowrunners have heard that dictum so often, they frequently say those words in their sleep. But what the aphorism forgets to tell you is thisâwhat if you donât have a choice?\nThe tension between dragons has been growing, and the big lizards are throwing every weapon they have at each other, including shadowrunnersâespecially shadowrunners. Extractions, industrial sabotage, theft, wetworkâthere\'s plenty of jobs in all those areas, and dragons are finding ways to get reluctant runners to work for them. Maybe theyâll hide their involvement in the run, or maybe theyâll bribe the runners with large piles of nuyen or blackmail them with their past activities. Or maybe theyâll just tell the runners they have a simple choice of working for them or being eaten.\nWhatever tactics they choose, the dragons are going to be active and aggressive, and if runners want to survive, they better be on their toes. They need to know who the draconic players are, what theyâre up to, and what might happen to them if they fall into a dragonâs grip. They need to be ready for anything, because when dragons go at each other, the world shakes, the earth beneath them burnsâand far too often, shadowrunners die.',
			gameDate: '2074-07',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26211 - The Clutch of Dragons.pdf',
					size: '11674079',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26301',
		{
			sku: ['26301'],
			category: 'sourcebook',
			type: 'digital',
			name: 'emergence',
			releaseDate: ['2008-08'],
			description: 'The Crash of 2064 ruined the lives of millions. Some died in the Matrix or went insane, many lost everything they owned, and still others found their identities completely erased. A small percentage changed into something altogether different, with the strange and inexplicable ability to affect the new Matrix with their minds. Now, in 2070, the existence of these technomancers becomes frontpage news, leading to widespread paranoia and witch hunts. The Emergence campaign setting involves the runners in a series of pivotal events that may change the way they view the world and the Matrixâand each other.',
			gameDate: '2070-08',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26301 - Emergence.pdf',
					size: '21703097',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26241',
		{
			sku: ['26241'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Attitude',
			releaseDate: ['2011-03'],
			description: 'Eat \'em Up, Spit \'em Out! They can have their offices, their paychecks, their 2.2 kids and their robot-trimmed lawns. Screw âem. They trudge through life, doing what other people tell them to do, never having an original thought, burying themselves so deep down inside they might never come out. Youâre not them. The worldâs not giving you anything, so youâre going to take what you can get. Youâre on the streets, on your own. Maybe youâre helping an orxploitation band shoot to the top, maybe youâre climbing up the street brawl ladder, or maybe youâre getting famous just for being you. Whatever you do, youâll do it your way, because dying always beats selling out. Attitude helps shadowrunners live the untethered life by giving them the lowdown on music, entertainment, sports, and other scenes where they can make their mark without selling their soul. A repository of Sixth World culture along with a treasury of new ways to run in the shadows, Attitude is an indispensable resource for all Shadowrun players.',
			gameDate: '2073-03',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26241 - Attitude.pdf',
					size: '20290372',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26450',
		{
			sku: ['26450'],
			category: 'mission',
			type: 'digital',
			name: 'Artifacts Unbound',
			releaseDate: ['2011-10'],
			description: 'Four artifacts have been found. Some of the most powerful people in the Sixth World have been after them, and many people have died in the globetrotting hunt to bring these objects together. Now that they have been recovered, their powers can be unleashedâor the artifacts can be scattered, lost again until another generation summons the courage and the knowledge to dredge them up.\nArtifacts Unbound concludes the Dawn of the Artifacts campaign in a way that makes gamemasters and players free to determine many events of their campaign. Filled with plot details, adventure seeds, basic setting information, and NPC statistics, Artifacts Unbound lets gamemasters select the elements that would work best in their campaign and design a thrilling story for their game. Easy to use and flexible, this book can be used with players who have gone through the entire Dawn of the Artifacts campaign, or with players just learning about the artifacts and their effect on the Sixth World.',
			gameDate: '2073-09',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/26450 - Artifacts Unbound.pdf',
					size: '15147719',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26302',
		{
			sku: ['26302'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Ghost Cartels',
			releaseDate: ['2008-10'],
			description: 'The shadows are abuzz about the new drug in the sprawl: tempo. It takes the user on a unique trip, better than anything experienced before. Druggies canât get enough of the stuff, and even beetleheads are giving it a shot. Tempoâs popularity shifts the balance of power between the syndicates and soon the blood and bullets are flowing.\nGhost Cartels drops the runners into the action, involving them in the drug deals and power plays shaking up Seattle, Los Angeles, and Hong Kongâeven taking them all the way to the jungles of South America.',
			gameDate: '2071-11',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26302 - Ghost Cartels.pdf',
					size: '26874291',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26240',
		{
			sku: ['26240'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Seattle 2072',
			releaseDate: ['2009-08'],
			description: 'Itâs a screwed up city. Isolated from the rest of the UCAS, itâs haven for criminalsâsmugglers, syndicates, gangers. Legal criminals, tooâmegacorporations, governments, politicians.\nAs beautiful as she is dysfunctional, Seattle is urban sprawl amid rolling hills and forests nestled up to man-made wonders next door to natural and man-made disasters. Whether youâre a native or not, Seattle will draw you in like no other.\nYou can run for a lifetime and never leave Seattle, but some say you canât run for a lifetime without entering.',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26240 - Seattle 2072.pdf',
					size: '22775392',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26213',
		{
			sku: ['26213'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Storm Front',
			releaseDate: ['2013-03'],
			description: 'Itâs been a tense couple of years (or couple of decades, if weâre being accurate) in the Sixth World. Aztlan and Amazonia have been slugging it out. Great dragons have turned on each other, testing old alliances and forging new ones. Governor Kenneth Brackhaven of Seattle is facing pressure unlike ever heâs ever seen, and scandals seem on the verge of overwhelming him. In Denver, a powerful dragon and an angry elf are set to butt heads in ways that will shake up the whole cityâand provide new opportunities for an old enemy. And on top of that, a new plague is spreading through the world, and the denizens of JackPoint arenât immune to its effects.',
			gameDate: '2075-01',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26213 - Storm Front.pdf',
					size: '9431114',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26212',
		{
			sku: ['26212'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Dirty Tricks',
			releaseDate: ['2012-11'],
			description: 'Politics is only a dirty word when it\'s not working for you. For shadowrunners, politics arenât about debates and position papersâtheyâre about taking some of the money people are throwing around.\nDuring election season, when power is up for grabs, people are willing to do just about anything to get a piece of the pie. If you can help them get what they want, theyâve got a job for you. It may be peeking in the windows of the rich and famous. Or finding dirt on the opposition (or making some up). Or, if things get really desperate, ensuring the other guy doesnât win because heâs too busy taking a dirt nap.\nHow much money you take in and how dirty your fingers get is up to you and your desire to not see the stars above you when you sleep. Youâll probably have to make some compromises along the way, but since when has life in the Sixth Worldâor politicsâbeen any different?',
			gameDate: '2074-11',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26212 - Dirty Tricks.pdf',
					size: '8237042',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26230',
		{
			sku: ['26230'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Shadowrun 2050',
			releaseDate: ['2012-07'],
			description: 'Chrome eyes. Computers called "decks." Big hair, big cyberlimbs and bigger guns. It\'s Shadowrun in the year it all started. Take a step back to Shadowrun\'s roots with Shadowrun 2050, a book that combines Fourth Edition rules â the smoothest, most accessible rule set Shadowrun has ever had - with the setting that first made the Sixth World a legend.\nShadowrun 2050 has everything players and gamemasters need to dive into the grimy beauty that kicked off one of the greatest roleplaying settings of all time. With information on how to adapt Fourth Edition Matrix, gear, and magic rules for the 2050 setting, as well as in-universe information about the powers of the world, what shadowrunners will be up to, and who they\'ll be running into, Shadowrun 2050 puts a new twist on the classic setting.\nCaptain Chaos. Maria Mercurial. The Laughing Man. Sally Tsung. JetBlack. Hatchetman. Nightfire. And the Shadowland poster who just called himself The Big "D." These people and many others are waiting for you in the year that started it all, a setting brought back to life with new, full-color artwork showing the chrome, dirt, neon, and darkness that was in the heart of Shadowrun when it started and remains at its core today.',
			gameDate: '2050',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26230 - Shadowrun 2050.pdf',
					size: '8672784',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26221',
		{
			sku: ['26221'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Corporate Guide',
			releaseDate: ['2010-06'],
			description: 'There is nothing in the Sixth World more powerful than the megacorporations. Even great dragons scratch and claw to get a piece of the power wielded by the Big Ten. If youâre running the shadows, you need to know about the megas, because they deal out the biggest paydaysâand, if you cross them, the harshest paybacks.',
			gameDate: '2072-05',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26221 - Corporate Guide.pdf',
					size: '13761663',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'10664',
		{
			sku: ['10664', '25013'],
			category: 'sourcebook',
			type: 'scan',
			name: 'State of the Art: 2063',
			releaseDate: ['2002-08', '2004-09'],
			description: '"New toys hit the street every week, omae. Wiz new tech to exploit security holes, rapid-assembly weapons disguised as Nerps to sneak past the scanners, wicked new adept fu to kick some major hoop. To keep up with the Johnsons, ya gotta scan what\'s coming down the pipe, otherwise you\'ll end up as the unfortunate example in a field-test report."\nState of the Art: 2064 examines the latest groundbreaking developments in five aspects of the Shadowrun world. It explores the current state of police organization, technology and prisons and details the murky world of spycraft and political espionage. It also delves into both adept characters, discussing new paths, powers and metamagic, and European-specific magical traditions such as street witches. Finally, it provides briefs on the latest trends in mainstream and underground culture, sports and entertainment, with an eye towards shadowrunning opportunities. These sections include a selection of new gear, techniques and rules for both players and gamemasters.',
			gameDate: '2063-01',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Sourcebooks/10664 - State of the Art 2063.pdf',
					size: '42944993',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'10655',
		{
			sku: ['10655', '25015'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Shadows of North America',
			releaseDate: ['2002-07', '2004-08'],
			description: 'The Map Is Not The Territory There\'s nothing worse than dropping into some backwater sprawl in the country next door to quietly take care of some job, then realizing too late that your sprawl studs and street lingo stick out like a troll\'s thumb. North America ain\'t what it used to be, chummer--every time you cross a border, you enter a different world. Ask an anglophone in QuÃ©bec, an ork in San Fran, or a mage in the NAN. The rules are different, both in the shadows and in the sunlight, and if you don\'t keep up with the local game, you\'re gonna lose. Shadows of North America tells shadowrunners what they need to know about the 13 countries and city-states of North America, including the Native American Nations and the dragon-ruled city of Denver. Each state is covered in detail, from hot spots to power players, all from a shadowrunner\'s point of view. Designed for Shadowrun, Third Edition, but usable for any edition.',
			gameDate: '2062-08',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Sourcebooks/10655 - Shadows Of North America.pdf',
					size: '151669025',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'10667',
		{
			sku: ['10667'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Sprawl Survival Guide',
			releaseDate: ['2004-02'],
			description: 'Street Smart?\nNew to the sprawl kid? Wise up fast, cuz wiz wires or spell juice alone won\'t save your ass on the hungry streets. You flash your credstick in the wrong alley, drop a name in the wrong company, or flick out a spur at a gunfight and your organs will be next up for auction. Reps are built on etiquette and connections, not just chill attitude and piles of corpses. You need to know when to deal and when to wheel, or you\'re just another skidmark on the streets of the sprawl.',
			gameDate: '2063-04',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Sourcebooks/10667 - Sprawl Survival Guide.pdf',
					size: '44622745',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'10666',
		{
			sku: ['10666'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Dragons Of The Sixth World',
			releaseDate: ['2003-10'],
			description: 'Enter the dragons\n"What\'s that you say? Never deal with a dragon? Chummer, if a wizworm involves you in its intrincate plots, you\'ll either deal or be the next meal."\nDragons of the Sixth World gets under the scales of the world\'s most dangerous and manipulative repitiles. It provides details on the life cycle, biology, magic and culture of dragons, and investigates their servants, allies and pawns. Dossiers are provided on ten of the world\'sforemost great dragons, with shorter bios given on over a dozen others. The Draco Foundation, pursuing the schemes of its ounders, the dead dragon Dunkelzah, is also described.',
			gameDate: '2063-02',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Sourcebooks/10666 - Dragons Of The Sixth World.pdf',
					size: '100251179',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'10653',
		{
			sku: ['10653'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Target: Wastelands',
			releaseDate: ['2002-07'],
			description: 'Abandon All Hope, Ye Who Enter Here\n"An old fixer once told me that shadowrunning is about going places you\'re not supposed to go. That\'s what gives us the buzz, right? The excitement of traveling to exotic and secret places, meeting intresting people, and extracting or killing them. Belive me, chummer, sometimes shadowrunning takes yuo to places you really don\'t want to go--and that you\'re lucky to get out alive."',
			gameDate: '2062-09',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Sourcebooks/10653 - Target Wastelands.pdf',
					size: '35896385',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7127',
		{
			sku: ['7127', '10650'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Year of the Comet',
			releaseDate: ['2000-09', '2003-06'],
			description: 'The year 2061 marks the return of Halley\'s Comet and the 50th anniversary of the Awakening-do you celebrate or run for cover? Each day brings a new surprise. Will you transform into a genetic changeling or fall prey to a doomsday cult? Will you be in Denver when the dragon runs amok or in Japan when the Ring of Fire deals death to the Empire? Will you fight toxic spirits in the YucatÃ¡n or run from the walking dead?',
			gameDate: '2061-01',
			edition: 3,
			publisher: ['fasa', 'fanpro'],
			files: [
				{
					path: './Sourcebooks/10650 - Year of the Comet.pdf',
					size: '61001170',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7128',
		{
			sku: ['7128', '10652'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Threats 2',
			releaseDate: ['2001', '2003-06'],
			description: 'Nothing to see here... Move along\nEveryone\'s got a dark secret, chummer. See that chromed-out razorgirl with the shain of fetishes? She could be a cultist who uses blood rituals to restore her lost magic. See that suit slugging down whiskey in the corner? He could be the errand-boy of some supra-governamental conspiracy to overthrow the NANs. And that freak behind you? Drek, chummer, he\'s not even human...',
			gameDate: '2061-12',
			edition: 3,
			publisher: ['fasa', 'fanpro'],
			files: [
				{
					path: './Sourcebooks/10652 - Threats 2.pdf',
					size: '30364395',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'10651',
		{
			sku: ['10651'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Target: Awakened Lands',
			releaseDate: ['2003-06'],
			description: 'If the mana storms don\'t get you... the bunyips will!\nYou think Bug City was bad? Chummer, you ain\'t seen nothin\' like Australia\'s Outback. Mana storms sneaks up on you, dropping acid or fire or turning your transport into melted slag. You can run for cover, but the cave you hibe in may actually be some astral mirage that doesn\'t really exist. If you\'re lucky, Awakened dingos won\'t eat you and you\'ll crawl back to the sprawl... only to die of thirst when you don\'t have the cred to buy precious drinking water.',
			gameDate: '2062-06',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Sourcebooks/10651 - Target Awakened Lands.pdf',
					size: '48880589',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'10673',
		{
			sku: ['10673'],
			category: 'rulebook',
			type: 'scan',
			name: 'The Shadowrun Character Dossier',
			releaseDate: ['2003-09'],
			description: 'More Data Than Your Rap Sheet\nYour shadowrunner has more safehouses than a slumlord, more false identities than a schizophrenic and a criminal record that takes up more memory than a Black Hammer utility. So where do you keep track of all that info? The Shadowrun Character Dossier provides 16 pages to record all of your characterâs details, from skills to implants to spells. All of the archetypes are covered, from adepts to riggers to otaku, and space is included for edges and flaws, Karma expenditures, character background and more. The Dossier also features handy reference tables to make combat, skill use and healing run more smoothly. Store your runnerâs info here and put Mr. Johnsonâs files to shame!',
			gameDate: '2064',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Rulebooks/10673 - The Shadowrun Character Dossier.pdf',
					size: '18466069',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'25014',
		{
			sku: ['25014'],
			category: 'sourcebook',
			type: 'digital',
			name: 'System Failure',
			releaseDate: ['2005-09'],
			description: 'The year is 2064, and all is not well. A struggling megacorp makes a drastic decision to stave off impending doom. A psychopathic artifical intelligence thought to be dead rises again, attempting to take over the entire Matrix. And behind the scenes, apocalyptic terrorists prepare to strike at key points around the world, completing their first steps towards a vision of Armageddon. Across the globe, shadowrunners find themselves caught up in these events - how will their actions impact the Sixth World?',
			gameDate: '2064-03',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Sourcebooks/25014 - System Failure.pdf',
					size: '10218707',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'25011',
		{
			sku: ['25011'],
			category: 'unofficial',
			type: 'digital',
			name: 'Shadows of Latin America',
			releaseDate: ['2011'],
			description: 'This book collects material published online by the authors of the canceled book describing various locations in Latin America.',
			gameDate: '2064',
			edition: 3,
			publisher: ['unofficial'],
			files: [
				{
					path: './Sourcebooks/25011 - Shadows of Latin America.pdf',
					size: '23143745',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26101',
		{
			sku: ['26101'],
			category: 'rulebook',
			type: 'digital',
			name: 'Running Wild',
			releaseDate: ['2009-07'],
			description: 'Some people like to talk about the peace and tranquility of nature. Their eyes glaze over, and they rave about cool breezes, fresh air, and flittering butterflies.\nTheyâre not paying attention, and that makes them easy pickings for any of the predators, including me. The Sixth Worldâs a place of eating or being eaten. Sometimes the critters are waiting deep in the jungle; other times theyâre hiding in your bedroom closet.\nProving youâre the fittest only ends when you arenât anymore. Know your preyâitâs the only way to catch them. But remember, you just might be somethingâs prey too.',
			gameDate: '2072-07',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Rulebooks/26101 - Running Wild.pdf',
					size: '15670132',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26005',
		{
			sku: ['26005'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Runner Havens',
			releaseDate: ['2006-07'],
			description: 'Runner Havens -- the first core setting book for Shadowrun, Fourth Edition -- introduces the players to two of the world\'s premier shadowrunner sprawls: Seattle and Hong Kong. Each city is described in detail from a shadowrunner\'s point of view, covering key topics such as the balance of power, corporate and underworld affairs, places to see, strange magics, and key features of interest. A wealth of plot hooks are also included. Four other runner-favored cities -- Cape Town, Caracas, Hamburg, and Istanbul -- are also covered, and gamemaster advice is provided for transforming any specific urban locale into a shadow haven.',
			gameDate: '2070-02',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/26005 - Runner Havens.pdf',
					size: '11036151',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'10670',
		{
			sku: ['10670', '25007'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Shadows of Asia',
			releaseDate: ['2005-05'],
			description: 'Asia. The East. A land of contrasts, from glittering megacorp skyscrapers to humble sacred temples. Japan, Malaysia and Hong Kong set the world\'s accelerated pace of progress, but next door in Indochina and Indonesia it\'s still last century. It\'s a mystery to most, but if you know your drek, youâll find it\'s a land of opportunity. Anything you want is here. Cred. Gear. Flesh. Hell, I even heard of a guy finding enlightenment. Thereâs always a price, of course, whether it\'s selling your soul to the corps or your sister to the slave trade.',
			gameDate: '2064-04',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Sourcebooks/25007 - Shadows of Asia.pdf',
					size: '17761112',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'10672',
		{
			sku: ['10672', '25003'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Mr Johnson\'s Little Black Book',
			releaseDate: ['2004-08'],
			description: '"Call me Mr. Johnson. I\'m like a fixer for the corps. I know everybody who\'s anybody from suit-and-tie boardroom predators to bottom-feeder street-level scavengers. I know the best sprawl sites for scoring new talent, exchanging goods without interruption or hiding out from the hit men on your tail. I like to ensure that the people I hire can execute a well-planned black ops job and keep their faces from being splashed all over the screamsheets. My files on you say that you\'re right for what I have in mind. Interested?"',
			gameDate: '2064',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Sourcebooks/25003 - Mr Johnson\'s Little Black Book.pdf',
					size: '33925138',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'10668',
		{
			sku: ['10668', '25002'],
			category: 'sourcebook',
			type: 'scan',
			name: 'Shadows Of Europe',
			releaseDate: ['2003-06'],
			description: 'A new world in the shell of the old.\n"Clashes of cultures. That\'s what Europe is, term. One day you\'re fighting Moroccan pirates on the docks of Lisbon, and the next you\'re hobnobbing with the academic elite of Prague. It\'s a friggin\' maze of people and places, all acting like a big dysfunctional family. The Euro shadows are treacherous to navigate, but believe me, chum, the oportunities are umbelievable."',
			gameDate: '2063',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Sourcebooks/25002 - Shadows Of Europe.pdf',
					size: '45184329',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'10669',
		{
			sku: ['10669', '25006'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Loose Alliances',
			releaseDate: ['2005-04'],
			description: 'Corps don\'t give a drek about the runners they hire that\'s why they call us expendable assets. Forget working for the Mob or the Yakuza, too once you\'re in, you\'re part of their family for the rest of your life. Lucky for us, there are swarms of other groups looking to claim their piece of sprawl and who are willing to bypass the law to do it. Policlubs, magical orders, religious factions, black marketers these are just a few of the species struggling for survival in the shadow ecology. Hooking up with such an organization has its advantages resources, steady employment, backup but pick the wrong outfit to run with and you\'ll regret it when they kick you to curb. So what\'s it going to be, chummer? You can\'t roll solo forever.',
			gameDate: '2064-02',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Sourcebooks/25006 - Loose Alliances.pdf',
					size: '5000155',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'10671',
		{
			sku: ['10671', '25004'],
			category: 'sourcebook',
			type: 'scan',
			name: 'State of The Art: 2064',
			releaseDate: ['2004-10'],
			description: 'New toys hit the street every week, omae. Wiz new tech to exploit security holes, rapid-assembly weapons disguised as Nerps to sneak past the scanners, wicked new adept fu to kick some major hoop. To keep up with the Johnsons, ya gotta scan what\'s coming down the pipe, otherwise you\'ll end up as the unfortunate example in a field-test report.',
			gameDate: '2063-12',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Sourcebooks/25004 - State Of The Art 2064.pdf',
					size: '80612489',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM02-01',
		{
			sku: ['SRM02-01'],
			category: 'mission',
			type: 'digital',
			name: 'Parliament of Thieves',
			releaseDate: ['2006'],
			description: 'When youâre working the Denver shadows, itâs not just a matter of keeping the names and the faces straight. You need to remember which faction each person is working for. Parliament of Thieves introduces the runners to Denver, and exposes them to a number of the different factions of the cityâs underworld.\nThe adventure focuses on a short run from one sector (Pueblo) of Denver to another (UCAS). The characters are sneaking a hardcopy treaty letter from the Koshari to the sottocapo of the Chavez Mafia family. It already bears the signature of the Koshari council, and simply requires the sottocapoâs signature. The characters donât have to worry about returning it. They were hired because both sides wanted the transport handled by a âneutral third party.â Other elements of the Denver underground will encounter the team, because they want to know the terms of the treaty.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-01A - Parliament of Thieves.pdf',
					size: '543927',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-01B - Parliament of Thieves.pdf',
					size: '2517142',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM02-00',
		{
			sku: ['SRM02-00'],
			category: 'mission',
			type: 'digital',
			name: 'Missions Season 2',
			releaseDate: ['2006'],
			description: 'Basic files to Season 2 including a calendar and the karma rollover log.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-00 - Missions Season 2 Karma Rollover Log.pdf',
					size: '161947',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-00 - Missions Season 2 Calendar.pdf',
					size: '194545',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM02-02',
		{
			sku: ['SRM02-02'],
			category: 'mission',
			type: 'digital',
			name: 'Best Served Cold',
			releaseDate: ['2006'],
			description: 'The runners are hired by Jaron Falcone, a retired fixer, to bring back Jonathan Belenkiy. They are working against the clock, as the ransom for Belenkiy is due in less than twenty four hours. Through investigation of his room, the runners find clues that lead them to the Black Cats. Legwork also turns up that Belenkiy hasnât been entirely clean with all of his dealings.\nAs the night goes on, the runners can meet with Sioux warriors and Mafia soldiers, on Belenkiyâs trail. HammerJack will get nervous and approach them himself to try and have them turn against Falcone. If they are lucky, the runners will complete their mission without getting trapped in Aresâ internal politics or being placed on the hit list of the Casquilho family.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-02A - Best Served Cold.pdf',
					size: '669584',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-02B - Best Served Cold.pdf',
					size: '3173045',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM01-08',
		{
			sku: ['SRM01-08'],
			category: 'mission',
			type: 'digital',
			name: 'Duplicity',
			releaseDate: ['2005'],
			description: 'Griffin Biotechnology has been a revolving door for shadowrunners. Runners from all over the sprawl have had at least one opportunity to scout the place or sneak a peek at what\'s going on inside. Word is that "the big one" has hit the streets - big nuyen to steal one of Griffin\'s hottest prototypes. Will Knight Errant be able to keep out this latest attack against the Everett based firm?',
			gameDate: '2064',
			edition: 3,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 1/SRM01-08A - Duplicity.pdf',
					size: '249981',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 1/SRM01-08B - Duplicity.pdf',
					size: '882435',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM01-09',
		{
			sku: ['SRM01-09'],
			category: 'mission',
			type: 'digital',
			name: 'For Whom the Bell Tolls',
			releaseDate: ['2005'],
			description: 'In the corporate world, fights are not only in boardrooms, but in the streets. What if the future of an entire company were held in the hands of a team of shadowrunners?',
			gameDate: '2064',
			edition: 3,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 1/SRM01-09A - For Whom the Bell Tolls.pdf',
					size: '187464',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 1/SRM01-09B - For Whom the Bell Tolls.pdf',
					size: '441295',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM02-06',
		{
			sku: ['SRM02-06'],
			category: 'mission',
			type: 'digital',
			name: 'The Flip Side',
			releaseDate: ['2006'],
			description: 'The runners are hired to bring in a known smuggler who has gone to ground after ditching his goods half a klick from the border. Don Casquilho comes across as a nice old man with more grandchildren than hair left on his head and the Don says he just wants to talk.\nMeanwhile the Vory V Zakone are moving heavily into the smuggling business and ensuring that anyone who talks with the Mafia is pushing daisies by the end of the week. The runners will be introduced to Vory thugs, Avtoritey lieutenants, and have to decide which syndicate they are falling in line with. ',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-06A - The Flip Side.pdf',
					size: '776345',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-06B - The Flip Side.pdf',
					size: '1827004',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM02-07',
		{
			sku: ['SRM02-07'],
			category: 'mission',
			type: 'digital',
			name: 'An Ounce Of Prevention',
			releaseDate: ['2006'],
			description: 'Doc Tico hires the runners to go in and bring back a quantity of the drug that he hopes will bring him more paying customers. He tells them where they can best get the drug in quantity, at the DocWagon PCC facility. Once the runners are in far enough that they canât back out, the hospital becomes awash with injuries brought in from a prison break attempt at the maximumsecurity detention center thatâs roughly a mile away. How much harder the run just got depends on what technique they chose to infiltrate.\nWhen they return to Doc Tico with the drugs they have a strong chance of learning that the doctor has been supplying parts to the Tamanous, though only what would otherwise be considered âmedical wasteâ and nothing from anyone unwilling. They are then faced with an ethical dilemma: turn the doctor in and put the clinic out of business, or keep hush and let the downtrodden continue to get their low-cost yet decentquality medical care.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-07A - An Ounce Of Prevention.pdf',
					size: '937120',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-07B - An Ounce Of Prevention.pdf',
					size: '1835815',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM02-05',
		{
			sku: ['SRM02-05'],
			category: 'mission',
			type: 'digital',
			name: 'Through A Rose Colored Display Link',
			releaseDate: ['2006'],
			description: 'Tina, a technomancer, and an independent sprite named Taske, are on a crime spree of attacking corporations that are developing newer security for commlinks and the Matrix. Their weapon is an army of BTL addicts, conditioned to launch agents via an interactive AR program. In their first crime, they pin it on Mafia lieutenant, Dean. The Runners are hired by Don Casquilho, to investigate the crime and bring a little âfamily justiceâ to the criminals.\nAfter figuring out how the crimes are committed, the ârunners then have to deal with Tina and Taske and provide evidence to Don Casquilho of the completed job.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-05A - Through A Rose Colored Display Link.pdf',
					size: '971018',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-05B - Through A Rose Colored Display Link.pdf',
					size: '1688195',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM02-03',
		{
			sku: ['SRM02-03'],
			category: 'mission',
			type: 'digital',
			name: 'The Grab',
			releaseDate: ['2006'],
			description: 'The runners are contacted via commlink by an Asian Ms. Johnson. She informs them that she wishes to hire them to perform a simple extraction. When negotiations are complete, Ms. Johnson produces a photograph of a young girl, approximately age eleven, and a name: Catherine Westmore.\nThis little girl is the target.\nThe assignment is simple: Do some basic legwork to locate the target, determine the best circumstances in which to stage the extraction, retrieve the girl, and deliver her safely (and most importantly, unharmed) to a second team who will be awaiting her arrival at a safe house in the Aurora Warrens. Once the girl is safely delivered into the second teamâs care, the remainder of the runnersâ fees will be transferred into their accounts.\nThe runners will have to contend in some way with Jack âFrostâ McPherson (a highly trained ex-marine who now works as Catherineâs personal bodyguard) and his friends who comprise the whole of local runner team The Trinity.\nOnce the runners have the target in hand, they will find themselves ambushed en route to the Aurora Warrens safehouse by The Trinity, attempting to get the girl back and help save their former comrade-inarmsâ reputation and his career.\nWith the final obstacle neutralized, the runners can deliver the girl safely to the Aurora Warrens safehouse, after which they can go on about their business content that their rent is once again paid, and they donât have to worry about missing any meals. The following morning they will get a rude awakening when they turn on their trids to discover that an innocent little girl by the name of Catherine Westmore died in a ransom drop gone wrong, when Lone Star officials failed to notice the sniper lurking on a nearby rooftopâ¦\nMore humane runners may stop to consider, perhaps for the first time (perhaps not), just how strong an impact their lives can have--for better, or worse. Less humane runners may take a more cynical stance, facing the harsh truth that if they hadnât done the job someone else would have, and they would instead be the ones falling behind on their bills.\nBut none of that will change the fact that their utilities wonât be cut off this month, their stomachs wonât growl, and a child is dead in the street; and there isnât one damn thing they can do about itâ¦\nYet.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-03A - The Grab.pdf',
					size: '617347',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-03B - The Grab.pdf',
					size: '1260047',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM02-04',
		{
			sku: ['SRM02-04'],
			category: 'mission',
			type: 'digital',
			name: 'Thrash the Body Electric',
			releaseDate: ['2006'],
			description: 'Mr. Johnson hires the runners to disrupt operations of a facility run by Rocky Mountain Dynamics (RMD), to âencourageâ them to sell the property to his company. The runners are left to their own devices to determine how to harass RMD. As the tempo of their activities increase, the plant managerâs connection to the Mafia may complicate the job for the runners. Although the runners are not told how many acts of harassment should occur, their actions will trigger the sale of the facility after two or three successful operations. Unfortunately, although RMD does sell the embattled facility, it is not to the buyer expected.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-04A - Thrash the Body Electric.pdf',
					size: '522769',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-04B - Thrash the Body Electric.pdf',
					size: '2572010',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM01-01',
		{
			sku: ['SRM01-01'],
			category: 'mission',
			type: 'digital',
			name: 'Double Cross',
			releaseDate: ['2004'],
			description: 'Mr. Johnson has some serious personal problems with a certain corporate executive. He would like for you to help in reducing these problems â permanentlyâ¦',
			gameDate: '2064',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 1/SRM01-01A - Double Cross.pdf',
					size: '189164',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 1/SRM01-01B - Double Cross.pdf',
					size: '344743',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM01-02',
		{
			sku: ['SRM01-02'],
			category: 'mission',
			type: 'digital',
			name: 'Strings Attached',
			releaseDate: ['2004'],
			description: 'Youâre hired to extract some VIPs from a secure facility and then destroy any evidence or witnesses that you were there. Of course, there are strings attached: the VIPs are not very cooperative and must be unharmed. You always did enjoy a challenge!',
			gameDate: '2064',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 1/SRM01-02A - Strings Attached.pdf',
					size: '223250',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 1/SRM01-02B - Strings Attached.pdf',
					size: '426823',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM00-05',
		{
			sku: ['SRM00-05'],
			category: 'mission',
			type: 'digital',
			name: 'A Dark and Stormy Night',
			releaseDate: ['2004'],
			description: 'It was a dark and stormy night - traveling near Glow City in the Redmond Barrens during a hail storm is not your idea of a good time, especially when things go bump in the night!',
			gameDate: '2061',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 0/SRM00-05A - A Dark and Stormy Night.pdf',
					size: '181965',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 0/SRM00-05B - A Dark and Stormy Night.pdf',
					size: '113907',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM00-03',
		{
			sku: ['SRM00-03'],
			category: 'mission',
			type: 'digital',
			name: 'FORCEd RECON',
			releaseDate: ['2004'],
			description: 'The ancient ninjas were more than assassins, they were also experts in spying and inteligence gathering. A new research facility has just ben built, and someone wants to get as much paydata on their operations in case future incursions are necessary. Become the modern ninja and name your pay!',
			gameDate: '2061',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 0/SRM00-03A - FORCEd RECON.pdf',
					size: '229182',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 0/SRM00-03B - FORCEd RECON.pdf',
					size: '1096231',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM00-04',
		{
			sku: ['SRM00-04'],
			category: 'mission',
			type: 'digital',
			name: 'A Fork in Fate\'s Path',
			releaseDate: ['2004'],
			description: 'A runnerâs gotta do what a runner has to do. Or does s/he? For once, you get a choice of two different runs. Time limits your choice to one or the other, but not both. But remember chummer that looks can be deceiving, and that all that glitters is not gold--like the hyper velocity gel round of an angry Lone Star Cop, just as an exampleâ¦',
			gameDate: '2061',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 0/SRM00-04A - A Fork in Fate\'s Path.pdf',
					size: '207580',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 0/SRM00-04B - A Fork in Fate\'s Path.pdf',
					size: '537876',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM01-06',
		{
			sku: ['SRM01-06'],
			category: 'mission',
			type: 'digital',
			name: 'Lost and Found',
			releaseDate: ['2005'],
			description: 'It\'s a simple job. Something was stolen and someone wants it back. How complicated could it be?',
			gameDate: '2064',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 1/SRM01-06A - Lost and Found.pdf',
					size: '288375',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 1/SRM01-06B - Lost and Found.pdf',
					size: '436927',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM01-07',
		{
			sku: ['SRM01-07'],
			category: 'mission',
			type: 'digital',
			name: 'Keys to the Asylum',
			releaseDate: ['2005'],
			description: 'What happens when a corporation grows too fast? Sooner or later, someone is going to make a mistake, someone will have to pay the cost, and someone will have to clean up the mess. Who is really holding the keys to the asylum?',
			gameDate: '2064',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 1/SRM01-07A - Keys to the Asylum.pdf',
					size: '262544',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 1/SRM01-07B - Keys to the Asylum.pdf',
					size: '687202',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM01-05',
		{
			sku: ['SRM01-05'],
			category: 'mission',
			type: 'digital',
			name: 'A Walk in the Park',
			releaseDate: ['2005'],
			description: 'Will you do anything for money? How about escort a group of wealthy clients for a day? Is it just a walk in the park, or something more?',
			gameDate: '2064',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 1/SRM01-05A - A Walk in the Park.pdf',
					size: '181163',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 1/SRM01-05B - A Walk in the Park.pdf',
					size: '236724',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM01-03',
		{
			sku: ['SRM01-03'],
			category: 'mission',
			type: 'digital',
			name: 'Harvest Time',
			releaseDate: ['2004'],
			description: 'The members of an urban tribe are brutally murdered and left for dead. Who could do such a thing? Vampires, ghouls, gangs, or just some crazed lunatic? Nope, a greedy corporation that needs fresh organs! Help recover the evidence before it is destroyed and stop them!',
			gameDate: '2064',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 1/SRM01-03A - Harvest Time.pdf',
					size: '228292',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 1/SRM01-03B - Harvest Time.pdf',
					size: '173342',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM01-04',
		{
			sku: ['SRM01-04'],
			category: 'mission',
			type: 'digital',
			name: 'The Gambler',
			releaseDate: ['2004'],
			description: 'An opportunity for a payday! Your fixer lets you know that a client is looking for a datasteal in a previously scouted location. Get in, get the paydata, and get out, all without leaving a trace or a trail of destruction. Know when to hold âem and know when to fold âem.',
			gameDate: '2064',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 1/SRM01-04A - The Gambler.pdf',
					size: '333070',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 1/SRM01-04B - The Gambler.pdf',
					size: '695026',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM02-20',
		{
			sku: ['SRM02-20'],
			category: 'mission',
			type: 'digital',
			name: 'Career Path',
			releaseDate: ['2007'],
			description: 'Harold Benson hires the runners to prevent one of his researchers, Marvin Fitz, from being extracted. Benson knows the extraction is voluntary, but does not disclose this information. He explains that Marvin has a non-working prototype with him that must be kept out of the competitionâs hands at all costs.\nBenson suggests that the PCs start at Fitzâs apartment, where they may learn that his extraction was voluntary. From there, they catch up to Marvin in the plaza of the Happy Canyon shopping mall in Chinatown.\nAfter a quick negotiation, the real extraction team, a professional squad working for the Vory, ambushes them. The Vory team knows Fitz has implanted his research project into his own head, and that it works, but they donât know what it does. The opposing team also knows that the extraction is a scam: Fitz is actually being captured to be sold to the highest bidder.\nFrom there, itâs a matter of safely securing Fitz and deciding what to do with him.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-20A - Career Path.pdf',
					size: '973717',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-20B - Career Path.pdf',
					size: '1190987',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM02-21',
		{
			sku: ['SRM02-21'],
			category: 'mission',
			type: 'digital',
			name: 'Happenstance',
			releaseDate: ['2007'],
			description: 'This adventure focuses on gathering information about some non-sanctioned biz in Triad territory. The Golden Triangle has received word that a Johnson has been hiring runners for several months now to smuggle goods through Chinatown. They know that he works out of a local bar/nightclub called Happenstance. Despite the fact that Happenstance is controlled by the Casquilhos, Triad forces attempt to crash Mr. Johnsonâs party. The runners are among the witnesses. During the melee, runners see Mr. Johnson and his team. Having seen their faces, the Golden Triangle hires the runners to find out all they can about Mr. Johnson, the meet, and the biz.\nDespite being a simple package delivery, the runners find they are not alone. The Casquilhos, the Koshari, and the Vory are interested in the delivery. Along the way, the package stops at a warehouse, crosses the CAS/UCAS border, and ends in the Aurora Mall. The runners find that the package is destined for Tamanous organleggers. Can they get out with their skins intact?',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-21A - Happenstance.pdf',
					size: '1117429',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-21B - Happenstance.pdf',
					size: '951072',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM02-19',
		{
			sku: ['SRM02-19'],
			category: 'mission',
			type: 'digital',
			name: 'By Any Means Necessary',
			releaseDate: ['2007'],
			description: 'The Kirillov Vory have made inroads into the Warrens, rolling street gangs where possible and destroying others. With their growing influence, the Golden Triangle has lost a number of brothels and enforcers. Mikael Petrov has formulated a plan to drive a wedge between the Triad syndicates by specifically targeting the Golden Triangle and not harming the White Lotus.\nIn addition to the wedge Petrov wants to drive between the Triads, he is cleaning up a few loose ends of his own. He is trying to deal with the now defunct Fomin Vory, Tamanous (ghoul organleggers), and the Fronts â a local gang who has become a recurring thorn in his side (see SRM02-10 Twist and Insult). ',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-19A - By Any Means Necessary.pdf',
					size: '848866',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-19B - By Any Means Necessary.pdf',
					size: '1488590',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM02-17',
		{
			sku: ['SRM02-17'],
			category: 'mission',
			type: 'digital',
			name: 'Patient Zero',
			releaseDate: ['2007'],
			description: 'The team is sent to the Yakuza casino on the advice of a trusted fixer. When they arrive, the AR system goes down, and the Yakuza hire the team (with a level of courtesy based on the teaM\'s relationship with the Yakuza) to find out who had done it and bring them to justice â permanently. The team starts to track the phenomenon, and finds a similar occurrence at a local mental health facility. Investigating, they find that a patient named "Mary" was admitted with extreme schizophrenic psychosis, but suddenly recovered and checked herself out. The team tracks her to the University Psychology Department\'s library, where she is working. She avoids questions like a pro, but tries to slip the team a clue when the AR system goes down and Knight Errant is called.\nThe team escapes and is contacted by the Yakuza, who now have security tapes available. The team discovers that Mary was on the scene at the casino. When they track her down, they find that she has holed up in an automated factory that builds drones, vehicles, and display links, among other things. They find that Mary is the unwilling host of Taske, a free sprite from SRM02-05 Through a Rose Colored Display Link. The team has a nasty fight with the factory\'s equipment, and (hopefully) brings the culprit to justice.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-17A - Patient Zero.pdf',
					size: '1002066',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-17B - Patient Zero.pdf',
					size: '1652936',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-17 - Taske - Sound Bite.mp3',
					size: '388845',
					mime: 'audio/mpeg4-generic'
				}
			]
		}
	],
	[
		'SRM02-18',
		{
			sku: ['SRM02-18'],
			category: 'mission',
			type: 'digital',
			name: 'A Very Bad Day',
			releaseDate: ['2007'],
			description: 'It\'s a bad day. The Frog Sorcerer (from ancient Pueblo legends) has come into power and has used it to cause a large mana storm. During the height of the storm, the Frog Sorcerer creates an astral rift and a Displacement Alchera (SM p.115) manifests, but he\'s not powerful enough to "jump ship" and become a free spirit, escaping the planes.\nMeanwhile, the runners find the worst luck following them just trying to get to a job downtown in this weather. When they finally get to the meet, they find Mr. Johnson dead, and no nuyen on him to compensate for the trip to the Hub.\nJust then, another opportunity shows up at the bar where they were to meet the late Mr. Johnson. Aaron Drey has been watching the storm anticipating something. When the Alchera opens, he recognizes the landscape. He believes that, through the alchera, the runners can locate the spirit Yuichotol for him. When the Runners get into the mountains of the Alchera, they unknowingly move through the rift into the metaplane of the ancient Pueblo.\nThe runners get off on the wrong foot as bad luck still lingers around them, but can obtain guidance in their search for Yuichotol. After battling mythical creatures and the Frog Sorcerer himself, the runners search comes up empty as Yuichotol has moved from this metaplane. However, the runners may recover a vessel for Yuichotol.\nAs the runners leave, they find that theyâve exited the metaplane at a different part of the alchera, and wind up in the office building across the street. They have to get out of that building, run back across the street, and present the skull to Aaron, who attempts to "Reverse Engineer" the spirit formula from the Construct in a creative Chaos style of magic.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-18A - A Very Bad Day.pdf',
					size: '917638',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-18B - A Very Bad Day.pdf',
					size: '1168877',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM02-25',
		{
			sku: ['SRM02-25'],
			category: 'mission',
			type: 'digital',
			name: 'Done Deal',
			releaseDate: ['2007'],
			description: 'An item known as The Dragon Stone has been in circulation in the Denver shadows for a bit. While it started out in Yakuza control, the events of SRM02-08 Chasing the Dragon put it in the hands of a Triad lieutenant. During SRM02-24 Hubris and Humility, she lost the item. Now, thereâs a mad scramble in Denverâs Underworld to recover the item. The team unwittingly finds that they have the rare artifact. The question that is raised is â to whom will they give it?\nThe various factions of Denver all want a piece of the action. However, Ghostwalker is interested as well. The team must decide the level of risk that theyâre willing to undertake to achieve their reward.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-25A - Done Deal.pdf',
					size: '1617066',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-25B - Done Deal.pdf',
					size: '1348586',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM03-00X',
		{
			sku: ['SRM03-00X'],
			category: 'mission',
			type: 'digital',
			name: 'Missions Season 3',
			releaseDate: ['2009-03'],
			description: 'Base files for season 3',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 3/SRM03-00 - Character Transfer Guide.pdf',
					size: '1169175',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 3/SRM03-00 - SRM Season 3 FAQ & Karma Rollover Log.pdf',
					size: '1265771',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM02-24',
		{
			sku: ['SRM02-24'],
			category: 'mission',
			type: 'digital',
			name: 'Hubris and Humility',
			releaseDate: ['2007'],
			description: 'Over the last two years, the Vory have made deep inroads into several areas of Denver. They still do not have direct control over any province but have an increasing power base with only a few stumbling blocks in their way. The road to power has had its own set of hardships and now alliances must be reforged or broken. Irina Klavikov has worked her way into Mikael Petrovâs bed and presented a gift that may be enough to buy his loyalty away from the ties of blood and the Kirillov Vory.\nIn SRM 02-13, Irina and Mikael gathered blackmail material on Lin Yao after her attempt to hire shadowrunners to kill An Peng and kidnap another Triad member. Unfortunately, their control over Lin is incomplete. Lin has agreed to complete the task they have approached her on, but plans on having a backdoor. Meanwhile, the Triad has learned about Lin Yaoâs indiscretions and takes their own action.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-24A - Hubris and Humility.pdf',
					size: '760403',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-24B - Hubris and Humility.pdf',
					size: '996363',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM02-22',
		{
			sku: ['SRM02-22'],
			category: 'mission',
			type: 'digital',
			name: 'Backlash',
			releaseDate: ['2007'],
			description: 'The Chavez family has recently had some setbacks due to Koshari interference with their business operations, in spite of the Lakeside treaty. Deciding that enough was enough, they chose to make an object lesson of a known Koshari Johnson and took his bodyguard captive for leverage to attempt to turn a known corporate fixer to their own services.\nMatt Greyfox, the bodyguard, is a former lover and still close friend of Tabbyâs. She is irate that Omar Chavez is attempting to use her friend to blackmail her, but she is also in a bind as the bodyguard is the son of one of Tabbyâs corporate contacts. Unhappy about his sonâs choice to become a bodyguard in the shadows, but believing that each person must choose their own path, the suit was unwilling to force the issue. Instead, he asked Tabby to strike up an acquaintance with his son and keep an eye on him. She honored that request but it became something more. Tabby now finds herself concerned about how the father may react if he learns about the affair and how his son has become a bargaining chip. She wants the situation resolved quickly. Once she heard about the runnersâ plight and discovered where Matt was being held, she contacted the team. She believes they are the perfect people to teach Omar Chavez a lesson that he should take to heart, while maintaining her corporate connections.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-22A - Backlash.pdf',
					size: '727437',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-22B - Backlash.pdf',
					size: '921879',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM02-23',
		{
			sku: ['SRM02-23'],
			category: 'mission',
			type: 'digital',
			name: 'Prodigal Son',
			releaseDate: ['2007'],
			description: 'As any made-man can tell you, switching sides once youâre in is just asking for a double-tap in the back of the head. But, what if the defector is simply too valuable to the organization? They may know too much or hold a strategic position. The reasons donât really matter. In the end, they canât be released nor can they simply be killed. What then?\nThis is the position between the Koshari and Nathaniel Howlingcoyote, aka Alesandro IbÃ¡Ã±ez. (see SRM02-14 Wetwork Pure and Simple for more of Nathanielâs back story.)\nA few weeks ago, through various sources, the Koshari discovered Alesandroâs duplicity. While remaining on the surface at least, a loyal Koshari, he was secretly smuggling certain rare and esoteric materials into Denver through a company called XCR and, in turn, to the Vory. The Vory were moving the materials to a secret Tamanous hideout located underneath the Aurora Mall. Theyâd made a deal to supply the organleggers with chemicals and apparatus along with âraw materialsâ for their operation. These chemicals were being used for fetus farming (see SRM02-21 Happenstance and SRM02-15 Critical Care).\nNormally, a Koshari underling found to be working with another crime organization would be loudly and publicly murdered along with any and all accomplices and left as a warning that such behavior would not be tolerated. But Alesandro was a special case. He was the majority shareholder of XCR and its current CEO. Killing him would deprive the Koshari of millions of nuyen, not to mention the inroads with Evo, and the companyâs potential utility to the Koshariâs own smuggling operations. Since killing him was out of the question, the only answer left was to bring him back into the fold.\nThe easiest way to do this is to ensure that the Vory have reason for wanting him dead. Then Alesandro will have no choice but to return to the Koshari in the hopes that they will protect him. Since the Vory do not accept excuses nor do they forgive failure, this shouldnât be too difficult. All it should take is a series of late, lost, or simply stolen deliveries.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-23A - Prodigal Son.pdf',
					size: '820358',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-23B - Prodigal Son.pdf',
					size: '1160447',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM02-10',
		{
			sku: ['SRM02-10'],
			category: 'mission',
			type: 'digital',
			name: 'Twist and Insult',
			releaseDate: ['2006'],
			description: 'With the exodus from Mother Russia, the Avtoritey and Vory have been bringing their families to North America and settling into their old ways. Six months ago, several of these families made their way to Denver. After dividing the city along the national boundaries, each Vor and Avtoritet began to slowly expand through their own means.\nMaria Kirillova, the only daughter of Nikolai Kirillov, began seeing Tony a few months ago.  After realizing that Tony was second in command, she did what any good Vory wife would have done and killed the leader of the gang.  Unfortunately, Tony was distraught over Jonnyâs death and so Maria never told him. Now Tony wants to runaway from the gang and Denver, so that he and Maria can get married and live together.\nMeanwhile, Nikolai Kirillov has learnt of the death of the leader of the Three Kings and wants to make his move to absorb the gang before they join someone else. The runners have just completed a run for him so they are immediately at hand when he decides to move.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-10A - Twist and Insult.pdf',
					size: '937740',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-10B - Twist and Insult.pdf',
					size: '1574914',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM02-11',
		{
			sku: ['SRM02-11'],
			category: 'mission',
			type: 'digital',
			name: 'Rising Sin',
			releaseDate: ['2006'],
			description: 'The runners are hired by Tabby to raid a Yakuza parlor. The 3-story building is situated in the UCAS sector. Itâs an old but well maintained beige brick building in a quiet part of town. The Yakuza discreetly run an illegal brothel and casino from there.\nThe first floor serves as a posh welcoming lobby and lounge. Prostitutes and geishas not serving anyone lounge around and are on display for incoming clients. A kitchen also prepares small meals and snacks for customers, whether gamblers or those enjoying the services of the prostitutes. The back rooms serve as security HQ for the operation. Yakuza soldiers monitor camera feeds and other security measures, as well as standing-by in case of trouble.\nThe 2 stories above ground are simply hotel-like rooms where customers enjoy the services of the prostitutes. There are about a half a dozen rooms per floor, so a dozen in total. Yakuza security is discreet here. Nothing much of interest for the runners.\nThe building also has a basement, where the casino is. The usual attractions can be found, ranging from cards to roulette to mah jong. The setting continues to be posh, but security here is more obvious and well armed, reminding customers that cheating is a very bad idea, as well as protecting valuables. There are also a number of customers, employees and waitresses.\nThe runnersâ target is a small room connected to this casino. It is protected by additional security measures, and it holds important offline data. The runner team will have to access this server to obtain the paydata they are after. The mainframe will be hackable, especially for a team with a competent hacker or technomancer. An alternate method would be to force a captured Yakuza technician to give them access codes.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-11A - Rising Sin.pdf',
					size: '867114',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-11B - Rising Sin.pdf',
					size: '1399084',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM02-08',
		{
			sku: ['SRM02-08'],
			category: 'mission',
			type: 'digital',
			name: 'Chasing the Dragon',
			releaseDate: ['2006'],
			description: 'The runners are hired by a Ms. JohnsonâJunko âLady Jadeâ Tetsuya or Donna Westmore, dependingâto locate and bring to justice the murderer of 11-year-old Catherine Westmore, whose fate was sealed by the events of SRM02-03: The Grab. Finding Catherineâs killer requires all of the teamâs ingenuity and resolve. Eventually, they find Takeshi Modori, former lover of Lady Jade and prime suspect in Catherineâs murder investigations hiding at Mystic Curiosities, a Talismonger\'s shop in CAS.  Takeshi tells them that he witnessed Catherine gunned down by her own father.\nTheir investigation resumes on the trail of Kazuya âThe Dragonâ Hotomi: an ex-Yakuza assassin. Kazuya has cut a deal with Lin Yao, a White Lotus Triad lieutenant for protection. To bring Kazuya to justice, the runners will have to deal with Lin Yao or infiltrate Klub Karma: a Triad controlled club in the heart of Chinatown. By doing so, they risk earning the enmity of the powerful organization.\nOnce Catherineâs killer is in their hands, they are to take him to an abandoned flophouse in the Aurora Warrensâthe very spot where Catherineâs life ended. There, Ms. Johnson exacts her revenge either by using the runners to brutally torture Kazuya or, if the runners were involved in Catherineâs death, by betraying them and attempting to bring their lives to a fitting end.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-08A - Chasing the Dragon.pdf',
					size: '1333649',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-08B - Chasing the Dragon.pdf',
					size: '2183723',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM02-09',
		{
			sku: ['SRM02-09'],
			category: 'mission',
			type: 'digital',
			name: 'Tunnel Vision',
			releaseDate: ['2006'],
			description: 'During the excavation for the foundation of a new building, a forgotten drainage pipe was found. Wuxing, who owns the building site, suspects it leads under the nearby sector border into the neighboring sector. They sent in an exploration team. This team reported some disturbing findings via commlink. Then all communication broke down.\nEnter the runners. Wuxing hires them to explore the drainage system, find the first exploration team and bring them back alive, if possible.\nIt all comes down to a bit of a dungeon crawl with the runners never knowing what horrors lurk around the corner. Along the way, they may find one very disturbed member of the first exploration team.\nThe finale has the runners entering the final chamber where Enrico Trebol, an Aztec Blood Mage, is just finishing a nasty sacrifice ritual on the survivors of the missing team. Trebol is crazed and confused.  Heâs spent years living alone in the tunnels, forgotten by the corp when Ghostwalker threw Aztechnology out of Denver. He has spent years transforming the tunnels to accommodate his crazy delusions.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-09A - Tunnel Vision.pdf',
					size: '1167733',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-09B - Tunnel Vision.pdf',
					size: '899611',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM02-12',
		{
			sku: ['SRM02-12'],
			category: 'mission',
			type: 'digital',
			name: 'Winter Wonderland',
			releaseDate: ['2007'],
			description: 'Ardentâs head hurt. He felt bruised all over, like bailing without a parachute. Everything was hazy, he couldnât remember what happened the last fewâ¦hoursâ¦days. âDid I crash? Wait, no, I landedâ, he thought.\nMemories started coming back. He remembered that he landed, taxied to the hangar, the Koshari met him, and then everything went black; black and painful. The Koshari werenât pleased that the cargo was missing. He tried to explain that he saw a ZDF plane coming at him and he dumped the cargo. Unfortunately he couldnât explain why he was so far off course. They thought he sold it to a competitor. Ardent mumbled to himself, âShould have kept flying.â The Koshari donât like mistakes, and this was Ardentâs second.\nHis first only cost him repayment plus interest. A light sitting on a table pushed the shadows back. Ardent was seated in a chair with his hands tied behind his back. The room was vast beyond the darkness. Even with thermal and lowlight in his cyber eyes, there wasnât much to make out.\nFootsteps echoed behind Ardent. âGood news, Mr. Ardent, your planeâs logs confirm your statement. You can be on your way. Any further obligations we had with you are terminated as your services are no longer needed,â said a voice from behind him.\nA figure of a man walked just past Ardent. It resembled the Mr. Johnson who hired him, though with the Hopi mask, it was impossible to be sure. The man continued as he put down a case and opened it, âBefore you go, there is the matter of payment. Cash isnât optional.â\nArdent looked up confused. When he saw the man turn around holding a scalpel, he finally understoodâ¦',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-12A - Winter Wonderland.pdf',
					size: '975415',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-12B - Winter Wonderland.pdf',
					size: '1467460',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM02-15',
		{
			sku: ['SRM02-15'],
			category: 'mission',
			type: 'digital',
			name: 'Critical Care',
			releaseDate: ['2007'],
			description: 'A DocWagon executive, Brent Fuller, hires the team to investigate a situation regarding patients that are disappearing. They are told that the investigation must be kept absolutely quiet for public relations purposes. He gives them the files on the three missing women.\nLegwork provides the runners with leads on a fake DocWagon ambulance, potential additional victims, and the grunts responsible for the kidnappings.\nEventually, the runners learn about the Farm â a site where metahumans are grown for organ harvesting. To their horror, they discover ghouls run the site. The run concludes as the team fights their way free with the survivors while the ghouls or their associates pursue.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-15A - Critical Care.pdf',
					size: '1013696',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-15B - Critical Care.pdf',
					size: '1590650',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM02-16',
		{
			sku: ['SRM02-16'],
			category: 'mission',
			type: 'digital',
			name: 'Primal Forces',
			releaseDate: ['2007'],
			description: 'When precious resources are in transit inside Denver, itâs difficult for the various factions to stay idle. And when every faction has a reason to try to get hold of it, that leaves many decisions to the runners about their allegiance.\nIn this adventure, the runners are hired by the Casquilho mafia to retrieve two bioengineered animal specimens on display during an international scientific conference on wildlife preservation. The Yamato Yakuza clan is providing protection for the animals. These highly intelligent animals will follow the runners until their delivery.  Between the retrieval and the delivery, other factions hear about that and make their offers to the runners to get the animals for themselves.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-16A - Primal Forces.pdf',
					size: '807806',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-16B - Primal Forces.pdf',
					size: '1673245',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM02-13',
		{
			sku: ['SRM02-13'],
			category: 'mission',
			type: 'digital',
			name: 'Take Out Service',
			releaseDate: ['2007'],
			description: 'After taking a call to meet at the Splatter Bar, the runners are contracted to collect black mail material on Lin Yao. The Vory want the runners to eliminate another team of runners and take a job from Lin Yao. It is important that they record the meeting, and after completing the secondary run bring one of the participants (Chun Xiang) from that run back to the Vory.\nLin Yaoâs job involves kidnapping a woman who is the current lover of a member of the Triad and the former lover of Lin Yao. Itâs believed that the recording plus the risk of harm to Chun will give them sufficient leverage on Lin to get what the Vory want. The fact that Chun is also a skilled smuggler is just an additional bonus in Fominâs mind.\nOnce the team decides who theyâre actually willing to work for and how theyâll follow through on the run, they need to deal with at least one of several Johnsons all looking for a double cross.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-13A - Take Out Service.pdf',
					size: '734752',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-13B - Take Out Service.pdf',
					size: '1803280',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM02-14',
		{
			sku: ['SRM02-14'],
			category: 'mission',
			type: 'digital',
			name: 'Wetwork Pure and Simple',
			releaseDate: ['2007'],
			description: 'This run focuses on an assassination near the town of Leadville. The characters are hired because Mr. Johnson (a Koshari plant) believes that his superiors had his corporate wife murdered and that one of his rivals gave the order.  The runners will have to cross the border into PCC territory, travel through almost 200 km of PCC territory, kill the target, and return.  Mr. Johnson will also stipulate that the run must be completed in three days, the death must appear accidental, and collateral damage must be kept to a minimum.\nOn the way there and back, they will have to deal with tightened security at the borders, getting around a gang turf war, altitude sickness (and other high-altitude problems), and overly curious PuebSec officers.  The targetâs residence contains a corp bodyguard team, magic and mundane defenses, and a few surprises.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst', 'wizkids'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-14A - Wetwork Pure and Simple.pdf',
					size: '946071',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 2/SRM02-14B - Wetwork Pure and Simple.pdf',
					size: '1024518',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27452',
		{
			sku: ['27452'],
			category: 'mission',
			type: 'digital',
			name: 'Book of the Lost',
			releaseDate: ['2017-03'],
			description: 'The Bastard, upright. A man in clown makeup stands in a broken skyraker window over another man on the verge of a long plummet. Near the clownâs hand, a white rose. Opportunity, adventure, but also mania and frenzy. 404, upright. A woman crouches on the edge of a rooftop, holding a white rose. In the distance is the image of a woman in a red dress. Destruction, failure, collapse. Queen of coins. A woman in a red dress, lounging amidst luxury. She has material wealth but emptiness of soul. Upright, she is opulence, magnificent. Inverse is suspense, fear.\nOpportunity and adventure abounds. Destruction and failure loom. Will the result be magnificenceâor fear?',
			gameDate: '2079-02',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/27452 - Book of the Lost.pdf',
					size: '9471690',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27450',
		{
			sku: ['27450'],
			category: 'mission',
			type: 'digital',
			name: 'Bloody Business',
			releaseDate: ['2015-05'],
			description: 'A scared megacorporation does not run and hide in the shadows. Instead it lashes out, swiping with sharp claws, not caring who is hit by the blows. Many of the megacorps are currently reeling, hit by multiple harsh wallops. NeoNET and Evo are dealing with the fallout of the CFD virus, Ares has powerful forces eating it away from inside, Horizon backed the losing side of the Aztlan-Amazonia war, and the Japanacorps are rearing back to take on the worldâand each other. When the corps get aggressive, shadowrunners get called, and blood gets shed.',
			gameDate: '2077-02',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/27450 - Bloody Business.pdf',
					size: '29607066',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27481',
		{
			sku: ['27481'],
			category: 'mission',
			type: 'digital',
			name: 'Firing Line',
			releaseDate: ['2013-08'],
			description: 'Shadowrunning can take you all sorts of different places and give you the chance to have all sorts of different guns pointed at you. Whether youâre exploring mysterious islands off the coast of Seattle, collecting bounties on the tightly guarded streets of Manhattan, or trying to survive the chaos and conflict in BogotÃ¡, youâre likely to find yourself in trouble and in the line of fire. Because thatâs where youâre paid to be.\nFiring Line collects four Shadowrun Missions developed especially for the large summer gaming conventions, making them available for the first time to the gaming public. The adventures have all the statistics and game information needed for both Shadowrun, Fourth Edition and Shadowrun, Fifth Edition, meaning that a wide range of shadowrunners will have everything they need to dive into the adventures and get themselves in some high-paying trouble!',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/27481 - Firing Line.pdf',
					size: '5138899',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27480',
		{
			sku: ['27480'],
			category: 'mission',
			type: 'digital',
			name: 'Sprawl Wilds',
			releaseDate: ['2013-07'],
			description: 'You live in any sprawl long enough, youâll find out that thereâs a lot more to it than businessmen and soykaf stalls. Any sprawl worth its mettle has its dark corners, its forgotten places, its spots that are just as wild and untamed as the deepest rainforest.\nSeattle, the prime metroplex in the world for shadowrunning, is filled with such places, and Sprawl Wilds gives shadowrunners a chance to tour them. From a fortress-like Barrens farm recovering from a mysterious attack to a dark secret hidden in a clinic, runners have a chance to see the sites most people never encounter, and uncover information that some people want to stay secret at any cost. Theyâll meet jaded smugglers, wary police officers, passionate activists, hardened criminals, wounded warriors, and at least one deranged killer. The questions are, will they survive long enough to collect a paycheckâand how much of the sprawl will be nothing more than dust when theyâre done with it?',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/27480 - Sprawl Wilds.pdf',
					size: '11441395',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27409',
		{
			sku: ['27409'],
			category: 'mission',
			type: 'digital',
			name: 'Boardroom Backstabs 3: Battle of Manhattan',
			releaseDate: ['2015-02'],
			description: 'TO: Willing recruits\n\nFROM: The people who can pay you\n\nCome to Manhattan. We will pay.\n\nWe wonât bother with appeals to patriotism, or to your best instincts, or to anything the least bit noble. Come to Manhattan because there is a fight breaking out. Fighting is what you are paid for. Fighting is what you were born for. Come because there is money to be made.\nYou donât need to pick a side. Sides shift, sides change. In the end, the only consistent thing is that you are the only one you can count on. You fight for yourself. That is something you should be used to. That is how you live.\nCome to Manhattan because the corporations are spoiling for a fight. Most of the time, weâre good at keeping our spats clean and civilized. We lie, we cheat, we steal, but we do not engage in anything as vulgar as open street fighting. Sometimes, though, we canât help ourselves. Sometimes, the tension gets to be too much, and it breaks, and it bursts into the open.\nThat time is coming.\nBring your skills, bring your wits, and definitely bring your guns. Youâll need everything you got. We are anxious to take advantage of what you have.\nCome to Manhattan. Weâre waiting for you.',
			gameDate: '2076',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/27409 - Battle of Manhattan (Boardroom Backstabs 3).pdf',
					size: '25022218',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27401',
		{
			sku: ['27401'],
			category: 'mission',
			type: 'digital',
			name: 'Serrated Edge',
			releaseDate: ['2016-03'],
			description: 'The Sixth World is many things, including a stunning series of case studies on the mechanisms of hate. There are some true experts out there, people who know that just walking up to someone or something you donât like and throwing a solid punch is satisfying, but nowhere near as satisfying as causing destruction that runs deep and lasts forever.\nThe Aurora Warrens of Denver hold a dark secret, as some people trusted to help its residents are instead giving full rein to their darkest impulses. Shadowruuners typically are not heroes riding in to save the day, but in this case the work theyâre being offered gives them a chance to dig into these secrets, perhaps fix some of them, and maybe even bring a few people to justiceâhowever they happen to define justice. With dark secrets, double-crosses, and plenty of nuyen flying around, Serrated Edge gives players plenty of chaos to keep up with while launching them into a series of adventures that will shake up the city of spies and maybe bring about a better future. Or curse it to worse.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/27401 - Serrated Edge.pdf',
					size: '12657799',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27400',
		{
			sku: ['27400'],
			category: 'mission',
			type: 'digital',
			name: 'Splintered State',
			releaseDate: ['2013-09'],
			description: 'Federal Agent Seth Dietrich has a secret. Actually, multiple secrets. One of them made him go underground, hiding from the people desperate to learn just how much he knows. And the other is keeping him from surfacing, because heâs found he canât even trust himself.\nIf Dietrich were in his right mind, heâd cover his tracks like a pro, and no one would find him. Especially not shadowrunners getting their feel for life on the streets. But heâs not in his right mind, which means a group of shadowrunners finds themselves in possession of some very valuable informationâinformation the highest powers in Seattle want for themselves. What started as a simple job turns into a scramble for their lives, a scramble that could become profitable if the runners play their cards right.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/27400 - Splintered State.pdf',
					size: '7131437',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27403',
		{
			sku: ['27403'],
			category: 'mission',
			type: 'digital',
			name: 'Ripping Reality (Denver Adventure 3)',
			releaseDate: ['2017-06'],
			description: 'The Denver sprawl has always been a battleground, but lately it seems to be at war with reality. People are disappearing from the streets, never to be seen again. Strange creatures are materializing out of nowhere, and sometimes they bring entire landscapes with them. Something has gone desperately wrong, and the stakes are so high that two enemies who had been locked in combat are setting aside their fight to find out what is happening and why.\nIf investigations into bizarre occurrences need to happen, then there are shadowruns to be done. The right team will have the chance to bring in an impressive payday, but theyâll have to navigate their way past old grudges, tainted magic, and creatures of pure destructive power waiting to be turned loose on the sprawl.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/27403 - Ripping Reality (Denver Adventure 3).pdf',
					size: '11113055',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27402',
		{
			sku: ['27402'],
			category: 'mission',
			type: 'digital',
			name: 'False Flag (Denver Adventure 2)',
			releaseDate: ['2016-12'],
			description: 'The ruling powers of Sixth World sprawls are content to let the little people of their cities engage in all sorts of shenanigans and scheming so long as it doesnât affect their master plans. But when the chaos gets too out of handâor the little people start acting too arrogantâthen those powers turn their angry gaze to the people they would rather ignore, and the everyday chaos of life erupts into something worse, and considerably more dangerous.\nRecent attacks on the Paladin Medical Health Center in the Aurora Warrens have drawn the attention of some of Denverâs powers, and theyâre not going to ignore the situation. Theyâre also not going to just send in the police, because thatâs not how things are doneâinstead, they will launch schemes of their own, with the opportunity to create chaos that makes the previous wildness seem like a sunny day in the Rockies.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/27402 - False Flag (Denver Adventure 2).pdf',
					size: '10215167',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27482',
		{
			sku: ['27482'],
			category: 'mission',
			type: 'digital',
			name: 'London Falling',
			releaseDate: ['2014-11'],
			description: 'Smoke & Shadows\nLondonâwhere the thick fog (sounds nicer than smog, doesnât it) makes for some truly deep shadows. Every crooked street, every cramped building holds a secret or two, as well as a person or two who will go to great lengths to ensure those secrets are kept. There is, for instance, the dark secret of a minor noble who has not been seen in Parliament in months. And the researcher who has a startlingly large amount of people interested in his work. The courier who carries one secret in his head and another in his gut. And an explosive secret that has been festering in the West End Underplex for years or even decades.\nSkilled runners have the chance to uncover these secrets and more, but theyâd better be ready for the forces of the world that would prefer to keep things covered up. They are tenacious, dangerous, and, perhaps most surprising for England, not at all polite.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/27482 - London Falling.pdf',
					size: '9045643',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7304',
		{
			sku: ['7304'],
			category: 'mission',
			type: 'scan',
			name: 'Queen Euphoria, A Shadowrun Adventure',
			releaseDate: ['1990-09-01'],
			description: 'It was a simple job, and the pay was good. Snatch Euphoria, the simsense star, sit on her for a weekend, and let her go. Easy.\nIf you believe that, you\'ve never run the shadows.\nBecause now she\'s been snatched for a second time... and the corps think you did it.\nWhat does all this have to do with - Ambergel, the most popular junk food in Seattle?\nA former Coyote shaman?\nAn evil power so strong it threatens all mankind?\nFind the Queen. Find the answers.\nHURRY!',
			gameDate: '2050',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7304 - Queen Euphoria.pdf',
					size: '5368407',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7303',
		{
			sku: ['7303'],
			category: 'mission',
			type: 'scan',
			name: 'Dreamchipper',
			releaseDate: ['1990-04'],
			description: 'Ladies of the night are being murdered and butchered with the skill of a surgeon.\nThe Gaslight Ghoul has returned, and he stalks the streets of Seattle!\nIn Shadowrun, the rampant substance of the 19th and 20th centuries are now as archaic as 8-track audio tapes. Now the escape of choice is the BTL, or Better Than Life chip. Plug it in and all physical pleasures, desires, and hopes suddenly pale by comparison. Some "experimental" chips are missing, and you\'ve been hired to find them. But an investigation of simple theft is turning into a grisly trail that seems to have no rhyme or reason. Now you are beginning to wonder â¦ can these chips program someone to be a serial killer?',
			gameDate: '2050',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7303 - Dreamchipper.pdf',
					size: '12652228',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7306',
		{
			sku: ['7306'],
			category: 'mission',
			type: 'scan',
			name: 'Harlequin',
			releaseDate: ['1991-01'],
			description: '"Imagine a hatred that has endured for 5000 years...."\nThe shadowrunners are sent on a string of missions, collecting obscure items, all seemingly unrelated... or are there? From the streets of Seattle to the frigid heights of the Bavarian Alps, from the magical mayhem of Columbia, Missouri to the headwaters of the Amazon, the adventure unfolds.\nWho would go to all this trouble to destroy one man... and why?\n	A datafile\n	An ancient magic tome\n	A Flower\n	A collection of Elven ears\n	The manuscript of a soon-to-be-released bestseller\n	A young woman of mysterious heritage\n	A world-famous Elven social theorist\nAll are pieces to the puzzle.\nFinding them is one thing.\nPutting it all together is another!',
			gameDate: '2051',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7306 - Harlequin.pdf',
					size: '21727274',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7305',
		{
			sku: ['7305'],
			category: 'mission',
			type: 'scan',
			name: 'Bottled Demon',
			releaseDate: ['1990-07-01'],
			description: 'Bottle, Bottle, who\'s got the Bottle?\nThe shadowrunners meet a very disturbed man who hires them as bodyguards on a business deal.\nBottle, Bottle, who wants the Bottle?\nNow the man is dead, and they don\'t know why.\nBottle, Bottle â what\'s in the Bottle?\nThe bottle is a mysterious artifact covered with ancient cryptic runes. Why are some people willing to kill for it? Why are some people willing to die for it? And the most sensible advice the runners receive is the one thing they can\'t seem to do â get rid of it.\nNo Deposit! No Return! Please dispose of property!',
			gameDate: '2050',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7305 - Bottled Demon.pdf',
					size: '5658861',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7302',
		{
			sku: ['7302'],
			category: 'mission',
			type: 'scan',
			name: 'Mercurial',
			releaseDate: ['1990-11'],
			description: 'A blast of light punches my eyes as I walk down the ramp from street level. The dance floor is an amorphous beast, writhing with a thousand limbs, and the beat of the music red-lines my pulse into overdrive. On the stage, a nova is dancing.\nSearing beams of the spotlights catch the mirror-bright metal arms, legs, and face, reflecting them back in a dazzling cascade of color and light. The next thing you see is the hair flaring golden in the glare, surrounding her face like a solar corona around a silver moon. While Maria Mercurial dances, nothing else matters.\nOf course, something else does matter - biz. That\'s why you\'re here, chummier, to protect the silver lady with no past. The money\'s good, the job\'s easy; what could go wrong? Except maybe the lady\'s past is catching up with her.',
			gameDate: '2050',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7302 - Mercurial.pdf',
					size: '45475615',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7102X',
		{
			sku: ['7102X'],
			category: 'mission',
			type: 'scan',
			name: 'Silver Angel',
			releaseDate: ['1989'],
			description: 'You\'ve been hired to infiltrate Mitsuhama\'s Cavilard research center in Bellevue to steal Silver Angel. Your employer Eve Donovan was rather unclear what Silver Angel was apart from the fact that it was a file stored on a secure computer system inside the facility.\nSince Bellevue is tight on the security you decide to infiltrate using one of the Russel Overland trucks that regularly make nightly deliveries of Hazardous Materials. For that you need their schedules so you can hi-jack a truck before it enters Bellevue.\nSo here you are on a lil boat in the nightly waters of Puget Sound, cursing the others who stayed behind for their own legwork. You are wondering if they are freezing too.',
			gameDate: '2050',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7102X - Silver Angel.pdf',
					size: '5134499',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27485',
		{
			sku: ['27485'],
			category: 'mission',
			type: 'digital',
			name: 'Boundless Mercy',
			releaseDate: ['2015-10'],
			description: 'Elizabeth Nunn, a delightful woman who happens to have an odd habit of hanging out in hospitals and abandoned churches, has a grudge. A deep grudge. The kind of grudge that requires professional help to work out, and weâre not talking about a psychotherapist. She needs shadowrunners, and if theyâre willing to take on the job, theyâll encounter fierce gangers, wild critters, and members of a secret magical society who fiercely guard their mysteries. If the runners can survive, they can find out just what Nunn is mad aboutâand how far she is willing to go for her revenge.',
			gameDate: '2077-08',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/27485 - Boundless Mercy.pdf',
					size: '14482804',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7301',
		{
			sku: ['7301'],
			category: 'mission',
			type: 'scan',
			name: 'DNA-DOA',
			releaseDate: ['1990-03'],
			description: 'Biogene Technologies, a mid-sized genetic engineering firm, hires the runners to make a datasteal on a competitor, the powerful Aztechnology. The job is simply to break into Aztechnology\'s Tacoma Resarch Park, snatch some data and some samples, and deliver it all to the client for payment.\nSimple, yes, but nothing in the shadows of Seattle is as simple as it seems...',
			gameDate: '2050',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7301 - DNA-DOA.pdf',
					size: '9738452',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7205',
		{
			sku: ['7205'],
			category: 'mission',
			type: 'scan',
			name: 'Universal Brotherhood: Unleash Your Inner Abilities/Missing Blood',
			releaseDate: ['1990-10'],
			description: 'Unlock the potentials of your mind and body. Turn your back on the shallow and mundane - join the Universal Brotherhood and be a part of something wonderful!\n\nWho are the Brotherhood? Possibly the largest humanitarian organization in the world? To the grime-encrusted inhabitants of the sprawl they are a shining ray of hope in an otherwise hopeless world. This is their way out of the darkness, their key to personal fulfillment and understanding. They are on every corner. THey knock on every door. And they want to save you too.\nNow someone has been on the inside of the Brotherhood. The objectives and purpose of the Brotherhood have been exposed. Some of the questions are answered. But the truth is even more chilling....',
			gameDate: '2050',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7205 - Universal Brotherhood.pdf',
					size: '14998898',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26CMP10',
		{
			sku: ['26CMP10'],
			category: 'mission',
			type: 'digital',
			name: 'Elven Blood',
			releaseDate: ['2012-09'],
			description: 'Shadowrunners have a lot of rules, and each and every one of them can be overruled by the proper amount of nuyen. So when shadowrunners talk about ânever trusting an elf,â thatâs more of a bargaining position than anything else.\nLuckily for them, some elves have plenty of scratch they can use as a persuasive tool. And for the tasks they have in front of them, theyâre going to need it. Thereâs money waiting for runners if theyâre willing to venture into elven territory and take on a host of odd jobs. Jobs like: Tracking down reagents from cranky critters. Messing around in the affairs of TÃ­r royalty. Dealing with a number of different punks and thugs, none of whom like you. And intervening in a leadership challenge of the most powerful elven street gang there is.\nElven Blood is a compilation of five different Missions that have been written to premiere at summer 2012 conventions. They can, however, be played by anyone. Whether youâre playing at a con, in a game store, or in the comfort of your own home, Elven Blood has an adventure for you. Taking you from the mean streets of Seattle to the wild lands of TÃ­r Tairngire, Elven Blood offers exciting and inventive adventures for all Shadowrun fans.',
			gameDate: '2074',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/26CMP10 - Elven Blood.pdf',
					size: '11479220',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26400',
		{
			sku: ['26400'],
			category: 'mission',
			type: 'digital',
			name: 'Dawn of the Artifacts 1: Dusk',
			releaseDate: ['2009-07'],
			description: 'Sixth World scholars have long hypothesized the cyclical nature of magic. For years corporations, collectors and other factions have spent fortunes hunting down surviving relics of this mythical age. The shadows whisper of lost lore and a secret history to the world. A privileged few have come into possession of ancient items of great power and mysterious purpose, artifacts from before recorded history. Now itâs your turn...\nOn the surface, the job seems simple: escort and assist Ms. Johnson as she follows the trail of a man across the globe. The target? An agent of the Atlantean Foundation tracking a priceless stolen artifact. And the trail? It leads to Lagos, the most dangerous sprawl on earth, where simply surviving the day can be a run in its own right. Add in the biggest black market auction of the century, a powerful African king, and a plethora of the biggest players in the artifacts trade, from the Atlantean Foundation to Aztechnology... well, welcome to the underside of the artifact business. If you survive, thereâs more work a-comingâ¦ and maybe even some answers to your questions.',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/26400 - Dawn of the Artifacts - Dusk.pdf',
					size: '8374138',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/26400 - Dawn of the Artifacts - Dusk (maps).pdf',
					size: '2171282',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26402',
		{
			sku: ['26402'],
			category: 'mission',
			type: 'digital',
			name: 'Dawn of the Artifacts 3: Darkest Hour',
			releaseDate: ['2010-08'],
			description: 'Sixth World scholars have long hypothesized the cyclical nature of magic. For years corporations, collectors and other factions have spent fortunes hunting down surviving relics of this mythical age. The shadows whisper of lost lore and a secret history to the world. A privileged few have come into possession of ancient items of great power and mysterious purpose, artifacts from before recorded history. Now itâs your turnâ¦ Eighteen months ago, the Phaistos Disk was stolen from the Herakleion Museum in Athens. Now, Mr. Johnson needs you to find it and bring it back. The hunt will take the runners through the shadows of Europe, and lead to interactions with smugglers, art dealers, and archaeologists. If they survive Interpol, Aztechnology, and an eccentrically violent shadowrunner team, they may just learn who is behind the hunt and why.',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/26402 - Dawn of the Artifacts 3 - Darkest Hour.pdf',
					size: '11045301',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26401',
		{
			sku: ['26401'],
			category: 'mission',
			type: 'digital',
			name: 'Dawn Of The Artifacts 2: Midnight',
			releaseDate: ['2009-12'],
			description: 'There are deep secrets in the Sixth World, and there are people who will do anything to uncover them. Some secrets reach into the ancient past, but they still have the power to shake the world. What they will do depends on whose hands they fall into...\nDusk was only the beginning. Jane "Frosty" Foster is back and ready to continue her artifact hunt. If theyâre game, runners will join her in a chase across North America, from the frozen, bug-filled wastes of Chicago to the political hotbed of Denver to the Deep Lacuna lurking under Los Angeles.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/26401 - Dawn Of The Artifacts 2 - Midnight.pdf',
					size: '16194228',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/26401 - Dawn Of The Artifacts 2 - (maps).pdf',
					size: '4700811',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'10654',
		{
			sku: ['10654'],
			category: 'mission',
			type: 'scan',
			name: 'Wake of the Comet',
			releaseDate: ['2002-07'],
			description: 'The megacorp probe race to be the first to reach Halley\'s Comet is in its final rounds. With only a few contenders left, your shadowrunner team can make a difference, deciding who wins and who loses.',
			gameDate: '2061',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Adventures and Campaigns/10654 - Wake of the Comet.pdf',
					size: '16959639',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26003',
		{
			sku: ['26003'],
			category: 'mission',
			type: 'digital',
			name: 'On the Run',
			releaseDate: ['2006-03'],
			description: 'This introductory adventure for Shadowrun, Fourth Edition sends the players in pursuit of an archaic media chip with priceless contents, mixing them up with a media legendâs ancient history.\nThis adventure is seeded with helpful advice to immediately acquaint new gamemasters with running Shadowrun and also includes a number of tips that veteran gamemasters will find useful.\nIt is also intentionally designed to familiarize gamemasters and players with various key aspects of the Shadowrun universe. On the Run is perfect as a stand-alone adventureâand is also the first in a continuing series of adventures.',
			gameDate: '2070',
			edition: 4,
			publisher: ['fanpro'],
			files: [
				{
					path: './Adventures and Campaigns/26003 - On the Run.pdf',
					size: '7344179',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'10665',
		{
			sku: ['10665'],
			category: 'mission',
			type: 'scan',
			name: 'Survival of the Fittest',
			releaseDate: ['2004-05'],
			description: 'The death of the great dragon Dunkelzahn kicked off a series of events that are only now reaching climax. A challenge is declared as antediluvian customs clash with the methods of modern world. The shadowrunners are involved in a string of unrelated missions that begin to tie themselfs together. From the ruins of Tehran to the jungles of Amazonia, from the towers of Hong Kong to the deep metaplanes, the machinations of a reptilian chess game begin to unfold.',
			gameDate: '2062-06',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Adventures and Campaigns/10665 - Survival of the Fittest.pdf',
					size: '35043453',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26403',
		{
			sku: ['26403'],
			category: 'mission',
			type: 'digital',
			name: 'Dawn Of The Artifacts 4: New Dawn',
			releaseDate: ['2011-08'],
			description: 'One more artifact. One more chance for a big payday. One more run to distant lands and high seas, racing against time and the wealthy, ruthless powers who want the artifact for themselves. At the end of this, if you succeed, four powerful artifacts will be gathered together, and they will be poised to shake the world.\nTo finish the quest for the artifacts, runners will have to travel to Hong Kong, track down the mobile city of Karavan, penetrate the corp enclave of Neo-Tokyo, and survive an assault on the high seas. The final adventure in the Dawn of the Artifacts series, New Dawn brings the story of the gathering of the artifacts to a rollicking conclusion while setting the stage for the changes the Sixth World will experience once the true power of these artifacts is tapped and unleashed.',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/26403 - Dawn Of The Artifacts 4 - New Dawn.pdf',
					size: '15586413',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26452',
		{
			sku: ['26452'],
			category: 'mission',
			type: 'digital',
			name: 'Jet Set',
			releaseDate: ['2012-02'],
			description: 'Step this way! Thereâs no need for you to wait in line with the riff-raff, the common clay of dirty humanity. You can have something better. You can have the good life, filled with the finest food, the most expensive wines, and the most interesting people in the world. Thereâs a price to pay, of course. There always is. But take a ride, just once, in the aircraft the upper crust uses, and see if you donât like it. Get a taste of this lifestyle, and see if you wonât do anything to keep it.\nIn Jet Set, shadowrunners get the chance to rub elbows with the rich and powerful of the worldâthe socialites, the corporate elite, the royalty, the movers, and the shakers. These are people who know how to get what they want, no matter who they need to step over to get it. The runners may be the help they need to get rid of their latest obstacleâor they could be the next bodies the rich and powerful leave in an expanding trail behind them.',
			gameDate: '2074-02',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/26452 - Jet Set.pdf',
					size: '10393271',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26451',
		{
			sku: ['26451'],
			category: 'mission',
			type: 'digital',
			name: 'Corporate Intrigue',
			releaseDate: ['2011-12'],
			description: 'You could dabble in organized crime. You could do some smash-and-grabs. You could find all sorts of ways to pick up a few nuyen here and there. But everyone in the Sixth World knows that if you want to make a play for the big bucks, the real high-level stuff, youâve got to get in bed with the corps.\nThe corps have the money, and theyâve got all the power that comes with it. If you want to have some of that cash and some of that pull for yourself, youâre going to need to stay alert, move quickly, and remember that while corps are willing to pay for things that help them, deep down they really hate sharing what theyâve got with anyone. Including shadowrunners. Especially shadowrunners.',
			gameDate: '2073-12',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/26451 - Corporate Intrigue.pdf',
					size: '8834837',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26601',
		{
			sku: ['26601'],
			category: 'mission',
			type: 'digital',
			name: 'Bad Moon Rising in the East',
			releaseDate: ['2009-02'],
			description: 'In Bad Moon Rising in the East, a team of shadowrunners is hired to track down the source of a new drug shipping into Hong Kong. Directly connected to the Ghost Cartels campaign, the team of six Caracas natives are thrust into a criminal underworld far from their home. With few contacts to turn to, they may find themselves deeply involved in a vicious underworld conflict.\nThis 22-page scenario was used for the Gen Con 2008 Shadowrun tournament. While it may be used with other characters, the included team of shadowrunners are fully fleshed out with contacts, backgrounds, and motivations. This complete package allows for a night or two of Shadowrun with little prep work for the gamemaster or the players.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/26601 - Bad Moon Rising in the East.pdf',
					size: '7274285',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26463',
		{
			sku: ['26463'],
			category: 'mission',
			type: 'digital',
			name: 'The Twilight Horizon',
			releaseDate: ['2012-03'],
			description: 'The Horizon Corporation is everywhere. Theyâre in the trids you watch, the music you listen to, and the news you consume. Theyâre propping up hundreds of major brands of products across the planet with their public relations skill. And theyâre spending countless hours studying how youâthatâs right, youâthink so that they can lead your mind like a master leads a spaniel.\nDenizens of the Sixth World have long suspected that there is a dark side to Horizon, if only because the corporation seemed too good to be true. If there is a dark side, it seems likely to come out soon, as the corporation has been under tremendous pressure recentlyâtechnomancers are plotting against it, spirits are causing problems in the Mojave, and Aztechnology is on the offensive, intent on keeping the competition down. That pressure is going to result in an explosion somewhere, and when it does, Horizon and the Sixth World will be changed forever.',
			gameDate: '2074-03',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/26463 - The Twilight Horizon.pdf',
					size: '10880172',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26410',
		{
			sku: ['26410'],
			category: 'mission',
			type: 'digital',
			name: 'Boardroom Backstabs 2: Sacrificial Limb',
			releaseDate: ['2012-10'],
			description: 'In 2072, Roger Soaring Owl, CEO of Knight Errant, resigned.\nIn 2073, Roger Soaring Owl was attacked on the streets of Denver. Witnesses were not clear on just what attacked him, but most say it was meaner, stronger, and faster than any metahuman.\nNow itâs 2074. Itâs time to find out what Roger Soaring Owl learned.\nCorporate machinations donât get any meaner than this. Rivals of the megacorporation are certain itâs hiding some dark secrets, and theyâre willing to spend significant nuyen to uncover this information. Runners are going to have to infiltrate an Ares subsidiary and gain the corporationâs trust if they want to discover the secretâand if they do, they will have to find a way to survive with what they have learned.',
			gameDate: '2074',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/26410 - Sacrificial Limb.pdf',
					size: '3252667',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26406',
		{
			sku: ['26406'],
			category: 'mission',
			type: 'digital',
			name: 'Horizon Adventure 2: Anarchy Subsidized',
			releaseDate: ['2011-09'],
			description: 'The only shadowrunners in the world who donât understand the importance of eliminating the competition are the ones who have already been eliminated by someone else. The Horizon Corporation wants its stable of music artists to sell a few more albums and its brain trust has decided that the best way to accomplish this is to move some artists at the top of the charts out of the way. Outright killing the competition is no goodâthat often just boosts the deceasedâs album sales. The secret is to get the public to stop wanting what theyâre currently buying, and Horizon has developed some creative ways to make that happen.\nAnarchy: Subsidized is a complete adventure that takes shadowrunners to Neo-Tokyo and plunges them into corporate intrigue involving street gangs, vandals, scandal-mongers, and one of the most impressive technological innovations the entertainment industry has ever seen. ',
			gameDate: '2073',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/26406 - Anarchy Subsidized.pdf',
					size: '5911195',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26405',
		{
			sku: ['26405'],
			category: 'mission',
			type: 'digital',
			name: 'Horizon Adventure 1: A Fistful of Credsticks',
			releaseDate: ['2011-04'],
			description: 'Nothingâs as simple as it seemsâany runner knows that. So what seems like a simple job guarding some precious cargo on the set of a trideo shoot is bound to get complicated. And it doesâbut are you ready to travel the full length the long, twisted road ahead? A Fistful of Credsticks begins a new series of adventures centered on the machinations of the Horizon Corporation. Runners will learn more about the dark side of Horizon, leading to future developments that could change the shape of the entire corporation. Runners that see this adventure to the finish will encounter trideo makers, music celebrities, showbiz leeches, some gang members bent on fame, and a very peculiar corporate experiment.',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/26405 - A Fistful of Credsticks.pdf',
					size: '4193051',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26408',
		{
			sku: ['26408'],
			category: 'mission',
			type: 'digital',
			name: 'Boardroom Backstabs 1: Damage Control',
			releaseDate: ['2012-03'],
			description: 'When the great dragon Hestaby leveled Saeder-Kruppâs arcology in Dubai, a lot of people wondered if the success of her act meant that Lofwyr & co. were off their game. And of course, the corps of the Sixth World arenât ones to just sit around and speculateâinstead, they act. All of the sudden, corporations of all sizes are on the move, snatching up any Saeder-Krupp clients they can pry away, telling them that S-K canât be trusted in the current turmoil.\nSaeder-Krupp, though, is not about to let anyone believe they are weak. They\'re going to show that they should never be trifled with, and that clients would be well served to stay with themâor risk the wrath of Lofwyr. Theyâre bringing runners to Dubai to demonstrate that the largest megacorporation in the world still has strength to spare.\nDamage Control is the first in the new Boardroom Backstabs series of adventures for Shadowrun. The series explores one of the classic Shadowrunthemesâcorporate machinations where every handshake is made with crossed fingers, and the hand you canât see is always holding a knife. Thereâs a lot of money to be made on this job, but runners better keep their wits about them if they want to keep all those corporate sharks from feeding on them.',
			gameDate: '2073-08',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/26408 - Damage Control.pdf',
					size: '6324594',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26407',
		{
			sku: ['26407'],
			category: 'mission',
			type: 'digital',
			name: 'Horizon Adventure 3: Colombian Subterfuge',
			releaseDate: ['2011-12'],
			description: 'If youâre going to win in modern warfare, you have to use every weapon in your arsenal. Guns, tanks, and bombs are great, but if thatâs all you put into play, youâre going to lose. Information and propaganda have been a major part of war efforts for more than a century, and falling behind in those areas will doom you.\nAmazonia has gone to war with Aztlan, which is supported by the greatest public relations machine the world has ever seen. Ready to fight fire with fire, Amazonia has brought in Horizon to sway public opinion, and possibly the tide of the war, to their side. To make their case, theyâll need stealthy runs, fast moves, and quick thinking. And theyâll need it fast, because Aztlan is pressing hard and not inclined to show any mercy.\nColombian Subterfuge is a complete adventure that brings shadowrunners into the war raging in BogotÃ¡ while enlisting them in Horizonâs propaganda efforts. It contains all the information gamemasters need, from plot details to NPC statistics, to plunge players into the chaos of war.',
			gameDate: '2073',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/26407 - Colombian Subterfuge.pdf',
					size: '15646483',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S022',
		{
			sku: ['26S022'],
			category: 'mission',
			type: 'digital',
			name: 'Another Rainy Night',
			releaseDate: ['2013-09-13'],
			description: 'Every day in the Sixth World people die in a thousand different ways. Every day blood is spilled. Every place that rain falls, it washes away some of the red that stains the streets.\nEliminating every killer in the Sixth World is as impossible as drying up every raindrop in a storm, but Thomas McAllister doesnât want to get rid of all of them. Just one. Heâs been on this killerâs trail for a while, and he knows heâs getting closer. The only question is if heâll be able to handle getting as close as heâs about to be, or if his blood will join the stream that regularly flows into the gutters of the sprawls.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Enhanced Fiction/26S022 - Another Rainy Night.pdf',
					size: '4494017',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S005',
		{
			sku: ['26S005'],
			category: 'mission',
			type: 'digital',
			name: '99 Bottles',
			releaseDate: ['2011-09'],
			description: 'Mob wars are ugly things, but not all ugliness is created equal. Things are going bad in Bangkok, and one Yakuza leader named Shinoda Yoshinori has been receiving a series of unsettling messages: bodies of other members of his gumi, packaged and delivered in a decidedly unique fashion. If Yoshinori wants to preserve his gumiâand save his lifeâheâs going to have to take action. Due to the depleted manpower in his gumi, heâs ready to turn to shadowrunners for help.\n99 Bottles introduces Shadowrunâs new Enhanced Fiction line, in which short stories are accompanied by information and statistics that allows you to incorporate elements of the story into your game. In this book, the story kicks off a short adventure that is presented with all the information gamemasters and players need, from plot points to NPC stats to details of specific locations in the seething, energetic city of Bangkok. Let the new fiction set the stage for a plunge into one of the Sixth Worldâs seamiest spots!',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Enhanced Fiction/26S005 - 99 Bottles.pdf',
					size: '11762488',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7329',
		{
			sku: ['7329'],
			category: 'mission',
			type: 'scan',
			name: 'First Run',
			releaseDate: ['1999'],
			description: 'First Run! features three complete adventures that help novice gamemasters and players learn the rules of Shadowrun, Third Edition\nIN THE SHADOWS YOU LEARN OR YOU DIE...\n...while playing. From a basic gun battle to a run against a corporate research facility to smuggling, this product lets players and gamemasters encounter the unique elements of Shadowrun. First Run! offers gamemasters suggestions for overcoming the most difficult aspects of running a game, and provides guidelines for building ongoing campaigns. Each adventure also includes hint for increasing the difficulty to challenge experianced player. For use with Shadowrun, Third Edition.',
			gameDate: '2060',
			edition: 3,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7329 - First Run.pdf',
					size: '38293961',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7328',
		{
			sku: ['7328'],
			category: 'mission',
			type: 'scan',
			name: 'Renraku Arcology: Shutdown',
			releaseDate: ['1998-11'],
			description: 'You Wanted In--Now You Can\'t Get Out!\nSomething mysterious and terrible has shut down the Renraku Arcology. The doors are sealed, the Matrix is off-line, and 100,000 inhabitants are trapped within. The UCAS Army seals off the site, and not even Renraku knows what\'s really going on.',
			gameDate: '2060-02',
			edition: 3,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7328 - Renraku Arcology Shutdown.pdf',
					size: '12263522',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7331',
		{
			sku: ['7331'],
			category: 'mission',
			type: 'scan',
			name: 'Brainscan',
			releaseDate: ['2000'],
			description: 'Don\'t Mess With My Head!\nWhat if your mind was no longer your?\nWhat if you could no longer distinguish fantasy from reality?\nWhat if your brain had an off switch, and someone else helt the remote?\nBrainscan is a campaign of five linked adventures that drop the characters squarely into the middle of a titanic struggle for identity, control and freedom.',
			gameDate: '2061',
			edition: 3,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7331 - Brainscan.pdf',
					size: '57284154',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7330',
		{
			sku: ['7330'],
			category: 'mission',
			type: 'scan',
			name: 'Corporate Punishment',
			releaseDate: ['2000'],
			description: 'You\'re a shadowrunner, not some corporate lackey. No 9-to-5 shackles or power-tie chains for you. Every time you take on a run, you sign up to be used and abused. But you\'ve got the smarts to come out on top.\nCorporate Punishment consists of three adventures in which the runners serve as pawns in a brutal corporate power struggle. They use their wits and weapons to take what the corps throw at them and survive with a smileâbecause the alternative is to hang up their Uzis and get a day job.',
			gameDate: '2061',
			edition: 3,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7330 - Corporate Punishment.pdf',
					size: '101018883',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM00-01',
		{
			sku: ['SRM00-01'],
			category: 'mission',
			type: 'digital',
			name: 'Mission Briefing',
			releaseDate: ['2004'],
			description: 'Your chance at the big time â a friend has tipped you off about a job opportunity to do some bodyguard work for a group of exclusive clientele. You have been trying to break into the Seattle shadow scene, and these are just the kind of people that can help. All you have to do is make sure that their meeting doesnât get interrupted. Itâs a simple walk in the park, natch!',
			gameDate: '2061',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 0/SRM00-01A - Mission Briefing.pdf',
					size: '205738',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 0/SRM00-01B - Mission Briefing.pdf',
					size: '442054',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27PM005',
		{
			sku: ['27PM005'],
			category: 'mission',
			type: 'digital',
			name: 'Jumping Ship',
			releaseDate: ['2017-04'],
			description: 'Runners are rule-breakers. Lawless. Independent. But their dirty secret is that they donât break all the rulesâthey just are more open in choosing which rule sets they should follow. And sometimes, they just make up their own rules. Some of those rules are based on what brings them the most money. Others talk about honor and loyalty, concepts that are incredibly important to some runners and derided as useless baubles by others.\nWhatever rules runners invent for themselves, there are times they are tested. And one of those times is coming up.\nPlenty of runs donât end like they should, but whatâs really rare is when runners get to take a run that blows up and stick on their own ending. What starts as an extraction quickly goes south, and the runners are going to have to figure out which rules theyâre going to follow to make the ending stick. Who will be happy, who will be angry, who will get paid, who will get deadârunners will have to invent rules that can help make all those questions come out right.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Prime Missions/27PM005 - Jumping Ship.pdf',
					size: '937808',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM00-02',
		{
			sku: ['SRM00-02'],
			category: 'mission',
			type: 'digital',
			name: 'Demolition Run',
			releaseDate: ['2004'],
			description: 'Sometimes drek just needs to get blown up. And when it does, youâre the folks that they call to do it. Itâs all in the job description, chummer.',
			gameDate: '2061',
			edition: 3,
			publisher: ['fanpro'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 0/SRM00-02A - Demolition Run.pdf',
					size: '180856',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 0/SRM00-02B - Demolition Run.pdf',
					size: '281026',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27PM002',
		{
			sku: ['27PM002'],
			category: 'mission',
			type: 'digital',
			name: 'A Holy Piece of Wetwork',
			releaseDate: ['2016-10'],
			description: 'Auslander. If you havenât heard the name, youâre lucky. If you have heard it, then you know enough to be worried. But not scared, because fearâs not part of the job. Which is good, because the job Mr. Johnsonâs got in store for you is a big oneâgoing to Auslanderâs home metaplane and talking him out, once and for all.\nItâs not safe. Of course itâs not. Even the act of getting to the metaplane will cost blood, and nothing gets easier from there. Every type of assault will be thrown at the runners, and they will need every milligram of their considerable skills if they want to succeed and, somehow, survive.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Prime Missions/27PM002 - A Holy Piece of Wetwork.pdf',
					size: '3011998',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26APR12',
		{
			sku: ['26APR12'],
			category: 'mission',
			type: 'digital',
			name: 'Free Taiwan',
			releaseDate: ['2012-04'],
			description: 'Thereâs stuffâgood stuff, important stuff, stuff a lot of people wantâthatâs stuck. Sitting where it canât do anyone a bit of good. And to people who know how to make money from such things, the fact that the goods arenât moving is incredibly upsetting. Upsetting enough to make even the most kind-hearted individuals want to punch a baby seal in the face.\nThe goods arenât going to sit there forever, though. Plans are hatching to get the goods moving and out into the world. This being the Sixth World, those plans involve twists, turns, and the kind of complications that keep shadowrunners on their toes. But if theyâre brave and resourceful enough, they might be able to make some money off the cargo sitting on the good ship Free Taiwan.',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Misc/26APR12 - Free Taiwan.pdf',
					size: '5954831',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'CMP10-02',
		{
			sku: ['CMP10-02'],
			category: 'mission',
			type: 'digital',
			name: 'Copycat Killer',
			releaseDate: ['2012'],
			description: 'For three years the Mayan Cutter terrorized the metahumans of Seattle and many point to their inability to stop him as the reason Lone Star lost it\'s Seattle contract. Shortly after Knight Errant took over, the killings stopped and the Tin Men took credit for bringing him down. But now the killings have started again. Is it a copycat or is it the real deal? You\'ll have the chance to find out when a grief-stricken Mr. Johnson calls you to track him down so he can get revenge.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Misc/CMP10-02 - Copycat Killer.pdf',
					size: '2732639',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27PM001',
		{
			sku: ['27PM001'],
			category: 'mission',
			type: 'digital',
			name: 'Killing Pawn',
			releaseDate: ['2016-03'],
			description: 'There are certain things shadowrunners know. They know Mr. Johnson will not tell you everything. They know sometimes the things you donât know can kill you. And they know that one of the keys to survival is staying one step ahead of the oppositionâor, in times when you are working for a devious Mr. Johnson, not falling too many steps behind.\nThe corporate enclave of Manhattan is the scene for some high-stakes manipulation that will test just how skilled shadowrunners are. Killing Pawn is a Prime Mission, a higher-level challenge designed for characters that have already triumphed in a large number of regular Missions and are ready for something tougher. Runners will have to think fast and shoot even faster if they want to come out ahead in this gameâor at least not get captured in the first few moves.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Prime Missions/27PM001 - Killing Pawn.pdf',
					size: '2243695',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SMH201501',
		{
			sku: ['SMH201501'],
			category: 'mission',
			type: 'digital',
			name: 'Friendship Is Tragic',
			releaseDate: ['2015-04'],
			description: 'An hour or so outside Chicago is a group of Amishâa group containing humans, metahumans, and centaursânicknamed the Neutral Amish because they are complete pacifists and stay to themselves. The Neutral Amish have many excellent craftsmen, and they build everything from commercial shipping pallets to fine furniture and wooden figurines. Simon Andrews was visiting this group to purchase miniatures for a game for one of Saeder-Kruppâs subsidiaries when a herd-gang of centaurs known as the Bronies (yeah, you read that correctly) attacked the Neutral Amish, demanding food, money, and handmade garments. The Bronies killed an Amish family and burned their farm to the ground in the attack. This should be viewed as an isolated act of violence, not an indictment of all who bear the name âbrony.â\nThe Amish held a community benefit auction to raise money to hire shadowrunners to deal with the problem. Simon Andrews offered up his services as a fixer for them, free of charge, because Simon is a softy who loves hand-crafted furniture.\nOnce hired, the shadowrunners will go to NuerTagDorf and investigate. While the runners are investigating, the Bronies will return and kidnap one of the Amish girls on the other side of town. The team will locate the Broniesâ barn, only to find it empty save for a group of followers. From there they will return to the village to find an attack underway, as the Bronies are displeased with the lack of homemade garments, and think they need to teach the Neutral Amish that they are serious. There the final battle will take place. ',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Misc/SMH201501 - Friendship Is Tragic.pdf',
					size: '1418516',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SMH201601',
		{
			sku: ['SMH201601'],
			category: 'mission',
			type: 'digital',
			name: 'UnCONventional Warfare',
			releaseDate: ['2016-04'],
			description: 'Louis Gilbertson has a problemâa big problem.\nSeven years ago his father passed away and left him sole owner/proprietor/promoter of GameCon, the largest of the few remaining independent gaming conventions in the world. At first, he was honored to carry on his fatherâs legacy, as Gilbertson is a lifelong gamer nerd himself who learned about gaming and the industry from his father, Louis Senior. For the first five years after Louis Seniorâs death, no one could touch GameCon. Various corporate sponsors and gaming companies continued to flock to GameCon as they had in decades past, using it to showcase their latest products.\nHowever, since Louis Seniorâs death, thereâs been a small shadow-war between GameCon and upstart rival DarkestShadowCon. So far, Gilbertson and GameCon have been able to hold DarkestShadowCon at bay (barely) by keeping its numbers up. However, that hasnât stopped DarkestShadowCon from engaging in a bit of sabotage augmented with numerous smear campaigns and flame wars on the Matrix. While their attendance numbers are higher than ever, GameCon has barely broken even monetarily over the last three years after dealing with DarkestShadowConâs shenanigans.\nNow it seems DarkestShadowCon is poised to deliver a coup de grace. ',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Misc/SMH201601 - UnCONventional Warfare.pdf',
					size: '7702099',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SMH201701',
		{
			sku: ['SMH201701'],
			category: 'mission',
			type: 'digital',
			name: 'Scene It All Before',
			releaseDate: ['2017-04'],
			description: 'Sid Gambetti contact the runners to meet him at the Hawthorne Grill to discuss a job. Once the team arrives at the restaurant, Sid lays out the details of the run and negotiates. The team is to meet with two clients near an MCT Research Facility for an extraction. Once they are secured, the team and clients are to go to the nearby docks to escape via boat. At the end of negotiations, the restaurant gets robbed with the team still inside.\nThe team loads into a VTOL commuter aircraft and begins the trip to a remote coastal town in Chile. The VTOL stops to allow the runners to parachute to the rendezvous coordinates, drawing the Chilean forceâs attention. After the runners parachute out of the plane, it is hit with a missile and spirals out of control. Pieces of the VTOL break apart and smash into containment biodomes outside of the MCT Research Facilityâfreeing dangerous research specimens into the night.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Misc/SMH201701 - Scene It All Before.pdf',
					size: '4211646',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7327',
		{
			sku: ['7327'],
			category: 'mission',
			type: 'scan',
			name: 'Blood in the Boardroom',
			releaseDate: ['1998'],
			description: 'The boardrooms become war rooms as the movers and shakers shift their fights from the stock exchange to the streets. Using everything from military-scale assaults on ultra-secure company compounds to stealth missions and sabotage, the fat cats have gone to war. Dunkelzahn\'s will made the head of security for Fuchi Industrial Electronics a voting member of Renraku\'s board of directors â and all hell broke loose. Now Fuchi is in a civil war that may destroy the corporation. Renraku is under siege on every front and must turn to an old enemy to survive, as Ares goes on the offensive to purge itself of traitors. Even minor-leaguer Yamatetsu must fight its way out of Japan when a metahuman takes over the helm.\nThe most desired asset in this upheaval isn\'t a stack of stocks or a portfolio of investments, but a professional shadowrun team willing to keep its mouth shut and do the job.',
			gameDate: '2057-08',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7327 - Blood in the Boardroom.pdf',
					size: '20792741',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7313',
		{
			sku: ['7313'],
			category: 'mission',
			type: 'scan',
			name: 'Dark Angel',
			releaseDate: ['1993-12'],
			description: 'Music worth dying for.\nWhen the only known recording of a late, great street musician appears in the hands of a major record company, it\'s up to the runners to find out the truth.\nJust what was that corp willing to do to get that recording?',
			gameDate: '2051',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7313 - Dark Angel.pdf',
					size: '6353033',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7312',
		{
			sku: ['7312'],
			category: 'mission',
			type: 'scan',
			name: 'One Stage Before',
			releaseDate: ['1992'],
			description: 'One False Step...\n...& the Fat Lady Sings!\nWhen Mr. Johnson hires shadowrunners to discover the brains behind repeated attempts to sabotage a major corporation\'s latest acquisition, their first wrong move could be their last.',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7312 - One Stage Before.pdf',
					size: '10267386',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7315',
		{
			sku: ['7315'],
			category: 'mission',
			type: 'scan',
			name: 'Celtic Doublecross',
			releaseDate: ['1993'],
			description: 'Renowned as a land of wonders, Tir Na Nog brims with ancient elven art and sophisticated elven nobles, powerful magic and cutting-edge technologies. But beneath this cultured facade lies a dark mix of long-simmering feuds and Machiavellian plots. Now add a dash of good old UCAS politics, and you have a Byzantine brew of betrayal and bloodshed, a Mickey Finn with a lethal kick.',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7315 - Celtic Doublecross.pdf',
					size: '30273283',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7314',
		{
			sku: ['7314'],
			category: 'mission',
			type: 'scan',
			name: 'A Killing Glare',
			releaseDate: ['1993-01'],
			description: 'URBAN BRAWL\n\n"TWO BALLS, TWO GOALS, AND ABOUT THREE THOUSAND ROUNDS OF ARMOR-PIERCING AMMUNITION!"\n\nSome call it the ultimate game, the supreme test of cunning and strength. Others find it a barbaric blood sport, nothing more than barely contained mayhem that appeals to the most primitive blood lust lurking in the human psyche. For the shadowrunner, the world of Urban Brawl holds a Byzantine maze of betrayal, buried secrets, and sudden violence. So how about it are you ready to rock and roll with the big boys?',
			gameDate: '2054',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7314 - A Killing Glare.pdf',
					size: '11178903',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7311',
		{
			sku: ['7311'],
			category: 'mission',
			type: 'scan',
			name: 'Ivy & Chrome',
			releaseDate: ['1991-05'],
			description: 'Ever try to find someone in the Sprawl?\nSorta like findin\' a smooth spot on a troll.\nNevertheless, someone needs to be found, and fast.\nIt\'s hid and seek, search and destroy.\nThink you can handle it, shummers?',
			gameDate: '2051',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7311 - Ivy & Chrome.pdf',
					size: '10196151',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7308',
		{
			sku: ['7308'],
			category: 'mission',
			type: 'scan',
			name: 'Total Eclipse',
			releaseDate: ['1991-11'],
			description: 'The word is out, chummer. If you want blazing rock and roll, there\'s only one band to see: The Elementals. The buzz is they\'re about to become the next local band hit the big time\nThere\'s just one problem. The elementals have broken their recording contract, and in the world of corporate domination, nobody goes solo.\nThe runners\' job? Find the band and bring them home. Alive.',
			gameDate: '2051',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7308 - Total Eclipse.pdf',
					size: '19354875',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7307',
		{
			sku: ['7307'],
			category: 'mission',
			type: 'scan',
			name: 'Dragon Hunt',
			releaseDate: ['1991-03'],
			description: 'In this Shadowrun adventure, the shadowrunners are hired to find a lost identity. The only problem is that some of the biggest corporations in Seattle don\'t want it found. Hide and seek, cross and double-cross, a dragon\'s deeds and desiresâ¦ Ah, business as usual in the shadowsâ¦',
			gameDate: '2051',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7307 - Dragon Hunt.pdf',
					size: '10312493',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7310',
		{
			sku: ['7310'],
			category: 'mission',
			type: 'scan',
			name: 'Elven Fire',
			releaseDate: ['1992'],
			description: 'Gang violence strikes at the heart of Seattle.\nWhat are they?\nNight after night, senseless violence and destruction turn the metroplex into a war zone.\nWhat do they want?\nBy day, citizens move quickly from place to place, alert for the first signs of danger. By night, they hide where they feel safe, praying that the only death they see before dawn is on the trideo.\nHow can they be stopped?\nTonight, the streets run with blood. Elven Fire is an adventure for Shadowrun.',
			gameDate: '2053',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7310 - Elven Fire.pdf',
					size: '6181865',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7309',
		{
			sku: ['7309'],
			category: 'mission',
			type: 'scan',
			name: 'Imago',
			releaseDate: ['1992'],
			description: 'There\'s bound to be trouble when Seattle-based shadowrunners are imported to take care of business in the United Kingdom. A valuable employee of one of Britain\'s largest megacorporations may be missing, and Transys Neuronet will be damned if they\'re going to let anyone on their side of the pond know about it.\nThe search takes the runners through Scotland, the city of Edinburgh, and to darker corners of the Matrix than they ever dreamed existed. It\'s a complex puzzle of betrayal, friendship, isolation, hatred, blinding love, vengeance, and, in the most bizarre twist of all - life after death.',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7309 - Imago.pdf',
					size: '29043013',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7316',
		{
			sku: ['7316'],
			category: 'mission',
			type: 'scan',
			name: 'Eye Witness',
			releaseDate: ['1994'],
			description: 'THEY SAY THE EYE RETAINS THE IMAGE OF THE LAST THING IT SEES...\nAccording to some, parts is parts. But when one of those parts contains a motive for murder, betrayal. And corporate espionage, can a shadowrun be far behind?\nEye witness takes a team of shadowrunners on a quest for justice across Deattle, into the boardroom of a corrupt corp, the darkest corners of the sprawl\'s slums, and the noxious depths of Seattle\'s underworld.',
			gameDate: '2055',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7316 - Eye Witness.pdf',
					size: '18307534',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7324',
		{
			sku: ['7324'],
			category: 'mission',
			type: 'scan',
			name: 'Predator and Prey',
			releaseDate: ['1998'],
			description: 'It used to be simple, right? When you went out into the wild, if you ran into something that didnât like you much, you mainly worked to steer clear of the business end of their claws and teeth. Maybe there were a few spitters or stingers out there, but not many, and a lot of them werenât too nasty. But that was then, before the Awakening.\nNow, there are critters out there that can mess with your mind, that can breathe fire, and that can freeze you with their gaze or hurt you with their scream. And you might come after them with fire, ice, or good, old-fashioned bullets, and they might shrug your attack right off. Maybe you think you can avoid themâstay in the city and out of the wild. Nope, because in a lot of places, the city is the wild. The critters are there, and theyâre waiting for you.',
			gameDate: '2057-09',
			edition: 3,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7324 - Predator and Prey.pdf',
					size: '37112530',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7323',
		{
			sku: ['7323'],
			category: 'mission',
			type: 'scan',
			name: 'Shadows of the Underworld',
			releaseDate: ['1996-12'],
			description: 'You\'ve got a choice â fight back or get out of the way!\nShadows of the Underworld is a collection of five Shadowrun adventures, set against the chaos of the United Canadian and American States Presidential election of 2057. The runners get entangled with everything from political agents to fanatical cults, from a gun fight on the top of New York City\'s most famous building to the secret world of Oakland\'s metahuman underground. Shadows of the Underworld is intended for gamesters and players of all experience levels.',
			gameDate: '2057-05',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7323 - Shadows of the Underworld.pdf',
					size: '12936100',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7326',
		{
			sku: ['7326'],
			category: 'mission',
			type: 'scan',
			name: 'Mob War',
			releaseDate: ['1997'],
			description: 'Struggle in the sprwal!\nCan the death of one man forever change the balance of power in the shadowy underworld of Seattle? Can one man\'s death spark a blaze of violence guaranteed to burn everyone from the lowliest chip dealers to the CEOs of megacorps? When the dead man is Don James O\'Malley, head of Seattle Mafia, the answer is yes. There\'s infighting in "the Family", and every other syndicate is determined to take advantage of the chaos to grab themselves a bigger share of the nuyen. As the Triads battle the Yakuza for control of Seattle\'s docks, the Mafia defends its upscale gambling dens agains the Yakuza attacks--and the Seoulpa Rings take over anything that\'s not nailed down. The Seattle underworld has erupted in violence and no one is safe from the...\n...MOB WAR!',
			gameDate: '2058-01',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7326 - Mob War.pdf',
					size: '26514279',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7325',
		{
			sku: ['7325'],
			category: 'mission',
			type: 'scan',
			name: 'Missions',
			releaseDate: ['1996'],
			description: 'SCUM GO ON SHADOWRUNS - YOU ACCEPT MISSIONS\nFor every shadowrunner in the sprawl, there\'s someone like you working the other side of the shadows. Your kind try to make a difference. As part of a DocWagon High Threat Response team, you\'ve been on the receiving end of a firefight while trying to retrieve a client. You might wear the Lone Star badge, with orders to go undercover into the shadows you\'ve sworn to eliminate. You may owe your loyalty to a corporation, proud to defend its secrets and assets from others who are ready and willing to take you down. As a reporter, you are committed to exposing those same secrets. If you love your country above all else, you may have dedicated your life to work for your government, ready to perform any task required.\nMissions is a collection of four Shadowrun adventures that allow players and gamesters to experiment with the alternate campaigns presented in the Shadowrun Companion: Beyond the Shadows. In these adventures, the players can play a DocWagon High Threat Response team, Lone Star undercover police, corporate security agents, government commandos or even a media investigative team. Missions includes suggestions for translating these adventures into campaigns and for incorporating an existing shadowrun team into these adventures. Missions in intended for gamesters and players of all experience levels.',
			gameDate: '2058',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7325 - Missions.pdf',
					size: '62955921',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7322',
		{
			sku: ['7322'],
			category: 'mission',
			type: 'scan',
			name: 'Super Tuesday',
			releaseDate: ['1996-12'],
			description: 'VOTE EARLY! VOTE OFTEN!\nVOTE THE WAY THE TROLL WITH THE GUN WANTS YOU TO!\nSure, running against the corps is hard. But there\'s nothing in this world slimier, colder and deadlier than taking a run for some political slag. You\'re pawns, toys, nice at the mercy of a fat and nasty cat. They say never trust a dragon - I say never trust a politician.\nSuper Tuesday is a collection of five Shadowrun adventures set during the chaotic United Canadian and American States Election of 2057. From breaking into Bug City, to stopping a psycho toxic shaman on a death mission, to tangling with a secret society on a quest for a magical talisman, the player characters find out what it means when politicians enter the shadows.',
			gameDate: '2057-05',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7322 - Super Tuesday.pdf',
					size: '15551582',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7318',
		{
			sku: ['7318'],
			category: 'mission',
			type: 'scan',
			name: 'Divided Assets',
			releaseDate: ['1994'],
			description: 'To the corporations, everything\'s an asset to be charted., inventoried, and maintained. Everything is accounted for - even people. But what happens when a particular asset - namely an eight-year-old boy - becomes a pawn in a messy piece of corporate extraction? That\'s up to the Shadowrunners to decide. Unfortunately, all the firepower and magic in teh world won\'t help solve the problem.',
			gameDate: '2055-07',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7318 - Divided Assets.pdf',
					size: '5341644',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7317',
		{
			sku: ['7317'],
			category: 'mission',
			type: 'scan',
			name: 'Paradise Lost',
			releaseDate: ['1994'],
			description: 'A run in Hawai\'i, paradise of sun and surf, should be the answer to every shadowrunner\'s dream. But when runners need to track down a piece of valuable, stolen tech in the island kingdom, they find that bright, cheerful Hawai\'i hides dark intrigues and darker dangers.',
			gameDate: '2054',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7317 - Paradise Lost.pdf',
					size: '28572381',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7320',
		{
			sku: ['7320'],
			category: 'mission',
			type: 'scan',
			name: 'Harlequin\'s Back',
			releaseDate: ['1994-12'],
			description: 'Harlequin\'s Backâ¦\nâ¦and the world may never be the same!\nIt\'s long been said that trouble follows Harlequin around like a loyal dog, but this time he\'s taking the lead and dragging some shadowrunners along on his waking nightmare. It\'s clear that the level of magic is rising in the Sixth World, and bigger magic makes the world a more dangerous place. But the particular danger Harlequin\'s worried about isn\'t supposed to be a problem for another two thousand yearsâ¦',
			gameDate: '2055',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7320 - Harlequin\'s Back.pdf',
					size: '85615116',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7319',
		{
			sku: ['7319'],
			category: 'mission',
			type: 'scan',
			name: 'Double Exposure',
			releaseDate: ['1994-12'],
			description: 'The recently formed organization known as Project Hope has embarked on a seemingly imposible task of restoring life and prosperity to the Glow City region of the Redmond Barrens. To achieve its noble goal, Project Hope uses the resources of a community largely ignored by society: Seattle\'s teeming homeless population. Through a well-orchestred procedure, the homeless and destitute can apply at the Project\'s downtown Seattle office for admission to one of Project Hope\'s ten relief campos. For those down on their luck, the lure of free food and shelter and the chance to join a prospering new comunity far outweight the hard work demanded of them and the risks of living in the Glow City neibrhood.\nOf course, nothing is as it seems. Behind Project Hope\'s benevolent community-work camps and free medical services lies a deception of nightmarish propositions involving Renraku Computer Systems, the Universal Brotherhood, and a powerful Ant Queen.',
			gameDate: '2055-08',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Adventures and Campaigns/7319 - Double Exposure.pdf',
					size: '10528566',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'BMAPS',
		{
			sku: ['BMAPS'],
			category: 'misc',
			type: 'digital',
			name: 'Blackjack Maps',
			releaseDate: ['2010'],
			description: 'A collection of building maps to be used in game from Blackjack.',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Misc/Maps/Blackjack Maps/MAPPmanufacturingresearch.pdf',
					size: '29201',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/MAPPlargebuilding2.pdf',
					size: '8425',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/MAPPsemiautomatedstoragefacility.pdf',
					size: '20196',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/MAPPsecuresubwaystation.pdf',
					size: '17918',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/MAPPlargebuilding1.pdf',
					size: '11035',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/MAPPcompound3.pdf',
					size: '8267',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/MAPPcompound2.pdf',
					size: '5470',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/MAPPlargeautomatedfastfood.pdf',
					size: '17561',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/MAPPcompound4.pdf',
					size: '6934',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/MAPPurbancreek.pdf',
					size: '95284',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/SATTcorporatecampus3.pdf',
					size: '143931',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/SATTcorporatecampus2.pdf',
					size: '138993',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/SATTluxuryapartments.pdf',
					size: '142685',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/SATTdockedship.pdf',
					size: '131421',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/SATTcorporatecampus.pdf',
					size: '136206',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/SATTairport.pdf',
					size: '117795',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/SATTabandoneddock.pdf',
					size: '354414',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/SATTairport3.pdf',
					size: '145121',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/SATTairport2.pdf',
					size: '120777',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/MAPPcompound1.pdf',
					size: '9055',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/BLOK1.pdf',
					size: '12518',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/MAPCexecutiveoffice.pdf',
					size: '186235',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/BLOK7.pdf',
					size: '12074',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/MAPPbuilding2.pdf',
					size: '2688',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/MAPPbuilding1.pdf',
					size: '2600',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/BLOK6.pdf',
					size: '11849',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/BLOK3.pdf',
					size: '13857',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/BLOK2.pdf',
					size: '12103',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/BLOK5.pdf',
					size: '12111',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/BLOK4.pdf',
					size: '12727',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/SATTstoragegrounds.pdf',
					size: '115982',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/SATTrefinery2.pdf',
					size: '128032',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/SATTmanufacturing2.pdf',
					size: '139827',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/SATTmanufacturing.pdf',
					size: '122686',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/SATTrefinery.pdf',
					size: '126925',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Blackjack Maps/SATTpitmine.pdf',
					size: '133868',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7401',
		{
			sku: ['7401'],
			category: 'misc',
			type: 'scan',
			name: 'Sprawl Maps',
			releaseDate: ['1994'],
			description: 'Sprawl Maps contains 8 new, full-color maps of sites in the sprawl, including a monorail/subway station, a warehouse, a park, low- and no-rent apartments, a street, and a nightclub.',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Misc/Maps/7401 - Sprawl Maps.pdf',
					size: '3553024',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27CCG',
		{
			sku: ['27CCG'],
			category: 'misc',
			type: 'digital',
			name: 'Shadowrun 5th: Conversion rules',
			releaseDate: ['2013-07-16'],
			description: 'Shadowrun, Fifth Edition introduces some rule tweaks for shadowrunners and this guide will help you move from SR4 to SR5.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Misc/Conversion/27CCG - Shadowrun 5th.pdf',
					size: '353022',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7111',
		{
			sku: ['7111'],
			category: 'misc',
			type: 'scan',
			name: 'D.M.Z.: Downtown Militarized Zone',
			releaseDate: ['1990-10'],
			description: 'D.M.Z. is a game of urban comat in the near future. It is a future that may resemble your darkes nightmares or your deepest dreams. In the year of 2050, the integration of technology and the Human form has changed global society profoundly. It is a time of ultimate luxury for the rich and bottomless despair for the poor. Multinational corporations rule, their needs and desires overshadowing the wills of nations. In the streets, violence holds sway, with sybernetically enhanced wariors battling for control of buildings, blocks, and even cities. The police forces, now operated by corporate subcontractors, seek to maintain control. The slide towards anarchy see,s irrevocable.\nAt the same time, the very nature of the planet has changed, too. Magic has returned to the world in force, and with it, the rebirth of ancient races of Elves, Dwarfs, Orks and Trolls. But this is not one of the great civilizations of old; this is one of power and greed, of evil in the board room and anarchy in the streets. The animals of mithology have also returned to roam the Earth: Vampires, Ghouls, Gargoyles, Hell Hounds, and Dragons. With the return of magic, mankind once more remembers its ways and its uses. Magician flourish, exerting their influence equally in the corporate board rooms and on the streets.',
			gameDate: '2050',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Misc/7111 - Downtown Militarized Zone.pdf',
					size: '5739756',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'2635A',
		{
			sku: ['2635A'],
			category: 'misc',
			type: 'digital',
			name: 'BattleRun: Best Ever - An Eighth World Adventure',
			releaseDate: ['2009-04'],
			description: 'BEST EVER\nAn Eighth World Adventure\nA product 45 years in the making! Though most of those years were concurrent!\n\nAs BattleTech celebrates its 25th anniversary and Shadowrun celebrates its 20th, the visionaries at Catalyst Game Labs have, for the first time ever, brought these two worlds together! Join us in a universe that combines the best of two fantastic game universes in a tournament to decide who is the best warrior of all time!\n\nMany warriors have fallen, and only four remain in the Best Ever Tournament: Kieran McCool, the wily immortal elf who pilots the most feared \'Mech on the battlefield; Asmodeal el Angel de la Muerte, the Manei Domini blood mage who is so evil that his mere presence destroys all photons in the immediate vicinity; Nadja Daviar, a refugee from the 21st century who has lost none of her wiles or extreme sex appeal; and newcomer Jonas Hadry, a MechWarrior and battlefield commander so charismatic and beloved that it seems that possibly the deck was a little stacked in his favor.\n\nThe Best Ever is a bold venture that bridges two universes. Exciting, visionary, and often a bit deranged, this is the project that no one was asking for but everyone will love!\n\nContains a summary of the new Eighth World setting, nine new character archetypes, and a roleplaying adventure that involves your characters in the excitement, glamor and sheer ludicrousness of the Best Ever Tournament.\n\nThe Best Ever is kind of compatible with Shadowrun, 4th Edition, and A Time of War: The BattleTech RPG, elbow grease to make fully compatible not included.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Misc/2635A - Best Ever - An Eighth World Adventure.pdf',
					size: '9345624',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26CCG',
		{
			sku: ['26CCG'],
			category: 'misc',
			type: 'digital',
			name: 'Shadowrun 4th: Conversion Rules',
			releaseDate: ['2005'],
			description: 'Rules for convertion from 3rd to 4th edition.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Misc/Conversion/26CCG - Shadowrun 4th.pdf',
					size: '1145975',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7701',
		{
			sku: ['7701'],
			category: 'misc',
			type: 'scan',
			name: 'High Tech and Low Life: The Art of Shadowrun',
			releaseDate: ['1997-06'],
			description: 'High-Tech & Low-Life: The Art of Shadowrun brings to life the cyberpunk, neo-fantasy and science fiction elements of Shadowrun. It includes eight years worth of luminous interior pages and dramatic covers from FASA\'s futuristic roleplaying universe and, for the first time, assembles them in a single volume.\nThe work of many of the artists featured in this book also appeared in Spectrum, an annual compilation of the best of fantastic art, including Luis Royo, John Zeleznik, Doug Andersen, Brom, Rick Berry, Jim Nelson, Tom Baxa, Joel Biske, and Jeff Laubenstein.',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Misc/7701 - High Tech and Low Life - The Art of Shadowrun.pdf',
					size: '16630519',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26APR13',
		{
			sku: ['26APR13'],
			category: 'misc',
			type: 'digital',
			name: 'Rigger 4',
			releaseDate: ['2013-04'],
			description: 'We love riggers. We want them to have toys. But when we gathered the freelancers at the clubhouse (saltines are free, but bring your own beverage. And a chair), we quickly noticed that they were struggling to come up with ideas.\nThis puts us in a pinch. We thought we could try making our scary face at them to intimidate them into genius creativity, but we have been told in the past that our scary face looks like a mildly peeved newspaper delivery boy, so that wasnât really going to get us anywhere. Besides, we like to offer carrots instead of sticks whenever possible. Though as we thought more about it, the whole concept of sticks seemed alluring. Maybe we could beat them into creativity!\nSo we set about them, making sure to work the torso and not leave any marks on their beautiful faces. After a while they started complaining that theyâd really like to lie down for a while, so I broke out the sleeping bags and had them settle down on the clubhouse floor. I hoped that once they woke up, the genius would start flowing.\nAs youâll see in these pages, our hopes were well and truly metâand then some. While this compilation may be slightly shorter than rigger books of past editions, we think youâll agree that no rigger book in the history of Shadowrun has presented a series of vehicles and drones quite like this one. Only the right minds, treated the right way, could come up with the information this book contains. So it is with great pride that we present you: Rigger 4! Enjoy!',
			gameDate: '2075',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Misc/Pranks/26APR13 - Rigger 4.pdf',
					size: '4402782',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26APR3p',
		{
			sku: ['26APR3p'],
			category: 'misc',
			type: 'digital',
			name: 'Street Legends: Home Edition',
			releaseDate: ['2012-04'],
			description: 'When developing Shadowrun, we come across all sorts of ideas. Good ideas. Crazy ideas. Ideas guaranteed to make us require yet more expensive psychotherapy bills. Yet we donât believe there are bad ideasâonly ideas that need the right outlet. Street Legends: Home Edition is our way of providing a place for those ideas that, in normal circumstances, leave us shaking our heads in confusion and/or despair.\nMeet an ork in a sequined white jumpsuit, a ninja elf stripper, a set of triplets with an unusual bond, and the most enthusiastic, cheerful shadowrunner youâll ever meet. They may not be youâre typical runners, but theyâre all legendsâin the sense of, if you met them, youâd still have trouble believing they existed.',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Misc/Pranks/26APR3p - Street Legends - Home Edition.pdf',
					size: '8071005',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'TSS-SDT',
		{
			sku: ['TSS-SDT'],
			category: 'magazine',
			type: 'digital',
			name: 'The Shadowrun supplemental: Seattle 2063 Downtown',
			releaseDate: ['2002'],
			description: 'The heart and soul of the Metroplex, Seattleâs Downtown is unlike any other city in North America. Tourists can find a wide variety of entertainment in the Downtown shops, restaurants, theaters and museums. Whether you enjoy the sites from one of the many dirigible services that grace Seattleâs skyline, or you choose to take in the sites with a brisk walk, you can be sure that your trip to Seattle will be like no other!',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Magazines/The Shadowrun Supplemental/TSS - Seattle 2063 Downtown.pdf',
					size: '1257680',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM04-08',
		{
			sku: ['SRM04-08'],
			category: 'mission',
			type: 'scan',
			name: 'Brothers United (Artifact Rush, Part 4)',
			releaseDate: ['2012-05'],
			description: 'A girl is missing. Finding her would be a nobler mission than most shadowrunners normally pursue, which means there must be a catch. And there is. The runnersâ job starts at a talismongers and then brings them to a Barrens orphanage. If theyâre observant enough, theyâll be launched on a journey that will take them through dark tunnels, past dangerous entities, and, eventually, to a supposedly abandoned building that holds at least two dark secrets. If theyâre lucky, theyâll find Ruth alive. If theyâre unlucky, theyâll find her alive and transformed.',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 4/SRM04-08 - Brothers United (Artifact Rush, Part 4).pdf',
					size: '5728477',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM04-07',
		{
			sku: ['SRM04-07'],
			category: 'mission',
			type: 'digital',
			name: 'Burn (Buried Underground, Part 4)',
			releaseDate: ['2012-02'],
			description: 'If constant friction makes things hot, then the Ork Underground is ready to blaze. Proposition 23, known to some as âProject Freedom,â is coming closer to a vote, and it could make the Ork Underground a full district of the city of Seattle. People on both sides are willing to do just about anything to make the vote go their way, and theyâre demonstrating that willingness with blades, bullets, explosives, and more. This has become more than a fight for votesâitâs a struggle for survival.',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 4/SRM04-07 - Burn (Buried Underground, Part 4).pdf',
					size: '5799440',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM04-10',
		{
			sku: ['SRM04-10'],
			category: 'mission',
			type: 'digital',
			name: 'Romero & Juliette (Artifact Rush, Part 5)',
			releaseDate: ['2012-09'],
			description: 'A missing shadowrunner. An artifact with mysterious, blood-fed powers. And astral beings with horrible grudges. All of these elementsâand moreâare coming together to give shadowrunners a long day and a longer night, as they move from trying to find what has been lost to struggling for their survival. And with what theyâre up against, survival would be a very notable accomplishment.\nWhether you have played previous Missions in Season Four or are just now diving into this plotline, SRM 04-10: Romero and Juliette provides a test for any group of shadowrunners while also increasing the intensity of the hunt for artifacts in Seattle. This one will give runners a story to tell over the next round of drinks, as long as they an stay alive long enough to buy one.',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 4/SRM04-10 - Romero & Juliette (Artifact Rush, Part 5).pdf',
					size: '2807505',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM04-09',
		{
			sku: ['SRM04-09'],
			category: 'mission',
			type: 'scan',
			name: 'Assassin Nation (Buried Underground, Part 5)',
			releaseDate: ['2012-08'],
			description: 'The debate over the future of the Ork Underground is heating up. Proposition 23, which will decide whether or not the Underground becomes an official district of the city of Seattle, is coming up for a vote, and people on all sides are getting desperate. There are those, though, who understand that desperation can breed opportunity, and they are hatching plots that can help them take advantage of the chaos that is sure to rain down on the city. And there are others for who chaos is an end in and of itself.',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 4/SRM04-09 - Assassin Nation (Buried Underground, Part 5).pdf',
					size: '9053403',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM04-06',
		{
			sku: ['SRM04-06'],
			category: 'mission',
			type: 'digital',
			name: 'Hard Target (Artifact Rush, Part 3)',
			releaseDate: ['2012-01'],
			description: 'The Sixth World is full of dark crevasses and corners where people can hide. Where they can go when the rest of the world has told them they donât belong. Where they can be forgotten. People who disappear into these places become secrets, whispered threats of a mysterious something that lurks just out of sight.\nSome peopleâthe normal ones, the sane onesâavoid these dark corners and any danger they might be hiding, but shadowrunners donât have that choice. The dark corners are where they live. So when Mr. Johnson needs some information thatâs hidden in one of these places, you know that heâs not going after it himself. Heâll send some runners instead and let them deal with whatever might be waiting for them.',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 4/SRM04-06 - Hard Target (Artifact Rush, Part 3).pdf',
					size: '5595215',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM04-03',
		{
			sku: ['SRM04-03'],
			category: 'mission',
			type: 'digital',
			name: 'Rally Cry (Buried Underground, Part 2)',
			releaseDate: ['2011-07'],
			description: 'Whoever wins the war for the future of the Ork Underground is not going to leave a single weapon holstered. From waging outright violence to employing political subterfuge, both sides in the struggle are willing to use any tactics they can dream of to advance their cause.\nAnti-metahuman sentiment has long been a hot-button issue in Seattle, and some members of the Ork Rights Committee have decided to expose one of Governor Brackhavenâs cronies for the racist they believe him to be. The only trouble is, people with a high public profile are usually very careful about keeping up appearances. If the ORC is going to support their accusations of racism, they may need some help in gettingâor manufacturingâthe evidence they need. That, of course, is where shadowrunners come in.',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 4/SRM04-03 - Rally Cry (Buried Underground, Part 2).pdf',
					size: '5766163',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM04-02',
		{
			sku: ['SRM04-02'],
			category: 'mission',
			type: 'digital',
			name: 'Extraction (Artifact Rush, Part 1)',
			releaseDate: ['2011-05'],
			description: 'Parker Acson is a hot property. Horizon has just hired him, but theyâre the only ones who want him. Acson has gotten the attention of plenty of players in the magical arena, and several of them are interested in getting a piece of him. The runners have been hired to extract Acson by a mysterious Mr. Johnson, and theyâre going to have to move quickly to get him out safely. There is plenty of competition out there, and not all of them are interested in Acson staying alive and intact.',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 4/SRM04-02 - Extraction (Artifact Rush, Part 1).pdf',
					size: '5932855',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM04-05',
		{
			sku: ['SRM04-05'],
			category: 'mission',
			type: 'digital',
			name: 'On A Silver Platter (Artifact Rush, Part 3)',
			releaseDate: ['2011-12'],
			description: 'A year ago your fixer\'s daughter was killed by the Mayan Cutter copycat. He always suspected that someone else was pulling the strings, someone highly placed. Now he believes he has proof, but that someone isn\'t going down without a fight. The stakes are higher than ever aand someone\'s trying to stop you before you even start! Are you ready to serve up a side of revenge?',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 4/SRM04-05 - On A Silver Platter (Artifact Rush, Part 3).pdf',
					size: '5693400',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM04-04',
		{
			sku: ['SRM04-04'],
			category: 'mission',
			type: 'digital',
			name: 'Smuggler\'s Blues (Artifact Rush, Part 2)',
			releaseDate: ['2011-09'],
			description: 'Crossing the border into Salish-Shidhe territory is not easy under the best of circumstances. Crossing when youâre carrying an item that lights up the astral plane like a phosphorus bomb is even trickier. But the stakes are rising in the fight over magical artifacts that keep finding their way into the Seattle area, and that means the possible payouts are going up as well. If you can play the role of a smuggler to the hilt and make all the right contacts, you have the chance for a serious payday. Of course, you also stand a good chance of making some very powerful enemies, but isnât that always the way?',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 4/SRM04-04 - Smugglers Blues (Artifact Rush, Part 2).pdf',
					size: '3974044',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM04-11',
		{
			sku: ['SRM04-11'],
			category: 'mission',
			type: 'digital',
			name: 'Election Day (Buried Underground, Part 5)',
			releaseDate: ['2012-11'],
			description: 'When the campaigning is done, the debates are over, and the voters are heading out to cast their votes, itâs time for the final push. Whether youâre fighting for a particular candidate or a specific cause, you donât want to feel like there was more you could have done, that there was one more gambit you could have pulled to put your side over the top. Now is your final chance to make a difference before the votes are counted.\nItâs Election Day in Seattle, and thereâs plenty up for grabs, including the future of the Ork Underground. The power players of the sprawl want things to go their wayâwhatever way that may beâand theyâre not pulling any punches. Theyâre dumping out their bags of tricks, and naturally some of those tricks involve giving money to shadowrunners. Whether theyâre being asked to start riots between voters or find an operative who is sitting on too many secrets, theyâre going to have a busy day, and their actions will shape the future of Seattle. With any luck, theyâll be alive to see it.',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 4/SRM04-11 - Election Day (Buried Underground, Part 5).pdf',
					size: '6310060',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM05-02',
		{
			sku: ['SRM05-02'],
			category: 'mission',
			type: 'digital',
			name: 'Critic\'s Choice',
			releaseDate: ['2014-04'],
			description: 'When the curtain goes up on a shadowrun in Chicago, you never know whoâs going to take the stage. There are all sorts of creepy players out there, ghouls and gangers and more, and once the overtureâs done, runners better be ready to dance with whoever emerges, with the rat-a-tat-tat of bullets keeping time.\nThe cast of characters in this mission includes a good-hearted street doc looking to expand, a pit-fighting elf, a pugnacious gang leader with an historical bent, and one of the oddest tribal gatherings ever seen inside a major sprawl. Thatâs not all, of courseâwhat would a good shadowrun be without a few surprise guests? Runners will have plenty to keep them on their toes, and hopefully by the end theyâll have moved up a spot or two in the Chicago shadowrunner cast list. Assuming, of course, that they havenât dropped six feet under.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 5/SRM05-02 - Critic\'s Choice.pdf',
					size: '3136308',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM05-01',
		{
			sku: ['SRM05-01'],
			category: 'mission',
			type: 'digital',
			name: 'Chasin\' the Wind',
			releaseDate: ['2013-09'],
			description: 'Itâs been nearly twenty years since disaster struck the city of Chicago, transforming it into an urban hellscape, and some people now believe itâs suffered enough. The Governor of Illinois has initiated and ambitious plan called Project: Takeback to reclaim the feral urban jungle. Whatâs more, heâs put money into the effort, and thatâs the language every corporation on Earth understands. Suddenly, the race is on as the megacorps scramble to claim pieces of the Windy City. Theyâll be butting up against the dangers of the Containment Zone and each other, so theyâre going to need all sorts of deniable assets. The shadows of Chicago are coming back to life.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 5/SRM05-01 - Chasin\' the Wind.pdf',
					size: '2851527',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM05-04',
		{
			sku: ['SRM05-04'],
			category: 'mission',
			type: 'digital',
			name: 'Liberation',
			releaseDate: ['2014-12'],
			description: 'Every shadowrunner knows the fear that comes with the words âmilk run.â Anytime something is supposed be easy in the Sixth World, itâs guaranteed to come with unexpected headaches and danger, and that holds especially true for Chicago. Lothan the Wise, an egotistical troll mage who is extra irritating because he has the skills to back up his braggadocio, says he has a simple job. Thereâs no question that things will get more complicated than he expectsâthe only question is how things will go wrong, and which of the dangerous denizens of the feral sprawl will leap up to cause trouble. Runners will have to be fast, flexible, and able to think on their feetâbut isnât that part of the basic job description anyway?',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 5/SRM05-04 - Liberation.pdf',
					size: '3991221',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM05-03',
		{
			sku: ['SRM05-03'],
			category: 'mission',
			type: 'digital',
			name: 'Gone Long Gone',
			releaseDate: ['2014-08'],
			description: 'This isnât your first run in Chicago. You may not know every street corner and alleyway, but you know the sprawl well enough that when someone tells you theyâve got a job that âshould be easyââwell, it wonât be. It never is. So when youâre offered some money to go retrieve personal items left behind in a pharmaceutical office back before the whole town went to hell, you know youâre going to be dealing with more than dust and a few rats. Once you venture into the Containment Zone, somethingâprobably more than one thingâis going to try to kill you. Not in some vague future, but right now. But you know that about Chicago. Youâre ready for something to come after you, and you know that part of the fun is finding out just what it is.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 5/SRM05-03 - Gone Long Gone.pdf',
					size: '3405045',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM05-00',
		{
			sku: ['SRM05-00'],
			category: 'mission',
			type: 'digital',
			name: 'Missions Season 5',
			releaseDate: ['2013-09'],
			description: 'Visit sunny Chicago!\nSeason 5 of Shadowrun Missions is almost ready to launch! Get ready with this package of preparation file: Season 5 FAQ, Transfer Log, Contacts and Calendar.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 5/SRM05-00 - SRM Season 5 Transfer Log.pdf',
					size: '194606',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 5/SRM05-00 - SRM Season 5 Calendar.pdf',
					size: '149886',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 5/SRM05-00 - SRM Season 5 FAQ.pdf',
					size: '259145',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 5/SRM05-00 - SRM Season 5 Contacts.pdf',
					size: '531230',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM04-12',
		{
			sku: ['SRM04-12'],
			category: 'mission',
			type: 'digital',
			name: 'Showcase (Artifact Rush, Part 6)',
			releaseDate: ['2013-02'],
			description: 'The players are lined up. The goals are clear. The waiting is over. The ultimate rush is beginning, and itâs going to pull a lot of dangerous elements closer and closer together until they explode.\nThe shadows of Seattle have been heaved this way and that in the Great Seattle Artifact Rush, and a fair number of artifacts have been collected (in exchange for a handful of deaths and a helping of destruction). The powers of the magical world have been alerted, and they ready to get their hands on as many artifacts as possible. This means shadowruns, which means plenty of runners are about to be caught up in one of the worst mana-based drek-storms to hit the city in a long while.\nWhat starts as an investigation into a museum heist rapidly grows into a conflagration that could consume a good part of the sprawl. Clever players will need to see if they can survive, and how much nuyen they can wrangle out of the fight. Hopefully they\'ll get enough for a nice vacation or significant medical treatment, because chances are that they\'re going to need both.',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 4/SRM04-12 - Showcase (Artifact Rush, Part 6).pdf',
					size: '3730008',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM04-01',
		{
			sku: ['SRM04-01'],
			category: 'mission',
			type: 'digital',
			name: 'Hiding in the Dark (Buried Underground, Part 1)',
			releaseDate: ['2011-03'],
			description: 'If the Ork Underground is going to become an official district in Seattle, itâs going to need some cleaning up. Even if itâs not, some of the criminals down there have a pesky habit of bringing their activities to the surface, and plenty of people want them eliminated. Seattle law enforcement has had enough, and ADA Dana Oaks is determined to bring down some of the higher-profile criminals of the Undergroundâstarting with a mob enforcer who goes by the name of Junior.\nCriminals in the Underground donât go down easy, though, and shadowrunners are going to have to use all their skills to track Junior down. When they find him, they might discover that their task isnât quite as straightforward as they may have thought.',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 4/SRM04-01 - Hiding in the Dark (Buried Underground, Part 1).pdf',
					size: '5554737',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM03-04',
		{
			sku: ['SRM03-04'],
			category: 'mission',
			type: 'digital',
			name: 'Monkeywrench',
			releaseDate: ['2009-08'],
			description: 'A little milk run like this should be no problem. Though, it sounds like you donât get much time. Non-lethal rounds and no legal complications makes these âsecurity consultantâ gigs the best in the Big Apple.\nMr. Johnson wants someone to test his security systems. Everything should be perfectly routine and above board. After all, things never go horribly wrong during a shadowrun, right? No reason to have any back-up plans ready for this. Itâs all just wonderfully straightforward. Whatâre you giving me that look for? This 25-page scenario includes a complete adventure, player handouts, and record handling sheets for participating in the Shadowrun Missions (SRM) campaign.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 3/SRM03-04 - Monkeywrench.pdf',
					size: '4098310',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM03-03',
		{
			sku: ['SRM03-03'],
			category: 'mission',
			type: 'digital',
			name: 'Burning Bridges',
			releaseDate: ['2009-06'],
			description: 'The voice on the other end of the comm sounded desperate. The kind that pays well. Then he asked, âHow much do you know about demolitions?â\nMr. Johnson is at the end of his rope, and he needs some serious income. He latches onto a desperate and tragically dangerous scheme that just might get him what he needs, though it might cost hundreds of lives in the process. The team needs to decide if the pay is worth the risk and the ethical quandry. This 27-page scenario includes a complete adventure, player handouts, and record handling sheets for participating in the Shadowrun Missions (SRM) campaign.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 3/SRM03-03 - Burning Bridges.pdf',
					size: '4009300',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM03-06',
		{
			sku: ['SRM03-06'],
			category: 'mission',
			type: 'digital',
			name: 'Jackknifed',
			releaseDate: ['2010-01'],
			description: 'Defend a truck â What could possibly go wrong?',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 3/SRM03-06 - Jackknifed.pdf',
					size: '2777736',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM03-05',
		{
			sku: ['SRM03-05'],
			category: 'mission',
			type: 'digital',
			name: 'In and Out',
			releaseDate: ['2009-11'],
			description: 'A stool pigeon is ready to name names. Mr. Johnson wants to make sure they\'re the right names. He needs you to break into the NYPD Inc. holding facility and deliver a message. This 25-page scenario includes a complete adventure, player handouts, and record handling sheets for participating in the Shadowrun Missions (SRM) campaign.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 3/SRM03-05 - In and Out.pdf',
					size: '4540287',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM03-02',
		{
			sku: ['SRM03-02'],
			category: 'mission',
			type: 'digital',
			name: 'Block War',
			releaseDate: ['2009-05'],
			description: 'What starts as a petty fight could degenerate to a full-scale war. When things are turning sour who said mediators had to be neutral?\nA fixer hires the team for what seems like little more than a complicated prank. However, sometimes, people have a hard time keeping their vengeance proportionate. When two veterans of the business conflict enter the fray, the team needs to make some hard choices. In not time, things go from humorous to deadly. This 26-page scenario includes a complete adventure, player handouts, and record handling sheets for participating in the Shadowrun Missions (SRM) campaign.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 3/SRM03-02 - Block War.pdf',
					size: '3317947',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM03-01',
		{
			sku: ['SRM03-01'],
			category: 'mission',
			type: 'digital',
			name: 'Ready, Set, Gogh!',
			releaseDate: ['2009-04'],
			description: 'By 2070, life literally imitates art. Some people have a fetish for it and itâs your job to see that itâs delivered and still breathing.\nThe team is forced to confront the challenges of Manhattan security, when Mr. Johnson asks them to perform a major heist. From there, things spiral into a double helix of complexity as motivations are abruptly twisted. This 24-page scenario includes a complete adventure, player handouts, and record handling sheets for participating in the Shadowrun Missions (SRM) campaign.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 3/SRM03-01 - Ready, Set, Gogh!.pdf',
					size: '3597219',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM03-00',
		{
			sku: ['SRM03-00'],
			category: 'mission',
			type: 'digital',
			name: 'Everyone\'s Your Friend',
			releaseDate: ['2009-03'],
			description: 'Sometimes following up on a job really means following. Youâve been hired to track down an old acquaintance whoâs fled across the continent.\nIn the first scenario of the New York City Shadowrun Missions campaign, characters are introduced to the challenges of running among the bright lights of Manhattan. Provisions allow characters who participated in the Denver campaign to transition their characters to this new location. This 25-page scenario includes a complete adventure, player handouts, and record handling sheets for participating in the Shadowrun Missions (SRM) campaign.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 3/SRM03-00 - Everyone\'s Your Friend.pdf',
					size: '3145531',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM03-07',
		{
			sku: ['SRM03-07'],
			category: 'mission',
			type: 'digital',
			name: 'Knight At The Opera',
			releaseDate: ['2010-02'],
			description: 'Eight teams escorting eight Damien Knights. Will the real Damien Knight please stand up.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 3/SRM03-07 - Knight At The Opera.pdf',
					size: '2925369',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM04-00X',
		{
			sku: ['SRM04-00X'],
			category: 'mission',
			type: 'digital',
			name: 'Missions Season 4',
			releaseDate: ['2011-02'],
			description: 'Get ready to take on Shadowrun Missions: Season Four. Included are a list of Seattle Contacts, a Karma Rollover Log and a calendar to track your adventures.',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 4/SRM04-00 - Season Four Karma Rollover Transfer Log.pdf',
					size: '2722484',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 4/SRM04-00 - SRM Season Four Calendar.pdf',
					size: '1050910',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 4/SRM04-00 - SRM FAQ Season Four.pdf',
					size: '6620810',
					mime: 'application/pdf'
				},
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 4/SRM04-00 - Season Four Files.pdf',
					size: '4736662',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM04-00',
		{
			sku: ['SRM04-00'],
			category: 'mission',
			type: 'digital',
			name: 'Back In Business',
			releaseDate: ['2011-01'],
			description: 'Itâs a simple job: find a missing girl. Of course, nothing is ever simple in the shadows, and a whole lot of people seem to be interested in this job for one reason or another.\nWelcome to Season Four of the Missions Campaign, which returns home to the Emerald Sprawl, Seattle. Biz is good as a political fight is brewing to determine the fate of the vast Ork Underground, and everyone seems to be fighting over the mysterious artifacts flowing into the city. If youâre going to get through this, remember the basics: Shoot straight, watch your back, and never, ever deal with a dragon. Oh, and collect a hefty payday along the way!',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 4/SRM04-00 - Back In Business.pdf',
					size: '10432599',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM03-12',
		{
			sku: ['SRM03-12'],
			category: 'mission',
			type: 'digital',
			name: 'Elevator Ride to Hell',
			releaseDate: ['2010-11'],
			description: 'Youâve had quite a time in the Rotten Appleâyouâve seen some weird people, done some strange things, and made some narrow escapes. Hopefully youâve made some friends, and most likely youâve made some enemies. But a strong wind getting ready to blow through town, and it just might take you away with it. Just make sure you leave alive.\nElevator Ride to Hell concludes the Manhattan series of Missions, giving the Big Apple a dramatic sendoff. The adventure contains character stats, maps, and everything you need to plunge a group into the treacherous heart of New York. So jump on, press the âclose doorâ button, and get ready for a ride that might hurdle clever runners to the peak of Manhattan fameâor slam them to the ground in a burning, wrecked hulk.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 3/SRM03-12 - Elevator Ride to Hell.pdf',
					size: '4639542',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM03-09',
		{
			sku: ['SRM03-09'],
			category: 'mission',
			type: 'digital',
			name: 'Something Completely Different',
			releaseDate: ['2010-08'],
			description: 'As any artist will tell you, the art scene can be brutal, especially in a high-octane setting like Manhattan. There are plenty of horror stories to go aroundâbut none of them can touch whatâs about to go down at the Guggenheim.\nIn this Mission, Shadowrun players will find themselves in the middle of an art opening unlike any other, with chaos and screaming and dancing statues. Unless they keep their wits about them, the latest masterpiece in the museum will be painted in bloodâand to make things worse, if they canât defuse the situation, they might not get paid.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 3/SRM03-09 - Something Completely Different.pdf',
					size: '3729079',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM03-08',
		{
			sku: ['SRM03-08'],
			category: 'mission',
			type: 'digital',
			name: 'Firestorm',
			releaseDate: ['2010-07'],
			description: 'It\'s the Easy Ones that Get You.\nIf you\'ve survived enough runs, you know that the ones that sound easy are the ones that get you. And what could be easier than recovering a runaway drone?\nAs it turns out, plenty. The drone is acting strangely--strange enough that two megacorporations are interested in its fate. And there are others, who are no fans of the megacorps, who have got the scent of what\'s going on as well. The chase for the drone is putting a lot of people on a crash course, and when they collide, guns are going to come out. Can you survive the crossfire?',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 3/SRM03-08 - Firestorm.pdf',
					size: '4064726',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM03-11',
		{
			sku: ['SRM03-11'],
			category: 'mission',
			type: 'digital',
			name: 'Food Poisoning',
			releaseDate: ['2010-10'],
			description: 'People die every day. People without SINs die even more frequently. Thatâs not news. But when people without SINs are being poisoned, when it looks like theyâre being targeted somehowâwell, thatâs no good. If someoneâs going after people without SINs, that means the next target could be one of your contacts, or your fixer, or even you. \nThat would be incentive enough for most runners to look into this spate of poisoning, but Mr. Johnsonâs got some cash to throw around, and maybe some hints of where to start looking. In Food Poisoning, runners have the chance to trace the spate of poisonings to its source, and to uncover the double-crosses and machinations behind all the deaths.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 3/SRM03-11 - Food Poisoning.pdf',
					size: '3507363',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM03-10',
		{
			sku: ['SRM03-10'],
			category: 'mission',
			type: 'digital',
			name: 'Spin Control',
			releaseDate: ['2010-09'],
			description: 'Journalists have faced plenty of accusations of acting with a hive-mind mentality, but some covert operations in Manhattan are about to take things to a new level. What starts out for runners as a simple investigation into gang activities turns into an exploration of some of the cityâs darkest secretsâthe kind of things that tend to make anyone who finds out about them turn up dead. If the runners are going to survive this mission, theyâre going to have to fight hard, make tough decisions, and possibly join forces with some unusual allies.',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 3/SRM03-10 - Spin Control.pdf',
					size: '4298468',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'TSS-08',
		{
			sku: ['TSS-08'],
			category: 'magazine',
			type: 'digital',
			name: 'The Shadowrun supplemental: Issue 08',
			releaseDate: ['1998'],
			description: 'Welcome to issue #8 of The Shadowrun Supplemental! This issue comes out at the worst of times for me â Final Tests. This means between spending time doing that horrible studying stuff and actually attending all my classes, thereâs also the end of year and graduation parties.',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Magazines/The Shadowrun Supplemental/TSS - 08.pdf',
					size: '273327',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'TSS-07',
		{
			sku: ['TSS-07'],
			category: 'magazine',
			type: 'digital',
			name: 'The Shadowrun supplemental: Issue 07',
			releaseDate: ['1998'],
			description: 'Welcome to issue #7 of The Shadowrun Supplemental! This issue marks the first issue of our second year!',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Magazines/The Shadowrun Supplemental/TSS - 07.pdf',
					size: '270669',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'TSS-10',
		{
			sku: ['TSS-10'],
			category: 'magazine',
			type: 'digital',
			name: 'The Shadowrun supplemental: Issue 10',
			releaseDate: ['1999'],
			description: 'Welcome to #10. This is the big one - the giant move up to double digits. Ordinarily that would be cause to celebrate, but this is extra special, because with this issue Iâve taken what will hopefully be the big steps in pushing this magazine to greater heights.',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Magazines/The Shadowrun Supplemental/TSS - 10.pdf',
					size: '379112',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'TSS-09',
		{
			sku: ['TSS-09'],
			category: 'magazine',
			type: 'digital',
			name: 'The Shadowrun supplemental: Issue 09',
			releaseDate: ['1998'],
			description: 'Welcome to issue #9 of The Shadowrun Supplemental! Yes, it\'s been a long road from issue #8, and the delays have been annoying, probably more so to me than to you. I truly did not enjoy having what I consider one of my greatest achievements online and being updated.',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Magazines/The Shadowrun Supplemental/TSS - 09.pdf',
					size: '711848',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'TSS-06',
		{
			sku: ['TSS-06'],
			category: 'magazine',
			type: 'digital',
			name: 'The Shadowrun supplemental: Issue 06',
			releaseDate: ['1998'],
			description: 'Welcome to issues #6 of The Shadowrun Supplemental! This is the on-again off-again Rigger/Vehicle issue, which as you can see, is onagain!',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Magazines/The Shadowrun Supplemental/TSS - 06.pdf',
					size: '358221',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'TSS-03',
		{
			sku: ['TSS-03'],
			category: 'magazine',
			type: 'digital',
			name: 'The Shadowrun supplemental: Issue 03',
			releaseDate: ['1997'],
			description: 'Welcome to the third issue of The Shadowrun Supplemental. I would like to thank everyone who has read the first two issues, and hopefully say hi to some new readers.',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Magazines/The Shadowrun Supplemental/TSS - 03.pdf',
					size: '533997',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'TSS-02',
		{
			sku: ['TSS-02'],
			category: 'magazine',
			type: 'digital',
			name: 'The Shadowrun supplemental: Issue 02',
			releaseDate: ['1997'],
			description: 'Welcome to the second issue of The Shadowrun Supplemental. I want to thank everyone who has read issue #1, and hopefully welcome some new readers.',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Magazines/The Shadowrun Supplemental/TSS - 02.pdf',
					size: '150830',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'TSS-05',
		{
			sku: ['TSS-05'],
			category: 'magazine',
			type: 'digital',
			name: 'The Shadowrun supplemental: Issue 05',
			releaseDate: ['1997-11-15'],
			description: 'Welcome to the fifth issue of The Shadowrun Supplemental. Once again, I feel this is an issue of growth for the magazine, adding several âfull-timeâ staff members and also getting a good distribution increase.',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Magazines/The Shadowrun Supplemental/TSS - 05.pdf',
					size: '431684',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'TSS-04',
		{
			sku: ['TSS-04'],
			category: 'magazine',
			type: 'digital',
			name: 'The Shadowrun supplemental: Issue 04',
			releaseDate: ['1997'],
			description: 'Another two months fly by. This is the fourth issue of The Shadowrun Supplemental, so, like usual, thanks for reading, and I hope that I have a few new readers with this issue :) (Judging by the email I keep getting, I do..)',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Magazines/The Shadowrun Supplemental/TSS - 04.pdf',
					size: '290894',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'TSS-11',
		{
			sku: ['TSS-11'],
			category: 'magazine',
			type: 'digital',
			name: 'The Shadowrun supplemental: Issue 11',
			releaseDate: ['1999'],
			description: 'Melee Style, The NARCAR Phenomenom and SwiftOne Speaks. All in this issue of The Shadowrun supplemental!',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Magazines/The Shadowrun Supplemental/TSS - 11 - Sheet.pdf',
					size: '43570',
					mime: 'application/pdf'
				},
				{
					path: './Magazines/The Shadowrun Supplemental/TSS - 11.pdf',
					size: '2298907',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'TSS-17',
		{
			sku: ['TSS-17'],
			category: 'magazine',
			type: 'digital',
			name: 'The Shadowrun supplemental: Issue 17',
			releaseDate: ['2002'],
			description: 'The Cutthroats, Matrix Gangs, MArtial Arts Styles, and more, only on this issue of The Shadowrun supplemental!',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Magazines/The Shadowrun Supplemental/TSS - 17.pdf',
					size: '1625750',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'TSS-16',
		{
			sku: ['TSS-16'],
			category: 'magazine',
			type: 'digital',
			name: 'The Shadowrun supplemental: Issue 16',
			releaseDate: ['2001'],
			description: 'On the headlines: A Shadowtourist\'s Guide to Buffalo.',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Magazines/The Shadowrun Supplemental/TSS - 16.pdf',
					size: '1769467',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'TSS-BeCKS',
		{
			sku: ['TSS-BeCKS'],
			category: 'magazine',
			type: 'digital',
			name: 'The Shadowrun supplemental: BeCKS v2',
			releaseDate: ['2003'],
			description: 'Issue #15 of The Shadowrun Supplemental saw the debut of Bethyagaâs Complete Karma System, a new method of character creation for Shadowrun. As an alternative to existing systems, BeCKS creates characters using Karma instead of priorities or points (as presented in Shadowrun Third Edition and the Shadowrun Companion respectively).',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Magazines/The Shadowrun Supplemental/TSS - BeCKS v2.pdf',
					size: '894428',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'TSS-18',
		{
			sku: ['TSS-18'],
			category: 'magazine',
			type: 'digital',
			name: 'The Shadowrun supplemental: Issue 18',
			releaseDate: ['2002'],
			description: 'Gunslingers, Into the Void, Infected Greetings, and more.',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Magazines/The Shadowrun Supplemental/TSS - 18.pdf',
					size: '1642876',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'TSS-15',
		{
			sku: ['TSS-15'],
			category: 'magazine',
			type: 'digital',
			name: 'The Shadowrun supplemental: Issue 15',
			releaseDate: ['2001'],
			description: 'Featuring BeCKS!',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Magazines/The Shadowrun Supplemental/TSS - 15.pdf',
					size: '1436971',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'TSS-12',
		{
			sku: ['TSS-12'],
			category: 'magazine',
			type: 'digital',
			name: 'The Shadowrun supplemental: Issue 12',
			releaseDate: ['2000'],
			description: 'ShadeTrompers #2, and Berserk!',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Magazines/The Shadowrun Supplemental/TSS - 12.pdf',
					size: '1060019',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'TSS-14',
		{
			sku: ['TSS-14'],
			category: 'magazine',
			type: 'digital',
			name: 'The Shadowrun supplemental: Issue 14',
			releaseDate: ['2001'],
			description: 'What\'s new in Shadowrun 3rd edition?',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Magazines/The Shadowrun Supplemental/TSS - 14.pdf',
					size: '739294',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'TSS-13',
		{
			sku: ['TSS-13'],
			category: 'magazine',
			type: 'digital',
			name: 'The Shadowrun supplemental: Issue 13',
			releaseDate: ['2000'],
			description: 'FASA Closing!',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Magazines/The Shadowrun Supplemental/TSS - 13.pdf',
					size: '1131887',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'TSS-01',
		{
			sku: ['TSS-01'],
			category: 'magazine',
			type: 'digital',
			name: 'The Shadowrun supplemental: Issue 01',
			releaseDate: ['1997'],
			description: 'First issue!',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Magazines/The Shadowrun Supplemental/TSS - 01.pdf',
					size: '147050',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM06-04',
		{
			sku: ['SRM06-04'],
			category: 'mission',
			type: 'digital',
			name: 'Tick Tock',
			releaseDate: ['2016-06'],
			description: 'You build walls for two reasons: to keep things out, and to keep things in. Walls were erected around the Chicago Containment Zone many years ago, keeping people from the outside away from the dangers within, and locking secrets inside that are still waiting to be discovered. Though the longer they stay hidden, the clearer it is that some secrets donât want to be found.\nIn the latest Shadowrun Mission, runners have a chance to solve one of the longest-standing mysteries of the Containment Zone, namely: What happened to Melissa Truman, the missing heir of a media empire? Digging up the right information will be hard enough, but if the runners are lucky and skilled enough to uncover the truth, theyâll have a harder question in front of them. What do they do with what theyâve found?',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 6/SRM06-04 - Tick Tock.pdf',
					size: '3938018',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM06-03',
		{
			sku: ['SRM06-03'],
			category: 'mission',
			type: 'digital',
			name: 'Ancient Rumblings',
			releaseDate: ['2016-05'],
			description: 'For years, the Containment Zone of Chicago has held many levels of wrong. One level is the bad things that frequently happen thereâthe various assaults against CZ residents, and the people who go missing or turn up dead. That level of wrong is bad enough, but it gets worse for the people who are foolish enough to look into the reasons behind the wrongs. The scope and range of evil in the CZ is enough to warp even the most stable of minds, and only the desperate or deranged voluntarily look into the darkest corners of the sprawl.\nThat, of course, means that shadowrunners find themselves diving into those corners all the time, and another chance is about to come their way. A young woman has gone missing, and Becky 99, leader of the Desolation Angels, wants her found. The runners will face the challenge of digging through the darkness of the CZ to find this womanâand then living with whatever it is they discover.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 6/SRM06-03 - Ancient Rumblings.pdf',
					size: '1685283',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM06-06',
		{
			sku: ['SRM06-06'],
			category: 'mission',
			type: 'digital',
			name: 'Falling Angels',
			releaseDate: ['2016-09'],
			description: 'Tensions donât simmer for long in the Sixth World. They build, and then they explode. In Chicagoâs Containment Zone, that time has come. From the hunt for the missing Samantha Villiers (in her various guises) to rising gang tensions to mysterious strangers building power bases for secretive purposes, there are plenty of unstable reagents mixing in the CZ, and theyâre about to blow. Shadowrunners are going to be right in the middle of it allâarenât they always?âand theyâll have to see how many lives they can save. Including their own.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 6/SRM06-06 - Falling Angels.pdf',
					size: '2243791',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM06-05',
		{
			sku: ['SRM06-05'],
			category: 'mission',
			type: 'digital',
			name: 'Healing the Sick',
			releaseDate: ['2016-08'],
			description: 'Chicagoâs Containment Zone may be a hellish landscape where a formerly thriving sprawl turned into a nightmare, but itâs got this going for itâthereâs sure a wide variety of runs there. Finding missing people? Check. Locating data in abandoned facilities? Check. Big game hunting? Time to add that one to the list.\nSome mysterious attacks have left some dead, badly mauled bodies behind, and people who care about life in the CZ want to find out whatâs behind the attacks. In the best big game hunting tradition, they want the creature (or creatures, or whatever) brought back alive, the better to find out whatâs happening, and why.\nThis is Chicago, though, so nothing is going to be easy, and nothing is going to be straightforward. The runners are going to need their full breadth of skills if they want to make at least one corner of hell a little safer.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 6/SRM06-05 - Healing the Sick.pdf',
					size: '2518558',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM06-02',
		{
			sku: ['SRM06-02'],
			category: 'mission',
			type: 'digital',
			name: 'Amber Waves of Grain',
			releaseDate: ['2016-01'],
			description: 'The Chicago sprawl is host to all manner of strange creaturesâghouls, toxic spirits, hellhounds, barghests, and chickens. Yes, chickens. The city is mostly urbanized, but there are also large swathes of vacant land, and some enterprising souls have been farming that land. This is the Sixth World, though, which means that whenever you have someone trying something bold, you have a dozen other people thinking, "How can I use that to hurt other people?"\nThe runners are going to have some unusual jobs on this mission, including spreading some poisons and making sure innocent lives are spared (if theyâre so inclined). Theyâll have to be on their toes to steer clear of the authorities, get all the pieces of this particular scheme in place, and in particular answer the pressing question: Just what is Mr. Johnson up to?',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 6/SRM06-02 - Amber Waves of Grain.pdf',
					size: '3968962',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM05-06',
		{
			sku: ['SRM05-06'],
			category: 'mission',
			type: 'digital',
			name: 'Take a Chance',
			releaseDate: ['2015-10'],
			description: 'No matter what Mr. Johnson says, shadowrunners are never hired to do anything easy. If the job were easy, Mr. Johnson would do it himself. Sharp shadowrunners learn to recognize when a job is going to present extra challenges. There are certain signs, such as: 1) Mr. Johnson is openly auditioning multiple teams, both to find the right people and to set the auditioning parties on edge. 2) Mr. Johnson doesnât seem too anxious to reveal relevant details of the job; and worst of all, 3) Mr. Johnson claims it will be easy.\nSarah Silverleaf has a job for the runners, but unfortunately all of the above criteria are met. Danger is waiting for the runners, and sheâs not about to tell them what it is. Theyâll have to walk in the dark, navigate the unknown, and survive whatever comes at them. Because thatâs the job.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 5/SRM05-06 - Take a Chance.pdf',
					size: '3909532',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM05-05',
		{
			sku: ['SRM05-05'],
			category: 'mission',
			type: 'digital',
			name: 'While the City Sleeps',
			releaseDate: ['2015-03'],
			description: 'One of the things the Sixth World excels at is inventing millions of ways to piss people off. Chicago, particularly the Containment Zone, has a special gift for inciting tempers, with its pockmarked roads, feral gangs, bad-tempered thugs, drugged-out vagrants, and many other elements that are irritating at best, fatal at worst.\nFight promoter Sid Gambetti has a lot of pressures piling on him at once, including financial strain and a massive blackmail demand, and if he doesnât get some relief, heâs likely to blow. Unfortunately, it seems like just about everyone who has become involved with Sid is just as pressured and just as irritated. Any shadowrunners who take on the job that Sid has for them are going to be walking through a minefield of hot-tempered, bulked-out, Sixth World crazies who are just looking for an excuse to put the hurt on someone. Yeah, thereâs a pile of nuyen on the other side of the gauntlet, but it will take some quick thinking and fast moving to claim it without being on the receiving end of huge doses of pain.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 5/SRM05-05 - While the City Sleeps.pdf',
					size: '1051308',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM06-01',
		{
			sku: ['SRM06-01'],
			category: 'mission',
			type: 'digital',
			name: 'Ten Fifty-Seven',
			releaseDate: ['2015-12'],
			description: 'Darkness gathers in certain corners of the Sixth World, where no light can enter. The Containment Zone of Chicago has long been one of these dark spots, but government and corporate forces have combined their heft to bring some light to that benighted area, if only because they believe there is profit to be extracted. They have considerable powers at their disposalâbut there is also considerable darkness pooled in the ruined sprawl. It will be a battle, and as usual, shadowrunners will be used as the front-line soldiers.\nIn this Mission, runners will be called to investigate the case of some missing people and stolen augmentations. Answers are not easy to come by in the CZ, but trouble is, and runners will encounter plenty. If they want to dig deep into the heart of whatâs happening in the CZ, they better stay on their toes and ready for anything.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 6/SRM06-01 - Ten Fifty-Seven.pdf',
					size: '3907703',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM06-00',
		{
			sku: ['SRM06-00'],
			category: 'mission',
			type: 'digital',
			name: 'Missions Season 6',
			releaseDate: ['2015-12'],
			description: 'Tha FAQ for Season Six',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 6/SRM06-00 - SRM Season 6 FAQ.pdf',
					size: '1490502',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM07-00',
		{
			sku: ['SRM07-00'],
			category: 'mission',
			type: 'digital',
			name: 'Missions Season 7',
			releaseDate: ['2016'],
			description: 'The FAQ for Chicago missions, Season 7',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 7/SRM07-00 - Chicago FAQ.pdf',
					size: '1426152',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'DDH-02',
		{
			sku: ['DDH-02'],
			category: 'magazine',
			type: 'digital',
			name: 'Dumpshock Datahaven #2',
			releaseDate: ['2011'],
			description: 'Welcome to the new Dumpshock Datahaven. You\'re gonna find things you\'ve seen before like The Black Market, The Seattle Newsnet Screamsheet and Prime Runners. You\'re gonna find a few new columns like The Scan and the Hacker\'s Node. I\'ve also brought a surfer of the electron-ocean named Ronin to update the interface.',
			gameDate: '2073',
			edition: 4,
			publisher: ['unofficial'],
			files: [
				{
					path: './Magazines/Dumpshock Dataheaven/Dumpshock Datahaven #2.pdf',
					size: '10955979',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'DDH-01',
		{
			sku: ['DDH-01'],
			category: 'magazine',
			type: 'digital',
			name: 'Dumpshock Datahaven #1',
			releaseDate: ['2009'],
			description: 'Hoi Chummers!\nIf youâre seeing this, that means you got an invitation to the Dumpshock Data Haven Virtual Private Network, and this is your first time logging in. Since youâre new, there are a few things you should know before you head off and start playing with the other kiddies. First off, while DDH is the official name of this place, we like to call it Bullâs Mobile Bar & Grill. If you look around, the architecture of the place should give you a clue as to why we call it a âbar and grillâ. And being a VPN, itâs fairly mobile, in a way',
			gameDate: '2070',
			edition: 4,
			publisher: ['unofficial'],
			files: [
				{
					path: './Magazines/Dumpshock Dataheaven/Dumpshock Datahaven #1.pdf',
					size: '1174517',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SOK201',
		{
			sku: ['SOK201'],
			category: 'magazine',
			type: 'print',
			name: 'Shadowland #1',
			releaseDate: ['1995'],
			description: 'Although this is a magazine, the page numbering starts on the first page, excluding the covers.\nCover Art: Bottled Demon by John Zeleznik',
			gameDate: '2054',
			edition: 2,
			publisher: ['unofficial'],
			missing: 'outOfScope'
		}
	],
	[
		'SOK202',
		{
			sku: ['SOK202'],
			category: 'magazine',
			type: 'print',
			name: 'Shadowland #2',
			releaseDate: ['1995'],
			description: 'Index:\nCover (John Zeleznik)\nLunatic Fringe (Fiction - Phillip T. Adams)\nDrak\'s Drek (D. L. Knox)\nMcKissack\'s Chameleon (Critter - Andrew Ragland)\nGift Horse (Fiction - Erik Kjerland)\nA Runner\'s Guide to Magic (Background - Linda Naughton)\nThe Gross-Frankfurt Sprawl (city description - Jonathan Szeto)\nLearning and Improving Skills (Skill rules - Linda Naughton)\nPath of the Tiger (Totems - Gabriel Salazar)\nHeadaches: Social Animals (Adventure - Chris Hussey)\nThe Hermetic Lodge (Spells - Chris Hussey)',
			gameDate: '2054',
			edition: 2,
			publisher: ['unofficial'],
			missing: 'outOfScope'
		}
	],
	[
		'SOK203',
		{
			sku: ['SOK203'],
			category: 'magazine',
			type: 'print',
			name: 'Shadowland #3',
			releaseDate: ['1996'],
			description: 'Three fiction articles, new gear, new spells, new groups and a new adventure.\nCover Art: Jeff Laubenstein',
			gameDate: '2054',
			edition: 2,
			publisher: ['unofficial'],
			missing: 'outOfScope'
		}
	],
	[
		'SOK204',
		{
			sku: ['SOK204'],
			category: 'magazine',
			type: 'print',
			name: 'Shadowland #4',
			releaseDate: ['1996'],
			description: 'Table of Contents\nPg 3: The Shopping Mall (Gear, by Erik Jameson)\nPg 7: The Street Gang Compaign (Campaign suggestion, by Steve Kenson)\nPg 9: Serious Buckshot (Gear, By Kevin Montanaro)\nPg 12: 2056 Harley Davidson Ultra-Glide (Gear, By Kevin Montanaro)\nPg 13: The Ahvaz Diaspora (Magical phenomena, by Erik Jameson)\nPg 20: VatJob (Adventure, by Andrew Ragland)\nPg 46: A star is Dead (Andventure, by Chris Hussey)\nPg 52: Dead Air Novel excerpt, by Jak Koke)',
			gameDate: '2054',
			edition: 2,
			publisher: ['unofficial'],
			missing: 'outOfScope'
		}
	],
	[
		'SOK205',
		{
			sku: ['SOK205'],
			category: 'magazine',
			type: 'print',
			name: 'Shadowland #5',
			releaseDate: ['1996'],
			description: 'This is the fifth issue of Shadowland, an official publication devoted to Shadowrun.\nCover: Jeff Laubenstein',
			gameDate: '2054',
			edition: 2,
			publisher: ['unofficial'],
			missing: 'outOfScope'
		}
	],
	[
		'SOK206',
		{
			sku: ['SOK206'],
			category: 'magazine',
			type: 'print',
			name: 'Shadowland #6',
			releaseDate: ['1997'],
			description: 'Cover Art: Jeff Laubenstein',
			gameDate: '2054',
			edition: 2,
			publisher: ['unofficial'],
			missing: 'outOfScope'
		}
	],
	[
		'SOK207',
		{
			sku: ['SOK207'],
			category: 'magazine',
			type: 'print',
			name: 'Shadowland #7',
			releaseDate: ['1997'],
			description: 'The cover is not included in the page numbers.\nIndex:\nFront page (Mark Nelson)\n1 Index & Credits\n2 Download (Editorial - Chris Hussey)\n3 Expect the Unexpected (Fiction - Andrew Hamilton)\n6 Getting Physical (Physical Adept powers - Ken Sato)\n7 Friendship & Honor (Fiction - Steven Warnock)\n12 Gen Con Wrap-up\n13 Technobabel (Preview - Steven Kenson)\n15 Cyberpirates Preview\n17 The Knight Shift (Prime Runners - Unknown)\n28 The New Tools of Anti-Social Behavior (Firearms - Brian Downes)\n31 Gotcha! (Hit locations - Ben Zitterkoph, Jason Shockley)\n33 Nature\'s Shadows (Plant Totems - Anonymous)\n37 Nothing Personal - Just Business (Fiction - Jon Szeto)\n46 Shadowrun CCG List (Mike Mulvihill)\n49 High Noon (Fiction - Jay Fugiel)\n50 Way of the hunter (Physical Adept path, skills & powers - Jonathan Szeto)\n52 Hermetic Lodge (Spells - Chris Hussey)\n54 Newsline (News from the Shadowrun universe)\n55 Writer\'s Guidelines\n56 Shadowland Disclosure Form',
			gameDate: '2054',
			edition: 2,
			publisher: ['unofficial'],
			missing: 'outOfScope'
		}
	],
	[
		'KAGE-09',
		{
			sku: ['KAGE-09'],
			category: 'magazine',
			type: 'print',
			name: 'KAâ¢GE: Issue 9',
			releaseDate: ['1993'],
			description: 'Index:\n1 Front page (Sean Parrack)\n2 Notes from the Net (Index, Editorial - Jim Long)\n3 Notes from the Net (Letters)\n4 Paterson\'s Guide to Paranormal Animals (Alicanto, Calchuna, Onaqui - Stephen Kenson)\n10 KA*GE Fiction (Wonderland - Chad Olson)\n17 Shadows (Troll Ranger archetype - Bryan Walker)\n18 Turing\'s Guide to Organizations (Armour International, part 1 - Chad Olson)\n23 KA*GE Fiction (Business Unusual - Vicki Kirchhoff)\n28 Off the shelf (16 new pieces of gear - Stephen Kenson)\n38 FASA Product list\n39 AWOL Product list\n40 AWOL order form\n41 Paydata (Upcoming from FASA and Ral Partha)\n42 Paydata (Reviews: Corporate Shadowfiles, A Killing Glare, Tir Tairngire)\n44 Calendar of Events\n45 Shadowrun Network membership form\n46 Network Member Graffiti\n47 Writing on the Wall (News from the Shadowrun Universe)\n48 Rear Page',
			gameDate: '2054',
			edition: 2,
			publisher: ['unofficial'],
			missing: 'outOfScope'
		}
	],
	[
		'KAGE-00',
		{
			sku: ['KAGE-00'],
			category: 'magazine',
			type: 'print',
			name: 'KAâ¢GE: Issue 0',
			releaseDate: ['1991'],
			description: 'Index:\n0 Front page\n1 Introduction\n2 Sysop\'s Notes (Editorial)\n3 KA*GE Fiction (Squasher and Squeeker - George Pace)\n8 Contacts: Fetish Monger & Limo Driver\n9 Location Archetype: High Security Warehouse\n11 KA*GE scenario: Go Fish!\n13 Profile: DantÃ©: Inside the Black Box\n16 Archetype: Investigative Reporter (Free-lance Reporter)\n17 Q & A\n18 Vehicle Stats: Grumman Cargomaster Van\n19 Off the shelf: New gear\n22 On the Street: Rumors from the sprawl (Writing on the Wall: News from the Shadowrun Universe)\n23 Rear page',
			gameDate: '2054',
			edition: 2,
			publisher: ['unofficial'],
			missing: 'outOfScope'
		}
	],
	[
		'KAGE-01',
		{
			sku: ['KAGE-01'],
			category: 'magazine',
			type: 'print',
			name: 'KAâ¢GE: Issue 1',
			releaseDate: ['1991'],
			description: 'Index:\n0 Front page\n1 Net Notes: Welcome To The Shadows (Editorial - Jim Long)\n2 KA*GE Fiction (Lucy - James D. Long)\n11 KA*GE Credits\n12 KA*GE Author and Artist Guidelines\n14 CYCO Circuits (corporation description)\n15 Scenario: No Free Parking (adventure)\n17 CYCO Circuits (continued)\n19 Archetype: Former Company Decker\n20 Contacts: Hairstylist & E-Wizzard\n21 CYCO Circuits: Matrix Map\n23 Off The Shelf: Cyberdeck Utilities, Cyberdeck Gear & CYCO Cyberdecks\n26 Q&A: FASA explains it all to you\n27 Up and comming from FASA\n28 Reviews: London Sourcebook, Native American Nations: Volume One & Virtual Realities \n31 Rear page',
			gameDate: '2054',
			edition: 2,
			publisher: ['unofficial'],
			missing: 'outOfScope'
		}
	],
	[
		'KAGE-03',
		{
			sku: ['KAGE-03'],
			category: 'magazine',
			type: 'print',
			name: 'KAâ¢GE: Issue 3',
			releaseDate: ['1992'],
			description: 'Articles & Authors (where known):\n* Net Notes (editorial & letters, James D. Long),\n* Ragfeather (short story, GB Pace),\n* Privat Investigator (archetype),\n* Contacts\n* The Dwarven Technical Guild (corporation description),\n* A Short In The Dark (adventure),\n* Stranges In The Night (scenario ideas),\n* The Torque Wrench (location description),\n* Off The Shelf (equipment),\n* Sprawl Survival (tips for characters),\n* Paydata (reviews),\n* Writing On The Wall (world background)',
			gameDate: '2054',
			edition: 2,
			publisher: ['unofficial'],
			missing: 'outOfScope'
		}
	],
	[
		'KAGE-04',
		{
			sku: ['KAGE-04'],
			category: 'magazine',
			type: 'print',
			name: 'KAâ¢GE: Issue 4',
			releaseDate: ['1992'],
			description: 'Articles & Authors (where known):\n* Notes From The Net (editorial & letters, James D. Long),\n* Paterson\'s Guide To Paranormal Animals (critters),\n* Lone Star File (gang description),\n* Shadows (archetype & contacts),\n* The Awakened Citizen (2050s legal hassle),\n* The Retching Rat (adventure),\n* Off The Shelf (equipment),\n* Neo-Anarchists Guide (Boston city description, Stephen Kenson),\n* AWOL Release Form (1992 legal hassle),\n* Paydata (reviews, James D. Long),\n* Graffiti (classifieds),\n* Writing on the Wall (world background)',
			gameDate: '2054',
			edition: 2,
			publisher: ['unofficial'],
			missing: 'outOfScope'
		}
	],
	[
		'KAGE-05',
		{
			sku: ['KAGE-05'],
			category: 'magazine',
			type: 'print',
			name: 'KAâ¢GE: Issue 5',
			releaseDate: ['1992'],
			description: 'Index:\n1 Front page (Sean Parrack)\n2 Notes from the Net (Editorial, Letters, Index, Credits - Jim Long)\n4 Paterson\'s Guide to Paranormal Animals (Sewer Gator)\n6 KA*GE Fiction (Vengeance - Brantley Bryant)\n10 Lone Star File\n11 Scenario Ideas (Night Encounters)\n13 Shadows (NPC: Niedertracht)\n14 Shadows (Paranaturalist Archetype, Medical Examiner Contact, Hospital Orderly Contact)\n16 The Awakened Citizen (Legal systems of 2053 - Terry Reinsch)\n18 The Awakened Citizen (Lawyer contacts: Judge, Bail Bondsman - Terry Reinsch)\n19 Turring\'s Guide to Organizations (Major corporations of Minneapolis-St. Paul, Timeline of MSP - Michael W. Harris)\n25 Neo-Anarchist Guide (Minneapolis-St. Paul metroplex - Michael W. Harris)\n31 FASA Product list\n32 AWOL Product list\n33 AWOL Order Form\n34 Off the Shelf (Gear - James Buchanan)\n40 Paydata (Reviews: Shadowland, 10-860 Corporat Dragon, 20-507 Go-Gangers, 20-516 Mercs and Bouncers, 20-517\nShapeshifters, 20-518 Shadowbeat, 20-519 Tribals)\n43 Combat Laws (Myrphy\'s Laws of Combat)\n44 Upcoming from Ral Parthe, Upcoming from FASA\n45 Shadowrun Network membership form\n46 Network Member Grafitti\n47 Writing on the Wall (News from the Shadwrun Universe)\n48 Rear Page',
			gameDate: '2054',
			edition: 2,
			publisher: ['unofficial'],
			missing: 'outOfScope'
		}
	],
	[
		'KAGE-06',
		{
			sku: ['KAGE-06'],
			category: 'magazine',
			type: 'print',
			name: 'KAâ¢GE: Issue 6',
			releaseDate: ['1992'],
			description: 'Index:\n1 Front Page (Sean Parrack)\n2 Notes from the Net (Editorial, Index, Credits - Jim Long)\n3 Notes from the Net (Letters)\n4 Paterson\'s Guide to Paranormal Animals (Carrion Crow, Cooper\'s Fox, Fenris Wolf - Michael W. Harris)\n10 KA*GE Fiction (The Night\'s Change of Plans - Chad Olson)\n16 Shadows (Archetypes: Former Electronic Warfare Specialist, Former Combat Engineer - James Buchanan)\n18 Shadows (Contacts: Sporting Goods Salesman, Arcade Owner)\n19 Neo-Anarchists Guide (Minneapolis-St. Paul metroplex - Michael W. Harris)\n23 Turring\'s Guide to Organizations (MSP Corporations - Michael W. Harris)\n27 KA*GE Fiction (Jolly Ol\' Elf - Victoria Kirchoff & Curtis Martin)\n32 Off the Shelf (Spells and Plasma Shock Weapons - Michael W. Harris, Dentalware - James Rommell, Bomb Sniffer - Jeff Hosty)\n37 AWOL Product List\n38 AWOL Order Form\n39 Paydata (Questions and Answers)\n41 Paydata (Upcoming from FASA, Upcoming from Ral Partha)\n42 Paydata (Reviews: The Grimoire II, Paranormal Animals of Europe, Tir Tairngire, Total Eclipse, One Stage Before)\n45 Shadowrun Network Membership Form\n46 Network Member Grafitti\n47 Writing on the Wall (News from the Shadowrun Universe)\n48 Rear Page',
			gameDate: '2054',
			edition: 2,
			publisher: ['unofficial'],
			missing: 'outOfScope'
		}
	],
	[
		'KAGE-07',
		{
			sku: ['KAGE-07'],
			category: 'magazine',
			type: 'print',
			name: 'KAâ¢GE: Issue 7',
			releaseDate: ['1993'],
			description: 'Index:\n1 Front page (Sean Parrack)\n2 Notes from the Net (Editorial, Credits and Index - Jim Long)\n3 Notes from the Net (Letters - Steve Scott)\n4 Paterson\'s Guide to Paranormal Animals (Gaki, Goblin Spider, Greater Carp - Stephen Kenson)\n10 KA*GE Fiction (A Closer Look - Chad Olson)\n16 Shadows (Former KE Guard, Former KE Decker, Former KE Security Mage archetypes - Brian Walker)\n19 Neo-Anarchist Guide (Australiasia History, Brisbane Sprawl - Craig Gaffney)\n25 Turring\'s Guide to Organizations (ANZAC - Craig Gaffney)\n27 The Awakened Citizen (Life in Australiasia - Craig Gaffney)\n30 KA*GE Fiction (An Ounce of Prevention - Robert Frager)\n36 Questions and Answers\n40 Paydata\n46 Network Member Graffiti\n47 Writing on the Wall (News from the Shadowrun Universe)\n48 Rear Page',
			gameDate: '2054',
			edition: 2,
			publisher: ['unofficial'],
			missing: 'outOfScope'
		}
	],
	[
		'KAGE-08',
		{
			sku: ['KAGE-08'],
			category: 'magazine',
			type: 'print',
			name: 'KAâ¢GE: Issue 8',
			releaseDate: ['1993'],
			description: 'Index:\n1 Front page (Corey Gulley)\n2 Notes from the Net (Editorial, Credits and Index - Jim Long)\n3 Notes from the Net (Letters)\n4 Paterson\'s Guide to Paranormal Animals (The Greater Toad, Hengeyokai, Hsing-sing - Stephen Kenson)\n10 KA*GE Fiction (First Contact - Chad Olson)\n16 Shadows (Dwarven Stoic Physical Adept archetype - Brian Walker)\n17 Neo-Anarchist Guide (Boston Sprawl - Stephen Kenson)\n24 Turring\'s Guide to Organizations (The Black Lotus - Stephen Kenson)\n30 KA*GE Fiction (Instructions Takes A Turn - Simon Foster)\n34 FASA Product list\n35 AWOL Product list\n36 AWOL Order Form\n37 Paydata (Upcoming from FASA and Ral Partha)\n38 Paydata (Official errata for Shadowrun II)\n40 Paydata (Official errata for Grimoire II)\n41 Paydata (Reviews: 20-508 Riggers and Rockers, 20-520 Yakuza, 20-521 Ork Biker, 20-522 Meta-Human Tribal, 20-528 Black ICE Icons, 20-529 Wasp Male Spirits, 20-530 Wasp Queen Human Host, 20-531 Combat Mages)\n44 Calendar of Events\n45 Shadowrun Network membership form\n46 Network Member Graffiti\n47 Writing on the Wall (News from the Shadowrun Universe)\n48 Rear page',
			gameDate: '2052',
			edition: 2,
			publisher: ['unofficial'],
			missing: 'outOfScope'
		}
	],
	[
		'KAGE-02',
		{
			sku: ['KAGE-02'],
			category: 'magazine',
			type: 'print',
			name: 'KAâ¢GE: Issue 2',
			releaseDate: ['1991'],
			description: 'Index:\n0 Front page (Sean Parrack)\n1 Net notes (Editorial - Jim Long)\n2 KA*GE Fiction (Just Another Night... - George Pace)\n9 Corporate profile (Turring\'s Annoted Guide to Modern Organizations: Advanced Weapons and Systems, Incorporated - AWS Inc.)\n12 Contacts (Body Shop Tech, Independent Hauler)\n14 Archetype (Former DocWagon TM Paramedic)\n15 Scenario (A Night in the Sound)\n17 Personalities (AWS NPC\'s)\n18 Upcoming from FASA\n19 Run for it (Scenario Ideas)\n23 Q&A (FASA explains it all to you)\n24 Off the Shelf (New gear)\n27 Reviews (Total Eclipse, Native American Nations Volume 2, 20-500 Shadowrunners, 20-501 Deckers, 20-502 Human Street Samurai, 20-503 Mages, 20-504 Meta-Human Street Samurai, 20-505 Elves)\n30 Writing on the Wall (News from the Shadowrun Universe)\n31 Rear page',
			gameDate: '2052',
			edition: 2,
			publisher: ['unofficial'],
			missing: 'outOfScope'
		}
	],
	[
		'KAGE-10',
		{
			sku: ['KAGE-10'],
			category: 'magazine',
			type: 'print',
			name: 'KAâ¢GE: Issue 10',
			releaseDate: ['1993'],
			description: 'Index:\n1 Frontpage (Sean Parrack)\n2 Notes from the Net (Index, Editorial - Jim Long)\n3 Statmet of Ownership (James D. Long)\n4 Patterson\'s Guide to Paranormal Animals (Hide, Tzitsimne)\n8 KA*GE Fiction (Chasing Ghosts, part 2 - Chad Olson)\n15 Shadows (Contacts: Model, Hustler, Stock Analyst, Stock Broker, Archetype: Hermetic Hitman - Sean Parrack)\n18 Turring\'s Guide to Organizations (Armor International, part 2 - Chad Olson)\n31 KA*GE Fiction (Who Your Friends Are - Vicki Kirchhoff)\n37 FASA Product list\n38 AWOL Product list\n39 AWOL Order Form\n40 Paydata (Upcoming from FASA & Ral Partha)\n41 Paydata (Reviews: Tir na nOg Sourcebook, Celtic Double Cross, 20-534 Spirit of Man, 20-535 Spirit of Water, 20-532 Piasma, 20-533 Dzoo-Noo-Qua, 10-861 Feathered Serpent)\n44 Calendar of Events\n45 Shadowrun Network membership form\n46 Network Member Grafitti\n47 Writing on the Wall (News from the Shadowrun Universe)\n48 Rear page',
			gameDate: '2052',
			edition: 2,
			publisher: ['unofficial'],
			missing: 'outOfScope'
		}
	],
	[
		'KAGE-11',
		{
			sku: ['KAGE-11'],
			category: 'magazine',
			type: 'print',
			name: 'KAâ¢GE: Issue 11',
			releaseDate: ['1994'],
			description: 'Index:\n1 Front page (Eric von Haas)\n2 Notes from the net (Editorial, Staff and Index)\n3 Notes from the net (Letters)\n4 Patterson\'s Guide to Paranormal Animals (Mist Viper, Arachnis - Peter Williams, Sean Parrack & Corey Gulley)\n8 Ka*ge Fiction (If As Beast You Don\'t Succeed, Part One - Michael A. Stackpole)\n20 Shadows (Two Archetypes: Former Combat Medic, Ex-Brawler, Two Contacts: Foreign Dignitary, Social Worker - Sean Parrack, J.B. Buchanan)\n23 Corporate Shadow Files (European Business Machines and Magic - Stephen Kenson)\n27 Ka*ge Fiction (There Are Shadowruns, And Then There is... - Chris Hussey)\n33 Paydata (FASA Products, AWOL Products, Order Form, Upcoming from FASA, Reviews: Lone Wolf, The Germany Sourcebook, Eye Witness)\n39 Calendar of Events (Cons)\n40 Turring\'s Guide to Organizations (Coven of the Crimson Moon - Stephen Kenson)\n44 New Gear (8 new pieces of gear - Teras Cassidy & Michael Morris)\n48 Network Member Graffiti\n49 Writing on the Wall (News from the Shadowrun Universe)\n51 Shadowrun Network application form\n52 Rear page',
			gameDate: '2052',
			edition: 2,
			publisher: ['unofficial'],
			missing: 'outOfScope'
		}
	],
	[
		'KAGE-12',
		{
			sku: ['KAGE-12'],
			category: 'magazine',
			type: 'print',
			name: 'KAâ¢GE: Issue 12',
			releaseDate: ['1994'],
			description: 'This was the last issue of KA*GE before the publisher went AWOL. The issue was published late, and the was promises of further issues being on time.\nThe issue contains:\nLetters, errata, paranormal critter, fiction, archetypes, contacts, magic theory, new gear, new organizations, scenario ideas, new spells, merchandizing, slang, event calender and newsnet downloads. --user description',
			gameDate: '2052',
			edition: 2,
			publisher: ['unofficial'],
			missing: 'outOfScope'
		}
	],
	[
		'SRM07-05',
		{
			sku: ['SRM07-05'],
			category: 'mission',
			type: 'digital',
			name: 'A Little Wetwork',
			releaseDate: ['2017-05'],
			description: 'Work in Chicago long enough and you get used to a lot of weird things, so when one corp puts out the feelers for a team of runners to pull off a sabotage job on another, it seems refreshingly simple. Itâs a classic shadowrun set upâtwo corps beat up on each other for a little while, runners make themselves a few nuyen, and the world keeps moving around.\nBut itâs not that simple. Of course it isnât. If something of value is going through Chicagoâs Containment Zones, people are going to catch its scentâand when they do, theyâre going to want a piece of it. Runners are going to find themselves caught between multiple forces in the city, faced with the kind of choice that always seems extra difficult in the Sixth World: Figuring out whatâs the right thing to do?',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 7/SRM07-05 - A Little Wetwork.pdf',
					size: '2321899',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM07-06',
		{
			sku: ['SRM07-06'],
			category: 'mission',
			type: 'digital',
			name: 'Windy City Chaos',
			releaseDate: ['2017-09-11'],
			description: 'The Lost Colony\nMaybe you might misplace a commlink. Or lose a box holding a few stray bullets. But who loses an entire community? Well, itâs Chicagoâs Containment Zone, where a large group of people disappearing is not the strangest thing to happen this month. Or this week. Or today. But even if itâs not the strangest thing, itâs the one someone is willing to pay runners to investigate. So itâs important.\nThe thing is, a whole group of people doesnât just disappear easily. Or nicely. Some of the powers that like to stay hidden in the Containment Zone are going to make themselves visible, and shadowrunners need to survive their appearance. And see if they can save some lives while theyâre at it.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 7/SRM07-06 - Windy City Chaos.pdf',
					size: '1657300',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26S051',
		{
			sku: ['26S051'],
			category: 'mission',
			type: 'digital',
			name: 'Lethal Forces',
			releaseDate: ['2017-09-19'],
			description: 'The Price of Power\nValue is not a secret. When something is worth a lot of money, or conveys a lot of power, or both, people of the Sixth World know. They make it their business to know. That means that when youâre tracking down something with a lot of value, be cautious. You wonât be the only one after it.\nIn Lethal Forces, Mr. Johnson comes along spinning tales about secret research in a highly secure facility, which is definitely the sort of thing that has a lot of value. Mr. Johnson may not tell the runners who else might come calling, but what self-respecting team of runners relies on Mr. Johnson to give them the information they need? Theyâll have to stay alert, keep their wits about them, and be ready for any and all oppositionâincluding ones with scales.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/26S051 - Lethal Forces.pdf',
					size: '1127432',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27231',
		{
			sku: ['27231'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Dark Terrors',
			releaseDate: ['2017-11-26'],
			description: 'Piercing the Night\nYou heard the scream. Itâs important to remember that. Sometimes, when itâs late, and you hear something that sounds like a scream echoing through dark alleys, you try to convince yourself that it was something else. An animal. An illusion. Anything but what it sounded like.\nBut it was a scream. You heard it, and youâll hear it again, because in the Sixth World, the supply of terror is growing. Bug spirits work to devour corporations from within. Shedim claim dead bodies and mobilize to their own dark ends. And the hidden corners of the metaplanes and the Matrix contain creatures that are best not imagined, because to imagine them is to sever ties with reason.\nDark Terrors is a catalog of the horrors lurking under the surface of the Sixth World. With plot updates and hooks, critter stats, and campaign information presented in an immersive style, itâs an invaluable resource for players ready to stay on the edge of their seats. It is for use with Shadowrun, Fifth Edition and Shadowrun: Anarchy.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			missing: true
		}
	],
	[
		'SRM07-02',
		{
			sku: ['SRM07-02'],
			category: 'mission',
			type: 'digital',
			name: 'Collective Action',
			releaseDate: ['2016-12'],
			description: 'The quintessential Chicago shadowrun is a full-to-bursting package with a variety of ingredients and flavors. And it doesnât even need to include bug spirits. If you want the true Chicago experience, itâs here waiting for you. What ingredients does it contain? How about a rush job on a tight deadline, occasionally hostile crowds of locals, panicky security, explosions, stealth, open firefights in the streets, vicious traps, burning buildings, a crazed hermit, and a pack of drug-addicted dogs.\nThose are all ingredients in the stew that is this run, and Mr. Johnson is paying good money for you to wolf it down as fast as you can. Get moving!',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 7/SRM07-02 - Collective Action.pdf',
					size: '2542333',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM07-01',
		{
			sku: ['SRM07-01'],
			category: 'mission',
			type: 'digital',
			name: 'The Deck Job',
			releaseDate: ['2016-11'],
			description: 'The only shadowrunners who donât ask the above question are ones who have been dead so long that no one remembers their name. Which, for most runners, means two months. The point being, any runner knows that a job that can be described in a simple, straightforward sentence at the beginning of the day is going to become a tumbled, tangled mess by the end of the day, the simple sentence exploding into a story that youâll tell over a few drinks some nightâunless the story got messy enough that you joined those forgotten shadowrunners in some shallow grave.\nThe simple sentence at the beginning of this job is this: âRetrieve a stolen cyberdeck prototype.â Sounds easy enough, but add âin Chicagoâs Containment Zoneâ to the end of the sentence, and already the complications have begun to mount. And theyâll continueâby the time the runners are done, theyâll see double-crosses, deceits, lies, and betrayals speeding past them, and theyâll have to do their best to figure out whatâs really going on before they get overwhelmed and overran.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 7/SRM07-01 - The Deck Job.pdf',
					size: '1128452',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM07-04',
		{
			sku: ['SRM07-04'],
			category: 'mission',
			type: 'digital',
			name: 'Do No Harm',
			releaseDate: ['2017-02'],
			description: 'Every runner knows there are times when you need to throw grenades at gasoline trucks, and other times when more discretion and subtlety is called for. True pros distinguish themselves with precise operations that are noticed by no one besides their targetâbut those targets see enough to push them over the edge of sanity.\nIn this Mission, runners get an assignment that is easy to describe but difficult to execute. The job? Ruin a life. The method? Thatâs where the runners come in. Theyâll have to exercise all their creativity and sneakiness to plan and pull off this jobâunless they want the police and some nasty corporate security putting their work to an early end. Do runners have the smarts, stealth, and deviousness to pull this off? As always, the answer is another question: How badly do they want to get paid?',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 7/SRM07-04 - Do No Harm.pdf',
					size: '1380724',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRM07-03',
		{
			sku: ['SRM07-03'],
			category: 'mission',
			type: 'digital',
			name: 'Special Investigation Unit',
			releaseDate: ['2017-01'],
			description: 'Collecting evidence. Visiting medical examiners. Questioning suspects. The cops may be a pain in shadowrunnersâ hoops, but what kid didnât play cops and robbers when they were growing up? Sometimes playing on the cops side, even? Now they have a chance to play for real. Thereâs been a death in the Chicago/Milwaukee sprawlâwell, several, but one that got the attention of Detective Nick Ryder. Itâs the sort of case heâd have trouble looking into alone, so heâs turned to the shadows. Runners will have the chance to crack the caseâright down to the difficult work of bringing the perp to justice.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Adventures and Campaigns/Shadowrun Missions/Season 7/SRM07-03 - Special Investigation Unit.pdf',
					size: '1911584',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27506',
		{
			sku: ['27506'],
			category: 'sourcebook',
			type: 'digital',
			name: 'The Complete Trog',
			releaseDate: ['2017-07'],
			description: 'They can call you a trog. Sure they can. Let âem think itâs smear. Let them show you what they donât know. Let them ignore history, the great accomplishments orks and trolls have made in every field in the Sixth World, the homes and enclaves theyâve built out of nothing. Thereâs enough talent in the trog population to punch, hack, rig, charm, or enchant that smug smile right off their face. You know what you are. Theyâll learnâfast, if they know whatâs good for them.\nThe Complete Trog is the definitive guide for ork and troll characters in Shadowrun. With information on what itâs like to be an ork or troll in dozens of spots across the globe, details on working in corps as a trog (including in ork- and troll-dominated corps) and the heroes and enemies of trog culture, the book helps players add flavor and depth to their characters and the world around them. On top of that, it has gear, qualities, and life modules compatible with both Shadowrun, Fifth Edition and Shadowrun: Anarchy. Plunge into the rich culture of trogs and watch them turn that slur on its head.',
			gameDate: '2079-08',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Sourcebooks/27506 - The Complete Trog.pdf',
					size: '6580072',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26NV003',
		{
			sku: ['26NV003'],
			category: 'novel',
			type: 'digital',
			name: 'Blind Magic',
			releaseDate: ['2017-03-17'],
			description: 'Lucas, a gifted shaman and member of the Salish-Shidhe Council, is respected for his arcane talents among his tribe. When heâs blinded during a shadowrun on an Evo Corporation outpost, heâs fitted with a set of cybereyes during his recovery. But upon his return to the Council, the tribe banishes him, saying the cyberware heâs accepted makes him unfit to be a shaman. Distraught, Lucas heads to Seattle and spends time in the Barrens attempting to scrape by.\nWanting revenge against Evo, he teams up with a group of shadowrunners, influencing them to take runs against the megacorporation. During one such run, they determine that Evo is retrieving an arcane artifact from a dig site located in Salish-Shidhe territory. Lucas convinces his team to take the initiative and either stop the dig or steal the artifact. But when a team member double-crosses Lucas and the others, he must race against time to discover the true masterminds behind this shadowrunâ¦and stop the thief before they escape with both the artifact and Lucasâs last chance for redemptionâ¦',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			files: [
				{
					path: './Novels/26NV003 - Blind Magic.epub',
					size: '918901',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'27511',
		{
			sku: ['27511', '45049G'],
			category: 'misc',
			type: 'print',
			name: 'Sixth World Tarot',
			releaseDate: ['2016'],
			description: 'The Sixth World Tarot Deck for Shadowrun is much more than just a tarot deck. Created by Echo and Lazarus Chernik for Catalyst Game Labs, the deck is a multi-tiered, masterfully illustrated game accessory for Shadowrun, Fifth Edition, and includes hundreds of puzzles, plots, and enigmas that can be at the heart of compelling campaigns. The Sixth World Tarot comes complete with 78 full-color tarot cards and a guidebook. The cards are 2.5\' x 5\' tall, with gilded edges.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst', 'pegasus'],
			missing: 'outOfScope',
			notes: 'Available first only at Gen Con 2016. Now on the creator\'s site. Print only.'
		}
	],
	[
		'26860',
		{
			sku: ['26860'],
			category: 'novel',
			type: 'print',
			name: 'Shadows Down Under',
			releaseDate: ['2016-07-22'],
			description: 'Someone - or something - is killing nightclub entertainers in Kings Cross, Australia. Striking from the shadows, methodical and heinous, the murderer has wrapped the bawdy, colorful neighborhood in a suffocating blanket of terror.\nNinniniru "Ninn" Tossinn, a troubled private investigator on the run from her past, joins forces with Barega, an elderly Aborigine shaman, to uncover the truth behind the malevolent force - and put themselves on the Cross Slayer\'s list. But can they defeat the darkness, survive Sydney\'s powerful mana storm, and reach the true heart of the evil threatening the city? Their search takes them from gritty alleys filled with gang symbols and worse to beneath the squatter-filled harbor bridge over shark-infested waters.\nAs their investigation deepens, soon the Cross Slayer isn\'t the only foe stalking them. Ninn and Barega have to put all their trust in each other if they\'re going to bring the slayer to justice, uncover the conspiracy behind the murders, and stay alive long enough to do both.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			missing: true,
			notes: 'Print only. No scans found.'
		}
	],
	[
		'26857',
		{
			sku: ['26857'],
			category: 'novel',
			type: 'print',
			name: 'Undershadows',
			releaseDate: ['2016-06-11'],
			description: 'Vaquita has had a rough go of it lately. She was doing all right, building a career as a London-based rigger, when something went wrong inside her head. Suddenly the mental space that used to be hers alone was shared as a foreign personality carved out a section of brain for itself. It wasnât exactly madness, but it sure felt like it.\nIt also made for some tough going for a time, and several lost jobs, but lately Vaquitaâs gotten her swagger back. Her life may be a little trickier than the average runnerâs, but sheâs also got some skills she didnât have before, not to mention new ways of bringing in the danger. And she has the perfect testing ground for her new abilitiesâthe hulking, abandoned Angel Towers Arcology. Filled with squatters, gangs, vicious critters, and certain areas people only talk about in whispers, Angel Towers has enough danger and hidden caches of tech to keep a dozen teams of shadowrunners busy. And with her small, new team, Vaquitaâs going to use it to not only rebuild her rep, but take it to the next level.\nBut the arcologyâs secrets and dangers go far deeper than Vaquita realizes, and sheâll have to deal with the perils at every turnâas well as the people who put them there.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			missing: true,
			notes: 'Print only. No scans found.'
		}
	],
	[
		'TCG01',
		{
			sku: ['TCG01'],
			category: 'tcg',
			type: 'physical',
			name: 'Shadowrun: Trading Card Game',
			releaseDate: ['1997'],
			description: 'This game takes fantasy with magic, elves, dwarves, orcs, trolls etc., and puts them in a cyberpunk world 60 years in the future.\nThere are 7 types of cards...\n	- Runners - You collect groups of these characters and use them to make runs on objectives. Some of these can support the group through computers while staying safe at home. These cards have symbols on them that represent their abilities and these are use to bypass threats without actually having to face them.\n	- Objectives - These are what you are making runs on. They are worth reputation points and usually have a task that you must best or a number of symbols that you have to match with the symbols on your runners.\n	- Challenge - You assign these to the objectives as additional hurdles that you have to get by before you can tackle the objective. Usually you can bypass them with the right symbols but if not they can represent nasty things you will have to fight or things that will just hurt you.\n	- Gear - This is stuff that you assign to runners to help them make runs. Some gear requires you to have a runner with a matching symbol.\n	- Locations - These represent places that you control and can help you in various ways.\n	- Contacts - These represent people that will help you.\n	- Specials - These are instants that you play to affect the current situation.\n	- Everything is driven by money which is hard to come by. It costs money to acquire almost every card and a lot of cards require money spent just to keep them in play or every time you use them.',
			gameDate: '2050',
			edition: 2,
			publisher: ['fasa'],
			missing: 'outOfScope'
		}
	],
	[
		'TCG02',
		{
			sku: ['TCG02'],
			category: 'tcg',
			type: 'physical',
			name: 'Shadowrun: Trading Card Game - Underworld',
			releaseDate: ['1997'],
			description: 'This game takes fantasy with magic, elves, dwarves, orcs, trolls etc., and puts them in a cyberpunk world 60 years in the future.\nThere are 7 types of cards...\n	- Runners - You collect groups of these characters and use them to make runs on objectives. Some of these can support the group through computers while staying safe at home. These cards have symbols on them that represent their abilities and these are use to bypass threats without actually having to face them.\n	- Objectives - These are what you are making runs on. They are worth reputation points and usually have a task that you must best or a number of symbols that you have to match with the symbols on your runners.\n	- Challenge - You assign these to the objectives as additional hurdles that you have to get by before you can tackle the objective. Usually you can bypass them with the right symbols but if not they can represent nasty things you will have to fight or things that will just hurt you.\n	- Gear - This is stuff that you assign to runners to help them make runs. Some gear requires you to have a runner with a matching symbol.\n	- Locations - These represent places that you control and can help you in various ways.\n	- Contacts - These represent people that will help you.\n	- Specials - These are instants that you play to affect the current situation.\n	- Everything is driven by money which is hard to come by. It costs money to acquire almost every card and a lot of cards require money spent just to keep them in play or every time you use them.',
			gameDate: '2050',
			edition: 2,
			publisher: ['fasa'],
			missing: 'outOfScope'
		}
	],
	[
		'WZK6400',
		{
			sku: ['WZK6400'],
			category: 'boardgame',
			type: 'physical',
			name: 'Shadowrun: Duels - The Street Deacon',
			releaseDate: ['2003-06'],
			description: 'Male human vigilante',
			gameDate: '2060',
			edition: 3,
			publisher: ['wizkids'],
			missing: 'outOfScope'
		}
	],
	[
		'WZK6401',
		{
			sku: ['WZK6401'],
			category: 'boardgame',
			type: 'physical',
			name: 'Shadowrun: Duels - Kyushi',
			releaseDate: ['2003-06'],
			description: 'Female Yakuza assassin',
			gameDate: '2060',
			edition: 3,
			publisher: ['wizkids'],
			missing: 'outOfScope'
		}
	],
	[
		'WZK6402',
		{
			sku: ['WZK6402'],
			category: 'boardgame',
			type: 'physical',
			name: 'Shadowrun: Duels - Liada',
			releaseDate: ['2003-06'],
			description: 'Female elf mage',
			gameDate: '2060',
			edition: 3,
			publisher: ['wizkids'],
			missing: 'outOfScope'
		}
	],
	[
		'WZK6403',
		{
			sku: ['WZK6403'],
			category: 'boardgame',
			type: 'physical',
			name: 'Shadowrun: Duels - G-Dogg',
			releaseDate: ['2003-06'],
			description: 'Male ork bouncer',
			gameDate: '2060',
			edition: 3,
			publisher: ['wizkids'],
			missing: 'outOfScope'
		}
	],
	[
		'WZK6404',
		{
			sku: ['WZK6404'],
			category: 'boardgame',
			type: 'physical',
			name: 'Shadowrun: Duels - Lothan the Wise',
			releaseDate: ['2003-06'],
			description: 'Male troll mage',
			gameDate: '2060',
			edition: 3,
			publisher: ['wizkids'],
			missing: 'outOfScope'
		}
	],
	[
		'WZK6405',
		{
			sku: ['WZK6405'],
			category: 'boardgame',
			type: 'physical',
			name: 'Shadowrun: Duels - Silver Max',
			releaseDate: ['2003-06'],
			description: 'Male dwarf rigger',
			gameDate: '2060',
			edition: 3,
			publisher: ['wizkids'],
			missing: 'outOfScope'
		}
	],
	[
		'WZK6406',
		{
			sku: ['WZK6406'],
			category: 'boardgame',
			type: 'physical',
			name: 'Shadowrun: Duels - Kellan Colt',
			releaseDate: ['2003-10'],
			description: 'Female human mage',
			gameDate: '2060',
			edition: 3,
			publisher: ['wizkids'],
			missing: 'outOfScope'
		}
	],
	[
		'WZK6407',
		{
			sku: ['WZK6407'],
			category: 'boardgame',
			type: 'physical',
			name: 'Shadowrun: Duels - Karkhov',
			releaseDate: ['2003-12'],
			description: 'Male street samurai',
			gameDate: '2060',
			edition: 3,
			publisher: ['wizkids'],
			missing: 'outOfScope'
		}
	],
	[
		'WZK6408',
		{
			sku: ['WZK6408'],
			category: 'boardgame',
			type: 'physical',
			name: 'Shadowrun: Duels - Midnight',
			releaseDate: ['2003-12'],
			description: 'Female elf cat-burglar',
			gameDate: '2060',
			edition: 3,
			publisher: ['wizkids'],
			missing: 'outOfScope'
		}
	],
	[
		'WZK6409',
		{
			sku: ['WZK6409'],
			category: 'boardgame',
			type: 'physical',
			name: 'Shadowrun: Duels - Natokah',
			releaseDate: ['2003-12'],
			description: 'Male human shaman',
			gameDate: '2060',
			edition: 3,
			publisher: ['wizkids'],
			missing: 'outOfScope'
		}
	],
	[
		'WZK6410',
		{
			sku: ['WZK6410'],
			category: 'boardgame',
			type: 'physical',
			name: 'Shadowrun: Duels - Kross',
			releaseDate: ['2003-12'],
			description: 'Male ork bodyguard',
			gameDate: '2060',
			edition: 3,
			publisher: ['wizkids'],
			missing: 'outOfScope'
		}
	],
	[
		'WZK6411',
		{
			sku: ['WZK6411'],
			category: 'boardgame',
			type: 'physical',
			name: 'Shadowrun: Duels - Wolf Nev',
			releaseDate: ['2003-12'],
			description: 'Male troll ganger',
			gameDate: '2060',
			edition: 3,
			publisher: ['wizkids'],
			missing: 'outOfScope'
		}
	],
	[
		'WZK6412',
		{
			sku: ['WZK6412'],
			category: 'boardgame',
			type: 'physical',
			name: 'Shadowrun: Duels - Draven von Drekill',
			releaseDate: ['2003-12'],
			description: 'Male dwarf',
			gameDate: '2060',
			edition: 3,
			publisher: ['wizkids'],
			missing: 'outOfScope'
		}
	],
	[
		'27700',
		{
			sku: ['27700'],
			category: 'boardgame',
			type: 'physical',
			name: 'Shadowrun Crossfire',
			releaseDate: ['2014'],
			description: 'The shadows of the Sixth World have every kind of danger you can imagine: ultra-violent gangers, flesh-eating ghouls, mages that summon spirits from toxic waste, backstabbing corporate raiders, hard-nosed police officers, and even dragons. You don\'t have much â mainly your guts, your wits, and your friends â but maybe that\'s enough. Between you and your teammates, you can sling spells, hack the Matrix, talk a tiger out of his stripes, and bring down a charging ork from a hundred yards away. Will that be enough to face down the worst the mean streets can throw at you? You\'re about to find out.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			missing: 'outOfScope'
		}
	],
	[
		'27704',
		{
			sku: ['27704'],
			category: 'boardgame',
			type: 'physical',
			name: 'Shadowrun Crossfire: Character Expansion Pack 2: Street Legends',
			releaseDate: ['2016'],
			description: 'Shadowrunners are nothing if not individuals and Character Expansion Pack 2 gives you plenty to use in your Shadowrun: Crossfire game. It includes a new set of upgrade stickers, adding options for making the exact character you envision, five street legend cards for players who want to leap into the shadows with a head start, and 20 standard character cards with new art for players designing runners from the ground up. You can hit the streets ready to take down any obstacles that dare rear their heads.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			missing: 'outOfScope'
		}
	],
	[
		'27703',
		{
			sku: ['27703'],
			category: 'boardgame',
			type: 'physical',
			name: 'Shadowrun Crossfire: High Caliber Ops',
			releaseDate: ['2015'],
			description: 'Youâre tougher. Meaner. Better equipped. Youâve taken on a drekload of challenges the Sixth World has thrown at you, and youâve survived. Barely, sometimes, but thatâs enough. Youâre walking with a certain confidence, maybe even a little strut. Youâre ready for the next thing the streets are going to throw at you.\nAt least, you think you are. Now youâre going to find out.\nHigh Caliber Ops is a massive expansion for the award-winning Shadowrun: Crossfire deck-building game. How massive? How does two new character roles, more than a dozen new Black Market cards, fifty new obstacles, and a large bundle of new Karma upgrades sound? On top of that, weâve got five brand-new missions, and a set of basic cards with new art. Taken together, you have the tools for high-powered, high-risk, high-reward shadowruns. Add High Caliber Ops to your Crossfire game to see just how much danger you can take on!',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			missing: 'outOfScope'
		}
	],
	[
		'27700-G16',
		{
			sku: ['27700-G16'],
			category: 'boardgame',
			type: 'physical',
			name: 'Shadowrun Crossfire: Las Vegas',
			releaseDate: ['2016'],
			description: 'Vegas: A Night on the Strip\nThis mini expansion was a GAMA Trade Show retailer exclusive. It comes with new missions and 2 copies each of 5 stickers that add an ability to a Runner card only during Vegas missions. It also adds 8 new cards to the game. Gambling and tourism are the major thematic elements of the game.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			missing: 'outOfScope'
		}
	],
	[
		'27701',
		{
			sku: ['27701'],
			category: 'boardgame',
			type: 'physical',
			name: 'Shadowrun Crossfire: Character Expansion Pack 1',
			releaseDate: ['2014'],
			description: 'The Character Expansion Pack 1 has character cards with new art, a starting deck for each character that includes one new piece of art per deck, and a full set of upgrade stickers. With this pack, players can branch out, creating whatever shadowrunner concept comes to mind, starting them on the path to being a legend. Or they can bring new players into the game, sending them on the path to designing their own character and discovering the story the mean streets are waiting to tell.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			missing: 'outOfScope'
		}
	],
	[
		'27700-G14',
		{
			sku: ['27700-G14'],
			category: 'boardgame',
			type: 'physical',
			name: 'Shadowrun Crossfire: Harlequin\'s Shadow Promo Card',
			releaseDate: ['2014'],
			description: 'Harlequin\'s Shadow is a promo Crossfire Deck card given out during GenCon 2014. It is used in Close The Portal scenario available for download from Catalyst Game Labs website.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			missing: 'outOfScope'
		}
	],
	[
		'27700A',
		{
			sku: ['27700A'],
			category: 'boardgame',
			type: 'physical',
			name: 'Shadowrun Crossfire: Oni Promo Card',
			releaseDate: ['2014'],
			description: 'An additional Shadowrun: Crossfire character card included with pre-ordered base sets. Oni is basically an ork character with Oni Evolution sticker and 5 Karma printed on the sheet. It also features a race-specific art and description.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			missing: 'outOfScope'
		}
	],
	[
		'27780',
		{
			sku: ['27780'],
			category: 'boardgame',
			type: 'physical',
			name: 'Shadowrun: Hostile Takeover',
			description: 'In Shadowrun: Hostile Takeover, players assume the role of megacorporations attempting to assert dominance over the city of Seattle.\nHostile Takeover is a game of intrigue, shifting alliances, and secretive schemes in the most famous futuristic megaplex of Shadowrunâs Sixth World. The most wealthy and influential megacorps of the city contend for dominance of Seattle, and they use shady dealings and deniable assets to wage a war in the shadows for supremacy.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			missing: 'outOfScope',
			notes: 'Announced fo the Year of Shadowrun but never released. Some "developer diary" posts are available on Shadowrun\'s blog.'
		}
	],
	[
		'27800',
		{
			sku: ['27800'],
			category: 'boardgame',
			type: 'physical',
			name: 'Shadowrun: Sprawl Gangers',
			description: 'Sprawl Gangers is a competitive, skirmish-level miniatures game for 2 players, with everything needed to game right in the box. Players will take on the task of building gangs (Ancients, Halloweeners, First Nation, and so on) following specific point values of a scenario, and modifying the various miniatures based upon what new resources (weapons/gear/magic/tech) a player gained through previous games. Gangs wonât simply fight for the sake of fighting, but will actively building their turfs and resources. Among other things, this will allow for the hiring of the exact right shadowrunner when they need that ace in the hole. All this adds up to the experience of watching your gang grow and expand through exciting play across a swath of games.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			missing: 'outOfScope',
			notes: 'Announced fo the Year of Shadowrun but never released. Some "developer diary" posts are available on Shadowrun\'s blog.'
		}
	],
	[
		'27750',
		{
			sku: ['27750'],
			category: 'boardgame',
			type: 'physical',
			name: 'Encounters: Shadowrun',
			releaseDate: ['2016'],
			description: 'The year is 2078. The worldsâ megacorporations straddle the sprawls of the Sixth World, goliaths that intimidate even nations as they suck in souls in their drive for the almighty nuyen. Between the cracks, shadowrunners carve out a living as deniable and disposable assets that megacorps fire at each other for datasteals, personnel extractions, or even wetwork. Whether casting manabolts of magic, riding the electrons of the Matrix with just the brain, or slinging good, old-fashioned flying lead while firing at speed enhanced by the latest in bio-engineering, runners live dangerously and hope their skills are good enough to let them survive another day.\nEncounters: Shadowrun is a 1-8 player fast-paced, pushed-your-luck dice and card game. Players take the role of Mr. Johnson, arranging the megacorpsâ dirty work and adding new shadowrunners to their already-assembled teams. They send their teams into the shadows of the mean sprawl streets of the Sixth World, collecting though paydata to beat down their rivals. Grab some dice, make a team, and show âem whoâs the boss.\nThe goal of the game is to be the first player to acquire Â¥30.\nEach player starts the game with (1) runner and 6 dice. At the start of your turn you flip over location card, that has effects aka breaks the rules, on every turn until a new environment card comes into play. You then flip over the top Event card form the deck and try and roll an exact match of the number on the card. If you succeed you place a die on the. You could stop then and receive Â¥1 or flip a card and continue to press your luck. If you fail the next player starts a new run with a chance to collect n the Â¥ you forfeited.\nÂ¥ are used as victory points as well as currency to buy additional runners.',
			gameDate: '2078',
			edition: 5,
			publisher: ['catalyst'],
			missing: 'outOfScope'
		}
	],
	[
		'SNES',
		{
			sku: ['SNES'],
			category: 'videogame',
			type: 'digital',
			name: 'Shadowrun',
			releaseDate: ['1993'],
			description: 'Shadowrun is an adaptation of the FASA tabletop role-playing game of the same name. The storyline of the video game is loosely based on the first Shadowrun novel, Never Deal with a Dragon, written by Robert N. Charrette.[4] The narrative opens in Seattle, Washington in the year 2050, where the protagonist Jake Armitage is shown being gunned down in the street. A shapeshifting vulpine figure rushes to his side and is seen casting a spell over Jake before leaving hastily as the medics arrive on the scene. Jake awakens in a morgue with a complete memory loss. Soon, he is approached by the "Dog", a shamanistic totem who gives him a warning before vanishing.\nThe rest of the story is spent investigating the events leading to Jake\'s shooting, learning the identity of the shapeshifter who saved him, as well the person who ordered his assassination, a mysterious crime lord named "Drake". Most of the information is found by piecing together snippets of data found by hacking various protected computer systems. Along the way, he has encounters with gangs, criminals, and magically awakened creatures while under constant threat of attack from contract killers. Jake also discovers and develops his own latent magical abilities. Apart from his totem spirit, his only allies are the hired services of shadowrunners. It is eventually revealed that Jake is a data courier who was carrying a program in a computer built inside his brain. The program was designed to destroy a malevolent artificial intelligence, which the Aneki Corporation is trying to protect. The company is being aided by Drake, who turns out to be a dragon and the mastermind behind the plot.',
			gameDate: '2053',
			edition: 2,
			publisher: ['fasa'],
			files: [
				{
					path: './Misc/Videogames/SNES - Shadowrun.smc',
					size: '1048576',
					mime: 'application/vnd.nintendo.snes.rom'
				}
			]
		}
	],
	[
		'GENESIS',
		{
			sku: ['GENESIS'],
			category: 'videogame',
			type: 'digital',
			name: 'Shadowrun',
			releaseDate: ['1994'],
			description: 'Shadowrun\'s story begins on January 31, 2058 in Seattle, United Canadian and American States. In the wilderness of the newly reclaimed Amerindian lands of the Salish-Shidhe, a small team of shadowrunners is brutally ambushed by unknown forces. The massacre is over quickly, but is captured in video by one of the slain member\'s cybereyes; the video is recovered and made national news. The last man to die in the video was a shadowrunner known as Michael, Joshua\'s brother.\nJoshua spends his last nuyen and flies to Seattle, vowing to avenge his brother\'s death. He arrives at Sea-Tac Airport and traces back Michael\'s last credstick transaction to "Stoker\'s Coffin Motel", in the Redmond Barrens. Joshua travels there to inquire about his brother, only to be told by the owner that Michael never paid his bill and in fact has some belongings being held. He strikes a deal with Joshua, and by beginning to do small shadowruns for a small-time Mr. Johnson, called Gunderson, he gains enough money to pay his brother\'s bills. In Michael\'s belongings, he finds three "holopix": one of a young woman, Tabatha Shale; of an Amerindian, David Owlfeather, and of Seattle General Hospital Dr. Heaversheen. There is also a low grade cyberdeck, along with a credstick containing 500 nuyen, which could have been used to pay off Michael\'s bill (the irony of this is one of the game\'s many humorous points).',
			gameDate: '2053',
			edition: 2,
			publisher: ['sega'],
			files: [
				{
					path: './Misc/Videogames/GENESIS - Shadowrun.bin',
					size: '2097152',
					mime: 'application/octet-stream'
				}
			]
		}
	],
	[
		'SEGA-CD',
		{
			sku: ['SEGA-CD'],
			category: 'videogame',
			type: 'digital',
			name: 'Shadowrun (ã·ã£ãã¦ã©ã³)',
			releaseDate: ['1996'],
			description: 'The game has a 1990s manga-based visual style loosely based on a contemporary Japanese manga series which was based on the Shadowrun franchise. Unlike the other Shadowrun video games which are set in Seattle and surrounding areas, this game is set entirely in Japan. In the fictional Shadowrun setting, Japan maintains a practice of exiling all orcs and trolls; thus there are no characters of those races in this game. The combat system is turn-based, and six-sided dice appear rolling on the screen determine the results of combatâthe conflict resolution system used in the Shadowrun table-top game.',
			gameDate: '2053',
			edition: 2,
			publisher: ['sega'],
			files: [
				{
					path: './Misc/Videogames/SEGA-CD - Shadowrun.iso',
					size: '190429184',
					mime: 'application/x-iso9660-image'
				}
			]
		}
	],
	[
		'XBOX',
		{
			sku: ['XBOX'],
			category: 'videogame',
			type: 'digital',
			name: 'Shadowrun',
			releaseDate: ['2007'],
			description: 'According to the ancient Mayan calendar, magic is cyclical, leaving the world and returning every 5000 years. Magic enters the world, grows, peaks, and eventually retreats. When magic was last at its peak, a powerful Ziggurat was constructed near what would be modern day Santos, Brazil. The purpose of this construct is shrouded in the mists of history. Even the Chancela family, who secretly maintained the ziggurat for thousands of years, did not know its purpose. Nor did they know the purpose of the strange artifact somehow connected to the ziggurat. In the millennia since its construction the ziggurat was eventually buried, hidden in the side of a mountain. Then, on December 24, 2012, magic began returning to the world, leaving change and confusion in its wake.\nThe years after magicâs return wrought change on a global scale. RNA Global, a powerful multinational corporation, sent a research team to Santos, Brazil. Their job was to explore and research the strange energies coming from a mountainside along one edge of Santos. Armed with an artifact from ancient times, the research team sought to channel and control the magical energies they were exploring. Instead they caused a magical accident that destroyed half the city and brought down the mountainside, revealing the ziggurat to all. Deflecting blame for the incident to an Ork paramilitary organization, RNA retreated from the city while rethinking its strategy.\nAfter a time, RNA Global returned to Santos, this time armed with a government contract that provided them control over the city. Vowing to keep the peace and clean up Santos, RNAâs first actions were to enact martial law and declare a curfew for all citizens. The locals, still upset over the initial accident and trying to rebuild on their own, began resisting RNAâs efforts. The resistance was helped greatly by the leadership of the Chancela family who were dedicated to defending the ziggurat and recovering the artifact. Resistance turned to conflict, conflict turned to skirmish and skirmish eventually plunged the city into all-out war. Eventually, forces began to organize themselves under the Chancela family, and became known as "The Lineage".\nThe battle between these two sides has grown to great proportions as of 2031, as the struggle for the artifact continues between RNA Global forces and The Lineage.',
			gameDate: '2070',
			edition: 4,
			publisher: ['fasa'],
			files: [
				{
					path: './Misc/Videogames/XBOX - Shadowrun.iso',
					size: '1458966528',
					mime: 'application/x-iso9660-image'
				}
			]
		}
	],
	[
		'RET-01',
		{
			sku: ['RET-01'],
			category: 'videogame',
			type: 'digital',
			name: 'Shadowrun Returns',
			releaseDate: ['2013-07-25'],
			description: 'MAN MEETS MAGIC & MACHINE. The year is 2054. Magic has returned to the world, awakening powerful creatures of myth and legend. Technology merges with flesh and consciousness. Elves, trolls, orks and dwarves walk among us, while ruthless corporations bleed the world dry. You are a shadowrunner - a mercenary living on the fringes of society, in the shadows of massive corporate arcologies, surviving day-by-day on skill and instinct alone. When the powerful or the desperate need a job done, you get it done... by any means necessary.\nIn the urban sprawl of the Seattle metroplex, the search for a mysterious killer sets you on a trail that leads from the darkest slums to the cityâs most powerful megacorps. You will need to tread carefully, enlist the aid of other runners, and master powerful forces of technology and magic in order to emerge from the shadows of Seattle unscathed.\nThe unique cyberpunk-meets-fantasy world of Shadowrun has gained a huge cult following since its creation nearly 25 years ago. Now, creator Jordan Weisman returns to the world of Shadowrun, modernizing this classic game setting as a single player, turn-based tactical RPG.',
			gameDate: '2054',
			edition: 5,
			publisher: ['harebrained'],
			missing: 'outOfScope',
			notes: 'Not present for beeing multiplatform and huge in size.'
		}
	],
	[
		'RET-02',
		{
			sku: ['RET-02'],
			category: 'videogame',
			type: 'digital',
			name: 'Shadowrun Returns: Dragonfall',
			releaseDate: ['2014-09-18'],
			description: 'Man Meets Magic & Machine\nIn 2012, magic returned to our world, awakening powerful creatures of myth and legend. Among them was the Great Dragon Feuerschwinge, who emerged without warning from the mountains of Germany, unleashing fire, death, and untold destruction across the countryside. It took German forces nearly four months to finally shoot her down - and when they did, their victory became known as The Dragonfall.\nItâs 42 years later - 2054 - and the world has changed. Unchecked advances in technology have blurred the line between man and machine. Elves and trolls walk among us, ruthless corporations bleed the world dry, and Feuerschwingeâs reign of terror is just a distant memory. Germany is splintered - a stable anarchy known as the âFlux Stateâ controls the city of Berlin. Itâs a place where power is ephemeral, almost anything goes, and the right connections can be the difference between success and starvation. For you and your team of battle-scarred shadowrunners, thereâs no better place to earn a quick payday.\nNow, a new threat is rising, one that could mean untold chaos and devastation. One that soon has you and your team caught on the wrong side of a deadly conspiracy. The only clue: whispers of the Dragonfall. Rumors that the Great Dragon Feuerschwinge may still be alive, waiting for the right moment to returnâ¦',
			gameDate: '2054',
			edition: 5,
			publisher: ['harebrained'],
			missing: 'outOfScope',
			notes: 'Not present for beeing multiplatform and huge in size.'
		}
	],
	[
		'RET-03',
		{
			sku: ['RET-03'],
			category: 'videogame',
			type: 'digital',
			name: 'Shadowrun Returns: Hong-Kong',
			releaseDate: ['2015-08-20'],
			description: 'Shadowrun: Hong Kong - Extended Edition is the definitive version of Shadowrun: Hong Kong, the third standalone game in Harebrained Schemesâ critically-acclaimed Shadowrun cRPG series. This Extended Edition adds the all-new, 6+ hr Shadows of Hong Kong Bonus Campaign to the game as a free upgrade - delivering on a funding goal achieved by fans in Harebrained Schemesâ wildly successful Shadowrun: Hong Kong Kickstarter. The Extended Edition also adds audio commentary to the game, and a long list of improvements since the gameâs initial launch - including new visual effects, updated dialogue, and new editor features (for User-Generated Content). Experience the most impressive Shadowrun RPG yet, hailed as one of the best RPGs and strategy games of 2015!\nHONG KONG. A stable and prosperous port of call in a sea of chaos, warfare, and political turmoil. The Hong Kong Free Enterprise Zone is a land of contradictions - it is one of the most successful centers of business in the Sixth World, and home to one of the worldâs most dangerous sprawl sites. A land of bright lights, gleaming towers, and restless spirits where life is cheap and everything is for sale.',
			gameDate: '2054',
			edition: 5,
			publisher: ['harebrained'],
			missing: 'outOfScope',
			notes: 'Not present for beeing multiplatform and huge in size.'
		}
	],
	[
		'ONLINE',
		{
			sku: ['ONLINE'],
			category: 'videogame',
			type: 'digital',
			name: 'Shadowrun Chronicles: Boston Lockdown',
			releaseDate: ['2015-04-28'],
			description: 'Lead your team of Runners to survive a corrupt megacorporationâs intrigue threatening thousands of lives in this new action-strategy game set in the most popular cyberpunk universe of all times â Shadowrun. Blending X-Com style gameplay with RPG elements in the unique Shadowrun setting and adding an extensive single- and co-op campaign, Shadowrun Chronicles offers the next generation of tactical turn based action games.\nEntrapped in a city plagued by a deadly virus, assaulted by the minions of a megacorporation, attacked by infected and with a dragon on a rampage through the city you have to unearth the secret conspiracy that connects it all.\nAs the leader of your team of Shadowrunners, you will have to use magic, technology and every weapon available to you, to save the lives of thousands in a city at the brink of extinction. Grow you character, plan your missions and control your team in combat or play live co-op with other players to overcome the challenges ahead of you. Meet your fellow runners in the Back Alley or hire henchmen to help you succeed.\nSet in the dystopian near future of our world, where magic has awakened and blends with technology, creatures of myth and legend have returned. Elves, Dwarves, Orks and Trolls walk among the neon-lit streets, while the matrix connects everyone and everything as the corporate towers cast their long shadows across the globe. You are a Shadowrunner - a secret operative on the edge of society, hired for the jobs no one wants to be connected with. A cyberpunk rebel surviving by skill and instinct in the shadows of the corporate towers!\n\nWelcome to the dark side of the future, chummer. Itâs going to be a hell of a ride.',
			gameDate: '2075',
			edition: 5,
			publisher: ['cliffhanger'],
			missing: 'outOfScope',
			notes: 'Not present for beeing multiplatform and huge in size.'
		}
	],
	[
		'26531',
		{
			sku: ['26531'],
			category: 'rulebook',
			type: 'print',
			name: 'Gear Cards [Drones & Vehicles, Volume 1]',
			releaseDate: ['2013-02'],
			description: 'Roll Out!\nShadowrunners do a lot of things, but one thing they don\'t do is sit still. There are places to go, people to shootâthey need the right vehicles to get them there and the right drones to take care of business when they arrive.\nThis deck has 54 drones and vehicle cards, with a full-color picture and complete stats, that make it easy to players and gamemasters to reference stats at the game table while illustrating what they\'re driving, piloting or riding. With selections from a range of Shadowrun, Twentieth Anniversary Edtion products, this deck will prepare you for some serious moving violations.',
			gameDate: '2075',
			edition: 4,
			publisher: ['catalyst'],
			missing: 'outOfScope',
			notes: 'Print only cards.'
		}
	],
	[
		'26530',
		{
			sku: ['26530'],
			category: 'rulebook',
			type: 'print',
			name: 'Weapon Cards [Guns, Volume 1]',
			releaseDate: ['2013-10'],
			description: 'Designed to make game play simpler, more colorful and more fun, Shadowrun Weapon Cards contain pictures and Shadowrun, Fourth Edition stats for a whole range of guns, making it easy for players and gamemasters to reference at the game table. These cards also bring the Sixth World to life through full-color art for each piece of gear. This deck contains 54 guns for use with Shadowrun, Fourth Edition, selected from a range of Shadowrun products.\nOnly sold at 2012 conventions.\nDeal them out and start shooting!',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			missing: 'outOfScope',
			notes: 'Print only cards.'
		}
	],
	[
		'26104',
		{
			sku: ['26104'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Runner\'s Black Book',
			releaseDate: ['2011-09'],
			description: 'Youâve got the talent. You hopefully have lived long enough to collect a decent amount of nuyen. So show it off! Get a better gun. A bigger boat. A zeppelin that can sneak you across borders where no one thinks to look. All these toys are here, and many, many more. Runnerâs Black Book is a shopping catalog for the ambitious and successful runnerâand itâs a guide to the weapons, drones, and vehicles that the various forces of the Sixth World may send against you as you sneak through the shadows.\nRunnerâs Black Book collects material from Shadowrunâs successful PDF line of products, compiling Deadly Waves, Gun Heaven, MilSpecTech, This Old Drone, and Unfriendly Skies in their entirety, along with updated art and information. On top of that, the book includes new pieces of gear developed specifically for this volume, including the punishing Kriss X Submachine Gun and small, smooth TPP light pistol. Each piece of gear is accompanied by a full color illustration providing a look at the itemâs complete details and features.',
			gameDate: '2072',
			edition: 4,
			publisher: ['catalyst'],
			missing: true,
			notes: 'Originally print only, this book is a compilation of other books with few added material.'
		}
	],
	[
		'26105',
		{
			sku: ['26105'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Runner\'s Black Book 2074',
			releaseDate: ['2016-01-12'],
			description: 'Asking a shadowrunner if they really need another gun is like asking someone if they need all that oxygen floating around them. Are you ever going to use all that air? Maybe not. But youâre sure as hell not going to be one of those suckers whoâs going to be caught short. RUNNERâS BLACK BOOK 2074 is about options, giving runners more choices of guns, weapons, vehicles, and other gear so that they can build a load out that suits them. Whether they want bleeding-edge gear built for those fighting the worldâs latest wars or classic vehicles that have stood the test of timeâor old crap they can get for cheapâRUNNERâS BLACK BOOK 2074 has what they need. Collecting gear from digital products Gun H(e)aven 2, Used Car Lot, MilSpec Tech 2, and Euro War Antiques along with exclusive material for this book, RUNNERâS BLACK BOOK 2074 contains full-color illustrations, detailed descriptions, and complete game statistics for each item. Itâs an essential resource for runners looking to do some shoppingâor to learn more about the guns that might be pointed at them in the near future.',
			gameDate: '2074',
			edition: 4,
			publisher: ['catalyst'],
			missing: true,
			notes: 'Originally print only, this book is a compilation of other books with few added material.'
		}
	],
	[
		'27050',
		{
			sku: ['27050'],
			category: 'rulebook',
			type: 'print',
			name: 'Fifth Edition Gamemaster Screen',
			releaseDate: ['2013-11'],
			description: 'Every shadowrunner knows the value of good information. The right fact, the perfect piece of data, can be the difference between success and failure on a run, between life and death. And in the right hands, information can be more than valuable-it can be powerful.The Shadowrun Gamemaster Screen provides a collection of useful tables from Shadowrun, Fifth Edition for ease of reference in game play. With range tables, action lists, combat modifiers, social modifiers, and more, this is a critical game aid to make your Shadowrun games faster and more fun. And to provide that all-important secrecy so that the players don\'t know what you\'re up to. This screen is for use with Shadowrun, Fifth Edition.Note: This reprint (with a brand new graphic!)',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			missing: 'outOfScope',
			notes: 'Print only.'
		}
	],
	[
		'RET-ANT',
		{
			sku: ['RET-ANT'],
			category: 'novel',
			type: 'digital',
			name: 'Shadowrun: Returns: Anthology',
			releaseDate: ['2013'],
			description: 'Along with many other features, this anthology includes Locks and Keys and The Art of Shadowrun Returns.',
			gameDate: '2053',
			edition: 5,
			publisher: ['harebrained'],
			files: [
				{
					path: './Novels/RET-ANT - Shadowrun Returns - Anthology.pdf',
					size: '15906325',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'27760',
		{
			sku: ['27760'],
			category: 'boardgame',
			type: 'physical',
			name: 'Shadowrun: Zero Day',
			description: 'You are the contagion. You are the fear. You are the thing that makes the megacorporations of the world tremble. In the world of Shadowrun, the corps think they have everyone and everything under their thumb, but they don\'t have you - the hacker in the Matrix, the fly in the ointment. You know where the world\'s deepest secrets are buried - and you have the weapons needed to fight to bring them out.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			missing: 'outOfScope',
			notes: 'Unreleased card game. Announced at Gen Con 2017.'
		}
	],
	[
		'26874',
		{
			sku: ['26874'],
			category: 'novel',
			type: 'print',
			name: 'Sprawl Stories Vol. 1',
			description: 'The Sixth World is a dangerous place, and nowhere is that more obvious than in Seattle, the so-called Emerald City. Surrounding its neon-drenched heart is kilometer after kilometer of Sprawl, where millions of people scratch out a living among hazardous, slowly decaying neighborhoods and even more dangerous neighbors.\nSprawl Stories contains four Shadowrun novellas that explore Seattle through the eyes of the people who live there every day. A burned-out mage detective tackles a missing person case that quickly threatens to spiral out of control. A reporter goes on the ride-along of her life with a high-octane DocWagon team, and uncovers a conspiracy on live triedeo. A young ex-wagesalve is caught between powerful forces while investigating his uncleâs death. And a shaman must deal with a serious injury that threatens his very way of lifeâbut not before taking vengeance on those who double-crossed him.\nSo take a walk on the true wild side of the Seattle Sprawl If youâre goodâand luckyâyou might even come back out in one pieceâ¦',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			missing: true,
			notes: 'Unreleased print-only book. Announced on Gen Con 2017.'
		}
	],
	[
		'RET-NOV',
		{
			sku: ['RET-NOV'],
			category: 'novel',
			type: 'digital',
			name: 'Hong Kong',
			releaseDate: ['2016'],
			description: 'HONG KONG. A stable and prosperous port of call in a sea of chaos, warfare, and political turmoil. The Hong Kong Free Enterprise Zone is a land of contradictions - it is one of the most successful centers of business in the Sixth World, and home to one of the worldâs most dangerous sprawl sites. A land of bright lights, gleaming towers, and restless spirits where life is cheap and everything is for sale.',
			gameDate: '2075',
			edition: 5,
			publisher: ['harebained'],
			files: [
				{
					path: './Novels/RET-NOV - Shadowrun Returns - Hong Kong.epub',
					size: '1404410',
					mime: 'application/epub+zip'
				}
			]
		}
	],
	[
		'RET-SBK',
		{
			sku: ['RET-SBK'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Shadorwun Returns: Hong Kong Sourcebook',
			releaseDate: ['2016-02'],
			description: 'Seven and a half million people crammed into about 1,100 square kilometers. Nearly 6,800 people per square kilometer. Not the tightest-packed city in the world, at least not in terms of people, but still up there. But in terms of wealth, secrets, intrigue, and double-crosses? No place in the world is more densely packed. With seven and a half million people, you have seven and a half million personal agendas, and fifteen or twenty million schemes to get ahead in the world, because nobody has just one. Those plans run from the wealthiest corporations jockeying for politically and magically advantageous positions in the city to the poorest of the poor, fighting to avoid being devoured by the horrors that lurk in the Kowloon Walled City. Step into the sprawl and prepare to trip over conflicting agendas, spiraling plots, and secrets nested in secrets.',
			gameDate: '2055',
			edition: 5,
			publisher: ['harebained'],
			files: [
				{
					path: './Sourcebooks/RET-SBK - Shadowrun Returns - Hong Kong Sourcebook.pdf',
					size: '4234953',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7002X',
		{
			sku: ['7002X', '25008'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Critters',
			releaseDate: ['1998-12', '2004-07'],
			description: 'Originally included with the Shadowrun, Third Edition, Gamemaster\'s Screen, this book is a complete catalogue of paranormal critters for Shadowrun. In addition to critter stats and short descriptions, it includes all of the rules you need for using critter powers. 48 Pages.',
			gameDate: '2060',
			edition: 3,
			publisher: ['fasa'],
			files: [
				{
					path: './Sourcebooks/7002X - Critters.pdf',
					size: '2079220',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'7102',
		{
			sku: ['7102'],
			category: 'rulebook',
			type: 'scan',
			name: 'Shadowrun GM Screen',
			releaseDate: ['1989'],
			description: 'First GM Screen, bundled with "Silver Angel" adventure.',
			gameDate: '2050',
			edition: 1,
			publisher: ['fasa'],
			files: [
				{
					path: './Rulebooks/7102 - Shadowrun GM Screen.pdf',
					size: '2334294',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'n/a',
		{
			sku: ['n/a'],
			category: 'novel',
			type: 'physical',
			name: 'Private Agenda',
			description: 'The last FASA novel, announced in Europe, but never released.',
			gameDate: '2060',
			edition: 3,
			publisher: ['fasa'],
			missing: 'outOfScope',
			notes: 'This was the last FASA novel, announced but never released. Here for historical reasons.'
		}
	],
	[
		'7321',
		{
			sku: ['7321'],
			category: 'mission',
			type: 'physical',
			name: 'Running Short',
			description: 'A unreleased adventure announced by FASA.',
			gameDate: '2060',
			edition: 3,
			publisher: ['fasa'],
			missing: 'outOfScope',
			notes: 'An adventure announced by FASA, never released. Here for historical reasons.'
		}
	],
	[
		'26CMP13-1',
		{
			sku: ['26CMP13-1'],
			category: 'mission',
			type: 'physical',
			image: 'CMP-UNR.png',
			name: 'Dragon Song Series',
			description: 'CMP 2013-01 Jailbreak Rock\nIf the payday is high enough, are you willing to bust a dragon out of a Denver jail? Shadowrun 5th Living Campaign. Help a fellow Runner out. A fellow Chummer is locked behind bars in Denver and is looking for help getting out. Brave the Cold and the Dragon to help a Runner.\n\nCMP 2013-02 Berlin Waltz\nEscort an injured Mr. Johnson to Berlin, with a dragon\'s minions on your tail! Shadowrun 5th Living Campaign. Welcome to Deutschland, come for the Schnitzel stay for the Neu-yen. When Mr. Johnson needs a hand moving some valuble items who\'s he gonna call.\n\nCMP 2013-03 Neo-Tokyo Fusion\nThe Ragin\' Gaijin are the hottest indy band in Neo-Tokyo, but now they need to be rescued. Shadowrun 5th Living Campaign. Mr. Johnson\'s favorite Japanese Pop band has gone Missing, help locate the missing Musicians and the Wasabi Rolls are on him, Fail and you may find yourself turning Japanese. \n\nCMP 2013-04 Ballroom Blitz\nThere\'s a party at Underworld 93 and everyone\'s invited. Everyone. Shadowrun 5th Living Campaign. All roads lead to Seattle, Mr Johnson has one last run, to protect his assets from would be Assassins. Enjoy all the fine Dining Downtown has to offer...it may be your last night on the town.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			missing: 'outOfScope',
			notes: 'A series of adventures played at conventions, not relesed afterwards.'
		}
	],
	[
		'26CMP13-2',
		{
			sku: ['26CMP13-2'],
			category: 'mission',
			type: 'physical',
			image: 'CMP-UNR.png',
			name: 'Dangerous Games Series',
			description: 'CMP 2013-05 Rolling the Dice\nWelcome to the Sixth World, shadowrunner. This time, your fixer has you lined up for a job in the California Free State. It\'s a straightforward acquisition from Ares Arms - or at least that\'s what you\'re told.\n\nCMP 2013-06 Double Down\nDeeper into the shadows of San Francisco and CalFree! The shadowrunners must recover a drone shot down in the mountains. Out of the city and into the wilderness - fresh air, fresh challenges, and fresh ways to get fragged...\n\nCMP 2013-07 Full House\nA big part of being a shadowrunner is breaking things for money. This time, Mr. Johnson wants you to break an entire MCT facility. No smash & grab, just smash! But is it really that simple?\n\nCMP 2013-08 Going for Broke\nOne more job in San Francisco, CalFree. A simple bodyguard job, keeping a computer programmer safe. Easy nuyen, right? Sure, chummer, if you say so... Theres a hit out for a software designer, and its your job to keep him alive. Think you can pull it off?',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			missing: 'outOfScope',
			notes: 'A series of adventures played at conventions, not relesed afterwards.'
		}
	],
	[
		'26CMP14',
		{
			sku: ['26CMP14'],
			category: 'mission',
			type: 'physical',
			image: 'CMP-UNR.png',
			name: 'Company Man Series',
			description: 'CMP 2014-05 Silence is Golden\nMr. Johnson needs a job done quietly, in and out without being seen. Think your team is up to the task? A Shadowrun Missions Living Campaign adventure. Shadowrun 5th Edition character needed.\n\nCMP 2014-06 A Nightâs Work\nSounds like a simple job, but donât they all? Either way runners get paid for a simple nightâs work, right? A Shadowrun Missions Living Campaign adventure. Shadowrun 5th Edition character needed. Please check out Welcome to the 6th World events to learn the system and make a character...\n\nCMP 2014-07 Run out the Guns\nâRumor has it that Ares is about to unveil a breakthrough in firearms technology. Would you kindly go steal that for me?â A Shadowrun Missions Living Campaign adventure. Shadowrun 5th Edition character needed.\n\nCMP 2014-08 Demolition Run\nSometimes the Johnson wants it quiet. Sometimes he wants it loud and noisy. Tonight, he wants the latter. A Shadowrun Missions Living Campaign adventure. Shadowrun 5th Edition character needed.',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			missing: 'outOfScope',
			notes: 'A series of adventures played at conventions, not relesed afterwards.'
		}
	],
	[
		'26CMP15-1',
		{
			sku: ['26CMP15-1'],
			category: 'mission',
			type: 'physical',
			image: 'CMP-UNR.png',
			name: 'Tennessee Suite Series',
			description: 'CMP 2015-01 Copperhead Road\nCMP 2015-02 Rolling on the River\nCMP 2015-03 Cinco de Mayo in Memphis\nCMP 2015-04 Leavinâ Tennessee',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			missing: 'outOfScope',
			notes: 'A series of adventures played at conventions, not relesed afterwards.'
		}
	],
	[
		'26CMP15-2',
		{
			sku: ['26CMP15-2'],
			category: 'mission',
			type: 'physical',
			image: 'CMP-UNR.png',
			name: 'Deadly Competition Series',
			description: 'CMP 2015-05 Carrying the Torch\nCMP 2015-06 Opening Ceremonies\nCMP 2015-07 Citius Altius Fortius\nCMP 2015-08 Closing Ceremonies',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			missing: 'outOfScope',
			notes: 'A series of adventures played at conventions, not relesed afterwards.'
		}
	],
	[
		'26CMP13-3',
		{
			sku: ['26CMP13-3'],
			category: 'mission',
			type: 'physical',
			image: 'CMP-UNR.png',
			name: 'BBQ Bob Series',
			description: 'CMP 2016-01 Broke Down in KC\nCMP 2016-02 The Midwest Farmerâs Daughter\nCMP 2016-03 Today Isnât Your Day, Tomorrow Isnât Looking Good Either',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			missing: 'outOfScope',
			notes: 'A series of adventures played at conventions, not relesed afterwards.'
		}
	],
	[
		'26CMP11',
		{
			sku: ['26CMP11'],
			category: 'mission',
			type: 'physical',
			image: 'CMP-UNR.png',
			name: 'CMP 2011',
			description: 'CMP 2011-01 Moving Day\nExtracting one person can be tough. Extracting an entire family? Thatâs on a whole different level. They say âNever deal with a dragon,â but maybe they should add âNever do a job involving grade schoolers and hormonal teensâ!\n\nCMP 2011-02 The Prize of Failure\nEvery Johnson promises an easy job, and this oneâs no exception. Scare an unwilling scientist into extracting willingly. You donât even have to do the extraction yourself. How hard could this be?\n\nCMP 2011-03 Threads of the Past\nA rockslide on Mt. Rainier has uncovered an ancient ship embedded in the rock, and a tunnel leading into previously unknown caverns inside the volcanic mountain. Grab some rope, lanterns, and a 3 meter pole, because youâve just been hired to explore this ancient cavern.\n\nCMP 2011-05 Burn Notice\nNever deal with a dragon? How do you tell him no when Perianwyr calls you to his club in Denver with a job offer? A rogue spy has been causing no end of headache for the Great Dragon Ghostwalker, and he wants this spy burned down. Succeed and youâll get a great payday. Fail and you could end up lunch.\n\nCMP 2011-06 TRO 2073\nThe new season of Desert Wars are brewing, and Ares has a new toy it wants to unveil: A 30 foot tall mech. Itâs unwieldy, ungainly, and totally impracticable for modern warfare, but it makes for one hell of a publicity stunt. Ares needs a team of mercs to pilot and/or escort this so-called battlemech. Can the runners keep it in one piece and survive the opening round of Desert Wars 2073?\n\nCMP 2011-07 Super Brawl Sunday\nItâs Super Brawl 2073, and the fix is in! When youâre hired to infiltrate and fix the biggest sporting event of the year, can you handle the pressure? And more importantly, will you get a pair of sneakers named after you?\n\nCMP 2011-08 Ainât That a Kick in the Head?\nBarry Mana, the troll with a voice like Sinatra and dance moves like Astaire, has once again come under death threats from ant-metahuman rights groups. When he narrowly escapes two assassination attempts in one night, he decides itâs time to call in some help. Ring-a-ding-ding, baby. Keep this cat alive while he pulls of the show of his career in the City of Lights, Las Vegas!',
			gameDate: '2073',
			edition: 4,
			publisher: ['catalyst'],
			missing: 'outOfScope',
			notes: 'A series of adventures played at conventions, not relesed afterwards.'
		}
	],
	[
		'X27PM001',
		{
			sku: ['X27PM001'],
			category: 'mission',
			type: 'physical',
			name: 'Hunters Hunted',
			description: 'A strange package given into the care of the runners leads them in a high stakes fight through Manhattan as supernatural forces try to recover it. Who can the runners trust? Where can they turn?',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			missing: 'outOfScope',
			notes: 'An Prime Mission announced for the Year of Shadowrun but never released.'
		}
	],
	[
		'X27PM002',
		{
			sku: ['X27PM002'],
			category: 'mission',
			type: 'physical',
			name: 'Well Preserved',
			description: 'A missing persons case, ritual magic, and corporate intrigue come together in Denver, with the runners stuck in the middle. Can you get out in one piece?',
			gameDate: '2070',
			edition: 4,
			publisher: ['catalyst'],
			missing: 'outOfScope',
			notes: 'An Prime Mission announced for the Year of Shadowrun but never released.'
		}
	],
	[
		'SHPL-02',
		{
			sku: ['SHPL-02'],
			category: 'misc',
			type: 'digital',
			name: 'Shadowplans - Airfield',
			releaseDate: ['2016'],
			description: '\'Shadowplans - Airfield\' is a modern/cyberpunk stylized battle map, suitable for VTT (virtual table top) or printing. Ideal for Shadowrun and other modern / cyberpunk settings. Use as a drop in location or the setting for an unfolding campaign.\nLarge Map : This map boasts a large playing space, allowing your players the room to strategize.\nBasic, Blueprint & Printer Friendly : This map comes in Basic and Blueprint themes, allowing your players to plan out their heists and jobs inimmersive style before watching those plans all go wrong on more detailed and stylized floorplans. This map also comes with a high contrast printer friendly version! Pick, choose and print the styles you need.\nGM Security Overlay: To ease the GMâs work, this map come with a basic security overlay. Icons used to create this overlay are also included for your own needs.\nRoll20/VTT/Printing Ready.',
			gameDate: '2075',
			edition: 5,
			publisher: ['unofficial'],
			files: [
				{
					path: './Misc/Maps/Shadowplans/Airfield/Airfield - Basic (Grid) Overlay.jpg',
					size: '9931424',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Airfield/Airfield - Basic (Grid) Overlay.pdf',
					size: '9936567',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Airfield/Airfield - Basic (Grid).jpg',
					size: '9775973',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Airfield/Airfield - Basic (Grid).pdf',
					size: '9781116',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Airfield/Airfield - Basic.jpg',
					size: '9688801',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Airfield/Airfield - Basic.pdf',
					size: '9693944',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Airfield/Airfield - Blue (Grid) Overlay.jpg',
					size: '9671016',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Airfield/Airfield - Blue (Grid) Overlay.pdf',
					size: '9676159',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Airfield/Airfield - Blue (Grid).jpg',
					size: '9899618',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Airfield/Airfield - Blue (Grid).pdf',
					size: '9904761',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Airfield/Airfield - Blue.jpg',
					size: '8511866',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Airfield/Airfield - Blue.pdf',
					size: '8517009',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Airfield/Airfield - Overlay.png',
					size: '596178',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Airfield/Airfield - White (Grid) Overlay.jpg',
					size: '5258189',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Airfield/Airfield - White (Grid) Overlay.pdf',
					size: '5263332',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Airfield/Airfield - White (Grid).jpg',
					size: '4858030',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Airfield/Airfield - White (Grid).pdf',
					size: '4863173',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Airfield/Airfield - White.jpg',
					size: '3207340',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Airfield/Airfield - White.pdf',
					size: '3212483',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SHPL-03',
		{
			sku: ['SHPL-03'],
			category: 'misc',
			type: 'digital',
			name: 'Shadowplans - Bar',
			releaseDate: ['2016'],
			description: '\'Shadowplans - Bar\' is a modern/cyberpunk stylized battle map, suitable for VTT (virtual table top) or printing. Ideal for Shadowrun and other modern / cyberpunk settings. Use as a drop in location or the setting for an unfolding campaign.\nLarge Map : This map boasts a large playing space, allowing your players the room to strategize.\nBasic, Blueprint & Printer Friendly : This map comes in Basic and Blueprint themes, allowing your players to plan out their heists and jobs inimmersive style before watching those plans all go wrong on more detailed and stylized floorplans. This map also comes with a high contrast printer friendly version! Pick, choose and print the styles you need.\nGM Security Overlay: To ease the GMâs work, this map come with a basic security overlay. Icons used to create this overlay are also included for your own needs.\nRoll20/VTT/Printing Ready.',
			gameDate: '2075',
			edition: 5,
			publisher: ['unofficial'],
			files: [
				{
					path: './Misc/Maps/Shadowplans/Bar/Bar - Basic (Grid) Overlay.jpg',
					size: '9883753',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Bar/Bar - Basic (Grid) Overlay.pdf',
					size: '9886701',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Bar/Bar - Basic (Grid).jpg',
					size: '9675079',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Bar/Bar - Basic (Grid).pdf',
					size: '9678027',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Bar/Bar - Basic.jpg',
					size: '8780893',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Bar/Bar - Basic.pdf',
					size: '8783841',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Bar/Bar - Blue (Grid) Overlay.jpg',
					size: '9931563',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Bar/Bar - Blue (Grid) Overlay.pdf',
					size: '9934511',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Bar/Bar - Blue (Grid).jpg',
					size: '9910320',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Bar/Bar - Blue (Grid).pdf',
					size: '9913268',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Bar/Bar - Blue.jpg',
					size: '9290599',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Bar/Bar - Blue.pdf',
					size: '9293547',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Bar/Bar - Overlay.png',
					size: '416423',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Bar/Bar - White (Grid) Overlay.jpg',
					size: '3280243',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Bar/Bar - White (Grid) Overlay.pdf',
					size: '3283191',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Bar/Bar - White (Grid).jpg',
					size: '3078168',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Bar/Bar - White (Grid).pdf',
					size: '3081116',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Bar/Bar - White.jpg',
					size: '2053700',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Bar/Bar - White.pdf',
					size: '2056648',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SHPL-04',
		{
			sku: ['SHPL-04'],
			category: 'misc',
			type: 'digital',
			name: 'Shadowplans - Corporate Office',
			releaseDate: ['2016'],
			description: '\'Shadowplans - Corporate Office\' is a pack of 5 modern/cyberpunk stylized battle maps, suitable for VTT (virtual table top) or printing. Ideal for Shadowrun and other modern / cyberpunk settings. Use as a drop in location or the setting for an unfolding campaign.\nLarge Maps : These maps boast a large playing space, allowing your players the room to strategize.\nBasic, Blueprint & Printer Friendly : Each map comes in Basic and Blueprint themes, allowing your players to plan out their heists and jobs inimmersive style before watching those plans all go wrong on more detailed and stylized floorplans. This map pack comes with additional high contrast printer friendly versions! Pick, choose and print the styles you need.\nGM Security Overlays: To ease the GMâs work, these maps come with basic security overlays. Icons used to create this overlay are also included for your own needs.\nRoll20/VTT/Printing Ready.',
			gameDate: '2075',
			edition: 5,
			publisher: ['unofficial'],
			files: [
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Car Park (Grid).jpg',
					size: '8194375',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Car Park (Grid).pdf',
					size: '8197329',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Car Park (Overlay).jpg',
					size: '8695629',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Car Park (Overlay).pdf',
					size: '8698583',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Car Park (Security Overlay).png',
					size: '477098',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Car Park - Blue (Grid).jpg',
					size: '6076861',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Car Park - Blue (Grid).pdf',
					size: '6079815',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Car Park - Blue (Overlay).jpg',
					size: '9290646',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Car Park - Blue (Overlay).pdf',
					size: '9293600',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Car Park - Blue.jpg',
					size: '7199759',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Car Park - Blue.pdf',
					size: '7202713',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Car Park - White (Grid).jpg',
					size: '2032712',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Car Park - White (Grid).pdf',
					size: '2035666',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Car Park - White (Overlay).jpg',
					size: '2546509',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Car Park - White (Overlay).pdf',
					size: '2549463',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Car Park - White.jpg',
					size: '1302713',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Car Park - White.pdf',
					size: '1305667',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Car Park.jpg',
					size: '7562146',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Car Park.pdf',
					size: '7565100',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Ground Floor (Grid).jpg',
					size: '9465202',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Ground Floor (Grid).pdf',
					size: '9470346',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Ground Floor (Overlay).jpg',
					size: '14351001',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Ground Floor (Overlay).pdf',
					size: '14356147',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Ground Floor (Security Overlay).png',
					size: '809794',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Ground Floor - Blue (Grid).jpg',
					size: '8124340',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Ground Floor - Blue (Grid).pdf',
					size: '8129484',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Ground Floor - Blue (Overlay).jpg',
					size: '13150381',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Ground Floor - Blue (Overlay).pdf',
					size: '13155527',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Ground Floor - Blue.jpg',
					size: '9567706',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Ground Floor - Blue.pdf',
					size: '9572850',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Ground Floor - White (Grid).jpg',
					size: '3594164',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Ground Floor - White (Grid).pdf',
					size: '3599308',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Ground Floor - White (Overlay).jpg',
					size: '4382068',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Ground Floor - White (Overlay).pdf',
					size: '4387212',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Ground Floor - White.jpg',
					size: '2104903',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Ground Floor - White.pdf',
					size: '2110047',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Ground Floor.jpg',
					size: '8449136',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Ground Floor.pdf',
					size: '8454280',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Office Floor (Grid).jpg',
					size: '8287405',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Office Floor (Grid).pdf',
					size: '8290359',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Office Floor (Overlay).jpg',
					size: '8812282',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Office Floor (Overlay).pdf',
					size: '8815236',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Office Floor (Security Overlay).png',
					size: '472967',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Office Floor - Blue (Grid).jpg',
					size: '6869988',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Office Floor - Blue (Grid).pdf',
					size: '6872942',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Office Floor - Blue (Overlay).jpg',
					size: '10428333',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Office Floor - Blue (Overlay).pdf',
					size: '10431289',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Office Floor - Blue.jpg',
					size: '6177729',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Office Floor - Blue.pdf',
					size: '6180683',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Office Floor - White (Grid).jpg',
					size: '1724473',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Office Floor - White (Grid).pdf',
					size: '1727427',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Office Floor - White (Overlay).jpg',
					size: '2280568',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Office Floor - White (Overlay).pdf',
					size: '2283522',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Office Floor - White.jpg',
					size: '1055331',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Office Floor - White.pdf',
					size: '1058285',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Office Floor.jpg',
					size: '7655746',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Office Floor.pdf',
					size: '7658700',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Roof (Grid).jpg',
					size: '5704396',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Roof (Grid).pdf',
					size: '5707350',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Roof (Overlay).jpg',
					size: '6224604',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Roof (Overlay).pdf',
					size: '6227558',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Roof (Security Overlay).png',
					size: '461630',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Roof - Blue (Grid).jpg',
					size: '3797986',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Roof - Blue (Grid).pdf',
					size: '3800940',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Roof - Blue (Overlay).jpg',
					size: '4189870',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Roof - Blue (Overlay).pdf',
					size: '4192824',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Roof - Blue.jpg',
					size: '2597171',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Roof - Blue.pdf',
					size: '2600125',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Roof - White (Grid).jpg',
					size: '2109710',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Roof - White (Grid).pdf',
					size: '2112664',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Roof - White (Overlay).jpg',
					size: '2612501',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Roof - White (Overlay).pdf',
					size: '2615455',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Roof - White.jpg',
					size: '1349335',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Roof - White.pdf',
					size: '1352289',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Roof.jpg',
					size: '5077925',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Roof.pdf',
					size: '5080879',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Server Floor (Grid).jpg',
					size: '6043133',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Server Floor (Grid).pdf',
					size: '6046087',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Server Floor (Overlay).jpg',
					size: '6654036',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Server Floor (Overlay).pdf',
					size: '6656990',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Server Floor (Security Overlay).png',
					size: '554657',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Server Floor - Blue (Grid).jpg',
					size: '3302486',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Server Floor - Blue (Grid).pdf',
					size: '3305440',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Server Floor - Blue (Overlay).jpg',
					size: '3872604',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Server Floor - Blue (Overlay).pdf',
					size: '3875558',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Server Floor - Blue.jpg',
					size: '2099422',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Server Floor - Blue.pdf',
					size: '2102376',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Server Floor - White (Grid).jpg',
					size: '1785012',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Server Floor - White (Grid).pdf',
					size: '1787966',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Server Floor - White (Overlay).jpg',
					size: '2479332',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Server Floor - White (Overlay).pdf',
					size: '2482286',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Server Floor - White.jpg',
					size: '1084658',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Server Floor - White.pdf',
					size: '1087612',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Server Floor.jpg',
					size: '5366972',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Corporate Office/Corporate Office - Server Floor.pdf',
					size: '5369926',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SHPL-09',
		{
			sku: ['SHPL-09'],
			category: 'misc',
			type: 'digital',
			name: 'Shadowplans - Datacenter',
			releaseDate: ['2017'],
			description: '\'Shadowplans - Datacenter\' is a modern/cyberpunk stylized battle map, suitable for VTT (virtual table top) or printing. Ideal for Shadowrun and other modern / cyberpunk settings. Use as a drop in location or the setting for an unfolding campaign.\nLarge Map : This map boasts a large playing space, allowing your players the room to strategize.\nBasic, Blueprint & Printer Friendly : This map comes in Basic and Blueprint themes, allowing your players to plan out their heists and jobs inimmersive style before watching those plans all go wrong on more detailed and stylized floorplans. This map also comes with a high contrast printer friendly version! Pick, choose and print the styles you need.\nGM Security Overlay: To ease the GMâs work, this map comes with a basic security overlay. Icons used to create this overlay are also included for your own needs.\nRoll20/VTT/Printing Ready.',
			gameDate: '2075',
			edition: 5,
			publisher: ['unofficial'],
			files: [
				{
					path: './Misc/Maps/Shadowplans/Datacenter/DataCenter - Blueprint - Combo.jpg',
					size: '9636050',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Datacenter/DataCenter - Blueprint - Combo.pdf',
					size: '9639764',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Datacenter/DataCenter - Blueprint - Gridded.jpg',
					size: '8767702',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Datacenter/DataCenter - Blueprint - Gridded.pdf',
					size: '8771416',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Datacenter/DataCenter - Blueprint.jpg',
					size: '7075453',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Datacenter/DataCenter - Blueprint.pdf',
					size: '7079167',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Datacenter/DataCenter - Overlay.png',
					size: '732426',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Datacenter/DataCenter - Standard - Combo.jpg',
					size: '9818443',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Datacenter/DataCenter - Standard - Combo.pdf',
					size: '9822157',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Datacenter/DataCenter - Standard - Gridded.jpg',
					size: '9435912',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Datacenter/DataCenter - Standard - Gridded.pdf',
					size: '9439626',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Datacenter/DataCenter - Standard.jpg',
					size: '8737177',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Datacenter/DataCenter - Standard.pdf',
					size: '8740891',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Datacenter/DataCenter - White - Combo.jpg',
					size: '2289833',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Datacenter/DataCenter - White - Combo.pdf',
					size: '2293547',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Datacenter/DataCenter - White - Gridded.jpg',
					size: '3184458',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Datacenter/DataCenter - White - Gridded.pdf',
					size: '3188172',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Datacenter/DataCenter - White.jpg',
					size: '1911011',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Datacenter/DataCenter - White.pdf',
					size: '1914725',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SHPL-01',
		{
			sku: ['SHPL-01'],
			category: 'misc',
			type: 'digital',
			name: 'Shadowplans - Map Pack 1',
			releaseDate: ['2015'],
			description: '\'Shadowplans pack #1\' is a series of 10 modern/cyberpunk stylized battle maps, suitable for VTT (virtual table top) or printing. Ideal for Shadowrun and other modern / cyberpunk settings. Use as drop in locations or the setting for an unfolding campaign.\nLarge Maps : The Maps boast large playing spaces, allowing your players the room to strategize.\nBasic & Blueprint : Each map comes in Basic and Blueprint themes, allowing your players to plan out their heists and jobs in immersive style before watching those plans all go wrong on more detailed and stylized floorplans.\nGM Security Overlays: To ease the GMâs work, these maps come with basic security overlays. Icons used to create this overlay are also included for your own needs.\nRoll20/VTT/Printing Ready.',
			gameDate: '2075',
			edition: 5,
			publisher: ['unofficial'],
			files: [
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/1 Apartments/Apartment 1 - Basic (Grid).jpg',
					size: '4349206',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/1 Apartments/Apartment 1 - Basic (Grid).pdf',
					size: '4352160',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/1 Apartments/Apartment 1 - Basic (Overlay).jpg',
					size: '4741935',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/1 Apartments/Apartment 1 - Basic (Overlay).pdf',
					size: '4744889',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/1 Apartments/Apartment 1 - Basic.jpg',
					size: '3881822',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/1 Apartments/Apartment 1 - Blue (Grid).jpg',
					size: '8859970',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/1 Apartments/Apartment 1 - Blue (Grid).pdf',
					size: '8862924',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/1 Apartments/Apartment 1 - Blue (Overlay).jpg',
					size: '11624190',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/1 Apartments/Apartment 1 - Blue (Overlay).pdf',
					size: '4086956',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/1 Apartments/Apartment 1 - Blue.jpg',
					size: '9059256',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/1 Apartments/Apartment 1 - Overlay.png',
					size: '253540',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/1 Apartments/Apartment 1 - White (Grid).jpg',
					size: '1773817',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/1 Apartments/Apartment 1 - White (Grid).pdf',
					size: '1776771',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/1 Apartments/Apartment 1 - White (Overlay).jpg',
					size: '2231609',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/1 Apartments/Apartment 1 - White (Overlay).pdf',
					size: '2566363',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/1 Apartments/Apartment 1 - White.jpg',
					size: '1122459',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/10 Train Station/TrainStation - Basic (Grid).jpg',
					size: '7132216',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/10 Train Station/TrainStation - Basic (Grid).pdf',
					size: '7135900',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/10 Train Station/TrainStation - Basic (Overlay).jpg',
					size: '7631762',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/10 Train Station/TrainStation - Basic (Overlay).pdf',
					size: '7635446',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/10 Train Station/TrainStation - Basic.jpg',
					size: '6260595',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/10 Train Station/TrainStation - Blue (Grid).jpg',
					size: '5777052',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/10 Train Station/TrainStation - Blue (Grid).pdf',
					size: '5780736',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/10 Train Station/TrainStation - Blue (Overlay).jpg',
					size: '4083272',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/10 Train Station/TrainStation - Blue (Overlay).pdf',
					size: '4086956',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/10 Train Station/TrainStation - Blue.jpg',
					size: '3571415',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/10 Train Station/TrainStation - Overlay.png',
					size: '311867',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/10 Train Station/TrainStation - White (Grid).jpg',
					size: '2076069',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/10 Train Station/TrainStation - White (Grid).pdf',
					size: '2079753',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/10 Train Station/TrainStation - White (Overlay).jpg',
					size: '2562679',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/10 Train Station/TrainStation - White (Overlay).pdf',
					size: '2566363',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/10 Train Station/TrainStation - White.jpg',
					size: '1224337',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/2 Apartments/Apartment 2 - Basic (Grid).jpg',
					size: '7262274',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/2 Apartments/Apartment 2 - Basic (Grid).pdf',
					size: '7265954',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/2 Apartments/Apartment 2 - Basic (Overlay).jpg',
					size: '8113514',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/2 Apartments/Apartment 2 - Basic (Overlay).pdf',
					size: '8117194',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/2 Apartments/Apartment 2 - Basic.jpg',
					size: '6375092',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/2 Apartments/Apartment 2 - Blue (Grid).jpg',
					size: '9188738',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/2 Apartments/Apartment 2 - Blue (Grid).pdf',
					size: '9192418',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/2 Apartments/Apartment 2 - Blue (Overlay).jpg',
					size: '12211283',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/2 Apartments/Apartment 2 - Blue (Overlay).pdf',
					size: '12214965',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/2 Apartments/Apartment 2 - Blue.jpg',
					size: '7856138',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/2 Apartments/Apartment 2 - Overlay.png',
					size: '387433',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/2 Apartments/Apartment 2 - White (Grid).jpg',
					size: '2259801',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/2 Apartments/Apartment 2 - White (Grid).pdf',
					size: '2263481',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/2 Apartments/Apartment 2 - White (Overlay).jpg',
					size: '3081631',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/2 Apartments/Apartment 2 - White (Overlay).pdf',
					size: '3085311',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/2 Apartments/Apartment 2 - White.jpg',
					size: '1339454',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/3 Apartments Roof/Apartment 2 Roof - Basic (Grid).jpg',
					size: '8103729',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/3 Apartments Roof/Apartment 2 Roof - Basic (Grid).pdf',
					size: '8107409',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/3 Apartments Roof/Apartment 2 Roof - Basic (Overlay).jpg',
					size: '8557462',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/3 Apartments Roof/Apartment 2 Roof - Basic (Overlay).pdf',
					size: '8561142',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/3 Apartments Roof/Apartment 2 Roof - Basic.jpg',
					size: '7234097',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/3 Apartments Roof/Apartment 2 Roof - Blue (Grid).jpg',
					size: '9737269',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/3 Apartments Roof/Apartment 2 Roof - Blue (Grid).pdf',
					size: '9740949',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/3 Apartments Roof/Apartment 2 Roof - Blue (Overlay).jpg',
					size: '12526272',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/3 Apartments Roof/Apartment 2 Roof - Blue (Overlay).pdf',
					size: '12529954',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/3 Apartments Roof/Apartment 2 Roof - Blue.jpg',
					size: '9462342',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/3 Apartments Roof/Apartment 2 Roof - Overlay.png',
					size: '290346',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/3 Apartments Roof/Apartment 2 Roof - White (Grid).jpg',
					size: '2763791',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/3 Apartments Roof/Apartment 2 Roof - White (Grid).pdf',
					size: '2767471',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/3 Apartments Roof/Apartment 2 Roof - White (Overlay).jpg',
					size: '3137506',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/3 Apartments Roof/Apartment 2 Roof - White (Overlay).pdf',
					size: '3141186',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/3 Apartments Roof/Apartment 2 Roof - White.jpg',
					size: '1809043',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/4 Street/Street 1 - Basic (Grid).jpg',
					size: '9790166',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/4 Street/Street 1 - Basic (Grid).pdf',
					size: '9793850',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/4 Street/Street 1 - Basic (Overlay).jpg',
					size: '5183327',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/4 Street/Street 1 - Basic (Overlay).pdf',
					size: '5187011',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/4 Street/Street 1 - Basic.jpg',
					size: '8496338',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/4 Street/Street 1 - Blue (Grid).jpg',
					size: '5897157',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/4 Street/Street 1 - Blue (Grid).pdf',
					size: '5900841',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/4 Street/Street 1 - Blue (Overlay).jpg',
					size: '4770844',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/4 Street/Street 1 - Blue (Overlay).pdf',
					size: '4774528',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/4 Street/Street 1 - Blue.jpg',
					size: '3555274',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/4 Street/Street 1 - Overlay.png',
					size: '368568',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/4 Street/Street 1 - White (Grid).jpg',
					size: '1953196',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/4 Street/Street 1 - White (Grid).pdf',
					size: '1956880',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/4 Street/Street 1 - White (Overlay).jpg',
					size: '2571671',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/4 Street/Street 1 - White (Overlay).pdf',
					size: '2575355',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/4 Street/Street 1 - White.jpg',
					size: '1025137',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/5 Street/Street 2 - Basic (Grid).jpg',
					size: '4719336',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/5 Street/Street 2 - Basic (Grid).pdf',
					size: '4723016',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/5 Street/Street 2 - Basic (Overlay).jpg',
					size: '5336807',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/5 Street/Street 2 - Basic (Overlay).pdf',
					size: '5340487',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/5 Street/Street 2 - Basic.jpg',
					size: '9364307',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/5 Street/Street 2 - Blue (Grid).jpg',
					size: '6060552',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/5 Street/Street 2 - Blue (Grid).pdf',
					size: '6064232',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/5 Street/Street 2 - Blue (Overlay).jpg',
					size: '4335131',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/5 Street/Street 2 - Blue (Overlay).pdf',
					size: '4338811',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/5 Street/Street 2 - Blue.jpg',
					size: '3654172',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/5 Street/Street 2 - Overlay.png',
					size: '332386',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/5 Street/Street 2 - White (Grid).jpg',
					size: '2100363',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/5 Street/Street 2 - White (Grid).pdf',
					size: '2104043',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/5 Street/Street 2 - White (Overlay).jpg',
					size: '2795413',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/5 Street/Street 2 - White (Overlay).pdf',
					size: '2799093',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/5 Street/Street 2 - White.jpg',
					size: '1188521',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/6 Jet/Jet - Basic (Grid).jpg',
					size: '7029095',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/6 Jet/Jet - Basic (Grid).pdf',
					size: '7034242',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/6 Jet/Jet - Basic.jpg',
					size: '4628377',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/6 Jet/Jet - Blue (Grid).jpg',
					size: '9584314',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/6 Jet/Jet - Blue (Grid).pdf',
					size: '9589461',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/6 Jet/Jet - Blue.jpg',
					size: '9217035',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/6 Jet/Jet - Overlay.png',
					size: '337081',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/6 Jet/Jet - White (Grid).jpg',
					size: '2161686',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/6 Jet/Jet - White (Grid).pdf',
					size: '2166833',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/6 Jet/Jet - White.jpg',
					size: '1049459',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/7 Police Station/Police Station - Basic (Grid).jpg',
					size: '5461795',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/7 Police Station/Police Station - Basic (Grid).pdf',
					size: '5465475',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/7 Police Station/Police Station - Basic (Overlay).jpg',
					size: '4000808',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/7 Police Station/Police Station - Basic (Overlay).pdf',
					size: '4004488',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/7 Police Station/Police Station - Basic.jpg',
					size: '4112861',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/7 Police Station/Police Station - Blue (Grid).jpg',
					size: '9176889',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/7 Police Station/Police Station - Blue (Grid).pdf',
					size: '9180569',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/7 Police Station/Police Station - Blue (Overlay).jpg',
					size: '12081976',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/7 Police Station/Police Station - Blue (Overlay).pdf',
					size: '12085658',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/7 Police Station/Police Station - Blue.jpg',
					size: '8940340',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/7 Police Station/Police Station - Overlay.png',
					size: '387097',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/7 Police Station/Police Station - White (Grid).jpg',
					size: '2453772',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/7 Police Station/Police Station - White (Grid).pdf',
					size: '2457452',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/7 Police Station/Police Station - White (Overlay).jpg',
					size: '3043590',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/7 Police Station/Police Station - White (Overlay).pdf',
					size: '3047270',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/7 Police Station/Police Station - White.jpg',
					size: '1571272',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/8 Office/Office - Basic (Grid).jpg',
					size: '4026653',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/8 Office/Office - Basic (Grid).pdf',
					size: '4029607',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/8 Office/Office - Basic (Overlay).jpg',
					size: '4523307',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/8 Office/Office - Basic (Overlay).pdf',
					size: '4526261',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/8 Office/Office - Basic.jpg',
					size: '9870496',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/8 Office/Office - Blue (Grid).jpg',
					size: '9156110',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/8 Office/Office - Blue (Grid).pdf',
					size: '9159064',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/8 Office/Office - Blue (Overlay).jpg',
					size: '11883606',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/8 Office/Office - Blue (Overlay).pdf',
					size: '11886562',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/8 Office/Office - Blue.jpg',
					size: '8392915',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/8 Office/Office - Overlay.png',
					size: '264349',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/8 Office/Office - White (Grid).jpg',
					size: '1527801',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/8 Office/Office - White (Grid).pdf',
					size: '1530755',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/8 Office/Office - White (Overlay).jpg',
					size: '2040396',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/8 Office/Office - White (Overlay).pdf',
					size: '2043350',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/8 Office/Office - White.jpg',
					size: '984483',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/9 Mansion/Mansion - Basic (Grid).jpg',
					size: '9217490',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/9 Mansion/Mansion - Basic (Grid).pdf',
					size: '9221164',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/9 Mansion/Mansion - Basic (Overlay).jpg',
					size: '4139113',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/9 Mansion/Mansion - Basic (Overlay).pdf',
					size: '4142787',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/9 Mansion/Mansion - Basic.jpg',
					size: '8419856',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/9 Mansion/Mansion - Blue (Grid).jpg',
					size: '8540836',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/9 Mansion/Mansion - Blue (Grid).pdf',
					size: '8544510',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/9 Mansion/Mansion - Blue (Overlay).jpg',
					size: '10117500',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/9 Mansion/Mansion - Blue (Overlay).pdf',
					size: '10121176',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/9 Mansion/Mansion - Blue.jpg',
					size: '9160884',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/9 Mansion/Mansion - Overlay.png',
					size: '541863',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/9 Mansion/Mansion - White (Grid).jpg',
					size: '1485009',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/9 Mansion/Mansion - White (Grid).pdf',
					size: '1488683',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/9 Mansion/Mansion - White (Overlay).jpg',
					size: '2483558',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/9 Mansion/Mansion - White (Overlay).pdf',
					size: '2487232',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Map Pack 1/9 Mansion/Mansion - White.jpg',
					size: '898095',
					mime: 'image/jpeg'
				}
			]
		}
	],
	[
		'SHPL-05',
		{
			sku: ['SHPL-05'],
			category: 'misc',
			type: 'digital',
			name: 'Shadowplans - Mini Mall',
			releaseDate: ['2016'],
			description: '\'Shadowplans - Mini Mall\' is a modern/cyberpunk stylized battle map, suitable for VTT (virtual table top) or printing. Ideal for Shadowrun and other modern / cyberpunk settings. Use as a drop in location or the setting for an unfolding campaign.\nLarge Map : This map boasts a large playing space, allowing your players the room to strategize.\nBasic, Blueprint & Printer Friendly : This map comes in Basic and Blueprint themes, allowing your players to plan out their heists and jobs inimmersive style before watching those plans all go wrong on more detailed and stylized floorplans. This map also comes with a high contrast printer friendly version! Pick, choose and print the styles you need.\nGM Security Overlay: To ease the GMâs work, this map come with a basic security overlay. Icons used to create this overlay are also included for your own needs.\nRoll20/VTT/Printing Ready.',
			gameDate: '2075',
			edition: 5,
			publisher: ['unofficial'],
			files: [
				{
					path: './Misc/Maps/Shadowplans/Mini Mall/Mall - Basic (Combo).jpg',
					size: '9932498',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Mini Mall/Mall - Basic (Combo).pdf',
					size: '9937635',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Mini Mall/Mall - Basic (Grid).jpg',
					size: '9653448',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Mini Mall/Mall - Basic (Grid).pdf',
					size: '9658585',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Mini Mall/Mall - Basic.jpg',
					size: '8719866',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Mini Mall/Mall - Blue (Combo).jpg',
					size: '9945725',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Mini Mall/Mall - Blue (Combo).pdf',
					size: '9950862',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Mini Mall/Mall - Blue (Grid).jpg',
					size: '9941942',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Mini Mall/Mall - Blue (Grid).pdf',
					size: '9947079',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Mini Mall/Mall - Blue.jpg',
					size: '9021329',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Mini Mall/Mall - Overlay.png',
					size: '643174',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Mini Mall/Mall - White (Combo).jpg',
					size: '5075170',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Mini Mall/Mall - White (Combo).pdf',
					size: '5080307',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Mini Mall/Mall - White (Grid).jpg',
					size: '4450369',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Mini Mall/Mall - White (Grid).pdf',
					size: '4455506',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Mini Mall/Mall - White.jpg',
					size: '2910112',
					mime: 'image/jpeg'
				}
			]
		}
	],
	[
		'SHPL-06',
		{
			sku: ['SHPL-06'],
			category: 'misc',
			type: 'digital',
			name: 'Shadowplans - Subway Station',
			releaseDate: ['2016'],
			description: '\'Shadowplans - Subway Station\' is a modern/cyberpunk stylized battle map, suitable for VTT (virtual table top) or printing. Ideal for Shadowrun and other modern / cyberpunk settings. Use as a drop in location or the setting for an unfolding campaign.\nLarge Map : This map boasts a large playing space, allowing your players the room to strategize.\nBasic, Blueprint & Printer Friendly : This map comes in Basic and Blueprint themes, allowing your players to plan out their heists and jobs inimmersive style before watching those plans all go wrong on more detailed and stylized floorplans. This map also comes with a high contrast printer friendly version! Pick, choose and print the styles you need.\nGM Security Overlay: To ease the GMâs work, this map come with a basic security overlay. Icons used to create this overlay are also included for your own needs.\nRoll20/VTT/Printing Ready.',
			gameDate: '2075',
			edition: 5,
			publisher: ['unofficial'],
			files: [
				{
					path: './Misc/Maps/Shadowplans/Subway/SubwayStation (Grid) Overlay.jpg',
					size: '9583259',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Subway/SubwayStation (Grid) Overlay.pdf',
					size: '9588396',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Subway/SubwayStation (Grid).jpg',
					size: '9545867',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Subway/SubwayStation (Grid).pdf',
					size: '9551004',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Subway/SubwayStation - Blue (Grid) Overlay.jpg',
					size: '9878568',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Subway/SubwayStation - Blue (Grid) Overlay.pdf',
					size: '9883705',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Subway/SubwayStation - Blue (Grid).jpg',
					size: '9651342',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Subway/SubwayStation - Blue (Grid).pdf',
					size: '9656479',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Subway/SubwayStation - Blue.jpg',
					size: '9422233',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Subway/SubwayStation - Blue.pdf',
					size: '9427370',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Subway/SubwayStation - Overlay.png',
					size: '607230',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Subway/SubwayStation - White (Grid) Overlay.jpg',
					size: '5931181',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Subway/SubwayStation - White (Grid) Overlay.pdf',
					size: '5936318',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Subway/SubwayStation - White (Grid).jpg',
					size: '5423402',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Subway/SubwayStation - White (Grid).pdf',
					size: '5428539',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Subway/SubwayStation - White.jpg',
					size: '4132790',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Subway/SubwayStation - White.pdf',
					size: '4137927',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Subway/SubwayStation.jpg',
					size: '8459027',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Subway/SubwayStation.pdf',
					size: '8464164',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SHPL-08',
		{
			sku: ['SHPL-08'],
			category: 'misc',
			type: 'digital',
			name: 'Shadowplans - Tileset 1',
			releaseDate: ['2016'],
			description: '\'Shadowplans - Tileset 1\' is a pack of tiles for assembling modern/cyberpunk stylized battle maps, suitable for VTT (virtual table top) or printing. Ideal for Shadowrun and other modern / cyberpunk settings. Use as drop-in locations or the setting for an unfolding campaign.\nAssemble : Featuring 44 pieces of varying types, everything you need to create your own Shadowplans maps.\nExtend : Use alongside existing Shadowplans Products to edit, expand and customize each map to your own tastes.',
			gameDate: '2075',
			edition: 5,
			publisher: ['unofficial'],
			files: [
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Tileset 1 - Print.pdf',
					size: '7371769',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/2x-Closed-(Grid).png',
					size: '120355',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/2x-Corner-(Grid).png',
					size: '251842',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/2x-Cross-(Grid).png',
					size: '403262',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/2x-Door-(Grid).png',
					size: '127404',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/2x-End-(Grid).png',
					size: '128117',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/2x-StairsDown-(Grid).png',
					size: '105081',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/2x-StairsUp-(Grid).png',
					size: '122812',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/2x-T-(Grid).png',
					size: '332004',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/2x2-(Grid).png',
					size: '148592',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/2x3-(Grid).png',
					size: '192644',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/2x4-(Grid).png',
					size: '261473',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/2x5-(Grid).png',
					size: '338862',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/3x-Corner-(Grid).png',
					size: '522537',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/3x-Cross-(Grid).png',
					size: '742650',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/3x-Door-(Grid).png',
					size: '285037',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/3x-End-(Grid).png',
					size: '203362',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/3x-StairsDown-(Grid).png',
					size: '165712',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/3x-StairsUp-(Grid).png',
					size: '192071',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/3x-T-(Grid).png',
					size: '607759',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/3x2-(Grid).png',
					size: '194825',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/3x2-Bath-(Grid).png',
					size: '231889',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/3x3-(Grid).png',
					size: '296118',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/3x3-Bath-(Grid).png',
					size: '372373',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/3x4-(Grid).png',
					size: '396587',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/3x5-(Grid).png',
					size: '481666',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/4x3-Office-(Grid).png',
					size: '477175',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/4x4-Bed-(Grid).png',
					size: '455654',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/4x4-Kitchen-(Grid).png',
					size: '331338',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/4x4-Office-(Grid).png',
					size: '634798',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/4x4-Server-(Grid).png',
					size: '692311',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/4x6-Living-(Grid).png',
					size: '772983',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/4x8-Living-(Grid).png',
					size: '1054416',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/5x3-Kitchen-(Grid).png',
					size: '310083',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/5x4-Security-(Grid).png',
					size: '791708',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/5x5-Bed-(Grid).png',
					size: '823742',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/5x6-Security-(Grid).png',
					size: '931346',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/5x7-Meetings-(Grid).png',
					size: '1009976',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/5x8-Server-(Grid).png',
					size: '1780012',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/6x10-Store-(Grid).png',
					size: '1863225',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/6x4-Storage-(Grid).png',
					size: '1181762',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/6x6-Lobby-(Grid).png',
					size: '1345360',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/6x8-Store-(Grid).png',
					size: '1308731',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/8x7-Storage-(Grid).png',
					size: '2668142',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Gridded/8x8-Lobby-(Grid).png',
					size: '2356471',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/2x-Closed.png',
					size: '119621',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/2x-Corner.png',
					size: '251221',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/2x-Cross.png',
					size: '400817',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/2x-Door.png',
					size: '126761',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/2x-End.png',
					size: '127378',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/2x-StairsDown.png',
					size: '103995',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/2x-StairsUp.png',
					size: '121667',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/2x-T.png',
					size: '329773',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/2x2.png',
					size: '147811',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/2x3.png',
					size: '191500',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/2x4.png',
					size: '259786',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/2x5.png',
					size: '336735',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/3x-Corner.png',
					size: '519741',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/3x-Cross.png',
					size: '736955',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/3x-Door.png',
					size: '283321',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/3x-End.png',
					size: '202116',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/3x-StairsDown.png',
					size: '163966',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/3x-StairsUp.png',
					size: '190251',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/3x-T.png',
					size: '601969',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/3x2-Bath.png',
					size: '231306',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/3x2.png',
					size: '194295',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/3x3-Bath.png',
					size: '371823',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/3x3.png',
					size: '294732',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/3x4.png',
					size: '394979',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/3x5.png',
					size: '480304',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/4x3-Office.png',
					size: '474391',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/4x4-Bed.png',
					size: '453077',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/4x4-Kitchen.png',
					size: '325254',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/4x4-Office.png',
					size: '632811',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/4x4-Server.png',
					size: '691271',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/4x6-Living.png',
					size: '767213',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/4x8-Living.png',
					size: '1049084',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/5x3-Kitchen.png',
					size: '308374',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/5x4-Security.png',
					size: '787492',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/5x5-Bed.png',
					size: '817521',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/5x6-Security.png',
					size: '914540',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/5x7-Meetings.png',
					size: '1003592',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/5x8-Server.png',
					size: '1774667',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/6x10-Store.png',
					size: '1839077',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/6x4-Storage.png',
					size: '1175129',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/6x6-Lobby.png',
					size: '1338955',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/6x8-Store.png',
					size: '1300627',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/8x7-Storage.png',
					size: '2656862',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Tileset 1/Ungridded/8x8-Lobby.png',
					size: '2344551',
					mime: 'image/png'
				}
			]
		}
	],
	[
		'SHPL-07',
		{
			sku: ['SHPL-07'],
			category: 'misc',
			type: 'digital',
			name: 'Shadowplans - Warehouse',
			releaseDate: ['2016'],
			description: '\'Shadowplans - Warehouse\' is a modern/cyberpunk stylized battle map, suitable for VTT (virtual table top) or printing. Ideal for Shadowrun and other modern / cyberpunk settings. Use as a drop in location or the setting for an unfolding campaign.\nLarge Map : This map boasts a large playing space, allowing your players the room to strategize.\nBasic, Blueprint & Printer Friendly : This map comes in Basic and Blueprint themes, allowing your players to plan out their heists and jobs inimmersive style before watching those plans all go wrong on more detailed and stylized floorplans. This map also comes with a high contrast printer friendly version! Pick, choose and print the styles you need.\nGM Security Overlay: To ease the GMâs work, this map come with a basic security overlay. Icons used to create this overlay are also included for your own needs.\nRoll20/VTT/Printing Ready.',
			gameDate: '2075',
			edition: 5,
			publisher: ['unofficial'],
			files: [
				{
					path: './Misc/Maps/Shadowplans/Warehouse/Warehouse - Basic (Grid) Overlay.jpg',
					size: '9771529',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Warehouse/Warehouse - Basic (Grid) Overlay.pdf',
					size: '9775210',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Warehouse/Warehouse - Basic (Grid).jpg',
					size: '9723208',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Warehouse/Warehouse - Basic (Grid).pdf',
					size: '9726889',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Warehouse/Warehouse - Basic.jpg',
					size: '9816780',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Warehouse/Warehouse - Basic.pdf',
					size: '9820461',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Warehouse/Warehouse - Blue (Grid) Overlay.jpg',
					size: '9923579',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Warehouse/Warehouse - Blue (Grid) Overlay.pdf',
					size: '9927260',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Warehouse/Warehouse - Blue (Grid).jpg',
					size: '9830053',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Warehouse/Warehouse - Blue (Grid).pdf',
					size: '9833734',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Warehouse/Warehouse - Blue.jpg',
					size: '9599409',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Warehouse/Warehouse - Blue.pdf',
					size: '9603090',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Warehouse/Warehouse - Overlay.png',
					size: '574452',
					mime: 'image/png'
				},
				{
					path: './Misc/Maps/Shadowplans/Warehouse/Warehouse - White (Grid) Overlay.jpg',
					size: '4993122',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Warehouse/Warehouse - White (Grid) Overlay.pdf',
					size: '4996803',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Warehouse/Warehouse - White (Grid).jpg',
					size: '4503095',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Warehouse/Warehouse - White (Grid).pdf',
					size: '4506776',
					mime: 'application/pdf'
				},
				{
					path: './Misc/Maps/Shadowplans/Warehouse/Warehouse - White.jpg',
					size: '3185075',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Shadowplans/Warehouse/Warehouse - White.pdf',
					size: '3188756',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'OMAP',
		{
			sku: ['OMAP'],
			category: 'misc',
			type: 'digital',
			name: 'Executive Centre - Office Maps',
			releaseDate: ['2017'],
			description: 'Maps from Executive Centre buildings arround the world.',
			gameDate: '2075',
			edition: 5,
			publisher: ['unofficial'],
			files: [
				{
					path: './Misc/Maps/Office Maps/fp_bangalore_ub_city.jpg',
					size: '1144009',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_beijing_china_resources_building201211.jpg',
					size: '1898001',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_beijing_china_world_office.jpg',
					size: '1689830',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_beijing_hyundai_motor_tower.jpg',
					size: '1608363',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_beijing_yintai_centre.jpg',
					size: '1609202',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_brisbane_one_one_one_eagle_street.jpg',
					size: '749123',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_chengdu_raffles_city_20130802.jpg',
					size: '1162796',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_guangzhou_hna_tower.jpg',
					size: '1870392',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_guangzhou_taikoo_hui.jpg',
					size: '1643129',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_gurgaon_dlf_cyber_city.jpg',
					size: '1658272',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_hongkong_nexxus_building_level15.jpg',
					size: '1807315',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_hongkong_one_island_east.jpg',
					size: '2029129',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_hongkong_three_pacific_place.jpg',
					size: '1883092',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_hongkong_two_exchange_square_level8_15012013.jpg',
					size: '1459752',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_hongkong_wheelock_19122012.jpg',
					size: '1507450',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_honkong_cambridge_house.jpg',
					size: '1495374',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_jakarta_one_pacific_place_20130218.jpg',
					size: '1819465',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_jakarta_sampoerna_strategic_square_level18_20130205.jpg',
					size: '1159977',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_jakarta_sampoerna_strategic_square_level30_20130205.jpg',
					size: '1393202',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_macau_aia_tower.jpg',
					size: '1529911',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_mumbai_kalpataru_synergy.jpg',
					size: '1643080',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_mumbai_thecapital_20130107.jpg',
					size: '2063381',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_perth_108_st_georges_terrace_level24_20130218.jpg',
					size: '1107288',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_seoul_gfc_floorplan-max.jpg',
					size: '1324605',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_seoul_sfc_floorplan_max_ws_01.jpg',
					size: '1279030',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_shanghai_chong_hing_finance_center.jpg',
					size: '1507754',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_shanghai_citic_square (1).jpg',
					size: '1554827',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_shanghai_citic_square.jpg',
					size: '1554827',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_shanghai_the_center.jpg',
					size: '1716371',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_shanghai_xintiandi.jpg',
					size: '1332614',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_shengzhen_kerry_plaza_tower2.jpg',
					size: '1724348',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_shengzhen_kerry_plaza_tower3.jpg',
					size: '1767382',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_singapore_ocean_financial_centre_level40.jpg',
					size: '1644921',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_singapore_one_raffles_quay.jpg',
					size: '1743473',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_singapore_six_battery_road.jpg',
					size: '1568482',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_sydney_aurora_place_level31_20130220.jpg',
					size: '1652488',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_sydney_australia_square_level33.jpg',
					size: '1818177',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_sydney_northpoint_tower_130418.jpg',
					size: '1491789',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_syd_1_bligh_st.jpg',
					size: '1722232',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_taipei_101_tower.jpg',
					size: '1743135',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_taipei_far_eastern_plaza.jpg',
					size: '1635862',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_tianjin_teda_msd_c1_tower.jpg',
					size: '1626373',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_tianjin_the_exchange_tower_2.jpg',
					size: '1785482',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_tianjin_world_financial_centre.jpg',
					size: '1712931',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_tokyo_cerulean_tower.jpg',
					size: '1364346',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_tokyo_sanno_park_tower.jpg',
					size: '1861479',
					mime: 'image/jpeg'
				},
				{
					path: './Misc/Maps/Office Maps/fp_tokyo_tokyo_bankers_club_20130131.jpg',
					size: '1058167',
					mime: 'image/jpeg'
				}
			]
		}
	],
	[
		'NAGEE',
		{
			sku: ['NAGEE'],
			category: 'magazine',
			type: 'digital',
			name: 'The Neo-Anarchists Guide to Everything Else',
			releaseDate: ['1996'],
			description: 'A semi-regular electronically-distributed magazine devoted to FASA\'s ShadowrunÂ® role-playing game. In the NAGEE, we\'ll be covering everything else. Everything that our contributors feel should have been covered, but wasn\'t. And, just things that look nice, \'cause looking good is the only way to go.',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Magazines/NAGEE/1 - Volumes I - VI.pdf',
					size: '251196',
					mime: 'application/pdf'
				},
				{
					path: './Magazines/NAGEE/2 - Locations.pdf',
					size: '566663',
					mime: 'application/pdf'
				},
				{
					path: './Magazines/NAGEE/3 - Personalities.pdf',
					size: '346200',
					mime: 'application/pdf'
				},
				{
					path: './Magazines/NAGEE/4 - Technology.pdf',
					size: '373935',
					mime: 'application/pdf'
				},
				{
					path: './Magazines/NAGEE/5 - The Shadows.pdf',
					size: '427433',
					mime: 'application/pdf'
				},
				{
					path: './Magazines/NAGEE/6 - Magic.pdf',
					size: '370150',
					mime: 'application/pdf'
				},
				{
					path: './Magazines/NAGEE/7 - Entities.pdf',
					size: '227529',
					mime: 'application/pdf'
				},
				{
					path: './Magazines/NAGEE/8 - The Matrix.pdf',
					size: '322551',
					mime: 'application/pdf'
				},
				{
					path: './Magazines/NAGEE/9 - Fiction.pdf',
					size: '259442',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'26404',
		{
			sku: ['26404'],
			category: 'novel',
			type: 'digital',
			name: 'Nigel Findley Omnibus',
			releaseDate: ['2010-05-06'],
			description: 'FOUR CLASSICS. ONE VOLUME. PURE SHADOWRUN\nShadowrun fans know. They love the dark alleys and darker plots of the Sixth World, and they know that Nigel Findley wrote some of the best Shadowrun novels ever. Now, for the first time, his four iconic books are collected in a single volume.\nWhether youâve loved Shadowrun fiction for years or are just now being introduced to it, the novels of Nigel Findley are a superb place to start. This exclusive edition contains:\n	â¢ 2XS, which introduces private detective Dirk Montgomery and pits him against the mysterious sources of a chip even more addictive than the strongest BTLs;\n	â¢ Shadowplay, featuring a veteran decker and a young shaman who stumble on lost technology that puts them up against one of the worldâs largest megacorporationsâand the Corporate Court itself;\n	â¢ Lone Wolf, where an undercover Lone Star operative finds himself in the middle of an exploding gang war; and\n	â¢ House of the Sun, which brings back Dirk Montgomery and sends him to Hawaiâi, where he runs afoul of the government, a ritual sacrifice, powerful elves, and very unpleasant bugs.\n	This omnibus provides a unique opportunity to dive into the complete novel output of one of Shadowrunâs finest writers. Let Nigel Findley show you what it really feels like to run in the shadows!',
			gameDate: '2050',
			edition: 4,
			publisher: ['catalyst'],
			missing: 'outOfScope',
			notes: 'Bundle of 4 novels.'
		}
	],
	[
		'10763',
		{
			sku: ['10763'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Shockwaves',
			releaseDate: ['2006'],
			description: 'Shockwaves (Schockwellen) was first published by FanPro Germany as a German-language product only, and now we have a free summary translation available - 18 pages discussing the history of the elusive megacorp Proteus AG! This free download has tons of plot hooks for the crafty GM, usable with both SR4 and SR3.',
			gameDate: '2063',
			edition: 4,
			publisher: ['fanpro'],
			files: [
				{
					path: './Sourcebooks/10763 - Shockwaves.pdf',
					size: '3764106',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'SRF',
		{
			sku: ['SRF'],
			category: 'sourcebook',
			type: 'print',
			name: 'Shadowrun France',
			releaseDate: ['1997'],
			description: 'A complete description of France from the world of Shadowrun in 2057, with its history, political system, organization of society, organized crime, most powerful duchies, new creatures, new equipment, new spells, etc.',
			gameDate: '2057-02',
			edition: 2,
			publisher: ['jeuxdes'],
			missing: 'outOfScope',
			notes: 'French only. Considered non-cannon.'
		}
	],
	[
		'10674',
		{
			sku: ['10674', '25005'],
			category: 'mission',
			type: 'print',
			name: 'Running Wild',
			description: 'Unreleased Adventure.',
			gameDate: '2064',
			edition: 3,
			publisher: ['fanpro'],
			missing: 'outOfScope',
			notes: 'Unreleased'
		}
	],
	[
		'26859',
		{
			sku: ['26859'],
			category: 'novel',
			type: 'print',
			name: 'Identity Crisis',
			description: 'One morning, Oliver Martin wakes up to find he no longer exists, with no job, SIN, nuyen, or even a place to live. He\'s been completely wiped from the Matrix, with a new identity replacing his. Only this one\'s on Lone Star\'s Most Wanted List, and Oliver\'s usual morning turns into the first run of his life. Boston\'s mean streets hold the keys to Oliver\'s fight to reclaim himself and discover who\'s behind his redacted identity. Falling in with a shadowrun team, he uncovers a conspiracy within MIT&T that could bring down the corporate walls of the city before it\'s through and take him right along with it.',
			gameDate: '2064',
			edition: 5,
			publisher: ['catalyst'],
			missing: true,
			notes: 'Unreleased, expected in 2017'
		}
	],
	[
		'26861',
		{
			sku: ['26861'],
			category: 'novel',
			type: 'print',
			name: 'Stirred',
			description: 'Jimmy Kincaid, burned-out mage and P. I., has a lot on his plate. Gang wars, feuding mobsters, unreliable magical power, and an encrypted data file that\'s already cost him friends, but he can\'t even access. When the troubles of the Seattle sprawl deepen into a bloody conspiracy with ties to neighboring nations and inhuman powers, he knows he\'s on the job of his life. Luckily, he\'s not alone. A man like Jimmy can\'t walk these shadowed streets without making enemies, but he\'s made allies, too.\nHopefully those allies will be able to save Jimmy from the dark, powerful forces converging on him...before it\'s too late for everyone...',
			gameDate: '2064',
			edition: 5,
			publisher: ['catalyst'],
			missing: true,
			notes: 'Unreleased, expected in 2017'
		}
	],
	[
		'NERPS-01',
		{
			sku: ['NERPS-01'],
			category: 'misc',
			type: 'digital',
			name: 'N.E.R.P.S.: ShadowLore',
			releaseDate: ['1995-04'],
			description: 'Sections: Races, Magic, Cyberware, Bioware, Matrix, Tech, Behind The Scenes (..., Toxin Exposure, ...).',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Misc/NERPS/NERPS-01 - ShadowLore.pdf',
					size: '326424',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'NERPS-02',
		{
			sku: ['NERPS-02'],
			category: 'misc',
			type: 'digital',
			name: 'N.E.R.P.S.: Foundations',
			releaseDate: ['1994-08'],
			description: 'Sections: Characters, Plotlines, Sprawls, List of Contributors.',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Misc/NERPS/NERPS-02 - Foundations.pdf',
					size: '285377',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'NERPS-03',
		{
			sku: ['NERPS-03'],
			category: 'misc',
			type: 'digital',
			name: 'N.E.R.P.S.: Edge Runners',
			releaseDate: ['1996-03'],
			description: 'Sections: Introduction, Characters, Appendix A, Appendix B.',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Misc/NERPS/NERPS-03 - Edge Runners.pdf',
					size: '264911',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'NERPS-04',
		{
			sku: ['NERPS-04'],
			category: 'misc',
			type: 'digital',
			name: 'N.E.R.P.S.: Underworld',
			releaseDate: ['1996-06'],
			description: 'Sections: Basement Transactions, Fixing the Fence, Item Encounters, The Arms Bazaar, The Organizatsiya, Better Living Through Biochemistry, Plastic Weapons, Pee Cee Cops, Criminal Gear and Equipment, All That Is Old Is Not Obsolete, Shadow Holdings, Vehicle Accessories, Frequently Asked Questions.',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Misc/NERPS/NERPS-04 - Underworld.pdf',
					size: '613593',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'NERPS-05',
		{
			sku: ['NERPS-05'],
			category: 'misc',
			type: 'digital',
			name: 'N.E.R.P.S.: Lost and Found',
			releaseDate: ['1997-08'],
			description: 'Sections: NERPS: Shadows of the Mind (History of NERPS: Shadows of the Mind, History of Psionics in the Sixth World, Short Fiction, Creating the Psionic Character, The World Around a Psi, Psionic Design, Additional Thoughts), NERPS: ShadowLore II (Shadow\'s Edge Spring Catalog 2056, Bioware & Cyberware, Technology, Melee Combat 3.0, Magic, Target Firearms-Duty Ammunition), NERPS: DragonLore (Dragons, Dragon Guardians, Dragon Worship, When, Where, and What Do Dragons Come From?, ...Something In The Waters, Maybe?, Critters, Bio-Armor, Shadowtalk).',
			gameDate: '2053',
			edition: 2,
			publisher: ['unofficial'],
			files: [
				{
					path: './Misc/NERPS/NERPS-05 - Lost and Found.pdf',
					size: '349310',
					mime: 'application/pdf'
				}
			]
		}
	],
	[
		'45201G',
		{
			sku: ['45201G', '45200G'],
			category: 'sourcebook',
			type: 'print',
			name: 'Berlin',
			releaseDate: ['2011'],
			description: 'Berlin, Germany:\nA city divided by war, reunited and divided again, this time by anarchism. A city in constant flux. The Mega-Cons say anarchy is dead, but any runner worth his soy-burger knows better.\nThe first independent sourcebook by german Shadowrun publisher Pegasus Spiele sheds a light onto the former capital city of Berlin. The hardcover book, as well as the city, is divided into two parts. On the one hand is the pacified part, now ruled by the big cons that try to hide the truth about the still anarchistic parts of the city. On the other hand are the remnants of anarchy. Some groups still wage war agains the cons, others just want to live their alternative way of life. Others again just want to hide in the shadows.\nThe limited edition of the book features a flip cover so you can read the book from both sides with each side featuring one of the two political parts of Berlin.',
			gameDate: '2074',
			edition: 4,
			publisher: ['pegasus'],
			missing: true,
			notes: 'German sourcebook about Berlin.'
		}
	],
	[
		'47020G',
		{
			sku: ['47020G'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Datapuls ADL',
			releaseDate: ['2017'],
			description: 'Die Allianz Deutscher LÃ¤nder â ein Flickenland, eine Region voller GegensÃ¤tze, ein tief mit den Schatten verwobenes Land. Hier finden sich Trollrepubliken, Elfenstaaten, toxisch verseuchte Zonen und riesige Megaplexe. Berlin mit seinem ewigen Konflikt zwischen anarchistischen Kiezen und Konzernhochburgen. Hamburg mit seinen Ã¼berfluteten StraÃen und dem Sprungbrett zur verseuchten Nordsee. Der Rhein-Ruhr-Megaplex, ein Schmelztiegel aus Ghettos, Stadtzentren, Industrie und Konzernen â Ã¼ber dem der Drache Lofwyr in Neu-Essen thront. Und gerade weil die ADL so heterogen ist, eine Mischung aus wuchernder Wildnis und wimmelnder UrbanitÃ¤t, entlegenen Fluchtorten und Ã¼berbauten StÃ¤dten, Erwachten Mysterien und verseuchten Landstrichen, sollten sich Runner hier gut auskennen. Sonst fressen einen die Schatten schneller, als man die nÃ¤chste Grenze erreichen kann.\nDatapuls: ADL ist ein Hardcover-Quellenbuch fÃ¼r Shadowrun 5, das einen Ãberblick Ã¼ber die aktuelle Lage in der Allianz Deutscher LÃ¤nder im Jahre 2078 prÃ¤sentiert. Es bietet dabei neue Einblicke, gibt aber auch Zusammenfassungen des schon Bekannten, um neuen wie alten Spielgruppen die ADL zur Heimat fÃ¼r ihre Runs und Runner zu machen. Neben Beschreibungen des Lifestyles, der Konzern- und Staatswelt, von Subkulturen, Magie und Matrix wird ein Fokus auf die drei Plexe Berlin, Hamburg und Rhein-Ruhr-Megaplex gelegt. Aber auch Kurzbeschreibungen der SOX, der Trollrepublik, des Kirchenstaats Westphalen und des Elfenherzogtums Pomorya sind zu finden, genauso wie Einblicke in dunkle Metaplot-Mysterien, neue NSCs und Grundrisse fÃ¼r den direkten Gebrauch am Spieltisch. Immer wieder unterbrochen von Datapuls-Nachrichten der neuesten Ereignisse â denn uninformierte Runner sind tote Runner.',
			gameDate: '2075',
			edition: 5,
			publisher: ['pegasus'],
			missing: true,
			notes: 'German sourcebook about Germany.'
		}
	],
	[
		'47000GA',
		{
			sku: ['47000GA'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Parazoologie 2075',
			releaseDate: ['2014'],
			description: 'Die Fabeln erwachen!\nDie Sechste Welt dreht sich weiter. Immer neue paranormale PhÃ¤nomene tauchen auf und wollen von der Metamenschheit erforscht werden. So auch in der Zoologie. Unbekannte Wesen warten an den unterschiedlichsten Orten rund um die erwachte Erde: Von Australien bis in die Alpen, vom Himmel bis in die Tiefen der Ozeane.\nNach dem Standardwerk Wildwechsel prÃ¤sentiert Parazoologie neue Critter fÃ¼r die Welt von Shadowrun 4. Vom Abramshummer bis zum Wolpertinger - denn ob toxisch oder erwacht: Jeder sollte das Tier kennen, das hinter dem nÃ¤chsten Strauch auf einen lauert.',
			gameDate: '2075',
			edition: 5,
			publisher: ['pegasus'],
			missing: true,
			notes: 'German translation of Parazoology and Parazoology 2 - updated with rules for Shadowrun, 5th Edition.'
		}
	],
	[
		'47000GB',
		{
			sku: ['47000GB'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Sturmfront',
			releaseDate: ['2014'],
			description: 'Sturm zieht auf ...\nEs brodelt in den Schatten â schon seit Monaten. Viel ist in der letzten Zeit geschehen, und es lohnt sich, auf dem Laufenden zu bleiben. Sei es in den dÃ¼steren StraÃenschluchten von Denver, hinter den Konzernschreibtischen von Ares oder sogar in den Gedanken bekannter DeckergrÃ¶Ãen wie FastJack: Information ist alles. Immer.\nSturmfront ist ein Metaplotbuch fÃ¼r Shadowrun 5, das aktuelle ErzÃ¤hlstrÃ¤nge von Shadowrun aufgreift, weiterfÃ¼hrt, einige beendet, andere neu beginnen lÃ¤sst. Als zusammengefasste Ãbersetzung des amerikanischen Stormfront gibt es Einblicke in die heiÃesten VorgÃ¤nge der Sechsten Welt und dient als Ãbergang zwischen den Editionen. Beleuchtet werden unter anderem: der Drachenkrieg, Denver, Vorkommnisse um Ares, der beendete Krieg in BogotÃ¡ und neue Gefahren am Horizont. SÃ¤mtliche Plotlinien werden dabei durch Chroniken begleitet, um den maximalen Ãberblick zu behalten und auch bei Shadowrun 5 tief in die Schatten eintauchen zu kÃ¶nnen. Denn das nÃ¤chste groÃe Ding lÃ¤sst sicherlich nicht lange auf sich warten ...',
			gameDate: '2075',
			edition: 5,
			publisher: ['pegasus'],
			missing: true,
			notes: 'German translation of Storm Front, as an abridged pdf with SR5 rules. Includes additional texts for the German setting.'
		}
	],
	[
		'47000GC',
		{
			sku: ['47000GC'],
			category: 'misc',
			type: 'print',
			name: 'Systemdaten',
			releaseDate: ['2014'],
			description: '',
			gameDate: '2075',
			edition: 5,
			publisher: ['pegasus'],
			missing: true,
			notes: 'This item consists of a folio to store notes and character sheets as well as a sturdy cardboard version of the German SR5 character sheet. It was released by Pegasus for Gratisrollenspieltag 2014 (German Free RPG Day).'
		}
	],
	[
		'47000GD',
		{
			sku: ['47000GD'],
			category: 'mission',
			type: 'digital',
			name: 'Trittbrettfahrer',
			releaseDate: ['2014'],
			description: 'Gefahr in den Schatten\nDunkle Umtriebe lÃ¤ngst untergegangen geglaubter Schrecken ziehen durch die Schatten der Smaragdstadt: Die Vergangenheit holt die Zukunft ein â und bringt jemanden mit, den manche Leute nicht gerne wiedersehen wollten. Es ist an den Runnern, das NÃ¶tige zu tun, um Menschenleben zu retten.\nTrittbrettfahrer ist ein Abenteuer fÃ¼r Shadowrun 5, das in Seattle spielt. Das PDF enthÃ¤lt ein komplett ausformuliertes Szenario inklusive Grundrisse und NSC-Werten â zum direkten Losspielen am heimatlichen Spieltisch.',
			gameDate: '2075',
			edition: 5,
			publisher: ['pegasus'],
			missing: true,
			notes: 'German translation of Shadowrun Mission "Carbon Copy" previously released in Sprawl Wilds. This pdf includes only SR5 rules.'
		}
	],
	[
		'27405',
		{
			sku: ['27405'],
			category: 'mission',
			type: 'digital',
			name: 'Toxic Alley',
			description: 'Dark plots and darker magic frequently converge in the capital of the UCAS, and those forces are revving up again. Toxic Alley launches plotlines involving toxic mages, shedim, and other dark forces, while building on elements from the Sith World Tarot and Book of the Lost. Runners will have as much as they can handle keeping up with the chaos filling the back alleys of DeeCee!',
			gameDate: '2075',
			edition: 5,
			publisher: ['catalyst'],
			missing: true,
			notes: 'Scheduled to ship in July 2017.'
		}
	],
	[
		'45019G',
		{
			sku: ['45019G'],
			category: 'sourcebook',
			type: 'print',
			name: 'Schattenhandbuch 1',
			releaseDate: ['2014'],
			description: 'Schattenhandbuch 1 (Shadow Handbook 1) is a print compilation of several PDF publications and some new material.\nIt contains:\n\tCoyotes\n\tThe Assassinâs Primer\n\tGun Heaven 3\n\tParazoology\n\tParazoology 2\n\tKAPOWW (Shadowrun Germany)\n\tRAZANNG (Shadowrun Germany)\n\nSchattenhandbuch 1 was published in a numbered limited edition with a print run of 3000 books.',
			gameDate: '2075',
			edition: 5,
			publisher: ['pegasus'],
			missing: true
		}
	],
	[
		'45034G',
		{
			sku: ['45034G'],
			category: 'sourcebook',
			type: 'print',
			name: 'Schattenhandbuch 2',
			releaseDate: ['2015'],
			description: 'Limited print edition of various SR5 pdfs.\nThis volume includes:\n\t- Schattenzauber (Shadow Spells)\n\t- Parabotanik 2075 (Parabotany, updated for SR5)\n\t- Parageologie (Parageology, updated for SR5)\n\t- Ãtherologie (Aetherology)\n\t- Kugeln & Bandagen (Bullets & Bandages)\n\t- ADL Magie Update',
			gameDate: '2075',
			edition: 5,
			publisher: ['pegasus'],
			missing: true
		}
	],
	[
		'45027G',
		{
			sku: ['45027G'],
			category: 'sourcebook',
			type: 'print',
			name: 'Seattle: Stadt der Schatten Quellenbox',
			releaseDate: ['2017'],
			description: 'Seattle, die Emerald City, war schon immer einer der wichtigsten Metroplexe in der Welt von Shadowrun. Der Sprawl schwelt, denn er bildet einen Schmelztiegel aus KonzernmÃ¤chten, politischen Intrigen und krimineller Energie, wie er kaum sonst irgendwo zu finden ist. Ikonen wie die Ancients, die Halloweeners, die Finnigan-Familie, die Skraacha, Dantes Inferno, die Renraku-Arkologie und Big Rhino sind hier zu finden. Und Runner wie Dodger, Sally Tsung, Dirk Montgomery, Jake Armitage, Twist, Kellan Colt und James Kincaid haben sich in den StraÃenschluchten ihren Namen verschafft und sind zur Legende geworden. Sie alle haben hier ihr GlÃ¼ck gemacht und ihre Verluste erlitten. Und ihre Heimat stellt auch andere auf die Probe, denn hier kÃ¶nnen Runner zeigen, ob sie an der Spitze der Nahrungskette stehen oder nur Teil des Buffets sind.',
			gameDate: '2075',
			edition: 5,
			publisher: ['pegasus'],
			missing: true,
			notes: 'This is an updated version of the recent Seattle Sprawl box by CGL. Some of the contents have been rearranged and new items added.\nIt includes:\n\t- Smaragd im Schatten (Emerald Shadows, 96 pages)\n\t- MÃ¤chte in Seattle (Ruling the Queen City, 52 pages)\n\t- Im Labyrinth (Tangled Threads, 28 pages)\n\t- Doc Wagon 19 (Short Story, 64 pages)\n\t- 24 Character Cards, double sided\n\t- Gang Reference Card, double sided\n\t- 2 Location Reference Cards\n\t- 2 A1 Seattle Maps, one double sided'
		}
	],
	[
		'46085G',
		{
			sku: ['46085G'],
			category: 'mission',
			type: 'print',
			name: 'Blut und Spiele',
			releaseDate: ['2011'],
			description: 'Es herrscht Krieg in den StraÃen - doch nicht um Geld oder Macht, sondern um Punkte. Die Stadtkrieg-Saison hat wieder begonnen, die DeMeKo flutet die Medien mit Werbung fÃ¼r die Mannschaften, und die Fans machen sich auf einen heiÃen Sommer gefasst. In den StraÃen und auf den PlÃ¤tzen der gerÃ¤umten Wohngebiete laufen die Stars der Chromlegion Bremen, der Naniten NÃ¼rnberg und der Berliner Cybears auf, um den Zuschauern ein Spektakel besonderer Art zu bieten - im blutigen Kampf um zwei BÃ¤lle und zwei Torzonen. Wen jucken da noch der jÃ¼ngste Vereinsskandal oder die vertriebenen Bewohner der Spielareals?\nBlut und Spiele, von Pegasus fÃ¼r die deutsche Spielerschaft produziert, ist ein Abenteuerband fÃ¼r Shadowrun 4, der sich mit Stadtkrieg befasst - einer der brutalsten Sportarten der Sechsten Welt. In vier Abenteuern wird das Thema lose aufgenommen. In einem Zusatzkapitel wird der Sport genauer beleuchtet, die Liga in der Allianz Deutscher LÃ¤nder beschrieben, hinter die Kulissen der Vereinsstrukturen geschaut. Neben Werten fÃ¼r Spieler und Sportpersonal ist auch die Beschreibung eines besonderen Sportevents enthalten - mit der man die vier Abenteuer im Band zu einer Kampagne der besonderen Art verknÃ¼pfen kann. Damit es auch bei den Runnern ankommt: Es ist wieder KRIEG!\nBlut und Spiele, Abenteuerband zu Shadowrun von Pegasus Press; ca. 200 Seiten, Hardcover',
			gameDate: '2074',
			edition: 4,
			publisher: ['pegasus'],
			missing: true,
			notes: 'German 200 page adventure.'
		}
	],
	[
		'GRST-2016',
		{
			sku: ['GRST-2016'],
			category: 'mission',
			type: 'print',
			name: 'Gefahr in Boston',
			releaseDate: ['2016'],
			description: 'People in Boston are going crazy! Even crazier than at a Sox game, apparently - in fact, the whole town has been sealed off! It\'s a Yanks fan\'s dream come true.',
			gameDate: '2075',
			edition: 5,
			publisher: ['pegasus'],
			missing: true,
			notes: 'A Shadowrun supplement released at Gratisrollenspiltag 2016.'
		}
	],
	[
		'45018G',
		{
			sku: ['45018G'],
			category: 'mission',
			type: 'print',
			name: 'Licht aus der Asche',
			releaseDate: ['2014'],
			description: 'Im Schattendschungel\nWenn man lange genug in den Megaplexen der Sechsten Welt wohnt, weiÃ man: Es gibt dort mehr als SupermÃ¤rkte und die glitzernden PalÃ¤ste der Konzerne. In den tiefen StraÃenschluchten, unter dem Asphalt, jenseits dunkler HinterhÃ¶fe existieren vergessene Gefahren und urbane Anarchie â gnadenloser als jede Wildnis.\nSeattle, die groÃe Metropole in den UCAS, ist voll von solchen Orten â und mit diesem Abenteuerband hat man die Chance, sie live und hautnah zu erleben. Ob in festungsÃ¤hnlichen Farmen in den Barrens, in versteckten Kliniken oder tief im Orkuntergrund: Die Runner werden in Bereiche vorstoÃen, auf die nur selten ein Licht fÃ¤llt. Engagierte Aktivisten, brutale Kriminelle, lautlose Killer sind nur einige HÃ¼rden, die ihnen im Weg stehen, um ihre AuftrÃ¤ge zu erfÃ¼llen â und am Ende entweder mit ihrem verdienten Lohn zurÃ¼ck in die Zivilisation zu treten oder fÃ¼r immer im Dschungel des Plexes zu verschwinden.\nLicht aus der Asche ist eine Sammlung von drei Shadowrun-Abenteuern fÃ¼r Shadowrun 5, die sowohl erfahrenen Runnern als auch Neueinsteigern stundenlangen SpielspaÃ gewÃ¤hren. Komplett ausgearbeitet, enthalten die Abenteuer alle notwendigen GrundrissplÃ¤ne, Spielleiterinformationen und NPC-Werte, damit der Spielleiter mit seinen Spielern direkt eintauchen kann in das urbane Chaos.',
			gameDate: '2075',
			edition: 5,
			publisher: ['pegasus'],
			missing: true,
			notes: 'German translation of Sprawl Wilds missing the adventure "Carbon Copy" and limited to the 5th edition of Shadowrun.'
		}
	],
	[
		'45033G',
		{
			sku: ['45033G'],
			category: 'mission',
			type: 'digital',
			name: 'Mission Chicago',
			releaseDate: ['2014'],
			description: 'Chicago. Eine Stadt mit dÃ¼sterer Geschichte. Hier tobte der letzte Kampf gegen die Universelle Bruderschaft. Hier stellte sich die Metamenschheit der vernichtenden Plage der Insektengeister. Hier griff man zu einer nuklearen Sprengung als letzten Ausweg. Jahrzehnte spÃ¤ter hat Chicago sich immer noch nicht erholt. In der Stadt herrscht das Gesetz des StÃ¤rkeren. Neue und versteckte Schaben und Wespen-Nester formen sich im Untergrund und in den Ruinen von Downtown. Nuyen zÃ¤hlen auf den StraÃen weniger als eine geladene Waffe und ein paar Medikamente zum Tausch. Und in den AuÃenbezirken etablieren sich die GroÃkonzerne, um mit ihren geheimen Experimenten den grÃ¶ÃtmÃ¶glichen Profit aus der vergangenen Katastrophe und den unzÃ¤hmbaren Insektengeistern zu schlagen.',
			gameDate: '2075',
			edition: 5,
			publisher: ['pegasus'],
			missing: true,
			notes: 'Collects three Shadowrun Missions adventures (SRM 5A-01 Chasin\' the Wind, SRM 5A-02 Critic\'s Choice, SRM 5A-03 Gone long gone) and a description of the city of Chicago.'
		}
	],
	[
		'45035G',
		{
			sku: ['45035G'],
			category: 'mission',
			type: 'digital',
			name: 'Schatten Ã¼ber Chicago',
			releaseDate: ['2016'],
			description: 'Chicago. Wespengeister. Schaben in KleinwagengrÃ¶Ãe. Brutale Banden und toxische Schamanen. All dies fÃ¤llt einem ein, wenn man den Namen der einstigen Metropole hÃ¶rt. Aber das ist noch lange nicht alles! In der Nachbarschaft von Medikamentenschiebern und am Rande des Kraters einer nuklearen Explosion gibt es auch die Reichen, die GroÃkonzerne und die Profiteure der anarchischen ZustÃ¤nde. Die Runner erwartet eine Reise von ganz unten nach ganz oben, eine Achterbahnfahrt durch Chicago: von Forschungsanlagen, Ã¼ber Gang-Territorien bis in die tiefe Vergangenheit der Stadt.\nSchatten Ã¼ber Chicago enthÃ¤lt drei Abenteuer fÃ¼r Shadowrun 5, die in Chicago angesiedelt sind, sowie die Kurzbeschreibung der Stadt samt Ãbersichtskarte, die auch schon in Mission Chicago enthalten war. Der Band ist unabhÃ¤ngig von seinem VorgÃ¤nger spielbar und liefert ausformulierte Abenteuer mit allen relevanten Werten â direkt fÃ¼r den Spieltisch.',
			gameDate: '2075',
			edition: 5,
			publisher: ['pegasus'],
			missing: true,
			notes: 'Collects three Shadowrun Missions adventures (SRM05-04: Liberation, SRM05-05: While the City Sleeps, SRM05-06: Take a Chance) and a description of the city of Chicago.'
		}
	],
	[
		'45042G',
		{
			sku: ['45042G'],
			category: 'misc',
			type: 'print',
			name: 'Karren Quartett',
			releaseDate: ['2016'],
			description: 'DAS KARRENQUARTETT FÃR SHADOWRUN 5\nDieses fÃ¼r 2-5 Personen gedachte Spiel folgt den klassischen Quartett-Regeln: Ihr versucht, komplette SÃ¤tze (A-H) zu sammeln. NatÃ¼rlich kÃ¶nnt ihr mit den zahlreichen auf den Karten aufgelisteten Fahrzeugwerten das Spiel auch als klassisches Stechquartett verwenden.',
			gameDate: '2075',
			edition: 5,
			publisher: ['pegasus'],
			missing: true,
			notes: 'Shadowrun Karren Quartett is a set of 32 cards depicting various vehicles of the Shadowrun universe with Shadowrun5 game stats.'
		}
	],
	[
		'45020G',
		{
			sku: ['45020G'],
			category: 'misc',
			type: 'print',
			name: 'Wummen Quartett',
			releaseDate: ['2014'],
			description: 'Waffenpower!\nOb Planung, Intrigen, Infiltration: Echte Runner wissen, dass es Zeiten gibt, in denen das letzte Wort gesprochen wurde. Dann gilt nur noch, wer sich im Kampf behauptet, wer den Schusswechsel Ã¼berlebt â und wer die grÃ¶Ãeren Waffen hat.\nDas Wummenquartett fÃ¼r Shadowrun 5 mit seinen groÃzÃ¼gigen, vierfarbigen Illustrationen enthÃ¤lt auf 32 Karten bekannte Waffen aus dem Shadowrun-Universum: von der kleinen Pistole bis zum groÃen ScharfschÃ¼tzengewehr. Neben der MÃ¶glichkeit, es als normales Quartett zu spielen, kannst du es dank der angegebenen Waffenwerte auch als Stechquartett nutzen â und sogar im Rollenspiel als AusrÃ¼stungskarten verwenden.\nInklusive eines Freischalt-Codes fÃ¼r Shadowrun Online, der einen exklusiven AusrÃ¼stungsgegenstand verfÃ¼gbar macht.',
			gameDate: '2075',
			edition: 5,
			publisher: ['pegasus'],
			missing: true,
			notes: 'Shadowrun Wummen Quartett is a set of 32 cards depicting various weapons of the Shadowrun universe with Shadowrun5 game stats. It also includes an activation code for Shadowrun Online.'
		}
	],
	[
		'45046G',
		{
			sku: ['45046G'],
			category: 'mission',
			type: 'print',
			name: 'Auf dunklen Pfaden',
			releaseDate: ['2017'],
			description: 'Die Gefahr lauert hinter vielen Ecken, auch in Deutschland. FÃ¼r Runner bietet das Land in seiner ganzen VariabilitÃ¤t einen Hort der MÃ¶glichkeiten: um entweder reich und berÃ¼hmt in den Schatten zu werden oder dort fÃ¼r immer zu verschwinden. Manchmal etwa lassen sich Studenten in dunkle Geheimnisse aus finsteren Kapiteln der Geschichte hineinziehen. Ein anderes Mal zieht das organisierte Verbrechen die Strippen hinter einem eigentlich vergnÃ¼glichen Event. Oder es verschlÃ¤gt die Runner ins Venedig an der Elbe, um im wahrsten Sinne des Wortes im TrÃ¼ben zu fischen. So oder so wer Ã¼berlebt, darf die Beute behalten.\nAuf dunklen Pfaden ist der erste Abenteuerband fÃ¼r Shadowrun 5, der komplett in der Allianz Deutscher LÃ¤nder spielt. Er prÃ¤sentiert drei komplett ausformulierte Abenteuer inklusive aller Werte und detaillierter Grundrisse der Locations.',
			gameDate: '2075',
			edition: 5,
			publisher: ['pegasus'],
			missing: true,
			notes: 'German adventure.'
		}
	],
	[
		'45056G',
		{
			sku: ['45056G'],
			category: 'mission',
			type: 'print',
			name: 'Im Bann der Karten',
			releaseDate: ['2017'],
			description: 'Die Karten werden neu gemischt\nDie Karten des Tarot-Spiels kÃ¶nnen auf sehr unterschiedliche Weise Runner in ihren Bann ziehen und neue SchicksalsfÃ¤den in ihr Lebensnetz knÃ¼pfen. Nicht nur die Magie ist durch das Erwachen der Sechsten Welt stark geworden und hat dem Tarot neue Tiefe verliehen â auch andere MÃ¤chte nutzen die Bilder und Symbole: Was bedeuten die merkwÃ¼rdigen Nachrichten im Berliner Netz? Welches Geheimnis verbirgt sich hinter der kostbaren Fracht in den verseuchten GewÃ¤ssern an der norddeutschen KÃ¼ste? Und wie kÃ¶nnen die KrÃ¤fte des Schicksals durch die RÃ¤nkespiele im Schatten des Rhein-Ruhr-Plexes fÃ¼hren? Egal was die Karten sagen werden, jeder Runner hat sein Schicksal selbst in der Hand ... oder nicht?\nIm Bann der Karten ist ein Abenteuerband fÃ¼r Shadowrun 5, der komplett in der Allianz Deutscher LÃ¤nder spielt. Er prÃ¤sentiert drei komplett ausformulierte Abenteuer, die sich mit dem Shadowrun-Tarot beschÃ¤ftigen und Tarot-Karten ins Spiel integrieren. Der Band kann aber auch ohne das Shadowrun-Tarot gespielt werden.',
			gameDate: '2075',
			edition: 5,
			publisher: ['pegasus'],
			missing: true,
			notes: 'Three short scenarios for use with the Tarot Deck.'
		}
	],
	[
		'46040G',
		{
			sku: ['46040G'],
			category: 'sourcebook',
			type: 'physical',
			name: 'Geisterkartelle',
			releaseDate: ['2010'],
			description: '',
			gameDate: '2074',
			edition: 4,
			publisher: ['pegasus'],
			missing: true,
			notes: 'German Translation of Ghost Cartels by Pegasus. It features additional material on a ghost cartels campaign in the AGS and an additional adventure called Euro Tour. It also contains a CD-ROM with further material and bonus adventures.'
		}
	],
	[
		'46040GX',
		{
			sku: ['46040GX'],
			category: 'mission',
			type: 'digital',
			name: 'Die WÃ¶lfe von St. Pauli',
			releaseDate: ['2012'],
			description: 'Die WÃ¶lfe heulen!\nWenn es um neue Drogen geht, verstehen die Kartelle keinen SpaÃ. Auch nicht, wenn Macht, Geld oder Einfluss zur Debatte stehen.\nIn Die WÃ¶lfe von St. Pauli geraten die Runner an das organisierte Verbrechen - und sollten aufpassen, dass sie nicht dessen Spielball werden. Das Gratis-Szenario ist ein komplett ausgearbeitetes Abenteuer fÃ¼r Shadowrun 4, das schon im Rahmen des Geisterkartelle-Metaplots auf der deutschen Beileger-CD zum gleichnamigen Buch erschienen ist. Es kann aber ohne Probleme unabhÃ¤ngig von der Kampagne gespielt werden.',
			gameDate: '2074',
			edition: 4,
			publisher: ['pegasus'],
			missing: true,
			notes: 'This adventure was originally included as bonus on the CD Rom accompanying the German Ghost Cartels book and was later made available as stand-alone pdf.'
		}
	],
	[
		'46075G',
		{
			sku: ['46075G'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Konzerndossier',
			releaseDate: ['2011'],
			description: '',
			gameDate: '2074',
			edition: 4,
			publisher: ['pegasus'],
			missing: true,
			notes: 'German translation of the Corporate Guide.\nIt features 30 additional pages on corporations in Germany.'
		}
	],
	[
		'23001',
		{
			sku: ['23001'],
			category: 'sourcebook',
			type: 'print',
			name: 'MÃ¼nchen Noir',
			releaseDate: ['2006'],
			description: 'MÃ¼nchen Noir is a Shadowrun sourcebook detailing the city and region of Munich, Germany. It also contains a 60-page adventure campaign set in Munich.\nThe book covers the following topics:\n\t- Overview over the city districts\n\t- Bavarian economy\n\t- Media in Munich\n\t- Munich\'s upper class\n\t- Organised Crime\n\t- Important characters of the Munich runner scene\n\nThe campaign (also titled MÃ¼nchen Noir) throws the player characters into a struggle between a manager of the Bavaria Movie Studios and a dangerous neo anarchist terrorist. It consists of six adventures that lead the characters through different parts of Munich. The finale takes place on the Oktoberfest.',
			gameDate: '2074',
			edition: 4,
			publisher: ['fanpro'],
			missing: true
		}
	],
	[
		'21008',
		{
			sku: ['21008'],
			category: 'misc',
			type: 'print',
			name: 'Shadowrun: Die 6. Welt',
			releaseDate: ['2005'],
			description: '',
			gameDate: '2069',
			edition: 4,
			publisher: ['fanpro'],
			missing: true,
			notes: 'This book was poublished in 2005 by Fanpro. It features a comprehensive look at the history, influence and mechanics of Shadowrun from 1989 to date. It includes a collection of articles on Shadowrun-related topics, short stories and a collector\'s guide listing all Shadowrun publications and novels in English and German.'
		}
	],
	[
		'23006',
		{
			sku: ['23006'],
			category: 'sourcebook',
			type: 'print',
			name: 'SOX',
			releaseDate: ['2007'],
			description: '',
			gameDate: '2072',
			edition: 4,
			publisher: ['fanpro'],
			missing: true,
			notes: '"SOX" covers a description of the Saar-Lorraine-Luxemburg containment zone and a related adventure ("Hoffnungsstrahlen", Rays of Hope). It is a French-German cooperation.'
		}
	],
	[
		'47000GX',
		{
			sku: ['47000GX'],
			category: 'sourcebook',
			type: 'digital',
			name: 'NetzstÃ¼cke (Machtspiele: Handbuch fÃ¼r Spione)',
			releaseDate: ['2012'],
			description: 'Die Schatten werden grÃ¶Ãer!\nÃber Hannover und die Machtspiele in der ADL ist noch lÃ¤ngst nicht alles gesagt. Und ehe sich groÃe VerÃ¤nderungen anbahnen, sollte man den Status Quo kennen. Wer verbirgt sich hinter der Daedalus-Gesellschaft? Wer sind die Schockwellenreiter? Und was kann man alles in Hannovers Club Nikita erleben - vor und hinter den Kulissen?\nNetzstÃ¼cke ist ein frei erhÃ¤ltlicher deutscher Zusatz zum Printbuch Machtspiele - Handbuch fÃ¼r Spione fÃ¼r Shadowrun 4. Neben einflussreichen Gruppen und Nebenakteuren auf dem politischen Parkett bietet es AbenteueraufhÃ¤nger und eine Reihe neuer Locations fÃ¼r die Allianzhauptstadt der deutschen LÃ¤nder.\nUnd denk immer daran Chummer - es kostet nichts, aber es ist nie umsonst.',
			gameDate: '2074',
			edition: 4,
			publisher: ['pegasus'],
			missing: true,
			notes: 'NetzstÃ¼cke is an expansion for the German version of Spy Games (Machtspiele). It features additional material for campaigns in Germany.'
		}
	],
	[
		'46095G',
		{
			sku: ['46095G', '46096G'],
			category: 'print',
			type: 'digital',
			name: 'Rhein-Ruhr-Megaplex',
			releaseDate: ['2011'],
			description: 'Rhein-Ruhr-Megaplex (Rhine Ruhr Megaplex) is a German Shadowrun sourcebook that provides detailed information about the Ruhr area and parts of the Rhineland.\nMain Topics of the book are:\n\t- Megaplex overview\n\t- A tour through the Megaplex areas\n\t- Culture\n\t- Saeder-Krupp\n\t- Powers and Organizations\n\t- Points of Interest\n\t- Maps, locations, and adventure hooks',
			gameDate: '2074',
			edition: 4,
			publisher: ['pegasus'],
			missing: true
		}
	],
	[
		'45210G',
		{
			sku: ['45210G'],
			category: 'sourcebook',
			type: 'print',
			name: 'ReisefÃ¼hrer in die deutschen Schatten',
			releaseDate: ['2012'],
			description: '',
			gameDate: '2074',
			edition: 4,
			publisher: ['pegasus'],
			missing: true,
			notes: 'German sourcebook for Shadowrun detailing various aspcets of shadowrunning in Germany, including organized crime, famous shadowrunners, possible targets and certain interesting regions.'
		}
	],
	[
		'45100G',
		{
			sku: ['45100G'],
			category: 'rulebook',
			type: 'digital',
			name: 'SchattenrÃ¼stzeug',
			releaseDate: ['2011'],
			description: 'Nie mehr unbewaffnet!\nIn die tiefen Schatten der Sechsten Welt sollte man nie unvorbereitet eintauchen: Eine Waffe ist immer gut. Zwei sind besser. Drei und ein Granatwerfer, ein Magier und ein Hacker â und es kann eigentlich kaum noch etwas schiefgehen.\nSchattenrÃ¼stzeug ist die ultimative Box fÃ¼r alle Runner und Spielleiter in Shadowrun. Es ergÃ¤nzt das Grundregelwerk zu Shadowrun 4 und enthÃ¤lt folgende Komponenten:\n\tÂ· Einen stabilen vierseitigen Spielleiterschirm mit allen spielrelevanten Informationen im Ãberblick.\n\tÂ· 4 vollfarbige Karten von Orten in den Sprawls der Sechsten Welt.\n\tÂ· Das Abenteuer âSchattenkriegâ, ein Shadowrun-EinfÃ¼hrungsabenteuer, das fÃ¼r den Spieleinstieg konzipiert ist, aber auch von Profis gespielt werden kann.\n\tÂ· Das Schattenwerkzeug, das neue Kontakte, Abenteuerbeispiele und âorte beschreibt und vorstellt. Zudem enthÃ¤lt es das CGHS, ein modulares System zur simplen und schnellen Erstellung von Spieler- und Nichtspielercharakteren, sowie Anatomie eines Shadowruns. Letzteres beschreibt einen typischen Shadowrun und bringt dem Spielleiter anhand dieses Runs gleichzeitig die Regeln, die Proben und die Systematik eines Abenteuers nahe.\n\tÂ· 6 vollfarbige ReferenzbÃ¶gen, die dem Spielleiter zusammen mit dem Spielleiterschirm lÃ¤stiges BlÃ¤ttern zu Kampfregeln und Probeabfolgen ersparen. So wird der Regelteil des Leitens ein Kinderspiel.\n\tÂ· Eine Tabellenzusammenstellung aller Tabellen aus Arsenal 2070, BodyTech, Runnerkompendium, StraÃenmagie und Vernetzt â unter anderem die ultimative Einkaufsliste fÃ¼r alle SchattenlÃ¤ufer.\n\tÂ· Den Masterindex, der sÃ¤mtliche SchlagwÃ¶rter fÃ¼r Grundregelwerk, Arsenal 2070, BodyTech, Runnerkompendium, StraÃenmagie und Vernetzt auflistet.\n\tÂ· Ein Poster mit der Skyline von Seattle.\n\tÂ· 3 Shadowrun-Aufkleber.\nMit dieser AusrÃ¼stung trifft das SchattenrÃ¼stzeug tief in das Herz jedes Shadowrunspiels â fÃ¼r flÃ¼ssigere Abenteuer, coolere Settings, spannendere Plots. Und es unterstÃ¼tzt die Runner im Spiel, damit sie enden wie die Profis: Reich oder tot.',
			gameDate: '2074',
			edition: 4,
			publisher: ['pegasus'],
			missing: true,
			notes: 'The (altered) German version of the Runner\'s Toolkit'
		}
	],
	[
		'23004',
		{
			sku: ['23004'],
			category: 'sourcebook',
			type: 'digital',
			name: 'SchattenstÃ¤dte',
			releaseDate: ['2006'],
			description: 'In den dunklen StraÃenschluchten der Megaplexe lockt das GeschÃ¤ft. Wo sich versteckte Unterschlupfe finden und Schieber illegale AuftrÃ¤ge fÃ¼r ihre Konzerne vermitteln, sind Shadowrunner zuhause. Von hier aus starten sie ihre geheimen Operationen und erleben Abenteuer in der Sechsten Welt.\nSchattenstÃ¤dte ist ein Hintergrundband fÃ¼r Shadowrun 4, in dem ein paar der wichtigsten Megaplexe beschrieben werden: Seattle, Hamburg und Hongkong. Sie alle eignen sich durch ihr einzigartiges Flair besonders gut als Hintergrund fÃ¼r eine klassische Shadowrun-Kampagne. Dieses Buch gibt umfassenden Ãberblick Ã¼ber verschiedene Stadtteile, interessante Orte und die MachtkÃ¤mpfe, die zwischen Politik, Konzernen, Syndikaten und StraÃengangs toben. Zudem sind Kurzdossiers zu Kapstadt, Caracas und Istanbul enthalten, sowie zahlreiche Abenteuerideen und Tipps, mit deren Hilfe man beliebige andere StÃ¤dte als SchattenstÃ¤dte verwenden kann.',
			gameDate: '2070',
			edition: 4,
			publisher: ['fanpro'],
			missing: true,
			notes: 'SchattenstÃ¤dte is the translation of Runner Havens with an added chapter on Hamburg in the shadows.'
		}
	],
	[
		'46045G',
		{
			sku: ['46045G'],
			category: 'sourcebook',
			type: 'digital',
			name: 'SchattenstÃ¤dte (Revised)',
			releaseDate: ['2006'],
			description: 'In den dunklen StraÃenschluchten der Megaplexe lockt das GeschÃ¤ft. Wo sich versteckte Unterschlupfe finden und Schieber illegale AuftrÃ¤ge fÃ¼r ihre Konzerne vermitteln, sind Shadowrunner zuhause. Von hier aus starten sie ihre geheimen Operationen und erleben Abenteuer in der Sechsten Welt.\nSchattenstÃ¤dte ist ein Hintergrundband fÃ¼r Shadowrun 4, in dem ein paar der wichtigsten Megaplexe beschrieben werden: Seattle, Hamburg, Hongkong und - neu in dieser Auflage - Marseille. Sie alle eignen sich durch ihr einzigartiges Flair besonders gut als Hintergrund fÃ¼r eine klassische Shadowrun-Kampagne. Dieses Buch gibt umfassenden Ãberblick Ã¼ber verschiedene Stadtteile, interessante Orte und die MachtkÃ¤mpfe, die zwischen Politik, Konzernen, Syndikaten und StraÃengangs toben. Zudem sind Kurzdossiers zu Kapstadt, Caracas und Istanbul enthalten, sowie zahlreiche Abenteuerideen und Tipps, mit deren Hilfe man beliebige andere StÃ¤dte als SchattenstÃ¤dte verwenden kann.\nDiese neue Auflage von SchattenstÃ¤dte ist fÃ¼r die beschriebenen Megaplexe aktualisiert bis zum Jahr 2072',
			gameDate: '2072',
			edition: 4,
			publisher: ['pegasus'],
			missing: true,
			notes: 'SchattenstÃ¤dte is the translation of Runner Havens with an added chapter on Hamburg in the shadows. The revised 2010 release by Pegasus also includes a translation of the chapter on marseilles from Capitales des ombres by French publisher BBE.'
		}
	],
	[
		'45047G',
		{
			sku: ['45047G'],
			category: 'sourcebook',
			type: 'print',
			name: 'State of the Art ADL',
			releaseDate: ['2017'],
			description: 'Modernste Waffentechnik, uralte Magie, neuste Mode-Trends, Fahrzeugtechnik von Autoduellisten und erwachte Wildnis dies alles kann man in der Allianz Deutscher LÃ¤nder finden. Und fÃ¼r einen Runner in diesen Breiten ist es Ã¼berlebenswichtig zu wissen, wo und wann man all dies findet. Denn es macht einen gravierenden Unterschied, ob man in die MÃ¼ndung der neusten Altmayr-Pistole schaut oder ihren Abzug am Finger hÃ¤lt. Ob die neusten Proteus-Wachcritter Jagd auf einen machen oder man selbst der JÃ¤ger ist. Oder ob man beim richtigen Schieber die neuste Drohne kauft, anstatt sich von ihr beim nÃ¤chsten Run erschieÃen zu lassen.\nState of the Art ADL ist ein AusrÃ¼stungsbuch fÃ¼r Shadowrun 5, das mit einem groÃen Haufen Spielzeug fÃ¼r Runner daherkommt. Es bietet neue Waffen, Archetypen, Fahrzeuge, Drohnen, Critter, magische Gruppen und Schutzgeister aus der Allianz Deutscher LÃ¤nder und beschreibt zudem die wichtigsten Spieler auf den unterschiedlichen MÃ¤rkten und ihre Schattenseiten in denen sich die Runner mit all dem neuen Kram eindecken kÃ¶nnen. Oder von ihm auffressen lassen.',
			gameDate: '2075',
			edition: 5,
			publisher: ['pegasus'],
			missing: true
		}
	],
	[
		'SR05',
		{
			sku: ['SR05'],
			category: 'sourcebook',
			type: 'digital',
			name: 'Capitales des ombres',
			releaseDate: ['2008'],
			description: 'Capitales des Ombres, le premier supplÃ©ment gÃ©ographique de Shadowrun, QuatriÃ¨me Ã©dition, prÃ©sente aux joueurs trois cancers urbains oÃ¹ rÃ¨gnent les Ombres : Hong Kong, Seattle et Marseille, en exclusivitÃ© dans la version franÃ§aise. Chaque ville est dÃ©crite en dÃ©tail du point de vue dâun shadowrunner, dans une perspective couvrant les thÃ¨mes essentiels : Ã©quilibre des pouvoirs, affaires corporatistes et monde de la pÃ¨gre, lieux importants, spÃ©cifi citÃ©s magiques et Ã©lÃ©ments propres Ã  chaque ville â le tout foisonnant dâidÃ©es et dâaccroches de scÃ©narios.\nQuatre autres citÃ©s chÃ¨res aux runners sont Ã©galement prÃ©sentÃ©es : Le Cap, Caracas, Hambourg et Istanbul, le tout accompagnÃ© de conseils au meneur de jeu lui permettant de transformer nâimporte quelle zone urbaine en paradis pour runners.',
			gameDate: '2072',
			edition: 4,
			publisher: ['blackbookeditions'],
			missing: true,
			notes: 'Capitales des ombres is the translation of Runner Havens with an added chapter on Marseilles in the shadows.'
		}
	],
	[
		'9638545496',
		{
			sku: ['9638545496'],
			category: 'sourcebook',
			type: 'print',
			name: 'ÃrnyÃ©k MagyarorszÃ¡g',
			releaseDate: ['1996'],
			description: '',
			gameDate: '2050',
			edition: 2,
			publisher: ['beholderkft'],
			missing: true,
			notes: 'Shadowrun Hungary sourcebook (Hungarian)'
		}
	],
	[
		'10727',
		{
			sku: ['10727'],
			category: 'sourcebook',
			type: 'print',
			name: 'Chrom & Dioxin',
			releaseDate: ['1996'],
			description: 'Tief in der Nacht, wenn der brave BÃ¼rger schlÃ¤ft, erwachen die geheimen Produktionsanlagen der Cons zum unheimlichem Leben. Und nur wenige wagen es, sich dort zu "informieren", wo allein die Anwesenheit tÃ¶dlich sein kann.\nAus dem Inhalt:\n\t- Timeline-Update 2054-2056\n\t- Neues aus dem Norden\n\t- Kirchenstaat Westphalen\n\t- Megaplex GroÃ-Frankfurt\n\t- Die Schweiz in den Schatten\n\t- Harware-Update\nChrom & Dioxin macht nun auch fÃ¼r Runner im deutschsprachigen Raum die 2056er spielbar. Mit vielen Informationen zu den neusten Entwicklungen in Politik, Wirtschaft und Technik. Ein besonderer Leckerbissen: Die Schweiz. Mit ihren vielen paranormalen Wesen und der rigiden Sicherheitspolitik eine Herausforderung fÃ¼r jeden SchattenlÃ¤ufer.\nEbenso enthalten sind Abschnitte Ã¼ber die LÃ¼neburger Heide im Norden Deutschlands sowie die Stadt Karlsruhe.',
			gameDate: '2056',
			edition: 2,
			publisher: ['fanpro'],
			missing: true,
			notes: 'Chrom & Dioxin succeeds in making the years 2054-2056 playable for german Runners, too. Filled with lots of information on the latest events and developments in politics, economy and technology, plus a special treat: the Switzerland. With its many paranormal beings and rigid security politics a challenge for every Runner. There are also sections dealing with the Lueneburg Heath in northern Germany and the city of Karlsruhe.'
		}
	],
	[
		'P2009A',
		{
			sku: ['P2009A'],
			category: 'mission',
			type: 'digital',
			name: 'Geben und Nehmen',
			releaseDate: ['2009'],
			description: 'Weihnachten 2070 steht vor der TÃ¼r und nicht zum ersten Mal fragt ihr euch, ob die ganze Stadt verrÃ¼ckt geworden ist. Die groÃe Werbeoffensive von DeMeKo hat bereits vor Wochen jedes vernÃ¼nftige MaÃ weit hinter sich gelassen und gleicht immer mehr einem wahnsinnigen GehirnwÃ¤schefeldzug. Kitschige Werbejingles donnern an jeder StraÃenecke aus den Lautsprechern, unterbrochen nur vom stÃ¤ndigen Ho-Ho-Ho der WeihnachtsmÃ¤nner. Armeen von Werbe-AROs bombardieren die Horden der EinkaufswÃ¼tigen mit SchnÃ¤ppchenangeboten und treiben sie wie hirntote Zombies durch die Ã¼berfÃ¼llten StraÃen und KanÃ¤le zu den Konsumtempeln.\nAber Rettung naht: Heiligabend steht kurz bevor. Nur noch wenige Tage, dann werdet ihr friedvolle sechs Monate ohne Weihnachtswerbung durchleben kÃ¶nnen. Bis der ganze Wahnsinn wieder von vorne beginnt...',
			gameDate: '2074',
			edition: 4,
			publisher: ['pegasus'],
			missing: true,
			notes: 'Winning entry of Pegasus\' 2009 adventure competition for Shadowrun. Subsequently released as a free pdf.'
		}
	]
]);
