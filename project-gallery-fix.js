(() => {
  const phone = "+36 20 667 1832";
  const cdn = (id, width = 1200) =>
    `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

  const labels = {
    hu: { before: "Előtte", process: "Munkafolyamat", after: "Kész állapot", count: "kép", open: "Galéria megnyitása" },
    en: { before: "Before", process: "Process", after: "Finished", count: "images", open: "Open gallery" },
  };

  const projects = [
    {
      title: { hu: "Festés és faljavítás", en: "Painting and wall repair" },
      note: {
        before: { hu: "A helyiség teljes falfelülete frissítésre és javításra szorult.", en: "The full wall area needed repair and a clean repaint." },
        process: { hu: "Glettelés, csiszolás, maszkolás és hengerelés közben a teljes munkaterület látszik.", en: "Filling, sanding, masking and rolling are shown in a full-room context." },
        after: { hu: "Tiszta, átadható falfelületek, amelyek rendben mutatnak bérlésnél vagy vendégek előtt.", en: "Clean finished walls ready for tenants, guests or handover." },
      },
      photos: [["12036084", "before"], ["804392", "before"], ["3616757", "process"], ["3615721", "process"], ["6474471", "process"], ["6473978", "process"], ["35419415", "after"], ["35419433", "after"], ["35419416", "after"], ["35419417", "after"]],
    },
    {
      title: { hu: "Gipszkarton és mennyezeti javítás", en: "Drywall and ceiling repair" },
      note: {
        before: { hu: "Félkész vagy sérült gipszkarton felület, ahol a teljes szoba és a csatlakozások is látszanak.", en: "Unfinished or damaged drywall where the whole room and junctions are visible." },
        process: { hu: "Szerelés, illesztés, glettelés és csiszolás a javított munkaterületen.", en: "Board fitting, jointing, filling and sanding on the actual work area." },
        after: { hu: "Festésre vagy használatra kész, rendezett gipszkarton felület.", en: "A tidy drywall finish ready for painting or normal use." },
      },
      photos: [["7937304", "before"], ["15798783", "before"], ["5606879", "process"], ["3990359", "process"], ["6474313", "process"], ["6474202", "process"], ["6474343", "process"], ["6474300", "process"], ["6474129", "after"], ["9826455", "after"]],
    },
    {
      title: { hu: "Kert és udvar rendbetétele", en: "Garden and yard clean-up" },
      note: {
        before: { hu: "Elhanyagolt vagy benőtt kertrész, ahol a tulajdonosnak újra áttekinthető terület kell.", en: "Overgrown or neglected garden areas that need to become usable again." },
        process: { hu: "Fűnyírás, vágás, összegyűjtés és rendezési munka nagyobb kertrészben.", en: "Mowing, trimming, collecting and tidying across a wider outdoor area." },
        after: { hu: "Rendezettebb kert, tisztább udvar és jobb első benyomás az ingatlannal.", en: "A cleaner garden, tidier yard and better first impression for the property." },
      },
      photos: [["17972815", "before"], ["26593079", "before"], ["33219998", "before"], ["1453499", "process"], ["24595769", "process"], ["5027602", "process"], ["5027601", "process"], ["7587878", "after"], ["7601179", "after"], ["280229", "after"]],
    },
    {
      title: { hu: "Airbnb és lakás átadás előtt", en: "Airbnb and apartment handover" },
      note: {
        before: { hu: "Vendégváltás vagy bérlő után a lakás teljes összképét kellett újra rendezni.", en: "After guests or tenants, the apartment needed a presentable full-space reset." },
        process: { hu: "Ellenőrzés, kisebb javítások, takarítás és fotóra kész előkészítés.", en: "Checking, smaller fixes, cleaning and preparing the home for photos or arrival." },
        after: { hu: "Rendezett, tiszta, fogadásra kész lakás, amely jobb értékelést és kevesebb panaszt támogat.", en: "A tidy guest-ready apartment that supports better reviews and fewer complaints." },
      },
      photos: [["5102904", "before"], ["6195959", "process"], ["6764827", "process"], ["8135495", "process"], ["14505912", "process"], ["7061674", "process"], ["19899060", "after"], ["36887747", "after"], ["10117724", "after"], ["271624", "after"]],
    },
    {
      title: { hu: "Iroda és közös tér frissítés", en: "Office and shared area refresh" },
      note: {
        before: { hu: "Üres vagy használt iroda, amelynek tisztább, munkára kész megjelenésre volt szüksége.", en: "An empty or used office that needed a cleaner work-ready appearance." },
        process: { hu: "Falfrissítés, kisebb javítások és átadás előtti rendezés a teljes térben.", en: "Wall refresh, minor repairs and handover preparation across the full space." },
        after: { hu: "Rendezett, világos munkakörnyezet ügyfeleknek, bérlőknek vagy munkatársaknak.", en: "A tidy, brighter working environment for clients, tenants or staff." },
      },
      photos: [["5483236", "before"], ["8477444", "before"], ["380769", "process"], ["5511098", "process"], ["380768", "after"], ["221537", "after"], ["10339232", "after"], ["7534216", "after"], ["36631699", "after"], ["1181406", "after"]],
    },
    {
      title: { hu: "Kisebb javítások és szerelések", en: "Small repairs and installations" },
      note: {
        before: { hu: "A lakás átadását vagy használatát zavaró apró, de látható hibák.", en: "Small but visible issues that affect handover, daily use or presentation." },
        process: { hu: "Polc, fal, ajtó, szegély, fúrási vagy szerelési pont javítása dokumentálható módon.", en: "Shelf, wall, door, trim, drilling or installation fixes shown clearly." },
        after: { hu: "Használható, rendezett részlet, amelytől az ingatlan gondozottabbnak hat.", en: "A usable, tidy detail that makes the property feel properly cared for." },
      },
      photos: [["13909112", "before"], ["13588248", "before"], ["23224978", "process"], ["4981802", "process"], ["19109111", "process"], ["9565966", "process"], ["5824546", "process"], ["1090638", "after"], ["6670861", "after"], ["5824575", "after"]],
    },
  ];

  const lang = () => (document.querySelector(".lang")?.textContent.trim() === "HU" ? "en" : "hu");
  const t = (value) => value?.[lang()] || value?.hu || "";
  const phaseName = (phase) => labels[lang()][phase] || labels[lang()].process;
  const caption = (project, phase) => `${phaseName(phase)}: ${t(project.note[phase])}`;

  const carouselMarkup = (project, index, size = "card") => {
    const large = size === "modal";
    return `
      <div class="project-carousel ${large ? "large" : "compact"} patched-carousel" data-patch-carousel="${index}" data-patch-active="0">
        <div class="carousel-head"><strong>${t(project.title)}</strong><span>${project.photos.length} ${labels[lang()].count}</span></div>
        <div class="carousel-stage">
          <button class="carousel-arrow carousel-prev" type="button" data-patch-prev aria-label="Previous">‹</button>
          <div class="carousel-viewport"><div class="carousel-track">
            ${project.photos.map((photo, photoIndex) => `
              <button class="carousel-slide" type="button" data-patch-slide="${photoIndex}">
                <img src="${cdn(photo[0], large ? 1300 : 640)}" alt="${caption(project, photo[1])}" loading="lazy">
                <span class="slide-caption"><b>${phaseName(photo[1])}</b><span>${t(project.note[photo[1]])}</span></span>
              </button>`).join("")}
          </div></div>
          <button class="carousel-arrow carousel-next" type="button" data-patch-next aria-label="Next">›</button>
        </div>
        <div class="carousel-thumbs">
          ${project.photos.map((photo, photoIndex) => `
            <button type="button" data-patch-dot="${photoIndex}" aria-label="${caption(project, photo[1])}">
              <img src="${cdn(photo[0], 180)}" alt="" loading="lazy">
            </button>`).join("")}
        </div>
      </div>`;
  };

  const showSlide = (carousel, next) => {
    const slides = [...carousel.querySelectorAll("[data-patch-slide]")];
    if (!slides.length) return;
    const index = (next + slides.length) % slides.length;
    carousel.dataset.patchActive = String(index);
    carousel.querySelector(".carousel-track").style.transform = `translateX(${-index * 100}%)`;
    carousel.querySelectorAll("[data-patch-dot]").forEach((dot, i) => dot.classList.toggle("active", i === index));
  };

  const patchCompare = (root, project) => {
    const before = project.photos.find((photo) => photo[1] === "before") || project.photos[0];
    const after = [...project.photos].reverse().find((photo) => photo[1] === "after") || project.photos.at(-1);
    const compareBefore = root.querySelector(".compare .before");
    const compareAfter = root.querySelector(".compare .after");
    if (compareBefore && before) {
      compareBefore.src = cdn(before[0], 1400);
      compareBefore.alt = caption(project, "before");
    }
    if (compareAfter && after) {
      compareAfter.src = cdn(after[0], 1400);
      compareAfter.alt = caption(project, "after");
    }
    const previewImgs = root.querySelectorAll(".case-preview img");
    if (previewImgs[0] && before) {
      previewImgs[0].src = cdn(before[0], 1200);
      previewImgs[0].alt = caption(project, "before");
    }
    if (previewImgs[1] && after) {
      previewImgs[1].src = cdn(after[0], 1200);
      previewImgs[1].alt = caption(project, "after");
    }
  };

  const patchCards = () => {
    document.querySelectorAll(".project").forEach((card, index) => {
      const project = projects[index];
      if (!project) return;
      patchCompare(card, project);
      const current = card.querySelector(".project-carousel");
      if (current && !current.classList.contains("patched-carousel")) {
        current.outerHTML = carouselMarkup(project, index, "card");
      }
    });
    document.querySelectorAll("[data-patch-carousel]").forEach((carousel) => showSlide(carousel, Number(carousel.dataset.patchActive || 0)));
  };

  const patchProjectModal = () => {
    const modal = document.getElementById("projectModal");
    const inner = document.getElementById("projectInner");
    if (!modal?.classList.contains("open") || !inner) return;
    const index = Number(inner.querySelector("[data-project-index]")?.dataset.projectIndex || inner.querySelector("[data-patch-carousel]")?.dataset.patchCarousel || 0);
    const project = projects[index];
    if (!project || inner.dataset.galleryPatched === String(index)) return;
    inner.dataset.galleryPatched = String(index);
    patchCompare(inner, project);
    const current = inner.querySelector(".project-carousel");
    if (current) current.outerHTML = carouselMarkup(project, index, "modal");
    const videoStrip = inner.querySelector(".project-video-strip");
    const patchedCarousel = inner.querySelector(".patched-carousel");
    if (videoStrip && patchedCarousel) patchedCarousel.before(videoStrip);
    inner.querySelectorAll("[data-patch-carousel]").forEach((carousel) => showSlide(carousel, 0));
  };

  const openGallery = (projectIndex, photoIndex = 0) => {
    const project = projects[projectIndex];
    const modal = document.getElementById("galleryModal");
    const inner = document.getElementById("galleryInner");
    if (!project || !modal || !inner) return;
    inner.innerHTML = `
      <div class="gallery-layout patched-gallery" data-patch-gallery="${projectIndex}" data-patch-active="${photoIndex}">
        <div class="gallery-main">
          <button class="arrow prev" type="button" data-gallery-prev>‹</button>
          <img id="patchGalleryImg" src="" alt="">
          <button class="arrow next" type="button" data-gallery-next>›</button>
          <div class="gallery-caption" id="patchGalleryCaption"></div>
        </div>
        <div class="details">
          <small class="eyebrow">${labels[lang()].open}</small>
          <h2>${t(project.title)}</h2>
          <p>${t(project.note.before)} ${t(project.note.process)} ${t(project.note.after)}</p>
          <p><a class="btn primary" href="tel:+36206671832">${phone}</a></p>
          <div class="thumb-grid">
            ${project.photos.map((photo, index) => `<button type="button" data-gallery-thumb="${index}"><img src="${cdn(photo[0], 220)}" alt="${caption(project, photo[1])}" loading="lazy"></button>`).join("")}
          </div>
        </div>
      </div>`;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    showGallery(photoIndex);
  };

  const showGallery = (next) => {
    const gallery = document.querySelector("[data-patch-gallery]");
    if (!gallery) return;
    const project = projects[Number(gallery.dataset.patchGallery)];
    const index = (next + project.photos.length) % project.photos.length;
    const photo = project.photos[index];
    gallery.dataset.patchActive = String(index);
    document.getElementById("patchGalleryImg").src = cdn(photo[0], 1600);
    document.getElementById("patchGalleryImg").alt = caption(project, photo[1]);
    document.getElementById("patchGalleryCaption").innerHTML = `<b>${phaseName(photo[1])}</b><span>${t(project.note[photo[1]])}</span>`;
    gallery.querySelectorAll("[data-gallery-thumb]").forEach((thumb, thumbIndex) => thumb.classList.toggle("active", thumbIndex === index));
  };

  const installSwipe = () => {
    let startX = 0;
    let startY = 0;
    let target = null;
    document.addEventListener("pointerdown", (event) => {
      const carousel = event.target.closest("[data-patch-carousel] .carousel-viewport");
      const gallery = event.target.closest("[data-patch-gallery] .gallery-main");
      target = carousel ? carousel.closest("[data-patch-carousel]") : gallery?.closest("[data-patch-gallery]");
      if (!target) return;
      startX = event.clientX;
      startY = event.clientY;
    });
    document.addEventListener("pointerup", (event) => {
      if (!target) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      const active = Number(target.dataset.patchActive || 0);
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        if (target.matches("[data-patch-carousel]")) showSlide(target, active + (dx < 0 ? 1 : -1));
        if (target.matches("[data-patch-gallery]")) showGallery(active + (dx < 0 ? 1 : -1));
      }
      target = null;
    });
  };

  document.addEventListener("click", (event) => {
    const carousel = event.target.closest("[data-patch-carousel]");
    if (carousel) {
      const active = Number(carousel.dataset.patchActive || 0);
      if (event.target.closest("[data-patch-prev]")) return showSlide(carousel, active - 1);
      if (event.target.closest("[data-patch-next]")) return showSlide(carousel, active + 1);
      const dot = event.target.closest("[data-patch-dot]");
      if (dot) return showSlide(carousel, Number(dot.dataset.patchDot));
      const slide = event.target.closest("[data-patch-slide]");
      if (slide) {
        event.stopPropagation();
        return openGallery(Number(carousel.dataset.patchCarousel), Number(slide.datasetPatchSlide));
      }
    }
    const gallery = event.target.closest("[data-patch-gallery]");
    if (gallery) {
      const active = Number(gallery.dataset.patchActive || 0);
      if (event.target.closest("[data-gallery-prev]")) return showGallery(active - 1);
      if (event.target.closest("[data-gallery-next]")) return showGallery(active + 1);
      const thumb = event.target.closest("[data-gallery-thumb]");
      if (thumb) return showGallery(Number(thumb.dataset.galleryThumb));
    }
  }, true);

  const style = document.createElement("style");
  style.textContent = `
    .project{transition:transform .25s ease, box-shadow .25s ease}.project:hover{transform:translateY(-4px);box-shadow:0 24px 58px rgba(49,43,33,.14)}
    .project img{transition:transform 1.4s ease}.project:hover img{transform:scale(1.035)}
    .patched-carousel .carousel-slide{position:relative;text-align:left}.patched-carousel .slide-caption,.gallery-caption{position:absolute;left:12px;right:12px;bottom:12px;z-index:3;padding:10px 12px;border-radius:9px;background:rgba(17,24,20,.78);color:white;backdrop-filter:blur(7px);line-height:1.32}
    .patched-carousel .slide-caption b,.gallery-caption b{display:block;color:#f3c275;text-transform:uppercase;font-size:11px;letter-spacing:.05em}.patched-carousel .slide-caption span,.gallery-caption span{display:block;font-size:13px}
    .patched-carousel .carousel-thumbs button.active,.patched-gallery .thumb-grid button.active{outline:3px solid #c4813a;outline-offset:2px}
    .patched-gallery .gallery-main{position:relative}.patched-gallery #patchGalleryImg{width:100%;height:min(62vh,680px);object-fit:cover;display:block}
    @media(max-width:680px){.patched-carousel .slide-caption{position:relative;left:auto;right:auto;bottom:auto;border-radius:0;background:#173629}.patched-gallery #patchGalleryImg{height:48vh}.gallery-caption{position:relative;left:auto;right:auto;bottom:auto;border-radius:0;background:#173629}}
  `;
  document.head.appendChild(style);

  const boot = () => {
    if (!window.__projectGallerySwipeInstalled) {
      window.__projectGallerySwipeInstalled = true;
      installSwipe();
    }
    patchCards();
    patchProjectModal();
    const observer = new MutationObserver(() => {
      clearTimeout(window.__projectGalleryPatchTimer);
      window.__projectGalleryPatchTimer = setTimeout(() => {
        patchCards();
        patchProjectModal();
      }, 120);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(boot, 500));
  } else {
    setTimeout(boot, 500);
  }
})();
