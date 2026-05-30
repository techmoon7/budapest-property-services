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

const galleries = {
  painting: [
    {
      src: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1400&q=84",
      alt: "Painting tools and paint roller",
    },
    {
      src: "https://images.unsplash.com/photo-1595814433015-e6f5ce69614e?auto=format&fit=crop&w=1400&q=84",
      alt: "Wall repair and painting preparation",
    },
    {
      src: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1400&q=84",
      alt: "Interior painting work",
    },
    {
      src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=84",
      alt: "Clean renovation detail",
    },
  ],
  drywall: [
    {
      src: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1400&q=84",
      alt: "Drywall and construction tools",
    },
    {
      src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=84",
      alt: "Interior construction detail",
    },
    {
      src: "https://images.unsplash.com/photo-1595814433015-e6f5ce69614e?auto=format&fit=crop&w=1400&q=84",
      alt: "Wall surface preparation",
    },
    {
      src: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1400&q=84",
      alt: "Hand tools for small repairs",
    },
  ],
  garden: [
    {
      src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1400&q=84",
      alt: "Garden work and plants",
    },
    {
      src: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1400&q=84",
      alt: "Garden maintenance",
    },
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=84",
      alt: "Well-kept outdoor property",
    },
    {
      src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=84",
      alt: "Clean property work",
    },
  ],
  handyman: [
    {
      src: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1400&q=84",
      alt: "Hand tools for small repairs",
    },
    {
      src: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1400&q=84",
      alt: "Power tools and repair work",
    },
    {
      src: "https://images.unsplash.com/photo-1595814433015-e6f5ce69614e?auto=format&fit=crop&w=1400&q=84",
      alt: "Repair preparation",
    },
    {
      src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=84",
      alt: "Maintenance work area",
    },
  ],
  property: [
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=84",
      alt: "Clean apartment interior",
    },
    {
      src: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1400&q=84",
      alt: "Interior painting and renovation work",
    },
    {
      src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=84",
      alt: "Clean interior renovation",
    },
    {
      src: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1400&q=84",
      alt: "Paint rollers and painting tools",
    },
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

const isDesktopBrowser = () =>
  !/Android|iPhone|iPad|iPod|Windows Phone|Mobi/i.test(navigator.userAgent);

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
});

toggle.addEventListener("click", () => {
  const nextLanguage = document.documentElement.lang === "en" ? "hu" : "en";
  setLanguage(nextLanguage);
});

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
