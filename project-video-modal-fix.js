(() => {
  const videosByProject = [
    {
      title: { hu: "Festés és falfelület frissítés", en: "Interior painting and wall refresh" },
      category: "painting",
      description: {
        hu: "Festés, faljavítás, glettelés és hengerelés egy lakás vagy bérlemény gyors frissítéséhez.",
        en: "Painting, wall repair, filler work and roller application for a clean apartment refresh.",
      },
      videos: [
        {
          src: "https://videos.pexels.com/video-files/6474086/6474086-sd_960_540_25fps.mp4",
          poster: "6764282",
          title: { hu: "Festés és hengerelés munka közben", en: "Painting and roller work in progress" },
          type: { hu: "Festés", en: "Painting" },
        },
      ],
    },
    {
      title: { hu: "Gipszkarton javítás és előkészítés", en: "Drywall repair and preparation" },
      category: "drywall",
      description: {
        hu: "Gipszkarton javítás, szerelési előkészítés, csiszolás és festés előtti felületképzés.",
        en: "Drywall repair, fitting preparation, sanding and surface preparation before painting.",
      },
      videos: [
        {
          src: "https://videos.pexels.com/video-files/32244801/13751987_3840_2160_50fps.mp4",
          poster: "6474313",
          title: { hu: "Gipszkarton szerelési és csiszolási folyamat", en: "Drywall fitting and sanding process" },
          type: { hu: "Gipszkarton", en: "Drywall" },
        },
      ],
    },
    {
      title: { hu: "Kert és udvar rendbetétele", en: "Garden and yard clean-up" },
      category: "garden",
      description: {
        hu: "Kertápolás, fűnyírás, udvarrendezés, sövény és zöldterület áttekinthető rendbetétele.",
        en: "Garden care, mowing, yard clean-up, hedge trimming and tidy outdoor maintenance.",
      },
      videos: [
        {
          src: "https://videos.pexels.com/video-files/7475267/7475267-hd_1066_1920_25fps.mp4",
          poster: "8174996",
          title: { hu: "Kertápolás, fűnyírás és udvarrendezés", en: "Garden care, mowing and yard clean-up" },
          type: { hu: "Kert és udvar", en: "Garden care" },
        },
      ],
    },
    {
      title: { hu: "Airbnb előkészítés vendégváltás előtt", en: "Airbnb preparation before guest changeover" },
      category: "airbnb",
      description: {
        hu: "Takarítás, apró javítások, átadás előtti ellenőrzés és vendégfogadásra kész lakásállapot.",
        en: "Cleaning, small fixes, pre-arrival checks and guest-ready apartment preparation.",
      },
      videos: [
        {
          src: "https://videos.pexels.com/video-files/7216747/7216747-sd_540_960_24fps.mp4",
          poster: "34046213",
          title: { hu: "Airbnb előkészítés, takarítás és lakásellenőrzés", en: "Airbnb preparation, cleaning and apartment check" },
          type: { hu: "Airbnb előkészítés", en: "Airbnb preparation" },
        },
      ],
    },
    { category: "office", videos: [] },
    { category: "handyman", videos: [] },
  ];

  const img = (id, width = 700) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
  const lang = () => (document.documentElement.lang === "en" || localStorage.getItem("bps-lang") === "en" ? "en" : "hu");
  const tx = (value) => (typeof value === "string" ? value : value?.[lang()] || value?.hu || "");

  const installStyles = () => {
    if (document.getElementById("project-video-modal-fix-style")) return;
    const style = document.createElement("style");
    style.id = "project-video-modal-fix-style";
    style.textContent = `
      .project-video-strip{margin:18px 0 0;padding:16px;border-radius:10px;background:#fff8ee;border:1px solid var(--line)}
      .project-video-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:12px}
      .project-video-button{display:grid;grid-template-columns:96px 1fr;gap:12px;align-items:center;width:100%;padding:10px;border:1px solid var(--line);border-radius:9px;background:white;color:inherit;text-align:left;cursor:pointer;transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease}
      .project-video-button:hover{transform:translateY(-3px);box-shadow:0 14px 30px rgba(49,43,33,.12);border-color:rgba(40,95,67,.35)}
      .project-video-thumb{position:relative;height:68px;border-radius:8px;overflow:hidden;background:#17251d}
      .project-video-thumb img{width:100%;height:100%;object-fit:cover;display:block}
      .project-video-copy{display:grid;gap:2px;font-size:.9rem}
      .project-video-copy b{color:var(--green)}
      .project-video-copy span{color:var(--muted)}
      .play-mark.small{position:absolute;inset:0;margin:auto;width:34px;height:34px;border-radius:999px;display:grid;place-items:center;background:rgba(255,255,255,.9);color:#17251d;font-size:14px}
      @media (max-width: 640px){.project-video-grid{grid-template-columns:1fr}.project-video-button{grid-template-columns:88px 1fr}.project-video-strip{padding:12px}}
    `;
    document.head.appendChild(style);
  };

  const getProjectIndex = (inner) => {
    const explicit = inner.querySelector("[data-project-index]")?.dataset.projectIndex;
    if (explicit !== undefined) return Number(explicit);
    const carousel = inner.querySelector("[data-patch-carousel]");
    return Number(carousel?.dataset.patchCarousel || 0);
  };

  const openProjectVideo = (project, video) => {
    const inner = document.getElementById("videoInner");
    const modal = document.getElementById("videoModal");
    if (!inner || !modal) return;

    inner.innerHTML = `
      <div class="video-layout">
        <video class="video-player" controls autoplay playsinline preload="metadata" poster="${img(video.poster, 1400)}">
          <source src="${video.src}" type="video/mp4">
        </video>
        <div class="video-details">
          <small class="eyebrow">${tx(video.type)}</small>
          <h2>${tx(video.title)}</h2>
          <p>${tx(project.description)}</p>
          <div class="video-note"><strong>${lang() === "hu" ? "Kapcsolódó projekt" : "Related project"}:</strong> ${tx(project.title)}</div>
          <div class="section-cta"><a class="btn primary" href="tel:+36206671832">${lang() === "hu" ? "Kérek visszahívást" : "Request a call"}</a></div>
        </div>
      </div>
    `;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  const renderVideoStrip = () => {
    const modal = document.getElementById("projectModal");
    const inner = document.getElementById("projectInner");
    if (!modal?.classList.contains("open") || !inner) return;

    const index = getProjectIndex(inner);
    const project = videosByProject[index];
    const patchKey = `${index}-${lang()}`;
    const existing = inner.querySelector(".project-video-strip");

    if (inner.dataset.videoModalPatched === patchKey && existing) return;

    inner.querySelectorAll(".project-video-strip").forEach((strip) => strip.remove());
    inner.dataset.videoModalPatched = patchKey;
    if (!project?.videos?.length) return;

    const carousel = inner.querySelector(".patched-carousel") || inner.querySelector(".project-carousel");
    if (!carousel) return;

    const strip = document.createElement("div");
    strip.className = "project-video-strip";
    strip.innerHTML = `
      <div class="carousel-head">
        <strong>${lang() === "hu" ? "Saját projektvideók" : "Project-specific videos"}</strong>
        <span>${project.videos.length} ${lang() === "hu" ? "videó" : "video"}</span>
      </div>
      <div class="project-video-grid">
        ${project.videos
          .map(
            (video, videoIndex) => `
              <button class="project-video-button" type="button" data-patch-project-video="${index}" data-patch-video-index="${videoIndex}">
                <span class="project-video-thumb"><img src="${img(video.poster, 460)}" alt="${tx(video.title)}" loading="lazy"><span class="play-mark small">▶</span></span>
                <span class="project-video-copy"><b>${tx(video.type)}</b><span>${tx(video.title)}</span></span>
              </button>
            `
          )
          .join("")}
      </div>
    `;

    carousel.insertAdjacentElement("afterend", strip);
    strip.querySelectorAll("[data-patch-project-video]").forEach((button) => {
      button.addEventListener("click", () => {
        const p = videosByProject[Number(button.dataset.patchProjectVideo)];
        const video = p?.videos?.[Number(button.dataset.patchVideoIndex)];
        if (p && video) openProjectVideo(p, video);
      });
    });
  };

  const boot = () => {
    installStyles();
    renderVideoStrip();

    document.addEventListener(
      "click",
      (event) => {
        if (event.target.closest?.("[data-project], [data-close], .lang")) {
          setTimeout(renderVideoStrip, 140);
        }
      },
      true
    );

    const observer = new MutationObserver(() => {
      clearTimeout(window.__projectVideoModalFixTimer);
      window.__projectVideoModalFixTimer = setTimeout(renderVideoStrip, 120);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
