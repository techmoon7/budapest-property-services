(() => {
  const closeSingleModal = (modal) => {
    if (!modal) return;
    modal.querySelectorAll("video").forEach((video) => video.pause());
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");

    const stillOpen = document.querySelector(".modal.open");
    document.body.classList.toggle("modal-open", !!stillOpen);
  };

  document.addEventListener(
    "click",
    (event) => {
      const close = event.target.closest?.("[data-close]");
      if (!close) return;

      const galleryModal = close.closest("#galleryModal.open");
      const videoModal = close.closest("#videoModal.open");
      if (!galleryModal && !videoModal) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      closeSingleModal(galleryModal || videoModal);
    },
    true
  );
})();
