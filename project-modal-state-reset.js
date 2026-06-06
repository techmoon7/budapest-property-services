(() => {
  const resetProjectModalState = () => {
    const inner = document.getElementById("projectInner");
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
