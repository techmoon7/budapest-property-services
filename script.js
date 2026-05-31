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
    { src: pexels("34046213"), alt: "Freshly painted apartment wall" },
    { src: pexels("6474490"), alt: "Interior painting for a rental refresh" },
    { src: pexels("6474313"), alt: "Drywall and ceiling refresh work" },
    { src: pexels("3990359"), alt: "Clean interior construction preparation" },
    { src: pexels("5583119"), alt: "Wall repair before tenant handover" },
    { src: pexels("4981802"), alt: "Small apartment repair work" },
    { src: pexels("6728930"), alt: "Outdoor maintenance for a property" },
    { src: pexels("24595768"), alt: "Garden refresh for a property" },
    { src: pexels("6024540"), alt: "Tools for final property maintenance" },
    { src: pexels("5027601"), alt: "Outdoor cleanup for a maintained property" },
  ],
};

let currentLanguage = "hu";
let activeGallery = [];
let activeImageIndex = 0;

const localText = (element, key) =>
  element.dataset[`${key}${currentLanguage === "en" ? "En" : "Hu"}`] || "";

const setLanguage = (language) => {
  currentLanguage = language;
  document.documentElement.lang = language === "en" ? "en" : "hu";
  translatable.forEach((element) => {
    element.textContent = element.dataset[language];
  });
  toggle.textContent = language === "en" ? "HU" : "EN";
  localStorage.setItem("bps-language", language);
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
        currentLanguage === "en" ? "Copied: +36 20 667 1832" : "Kimásolva: +36 20 667 1832";
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
