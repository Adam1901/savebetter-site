// German copy. Mirrors the key structure of en.js exactly. Keys ending in
// `Html`/`Tpl` hold raw HTML / interpolation templates (not escaped); place the
// <span class="accent"> / <br/> markup wherever the emphasis falls in German.
// App-mockup chrome stays English (see en.js).

export default {
  nav: {
    brandAria: 'Checkpoint64 — Startseite',
    links: {
      how: "SO GEHT'S",
      shelf: 'DAS REGAL',
      features: 'FUNKTIONEN',
      creators: 'CREATOR',
      savings: 'SPAREN',
      pricing: 'PREISE',
      faq: 'FAQ',
      blog: 'BLOG',
    },
    cta: 'DOWNLOAD',
    ctaAria: 'Checkpoint64 herunterladen',
    switcherAria: 'Sprache wählen',
    menuAria: 'Menü',
  },

  hero: {
    h1Html: 'NIE WIEDER EINEN<br/>SPIELSTAND <span class="accent">VERLIEREN.</span>',
    sub: 'Deine Spielstände, automatisch gesichert — und jede Version bleibt erhalten. Roll eine kaputte Datei, einen schlechten Abend oder einen Fehlgriff einfach zurück. Co-op-Crews reichen eine Welt weiter wie ein Modul, mit Sperre, damit niemand jemanden überschreibt. Host im Urlaub? Schnapp dir die Sperre und spiel weiter.',
    ctaPrimary: 'GRATIS LADEN',
    ctaPrimaryAria: 'Checkpoint64 kostenlos herunterladen',
    ctaSteam: 'AUF STEAM LADEN',
    ctaSteamAria: 'Checkpoint64 auf Steam herunterladen',
    ctaSecondary: 'IN AKTION SEHEN',
    ctaSecondaryAria: 'Sehen, wie Checkpoint64 funktioniert',
    small: ['Gratis-Plan, wirklich gratis', 'einmal zahlen für mehr Platz', 'niemals ein Abo'],
  },

  problems: {
    tape: 'WAS WIRKLICH WEHTUT',
    h2Html: 'WAS DAS LÖST,<br/><span class="accent">IM KERN.</span>',
    headingId: 'Was das löst',
    woes: [
      { stamp: '01:14 UHR', text: 'das modpack hat sich aktualisiert und deine 200-stunden-minecraft-welt lädt nicht mehr', tag: 'RIP' },
      { stamp: 'MI 18 UHR', text: 'dein co-op-kumpel hat „nur eine kurze runde" allein gespielt und den gemeinsamen run überschrieben', tag: 'AUTSCH' },
      { stamp: null, text: 'für einen 24/7-server zahlen, obwohl ihr nur sechs stunden pro woche spielt', tag: 'RECHNUNG' },
      { stamp: 'SA', text: 'host ist im urlaub — niemand sonst hat die aktuelle valheim-welt', tag: 'BLOCKIERT' },
    ],
  },

  how: {
    tape: 'SO ARBEITET CHECKPOINT64',
    h2Html: 'ZEIG AUF EINEN ORDNER.<br/><span class="accent">VERGISS IHN.</span>',
    lede: 'Drei Schritte, einmal. Danach denkst du nie wieder an Spielstand-Dateien — und genau darum geht es.',
    steps: [
      {
        label: '01 · HOCHLADEN',
        h3Html: 'AUF HOCHLADEN ↑',
        bodyHtml: 'Mach einen Schnappschuss deines Spielstand-Ordners und schick eine Kopie in die Cloud. Jeder Upload wird zu seiner eigenen, benannten <em>Version</em> — Version eins von vielen.',
      },
      {
        label: '02 · AUTO-BACKUP',
        h3Html: 'AUTO EINSCHALTEN',
        bodyHtml: 'Checkpoint64 prüft deinen Ordner alle 30 Sekunden. Hat sich etwas geändert, wartet es, bis das Spiel fertig geschrieben hat, und lädt dann von selbst eine neue Version hoch. Nur die geänderten Dateien werden gesendet — der Rest wird übersprungen.',
      },
      {
        label: '03 · WIEDERHERSTELLEN',
        h3Html: 'ROLL ZURÜCK',
        bodyHtml: 'Klick bei jedem Spielstand auf <b>Versionen →</b> und sieh jedes Backup. Wähl eines und drück <b>Wiederherstellen</b> — Checkpoint64 legt die Dateien zurück und markiert diese Version als die aktuelle. Dein 2-Uhr-nachts-Fehler wird zur 30-Sekunden-Reparatur.',
      },
    ],
    autoMeta: 'prüft alle 30 s · lädt nur Änderungen hoch',
  },

  shelf: {
    tape: 'EIN BLICK IN DIE APP',
    hand: 'kein screenshot — live',
    h2Html: 'DEINE BIBLIOTHEK<br/>IST EIN <span class="accent">MODUL-REGAL.</span>',
    lede: 'Jeder Spielstand ist ein Modul. Gleiches Spiel, andere Runs? Gleiches Regal, andere Module.',
  },

  features: {
    tape: 'FUNKTIONEN',
    h2Html: 'WAS <span class="accent">DRINSTECKT.</span>',
    lede: 'Gebaut von Leuten, die viel zurückladen. Kein Geschwafel, keine Gebühr pro Person, kein „powered by AI". Nur ein Spielstand-Tresor, der funktioniert.',
    items: [
      { tag: 'VERSIONSVERLAUF', title: 'JEDER UPLOAD\nIST EINE VERSION.', body: 'Scroll durch jedes Backup mit Dateianzahl, Größe und allem, was sich seit dem letzten Mal geändert hat. Drück Wiederherstellen, und die Dateien landen wieder auf der Platte, als aktuell markiert — kein Raten, keine „final_v2_ECHT"-Ordner.' },
      { tag: 'CO-OP-SPERREN', title: 'EINER HÄLT\nDIE WELT.', body: 'Spiele wie Factorio, Valheim und Satisfactory haben immer nur eine aktive Welt. Wer die Sperre hält, lädt hoch; alle anderen laden herunter. Halter abgetaucht? Sperren laufen von selbst ab, und du kannst übernehmen — mit Vorwarnung und Logbuch-Eintrag, damit es alle wissen.' },
      { tag: 'NUR ÄNDERUNGEN', title: 'WINZIGE\nUPLOADS.', body: 'Nur die geänderten Dateien werden hochgeladen — umbenannte Dateien kosten nichts extra. Eine 500-MB-Minecraft-Welt lädt nach einer normalen Session ein paar MB neu hoch, nicht das Ganze. Schont dein Internet, schont deinen Speicher.' },
      { tag: '60+ SPIELE BEREIT', title: 'IN SEKUNDEN\nEINGERICHTET.', body: 'Vorlagen für 60+ Spiele — vier Spielarten von modded Minecraft, Stardew, Skyrim, Palworld, Elden Ring — plus sieben Emulatoren. Wähl, welche Dateien zählen, und überspring die Screenshots. Wenn es in einen Ordner speichert, funktioniert es.' },
      { tag: 'TEILEN-CODES', title: 'EINE WELT,\nGANZE CROWD.', body: 'Du betreibst eine Community-Welt? Erstell einen Beitritts-Code, und jeder damit kann deine Welt herunterladen — aber nie überschreiben. Codes sind begrenzt und widerrufbar, und Nur-Lese-Gäste belegen keine Plätze. (Pro)' },
      { tag: 'LOGBUCH', title: 'WER, WAS\nUND WANN.', body: 'Jeder Upload, jede Wiederherstellung und jedes Sperren-Schnappen landet im Logbuch deiner Gruppe. Praktisch, wenn dein co-op-Partner dir den schlechten Run anhängt.' },
    ],
  },

  logbook: {
    tape: 'LOGBUCH · LIVE',
    hand: 'mit deiner gruppe geteilt',
    h2Html: 'GIB DEM <span class="accent">RICHTIGEN DIE SCHULD.</span>',
    lede: 'Alles, was jemand in deiner Gruppe tut, wird notiert. Praktisch für co-op-Freunde, modded Server, Speedrun-Teams und das klassische „moment, wer hat das gelöscht?"',
    eventsLabel: 'Ereignisse',
    liveCaption: 'live · aktualisiert beim besuch',
  },

  creators: {
    tape: 'FÜR STREAMER & CREATOR',
    hand: 'ein code, alle fans',
    h2Html: 'TEILE DEINEN RUN<br/>MIT DEM <span class="accent">GANZEN CHAT.</span>',
    lede: 'Du hast ein Publikum? Gib ihm genau deinen Spielstand. Erstell einen Nur-Lese-Code für jede Welt: deine 100-%-Datei, einen Challenge-Seed, den verfluchten Run von gestern Nacht. Pack ihn in deine Videobeschreibung, und Fans ziehen sich eine perfekte Kopie in ihre eigene Bibliothek. Sie laden sie herunter und spielen; deine überschreiben können sie nie.',
    steps: [
      { label: '01 · ERSTELLEN', h3Html: 'CODE MACHEN', body: 'Öffne den Spielstand, tippe auf Gehosteter Zugang und erstell einen Code. Begrenze die Nutzungen, oder lass ihn unbegrenzt. Wie du willst. Dauert ein paar Sekunden. (Pro-Tarif.)' },
      { label: '02 · LINK TEILEN', h3Html: 'ÜBERALL POSTEN', body: 'Pack den Code in deine Videobeschreibung, deinen Discord oder ein Stream-Panel. Fans noch ohne App? Teile stattdessen den Link, und er öffnet eine Download-Seite, die sie reinführt.' },
      { label: '03 · SIE SPIELEN IHN', h3Html: 'FANS HOLEN DEINEN STAND', body: 'Fans fügen den Code ein, und deine Welt landet in ihrer eigenen Bibliothek, nur lesend. Sie laden deinen Run herunter und spielen ihn, ohne Möglichkeit, ihn zu überschreiben.' },
    ],
    points: [
      'Immer nur lesend: Fans spielen deinen Stand, ändern können sie ihn nie',
      'Teile mit beliebig vielen Fans, oder begrenze den Code und widerrufe ihn jederzeit',
      'Nur-Lese-Fans belegen keine Plätze deines Teams',
    ],
    proNoteHtml: 'Gehostete Teilen-Codes gehören zu <a href="#pricing">Pro</a>, gemacht für Creator, Crews und Modding-Gruppen.',
  },

  savings: {
    tape: 'SPAR DIR DEN DEDI',
    hand: 'rechne nach',
    h2Html: 'KEINE 24/7-KISTE MEHR,<br/><span class="accent">DIE KAUM LÄUFT.</span>',
    lede: 'Ein dedizierter Server lohnt sich, wenn zwanzig Leute jeden Abend drauf sind. Für die typische co-op-Gruppe — vier Freunde, ein paar Abende die Woche — mietest du leere Stunden. Checkpoint64 deckt genau den Teil ab, den du wirklich brauchst (die Weltdatei, das Weitergeben der Sperre, den Versionsverlauf) — für eine einmalige Zahlung statt einer Dauerrechnung.',
    cards: [
      { tag: 'WAS EIN DEDI KOSTET', title: 'DU ZAHLST 24/7.', bodyTpl: 'Ein gemieteter co-op-Server kostet bei den beliebten Spielen rund {0} — {1}, {2}. Berechnet, egal ob diese Woche jemand drin war oder nicht.' },
      { tag: 'WAS DU WIRKLICH NUTZT', title: 'ER STEHT STILL.', bodyTpl: 'Vier Freunde, zwei Abende die Woche, je drei Stunden. Das sind etwa sechs Spielstunden von 168 in der Woche. Die anderen 96 % steht dein Dedi leer.' },
      { tag: 'WAS CHECKPOINT64 KOSTET', title: 'EINMAL ZAHLEN. FERTIG.', bodyTpl: 'Eine Lifetime-Zahlung, und die Cloud hält die Welt. Wer spielen will, schnappt sich die Sperre, spielt und schiebt sie zurück. Keine Kiste, die warmgehalten werden muss.' },
    ],
    lineKeys: [
      'Servermiete, 12 Monate',
      'Tatsächlich genutzte Stunden (4 Pers.)',
      'Stunden, in denen ihn keiner anrührte',
      'Für Leerlauf ausgegeben',
    ],
    receiptLabelTpl: '▮ QUITTUNG · TYPISCHER {0}-DEDI',
    receiptYear: 'jahr eins',
    receiptAria: 'Kostenaufstellung eines typischen, monatlich abgerechneten dedizierten Servers',
    totalLabel: 'Was du mit Checkpoint64 Lifetime ab Jahr zwei sparst',
    footTpl: 'Über fünf Jahre sind das grob <b>{0}</b>, die du behältst. Oder eine neue GPU, ganz wie du magst. <a href="{1}">Lies die ganze Rechnung →</a>',
  },

  money: {
    perMonthShort: '/MON',
    aMonth: ' pro Monat',
    aYear: ' pro Jahr',
    overFive: ' über fünf Jahre',
    perYear: ' / Jahr',
  },

  pricing: {
    tape: 'PREISE',
    h2Html: 'WÄHLE DEIN<br/><span class="accent">MODUL.</span>',
    lede: 'Drei Arten zu spielen. Gratis ist wirklich gratis — kein Sieben-Tage-Test. Lifetime ist einmal zahlen. Pro ist für Crews, die zusammen sichern. Keine Gebühr pro Person, keine Überraschungskosten. Die endgültigen Preise werden noch festgezurrt — lass deine E-Mail da, und du erfährst es zuerst.',
    badge: '★ TOP-WAHL',
    cards: [
      {
        tag: 'GRATIS', unit: 'keine Karte nötig',
        tagline: 'groß genug für Stardew, Hollow Knight oder eine ganze Retro-Bibliothek',
        features: [
          'persönlicher Bereich + 1 Team',
          '20 MiB Cloud-Speicher pro Bereich',
          'Auto-Backup + voller Versionsverlauf',
          'co-op-Sperren + Logbuch inklusive',
          'tritt beliebig vielen Teams von Freunden bei',
        ],
        cta: 'GRATIS HOLEN',
      },
      {
        tag: 'LIFETIME', unit: 'einmalig, für immer deins',
        tagline: 'einmal zahlen — deine Spielstände überleben deine GPU',
        features: [
          'persönlicher Bereich + bis zu 3 Teams',
          '1 GiB Speicher pro Bereich',
          'direkt oder über Steam kaufen',
          'niemals ein Abo',
          'alles aus Gratis, mit Luft nach oben',
        ],
        cta: 'BENACHRICHTIGE MICH',
      },
      {
        tag: 'PRO', unit: 'monatlich, jederzeit kündbar',
        tagline: 'für Crews, Streamer, Modding-Gruppen',
        features: [
          'persönlicher Bereich + bis zu 5 Teams',
          '5 GiB Speicher pro Bereich',
          '25 Plätze pro Team (garantiertes Minimum)',
          '100 Versionen / 90 Tage aufbewahrt (garantiertes Minimum)',
          'Nur-Lese-Teilen-Codes für deine Community',
          'priorisierte Bandbreite (2× API-Durchsatz)',
        ],
        cta: 'BENACHRICHTIGE MICH',
      },
    ],
    tbc: 'OFFEN',
    notify: {
      text: 'Die endgültigen Preise kommen mit v1. Lass deine E-Mail da, und wir melden uns am selben Tag — Frühentschlossene bekommen den besten Deal.',
      button: 'BENACHRICHTIGE MICH',
    },
    emailPlaceholder: 'du@beispiel.com',
    emailLabel: 'E-Mail-Adresse',
    formAria: 'Mich über die Checkpoint64-Preise benachrichtigen',
  },

  download: {
    headlineSoonHtml: 'BALD DA.<br/>KOMM AUF DIE<br/><span class="invert">LISTE.</span>',
    headlineLiveHtml: 'DER FRÜHE BUILD<br/>IST DRAUSSEN.<br/><span class="invert">HOL IHN DIR.</span>',
    blurbSoon: 'Wir polieren noch. Lass deine E-Mail da, wähl, worauf du spielst, und wir sagen Bescheid, sobald es so weit ist.',
    blurbLive: 'Kostenloser Download, Gratis-Plan inklusive. Builds erscheinen direkt über GitHub — diese Buttons zeigen immer auf den neuesten Installer.',
    signoffSoon: 'kein spam, eine e-mail zum start',
    signoffLiveTpl: 'release-notes & ältere builds: <a href="{0}">auf GitHub</a>',
    comingSoon: 'bald',
    notifyButton: 'MELDEN',
    emailLabel: 'E-Mail-Adresse',
    emailPlaceholder: 'du@beispiel.com',
    formAria: 'Mich benachrichtigen, wenn Checkpoint64 v1 erscheint',
    tileAriaLiveTpl: 'Checkpoint64 für {0} herunterladen ({1})',
    tileAriaSoonTpl: 'Checkpoint64 für {0} — Releases auf GitHub ansehen',
  },

  faq: {
    tape: 'FAQ',
    h2Html: 'HÄUFIG <span class="accent">GEPRÜFT.</span>',
    items: [
      { q: 'WAS ZÄHLT ALS „SPIELSTAND"?', a: 'Alles, was dein Spiel auf die Festplatte schreibt. Checkpoint64 behandelt die Dateien in einem Ordner als einen Spielstand und sichert sie gemeinsam. Vorlagen für 60+ Spiele (und sieben Emulatoren) richten das für dich ein; für alles andere zeigst du auf den Ordner und wählst die Dateien selbst.' },
      { q: 'LADET IHR HOCH, WÄHREND DAS SPIEL LÄUFT?', a: 'Ja, behutsam. Checkpoint64 sperrt deine Spielstand-Dateien nie. Es prüft den Ordner alle 30 Sekunden; speichert das Spiel gerade, wartet es, bis Ruhe ist, und versucht es erneut — keine kaputten Dateien, kein Ruckeln. Zwischen den Prüfungen döst die App, du merkst sie beim Spielen nicht.' },
      { q: 'WAS, WENN MEIN CO-OP-PARTNER MEINEN UPLOAD ÜBERSCHREIBT?', a: 'Das geht nicht, mit Absicht. Nur wer die Sperre hält, kann hochladen. Wer seine Version pushen will, muss erst die Sperre übernehmen — das warnt dich und landet für alle sichtbar im Logbuch. Schlimmster Fall: Deine Version ist im Verlauf nur ein Wiederherstellen entfernt.' },
      { q: 'BRAUCHE ICH NOCH EINEN DEDIZIERTEN SERVER?', a: 'Für die meisten Gruppen nein. Der ganze Sinn eines dedizierten Servers ist, deine Welt online zu halten, wenn der PC des Hosts aus ist. Checkpoint64 deckt davon etwa 90 % für eine einmalige Gebühr ab: Wer spielen will, schnappt sich die Sperre, spielt seine Session und schiebt den Spielstand zurück. Eine typische co-op-Gruppe spart {0} gegenüber einem 24/7-Server, der 18 Stunden am Tag leer steht.' },
      { q: 'FUNKTIONIERT DAS MIT EMULATOREN ODER KONSOLEN-SPIELSTÄNDEN?', a: 'Emulatoren, absolut — RetroArch, Dolphin, PCSX2, DuckStation, PPSSPP, RPCS3 und Cemu haben alle Vorlagen, deine Save-States bekommen also endlich echten Versionsverlauf. Konsolen-Spielstände funktionieren nur, wenn du sie erst auf einen PC bekommst. Die App selbst läuft auf Windows, macOS (Apple Silicon) und Linux.' },
      { q: 'WAS KOSTET ES?', a: 'Der Gratis-Plan ist echt und bleibt gratis: 20 MiB, dein eigener Bereich plus ein Team. Lifetime ist eine Einmalzahlung — 1 GiB pro Bereich, bis zu 3 Teams, direkt oder über Steam gekauft. Pro ist für große Crews: 5 GiB pro Bereich, 5 Teams, je 25 Plätze, Nur-Lese-Teilen-Codes. Auf keiner Stufe Gebühr pro Person. Die endgültigen Zahlen kommen mit v1 — komm auf die Liste und sichere dir den Early-Bird-Preis.' },
      { q: 'KANN ICH ES HEUTE SCHON NUTZEN?', a: 'Ja — der frühe Build ist ab sofort gratis für Windows, macOS (Apple Silicon) und Linux verfügbar. v1 und der Steam-Release kommen später dieses Jahr; die Liste bekommt genau eine E-Mail am Tag, an dem sie da sind.' },
      { q: 'WER KANN MEINE SPIELSTÄNDE SEHEN?', a: 'Deine Teamkollegen — und nur die, die du einlädst. Sie sehen deinen Anzeigenamen, nie deine E-Mail. Und deine Daten gehören dir: Exportiere jederzeit alles als Zip, und Konto löschen heißt wirklich löschen (nach 7 Tagen Bedenkzeit, falls dich nachts um zwei die Reue packt).' },
    ],
  },

  footer: {
    blurb: 'Ein sicherer Ort für deine großen Runs. Gebaut von Leuten, die eine 200-Stunden-Factorio-Basis verloren und es nie verwunden haben.',
    sign: 'für mich gemacht.',
    product: 'PRODUKT',
    resources: 'RESSOURCEN',
    company: 'UNTERNEHMEN',
    links: {
      how: "So geht's",
      features: 'Funktionen',
      pricing: 'Preise',
      joinList: 'Download',
      changelog: 'Changelog',
      blog: 'Blog',
      discord: 'Discord',
      terms: 'AGB',
      privacy: 'Datenschutz',
    },
    ariaProduct: 'Produkt',
    ariaResources: 'Ressourcen',
    ariaCompany: 'Unternehmen',
    changelogAria: 'Changelog auf GitHub (öffnet in neuem Tab)',
    discordAria: 'Dem Checkpoint64-Discord beitreten (öffnet in neuem Tab)',
    copyTpl: '© {0} CHECKPOINT64 · ALLE RECHTE VORBEHALTEN',
    notAffiliated: 'NICHT MIT DEN OBEN GENANNTEN SPIELEN VERBUNDEN',
  },

  forms: {
    enterEmail: 'Bitte gib deine E-Mail-Adresse ein.',
    sending: 'Wird gesendet…',
    success: 'Du bist auf der Liste — wir mailen dir am Tag des Starts.',
    error: 'Etwas ist schiefgelaufen — bitte versuch es gleich noch einmal.',
  },

  meta: {
    skipLink: 'Zum Inhalt springen',
    title: 'Checkpoint64 — Nie wieder einen Spielstand verlieren, solo oder co-op',
    description: 'Automatisches Cloud-Backup und voller Versionsverlauf für PC-Spielstände. Roll kaputte Spielstände zurück und teil co-op-Welten per Sperre. Funktioniert mit Minecraft, Stardew Valley, Elden Ring und 60+ Spielen. Gratis-Download für Windows, Mac, Linux.',
    ogTitle: 'Checkpoint64 — Nie wieder einen Spielstand verlieren, solo oder co-op',
    ogDescription: 'Nie wieder einen Spielstand verlieren. Automatische Backups, voller Versionsverlauf und co-op-Sperren, damit Freunde Welten teilen, ohne sich gegenseitig zu überschreiben. 60+ Spiele bereit. Gratis-Download — einmal zahlen für mehr Platz.',
    ogImageAlt: 'Checkpoint64 — nie wieder einen Spielstand verlieren. Ein Retro-Modulregal voller Spielstände.',
    twitterTitle: 'Checkpoint64 — Nie wieder einen Spielstand verlieren, solo oder co-op',
    twitterDescription: 'Nie wieder einen Spielstand verlieren. Automatische Cloud-Backups, voller Versionsverlauf, co-op-Sperren. 60+ Spiele bereit. Gratis-Download für Windows, Mac, Linux.',
    twitterImageAlt: 'Checkpoint64 — nie wieder einen Spielstand verlieren.',
    noscriptHtml: 'Hinweis — JavaScript ist deaktiviert, daher funktionieren das Anmeldeformular und die animierte Demo auf dieser Seite nicht. Der restliche Inhalt ist oben vollständig sichtbar.',
  },

  jsonld: {
    orgDescription: 'Checkpoint64 entwickelt ein Spielstand-Backup-Tool für PC-Gamer — automatische Cloud-Backups, voller Versionsverlauf und co-op-Sperren, damit Freunde Welten teilen, ohne sich gegenseitig zu überschreiben.',
    softwareDescription: 'Automatisches Cloud-Backup, voller Versionsverlauf und co-op-Sperren für PC-Spielstände. Gratis-Plan inklusive; einmal zahlen für mehr Platz. Funktioniert von Haus aus mit Minecraft, Stardew Valley, Skyrim, Palworld, Elden Ring, Factorio, Valheim sowie 60+ weiteren Spielen und 7 Emulatoren.',
    featureList: [
      'Automatische Hintergrund-Backups alle 30 Sekunden',
      'Voller Versionsverlauf mit Ein-Klick-Wiederherstellung',
      'Serverseitig erzwungene co-op-Sperren — immer nur ein Welt-Halter',
      'Deduplizierte Uploads — nur die geänderten Dateien werden gesendet',
      'Vorlagen für 60+ Spiele und 7 Emulatoren',
      'Geteiltes Aktivitäts-Logbuch für Teams',
      'Nur-Lese-Teilen-Codes für Community-Welten',
      'Lifetime-Plan mit Einmalzahlung — kein Abo nötig',
    ],
    howToName: 'PC-Spielstände automatisch mit Checkpoint64 sichern',
    howToDescription: 'Richte in drei Schritten automatisches Cloud-Backup und vollen Versionsverlauf für jeden PC-Spielstand ein.',
    howToSupply: [
      'Ein Windows-, macOS- oder Linux-PC',
      'Ein Spiel, das seinen Spielstand in einen Ordner auf der Festplatte schreibt',
    ],
    howToTool: 'Checkpoint64 Desktop-App',
    howToSteps: [
      { name: 'Lade deinen Spielstand hoch', text: 'Zeig Checkpoint64 auf den Ordner, in den dein Spiel speichert. Drück Hochladen, um einen Schnappschuss in die Cloud zu senden — das wird Version eins.' },
      { name: 'Schalte Auto-Backup ein', text: 'Schalte Auto-Backup ein. Checkpoint64 prüft den Ordner alle 30 Sekunden und lädt eine neue Version hoch, sobald sich etwas geändert hat. Nur die geänderten Dateien werden gesendet.' },
      { name: 'Stelle jede frühere Version wieder her', text: 'Öffne bei jedem Spielstand „Versionen", um den ganzen Verlauf zu sehen. Wähl eine und klick Wiederherstellen, um sofort zurückzurollen — die Dateien landen wieder auf der Platte, und diese Version wird aktuell.' },
    ],
    faq: [
      { q: 'Was zählt als „Spielstand"?', a: 'Alles, was dein Spiel auf die Festplatte schreibt. Checkpoint64 behandelt die Dateien in einem Ordner als einen Spielstand und sichert sie gemeinsam. Vorlagen für 60+ Spiele (und sieben Emulatoren) richten das für dich ein; für alles andere zeigst du auf den Ordner und wählst die Dateien selbst.' },
      { q: 'Ladet ihr hoch, während das Spiel läuft?', a: 'Ja, behutsam. Checkpoint64 sperrt deine Spielstand-Dateien nie. Es prüft den Ordner alle 30 Sekunden; speichert das Spiel gerade, wartet es, bis Ruhe ist, und versucht es erneut — keine kaputten Dateien, kein Ruckeln. Zwischen den Prüfungen döst die App, du merkst sie beim Spielen nicht.' },
      { q: 'Was, wenn mein co-op-Partner meinen Upload überschreibt?', a: 'Das geht nicht, mit Absicht. Nur wer die Sperre hält, kann hochladen. Wer seine Version pushen will, muss erst die Sperre übernehmen — das warnt dich und landet für alle sichtbar im Logbuch. Schlimmster Fall: Deine Version ist im Verlauf nur ein Wiederherstellen entfernt.' },
      { q: 'Brauche ich noch einen dedizierten Server?', a: 'Für die meisten Gruppen nein. Der ganze Sinn eines dedizierten Servers ist, deine Welt online zu halten, wenn der PC des Hosts aus ist. Checkpoint64 deckt davon etwa 90 % für eine einmalige Gebühr ab: Wer spielen will, schnappt sich die Sperre, spielt seine Session und schiebt den Spielstand zurück. Eine typische co-op-Gruppe spart {0} gegenüber einem 24/7-Server, der 18 Stunden am Tag leer steht.' },
      { q: 'Funktioniert das mit Emulatoren oder Konsolen-Spielständen?', a: 'Emulatoren, absolut — RetroArch, Dolphin, PCSX2, DuckStation, PPSSPP, RPCS3 und Cemu haben alle Vorlagen, deine Save-States bekommen also endlich echten Versionsverlauf. Konsolen-Spielstände funktionieren nur, wenn du sie erst auf einen PC bekommst. Die App selbst läuft auf Windows, macOS (Apple Silicon) und Linux.' },
      { q: 'Was kostet es?', a: 'Der Gratis-Plan ist echt und bleibt gratis: 20 MiB, dein eigener Bereich plus ein Team. Lifetime ist eine Einmalzahlung — 1 GiB pro Bereich, bis zu 3 Teams, direkt oder über Steam gekauft. Pro ist für große Crews: 5 GiB pro Bereich, 5 Teams, je 25 Plätze, Nur-Lese-Teilen-Codes. Auf keiner Stufe Gebühr pro Person. Die endgültigen Zahlen kommen mit v1 — komm auf die Liste und sichere dir den Early-Bird-Preis.' },
      { q: 'Kann ich es heute schon nutzen?', a: 'Ja — der frühe Build ist ab sofort gratis für Windows, macOS (Apple Silicon) und Linux verfügbar. v1 und der Steam-Release kommen später dieses Jahr; die Liste bekommt genau eine E-Mail am Tag, an dem sie da sind.' },
      { q: 'Wer kann meine Spielstände sehen?', a: 'Deine Teamkollegen — und nur die, die du einlädst. Sie sehen deinen Anzeigenamen, nie deine E-Mail. Und deine Daten gehören dir: Exportiere jederzeit alles als Zip, und Konto löschen heißt wirklich löschen (nach 7 Tagen Bedenkzeit).' },
    ],
  },
}
