(() => {
  const phone = "+36 20 667 1832";
  const tel = "tel:+36206671832";
  const wa = "https://wa.me/36206671832";
  const img = (id, w = 1200) =>
    id.startsWith("assets/")
      ? id
      : `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

  const heroImage = "assets/budapest-apartment-wall-refresh.jpg";

  const state = {
    lang: localStorage.getItem("bps-lang") || "hu",
    gallery: [],
    galleryIndex: 0,
    projectIndex: 0,
    projectFilter: "all",
  };

  const tx = (value) => value?.[state.lang] || value?.hu || "";
  const directCallViewport = () => window.matchMedia("(max-width: 820px)").matches;
  const phoneActionLabel = () => {
    if (state.lang === "hu") return directCallViewport() ? "Hívás indítása" : "Telefonszám másolása";
    return directCallViewport() ? "Call now" : "Copy phone number";
  };

  const phaseLabel = {
    before: { hu: "Előtte", en: "Before" },
    process: { hu: "Munkafolyamat", en: "Process" },
    after: { hu: "Kész állapot", en: "Finished" },
  };

  const phaseText = (phase) => tx(phaseLabel[phase] || phaseLabel.process);
  const photoCaption = (photo) => tx(photo?.[2]) || phaseText(photo?.[1]);

  const content = {
    nav: {
      services: { hu: "Szolgáltatások", en: "Services" },
      clients: { hu: "Ügyfelek", en: "Clients" },
      projects: { hu: "Munkapéldák", en: "Work examples" },
      contact: { hu: "Kapcsolat", en: "Contact" },
    },
    hero: {
      label: { hu: "Budapesti ingatlankarbantartás", en: "Property services in Budapest" },
      title: {
        hu: "Karbantartás budapesti ingatlanokhoz, átláthatóan.",
        en: "Straightforward property maintenance in Budapest.",
      },
      text: {
        hu:
          "Festés, fal- és gipszkartonjavítás, kisebb szerelések és kertgondozás lakásokban, Airbnb-ingatlanokban, irodákban és képviseleti terekben. Magyar és angol kommunikáció, egyértelmű egyeztetés és fotós visszajelzés.",
        en:
          "Painting, wall and drywall repair, small maintenance jobs and garden care for apartments, Airbnb properties, offices and representative spaces. Communication is available in Hungarian and English, with clear photo updates when the owner is away.",
      },
      secondary: { hu: "Munkapéldák", en: "View work examples" },
      noteTitle: { hu: "Egy kapcsolattartó, követhető folyamat", en: "One point of contact, a process you can follow" },
      noteText: {
        hu:
          "A feladatot indulás előtt pontosítjuk, a fontos munkafázisokat dokumentáljuk, az ingatlant pedig rendezett állapotban adjuk át.",
        en:
          "The scope is clarified before work begins, important stages are documented and the property is left in an orderly condition.",
      },
    },
    stats: [
      {
        huN: "HU/EN",
        enN: "HU/EN",
        hu: "Magyar és angol egyeztetés",
        en: "Hungarian and English communication",
        huDetail: "A feladat, a határidő és a visszajelzések mindkét nyelven egyértelműen követhetők.",
        enDetail: "Scope, timing and progress updates can be handled clearly in either language.",
      },
      {
        huN: "Fotók",
        enN: "Photos",
        hu: "Látható állapot és előrehaladás",
        en: "Visible condition and progress",
        huDetail: "Kérés szerint fotók készülnek a kiinduló állapotról, a fontos munkafázisokról és az átadásról.",
        enDetail: "When requested, photos document the starting condition, key work stages and handover.",
      },
      {
        huN: "Budapest",
        enN: "Budapest",
        hu: "Helyi fókusz, több ingatlantípus",
        en: "Local focus across property types",
        huDetail: "Polgári lakásoktól és kiadó ingatlanoktól a társasházi udvarokig és irodákig.",
        enDetail: "From period apartments and rentals to shared courtyards, offices and representative properties.",
      },
    ],
    servicesTitle: {
      hu: "Miben segítünk?",
      en: "What we can handle",
    },
    servicesText: {
      hu:
        "Célzott javításokat és karbantartási feladatokat vállalunk olyan helyzetekben, amikor fontos a pontos egyeztetés, a rendezett munkavégzés és a kiszámítható átadás.",
      en:
        "We handle focused repairs and maintenance where clear scope, orderly work and a predictable handover matter.",
    },
    problemsTitle: { hu: "Tipikus helyzetek, gyakorlati segítség", en: "Typical situations, practical support" },
    projectsTitle: { hu: "Illusztratív munkapéldák", en: "Illustrative work examples" },
    processTitle: { hu: "Hogyan dolgozunk?", en: "How the work is handled" },
    trustTitle: { hu: "Amitől követhető marad a munka", en: "What keeps the work easy to follow" },
    audienceTitle: { hu: "Kiknek hasznos?", en: "Who this is for" },
    faqTitle: { hu: "Gyakori kérdések", en: "Common questions" },
    contactTitle: { hu: "Mutassa meg, miben segíthetünk", en: "Show us what needs attention" },
    contactText: {
      hu:
        "Küldjön néhány fotót, az ingatlan budapesti címét vagy kerületét, valamint a kívánt határidőt. Ezek alapján tisztázható a következő lépés, és az is, szükséges-e helyszíni felmérés.",
      en:
        "Send a few photos, the Budapest address or district, and your preferred timing. From there we can clarify the next step and whether an on-site assessment is needed.",
    },
  };

  const services = [
    {
      key: "painting",
      cover: "assets/budapest-finished-room-1.jpg",
      title: { hu: "Festés és falfrissítés", en: "Interior painting and wall refresh" },
      text: {
        hu:
          "Kopott, foltos vagy javított falak frissítése vendégváltás, bérlőváltás, fotózás vagy irodaátadás előtt. A végeredmény tisztább, rendezettebb első benyomás.",
        en:
          "Freshening marked, patched or tired walls before guest changes, tenant handovers, photoshoots or office visits. The result is a cleaner first impression.",
      },
      photos: [
        ["12036084", "before", { hu: "Régi, sérült falfelület: itt a fal állapotát kellett javíthatóvá tenni.", en: "Old damaged wall surface: the first task was to make the wall repairable." }],
        ["804392", "before", { hu: "Felújítás előtti helyiség, ahol a falhibák és az alsó falsáv külön figyelmet igényelt.", en: "Room before refresh, with visible wall damage and a lower wall section needing attention." }],
        ["3616757", "process", { hu: "Festésre előkészített teljes szoba, takart padlóval és összekészített anyagokkal.", en: "Full room prepared for painting, with flooring protected and materials arranged." }],
        ["3615721", "process", { hu: "A munkaterület rendezése festés előtt: a szoba használható állapotban marad a kivitelezéshez.", en: "Work area set up before painting so the room remains controlled during the job." }],
        ["6474471", "process", { hu: "Teljes falfelület javítása és hengerlése, nem csak egy közeli részlet.", en: "A full wall being repaired and rolled, not just a close-up detail." }],
        ["6473978", "process", { hu: "Nagyobb falmező csiszolása és simítása, hogy a festés egyenletes legyen.", en: "Large wall section being sanded and levelled so the paint finish looks even." }],
        ["assets/budapest-finished-room-1.jpg", "after", { hu: "Frissen festett budapesti lakószoba tiszta falakkal, radiátorral és parkettával.", en: "Freshly painted Budapest living room with clean walls, radiators and parquet flooring." }],
        ["assets/budapest-finished-room-2.jpg", "after", { hu: "Üres, átadásra kész budapesti szoba egységes falfelülettel és hétköznapi kialakítással.", en: "Empty Budapest room ready for handover, with consistent walls and an everyday layout." }],
        ["assets/budapest-airbnb-living-room.jpg", "after", { hu: "Rendezett, világos budapesti lakótér friss falakkal és praktikus berendezéssel.", en: "Tidy, bright Budapest living space with refreshed walls and practical furnishings." }],
        ["assets/budapest-airbnb-bedroom.jpg", "after", { hu: "Tiszta, visszafogott budapesti hálószoba vendég- vagy bérlőátadás előtt.", en: "Clean, understated Budapest bedroom before guest or tenant handover." }],
      ],
    },
    {
      key: "drywall",
      cover: "7937304",
      title: { hu: "Gipszkarton és almennyezet", en: "Drywall and ceiling repairs" },
      text: {
        hu:
          "Sérült vagy félkész gipszkarton, glettelés, csiszolás, hézagok és festésre előkészített felületek. Itt a részletek döntik el, hogy profi vagy félkész hatású lesz-e a helyiség.",
        en:
          "Damaged or unfinished drywall, filling, sanding, seams and paint-ready surfaces. Small details decide whether a room feels finished or improvised.",
      },
      photos: [
        ["7937304", "before", { hu: "Üres, félkész helyiség gipszkarton és festés előtti állapotban: a teljes tér látszik.", en: "Empty unfinished room before drywall finishing and painting, showing the full space." }],
        ["15798783", "before", { hu: "Felújítás alatti teljes szoba, ahol a falak és mennyezeti csatlakozások még rendezésre várnak.", en: "Full room under renovation where walls and ceiling junctions still need finishing." }],
        ["5606879", "before", { hu: "Nagyobb belső munkaterület nyitott mennyezettel és javítandó felületekkel.", en: "Large interior work area with an open ceiling and surfaces still needing repair." }],
        ["3990359", "process", { hu: "Teljes felújítás alatti helyiség: létrák, takarás és előkészített munkaterület.", en: "Full room under renovation with ladders, protection and prepared working area." }],
        ["6474313", "process", { hu: "Mennyezeti gipszkarton felület hézagolás előtt, jól látható teljes felülettel.", en: "Drywall ceiling before joint finishing, with the broader surface visible." }],
        ["6474202", "process", { hu: "Mennyezeti illesztések kezelése nagyobb felületen, nem elszigetelt részletként.", en: "Ceiling joints handled across a larger surface, not as an isolated close-up." }],
        ["6474343", "process", { hu: "Gipszkarton mennyezet csiszolása és simítása festés előtt.", en: "Drywall ceiling being sanded and smoothed before painting." }],
        ["6474300", "process", { hu: "Teljes szoba előkészítése: takarás, csiszolás, poros munkafázis kontrolláltan.", en: "Full room preparation with masking, sanding and controlled dusty work." }],
        ["6474129", "process", { hu: "Mennyezeti javítás munka közben, a teljes felülethez igazítva.", en: "Ceiling repair in progress, aligned with the whole surface." }],
        ["9826455", "after", { hu: "Kész, üres helyiség: a javított felületek tiszta, festés utáni szobaképet adnak.", en: "Finished empty room where repaired surfaces create a clean post-work interior." }],
      ],
    },
    {
      key: "garden",
      cover: "assets/budapest-courtyard-garden-1.jpg",
      title: { hu: "Kert és udvar rendbetétele", en: "Garden and outdoor clean-up" },
      text: {
        hu:
          "Magas fű, elhanyagolt bejárat, terasz vagy udvar rendezése. Airbnb, bérlemény vagy iroda esetén a külső kép már érkezéskor bizalmat épít vagy rombol.",
        en:
          "Mowing, trimming and tidying entrances, yards and terraces. For rentals, Airbnb and offices, the outdoor area affects trust before anyone steps inside.",
      },
      photos: [
        ["assets/budapest-courtyard-before-entrance.jpg", "before", { hu: "Elhanyagolt budapesti társasházi bejárat nyírás és lombgyűjtés előtt.", en: "Neglected Budapest apartment entrance before mowing and leaf collection." }],
        ["assets/budapest-courtyard-before-overgrown-lawn.jpg", "before", { hu: "Benőtt közös udvari gyep és bokorsáv egy budapesti lakóépület mellett.", en: "Overgrown shared lawn and shrub border beside a Budapest residential building." }],
        ["assets/budapest-courtyard-before-overgrown-wall.jpg", "before", { hu: "Rendezetlen udvari növényzet és járdaszegély visszavágás előtt.", en: "Untidy courtyard planting and path edges before trimming." }],
        ["assets/budapest-courtyard-process-mowing.jpg", "process", { hu: "Fűnyírás és szegélyrendezés egy budapesti társasház belső udvarában.", en: "Mowing and edge tidying in a Budapest apartment courtyard." }],
        ["assets/budapest-courtyard-process-hedge-trimming.jpg", "process", { hu: "Közönséges lombhullató sövény egyenletes visszavágása az udvari járda mellett.", en: "An ordinary deciduous hedge being trimmed evenly beside the courtyard path." }],
        ["assets/budapest-courtyard-process-shrub-pruning.jpg", "process", { hu: "Túlnőtt udvari bokor metszése, a levágott ágak rendezett gyűjtésével.", en: "Pruning an overgrown courtyard shrub while collecting the cut branches neatly." }],
        ["assets/budapest-courtyard-process-green-waste.jpg", "process", { hu: "Nyírás utáni zöldhulladék összegyűjtése egy budapesti közös udvarban.", en: "Collecting green waste after trimming in a shared Budapest courtyard." }],
        ["assets/budapest-courtyard-garden-1.jpg", "after", { hu: "Rendezett budapesti belső udvar nyírt fűvel, visszavágott sövénnyel és tiszta járdával.", en: "A tidy Budapest courtyard with cut grass, trimmed hedges and a clean path." }],
        ["assets/budapest-courtyard-garden-2.jpg", "after", { hu: "Karbantartott zöldsáv egy városi lakóépület mellett, egyszerű, jól áttekinthető kialakítással.", en: "A maintained green strip beside an urban residential building, kept simple and easy to manage." }],
        ["assets/budapest-courtyard-garden-3.jpg", "after", { hu: "Tiszta bejárati út és gondozott növényzet egy budapesti társasházi udvarban.", en: "A clean entrance path and maintained planting in a Budapest apartment courtyard." }],
      ],
    },
    {
      key: "handyman",
      cover: "1090638",
      title: { hu: "Kisebb javítások és szerelés", en: "Small repairs and handyman jobs" },
      text: {
        hu:
          "Polc, karnis, ajtóigazítás, szegély, apró rögzítések és átadás előtti hibák. Egyenként kicsinek tűnnek, együtt viszont erősen rontják az ingatlan érzetét.",
        en:
          "Shelves, curtain rails, door adjustments, trims and small fixes before handover. Individually small, but together they strongly shape the property's feel.",
      },
      photos: [
        ["13909112", "before", { hu: "Belső tér átadás előtt, ahol a kisebb szerelési és rendezési pontok adják meg a végső képet.", en: "Interior before handover where small installation and tidying points shape the final impression." }],
        ["13588248", "before", { hu: "Rendezetlenebb fali tároló és dekorációs felület: a cél egy használhatóbb, tisztább összkép.", en: "Less orderly wall storage and decor area before creating a more usable, cleaner impression." }],
        ["23224978", "process", { hu: "Fali kép vagy tartó pontos beállítása, hogy a helyiség rendezettebb legyen.", en: "Wall picture or mount being aligned so the room feels more orderly." }],
        ["4981802", "process", { hu: "Fali rögzítés és szerelés olyan helyen, ahol a kész eredmény használhatóbbá teszi a szobát.", en: "Wall fixing work that makes the room more usable once completed." }],
        ["1090638", "after", { hu: "Felszerelt, rendezett fali polcok: a javítás használható tárolást és tisztább képet ad.", en: "Installed wall shelves creating usable storage and a cleaner visual result." }],
        ["19109111", "after", { hu: "Stabil, kész polcrendszer, amely a korábbi üres vagy rendezetlen falfelületet használhatóvá teszi.", en: "Stable finished shelving that turns an empty or untidy wall into useful storage." }],
        ["9565966", "after", { hu: "Rendezett fali tároló kisebb szerelés után, átadásra alkalmasabb belső képpel.", en: "Orderly wall storage after small installation work, improving the handover impression." }],
        ["5824546", "after", { hu: "Teljes falon megjelenő tároló és polcrendszer kész állapotban.", en: "Full wall storage and shelving shown in finished condition." }],
        ["19109111", "after", { hu: "Egyszerű, stabil fali polc elkészült állapotban, hétköznapi lakásbelsőben.", en: "A simple, stable wall shelf in a normal apartment interior." }],
        ["5824575", "after", { hu: "Kész fali tároló teljes nézetben, ahol a javítás eredménye egyértelműen látszik.", en: "Finished wall storage shown in full view, making the result easy to understand." }],
      ],
    },
  ];

  const projects = [
    {
      key: "paint",
      type: { hu: "Festés / faljavítás", en: "Painting / wall repair" },
      cover: "assets/budapest-finished-room-1.jpg",
      before: "assets/budapest-painting-before-matched.jpg",
      after: "assets/budapest-finished-room-1.jpg",
      title: { hu: "Kopott falból tiszta, egységes felület", en: "From tired walls to a clean finish" },
      summary: {
        hu:
          "Bérlőváltás vagy vendégérkezés előtt a falhibák azonnal látszanak. A cél az, hogy a helyiség gyorsan újra rendezett és bemutatható legyen.",
        en:
          "Before a tenant change or guest arrival, wall defects are immediately visible. The goal is to make the room presentable again quickly.",
      },
      result: {
        hu: "A helyiség tisztábbnak, gondozottabbnak és kiadhatóbbnak hat. A látogató nem a hibákat veszi észre először.",
        en: "The room feels cleaner, better cared for and easier to present. Visitors notice the space, not the defects.",
      },
      works: {
        hu: ["falhibák ellenőrzése fotók alapján", "felület előkészítése", "javítás és csiszolás", "egységes festés", "fotós visszajelzés"],
        en: ["photo-based wall condition check", "surface preparation", "patching and sanding", "consistent painted finish", "photo update after completion"],
      },
      photos: services[0].photos,
    },
    {
      key: "drywall",
      type: { hu: "Gipszkarton / mennyezet", en: "Drywall / ceiling" },
      cover: "assets/budapest-finished-room-2.jpg",
      before: "assets/budapest-drywall-before-matched.jpg",
      after: "assets/budapest-finished-room-2.jpg",
      title: { hu: "Félkész gipszkartonból festésre kész felület", en: "Drywall prepared for a finished interior" },
      summary: {
        hu:
          "A látható hézagok, élek és csiszolatlan javítások félkész hatást keltenek. Ilyenkor a cél nem látványos trükk, hanem pontos, tiszta előkészítés.",
        en:
          "Visible seams, edges and unsanded areas make a room feel unfinished. The aim is careful preparation, not cosmetic shortcuts.",
      },
      result: {
        hu: "A fal vagy mennyezet rendezett, festésre alkalmas és kevésbé vonja magára a figyelmet.",
        en: "The wall or ceiling becomes tidy, paint-ready and no longer distracts from the room.",
      },
      works: {
        hu: ["állapotfelmérés", "hézagok és élek javítása", "csiszolás", "felületkiegyenlítés", "átadás előtti ellenőrzés"],
        en: ["condition check", "seam and edge repair", "sanding", "surface levelling", "pre-handover review"],
      },
      photos: services[1].photos,
    },
    {
      key: "garden",
      type: { hu: "Kert / udvar", en: "Garden / outdoor" },
      cover: "assets/budapest-courtyard-garden-1.jpg",
      before: "assets/budapest-garden-before-matched.jpg",
      after: "assets/budapest-courtyard-garden-1.jpg",
      title: { hu: "Elhanyagolt külső részből rendezett érkezés", en: "From neglected outdoor area to a tidier arrival" },
      summary: {
        hu:
          "A kert, udvar vagy bejárat gyakran az első pont, ahol az érdeklődő képet alkot az ingatlanról.",
        en:
          "The garden, yard or entrance is often the first place where a visitor forms an opinion about the property.",
      },
      result: {
        hu: "Az ingatlan rendezettebbnek és gondozottabbnak tűnik már érkezéskor, ami bérleménynél és Airbnb-nél különösen fontos.",
        en: "The property feels better cared for from the first moment, especially for rentals and Airbnb homes.",
      },
      works: {
        hu: ["fűnyírás", "szegélyrendezés", "benőtt részek visszavágása", "zöldhulladék összegyűjtése", "kész állapot fotózása"],
        en: ["mowing", "edge tidying", "trimming overgrown areas", "green waste collection", "final condition photos"],
      },
      photos: services[2].photos,
    },
  ];

  Object.assign(projects[0], {
    category: "painting",
    location: { hu: "Budapesti kiadó lakás", en: "Budapest rental apartment" },
    timeline: { hu: "egyeztetett ütemezés", en: "agreed scheduling" },
    client: { hu: "bérlőváltás előtt", en: "before tenant handover" },
    problem: {
      hu:
        "A falakon javításnyomok, kopások és foltok voltak. Ilyenkor az ingatlan nem igényel teljes felújítást, de a látható hibák azonnal rontják az első benyomást.",
      en:
        "The walls had visible marks, patch areas and wear. This did not require a full renovation, but the visible defects weakened the first impression immediately.",
    },
    approach: {
      hu:
        "A kritikus falrészeket fotók alapján beazonosítjuk, majd a felületet előkészítjük, javítjuk, csiszoljuk és egységesebb festett állapotban adjuk vissza.",
      en:
        "The critical wall areas are identified from photos, then prepared, repaired, sanded and handed back with a more consistent painted finish.",
    },
    evidence: {
      hu: ["előtte fotók", "felület-előkészítés", "javítás és csiszolás", "kész állapot fotók"],
      en: ["before photos", "surface preparation", "patching and sanding", "finished condition photos"],
    },
    metrics: [
      { n: "10", hu: "képes példa", en: "visual examples" },
      { n: "3", hu: "munkafázis", en: "work phases" },
      { n: "Egyeztetve", hu: "ütemezés", en: "timing" },
    ],
  });

  Object.assign(projects[1], {
    category: "drywall",
    location: { hu: "Lakásbelső / mennyezeti rész", en: "Interior apartment ceiling area" },
    timeline: { hu: "javítás és festésre előkészítés", en: "repair and paint-ready preparation" },
    client: { hu: "tulajdonosi felkészítés", en: "owner preparation" },
    problem: {
      hu:
        "A félkész gipszkarton és a rendezetlen hézagok amatőr hatást keltenek. Egy ilyen rész akkor is feltűnik, ha a lakás többi része rendben van.",
      en:
        "Unfinished drywall and rough seams make an interior feel improvised. Even a small area like this can stand out when the rest of the apartment is tidy.",
    },
    approach: {
      hu:
        "A hangsúly a pontos éleken, a simább átmeneteken és a festésre alkalmas felületen van. Nem látványos díszítés, hanem tiszta alapmunka.",
      en:
        "The focus is on cleaner edges, smoother transitions and a surface that is ready for painting. It is practical groundwork, not decorative cover-up.",
    },
    evidence: {
      hu: ["gipszkarton állapot", "hézagjavítás", "csiszolás", "átadás előtti kontroll"],
      en: ["drywall condition", "seam repair", "sanding", "pre-handover check"],
    },
    metrics: [
      { n: "10", hu: "képes példa", en: "visual examples" },
      { n: "5", hu: "ellenőrzési pont", en: "check points" },
      { n: "HU/EN", hu: "egyeztetés", en: "communication" },
    ],
  });

  Object.assign(projects[2], {
    category: "garden",
    location: { hu: "Budapesti udvar és bejárati rész", en: "Budapest yard and entrance area" },
    timeline: { hu: "szezonális rendbetétel", en: "seasonal clean-up" },
    client: { hu: "bérlemény / Airbnb előkészítés", en: "rental / Airbnb preparation" },
    problem: {
      hu:
        "A magas fű, elhanyagolt szegély és rendezetlen bejárat már érkezéskor bizonytalanságot kelt. Ez különösen gond Airbnb-nél vagy bérleménynél.",
      en:
        "Overgrown grass, rough edges and a neglected entrance create doubt before anyone enters the property. This matters especially for rentals and Airbnb homes.",
    },
    approach: {
      hu:
        "A cél nem kertépítés, hanem gyors, látható rend: nyírás, szegélyezés, visszavágás, összegyűjtés és fotózott kész állapot.",
      en:
        "The aim is not landscape design, but fast visible order: mowing, edging, trimming, collection and a photographed finished condition.",
    },
    evidence: {
      hu: ["előtte állapot", "nyírás és szegélyezés", "zöldhulladék rendezése", "kész állapot"],
      en: ["before condition", "mowing and edging", "green waste tidy-up", "finished condition"],
    },
    metrics: [
      { n: "10", hu: "képes dokumentáció", en: "photo records" },
      { n: "1", hu: "rendezett érkezés", en: "tidier arrival" },
      { n: "0", hu: "felesleges kör", en: "unneeded detours" },
    ],
  });

  projects.push(
    {
      key: "airbnb-turnover",
      category: "airbnb",
      type: { hu: "Airbnb / bérlőváltás", en: "Airbnb / tenant turnover" },
      cover: "assets/budapest-airbnb-living-room.jpg",
      before: "assets/budapest-airbnb-before-turnover-matched.jpg",
      after: "assets/budapest-airbnb-living-room.jpg",
      title: { hu: "Lakásfrissítés vendégérkezés előtt", en: "Apartment refresh before guest arrival" },
      location: { hu: "Budapesti Airbnb lakás", en: "Budapest Airbnb apartment" },
      timeline: { hu: "vendégérkezéshez igazítva", en: "planned around guest arrival" },
      client: { hu: "vendégváltás előtt", en: "before guest turnover" },
      summary: {
        hu:
          "Vendégváltás előtt a kisebb hibák is feltűnőek. Ilyenkor a legfontosabb a pontosan egyeztetett, tiszta és dokumentált munka.",
        en:
          "Before a guest turnover, even small defects are noticeable. The priority is clearly scheduled, tidy and documented work.",
      },
      problem: {
        hu:
          "A lakásban több kisebb nyom, rögzítési hiba és javítandó rész jelent meg egyszerre. A tulajdonosnak nem külön szakikat kell szerveznie minden apróságra.",
        en:
          "Several smaller marks, fixing issues and visible defects appeared at once. The owner should not have to coordinate separate trades for every small item.",
      },
      approach: {
        hu:
          "A látható hibákat rangsoroljuk: ami a vendégnek azonnal feltűnik, előre kerül. A munka végén képes visszajelzés segíti a távoli döntést.",
        en:
          "Visible issues are prioritised by guest impact. At completion, photo updates help the owner make decisions remotely.",
      },
      result: {
        hu:
          "A lakás gyorsabban vállalható állapotba kerül, kevesebb bizonytalansággal a vendégérkezés előtt.",
        en:
          "The apartment becomes presentable faster, with less uncertainty before guest arrival.",
      },
      works: {
        hu: ["látható hibák listázása", "falfrissítés", "kisebb rögzítések", "átadás előtti ellenőrzés", "fotós dokumentáció"],
        en: ["visible issue list", "wall touch-up", "small fixings", "pre-handover check", "photo documentation"],
      },
      evidence: {
        hu: ["problémalista", "javítás közbeni fotók", "kész állapot", "tulajdonosi visszajelzésre kész anyag"],
        en: ["issue list", "work-in-progress photos", "finished condition", "owner-ready update"],
      },
      metrics: [
        { n: "10", hu: "fotó", en: "photos" },
        { n: "4", hu: "javítási típus", en: "repair types" },
        { n: "1", hu: "kapcsolattartási pont", en: "contact point" },
      ],
      photos: [
        ["5102904", "before", { hu: "Vendégváltás előtti lakott állapot: a nappalit rendezettebbé és fotózhatóbbá kell tenni.", en: "Lived-in condition before guest turnover: the living room needs to become tidier and easier to present." }],
        ["6195959", "process", { hu: "Airbnb előkészítés takarítással és ellenőrzéssel, teljesebb lakótérben látható munkával.", en: "Airbnb preparation with cleaning and checking, shown in a fuller living-space context." }],
        ["6764827", "after", { hu: "Kész, rendezett nappali vendégérkezéshez: tiszta, átlátható és használható tér.", en: "Finished living room for guest arrival: clean, clear and usable." }],
        ["8135495", "after", { hu: "Rendezett hálószoba átadás előtt, tiszta textillel és ellenőrizhető összképpel.", en: "Tidy bedroom before handover, with clean textiles and a reviewable overall condition." }],
        ["19899060", "after", { hu: "Világos, teljes nappali kész állapotban, amely jól mutat vendégfotón és átadáskor.", en: "Bright full living room in finished condition, suitable for guest photos and handover." }],
        ["assets/budapest-airbnb-living-room.jpg", "after", { hu: "Hétköznapi budapesti nappali rendezett, vendégfogadásra kész állapotban.", en: "Everyday Budapest living room in a tidy, guest-ready condition." }],
        ["assets/budapest-finished-room-2.jpg", "after", { hu: "Frissen festett, egyszerű budapesti szoba tiszta járófelülettel.", en: "Freshly painted, simple Budapest room with clear circulation." }],
        ["assets/budapest-finished-room-1.jpg", "after", { hu: "Világos budapesti lakószoba rendezett falakkal, átadásra kész állapotban.", en: "Bright Budapest living room with tidy walls, ready for handover." }],
        ["assets/budapest-airbnb-bedroom.jpg", "after", { hu: "Tiszta, visszafogott hálószoba, amely vendégnek és tulajdonosnak is könnyen ellenőrizhető.", en: "Clean, understated bedroom that is easy for both guest and owner to review." }],
        ["271624", "after", { hu: "Kompakt Airbnb lakótér kész állapotban, rendezett fallal és használható elrendezéssel.", en: "Compact Airbnb living area in finished condition, with tidy walls and usable layout." }],
      ],
    },
    {
      key: "office-touchup",
      category: "office",
      type: { hu: "Iroda / képviseleti tér", en: "Office / representative space" },
      cover: "assets/budapest-office-finished-1.jpg",
      before: "assets/budapest-office-before-touchup-matched.jpg",
      after: "assets/budapest-office-finished-1.jpg",
      title: { hu: "Iroda gyors frissítése látogatás előtt", en: "Office touch-up before a visit" },
      location: { hu: "Budapesti iroda", en: "Budapest office" },
      timeline: { hu: "rövid, célzott munka", en: "short, focused work" },
      client: { hu: "nemzetközi környezet", en: "international environment" },
      summary: {
        hu:
          "Irodáknál és képviseleti tereknél nem fér bele a zavaros kivitelezés. A munka legyen rövid, diszkrét és tisztán kommunikált.",
        en:
          "Offices and representative spaces need quiet, organised work. The job should be short, discreet and clearly communicated.",
      },
      problem: {
        hu:
          "A falakon és használati pontokon apró sérülések rontották a rendezett képet. Ezek nem nagy hibák, de egy látogatásnál feltűnnek.",
        en:
          "Small marks and worn areas affected the professional feel of the office. They were not major defects, but they are noticeable during a visit.",
      },
      approach: {
        hu:
          "A munka a látható felületekre koncentrál: faljavítás, javítófestés, kisebb igazítások és tiszta átadás.",
        en:
          "Work focuses on visible surfaces: wall repair, touch-up painting, small adjustments and clean handover.",
      },
      result: {
        hu:
          "Az iroda rendezettebb, nyugodtabb és vendégfogadásra alkalmasabb benyomást kelt.",
        en:
          "The office feels more orderly, calmer and better prepared for visitors.",
      },
      works: {
        hu: ["látható sérülések felmérése", "javítófestés", "gipszkarton részjavítás", "kisebb szerelés", "tiszta átadás"],
        en: ["visible defect check", "touch-up painting", "minor drywall repair", "small adjustments", "tidy handover"],
      },
      evidence: {
        hu: ["diszkrét munkaszervezés", "részletfotók", "átadás előtti ellenőrzés", "kész állapot"],
        en: ["discreet scheduling", "detail photos", "pre-handover check", "finished condition"],
      },
      metrics: [
        { n: "HU/EN", hu: "kommunikáció", en: "communication" },
        { n: "5", hu: "ellenőrzési pont", en: "check points" },
        { n: "10", hu: "kép", en: "images" },
      ],
      photos: [
        ["5483236", "before", { hu: "Üres irodatér frissítés előtt: a cél a tiszta, használatra kész munkakörnyezet.", en: "Empty office before refresh, with the goal of a clean, usable work environment." }],
        ["8477444", "before", { hu: "Nagyobb nyitott iroda átadás előtt, ahol a teljes tér összképe számít.", en: "Large open office before handover, where the overall impression matters." }],
        ["assets/budapest-office-process-wall-touchup.jpg", "process", { hu: "Szervezett javítófestés egy budapesti iroda kisebb falszakaszán.", en: "Organised touch-up painting on a small wall section in a Budapest office." }],
        ["5511098", "process", { hu: "Nagyobb irodai munkatér ellenőrzése frissítés előtt, teljesebb perspektívából.", en: "Larger office workspace reviewed before refresh, shown from a wider perspective." }],
        ["assets/budapest-office-finished-1.jpg", "after", { hu: "Rendezett budapesti irodatér tiszta falakkal és hétköznapi berendezéssel.", en: "Tidy Budapest office with clean walls and practical furnishings." }],
        ["assets/budapest-office-finished-2.jpg", "after", { hu: "Világos, látogatófogadásra kész budapesti váró- és közösségi tér.", en: "Bright Budapest waiting and shared area ready to receive visitors." }],
        ["assets/budapest-office-finished-3.jpg", "after", { hu: "Egyszerű budapesti tárgyaló egységes falakkal és rendezett összképpel.", en: "Simple Budapest meeting room with consistent walls and an orderly appearance." }],
        ["7534216", "after", { hu: "Kész tárgyaló jellegű tér, tiszta falakkal és rendezett összképpel.", en: "Finished meeting-style room with clean walls and an orderly appearance." }],
        ["36631699", "after", { hu: "Tágas iroda teljes nézetben, rendezett munkaállomásokkal.", en: "Spacious office shown in full view, with orderly workstations." }],
        ["1181406", "after", { hu: "Teljes irodatér használat közben: a frissített környezet professzionálisabb képet ad.", en: "Full office area in use, with the refreshed environment supporting a more professional feel." }],
      ],
    },
    {
      key: "handover-small-fixes",
      category: "handyman",
      type: { hu: "Kisebb javítások / átadás", en: "Small repairs / handover" },
      cover: "assets/budapest-airbnb-bedroom.jpg",
      before: "assets/budapest-handyman-before-matched.jpg",
      after: "assets/budapest-airbnb-bedroom.jpg",
      title: { hu: "Apró hibákból rendezett átadás", en: "Small defects turned into a tidy handover" },
      location: { hu: "Budapesti bérlemény", en: "Budapest rental property" },
      timeline: { hu: "átadás előtti javítás", en: "pre-handover repairs" },
      client: { hu: "tulajdonos / kezelő", en: "owner / manager" },
      summary: {
        hu:
          "A kisebb hibák külön-külön nem tűnnek súlyosnak, de együtt azt sugallják, hogy az ingatlan nincs kézben tartva.",
        en:
          "Small defects may not look serious individually, but together they suggest the property is not being managed properly.",
      },
      problem: {
        hu:
          "Karnis, polc, fogantyú, szegély vagy ajtóigazítás jellegű apróságok gyűltek össze. Ezek átadásnál vagy fotózásnál erősen látszanak.",
        en:
          "Small items such as rails, shelves, handles, trims or door adjustments had built up. These details are visible during handover or photography.",
      },
      approach: {
        hu:
          "A munkát listázzuk, majd egy körben kezeljük a kisebb hibákat. Így a tulajdonos nem veszít időt sok külön egyeztetéssel.",
        en:
          "The items are listed and handled in one focused visit, reducing the need for the owner to coordinate multiple small tasks.",
      },
      result: {
        hu:
          "Az ingatlan rendezettebb és átadhatóbb lett, a javítások pedig követhető listában szerepelnek.",
        en:
          "The property becomes tidier and easier to hand over, with completed fixes documented in a clear list.",
      },
      works: {
        hu: ["javítási lista", "kisebb rögzítések", "ajtó és szegély igazítás", "látható hibák kezelése", "fotós visszajelzés"],
        en: ["repair list", "small fixings", "door and trim adjustments", "visible defect handling", "photo update"],
      },
      evidence: {
        hu: ["feladatlista", "munkafolyamat képek", "kész állapot", "átadásra alkalmasabb tér"],
        en: ["task list", "process images", "finished condition", "more handover-ready space"],
      },
      metrics: [
        { n: "1", hu: "szervezett kör", en: "organised visit" },
        { n: "10", hu: "fotó", en: "photos" },
        { n: "5+", hu: "tipikus apró hiba", en: "typical small defects" },
      ],
      photos: services[3].photos,
    }
  );

  const projectFilters = [
    { key: "all", label: { hu: "Összes munkatípus", en: "All service types" } },
    { key: "painting", label: { hu: "Festés", en: "Painting" } },
    { key: "drywall", label: { hu: "Gipszkarton", en: "Drywall" } },
    { key: "garden", label: { hu: "Kert", en: "Garden" } },
    { key: "airbnb", label: { hu: "Airbnb", en: "Airbnb" } },
    { key: "office", label: { hu: "Iroda", en: "Office" } },
    { key: "handyman", label: { hu: "Kisebb javítás", en: "Small fixes" } },
  ];

  const referenceProofs = [
    {
      n: "01",
      title: { hu: "Állapot előtte", en: "Condition before" },
      text: {
        hu: "Az illusztráció megmutatja az adott munkatípus jellemző kiinduló állapotát.",
        en: "The illustration shows a typical starting condition for this kind of work.",
      },
    },
    {
      n: "02",
      title: { hu: "Munka közben", en: "During the work" },
      text: {
        hu: "A képek a jellemző előkészítési és javítási lépéseket szemléltetik.",
        en: "The images illustrate typical preparation and repair stages.",
      },
    },
    {
      n: "03",
      title: { hu: "Kész átadás", en: "Finished handover" },
      text: {
        hu: "A várható eredmény egyszerűen látható: tisztább felület és rendezettebb tér.",
        en: "The expected result is easy to understand: cleaner surfaces and a tidier space.",
      },
    },
  ];

  const phaseCounts = (photos = []) =>
    photos.reduce(
      (counts, photo) => {
        counts[photo[1]] += 1;
        return counts;
      },
      { before: 0, process: 0, after: 0 }
    );

  const filteredProjects = () =>
    state.projectFilter === "all" ? projects : projects.filter((project) => project.category === state.projectFilter);

  const problems = [
    ["Külföldön élő tulajdonos", "Foreign owner", "Az egyeztetés fotókkal is elindítható, így nem szükséges minden döntéshez Budapesten tartózkodni.", "The conversation can begin with photos, so the owner does not need to be in Budapest for every decision."],
    ["Airbnb-vendégváltás", "Airbnb turnover", "A látható hibák és kisebb javítások a következő érkezéshez igazíthatók, reális határidővel.", "Visible defects and small repairs can be scheduled around the next arrival, with realistic timing."],
    ["Bérlő kiköltözése után", "After a tenant moves out", "Falhibák, kisebb sérülések és az átadás előtti frissítés egy közös feladatlistába rendezhető.", "Wall marks, minor damage and pre-handover touch-ups can be organised into one practical scope."],
    ["Célzott falfrissítés", "Focused wall refresh", "Nem minden helyzet igényel teljes festést: gyakran a leginkább látható felületek rendezése a megfelelő megoldás.", "Not every property needs a full repaint; often the right answer is a careful refresh of the most visible areas."],
    ["Elhanyagolt udvar vagy kert", "Neglected yard or garden", "Fűnyírással, metszéssel és a járófelületek rendezésével a külső tér ismét gondozott képet mutathat.", "Mowing, pruning and tidying paths can restore an orderly appearance to the outdoor area."],
    ["Iroda látogatás előtt", "Office before a visit", "Kisebb faljavítások, festés és szerelések úgy ütemezhetők, hogy a napi működést a lehető legkevésbé zavarják.", "Minor wall repairs, painting and fittings can be scheduled to limit disruption to normal office use."],
  ];

  const process = [
    ["Fotók és rövid leírás", "Photos and a short brief", "Küldje el, mi a probléma, hol található az ingatlan és milyen határidő fontos.", "Send the issue, property location and any timing requirement."],
    ["Feladat és következő lépés", "Scope and next step", "Tisztázzuk a várható munkát, és jelezzük, ha a pontosításhoz helyszíni felmérés szükséges.", "We clarify the likely scope and explain if an on-site assessment is needed."],
    ["Egyeztetett kivitelezés", "Agreed execution", "A munka a jóváhagyott feladatokra koncentrál, a változásokat pedig külön egyeztetjük.", "Work follows the agreed scope, with any change discussed separately."],
    ["Fotós visszajelzés", "Photo updates", "A lényeges állapotokról kérés szerint fotó készül, így távolról is követhető az előrehaladás.", "Key stages can be photographed so progress remains visible from abroad."],
    ["Rendezett átadás", "Orderly handover", "Az elkészült feladatokat összefoglaljuk, az ingatlant pedig használható, rendezett állapotban hagyjuk.", "Completed work is summarised and the property is left usable and orderly."],
  ];

  const audience = [
    ["Nagykövetségek és képviseletek", "Embassies and representative offices", "Diszkrét egyeztetés és rendezett munkavégzés rezidenciákban, irodákban és képviseleti terekben. A feladatok a helyszín használatához és a belépési szabályokhoz igazíthatók.", "Discreet coordination and orderly work in residences, offices and representative spaces. Tasks can be planned around the use of the property and site-access requirements."],
    ["Nemzetközi cégek és irodák", "International companies and offices", "Kisebb javítások, falfrissítés és szerelési feladatok a napi működéshez igazítva. A cél a rendezett környezet helyreállítása indokolatlan fennakadás nélkül.", "Minor repairs, wall refreshes and fittings can be scheduled around normal operations. The goal is to restore an orderly environment without unnecessary disruption."],
    ["Külföldi tulajdonosok", "Foreign property owners", "Az egyeztetés magyarul vagy angolul történhet, a fontos állapotokról pedig fotós visszajelzés kérhető. Ez különösen hasznos, ha a tulajdonos nem tartózkodik Budapesten.", "Communication is available in Hungarian or English, with photo updates for important stages. This is particularly useful when the owner is not in Budapest."],
    ["Airbnb és hosszú távú bérlemények", "Airbnb and long-term rentals", "Vendég- vagy bérlőváltás előtt a látható hibák, faljavítások és kisebb karbantartási feladatok egy folyamatban kezelhetők. A határidőt mindig a tényleges munka alapján egyeztetjük.", "Visible defects, wall repairs and small maintenance jobs can be handled together before a guest or tenant change. Timing is always agreed against the actual scope."],
    ["Magánházak és lakástulajdonosok", "Private homeowners and apartment owners", "Családi házak és saját használatú lakások kisebb javításai, festése, gipszkarton-javítása, kert- és szezonális karbantartása is egy átlátható feladatlistába rendezhető. Költözés vagy értékesítés előtt segítünk az otthont rendezett, használható és bemutatható állapotba hozni.", "Small repairs, painting, drywall work, garden care and seasonal maintenance can be organised into one clear scope for family houses and owner-occupied apartments. Before moving in or selling, we help prepare the home so it is tidy, usable and ready to present."],
  ];

  const faq = [
    ["Lehet csak kisebb munkát kérni?", "Can I request a small job?", "Igen. A szolgáltatás kifejezetten alkalmas kisebb, de fontos javításokra is, például falhibákra, szerelési feladatokra vagy átadás előtti frissítésre. A vállalhatóságot mindig a helyszín, a feladatlista és az időzítés alapján erősítjük meg.", "Yes. The service is suitable for smaller but important jobs such as wall repairs, fittings or pre-handover touch-ups. Availability is confirmed against the location, task list and required timing."],
    ["Küldhetek fotókat első körben?", "Can I send photos first?", "Igen, ez a legegyszerűbb kiindulópont. Néhány jól megvilágított összkép és közelkép sokszor elég ahhoz, hogy meghatározzuk a következő lépést. Ha a pontos műszaki tartalom fotókból nem állapítható meg, helyszíni felmérést javaslunk.", "Yes, that is usually the easiest place to start. A few clear overview and close-up photos are often enough to identify the next step. If the technical scope cannot be confirmed from images, we will recommend an on-site assessment."],
    ["Angolul is lehet egyeztetni?", "Is English communication available?", "Igen. A feladat egyeztetése, a munkafázisok visszajelzése és az átadás magyarul vagy angolul is történhet. Ez nem külön szolgáltatás, hanem a működés része.", "Yes. Scope, progress updates and handover can all be handled in Hungarian or English. Bilingual communication is part of the service, not an add-on."],
    ["Hogyan alakul az ár?", "How is pricing established?", "Az ár a tényleges feladatból, az anyagigényből, a hozzáférésből és az időzítésből áll össze. Fotók alapján gyakran adható első tájékoztatás, de összetettebb vagy rejtett hibáknál helyszíni felmérés szükséges lehet. A jóváhagyott munkán túli változásokat külön egyeztetjük.", "Pricing depends on the actual scope, materials, access and timing. Photos can often support an initial indication, while complex or concealed issues may require a site assessment. Changes beyond the agreed work are discussed separately."],
    ["Tudnak segíteni sürgős Airbnb-helyzetben?", "Can you help with an urgent Airbnb issue?", "A rövid határidejű feladatokat kapacitás és a munka terjedelme alapján vizsgáljuk meg. A fotók, a pontos cím és a következő vendég érkezési ideje segít gyorsan eldönteni, mi vállalható reálisan. Nem ígérünk olyan határidőt, amely mellett a munka minősége nem tartható.", "Short-notice work is considered against current capacity and the real scope. Photos, the exact location and the next arrival time help us assess what can be completed realistically. We do not promise a deadline that would compromise the work."],
    ["Mi történik, ha nem vagyok Budapesten?", "What if I am not in Budapest?", "A feladat távolról is egyeztethető, ha a bejutás és a döntési jogosultság rendezett. A fontos kérdéseket indulás előtt tisztázzuk, a munkáról pedig kérés szerint fotós frissítést küldünk. Kulcsátadást vagy helyszíni kapcsolattartót minden esetben előre egyeztetünk.", "The work can be coordinated remotely when access and decision-making authority are clear. Important questions are settled before the visit, with photo updates available on request. Key handover or a local contact is always agreed in advance."],
    ["Budapesten kívül is vállalnak munkát?", "Do you work outside Budapest?", "Az elsődleges működési terület Budapest. A közvetlen környéken lévő feladatokat a távolság, a munka mérete és az időzítés alapján lehet megvizsgálni. Érdemes elküldeni a pontos helyszínt már az első üzenetben.", "Budapest is the primary service area. Jobs in the nearby area can be considered depending on distance, scope and timing. Include the exact location in the first message so feasibility can be assessed quickly."],
    ["A weboldal képei saját referenciák?", "Are the website images completed client projects?", "Nem. Az oldalon szereplő képek illusztratív példák, amelyek tipikus kiinduló állapotokat, munkafázisokat és várható eredményeket mutatnak. Egy konkrét ingatlan feladatát mindig a helyszín és a tényleges állapot alapján egyeztetjük.", "No. The images are illustrative examples showing typical starting conditions, work stages and expected outcomes. The scope for a specific property is always agreed from its actual condition and site requirements."],
  ];

  projects.forEach((project) => {
    project.description = project.description || project.summary;
    project.images = project.images || project.photos || [];
    project.photos = project.images;
    project.videos = [];
  });

  const serviceCards = () =>
    services
      .map(
        (item, index) => `
        <article class="service" data-reveal>
          <button data-service="${index}" aria-label="${tx(item.title)}">
            <div class="media"><img src="${img(item.cover)}" alt="${tx(item.title)}" loading="lazy" decoding="async"></div>
            <div class="body">
              <h3>${tx(item.title)}</h3>
              <p>${tx(item.text)}</p>
              <span class="link">${state.lang === "hu" ? "Képek megnyitása" : "Open gallery"}</span>
            </div>
          </button>
        </article>`
      )
      .join("");

  const disclosureHint = () => state.lang === "hu" ? "Részletek" : "Details";

  const statCards = () =>
    content.stats
      .map(
        (item) => `
        <details class="stat" name="hero-facts" data-reveal>
          <summary>
            <span><b>${state.lang === "hu" ? item.huN : item.enN}</b><small>${state.lang === "hu" ? item.hu : item.en}</small></span>
            <span class="disclosure-icon" aria-hidden="true">+</span>
          </summary>
          <p>${state.lang === "hu" ? item.huDetail : item.enDetail}</p>
        </details>`
      )
      .join("");

  const problemCards = () =>
    problems
      .map(
        (item, index) => `
        <details class="problem" name="situations" data-reveal>
          <summary>
            <span class="media"><img src="${img(services[index % services.length].cover)}" alt="${state.lang === "hu" ? item[0] : item[1]}" loading="lazy" decoding="async"></span>
            <span class="body">
              <span class="eyebrow">${state.lang === "hu" ? "Tipikus helyzet" : "Typical situation"}</span>
              <strong>${state.lang === "hu" ? item[0] : item[1]}</strong>
              <span class="disclosure-link">${disclosureHint()} <span aria-hidden="true">+</span></span>
            </span>
          </summary>
          <div class="problem-detail">
            <p>${state.lang === "hu" ? item[2] : item[3]}</p>
            <p><strong>${state.lang === "hu" ? "A jó kiindulópont:" : "A useful first step:"}</strong> ${state.lang === "hu" ? "néhány fotó, a helyszín és a kívánt határidő." : "a few photos, the location and the preferred timing."}</p>
          </div>
        </details>`
      )
      .join("");

  const audienceCards = () =>
    audience
      .map(
        (item, index) => `
        <details class="audience" name="audiences" data-reveal>
          <summary>
            <span class="audience-number">0${index + 1}</span>
            <span><strong>${state.lang === "hu" ? item[0] : item[1]}</strong><small>${disclosureHint()}</small></span>
            <span class="disclosure-icon" aria-hidden="true">+</span>
          </summary>
          <p>${state.lang === "hu" ? item[2] : item[3]}</p>
        </details>`
      )
      .join("");

  const faqAccordion = () =>
    faq
      .map(
        (item, index) => `
        <details class="faq" name="faq" data-reveal>
          <summary><span>${state.lang === "hu" ? item[0] : item[1]}</span><span class="disclosure-icon" aria-hidden="true">+</span></summary>
          <div class="faq-answer"><p>${state.lang === "hu" ? item[2] : item[3]}</p></div>
        </details>`
      )
      .join("");

  const referenceProofCards = () =>
    referenceProofs
      .map(
        (item) => `
        <article class="reference-proof" data-reveal>
          <b>${item.n}</b>
          <strong>${tx(item.title)}</strong>
          <p>${tx(item.text)}</p>
        </article>`
      )
      .join("");

  const projectFilterButtons = () =>
    projectFilters
      .map(
        (filter) =>
          `<button class="${state.projectFilter === filter.key ? "active" : ""}" data-project-filter="${filter.key}">${tx(filter.label)}</button>`
      )
      .join("");

  const projectCarousel = (item, index, mode = "card") => {
    const id = `${mode}-${index}`;
    const isModal = mode === "modal";
    const images = item.images || [];
    return `
      <div class="project-carousel ${isModal ? "large" : "compact"}" data-carousel="${id}" data-project-index="${index}" data-carousel-action="${isModal ? "gallery" : "project"}" data-active="0" data-phase="all">
        <div class="carousel-head">
          <strong>${state.lang === "hu" ? "Illusztratív képsorozat" : "Illustrative image sequence"}</strong>
          <span data-carousel-count aria-live="polite">${images.length} ${state.lang === "hu" ? "kép" : "images"}</span>
        </div>
        <div class="carousel-stage">
          <button class="carousel-arrow carousel-prev" type="button" data-carousel-prev="${id}" aria-label="${state.lang === "hu" ? "Előző kép" : "Previous image"}">‹</button>
          <div class="carousel-viewport">
            <div class="carousel-track">
              ${images.map((p, i) => `<button class="carousel-slide" type="button" data-slide="${i}" data-phase="${p[1]}"><img src="${img(p[0], isModal ? 1100 : 520)}" alt="${photoCaption(p)}" loading="${isModal && i === 0 ? "eager" : "lazy"}" decoding="async"><span class="slide-caption"><b>${phaseText(p[1])}</b><span>${photoCaption(p)}</span></span></button>`).join("")}
            </div>
          </div>
          <button class="carousel-arrow carousel-next" type="button" data-carousel-next="${id}" aria-label="${state.lang === "hu" ? "Következő kép" : "Next image"}">›</button>
        </div>
        <div class="carousel-thumbs">
          ${images.map((p, i) => `<button type="button" data-carousel-dot="${id}" data-slide-to="${i}" data-phase="${p[1]}" aria-label="${phaseText(p[1])} ${i + 1}: ${photoCaption(p)}"><img src="${img(p[0], 180)}" alt="" loading="lazy" decoding="async"></button>`).join("")}
        </div>
      </div>`;
  };

  const mediaReferenceCards = () =>
    projects
      .slice(0, 4)
      .map(
        (item, index) => `
        <article class="video-card media-reference-card" data-reveal>
          <button type="button" data-project="${index}" aria-label="${tx(item.title)}">
            <div class="video-poster">
              <img src="${img(item.cover, 900)}" alt="${tx(item.title)}" loading="lazy" decoding="async">
              <span class="video-type">${state.lang === "hu" ? "10 képes galéria" : "10-photo gallery"}</span>
            </div>
            <div class="body">
              <h3>${tx(item.title)}</h3>
              <p>${state.lang === "hu" ? "Előtte, munkafolyamat és kész állapot kizárólag ehhez a munkatípushoz rendezve." : "Before, work-in-progress and finished images organised only for this service type."}</p>
            </div>
          </button>
        </article>`
      )
      .join("");

  const projectCards = () =>
    filteredProjects()
      .map(
        (item) => {
          const index = projects.indexOf(item);
          const images = item.images || [];
          const counts = phaseCounts(images);
          return `
        <article class="project project-card rich" data-reveal>
          <button class="case-open" data-project="${index}" aria-label="${tx(item.title)}">
            <div class="case-preview">
              <img src="${img(item.before)}" alt="${tx(phaseLabel.before)}" loading="lazy" decoding="async">
              <img src="${img(item.after)}" alt="${tx(phaseLabel.after)}" loading="lazy" decoding="async">
              <span class="divider"></span>
              <span class="mini-label before">${tx(phaseLabel.before)}</span>
              <span class="mini-label after">${tx(phaseLabel.after)}</span>
            </div>
            <div class="body">
              <span class="case-type">${tx(item.type)}</span>
              <h3>${tx(item.title)}</h3>
              <p>${tx(item.summary)}</p>
              <div class="case-topline">
                <span>${tx(item.location)}</span>
                <span>${tx(item.timeline)}</span>
                <span>${tx(item.client)}</span>
              </div>
              <div class="case-proof-row">
                <div><b>${images.length}</b><small>${state.lang === "hu" ? "fotó" : "photos"}</small></div>
                <div><b>${counts.process}</b><small>${tx(phaseLabel.process)}</small></div>
                <div><b>3</b><small>${state.lang === "hu" ? "fázis" : "phases"}</small></div>
              </div>
              <div class="phases">
                <span>${tx(phaseLabel.before)}</span><span>${tx(phaseLabel.process)}</span><span>${tx(phaseLabel.after)}</span>
              </div>
              <span class="case-link">${state.lang === "hu" ? "Képes példa megnyitása" : "Open visual example"}</span>
            </div>
          </button>
        </article>`;
        }
      )
      .join("");

  let globalEventsBound = false;
  let revealObserver;
  const modalOpeners = new WeakMap();

  const render = () => {
    document.documentElement.lang = state.lang;
    document.body.innerHTML = `
      <header class="header">
        <a class="brand" href="#top" aria-label="Budapest Property Services">
          <span class="logo">BPS</span>
          <span><strong>Budapest Property Services</strong><small>${state.lang === "hu" ? "Festés, gipszkarton, kert, kisebb javítások" : "Painting, drywall, garden care, small repairs"}</small></span>
        </a>
        <nav class="nav" aria-label="${state.lang === "hu" ? "Fő navigáció" : "Main navigation"}">
          <a href="#services">${tx(content.nav.services)}</a>
          <a href="#clients">${tx(content.nav.clients)}</a>
          <a href="#projects">${tx(content.nav.projects)}</a>
          <a href="#media">${state.lang === "hu" ? "Képek" : "Images"}</a>
          <a href="#contact">${tx(content.nav.contact)}</a>
        </nav>
        <div class="actions">
          <button class="lang" id="langBtn" type="button" aria-label="${state.lang === "hu" ? "Switch to English" : "Váltás magyar nyelvre"}">HU / EN</button>
          <a class="btn primary phone" href="${tel}" data-phone-action aria-label="${phoneActionLabel()}">${phone}</a>
        </div>
      </header>

      <main id="top">
        <section class="hero wrap" aria-labelledby="hero-title">
          <div class="hero-copy" data-reveal>
            <div class="eyebrow">${tx(content.hero.label)}</div>
            <h1 id="hero-title">${tx(content.hero.title)}</h1>
            <p class="lead">${tx(content.hero.text)}</p>
            <div class="hero-ctas">
              <a class="btn primary" href="${tel}" data-phone-action>${phoneActionLabel()}</a>
              <a class="btn" href="#projects">${tx(content.hero.secondary)}</a>
              <a class="btn text-btn" href="${wa}">WhatsApp <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <figure class="hero-media" data-reveal>
            <div class="hero-image-shell"><img src="${img(heroImage)}" width="1600" height="800" fetchpriority="high" alt="${state.lang === "hu" ? "Falfrissítésre előkészített budapesti polgári lakás" : "Budapest apartment prepared for a careful wall refresh"}"></div>
            <figcaption class="note"><span class="note-mark" aria-hidden="true">01</span><span><strong>${tx(content.hero.noteTitle)}</strong><p>${tx(content.hero.noteText)}</p></span></figcaption>
          </figure>
          <div class="stats" data-accordion-group="hero-stats">${statCards()}</div>
        </section>

        <aside class="illustration-note wrap" data-reveal>
          <span aria-hidden="true">i</span>
          <p>${state.lang === "hu" ? "Az oldalon szereplő képek illusztrációk, amelyek tipikus munkafolyamatokat és várható eredményeket mutatnak." : "The images on this website are illustrative examples showing typical work processes and expected results."}</p>
        </aside>

        <section id="services" class="section section-band">
          <div class="wrap">
            <div class="section-head" data-reveal><span class="section-index">01</span><h2>${tx(content.servicesTitle)}</h2><p>${tx(content.servicesText)}</p></div>
            <div class="grid four service-grid">${serviceCards()}</div>
          </div>
        </section>

        <section class="section wrap situations-section">
          <div class="section-head" data-reveal><span class="section-index">02</span><h2>${tx(content.problemsTitle)}</h2><p>${state.lang === "hu" ? "Nem minden ingatlannak ugyanarra van szüksége. Nyissa meg azt a helyzetet, amelyik legközelebb áll az Önéhez." : "Every property situation is different. Open the scenario that most closely matches yours."}</p></div>
          <div class="situation-grid" data-accordion-group="situations">${problemCards()}</div>
        </section>

        <section id="projects" class="section section-band projects-section">
          <div class="wrap">
            <div class="section-head" data-reveal><span class="section-index">03</span><h2>${tx(content.projectsTitle)}</h2><p>${state.lang === "hu" ? "A példák tipikus kiinduló állapotokat, munkafázisokat és várható eredményeket mutatnak. Nem saját referenciaprojektek; egy konkrét ingatlan feladatát mindig külön egyeztetjük." : "These examples show typical starting conditions, work stages and expected outcomes. They are not presented as completed client projects; every real scope is agreed separately."}</p></div>
            <div class="reference-panel" data-reveal>
              <div>
                <span class="eyebrow">${state.lang === "hu" ? "Távolról is követhető" : "Clear from a distance"}</span>
                <h3>${state.lang === "hu" ? "A lényeges állapotok láthatók maradnak." : "Important stages remain visible."}</h3>
                <p>${state.lang === "hu" ? "A feladatot az ingatlan tényleges állapota alapján rögzítjük, a munkafázisokról pedig kérés szerint fotós visszajelzés készül." : "The scope is based on the property's actual condition, with photo updates available for important work stages."}</p>
              </div>
              <div class="reference-proof-grid">${referenceProofCards()}</div>
            </div>
            <div class="filterbar" data-reveal>${projectFilterButtons()}</div>
            <div class="grid project-grid-rich">${projectCards()}</div>
          </div>
        </section>

        <section id="media" class="section wrap">
          <div class="section-head" data-reveal><span class="section-index">04</span><h2>${state.lang === "hu" ? "Képes munkafolyamatok" : "Visual work processes"}</h2><p>${state.lang === "hu" ? "Nézze meg a szolgáltatástípusonként rendezett képsorozatokat. A részletes galéria és az előtte-utána összehasonlítás egyetlen nézetben nyílik meg." : "Browse image sequences organised by service type. Each opens a focused view with the full gallery and before-and-after comparison."}</p></div>
          <div class="video-grid">${mediaReferenceCards()}</div>
        </section>

        <section id="clients" class="section section-band clients-section">
          <div class="wrap audience-layout">
            <div class="section-head" data-reveal><span class="section-index">05</span><h2>${tx(content.audienceTitle)}</h2><p>${state.lang === "hu" ? "A szolgáltatás azoknak készült, akik megbízható egyeztetést és jól dokumentált, rendezett munkát keresnek Budapesten." : "The service is for clients who value reliable coordination and well-documented, orderly work in Budapest."}</p></div>
            <div class="audience-list" data-accordion-group="audiences">${audienceCards()}</div>
          </div>
        </section>

        <section class="section wrap process-section">
          <div class="process-layout">
            <div>
              <div class="section-head" data-reveal><span class="section-index">06</span><h2>${tx(content.processTitle)}</h2><p>${state.lang === "hu" ? "A folyamat minden pontján egyértelmű, mi történik, milyen döntés szükséges és mikor várható visszajelzés." : "At every stage, it is clear what happens next, which decisions are needed and when an update is expected."}</p></div>
              <div class="steps">${process.map((p, i) => `<article class="step" data-reveal><span class="num">${String(i + 1).padStart(2, "0")}</span><div><h3>${state.lang === "hu" ? p[0] : p[1]}</h3><p>${state.lang === "hu" ? p[2] : p[3]}</p></div></article>`).join("")}</div>
            </div>
            <aside class="trust-panel" data-reveal>
              <span class="eyebrow">${state.lang === "hu" ? "Bizalom a gyakorlatban" : "Trust in practice"}</span>
              <h2>${tx(content.trustTitle)}</h2>
              <p>${state.lang === "hu" ? "Nem nagy ígéretekre, hanem tisztán rögzített feladatra és követhető visszajelzésre építünk." : "The service is built on a clearly agreed scope and useful updates, not exaggerated promises."}</p>
              <div class="trust-list">
                <div><span aria-hidden="true">✓</span><p><strong>${state.lang === "hu" ? "Tiszta feladatlista" : "Clear scope"}</strong>${state.lang === "hu" ? "A munka előtt rögzítjük, mi tartozik a feladatba." : "What is included is clarified before work starts."}</p></div>
                <div><span aria-hidden="true">✓</span><p><strong>${state.lang === "hu" ? "Érthető kommunikáció" : "Useful communication"}</strong>${state.lang === "hu" ? "A fontos döntések és változások nem maradnak feltételezések." : "Important decisions and changes are not left to assumption."}</p></div>
                <div><span aria-hidden="true">✓</span><p><strong>${state.lang === "hu" ? "Rendezett átadás" : "Orderly handover"}</strong>${state.lang === "hu" ? "A végeredmény mellett az ingatlan használható állapota is számít." : "A usable, presentable property matters alongside the repair itself."}</p></div>
              </div>
            </aside>
          </div>
        </section>

        <section class="section section-band faq-section">
          <div class="wrap faq-layout">
            <div class="section-head" data-reveal><span class="section-index">07</span><h2>${tx(content.faqTitle)}</h2><p>${state.lang === "hu" ? "Gyakorlati válaszok a felmérésről, árazásról, határidőkről és távoli egyeztetésről." : "Practical answers about assessment, pricing, timing and remote coordination."}</p></div>
            <div class="faq-list" data-accordion-group="faq">${faqAccordion()}</div>
          </div>
        </section>

        <section id="contact" class="section wrap">
          <div class="contact" data-reveal>
            <div class="contact-copy"><span class="eyebrow">${state.lang === "hu" ? "Első lépés" : "First step"}</span><h2>${tx(content.contactTitle)}</h2><p>${tx(content.contactText)}</p><div class="contact-points"><span>${state.lang === "hu" ? "Fotók" : "Photos"}</span><span>${state.lang === "hu" ? "Helyszín" : "Location"}</span><span>${state.lang === "hu" ? "Határidő" : "Timing"}</span></div></div>
            <div class="contact-card"><span class="contact-number">${phone}</span><a class="btn primary" href="${wa}">${state.lang === "hu" ? "Fotók küldése WhatsAppon" : "Send photos on WhatsApp"}</a><a class="btn" href="${tel}" data-phone-action>${phoneActionLabel()}</a><small>${state.lang === "hu" ? "Elsődleges terület: Budapest és közvetlen környéke." : "Primary service area: Budapest and nearby locations."}</small></div>
          </div>
        </section>
      </main>

      <footer class="footer"><span>Budapest Property Services</span><span>${state.lang === "hu" ? "Ingatlankarbantartás Budapesten, magyar és angol kommunikációval." : "Property maintenance in Budapest, with Hungarian and English communication."}</span></footer>
      <div class="mobile-cta"><a href="${tel}" data-phone-action>${state.lang === "hu" ? "Hívás" : "Call"}</a><a href="${wa}" aria-label="WhatsApp">WhatsApp</a></div>
      <div class="toast" id="phoneToast" role="status" aria-live="polite" aria-atomic="true"></div>
      <div id="projectModal" class="modal" role="dialog" aria-modal="true" aria-hidden="true"><button class="backdrop" data-close aria-label="${state.lang === "hu" ? "Ablak bezárása" : "Close dialog"}"></button><div class="panel" tabindex="-1"><button class="close" type="button" data-close aria-label="${state.lang === "hu" ? "Ablak bezárása" : "Close dialog"}">×</button><div id="projectInner"></div></div></div>
      <div id="galleryModal" class="modal" role="dialog" aria-modal="true" aria-hidden="true"><button class="backdrop" data-close aria-label="${state.lang === "hu" ? "Galéria bezárása" : "Close gallery"}"></button><div class="panel" tabindex="-1"><button class="close" type="button" data-close aria-label="${state.lang === "hu" ? "Galéria bezárása" : "Close gallery"}">×</button><div id="galleryInner"></div></div></div>
    `;
    bind();
    reveal();
    initCarousels(document);
  };

  const showToast = (message) => {
    const toast = document.getElementById("phoneToast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
  };

  const copyPhoneToClipboard = async () => {
    let copied = false;
    try {
      await navigator.clipboard.writeText(phone);
      copied = true;
    } catch {
      const input = document.createElement("textarea");
      input.value = phone;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      copied = document.execCommand("copy");
      input.remove();
    }
    showToast(
      copied
        ? state.lang === "hu" ? `Telefonszám másolva: ${phone}` : `Phone number copied: ${phone}`
        : state.lang === "hu" ? `Telefonszám: ${phone}` : `Phone number: ${phone}`
    );
  };

  const bind = () => {
    document.getElementById("langBtn").addEventListener("click", () => {
      state.lang = state.lang === "hu" ? "en" : "hu";
      localStorage.setItem("bps-lang", state.lang);
      render();
    });
    document.querySelectorAll("[data-accordion-group]").forEach((group) => {
      group.querySelectorAll("details").forEach((detail) => {
        detail.addEventListener("toggle", () => {
          if (!detail.open) return;
          group.querySelectorAll("details[open]").forEach((other) => {
            if (other !== detail) other.open = false;
          });
        });
      });
    });
    document.querySelectorAll("[data-project-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.projectFilter = btn.dataset.projectFilter;
        render();
        document.getElementById("projects")?.scrollIntoView({ block: "start" });
      });
    });
    document.querySelectorAll("[data-service]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = services[Number(btn.dataset.service)];
        openGallery(item.photos, 0, tx(item.title));
      });
    });
    document.querySelectorAll("[data-project]").forEach((btn) => {
      btn.addEventListener("click", () => openProject(Number(btn.dataset.project)));
    });
    document.getElementById("projectModal").addEventListener("click", (event) => {
      const slide = event.target.closest('[data-carousel-action="gallery"] [data-slide]');
      if (!slide) return;
      const carousel = slide.closest("[data-carousel]");
      const project = projects[Number(carousel.dataset.projectIndex)];
      openGallery(project.images, Number(slide.dataset.slide), tx(project.title));
    });
    document.querySelectorAll("[data-close]").forEach((btn) => {
      btn.addEventListener("click", () => closeModal(btn.closest(".modal")));
    });
    if (!globalEventsBound) {
      globalEventsBound = true;
      document.addEventListener("click", (event) => {
        const phoneLink = event.target.closest("[data-phone-action]");
        if (!phoneLink || directCallViewport()) return;
        event.preventDefault();
        copyPhoneToClipboard();
      });
      document.addEventListener("keydown", (event) => {
        const modal = activeModal();
        if (event.key === "Escape" && modal) {
          event.preventDefault();
          closeModal(modal);
        } else if (event.key === "Tab" && modal) {
          trapFocus(event, modal);
        } else if (modal?.id === "galleryModal" && event.key === "ArrowLeft") {
          showGallery(state.galleryIndex - 1);
        } else if (modal?.id === "galleryModal" && event.key === "ArrowRight") {
          showGallery(state.galleryIndex + 1);
        }
      });
    }
  };

  const openProject = (index) => {
    const item = projects[index];
    const images = item.images || [];
    const counts = phaseCounts(images);
    state.projectIndex = index;
    document.getElementById("projectInner").innerHTML = `
      <div class="project-layout" data-project-index="${index}">
        <div>
          <div class="compare" id="compare">
            <img class="after" src="${img(item.after, 1200)}" alt="${tx(item.title)} - ${tx(phaseLabel.after)}">
            <img class="before" src="${img(item.before, 1200)}" alt="${tx(item.title)} - ${tx(phaseLabel.before)}">
            <span class="label left">${tx(phaseLabel.before)}</span>
            <span class="label right">${tx(phaseLabel.after)}</span>
            <span class="handle"></span>
          </div>
          <p class="compare-hint">${state.lang === "hu" ? "Azonos helyszínt közel azonos nézőpontból bemutató, illusztratív állapotpár. Húzza a csúszkát az előtte-utána összehasonlításhoz." : "A matched illustrative condition pair showing the same location from nearly the same viewpoint. Move the slider to compare before and after."}</p>
          <input class="range" id="range" type="range" min="5" max="95" value="50" aria-label="${state.lang === "hu" ? "Előtte-utána összehasonlító csúszka" : "Before and after comparison slider"}">
          <div class="phase-filter">
            <button class="active" data-phase-filter="all">${state.lang === "hu" ? "Összes kép" : "All photos"}</button>
            <button data-phase-filter="before">${tx(phaseLabel.before)} (${counts.before})</button>
            <button data-phase-filter="process">${tx(phaseLabel.process)} (${counts.process})</button>
            <button data-phase-filter="after">${tx(phaseLabel.after)} (${counts.after})</button>
          </div>
          ${projectCarousel(item, index, "modal")}
        </div>
        <div class="details">
          <small class="eyebrow">${tx(item.type)}</small>
          <h2 id="projectModalTitle">${tx(item.title)}</h2>
          <p class="example-badge">${state.lang === "hu" ? "Illusztratív példa, nem saját referenciaprojekt." : "Illustrative example, not a completed client project."}</p>
          <div class="project-meta-line">
            <span>${tx(item.location)}</span>
            <span>${tx(item.timeline)}</span>
            <span>${tx(item.client)}</span>
          </div>
          <p>${tx(item.description)}</p>
          <div class="project-metrics">
            ${item.metrics.map((metric) => `<div><b>${metric.n}</b><small>${state.lang === "hu" ? metric.hu : metric.en}</small></div>`).join("")}
          </div>
          <div class="story-grid">
            <article class="story-card"><strong>${state.lang === "hu" ? "Kiinduló helyzet" : "Starting point"}</strong><p>${tx(item.problem)}</p></article>
            <article class="story-card"><strong>${state.lang === "hu" ? "Megközelítés" : "Approach"}</strong><p>${tx(item.approach)}</p></article>
            <article class="story-card"><strong>${state.lang === "hu" ? "Végeredmény" : "Final result"}</strong><p>${tx(item.result)}</p></article>
          </div>
          <div class="evidence-list">
            ${tx(item.evidence).map((entry) => `<span class="evidence-chip">${entry}</span>`).join("")}
          </div>
          <h3>${state.lang === "hu" ? "Jellemző munkalépések" : "Typical work items"}</h3>
          <ul>${tx(item.works).map((work) => `<li>${work}</li>`).join("")}</ul>
          <div class="result"><strong>${state.lang === "hu" ? "Várható eredmény" : "Expected result"}</strong><p>${tx(item.result)}</p></div>
          <div class="section-cta"><a class="btn primary" href="${tel}" data-phone-action>${phoneActionLabel()}</a></div>
        </div>
      </div>`;
    const modal = document.getElementById("projectModal");
    modal.setAttribute("aria-labelledby", "projectModalTitle");
    openModal(modal);
    const range = document.getElementById("range");
    const compare = document.getElementById("compare");
    range.addEventListener("input", () => setComparePosition(compare, range, range.value));
    initCompare(compare, range);
    document.querySelectorAll("[data-phase-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("[data-phase-filter]").forEach((item) => item.classList.remove("active"));
        btn.classList.add("active");
        const phase = btn.dataset.phaseFilter;
        showCarousel(`modal-${index}`, 0, phase);
      });
    });
    initCarousels(document.getElementById("projectModal"));
  };

  const setComparePosition = (compare, range, value) => {
    const next = Math.max(5, Math.min(95, Number(value)));
    compare.style.setProperty("--split", `${next}%`);
    range.value = String(next);
    range.setAttribute(
      "aria-valuetext",
      state.lang === "hu" ? `${next}% előtte kép` : `${next}% before image`
    );
  };

  const initCompare = (compare, range) => {
    let dragging = false;
    const updateFromPointer = (event) => {
      const rect = compare.getBoundingClientRect();
      setComparePosition(compare, range, ((event.clientX - rect.left) / rect.width) * 100);
    };
    compare.addEventListener("pointerdown", (event) => {
      dragging = true;
      try {
        compare.setPointerCapture?.(event.pointerId);
      } catch {
        // The pointer may already be inactive after an interrupted touch gesture.
      }
      updateFromPointer(event);
    });
    compare.addEventListener("pointermove", (event) => {
      if (dragging) updateFromPointer(event);
    });
    const stop = () => {
      dragging = false;
    };
    compare.addEventListener("pointerup", stop);
    compare.addEventListener("pointercancel", stop);
    setComparePosition(compare, range, range.value);
  };

  const initCarousels = (root = document) => {
    root.querySelectorAll("[data-carousel]").forEach((carousel) => {
      if (carousel.dataset.bound === "true") return;
      carousel.dataset.bound = "true";
      const id = carousel.dataset.carousel;
      carousel.querySelectorAll("[data-carousel-prev]").forEach((btn) => btn.addEventListener("click", () => moveCarousel(id, -1)));
      carousel.querySelectorAll("[data-carousel-next]").forEach((btn) => btn.addEventListener("click", () => moveCarousel(id, 1)));
      carousel.querySelectorAll("[data-carousel-dot]").forEach((btn) => {
        btn.addEventListener("click", () => showCarousel(id, Number(btn.dataset.slideTo)));
      });
      carousel.querySelectorAll("[data-slide]").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (carousel.dataset.carouselAction !== "gallery") {
            openProject(Number(carousel.dataset.projectIndex));
          }
        });
      });
      const viewport = carousel.querySelector(".carousel-viewport");
      let startX = 0;
      let lastX = 0;
      let dragging = false;
      viewport.addEventListener("pointerdown", (event) => {
        dragging = true;
        startX = event.clientX;
        lastX = event.clientX;
      });
      viewport.addEventListener("pointermove", (event) => {
        if (!dragging) return;
        lastX = event.clientX;
      });
      const finishDrag = () => {
        if (!dragging) return;
        const delta = lastX - startX;
        dragging = false;
        if (Math.abs(delta) > 42) {
          moveCarousel(id, delta < 0 ? 1 : -1);
        }
      };
      viewport.addEventListener("pointerup", finishDrag);
      viewport.addEventListener("pointercancel", finishDrag);
      showCarousel(id, Number(carousel.dataset.active || 0));
    });
  };

  const moveCarousel = (id, direction) => {
    const carousel = document.querySelector(`[data-carousel="${id}"]`);
    if (!carousel) return;
    showCarousel(id, Number(carousel.dataset.active || 0) + direction);
  };

  const showCarousel = (id, index, phase) => {
    const carousel = document.querySelector(`[data-carousel="${id}"]`);
    if (!carousel) return;
    if (phase) carousel.dataset.phase = phase;
    const activePhase = carousel.dataset.phase || "all";
    const slides = [...carousel.querySelectorAll("[data-slide]")];
    const thumbs = [...carousel.querySelectorAll("[data-carousel-dot]")];
    slides.forEach((slide) => {
      slide.hidden = activePhase !== "all" && slide.dataset.phase !== activePhase;
    });
    thumbs.forEach((thumb) => {
      thumb.hidden = activePhase !== "all" && thumb.dataset.phase !== activePhase;
    });
    const visibleSlides = slides.filter((slide) => !slide.hidden);
    const visibleThumbs = thumbs.filter((thumb) => !thumb.hidden);
    if (!visibleSlides.length) return;
    const active = ((index % visibleSlides.length) + visibleSlides.length) % visibleSlides.length;
    carousel.dataset.active = String(active);
    carousel.querySelector(".carousel-track").style.transform = `translateX(-${active * 100}%)`;
    slides.forEach((slide) => {
      const isActive = slide === visibleSlides[active];
      slide.classList.toggle("active", isActive);
      slide.tabIndex = isActive ? 0 : -1;
      slide.setAttribute("aria-hidden", String(!isActive));
    });
    thumbs.forEach((thumb) => {
      const isActive = thumb === visibleThumbs[active];
      thumb.classList.toggle("active", isActive);
      thumb.setAttribute("aria-current", isActive ? "true" : "false");
    });
    const counter = carousel.querySelector("[data-carousel-count]");
    if (counter) counter.textContent = `${active + 1} / ${visibleSlides.length}`;
  };

  const openGallery = (photos, index, title) => {
    state.gallery = photos;
    state.galleryIndex = index;
    document.getElementById("galleryInner").innerHTML = `
      <div class="gallery-layout">
        <div class="gallery-main">
          <img id="galleryImg" src="" alt="${title}">
          <button class="arrow prev" id="prev" type="button" aria-label="${state.lang === "hu" ? "Előző kép" : "Previous image"}">‹</button>
          <button class="arrow next" id="next" type="button" aria-label="${state.lang === "hu" ? "Következő kép" : "Next image"}">›</button>
          <span class="counter" id="counter" aria-live="polite"></span>
          <div class="gallery-caption" id="galleryCaption"></div>
        </div>
        <div>
          <small class="eyebrow">${title}</small>
          <h2 id="galleryModalTitle">${state.lang === "hu" ? "Képes munkafolyamat" : "Visual work process"}</h2>
          <p>${state.lang === "hu" ? "A képek az adott szolgáltatás tipikus kiinduló állapotát, munkafázisait és elérhető végeredményét mutatják. A konkrét feladatot mindig a helyszín saját fotói alapján egyeztetjük." : "The images show typical starting conditions, work stages and achievable outcomes for this service. The actual scope is always agreed from photos of the specific property."}</p>
          <div class="thumb-grid" id="thumbs">${photos.map((p, i) => `<button type="button" data-thumb="${i}" aria-label="${photoCaption(p)}"><img src="${img(p[0], 360)}" alt="" loading="lazy" decoding="async"></button>`).join("")}</div>
        </div>
      </div>`;
    const modal = document.getElementById("galleryModal");
    modal.setAttribute("aria-labelledby", "galleryModalTitle");
    openModal(modal);
    document.getElementById("prev").addEventListener("click", () => showGallery(state.galleryIndex - 1));
    document.getElementById("next").addEventListener("click", () => showGallery(state.galleryIndex + 1));
    document.querySelectorAll("#thumbs [data-thumb]").forEach((btn) => {
      btn.addEventListener("click", () => showGallery(Number(btn.dataset.thumb)));
    });
    initGallerySwipe(document.querySelector("#galleryModal .gallery-main"));
    showGallery(index);
  };

  const showGallery = (index) => {
    if (!state.gallery.length) return;
    state.galleryIndex = (index + state.gallery.length) % state.gallery.length;
    const current = state.gallery[state.galleryIndex];
    const [id, phase] = current;
    const galleryImg = document.getElementById("galleryImg");
    const nextSrc = img(id, 1100);
    if (galleryImg.src !== new URL(nextSrc, document.baseURI).href) galleryImg.src = nextSrc;
    galleryImg.alt = photoCaption(current);
    document.getElementById("counter").textContent = `${state.galleryIndex + 1} / ${state.gallery.length} - ${phaseText(phase)}`;
    document.getElementById("galleryCaption").innerHTML = `<b>${phaseText(phase)}</b><span>${photoCaption(current)}</span>`;
    document.querySelectorAll("#thumbs [data-thumb]").forEach((thumb, thumbIndex) => {
      const isActive = thumbIndex === state.galleryIndex;
      thumb.classList.toggle("active", isActive);
      thumb.setAttribute("aria-current", isActive ? "true" : "false");
    });
  };

  const activeModal = () => [...document.querySelectorAll(".modal.open")].at(-1) || null;

  const openModal = (modal) => {
    const previous = activeModal();
    if (previous && previous !== modal) {
      previous.setAttribute("aria-hidden", "true");
      previous.setAttribute("inert", "");
    }
    modalOpeners.set(modal, document.activeElement);
    modal.classList.add("open");
    modal.removeAttribute("inert");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    const panel = modal.querySelector(".panel");
    if (panel) panel.scrollTop = 0;
    requestAnimationFrame(() => modal.querySelector(".close")?.focus());
  };

  const closeModal = (modal) => {
    if (!modal) return;
    const opener = modalOpeners.get(modal);
    modal.classList.remove("open");
    modal.removeAttribute("inert");
    modal.setAttribute("aria-hidden", "true");
    const previous = activeModal();
    if (previous) {
      previous.removeAttribute("inert");
      previous.setAttribute("aria-hidden", "false");
    } else {
      document.body.classList.remove("modal-open");
    }
    if (opener?.isConnected) requestAnimationFrame(() => opener.focus());
  };

  const trapFocus = (event, modal) => {
    const focusable = [...modal.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )].filter((element) => !element.hidden && element.getClientRects().length);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const initGallerySwipe = (target) => {
    if (!target) return;
    let startX = 0;
    let currentX = 0;
    let swiped = false;
    target.addEventListener("pointerdown", (event) => {
      startX = event.clientX;
      currentX = event.clientX;
      swiped = false;
    });
    target.addEventListener("pointermove", (event) => {
      currentX = event.clientX;
    });
    target.addEventListener("pointerup", () => {
      const delta = currentX - startX;
      if (Math.abs(delta) > 50) {
        swiped = true;
        showGallery(state.galleryIndex + (delta < 0 ? 1 : -1));
      }
    });
    target.addEventListener(
      "click",
      (event) => {
        if (!swiped) return;
        event.preventDefault();
        event.stopPropagation();
        swiped = false;
      },
      true
    );
  };

  const reveal = () => {
    const items = document.querySelectorAll("[data-reveal]");
    revealObserver?.disconnect();
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("visible"));
      return;
    }
    revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }),
      { threshold: 0.12 }
    );
    items.forEach((item) => revealObserver.observe(item));
  };

  render();
})();
