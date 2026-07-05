(() => {
  const phone = "+36 20 667 1832";
  const tel = "tel:+36206671832";
  const storageKey = "bps-lang";
  let heroLightbox = null;
  let heroLightboxOpener = null;
  let gardenGalleryModal = null;
  let gardenGalleryIndex = 0;
  let gardenGalleryOpener = null;
  let gardenGalleryTouchStart = 0;
  let cleaningGalleryModal = null;
  let cleaningGalleryIndex = 0;
  let cleaningGalleryOpener = null;
  let cleaningGalleryTouchStart = 0;
  const serviceNavigationItems = [
    {
      key: "maintenance",
      href: "property-maintenance-budapest.html",
      hu: "Karbantartás",
      en: "Maintenance",
      dataset: "maintenanceLink",
    },
    {
      key: "painting",
      href: "painting-wall-repairs-budapest.html",
      hu: "Festés és faljavítás",
      en: "Painting & Wall Repairs",
      dataset: "paintingLink",
    },
    {
      key: "garden",
      href: "garden-maintenance-budapest.html",
      hu: "Kertfenntartás",
      en: "Garden Maintenance",
      dataset: "gardenLink",
    },
    {
      key: "handyman",
      href: "handyman-services-budapest.html",
      hu: "Ezermester",
      en: "Handyman",
      dataset: "handymanLink",
    },
    {
      key: "cleaning",
      href: "cleaning-services-budapest.html",
      hu: "Takarítás",
      en: "Cleaning",
      dataset: "cleaningLink",
    },
  ];

  const directCallViewport = () => window.matchMedia("(max-width: 820px)").matches;
  const currentLang = () => (localStorage.getItem(storageKey) === "en" ? "en" : "hu");
  const documentLang = () => (document.documentElement.lang === "en" ? "en" : "hu");
  const phoneActionLabel = (lang = currentLang()) =>
    lang === "hu"
      ? directCallViewport()
        ? "Hívás indítása"
        : "Telefonszám másolása"
      : directCallViewport()
        ? "Call now"
        : "Copy phone number";

  const serviceItemForHref = (href = "") => {
    const cleanHref = href.split("#")[0].replace(/^\.\//, "");
    return serviceNavigationItems.find((item) => item.href === cleanHref);
  };

  const isServicesOverviewHref = (href = "") => href === "#services" || href === "index.html#services";

  const closeHeaderNavigation = (header) => {
    if (!header) return;
    header.classList.remove("nav-open");
    header.querySelector(".nav-toggle")?.setAttribute("aria-expanded", "false");
  };

  const closeServicesDropdown = (dropdown) => {
    if (!dropdown) return;
    dropdown.classList.remove("open");
    dropdown.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
  };

  const syncHeaderNavigationState = () => {
    const isCompact = window.matchMedia("(max-width: 1120px)").matches;
    document.querySelectorAll(".header[data-nav-enhanced='true']").forEach((header) => {
      const dropdown = header.querySelector("[data-services-dropdown]");
      dropdown
        ?.querySelector(".nav-dropdown-toggle")
        ?.setAttribute("aria-expanded", String(isCompact || dropdown.classList.contains("open")));
      if (!isCompact) closeHeaderNavigation(header);
      if (isCompact) dropdown?.classList.remove("open");
    });
  };

  const enhanceHeaderNavigation = () => {
    const header = document.querySelector(".header");
    const nav = header?.querySelector(".nav");
    if (!header || !nav) return;

    const lang = documentLang();
    const navId = nav.id || "primary-navigation";
    nav.id = navId;
    header.dataset.navEnhanced = "true";

    let menuToggle = header.querySelector(".nav-toggle");
    if (!menuToggle) {
      menuToggle = document.createElement("button");
      menuToggle.className = "nav-toggle";
      menuToggle.type = "button";
      menuToggle.setAttribute("aria-controls", navId);
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.innerHTML = '<span aria-hidden="true"></span><span class="sr-only">Menu</span>';
      header.insertBefore(menuToggle, nav);
    }
    menuToggle.setAttribute("aria-label", lang === "hu" ? "Menü megnyitása" : "Open menu");

    let dropdown = nav.querySelector("[data-services-dropdown]");
    if (!dropdown) {
      dropdown = document.createElement("div");
      dropdown.className = "nav-dropdown";
      dropdown.dataset.servicesDropdown = "true";
      dropdown.innerHTML = `
        <button class="nav-dropdown-toggle" type="button" aria-haspopup="true" aria-expanded="false" data-text-hu="Szolgáltatások" data-text-en="Services"></button>
        <div class="nav-dropdown-menu" role="menu"></div>
      `;
      nav.insertBefore(dropdown, nav.firstChild);
    }

    const dropdownToggle = dropdown.querySelector(".nav-dropdown-toggle");
    const dropdownMenu = dropdown.querySelector(".nav-dropdown-menu");
    dropdownToggle.textContent = lang === "hu" ? "Szolgáltatások" : "Services";

    const topLevelLinks = [...nav.children].filter((node) => node.matches?.("a"));
    const serviceLinks = new Map();
    let overviewLink = null;

    topLevelLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const item = serviceItemForHref(href);
      if (item) {
        serviceLinks.set(item.key, link);
        link.remove();
      } else if (isServicesOverviewHref(href)) {
        overviewLink = link;
        link.remove();
      }
    });

    dropdownMenu.textContent = "";

    const overviewHref = document.body?.classList.contains("service-page") ? "index.html#services" : "#services";
    const overview = overviewLink || document.createElement("a");
    overview.href = overviewHref;
    overview.dataset.textHu = "Szolgáltatások áttekintése";
    overview.dataset.textEn = "Services overview";
    overview.textContent = lang === "hu" ? "Szolgáltatások áttekintése" : "Services overview";
    overview.setAttribute("role", "menuitem");
    overview.removeAttribute("aria-current");
    dropdownMenu.appendChild(overview);

    const currentFile = window.location.pathname.split("/").pop() || "index.html";
    serviceNavigationItems.forEach((item) => {
      const link =
        serviceLinks.get(item.key) ||
        dropdownMenu.querySelector(`[data-service-nav-item="${item.key}"]`) ||
        document.createElement("a");
      link.href = item.href;
      link.dataset.serviceNavItem = item.key;
      link.dataset.textHu = item.hu;
      link.dataset.textEn = item.en;
      link.dataset[item.dataset] = "true";
      link.textContent = lang === "hu" ? item.hu : item.en;
      link.setAttribute("role", "menuitem");
      if (currentFile === item.href) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
      dropdownMenu.appendChild(link);
    });

    if (header.dataset.navEventsBound !== "true") {
      header.dataset.navEventsBound = "true";

      menuToggle.addEventListener("click", () => {
        const isOpen = header.classList.toggle("nav-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
      });

      dropdownToggle.addEventListener("click", (event) => {
        if (window.matchMedia("(max-width: 1120px)").matches) return;
        event.preventDefault();
        const isOpen = dropdown.classList.toggle("open");
        dropdownToggle.setAttribute("aria-expanded", String(isOpen));
      });

      nav.addEventListener("click", (event) => {
        if (!event.target.closest("a")) return;
        closeHeaderNavigation(header);
        closeServicesDropdown(dropdown);
      });

      document.addEventListener("click", (event) => {
        if (header.contains(event.target)) return;
        closeHeaderNavigation(header);
        closeServicesDropdown(dropdown);
      });

      document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        closeHeaderNavigation(header);
        closeServicesDropdown(dropdown);
      });
    }

    syncHeaderNavigationState();
  };

  const showToast = (message) => {
    let toast = document.querySelector("[data-toast]");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      toast.dataset.toast = "true";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
  };

  const closeHeroLightbox = () => {
    if (!heroLightbox) return;

    heroLightbox.classList.remove("open");
    heroLightbox.setAttribute("aria-hidden", "true");
    if (!document.querySelector(".modal.open")) document.body.classList.remove("modal-open");

    const opener = heroLightboxOpener;
    heroLightboxOpener = null;
    if (opener?.isConnected) requestAnimationFrame(() => opener.focus());
  };

  const ensureHeroLightbox = () => {
    if (heroLightbox?.isConnected) return heroLightbox;

    heroLightbox = document.createElement("div");
    heroLightbox.id = "heroLightbox";
    heroLightbox.className = "modal hero-lightbox";
    heroLightbox.setAttribute("role", "dialog");
    heroLightbox.setAttribute("aria-modal", "true");
    heroLightbox.setAttribute("aria-hidden", "true");
    heroLightbox.innerHTML = `
      <button class="backdrop" type="button" data-hero-lightbox-close aria-label="Close image"></button>
      <div class="panel" tabindex="-1">
        <button class="close" type="button" data-hero-lightbox-close aria-label="Close image">&times;</button>
        <img alt="">
      </div>
    `;

    heroLightbox.querySelectorAll("[data-hero-lightbox-close]").forEach((button) => {
      button.addEventListener("click", closeHeroLightbox);
    });

    document.body.appendChild(heroLightbox);
    return heroLightbox;
  };

  const openHeroLightbox = (image, opener) => {
    const modal = ensureHeroLightbox();
    const modalImage = modal.querySelector("img");
    const panel = modal.querySelector(".panel");

    heroLightboxOpener = opener;
    modalImage.src = image.currentSrc || image.src;
    modalImage.alt = image.alt || "";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => panel?.focus());
  };

  const bindHeroLightbox = () => {
    document.querySelectorAll(".hero-media, .service-hero-visual").forEach((target) => {
      if (target.dataset.heroLightboxBound === "true") return;

      const image = target.querySelector("img");
      if (!image) return;

      target.dataset.heroLightbox = "true";
      target.dataset.heroLightboxBound = "true";
      target.setAttribute("role", "button");
      target.setAttribute("tabindex", "0");
      target.setAttribute("aria-label", "Open hero image");

      target.addEventListener("click", () => openHeroLightbox(image, target));
      target.addEventListener("keydown", (event) => {
        if (!["Enter", " "].includes(event.key)) return;
        event.preventDefault();
        openHeroLightbox(image, target);
      });
    });
  };

  const getGardenGalleryItems = () =>
    [...document.querySelectorAll(".service-hero-visual, .garden-gallery .showcase-photo")].filter((target) =>
      target.querySelector("img")
    );

  const closeGardenGallery = () => {
    if (!gardenGalleryModal) return;

    gardenGalleryModal.classList.remove("open");
    gardenGalleryModal.setAttribute("aria-hidden", "true");
    if (!document.querySelector(".modal.open")) document.body.classList.remove("modal-open");

    const opener = gardenGalleryOpener;
    gardenGalleryOpener = null;
    if (opener?.isConnected) requestAnimationFrame(() => opener.focus());
  };

  const setGardenGalleryImage = (index) => {
    const items = getGardenGalleryItems();
    if (!items.length || !gardenGalleryModal) return;

    gardenGalleryIndex = (index + items.length) % items.length;
    const item = items[gardenGalleryIndex];
    const image = item.querySelector("img");
    const modalImage = gardenGalleryModal.querySelector("img");
    const caption = gardenGalleryModal.querySelector("[data-garden-gallery-caption]");
    const counter = gardenGalleryModal.querySelector("[data-garden-gallery-count]");
    const navButtons = gardenGalleryModal.querySelectorAll("[data-garden-gallery-step]");
    const captionText = item.querySelector("figcaption")?.innerText?.trim() || image.alt || "";

    modalImage.src = image.currentSrc || image.src;
    modalImage.alt = image.alt || "";
    caption.textContent = captionText;
    counter.textContent = `${gardenGalleryIndex + 1} / ${items.length}`;
    navButtons.forEach((button) => (button.hidden = items.length < 2));
  };

  const moveGardenGallery = (step) => setGardenGalleryImage(gardenGalleryIndex + step);

  const ensureGardenGalleryModal = () => {
    if (gardenGalleryModal?.isConnected) return gardenGalleryModal;

    gardenGalleryModal = document.createElement("div");
    gardenGalleryModal.id = "gardenImageModal";
    gardenGalleryModal.className = "modal hero-lightbox garden-gallery-modal";
    gardenGalleryModal.setAttribute("role", "dialog");
    gardenGalleryModal.setAttribute("aria-modal", "true");
    gardenGalleryModal.setAttribute("aria-hidden", "true");
    gardenGalleryModal.innerHTML = `
      <button class="backdrop" type="button" data-garden-gallery-close aria-label="Close image gallery"></button>
      <div class="panel" tabindex="-1">
        <button class="close" type="button" data-garden-gallery-close aria-label="Close image gallery">&times;</button>
        <button class="garden-gallery-nav prev" type="button" data-garden-gallery-step="-1" aria-label="Previous image">&#8249;</button>
        <button class="garden-gallery-nav next" type="button" data-garden-gallery-step="1" aria-label="Next image">&#8250;</button>
        <span class="garden-gallery-count" data-garden-gallery-count></span>
        <img alt="">
        <p class="garden-gallery-caption" data-garden-gallery-caption></p>
      </div>
    `;

    gardenGalleryModal.querySelectorAll("[data-garden-gallery-close]").forEach((button) => {
      button.addEventListener("click", closeGardenGallery);
    });

    gardenGalleryModal.querySelectorAll("[data-garden-gallery-step]").forEach((button) => {
      button.addEventListener("click", () => moveGardenGallery(Number(button.dataset.gardenGalleryStep)));
    });

    gardenGalleryModal.addEventListener(
      "touchstart",
      (event) => {
        gardenGalleryTouchStart = event.changedTouches[0]?.clientX || 0;
      },
      { passive: true }
    );

    gardenGalleryModal.addEventListener(
      "touchend",
      (event) => {
        const end = event.changedTouches[0]?.clientX || 0;
        const delta = end - gardenGalleryTouchStart;
        if (Math.abs(delta) > 48) moveGardenGallery(delta < 0 ? 1 : -1);
      },
      { passive: true }
    );

    document.body.appendChild(gardenGalleryModal);
    return gardenGalleryModal;
  };

  const openGardenGallery = (index, opener) => {
    const modal = ensureGardenGalleryModal();
    const panel = modal.querySelector(".panel");

    gardenGalleryOpener = opener;
    setGardenGalleryImage(index);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => panel?.focus());
  };

  const bindGardenImageGallery = () => {
    if (document.body?.dataset.page !== "garden-maintenance") return;

    getGardenGalleryItems().forEach((target, index) => {
      if (target.dataset.gardenGalleryBound === "true") return;

      const image = target.querySelector("img");
      target.dataset.gardenGalleryBound = "true";
      target.dataset.gardenGalleryItem = "true";
      target.setAttribute("role", "button");
      target.setAttribute("tabindex", "0");
      target.setAttribute("aria-label", image?.alt ? `Open image: ${image.alt}` : "Open garden image");

      target.addEventListener("click", () => openGardenGallery(index, target));
      target.addEventListener("keydown", (event) => {
        if (!["Enter", " "].includes(event.key)) return;
        event.preventDefault();
        openGardenGallery(index, target);
      });
    });
  };

  const getCleaningGalleryItems = () =>
    [...document.querySelectorAll(".service-hero-visual, .cleaning-gallery .showcase-photo")].filter((target) =>
      target.querySelector("img")
    );

  const getFocusableModalItems = (modal) =>
    [
      ...modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ),
    ].filter((node) => !node.hidden && !node.disabled && node.offsetParent !== null);

  const trapCleaningGalleryFocus = (event) => {
    const focusable = getFocusableModalItems(cleaningGalleryModal);
    if (!focusable.length) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const closeCleaningGallery = () => {
    if (!cleaningGalleryModal) return;

    cleaningGalleryModal.classList.remove("open");
    cleaningGalleryModal.setAttribute("aria-hidden", "true");
    if (!document.querySelector(".modal.open")) document.body.classList.remove("modal-open");

    const opener = cleaningGalleryOpener;
    cleaningGalleryOpener = null;
    if (opener?.isConnected) requestAnimationFrame(() => opener.focus());
  };

  const setCleaningGalleryImage = (index) => {
    const items = getCleaningGalleryItems();
    if (!items.length || !cleaningGalleryModal) return;

    cleaningGalleryIndex = (index + items.length) % items.length;
    const item = items[cleaningGalleryIndex];
    const image = item.querySelector("img");
    const modalImage = cleaningGalleryModal.querySelector("img");
    const caption = cleaningGalleryModal.querySelector("[data-cleaning-gallery-caption]");
    const counter = cleaningGalleryModal.querySelector("[data-cleaning-gallery-count]");
    const navButtons = cleaningGalleryModal.querySelectorAll("[data-cleaning-gallery-step]");
    const captionText = item.querySelector("figcaption")?.innerText?.trim() || image.alt || "";

    modalImage.src = image.currentSrc || image.src;
    modalImage.alt = image.alt || "";
    caption.textContent = captionText;
    counter.textContent = `${cleaningGalleryIndex + 1} / ${items.length}`;
    navButtons.forEach((button) => (button.hidden = items.length < 2));
  };

  const moveCleaningGallery = (step) => setCleaningGalleryImage(cleaningGalleryIndex + step);

  const ensureCleaningGalleryModal = () => {
    if (cleaningGalleryModal?.isConnected) return cleaningGalleryModal;

    cleaningGalleryModal = document.createElement("div");
    cleaningGalleryModal.id = "cleaningImageModal";
    cleaningGalleryModal.className = "modal hero-lightbox cleaning-gallery-modal";
    cleaningGalleryModal.setAttribute("role", "dialog");
    cleaningGalleryModal.setAttribute("aria-modal", "true");
    cleaningGalleryModal.setAttribute("aria-hidden", "true");
    cleaningGalleryModal.innerHTML = `
      <button class="backdrop" type="button" data-cleaning-gallery-close aria-label="Close image gallery"></button>
      <div class="panel" tabindex="-1">
        <button class="close" type="button" data-cleaning-gallery-close aria-label="Close image gallery">&times;</button>
        <button class="garden-gallery-nav prev" type="button" data-cleaning-gallery-step="-1" aria-label="Previous image">&#8249;</button>
        <button class="garden-gallery-nav next" type="button" data-cleaning-gallery-step="1" aria-label="Next image">&#8250;</button>
        <span class="garden-gallery-count" data-cleaning-gallery-count></span>
        <img alt="">
        <p class="garden-gallery-caption" data-cleaning-gallery-caption></p>
      </div>
    `;

    cleaningGalleryModal.querySelectorAll("[data-cleaning-gallery-close]").forEach((button) => {
      button.addEventListener("click", closeCleaningGallery);
    });

    cleaningGalleryModal.querySelectorAll("[data-cleaning-gallery-step]").forEach((button) => {
      button.addEventListener("click", () => moveCleaningGallery(Number(button.dataset.cleaningGalleryStep)));
    });

    cleaningGalleryModal.addEventListener(
      "touchstart",
      (event) => {
        cleaningGalleryTouchStart = event.changedTouches[0]?.clientX || 0;
      },
      { passive: true }
    );

    cleaningGalleryModal.addEventListener(
      "touchend",
      (event) => {
        const end = event.changedTouches[0]?.clientX || 0;
        const delta = end - cleaningGalleryTouchStart;
        if (Math.abs(delta) > 48) moveCleaningGallery(delta < 0 ? 1 : -1);
      },
      { passive: true }
    );

    document.body.appendChild(cleaningGalleryModal);
    return cleaningGalleryModal;
  };

  const openCleaningGallery = (index, opener) => {
    const modal = ensureCleaningGalleryModal();

    cleaningGalleryOpener = opener;
    setCleaningGalleryImage(index);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => modal.querySelector(".close")?.focus());
  };

  const bindCleaningImageGallery = () => {
    if (document.body?.dataset.page !== "cleaning-services") return;

    getCleaningGalleryItems().forEach((target, index) => {
      if (target.dataset.cleaningGalleryBound === "true") return;

      const image = target.querySelector("img");
      target.dataset.cleaningGalleryBound = "true";
      target.dataset.cleaningGalleryItem = "true";
      target.setAttribute("role", "button");
      target.setAttribute("tabindex", "0");
      target.setAttribute("aria-label", image?.alt ? `Open image: ${image.alt}` : "Open cleaning image");

      target.addEventListener("click", () => openCleaningGallery(index, target));
      target.addEventListener("keydown", (event) => {
        if (!["Enter", " "].includes(event.key)) return;
        event.preventDefault();
        openCleaningGallery(index, target);
      });
    });
  };

  const ensureStandaloneCleaningLink = () => {
    const nav = document.querySelector(".header .nav");
    if (!nav) return;

    const existing = nav.querySelector("[data-cleaning-link]") || nav.querySelector('a[href="cleaning-services-budapest.html"]');
    if (existing) {
      existing.dataset.textHu = "Takarítás";
      existing.dataset.textEn = "Cleaning";
      syncTextNodes(currentLang());
      return;
    }

    const link = document.createElement("a");
    link.href = "cleaning-services-budapest.html";
    link.dataset.cleaningLink = "true";
    link.dataset.textHu = "Takarítás";
    link.dataset.textEn = "Cleaning";
    link.textContent = currentLang() === "hu" ? "Takarítás" : "Cleaning";

    const handymanLink = nav.querySelector('a[href="handyman-services-budapest.html"]');
    const gardenLink = nav.querySelector('a[href="garden-maintenance-budapest.html"]');
    const paintingLink = nav.querySelector('a[href="painting-wall-repairs-budapest.html"]');
    if (handymanLink) {
      handymanLink.insertAdjacentElement("beforebegin", link);
    } else if (gardenLink) {
      gardenLink.insertAdjacentElement("afterend", link);
    } else if (paintingLink) {
      paintingLink.insertAdjacentElement("afterend", link);
    } else {
      nav.appendChild(link);
    }
  };

  document.addEventListener("keydown", (event) => {
    if (cleaningGalleryModal?.classList.contains("open")) {
      if (event.key === "Escape") closeCleaningGallery();
      if (event.key === "ArrowRight") moveCleaningGallery(1);
      if (event.key === "ArrowLeft") moveCleaningGallery(-1);
      if (event.key === "Tab") trapCleaningGalleryFocus(event);
      return;
    }

    if (gardenGalleryModal?.classList.contains("open")) {
      if (event.key === "Escape") closeGardenGallery();
      if (event.key === "ArrowRight") moveGardenGallery(1);
      if (event.key === "ArrowLeft") moveGardenGallery(-1);
      return;
    }

    if (event.key === "Escape" && heroLightbox?.classList.contains("open")) {
      closeHeroLightbox();
    }
  });

  const copyPhoneToClipboard = async (lang = currentLang()) => {
    const success = lang === "hu" ? "Telefonszám másolva." : "Phone number copied.";
    const fallback = lang === "hu" ? `Telefonszám: ${phone}` : `Phone: ${phone}`;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(phone);
        showToast(success);
      } else {
        showToast(fallback);
      }
    } catch {
      showToast(fallback);
    }
  };

  const bindPhoneActions = () => {
    document.querySelectorAll("[data-phone-action]").forEach((link) => {
      if (link.dataset.phoneBound === "true") return;
      link.dataset.phoneBound = "true";
      link.href = tel;
      link.addEventListener("click", (event) => {
        if (directCallViewport()) return;
        event.preventDefault();
        copyPhoneToClipboard(currentLang());
      });
    });
  };

  const syncTextNodes = (lang) => {
    document.querySelectorAll("[data-text-hu]").forEach((node) => {
      const value = lang === "hu" ? node.dataset.textHu : node.dataset.textEn;
      if (value && node.textContent !== value) node.textContent = value;
    });

    document.querySelectorAll("[data-aria-hu]").forEach((node) => {
      const value = lang === "hu" ? node.dataset.ariaHu : node.dataset.ariaEn;
      if (value) node.setAttribute("aria-label", value);
    });

    document.querySelectorAll("[data-phone-label]").forEach((node) => {
      const isHeaderPhone = node.closest(".header");
      const value = isHeaderPhone && !directCallViewport() ? phone : phoneActionLabel(lang);
      if (node.textContent !== value) node.textContent = value;
      node.setAttribute("aria-label", value);
    });
  };

  const applyStandaloneLanguage = () => {
    const lang = currentLang();
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-lang-panel]").forEach((panel) => {
      const active = panel.dataset.langPanel === lang;
      panel.hidden = !active;
      panel.setAttribute("aria-hidden", String(!active));
    });

    syncTextNodes(lang);
  };

  const initStandaloneReveals = () => {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16 }
    );

    items.forEach((item) => observer.observe(item));
  };

  const initStandalonePage = () => {
    ensureStandaloneCleaningLink();
    applyStandaloneLanguage();
    enhanceHeaderNavigation();
    bindPhoneActions();
    if (document.body?.dataset.page === "garden-maintenance") {
      bindGardenImageGallery();
    } else if (document.body?.dataset.page === "cleaning-services") {
      bindCleaningImageGallery();
    } else {
      bindHeroLightbox();
    }
    initStandaloneReveals();

    document.getElementById("langBtn")?.addEventListener("click", () => {
      const next = currentLang() === "hu" ? "en" : "hu";
      localStorage.setItem(storageKey, next);
      applyStandaloneLanguage();
      enhanceHeaderNavigation();
    });

    window.addEventListener("resize", () => {
      syncTextNodes(currentLang());
      syncHeaderNavigationState();
    }, { passive: true });
  };

  if (["property-maintenance", "handyman-services", "painting-wall-repairs", "garden-maintenance", "cleaning-services"].includes(document.body?.dataset.page)) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initStandalonePage, { once: true });
    } else {
      initStandalonePage();
    }
    return;
  }

  const situationImages = [
    "assets/budapest-apartment-wall-refresh.jpg",
    "assets/budapest-airbnb-before-turnover-matched.jpg",
    "assets/budapest-painting-before-matched.jpg",
    "assets/budapest-handyman-before-matched.jpg",
    "assets/budapest-garden-before-matched.jpg",
    "assets/budapest-office-before-touchup-matched.jpg",
  ];

  let scheduled = false;

  const homeLang = () => (document.documentElement.lang === "en" ? "en" : "hu");

  const applySituationImages = () => {
    document.querySelectorAll(".situation-grid .problem img").forEach((image, index) => {
      const source = situationImages[index];
      if (!source) return;

      const absolute = new URL(source, document.baseURI).href;
      if (image.src !== absolute) image.src = source;
      image.removeAttribute("srcset");
    });
  };

  const applyMaintenanceLink = () => {
    const nav = document.querySelector(".header .nav");
    if (!nav) return;

    const lang = homeLang();
    const label = lang === "hu" ? "Karbantartás" : "Maintenance";
    const existing = nav.querySelector("[data-maintenance-link]");

    if (existing) {
      if (existing.textContent !== label) existing.textContent = label;
      return;
    }

    const link = document.createElement("a");
    link.href = "property-maintenance-budapest.html";
    link.dataset.maintenanceLink = "true";
    link.textContent = label;

    const servicesLink = nav.querySelector('a[href="#services"]');
    if (servicesLink) {
      servicesLink.insertAdjacentElement("afterend", link);
    } else {
      nav.appendChild(link);
    }
  };

  const applyHandymanLink = () => {
    const nav = document.querySelector(".header .nav");
    if (!nav) return;

    const lang = homeLang();
    const label = lang === "hu" ? "Ezermester" : "Handyman";
    const existing =
      nav.querySelector("[data-handyman-link]") ||
      nav.querySelector('a[href="handyman-services-budapest.html"]');

    if (existing) {
      if (existing.textContent !== label) existing.textContent = label;
      return;
    }

    const link = document.createElement("a");
    link.href = "handyman-services-budapest.html";
    link.dataset.handymanLink = "true";
    link.textContent = label;

    const gardenLink =
      nav.querySelector("[data-garden-link]") ||
      nav.querySelector('a[href="garden-maintenance-budapest.html"]');
    const paintingLink =
      nav.querySelector("[data-painting-link]") ||
      nav.querySelector('a[href="painting-wall-repairs-budapest.html"]');
    const maintenanceLink = nav.querySelector("[data-maintenance-link]");
    if (gardenLink) {
      gardenLink.insertAdjacentElement("afterend", link);
    } else if (paintingLink) {
      paintingLink.insertAdjacentElement("afterend", link);
    } else if (maintenanceLink) {
      maintenanceLink.insertAdjacentElement("afterend", link);
    } else {
      const servicesLink = nav.querySelector('a[href="#services"]');
      if (servicesLink) {
        servicesLink.insertAdjacentElement("afterend", link);
      } else {
        nav.appendChild(link);
      }
    }
  };

  const applyPaintingLink = () => {
    const nav = document.querySelector(".header .nav");
    if (!nav) return;

    const lang = homeLang();
    const label = lang === "hu" ? "Festés és faljavítás" : "Painting & Wall Repairs";
    const existing = nav.querySelector("[data-painting-link]") || nav.querySelector('a[href="painting-wall-repairs-budapest.html"]');

    if (existing) {
      if (existing.textContent !== label) existing.textContent = label;
      return;
    }

    const link = document.createElement("a");
    link.href = "painting-wall-repairs-budapest.html";
    link.dataset.paintingLink = "true";
    link.textContent = label;

    const maintenanceLink = nav.querySelector("[data-maintenance-link]");
    if (maintenanceLink) {
      maintenanceLink.insertAdjacentElement("afterend", link);
    } else {
      const servicesLink = nav.querySelector('a[href="#services"]');
      if (servicesLink) {
        servicesLink.insertAdjacentElement("afterend", link);
      } else {
        nav.appendChild(link);
      }
    }
  };

  const applyGardenLink = () => {
    const nav = document.querySelector(".header .nav");
    if (!nav) return;

    const lang = homeLang();
    const label = lang === "hu" ? "Kertfenntartás" : "Garden Maintenance";
    const existing = nav.querySelector("[data-garden-link]") || nav.querySelector('a[href="garden-maintenance-budapest.html"]');

    if (existing) {
      if (existing.textContent !== label) existing.textContent = label;
      return;
    }

    const link = document.createElement("a");
    link.href = "garden-maintenance-budapest.html";
    link.dataset.gardenLink = "true";
    link.textContent = label;

    const paintingLink =
      nav.querySelector("[data-painting-link]") ||
      nav.querySelector('a[href="painting-wall-repairs-budapest.html"]');
    const maintenanceLink = nav.querySelector("[data-maintenance-link]");
    if (paintingLink) {
      paintingLink.insertAdjacentElement("afterend", link);
    } else if (maintenanceLink) {
      maintenanceLink.insertAdjacentElement("afterend", link);
    } else {
      const servicesLink = nav.querySelector('a[href="#services"]');
      if (servicesLink) {
        servicesLink.insertAdjacentElement("afterend", link);
      } else {
        nav.appendChild(link);
      }
    }
  };

  const applyCleaningLink = () => {
    const nav = document.querySelector(".header .nav");
    if (!nav) return;

    const lang = homeLang();
    const label = lang === "hu" ? "Takarítás" : "Cleaning";
    const existing =
      nav.querySelector("[data-cleaning-link]") ||
      nav.querySelector('a[href="cleaning-services-budapest.html"]');

    if (existing) {
      if (existing.textContent !== label) existing.textContent = label;
      return;
    }

    const link = document.createElement("a");
    link.href = "cleaning-services-budapest.html";
    link.dataset.cleaningLink = "true";
    link.textContent = label;

    const handymanLink =
      nav.querySelector("[data-handyman-link]") ||
      nav.querySelector('a[href="handyman-services-budapest.html"]');
    const gardenLink =
      nav.querySelector("[data-garden-link]") ||
      nav.querySelector('a[href="garden-maintenance-budapest.html"]');
    const paintingLink =
      nav.querySelector("[data-painting-link]") ||
      nav.querySelector('a[href="painting-wall-repairs-budapest.html"]');
    const maintenanceLink = nav.querySelector("[data-maintenance-link]");

    if (handymanLink) {
      handymanLink.insertAdjacentElement("beforebegin", link);
    } else if (gardenLink) {
      gardenLink.insertAdjacentElement("afterend", link);
    } else if (paintingLink) {
      paintingLink.insertAdjacentElement("afterend", link);
    } else if (maintenanceLink) {
      maintenanceLink.insertAdjacentElement("afterend", link);
    } else {
      const servicesLink = nav.querySelector('a[href="#services"]');
      if (servicesLink) {
        servicesLink.insertAdjacentElement("afterend", link);
      } else {
        nav.appendChild(link);
      }
    }
  };

  const applyHomeEnhancements = () => {
    applySituationImages();
    applyMaintenanceLink();
    applyPaintingLink();
    applyGardenLink();
    applyCleaningLink();
    applyHandymanLink();
    enhanceHeaderNavigation();
    bindHeroLightbox();
  };

  const scheduleHomeEnhancements = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyHomeEnhancements();
    });
  };

  const observeHome = () => {
    applyHomeEnhancements();

    new MutationObserver(scheduleHomeEnhancements).observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  };

  const loadCoreScript = () => {
    const script = document.createElement("script");
    script.src = "script-core.js";
    script.async = false;
    script.onload = applyHomeEnhancements;
    script.onerror = () => {
      console.error("Budapest Property Services core script could not be loaded.");
    };
    document.head.appendChild(script);
  };

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        observeHome();
        loadCoreScript();
      },
      { once: true }
    );
  } else {
    observeHome();
    loadCoreScript();
  }
})();
