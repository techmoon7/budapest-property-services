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
        "A kritikus falrészeket fotók alapján beazonosítjuk, majd a felületet előkészítj…13687 tokens truncated…grid">${referenceProofCards()}</div>
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

