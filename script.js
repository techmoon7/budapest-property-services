(() => {
  const situationImages = [
    "assets/budapest-apartment-wall-refresh.jpg",
    "assets/budapest-airbnb-before-turnover-matched.jpg",
    "assets/budapest-painting-before-matched.jpg",
    "assets/budapest-handyman-before-matched.jpg",
    "assets/budapest-garden-before-matched.jpg",
    "assets/budapest-office-before-touchup-matched.jpg",
  ];

  let scheduled = false;

  const applySituationImages = () => {
    document.querySelectorAll(".situation-grid .problem img").forEach((image, index) => {
      const source = situationImages[index];
      if (!source) return;

      const absolute = new URL(source, document.baseURI).href;
      if (image.src !== absolute) image.src = source;
      image.removeAttribute("srcset");
    });
  };

  const scheduleSituationImageUpdate = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applySituationImages();
    });
  };

  const observeSituationCards = () => {
    applySituationImages();

    new MutationObserver(scheduleSituationImageUpdate).observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  };

  const loadCoreScript = () => {
    const script = document.createElement("script");
    script.src = "script-core.js";
    script.async = false;
    script.onload = applySituationImages;
    script.onerror = () => {
      console.error("Budapest Property Services core script could not be loaded.");
    };
    document.head.appendChild(script);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      observeSituationCards();
      loadCoreScript();
    });
  } else {
    observeSituationCards();
    loadCoreScript();
  }
})();
