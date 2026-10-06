// Tot ce e personal în site e aici: nume, date, texte, poze, melodie.
// Pozele se pun în /public/poze/ și se scriu ca "/poze/nume.jpg".

export const continut = {
  ea: "Ariana",
  el: "Cristian",

  // Ziua în care a început povestea (apare în calendar și în numărătoarea de la final)
  inceput: { an: 2025, luna: 10, zi: 8 },

  // Pagina „Unde a început povestea noastră”
  locul: "La școală",
  pozaLoc: "", // gol = școala desenată

  // Muzica de fundal (ex: "/muzica.mp3"); gol = fără muzică
  muzica: "",

  // Cufărul cu melodia
  melodie: {
    youtubeId: "qmEIkPMBl7Q", // Andrei Bănuță x GYA – De la cer la pământ
    poza: "",
  },

  // Cufărul cu amintiri (poza goală = loc pentru poză)
  amintiri: [
    { poza: "", text: "Prima noastră poză" },
    { poza: "", text: "Zâmbetul meu preferat" },
    { poza: "", text: "Noi doi, ca-n povești" },
    { poza: "", text: "Locul nostru" },
    { poza: "", text: "Cea mai frumoasă zi" },
    { poza: "", text: "Și abia am început..." },
  ],

  scrisoare: {
    salut: "Ariana, iubirea mea,",
    paragrafe: [
      "Acum un an, viața mea s-a schimbat pentru totdeauna, într-o zi de școală care părea una obișnuită. Atunci nu știam încă, dar în ziua aceea primeam cel mai frumos dar pe care mi l-ar fi putut face viața: pe tine.",
      "Îți mai amintești? 8 octombrie, la școală. Prima noastră îmbrățișare... și pupicul acela stângaci, jumătate pe buze, jumătate pe obraz. Eram atât de emoționat și de fâstâcit, încât nici nu mai știam ce fac și n-aveam idee cum o să-l primești. Inima îmi bătea să-mi sară din piept. Dar dacă aș putea da timpul înapoi, n-aș schimba nimic — pentru că pupicul acela pe jumătate a fost începutul celei mai frumoase povești din viața mea.",
      "Și după el au venit toate celelalte: emoțiile, mesajele pe care le citeam de zece ori, întâlnirile după care nu reușeam să adorm de cât zâmbeam. Mi le amintesc pe toate și le păstrez în suflet ca pe cele mai prețioase comori.",
      "De când ești în viața mea, totul are altă culoare. Diminețile sunt mai frumoase pentru că mă trezesc cu gândul la tine. Zilele grele sunt mai ușoare pentru că știu că la capătul lor ești tu. Iar serile cu tine au devenit locul meu preferat din lume.",
      "În anul acesta am învățat că fericirea nu e un loc în care ajungi. Fericirea e un om. Și omul acela ești tu.",
      "Iubesc felul în care râzi din toată inima. Iubesc cum ți se luminează ochii când vorbești despre lucrurile care îți plac. Iubesc cum mă privești când crezi că nu te văd. Iubesc până și lucrurile pe care tu nu le iubești la tine, pentru că sunt ale tale — și tot ce e al tău e perfect pentru mine.",
      "Îți mulțumesc pentru fiecare zi din acest an. Pentru răbdarea și blândețea ta, pentru fiecare îmbrățișare în care am uitat de toate grijile, pentru fiecare „noapte bună” și fiecare „bună dimineața”. Îți mulțumesc că m-ai ales pe mine, în fiecare zi, chiar și atunci când nu a fost ușor. Știu că nu sunt perfect, dar te iubesc cu tot ce am mai bun în mine.",
      "365 de zile. 8.760 de ore. Peste o jumătate de milion de minute. Și în fiecare dintre ele te-am iubit puțin mai mult decât în cel dinainte.",
      "Nu știu ce ne rezervă viitorul, dar știu sigur un lucru: vreau să-l trăiesc lângă tine. Vreau să vedem lumea împreună, să ne construim un colț doar al nostru, să râdem până ne dor obrajii și să ne ținem de mână și peste cincizeci de ani, exact ca acum.",
      "Îți promit că voi fi mereu acolo pentru tine. Că te voi ține strâns în zilele grele și voi dansa cu tine în cele frumoase. Că nu te voi lăsa niciodată să uiți cât de iubită ești. Și că te voi alege, în fiecare zi, din nou și din nou.",
    ],
    evidentiat:
      "Tu ești povestea mea preferată, Ariana... și cea mai frumoasă parte este că abia am scris primul capitol.",
    final: [
      "La mulți ani nouă, prințesa mea!",
      "Te iubesc mai mult decât pot cuprinde toate cuvintele din lume.",
    ],
    semnatura: "Al tău, pentru totdeauna,",
  },
};
