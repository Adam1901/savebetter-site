// Knowledge-graph identities for the catalog games — the `sameAs` targets on the
// VideoGame entity that each /saves/<slug>/ page declares itself `about`.
//
// Why this exists: a save-location page is *about* a game, and nothing in the
// markup used to say so. Wikidata Q-IDs are what Google reconciles entities
// against, so they come first; the Wikipedia article and Steam store page are
// corroborating links, not substitutes.
//
// Hand-verified on purpose, and deliberately NOT generated at build time. A
// wrong sameAs points Google at the wrong entity, which is worse than having
// none — a plain name search really does resolve "Stellaris" to a 1995 game
// rather than the 2016 Paradox one, and that one was caught here. Every Q-ID
// below was resolved from Wikidata and then cross-checked the other way: take
// the entity's own Steam app id (P1733), ask Steam's store API for that app,
// and confirm the name it returns is the same game. The few with no `steam`
// aren't sold there (Minecraft, Hytale, a DS title) and were confirmed against
// their English Wikipedia article instead.
//
// Not every catalog game has an entry, and that's fine — one without just
// renders no `about` block. The emulators are excluded by design (they're
// SoftwareApplication, not VideoGame), as is anything whose identity couldn't
// be confirmed both ways.
//
// Adding one: find the Wikidata item, confirm its Steam app id resolves to the
// same game on the store, then add it here. Never guess a Q-ID.
export const GAME_ENTITIES = {
  "7-days-to-die": { wikidata: "Q14753828", wikipedia: "https://en.wikipedia.org/wiki/7_Days_to_Die", steam: "251570" },
  "abiotic-factor": { wikidata: "Q126692853", wikipedia: "https://en.wikipedia.org/wiki/Abiotic_Factor", steam: "427410" },
  "ac-black-flag": { wikidata: "Q6052688", wikipedia: "https://en.wikipedia.org/wiki/Assassin%27s_Creed_IV%3A_Black_Flag", steam: "242050" },
  "ac-mirage": { wikidata: "Q113675008", wikipedia: "https://en.wikipedia.org/wiki/Assassin%27s_Creed_Mirage", steam: "3035570" },
  "ac-odyssey": { wikidata: "Q54617566", wikipedia: "https://en.wikipedia.org/wiki/Assassin%27s_Creed_Odyssey", steam: "812140" },
  "ac-origins": { wikidata: "Q30138024", wikipedia: "https://en.wikipedia.org/wiki/Assassin%27s_Creed_Origins", steam: "582160" },
  "ac-shadows": { wikidata: "Q117716202", wikipedia: "https://en.wikipedia.org/wiki/Assassin%27s_Creed_Shadows", steam: "3159330" },
  "ac-syndicate": { wikidata: "Q18602166", wikipedia: "https://en.wikipedia.org/wiki/Assassin%27s_Creed_Syndicate", steam: "368500" },
  "ac-unity": { wikidata: "Q15983778", wikipedia: "https://en.wikipedia.org/wiki/Assassin%27s_Creed_Unity", steam: "289650" },
  "ac-valhalla": { wikidata: "Q92464687", wikipedia: "https://en.wikipedia.org/wiki/Assassin%27s_Creed_Valhalla", steam: "2208920" },
  "alchemy-factory": { wikidata: "Q135079037", steam: "3669570" },
  "anno-1800": { wikidata: "Q52432849", wikipedia: "https://en.wikipedia.org/wiki/Anno_1800", steam: "916440" },
  aska: { wikidata: "Q126325314", steam: "1898300" },
  astroneer: { wikidata: "Q28044889", wikipedia: "https://en.wikipedia.org/wiki/Astroneer", steam: "361420" },
  "avatar-frontiers-of-pandora": { wikidata: "Q107208649", wikipedia: "https://en.wikipedia.org/wiki/Avatar%3A_Frontiers_of_Pandora", steam: "2840770" },
  bellwright: { wikidata: "Q125948811", steam: "1812450" },
  bg3: { wikidata: "Q64441774", wikipedia: "https://en.wikipedia.org/wiki/Baldur%27s_Gate_3", steam: "1086940" },
  "big-walk": { wikidata: "Q123698935", wikipedia: "https://en.wikipedia.org/wiki/Big_Walk", steam: "1478500" },
  "black-mesa": { wikidata: "Q211229", wikipedia: "https://en.wikipedia.org/wiki/Black_Mesa_(video_game)", steam: "362890" },
  calyx: { wikidata: "Q135062150", steam: "3211850" },
  "castle-story": { wikidata: "Q572098", wikipedia: "https://en.wikipedia.org/wiki/Castle_Story", steam: "227860" },
  "cities-skylines": { wikidata: "Q18149274", wikipedia: "https://en.wikipedia.org/wiki/Cities%3A_Skylines", steam: "255710" },
  civ6: { wikidata: "Q24050047", wikipedia: "https://en.wikipedia.org/wiki/Civilization_VI", steam: "289070" },
  ck3: { wikidata: "Q71701894", wikipedia: "https://en.wikipedia.org/wiki/Crusader_Kings_III", steam: "1158310" },
  "core-keeper": { wikidata: "Q111226203", wikipedia: "https://en.wikipedia.org/wiki/Core_Keeper", steam: "1621690" },
  "cult-of-the-lamb": { wikidata: "Q108273566", wikipedia: "https://en.wikipedia.org/wiki/Cult_of_the_Lamb", steam: "1313140" },
  "cyberpunk-2077": { wikidata: "Q3182559", wikipedia: "https://en.wikipedia.org/wiki/Cyberpunk_2077", steam: "1091500" },
  "dark-souls-3": { wikidata: "Q20112508", wikipedia: "https://en.wikipedia.org/wiki/Dark_Souls_III", steam: "374320" },
  "dave-the-diver": { wikidata: "Q114995908", wikipedia: "https://en.wikipedia.org/wiki/Dave_the_Diver", steam: "1868140" },
  "disco-elysium": { wikidata: "Q71693825", wikipedia: "https://en.wikipedia.org/wiki/Disco_Elysium", steam: "632470" },
  "dishonored-2": { wikidata: "Q20095751", wikipedia: "https://en.wikipedia.org/wiki/Dishonored_2", steam: "403640" },
  "dont-starve-together": { wikidata: "Q22344573", steam: "322330" },
  dos2: { wikidata: "Q20899735", wikipedia: "https://en.wikipedia.org/wiki/Divinity%3A_Original_Sin_II", steam: "435150" },
  "dyson-sphere-program": { wikidata: "Q104882972", wikipedia: "https://en.wikipedia.org/wiki/Dyson_Sphere_Program", steam: "1366540" },
  "elden-ring": { wikidata: "Q64826862", wikipedia: "https://en.wikipedia.org/wiki/Elden_Ring", steam: "1245620" },
  enshrouded: { wikidata: "Q122914994", wikipedia: "https://en.wikipedia.org/wiki/Enshrouded", steam: "1203620" },
  factorio: { wikidata: "Q16972008", wikipedia: "https://en.wikipedia.org/wiki/Factorio", steam: "427520" },
  "fallout-nv": { wikidata: "Q753749", wikipedia: "https://en.wikipedia.org/wiki/Fallout%3A_New_Vegas", steam: "22380" },
  fallout4: { wikidata: "Q10493813", wikipedia: "https://en.wikipedia.org/wiki/Fallout_4", steam: "377160" },
  "far-cry-3": { wikidata: "Q796529", wikipedia: "https://en.wikipedia.org/wiki/Far_Cry_3", steam: "220240" },
  "far-cry-4": { wikidata: "Q15992359", wikipedia: "https://en.wikipedia.org/wiki/Far_Cry_4", steam: "298110" },
  "far-cry-5": { wikidata: "Q30015130", wikipedia: "https://en.wikipedia.org/wiki/Far_Cry_5", steam: "552520" },
  "far-cry-6": { wikidata: "Q97120062", wikipedia: "https://en.wikipedia.org/wiki/Far_Cry_6", steam: "2369390" },
  "far-cry-new-dawn": { wikidata: "Q59536524", wikipedia: "https://en.wikipedia.org/wiki/Far_Cry_New_Dawn", steam: "939960" },
  "far-cry-primal": { wikidata: "Q21072291", wikipedia: "https://en.wikipedia.org/wiki/Far_Cry_Primal", steam: "371660" },
  frostpunk: { wikidata: "Q50356175", wikipedia: "https://en.wikipedia.org/wiki/Frostpunk", steam: "323190" },
  "ghost-recon-breakpoint": { wikidata: "Q63675773", wikipedia: "https://en.wikipedia.org/wiki/Tom_Clancy%27s_Ghost_Recon_Breakpoint", steam: "2231380" },
  "ghost-recon-wildlands": { wikidata: "Q20155365", wikipedia: "https://en.wikipedia.org/wiki/Tom_Clancy%27s_Ghost_Recon_Wildlands", steam: "460930" },
  grounded: { wikidata: "Q96418509", wikipedia: "https://en.wikipedia.org/wiki/Grounded_(video_game)", steam: "962130" },
  "gta-v": { wikidata: "Q17452", wikipedia: "https://en.wikipedia.org/wiki/Grand_Theft_Auto_V", steam: "271590" },
  hades: { wikidata: "Q59756366", wikipedia: "https://en.wikipedia.org/wiki/Hades_(video_game)", steam: "1145360" },
  "hollow-knight": { wikidata: "Q29300592", wikipedia: "https://en.wikipedia.org/wiki/Hollow_Knight", steam: "367520" },
  humanitz: { wikidata: "Q122732769", steam: "1766060" },
  hytale: { wikidata: "Q60187866", wikipedia: "https://en.wikipedia.org/wiki/Hytale" },
  icarus: { wikidata: "Q109564559", wikipedia: "https://en.wikipedia.org/wiki/Icarus_(video_game)", steam: "1149460" },
  "immortals-fenyx-rising": { wikidata: "Q64549401", wikipedia: "https://en.wikipedia.org/wiki/Immortals_Fenyx_Rising", steam: "2221920" },
  kenshi: { wikidata: "Q60770258", wikipedia: "https://en.wikipedia.org/wiki/Kenshi_(video_game)", steam: "233860" },
  "kingdom-come": { wikidata: "Q15408545", wikipedia: "https://en.wikipedia.org/wiki/Kingdom_Come%3A_Deliverance", steam: "286860" },
  "kingdoms-reborn": { wikidata: "Q122825964", steam: "1307890" },
  "kirby-super-star-ultra": { wikidata: "Q1132456", wikipedia: "https://en.wikipedia.org/wiki/Kirby_Super_Star_Ultra" },
  "mass-effect-le": { wikidata: "Q101246186", wikipedia: "https://en.wikipedia.org/wiki/Mass_Effect_Legendary_Edition", steam: "1328670" },
  "medieval-dynasty": { wikidata: "Q99710515", wikipedia: "https://en.wikipedia.org/wiki/Medieval_Dynasty", steam: "1129580" },
  "metro-exodus": { wikidata: "Q30238508", wikipedia: "https://en.wikipedia.org/wiki/Metro_Exodus", steam: "412020" },
  minecraft: { wikidata: "Q49740", wikipedia: "https://en.wikipedia.org/wiki/Minecraft" },
  "minecraft-curseforge": { wikidata: "Q49740", wikipedia: "https://en.wikipedia.org/wiki/Minecraft" },
  "minecraft-ftb": { wikidata: "Q49740", wikipedia: "https://en.wikipedia.org/wiki/Minecraft" },
  "minecraft-modrinth": { wikidata: "Q49740", wikipedia: "https://en.wikipedia.org/wiki/Minecraft" },
  "minecraft-pinecone": { wikidata: "Q49740", wikipedia: "https://en.wikipedia.org/wiki/Minecraft" },
  "minecraft-prism": { wikidata: "Q49740", wikipedia: "https://en.wikipedia.org/wiki/Minecraft" },
  "monster-hunter-rise": { wikidata: "Q99441852", wikipedia: "https://en.wikipedia.org/wiki/Monster_Hunter_Rise", steam: "1446780" },
  "monster-hunter-wilds": { wikidata: "Q123699158", wikipedia: "https://en.wikipedia.org/wiki/Monster_Hunter_Wilds", steam: "2246340" },
  "monster-hunter-world": { wikidata: "Q30252256", wikipedia: "https://en.wikipedia.org/wiki/Monster_Hunter%3A_World", steam: "582010" },
  necesse: { wikidata: "Q112264825", steam: "1169040" },
  "no-mans-sky": { wikidata: "Q15297043", wikipedia: "https://en.wikipedia.org/wiki/No_Man%27s_Sky", steam: "275850" },
  oblivion: { wikidata: "Q49607", wikipedia: "https://en.wikipedia.org/wiki/The_Elder_Scrolls_IV%3A_Oblivion", steam: "22330" },
  "oxygen-not-included": { wikidata: "Q28232693", wikipedia: "https://en.wikipedia.org/wiki/Oxygen_Not_Included", steam: "457140" },
  palworld: { wikidata: "Q113989188", wikipedia: "https://en.wikipedia.org/wiki/Palworld", steam: "1623730" },
  "planet-crafter": { wikidata: "Q111371070", wikipedia: "https://en.wikipedia.org/wiki/The_Planet_Crafter", steam: "1284190" },
  "prince-of-persia-lost-crown": { wikidata: "Q119224900", wikipedia: "https://en.wikipedia.org/wiki/Prince_of_Persia%3A_The_Lost_Crown", steam: "2751000" },
  "prison-architect": { wikidata: "Q7245729", wikipedia: "https://en.wikipedia.org/wiki/Prison_Architect", steam: "233450" },
  "project-zomboid": { wikidata: "Q3603390", wikipedia: "https://en.wikipedia.org/wiki/Project_Zomboid", steam: "108600" },
  raft: { wikidata: "Q55084497", wikipedia: "https://en.wikipedia.org/wiki/Raft_(video_game)", steam: "648800" },
  "rainbow-six-siege": { wikidata: "Q17183996", wikipedia: "https://en.wikipedia.org/wiki/Tom_Clancy%27s_Rainbow_Six_Siege", steam: "359550" },
  "riders-republic": { wikidata: "Q99316640", wikipedia: "https://en.wikipedia.org/wiki/Riders_Republic", steam: "2290180" },
  rimworld: { wikidata: "Q19581568", wikipedia: "https://en.wikipedia.org/wiki/RimWorld", steam: "294100" },
  "roadside-research": { wikidata: "Q136905133", steam: "3643170" },
  romestead: { wikidata: "Q135024808", steam: "1805320" },
  "runescape-dragonwilds": { wikidata: "Q133765634", wikipedia: "https://en.wikipedia.org/wiki/RuneScape%3A_Dragonwilds", steam: "1374490" },
  rvthereyet: { wikidata: "Q136593509", wikipedia: "https://en.wikipedia.org/wiki/RV_There_Yet%3F", steam: "3949040" },
  satisfactory: { wikidata: "Q62049495", wikipedia: "https://en.wikipedia.org/wiki/Satisfactory", steam: "526870" },
  "schedule-1": { wikidata: "Q133695442", wikipedia: "https://en.wikipedia.org/wiki/Schedule_I_(video_game)", steam: "3164500" },
  "scrap-mechanic": { wikidata: "Q55084488", wikipedia: "https://en.wikipedia.org/wiki/Scrap_Mechanic", steam: "387990" },
  "scriptorium-master-of-manuscripts": { wikidata: "Q129170266", wikipedia: "https://en.wikipedia.org/wiki/Scriptorium%3A_Master_of_Manuscripts", steam: "3119540" },
  sekiro: { wikidata: "Q54906424", wikipedia: "https://en.wikipedia.org/wiki/Sekiro%3A_Shadows_Die_Twice", steam: "814380" },
  "shapez-2-factory": { wikidata: "Q124262235", wikipedia: "https://en.wikipedia.org/wiki/Shapez_2", steam: "2162800" },
  "sims-4": { wikidata: "Q12579896", wikipedia: "https://en.wikipedia.org/wiki/The_Sims_4", steam: "1222670" },
  "skyrim-se": { wikidata: "Q31602948", steam: "489830" },
  "sons-of-the-forest": { wikidata: "Q110379185", wikipedia: "https://en.wikipedia.org/wiki/Sons_of_the_Forest", steam: "1326470" },
  soulmask: { wikidata: "Q126100588", steam: "2646460" },
  "south-park-stick-of-truth": { wikidata: "Q1707918", wikipedia: "https://en.wikipedia.org/wiki/South_Park%3A_The_Stick_of_Truth", steam: "213670" },
  "space-engineers": { wikidata: "Q15269265", wikipedia: "https://en.wikipedia.org/wiki/Space_Engineers", steam: "244850" },
  "splinter-cell-blacklist": { wikidata: "Q1955277", wikipedia: "https://en.wikipedia.org/wiki/Tom_Clancy%27s_Splinter_Cell%3A_Blacklist", steam: "235600" },
  "stalker-cop": { wikidata: "Q788762", wikipedia: "https://en.wikipedia.org/wiki/S.T.A.L.K.E.R.%3A_Call_of_Pripyat", steam: "41700" },
  "star-wars-outlaws": { wikidata: "Q119361001", wikipedia: "https://en.wikipedia.org/wiki/Star_Wars_Outlaws", steam: "2842040" },
  stardew: { wikidata: "Q23013817", wikipedia: "https://en.wikipedia.org/wiki/Stardew_Valley", steam: "413150" },
  starrupture: { wikidata: "Q123860846", steam: "1631270" },
  stationeers: { wikidata: "Q124074335", steam: "544550" },
  stellaris: { wikidata: "Q20829312", wikipedia: "https://en.wikipedia.org/wiki/Stellaris_(video_game)", steam: "281990" },
  subnautica: { wikidata: "Q21039915", wikipedia: "https://en.wikipedia.org/wiki/Subnautica", steam: "264710" },
  "subnautica-2": { wikidata: "Q124464991", wikipedia: "https://en.wikipedia.org/wiki/Subnautica_2", steam: "1962700" },
  "suicide-squad-kill-the-justice-league": { wikidata: "Q98142979", wikipedia: "https://en.wikipedia.org/wiki/Suicide_Squad%3A_Kill_the_Justice_League", steam: "315210" },
  sunkenland: { wikidata: "Q122825510", steam: "2080690" },
  "supermarket-simulator": { wikidata: "Q135045142", steam: "2670630" },
  terraria: { wikidata: "Q332697", wikipedia: "https://en.wikipedia.org/wiki/Terraria", steam: "105600" },
  "the-crew-2": { wikidata: "Q30715994", wikipedia: "https://en.wikipedia.org/wiki/The_Crew_2", steam: "646910" },
  "the-last-caretaker": { wikidata: "Q132851232", wikipedia: "https://en.wikipedia.org/wiki/The_Last_Caretaker", steam: "1783560" },
  "the-long-dark": { wikidata: "Q18085691", wikipedia: "https://en.wikipedia.org/wiki/The_Long_Dark", steam: "305620" },
  "twisted-tower": { wikidata: "Q122977766", steam: "1575990" },
  "v-rising": { wikidata: "Q112055534", wikipedia: "https://en.wikipedia.org/wiki/V_Rising", steam: "1604030" },
  valheim: { wikidata: "Q105100327", wikipedia: "https://en.wikipedia.org/wiki/Valheim", steam: "892970" },
  "vintage-story": { wikidata: "Q104637457", wikipedia: "https://en.wikipedia.org/wiki/Vintage_Story" },
  "watch-dogs": { wikidata: "Q1371726", wikipedia: "https://en.wikipedia.org/wiki/Watch_Dogs_(video_game)", steam: "243470" },
  "watch-dogs-2": { wikidata: "Q24455756", wikipedia: "https://en.wikipedia.org/wiki/Watch_Dogs_2", steam: "447040" },
  "watch-dogs-legion": { wikidata: "Q64534648", wikipedia: "https://en.wikipedia.org/wiki/Watch_Dogs%3A_Legion", steam: "2239550" },
  windrose: { wikidata: "Q135056447", wikipedia: "https://en.wikipedia.org/wiki/Windrose_(video_game)", steam: "3041230" },
  witcher3: { wikidata: "Q4267401", wikipedia: "https://en.wikipedia.org/wiki/The_Witcher_3%3A_Wild_Hunt", steam: "292030" },
}

// The `about` node for a page covering `game`. Both the generated /saves/ pages
// and the hand-written guides use it, so it lives here with the data rather than
// in either renderer — importing it from one into the other would make the two
// render modules circular.
//
// `about`, not `mainEntity`: these pages are *about* the game, they aren't the
// game's own page. Games with no verified entity return undefined, which
// JSON.stringify drops from the emitted JSON-LD.
export function aboutGame(game) {
  const e = GAME_ENTITIES[game.slug]
  if (!e) return undefined
  return {
    '@type': 'VideoGame',
    name: game.displayName,
    sameAs: [
      `https://www.wikidata.org/wiki/${e.wikidata}`,
      e.wikipedia,
      e.steam && `https://store.steampowered.com/app/${e.steam}/`,
    ].filter(Boolean),
  }
}

// The titles worth spending internal-link equity on. The /saves/ related-links
// block used to be purely alphabetical, which handed Elden Ring's inbound links
// to Enshrouded and Don't Starve by accident of spelling; these get linked from
// every other save-location page instead. Ordered by search demand, not A–Z.
// Keep it short — the point is concentration, and a list of everything is a
// list of nothing.
export const POPULAR_SLUGS = [
  'minecraft',
  'stardew',
  'elden-ring',
  'skyrim-se',
  'valheim',
  'palworld',
  'terraria',
  'bg3',
  'project-zomboid',
  'satisfactory',
  'factorio',
  'rimworld',
]
