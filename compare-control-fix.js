(() => {
  const patchCompareControl = (root = document) => {
    root.querySelectorAll(".compare").forEach((compare) => {
      const scope = compare.closest("#projectInner, .project, .project-layout") || root;
      const range = scope.querySelector("input.range");

      if (!range || compare.dataset.compareControlPatched) return;

      compare.dataset.compareControlPatched = "true";
      compare.style.cursor = "ew-resize";

      const setSplit = (value) => {
        const next = Math.max(5, Math.min(95, Number(value) || 50));
        range.value = String(Math.round(next));
        compare.style.setProperty("--split", `${next}%`);
      };

      const updateFromPointer = (event) => {
        const rect = compare.getBoundingClientRect();
        if (!rect.width) return;
        setSplit(((event.clientX - rect.left) / rect.width) * 100);
      };

      range.addEventListener("input", () => setSplit(range.value));
      compare.addEventListener("pointerdown", (event) => {
        compare.setPointerCapture?.(event.pointerId);
        updateFromPointer(event);
      });
      compare.addEventListener("pointermove", (event) => {
        if (event.buttons) updateFromPointer(event);
      });
    });
  };

  const boot = () => {
    patchCompareControl();

    const observer = new MutationObserver(() => {
      clearTimeout(window.__compareControlPatchTimer);
      window.__compareControlPatchTimer = setTimeout(() => patchCompareControl(), 80);
    });

    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
