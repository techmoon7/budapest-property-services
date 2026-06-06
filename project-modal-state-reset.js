(() => {
  const resetProjectModalState = () => {
    const inner = document.getElementById("projectInner");
    const resetPanelScroll = () => {
      const panel = document.querySelector("#projectModal .panel");
      if (panel) panel.scrollTop = 0;
    };

    resetPanelScroll();
    setTimeout(resetPanelScroll, 80);
    setTimeout(resetPanelScroll, 240);

    if (!inner) return;

    delete inner.dataset.galleryPatched;
    delete inner.dataset.videoModalPatched;
    inner.querySelectorAll(".project-video-strip").forEach((strip) => strip.remove());
  };

  document.addEventListener(
    "click",
    (event) => {
      if (event.target.closest?.("[data-project]")) resetProjectModalState();
    },
    true
  );
})();
