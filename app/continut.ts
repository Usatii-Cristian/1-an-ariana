// Tot ce e personal în site e aici: nume, date, texte, poze, melodie.
// Pozele se pun în /public/poze/ și se scriu ca "/poze/nume.jpg".

export const continut = {
  ea: "Ariana",
  el: "Cristian",

  // Ziua în care a început povestea (apare în calendar și în numărătoarea de la final)
  inceput: { an: 2025, luna: 10, zi: 8 },

  // Pagina „Unde a început povestea noastră”
  locul: "La școală",
  locDetaliu: "ne știm din clasa a 5-a",
  pozaLoc: "", // gol = școala desenată

  // Muzica de fundal, după filmul de la început (NAVAI – Больше, чем ближе); gol = fără muzică
  muzica: "/muzica.mp3",

  // Cufărul cu „melodia noastră”: piesa cântă pe un vinil, cu poza în mijlocul discului
  melodie: {
    fisier: "/princess.mp3",
    titlu: "Princess",
    artist: "NOUA UNSPE",
    poza: "/poze/vinil.jpg", // pătrată, centrată pe noi doi
  },

  // Cufărul cu amintiri (poza goală = loc pentru poză)
  amintiri: [
    { poza: "/poze/zambet.jpg", text: "Zâmbetul meu preferat" },
    { poza: "/poze/scoala.jpg", text: "La școala noastră" },
    { poza: "/poze/printesa.jpg", text: "Prințesa mea 👑" },
    { poza: "/poze/trandafiri.jpg", text: "Printre trandafiri 🌹" },
    { poza: "/poze/cafea.jpg", text: "Buna mea dispoziție: tu ☕" },
    { poza: "/poze/inceput.jpg", text: "Și abia am început... ✨" },
  ],

  scrisoare: {
    salut: "Aryyy, iubirea mea,",
    paragrafe: [
      "Povestea noastră a început, de fapt, cu mult înainte de anul acesta. În clasa a 5-a, în cabinetul mamei mele, m-ai întrebat cum mă cheamă, iar eu ți-am răspuns cu tonul acela nonșalant: „Cristi” 😏. Nu aveam de unde să știu atunci că fata care m-a întrebat asta avea să devină, într-o zi, cel mai important om din viața mea.",
      "Am început să vorbim tot mai des și, fără să-mi dau seama, ai devenit omul cu care voiam să vorbesc mereu. Îmi amintesc și de prima noastră „aproape îmbrățișare”: eu aveam lacrimi în ochi, iar tu ai încercat să mă cuprinzi... și te-ai oprit 🙈. Poate nici nu știi, dar gestul acela mic mi-a rămas în suflet.",
      "Și apoi a venit 8 octombrie. La școală, ne-am îmbrățișat în sfârșit cu adevărat, iar eu am încercat să te pup... doar că a ieșit un pupic stângaci, jumătate pe buze, jumătate pe obraz 😅. Eram atât de emoționat și de fâstâcit, încât nici nu mai știam ce fac și n-aveam idee cum o să-l primești. Inima îmi bătea să-mi sară din piept. Dar dacă aș putea da timpul înapoi, n-aș schimba nimic — pentru că pupicul acela pe jumătate a fost începutul celei mai frumoase povești din viața mea.",
      "De atunci, totul are altă culoare. Diminețile sunt mai frumoase pentru că mă trezesc cu gândul la tine, iar zilele grele sunt mai ușoare pentru că știu că la capătul lor ești tu. În anul acesta am învățat că fericirea nu e un loc în care ajungi. Fericirea e un om. Și omul acela ești tu.",
      "Știi ce iubesc cel mai mult la tine? Iubesc cât de mult te străduiești mereu ca totul să fie bine. Iubesc cum reușești să faci totul mult mai ușor decât pare în capul meu — acolo unde eu văd un munte, tu îmi arăți că e doar un deal. Și iubesc cum faci din orice situație un moment amuzant, chiar și din cele în care eu mă supăr 😂. Recunosc, pe moment nu-mi plac mereu glumele tale, dar până la urmă râd și eu, pentru că te ador exact așa cum ești.",
      "Pentru mine ești Aryyy. Ești putulica mea mică — cel mai mic om cu cea mai mare inimă pe care l-am cunoscut vreodată.",
      "Nu toate zilele au fost ușoare și nu vreau să mă prefac că au fost. Când am avut examene, tu ai fost lângă mine și m-ai susținut la fiecare pas. A fost și pauza din decembrie, au fost atâtea neînțelegeri... dar pe toate le-am dus până la capăt. Împreună. Și uite-ne aici, un an mai târziu, mai apropiați ca oricând.",
      "Îți mulțumesc pentru fiecare zi din acest an. Pentru răbdarea și căldura ta, pentru fiecare îmbrățișare în care am uitat de toate grijile, pentru fiecare „noapte bună” și fiecare „bună dimineața”. Îți mulțumesc că m-ai ales pe mine, chiar și atunci când n-a fost ușor. Știu că nu sunt perfect, dar te iubesc cu tot ce am mai bun în mine.",
      "365 de zile. 8.760 de ore. Peste o jumătate de milion de minute. Și în fiecare dintre ele te-am iubit puțin mai mult decât în cel dinainte.",
      "Și mai e ceva care ne unește: visul nostru. Ca într-o zi să ne mutăm împreună, în casa noastră. Îmi imaginez deja diminețile în care mă trezesc lângă tine, serile liniștite doar ale noastre și râsul tău umplând fiecare cameră. Oricât de departe ar părea acum, știu că într-o zi o să fim acolo. Casa aceea ne așteaptă.",
      "Îți promit că voi fi mereu acolo pentru tine. Că te voi ține strâns în zilele grele și voi râde cu tine în cele frumoase. Că nu te voi lăsa niciodată să uiți cât de iubită ești. Și că te voi alege, în fiecare zi, din nou și din nou.",
    ],
    evidentiat:
      "Tu ești povestea mea preferată, Aryyy... și cea mai frumoasă parte este că abia am scris primul capitol.",
    final: [
      "La mulți ani nouă, putulica mea! Te iubesc mai mult decât pot cuprinde toate cuvintele din lume.",
      "Și dacă m-ai întreba din nou cum mă cheamă, ți-aș răspunde la fel de nonșalant ca atunci: „Al tău.” 😏",
    ],
    semnatura: "Cu toată dragostea mea,",
    nume: "Cristi 🤍",
  },
};
