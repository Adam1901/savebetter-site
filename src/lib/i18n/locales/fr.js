// French copy. Mirrors the key structure of en.js exactly. Keys ending in
// `Html`/`Tpl` hold raw HTML / interpolation templates (not escaped); place the
// <span class="accent"> / <br/> markup wherever the emphasis falls in French.
// App-mockup chrome stays English (see en.js).

export default {
  nav: {
    brandAria: 'Checkpoint64 — accueil',
    links: {
      how: 'COMMENT ÇA MARCHE',
      shelf: "L'ÉTAGÈRE",
      features: 'FONCTIONS',
      creators: 'CRÉATEURS',
      savings: 'ÉCONOMIES',
      pricing: 'TARIFS',
      faq: 'FAQ',
      blog: 'BLOG',
    },
    cta: 'TÉLÉCHARGER',
    ctaAria: 'Télécharger Checkpoint64',
    switcherAria: 'Choisir la langue',
    menuAria: 'Menu',
  },

  hero: {
    h1Html: 'NE PERDEZ PLUS<br/>JAMAIS UNE <span class="accent">SAUVEGARDE.</span>',
    sub: "Vos sauvegardes, protégées automatiquement — et chaque version conservée. Revenez en arrière après un fichier corrompu, une mauvaise soirée ou un regret. En co-op, le monde passe de main en main comme une cartouche, avec un verrou pour que personne n'écrase personne. L'hôte est en vacances ? Prenez le verrou et continuez.",
    ctaPrimary: 'TÉLÉCHARGER GRATUIT',
    ctaPrimaryAria: 'Télécharger Checkpoint64 gratuitement',
    ctaSteam: 'TÉLÉCHARGER SUR STEAM',
    ctaSteamAria: 'Télécharger Checkpoint64 sur Steam',
    ctaSecondary: 'VOIR EN ACTION',
    ctaSecondaryAria: 'Voir comment fonctionne Checkpoint64',
    small: ['plan gratuit, vraiment gratuit', "payez une fois pour plus d'espace", "jamais d'abonnement"],
  },

  problems: {
    tape: 'CE QUI FAIT VRAIMENT MAL',
    h2Html: 'CE QUE ÇA RÈGLE,<br/><span class="accent">EN GROS.</span>',
    headingId: 'Ce que ça règle',
    woes: [
      { stamp: '01:14', text: 'le modpack a été mis à jour et votre monde minecraft de 200 heures ne charge plus', tag: 'RIP' },
      { stamp: 'MER 18 H', text: 'votre pote en co-op a joué « juste une petite session » en solo et a écrasé la partie commune', tag: 'AÏE' },
      { stamp: null, text: 'payer un serveur 24/7 alors que votre groupe ne joue que six heures par semaine', tag: 'FACTURE' },
      { stamp: 'SAM', text: "l'hôte est en vacances — personne d'autre n'a le dernier monde valheim", tag: 'BLOQUÉ' },
    ],
  },

  how: {
    tape: 'COMMENT FONCTIONNE CHECKPOINT64',
    h2Html: 'POINTEZ UN DOSSIER.<br/><span class="accent">OUBLIEZ-LE.</span>',
    lede: "Trois étapes, une fois. Ensuite vous ne pensez plus jamais aux fichiers de sauvegarde — et c'est exactement le but.",
    steps: [
      {
        label: '01 · ENVOYER',
        h3Html: 'CLIQUEZ ENVOYER ↑',
        bodyHtml: "Prenez un instantané de votre dossier de sauvegarde et envoyez-en une copie dans le cloud. Chaque envoi devient sa propre <em>version</em> nommée — la version un parmi beaucoup d'autres.",
      },
      {
        label: '02 · AUTO-BACKUP',
        h3Html: "ACTIVEZ L'AUTO",
        bodyHtml: "Checkpoint64 vérifie votre dossier toutes les 30 secondes. Quelque chose a changé ? Il attend que le jeu finisse d'écrire, puis envoie une nouvelle version tout seul. Seuls les fichiers modifiés sont transmis — le reste est ignoré.",
      },
      {
        label: '03 · RESTAURER',
        h3Html: 'REVENEZ EN ARRIÈRE',
        bodyHtml: "Cliquez sur <b>Versions →</b> sur n'importe quelle sauvegarde pour voir tous les backups. Choisissez-en un et cliquez sur <b>Restaurer</b> — Checkpoint64 remet les fichiers en place et marque cette version comme l'actuelle. Votre bêtise de 2 h du matin devient une réparation de 30 secondes.",
      },
    ],
    autoMeta: 'vérifie toutes les 30 s · n’envoie que ce qui a changé',
  },

  shelf: {
    tape: "UN APERÇU DE L'APPLI",
    hand: 'pas une capture — en direct',
    h2Html: 'VOTRE LUDOTHÈQUE<br/>EST UNE <span class="accent">ÉTAGÈRE À CARTOUCHES.</span>',
    lede: 'Chaque sauvegarde est une cartouche. Même jeu, parties différentes ? Même étagère, cartouches différentes.',
  },

  features: {
    tape: 'FONCTIONS',
    h2Html: "CE QU'IL Y A <span class=\"accent\">DANS LA BOÎTE.</span>",
    lede: "Conçu par des gens qui rechargent beaucoup leurs parties. Sans blabla, sans frais par personne, sans « propulsé par l'IA ». Juste un coffre à sauvegardes qui fonctionne.",
    items: [
      { tag: 'HISTORIQUE DES VERSIONS', title: 'CHAQUE ENVOI\nEST UNE VERSION.', body: "Parcourez chaque backup avec son nombre de fichiers, sa taille et ce qui a changé depuis la dernière fois. Cliquez sur Restaurer : les fichiers reviennent sur le disque, marqués comme actuels — fini les dossiers « final_v2_VRAI »." },
      { tag: 'VERROUS CO-OP', title: 'UNE PERSONNE\nTIENT LE MONDE.', body: "Des jeux comme Factorio, Valheim et Satisfactory n'ont qu'un monde actif à la fois. Celui qui tient le verrou envoie ; les autres téléchargent. Le détenteur a disparu ? Les verrous expirent tout seuls, et vous pouvez prendre le relais — avec un avertissement, et une ligne dans le journal pour que tout le monde le sache." },
      { tag: 'SEULEMENT CE QUI CHANGE', title: 'ENVOIS\nMINUSCULES.', body: "Seuls les fichiers modifiés sont envoyés — les fichiers renommés ne coûtent rien de plus. Un monde Minecraft de 500 Mo se ré-envoie en quelques Mo après une session normale, pas en entier. Doux pour votre connexion, doux pour votre stockage." },
      { tag: '75+ JEUX PRÊTS', title: 'CONFIGURÉ EN\nQUELQUES SECONDES.', body: "Des préréglages pour 75+ jeux — quatre variantes de Minecraft moddé, Stardew, Skyrim, Palworld, Elden Ring — plus sept émulateurs. Choisissez les fichiers qui comptent et sautez les captures d'écran. Si ça sauvegarde dans un dossier, ça marche." },
      { tag: 'CODES DE PARTAGE', title: 'UN MONDE,\nTOUTE UNE FOULE.', body: "Vous animez un monde communautaire ? Générez un code d'accès : quiconque l'a peut télécharger votre monde — mais jamais écrire dessus. Les codes sont plafonnés et révocables, et les visiteurs en lecture seule n'occupent pas de places. (Pro)" },
      { tag: 'JOURNAL DE BORD', title: 'QUI A FAIT QUOI,\nET QUAND.', body: "Chaque envoi, restauration et prise de verrou est noté dans le journal de votre groupe. Pratique quand votre partenaire de co-op vous accuse de la mauvaise partie." },
    ],
  },

  logbook: {
    tape: 'JOURNAL · EN DIRECT',
    hand: 'partagé avec votre groupe',
    h2Html: 'ACCUSEZ LA <span class="accent">BONNE PERSONNE.</span>',
    lede: "Tout ce que fait quelqu'un de votre groupe est noté. Pratique pour les amis en co-op, les serveurs moddés, les équipes de speedrun et le classique « attends, qui a supprimé ça ? »",
    eventsLabel: 'événements',
    liveCaption: 'en direct · actualisé à la visite',
  },

  creators: {
    tape: 'POUR STREAMERS & CRÉATEURS',
    hand: 'un code, tous les fans',
    h2Html: 'PARTAGEZ VOTRE RUN<br/>AVEC <span class="accent">TOUT LE CHAT.</span>',
    lede: 'Vous avez un public ? Donnez-lui votre sauvegarde exacte. Générez un code en lecture seule pour n’importe quel monde : votre fichier à 100 %, une seed de défi, le run maudit d’hier soir. Glissez-le dans la description de votre vidéo, et vos fans récupèrent une copie parfaite dans leur propre bibliothèque. Ils la téléchargent et y jouent ; jamais ils ne pourront écrire sur la vôtre.',
    steps: [
      { label: '01 · GÉNÉRER', h3Html: 'CRÉER UN CODE', body: 'Ouvrez la sauvegarde, appuyez sur Accès hébergé et générez un code. Plafonnez le nombre d’utilisations ou laissez-le illimité, à vous de voir. Quelques secondes suffisent. (Formule Pro.)' },
      { label: '02 · PARTAGER LE LIEN', h3Html: 'POSTEZ-LE PARTOUT', body: 'Mettez le code dans la description de votre vidéo, votre Discord ou un panneau de stream. Des fans sans l’app ? Partagez le lien, et il ouvre une page de téléchargement qui les guide.' },
      { label: '03 · ILS Y JOUENT', h3Html: 'LES FANS L’OBTIENNENT', body: 'Les fans collent le code et votre monde arrive dans leur propre bibliothèque, en lecture seule. Ils téléchargent votre run et y jouent, sans aucun moyen de l’écraser.' },
    ],
    points: [
      'Toujours en lecture seule : vos fans jouent votre sauvegarde sans jamais pouvoir la modifier',
      'Partagez avec autant de fans que vous voulez, ou plafonnez le code et révoquez-le quand bon vous semble',
      'Les fans en lecture seule n’occupent aucune place de votre équipe',
    ],
    proNoteHtml: 'Les codes de partage hébergés font partie de <a href="#pricing">Pro</a>, pensés pour les créateurs, les groupes et les communautés de mods.',
  },

  // Avis Steam. La description du score et le nom du jeu viennent directement de
  // Steam et restent en anglais dans toutes les langues, comme les textes de la
  // maquette de l'app. Les avis sont ceux de Checkpoint64, chargés en direct
  // depuis sa page Steam (voir src/lib/steam.js).
  steam: {
    tape: 'CE QUE DISENT LES JOUEURS',
    hand: 'en direct de Steam',
    h2Html: 'DIRECT DE <span class="accent">STEAM.</span>',
    lede: 'De vrais avis de vrais joueurs, chargés en direct depuis notre page Steam.',
    countTpl: '{0} avis',
    viewOnSteam: 'Voir sur Steam',
    recommended: 'RECOMMANDÉ',
    hoursTpl: '{0} au compteur',
    helpfulTpl: '{0} ont trouvé cet avis utile',
    anonymous: 'Joueur Steam',
  },

  savings: {
    tape: 'LÂCHEZ LE DÉDIÉ',
    hand: 'faites le calcul',
    h2Html: 'PLUS DE BOÎTIER 24/7<br/><span class="accent">À PEINE UTILISÉ.</span>',
    lede: "Un serveur dédié a du sens si vingt personnes y jouent chaque soir. Pour le groupe co-op moyen — quatre amis, quelques soirées par semaine — vous louez des heures vides. Checkpoint64 couvre exactement la partie dont vous avez besoin (le fichier de monde, le passage du verrou, l'historique des versions) pour un paiement unique au lieu d'une facture éternelle.",
    cards: [
      { tag: 'CE QUE COÛTE UN DÉDIÉ', title: 'VOUS PAYEZ 24/7.', bodyTpl: "Un serveur co-op loué coûte environ {0} pour les jeux populaires — {1}, {2}. Facturé que quelqu'un se soit connecté cette semaine ou non." },
      { tag: 'CE QUE VOUS UTILISEZ VRAIMENT', title: 'IL RESTE INACTIF.', bodyTpl: "Quatre amis, deux soirées par semaine, trois heures chacune. Soit environ six heures de jeu sur 168 dans la semaine. Votre dédié est vide les 96 % restants." },
      { tag: 'CE QUE COÛTE CHECKPOINT64', title: 'PAYEZ UNE FOIS. FINI.', bodyTpl: "Un paiement Lifetime et le cloud garde le monde. Celui qui veut jouer prend le verrou, joue, puis le repousse. Aucun boîtier à garder au chaud." },
    ],
    lineKeys: [
      'Location serveur, 12 mois',
      'Heures réellement utilisées (4 pers.)',
      "Heures où personne n'y a touché",
      'Dépensé en temps inactif',
    ],
    receiptLabelTpl: '▮ REÇU · DÉDIÉ TYPIQUE À {0}',
    receiptYear: 'année un',
    receiptAria: "Détail des coûts d'un serveur dédié typique facturé au mois",
    totalLabel: 'Ce que vous économiseriez avec Checkpoint64 Lifetime, dès la deuxième année',
    footTpl: "Sur cinq ans, ça fait à peu près <b>{0}</b> que vous gardez. Ou un nouveau GPU, comme vous préférez. <a href=\"{1}\">Lisez le calcul complet →</a>",
  },

  money: {
    perMonthShort: '/MOIS',
    aMonth: ' par mois',
    aYear: ' par an',
    overFive: ' sur cinq ans',
    perYear: ' / an',
  },

  pricing: {
    tape: 'TARIFS',
    h2Html: 'CHOISISSEZ VOTRE<br/><span class="accent">CARTOUCHE.</span>',
    lede: "Trois façons de jouer. Le Gratuit est vraiment gratuit — pas un essai de sept jours. Le Lifetime se paie une fois. Le Pro est pour les groupes qui sauvegardent ensemble. Pas de frais par personne, pas de surprise, pas de mauvaise surprise à la fin.",
    badge: '★ LE PLUS CHOISI',
    cards: [
      {
        tag: 'GRATUIT', unit: 'sans carte bancaire',
        tagline: 'assez grand pour Stardew, Hollow Knight ou toute une ludothèque rétro',
        features: [
          'espace personnel + 1 équipe',
          "rejoignez jusqu'à 3 équipes d'amis",
          '20 Mio de stockage cloud par espace',
          'auto-backup + historique complet des versions',
          'verrous co-op + journal de bord inclus',
        ],
        cta: 'PRENDRE GRATUIT',
      },
      {
        tag: 'LIFETIME', unit: 'unique, à vous pour toujours',
        tagline: 'payez une fois — vos sauvegardes survivront à votre GPU',
        features: [
          "espace personnel + jusqu'à 3 équipes",
          "rejoignez jusqu'à 5 équipes d'amis",
          '1 Gio de stockage par espace',
          'achat direct ou sur Steam',
          "jamais d'abonnement",
          'tout le plan Gratuit, avec de la marge',
        ],
        cta: 'OBTENIR LIFETIME',
      },
      {
        tag: 'PRO', unit: 'mensuel, résiliable à tout moment',
        tagline: 'pour les groupes, streamers, équipes de mod',
        features: [
          "espace personnel + jusqu'à 5 équipes",
          "rejoignez jusqu'à 8 équipes d'amis",
          '5 Gio de stockage par espace',
          '25 places par équipe (minimum garanti)',
          '100 versions / 90 jours conservés (minimum garanti)',
          'codes de partage en lecture seule pour votre communauté',
          'bande passante prioritaire (2× le débit API)',
        ],
        cta: 'OBTENIR PRO',
      },
    ],
  },

  download: {
    headlineSoonHtml: 'CHECKPOINT64 v1.0<br/>EST SORTI.<br/><span class="invert">PRENEZ-LE.</span>',
    headlineLiveHtml: 'CHECKPOINT64 v1.0<br/>EST SORTI.<br/><span class="invert">PRENEZ-LE.</span>',
    blurbSoon: 'Téléchargement gratuit, plan gratuit inclus. Prenez-le sur Steam, ou récupérez le dernier installeur directement depuis GitHub.',
    blurbLive: 'Téléchargement gratuit, plan gratuit inclus. Les builds sont publiés directement depuis GitHub — ces boutons pointent toujours vers le dernier installeur.',
    signoffSoon: 'gratuit à essayer — le plan gratuit est réel',
    signoffLiveTpl: 'notes de version & anciens builds : <a href="{0}">sur GitHub</a>',
    comingSoon: 'bientôt',
    tileAriaLiveTpl: 'Télécharger Checkpoint64 pour {0} ({1})',
    tileAriaSoonTpl: 'Checkpoint64 pour {0} — voir les versions sur GitHub',
  },

  faq: {
    tape: 'FAQ',
    h2Html: 'QUESTIONS <span class="accent">FRÉQUENTES.</span>',
    items: [
      { q: "QU'EST-CE QUI COMPTE COMME « SAUVEGARDE » ?", a: "Tout ce que votre jeu écrit sur votre disque dur. Checkpoint64 traite les fichiers d'un dossier comme une seule sauvegarde et les protège ensemble. Des préréglages pour 75+ jeux (et sept émulateurs) font la configuration pour vous ; pour le reste, pointez le dossier et choisissez les fichiers vous-même." },
      { q: 'ENVOYEZ-VOUS PENDANT QUE LE JEU TOURNE ?', a: "Oui, avec précaution. Checkpoint64 ne verrouille jamais vos fichiers. Il vérifie le dossier toutes les 30 secondes ; si le jeu est en train de sauvegarder, il attend que ça se calme et réessaie — aucun fichier corrompu, aucune saccade. L'appli somnole entre deux vérifications : vous ne la remarquerez pas en jouant." },
      { q: 'ET SI MON PARTENAIRE CO-OP ÉCRASE MON ENVOI ?', a: "Il ne peut pas, c'est voulu. Seule la personne qui tient le verrou peut envoyer. Pour pousser sa version, il doit d'abord reprendre le verrou — ce qui vous prévient, et s'inscrit dans le journal au vu de tous. Au pire, votre version reste à un clic de Restaurer dans l'historique." },
      { q: "AI-JE ENCORE BESOIN D'UN SERVEUR DÉDIÉ ?", a: "Pour la plupart des groupes, non. Tout l'intérêt d'un serveur dédié est de garder votre monde en ligne quand le PC de l'hôte est éteint. Checkpoint64 couvre environ 90 % de ça pour un paiement unique : celui qui veut jouer prend le verrou, joue sa session, puis repousse la sauvegarde. Un groupe co-op typique économise {0} par rapport à un serveur 24/7 qui reste inactif 18 heures par jour." },
      { q: 'ÇA MARCHE AVEC LES ÉMULATEURS OU LES SAUVEGARDES CONSOLE ?', a: "Les émulateurs, carrément — RetroArch, Dolphin, PCSX2, DuckStation, PPSSPP, RPCS3 et Cemu ont tous leur préréglage : vos save states ont enfin un vrai historique de versions. Les sauvegardes console ne marchent que si vous les amenez d'abord sur un PC. L'appli elle-même tourne sur Windows, macOS (Apple Silicon) et Linux." },
      { q: 'COMBIEN ÇA COÛTE ?', a: "Le plan gratuit est réel et reste gratuit : 20 Mio, votre espace personnel plus une équipe. Le Lifetime est un paiement unique — 1 Gio par espace, jusqu'à 3 équipes, acheté en direct ou via Steam. Le Pro est pour les grands groupes : 5 Gio par espace, 5 équipes, 25 places chacune, codes de partage en lecture seule. Aucun frais par personne, quelle que soit la formule." },
      { q: "JE PEUX L'UTILISER DÈS AUJOURD'HUI ?", a: "Oui — la v1.0 est sortie. Téléchargement gratuit pour Windows, macOS (Apple Silicon) et Linux, et elle est aussi sur Steam." },
      { q: 'QUI PEUT VOIR MES SAUVEGARDES ?', a: "Vos coéquipiers — et seulement ceux que vous invitez. Ils voient votre pseudo, jamais votre e-mail. Et vos données restent les vôtres : exportez tout en zip quand vous voulez, et supprimer votre compte le supprime vraiment (après 7 jours de réflexion, au cas où le regret de 2 h du matin frappe)." },
    ],
  },

  footer: {
    blurb: "Un endroit sûr pour vos grandes parties. Conçu par des gens qui ont perdu une base Factorio de 200 heures et ne s'en sont jamais remis.",
    sign: 'fait pour moi.',
    product: 'PRODUIT',
    resources: 'RESSOURCES',
    company: 'ENTREPRISE',
    links: {
      how: 'Comment ça marche',
      features: 'Fonctions',
      pricing: 'Tarifs',
      joinList: 'Télécharger',
      changelog: 'Notes de version',
      blog: 'Blog',
      discord: 'Discord',
      terms: 'Conditions',
      privacy: 'Confidentialité',
    },
    ariaProduct: 'Produit',
    ariaResources: 'Ressources',
    ariaCompany: 'Entreprise',
    changelogAria: 'Notes de version sur GitHub (ouvre un nouvel onglet)',
    discordAria: 'Rejoindre le Discord de Checkpoint64 (ouvre un nouvel onglet)',
    copyTpl: '© {0} CHECKPOINT64 · TOUS DROITS RÉSERVÉS',
    notAffiliated: 'NON AFFILIÉ AUX JEUX CITÉS CI-DESSUS',
  },

  meta: {
    skipLink: 'Aller au contenu',
    title: 'Checkpoint64 — Ne perdez plus jamais une sauvegarde, solo ou co-op',
    description: "Backup cloud automatique et historique complet des versions pour vos sauvegardes de jeux PC. Restaurez les sauvegardes corrompues et partagez vos mondes co-op avec des verrous. Compatible Minecraft, Stardew Valley, Elden Ring et 75+ jeux. Téléchargement gratuit pour Windows, Mac, Linux.",
    ogTitle: 'Checkpoint64 — Ne perdez plus jamais une sauvegarde, solo ou co-op',
    ogDescription: "Ne perdez plus jamais une sauvegarde. Backups automatiques, historique complet des versions et verrous co-op pour que les amis partagent des mondes sans s'écraser. 75+ jeux prêts. Téléchargement gratuit — payez une fois pour plus d'espace.",
    ogImageAlt: 'Checkpoint64 — ne perdez plus jamais une sauvegarde. Une étagère rétro de cartouches de sauvegardes.',
    twitterTitle: 'Checkpoint64 — Ne perdez plus jamais une sauvegarde, solo ou co-op',
    twitterDescription: 'Ne perdez plus jamais une sauvegarde. Backups cloud automatiques, historique complet des versions, verrous co-op. 75+ jeux prêts. Téléchargement gratuit pour Windows, Mac, Linux.',
    twitterImageAlt: 'Checkpoint64 — ne perdez plus jamais une sauvegarde.',
    noscriptHtml: "À noter — JavaScript est désactivé, donc la démo animée de cette page ne fonctionnera pas. Le reste du contenu est entièrement visible ci-dessus.",
  },

  jsonld: {
    orgDescription: "Checkpoint64 conçoit un outil de backup de sauvegardes pour les joueurs PC — backups cloud automatiques, historique complet des versions et verrous co-op pour que les amis partagent des mondes sans s'écraser.",
    softwareDescription: "Backup cloud automatique, historique complet des versions et verrous co-op pour les sauvegardes de jeux PC. Plan gratuit inclus ; payez une fois pour plus d'espace. Compatible d'emblée avec Minecraft, Stardew Valley, Skyrim, Palworld, Elden Ring, Factorio, Valheim, plus 75+ autres jeux et 7 émulateurs.",
    featureList: [
      'Backups automatiques en arrière-plan toutes les 30 secondes',
      'Historique complet des versions avec restauration en un clic',
      'Verrous co-op appliqués côté serveur — un seul détenteur du monde à la fois',
      'Envois dédupliqués — seuls les fichiers modifiés sont transmis',
      'Préréglages pour 75+ jeux et 7 émulateurs',
      "Journal d'activité partagé pour les équipes",
      'Codes de partage en lecture seule pour les mondes communautaires',
      'Plan Lifetime à paiement unique — aucun abonnement requis',
    ],
    howToName: 'Comment sauvegarder automatiquement vos parties PC avec Checkpoint64',
    howToDescription: "Mettez en place un backup cloud automatique et un historique complet des versions pour n'importe quelle sauvegarde PC en trois étapes.",
    howToSupply: [
      'Un PC Windows, macOS ou Linux',
      'Un jeu qui écrit sa sauvegarde dans un dossier sur le disque',
    ],
    howToTool: 'Application de bureau Checkpoint64',
    howToSteps: [
      { name: 'Envoyez votre sauvegarde', text: 'Pointez Checkpoint64 vers le dossier dans lequel votre jeu sauvegarde. Cliquez sur Envoyer pour transmettre un instantané au cloud — ce sera la version un.' },
      { name: "Activez l'auto-backup", text: "Activez l'auto-backup. Checkpoint64 vérifie le dossier toutes les 30 secondes et envoie une nouvelle version dès que quelque chose a changé. Seuls les fichiers modifiés sont transmis." },
      { name: 'Restaurez une version antérieure', text: "Ouvrez Versions sur n'importe quelle sauvegarde pour voir tout l'historique. Choisissez-en une et cliquez sur Restaurer pour revenir en arrière instantanément — les fichiers reviennent sur le disque et cette version devient l'actuelle." },
    ],
    faq: [
      { q: "Qu'est-ce qui compte comme « sauvegarde » ?", a: "Tout ce que votre jeu écrit sur votre disque dur. Checkpoint64 traite les fichiers d'un dossier comme une seule sauvegarde et les protège ensemble. Des préréglages pour 75+ jeux (et sept émulateurs) font la configuration pour vous ; pour le reste, pointez le dossier et choisissez les fichiers vous-même." },
      { q: 'Envoyez-vous pendant que le jeu tourne ?', a: "Oui, avec précaution. Checkpoint64 ne verrouille jamais vos fichiers. Il vérifie le dossier toutes les 30 secondes ; si le jeu est en train de sauvegarder, il attend que ça se calme et réessaie — aucun fichier corrompu, aucune saccade. L'appli somnole entre deux vérifications : vous ne la remarquerez pas en jouant." },
      { q: 'Et si mon partenaire co-op écrase mon envoi ?', a: "Il ne peut pas, c'est voulu. Seule la personne qui tient le verrou peut envoyer. Pour pousser sa version, il doit d'abord reprendre le verrou — ce qui vous prévient, et s'inscrit dans le journal au vu de tous. Au pire, votre version reste à un clic de Restaurer dans l'historique." },
      { q: "Ai-je encore besoin d'un serveur dédié ?", a: "Pour la plupart des groupes, non. Tout l'intérêt d'un serveur dédié est de garder votre monde en ligne quand le PC de l'hôte est éteint. Checkpoint64 couvre environ 90 % de ça pour un paiement unique : celui qui veut jouer prend le verrou, joue sa session, puis repousse la sauvegarde. Un groupe co-op typique économise {0} par rapport à un serveur 24/7 qui reste inactif 18 heures par jour." },
      { q: 'Ça marche avec les émulateurs ou les sauvegardes console ?', a: "Les émulateurs, carrément — RetroArch, Dolphin, PCSX2, DuckStation, PPSSPP, RPCS3 et Cemu ont tous leur préréglage : vos save states ont enfin un vrai historique de versions. Les sauvegardes console ne marchent que si vous les amenez d'abord sur un PC. L'appli elle-même tourne sur Windows, macOS (Apple Silicon) et Linux." },
      { q: 'Combien ça coûte ?', a: "Le plan gratuit est réel et reste gratuit : 20 Mio, votre espace personnel plus une équipe. Le Lifetime est un paiement unique — 1 Gio par espace, jusqu'à 3 équipes, acheté en direct ou via Steam. Le Pro est pour les grands groupes : 5 Gio par espace, 5 équipes, 25 places chacune, codes de partage en lecture seule. Aucun frais par personne, quelle que soit la formule." },
      { q: "Je peux l'utiliser dès aujourd'hui ?", a: "Oui — la v1.0 est sortie. Téléchargement gratuit pour Windows, macOS (Apple Silicon) et Linux, et elle est aussi sur Steam." },
      { q: 'Qui peut voir mes sauvegardes ?', a: "Vos coéquipiers — et seulement ceux que vous invitez. Ils voient votre pseudo, jamais votre e-mail. Et vos données restent les vôtres : exportez tout en zip quand vous voulez, et supprimer votre compte le supprime vraiment (après 7 jours de réflexion)." },
    ],
  },
}
