(() => {
  const phone = "+36 20 667 1832";
  const tel = "tel:+36206671832";
  const wa = "https://wa.me/36206671832";
  const img = (id, w = 1200) =>
    `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

  const state = {
    lang: localStorage.getItem("bps-lang") || "hu",
    gallery: [],
    galleryIndex: 0,
    projectIndex: 0,
    projectFilter: "all",
    videoIndex: 0,
    reel: 0,
  };

  const tx = (value) => value?.[state.lang] || value?.hu || "";

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
      projects: { hu: "Projektek", en: "Projects" },
      contact: { hu: "Kapcsolat", en: "Contact" },
    },
    hero: {
      label: { hu: "Budapesti ingatlankarbantartás", en: "Property services in Budapest" },
      title: {
        hu: "Lakás, Airbnb és iroda karbantartás szervezetten.",
        en: "Reliable property maintenance for apartments, rentals and offices.",
      },
      text: {
        hu:
          "Festés, gipszkarton javítás, kisebb szerelés és kerti munka Budapesten. A cél egyszerű: gyors egyeztetés, tiszta munka, fotós visszajelzés és olyan végeredmény, amit tulajdonosként nyugodtan továbbadhat.",
        en:
          "Painting, drywall repair, small handyman work and garden care in Budapest. Clear communication, tidy work and photo updates make it easier to manage a property even when you are not on site.",
      },
      primary: { hu: "Kérek visszahívást", en: "Request a call" },
      secondary: { hu: "Projektpéldák", en: "View projects" },
      noteTitle: { hu: "Nem kell nagy kivitelező minden apró munkához", en: "Small jobs still need a reliable system" },
      noteText: {
        hu:
          "Bérlőváltás, vendégérkezés vagy irodaátadás előtt sokszor néhány javítás dönt arról, mennyire tűnik rendezettnek az ingatlan.",
        en:
          "Before a guest arrival, tenant handover or office visit, a few small fixes can change how professional the property feels.",
      },
    },
    stats: [
      { n: "24-48h", hu: "gyors egyeztetés tipikus munkáknál", en: "fast scheduling for typical small jobs" },
      { n: "HU/EN", hu: "magyar és angol kommunikáció", en: "Hungarian and English communication" },
      { n: "Fotó", hu: "munka előtti és utáni visszajelzés", en: "before and after photo updates" },
    ],
    servicesTitle: {
      hu: "Miben segítünk?",
      en: "What we can handle",
    },
    servicesText: {
      hu:
        "Nem általános barkácslistát adunk, hanem tipikus budapesti helyzetekre építünk: bérlő kiköltözött, Airbnb vendég érkezik, iroda gyors frissítésre szorul, vagy a tulajdonos külföldről szeretne kontrollált munkát intézni.",
      en:
        "The service is built around real Budapest property situations: tenant move-outs, Airbnb turnovers, office touch-ups and owners who need work arranged without being physically present.",
    },
    problemsTitle: { hu: "Valós helyzetek, gyors megoldások", en: "Real situations, practical solutions" },
    projectsTitle: { hu: "Munkatípusok és részletes képes példák", en: "Service types and detailed visual examples" },
    processTitle: { hu: "Hogyan dolgozunk?", en: "How the work is handled" },
    trustTitle: { hu: "Miért választanak minket?", en: "Why clients choose us" },
    audienceTitle: { hu: "Kiknek hasznos?", en: "Who this is for" },
    faqTitle: { hu: "Gyakori kérdések", en: "Common questions" },
    contactTitle: { hu: "Beszéljünk a munkáról", en: "Let us discuss the job" },
    contactText: {
      hu:
        "Küldjön fotókat az ingatlanról, röviden írja le a problémát, és visszajelzünk, milyen munka várható. A fotók alapján könnyebb tisztázni a sürgősséget, az anyagigényt, a várható időt és azt, hogy kell-e helyszíni felmérés.",
      en:
        "Send photos of the property and a short description of the issue. From there, we can clarify urgency, likely materials, timing and whether an on-site check is needed before the work starts.",
    },
  };

  const services = [
    {
      key: "painting",
      cover: "35419415",
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
        ["35419415", "after", { hu: "Kész, egységes szoba: a javított fal már nem vonja el a figyelmet.", en: "Finished room with consistent walls that no longer distract from the space." }],
        ["35419433", "after", { hu: "Teljes helyiség kész állapotban, tiszta falsíkokkal és átadásra alkalmas képpel.", en: "Full room after completion, with clean walls and a handover-ready appearance." }],
        ["35419416", "after", { hu: "Világos, egységes falfelület: a helyiség újra fotózható és kiadható.", en: "Bright, consistent walls: the room is ready to photograph and present again." }],
        ["35419417", "after", { hu: "Kész sarok és teljes falszakasz, amely már rendezett első benyomást ad.", en: "Finished corner and full wall area, giving the room a tidy first impression." }],
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
      cover: "7601179",
      title: { hu: "Kert és udvar rendbetétele", en: "Garden and outdoor clean-up" },
      text: {
        hu:
          "Magas fű, elhanyagolt bejárat, terasz vagy udvar rendezése. Airbnb, bérlemény vagy iroda esetén a külső kép már érkezéskor bizalmat épít vagy rombol.",
        en:
          "Mowing, trimming and tidying entrances, yards and terraces. For rentals, Airbnb and offices, the outdoor area affects trust before anyone steps inside.",
      },
      photos: [
        ["17972815", "before", { hu: "Elhanyagolt bejárati kert: a külső kép már érkezéskor rendezetlennek hat.", en: "Neglected entrance garden that makes the property feel untidy on arrival." }],
        ["26593079", "before", { hu: "Benőtt kertrész, ahol először a nagyobb terület áttekinthetőségét kell visszaadni.", en: "Overgrown garden area where the first goal is to restore visibility and order." }],
        ["33219998", "before", { hu: "Növényzettel benőtt fal és udvarrész: tisztítás és visszavágás előtt.", en: "Wall and yard area overgrown with vegetation before trimming and clean-up." }],
        ["9229821", "process", { hu: "Udvarrész rendezése és szegélynyírás: a munkaterület nagyobb része egyszerre látszik.", en: "Yard tidying and edging with a larger section of the work area visible." }],
        ["24595769", "process", { hu: "Benőtt sövény visszavágása teljes oldalszakaszon, hogy a kert széle újra rendezett legyen.", en: "Overgrown hedge trimmed along a full side section so the garden edge looks orderly again." }],
        ["5027602", "process", { hu: "Magasabb növényzet visszavágása a teljes kertkép rendezéséhez.", en: "Tall greenery being trimmed to restore the overall garden appearance." }],
        ["5027601", "process", { hu: "Nagyobb zöldfelület visszavágása, ahol a munka hatása a teljes területen látszik.", en: "Larger green area being cut back, with the effect visible across the site." }],
        ["7587878", "after", { hu: "Rendezett kert és épület körüli zöldsáv: a teljes külső tér tisztább képet ad.", en: "Tidy garden and green strip around the building, giving the whole exterior a cleaner look." }],
        ["7601179", "after", { hu: "Rendezett pázsit és ház körüli külső tér: tisztább érkezési élmény.", en: "Tidy lawn and exterior area, creating a cleaner arrival experience." }],
        ["280229", "after", { hu: "Széles látószögű kész állapot: a kert és a homlokzat együtt mutat rendezett képet.", en: "Wide finished view where the garden and facade read as one tidy property." }],
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
        ["6670861", "after", { hu: "Nagyobb beépített tároló és lakótér kész állapotban: a helyiség használhatóbb lett.", en: "Larger built-in storage and living area in finished condition, making the room more usable." }],
        ["5824575", "after", { hu: "Kész fali tároló teljes nézetben, ahol a javítás eredménye egyértelműen látszik.", en: "Finished wall storage shown in full view, making the result easy to understand." }],
      ],
    },
  ];

  const projects = [
    {
      key: "paint",
      type: { hu: "Festés / faljavítás", en: "Painting / wall repair" },
      cover: "35419415",
      before: "12036084",
      after: "35419415",
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
      cover: "7937304",
      before: "7937304",
      after: "9826455",
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
      cover: "7601179",
      before: "17972815",
      after: "7601179",
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
    timeline: { hu: "1 napos falfrissítés", en: "1-day wall refresh" },
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
      { n: "1 nap", hu: "tipikus átfutás", en: "typical turnaround" },
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
      cover: "19899060",
      before: "5102904",
      after: "19899060",
      title: { hu: "Gyors lakásfrissítés vendégérkezés előtt", en: "Fast apartment refresh before guest arrival" },
      location: { hu: "Budapesti Airbnb lakás", en: "Budapest Airbnb apartment" },
      timeline: { hu: "24-48 órás szervezési cél", en: "24-48h scheduling target" },
      client: { hu: "vendégváltás előtt", en: "before guest turnover" },
      summary: {
        hu:
          "Vendégváltás előtt a kisebb hibák is értékelésrombolók lehetnek. Ilyenkor a legfontosabb a gyors, tiszta és dokumentált beavatkozás.",
        en:
          "Before a guest turnover, even small defects can affect reviews. The priority is fast, tidy and documented work.",
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
        ["14505912", "after", { hu: "Átadásra kész nappali nagyobb perspektívából, rendezett bútorozással.", en: "Handover-ready living room from a wider perspective, with orderly furnishing." }],
        ["36887747", "after", { hu: "Modern lakótér kész állapotban: tiszta falak, szabad járófelület és rendezett első benyomás.", en: "Modern living area in finished condition with clean walls, clear circulation and a tidy first impression." }],
        ["7061674", "after", { hu: "Tiszta, használható nappali tér, ahol a javítások nem vonják el a figyelmet.", en: "Clean, usable living area where repairs no longer distract from the room." }],
        ["10117724", "after", { hu: "Átadásra kész közös tér, amely vendégnek és tulajdonosnak is ellenőrizhető.", en: "Handover-ready shared space that is easy for both guest and owner to review." }],
        ["271624", "after", { hu: "Kompakt Airbnb lakótér kész állapotban, rendezett fallal és használható elrendezéssel.", en: "Compact Airbnb living area in finished condition, with tidy walls and usable layout." }],
      ],
    },
    {
      key: "office-touchup",
      category: "office",
      type: { hu: "Iroda / képviseleti tér", en: "Office / representative space" },
      cover: "380768",
      before: "5483236",
      after: "7534216",
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
        ["380769", "process", { hu: "Használatban lévő irodatér, ahol a rend és falállapot különösen fontos.", en: "Office in use where order and wall condition matter for visitors." }],
        ["5511098", "process", { hu: "Nagyobb irodai munkatér ellenőrzése frissítés előtt, teljesebb perspektívából.", en: "Larger office workspace reviewed before refresh, shown from a wider perspective." }],
        ["380768", "after", { hu: "Rendezett nyitott irodatér, ahol a látogató már nem a hibákat nézi.", en: "Tidy open office where visitors are no longer focused on defects." }],
        ["221537", "after", { hu: "Világos közösségi vagy váró jellegű irodatér, tiszta falakkal és rendezett képpel.", en: "Bright shared or waiting-style office area with clean walls and an orderly look." }],
        ["10339232", "after", { hu: "Modern irodatér kész állapotban, egységes belső képpel.", en: "Modern office space in finished condition with a consistent interior feel." }],
        ["7534216", "after", { hu: "Kész tárgyaló jellegű tér, tiszta falakkal és rendezett összképpel.", en: "Finished meeting-style room with clean walls and an orderly appearance." }],
        ["36631699", "after", { hu: "Tágas iroda teljes nézetben, rendezett munkaállomásokkal.", en: "Spacious office shown in full view, with orderly workstations." }],
        ["1181406", "after", { hu: "Teljes irodatér használat közben: a frissített környezet professzionálisabb képet ad.", en: "Full office area in use, with the refreshed environment supporting a more professional feel." }],
      ],
    },
    {
      key: "handover-small-fixes",
      category: "handyman",
      type: { hu: "Kisebb javítások / átadás", en: "Small repairs / handover" },
      cover: "1090638",
      before: "13909112",
      after: "1090638",
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
        hu: "A képsorozat megmutatja, milyen problémából indul az adott munkatípus.",
        en: "The image sequence shows the kind of starting condition the service is designed to address.",
      },
    },
    {
      n: "02",
      title: { hu: "Munka közben", en: "During the work" },
      text: {
        hu: "A folyamatfotók azt mutatják, hogy nem csak eltakarjuk a hibát, hanem rendezetten halad a munka.",
        en: "Process photos show that the issue is not simply hidden, but handled in an organised way.",
      },
    },
    {
      n: "03",
      title: { hu: "Kész átadás", en: "Finished handover" },
      text: {
        hu: "A végeredmény legyen könnyen érthető: tisztább felület, rendezettebb tér, kevesebb bizonytalanság.",
        en: "The result should be easy to understand: cleaner surfaces, a tidier space and less uncertainty.",
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
    ["Külföldön élő tulajdonos", "Foreign owner", "Fotók alapján indul az egyeztetés, a munka közben és után is képes visszajelzés érkezik.", "Work can be discussed from photos, with updates during and after the job."],
    ["Airbnb gyors javítás", "Fast Airbnb fix", "Vendégváltás előtt a látható hibákra fókuszálunk, hogy a lakás időben vállalható legyen.", "Visible issues are handled before guest arrival so the apartment stays presentable."],
    ["Bérlő kiköltözés után", "After tenant move-out", "Falhibák, apró sérülések és átadás előtti rendbetétel egy kézben.", "Wall marks, small damage and handover touch-ups handled in one flow."],
    ["Festés vendégváltás előtt", "Painting before turnover", "Nem teljes felújítás kell, hanem gyors, tiszta frissítés a kritikus helyeken.", "Often the job is not full renovation, but a clean refresh where it matters."],
    ["Elhanyagolt kert", "Neglected garden", "A bejárat és a külső rész újra rendezett első benyomást ad.", "The entrance and outdoor area regain a tidy first impression."],
    ["Iroda gyors frissítése", "Office touch-up", "Kisebb faljavítás, festés és szerelés, hogy az iroda rendezettebb képet mutasson.", "Small wall repairs, painting and fixes so the office looks more orderly."],
  ];

  const process = [
    ["Fotók és rövid leírás", "Photos and short brief", "Az ügyfél elküldi, mi a gond, hol van az ingatlan és milyen határidő számít.", "The client sends the issue, location and timing expectations."],
    ["Gyors visszajelzés", "Quick response", "Tisztázzuk, mire van szükség, kell-e helyszíni felmérés, és mi a következő lépés.", "We clarify what is needed, whether a site check helps and what comes next."],
    ["Szervezett kivitelezés", "Organised work", "A munka a megbeszélt területekre koncentrál, felesleges körök nélkül.", "Work stays focused on the agreed areas without unnecessary complication."],
    ["Fotós dokumentálás", "Photo documentation", "A fontos állapotokról fotó készül, így távolról is követhető a folyamat.", "Key stages are photographed, so the process is easy to follow remotely."],
    ["Rendezett átadás", "Tidy handover", "A cél egy átadható, használható, tiszta végeredmény.", "The goal is a usable, presentable and tidy result."],
  ];

  const audience = [
    ["Nagykövetségek", "Embassies", "Diszkrét, pontos kommunikáció, kulturált megjelenés és rendezett munkavégzés."],
    ["Nemzetközi cégek", "International companies", "Irodák és képviseleti terek kisebb, gyors frissítése."],
    ["Külföldi tulajdonosok", "Foreign owners", "Távollétben is követhető folyamat fotókkal és érthető egyeztetéssel."],
    ["Airbnb és bérlemények", "Airbnb and rentals", "Vendégváltás vagy bérlőváltás előtt a látható hibák gyors kezelése."],
  ];

  const faq = [
    ["Lehet csak kisebb munkát kérni?", "Can I request a small job?", "Igen. A cél pont az, hogy kisebb, de fontos javításokat is szervezetten lehessen intézni.", "Yes. The service is designed for smaller but important property fixes."],
    ["Küldhetek fotókat első körben?", "Can I send photos first?", "Igen. Fotók alapján sokszor gyorsan eldönthető, milyen munka szükséges.", "Yes. Photos are often enough to clarify the likely scope."],
    ["Angolul is lehet egyeztetni?", "Is English communication available?", "Igen, az oldal és az egyeztetés is magyarul és angolul működhet.", "Yes, the website and communication can work in Hungarian and English."],
    ["Budapesten kívül is működik?", "Do you work outside Budapest?", "Első körben Budapest és közvetlen környéke a célszerű terület.", "The practical focus is Budapest and the nearby area."],
  ];

  const reel = [
    ["35419415", { hu: "Falfrissítés", en: "Wall refresh" }],
    ["7937304", { hu: "Gipszkarton javítás", en: "Drywall repair" }],
    ["7601179", { hu: "Kert rendezése", en: "Garden care" }],
    ["1090638", { hu: "Kisebb szerelés", en: "Small repairs" }],
  ];

  // The only video retained on the site. It is used as a general hero visual,
  // never presented as footage from a specific customer project.
  const heroVideo = {
    src: "https://videos.pexels.com/video-files/6474086/6474086-sd_640_360_25fps.mp4",
    poster: "35419415",
  };

  projects.forEach((project) => {
    project.description = project.description || project.summary;
    project.images = project.images || project.photos || [];
    project.photos = project.images;
    project.videos = [];
  });

  const installStyle = () => {
    const style = document.createElement("style");
    style.textContent = `
      :root{--paper:#f6f1e8;--card:#fffaf2;--ink:#1f2923;--muted:#627167;--green:#285f43;--green2:#173629;--accent:#c4813a;--line:#ded4c3;--shadow:0 22px 58px rgba(49,43,33,.14)}
      *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--paper);color:var(--ink);font-family:Inter,Segoe UI,Arial,sans-serif;font-size:18px;line-height:1.65}body.modal-open{overflow:hidden}a{color:inherit;text-decoration:none}img{max-width:100%}button,input{font:inherit}
      .wrap{width:min(100% - 40px,1480px);margin:auto}.header{position:sticky;top:0;z-index:40;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:16px clamp(18px,4vw,76px);background:rgba(255,250,242,.94);border-bottom:1px solid var(--line);backdrop-filter:blur(14px)}
      .brand{display:flex;align-items:center;gap:14px}.logo{display:grid;place-items:center;width:58px;height:58px;border-radius:9px;background:var(--green);color:white;font-weight:900}.brand strong{display:block;font-size:20px}.brand small{display:block;color:var(--muted);line-height:1.2}.nav{display:flex;gap:26px;font-weight:900}.actions{display:flex;align-items:center;gap:10px}.btn,.lang{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 18px;border-radius:8px;border:1px solid var(--line);background:white;font-weight:900;cursor:pointer}.btn.primary{background:var(--green);color:white;border-color:var(--green);box-shadow:0 14px 30px rgba(40,95,67,.22)}.btn.dark{background:var(--green2);color:white;border-color:var(--green2)}
      .hero{display:grid;grid-template-columns:1fr .95fr;gap:44px;align-items:center;padding:70px 0}.eyebrow{color:var(--accent);font-weight:900;text-transform:uppercase;letter-spacing:.08em;font-size:13px}.hero h1{margin:12px 0 16px;font-size:clamp(42px,6vw,86px);line-height:.98;letter-spacing:0}.lead{font-size:22px;color:var(--muted);max-width:850px}.hero-ctas,.section-cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:26px}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:32px}.stat,.card,.service,.problem,.project,.step,.review,.faq,.audience,.contact-card{background:var(--card);border:1px solid var(--line);border-radius:10px;box-shadow:0 10px 32px rgba(49,43,33,.05)}.stat{padding:18px}.stat b{display:block;color:var(--green);font-size:28px;line-height:1}.hero-media{position:relative}.hero-media img,.hero-media video{width:100%;height:620px;object-fit:cover;border-radius:10px;box-shadow:var(--shadow);display:block}.hero-video{background:#17251d}.note{position:absolute;right:-10px;bottom:24px;width:min(370px,82%);padding:22px;background:white;border-radius:10px;box-shadow:var(--shadow)}
      .section{padding:74px 0}.section-head{max-width:1040px;margin-bottom:30px}.section-head h2{margin:0 0 12px;font-size:clamp(36px,4.4vw,66px);line-height:1.04}.section-head p{margin:0;color:var(--muted);font-size:20px}.grid{display:grid;gap:20px}.grid.four{grid-template-columns:repeat(4,1fr)}.grid.three{grid-template-columns:repeat(3,1fr)}.grid.two{grid-template-columns:repeat(2,1fr)}
      .service,.project,.problem{overflow:hidden;transition:transform .28s ease,box-shadow .28s ease,border-color .28s ease}.service>button,.project .case-open{display:block;width:100%;height:100%;padding:0;border:0;background:transparent;text-align:left;color:inherit;cursor:pointer}.media{height:250px;overflow:hidden;background:#ddd}.media img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 1s ease}.body{padding:24px}.body h3{margin:0 0 10px;font-size:25px;line-height:1.2}.body p{margin:0;color:var(--muted)}.service:hover,.project:hover,.problem:hover,.card:hover{transform:translateY(-8px);box-shadow:var(--shadow);border-color:rgba(40,95,67,.28)}.service:hover img,.project:hover img,.problem:hover img{transform:scale(1.07)}.link{display:inline-block;margin-top:18px;color:var(--green);font-weight:900}
      .problem .media{height:205px;position:relative}.tag{position:absolute;left:14px;bottom:14px;padding:7px 11px;border-radius:999px;background:rgba(23,54,41,.9);color:white;font-size:13px;font-weight:900}.solution{margin-top:14px;padding:14px;background:#eee4d6;border-radius:8px;color:#314239}.project .media{height:285px}.phases{display:flex;gap:8px;flex-wrap:wrap;margin-top:18px}.phases span{padding:7px 10px;border-radius:999px;background:#edf2ed;color:var(--green);font-size:12px;font-weight:900;text-transform:uppercase}
      .cta{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:34px;padding:26px;background:var(--green2);color:white;border-radius:10px;box-shadow:var(--shadow)}.cta p{margin:4px 0 0;color:rgba(255,255,255,.76)}.split{display:grid;grid-template-columns:.85fr 1.15fr;gap:34px}.steps{display:grid;gap:14px}.step{display:grid;grid-template-columns:58px 1fr;gap:18px;padding:20px}.num{display:grid;place-items:center;width:50px;height:50px;border-radius:9px;background:var(--green);color:white;font-weight:900}.step h3,.audience h3,.review h3,.faq h3{margin:0 0 6px}.step p,.audience p,.review p,.faq p{margin:0;color:var(--muted)}
      .showreel{display:grid;grid-template-columns:.72fr 1.28fr;overflow:hidden;border-radius:10px;background:var(--green2);color:white;box-shadow:var(--shadow)}.show-copy{padding:42px}.show-copy p{color:rgba(255,255,255,.78)}.show-stage{position:relative;min-height:420px;background:#111;overflow:hidden}.show-stage img{width:100%;height:100%;min-height:420px;object-fit:cover;transition:opacity .35s ease,transform 4s ease}.show-stage:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent,rgba(0,0,0,.7))}.show-caption{position:absolute;left:24px;right:24px;bottom:24px;z-index:2}.show-caption strong{display:block;font-size:36px;line-height:1}
      .reviews{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.review,.faq,.audience{padding:24px}.contact{display:grid;grid-template-columns:1fr 430px;gap:28px;align-items:start;padding:44px;border-radius:10px;background:var(--green2);color:white}.contact p{color:rgba(255,255,255,.78)}.contact-card{padding:24px;color:var(--ink);display:grid;gap:12px}.footer{display:flex;justify-content:space-between;gap:18px;padding:28px clamp(18px,4vw,76px);color:var(--muted)}
      .modal{position:fixed;inset:0;z-index:90;display:none}.modal.open{display:block}.backdrop{position:absolute;inset:0;background:rgba(17,24,20,.75);border:0}.panel{position:relative;margin:24px auto;width:min(1280px,calc(100% - 24px));max-height:calc(100vh - 48px);overflow:auto;background:var(--paper);border-radius:12px;box-shadow:0 28px 90px rgba(0,0,0,.35)}.close{position:sticky;top:12px;float:right;z-index:5;margin:12px;width:44px;height:44px;border:0;border-radius:9px;background:white;font-size:26px;cursor:pointer}
      .project-layout{display:grid;grid-template-columns:1.05fr .95fr;gap:28px;padding:30px}.compare{--split:50%;position:relative;height:min(58vh,58vw);min-height:420px;overflow:hidden;border-radius:10px;background:#111}.compare img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.compare .before{z-index:2;clip-path:inset(0 calc(100% - var(--split)) 0 0)}.compare .after{z-index:1}.label{position:absolute;z-index:3;top:14px;padding:8px 12px;border-radius:999px;background:rgba(0,0,0,.68);color:white;font-weight:900}.label.left{left:14px}.label.right{right:14px}.handle{position:absolute;z-index:3;top:0;bottom:0;left:var(--split);width:3px;background:white}.range{width:100%;margin:18px 0 12px}.thumb-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}.thumb-grid button{padding:0;border:0;border-radius:8px;overflow:hidden;cursor:pointer;background:#ddd}.thumb-grid img{width:100%;height:90px;object-fit:cover;display:block}.details ul{padding-left:20px}.details li{margin:8px 0}.result{padding:18px;background:#edf2ed;border-radius:9px}
      .gallery-layout{display:grid;grid-template-columns:1.35fr .65fr;gap:22px;padding:26px}.gallery-main{position:relative;border-radius:10px;overflow:hidden;background:#111}.gallery-main img{width:100%;height:min(62vh,68vw);object-fit:cover;display:block}.arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:2;width:46px;height:46px;border:0;border-radius:999px;background:white;font-size:30px;cursor:pointer}.prev{left:14px}.next{right:14px}.counter{position:absolute;left:16px;bottom:16px;z-index:2;padding:8px 12px;border-radius:999px;background:rgba(0,0,0,.7);color:white}.mobile-cta{display:none}
      [data-reveal]{opacity:0;transform:translateY(24px);transition:opacity .65s ease,transform .65s ease}.visible{opacity:1;transform:none}
      @media(max-width:1050px){.hero,.split,.showreel,.contact,.project-layout,.gallery-layout{grid-template-columns:1fr}.grid.four{grid-template-columns:repeat(2,1fr)}.grid.three,.reviews{grid-template-columns:1fr 1fr}.hero-media img{height:480px}.compare{height:54vh}.thumb-grid{grid-template-columns:repeat(3,1fr)}}
      @media(max-width:680px){body{font-size:16px}.header{padding:12px 14px}.nav{display:none}.brand small{display:none}.actions .phone{display:none}.wrap{width:min(100% - 28px,1480px)}.hero{padding:42px 0}.hero h1{font-size:44px}.lead{font-size:18px}.stats,.grid.four,.grid.three,.grid.two,.reviews{grid-template-columns:1fr}.media,.project .media{height:230px}.cta{align-items:flex-start;flex-direction:column}.panel{width:calc(100% - 12px);margin:8px auto;max-height:calc(100vh - 16px)}.project-layout,.gallery-layout{padding:16px}.compare{min-height:340px;height:56vh}.thumb-grid{grid-template-columns:repeat(2,1fr)}.gallery-main img{height:50vh}.mobile-cta{position:fixed;left:10px;right:10px;bottom:10px;z-index:50;display:flex;gap:8px}.mobile-cta a{flex:1;text-align:center;padding:12px 10px;border-radius:9px;background:var(--green);color:white;font-weight:900;box-shadow:var(--shadow)}.footer{padding-bottom:76px}.note{position:relative;right:auto;bottom:auto;width:100%;margin-top:12px}}
    `;
    style.textContent += `
      .reference-panel{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.25fr);gap:22px;align-items:stretch;margin:0 0 28px;padding:26px;border-radius:12px;background:linear-gradient(135deg,var(--green2),#2d6448);color:white;box-shadow:var(--shadow)}
      .reference-panel h3{margin:6px 0 8px;font-size:clamp(26px,3vw,42px);line-height:1.05}.reference-panel p{margin:0;color:rgba(255,255,255,.78)}.reference-proof-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.reference-proof{padding:18px;border:1px solid rgba(255,255,255,.18);border-radius:10px;background:rgba(255,255,255,.08)}.reference-proof b{display:inline-grid;width:38px;height:38px;margin-bottom:12px;place-items:center;border-radius:9px;background:rgba(255,255,255,.16);color:#f2c885}.reference-proof strong{display:block;font-size:18px}.reference-proof p{font-size:15px;line-height:1.55}
      .filterbar{display:flex;flex-wrap:wrap;gap:10px;margin:0 0 24px}.filterbar button{border:1px solid var(--line);border-radius:999px;padding:10px 14px;background:white;color:var(--green2);font-weight:900;cursor:pointer;transition:background .22s ease,color .22s ease,transform .22s ease}.filterbar button:hover{transform:translateY(-2px)}.filterbar button.active{background:var(--green);border-color:var(--green);color:white}
      .project-grid-rich{grid-template-columns:repeat(3,1fr)}.project-card.rich{position:relative;overflow:hidden}.project-card.rich .case-open{height:auto}.case-preview{position:relative;display:grid;grid-template-columns:1fr 1fr;height:260px;overflow:hidden;background:#17251d}.case-preview:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(0,0,0,.62))}.case-preview img{width:100%;height:100%;object-fit:cover;transition:transform 1s ease,filter .5s ease}.project-card.rich:hover .case-preview img{transform:scale(1.08);filter:saturate(1.06)}.case-preview .divider{position:absolute;top:0;bottom:0;left:50%;z-index:2;width:2px;background:rgba(255,255,255,.85)}.case-preview .mini-label{position:absolute;z-index:3;bottom:12px;padding:6px 9px;border-radius:999px;background:rgba(23,54,41,.88);color:white;font-size:12px;font-weight:900;text-transform:uppercase}.case-preview .mini-label.before{left:12px}.case-preview .mini-label.after{right:12px}.case-type{display:inline-flex;margin-bottom:10px;padding:6px 10px;border-radius:999px;background:#edf2ed;color:var(--green);font-size:12px;font-weight:900;text-transform:uppercase}.case-topline{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.case-topline span,.evidence-chip,.phase-filter button{border-radius:999px;padding:7px 10px;background:#f0e6d8;color:#334439;font-size:12px;font-weight:900}.case-proof-row{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:18px 0}.case-proof-row div{padding:12px;border-radius:9px;background:#f7efe4}.case-proof-row b{display:block;color:var(--green);font-size:20px;line-height:1}.case-proof-row small{display:block;color:var(--muted);line-height:1.25}.case-link{display:inline-flex;align-items:center;gap:8px;margin-top:4px;color:var(--green);font-weight:900}.case-link:after{content:"→";transition:transform .2s ease}.project-card.rich:hover .case-link:after{transform:translateX(4px)}
      .project-spotlight{display:grid;grid-template-columns:1.1fr .9fr;gap:20px;margin-top:20px}.details .project-meta-line{display:flex;flex-wrap:wrap;gap:9px;margin:14px 0 20px}.details .project-meta-line span{border-radius:999px;padding:8px 11px;background:#f0e6d8;color:#314239;font-size:13px;font-weight:900}.project-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:18px 0}.project-metrics div{padding:14px;border-radius:9px;background:#fff7ec;border:1px solid var(--line)}.project-metrics b{display:block;color:var(--green);font-size:26px;line-height:1}.project-metrics small{color:var(--muted);font-weight:800}.story-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:18px 0}.story-card{padding:16px;border-radius:9px;background:white;border:1px solid var(--line)}.story-card strong{display:block;margin-bottom:6px}.story-card p{margin:0;color:var(--muted);font-size:15px;line-height:1.55}.evidence-list{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 18px}.phase-filter{display:flex;flex-wrap:wrap;gap:8px;margin:20px 0 12px}.phase-filter button{border:0;cursor:pointer}.phase-filter button.active{background:var(--green);color:white}.thumb-grid button.hidden{display:none}.compare-hint{margin:8px 0 0;color:var(--muted);font-size:14px}
      .project-carousel{margin:0 18px 20px;padding:14px;border-radius:10px;background:#f8efe3;border:1px solid var(--line)}.project-carousel.large{margin:18px 0 0;padding:16px;background:#fff8ee}.carousel-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px;color:#2f4238}.carousel-head strong{font-size:14px;text-transform:uppercase;letter-spacing:.04em}.carousel-head span{font-size:13px;color:var(--muted);font-weight:900}.carousel-stage{position:relative}.carousel-viewport{overflow:hidden;border-radius:9px;background:#17251d;touch-action:pan-y}.carousel-track{display:flex;transition:transform .38s ease}.carousel-slide{min-width:100%;border:0;padding:0;background:#17251d;cursor:pointer}.carousel-slide[hidden]{display:none}.carousel-slide img{width:100%;height:170px;object-fit:cover;display:block;transition:transform 1.2s ease}.project-carousel.large .carousel-slide img{height:min(44vh,520px)}.carousel-slide:hover img{transform:scale(1.04)}.carousel-arrow{position:absolute;top:50%;z-index:4;display:grid;place-items:center;width:38px;height:38px;border:0;border-radius:999px;background:rgba(255,255,255,.94);box-shadow:0 10px 28px rgba(0,0,0,.16);color:#173629;font-size:30px;line-height:1;cursor:pointer;transform:translateY(-50%);transition:transform .2s ease,background .2s ease}.carousel-arrow:hover{background:white;transform:translateY(-50%) scale(1.06)}.carousel-prev{left:10px}.carousel-next{right:10px}.carousel-thumbs{display:grid;grid-template-columns:repeat(5,1fr);gap:7px;margin-top:10px}.project-carousel.compact .carousel-thumbs{grid-template-columns:repeat(10,1fr)}.carousel-thumbs button{height:38px;padding:0;border:2px solid transparent;border-radius:7px;background:#ddd;overflow:hidden;cursor:pointer;opacity:.72;transition:opacity .2s ease,border-color .2s ease,transform .2s ease}.carousel-thumbs button[hidden]{display:none}.carousel-thumbs button.active{opacity:1;border-color:var(--green);transform:translateY(-1px)}.carousel-thumbs img{width:100%;height:100%;object-fit:cover;display:block}.video-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.video-card{overflow:hidden;background:var(--card);border:1px solid var(--line);border-radius:10px;box-shadow:0 10px 32px rgba(49,43,33,.05);transition:transform .28s ease,box-shadow .28s ease}.video-card:hover{transform:translateY(-8px);box-shadow:var(--shadow)}.video-card button{width:100%;height:100%;padding:0;border:0;background:transparent;text-align:left;color:inherit;cursor:pointer}.video-poster{position:relative;height:260px;overflow:hidden;background:#17251d}.video-poster img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 1s ease}.video-card:hover img{transform:scale(1.06)}.play-mark{position:absolute;left:50%;top:50%;display:grid;place-items:center;width:62px;height:62px;border-radius:999px;background:rgba(255,255,255,.92);color:var(--green);font-size:24px;transform:translate(-50%,-50%);box-shadow:0 16px 34px rgba(0,0,0,.2)}.video-type{position:absolute;left:14px;bottom:14px;padding:7px 10px;border-radius:999px;background:rgba(23,54,41,.9);color:white;font-size:12px;font-weight:900;text-transform:uppercase}.video-layout{display:grid;grid-template-columns:1.2fr .8fr;gap:24px;padding:26px}.video-player{width:100%;max-height:70vh;border-radius:10px;background:#111;display:block}.video-details{padding:12px 0}.video-details p{color:var(--muted)}.video-note{margin-top:18px;padding:16px;border-radius:9px;background:#edf2ed;color:#334439}
      @media(max-width:1050px){.reference-panel,.project-spotlight{grid-template-columns:1fr}.project-grid-rich{grid-template-columns:1fr 1fr}.reference-proof-grid,.story-grid{grid-template-columns:1fr}.case-preview{height:240px}}
      @media(max-width:1050px){.video-grid{grid-template-columns:repeat(2,1fr)}.video-layout{grid-template-columns:1fr}}
      @media(max-width:680px){.reference-panel{padding:20px}.project-grid-rich,.project-metrics,.case-proof-row{grid-template-columns:1fr}.case-preview{height:260px}.story-grid{grid-template-columns:1fr}.filterbar{overflow-x:auto;flex-wrap:nowrap;padding-bottom:6px}.filterbar button{white-space:nowrap}.project-metrics div{padding:12px}.project-carousel{margin:0 12px 16px}.project-carousel.compact .carousel-thumbs{grid-template-columns:repeat(5,1fr)}.carousel-slide img{height:190px}.project-carousel.large .carousel-slide img{height:300px}.video-grid{grid-template-columns:1fr}.video-poster{height:230px}.video-layout{padding:16px}.video-player{max-height:58vh}}
    `;
    style.textContent += `
      .hero-media img,.hero-media video{height:500px}.media{height:210px}.problem .media{height:185px}.project .media{height:220px}.case-preview{height:220px}.video-poster{height:220px}
      .compare{height:min(52vh,52vw);min-height:360px}.gallery-main img{height:min(54vh,60vw)}.project-carousel.large .carousel-slide img{height:min(38vh,420px)}
      .counter{top:16px;bottom:auto}.gallery-caption{position:absolute;left:16px;right:16px;bottom:16px;z-index:2;padding:14px 16px;border-radius:10px;background:rgba(17,24,20,.78);color:white;backdrop-filter:blur(8px);line-height:1.35}.gallery-caption b{display:block;margin-bottom:4px;color:#f3c275;text-transform:uppercase;font-size:12px;letter-spacing:.05em}
      .carousel-slide{position:relative;text-align:left;color:white}.slide-caption{position:absolute;left:12px;right:12px;bottom:12px;z-index:2;padding:10px 12px;border-radius:9px;background:rgba(17,24,20,.76);backdrop-filter:blur(7px);font-size:13px;line-height:1.35}.slide-caption b{display:block;margin-bottom:2px;color:#f3c275;text-transform:uppercase;font-size:11px;letter-spacing:.05em}
      @media(max-width:1050px){.hero-media img,.hero-media video{height:420px}.case-preview{height:220px}.compare{height:48vh}.video-poster{height:210px}}
      @media(max-width:680px){.media,.project .media{height:210px}.case-preview{height:220px}.compare{min-height:320px;height:50vh}.gallery-main img{height:46vh}.gallery-caption{position:relative;left:auto;right:auto;bottom:auto;border-radius:0;background:#173629}.slide-caption{font-size:12px;line-height:1.25}.project-carousel.large .carousel-slide img{height:300px}.hero-media img,.hero-media video{height:340px}}
    `;
    document.head.appendChild(style);
  };

  const serviceCards = () =>
    services
      .map(
        (item, index) => `
        <article class="service" data-reveal>
          <button data-service="${index}" aria-label="${tx(item.title)}">
            <div class="media"><img src="${img(item.cover)}" alt="${tx(item.title)}" loading="lazy"></div>
            <div class="body">
              <h3>${tx(item.title)}</h3>
              <p>${tx(item.text)}</p>
              <span class="link">${state.lang === "hu" ? "Képek megnyitása" : "Open gallery"}</span>
            </div>
          </button>
        </article>`
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
          <strong>${state.lang === "hu" ? "Projekt képsorozat" : "Project image sequence"}</strong>
          <span>${images.length} ${state.lang === "hu" ? "kép" : "images"}</span>
        </div>
        <div class="carousel-stage">
          <button class="carousel-arrow carousel-prev" type="button" data-carousel-prev="${id}" aria-label="Previous">‹</button>
          <div class="carousel-viewport">
            <div class="carousel-track">
              ${images.map((p, i) => `<button class="carousel-slide" type="button" data-slide="${i}" data-phase="${p[1]}"><img src="${img(p[0], isModal ? 1100 : 520)}" alt="${photoCaption(p)}" loading="lazy"><span class="slide-caption"><b>${phaseText(p[1])}</b><span>${photoCaption(p)}</span></span></button>`).join("")}
            </div>
          </div>
          <button class="carousel-arrow carousel-next" type="button" data-carousel-next="${id}" aria-label="Next">›</button>
        </div>
        <div class="carousel-thumbs">
          ${images.map((p, i) => `<button type="button" data-carousel-dot="${id}" data-slide-to="${i}" data-phase="${p[1]}" aria-label="${phaseText(p[1])} ${i + 1}: ${photoCaption(p)}"><img src="${img(p[0], 180)}" alt="" loading="lazy"></button>`).join("")}
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
              <img src="${img(item.cover, 900)}" alt="${tx(item.title)}" loading="lazy">
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
              <img src="${img(item.before)}" alt="${tx(phaseLabel.before)}" loading="lazy">
              <img src="${img(item.after)}" alt="${tx(phaseLabel.after)}" loading="lazy">
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
          ${projectCarousel(item, index, "card")}
        </article>`;
        }
      )
      .join("");

  const cta = (titleHu, titleEn, textHu, textEn) => `
    <div class="cta" data-reveal>
      <div><strong>${state.lang === "hu" ? titleHu : titleEn}</strong><p>${state.lang === "hu" ? textHu : textEn}</p></div>
      <a class="btn primary" href="${tel}">${phone}</a>
    </div>`;

  const render = () => {
    document.documentElement.lang = state.lang;
    document.body.innerHTML = `
      <header class="header">
        <a class="brand" href="#">
          <span class="logo">BPS</span>
          <span><strong>Budapest Property Services</strong><small>${state.lang === "hu" ? "Festés, gipszkarton, kert, kisebb javítások" : "Painting, drywall, garden care, small repairs"}</small></span>
        </a>
        <nav class="nav">
          <a href="#services">${tx(content.nav.services)}</a>
          <a href="#clients">${tx(content.nav.clients)}</a>
          <a href="#projects">${tx(content.nav.projects)}</a>
          <a href="#media">${state.lang === "hu" ? "Képgalériák" : "Galleries"}</a>
          <a href="#contact">${tx(content.nav.contact)}</a>
        </nav>
        <div class="actions">
          <button class="lang" id="langBtn">${state.lang === "hu" ? "EN" : "HU"}</button>
          <a class="btn primary phone" href="${tel}">${phone}</a>
        </div>
      </header>

      <main>
        <section class="hero wrap">
          <div data-reveal>
            <div class="eyebrow">${tx(content.hero.label)}</div>
            <h1>${tx(content.hero.title)}</h1>
            <p class="lead">${tx(content.hero.text)}</p>
            <div class="hero-ctas">
              <a class="btn primary" href="${tel}">${tx(content.hero.primary)}</a>
              <a class="btn" href="#projects">${tx(content.hero.secondary)}</a>
              <a class="btn" href="${wa}">WhatsApp</a>
            </div>
            <div class="stats">${content.stats.map((s) => `<div class="stat"><b>${s.n}</b>${state.lang === "hu" ? s.hu : s.en}</div>`).join("")}</div>
          </div>
          <div class="hero-media" data-reveal>
            <video class="hero-video" autoplay muted loop playsinline preload="metadata" poster="${img(heroVideo.poster, 1200)}" aria-label="Budapest property maintenance overview video">
              <source src="${heroVideo.src}" type="video/mp4">
            </video>
            <div class="note"><strong>${tx(content.hero.noteTitle)}</strong><p>${tx(content.hero.noteText)}</p></div>
          </div>
        </section>

        <section id="services" class="section wrap">
          <div class="section-head" data-reveal><h2>${tx(content.servicesTitle)}</h2><p>${tx(content.servicesText)}</p></div>
          <div class="grid four">${serviceCards()}</div>
          ${cta("Küldjön fotókat a munkáról", "Send photos of the job", "Fotók alapján gyorsabban megmondható, merre érdemes indulni.", "Photos make it easier to understand the likely scope quickly.")}
        </section>

        <section class="section wrap">
          <div class="section-head" data-reveal><h2>${tx(content.problemsTitle)}</h2><p>${state.lang === "hu" ? "Olyan helyzetekre készülünk, amelyeknél gyors döntés, tiszta egyeztetés és látható eredmény kell: kiköltözés, vendégváltás, irodai frissítés vagy távolról intézett ingatlanmunka." : "The service is built for situations that need quick decisions, clear communication and a visible result: move-outs, guest turnovers, office refreshes and work arranged from abroad."}</p></div>
          <div class="grid three">
            ${problems.map((p, i) => `<article class="problem" data-reveal><div class="media"><img src="${img(services[i % services.length].cover)}" alt="${state.lang === "hu" ? p[0] : p[1]}" loading="lazy"><span class="tag">${state.lang === "hu" ? p[0] : p[1]}</span></div><div class="body"><p>${state.lang === "hu" ? p[2] : p[3]}</p><p class="solution">${state.lang === "hu" ? "Megoldás: rövid egyeztetés, célzott munka, fotós visszajelzés." : "Solution: short briefing, focused work and photo feedback."}</p></div></article>`).join("")}
          </div>
        </section>

        <section id="projects" class="section wrap">
          <div class="section-head" data-reveal><h2>${tx(content.projectsTitle)}</h2><p>${state.lang === "hu" ? "A képsorozatok az egyes munkatípusok tipikus kiinduló állapotát, munkafázisait és elérhető végeredményét szemléltetik. A konkrét ingatlan felmérése mindig az ügyféltől kapott fotók és helyszíni adatok alapján indul." : "These image sequences illustrate typical starting conditions, work stages and achievable outcomes for each service. Every real property assessment begins with the client's own photos and site details."}</p></div>
          <div class="reference-panel" data-reveal>
            <div>
              <span class="eyebrow">${state.lang === "hu" ? "Munkafolyamat áttekintése" : "Work process overview"}</span>
              <h3>${state.lang === "hu" ? "Nem csak szép képek, hanem követhető munka." : "Not just nice photos, but work visitors can understand."}</h3>
              <p>${state.lang === "hu" ? "A képes példák segítenek áttekinteni, hogyan jut el egy munka a kiinduló problémától a rendezett átadásig. A tényleges feladatot minden esetben külön egyeztetjük és dokumentáljuk." : "The visual examples make it easier to understand how work moves from the initial issue to a tidy handover. The actual scope is always agreed and documented separately for each property."}</p>
            </div>
            <div class="reference-proof-grid">${referenceProofCards()}</div>
          </div>
          <div class="filterbar" data-reveal>${projectFilterButtons()}</div>
          <div class="grid project-grid-rich">${projectCards()}</div>
          ${cta("Kérjen képek alapján gyors felmérést", "Request a quick photo-based assessment", "Küldjön fotókat az ingatlanról, és áttekintjük: mi a gond, milyen munka szükséges, és milyen eredmény várható.", "Send photos of the property and we will review the issue, the likely work required and the expected outcome.")}
        </section>

        <section class="section wrap">
          <div class="showreel" data-reveal>
            <div class="show-copy"><span class="eyebrow">10 sec showreel</span><h2>${state.lang === "hu" ? "Rövid vizuális áttekintés" : "Short visual overview"}</h2><p>${state.lang === "hu" ? "Röviden látható, milyen állapotokkal dolgozunk: faljavítás, gipszkarton, kertgondozás és átadásra kész belső terek." : "A quick look at the types of conditions we handle: wall repair, drywall, garden care and rooms prepared for handover."}</p><a class="btn primary" href="#contact">${state.lang === "hu" ? "Beszéljünk róla" : "Discuss the job"}</a></div>
            <div class="show-stage"><img id="reelImg" src="${img(reel[0][0])}" alt="Property service showreel"><div class="show-caption"><strong id="reelTitle">${tx(reel[0][1])}</strong></div></div>
          </div>
        </section>

        <section id="media" class="section wrap">
          <div class="section-head" data-reveal>
            <h2>${state.lang === "hu" ? "Képes munkafolyamatok" : "Visual work processes"}</h2>
            <p>${state.lang === "hu" ? "Minden képsorozat egyetlen szolgáltatási területhez tartozik, és külön mutatja a tipikus kiinduló állapotot, a munkafázisokat és a rendezett végeredményt." : "Each image sequence belongs to one service area and separately shows a typical starting condition, the work stages and the finished outcome."}</p>
          </div>
          <div class="video-grid">${mediaReferenceCards()}</div>
          ${cta("Küldjön fotókat az ingatlanról", "Send photos of the property", "A képek alapján gyorsabban azonosítható a probléma és a szükséges munkafolyamat.", "Photos make it easier to identify the issue and the likely work required.")}
        </section>

        <section id="clients" class="section wrap">
          <div class="split">
            <div class="section-head" data-reveal><h2>${tx(content.audienceTitle)}</h2><p>${state.lang === "hu" ? "A hangsúly a diszkréción, pontosságon, átlátható egyeztetésen és rendezett átadáson van." : "The focus is discretion, punctuality, clear communication and tidy handover."}</p></div>
            <div class="grid two">${audience.map((a) => `<article class="audience" data-reveal><h3>${state.lang === "hu" ? a[0] : a[1]}</h3><p>${a[2]}</p></article>`).join("")}</div>
          </div>
          ${cta("Beszéljünk a projektről", "Let us discuss the project", "Egy rövid hívás elég ahhoz, hogy kiderüljön, milyen munka szükséges.", "A short call is enough to clarify what kind of work is needed.")}
        </section>

        <section class="section wrap">
          <div class="split">
            <div class="section-head" data-reveal><h2>${tx(content.processTitle)}</h2><p>${state.lang === "hu" ? "A rendszer lényege, hogy az ügyfél tudja, mi fog történni, mikor kap visszajelzést és milyen eredményre számíthat." : "The point of the process is simple: the client knows what will happen, when updates arrive and what result to expect."}</p></div>
            <div class="steps">${process.map((p, i) => `<article class="step" data-reveal><span class="num">${String(i + 1).padStart(2, "0")}</span><div><h3>${state.lang === "hu" ? p[0] : p[1]}</h3><p>${state.lang === "hu" ? p[2] : p[3]}</p></div></article>`).join("")}</div>
          </div>
        </section>

        <section class="section wrap">
          <div class="section-head" data-reveal><h2>${tx(content.trustTitle)}</h2><p>${state.lang === "hu" ? "A bizalom nem nagy ígéretekből jön, hanem abból, hogy a folyamat átlátható, a munka dokumentált, a kommunikáció pedig érthető." : "Trust comes from a clear process, documented work and communication that is easy to follow."}</p></div>
          <div class="reviews">
            <article class="review" data-reveal><h3>${state.lang === "hu" ? "Átlátható egyeztetés" : "Clear briefing"}</h3><p>${state.lang === "hu" ? "Már az elején tisztázzuk, mi fér bele a munkába és mi igényel külön döntést." : "The scope is clarified early, including what needs a separate decision."}</p></article>
            <article class="review" data-reveal><h3>${state.lang === "hu" ? "Fotós visszajelzés" : "Photo updates"}</h3><p>${state.lang === "hu" ? "Távol lévő tulajdonosnál különösen fontos, hogy ne csak szóbeli ígéret legyen." : "Especially for remote owners, work should be visible, not only promised."}</p></article>
            <article class="review" data-reveal><h3>${state.lang === "hu" ? "Rendezett átadás" : "Tidy handover"}</h3><p>${state.lang === "hu" ? "A végén nem csak a javítás számít, hanem az is, hogyan néz ki az ingatlan." : "At the end, the condition of the property matters as much as the repair itself."}</p></article>
          </div>
        </section>

        <section class="section wrap">
          <div class="section-head" data-reveal><h2>${tx(content.faqTitle)}</h2></div>
          <div class="grid two">${faq.map((f) => `<article class="faq" data-reveal><h3>${state.lang === "hu" ? f[0] : f[1]}</h3><p>${state.lang === "hu" ? f[2] : f[3]}</p></article>`).join("")}</div>
        </section>

        <section id="contact" class="section wrap">
          <div class="contact" data-reveal>
            <div><h2>${tx(content.contactTitle)}</h2><p>${tx(content.contactText)}</p></div>
            <div class="contact-card"><strong>${phone}</strong><a class="btn primary" href="${tel}">${state.lang === "hu" ? "Telefonos egyeztetés" : "Call now"}</a><a class="btn" href="${wa}">WhatsApp</a><small>${state.lang === "hu" ? "Budapest és közvetlen környéke." : "Budapest and nearby area."}</small></div>
          </div>
        </section>
      </main>

      <footer class="footer"><span>Budapest Property Services</span><span>Budapest property services - apartment maintenance - Airbnb support</span></footer>
      <div class="mobile-cta"><a href="${tel}">${phone}</a><a href="#contact">${state.lang === "hu" ? "Kapcsolat" : "Contact"}</a></div>
      <div id="projectModal" class="modal" aria-hidden="true"><button class="backdrop" data-close></button><div class="panel"><button class="close" data-close>×</button><div id="projectInner"></div></div></div>
      <div id="galleryModal" class="modal" aria-hidden="true"><button class="backdrop" data-close></button><div class="panel"><button class="close" data-close>×</button><div id="galleryInner"></div></div></div>
    `;
    bind();
    reveal();
    updateReel();
    initCarousels(document);
  };

  const bind = () => {
    document.getElementById("langBtn").addEventListener("click", () => {
      state.lang = state.lang === "hu" ? "en" : "hu";
      localStorage.setItem("bps-lang", state.lang);
      render();
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
    document.querySelectorAll("[data-close]").forEach((btn) => btn.addEventListener("click", closeModals));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeModals();
    });
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
            <img class="after" src="${img(item.after, 1500)}" alt="${tx(phaseLabel.after)}">
            <img class="before" src="${img(item.before, 1500)}" alt="${tx(phaseLabel.before)}">
            <span class="label left">${tx(phaseLabel.before)}</span>
            <span class="label right">${tx(phaseLabel.after)}</span>
            <span class="handle"></span>
          </div>
          <p class="compare-hint">${state.lang === "hu" ? "Húzza a csúszkát az előtte-utána összehasonlításhoz. A képek az adott munkatípus tipikus állapotait szemléltetik." : "Move the slider to compare before and finished condition. The images illustrate typical stages of this service."}</p>
          <input class="range" id="range" type="range" min="5" max="95" value="50" aria-label="Before after slider">
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
          <h2>${tx(item.title)}</h2>
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
          <h3>${state.lang === "hu" ? "Elvégzett munkák" : "Work completed"}</h3>
          <ul>${tx(item.works).map((work) => `<li>${work}</li>`).join("")}</ul>
          <div class="result"><strong>${state.lang === "hu" ? "Végeredmény" : "Result"}</strong><p>${tx(item.result)}</p></div>
          <div class="section-cta"><a class="btn primary" href="${tel}">${state.lang === "hu" ? "Kérek hasonló felmérést" : "Request a similar scope check"}</a></div>
        </div>
      </div>`;
    const modal = document.getElementById("projectModal");
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    document.getElementById("range").addEventListener("input", (event) => {
      document.getElementById("compare").style.setProperty("--split", `${event.target.value}%`);
    });
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
          const project = projects[Number(carousel.dataset.projectIndex)];
          const slideIndex = Number(btn.dataset.slide);
          if (carousel.dataset.carouselAction === "gallery") {
            openGallery(project.images, slideIndex, tx(project.title));
          } else {
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
        viewport.setPointerCapture?.(event.pointerId);
      });
      viewport.addEventListener("pointermove", (event) => {
        if (!dragging) return;
        lastX = event.clientX;
      });
      const finishDrag = () => {
        if (!dragging) return;
        const delta = lastX - startX;
        dragging = false;
        if (Math.abs(delta) > 42) moveCarousel(id, delta < 0 ? 1 : -1);
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
    slides.forEach((slide) => slide.classList.toggle("active", slide === visibleSlides[active]));
    thumbs.forEach((thumb) => thumb.classList.toggle("active", thumb === visibleThumbs[active]));
  };

  const openGallery = (photos, index, title) => {
    state.gallery = photos;
    state.galleryIndex = index;
    document.getElementById("galleryInner").innerHTML = `
      <div class="gallery-layout">
        <div class="gallery-main">
          <img id="galleryImg" src="" alt="${title}">
          <button class="arrow prev" id="prev" aria-label="Previous">‹</button>
          <button class="arrow next" id="next" aria-label="Next">›</button>
          <span class="counter" id="counter"></span>
          <div class="gallery-caption" id="galleryCaption"></div>
        </div>
        <div>
          <small class="eyebrow">${title}</small>
          <h2>${state.lang === "hu" ? "Képes munkafolyamat" : "Visual work process"}</h2>
          <p>${state.lang === "hu" ? "A képek az adott szolgáltatás tipikus kiinduló állapotát, munkafázisait és elérhető végeredményét mutatják. A konkrét feladatot mindig a helyszín saját fotói alapján egyeztetjük." : "The images show typical starting conditions, work stages and achievable outcomes for this service. The actual scope is always agreed from photos of the specific property."}</p>
          <div class="thumb-grid" id="thumbs">${photos.map((p, i) => `<button data-thumb="${i}" aria-label="${photoCaption(p)}"><img src="${img(p[0], 360)}" alt="${photoCaption(p)}" loading="lazy"></button>`).join("")}</div>
        </div>
      </div>`;
    const modal = document.getElementById("galleryModal");
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    document.getElementById("prev").addEventListener("click", () => showGallery(state.galleryIndex - 1));
    document.getElementById("next").addEventListener("click", () => showGallery(state.galleryIndex + 1));
    document.querySelectorAll("#thumbs [data-thumb]").forEach((btn) => {
      btn.addEventListener("click", () => showGallery(Number(btn.dataset.thumb)));
    });
    showGallery(index);
  };

  const showGallery = (index) => {
    if (!state.gallery.length) return;
    state.galleryIndex = (index + state.gallery.length) % state.gallery.length;
    const current = state.gallery[state.galleryIndex];
    const [id, phase] = current;
    document.getElementById("galleryImg").src = img(id, 1600);
    document.getElementById("galleryImg").alt = photoCaption(current);
    document.getElementById("counter").textContent = `${state.galleryIndex + 1} / ${state.gallery.length} - ${phaseText(phase)}`;
    document.getElementById("galleryCaption").innerHTML = `<b>${phaseText(phase)}</b><span>${photoCaption(current)}</span>`;
  };

  const closeModals = () => {
    document.querySelectorAll("video").forEach((video) => {
      if (!video.classList.contains("hero-video")) video.pause();
    });
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    });
    document.body.classList.remove("modal-open");
  };

  const reveal = () => {
    const items = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    items.forEach((item) => observer.observe(item));
  };

  const updateReel = () => {
    const reelImg = document.getElementById("reelImg");
    const reelTitle = document.getElementById("reelTitle");
    if (!reelImg || !reelTitle) return;
    const current = reel[state.reel % reel.length];
    reelImg.src = img(current[0], 1400);
    reelTitle.textContent = tx(current[1]);
  };

  installStyle();
  render();
  setInterval(() => {
    state.reel += 1;
    updateReel();
  }, 2500);
})();
