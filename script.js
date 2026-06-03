(() => {
  const files = [
    "script-media-video-slider2-0.txt",
    "script-media-video-slider2-1.txt",
    "script-media-video-slider2-2.txt",
    "script-media-video-slider2-3.txt",
  ];

  const projectMedia = [
    {
      title: { hu: "Festés és falfelület frissítés", en: "Interior painting and wall refresh" },
      category: "painting",
      description: {
        hu: "Festés, faljavítás, glettelés és hengerelés egy lakás vagy bérlemény gyors frissítéséhez.",
        en: "Painting, wall repair, filler work and roller application for a clean apartment refresh.",
      },
      images: [],
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
      images: [],
      videos: [
        {
          src: "https://videos.pexels.com/video-files/32244801/13751987_3840_2160_50fps.mp4",
          poster: "6474313",
          title: { hu: "Gipszkarton jellegű szerelési folyamat", en: "Drywall-style fitting process" },
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
      images: [],
      videos: [
        {
          src: "https://videos.pexels.com/video-files/7475267/7475267-hd_1066_1920_25fps.mp4",
          poster: "8174996",
          title: { hu: "Kertápolás és udvarrendezés", en: "Garden care and yard clean-up" },
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
      images: [],
      videos: [
        {
          src: "https://videos.pexels.com/video-files/7216747/7216747-sd_540_960_24fps.mp4",
          poster: "34046213",
          title: { hu: "Airbnb előkészítés és takarítás", en: "Airbnb preparation and cleaning" },
          type: { hu: "Airbnb előkészítés", en: "Airbnb preparation" },
        },
      ],
    },
    {
      title: { hu: "Iroda gyors frissítése", en: "Office touch-up" },
      category: "office",
      description: {
        hu: "Irodai faljavítás, tisztasági festés és kisebb javítások rendezett munkakörnyezethez.",
        en: "Office wall touch-ups, clean repainting and smaller fixes for a presentable workspace.",
      },
      images: [],
      videos: [],
    },
    {
      title: { hu: "Kisebb javítások átadás előtt", en: "Small handover fixes" },
      category: "handyman",
      description: {
        hu: "Polcok, ajtók, szegélyek, furatok, apró sérülések és átadás előtti látható hibák javítása.",
        en: "Shelves, doors, trims, drill holes, small damage and visible issues before handover.",
      },
      images: [],
      videos: [],
    },
  ];

  const lang = () => document.documentElement.lang === "en" || localStorage.getItem("bps-lang") === "en" ? "en" : "hu";
  const tx = (value) => (typeof value === "string" ? value : value?.[lang()] || value?.hu || "");
  const img = (id, width = 700) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

  const installProjectMediaPatch = () => {
    window.bpsProjectMedia = projectMedia;
    const style = document.createElement("style");
    style.textContent = `
      .project-video-strip{margin:18px 0 0;padding:16px;border-radius:10px;background:#fff8ee;border:1px solid var(--line)}
      .project-video-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px}
      .project-video-button{display:grid;grid-template-columns:92px 1fr;gap:12px;align-items:center;width:100%;padding:10px;border:1px solid var(--line);border-radius:9px;background:white;color:inherit;text-align:left;cursor:pointer;transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease}
      .project-video-button:hover{transform:translateY(-3px);box-shadow:0 14px 30px rgba(49,43,33,.12);border-color:rgba(40,95,67,.35)}
      .project-video-thumb{position:relative;height:66px;border-radius:8px;overflow:hidden;background:#17251d}
      .project-video-thumb img{width:100%;height:100%;object-fit:cover;display:block}
      .play-mark.small{width:34px;height:34px;font-size:14px}
      .project-video-copy{display:grid;gap:2px}
      .project-video-copy b{color:var(--green);font-size:12px;text-transform:uppercase}
      .project-video-copy span{font-weight:900;line-height:1.25}
    `;
    document.head.appendChild(style);

    document.addEventListener(
      "click",
      (event) => {
        const trigger = event.target.closest?.("[data-project]");
        if (!trigger) return;
        const index = Number(trigger.dataset.project);
        window.setTimeout(() => enhanceProjectModal(index), 80);
      },
      true
    );
  };

  const enhanceProjectModal = (index) => {
    const media = projectMedia[index];
    const modal = document.querySelector("#projectModal.open");
    if (!media || !modal) return;
    media.images = Array.from(modal.querySelectorAll(".project-carousel.large [data-slide] img")).map((image) => image.currentSrc || image.src);
    modal.querySelector(".project-video-strip")?.remove();
    if (!media.videos.length) return;
    const carousel = modal.querySelector(".project-carousel.large");
    if (!carousel) return;
    carousel.insertAdjacentHTML(
      "afterend",
      `<div class="project-video-strip">
        <div class="carousel-head"><strong>${lang() === "hu" ? "Saját projektvideók" : "Project-specific videos"}</strong><span>${media.videos.length} ${lang() === "hu" ? "videó" : "video"}</span></div>
        <div class="project-video-grid">
          ${media.videos
            .map(
              (video, videoIndex) =>
                `<button class="project-video-button" type="button" data-patch-project-video="${index}" data-patch-video-index="${videoIndex}">
                  <span class="project-video-thumb"><img src="${img(video.poster, 460)}" alt="${tx(video.title)}" loading="lazy"><span class="play-mark small">▶</span></span>
                  <span class="project-video-copy"><b>${tx(video.type)}</b><span>${tx(video.title)}</span></span>
                </button>`
            )
            .join("")}
        </div>
      </div>`
    );
    modal.querySelectorAll("[data-patch-project-video]").forEach((button) => {
      button.addEventListener("click", () => {
        const project = projectMedia[Number(button.dataset.patchProjectVideo)];
        const video = project?.videos?.[Number(button.dataset.patchVideoIndex)];
        if (project && video) openProjectVideo(project, video);
      });
    });
  };

  const openProjectVideo = (project, video) => {
    const inner = document.getElementById("videoInner");
    if (!inner) return;
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
      </div>`;
    const modal = document.getElementById("videoModal");
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  Promise.all(
    files.map((file) =>
      fetch(file, { cache: "force-cache" }).then((response) => {
        if (!response.ok) throw new Error("Missing script chunk " + file);
        return response.text();
      })
    )
  )
    .then((parts) => {
      const bytes = Uint8Array.from(atob(parts.join("")), (char) => char.charCodeAt(0));
      if ("DecompressionStream" in self) {
        return new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"))).text();
      }
      throw new Error("Browser does not support compressed script loading.");
    })
    .then((code) => {
      (0, eval)(code);
      installProjectMediaPatch();
    })
    .catch((error) => {
      console.error(error);
      document.body.textContent = "Budapest Property Services - oldal betoltesi hiba. +36 20 667 1832";
    });
})();