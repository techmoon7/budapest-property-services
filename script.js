(() => {
  const phone = "+36 20 667 1832";
  const tel = "tel:+36206671832";
  const storageKey = "bps-lang";
  let heroLightbox = null;
  let heroLightboxOpener = null;

  const directCallViewport = () => window.matchMedia("(max-width: 820px)").matches;
  const currentLang = () => (localStorage.getItem(storageKey) === "en" ? "en" : "hu");
  const phoneActionLabel = (lang = currentLang()) =>
    lang === "hu"
      ? directCallViewport()
        ? "Hívás indítása"
        : "Telefonszám másolása"
      : directCallViewport()
        ? "Call now"
        : "Copy phone number";

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

  document.addEventListener("keydown", (event) => {
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
    applyStandaloneLanguage();
    bindPhoneActions();
    bindHeroLightbox();
    initStandaloneReveals();

    document.getElementById("langBtn")?.addEventListener("click", () => {
      const next = currentLang() === "hu" ? "en" : "hu";
      localStorage.setItem(storageKey, next);
      applyStandaloneLanguage();
    });

    window.addEventListener("resize", () => syncTextNodes(currentLang()), { passive: true });
  };

  if (["property-maintenance", "handyman-services"].includes(document.body?.dataset.page)) {
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

  const applyHomeEnhancements = () => {
    applySituationImages();
    applyMaintenanceLink();
    applyHandymanLink();
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
