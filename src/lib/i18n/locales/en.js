// English copy — the source of truth. Keys ending in `Html` (or `Tpl`) hold
// raw HTML / interpolation templates and are NOT escaped at render time; every
// other string is plain text and IS escaped. App-mockup chrome (game names,
// file paths, version tags, status chips, log entries) deliberately stays in
// English across all locales because it depicts the real, English app UI.

export default {
  nav: {
    brandAria: 'Checkpoint64 — home',
    links: {
      how: 'HOW IT WORKS',
      shelf: 'THE SHELF',
      features: 'FEATURES',
      creators: 'CREATORS',
      savings: 'SAVINGS',
      pricing: 'PRICING',
      faq: 'FAQ',
      blog: 'BLOG',
    },
    cta: 'DOWNLOAD',
    ctaAria: 'Download Checkpoint64',
    switcherAria: 'Choose language',
    menuAria: 'Menu',
  },

  hero: {
    h1Html: 'NEVER LOSE<br/>A SAVE <span class="accent">AGAIN.</span>',
    sub: 'Your saves, backed up automatically — and every version kept. Roll back a corrupted file, a bad night, or a regret. Co-op crews pass one world around like a cartridge, with a lock so nobody saves over anybody. Host on holiday? Take the lock and play on.',
    ctaPrimary: 'DOWNLOAD FREE',
    ctaPrimaryAria: 'Download Checkpoint64 for free',
    ctaSteam: 'DOWNLOAD ON STEAM',
    ctaSteamAria: 'Download Checkpoint64 on Steam',
    ctaSecondary: 'SEE IT WORK',
    ctaSecondaryAria: 'See how Checkpoint64 works',
    small: ['free plan, actually free', 'pay once for more space', 'no subscription, ever'],
  },

  problems: {
    tape: 'STUFF THAT REALLY HURTS',
    h2Html: 'WHAT THIS FIXES,<br/><span class="accent">BASICALLY.</span>',
    headingId: 'What this fixes',
    woes: [
      { stamp: '01:14 AM', text: 'the modpack updated and now your 200-hour minecraft world won’t load', tag: 'RIP' },
      { stamp: 'WED 6PM', text: 'your co-op friend played “just one quick session” solo and saved over the shared run', tag: 'OW' },
      { stamp: null, text: 'paying for a 24/7 server when your group only plays six hours a week', tag: 'BILL' },
      { stamp: 'SAT', text: 'host is on holiday — nobody else has the latest valheim world', tag: 'STUCK' },
    ],
  },

  how: {
    tape: 'HOW CHECKPOINT64 WORKS',
    h2Html: 'POINT IT AT A FOLDER.<br/><span class="accent">FORGET ABOUT IT.</span>',
    lede: 'Three steps, once. After that you never think about save files again — which is the whole point.',
    steps: [
      {
        label: '01 · UPLOAD',
        h3Html: 'HIT UPLOAD ↑',
        bodyHtml: 'Grab a snapshot of your save folder and send a copy to the cloud. Each upload becomes its own labelled <em>version</em> — version one of many.',
      },
      {
        label: '02 · AUTO-BACKUP',
        h3Html: 'FLIP AUTO ON',
        bodyHtml: 'Checkpoint64 checks your save folder every 30 seconds. If something changed, it waits for the game to finish writing, then uploads a fresh version on its own. Only the changed files get sent — the rest is skipped.',
      },
      {
        label: '03 · RESTORE',
        h3Html: 'ROLL IT BACK',
        bodyHtml: 'Click <b>Versions →</b> on any save to see every backup. Pick one and hit <b>Restore</b> — Checkpoint64 puts the files back and marks that version as the current one. Your 2am mistake becomes a 30-second fix.',
      },
    ],
    autoMeta: 'checks every 30 s · uploads only what changed',
  },

  shelf: {
    tape: 'A LOOK AT THE APP',
    hand: 'not a screenshot — live',
    h2Html: 'YOUR LIBRARY<br/>IS A <span class="accent">CARTRIDGE SHELF.</span>',
    lede: 'Every save is a cartridge. Same game, different runs? Same shelf, different carts.',
  },

  features: {
    tape: 'FEATURES',
    h2Html: "WHAT'S IN <span class=\"accent\">THE BOX.</span>",
    lede: 'Built by people who reload saves a lot. No fluff, no charge per person, no “powered by AI.” Just a save vault that works.',
    items: [
      { tag: 'VERSION HISTORY', title: 'EVERY UPLOAD\nIS A VERSION.', body: 'Scroll through every backup with file count, size, and what changed since last time. Hit Restore and the files go back on disk, marked as current — no guessing, no “final_v2_REAL” folders.' },
      { tag: 'CO-OP LOCKS', title: 'ONE PERSON\nHOLDS THE WORLD.', body: 'Games like Factorio, Valheim, and Satisfactory have one live world at a time. Whoever holds the lock uploads; everyone else downloads. Holder gone quiet? Locks expire on their own, and you can take over — with a warning, and a logbook entry so everyone knows.' },
      { tag: 'ONLY WHAT CHANGED', title: 'TINY\nUPLOADS.', body: 'Only the files that changed get uploaded — renamed files cost nothing extra. A 500 MB Minecraft world re-uploads as a few MB after a normal session, not the whole thing. Easy on your internet, easy on your storage.' },
      { tag: '140+ GAMES READY', title: 'SET UP IN\nSECONDS.', body: 'Presets for 140+ games — four flavours of modded Minecraft, Stardew, Skyrim, Palworld, Elden Ring — plus seven emulators. Pick which files count and skip the screenshots. If it writes saves to a folder, it works.' },
      { tag: 'SHARE CODES', title: 'ONE WORLD,\nWHOLE CROWD.', body: 'Running a community world? Mint a join code and anyone holding it can download your save — but never upload over it. Codes are capped and revocable, and read-only visitors don’t use up seats. (Pro)' },
      { tag: 'LOGBOOK', title: 'WHO DID WHAT,\nWHEN.', body: 'Every upload, restore, and lock-grab gets written down in your group’s logbook. Handy when your co-op partner blames you for the bad run.' },
    ],
  },

  logbook: {
    tape: 'LOGBOOK · LIVE',
    hand: 'shared with your group',
    h2Html: 'BLAME THE <span class="accent">RIGHT PERSON.</span>',
    lede: 'Everything anyone in your group does gets written down. Handy for co-op friends, modded servers, speedrun teams, and the classic “wait, who deleted that?”',
    eventsLabel: 'events',
    liveCaption: 'live · refresh on visit',
  },

  // For streamers / content creators (MARKETING.md §4.4). Expands the SHARE
  // CODES feature tile into an audience pitch: read-only "hosted access" join
  // codes (Pro-gated, shipped #60) let a creator hand their exact save to any
  // number of fans, who get download-only access and can never overwrite it.
  creators: {
    tape: 'FOR STREAMERS & CREATORS',
    hand: 'one code, every fan',
    h2Html: 'SHARE YOUR RUN<br/>WITH <span class="accent">THE WHOLE CHAT.</span>',
    lede: 'Got an audience? Hand them your exact save. Mint a read-only share code for any world: your 100% file, a challenge seed, last night’s cursed run. Drop it in your video description, and fans pull a perfect copy into their own library. They download it and play; they can never save over yours.',
    steps: [
      { label: '01 · MINT', h3Html: 'MAKE A CODE', body: 'Open the save, hit Hosted access, and mint a share code. Cap it at a number of uses, or leave it unlimited. Your call, and it takes a couple of seconds. (Pro plan.)' },
      { label: '02 · DROP THE LINK', h3Html: 'POST IT ANYWHERE', body: 'Put the code in your video description, your Discord, or a stream panel. Fans without the app yet? Share the link instead, and it opens a download page that walks them in.' },
      { label: '03 · THEY PLAY IT', h3Html: 'FANS GRAB YOUR SAVE', body: 'Fans paste the code and your world drops into their own library, read-only. They download and play your exact run, with no way to overwrite it.' },
    ],
    points: [
      'Always read-only, so fans can play your save but never change it',
      'Share with as many fans as you like, or cap the code and revoke it whenever',
      'Read-only fans don’t use up your team’s seats',
    ],
    proNoteHtml: 'Hosted share codes are part of <a href="#pricing">Pro</a>, built for creators, crews, and modding groups.',
  },

  // Steam reviews social-proof strip. The score description (e.g.
  // "Overwhelmingly Positive") and the game name come straight from Steam and
  // stay English across locales, like the app-mockup chrome. Reviews are
  // Checkpoint64's own, pulled live from its store page (see src/lib/steam.js).
  steam: {
    tape: 'WHAT PLAYERS SAY',
    hand: 'live from Steam',
    h2Html: 'STRAIGHT FROM <span class="accent">STEAM.</span>',
    lede: 'Real reviews from real players, pulled live from our Steam page.',
    countTpl: '{0} reviews',
    viewOnSteam: 'View on Steam',
    recommended: 'RECOMMENDED',
    hoursTpl: '{0} on record',
    helpfulTpl: '{0} found this helpful',
    anonymous: 'Steam player',
  },

  savings: {
    tape: 'DITCH THE DEDI',
    hand: 'do the math',
    h2Html: 'NO MORE 24/7 BOX<br/><span class="accent">YOU BARELY USE.</span>',
    lede: 'A dedicated server makes sense if twenty people are on it every night. For the average co-op group — four friends, a couple of evenings a week — you’re renting empty hours. Checkpoint64 covers the part you actually need (the world file, lock-passing, version history) for a one-time payment instead of a forever bill.',
    cards: [
      { tag: 'WHAT A DEDI COSTS', title: 'YOU PAY 24/7.', bodyTpl: 'A rented co-op server is around {0} for the popular games — {1}, {2}. Billed whether anyone logged in this week or not.' },
      { tag: 'WHAT YOU ACTUALLY USE', title: 'IT SITS IDLE.', bodyTpl: 'Four friends, two evenings a week, three hours each. That’s about six hours of play out of 168 in the week. Your dedi is empty for the other 96%.' },
      { tag: 'WHAT CHECKPOINT64 COSTS', title: 'PAY ONCE. DONE.', bodyTpl: 'One Lifetime payment and the cloud holds the world. Whoever wants to play grabs the lock, plays, and pushes it back. No box to keep warm.' },
    ],
    lineKeys: [
      'Server rental, 12 months',
      'Hours actually used (4 ppl)',
      'Hours nobody touched it',
      'Spent on idle uptime',
    ],
    receiptLabelTpl: '▮ RECEIPT · TYPICAL {0} DEDI',
    receiptYear: 'year one',
    receiptAria: 'Cost breakdown of a typical dedicated server billed monthly',
    totalLabel: 'What you’d save with Checkpoint64 Lifetime, year two onward',
    footTpl: 'Over five years that’s roughly <b>{0}</b> you keep. Or a new GPU, whichever you prefer. <a href="{1}">Read the full breakdown →</a>',
  },

  money: {
    perMonthShort: '/MO',
    aMonth: ' a month',
    aYear: ' a year',
    overFive: ' over five',
    perYear: ' / yr',
  },

  pricing: {
    tape: 'PRICING',
    h2Html: 'PICK YOUR<br/><span class="accent">CART.</span>',
    lede: 'Three ways to play it. Free is actually free — not a seven-day trial. Lifetime is pay-once. Pro is for crews who save together. No charge per person, no surprise fees, no rip-cords.',
    badge: '★ MOST CARTS',
    cards: [
      {
        tag: 'FREE', unit: 'no card required',
        tagline: 'big enough for Stardew, Hollow Knight, or a whole retro library',
        features: [
          'personal space + 1 team',
          'join up to 3 friends’ teams',
          '20 MiB cloud storage per space',
          'auto-backup + full version history',
          'co-op locks + logbook included',
        ],
        cta: 'GET FREE',
      },
      {
        tag: 'LIFETIME', unit: 'one-time, yours forever',
        tagline: 'pay once — your saves outlive your GPU',
        features: [
          'personal space + up to 3 teams',
          'join up to 5 friends’ teams',
          '1 GiB storage per space',
          'buy direct or on Steam',
          'no subscription, ever',
          'everything in Free, with room to breathe',
        ],
        cta: 'GET LIFETIME',
      },
      {
        tag: 'PRO', unit: 'one-time, yours forever',
        tagline: 'for crews, streamers, modding groups',
        features: [
          'personal space + up to 5 teams',
          'join up to 8 friends’ teams',
          '5 GiB storage per space',
          '25 seats per team (guaranteed minimum)',
          '100 versions / 90 days kept (guaranteed minimum)',
          'read-only share codes for your community',
          'priority bandwidth (2× the API throughput)',
        ],
        cta: 'GET PRO',
      },
    ],
  },

  download: {
    headlineSoonHtml: 'CHECKPOINT64 v1.0<br/>IS OUT.<br/><span class="invert">GRAB IT.</span>',
    headlineLiveHtml: 'CHECKPOINT64 v1.0<br/>IS OUT.<br/><span class="invert">GRAB IT.</span>',
    blurbSoon: 'Free download, free plan included. Grab it on Steam, or pull the latest installer straight from GitHub.',
    blurbLive: 'Free download, free plan included. Builds publish straight from GitHub — these buttons always point at the newest installer.',
    signoffSoon: 'free to try — the free plan is real',
    signoffLiveTpl: 'release notes & older builds: <a href="{0}">on GitHub</a>',
    comingSoon: 'coming soon',
    tileAriaLiveTpl: 'Download Checkpoint64 for {0} ({1})',
    tileAriaSoonTpl: 'Checkpoint64 for {0} — see releases on GitHub',
  },

  faq: {
    tape: 'FAQ',
    h2Html: 'FREQUENTLY <span class="accent">CHECKED.</span>',
    // `a` values are raw HTML; item index 3 uses {0} for the savings figure.
    items: [
      { q: "WHAT COUNTS AS A 'SAVE'?", a: 'Whatever your game writes to your hard drive. Checkpoint64 treats the files in a folder as one save and backs them up together. Presets for 140+ games (and seven emulators) set this up for you; for anything else, point at the folder and pick the files yourself.' },
      { q: 'DO YOU UPLOAD WHILE THE GAME IS RUNNING?', a: 'Yes, carefully. Checkpoint64 never locks your save files. It checks the folder every 30 seconds; if the game is mid-save it waits for things to go quiet and tries again — no broken files, no stutter. The app naps between checks, so you won’t notice it while playing.' },
      { q: 'WHAT IF MY CO-OP PARTNER OVERWRITES MY UPLOAD?', a: 'They can’t, on purpose. Only the person holding the lock can upload. To push their version they have to take the lock first — which warns you, and goes in the logbook for all to see. Worst case, your version is one Restore away in the history.' },
      { q: 'DO I STILL NEED A DEDICATED SERVER?', a: 'For most groups, no. The whole point of a dedicated server is keeping your world online when the host’s PC is off. Checkpoint64 covers about 90% of that for a one-time fee: whoever wants to play grabs the lock, plays their session, then pushes the save back. A typical co-op group saves {0} compared to renting a 24/7 server that sits idle 18 hours a day.' },
      { q: 'DOES THIS WORK FOR EMULATORS OR CONSOLE SAVES?', a: 'Emulators, absolutely — RetroArch, Dolphin, PCSX2, DuckStation, PPSSPP, RPCS3, and Cemu all have presets, so your save states finally get real version history. Console saves only work if you can get them onto a PC first. The app itself runs on Windows, macOS (Apple Silicon), and Linux.' },
      { q: 'WHAT DOES IT COST?', a: 'The free plan is real and stays free: 20 MiB, your own space plus one team. Lifetime is a one-time payment — 1 GiB per space, up to 3 teams, bought direct or through Steam. Pro is for big crews: 5 GiB per space, 5 teams, 25 seats each, read-only share codes. No charge per person on any tier.' },
      { q: 'CAN I USE IT TODAY?', a: 'Yes — v1.0 is out. It’s a free download for Windows, macOS (Apple Silicon), and Linux, and it’s on Steam too.' },
      { q: 'WHO CAN SEE MY SAVES?', a: 'Your teammates — and only the ones you invite. They see your display name, never your email. And your data stays yours: export everything as a zip whenever you like, and deleting your account actually deletes it (after a 7-day cooling-off period, in case of 2am regret).' },
    ],
  },

  consent: {
    title: 'Cookies',
    body: 'Google Analytics tells us which pages people actually read. It sets cookies, so it only runs if you say yes. Say no and the site works exactly the same.',
    link: 'Privacy policy',
    accept: 'Accept',
    reject: 'Reject',
  },

  footer: {
    blurb: 'A safe place for your big runs. Built by people who lost a 200-hour Factorio base and never got over it.',
    sign: 'made for me.',
    product: 'PRODUCT',
    resources: 'RESOURCES',
    company: 'COMPANY',
    links: {
      how: 'How it works',
      features: 'Features',
      pricing: 'Pricing',
      joinList: 'Download',
      changelog: 'Changelog',
      blog: 'Blog',
      discord: 'Discord',
      terms: 'Terms',
      privacy: 'Privacy',
      press: 'Press',
      cookies: 'Cookie settings',
    },
    ariaProduct: 'Product',
    ariaResources: 'Resources',
    ariaCompany: 'Company',
    changelogAria: 'Changelog on GitHub (opens in a new tab)',
    discordAria: 'Join the Checkpoint64 Discord (opens in a new tab)',
    copyTpl: '© {0} CHECKPOINT64 · ALL RIGHTS RESERVED',
    notAffiliated: 'NOT AFFILIATED WITH ANY GAME LISTED ABOVE',
  },

  meta: {
    skipLink: 'Skip to content',
    title: 'Checkpoint64 — Never Lose a Save Again, Solo or Co-op',
    description: 'Automatic cloud backup and full version history for PC game saves. Roll back corrupted saves and share co-op worlds with locks. Works with Minecraft, Stardew Valley, Elden Ring and 140+ games. Free download for Windows, Mac, Linux.',
    ogTitle: 'Checkpoint64 — Never Lose a Save Again, Solo or Co-op',
    ogDescription: 'Never lose a save again. Automatic backups, full version history, and co-op locks so friends can share worlds without overwriting each other. 140+ games ready. Free download — pay once for more space.',
    ogImageAlt: 'Checkpoint64 — never lose a save again. A retro cartridge shelf of game saves.',
    twitterTitle: 'Checkpoint64 — Never Lose a Save Again, Solo or Co-op',
    twitterDescription: 'Never lose a save again. Automatic cloud backups, full version history, co-op locks. 140+ games ready. Free download for Windows, Mac, Linux.',
    twitterImageAlt: 'Checkpoint64 — never lose a save again.',
    noscriptHtml: 'Heads-up — JavaScript is disabled, so the animated demo on this page won’t work. The rest of the content is fully visible above.',
  },

  jsonld: {
    orgDescription: 'Checkpoint64 makes a save-file backup tool for PC gamers — automatic cloud backups, full version history, and co-op locks so friends can share worlds without overwriting each other.',
    softwareDescription: 'Automatic cloud backup, full version history, and co-op locks for PC game saves. Free plan included; pay once for more space. Works with Minecraft, Stardew Valley, Skyrim, Palworld, Elden Ring, Factorio, Valheim, plus 140+ more games and 7 emulators out of the box.',
    featureList: [
      'Automatic background backups every 30 seconds',
      'Full version history with one-click restore',
      'Server-enforced co-op locks — one world holder at a time',
      'Deduplicated uploads — only the files that changed are sent',
      'Presets for 140+ games and 7 emulators',
      'Shared activity logbook for teams',
      'Read-only share codes for community worlds',
      'Pay-once Lifetime plan — no subscription required',
    ],
    howToName: 'How to automatically back up PC game saves with Checkpoint64',
    howToDescription: 'Set up automatic cloud backup and full version history for any PC game save in three steps.',
    howToSupply: [
      'A Windows, macOS, or Linux PC',
      'A game that writes its save to a folder on disk',
    ],
    howToTool: 'Checkpoint64 desktop app',
    howToSteps: [
      { name: 'Upload your save', text: 'Point Checkpoint64 at the folder your game writes saves to. Hit Upload to send a snapshot to the cloud — that becomes version one.' },
      { name: 'Turn on auto-backup', text: 'Flip auto-backup on. Checkpoint64 checks the folder every 30 seconds and uploads a fresh version whenever something changed. Only the files that changed are sent.' },
      { name: 'Restore any past version', text: 'Open Versions on any save to see the full history. Pick one and click Restore to roll back instantly — the files go back on disk and that version becomes current.' },
    ],
    // Plain-text FAQ for the FAQPage block. Mirrors the visible FAQ; index 3
    // takes the savings figure as {0}.
    faq: [
      { q: "What counts as a 'save'?", a: 'Whatever your game writes to your hard drive. Checkpoint64 treats the files in a folder as one save and backs them up together. Presets for 140+ games (and seven emulators) set this up for you; for anything else, point at the folder and pick the files yourself.' },
      { q: 'Do you upload while the game is running?', a: "Yes, carefully. Checkpoint64 never locks your save files. It checks the folder every 30 seconds; if the game is mid-save it waits for things to go quiet and tries again — no broken files, no stutter. The app naps between checks, so you won't notice it while playing." },
      { q: 'What if my co-op partner overwrites my upload?', a: "They can't, on purpose. Only the person holding the lock can upload. To push their version they have to take the lock first — which warns you, and goes in the logbook for all to see. Worst case, your version is one Restore away in the history." },
      { q: 'Do I still need a dedicated server?', a: "For most groups, no. The whole point of a dedicated server is keeping your world online when the host's PC is off. Checkpoint64 covers about 90% of that for a one-time fee: whoever wants to play grabs the lock, plays their session, then pushes the save back. A typical co-op group saves {0} compared to renting a 24/7 server that sits idle 18 hours a day." },
      { q: 'Does this work for emulators or console saves?', a: 'Emulators, absolutely — RetroArch, Dolphin, PCSX2, DuckStation, PPSSPP, RPCS3, and Cemu all have presets, so your save states finally get real version history. Console saves only work if you can get them onto a PC first. The app itself runs on Windows, macOS (Apple Silicon), and Linux.' },
      { q: 'What does it cost?', a: 'The free plan is real and stays free: 20 MiB, your own space plus one team. Lifetime is a one-time payment — 1 GiB per space, up to 3 teams, bought direct or through Steam. Pro is for big crews: 5 GiB per space, 5 teams, 25 seats each, read-only share codes. No charge per person on any tier.' },
      { q: 'Can I use it today?', a: 'Yes — v1.0 is out. It’s a free download for Windows, macOS (Apple Silicon), and Linux, and it’s on Steam too.' },
      { q: 'Who can see my saves?', a: 'Your teammates — and only the ones you invite. They see your display name, never your email. And your data stays yours: export everything as a zip whenever you like, and deleting your account actually deletes it (after a 7-day cooling-off period).' },
    ],
  },
}
