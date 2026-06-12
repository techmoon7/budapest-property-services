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
        hu: "Budapesti ingatlanok karbantartása, szervezetten.",
        en: "Organised maintenance for Budapest properties.",
      },
      text: {
        hu:
          "Festés, gipszkarton-javítás, kisebb szerelés és kertgondozás budapesti lakásokban, irodákban és képviseleti ingatlanokban. Magyar és angol egyeztetés, rendezett munkavégzés és fotós visszajelzés.",
        en:
          "Painting, drywall repair, small maintenance jobs and garden care for Budapest apartments, offices and representative properties. Communication is available in Hungarian and English, with clear photo updates for owners who are not on site.",
      },
      primary: { hu: "Telefonos egyeztetés", en: "Discuss the job" },
      secondary: { hu: "Munkapéldák", en: "View work examples" },
      noteTitle: { hu: "Kisebb munkák, átlátható szervezéssel", en: "Small jobs, clearly coordinated" },
      noteText: {
        hu:
          "Bérlőváltás, vendégérkezés vagy irodaátadás előtt néhány jól ütemezett javítás is sokat számít.",
        en:
          "Before a guest arrival, tenant handover or office visit, a few well-planned repairs can make a meaningful difference.",
      },
    },
    stats: [
      { n: "HU/EN", hu: "magyar és angol kommunikáció", en: "Hungarian and English communication" },
      { n: "Fotók", hu: "állapot- és munkafolyamat-frissítések", en: "condition and progress updates" },
      { n: "Budapest", hu: "helyi fókusz, lakásoktól az irodákig", en: "local focus, from apartments to offices" },
    ],
    servicesTitle: {
      hu: "Miben segítünk?",
      en: "What we can handle",
    },
    servicesText: {
      hu:
        "Tipikus budapesti helyzetekben segítünk: bérlőváltás, Airbnb-vendég érkezése, irodai frissítés vagy külföldről szervezett karbantartás. A feladatot előre tisztázzuk, a fontos állapotokat pedig fotókkal dokumentáljuk.",
      en:
        "The service is built around real Budapest property situations: tenant move-outs, Airbnb turnovers, office touch-ups and owners who need work arranged without being physically present.",
    },
    problemsTitle: { hu: "Tipikus helyzetek, gyakorlati segítség", en: "Typical situations, practical support" },
    projectsTitle: { hu: "Illusztratív munkapéldák", en: "Illustrative work examples" },
    processTitle: { hu: "Hogyan dolgozunk?", en: "How the work is handled" },
    trustTitle: { hu: "Mitől átlátható az együttműködés?", en: "What makes coordination clear" },
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
      before: "12036084",
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
      cover: "assets/budapest-courtyard-garden-1.jpg",
      before: "assets/budapest-courtyard-before-entrance.jpg",
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
      cover: "19899060",
      before: "5102904",
      after: "19899060",
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
    ["Nagykövetségek és képviseletek", "Embassies and representative offices", "Diszkrét egyeztetés és rendezett munkavégzés lakásokban, irodákban és képviseleti terekben.", "Discreet coordination and tidy work in residences, offices and representative spaces."],
    ["Nemzetközi cégek", "International companies", "Irodák és közös terek kisebb javításai, lehetőség szerint a napi működéshez igazítva.", "Minor repairs in offices and shared spaces, scheduled around normal operations where possible."],
    ["Külföldi tulajdonosok", "Foreign owners", "Magyar és angol kommunikáció, valamint fotós frissítések, ha a tulajdonos nincs Budapesten.", "Hungarian and English communication with photo updates when the owner is not in Budapest."],
    ["Airbnb és bérlemények", "Airbnb and rentals", "Látható hibák, faljavítások és kisebb szerelések kezelése vendég- vagy bérlőváltás előtt.", "Visible defects, wall repairs and small maintenance tasks handled before guest or tenant turnover."],
  ];

  const faq = [
    ["Lehet csak kisebb munkát kérni?", "Can I request a small job?", "Igen. A cél pont az, hogy kisebb, de fontos javításokat is szervezetten lehessen intézni.", "Yes. The service is designed for smaller but important property fixes."],
    ["Küldhetek fotókat első körben?", "Can I send photos first?", "Igen. Fotók alapján sokszor gyorsan eldönthető, milyen munka szükséges.", "Yes. Photos are often enough to clarify the likely scope."],
    ["Angolul is lehet egyeztetni?", "Is English communication available?", "Igen, az oldal és az egyeztetés is magyarul és angolul működhet.", "Yes, the website and communication can work in Hungarian and English."],
    ["Budapesten kívül is működik?", "Do you work outside Budapest?", "Első körben Budapest és közvetlen környéke a célszerű terület.", "The practical focus is Budapest and the nearby area."],
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
          <button class="lang" id="langBtn" type="button" aria-label="${state.lang === "hu" ? "Switch to English" : "Váltás magyar nyelvre"}">${state.lang === "hu" ? "EN" : "HU"}</button>
          <a class="btn primary phone" href="${tel}">${phone}</a>
        </div>
      </header>

      <main id="top">
        <section class="hero wrap" aria-labelledby="hero-title">
          <div data-reveal>
            <div class="eyebrow">${tx(content.hero.label)}</div>
            <h1 id="hero-title">${tx(content.hero.title)}</h1>
            <p class="lead">${tx(content.hero.text)}</p>
            <div class="hero-ctas">
              <a class="btn primary" href="${tel}">${tx(content.hero.primary)}</a>
              <a class="btn" href="#projects">${tx(content.hero.secondary)}</a>
              <a class="btn" href="${wa}">WhatsApp</a>
            </div>
            <div class="stats">${content.stats.map((s) => `<div class="stat"><b>${s.n}</b>${state.lang === "hu" ? s.hu : s.en}</div>`).join("")}</div>
          </div>
          <div class="hero-media" data-reveal>
            <img src="${img(heroImage)}" width="1600" height="800" fetchpriority="high" alt="${state.lang === "hu" ? "Falfrissítésre előkészített budapesti polgári lakás" : "Budapest apartment prepared for a careful wall refresh"}">
            <div class="note"><strong>${tx(content.hero.noteTitle)}</strong><p>${tx(content.hero.noteText)}</p></div>
          </div>
        </section>

        <aside class="illustration-note wrap" data-reveal>
          <span aria-hidden="true">i</span>
          <p>${state.lang === "hu" ? "Az oldalon szereplő képek illusztrációk, amelyek tipikus munkafolyamatokat és várható eredményeket mutatnak." : "The images on this website are illustrative examples showing typical work processes and expected results."}</p>
        </aside>

        <section id="services" class="section wrap">
          <div class="section-head" data-reveal><h2>${tx(content.servicesTitle)}</h2><p>${tx(content.servicesText)}</p></div>
          <div class="grid four">${serviceCards()}</div>
          ${cta("Küldjön fotókat a munkáról", "Send photos of the job", "Fotók alapján gyorsabban megmondható, merre érdemes indulni.", "Photos make it easier to understand the likely scope quickly.")}
        </section>

        <section class="section wrap">
          <div class="section-head" data-reveal><h2>${tx(content.problemsTitle)}</h2><p>${state.lang === "hu" ? "Olyan helyzetekre készülünk, amelyeknél gyors döntés, tiszta egyeztetés és látható eredmény kell: kiköltözés, vendégváltás, irodai frissítés vagy távolról intézett ingatlanmunka." : "The service is built for situations that need quick decisions, clear communication and a visible result: move-outs, guest turnovers, office refreshes and work arranged from abroad."}</p></div>
          <div class="grid three">
            ${problems.map((p, i) => `<article class="problem" data-reveal><div class="media"><img src="${img(services[i % services.length].cover)}" alt="${state.lang === "hu" ? p[0] : p[1]}" loading="lazy" decoding="async"><span class="tag">${state.lang === "hu" ? p[0] : p[1]}</span></div><div class="body"><p>${state.lang === "hu" ? p[2] : p[3]}</p><p class="solution">${state.lang === "hu" ? "Megoldás: rövid egyeztetés, célzott munka, fotós visszajelzés." : "Solution: short briefing, focused work and photo feedback."}</p></div></article>`).join("")}
          </div>
        </section>

        <section id="projects" class="section wrap">
          <div class="section-head" data-reveal><h2>${tx(content.projectsTitle)}</h2><p>${state.lang === "hu" ? "Ezek nem saját referenciaprojektek, hanem illusztratív képsorozatok. Azt mutatják meg, milyen kiinduló állapotokkal, munkafázisokkal és eredményekkel lehet találkozni az egyes szolgáltatásoknál." : "These are illustrative image sequences, not a portfolio of completed client projects. They show typical starting conditions, work stages and expected results for each service."}</p></div>
          <div class="reference-panel" data-reveal>
            <div>
              <span class="eyebrow">${state.lang === "hu" ? "Munkafolyamat áttekintése" : "Work process overview"}</span>
              <h3>${state.lang === "hu" ? "A folyamat legyen érthető távolról is." : "A process that remains clear from abroad."}</h3>
              <p>${state.lang === "hu" ? "A tényleges feladatot az adott ingatlan fotói és helyszíni adatai alapján egyeztetjük. A fontos munkafázisokról kérés szerint fotós frissítés készül." : "The actual scope is agreed from photos and site details for the specific property. Photo updates can document the important stages of the work."}</p>
            </div>
            <div class="reference-proof-grid">${referenceProofCards()}</div>
          </div>
          <div class="filterbar" data-reveal>${projectFilterButtons()}</div>
          <div class="grid project-grid-rich">${projectCards()}</div>
          ${cta("Kérjen képek alapján gyors felmérést", "Request a quick photo-based assessment", "Küldjön fotókat az ingatlanról, és áttekintjük: mi a gond, milyen munka szükséges, és milyen eredmény várható.", "Send photos of the property and we will review the issue, the likely work required and the expected outcome.")}
        </section>

        <section class="section wrap">
          <div class="showreel" data-reveal>
            <div class="show-copy"><span class="eyebrow">${state.lang === "hu" ? "Budapesti fókusz" : "Budapest focus"}</span><h2>${state.lang === "hu" ? "Hétköznapi ingatlanok, rendezett munkavégzés" : "Real properties, organised maintenance"}</h2><p>${state.lang === "hu" ? "Polgári lakások, bérlemények, társasházi udvarok és irodák. A cél nem a látványos ígéret, hanem a tisztán egyeztetett és dokumentálható munka." : "Period apartments, rentals, apartment courtyards and offices. The focus is clearly agreed, documentable work rather than exaggerated promises."}</p><a class="btn primary" href="#contact">${state.lang === "hu" ? "Egyeztessünk" : "Discuss the property"}</a></div>
            <div class="show-stage"><img src="${img(heroImage)}" width="1600" height="800" loading="lazy" decoding="async" alt="${state.lang === "hu" ? "Budapesti lakás faljavítás közben" : "Budapest apartment during wall maintenance"}"></div>
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
            <div class="grid two">${audience.map((a) => `<article class="audience" data-reveal><h3>${state.lang === "hu" ? a[0] : a[1]}</h3><p>${state.lang === "hu" ? a[2] : a[3]}</p></article>`).join("")}</div>
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
      <div class="mobile-cta"><a href="${tel}">${phone}</a><a href="${wa}" aria-label="WhatsApp">WhatsApp</a></div>
      <div id="projectModal" class="modal" role="dialog" aria-modal="true" aria-hidden="true"><button class="backdrop" data-close aria-label="${state.lang === "hu" ? "Ablak bezárása" : "Close dialog"}"></button><div class="panel" tabindex="-1"><button class="close" type="button" data-close aria-label="${state.lang === "hu" ? "Ablak bezárása" : "Close dialog"}">×</button><div id="projectInner"></div></div></div>
      <div id="galleryModal" class="modal" role="dialog" aria-modal="true" aria-hidden="true"><button class="backdrop" data-close aria-label="${state.lang === "hu" ? "Galéria bezárása" : "Close gallery"}"></button><div class="panel" tabindex="-1"><button class="close" type="button" data-close aria-label="${state.lang === "hu" ? "Galéria bezárása" : "Close gallery"}">×</button><div id="galleryInner"></div></div></div>
    `;
    bind();
    reveal();
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
          <p class="compare-hint">${state.lang === "hu" ? "Húzza a csúszkát az előtte-utána összehasonlításhoz. A képek az adott munkatípus tipikus állapotait szemléltetik." : "Move the slider to compare before and finished condition. The images illustrate typical stages of this service."}</p>
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
          <div class="section-cta"><a class="btn primary" href="${tel}">${state.lang === "hu" ? "Kérek hasonló felmérést" : "Request a similar scope check"}</a></div>
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
