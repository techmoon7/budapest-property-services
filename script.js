const header = document.querySelector(".site-header");
const toggle = document.querySelector("[data-language-toggle]");
const translatable = document.querySelectorAll("[data-hu][data-en]");
const galleryTriggers = document.querySelectorAll("[data-gallery]");
const modal = document.querySelector("[data-work-modal]");
const modalImage = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
const modalCount = document.querySelector("[data-modal-count]");
const modalThumbs = document.querySelector("[data-modal-thumbs]");
const galleryPrev = document.querySelector("[data-gallery-prev]");
const galleryNext = document.querySelector("[data-gallery-next]");
const phoneActions = document.querySelectorAll("[data-phone-action]");

const pexels = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1400`;

const galleries = {
  painting: [
    { src: pexels("34046213"), alt: "Interior wall painting with roller" },
    { src: pexels("6474490"), alt: "Painter working on an interior wall" },
    { src: pexels("34046208"), alt: "Paint tools prepared for room painting" },
    { src: pexels("994164"), alt: "Fresh wall painting detail" },
    { src: pexels("6764275"), alt: "Room painting preparation" },
    { src: pexels("6764276"), alt: "Interior paint roller work" },
    { src: pexels("7218011"), alt: "Clean wall refresh work" },
    { src: pexels("7218009"), alt: "Painter finishing a room wall" },
    { src: pexels("6474483"), alt: "Painting tools in a tidy interior" },
    { src: pexels("5691611"), alt: "Interior painting close-up" },
  ],
  wallrepair: [
    { src: pexels("5583119"), alt: "Wall repair with a putty knife" },
    { src: pexels("6473978"), alt: "Damaged wall sanding before painting" },
    { src: pexels("5767957"), alt: "Smooth wall repair with an electric sander" },
    { src: pexels("5691596"), alt: "Wall patching and plaster work" },
    { src: pexels("5767932"), alt: "Repairing wall defects before painting" },
    { src: pexels("5691606"), alt: "Smoothing plaster on an interior wall" },
    { src: pexels("6474207"), alt: "Drywall surface patched for finishing" },
    { src: pexels("6474300"), alt: "Interior wall repair and preparation" },
    { src: pexels("6474343"), alt: "Ceiling and wall sanding preparation" },
    { src: pexels("6474129"), alt: "Plasterboard ceiling finishing" },
  ],
  drywall: [
    { src: pexels("6474313"), alt: "Suspended ceiling and drywall installation" },
    { src: pexels("6474129"), alt: "Plasterboard wall and ceiling work" },
    { src: pexels("6474343"), alt: "Drywall ceiling sanding" },
    { src: pexels("6474300"), alt: "Interior wall preparation for drywall finishing" },
    { src: pexels("6474207"), alt: "Drywall boards installed indoors" },
    { src: pexels("3990359"), alt: "Interior drywall construction with tools" },
    { src: pexels("6474202"), alt: "Suspended ceiling construction detail" },
    { src: pexels("6474295"), alt: "Worker sanding plasterboard ceiling" },
    { src: pexels("6473978"), alt: "Worker sanding a repaired wall" },
    { src: pexels("11427405"), alt: "Plasterboard cutting for installation" },
  ],
  garden: [
    { src: pexels("6728930"), alt: "Lawn mowing and garden maintenance" },
    { src: pexels("24595768"), alt: "Hedge trimming by a gardener" },
    { src: pexels("7658820"), alt: "Pruning plants with garden shears" },
    { src: pexels("8174996"), alt: "Mowing grass in a home garden" },
    { src: pexels("5027602"), alt: "Trimming leaves with shears" },
    { src: pexels("8279725"), alt: "Garden hand tools and apron" },
    { src: pexels("6728933"), alt: "Person mowing a sunny lawn" },
    { src: pexels("5027601"), alt: "Gardener trimming plants" },
    { src: pexels("24595771"), alt: "Electric hedge trimming in a garden" },
    { src: pexels("6662500"), alt: "Pruning shears and garden flowers" },
  ],
  handyman: [
    { src: pexels("4981802"), alt: "Handyman drilling into an apartment wall" },
    { src: pexels("7218577"), alt: "Power drill wall installation" },
    { src: pexels("15406523"), alt: "Home repair drilling work" },
    { src: pexels("4312854"), alt: "Hand tools for small home repairs" },
    { src: pexels("5484718"), alt: "Carpentry tools on a wooden surface" },
    { src: pexels("6024540"), alt: "Drill and repair tools in an interior" },
    { src: pexels("175039"), alt: "Hardware and small repair tools" },
    { src: pexels("7484795"), alt: "Workshop tools for maintenance" },
    { src: pexels("7640990"), alt: "Toolbox for apartment repairs" },
    { src: pexels("4792495"), alt: "Screws and fixings for small repairs" },
  ],
  property: [
    { src: pexels("3990359"), alt: "Clean interior construction preparation" },
    { src: pexels("6474129"), alt: "Plasterboard ceiling finishing" },
    { src: pexels("6474313"), alt: "Drywall and ceiling refresh work" },
    { src: pexels("6474490"), alt: "Interior painting for a rental refresh" },
    { src: pexels("5583119"), alt: "Wall repair before tenant handover" },
    { src: pexels("4981802"), alt: "Small apartment repair work" },
    { src: pexels("6728930"), alt: "Outdoor maintenance for a property" },
    { src: pexels("24595768"), alt: "Garden refresh for a property" },
    { src: pexels("6024540"), alt: "Tools for final property maintenance" },
    { src: pexels("5027601"), alt: "Outdoor cleanup for a maintained property" },
  ],
};

const showreelFrames = [
  {
    gallery: "drywall",
    titleHu: "Gipszkarton és álmennyezet",
    titleEn: "Drywall and suspended ceilings",
    textHu: "Rendezett szerkezet, tiszta illesztések, gyors helyszíni egyeztetés.",
    textEn: "Tidy structure, clean joints and a quick on-site check.",
  },
  {
    gallery: "wallrepair",
    titleHu: "Faljavítás és glettelés",
    titleEn: "Wall repair and smoothing",
    textHu: "Repedések, sérülések és kisebb hibák előkészítése festés előtt.",
    textEn: "Cracks, dents and smaller defects prepared before painting.",
  },
  {
    gallery: "painting",
    titleHu: "Szobafestés tiszta kivitelezéssel",
    titleEn: "Clean interior painting",
    textHu: "Letakart felületek, egyenletes falak, kulturált átadás.",
    textEn: "Protected surfaces, even walls and a tidy handover.",
  },
  {
    gallery: "handyman",
    titleHu: "Kisebb javítások és szerelés",
    titleEn: "Small repairs and fitting",
    textHu: "Polc, rögzített elem, apróbb karbantartás lakásban vagy irodában.",
    textEn: "Shelves, fixtures and small maintenance in flats or offices.",
  },
  {
    gallery: "garden",
    titleHu: "Kert és udvar rendbetétele",
    titleEn: "Garden and yard refresh",
    textHu: "Fű, sövény, szezonális rendbetétel és kisebb kültéri munkák.",
    textEn: "Grass, hedges, seasonal cleanup and smaller outdoor tasks.",
  },
];

let currentLanguage = "hu";
let activeGallery = [];
let activeImageIndex = 0;
let showreelIndex = 0;
let showreelTimer = null;
let showreelPlaying = true;

const localText = (element, key) =>
  element.dataset[`${key}${currentLanguage === "en" ? "En" : "Hu"}`] || "";

const setLanguage = (language) => {
  currentLanguage = language;
  document.documentElement.lang = language === "en" ? "en" : "hu";
  document.querySelectorAll("[data-hu][data-en]").forEach((element) => {
    element.textContent = element.dataset[language];
  });
  toggle.textContent = language === "en" ? "HU" : "EN";
  localStorage.setItem("bps-language", language);
  const showreelToggle = document.querySelector("[data-showreel-toggle]");
  if (showreelToggle) {
    showreelToggle.textContent =
      currentLanguage === "en"
        ? showreelPlaying
          ? "Pause"
          : "Play"
        : showreelPlaying
          ? "Megállítom"
          : "Indítás";
  }
  renderShowreelFrame(showreelIndex, false);
};

const renderGallery = () => {
  const image = activeGallery[activeImageIndex];
  modalImage.src = image.src;
  modalImage.alt = image.alt;
  modalCount.textContent = `${activeImageIndex + 1} / ${activeGallery.length}`;
  modalThumbs.innerHTML = "";

  activeGallery.forEach((galleryImage, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `modal-thumb${index === activeImageIndex ? " is-active" : ""}`;
    button.setAttribute("aria-label", `Open image ${index + 1}`);

    const thumb = document.createElement("img");
    thumb.src = galleryImage.src;
    thumb.alt = "";

    button.append(thumb);
    button.addEventListener("click", () => {
      activeImageIndex = index;
      renderGallery();
    });
    modalThumbs.append(button);
  });
};

const openModal = (trigger) => {
  const galleryKey = trigger.dataset.gallery || "property";
  activeGallery = galleries[galleryKey] || galleries.property;
  activeImageIndex = 0;

  if (trigger.dataset.modalImage) {
    const matchingIndex = activeGallery.findIndex((image) =>
      image.src.includes(trigger.dataset.modalImage.split("?")[0]),
    );
    activeImageIndex = Math.max(0, matchingIndex);
  }

  modalTitle.textContent = localText(trigger, "title");
  modalText.textContent = localText(trigger, "text");
  renderGallery();
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
};

const closeModal = () => {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
};

const moveGallery = (direction) => {
  activeImageIndex = (activeImageIndex + direction + activeGallery.length) % activeGallery.length;
  renderGallery();
};

const coverImages = {
  painting: galleries.painting[0],
  wallrepair: galleries.wallrepair[0],
  drywall: galleries.drywall[0],
  garden: galleries.garden[0],
  handyman: galleries.handyman[0],
  property: galleries.property[0],
};

const setCoverImage = (element, galleryKey) => {
  const image = coverImages[galleryKey];
  const img = element?.querySelector("img");

  if (!image || !img) {
    return;
  }

  element.dataset.gallery = galleryKey;
  element.dataset.modalImage = image.src;
  img.src = image.src.replace("w=1400", "w=900");
  img.alt = image.alt;
};

const syncPageImages = () => {
  setCoverImage(document.querySelector(".hero-image"), "property");
  setCoverImage(document.querySelector('#services [data-gallery="painting"]'), "painting");
  setCoverImage(document.querySelector('#services [data-gallery="drywall"]'), "drywall");
  setCoverImage(document.querySelector('#services [data-gallery="garden"]'), "garden");
  setCoverImage(document.querySelector('#services [data-gallery="handyman"]'), "handyman");

  setCoverImage(document.querySelector('.gallery [data-gallery="painting"]'), "painting");
  setCoverImage(document.querySelector('.gallery [data-gallery="property"]'), "property");
  setCoverImage(document.querySelector('.gallery [data-gallery="garden"]'), "garden");

  document.querySelectorAll(".work-card").forEach((card) => {
    const label = card.querySelector("span")?.dataset.hu || card.querySelector("span")?.textContent || "";
    const normalizedLabel = label.toLowerCase();

    if (normalizedLabel.includes("faljav")) {
      setCoverImage(card, "wallrepair");
    } else if (normalizedLabel.includes("gipszkarton")) {
      setCoverImage(card, "drywall");
    } else if (normalizedLabel.includes("kerti")) {
      setCoverImage(card, "garden");
    } else if (normalizedLabel.includes("kisebb")) {
      setCoverImage(card, "handyman");
    } else if (normalizedLabel.includes("ingatlan")) {
      setCoverImage(card, "property");
    } else {
      setCoverImage(card, "painting");
    }
  });
};

const injectShowreelStyles = () => {
  if (document.querySelector("[data-showreel-styles]")) {
    return;
  }

  const style = document.createElement("style");
  style.dataset.showreelStyles = "true";
  style.textContent = `
    .mini-showreel {
      width: min(1180px, calc(100% - 36px));
      margin: 48px auto 18px;
      display: grid;
      grid-template-columns: minmax(280px, 0.78fr) minmax(420px, 1.22fr);
      overflow: hidden;
      border: 1px solid rgba(45, 85, 62, 0.22);
      border-radius: 8px;
      background: #1f3329;
      box-shadow: 0 28px 72px rgba(45, 39, 31, 0.16);
    }

    .mini-showreel-copy {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 18px;
      padding: clamp(28px, 4vw, 48px);
      color: #fffaf0;
      background:
        linear-gradient(140deg, rgba(31, 51, 41, 0.98), rgba(45, 85, 62, 0.92)),
        radial-gradient(circle at 22% 20%, rgba(219, 158, 92, 0.20), transparent 34%);
    }

    .mini-showreel-copy .eyebrow {
      margin: 0;
      color: #e8b568;
    }

    .mini-showreel h2 {
      margin: 0;
      max-width: 560px;
      font-size: clamp(32px, 4vw, 54px);
      line-height: 0.96;
      color: #fff;
      letter-spacing: 0;
    }

    .mini-showreel-copy p:not(.eyebrow) {
      margin: 0;
      max-width: 520px;
      color: rgba(255, 250, 240, 0.82);
      font-size: 18px;
      line-height: 1.58;
    }

    .showreel-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 4px;
    }

    .showreel-control {
      min-height: 48px;
      padding: 0 18px;
      border: 1px solid rgba(255, 255, 255, 0.24);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.10);
      color: #fff;
      font: inherit;
      font-weight: 800;
      cursor: pointer;
    }

    .mini-showreel .secondary-btn {
      min-height: 48px;
      border-color: rgba(255, 255, 255, 0.24);
      color: #fff;
      background: rgba(255, 255, 255, 0.08);
    }

    .showreel-player {
      position: relative;
      min-height: 420px;
      overflow: hidden;
      background: #101814;
    }

    .showreel-player::after {
      content: "";
      position: absolute;
      inset: 0;
      background:
        linear-gradient(90deg, rgba(16, 24, 20, 0.10), rgba(16, 24, 20, 0)),
        linear-gradient(180deg, rgba(16, 24, 20, 0), rgba(16, 24, 20, 0.76));
      pointer-events: none;
    }

    .showreel-player img {
      width: 100%;
      height: 100%;
      min-height: 420px;
      object-fit: cover;
      display: block;
      transform: scale(1.035);
      filter: saturate(1.02) contrast(1.03);
      transition:
        opacity 420ms ease,
        transform 1800ms ease;
    }

    .showreel-player.is-changing img {
      opacity: 0.22;
      transform: scale(1.08);
    }

    .showreel-caption {
      position: absolute;
      left: 26px;
      right: 26px;
      bottom: 26px;
      z-index: 2;
      display: grid;
      gap: 8px;
      max-width: 620px;
      color: #fff;
    }

    .showreel-caption span {
      width: fit-content;
      min-width: 52px;
      padding: 6px 10px;
      border-radius: 8px;
      background: #e0a157;
      color: #1d241f;
      font-weight: 900;
      letter-spacing: 0;
    }

    .showreel-caption strong {
      font-size: clamp(28px, 3.4vw, 46px);
      line-height: 1;
      letter-spacing: 0;
    }

    .showreel-caption p {
      margin: 0;
      max-width: 560px;
      color: rgba(255, 255, 255, 0.82);
      font-size: 17px;
      line-height: 1.48;
    }

    .showreel-progress {
      position: absolute;
      left: 26px;
      right: 26px;
      bottom: 0;
      z-index: 3;
      height: 5px;
      overflow: hidden;
      border-radius: 999px 999px 0 0;
      background: rgba(255, 255, 255, 0.18);
    }

    .showreel-progress span {
      display: block;
      width: 100%;
      height: 100%;
      transform-origin: left center;
      transform: scaleX(0);
      background: #e0a157;
    }

    .showreel-progress span.is-running {
      animation: showreel-progress 10s linear infinite;
    }

    @keyframes showreel-progress {
      from { transform: scaleX(0); }
      to { transform: scaleX(1); }
    }

    @media (max-width: 820px) {
      .mini-showreel {
        grid-template-columns: 1fr;
        margin-top: 34px;
      }

      .showreel-player,
      .showreel-player img {
        min-height: 340px;
      }
    }
  `;

  document.head.append(style);
};

const showreelFrameImage = (frame) => galleries[frame.gallery]?.[0] || galleries.property[0];

const renderShowreelFrame = (index, animate = true) => {
  const section = document.querySelector("[data-mini-showreel]");
  if (!section) {
    return;
  }

  const player = section.querySelector("[data-showreel-player]");
  const imageElement = section.querySelector("[data-showreel-img]");
  const countElement = section.querySelector("[data-showreel-step]");
  const titleElement = section.querySelector("[data-showreel-title]");
  const textElement = section.querySelector("[data-showreel-text]");
  const frame = showreelFrames[index % showreelFrames.length];
  const image = showreelFrameImage(frame);

  if (animate) {
    player.classList.add("is-changing");
  }

  window.setTimeout(
    () => {
      imageElement.src = image.src.replace("w=1400", "w=1600");
      imageElement.alt = image.alt;
      countElement.textContent = String(index + 1).padStart(2, "0");
      titleElement.textContent = currentLanguage === "en" ? frame.titleEn : frame.titleHu;
      textElement.textContent = currentLanguage === "en" ? frame.textEn : frame.textHu;
      player.classList.remove("is-changing");
    },
    animate ? 180 : 0,
  );
};

const restartShowreelProgress = () => {
  const progress = document.querySelector("[data-showreel-progress]");
  if (!progress) {
    return;
  }

  progress.classList.remove("is-running");
  void progress.offsetWidth;
  if (showreelPlaying) {
    progress.classList.add("is-running");
  }
};

const startShowreel = () => {
  window.clearInterval(showreelTimer);
  showreelTimer = window.setInterval(() => {
    if (!showreelPlaying) {
      return;
    }
    showreelIndex = (showreelIndex + 1) % showreelFrames.length;
    renderShowreelFrame(showreelIndex);
  }, 2000);
  restartShowreelProgress();
};

const buildMiniShowreel = () => {
  if (document.querySelector("[data-mini-showreel]")) {
    return;
  }

  injectShowreelStyles();

  const section = document.createElement("section");
  section.className = "mini-showreel";
  section.dataset.miniShowreel = "true";
  section.setAttribute("aria-label", "Rövid munkafolyamat videó");

  section.innerHTML = `
    <div class="mini-showreel-copy">
      <p class="eyebrow" data-hu="10 mp munkafolyamat" data-en="10 sec workflow">10 mp munkafolyamat</p>
      <h2 data-hu="Gyorsan látszik, milyen munkákat vállalok" data-en="A quick look at the work I handle">Gyorsan látszik, milyen munkákat vállalok</h2>
      <p data-hu="Rövid, automatikusan futó bemutató festésről, faljavításról, gipszkartonról, kisebb szerelésről és kerti munkákról." data-en="A short automatic preview covering painting, wall repair, drywall, small repairs and garden work.">Rövid, automatikusan futó bemutató festésről, faljavításról, gipszkartonról, kisebb szerelésről és kerti munkákról.</p>
      <div class="showreel-actions">
        <button class="showreel-control" type="button" data-showreel-toggle data-hu="Megállítom" data-en="Pause">Megállítom</button>
        <a class="secondary-btn" href="#examples" data-hu="Képek megnyitása" data-en="Open examples">Képek megnyitása</a>
      </div>
    </div>
    <div class="showreel-player" data-showreel-player>
      <img data-showreel-img src="" alt="" />
      <div class="showreel-caption">
        <span data-showreel-step>01</span>
        <strong data-showreel-title></strong>
        <p data-showreel-text></p>
      </div>
      <div class="showreel-progress" aria-hidden="true"><span data-showreel-progress></span></div>
    </div>
  `;

  const anchor = document.querySelector("#services") || document.querySelector(".gallery");
  if (anchor) {
    anchor.insertAdjacentElement("beforebegin", section);
  } else {
    document.querySelector("main")?.append(section);
  }

  const toggleButton = section.querySelector("[data-showreel-toggle]");
  toggleButton.addEventListener("click", () => {
    showreelPlaying = !showreelPlaying;
    toggleButton.textContent =
      currentLanguage === "en"
        ? showreelPlaying
          ? "Pause"
          : "Play"
        : showreelPlaying
          ? "Megállítom"
          : "Indítás";
    restartShowreelProgress();
  });

  renderShowreelFrame(0, false);
  startShowreel();
};

const isDesktopBrowser = () =>
  !/Android|iPhone|iPad|iPod|Windows Phone|Mobi/i.test(navigator.userAgent);

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
});

toggle.addEventListener("click", () => {
  const nextLanguage = document.documentElement.lang === "en" ? "hu" : "en";
  setLanguage(nextLanguage);
});

syncPageImages();
buildMiniShowreel();

galleryTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => openModal(trigger));

  if (trigger.tagName !== "BUTTON") {
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(trigger);
      }
    });
  }
});

galleryPrev.addEventListener("click", () => moveGallery(-1));
galleryNext.addEventListener("click", () => moveGallery(1));

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

phoneActions.forEach((phoneAction) => {
  phoneAction.dataset.originalText = phoneAction.textContent;

  phoneAction.addEventListener("click", async (event) => {
    if (!isDesktopBrowser()) {
      return;
    }

    event.preventDefault();

    try {
      await navigator.clipboard.writeText("+36 20 667 1832");
      phoneAction.textContent =
        currentLanguage === "en" ? "Copied: +36 20 667 1832" : "Másolva: +36 20 667 1832";
    } catch {
      phoneAction.textContent = "+36 20 667 1832";
    }

    window.setTimeout(() => {
      phoneAction.textContent =
        phoneAction.dataset[currentLanguage] || phoneAction.dataset.originalText;
    }, 1800);
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }

  if (modal.classList.contains("is-open") && event.key === "ArrowLeft") {
    moveGallery(-1);
  }

  if (modal.classList.contains("is-open") && event.key === "ArrowRight") {
    moveGallery(1);
  }
});

setLanguage(localStorage.getItem("bps-language") || "hu");
