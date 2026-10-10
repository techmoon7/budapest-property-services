(() => {
  const phone = "+36 20 667 1832";
  const tel = "tel:+36206671832";
  const contactEmail = "contactcreativefabrication@gmail.com";
  const storageKey = "bps-lang";
  const supportedLanguages = [
    { code: "hu", label: "Magyar", short: "HU", html: "hu", flag: "hu", complete: "Teljes weboldal" },
    { code: "en", label: "English", short: "EN", html: "en", flag: "en", complete: "Complete website" },
  ];
  const fallbackLanguage = "en";
  const languageCodes = new Set(supportedLanguages.map((language) => language.code));
  const assetBuildId = "__ASSET_VERSION__";
  const paintDebugBuild = assetBuildId;
  const scriptBaseUrl = document.currentScript?.src || new URL("script.js", document.baseURI).href;
  try {
    window.dataLayer = window.dataLayer || [];
  } catch {
    /* Analytics is optional and must never block site interactions. */
  }
  const routePairs = {
    home: { en: "/", hu: "/hu/" },
    maintenance: { en: "/property-maintenance-budapest.html", hu: "/hu/ingatlan-karbantartas-budapest.html" },
    painting: { en: "/painting-wall-repairs-budapest.html", hu: "/hu/szobafestes-faljavitas-budapest.html" },
    garden: { en: "/garden-maintenance-budapest.html", hu: "/hu/kertfenntartas-budapest.html" },
    handyman: { en: "/handyman-services-budapest.html", hu: "/hu/ezermester-budapest.html" },
    cleaning: { en: "/cleaning-services-budapest.html", hu: "/hu/takaritas-budapest.html" },
    airbnb: { en: "/airbnb-property-maintenance-budapest.html", hu: "/hu/airbnb-karbantartas-budapest.html" },
    foreignOwners: {
      en: "/property-management-for-foreign-owners-budapest.html",
      hu: "/hu/ingatlankezeles-kulfoldi-tulajdonosoknak-budapest.html",
    },
    impresszum: { en: "/impresszum.html", hu: "/hu/impresszum.html" },
  };
  const routeLookup = new Map();
  Object.entries(routePairs).forEach(([key, pair]) => {
    Object.entries(pair).forEach(([lang, href]) => routeLookup.set(href, { key, lang }));
  });
  routeLookup.set("/index.html", { key: "home", lang: "en" });
  routeLookup.set("/hu/index.html", { key: "home", lang: "hu" });

  const paintDebugError = (error) => ({
    name: error?.name || "Error",
    message: error?.message || String(error),
    stack: error?.stack || null,
  });

  const paintDebugPanelEnabled = () => /(?:^|[?&])paintDebug=1(?:&|$)/.test(window.location.search);

  const formatPaintDebugValue = (value) => {
    if (value === undefined || value === null || value === "") return "n/a";
    if (typeof value === "boolean") return value ? "yes" : "no";
    if (typeof value === "object") {
      try {
        return JSON.stringify(value);
      } catch {
        return String(value);
      }
    }
    return String(value);
  };

  const latestPaintDebugEvent = (debug, matcher) => {
    for (let index = debug.events.length - 1; index >= 0; index -= 1) {
      const event = debug.events[index];
      if (matcher(event)) return event;
    }
    return null;
  };

  const paintInputEventNames = [
    "pointerdown",
    "pointermove",
    "pointerup",
    "pointercancel",
    "touchstart",
    "touchmove",
    "touchend",
    "touchcancel",
  ];

  const createPaintInputCounts = () =>
    paintInputEventNames.reduce((counts, eventName) => {
      counts[eventName] = 0;
      return counts;
    }, {});

  const normalizePaintInputTrace = (trace = {}) => ({
    selectedInputMode: trace.selectedInputMode || "n/a",
    counts: {
      ...createPaintInputCounts(),
      ...(trace.counts || {}),
    },
    probeCounts: {
      window: {
        ...createPaintInputCounts(),
        ...(trace.probeCounts?.window || {}),
      },
      document: {
        ...createPaintInputCounts(),
        ...(trace.probeCounts?.document || {}),
      },
      "paint-root": {
        ...createPaintInputCounts(),
        ...(trace.probeCounts?.["paint-root"] || {}),
      },
      canvas: {
        ...createPaintInputCounts(),
        ...(trace.probeCounts?.canvas || {}),
      },
    },
    latestInput: trace.latestInput || null,
    latestProbe: trace.latestProbe || null,
    initialContact: trace.initialContact || null,
    latestEarlyReturn: trace.latestEarlyReturn || null,
    latestFunction: trace.latestFunction || "n/a",
    activeGestureCreated: trace.activeGestureCreated || false,
    beginPaintingEntered: trace.beginPaintingEntered || false,
    revealAtCalled: trace.revealAtCalled || false,
    canvasPixelsModified: trace.canvasPixelsModified || false,
    paintStartPipeline: trace.paintStartPipeline || null,
  });

  const formatPaintDebugNodeSummary = (node) => node?.summary || node?.target?.summary || "none";

  const formatPaintDebugStyle = (styles) => {
    if (!styles) return "n/a";
    return `pe:${formatPaintDebugValue(styles.pointerEvents)} ta:${formatPaintDebugValue(styles.touchAction)} z:${formatPaintDebugValue(styles.zIndex)} pos:${formatPaintDebugValue(styles.position)}`;
  };

  const serializePaintDebug = (debug) =>
    JSON.stringify(
      debug,
      (key, value) => {
        if (key === "panel") return undefined;
        if (typeof value === "function") return undefined;
        return value;
      },
      2
    );

  const paintDebugPlainText = (debug) =>
    [
      "Budapest Property Services paint diagnostics",
      `build: ${debug?.build || "n/a"}`,
      `url: ${window.location.href}`,
      `created: ${new Date().toISOString()}`,
      "",
      serializePaintDebug(debug),
    ].join("\n");

  const updatePaintInputTrace = (debug, entry) => {
    const trace = normalizePaintInputTrace(debug.inputTrace);
    const traceRelevantEvent =
      /^(pointer|touch|mouse|beginPainting|buildPaintMaterial|revealAt|canvas-pixels|active-gesture|finishInput|paint-start|paint-finish|paint-cancel|renderPaintedWall)/.test(
        entry.event || ""
      ) || entry.event?.endsWith("-early-return");
    if (traceRelevantEvent) trace.latestFunction = entry.event || "n/a";
    if (entry.inputMode) trace.selectedInputMode = entry.inputMode;

    const actualInput = entry.event?.match(
      /^(pointerdown|pointermove|pointerup|pointercancel|touchstart|touchmove|touchend|touchcancel)-received$/
    );
    if (actualInput) {
      trace.counts[actualInput[1]] = (trace.counts[actualInput[1]] || 0) + 1;
      trace.latestInput = entry;
      if ((actualInput[1] === "pointerdown" || actualInput[1] === "touchstart") && !trace.initialContact) {
        trace.initialContact = entry;
      }
    }

    const probeInput = entry.event?.match(
      /^input-probe-(window|document|paint-root|canvas)-(pointerdown|pointermove|pointerup|pointercancel|touchstart|touchmove|touchend|touchcancel)$/
    );
    if (probeInput) {
      const [, scope, eventName] = probeInput;
      trace.probeCounts[scope][eventName] = (trace.probeCounts[scope][eventName] || 0) + 1;
      trace.latestProbe = entry;
      if ((eventName === "pointerdown" || eventName === "touchstart") && !trace.initialContact) {
        trace.initialContact = entry;
      }
    }

    if (entry.event?.endsWith("-early-return")) trace.latestEarlyReturn = entry;
    if (entry.event === "active-gesture-state-created") trace.activeGestureCreated = true;
    if (entry.event === "beginPainting-entered" || entry.event === "paint-start") trace.beginPaintingEntered = true;
    if (entry.event === "revealAt-called") trace.revealAtCalled = true;
    if (entry.event === "canvas-pixels-modified") trace.canvasPixelsModified = true;
    if (entry.event === "paint-start-pipeline") trace.paintStartPipeline = entry;

    debug.inputTrace = trace;
  };

  const createPaintDebugPanel = (debug) => {
    if (!paintDebugPanelEnabled() || debug.panel?.isConnected) return;

    const panel = document.createElement("section");
    panel.id = "paintDebugPanel";
    panel.setAttribute("aria-label", "Paint diagnostics");
    panel.style.cssText = [
      "position:fixed",
      "right:max(8px, env(safe-area-inset-right))",
      "bottom:max(8px, env(safe-area-inset-bottom))",
      "z-index:2147483647",
      "width:min(360px, calc(100vw - 16px))",
      "max-height:min(56vh, 460px)",
      "overflow:auto",
      "padding:10px",
      "pointer-events:none",
      "border:1px solid rgba(255,255,255,.22)",
      "border-radius:14px",
      "background:rgba(10,24,18,.92)",
      "color:#fffaf2",
      "box-shadow:0 18px 50px rgba(0,0,0,.28)",
      "font:12px/1.35 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
      "-webkit-backdrop-filter:blur(14px)",
      "backdrop-filter:blur(14px)",
    ].join(";");
    panel.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;">
        <strong style="font:700 12px/1.2 system-ui,sans-serif;">Paint diagnostics</strong>
        <button type="button" data-paint-debug-copy style="appearance:none;border:0;border-radius:999px;background:#fffaf2;color:#102c21;padding:6px 9px;font:700 11px/1 system-ui,sans-serif;pointer-events:auto;">Copy diagnostics</button>
      </div>
      <dl data-paint-debug-fields style="display:grid;grid-template-columns:max-content minmax(0,1fr);gap:4px 8px;margin:0;"></dl>
      <div data-paint-debug-copy-state style="margin-top:7px;color:#d8f3dc;font:700 11px/1.25 system-ui,sans-serif;" aria-live="polite"></div>
    `;

    const copyButton = panel.querySelector("[data-paint-debug-copy]");
    const copyState = panel.querySelector("[data-paint-debug-copy-state]");
    copyButton?.addEventListener("click", async () => {
      const payload = paintDebugPlainText(window.__paintDebug);
      try {
        await navigator.clipboard.writeText(payload);
        copyState.textContent = "Diagnostics copied";
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = payload;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy");
          copyState.textContent = "Diagnostics copied";
        } catch {
          copyState.textContent = "Copy failed";
        } finally {
          textarea.remove();
        }
      }
    });

    document.body.appendChild(panel);
    debug.panel = panel;
  };

  const updatePaintDebugPanel = (debug) => {
    if (!paintDebugPanelEnabled()) return;
    if (!debug.panel?.isConnected) {
      if (!document.body) return;
      createPaintDebugPanel(debug);
    }

    const latest = debug.latest || {};
    const component =
      latest.componentId && debug.components?.[latest.componentId]
        ? debug.components[latest.componentId]
        : Object.values(debug.components || {}).find(Boolean);
    const currentRoot =
      [...document.querySelectorAll("[data-paint-reveal]")].find(
        (root) => latest.componentId && root.dataset.paintDebugId === latest.componentId
      ) || document.querySelector("[data-paint-reveal]");
    const currentCanvas = currentRoot?.querySelector("canvas.paint-reveal-canvas");
    const currentImage = currentRoot?.querySelector("img");
    const currentCanvasRect = currentCanvas?.getBoundingClientRect();
    const currentImageRect = currentImage?.getBoundingClientRect();
    const liveSnapshot = {
      image: currentImage
        ? {
            complete: currentImage.complete,
            naturalWidth: currentImage.naturalWidth || 0,
            naturalHeight: currentImage.naturalHeight || 0,
            currentSrc: currentImage.currentSrc || currentImage.src || "",
            rect: currentImageRect
              ? {
                  width: Math.round(currentImageRect.width),
                  height: Math.round(currentImageRect.height),
                }
              : null,
          }
        : null,
      canvas: currentCanvas
        ? {
            cssWidth: Math.round(currentCanvasRect?.width || 0),
            cssHeight: Math.round(currentCanvasRect?.height || 0),
            backingWidth: currentCanvas.width,
            backingHeight: currentCanvas.height,
            ratio: currentCanvasRect?.width ? currentCanvas.width / currentCanvasRect.width : null,
            rect: currentCanvasRect
              ? {
                  left: Math.round(currentCanvasRect.left),
                  top: Math.round(currentCanvasRect.top),
                  width: Math.round(currentCanvasRect.width),
                  height: Math.round(currentCanvasRect.height),
                }
              : null,
          }
        : null,
      gesture: currentRoot
        ? {
            ready: currentRoot.classList.contains("paint-reveal-ready"),
            active: currentRoot.classList.contains("paint-reveal-active"),
            hit: currentRoot.classList.contains("paint-reveal-hit"),
            paintGesture: currentRoot.dataset.paintGesture || "",
          }
        : null,
    };
    const snapshot = {
      ...(latest.snapshot || component?.snapshot || {}),
      ...(liveSnapshot.image ? { image: { ...((latest.snapshot || component?.snapshot || {}).image || {}), ...liveSnapshot.image } } : {}),
      ...(liveSnapshot.canvas ? { canvas: { ...((latest.snapshot || component?.snapshot || {}).canvas || {}), ...liveSnapshot.canvas } } : {}),
      ...(liveSnapshot.gesture ? { gesture: { ...((latest.snapshot || component?.snapshot || {}).gesture || {}), ...liveSnapshot.gesture } } : {}),
    };
    const latestProbe = latestPaintDebugEvent(debug, (event) => event.event.startsWith("input-probe-"));
    const latestException = latestPaintDebugEvent(debug, (event) => event.event === "caught-exception");
    const decodeEvent = latestPaintDebugEvent(debug, (event) => event.event.startsWith("image-decode-"));
    const trace = normalizePaintInputTrace(debug.inputTrace);
    const latestInput = trace.latestInput || latestPaintDebugEvent(debug, (event) =>
      /^(?:pointerdown|pointermove|pointerup|pointercancel|touchstart|touchmove|touchend|touchcancel)-received$/.test(event.event)
    );
    const initialContact = trace.initialContact || latestInput || latestProbe;
    const latestSurface = latestInput?.surface || latestProbe || {};
    const latestPoint = latestInput || latestProbe || {};
    const probeCounts = trace.probeCounts || {};
    const actualCounts = trace.counts || {};
    const pointerCounts = `${formatPaintDebugValue(actualCounts.pointerdown)} / ${formatPaintDebugValue(actualCounts.pointermove)} / ${formatPaintDebugValue(actualCounts.pointerup)}`;
    const touchCounts = `${formatPaintDebugValue(actualCounts.touchstart)} / ${formatPaintDebugValue(actualCounts.touchmove)} / ${formatPaintDebugValue(actualCounts.touchend)}`;
    const documentPointerCounts = `${formatPaintDebugValue(probeCounts.document?.pointerdown)} / ${formatPaintDebugValue(probeCounts.document?.pointermove)} / ${formatPaintDebugValue(probeCounts.document?.pointerup)}`;
    const documentTouchCounts = `${formatPaintDebugValue(probeCounts.document?.touchstart)} / ${formatPaintDebugValue(probeCounts.document?.touchmove)} / ${formatPaintDebugValue(probeCounts.document?.touchend)}`;
    const overlayStack = latestSurface.elementsFromPoint || latestProbe?.elementsFromPoint || [];
    const topOverlay = overlayStack.find((item) => !item.isCanvas && !item.isImage && !item.isRoot) || overlayStack[0];

    const rows = {
      build: debug.build,
      stage: latest.event,
      "selected input": trace.selectedInputMode || currentRoot?.dataset.paintInputMode || component?.latest?.inputMode || component?.snapshot?.gesture?.activeInputFamily || "n/a",
      "handler ptr d/m/u": pointerCounts,
      "handler touch s/m/e": touchCounts,
      "doc ptr d/m/u": documentPointerCounts,
      "doc touch s/m/e": documentTouchCounts,
      "event target": formatPaintDebugNodeSummary(latestPoint.target),
      "initial hit": formatPaintDebugNodeSummary(initialContact?.elementFromPoint || initialContact?.target),
      "latest hit": formatPaintDebugNodeSummary(latestSurface.elementFromPoint || latestProbe?.elementFromPoint),
      pointerId: latestPoint.pointerId,
      pointerType: latestPoint.pointerType,
      isPrimary: latestPoint.isPrimary,
      buttons: latestPoint.buttons,
      "client x/y": `${formatPaintDebugValue(latestPoint.clientX)} / ${formatPaintDebugValue(latestPoint.clientY)}`,
      "beginPainting": trace.beginPaintingEntered,
      pipeline: trace.paintStartPipeline
        ? `${trace.paintStartPipeline.stage || trace.paintStartPipeline.pipelineStage || trace.paintStartPipeline.event}: ${trace.paintStartPipeline.reason || "ok"}`
        : "none",
      "early return": trace.latestEarlyReturn
        ? `${trace.latestEarlyReturn.stage || trace.latestEarlyReturn.event}: ${trace.latestEarlyReturn.reason || "n/a"}`
        : "none",
      "gesture created": trace.activeGestureCreated,
      "revealAt called": trace.revealAtCalled,
      "pixels modified": trace.canvasPixelsModified,
      "image.complete": snapshot.image?.complete,
      "image natural": `${formatPaintDebugValue(snapshot.image?.naturalWidth)} / ${formatPaintDebugValue(snapshot.image?.naturalHeight)}`,
      decode: decodeEvent?.event?.replace("image-decode-", "") || "pending",
      "canvas CSS": `${formatPaintDebugValue(snapshot.canvas?.cssWidth)} x ${formatPaintDebugValue(snapshot.canvas?.cssHeight)}`,
      "canvas backing": `${formatPaintDebugValue(snapshot.canvas?.backingWidth)} x ${formatPaintDebugValue(snapshot.canvas?.backingHeight)}`,
      dpr: `${formatPaintDebugValue(window.devicePixelRatio)} (ratio ${formatPaintDebugValue(snapshot.canvas?.ratio)})`,
      ready: snapshot.gesture?.ready ?? latest.ready,
      "active input": snapshot.gesture?.activeInputFamily,
      "latest input": latestInput ? `${latestInput.event} ${formatPaintDebugValue(latestInput.pointerType || latestInput.touchIdentifier || "")}` : "none",
      "hit target": latestProbe?.elementFromPoint?.summary || latestProbe?.target?.summary || "none",
      "probe scope": latestProbe?.scope || "none",
      "image style": formatPaintDebugStyle(latestSurface.imageComputed),
      "canvas style": formatPaintDebugStyle(latestSurface.canvasComputed || latestProbe?.canvasComputed),
      "wrapper style": formatPaintDebugStyle(latestSurface.wrapperComputed || latestSurface.rootComputed || latestProbe?.rootComputed || latestProbe?.paintRootComputed),
      "top overlay": `${formatPaintDebugNodeSummary(topOverlay)} ${formatPaintDebugStyle(topOverlay?.computed)}`,
      "latest function": trace.latestFunction || latest.event,
      exception: latestException?.error?.message || latestException?.source || "none",
    };

    const fields = debug.panel?.querySelector("[data-paint-debug-fields]");
    if (!fields) return;
    fields.innerHTML = Object.entries(rows)
      .map(
        ([label, value]) =>
          `<dt style="color:rgba(255,250,242,.72);font-weight:700;">${label}</dt><dd style="margin:0;min-width:0;overflow-wrap:anywhere;">${formatPaintDebugValue(value)}</dd>`
      )
      .join("");
  };

  const ensurePaintDebug = () => {
    const existing =
      window.__paintDebug && typeof window.__paintDebug === "object" ? window.__paintDebug : {};
    const events = Array.isArray(existing.events) ? existing.events : [];
    const components =
      existing.components && typeof existing.components === "object" ? existing.components : {};
    const debug = {
      ...existing,
      build: paintDebugBuild,
      loadedAt: existing.loadedAt || new Date().toISOString(),
      latest: existing.latest || null,
      events,
      components,
      inputTrace: normalizePaintInputTrace(existing.inputTrace),
      maxEvents: existing.maxEvents || 500,
    };

    debug.log = (event, details = {}) => {
      const entry = {
        event,
        build: paintDebugBuild,
        at: new Date().toISOString(),
        t: Math.round(window.performance?.now?.() || 0),
        path: window.location.pathname,
        ...details,
      };
      events.push(entry);
      while (events.length > debug.maxEvents) events.shift();
      debug.latest = entry;
      updatePaintInputTrace(debug, entry);
      if (entry.componentId) {
        components[entry.componentId] = {
          ...(components[entry.componentId] || {}),
          lastEvent: event,
          latest: entry,
          ...(entry.snapshot ? { snapshot: entry.snapshot } : {}),
        };
      }
      updatePaintDebugPanel(debug);
      return entry;
    };

    debug.clear = () => {
      events.length = 0;
      Object.keys(components).forEach((key) => delete components[key]);
      debug.latest = null;
      return true;
    };

    window.__paintDebug = debug;
    return debug;
  };

  const paintDebug = ensurePaintDebug();
  paintDebug.log("script-loaded", {
    href: window.location.href,
    userAgent: navigator.userAgent,
    maxTouchPoints: navigator.maxTouchPoints || 0,
    pointerCoarse: window.matchMedia?.("(pointer: coarse)")?.matches === true,
  });

  const describeGlobalPaintDebugNode = (node) => {
    if (!node) return { summary: "none" };
    if (node === window) return { summary: "window" };
    if (node === document) return { summary: "document" };
    if (node === document.documentElement) return { summary: "html", tag: "HTML" };
    if (node === document.body) return { summary: "body", tag: "BODY" };
    const tag = node.tagName || node.nodeName || "node";
    const id = node.id ? `#${node.id}` : "";
    const className =
      typeof node.className === "string"
        ? node.className.trim()
        : typeof node.getAttribute === "function"
          ? node.getAttribute("class") || ""
          : "";
    const classes = className
      ? `.${className
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 5)
          .join(".")}`
      : "";
    const paintRoot = typeof node.closest === "function" ? node.closest("[data-paint-reveal]") : null;
    return {
      summary: `${String(tag).toLowerCase()}${id}${classes}`,
      tag,
      id: node.id || "",
      className,
      role: typeof node.getAttribute === "function" ? node.getAttribute("role") || "" : "",
      href: typeof node.getAttribute === "function" ? node.getAttribute("href") || "" : "",
      dataPaintReveal: typeof node.hasAttribute === "function" ? node.hasAttribute("data-paint-reveal") : false,
      dataHeroLightbox: typeof node.hasAttribute === "function" ? node.hasAttribute("data-hero-lightbox") : false,
      dataPaintDebugId: paintRoot?.dataset.paintDebugId || "",
      insidePaintRoot: !!paintRoot,
    };
  };

  const globalPaintDebugPoint = (event) => {
    if (event.changedTouches?.length) {
      const touch = event.changedTouches[0];
      return { clientX: Math.round(touch.clientX), clientY: Math.round(touch.clientY) };
    }
    if (event.touches?.length) {
      const touch = event.touches[0];
      return { clientX: Math.round(touch.clientX), clientY: Math.round(touch.clientY) };
    }
    if (typeof event.clientX === "number" && typeof event.clientY === "number") {
      return { clientX: Math.round(event.clientX), clientY: Math.round(event.clientY) };
    }
    return { clientX: null, clientY: null };
  };

  const globalPaintDebugComputed = (node) => {
    if (!node || node === window || node === document || node.nodeType !== 1) return null;
    const rect = node.getBoundingClientRect();
    const styles = window.getComputedStyle(node);
    return {
      rect: {
        left: Math.round(rect.left),
        top: Math.round(rect.top),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      },
      position: styles.position,
      zIndex: styles.zIndex,
      pointerEvents: styles.pointerEvents,
      touchAction: styles.touchAction,
      display: styles.display,
      visibility: styles.visibility,
      opacity: styles.opacity,
    };
  };

  const installGlobalPaintInputProbe = () => {
    if (!paintDebugPanelEnabled() || window.__paintGlobalInputProbeBound === true) return;
    window.__paintGlobalInputProbeBound = true;
    const logProbe = (scope) => (event) => {
      const point = globalPaintDebugPoint(event);
      const hit =
        point.clientX === null || point.clientY === null
          ? null
          : document.elementFromPoint(point.clientX, point.clientY);
      const hitStack =
        point.clientX === null || point.clientY === null || typeof document.elementsFromPoint !== "function"
          ? []
          : document.elementsFromPoint(point.clientX, point.clientY)
              .slice(0, 14)
              .map((node) => ({
                ...describeGlobalPaintDebugNode(node),
                computed: globalPaintDebugComputed(node),
              }));
      const paintRoot =
        hit && typeof hit.closest === "function"
          ? hit.closest("[data-paint-reveal]")
          : event.target && typeof event.target.closest === "function"
            ? event.target.closest("[data-paint-reveal]")
            : null;
      const canvas = paintRoot?.querySelector(".paint-reveal-canvas") || null;
      paintDebug.log(`input-probe-${scope}-${event.type}`, {
        scope,
        componentId: paintRoot?.dataset.paintDebugId || "",
        eventType: event.type,
        pointerId: event.pointerId,
        pointerType: event.pointerType || (event.type.startsWith("touch") ? "touch" : ""),
        clientX: point.clientX,
        clientY: point.clientY,
        cancelable: event.cancelable,
        defaultPrevented: event.defaultPrevented,
        target: describeGlobalPaintDebugNode(event.target),
        currentTarget: scope,
        currentTargetNode: describeGlobalPaintDebugNode(event.currentTarget),
        elementFromPoint: describeGlobalPaintDebugNode(hit),
        elementsFromPoint: hitStack,
        paintRoot: describeGlobalPaintDebugNode(paintRoot),
        canvas: describeGlobalPaintDebugNode(canvas),
        hitComputed: globalPaintDebugComputed(hit),
        paintRootComputed: globalPaintDebugComputed(paintRoot),
        canvasComputed: globalPaintDebugComputed(canvas),
        ready: paintRoot?.classList.contains("paint-reveal-ready") ?? false,
      });
    };
    const options = { capture: true, passive: true };
    ["pointerdown", "pointermove", "pointerup", "pointercancel"].forEach((eventName) => {
      window.addEventListener(eventName, logProbe("window"), options);
      document.addEventListener(eventName, logProbe("document"), options);
    });
    ["touchstart", "touchmove", "touchend", "touchcancel"].forEach((eventName) => {
      window.addEventListener(eventName, logProbe("window"), options);
      document.addEventListener(eventName, logProbe("document"), options);
    });
    paintDebug.log("global-input-probe-installed", {
      scopes: ["window", "document"],
      events: paintInputEventNames,
    });
  };

  installGlobalPaintInputProbe();
  const uiText = {
    languageLabel: {
      hu: "Nyelv",
      en: "Language",
      de: "Sprache",
      uk: "Мова",
      "zh-CN": "语言",
    },
    languageBadge: {
      hu: "Elérhető magyarul és angolul",
      en: "Available in Hungarian and English",
    },
    languageSelectorHint: {
      hu: "HU / EN",
      en: "HU / EN",
    },
    openLanguageMenu: {
      hu: "Nyelv kiválasztása",
      en: "Choose language",
      de: "Sprache auswählen",
      uk: "Вибрати мову",
      "zh-CN": "选择语言",
    },
    closeLanguageMenu: {
      hu: "Nyelvválasztó bezárása",
      en: "Close language selector",
      de: "Sprachauswahl schließen",
      uk: "Закрити вибір мови",
      "zh-CN": "关闭语言选择器",
    },
    menuOpen: {
      hu: "Menü megnyitása",
      en: "Open menu",
      de: "Menü öffnen",
      uk: "Відкрити меню",
      "zh-CN": "打开菜单",
    },
    menuClose: {
      hu: "Menü bezárása",
      en: "Close menu",
      de: "Menü schließen",
      uk: "Закрити меню",
      "zh-CN": "关闭菜单",
    },
    services: {
      hu: "Szolgáltatások",
      en: "Services",
      de: "Dienstleistungen",
      uk: "Послуги",
      "zh-CN": "服务",
    },
    servicesOverview: {
      hu: "Szolgáltatások áttekintése",
      en: "Services overview",
      de: "Leistungen im Überblick",
      uk: "Огляд послуг",
      "zh-CN": "服务概览",
    },
    copyPhone: {
      hu: "Telefonszám másolása",
      en: "Copy phone number",
      de: "Telefonnummer kopieren",
      uk: "Скопіювати номер телефону",
      "zh-CN": "复制电话号码",
    },
    callNow: {
      hu: "Hívás indítása",
      en: "Call now",
      de: "Jetzt anrufen",
      uk: "Зателефонувати",
      "zh-CN": "立即拨打",
    },
    phoneCopied: {
      hu: "Telefonszám másolva.",
      en: "Phone number copied.",
      de: "Telefonnummer kopiert.",
      uk: "Номер телефону скопійовано.",
      "zh-CN": "电话号码已复制。",
    },
    phoneFallback: {
      hu: `Telefonszám: ${phone}`,
      en: `Phone: ${phone}`,
      de: `Telefon: ${phone}`,
      uk: `Телефон: ${phone}`,
      "zh-CN": `电话：${phone}`,
    },
    emailCopied: {
      hu: "Email cím másolva.",
      en: "Email address copied.",
      de: "E-Mail-Adresse kopiert.",
      uk: "Адресу електронної пошти скопійовано.",
      "zh-CN": "电子邮件地址已复制。",
    },
    emailFallback: {
      hu: `Email cím: ${contactEmail}`,
      en: `Email: ${contactEmail}`,
      de: `E-Mail: ${contactEmail}`,
      uk: `Електронна пошта: ${contactEmail}`,
      "zh-CN": `电子邮件：${contactEmail}`,
    },
    emailCopyLabel: {
      hu: "Email cím másolása",
      en: "Copy email address",
      de: "E-Mail-Adresse kopieren",
      uk: "Копіювати адресу електронної пошти",
      "zh-CN": "复制电子邮件地址",
    },
    detailsLabel: {
      hu: "Részletek +",
      en: "Details +",
      de: "Mehr erfahren +",
      uk: "Детальніше +",
      "zh-CN": "详情 +",
    },
    closeLabel: {
      hu: "Bezárás −",
      en: "Close −",
      de: "Schließen −",
      uk: "Закрити −",
      "zh-CN": "关闭 −",
    },
    compareBefore: {
      hu: "Előtte",
      en: "Before",
      de: "Vorher",
      uk: "До",
      "zh-CN": "之前",
    },
    compareAfter: {
      hu: "Utána",
      en: "After",
      de: "Nachher",
      uk: "Після",
      "zh-CN": "之后",
    },
    compareSliderName: {
      hu: "Előtte-utána összehasonlító csúszka",
      en: "Before and after comparison slider",
      de: "Vorher-Nachher-Vergleichsschieber",
      uk: "Повзунок порівняння до і після",
      "zh-CN": "前后对比滑块",
    },
    viewFullComparison: {
      hu: "Teljes összehasonlítás megnyitása",
      en: "View full comparison",
      de: "Vollständigen Vergleich ansehen",
      uk: "Переглянути повне порівняння",
      "zh-CN": "查看完整对比",
    },
    fullComparisonTitle: {
      hu: "Teljes előtte-utána összehasonlítás",
      en: "Full before and after comparison",
      de: "Vollständiger Vorher-Nachher-Vergleich",
      uk: "Повне порівняння до і після",
      "zh-CN": "完整前后对比",
    },
    fullComparisonDescription: {
      hu: "Húzza a választóvonalat, vagy használja a nyílbillentyűket. A képek illusztratív példák, a konkrét feladatot mindig a helyszín állapota alapján egyeztetjük.",
      en: "Drag the divider or use the arrow keys. Images are illustrative examples; the actual task is always agreed from the condition of the property.",
      de: "Ziehen Sie die Trennlinie oder verwenden Sie die Pfeiltasten. Die Bilder sind illustrative Beispiele; die konkrete Aufgabe wird immer anhand des Zustands der Immobilie abgestimmt.",
      uk: "Перетягніть розділювач або використовуйте клавіші зі стрілками. Зображення є ілюстративними прикладами; конкретне завдання завжди узгоджується за фактичним станом об’єкта.",
      "zh-CN": "拖动分隔线或使用方向键。图片为示意示例；具体工作始终根据物业实际状况确认。",
    },
    openImage: {
      hu: "Kép megnyitása",
      en: "Open image",
      de: "Bild öffnen",
      uk: "Відкрити зображення",
      "zh-CN": "打开图片",
    },
    closeImage: {
      hu: "Kép bezárása",
      en: "Close image",
      de: "Bild schließen",
      uk: "Закрити зображення",
      "zh-CN": "关闭图片",
    },
    closeImageGallery: {
      hu: "Képgaléria bezárása",
      en: "Close image gallery",
      de: "Bildergalerie schließen",
      uk: "Закрити галерею зображень",
      "zh-CN": "关闭图片画廊",
    },
    previousImage: {
      hu: "Előző kép",
      en: "Previous image",
      de: "Vorheriges Bild",
      uk: "Попереднє зображення",
      "zh-CN": "上一张图片",
    },
    nextImage: {
      hu: "Következő kép",
      en: "Next image",
      de: "Nächstes Bild",
      uk: "Наступне зображення",
      "zh-CN": "下一张图片",
    },
  };
  // Only the two native page languages are supported and translatePhrase()
  // returns the source text for both, so no phrase-translation table is shipped.
  const phraseTranslations = {};

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
    {
      key: "airbnb",
      href: "airbnb-property-maintenance-budapest.html",
      hu: "Airbnb karbantartás",
      en: "Airbnb Maintenance",
      dataset: "airbnbLink",
    },
    {
      key: "foreignOwners",
      href: "property-management-for-foreign-owners-budapest.html",
      hu: "Külföldi tulajdonosok",
      en: "Owner Support",
      dataset: "foreignOwnersLink",
    },
  ];

  const normalizeLanguage = (lang = "") => {
    const value = String(lang).trim();
    const short = value.slice(0, 2).toLowerCase();
    if (languageCodes.has(value)) return value;
    if (languageCodes.has(short)) return short;
    return "";
  };
  const storedLanguage = () => {
    try {
      return normalizeLanguage(localStorage.getItem(storageKey));
    } catch {
      return "";
    }
  };
  const browserLanguage = () => {
    const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const language of languages) {
      const normalized = normalizeLanguage(language);
      if (normalized) return normalized;
    }
    return fallbackLanguage;
  };
  const persistLanguage = (lang) => {
    try {
      localStorage.setItem(storageKey, lang);
    } catch {
      /* localStorage can be unavailable in hardened browser modes. */
    }
  };
  const normalizePath = (pathname = window.location.pathname) => {
    let path = pathname || "/";
    if (path.startsWith("/budapest-property-services/")) {
      path = path.slice("/budapest-property-services".length) || "/";
    }
    if (path === "/index.html") return "/";
    if (path === "/hu/index.html") return "/hu/";
    return path.endsWith("/") ? path : path;
  };
  const routeInfoForPath = (pathname = window.location.pathname) => routeLookup.get(normalizePath(pathname)) || null;
  const routeLanguage = () => {
    const pageLang = normalizeLanguage(document.documentElement.dataset.pageLanguage || document.body?.dataset.routeLang || "");
    if (pageLang === "en" || pageLang === "hu") return pageLang;
    const routeLang = routeInfoForPath()?.lang;
    if (routeLang === "en" || routeLang === "hu") return routeLang;
    const htmlLang = normalizeLanguage(document.documentElement.lang);
    return htmlLang === "en" || htmlLang === "hu" ? htmlLang : "";
  };
  const currentRouteKey = () => routeInfoForPath()?.key || "home";
  const routeHref = (key, lang = currentLang()) => {
    const routeLang = lang === "hu" ? "hu" : "en";
    const path = routePairs[key]?.[routeLang] || routePairs.home[routeLang];
    const basePath = window.location.pathname.startsWith("/budapest-property-services/")
      ? "/budapest-property-services"
      : "";
    return `${basePath}${path}`;
  };
  const navigationLanguage = () => (currentLang() === "hu" ? "hu" : routeLanguage() === "hu" ? "hu" : "en");
  let activeLanguage = routeLanguage() || storedLanguage() || browserLanguage() || fallbackLanguage;
  if (!storedLanguage()) persistLanguage(activeLanguage);

  const directCallViewport = () => window.matchMedia("(max-width: 820px)").matches;
  const currentLang = () => activeLanguage || fallbackLanguage;
  const documentLang = () => currentLang();
  const languageInfo = (lang = currentLang()) =>
    supportedLanguages.find((language) => language.code === lang) || supportedLanguages.find((language) => language.code === fallbackLanguage);
  const t = (key, lang = currentLang()) => uiText[key]?.[lang] || uiText[key]?.[fallbackLanguage] || "";
  const translatePhrase = (text, lang = currentLang()) => {
    if (!text || lang === "hu" || lang === "en") return text;
    return phraseTranslations[text]?.[lang] || text;
  };
  const translateInlineText = (value, lang = currentLang()) => {
    const trimmed = value.trim();
    if (!trimmed) return value;
    const translated = translatePhrase(trimmed, lang);
    if (translated === trimmed) return value;
    const leading = value.match(/^\s*/)?.[0] || "";
    const trailing = value.match(/\s*$/)?.[0] || "";
    return `${leading}${translated}${trailing}`;
  };
  const phoneActionLabel = (lang = currentLang()) =>
    directCallViewport() ? t("callNow", lang) : t("copyPhone", lang);

  const quoteFormText = {
    en: {
      kicker: "Request a quote",
      title: "Send structured details on WhatsApp",
      intro: "Fill in the essentials and WhatsApp will open with a ready-to-send message. Add your photos there before sending.",
      name: "Name",
      service: "Service type",
      location: "Location or district (optional)",
      description: "Short task description",
      timing: "Preferred timing",
      access: "Access information",
      propertyType: "Property type",
      photosReady: "I have photos ready and will attach them in WhatsApp.",
      consent: "I understand that WhatsApp or email will open with these details and that photos must be attached manually before sending.",
      submit: "Continue in WhatsApp",
      submitEmail: "Send via email",
      emailSubjectPrefix: "Quote request",
      note: "WhatsApp or email will open with the details below. Add your photos there before sending.",
      required: "Required",
      requiredError: "Please complete this field.",
      consentError: "Please confirm before continuing.",
      statusOpening: "WhatsApp is opening. Attach your photos before sending the message.",
      statusOpeningEmail: "Your email app is opening. Attach your photos before sending the message.",
      counter: (count, max) => `${count} / ${max}`,
      messageGreeting: "Hello! I would like to request a quote from Budapest Property Services.",
      messageLabels: {
        name: "Name",
        service: "Service",
        propertyType: "Property type",
        location: "Location / district",
        timing: "Preferred timing",
        access: "Access information",
        description: "Task description",
        photos: "Photos",
        page: "Page",
      },
      photosYes: "Photos are ready and will be attached in WhatsApp.",
      photosNo: "No photos yet / I will explain in WhatsApp.",
      placeholderName: "Your name",
      placeholderLocation: "Example: District XIII, Buda, city centre - or leave blank",
      locationHelp: "An exact address is not needed for the first message.",
      placeholderAccess: "Optional: keys, concierge, tenant contact or access window",
      placeholderDescription: "Briefly describe what needs to be checked, repaired, cleaned or prepared.",
    },
    hu: {
      kicker: "Ajánlatkérés",
      title: "Küldjön rendezett részleteket WhatsAppon",
      intro: "Töltse ki a legfontosabb adatokat, és a WhatsApp egy előkészített üzenettel nyílik meg. A fotókat küldés előtt ott tudja csatolni.",
      name: "Név",
      service: "Szolgáltatás",
      location: "Helyszín vagy kerület (nem kötelező)",
      description: "Rövid feladatleírás",
      timing: "Kívánt időpont",
      access: "Bejutási információ",
      propertyType: "Ingatlan típusa",
      photosReady: "Vannak fotóim, és a WhatsApp megnyitása után csatolom őket.",
      consent: "Tudomásul veszem, hogy a WhatsApp vagy az email az alábbi adatokkal nyílik meg, a fotókat pedig küldés előtt kézzel kell csatolnom.",
      submit: "Folytatás WhatsAppon",
      submitEmail: "Küldés emailben",
      emailSubjectPrefix: "Árajánlatkérés",
      note: "A WhatsApp vagy az email megnyílik az alábbi adatokkal. Küldés előtt ott csatold a fotókat.",
      required: "Kötelező",
      requiredError: "Kérjük, töltse ki ezt a mezőt.",
      consentError: "Kérjük, erősítse meg, mielőtt folytatja.",
      statusOpening: "Megnyílik a WhatsApp. Az üzenet elküldése előtt csatold a fotókat.",
      statusOpeningEmail: "Megnyílik az email alkalmazás. Az üzenet elküldése előtt csatold a fotókat.",
      counter: (count, max) => `${count} / ${max}`,
      messageGreeting: "Üdvözlöm! Ajánlatot szeretnék kérni a Budapest Property Servicestől.",
      messageLabels: {
        name: "Név",
        service: "Szolgáltatás",
        propertyType: "Ingatlan típusa",
        location: "Helyszín / kerület",
        timing: "Kívánt időpont",
        access: "Bejutási információ",
        description: "Feladat leírása",
        photos: "Fotók",
        page: "Oldal",
      },
      photosYes: "Vannak fotók, és WhatsAppon csatolom őket.",
      photosNo: "Még nincsenek fotók / WhatsAppon pontosítom.",
      placeholderName: "Az Ön neve",
      placeholderLocation: "Például: XIII. kerület, Buda, belváros - vagy hagyd üresen",
      locationHelp: "Az első üzenethez nem kell pontos címet megadni.",
      placeholderAccess: "Opcionális: kulcs, portaszolgálat, bérlői kapcsolat vagy bejutási idősáv",
      placeholderDescription: "Írja le röviden, mit kell ellenőrizni, javítani, takarítani vagy előkészíteni.",
    },
  };
  const quoteServiceOptions = [
    { value: "maintenance", en: "Property maintenance", hu: "Ingatlankarbantartás" },
    { value: "handyman", en: "Handyman / small repairs", hu: "Ezermester / kisebb javítások" },
    { value: "painting", en: "Painting and wall repairs", hu: "Szobafestés és faljavítás" },
    { value: "garden", en: "Garden maintenance", hu: "Kertfenntartás" },
    { value: "cleaning", en: "Cleaning", hu: "Takarítás" },
    { value: "airbnb", en: "Airbnb maintenance", hu: "Airbnb-karbantartás" },
    { value: "foreign_owner", en: "Property support for a foreign owner", hu: "Ingatlankezelési segítség külföldi tulajdonosnak" },
    { value: "other", en: "Other", hu: "Egyéb" },
  ];
  const quotePropertyOptions = [
    { value: "", en: "Select if relevant", hu: "Válasszon, ha releváns" },
    { value: "apartment", en: "Apartment", hu: "Lakás" },
    { value: "house", en: "House", hu: "Ház" },
    { value: "airbnb_rental", en: "Airbnb / rental", hu: "Airbnb / kiadó ingatlan" },
    { value: "office", en: "Office", hu: "Iroda" },
    { value: "representative_property", en: "Representative property", hu: "Képviseleti ingatlan" },
    { value: "garden_outdoor", en: "Garden / outdoor area", hu: "Kert / kültéri terület" },
    { value: "other", en: "Other", hu: "Egyéb" },
  ];
  const quoteTimingOptions = [
    { value: "asap", en: "As soon as possible", hu: "Amint lehetséges" },
    { value: "week", en: "Within one week", hu: "Egy héten belül" },
    { value: "month", en: "Within one month", hu: "Egy hónapon belül" },
    { value: "flexible", en: "Flexible / just requesting information", hu: "Rugalmas / egyelőre érdeklődöm" },
  ];
  const quoteRouteService = {
    home: "maintenance",
    maintenance: "maintenance",
    handyman: "handyman",
    painting: "painting",
    garden: "garden",
    cleaning: "cleaning",
    airbnb: "airbnb",
    foreignOwners: "foreign_owner",
  };

  const pathForHref = (href = "") => {
    try {
      return normalizePath(new URL(href || ".", window.location.href).pathname);
    } catch {
      return normalizePath(`/${String(href).split("#")[0].replace(/^\.\//, "")}`);
    }
  };
  const serviceItemForHref = (href = "") => {
    // A same-page anchor (e.g. "#faq") always resolves to the current page's
    // own path, whose route key matches this page's own service item on every
    // service page -- misclassifying same-page nav links (FAQ, Process, What
    // we do, Contact) as service links and stripping them out. Same-page
    // anchors are never service links, so skip path resolution for them.
    if (href.startsWith("#")) return undefined;
    const path = pathForHref(href);
    const routeKey = routeInfoForPath(path)?.key;
    if (routeKey) return serviceNavigationItems.find((item) => item.key === routeKey);
    const cleanHref = href.split("#")[0].replace(/^\.\//, "");
    return serviceNavigationItems.find((item) => item.href === cleanHref);
  };

  const isServicesOverviewHref = (href = "") => {
    try {
      const url = new URL(href || ".", window.location.href);
      return url.hash === "#services" && routeInfoForPath(url.pathname)?.key === "home";
    } catch {
      return href === "#services" || href === "index.html#services";
    }
  };

  const mobileNavigationQuery = "(max-width: 1120px)";
  let mobileNavigationReturnFocus = null;

  const compactNavigationActive = () => window.matchMedia(mobileNavigationQuery).matches;

  const setMobileNavigationLock = (locked) => {
    document.documentElement.classList.toggle("nav-menu-open", locked);
    document.body.classList.toggle("nav-menu-open", locked);
  };

  const visibleFocusItems = (container) =>
    [
      ...container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ),
    ].filter((item) => {
      if (item.hidden || item.getAttribute("aria-hidden") === "true") return false;
      const style = window.getComputedStyle(item);
      if (style.display === "none" || style.visibility === "hidden") return false;
      const rect = item.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });

  const closeHeaderNavigation = (header, { restoreFocus = false } = {}) => {
    if (!header) return;
    header.classList.remove("nav-open");
    header.querySelector(".nav-toggle")?.setAttribute("aria-expanded", "false");
    setMobileNavigationLock(false);
    if (restoreFocus && mobileNavigationReturnFocus?.isConnected) {
      mobileNavigationReturnFocus.focus({ preventScroll: true });
    }
    if (restoreFocus) mobileNavigationReturnFocus = null;
  };

  const openHeaderNavigation = (header, opener = null) => {
    if (!header) return;
    header.classList.add("nav-open");
    header.querySelector(".nav-toggle")?.setAttribute("aria-expanded", "true");
    setMobileNavigationLock(compactNavigationActive());
    closeLanguageSelector();
    mobileNavigationReturnFocus = opener || header.querySelector(".nav-toggle");
    requestAnimationFrame(() => header.querySelector("[data-mobile-nav-close]")?.focus({ preventScroll: true }));
  };

  const closeServicesDropdown = (dropdown) => {
    if (!dropdown) return;
    dropdown.classList.remove("open");
    dropdown.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
  };

  const syncHeaderNavigationState = () => {
    const isCompact = compactNavigationActive();
    document.querySelectorAll(".header[data-nav-enhanced='true']").forEach((header) => {
      header.style.setProperty("--header-height", `${Math.ceil(header.getBoundingClientRect().height)}px`);
      const nav = header.querySelector(".nav");
      const dropdown = header.querySelector("[data-services-dropdown]");
      const actions = header.querySelector(".actions, .header-actions");
      const languageSelector = header.querySelector(".language-selector") || nav?.querySelector(".language-selector");
      const languageHome = header.querySelector("[data-language-home]");

      if (languageSelector && languageHome && !actions?.contains(languageSelector)) {
        actions?.insertBefore(languageSelector, languageHome);
      }

      const mobilePhone = nav?.querySelector("[data-nav-mobile-phone]");

      if (mobilePhone) {
        mobilePhone.textContent = directCallViewport() ? phoneActionLabel(documentLang()) : phone;
        mobilePhone.setAttribute("aria-label", mobilePhone.textContent);
      }

      dropdown
        ?.querySelector(".nav-dropdown-toggle")
        ?.setAttribute(
          "aria-expanded",
          String(isCompact ? !dropdown.classList.contains("mobile-collapsed") : dropdown.classList.contains("open"))
        );
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
    const brand = header.querySelector(".brand");
    if (brand) brand.setAttribute("href", `${routeHref("home", navigationLanguage())}#top`);

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
    menuToggle.setAttribute("aria-label", t("menuOpen", lang));

    let mobileChrome = nav.querySelector("[data-mobile-nav-chrome]");
    if (!mobileChrome) {
      mobileChrome = document.createElement("div");
      mobileChrome.className = "mobile-nav-chrome";
      mobileChrome.dataset.mobileNavChrome = "true";
      mobileChrome.innerHTML = `
        <p class="mobile-nav-title"></p>
        <button class="mobile-nav-close" type="button" data-mobile-nav-close></button>
      `;
      nav.insertBefore(mobileChrome, nav.firstChild);
    }
    mobileChrome.querySelector(".mobile-nav-title").textContent = t("services", lang);
    const closeButton = mobileChrome.querySelector("[data-mobile-nav-close]");
    closeButton.textContent = t("menuClose", lang);
    closeButton.setAttribute("aria-label", t("menuClose", lang));

    let dropdown = nav.querySelector("[data-services-dropdown]");
    if (!dropdown) {
      dropdown = document.createElement("div");
      dropdown.className = "nav-dropdown";
      dropdown.dataset.servicesDropdown = "true";
      dropdown.innerHTML = `
        <button class="nav-dropdown-toggle" type="button" aria-haspopup="true" aria-expanded="false"></button>
        <div class="nav-dropdown-menu" role="menu"></div>
      `;
      nav.insertBefore(dropdown, mobileChrome.nextSibling);
    }

    const dropdownToggle = dropdown.querySelector(".nav-dropdown-toggle");
    const dropdownMenu = dropdown.querySelector(".nav-dropdown-menu");
    const servicesLabel = t("services", lang);
    if (dropdownToggle.textContent !== servicesLabel) dropdownToggle.textContent = servicesLabel;

    let mobileTools = nav.querySelector("[data-nav-mobile-tools]");
    if (!mobileTools) {
      mobileTools = document.createElement("div");
      mobileTools.className = "nav-mobile-tools";
      mobileTools.dataset.navMobileTools = "true";
      mobileTools.innerHTML = `<a class="btn primary nav-contact-btn" href="${tel}" data-phone-action data-phone-label data-nav-mobile-phone>${phoneActionLabel(lang)}</a>`;
      nav.appendChild(mobileTools);
    }

    let mobileLanguage = nav.querySelector("[data-nav-mobile-language]");
    if (!mobileLanguage) {
      mobileLanguage = document.createElement("div");
      mobileLanguage.className = "nav-mobile-language";
      mobileLanguage.dataset.navMobileLanguage = "true";
      nav.insertBefore(mobileLanguage, mobileTools);
    }
    const mobileLanguageMarkup = `
      <div class="nav-mobile-section-head">
        <span>${t("languageLabel", lang)}</span>
        <small>${t("languageSelectorHint", lang)}</small>
      </div>
      <div class="nav-mobile-language-list" role="group" aria-label="${t("openLanguageMenu", lang)}">
        ${supportedLanguages
          .map(
            (language) => `
              <button class="nav-mobile-language-option" type="button" data-mobile-language-option="${language.code}" aria-pressed="${String(
                language.code === lang
              )}">
                <span class="flag-icon flag-${language.flag}" aria-hidden="true"></span>
                <span class="language-option-copy"><strong>${language.label}</strong><small>${language.complete}</small></span>
              </button>`
          )
          .join("")}
      </div>`;
    if (mobileLanguage.dataset.renderedLang !== lang) {
      mobileLanguage.innerHTML = mobileLanguageMarkup;
      mobileLanguage.dataset.renderedLang = lang;
    } else {
      mobileLanguage.querySelectorAll("[data-mobile-language-option]").forEach((option) => {
        option.setAttribute("aria-pressed", String(option.dataset.mobileLanguageOption === lang));
      });
    }

    const actions = header.querySelector(".actions, .header-actions");
    if (actions && !actions.querySelector("[data-language-home]")) {
      const languageHome = document.createElement("span");
      languageHome.dataset.languageHome = "true";
      languageHome.hidden = true;
      actions.insertBefore(languageHome, actions.firstChild);
    }

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

    const shouldRenderDropdown =
      dropdownMenu.dataset.renderedLang !== lang ||
      serviceLinks.size > 0 ||
      !!overviewLink ||
      dropdownMenu.children.length !== serviceNavigationItems.length + 1;

    if (shouldRenderDropdown) {
      dropdownMenu.textContent = "";

      const overviewHref = navigationLanguage() === "hu" ? "/hu/#services" : "/#services";
      const overview = overviewLink || document.createElement("a");
      overview.href = overviewHref;
      overview.dataset.textHu = uiText.servicesOverview.hu;
      overview.dataset.textEn = uiText.servicesOverview.en;
      overview.textContent = t("servicesOverview", lang);
      overview.setAttribute("role", "menuitem");
      overview.removeAttribute("aria-current");
      dropdownMenu.appendChild(overview);

      const currentKey = currentRouteKey();
      serviceNavigationItems.forEach((item) => {
        const link =
          serviceLinks.get(item.key) ||
          dropdownMenu.querySelector(`[data-service-nav-item="${item.key}"]`) ||
          document.createElement("a");
        link.href = routeHref(item.key, navigationLanguage());
        link.dataset.serviceNavItem = item.key;
        link.dataset.textHu = item.hu;
        link.dataset.textEn = item.en;
        link.dataset[item.dataset] = "true";
        link.textContent = lang === "hu" ? item.hu : lang === "en" ? item.en : translatePhrase(item.en, lang);
        link.setAttribute("role", "menuitem");
        if (currentKey === item.key) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
        dropdownMenu.appendChild(link);
      });
      dropdownMenu.dataset.renderedLang = lang;
    }

    if (header.dataset.navEventsBound !== "true") {
      header.dataset.navEventsBound = "true";

      menuToggle.addEventListener("click", () => {
        if (header.classList.contains("nav-open")) {
          closeHeaderNavigation(header);
        } else {
          openHeaderNavigation(header, menuToggle);
        }
      });

      dropdownToggle.addEventListener("click", (event) => {
        if (compactNavigationActive()) {
          event.preventDefault();
          const isCollapsed = dropdown.classList.toggle("mobile-collapsed");
          dropdownToggle.setAttribute("aria-expanded", String(!isCollapsed));
          return;
        }
        event.preventDefault();
        const isOpen = dropdown.classList.toggle("open");
        dropdownToggle.setAttribute("aria-expanded", String(isOpen));
      });

      closeButton.addEventListener("click", () => {
        closeHeaderNavigation(header, { restoreFocus: true });
      });

      mobileLanguage.addEventListener("click", (event) => {
        const option = event.target.closest("[data-mobile-language-option]");
        if (!option) return;
        event.preventDefault();
        setLanguage(option.dataset.mobileLanguageOption);
      });

      nav.addEventListener("click", (event) => {
        if (!event.target.closest("a")) return;
        closeHeaderNavigation(header);
        closeServicesDropdown(dropdown);
      });

      document.addEventListener("click", (event) => {
        if (header.contains(event.target) || event.target.closest?.(".nav-toggle, .nav")) return;
        closeHeaderNavigation(header);
        closeServicesDropdown(dropdown);
      });

      document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        closeHeaderNavigation(header, { restoreFocus: true });
        closeServicesDropdown(dropdown);
      });

      header.addEventListener("keydown", (event) => {
        if (event.key !== "Tab" || !header.classList.contains("nav-open") || !compactNavigationActive()) return;
        const focusItems = visibleFocusItems(header);
        if (!focusItems.length) return;
        const first = focusItems[0];
        const last = focusItems[focusItems.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      });

      window.addEventListener("resize", syncHeaderNavigationState, { passive: true });
      window.addEventListener("orientationchange", syncHeaderNavigationState, { passive: true });
    }

    syncHeaderNavigationState();
  };

  let languageReturnFocus = null;
  const closeLanguageSelector = ({ restoreFocus = false } = {}) => {
    document.querySelectorAll(".language-selector.open").forEach((selector) => {
      selector.classList.remove("open");
      selector.querySelector("#langBtn")?.setAttribute("aria-expanded", "false");
    });
    if (restoreFocus && languageReturnFocus?.isConnected) languageReturnFocus.focus({ preventScroll: true });
    if (restoreFocus) languageReturnFocus = null;
  };

  const openLanguageSelector = (selector, trigger = null) => {
    if (!selector) return;
    document.querySelectorAll(".header").forEach((header) => {
      closeHeaderNavigation(header);
      closeServicesDropdown(header.querySelector("[data-services-dropdown]"));
    });
    languageReturnFocus = trigger || selector.querySelector("#langBtn") || null;
    selector.classList.add("open");
    selector.querySelector("#langBtn")?.setAttribute("aria-expanded", "true");
  };

  const renderLanguageSelector = () => {
    const existingButton = document.getElementById("langBtn");
    if (!existingButton) return null;

    const lang = currentLang();
    const activeLanguage = languageInfo(lang);
    let selector = existingButton.closest(".language-selector");
    if (!selector) {
      selector = document.createElement("div");
      selector.className = "language-selector";
      selector.dataset.languageSelector = "true";
      existingButton.replaceWith(selector);
      selector.appendChild(existingButton);
      existingButton.classList.add("language-toggle");
      existingButton.dataset.languageSelectorTrigger = "true";
      existingButton.setAttribute("aria-haspopup", "true");
      existingButton.setAttribute("aria-expanded", "false");
      existingButton.setAttribute("aria-controls", "languageMenu");

      const menu = document.createElement("div");
      menu.className = "language-menu";
      menu.id = "languageMenu";
      menu.setAttribute("role", "menu");
      selector.appendChild(menu);
    }

    const button = selector.querySelector("#langBtn");
    const menu = selector.querySelector(".language-menu");
    button.type = "button";
    button.classList.add("lang", "language-toggle");
    button.dataset.languageSelectorTrigger = "true";
    button.setAttribute("aria-label", t("openLanguageMenu", lang));
    button.setAttribute("aria-expanded", selector.classList.contains("open") ? "true" : "false");
    menu.setAttribute("aria-label", t("languageBadge", lang));
    const buttonMarkup = `
      <span class="language-current">
        <span class="language-current-full">${activeLanguage.label}</span>
        <span class="language-current-short" aria-hidden="true">${activeLanguage.short}</span>
      </span>
      <span class="language-chevron" aria-hidden="true"></span>`;
    if (button.innerHTML !== buttonMarkup) button.innerHTML = buttonMarkup;

    const menuMarkup = supportedLanguages
      .map(
        (language) => `
          <button type="button" role="menuitemradio" data-language-option="${language.code}" aria-checked="${String(language.code === lang)}" aria-label="${language.label} - ${language.complete}">
            <span class="flag-icon flag-${language.flag}" aria-hidden="true"></span>
            <span class="language-option-copy"><strong>${language.label}</strong><small>${language.complete}</small></span>
            <span class="language-option-check" aria-hidden="true">✓</span>
          </button>`
      )
      .join("");
    if (menu.dataset.renderedLang !== lang || menu.children.length !== supportedLanguages.length) {
      menu.innerHTML = menuMarkup;
      menu.dataset.renderedLang = lang;
    } else {
      menu.querySelectorAll("[data-language-option]").forEach((option) => {
        option.setAttribute("aria-checked", String(option.dataset.languageOption === lang));
      });
    }

    const focusLanguageOption = (direction = 1) => {
      const options = [...menu.querySelectorAll("[data-language-option]")];
      if (!options.length) return;
      const focusedIndex = options.indexOf(document.activeElement);
      const activeIndex = options.findIndex((option) => option.dataset.languageOption === currentLang());
      const baseIndex = focusedIndex >= 0 ? focusedIndex : Math.max(activeIndex, 0);
      options[(baseIndex + direction + options.length) % options.length].focus();
    };

    if (selector.dataset.languageEventsBound !== "true") {
      selector.dataset.languageEventsBound = "true";
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (selector.classList.contains("open")) {
          closeLanguageSelector();
        } else {
          closeLanguageSelector();
          openLanguageSelector(selector, button);
        }
      });

      button.addEventListener("keydown", (event) => {
        if (!["ArrowDown", "ArrowUp"].includes(event.key)) return;
        event.preventDefault();
        openLanguageSelector(selector, button);
        focusLanguageOption(event.key === "ArrowDown" ? 1 : -1);
      });

      menu.addEventListener("click", (event) => {
        const option = event.target.closest("[data-language-option]");
        if (!option) return;
        event.preventDefault();
        setLanguage(option.dataset.languageOption);
      });

      selector.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeLanguageSelector({ restoreFocus: true });
          return;
        }

        if (!selector.classList.contains("open")) return;
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault();
          focusLanguageOption(event.key === "ArrowDown" ? 1 : -1);
        } else if (event.key === "Home") {
          event.preventDefault();
          menu.querySelector("[data-language-option]")?.focus();
        } else if (event.key === "End") {
          event.preventDefault();
          [...menu.querySelectorAll("[data-language-option]")].pop()?.focus();
        }
      });
    }

    return selector;
  };

  const translateAttribute = (node, attribute, lang) => {
    const originalKey = `i18nOriginal${attribute.replace(/(^|-)([a-z])/g, (_, __, char) => char.toUpperCase())}`;
    if (node.dataset && node.dataset[originalKey] === undefined) node.dataset[originalKey] = node.getAttribute(attribute) || "";
    const original = node.dataset?.[originalKey] || "";
    if (!original) return;
    node.setAttribute(attribute, lang === "hu" || lang === "en" ? original : translatePhrase(original, lang));
  };

  const applyTextNodeTranslations = (lang) => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (parent.closest("script, style, .language-selector, .nav-mobile-language, [data-lang-panel]")) return NodeFilter.FILTER_REJECT;
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      if (node.__bpsOriginalText === undefined) node.__bpsOriginalText = node.nodeValue;
      node.nodeValue = lang === "hu" || lang === "en" ? node.__bpsOriginalText : translateInlineText(node.__bpsOriginalText, lang);
    });
  };

  const applyPageLanguage = () => {
    const lang = currentLang();
    document.documentElement.lang = languageInfo(lang).html;

    document.querySelectorAll("[data-lang-panel]").forEach((panel) => {
      const panelLang = panel.dataset.langPanel;
      const hasExactPanel = !!panel.parentElement?.querySelector(`[data-lang-panel="${lang}"]`);
      const showPanel = lang === panelLang || (!["hu", "en"].includes(lang) && panelLang === "en" && !hasExactPanel);
      panel.hidden = !showPanel;
      panel.setAttribute("aria-hidden", String(!showPanel));
      // Panels are complete static HTML (including contextual links), so only
      // their visibility changes; rewriting textContent would strip the links.
    });

    document.querySelectorAll("[data-text-hu]").forEach((node) => {
      const source = lang === "hu" ? node.dataset.textHu : node.dataset.textEn || node.dataset.textHu;
      const value = lang === "hu" || lang === "en" ? source : translatePhrase(node.dataset.textEn || source, lang);
      if (value && node.textContent !== value) node.textContent = value;
    });

    document.querySelectorAll("[data-aria-hu]").forEach((node) => {
      const source = lang === "hu" ? node.dataset.ariaHu : node.dataset.ariaEn || node.dataset.ariaHu;
      const value = lang === "hu" || lang === "en" ? source : translatePhrase(node.dataset.ariaEn || source, lang);
      if (value) node.setAttribute("aria-label", value);
    });

    document.querySelectorAll("[data-phone-label]").forEach((node) => {
      const isHeaderPhone = node.closest(".header");
      const value = isHeaderPhone && !directCallViewport() ? phone : phoneActionLabel(lang);
      if (node.textContent !== value) node.textContent = value;
      node.setAttribute("aria-label", value);
    });

    document.querySelectorAll("[aria-label]:not([data-aria-hu])").forEach((node) => translateAttribute(node, "aria-label", lang));
    document.querySelectorAll("img[alt]").forEach((node) => translateAttribute(node, "alt", lang));
    renderLanguageSelector();
    bindLanguageSelectorTriggers();
    applyTextNodeTranslations(lang);
    enhanceHeaderNavigation();
    bindStickyHeaderShadow();
  };

  const syncStickyHeaderShadow = () => {
    document.querySelectorAll(".header").forEach((header) => {
      header.classList.toggle("header-scrolled", window.scrollY > 8);
    });
  };

  const bindStickyHeaderShadow = () => {
    if (document.documentElement.dataset.stickyHeaderBound === "true") return;
    document.documentElement.dataset.stickyHeaderBound = "true";
    syncStickyHeaderShadow();
    window.addEventListener("scroll", syncStickyHeaderShadow, { passive: true });
  };

  const setLanguage = (lang) => {
    const normalized = normalizeLanguage(lang) || fallbackLanguage;
    persistLanguage(normalized);
    closeLanguageSelector();
    if (normalized === "en" || normalized === "hu") {
      const targetHref = routeHref(currentRouteKey(), normalized);
      const target = new URL(targetHref, window.location.origin);
      target.hash = window.location.hash;
      if (target.pathname !== window.location.pathname || target.hash !== window.location.hash) {
        window.location.href = target.href;
        return;
      }
    }
    activeLanguage = normalized;
    window.dispatchEvent(new CustomEvent("bps:languagechange", { detail: { lang: normalized } }));
    applyPageLanguage();
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
      <button class="backdrop" type="button" data-hero-lightbox-close aria-label="${t("closeImage")}"></button>
      <div class="panel" tabindex="-1">
        <button class="close" type="button" data-hero-lightbox-close aria-label="${t("closeImage")}">&times;</button>
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
    modalImage.src = image.src || image.currentSrc;
    modalImage.alt = image.alt || "";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => panel?.focus());
  };

  const bindHeroLightbox = () => {
    document.querySelectorAll(
      ".hero-media, .service-hero-visual, .showcase-photo[data-paint-reveal], .maintenance-showcase-visuals .showcase-photo"
    ).forEach((target) => {
      if (target.dataset.heroLightboxBound === "true") return;

      const image = target.querySelector("img");
      if (!image) return;

      target.dataset.heroLightbox = "true";
      target.dataset.heroLightboxBound = "true";
      target.setAttribute("role", "button");
      target.setAttribute("tabindex", "0");
      target.setAttribute("aria-label", image.alt ? `${t("openImage")}: ${image.alt}` : t("openImage"));

      target.addEventListener("click", (event) => {
        if (
          target.dataset.paintSuppressClick === "true" ||
          target.querySelector('[data-paint-reveal][data-paint-suppress-click="true"]')
        ) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        openHeroLightbox(image, target);
      });
      target.addEventListener("keydown", (event) => {
        if (!["Enter", " "].includes(event.key)) return;
        event.preventDefault();
        openHeroLightbox(image, target);
      });
    });
  };

  const bindPaintReveal = () => {
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const supportsPointerEvents = "PointerEvent" in window;
    const supportsTouchEvents = "ontouchstart" in window || (typeof TouchEvent !== "undefined" && navigator.maxTouchPoints > 0);
    const coarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches === true;
    const localDebugHost = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);
    const forceTouchInput = localDebugHost && /(?:^|[?&])paintInput=touch(?:&|$)/.test(window.location.search);
    const forceMouseInput = localDebugHost && /(?:^|[?&])paintInput=mouse(?:&|$)/.test(window.location.search);
    const canUseTouchFallback = !supportsPointerEvents && (supportsTouchEvents || (localDebugHost && typeof TouchEvent !== "undefined"));
    const usePointerInput = !forceMouseInput && supportsPointerEvents;
    const useTouchFallback = !forceMouseInput && !usePointerInput && canUseTouchFallback && (forceTouchInput || coarsePointer || supportsTouchEvents);
    const useMouseFallback = forceMouseInput || (!usePointerInput && !useTouchFallback);
    const paintDebugEnabled =
      localDebugHost && /(?:^|[?&])paintDebug=1(?:&|$)/.test(window.location.search);
    const interactiveLimit = 6;
    const activeRoots = [...document.querySelectorAll("[data-paint-reveal]")].filter((root) => {
      const insideComparison = root.closest(
        "[data-compare], .compare, .hero-mini-compare, .hero-before-after-card, .transformation-visual, .case-preview"
      );
      const ownsComparison = root.matches("[data-compare], .compare") || root.querySelector("[data-compare], .compare");
      return !insideComparison && !ownsComparison;
    });
    paintDebug.log("paint-bind-started", {
      activeRootCount: activeRoots.length,
      supportsPointerEvents,
      supportsTouchEvents,
      coarsePointer,
      usePointerInput,
      useTouchFallback,
      useMouseFallback,
      maxTouchPoints: navigator.maxTouchPoints || 0,
      pointerCoarse: window.matchMedia?.("(pointer: coarse)")?.matches === true,
    });

    const modeAliases = {
      blue: "paintBlue",
      plaster: "repair",
      surface: "repair",
      sage: "garden",
      airbnb: "airbnb",
    };

    const paintModes = {
      paint: {
        color: "#c86436",
        opacity: 1,
        shadow: "rgba(92, 34, 15, 0.16)",
        highlight: "rgba(255, 216, 184, 0.1)",
        accent: "#a84b2a",
        effect: "color",
        icon: "roller",
        preview: false,
        material: {
          webp: "assets/paint-showcase-galaxy-night-mural.webp",
          fallback: "assets/paint-showcase-galaxy-night-mural.jpg",
        },
        hint: {
          hu: "Fesd át a falat az ujjaddal",
          en: "Paint the wall with your finger",
          de: "Streichen Sie die Wand mit dem Finger",
          uk: "Пофарбуйте стіну пальцем",
          "zh-CN": "用手指粉刷墙面",
        },
      },
      paintBlue: {
        color: "#c86436",
        opacity: 1,
        shadow: "rgba(92, 34, 15, 0.16)",
        highlight: "rgba(255, 216, 184, 0.1)",
        accent: "#a84b2a",
        effect: "color",
        icon: "roller",
        preview: false,
        material: {
          webp: "assets/paint-showcase-galaxy-night-mural.webp",
          fallback: "assets/paint-showcase-galaxy-night-mural.jpg",
        },
        hint: {
          hu: "Fesd át a falat az ujjaddal",
          en: "Paint the wall with your finger",
          de: "Streichen Sie die Wand mit dem Finger",
          uk: "Пофарбуйте стіну пальцем",
          "zh-CN": "用手指粉刷墙面",
        },
      },
      clean: {
        color: "#f7fbf7",
        opacity: 0.72,
        shadow: "rgba(32, 74, 68, 0.08)",
        highlight: "rgba(255, 255, 255, 0.24)",
        accent: "#4c8b86",
        effect: "clean",
        icon: "wipe",
        preview: true,
        hint: {
          hu: "Töröld tisztára a felületet",
          en: "Wipe the surface clean",
          de: "Wischen Sie die Fläche sauber",
          uk: "Витріть поверхню начисто",
          "zh-CN": "擦净表面",
        },
      },
      repair: {
        color: "#ddd2c1",
        opacity: 0.88,
        shadow: "rgba(111, 91, 68, 0.1)",
        highlight: "rgba(255, 255, 255, 0.16)",
        accent: "#a99174",
        effect: "repair",
        icon: "trowel",
        preview: false,
        hint: {
          hu: "Simítsd el a hibákat",
          en: "Smooth out the damage",
          de: "Glätten Sie die Schäden",
          uk: "Вирівняйте пошкодження",
          "zh-CN": "抹平损伤",
        },
      },
      garden: {
        color: "#6f935d",
        opacity: 0.68,
        shadow: "rgba(44, 80, 43, 0.13)",
        highlight: "rgba(233, 246, 214, 0.12)",
        accent: "#5f8b4e",
        effect: "garden",
        icon: "leaf",
        preview: true,
        hint: {
          hu: "Frissítsd fel a kertet",
          en: "Refresh the garden",
          de: "Frischen Sie den Garten auf",
          uk: "Оновіть сад",
          "zh-CN": "刷新花园",
        },
      },
      airbnb: {
        color: "#d9a46f",
        opacity: 0.58,
        shadow: "rgba(102, 70, 43, 0.08)",
        highlight: "rgba(255, 241, 216, 0.18)",
        accent: "#c78955",
        effect: "airbnb",
        icon: "spark",
        preview: true,
        hint: {
          hu: "Tedd vendégfogadásra késszé",
          en: "Make it guest-ready",
          de: "Machen Sie es gastbereit",
          uk: "Підготуйте до гостей",
          "zh-CN": "让它适合待客",
        },
      },
    };

    activeRoots.slice(0, interactiveLimit).forEach((root, index) => {
      const componentId =
        root.dataset.paintDebugId ||
        root.id ||
        `paint-${index + 1}-${(root.dataset.paintMode || "paint").toLowerCase()}`;
      root.dataset.paintDebugId = componentId;
      const paintLog = (event, details = {}) =>
        {
          try {
            return paintDebug.log(event, {
              componentId,
              rootClass: root.className || "",
              inputMode: root.dataset.paintInputMode || "",
              ...details,
            });
          } catch (error) {
            if (paintDebugEnabled) console.warn("[paint-reveal] diagnostic log failed", error);
            return null;
          }
        };

      paintLog("component-init-started", {
        alreadyBound: root.dataset.paintRevealBound === "true",
        requestedMode: root.dataset.paintMode || "paint",
      });

      if (root.dataset.paintRevealBound === "true") {
        paintLog("component-init-skipped-already-bound");
        return;
      }
      root.dataset.paintRevealBound = "true";
      root.dataset.paintInputMode =
        [
          usePointerInput && "pointer",
          useTouchFallback && "touch",
          useMouseFallback && "mouse",
        ]
          .filter(Boolean)
          .join("+") || "none";
      if (reducedMotion) root.dataset.paintReducedMotion = "true";

      const image = root.dataset.paintImageSelector
        ? root.querySelector(root.dataset.paintImageSelector)
        : root.querySelector("img");
      if (!image) {
        paintLog("component-init-aborted-no-image");
        return;
      }
      paintLog("image-state", {
        stage: "init",
        complete: image.complete,
        naturalWidth: image.naturalWidth || 0,
        naturalHeight: image.naturalHeight || 0,
        currentSrc: image.currentSrc || image.src || "",
      });
      image.draggable = false;

      const parsePolygons = (value = "") =>
        value
          .split(";")
          .map((group) =>
            group
              .trim()
              .split(/\s+/)
              .map((pair) => {
                const [x, y] = pair.split(",").map(Number);
                return Number.isFinite(x) && Number.isFinite(y) ? { x, y } : null;
              })
              .filter(Boolean)
          )
          .filter((polygon) => polygon.length >= 3);

      const includePolygons = parsePolygons(root.dataset.paintRegions || root.dataset.paintRegion || "");
      const excludePolygons = parsePolygons(root.dataset.paintExclude || "");

      if (!includePolygons.length) {
        root.dataset.paintRevealDisabled = "true";
        paintLog("component-init-aborted-no-mask");
        return;
      }

      const canvas = document.createElement("canvas");
      canvas.className = "paint-reveal-canvas";
      canvas.setAttribute("aria-hidden", "true");
      canvas.style.touchAction = "none";
      root.appendChild(canvas);

      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) {
        canvas.remove();
        root.dataset.paintRevealDisabled = "true";
        paintLog("component-init-aborted-no-canvas-context");
        return;
      }

      const layerCanvas = document.createElement("canvas");
      const maskCanvas = document.createElement("canvas");
      const wallMaskCanvas = document.createElement("canvas");
      const layerCtx = layerCanvas.getContext("2d", { alpha: true });
      const maskCtx = maskCanvas.getContext("2d", { alpha: true });
      const wallMaskCtx = wallMaskCanvas.getContext("2d", { alpha: true });
      if (!layerCtx || !maskCtx || !wallMaskCtx) {
        canvas.remove();
        root.dataset.paintRevealDisabled = "true";
        paintLog("component-init-aborted-no-layer-context");
        return;
      }

      const rawPaintMode = root.dataset.paintMode || "paint";
      const paintMode = modeAliases[rawPaintMode] || rawPaintMode;
      const activePalette = paintModes[paintMode] || paintModes.paint;
      const paintColor = root.dataset.paintColor || activePalette.color;
      const paintOpacity = Number(root.dataset.paintOpacity) || activePalette.opacity;
      const paintHighlightColor = root.dataset.paintHighlightColor || activePalette.highlight;
      const baseBrushSize = Math.max(40, Number(root.dataset.paintBrush) || 122);
      const fadeDelay = Number(root.dataset.paintFadeDelay) || 4000;
      root.style.setProperty("--paint-reveal-accent", root.dataset.paintAccent || activePalette.accent);
      root.dataset.paintMode = paintMode;
      root.dataset.paintIcon = activePalette.icon;
      const materialSources = activePalette.material || null;
      let materialImage = null;
      let materialImageReady = false;
      let materialImageFallbackTried = false;
      let refreshMaterialAfterLoad = () => {};
      const loadMaterialImage = (source) => {
        if (!source) return;
        materialImageReady = false;
        materialImage = new Image();
        materialImage.decoding = "async";
        if ("fetchPriority" in materialImage) materialImage.fetchPriority = "low";
        materialImage.onload = () => {
          materialImageReady = true;
          if (root.classList.contains("paint-reveal-used")) refreshMaterialAfterLoad();
          paintLog("paint-material-image-loaded", {
            source,
            width: materialImage.naturalWidth || 0,
            height: materialImage.naturalHeight || 0,
          });
        };
        materialImage.onerror = () => {
          paintLog("paint-material-image-error", { source });
          if (!materialImageFallbackTried && materialSources?.fallback && source !== materialSources.fallback) {
            materialImageFallbackTried = true;
            loadMaterialImage(materialSources.fallback);
          }
        };
        materialImage.src = new URL(source, scriptBaseUrl).href;
      };
      if (materialSources?.webp || materialSources?.fallback) {
        loadMaterialImage(materialSources.webp || materialSources.fallback);
      }
      const clickSuppressionTargets = [
        root,
        root.closest("[data-hero-lightbox]"),
      ].filter(Boolean);
      let cssWidth = 1;
      let cssHeight = 1;
      let brushSize = baseBrushSize;
      let ratio = 1;
      let pending = null;
      let activePointer = null;
      let lastPoint = null;
      let queuedPoint = null;
      let strokeFrame = 0;
      let renderFrame = 0;
      let fadeTimer = 0;
      let clearTimer = 0;
      let blockNextClick = false;
      let unblockClickTimer = 0;
      let resizeFrame = 0;
      let pointerCaptureActive = false;
      let pointerFallbackBound = false;
      let mouseIsDown = false;
      let suppressClickUntil = 0;
      let previewTimer = 0;
      let previewFrame = 0;
      let demoIndicator = null;
      let demoHideTimer = 0;
      let paintMaterialReady = false;
      let autoPreviewStarted = false;
      let imageReadyResetQueued = false;
      let canvasResetAttempts = 0;
      let lastCanvasResetAttempts = 0;
      let canvasResetStartedAt = 0;
      const maxCanvasResetAttempts = 18;
      const maxCanvasResetDuration = 2800;
      const activationThreshold = 5;
      const dragThreshold = 5;
      let activeInputFamily = null;
      let touchPaintPointerId = null;
      let paintStartPipelineSequence = 0;
      let firstPointerMoveTraced = false;

      const inputGestureActive = () => activePointer !== null || pending !== null;
      const canUseInputFamily = (family) => !inputGestureActive() || activeInputFamily === family;

      const roundedPoint = (point) =>
        point
          ? {
              x: Math.round(point.x),
              y: Math.round(point.y),
            }
          : null;

      const imageSnapshot = (stage = "") => ({
        stage,
        complete: image.complete,
        naturalWidth: image.naturalWidth || 0,
        naturalHeight: image.naturalHeight || 0,
        currentSrc: image.currentSrc || image.src || "",
      });

      const canvasSnapshot = () => {
        const rect = canvas.getBoundingClientRect();
        return {
          cssWidth,
          cssHeight,
          backingWidth: canvas.width,
          backingHeight: canvas.height,
          ratio,
          rect: {
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            left: Math.round(rect.left),
            top: Math.round(rect.top),
          },
        };
      };

      const gestureSnapshot = () => ({
        activeInputFamily,
        activePointer,
        pending: pending
          ? {
              id: pending.id,
              mode: pending.mode,
              pointerType: pending.pointerType,
              insideWall: pending.insideWall,
              dragged: pending.dragged,
              start: roundedPoint(pending.start),
              last: roundedPoint(pending.last),
            }
          : null,
        lastPoint: roundedPoint(lastPoint),
        queuedPoint: roundedPoint(queuedPoint),
        pointerCaptureActive,
        mouseIsDown,
        paintGesture: root.dataset.paintGesture || "",
        ready: root.classList.contains("paint-reveal-ready"),
        active: root.classList.contains("paint-reveal-active"),
        hit: root.classList.contains("paint-reveal-hit"),
      });

      const targetSnapshot = (target) => ({
        tag: target?.tagName || "",
        id: target?.id || "",
        className: typeof target?.className === "string" ? target.className : String(target?.className || ""),
        isCanvas: target === canvas,
        isImage: target === image,
      });

      const pointerEventDetails = (event) => ({
        pointerId: event.pointerId,
        pointerType: event.pointerType || "",
        isPrimary: event.isPrimary,
        button: event.button,
        buttons: event.buttons,
        cancelable: event.cancelable,
        clientX: Math.round(event.clientX || 0),
        clientY: Math.round(event.clientY || 0),
        target: targetSnapshot(event.target),
      });

      const touchEventDetails = (event) => {
        const changed = event.changedTouches?.[0];
        return {
          cancelable: event.cancelable,
          touches: event.touches?.length || 0,
          changedTouches: event.changedTouches?.length || 0,
          touchIdentifier: changed?.identifier,
          clientX: changed ? Math.round(changed.clientX) : null,
          clientY: changed ? Math.round(changed.clientY) : null,
          target: targetSnapshot(event.target),
        };
      };

      const describeProbeNode = (node) => {
        if (!node) return { summary: "none" };
        if (node === window) return { summary: "window" };
        if (node === document) return { summary: "document" };
        if (node === document.documentElement) return { summary: "html", tag: "HTML" };
        if (node === document.body) return { summary: "body", tag: "BODY" };
        const tag = node.tagName || node.nodeName || "node";
        const id = node.id ? `#${node.id}` : "";
        const className =
          typeof node.className === "string"
            ? node.className.trim()
            : typeof node.getAttribute === "function"
              ? node.getAttribute("class") || ""
              : "";
        const classes = className
          ? `.${className
              .split(/\s+/)
              .filter(Boolean)
              .slice(0, 5)
              .join(".")}`
          : "";
        const closestPaintRoot =
          typeof node.closest === "function" ? node.closest("[data-paint-reveal]") : null;
        return {
          summary: `${String(tag).toLowerCase()}${id}${classes}`,
          tag,
          id: node.id || "",
          className,
          role: typeof node.getAttribute === "function" ? node.getAttribute("role") || "" : "",
          href: typeof node.getAttribute === "function" ? node.getAttribute("href") || "" : "",
          dataPaintReveal: typeof node.hasAttribute === "function" ? node.hasAttribute("data-paint-reveal") : false,
          dataHeroLightbox: typeof node.hasAttribute === "function" ? node.hasAttribute("data-hero-lightbox") : false,
          dataPaintDebugId: closestPaintRoot?.dataset.paintDebugId || "",
          isRoot: node === root,
          isCanvas: node === canvas,
          isImage: node === image,
        };
      };

      const probePointFromEvent = (event) => {
        if (event.changedTouches?.length) {
          const touch = event.changedTouches[0];
          return { clientX: Math.round(touch.clientX), clientY: Math.round(touch.clientY) };
        }
        if (event.touches?.length) {
          const touch = event.touches[0];
          return { clientX: Math.round(touch.clientX), clientY: Math.round(touch.clientY) };
        }
        if (typeof event.clientX === "number" && typeof event.clientY === "number") {
          return { clientX: Math.round(event.clientX), clientY: Math.round(event.clientY) };
        }
        return { clientX: null, clientY: null };
      };

      const computedProbeSnapshot = (node) => {
        if (!node || node === window || node === document || node.nodeType !== 1) return null;
        const rect = node.getBoundingClientRect();
        const styles = window.getComputedStyle(node);
        return {
          rect: {
            left: Math.round(rect.left),
            top: Math.round(rect.top),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          },
          position: styles.position,
          zIndex: styles.zIndex,
          pointerEvents: styles.pointerEvents,
          touchAction: styles.touchAction,
          display: styles.display,
          visibility: styles.visibility,
          opacity: styles.opacity,
        };
      };

      const inputSurfaceSnapshot = (clientX, clientY) => {
        if (!paintDebugPanelEnabled() || clientX === null || clientY === null) return null;
        const pointX = Number(clientX);
        const pointY = Number(clientY);
        const hit =
          Number.isFinite(pointX) && Number.isFinite(pointY)
            ? document.elementFromPoint(pointX, pointY)
            : null;
        const hitStack =
          Number.isFinite(pointX) && Number.isFinite(pointY) && typeof document.elementsFromPoint === "function"
            ? document.elementsFromPoint(pointX, pointY)
                .slice(0, 12)
                .map((node) => ({
                  ...describeProbeNode(node),
                  computed: computedProbeSnapshot(node),
                }))
            : [];
        return {
          elementFromPoint: describeProbeNode(hit),
          elementsFromPoint: hitStack,
          imageComputed: computedProbeSnapshot(image),
          canvasComputed: computedProbeSnapshot(canvas),
          rootComputed: computedProbeSnapshot(root),
          wrapperComputed: computedProbeSnapshot(image.parentElement || root),
        };
      };

      const installInputProbe = () => {
        if (!paintDebugPanelEnabled() || root.dataset.paintInputProbeBound === "true") return;
        root.dataset.paintInputProbeBound = "true";

        const logProbe = (scope) => (event) => {
          const point = probePointFromEvent(event);
          const hit =
            point.clientX === null || point.clientY === null
              ? null
              : document.elementFromPoint(point.clientX, point.clientY);
          const hitStack =
            point.clientX === null || point.clientY === null || typeof document.elementsFromPoint !== "function"
              ? []
              : document.elementsFromPoint(point.clientX, point.clientY)
                  .slice(0, 12)
                  .map((node) => ({
                    ...describeProbeNode(node),
                    computed: computedProbeSnapshot(node),
                  }));

          paintLog(`input-probe-${scope}-${event.type}`, {
            scope,
            eventType: event.type,
            pointerId: event.pointerId,
            pointerType: event.pointerType || (event.type.startsWith("touch") ? "touch" : ""),
            clientX: point.clientX,
            clientY: point.clientY,
            cancelable: event.cancelable,
            defaultPrevented: event.defaultPrevented,
            target: describeProbeNode(event.target),
            currentTarget: scope,
            currentTargetNode: describeProbeNode(event.currentTarget),
            elementFromPoint: describeProbeNode(hit),
            elementsFromPoint: hitStack,
            canvasComputed: computedProbeSnapshot(canvas),
            rootComputed: computedProbeSnapshot(root),
            canvas: canvasSnapshot(),
            image: imageSnapshot("input-probe"),
            gesture: gestureSnapshot(),
            ready: root.classList.contains("paint-reveal-ready"),
          });
        };

        const pointerOptions = { capture: true, passive: true };
        const touchOptions = { capture: true, passive: true };
        [
          [window, "window"],
          [document, "document"],
          [root, "paint-root"],
          [canvas, "canvas"],
        ].forEach(([target, scope]) => {
          ["pointerdown", "pointermove", "pointerup", "pointercancel"].forEach((eventName) => {
            target.addEventListener(eventName, logProbe(scope), pointerOptions);
          });
          ["touchstart", "touchmove", "touchend", "touchcancel"].forEach((eventName) => {
            target.addEventListener(eventName, logProbe(scope), touchOptions);
          });
        });

        paintLog("input-probe-installed", {
          scopes: ["window", "document", "paint-root", "canvas"],
          events: paintInputEventNames,
          canvasComputed: computedProbeSnapshot(canvas),
          rootComputed: computedProbeSnapshot(root),
        });
      };

      const runPaintEvent = (eventName, event, details, callback) => {
        const before = gestureSnapshot();
        const surface = inputSurfaceSnapshot(details.clientX, details.clientY);
        paintLog(`${eventName}-received`, {
          ...details,
          ...(surface ? { surface } : {}),
          before,
        });
        try {
          return callback();
        } catch (error) {
          paintLog("caught-exception", {
            source: eventName,
            error: paintDebugError(error),
            before,
            after: gestureSnapshot(),
          });
          throw error;
        } finally {
          paintLog(`${eventName}-completed`, {
            ...details,
            ...(surface ? { surface } : {}),
            before,
            after: gestureSnapshot(),
          });
        }
      };

      const debugPaint = (eventName, details = {}) => {
        const imageRect = image.getBoundingClientRect();
        const payload = {
          inputMode: root.dataset.paintInputMode,
          mode: paintMode,
          gesture: root.dataset.paintGesture || "",
          css: { width: cssWidth, height: cssHeight },
          backing: { width: canvas.width, height: canvas.height },
          ratio,
          imageLoaded: image.complete && !!image.naturalWidth,
          imageRect: {
            width: Math.round(imageRect.width),
            height: Math.round(imageRect.height),
          },
          ready: root.classList.contains("paint-reveal-ready"),
          ...details,
        };
        paintLog(eventName, {
          ...payload,
          snapshot: {
            image: imageSnapshot(eventName),
            canvas: canvasSnapshot(),
            gesture: gestureSnapshot(),
          },
        });
        if (paintDebugEnabled) console.info("[paint-reveal]", eventName, payload);
      };

      const readinessSnapshot = () => {
        const imageRect = image.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        const imageLoaded = image.complete && image.naturalWidth > 0 && image.naturalHeight > 0;
        return {
          imageLoaded,
          naturalWidth: image.naturalWidth || 0,
          naturalHeight: image.naturalHeight || 0,
          imageRectWidth: Math.round(imageRect.width),
          imageRectHeight: Math.round(imageRect.height),
          canvasCssWidth: Math.round(canvasRect.width),
          canvasCssHeight: Math.round(canvasRect.height),
          canvasBackingWidth: canvas.width,
          canvasBackingHeight: canvas.height,
          ready: root.classList.contains("paint-reveal-ready"),
          resetAttemptCount: lastCanvasResetAttempts || canvasResetAttempts,
          resetQueued: imageReadyResetQueued,
        };
      };

      const reportReadinessStatus = (eventName, details = {}) => {
        const readiness = readinessSnapshot();
        root.dataset.paintImageLoaded = readiness.imageLoaded ? "true" : "false";
        root.dataset.paintImageNatural = `${readiness.naturalWidth}x${readiness.naturalHeight}`;
        root.dataset.paintImageRect = `${readiness.imageRectWidth}x${readiness.imageRectHeight}`;
        root.dataset.paintCanvasCss = `${readiness.canvasCssWidth}x${readiness.canvasCssHeight}`;
        root.dataset.paintCanvasBacking = `${readiness.canvasBackingWidth}x${readiness.canvasBackingHeight}`;
        root.dataset.paintReady = readiness.ready ? "true" : "false";
        root.dataset.paintResetAttempts = String(readiness.resetAttemptCount);
        debugPaint(eventName, {
          readiness,
          ...details,
        });
      };

      const ensurePaintHint = () => {
        let hint = root.querySelector(".paint-reveal-hint");
        if (!hint) {
          hint = document.createElement("div");
          hint.className = "paint-reveal-hint";
          hint.setAttribute("aria-hidden", "true");
          root.appendChild(hint);
        }
        hint.dataset.paintHintMode = paintMode;
        const markup = Object.entries(activePalette.hint)
          .map(
            ([lang, text]) =>
              `<span data-lang-panel="${lang}"${lang === currentLang() ? "" : " hidden"}>${text}</span>`
          )
          .join("");
        if (hint.dataset.paintHintRendered !== paintMode) {
          hint.innerHTML = markup;
          hint.dataset.paintHintRendered = paintMode;
        }
      };

      ensurePaintHint();

      const getImagePaintRect = () => {
        const naturalWidth = image.naturalWidth || 1;
        const naturalHeight = image.naturalHeight || 1;
        const objectFit = window.getComputedStyle(image).objectFit;
        const useContain = objectFit === "contain" || objectFit === "scale-down";
        const useCover = objectFit === "cover";
        if (!useContain && !useCover) {
          return {
            x: 0,
            y: 0,
            width: cssWidth,
            height: cssHeight,
          };
        }

        const scale = useCover
          ? Math.max(cssWidth / naturalWidth, cssHeight / naturalHeight)
          : Math.min(cssWidth / naturalWidth, cssHeight / naturalHeight);
        const width = naturalWidth * scale;
        const height = naturalHeight * scale;
        return {
          x: (cssWidth - width) / 2,
          y: (cssHeight - height) / 2,
          width,
          height,
        };
      };

      const normalToCanvas = (point) => {
        const cover = getImagePaintRect();
        return {
          x: cover.x + point.x * cover.width,
          y: cover.y + point.y * cover.height,
        };
      };

      const canvasToNormal = (point) => {
        const cover = getImagePaintRect();
        return {
          x: (point.x - cover.x) / cover.width,
          y: (point.y - cover.y) / cover.height,
        };
      };

      const pointInPolygon = (point, polygon) => {
        let inside = false;
        for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index++) {
          const currentPoint = polygon[index];
          const previousPoint = polygon[previous];
          const intersects =
            currentPoint.y > point.y !== previousPoint.y > point.y &&
            point.x <
              ((previousPoint.x - currentPoint.x) * (point.y - currentPoint.y)) /
                (previousPoint.y - currentPoint.y) +
                currentPoint.x;
          if (intersects) inside = !inside;
        }
        return inside;
      };

      const pointInsideWall = (point) => {
        const normal = canvasToNormal(point);
        if (normal.x < 0 || normal.x > 1 || normal.y < 0 || normal.y > 1) return false;
        const included = includePolygons.some((polygon) => pointInPolygon(normal, polygon));
        const excluded = excludePolygons.some((polygon) => pointInPolygon(normal, polygon));
        return included && !excluded;
      };

      const localPointFromClient = (clientX, clientY) => {
        const rect = canvas.getBoundingClientRect();
        return {
          x: clientX - rect.left,
          y: clientY - rect.top,
        };
      };

      const localPoint = (event) => localPointFromClient(event.clientX, event.clientY);

      const addPolygonPath = (context, polygon) => {
        polygon.forEach((point, index) => {
          const canvasPoint = normalToCanvas(point);
          if (index === 0) {
            context.moveTo(canvasPoint.x, canvasPoint.y);
          } else {
            context.lineTo(canvasPoint.x, canvasPoint.y);
          }
        });
        context.closePath();
      };

      const clearCanvas = () => {
        ctx.clearRect(0, 0, cssWidth, cssHeight);
      };

      const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

      const drawImageTo = (context) => {
        const cover = getImagePaintRect();
        context.drawImage(image, cover.x, cover.y, cover.width, cover.height);
      };

      const drawCoverSourceTo = (context, source) => {
        const cover = getImagePaintRect();
        const sourceWidth = source.naturalWidth || source.videoWidth || source.width || 0;
        const sourceHeight = source.naturalHeight || source.videoHeight || source.height || 0;
        if (!sourceWidth || !sourceHeight || !cover.width || !cover.height) return false;
        const scale = Math.max(cover.width / sourceWidth, cover.height / sourceHeight);
        const cropWidth = cover.width / scale;
        const cropHeight = cover.height / scale;
        const cropX = (sourceWidth - cropWidth) / 2;
        const cropY = (sourceHeight - cropHeight) / 2;
        context.drawImage(source, cropX, cropY, cropWidth, cropHeight, cover.x, cover.y, cover.width, cover.height);
        return true;
      };

      const buildWallMask = () => {
        wallMaskCtx.clearRect(0, 0, cssWidth, cssHeight);
        wallMaskCtx.save();
        wallMaskCtx.fillStyle = "#fff";
        wallMaskCtx.beginPath();
        includePolygons.forEach((polygon) => addPolygonPath(wallMaskCtx, polygon));
        excludePolygons.forEach((polygon) => addPolygonPath(wallMaskCtx, polygon));
        try {
          wallMaskCtx.fill("evenodd");
        } catch (error) {
          paintLog("caught-exception", {
            source: "buildWallMask.fill-evenodd",
            error: paintDebugError(error),
          });
          wallMaskCtx.fill();
        }
        wallMaskCtx.restore();
      };

      const buildPaintMaterial = () => {
        if (paintDebugPanelEnabled()) {
          debugPaint("buildPaintMaterial-entered", {
            paintMaterialReady,
          });
        }
        layerCtx.clearRect(0, 0, cssWidth, cssHeight);

        if (materialImageReady && materialImage && drawCoverSourceTo(layerCtx, materialImage)) {
          layerCtx.save();
          layerCtx.globalCompositeOperation = "multiply";
          layerCtx.globalAlpha = 0.18;
          drawImageTo(layerCtx);
          layerCtx.globalCompositeOperation = "screen";
          layerCtx.globalAlpha = 0.08;
          drawImageTo(layerCtx);
          layerCtx.globalCompositeOperation = "source-atop";
          layerCtx.globalAlpha = 0.08;
          layerCtx.fillStyle = "rgba(12, 23, 49, 0.7)";
          layerCtx.fillRect(0, 0, cssWidth, cssHeight);
          layerCtx.restore();
        } else {
          drawImageTo(layerCtx);

          const strength = clamp(paintOpacity, activePalette.effect === "color" ? 0.92 : 0.58, 0.98);
          layerCtx.save();
          layerCtx.globalCompositeOperation = "source-atop";
          layerCtx.globalAlpha = strength;
          layerCtx.fillStyle = paintColor;
          layerCtx.fillRect(0, 0, cssWidth, cssHeight);

          if (activePalette.effect === "color") {
            layerCtx.globalCompositeOperation = "multiply";
            layerCtx.globalAlpha = 0.16;
            drawImageTo(layerCtx);
            layerCtx.globalCompositeOperation = "screen";
            layerCtx.globalAlpha = 0.06;
            layerCtx.fillStyle = paintHighlightColor;
            layerCtx.fillRect(0, 0, cssWidth, cssHeight);
          } else {
            layerCtx.globalCompositeOperation = "source-atop";
            layerCtx.globalAlpha = 0.12;
            layerCtx.fillStyle = paintHighlightColor;
            layerCtx.fillRect(0, 0, cssWidth, cssHeight);
          }
          layerCtx.restore();
        }
        layerCtx.globalCompositeOperation = "source-over";
        layerCtx.globalAlpha = 1;
        paintMaterialReady = true;
        if (paintDebugPanelEnabled()) {
          debugPaint("buildPaintMaterial-completed", {
            paintMaterialReady,
          });
        }
      };

      const renderPaintedWall = () => {
        renderFrame = 0;
        if (!paintMaterialReady) {
          if (paintDebugPanelEnabled()) {
            logInputEarlyReturn("renderPaintedWall", "paint-material-not-ready");
          }
          return;
        }
        clearCanvas();
        ctx.save();
        ctx.drawImage(layerCanvas, 0, 0, cssWidth, cssHeight);
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(maskCanvas, 0, 0, cssWidth, cssHeight);
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(wallMaskCanvas, 0, 0, cssWidth, cssHeight);
        ctx.restore();
        ctx.globalCompositeOperation = "source-over";
        if (paintDebugPanelEnabled()) {
          debugPaint("canvas-pixels-modified", {
            paintMaterialReady,
          });
        }
        logPaintStartPipeline("first-draw-operation-executed", {
          firstDrawExecuted: true,
          revealAtCalled: true,
          paintMaterialReady,
        });
      };

      const requestRender = () => {
        if (renderFrame) return;
        renderFrame = window.requestAnimationFrame(renderPaintedWall);
      };

      refreshMaterialAfterLoad = () => {
        paintMaterialReady = false;
        buildPaintMaterial();
        requestRender();
      };

      const randomUnit = (seed) => {
        const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
        return value - Math.floor(value);
      };

      const paintRollerSegment = (from, to) => {
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 1) {
          if (paintDebugPanelEnabled()) {
            logInputEarlyReturn("paintRollerSegment", "distance-below-one-pixel", {
              from: roundedPoint(from),
              to: roundedPoint(to),
              distance,
            });
          }
          return;
        }
        if (paintDebugPanelEnabled()) {
          debugPaint("revealAt-called", {
            from: roundedPoint(from),
            to: roundedPoint(to),
            distance,
          });
        }
        logPaintStartPipeline("revealAt-called", {
          revealAtCalled: true,
          from: roundedPoint(from),
          to: roundedPoint(to),
          distance,
        });
        const angle = Math.atan2(dy, dx);
        const tangent = { x: Math.cos(angle), y: Math.sin(angle) };
        const normal = { x: -Math.sin(angle), y: Math.cos(angle) };
        const isRoller = activePalette.effect === "color";
        const rollerWidth = brushSize * (isRoller ? 1.05 : 0.7);
        const laneCount = isRoller ? 34 : 18;
        const baseSeed = from.x * 0.17 + from.y * 0.23 + to.x * 0.31 + to.y * 0.29;
        const segmentCount = Math.max(3, Math.ceil(distance / Math.max(8, brushSize * 0.16)));

        maskCtx.save();
        maskCtx.globalCompositeOperation = "source-over";
        maskCtx.lineCap = "round";
        maskCtx.lineJoin = "round";

        const strokeOrganicLane = (offset, width, alpha, seed, waveAmount = 0.012) => {
          const startRunout = (randomUnit(seed + 13.9) - 0.5) * brushSize * 0.1;
          const endRunout = (randomUnit(seed + 17.2) - 0.5) * brushSize * 0.1;
          const frequency = 1.1 + randomUnit(seed + 0.37) * 1.05;
          const phase = randomUnit(seed + 19.7) * Math.PI;

          maskCtx.strokeStyle = `rgba(255,255,255,${alpha})`;
          maskCtx.lineWidth = Math.max(2.5, width);
          maskCtx.beginPath();

          for (let segment = 0; segment <= segmentCount; segment += 1) {
            const t = segment / segmentCount;
            const along = startRunout * (1 - t) + endRunout * t;
            const wave =
              Math.sin(t * Math.PI * 2 * frequency + phase) *
              brushSize *
              waveAmount *
              (0.68 + randomUnit(seed + segment * 4.11) * 0.42);
            const x = from.x + dx * t + tangent.x * along + normal.x * (offset + wave);
            const y = from.y + dy * t + tangent.y * along + normal.y * (offset + wave);
            if (segment === 0) {
              maskCtx.moveTo(x, y);
            } else {
              maskCtx.lineTo(x, y);
            }
          }
          maskCtx.stroke();
        };

        if (isRoller) {
          for (let pass = 0; pass < 6; pass += 1) {
            const passSeed = baseSeed + 120 + pass * 9.7;
            const offset = (pass - 2.5) * rollerWidth * 0.09 + (randomUnit(passSeed) - 0.5) * rollerWidth * 0.03;
            const width = rollerWidth * (0.31 + randomUnit(passSeed + 1.4) * 0.1);
            const alpha = 0.58 + randomUnit(passSeed + 2.8) * 0.1;
            strokeOrganicLane(offset, width, alpha, passSeed, 0.009);
          }
        }

        for (let lane = 0; lane < laneCount; lane += 1) {
          const laneT = laneCount === 1 ? 0.5 : lane / (laneCount - 1);
          const edge = Math.abs(laneT - 0.5) * 2;
          const edgeNoise = randomUnit(baseSeed + lane * 2.73);
          if (edge > 0.82 && edgeNoise < 0.2) continue;
          const offset =
            (laneT - 0.5) * rollerWidth +
            (randomUnit(baseSeed + lane * 3.91) - 0.5) * rollerWidth * (isRoller ? 0.035 : 0.025);
          const pressure = isRoller ? 0.88 + randomUnit(baseSeed + lane * 5.17) * 0.18 : 0.62;
          const edgeFalloff = isRoller ? 1 - Math.pow(edge, 1.45) * 0.46 : 1 - edge * 0.42;
          const dryVariation = isRoller ? 0.78 + randomUnit(baseSeed + lane * 7.61) * 0.34 : 0.78;
          const alpha = clamp(
            (isRoller ? 0.7 : 0.26) * pressure * edgeFalloff * dryVariation,
            isRoller ? 0.22 : 0.08,
            isRoller ? 0.86 : 0.34
          );
          const width = (rollerWidth / laneCount) * (isRoller ? 2.15 : 1.85) * (0.78 + randomUnit(baseSeed + lane * 11.3) * 0.58);
          strokeOrganicLane(offset, width, alpha, baseSeed + lane * 19.7, isRoller ? 0.016 : 0.008);
        }

        for (let edgeMark = 0; edgeMark < (isRoller ? 18 : 8); edgeMark += 1) {
          const t = randomUnit(baseSeed + 40 + edgeMark * 4.1);
          const side = randomUnit(baseSeed + 60 + edgeMark) > 0.5 ? 1 : -1;
          const edgeOffset = side * rollerWidth * (0.39 + randomUnit(baseSeed + 70 + edgeMark) * 0.13);
          const along = (randomUnit(baseSeed + 80 + edgeMark) - 0.5) * Math.max(distance, brushSize * 0.25);
          const center = {
            x: from.x + dx * t + tangent.x * along + normal.x * edgeOffset,
            y: from.y + dy * t + tangent.y * along + normal.y * edgeOffset,
          };
          const radius = brushSize * (0.012 + randomUnit(baseSeed + 90 + edgeMark) * 0.025);
          maskCtx.fillStyle = `rgba(255,255,255,${0.12 + randomUnit(baseSeed + 100 + edgeMark) * 0.2})`;
          maskCtx.beginPath();
          maskCtx.ellipse(center.x, center.y, radius * 1.9, radius, angle, 0, Math.PI * 2);
          maskCtx.fill();
        }

        maskCtx.restore();
        requestRender();
      };

      const canRetryCanvasReset = () =>
        canvasResetAttempts < maxCanvasResetAttempts &&
        (!canvasResetStartedAt || performance.now() - canvasResetStartedAt < maxCanvasResetDuration);

      const resetCanvasSize = (reason = "scheduled") => {
        canvasResetAttempts += 1;
        lastCanvasResetAttempts = canvasResetAttempts;
        const retryCanvasReset = (eventName, details = {}) => {
          root.classList.remove("paint-reveal-ready");
          const canRetry = eventName !== "image-not-ready" && canRetryCanvasReset();
          reportReadinessStatus(eventName, {
            reason,
            canRetry,
            maxCanvasResetAttempts,
            maxCanvasResetDuration,
            ...details,
          });
          if (!canRetry) {
            reportReadinessStatus("canvas-reset-gave-up", {
              reason,
              maxCanvasResetAttempts,
              maxCanvasResetDuration,
            });
          }
          return canRetry;
        };

        if (!image.complete || !image.naturalWidth || !image.naturalHeight) {
          return retryCanvasReset("image-not-ready");
        }
        const rootRect = root.getBoundingClientRect();
        const imageRect = image.getBoundingClientRect();
        if (imageRect.width <= 0 || imageRect.height <= 0) {
          return retryCanvasReset("image-not-laid-out", {
            imageRectWidth: imageRect.width,
            imageRectHeight: imageRect.height,
          });
        }
        const nextWidth = Math.round(imageRect.width);
        const nextHeight = Math.round(imageRect.height);
        if (nextWidth <= 0 || nextHeight <= 0) {
          return retryCanvasReset("canvas-size-invalid", {
            nextWidth,
            nextHeight,
          });
        }
        const mobile = nextWidth < 560 || window.matchMedia?.("(pointer: coarse)")?.matches;
        const rawRatio = Math.max(window.devicePixelRatio || 1, 1);
        const maxRatio = mobile ? 1.5 : 2;
        const maxPixels = mobile ? 420000 : 1200000;
        const areaRatio = Math.sqrt(maxPixels / Math.max(1, nextWidth * nextHeight));
        ratio = Math.max(1, Math.min(rawRatio, maxRatio, areaRatio));
        const backingWidth = Math.round(nextWidth * ratio);
        const backingHeight = Math.round(nextHeight * ratio);
        if (backingWidth <= 0 || backingHeight <= 0) {
          return retryCanvasReset("canvas-backing-invalid", {
            nextWidth,
            nextHeight,
            ratio,
            backingWidth,
            backingHeight,
          });
        }

        cssWidth = nextWidth;
        cssHeight = nextHeight;
        canvas.style.left = `${imageRect.left - rootRect.left}px`;
        canvas.style.top = `${imageRect.top - rootRect.top}px`;
        canvas.style.width = `${imageRect.width}px`;
        canvas.style.height = `${imageRect.height}px`;
        canvas.style.borderRadius = window.getComputedStyle(image.parentElement || image).borderRadius;
        const hint = root.querySelector(".paint-reveal-hint");
        if (hint) {
          hint.style.top = `${Math.max(10, Math.round(imageRect.top - rootRect.top + 12))}px`;
          hint.style.right = `${Math.max(12, Math.round(rootRect.right - imageRect.right + 12))}px`;
          hint.style.maxWidth = `${Math.max(160, Math.round(imageRect.width - 24))}px`;
        }
        [canvas, layerCanvas, maskCanvas, wallMaskCanvas].forEach((target) => {
          target.width = backingWidth;
          target.height = backingHeight;
        });
        const backingAssigned = [canvas, layerCanvas, maskCanvas, wallMaskCanvas].every(
          (target) => target.width === backingWidth && target.height === backingHeight
        );
        if (!backingAssigned) {
          return retryCanvasReset("canvas-backing-assignment-failed", {
            backingWidth,
            backingHeight,
          });
        }
        [ctx, layerCtx, maskCtx, wallMaskCtx].forEach((context) => {
          context.setTransform(ratio, 0, 0, ratio, 0, 0);
          context.clearRect(0, 0, cssWidth, cssHeight);
        });
        const isRoller = activePalette.effect === "color";
        const minBrush = isRoller ? (mobile ? 136 : 168) : mobile ? 72 : 112;
        const maxBrush = isRoller ? (mobile ? 188 : 230) : mobile ? 118 : 172;
        const coverageLimit = isRoller ? 0.62 : 0.42;
        brushSize = Math.min(
          clamp(baseBrushSize, minBrush, maxBrush),
          Math.max(minBrush, Math.min(cssWidth, cssHeight) * coverageLimit)
        );
        paintMaterialReady = false;
        buildWallMask();
        root.classList.remove("paint-reveal-active", "paint-reveal-fading");
        root.classList.add("paint-reveal-ready");
        reportReadinessStatus("canvas-sized", {
          reason,
          mobile,
          rawRatio,
          maxRatio,
          maxPixels,
          backingWidth,
          backingHeight,
          image: imageSnapshot("canvas-sized"),
          canvas: canvasSnapshot(),
        });
        debugPaint("resize");
        debugPaint("auto-preview-disabled");
        canvasResetAttempts = 0;
        canvasResetStartedAt = 0;
        return false;
      };

      const scheduleCanvasReset = (reason = "scheduled", options = {}) => {
        if (imageReadyResetQueued) {
          reportReadinessStatus("canvas-reset-already-queued", { reason });
          return;
        }
        if (!options.retry) {
          canvasResetAttempts = 0;
          canvasResetStartedAt = 0;
        }
        imageReadyResetQueued = true;
        if (!canvasResetStartedAt) canvasResetStartedAt = performance.now();
        if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
        resizeFrame = window.requestAnimationFrame(() => {
          resizeFrame = window.requestAnimationFrame(() => {
            resizeFrame = 0;
            let shouldRetry = false;
            try {
              shouldRetry = resetCanvasSize(reason);
            } catch (error) {
              reportReadinessStatus("canvas-reset-exception", {
                reason,
                error: paintDebugError(error),
              });
              shouldRetry = canRetryCanvasReset();
              if (!shouldRetry) {
                reportReadinessStatus("canvas-reset-gave-up", {
                  reason,
                  error: paintDebugError(error),
                });
              }
            } finally {
              imageReadyResetQueued = false;
            }
            if (shouldRetry) scheduleCanvasReset(`${reason}:retry`, { retry: true });
          });
        });
      };

      const polygonBounds = () => {
        const points = includePolygons.flat();
        const xs = points.map((point) => point.x);
        const ys = points.map((point) => point.y);
        return {
          minX: Math.min(...xs),
          maxX: Math.max(...xs),
          minY: Math.min(...ys),
          maxY: Math.max(...ys),
        };
      };

      const previewPath = () => {
        const bounds = polygonBounds();
        const y = bounds.minY + (bounds.maxY - bounds.minY) * 0.46;
        const from = normalToCanvas({
          x: bounds.minX + (bounds.maxX - bounds.minX) * 0.24,
          y,
        });
        const to = normalToCanvas({
          x: bounds.minX + (bounds.maxX - bounds.minX) * 0.48,
          y: y + (bounds.maxY - bounds.minY) * 0.04,
        });
        return { from, to };
      };

      const moveDemoIndicator = (point) => {
        window.clearTimeout(demoHideTimer);
        root.classList.add("paint-reveal-rolling");
        if (!demoIndicator) {
          demoIndicator = document.createElement("span");
          demoIndicator.className = "paint-reveal-demo";
          demoIndicator.setAttribute("aria-hidden", "true");
          root.appendChild(demoIndicator);
        }
        const canvasLeft = Number.parseFloat(canvas.style.left) || 0;
        const canvasTop = Number.parseFloat(canvas.style.top) || 0;
        demoIndicator.style.transform = `translate(${Math.round(canvasLeft + point.x)}px, ${Math.round(canvasTop + point.y)}px)`;
      };

      const shouldAutoPreview = () =>
        activePalette.preview || root.matches(".hero-visual-frame, .hero-media, .service-hero-visual");

      const startPreview = () => {
        if (reducedMotion || autoPreviewStarted || root.classList.contains("paint-reveal-used") || !shouldAutoPreview()) return;
        if (!root.matches(".hero-visual-frame, .hero-media, .service-hero-visual")) return;
        const { from, to } = previewPath();
        if (!pointInsideWall(from) || !pointInsideWall(to)) return;
        autoPreviewStarted = true;
        if (!paintMaterialReady) buildPaintMaterial();
        root.classList.add("paint-reveal-preview");
        moveDemoIndicator(from);
        previewFrame = window.requestAnimationFrame(() => {
          moveDemoIndicator(to);
          paintRollerSegment(from, to);
        });
        previewTimer = window.setTimeout(() => {
          root.classList.add("paint-reveal-fading");
          previewTimer = window.setTimeout(() => {
            cancelPreview(true);
            root.classList.remove("paint-reveal-fading");
          }, 420);
        }, 1450);
      };

      const schedulePreview = () => {
        debugPaint("auto-preview-disabled");
      };

      const cancelStrokeFrame = () => {
        if (!strokeFrame) return;
        window.cancelAnimationFrame(strokeFrame);
        strokeFrame = 0;
      };

      const flushQueuedStroke = () => {
        cancelStrokeFrame();
        if (queuedPoint && lastPoint) {
          paintRollerSegment(lastPoint, queuedPoint);
          lastPoint = queuedPoint;
        }
        queuedPoint = null;
      };

      const scheduleStroke = (point) => {
        queuedPoint = point;
        if (strokeFrame) return;
        strokeFrame = window.requestAnimationFrame(() => {
          strokeFrame = 0;
          if (!queuedPoint || !lastPoint) return;
          const nextPoint = queuedPoint;
          queuedPoint = null;
          paintRollerSegment(lastPoint, nextPoint);
          lastPoint = nextPoint;
        });
      };

      const cancelFade = () => {
        window.clearTimeout(fadeTimer);
        window.clearTimeout(clearTimer);
        root.classList.remove("paint-reveal-fading");
      };

      const scheduleFade = () => {
        window.clearTimeout(fadeTimer);
        window.clearTimeout(clearTimer);
        fadeTimer = window.setTimeout(() => {
          root.classList.add("paint-reveal-fading");
          clearTimer = window.setTimeout(() => {
            maskCtx.clearRect(0, 0, cssWidth, cssHeight);
            clearCanvas();
            root.classList.remove("paint-reveal-active", "paint-reveal-fading");
          }, 950);
        }, fadeDelay);
      };

      const cancelPreview = (clear = true) => {
        window.clearTimeout(previewTimer);
        if (previewFrame) window.cancelAnimationFrame(previewFrame);
        previewFrame = 0;
        previewTimer = 0;
        window.clearTimeout(demoHideTimer);
        demoIndicator?.remove();
        demoIndicator = null;
        root.classList.remove("paint-reveal-preview", "paint-reveal-rolling");
        if (clear) {
          maskCtx.clearRect(0, 0, cssWidth, cssHeight);
          clearCanvas();
        }
      };

      const markDragClick = () => {
        blockNextClick = true;
        suppressClickUntil = performance.now() + 800;
        clickSuppressionTargets.forEach((target) => {
          target.dataset.paintSuppressClick = "true";
        });
        window.clearTimeout(unblockClickTimer);
        unblockClickTimer = window.setTimeout(() => {
          blockNextClick = false;
          clickSuppressionTargets.forEach((target) => {
            delete target.dataset.paintSuppressClick;
          });
        }, 800);
      };

      const shouldSuppressActivation = () =>
        blockNextClick || (suppressClickUntil > 0 && performance.now() <= suppressClickUntil);

      const suppressActivation = (event) => {
        if (!shouldSuppressActivation()) return;
        event.preventDefault();
        event.stopPropagation();
        if (typeof event.stopImmediatePropagation === "function") event.stopImmediatePropagation();
        blockNextClick = false;
        clickSuppressionTargets.forEach((target) => {
          delete target.dataset.paintSuppressClick;
        });
        window.clearTimeout(unblockClickTimer);
      };

      const preventNativeImageDrag = (event) => {
        event.preventDefault();
        event.stopPropagation();
      };

      let bindPointerDocumentFallback = () => {};
      let unbindPointerDocumentFallback = () => {};
      let bindTouchDocumentFallback = () => {};
      let unbindTouchDocumentFallback = () => {};

      const logInputEarlyReturn = (stage, reason, details = {}) => {
        debugPaint(`${stage}-early-return`, {
          stage,
          reason,
          ...details,
        });
      };

      const logPaintStartPipeline = (pipelineStage, details = {}) => {
        if (!paintDebugPanelEnabled()) return;
        debugPaint("paint-start-pipeline", {
          pipelineStage,
          stage: pipelineStage,
          sequence: paintStartPipelineSequence,
          pendingExists: !!pending,
          pendingId: pending?.id || null,
          pendingInsideWall: pending?.insideWall ?? null,
          activePointerId: activePointer,
          activeInputFamily,
          beginPaintingEntered: root.classList.contains("paint-reveal-active"),
          revealAtCalled: false,
          firstDrawExecuted: false,
          ...details,
        });
      };

      const beginPainting = (input, point) => {
        logPaintStartPipeline("beginPainting-entered", {
          inputId: input.id,
          inputMode: input.mode,
          pointerType: input.pointerType,
          point: roundedPoint(point),
          paintMaterialReady,
        });
        debugPaint("beginPainting-entered", {
          inputMode: input.mode,
          pointerType: input.pointerType,
          point: roundedPoint(point),
          paintMaterialReady,
        });
        if (!paintMaterialReady) buildPaintMaterial();
        activePointer = input.id;
        pending = null;
        lastPoint = point;
        queuedPoint = null;
        root.dataset.paintGesture = "active";
        cancelPreview(true);
        cancelFade();
        root.classList.add("paint-reveal-ready", "paint-reveal-active", "paint-reveal-used");
        moveDemoIndicator(point);
        markDragClick();
        pointerCaptureActive = false;
        if (input.event?.pointerId !== undefined && canvas.setPointerCapture) {
          try {
            canvas.setPointerCapture(input.event.pointerId);
            pointerCaptureActive = true;
          } catch (error) {
            pointerCaptureActive = false;
            paintLog("caught-exception", {
              source: "setPointerCapture",
              pointerId: input.event.pointerId,
              pointerType: input.pointerType,
              error: paintDebugError(error),
            });
          }
        }
        logPaintStartPipeline("activePointerId-assigned", {
          activePointerId: activePointer,
          inputMode: input.mode,
          pointerType: input.pointerType,
          point: roundedPoint(point),
          pointerCaptureActive,
        });
        debugPaint("paint-start", { inputMode: input.mode, point, pointerCaptureActive });
      };

      const finishPainting = () => {
        if (activePointer === null) return;
        const pointerId = activePointer;
        flushQueuedStroke();
        markDragClick();
        activePointer = null;
        activeInputFamily = null;
        lastPoint = null;
        queuedPoint = null;
        mouseIsDown = false;
        if (pointerCaptureActive && canvas.releasePointerCapture && typeof pointerId === "number") {
          try {
            canvas.releasePointerCapture(pointerId);
          } catch (error) {
            paintLog("caught-exception", {
              source: "releasePointerCapture",
              pointerId,
              error: paintDebugError(error),
            });
          }
        }
        pointerCaptureActive = false;
        unbindPointerDocumentFallback();
        unbindTouchDocumentFallback();
        root.dataset.paintGesture = "";
        demoHideTimer = window.setTimeout(() => {
          demoIndicator?.remove();
          demoIndicator = null;
          root.classList.remove("paint-reveal-rolling");
        }, 700);
        scheduleFade();
        debugPaint("paint-finish");
      };

      const resetTouchPaintState = () => {
        touchPaintPointerId = null;
      };

      const cancelPending = () => {
        cancelStrokeFrame();
        pending = null;
        activePointer = null;
        activeInputFamily = null;
        resetTouchPaintState();
        lastPoint = null;
        queuedPoint = null;
        mouseIsDown = false;
        pointerCaptureActive = false;
        unbindPointerDocumentFallback();
        unbindTouchDocumentFallback();
        root.classList.remove("paint-reveal-active", "paint-reveal-hit");
        root.classList.remove("paint-reveal-rolling");
        root.dataset.paintGesture = "";
        debugPaint("paint-cancel");
      };

      const updateHitState = (point) => {
        if (activePointer !== null || pending) return;
        root.classList.toggle("paint-reveal-hit", pointInsideWall(point));
      };

      const startPendingInput = (input) => {
        logPaintStartPipeline(`${input.mode}-startPendingInput-entered`, {
          inputId: input.id,
          pointerType: input.pointerType,
          point: roundedPoint(input.point),
          ready: root.classList.contains("paint-reveal-ready"),
        });
        if (!root.classList.contains("paint-reveal-ready")) {
          if (image.complete && image.naturalWidth) resetCanvasSize();
          if (!root.classList.contains("paint-reveal-ready")) {
            scheduleCanvasReset();
            logPaintStartPipeline(`${input.mode}-startPendingInput-exit`, {
              reason: "component-not-ready",
              point: roundedPoint(input.point),
            });
            logInputEarlyReturn(`${input.mode}-start`, "component-not-ready", { point: roundedPoint(input.point) });
            debugPaint(`${input.mode}-start-deferred-not-ready`, { point: input.point });
            return;
          }
        }
        cancelPreview(true);
        const point = input.point;
        if (point.x < 0 || point.y < 0 || point.x > cssWidth || point.y > cssHeight) {
          logPaintStartPipeline(`${input.mode}-startPendingInput-exit`, {
            reason: "outside-canvas-bounds",
            point: roundedPoint(point),
            cssWidth,
            cssHeight,
          });
          logInputEarlyReturn(`${input.mode}-start`, "outside-canvas-bounds", {
            point: roundedPoint(point),
            cssWidth,
            cssHeight,
          });
          debugPaint(`${input.mode}-start-ignored-outside-image`, { point });
          return;
        }
        const insideWall = pointInsideWall(point);
        activeInputFamily = input.mode;
        root.classList.toggle("paint-reveal-hit", insideWall);

        pending = {
          id: input.id,
          mode: input.mode,
          pointerType: input.pointerType,
          start: point,
          last: point,
          insideWall,
          dragged: false,
        };
        firstPointerMoveTraced = false;
        root.dataset.paintGesture = insideWall ? "pending" : "searching";
        if (input.mode === "pointer") bindPointerDocumentFallback();
        if (input.mode === "touch") bindTouchDocumentFallback();
        logPaintStartPipeline("gesture-object-created", {
          inputId: input.id,
          inputMode: input.mode,
          pointerType: input.pointerType,
          insideWall,
          point: roundedPoint(point),
        });
        debugPaint("active-gesture-state-created", {
          inputMode: input.mode,
          pointerType: input.pointerType,
          insideWall,
          point: roundedPoint(point),
        });
        debugPaint(`${input.mode}-start`, { insideWall, point });
      };

      const continueInput = (input, event) => {
        const isFirstPointerMove = input.mode === "pointer" && !firstPointerMoveTraced;
        if (isFirstPointerMove) {
          firstPointerMoveTraced = true;
          logPaintStartPipeline("first-pointermove-entered", {
            inputId: input.id,
            pointerType: input.pointerType,
            point: roundedPoint(input.point),
            hasPending: !!pending,
            pendingId: pending?.id || null,
            activePointer,
          });
        }
        if (activePointer !== null) {
          if (input.id !== activePointer || !lastPoint) {
            if (isFirstPointerMove) {
              logPaintStartPipeline("first-pointermove-exit", {
                reason: "active-pointer-mismatch-or-missing-last-point",
                inputId: input.id,
                activePointer,
                hasLastPoint: !!lastPoint,
                point: roundedPoint(input.point),
              });
            }
            logInputEarlyReturn(`${input.mode}-move`, "active-pointer-mismatch-or-missing-last-point", {
              inputId: input.id,
              activePointer,
              hasLastPoint: !!lastPoint,
              point: roundedPoint(input.point),
            });
            return;
          }
          if (event?.cancelable) event.preventDefault();
          moveDemoIndicator(input.point);
          scheduleStroke(input.point);
          return;
        }

        updateHitState(input.point);
        if (!pending || input.id !== pending.id) {
          if (isFirstPointerMove) {
            logPaintStartPipeline("first-pointermove-exit", {
              reason: "no-matching-pending-gesture",
              inputId: input.id,
              pendingId: pending?.id || null,
              hasPending: !!pending,
              point: roundedPoint(input.point),
            });
          }
          logInputEarlyReturn(`${input.mode}-move`, "no-matching-pending-gesture", {
            inputId: input.id,
            pendingId: pending?.id || null,
            hasPending: !!pending,
            point: roundedPoint(input.point),
          });
          return;
        }

        const point = input.point;
        const dx = point.x - pending.start.x;
        const dy = point.y - pending.start.y;
        const distance = Math.hypot(dx, dy);
        if (distance >= dragThreshold) {
          pending.dragged = true;
          markDragClick();
        }

        if (!pending.insideWall) {
          if (pointInsideWall(point)) {
            pending.insideWall = true;
            pending.start = point;
            pending.last = point;
            root.dataset.paintGesture = "pending";
            root.classList.add("paint-reveal-hit");
            if (pending.pointerType === "touch" && event?.cancelable) event.preventDefault();
            if (isFirstPointerMove) {
              logPaintStartPipeline("first-pointermove-entered-wall-mask", {
                reason: "entered-wall-mask-waiting-for-next-move",
                point: roundedPoint(point),
              });
            }
            return;
          }
          if (isFirstPointerMove) {
            logPaintStartPipeline("first-pointermove-exit", {
              reason: "searching-outside-wall-mask",
              point: roundedPoint(point),
              dx: Math.round(dx),
              dy: Math.round(dy),
              distance: Math.round(distance),
            });
          }
          logInputEarlyReturn(`${input.mode}-move`, "searching-outside-wall-mask", {
            point: roundedPoint(point),
            dx: Math.round(dx),
            dy: Math.round(dy),
            distance: Math.round(distance),
          });
          return;
        }

        if (pending.pointerType === "touch" && event?.cancelable) event.preventDefault();

        const activeThreshold = pending.pointerType === "touch" ? Math.min(activationThreshold, 2) : activationThreshold;
        if (distance < activeThreshold) {
          if (isFirstPointerMove) {
            logPaintStartPipeline("first-pointermove-exit", {
              reason: "movement-below-activation-threshold",
              distance,
              activeThreshold,
              point: roundedPoint(point),
            });
          }
          logInputEarlyReturn(`${input.mode}-move`, "movement-below-activation-threshold", {
            distance,
            activeThreshold,
            point: roundedPoint(point),
          });
          return;
        }

        const startPoint = pending.start;
        if (event?.cancelable) event.preventDefault();
        if (isFirstPointerMove) {
          logPaintStartPipeline("first-pointermove-calling-beginPainting", {
            inputId: pending.id,
            pointerType: pending.pointerType,
            startPoint: roundedPoint(startPoint),
            point: roundedPoint(point),
            distance,
            activeThreshold,
          });
        }
        beginPainting({ id: pending.id, mode: pending.mode, event }, startPoint);
        paintRollerSegment(startPoint, point);
        lastPoint = point;
      };

      const finishInput = (id, event, prevent = true) => {
        if (id === activePointer) {
          if (prevent && event?.cancelable) event.preventDefault();
          finishPainting();
          return;
        }
        if (pending?.id === id) {
          cancelPending();
          return;
        }
        logInputEarlyReturn("finishInput", "no-matching-active-or-pending-id", {
          id,
          activePointer,
          pendingId: pending?.id || null,
        });
      };

      const handlePointerDown = (event) => {
        if (event.pointerType === "touch") return;
        runPaintEvent("pointerdown", event, pointerEventDetails(event), () => {
          paintStartPipelineSequence += 1;
          firstPointerMoveTraced = false;
          logPaintStartPipeline("pointerdown-entered", {
            pointerId: event.pointerId,
            pointerType: event.pointerType || "",
            isPrimary: event.isPrimary,
            button: event.button,
            buttons: event.buttons,
            point: roundedPoint(localPoint(event)),
            ready: root.classList.contains("paint-reveal-ready"),
          });
          if (event.pointerType === "mouse" && event.button !== undefined && event.button !== 0) {
            logPaintStartPipeline("pointerdown-exit", {
              reason: "non-primary-button",
              pointerId: event.pointerId,
              button: event.button,
            });
            logInputEarlyReturn("pointerdown", "non-primary-button", pointerEventDetails(event));
            return;
          }
          if (event.isPrimary === false) {
            logPaintStartPipeline("pointerdown-exit", {
              reason: "non-primary-pointer",
              pointerId: event.pointerId,
              pointerType: event.pointerType || "",
            });
            logInputEarlyReturn("pointerdown", "non-primary-pointer", pointerEventDetails(event));
            return;
          }
          if (!canUseInputFamily("pointer")) {
            logPaintStartPipeline("pointerdown-exit", {
              reason: "input-family-busy",
              requestedFamily: "pointer",
              activeInputFamily,
              activePointer,
              pendingId: pending?.id || null,
            });
            logInputEarlyReturn("pointerdown", "input-family-busy", {
              requestedFamily: "pointer",
              activeInputFamily,
              activePointer,
              pendingId: pending?.id || null,
            });
            return;
          }
          startPendingInput({
            id: event.pointerId,
            mode: "pointer",
            pointerType: event.pointerType || "mouse",
            point: localPoint(event),
          });
        });
      };

      const handlePointerMove = (event) => {
        if (event.pointerType === "touch") return;
        runPaintEvent("pointermove", event, pointerEventDetails(event), () => {
          if (event.isPrimary === false) {
            logInputEarlyReturn("pointermove", "non-primary-pointer", pointerEventDetails(event));
            return;
          }
          if (activeInputFamily && activeInputFamily !== "pointer") {
            logInputEarlyReturn("pointermove", "active-input-family-mismatch", {
              activeInputFamily,
              expected: "pointer",
              pointerId: event.pointerId,
              pointerType: event.pointerType || "",
            });
            return;
          }
          continueInput(
            {
              id: event.pointerId,
              mode: "pointer",
              pointerType: event.pointerType || "mouse",
              point: localPoint(event),
            },
            event
          );
        });
      };

      const handlePointerUp = (event) => {
        if (event.pointerType === "touch") return;
        runPaintEvent("pointerup", event, pointerEventDetails(event), () => {
          if (event.isPrimary === false) {
            logInputEarlyReturn("pointerup", "non-primary-pointer", pointerEventDetails(event));
            return;
          }
          if (activeInputFamily && activeInputFamily !== "pointer") {
            logInputEarlyReturn("pointerup", "active-input-family-mismatch", {
              activeInputFamily,
              expected: "pointer",
              pointerId: event.pointerId,
              pointerType: event.pointerType || "",
            });
            return;
          }
          finishInput(event.pointerId, event);
        });
      };
      const handlePointerCancel = (event) => {
        if (event.pointerType === "touch") return;
        runPaintEvent("pointercancel", event, pointerEventDetails(event), () => {
          if (event.isPrimary === false) {
            logInputEarlyReturn("pointercancel", "non-primary-pointer", pointerEventDetails(event));
            return;
          }
          if (activeInputFamily && activeInputFamily !== "pointer") {
            logInputEarlyReturn("pointercancel", "active-input-family-mismatch", {
              activeInputFamily,
              expected: "pointer",
              pointerId: event.pointerId,
              pointerType: event.pointerType || "",
            });
            return;
          }
          if (event.pointerId === activePointer || event.pointerId === pending?.id) {
            finishInput(event.pointerId, event, false);
            return;
          }
          logInputEarlyReturn("pointercancel", "no-matching-pointer-to-cancel", {
            pointerId: event.pointerId,
            activePointer,
            pendingId: pending?.id || null,
          });
        });
      };

      const handlePointerMoveFallback = (event) => {
        if (root.contains(event.target)) return;
        handlePointerMove(event);
      };
      const handlePointerUpFallback = (event) => {
        if (root.contains(event.target)) return;
        handlePointerUp(event);
      };
      const handlePointerCancelFallback = (event) => {
        if (root.contains(event.target)) return;
        handlePointerCancel(event);
      };

      bindPointerDocumentFallback = () => {
        if (pointerFallbackBound) return;
        pointerFallbackBound = true;
        document.addEventListener("pointermove", handlePointerMoveFallback, true);
        document.addEventListener("pointerup", handlePointerUpFallback, true);
        document.addEventListener("pointercancel", handlePointerCancelFallback, true);
      };

      unbindPointerDocumentFallback = () => {
        if (!pointerFallbackBound) return;
        pointerFallbackBound = false;
        document.removeEventListener("pointermove", handlePointerMoveFallback, true);
        document.removeEventListener("pointerup", handlePointerUpFallback, true);
        document.removeEventListener("pointercancel", handlePointerCancelFallback, true);
      };

      let touchFallbackBound = false;
      const handleTouchMoveFallback = (event) => {
        if (root.contains(event.target)) return;
        handleTouchMove(event);
      };
      const handleTouchEndFallback = (event) => {
        if (root.contains(event.target)) return;
        handleTouchEnd(event);
      };
      const handleTouchCancelFallback = (event) => {
        if (root.contains(event.target)) return;
        handleTouchCancel(event);
      };

      bindTouchDocumentFallback = () => {
        if (touchFallbackBound) return;
        touchFallbackBound = true;
        document.addEventListener("touchmove", handleTouchMoveFallback, { capture: true, passive: false });
        document.addEventListener("touchend", handleTouchEndFallback, { capture: true, passive: true });
        document.addEventListener("touchcancel", handleTouchCancelFallback, { capture: true, passive: true });
      };

      unbindTouchDocumentFallback = () => {
        if (!touchFallbackBound) return;
        touchFallbackBound = false;
        document.removeEventListener("touchmove", handleTouchMoveFallback, { capture: true });
        document.removeEventListener("touchend", handleTouchEndFallback, { capture: true });
        document.removeEventListener("touchcancel", handleTouchCancelFallback, { capture: true });
      };

      const touchById = (touches, id) => {
        for (let index = 0; index < touches.length; index += 1) {
          if (`touch:${touches[index].identifier}` === id) return touches[index];
        }
        return null;
      };

      const touchInput = (touch) => ({
        id: `touch:${touch.identifier}`,
        mode: "touch",
        pointerType: "touch",
        point: localPointFromClient(touch.clientX, touch.clientY),
      });

      const handleTouchStart = (event) => {
        runPaintEvent("touchstart", event, touchEventDetails(event), () => {
          if (!canUseInputFamily("touch")) {
            logInputEarlyReturn("touchstart", "input-family-busy", {
              requestedFamily: "touch",
              activeInputFamily,
              activePointer,
              pendingId: pending?.id || null,
            });
            return;
          }
          if (event.touches.length !== 1 || !event.changedTouches.length || activePointer !== null) {
            logInputEarlyReturn("touchstart", "invalid-touch-start-state", {
              touches: event.touches.length,
              changedTouches: event.changedTouches.length,
              activePointer,
            });
            if (activePointer !== null) {
              finishPainting();
            } else {
              cancelPending();
            }
            return;
          }
          startPendingInput(touchInput(event.changedTouches[0]));
        });
      };

      const handleTouchMove = (event) => {
        runPaintEvent("touchmove", event, touchEventDetails(event), () => {
          if (activeInputFamily && activeInputFamily !== "touch") {
            logInputEarlyReturn("touchmove", "active-input-family-mismatch", {
              activeInputFamily,
              expected: "touch",
            });
            return;
          }
          const id = activePointer || pending?.id;
          if (!id) {
            logInputEarlyReturn("touchmove", "no-active-or-pending-touch-id");
            return;
          }
          const touch = touchById(event.touches, id) || touchById(event.changedTouches, id);
          if (!touch) {
            logInputEarlyReturn("touchmove", "matching-touch-not-found", {
              id,
              touches: event.touches.length,
              changedTouches: event.changedTouches.length,
            });
            return;
          }
          continueInput(touchInput(touch), event);
        });
      };

      const handleTouchEnd = (event) => {
        runPaintEvent("touchend", event, touchEventDetails(event), () => {
          if (activeInputFamily && activeInputFamily !== "touch") {
            logInputEarlyReturn("touchend", "active-input-family-mismatch", {
              activeInputFamily,
              expected: "touch",
            });
            return;
          }
          const id = activePointer || pending?.id;
          if (!id) {
            logInputEarlyReturn("touchend", "no-active-or-pending-touch-id");
            return;
          }
          if (touchById(event.changedTouches, id)) {
            finishInput(id, null, false);
            return;
          }
          logInputEarlyReturn("touchend", "matching-touch-not-ended", {
            id,
            changedTouches: event.changedTouches.length,
          });
        });
      };

      const handleTouchCancel = (event) => {
        runPaintEvent("touchcancel", event, touchEventDetails(event), () => {
          if (activeInputFamily && activeInputFamily !== "touch") {
            logInputEarlyReturn("touchcancel", "active-input-family-mismatch", {
              activeInputFamily,
              expected: "touch",
            });
            return;
          }
          const id = activePointer || pending?.id;
          if (!id) {
            logInputEarlyReturn("touchcancel", "no-active-or-pending-touch-id");
            cancelPending();
            return;
          }
          if (touchById(event.changedTouches, id)) {
            finishInput(id, event, false);
            return;
          }
          logInputEarlyReturn("touchcancel", "matching-touch-not-cancelled", {
            id,
            changedTouches: event.changedTouches.length,
          });
        });
      };

      const handleMouseDown = (event) => {
        runPaintEvent(
          "mousedown",
          event,
          {
            button: event.button,
            buttons: event.buttons,
            cancelable: event.cancelable,
            clientX: Math.round(event.clientX || 0),
            clientY: Math.round(event.clientY || 0),
          },
          () => {
            if (event.button !== 0) {
              logInputEarlyReturn("mousedown", "non-primary-button", mouseEventDetails(event));
              return;
            }
            mouseIsDown = true;
            startPendingInput({
              id: "mouse",
              mode: "mouse",
              pointerType: "mouse",
              point: localPoint(event),
            });
          }
        );
      };

      const mouseEventDetails = (event) => ({
        button: event.button,
        buttons: event.buttons,
        cancelable: event.cancelable,
        clientX: Math.round(event.clientX || 0),
        clientY: Math.round(event.clientY || 0),
      });

      const handleMouseMove = (event) => {
        runPaintEvent("mousemove", event, mouseEventDetails(event), () => {
          if (!mouseIsDown && !pending && activePointer === null) {
            updateHitState(localPoint(event));
            return;
          }
          continueInput(
            {
              id: "mouse",
              mode: "mouse",
              pointerType: "mouse",
              point: localPoint(event),
            },
            event
          );
        });
      };

      const handleMouseMoveFallback = (event) => {
        if (event.target === canvas || (!mouseIsDown && !pending && activePointer === null)) return;
        handleMouseMove(event);
      };

      const handleMouseUp = (event) => {
        runPaintEvent("mouseup", event, mouseEventDetails(event), () => {
          mouseIsDown = false;
          finishInput("mouse", event);
        });
      };

      const clampPointToCanvas = (point) => ({
        x: clamp(point.x, 0, cssWidth),
        y: clamp(point.y, 0, cssHeight),
      });

      const pointInCanvasBounds = (point) =>
        point.x >= 0 && point.y >= 0 && point.x <= cssWidth && point.y <= cssHeight;

      const pointInCanvasClientRect = (event) => {
        const rect = canvas.getBoundingClientRect();
        if (!rect.width || !rect.height) return false;
        return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      };

      const handleTouchPointerDown = (event) => {
        if (event.pointerType !== "touch" || event.isPrimary === false) return;
        runPaintEvent("pointerdown", event, pointerEventDetails(event), () => {
          if (!root.classList.contains("paint-reveal-ready")) return;
          if (!pointInCanvasClientRect(event)) return;
          const point = localPoint(event);
          if (!pointInCanvasBounds(point)) return;
          if (event.cancelable) event.preventDefault();

          cancelPending();
          cancelFade();
          touchPaintPointerId = event.pointerId;
          activeInputFamily = "pointer";
          beginPainting(
            {
              id: event.pointerId,
              mode: "pointer",
              pointerType: "touch",
              event,
            },
            point
          );
          paintRollerSegment(point, {
            x: clamp(point.x + Math.max(1.5, brushSize * 0.02), 0, cssWidth),
            y: point.y,
          });
          lastPoint = point;
        });
      };

      const handleTouchPointerMove = (event) => {
        if (event.pointerType !== "touch" || event.pointerId !== touchPaintPointerId) return;
        runPaintEvent("pointermove", event, pointerEventDetails(event), () => {
          if (event.cancelable) event.preventDefault();
          const point = clampPointToCanvas(localPoint(event));
          moveDemoIndicator(point);
          scheduleStroke(point);
        });
      };

      const finishTouchPointerPainting = (event, prevent = true) => {
        if (event.pointerId !== touchPaintPointerId) return;
        runPaintEvent(event.type, event, pointerEventDetails(event), () => {
          if (prevent && event.cancelable) event.preventDefault();
          resetTouchPaintState();
          finishPainting();
        });
      };

      const handleTouchPointerUp = (event) => finishTouchPointerPainting(event);
      const handleTouchPointerCancel = (event) => finishTouchPointerPainting(event, false);

      const handleLostPointerCapture = (event) => {
        if (event.pointerId === touchPaintPointerId) {
          finishTouchPointerPainting(event, false);
          return;
        }
        runPaintEvent("lostpointercapture", event, pointerEventDetails(event), () => {
          finishInput(event.pointerId, event, false);
        });
      };

      const cancelCurrentGesture = () => {
        if (activePointer !== null) {
          resetTouchPaintState();
          finishPainting();
          return;
        }
        if (pending) {
          cancelPending();
          return;
        }
        activeInputFamily = null;
        pointerCaptureActive = false;
        mouseIsDown = false;
        unbindPointerDocumentFallback();
        unbindTouchDocumentFallback();
        root.classList.remove("paint-reveal-hit", "paint-reveal-rolling");
        root.dataset.paintGesture = "";
      };

      if (usePointerInput) {
        root.addEventListener("pointerdown", handlePointerDown, true);
        root.addEventListener("pointermove", handlePointerMove, true);
        root.addEventListener("pointerup", handlePointerUp, true);
        root.addEventListener("pointercancel", handlePointerCancel, true);
        const touchPointerOptions = { capture: true, passive: false };
        document.addEventListener("pointerdown", handleTouchPointerDown, touchPointerOptions);
        document.addEventListener("pointermove", handleTouchPointerMove, touchPointerOptions);
        document.addEventListener("pointerup", handleTouchPointerUp, touchPointerOptions);
        document.addEventListener("pointercancel", handleTouchPointerCancel, touchPointerOptions);
        canvas.addEventListener("lostpointercapture", handleLostPointerCapture);
      }
      if (useTouchFallback) {
        root.addEventListener("touchstart", handleTouchStart, { capture: true, passive: true });
        root.addEventListener("touchmove", handleTouchMove, { capture: true, passive: false });
        root.addEventListener("touchend", handleTouchEnd, { capture: true, passive: true });
        root.addEventListener("touchcancel", handleTouchCancel, { capture: true, passive: true });
      }
      if (useMouseFallback) {
        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mousemove", handleMouseMoveFallback);
        document.addEventListener("mouseup", handleMouseUp);
      }

      root.addEventListener("pointerleave", () => {
        if (activePointer === null && !pending) root.classList.remove("paint-reveal-hit");
      });

      root.addEventListener(
        "click",
        suppressActivation,
        true
      );
      canvas.addEventListener("click", suppressActivation, true);
      image.addEventListener("click", suppressActivation, true);
      root.addEventListener("dragstart", preventNativeImageDrag, true);
      image.addEventListener("dragstart", preventNativeImageDrag);
      installInputProbe();
      window.addEventListener("blur", cancelCurrentGesture);
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
          cancelCurrentGesture();
        } else {
          scheduleCanvasReset("visibility-visible");
        }
      });

      const scheduleDecodedCanvasReset = () => {
        paintLog("image-readiness-check", {
          image: imageSnapshot("readiness-check"),
        });
        if (!image.complete || !image.naturalWidth || !image.naturalHeight) {
          root.classList.remove("paint-reveal-ready");
          paintLog("image-readiness-waiting", {
            image: imageSnapshot("readiness-waiting"),
          });
          return;
        }
        scheduleCanvasReset("image-ready");
        if (typeof image.decode === "function") {
          image
            .decode()
            .then(() => {
              paintLog("image-decode-success", {
                image: imageSnapshot("decode-success"),
              });
              scheduleCanvasReset("image-decode-success");
            })
            .catch((error) => {
              paintLog("image-decode-failure", {
                image: imageSnapshot("decode-failure"),
                error: paintDebugError(error),
              });
              scheduleCanvasReset("image-decode-failure");
            });
        } else {
          paintLog("image-decode-skipped", {
            reason: "decode-api-unavailable",
            image: imageSnapshot("decode-skipped"),
          });
        }
      };

      if (image.complete && image.naturalWidth) {
        scheduleDecodedCanvasReset();
      } else {
        root.classList.remove("paint-reveal-ready");
        paintLog("image-load-listener-added", {
          image: imageSnapshot("load-listener-added"),
        });
        image.addEventListener("load", scheduleDecodedCanvasReset, { once: true });
        image.addEventListener(
          "error",
          (event) => {
            root.dataset.paintRevealDisabled = "true";
            debugPaint("image-error", {
              image: imageSnapshot("error"),
              errorEventType: event.type,
            });
          },
          { once: true }
        );
      }
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => scheduleCanvasReset("domcontentloaded"), { once: true });
      } else {
        scheduleCanvasReset("content-render-complete");
      }

      paintLog("component-init-completed", {
        image: imageSnapshot("init-completed"),
        canvas: canvasSnapshot(),
        listeners: {
          pointer: usePointerInput,
          touch: useTouchFallback,
          mouse: useMouseFallback,
        },
      });

      if ("ResizeObserver" in window) {
        new ResizeObserver(() => scheduleCanvasReset("resize-observer")).observe(root);
      } else {
        window.addEventListener("resize", () => scheduleCanvasReset("resize"), { passive: true });
      }
      window.addEventListener("resize", () => scheduleCanvasReset("resize"), { passive: true });
      window.addEventListener("orientationchange", () => scheduleCanvasReset("orientationchange"), { passive: true });
      window.addEventListener("pageshow", () => scheduleCanvasReset("pageshow"), { passive: true });
      window.visualViewport?.addEventListener("resize", () => scheduleCanvasReset("visualviewport-resize"), { passive: true });
    });
    paintDebug.log("paint-bind-completed", {
      activeRootCount: activeRoots.length,
      boundRootCount: activeRoots
        .slice(0, interactiveLimit)
        .filter((root) => root.dataset.paintRevealBound === "true").length,
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

    modalImage.src = image.src || image.currentSrc;
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
      <button class="backdrop" type="button" data-garden-gallery-close aria-label="${t("closeImageGallery")}"></button>
      <div class="panel" tabindex="-1">
        <button class="close" type="button" data-garden-gallery-close aria-label="${t("closeImageGallery")}">&times;</button>
        <button class="garden-gallery-nav prev" type="button" data-garden-gallery-step="-1" aria-label="${t("previousImage")}">&#8249;</button>
        <button class="garden-gallery-nav next" type="button" data-garden-gallery-step="1" aria-label="${t("nextImage")}">&#8250;</button>
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

    modalImage.src = image.src || image.currentSrc;
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
      <button class="backdrop" type="button" data-cleaning-gallery-close aria-label="${t("closeImageGallery")}"></button>
      <div class="panel" tabindex="-1">
        <button class="close" type="button" data-cleaning-gallery-close aria-label="${t("closeImageGallery")}">&times;</button>
        <button class="garden-gallery-nav prev" type="button" data-cleaning-gallery-step="-1" aria-label="${t("previousImage")}">&#8249;</button>
        <button class="garden-gallery-nav next" type="button" data-cleaning-gallery-step="1" aria-label="${t("nextImage")}">&#8250;</button>
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
      return;
    }

    if (event.key === "Escape") {
      closeLanguageSelector();
    }
  });

  let languageTriggerEventsBound = false;
  const openLanguageSelectorFromTrigger = (trigger) => {
    const selector = renderLanguageSelector() || document.querySelector(".language-selector");
    if (!selector) return;
    closeLanguageSelector();
    openLanguageSelector(selector, trigger);
    window.setTimeout(() => {
      selector.querySelector("[data-language-option]")?.focus({ preventScroll: true });
    }, 0);
  };
  const bindLanguageSelectorTriggers = () => {
    if (languageTriggerEventsBound) return;
    languageTriggerEventsBound = true;

    document.addEventListener("click", (event) => {
      const trigger = event.target.closest?.("[data-language-selector-trigger]");
      if (!trigger || trigger.closest(".language-selector")) return;
      event.preventDefault();
      openLanguageSelectorFromTrigger(trigger);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && document.querySelector(".language-selector.open")) {
        closeLanguageSelector({ restoreFocus: true });
        return;
      }

      if (!["Enter", " "].includes(event.key)) return;
      const trigger = event.target.closest?.("[data-language-selector-trigger]");
      if (!trigger || trigger.closest(".language-selector")) return;
      event.preventDefault();
      openLanguageSelectorFromTrigger(trigger);
    });
  };

  document.addEventListener("click", (event) => {
    if (event.target.closest(".language-selector, [data-language-selector-trigger]")) return;
    closeLanguageSelector({ restoreFocus: true });
  });

  const quoteFormLang = () => (routeLanguage() === "hu" ? "hu" : "en");
  const quotePagePath = () => normalizePath(window.location.pathname);
  const quoteEventBase = () => ({
    page_path: quotePagePath(),
    page_language: quoteFormLang(),
  });
  const quoteEscape = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  const quoteLabel = (options, value, lang) => options.find((option) => option.value === value)?.[lang] || "";
  const quoteCleanLine = (value) => String(value || "").replace(/\s+/g, " ").trim();
  const quoteControl = (form, name) => form.elements.namedItem(name);
  const quoteCanonicalUrl = () => {
    const canonical = document.querySelector('link[rel="canonical"]')?.href || routeHref(currentRouteKey(), quoteFormLang());
    const url = new URL(canonical, window.location.origin);
    url.search = "";
    url.hash = "";
    return url.href;
  };
  const pushConversionEvent = (event, params = {}) => {
    try {
      if (!Array.isArray(window.dataLayer)) window.dataLayer = [];
      window.dataLayer.push({ event, ...params });
    } catch {
      /* Analytics is optional and must never block site interactions. */
    }
  };
  const preselectedQuoteService = () => quoteRouteService[currentRouteKey()] || "maintenance";
  const quoteOptionsMarkup = (options, lang, selected = "") =>
    options
      .map((option) => {
        const isSelected = option.value === selected ? " selected" : "";
        return `<option value="${quoteEscape(option.value)}"${isSelected}>${quoteEscape(option[lang])}</option>`;
      })
      .join("");
  const quoteFieldErrorId = (formId, field) => `${formId}-${field}-error`;
  const quoteField = ({ formId, name, label, type = "text", required = false, value = "", placeholder = "", help = "" }) => {
    const id = `${formId}-${name}`;
    const errorId = quoteFieldErrorId(formId, name);
    const helpId = help ? `${formId}-${name}-help` : "";
    const describedBy = [helpId, errorId].filter(Boolean).join(" ");
    const requiredText = quoteEscape(quoteFormText[quoteFormLang()]?.required || "Required");
    return `
      <div class="quote-field">
        <label for="${id}">${quoteEscape(label)}${required ? ` <span aria-hidden="true">*</span><span class="sr-only"> ${requiredText}</span>` : ""}</label>
        <input id="${id}" name="${quoteEscape(name)}" type="${quoteEscape(type)}" value="${quoteEscape(value)}" placeholder="${quoteEscape(placeholder)}"${required ? " required" : ""} aria-describedby="${describedBy}">
        ${help ? `<p class="quote-help" id="${helpId}">${quoteEscape(help)}</p>` : ""}
        <p class="quote-field-error" id="${errorId}" data-quote-error="${quoteEscape(name)}" aria-live="polite"></p>
      </div>`;
  };
  const quoteTextarea = ({ formId, name, label, required = false, placeholder = "", maxlength = 1000 }) => {
    const id = `${formId}-${name}`;
    const errorId = quoteFieldErrorId(formId, name);
    const counterId = `${formId}-${name}-counter`;
    const requiredText = quoteEscape(quoteFormText[quoteFormLang()]?.required || "Required");
    return `
      <div class="quote-field quote-field-full">
        <label for="${id}">${quoteEscape(label)}${required ? ` <span aria-hidden="true">*</span><span class="sr-only"> ${requiredText}</span>` : ""}</label>
        <textarea id="${id}" name="${quoteEscape(name)}" rows="5" maxlength="${maxlength}" placeholder="${quoteEscape(placeholder)}"${required ? " required" : ""} aria-describedby="${counterId} ${errorId}"></textarea>
        <div class="quote-meta-row">
          <p class="quote-field-error" id="${errorId}" data-quote-error="${quoteEscape(name)}" aria-live="polite"></p>
          <p class="quote-counter" id="${counterId}" data-quote-counter="${quoteEscape(name)}">0 / ${maxlength}</p>
        </div>
      </div>`;
  };
  const quoteSelect = ({ formId, name, label, options, lang, selected = "", required = false }) => {
    const id = `${formId}-${name}`;
    const errorId = quoteFieldErrorId(formId, name);
    const requiredText = quoteEscape(quoteFormText[quoteFormLang()]?.required || "Required");
    return `
      <div class="quote-field">
        <label for="${id}">${quoteEscape(label)}${required ? ` <span aria-hidden="true">*</span><span class="sr-only"> ${requiredText}</span>` : ""}</label>
        <select id="${id}" name="${quoteEscape(name)}"${required ? " required" : ""} aria-describedby="${errorId}">
          ${quoteOptionsMarkup(options, lang, selected)}
        </select>
        <p class="quote-field-error" id="${errorId}" data-quote-error="${quoteEscape(name)}" aria-live="polite"></p>
      </div>`;
  };
  const quoteCheckbox = ({ formId, name, label, required = false }) => {
    const id = `${formId}-${name}`;
    const errorId = quoteFieldErrorId(formId, name);
    const requiredText = quoteEscape(quoteFormText[quoteFormLang()]?.required || "Required");
    return `
      <div class="quote-check">
        <input id="${id}" name="${quoteEscape(name)}" type="checkbox"${required ? " required" : ""} aria-describedby="${errorId}">
        <label for="${id}">${quoteEscape(label)}${required ? ` <span aria-hidden="true">*</span><span class="sr-only"> ${requiredText}</span>` : ""}</label>
        <p class="quote-field-error" id="${errorId}" data-quote-error="${quoteEscape(name)}" aria-live="polite"></p>
      </div>`;
  };
  const buildQuoteMessage = (payload, lang) => {
    const text = quoteFormText[lang];
    const labels = text.messageLabels;
    const lines = [
      text.messageGreeting,
      "",
      `${labels.name}: ${payload.name}`,
      `${labels.service}: ${payload.serviceLabel}`,
    ];

    if (payload.propertyTypeLabel) lines.push(`${labels.propertyType}: ${payload.propertyTypeLabel}`);
    if (payload.location) lines.push(`${labels.location}: ${payload.location}`);
    lines.push(`${labels.timing}: ${payload.timingLabel}`);
    if (payload.access) lines.push(`${labels.access}: ${payload.access}`);
    lines.push(`${labels.description}:`);
    lines.push(payload.description);
    lines.push("");
    lines.push(`${labels.photos}: ${payload.photosReady ? text.photosYes : text.photosNo}`);
    lines.push(`${labels.page}: ${payload.page}`);
    return lines.join("\n");
  };
  const quotePayloadFromForm = (form, lang) => {
    const field = (name) => quoteControl(form, name);
    const service = field("service")?.value || preselectedQuoteService();
    const propertyType = field("propertyType")?.value || "";
    const timing = field("timing")?.value || "asap";
    return {
      name: quoteCleanLine(field("name")?.value),
      service,
      serviceLabel: quoteLabel(quoteServiceOptions, service, lang),
      propertyType,
      propertyTypeLabel: propertyType ? quoteLabel(quotePropertyOptions, propertyType, lang) : "",
      location: quoteCleanLine(field("location")?.value),
      timing,
      timingLabel: quoteLabel(quoteTimingOptions, timing, lang),
      access: quoteCleanLine(field("access")?.value),
      description: String(field("description")?.value || "").trim(),
      photosReady: Boolean(field("photosReady")?.checked),
      page: quoteCanonicalUrl(),
    };
  };
  const setQuoteFieldError = (form, fieldName, message = "") => {
    const control = quoteControl(form, fieldName);
    const error = form.querySelector(`[data-quote-error="${fieldName}"]`);
    if (control) control.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) error.textContent = message;
  };
  const quoteRequiredFields = ["name", "service", "description", "timing"];
  const quoteFieldValidationMessage = (form, fieldName, lang) => {
    const text = quoteFormText[lang];
    if (quoteRequiredFields.includes(fieldName)) {
      return String(quoteControl(form, fieldName)?.value || "").trim() ? "" : text.requiredError;
    }
    if (fieldName === "consent") return quoteControl(form, "consent")?.checked ? "" : text.consentError;
    return "";
  };
  const refreshQuoteFieldValidity = (form, fieldName, lang, showErrors = false) => {
    const message = quoteFieldValidationMessage(form, fieldName, lang);
    if (!message || showErrors) setQuoteFieldError(form, fieldName, message);
    return !message;
  };
  const validateQuoteForm = (form, lang) => {
    const invalidFields = [];

    quoteRequiredFields.forEach((fieldName) => {
      if (!refreshQuoteFieldValidity(form, fieldName, lang, true)) invalidFields.push(fieldName);
    });

    setQuoteFieldError(form, "location", "");
    if (!refreshQuoteFieldValidity(form, "consent", lang, true)) invalidFields.push("consent");

    if (invalidFields.length) {
      pushConversionEvent("quote_form_validation_error", {
        ...quoteEventBase(),
        error_field_count: invalidFields.length,
      });
      quoteControl(form, invalidFields[0])?.focus();
      return false;
    }
    return true;
  };
  const bindQuoteForm = (form, lang) => {
    if (form.dataset.quoteBound === "true") return;
    form.dataset.quoteBound = "true";
    const text = quoteFormText[lang];
    const counters = [...form.querySelectorAll("[data-quote-counter]")];
    const submit = form.querySelector('[data-quote-submit]');
    const submitEmail = form.querySelector('[data-quote-submit-email]');
    const status = form.querySelector("[data-quote-status]");
    let started = false;

    const trackStart = () => {
      if (started) return;
      started = true;
      pushConversionEvent("quote_form_start", {
        ...quoteEventBase(),
        preselected_service: preselectedQuoteService(),
      });
    };
    const updateCounters = () => {
      counters.forEach((counter) => {
        const control = quoteControl(form, counter.dataset.quoteCounter);
        if (!control) return;
        counter.textContent = text.counter(control.value.length, Number(control.maxLength) || 1000);
      });
    };
    const updateFieldValidity = (event) => {
      const field = event.target?.closest?.("[name]");
      if (!field || !form.contains(field)) return;
      refreshQuoteFieldValidity(form, field.name, lang, form.dataset.quoteSubmitted === "true");
    };

    ["focusin", "input", "change", "pointerdown", "keydown"].forEach((eventName) => {
      form.addEventListener(eventName, trackStart, { once: true });
    });
    form.addEventListener("input", updateCounters);
    form.addEventListener("input", updateFieldValidity);
    form.addEventListener("change", updateFieldValidity);
    updateCounters();

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (form.dataset.quoteOpening === "true") return;
      form.dataset.quoteSubmitted = "true";
      if (!validateQuoteForm(form, lang)) return;
      delete form.dataset.quoteSubmitted;

      const payload = quotePayloadFromForm(form, lang);
      const message = buildQuoteMessage(payload, lang);
      const whatsappUrl = `https://wa.me/36206671832?text=${encodeURIComponent(message)}`;
      pushConversionEvent("quote_whatsapp_open", {
        ...quoteEventBase(),
        service_type: payload.service,
        property_type: payload.propertyType || "not_selected",
        preferred_timing: payload.timing,
        photos_ready: payload.photosReady,
        form_location: "contact_section",
      });

      form.dataset.quoteOpening = "true";
      if (submit) submit.disabled = true;
      if (status) status.textContent = text.statusOpening;

      const opened = window.open(whatsappUrl, "_blank", "noopener");
      if (!opened) window.location.href = whatsappUrl;

      window.setTimeout(() => {
        delete form.dataset.quoteOpening;
        if (submit) submit.disabled = false;
      }, 1800);
    });

    submitEmail?.addEventListener("click", () => {
      if (form.dataset.quoteOpening === "true") return;
      form.dataset.quoteSubmitted = "true";
      if (!validateQuoteForm(form, lang)) return;
      delete form.dataset.quoteSubmitted;

      const payload = quotePayloadFromForm(form, lang);
      const message = buildQuoteMessage(payload, lang);
      const subject = `${text.emailSubjectPrefix} – ${payload.serviceLabel}`;
      const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      pushConversionEvent("quote_email_open", {
        ...quoteEventBase(),
        service_type: payload.service,
        property_type: payload.propertyType || "not_selected",
        preferred_timing: payload.timing,
        photos_ready: payload.photosReady,
        form_location: "contact_section",
      });

      form.dataset.quoteOpening = "true";
      submitEmail.disabled = true;
      if (status) status.textContent = text.statusOpeningEmail;

      window.location.href = mailtoUrl;

      window.setTimeout(() => {
        delete form.dataset.quoteOpening;
        submitEmail.disabled = false;
      }, 1800);
    });
  };
  const renderQuoteForm = (mount, index) => {
    const lang = quoteFormLang();
    const routeKey = currentRouteKey();
    if (mount.dataset.quoteRendered === `${lang}:${routeKey}`) return;

    // The homepage ships this form pre-rendered in the static HTML (avoids the
    // empty-mount-to-full-form layout shift that raced with real-device focus
    // scrolling). When that static markup is already present, only bind its
    // behavior -- do not tear it down and rebuild it via innerHTML.
    const existingForm = mount.querySelector("[data-quote-form]");
    if (existingForm) {
      mount.dataset.quoteRendered = `${lang}:${routeKey}`;
      bindQuoteForm(existingForm, lang);
      return;
    }

    const text = quoteFormText[lang];
    const formId = `quote-form-${index + 1}`;
    const selectedService = preselectedQuoteService();
    mount.innerHTML = `
      <form class="whatsapp-quote" data-quote-form novalidate>
        <div class="quote-form-header">
          <span class="quote-kicker">${quoteEscape(text.kicker)}</span>
          <h3>${quoteEscape(text.title)}</h3>
          <p>${quoteEscape(text.intro)}</p>
        </div>
        <div class="quote-form-grid">
          ${quoteField({ formId, name: "name", label: text.name, required: true, placeholder: text.placeholderName })}
          ${quoteSelect({ formId, name: "service", label: text.service, options: quoteServiceOptions, lang, selected: selectedService, required: true })}
          ${quoteField({ formId, name: "location", label: text.location, placeholder: text.placeholderLocation, help: text.locationHelp })}
          ${quoteSelect({ formId, name: "timing", label: text.timing, options: quoteTimingOptions, lang, selected: "asap", required: true })}
          ${quoteSelect({ formId, name: "propertyType", label: text.propertyType, options: quotePropertyOptions, lang })}
          ${quoteTextarea({ formId, name: "access", label: text.access, placeholder: text.placeholderAccess, maxlength: 500 })}
          ${quoteTextarea({ formId, name: "description", label: text.description, required: true, placeholder: text.placeholderDescription, maxlength: 1000 })}
        </div>
        ${quoteCheckbox({ formId, name: "photosReady", label: text.photosReady })}
        ${quoteCheckbox({ formId, name: "consent", label: text.consent, required: true })}
        <p class="quote-note">${quoteEscape(text.note)}</p>
        <div class="quote-submit-actions">
          <button class="btn primary quote-submit" type="submit" data-quote-submit>${quoteEscape(text.submit)}</button>
          <button class="btn quote-submit-email" type="button" data-quote-submit-email>${quoteEscape(text.submitEmail)}</button>
        </div>
        ${copyEmailWidget(lang)}
        <p class="quote-status" data-quote-status role="status" aria-live="polite" aria-atomic="true"></p>
      </form>
    `;
    mount.dataset.quoteRendered = `${lang}:${routeKey}`;
    const form = mount.querySelector("[data-quote-form]");
    if (form) bindQuoteForm(form, lang);
  };
  const ensureQuoteFormPlaceholders = () => {
    document.querySelectorAll("#contact .contact-card").forEach((card) => {
      if (card.querySelector("[data-whatsapp-quote-form]")) return;
      const placeholder = document.createElement("div");
      placeholder.dataset.whatsappQuoteForm = "true";
      card.insertBefore(placeholder, card.firstChild);
    });
  };
  const bindQuoteForms = () => {
    ensureQuoteFormPlaceholders();
    document.querySelectorAll("[data-whatsapp-quote-form]").forEach((mount, index) => renderQuoteForm(mount, index));
  };
  let conversionTrackingBound = false;
  const bindConversionActionTracking = () => {
    if (conversionTrackingBound) return;
    conversionTrackingBound = true;
    document.addEventListener(
      "click",
      (event) => {
        const link = event.target.closest?.("a[href]");
        if (!link) return;
        const href = link.href || "";
        if (href.includes("wa.me/36206671832")) {
          pushConversionEvent("whatsapp_click", quoteEventBase());
        } else if (href.startsWith(tel)) {
          pushConversionEvent("phone_click", quoteEventBase());
        }
      },
      { capture: true }
    );
  };

  const copyPhoneUsingSelection = () => {
    let input;
    try {
      input = document.createElement("textarea");
      input.value = phone;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.left = "-9999px";
      input.style.top = "0";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.focus({ preventScroll: true });
      input.select();
      input.setSelectionRange(0, input.value.length);
      return document.execCommand("copy");
    } catch {
      return false;
    } finally {
      input?.remove();
    }
  };

  const copyPhoneWithClipboard = async () => {
    try {
      if (!navigator.clipboard?.writeText) return false;
      await navigator.clipboard.writeText(phone);
      return true;
    } catch {
      return false;
    }
  };

  const copyPhoneToClipboard = async (lang = currentLang()) => {
    const success = t("phoneCopied", lang);
    const fallback = t("phoneFallback", lang);
    let copied = false;

    copied = copyPhoneUsingSelection();
    if (!copied) copied = await copyPhoneWithClipboard();

    showToast(copied ? success : fallback);
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

  const copyEmailUsingSelection = () => {
    let input;
    try {
      input = document.createElement("textarea");
      input.value = contactEmail;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.left = "-9999px";
      input.style.top = "0";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.focus({ preventScroll: true });
      input.select();
      input.setSelectionRange(0, input.value.length);
      return document.execCommand("copy");
    } catch {
      return false;
    } finally {
      input?.remove();
    }
  };

  const copyEmailWithClipboard = async () => {
    try {
      if (!navigator.clipboard?.writeText) return false;
      await navigator.clipboard.writeText(contactEmail);
      return true;
    } catch {
      return false;
    }
  };

  const copyEmailToClipboard = async (lang = currentLang()) => {
    const success = t("emailCopied", lang);
    const fallback = t("emailFallback", lang);
    let copied = false;

    copied = copyEmailUsingSelection();
    if (!copied) copied = await copyEmailWithClipboard();

    showToast(copied ? success : fallback);
    return copied;
  };

  const bindEmailCopyActions = () => {
    document.querySelectorAll("[data-email-copy-action]").forEach((button) => {
      if (button.dataset.emailCopyBound === "true") return;
      button.dataset.emailCopyBound = "true";
      button.addEventListener("click", (event) => {
        event.preventDefault();
        copyEmailToClipboard(currentLang());
      });
    });
  };

  const copyEmailIcon =
    '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false"><rect x="8" y="8" width="12" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="M4 16V5a1 1 0 0 1 1-1h9" fill="none" stroke="currentColor" stroke-width="2"></path></svg>';

  const copyEmailWidget = (lang = currentLang()) => `
    <span class="copy-email">
      <span class="copy-email-address">${quoteEscape(contactEmail)}</span>
      <button type="button" class="copy-email-btn" data-email-copy-action aria-label="${quoteEscape(t("emailCopyLabel", lang))}">${copyEmailIcon}</button>
    </span>
  `;

  const syncTextNodes = (lang) => {
    applyPageLanguage(lang);
  };

  const applyStandaloneLanguage = () => {
    applyPageLanguage();
  };

  const initStandaloneReveals = () => {
    const items = [...document.querySelectorAll("[data-reveal]")];
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("visible"));
      return;
    }

    const pending = new Set(items);
    let sweepReached = null;
    const reveal = (item) => {
      if (!pending.has(item)) return;
      item.classList.add("visible");
      pending.delete(item);
      observer.unobserve(item);
      if (!pending.size && sweepReached) {
        window.removeEventListener("scroll", sweepReached);
        sweepReached = null;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
        });
      },
      { threshold: 0.16 }
    );

    items.forEach((item) => observer.observe(item));

    // A fast/instant scroll (flick, or a hash-link jump) can move past an
    // element before the observer ever samples it, leaving it permanently
    // opacity:0. Sweep anything already scrolled to or past and force it
    // visible so the reveal animation never blocks content from appearing.
    sweepReached = () => {
      pending.forEach((item) => {
        if (item.getBoundingClientRect().top < window.innerHeight) reveal(item);
      });
    };
    window.addEventListener("scroll", sweepReached, { passive: true });
    window.setTimeout(sweepReached, 1000);
  };

  const initStandalonePage = () => {
    ensureStandaloneCleaningLink();
    applyStandaloneLanguage();
    enhanceHeaderNavigation();
    bindConversionActionTracking();
    bindQuoteForms();
    bindPhoneActions();
    bindEmailCopyActions();
    if (document.body?.dataset.page === "garden-maintenance") {
      bindGardenImageGallery();
    } else if (document.body?.dataset.page === "cleaning-services") {
      bindCleaningImageGallery();
    } else {
      bindHeroLightbox();
    }
    bindPaintReveal();
    initStandaloneReveals();

    window.addEventListener("resize", () => {
      syncTextNodes(currentLang());
      syncHeaderNavigationState();
    }, { passive: true });
  };

  window.BPS_I18N = {
    currentLang,
    setLanguage,
    applyPageLanguage,
    translatePhrase,
    t,
    routeHref,
    routeLanguage,
  };

  if (["property-maintenance", "handyman-services", "painting-wall-repairs", "garden-maintenance", "cleaning-services", "airbnb-property-maintenance", "property-management-foreign-owners", "impresszum"].includes(document.body?.dataset.page)) {
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
    "assets/budapest-courtyard-before-entrance.jpg",
    "assets/budapest-office-before-touchup-matched.jpg",
  ];

  const applySituationImages = () => {
    document.querySelectorAll(".situation-grid .problem img").forEach((image, index) => {
      const source = situationImages[index];
      if (!source) return;

      const absolute = new URL(source, scriptBaseUrl).href;
      // Keep the responsive srcset when the markup already shows the right image.
      if (new URL(image.src).pathname === new URL(absolute).pathname) return;
      image.removeAttribute("srcset");
      image.src = absolute;
    });
  };

  const initHomePage = () => {
    const phone = "+36 20 667 1832";
    const tel = "tel:+36206671832";
    const wa = "https://wa.me/36206671832";
    // scriptBaseUrl/assetBuildId come from the outer script.js scope: this module
    // now runs from a DOMContentLoaded callback, not a script tag's own synchronous
    // execution, so document.currentScript is no longer reliably set here.
    const img = (id, w = 1200) => {
      if (id.startsWith("assets/")) {
        const url = new URL(id, scriptBaseUrl);
        url.search = `?v=${assetBuildId}`;
        return url.href;
      }
      return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
    };

    const state = {
      lang: window.BPS_I18N?.currentLang?.() || window.BPS_I18N?.routeLanguage?.() || "en",
      gallery: [],
      galleryIndex: 0,
      galleryZoom: 1,
      galleryPanX: 0,
      galleryPanY: 0,
      projectIndex: 0,
      projectFilter: "all",
    };

    const translateFallback = (value) =>
      state.lang === "hu" || state.lang === "en"
        ? value
        : window.BPS_I18N?.translatePhrase?.(value, state.lang) || value;
    const tx = (value) => translateFallback(value?.[state.lang] || value?.en || value?.hu || "");
    const directCallViewport = () => window.matchMedia("(max-width: 820px)").matches;
    const phoneActionLabel = () => {
      if (window.BPS_I18N?.t) return window.BPS_I18N.t(directCallViewport() ? "callNow" : "copyPhone", state.lang);
      if (state.lang === "hu") return directCallViewport() ? "Hívás indítása" : "Telefon másolása";
      return directCallViewport() ? "Call now" : "Copy phone";
    };
    const routeHref = (key, hash = "") => `${window.BPS_I18N?.routeHref?.(key, state.lang) || "/"}${hash}`;
    const phaseLabel = {
      before: { hu: "Előtte", en: "Before" },
      process: { hu: "Munkafolyamat", en: "Process" },
      after: { hu: "Kész állapot", en: "Finished" },
    };

    const phaseText = (phase) => tx(phaseLabel[phase] || phaseLabel.process);
    const compareFallback = {
      compareBefore: { hu: "Előtte", en: "Before", de: "Vorher", uk: "До", "zh-CN": "之前" },
      compareAfter: { hu: "Utána", en: "After", de: "Nachher", uk: "Після", "zh-CN": "之后" },
      compareSliderName: {
        hu: "Előtte-utána összehasonlító csúszka",
        en: "Before and after comparison slider",
        de: "Vorher-Nachher-Vergleichsschieber",
        uk: "Повзунок порівняння до і після",
        "zh-CN": "前后对比滑块",
      },
      viewFullComparison: {
        hu: "Teljes összehasonlítás megnyitása",
        en: "View full comparison",
        de: "Vollständigen Vergleich ansehen",
        uk: "Переглянути повне порівняння",
        "zh-CN": "查看完整对比",
      },
      fullComparisonTitle: {
        hu: "Teljes előtte-utána összehasonlítás",
        en: "Full before and after comparison",
        de: "Vollständiger Vorher-Nachher-Vergleich",
        uk: "Повне порівняння до і після",
        "zh-CN": "完整前后对比",
      },
      fullComparisonDescription: {
        hu: "Húzza a választóvonalat, vagy használja a nyílbillentyűket. A képek illusztratív példák, a konkrét feladatot mindig a helyszín állapota alapján egyeztetjük.",
        en: "Drag the divider or use the arrow keys. Images are illustrative examples; the actual task is always agreed from the condition of the property.",
        de: "Ziehen Sie die Trennlinie oder verwenden Sie die Pfeiltasten. Die Bilder sind illustrative Beispiele; die konkrete Aufgabe wird immer anhand des Zustands der Immobilie abgestimmt.",
        uk: "Перетягніть розділювач або використовуйте клавіші зі стрілками. Зображення є ілюстративними прикладами; конкретне завдання завжди узгоджується за фактичним станом об’єкта.",
        "zh-CN": "拖动分隔线或使用方向键。图片为示意示例；具体工作始终根据物业实际状况确认。",
      },
    };
    const compareText = (key) =>
      window.BPS_I18N?.t?.(key, state.lang) ||
      compareFallback[key]?.[state.lang] ||
      compareFallback[key]?.en ||
      "";
    const compareValueText = (value) => {
      const rounded = Math.round(value);
      const values = {
        hu: `${rounded}% előtte kép látható`,
        en: `${rounded}% before image visible`,
        de: `${rounded}% Vorher-Bild sichtbar`,
        uk: `${rounded}% зображення “до” видиме`,
        "zh-CN": `${rounded}% 显示之前图片`,
      };
      return values[state.lang] || values.en;
    };
    const compareHintText = () =>
      state.lang === "hu"
        ? "Illusztratív előtte-utána összehasonlítás, amely a munkafolyamat jellegét és a várható eredményt mutatja. Kattintson vagy fókuszáljon a csúszkára, majd húzza a fogantyút, vagy használja a nyílbillentyűket."
        : "An illustrative before-and-after comparison showing the type of work and the expected result. Click or focus the slider, then drag the handle or use the arrow keys.";
    const hasProjectComparison = (item) => item?.comparison !== false && !!item?.before && !!item?.after;
    const compareMarkup = (item, options = {}) => {
      const id = options.id || "compare";
      const hintId = options.hintId || `${id}-hint`;
      const className = options.className || "";
      const initial = 50;
      return `
        <div class="compare ${className}" id="${id}" data-compare role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${initial}" aria-valuetext="${compareValueText(initial)}" aria-label="${compareText("compareSliderName")}" aria-describedby="${hintId}">
          <img class="after" src="${img(item.after, 1600)}" alt="${tx(item.title)} - ${compareText("compareAfter")}" draggable="false">
          <img class="before" src="${img(item.before, 1600)}" alt="${tx(item.title)} - ${compareText("compareBefore")}" draggable="false">
          <span class="label compare-label left">${compareText("compareBefore")}</span>
          <span class="label compare-label right">${compareText("compareAfter")}</span>
          <span class="handle" aria-hidden="true"></span>
        </div>
        <p class="compare-hint" id="${hintId}">${compareHintText()}</p>`;
    };
    const photoCaption = (photo) => tx(photo?.[2]) || phaseText(photo?.[1]);
    const projectLightboxImages = (project) => {
      const pair = hasProjectComparison(project)
        ? [
            [project.before, "before", { hu: `${tx(project.title)} - kiinduló állapot`, en: `${tx(project.title)} - starting condition` }],
            [project.after, "after", { hu: `${tx(project.title)} - rendezett kész állapot`, en: `${tx(project.title)} - finished condition` }],
          ]
        : [];
      const seen = new Set(pair.map((photo) => photo[0]));
      return [...pair, ...(project.images || []).filter((photo) => !seen.has(photo[0]))];
    };

    const services = [
      {
        key: "painting",
        cover: "assets/budapest-finished-room-1.jpg",
        title: { hu: "Festés és falfrissítés", en: "Interior painting and wall refresh" },
        text: {
          hu:
            "Kopott, foltos vagy javított falak rendezése vendégváltás, bérlőváltás, fotózás vagy irodai látogatás előtt. A cél nem látványos ígéret, hanem tiszta felület, egységes összkép és vállalható átadás.",
          en:
            "Refresh marked, patched or tired walls before guest changes, tenant handovers, photoshoots or office visits. The aim is a clean surface, a consistent room impression and a handover you can feel comfortable with.",
        },
        photos: [
          ["12036084", "before", { hu: "Régi, sérült falfelület: itt a fal állapotát kellett javíthatóvá tenni.", en: "Old damaged wall surface: the first task was to make the wall repairable." }],
          ["804392", "before", { hu: "Felújítás előtti helyiség, ahol a falhibák és az alsó falsáv külön figyelmet igényelt.", en: "Room before refresh, with visible wall damage and a lower wall section needing attention." }],
          ["3616757", "process", { hu: "Festésre előkészített teljes szoba, takart padlóval és összekészített anyagokkal.", en: "Full room prepared for painting, with flooring protected and materials arranged." }],
          ["3615721", "process", { hu: "A munkaterület rendezése festés előtt: a szoba használható állapotban marad a kivitelezéshez.", en: "Work area set up before painting so the room remains controlled during the job." }],
          ["6474471", "process", { hu: "Teljes falfelület javítása és hengerlése, nem csak egy közeli részlet.", en: "A full wall being repaired and rolled, not just a close-up detail." }],
          ["6473978", "process", { hu: "Nagyobb falmező csiszolása és simítása, hogy a festés egyenletes legyen.", en: "Large wall section being sanded and levelled so the paint finish looks even." }],
          ["assets/budapest-finished-room-1.jpg", "after", { hu: "Frissen festett budapesti lakószoba tiszta falakkal, radiátorral és parkettával.", en: "Freshly painted Budapest living room with clean walls, radiators and parquet flooring." }],
          ["assets/budapest-finished-room-2.jpg", "after", { hu: "Üres, átadásra kész budapesti szoba egységes falfelülettel és hétköznapi kialakítással.", en: "Empty Budapest room ready for handover, with consistent walls and an everyday layout." }],
          ["assets/budapest-airbnb-living-room.jpg", "after", { hu: "Rendezett, világos budapesti lakótér friss falakkal és praktikus berendezéssel.", en: "Tidy, bright Budapest living space with refreshed walls and practical furnishings." }],
          ["assets/budapest-airbnb-bedroom.jpg", "after", { hu: "Tiszta, visszafogott budapesti hálószoba vendég- vagy bérlőátadás előtt.", en: "Clean, understated Budapest bedroom before guest or tenant handover." }],
        ],
      },
      {
        key: "drywall",
        cover: "assets/property-maintenance-drywall-sanding.jpg",
        title: { hu: "Gipszkarton és almennyezet", en: "Drywall and ceiling repairs" },
        text: {
          hu:
            "Sérült vagy félkész gipszkarton, hézagok, glettelés, csiszolás és festésre előkészített felületek. A munka lényege, hogy a javítás ne külön hibaként látszódjon, hanem illeszkedjen a teljes helyiséghez.",
          en:
            "Damaged or unfinished drywall, seams, filling, sanding and paint-ready surfaces. The goal is for the repair to blend into the room, not remain visible as a separate defect.",
        },
        photos: [
          ["assets/budapest-drywall-before-matched.jpg", "before", { hu: "Üres, félkész helyiség gipszkarton és festés előtti állapotban: a teljes tér látszik.", en: "Empty unfinished room before drywall finishing and painting, showing the full space." }],
          ["15798783", "before", { hu: "Felújítás alatti teljes szoba, ahol a falak és mennyezeti csatlakozások még rendezésre várnak.", en: "Full room under renovation where walls and ceiling junctions still need finishing." }],
          ["5606879", "before", { hu: "Nagyobb belső munkaterület nyitott mennyezettel és javítandó felületekkel.", en: "Large interior work area with an open ceiling and surfaces still needing repair." }],
          ["3990359", "process", { hu: "Teljes felújítás alatti helyiség: létrák, takarás és előkészített munkaterület.", en: "Full room under renovation with ladders, protection and prepared working area." }],
          ["6474313", "process", { hu: "Mennyezeti gipszkarton felület hézagolás előtt, jól látható teljes felülettel.", en: "Drywall ceiling before joint finishing, with the broader surface visible." }],
          ["6474202", "process", { hu: "Mennyezeti illesztések kezelése nagyobb felületen, nem elszigetelt részletként.", en: "Ceiling joints handled across a larger surface, not as an isolated close-up." }],
          ["6474343", "process", { hu: "Gipszkarton mennyezet csiszolása és simítása festés előtt.", en: "Drywall ceiling being sanded and smoothed before painting." }],
          ["6474300", "process", { hu: "Teljes szoba előkészítése: takarás, csiszolás, poros munkafázis kontrolláltan.", en: "Full room preparation with masking, sanding and controlled dusty work." }],
          ["6474129", "process", { hu: "Mennyezeti javítás munka közben, a teljes felülethez igazítva.", en: "Ceiling repair in progress, aligned with the whole surface." }],
          ["9826455", "after", { hu: "Kész, üres helyiség: a javított felületek tiszta, festés utáni szobaképet adnak.", en: "Finished empty room where repaired surfaces create a clean post-work interior." }],
        ],
      },
      {
        key: "garden",
        cover: "assets/budapest-courtyard-garden-1.jpg",
        title: { hu: "Kert és udvar rendbetétele", en: "Garden and outdoor clean-up" },
        text: {
          hu:
            "Magas fű, benőtt udvar, elhanyagolt bejárat vagy terasz rendezése normál budapesti környezetben. Bérleményeknél, Airbnb-nél és irodáknál a külső állapot már érkezéskor meghatározza az első benyomást.",
          en:
            "Mowing, trimming and tidying courtyards, entrances and terraces in realistic Budapest settings. For rentals, Airbnb and offices, outdoor condition shapes trust before anyone steps inside.",
        },
        photos: [
          ["assets/budapest-courtyard-before-entrance.jpg", "before", { hu: "Elhanyagolt budapesti társasházi bejárat nyírás és lombgyűjtés előtt.", en: "Neglected Budapest apartment entrance before mowing and leaf collection." }],
          ["assets/budapest-courtyard-before-overgrown-lawn.jpg", "before", { hu: "Benőtt közös udvari gyep és bokorsáv egy budapesti lakóépület mellett.", en: "Overgrown shared lawn and shrub border beside a Budapest residential building." }],
          ["assets/budapest-courtyard-before-overgrown-wall.jpg", "before", { hu: "Rendezetlen udvari növényzet és járdaszegély visszavágás előtt.", en: "Untidy courtyard planting and path edges before trimming." }],
          ["assets/budapest-courtyard-process-mowing.jpg", "process", { hu: "Fűnyírás és szegélyrendezés egy budapesti társasház belső udvarában.", en: "Mowing and edge tidying in a Budapest apartment courtyard." }],
          ["assets/budapest-courtyard-process-hedge-trimming.jpg", "process", { hu: "Közönséges lombhullató sövény egyenletes visszavágása az udvari járda mellett.", en: "An ordinary deciduous hedge being trimmed evenly beside the courtyard path." }],
          ["assets/budapest-courtyard-process-shrub-pruning.jpg", "process", { hu: "Túlnőtt udvari bokor metszése, a levágott ágak rendezett gyűjtésével.", en: "Pruning an overgrown courtyard shrub while collecting the cut branches neatly." }],
          ["assets/budapest-courtyard-process-green-waste.jpg", "process", { hu: "Nyírás utáni zöldhulladék összegyűjtése egy budapesti közös udvarban.", en: "Collecting green waste after trimming in a shared Budapest courtyard." }],
          ["assets/budapest-courtyard-garden-1.jpg", "after", { hu: "Rendezett budapesti belső udvar nyírt fűvel, visszavágott sövénnyel és tiszta járdával.", en: "A tidy Budapest courtyard with cut grass, trimmed hedges and a clean path." }],
          ["assets/budapest-courtyard-garden-2.jpg", "after", { hu: "Karbantartott zöldsáv egy városi lakóépület mellett, egyszerű, jól áttekinthető kialakítással.", en: "A maintained green strip beside an urban residential building, kept simple and easy to manage." }],
          ["assets/budapest-courtyard-garden-3.jpg", "after", { hu: "Tiszta bejárati út és gondozott növényzet egy budapesti társasházi udvarban.", en: "A clean entrance path and maintained planting in a Budapest apartment courtyard." }],
        ],
      },
      {
        key: "handyman",
        cover: "assets/handyman-services-wall-fixtures.jpg",
        title: { hu: "Kisebb javítások és szerelés", en: "Small repairs and handyman jobs" },
        text: {
          hu:
            "Polc, karnis, ajtóigazítás, szegély, rögzítés és átadás előtti apró hibák egy feladatlistába rendezve. Ezek külön-külön kicsinek tűnnek, együtt viszont sokat rontanak a tulajdonosi, bérlői vagy vendégélményen.",
          en:
            "Shelves, curtain rails, door adjustments, trims, fixings and small handover issues organised into one task list. Individually they may seem minor, but together they strongly affect how the property feels.",
        },
        photos: [
          ["13909112", "before", { hu: "Belső tér átadás előtt, ahol a kisebb szerelési és rendezési pontok adják meg a végső képet.", en: "Interior before handover where small installation and tidying points shape the final impression." }],
          ["13588248", "before", { hu: "Rendezetlenebb fali tároló és dekorációs felület: a cél egy használhatóbb, tisztább összkép.", en: "Less orderly wall storage and decor area before creating a more usable, cleaner impression." }],
          ["23224978", "process", { hu: "Fali kép vagy tartó pontos beállítása, hogy a helyiség rendezettebb legyen.", en: "Wall picture or mount being aligned so the room feels more orderly." }],
          ["4981802", "process", { hu: "Fali rögzítés és szerelés olyan helyen, ahol a kész eredmény használhatóbbá teszi a szobát.", en: "Wall fixing work that makes the room more usable once completed." }],
          ["assets/handyman-services-wall-fixtures.jpg", "after", { hu: "Felszerelt, rendezett fali polcok: a javítás használható tárolást és tisztább képet ad.", en: "Installed wall shelves creating usable storage and a cleaner visual result." }],
          ["19109111", "after", { hu: "Stabil, kész polcrendszer, amely a korábbi üres vagy rendezetlen falfelületet használhatóvá teszi.", en: "Stable finished shelving that turns an empty or untidy wall into useful storage." }],
          ["9565966", "after", { hu: "Rendezett fali tároló kisebb szerelés után, átadásra alkalmasabb belső képpel.", en: "Orderly wall storage after small installation work, improving the handover impression." }],
          ["5824546", "after", { hu: "Teljes falon megjelenő tároló és polcrendszer kész állapotban.", en: "Full wall storage and shelving shown in finished condition." }],
          ["19109111", "after", { hu: "Egyszerű, stabil fali polc elkészült állapotban, hétköznapi lakásbelsőben.", en: "A simple, stable wall shelf in a normal apartment interior." }],
          ["5824575", "after", { hu: "Kész fali tároló teljes nézetben, ahol a javítás eredménye egyértelműen látszik.", en: "Finished wall storage shown in full view, making the result easy to understand." }],
        ],
      },
    ];

    const projects = [
      {
        key: "paint",
        type: { hu: "Festés / faljavítás", en: "Painting / wall repair" },
        cover: "assets/budapest-finished-room-1.jpg",
        comparison: true,
        before: "assets/budapest-painting-before-matched.jpg",
        after: "assets/budapest-finished-room-1.jpg",
        title: { hu: "Kopott falból tiszta, egységes felület", en: "From tired walls to a clean finish" },
        summary: {
          hu:
            "Bérlőváltás vagy vendégérkezés előtt a falhibák azonnal látszanak. A cél az, hogy a helyiség gyorsan újra rendezett és bemutatható legyen.",
          en:
            "Before a tenant change or guest arrival, wall defects are immediately visible. The goal is to make the room presentable again quickly.",
        },
        result: {
          hu: "A helyiség tisztábbnak, gondozottabbnak és kiadhatóbbnak hat. A látogató nem a hibákat veszi észre először.",
          en: "The room feels cleaner, better cared for and easier to present. Visitors notice the space, not the defects.",
        },
        works: {
          hu: ["falhibák ellenőrzése fotók alapján", "felület előkészítése", "javítás és csiszolás", "egységes festés", "fotós visszajelzés"],
          en: ["photo-based wall condition check", "surface preparation", "patching and sanding", "consistent painted finish", "photo update after completion"],
        },
        photos: services[0].photos,
      },
      {
        key: "drywall",
        type: { hu: "Gipszkarton / mennyezet", en: "Drywall / ceiling" },
        cover: "assets/budapest-finished-room-2.jpg",
        comparison: true,
        before: "assets/budapest-drywall-before-matched.jpg",
        after: "assets/budapest-finished-room-2.jpg",
        title: { hu: "Félkész gipszkartonból festésre kész felület", en: "Drywall prepared for a finished interior" },
        summary: {
          hu:
            "A látható hézagok, élek és csiszolatlan javítások félkész hatást keltenek. Ilyenkor a cél nem látványos trükk, hanem pontos, tiszta előkészítés.",
          en:
            "Visible seams, edges and unsanded areas make a room feel unfinished. The aim is careful preparation, not cosmetic shortcuts.",
        },
        result: {
          hu: "A fal vagy mennyezet rendezett, festésre alkalmas és kevésbé vonja magára a figyelmet.",
          en: "The wall or ceiling becomes tidy, paint-ready and no longer distracts from the room.",
        },
        works: {
          hu: ["állapotfelmérés", "hézagok és élek javítása", "csiszolás", "felületkiegyenlítés", "átadás előtti ellenőrzés"],
          en: ["condition check", "seam and edge repair", "sanding", "surface levelling", "pre-handover review"],
        },
        photos: services[1].photos,
      },
      {
        key: "garden",
        type: { hu: "Kert / udvar", en: "Garden / outdoor" },
        cover: "assets/garden-maintenance-hero-garden.jpg",
        before: "assets/budapest-courtyard-before-entrance.jpg",
        after: "assets/budapest-courtyard-garden-1.jpg",
        title: { hu: "Benőtt udvarból gondozottabb érkezés", en: "From overgrown courtyard to a cared-for arrival" },
        summary: {
          hu:
            "A kert, udvar vagy bejárat gyakran az első pont, ahol az érdeklődő képet alkot az ingatlanról.",
          en:
            "The garden, yard or entrance often shapes trust before anyone steps inside the property.",
        },
        result: {
          hu: "Az ingatlan rendezettebbnek és gondozottabbnak tűnik már érkezéskor, ami bérleménynél és Airbnb-nél különösen fontos.",
          en: "The property feels better cared for from the first moment, especially for rentals and Airbnb homes.",
        },
        works: {
          hu: ["fűnyírás", "szegélyrendezés", "benőtt részek visszavágása", "zöldhulladék összegyűjtése", "kész állapot fotózása"],
          en: ["mowing", "edge tidying", "trimming overgrown areas", "green waste collection", "final condition photos"],
        },
        photos: services[2].photos,
      },
    ];

    Object.assign(projects[0], {
      category: "painting",
      location: { hu: "Budapesti kiadó lakás", en: "Budapest rental apartment" },
      timeline: { hu: "egyeztetett ütemezés", en: "agreed scheduling" },
      client: { hu: "bérlőváltás előtt", en: "before tenant handover" },
      problem: {
        hu:
          "A falakon javításnyomok, kopások és foltok voltak. Ilyenkor az ingatlan nem igényel teljes felújítást, de a látható hibák azonnal rontják az első benyomást.",
        en:
          "The walls had visible marks, patch areas and wear. This did not require a full renovation, but the visible defects weakened the first impression immediately.",
      },
      approach: {
        hu:
          "A kritikus falrészeket fotók alapján beazonosítjuk, majd a felületet előkészítjük, javítjuk, csiszoljuk és egységesebb festett állapotban adjuk vissza.",
        en:
          "The critical wall areas are identified from photos, then prepared, repaired, sanded and handed back with a more consistent painted finish.",
      },
      evidence: {
        hu: ["előtte fotók", "felület-előkészítés", "javítás és csiszolás", "kész állapot fotók"],
        en: ["before photos", "surface preparation", "patching and sanding", "finished condition photos"],
      },
      metrics: [
        { n: "10", hu: "képes példa", en: "visual examples" },
        { n: "3", hu: "munkafázis", en: "work phases" },
        { n: { hu: "Egyeztetve", en: "Agreed" }, hu: "ütemezés", en: "timing" },
      ],
    });

    Object.assign(projects[1], {
      category: "drywall",
      location: { hu: "Lakásbelső / mennyezeti rész", en: "Interior apartment ceiling area" },
      timeline: { hu: "javítás és festésre előkészítés", en: "repair and paint-ready preparation" },
      client: { hu: "tulajdonosi felkészítés", en: "owner preparation" },
      problem: {
        hu:
          "A félkész gipszkarton és a rendezetlen hézagok amatőr hatást keltenek. Egy ilyen rész akkor is feltűnik, ha a lakás többi része rendben van.",
        en:
          "Unfinished drywall and rough seams make an interior feel improvised. Even a small area like this can stand out when the rest of the apartment is tidy.",
      },
      approach: {
        hu:
          "A hangsúly a pontos éleken, a simább átmeneteken és a festésre alkalmas felületen van. Nem látványos díszítés, hanem tiszta alapmunka.",
        en:
          "The focus is on cleaner edges, smoother transitions and a surface that is ready for painting. It is practical groundwork, not decorative cover-up.",
      },
      evidence: {
        hu: ["gipszkarton állapot", "hézagjavítás", "csiszolás", "átadás előtti kontroll"],
        en: ["drywall condition", "seam repair", "sanding", "pre-handover check"],
      },
      metrics: [
        { n: "10", hu: "képes példa", en: "visual examples" },
        { n: "5", hu: "ellenőrzési pont", en: "check points" },
        { n: "HU/EN", hu: "egyeztetés", en: "communication" },
      ],
    });

    Object.assign(projects[2], {
      category: "garden",
      location: { hu: "Budapesti udvar és bejárati rész", en: "Budapest yard and entrance area" },
      timeline: { hu: "szezonális rendbetétel", en: "seasonal clean-up" },
      client: { hu: "bérlemény / Airbnb előkészítés", en: "rental / Airbnb preparation" },
      problem: {
        hu:
          "A magas fű, elhanyagolt szegély és rendezetlen bejárat már érkezéskor bizonytalanságot kelt. Ez különösen gond Airbnb-nél vagy bérleménynél.",
        en:
          "Overgrown grass, rough edges and a neglected entrance create doubt before anyone enters the property. This matters especially for rentals and Airbnb homes.",
      },
      approach: {
        hu:
          "A cél nem kertépítés, hanem gyors, látható rend: nyírás, szegélyezés, visszavágás, összegyűjtés és fotózott kész állapot.",
        en:
          "The aim is not landscape design, but fast visible order: mowing, edging, trimming, collection and a photographed finished condition.",
      },
      evidence: {
        hu: ["előtte állapot", "nyírás és szegélyezés", "zöldhulladék rendezése", "kész állapot"],
        en: ["before condition", "mowing and edging", "green waste tidy-up", "finished condition"],
      },
      metrics: [
        { n: "10", hu: "képes dokumentáció", en: "photo records" },
        { n: "1", hu: "rendezett érkezés", en: "tidier arrival" },
        { n: "0", hu: "felesleges kör", en: "unneeded detours" },
      ],
    });

    projects.push(
      {
        key: "airbnb-turnover",
        category: "airbnb",
        type: { hu: "Airbnb / bérlőváltás", en: "Airbnb / tenant turnover" },
        cover: "assets/budapest-airbnb-living-room.jpg",
        comparison: true,
        before: "assets/budapest-airbnb-before-turnover-matched.jpg",
        after: "assets/budapest-airbnb-living-room.jpg",
        title: { hu: "Lakásfrissítés vendégérkezés előtt", en: "Apartment refresh before guest arrival" },
        location: { hu: "Budapesti Airbnb lakás", en: "Budapest Airbnb apartment" },
        timeline: { hu: "vendégérkezéshez igazítva", en: "planned around guest arrival" },
        client: { hu: "vendégváltás előtt", en: "before guest turnover" },
        summary: {
          hu:
            "Vendégváltás előtt a kisebb hibák is feltűnőek. Ilyenkor a legfontosabb a pontosan egyeztetett, tiszta és dokumentált munka.",
          en:
            "Before a guest turnover, even small defects are noticeable. The priority is clearly scheduled, tidy and documented work.",
        },
        problem: {
          hu:
            "A lakásban több kisebb nyom, rögzítési hiba és javítandó rész jelent meg egyszerre. A tulajdonosnak nem külön szakikat kell szerveznie minden apróságra.",
          en:
            "Several smaller marks, fixing issues and visible defects appeared at once. The owner should not have to coordinate separate trades for every small item.",
        },
        approach: {
          hu:
            "A látható hibákat rangsoroljuk: ami a vendégnek azonnal feltűnik, előre kerül. A munka végén képes visszajelzés segíti a távoli döntést.",
          en:
            "Visible issues are prioritised by guest impact. At completion, photo updates help the owner make decisions remotely.",
        },
        result: {
          hu:
            "A lakás gyorsabban vállalható állapotba kerül, kevesebb bizonytalansággal a vendégérkezés előtt.",
          en:
            "The apartment becomes presentable faster, with less uncertainty before guest arrival.",
        },
        works: {
          hu: ["látható hibák listázása", "falfrissítés", "kisebb rögzítések", "átadás előtti ellenőrzés", "fotós dokumentáció"],
          en: ["visible issue list", "wall touch-up", "small fixings", "pre-handover check", "photo documentation"],
        },
        evidence: {
          hu: ["problémalista", "javítás közbeni fotók", "kész állapot", "tulajdonosi visszajelzésre kész anyag"],
          en: ["issue list", "work-in-progress photos", "finished condition", "owner-ready update"],
        },
        metrics: [
          { n: "10", hu: "fotó", en: "photos" },
          { n: "4", hu: "javítási típus", en: "repair types" },
          { n: "1", hu: "kapcsolattartási pont", en: "contact point" },
        ],
        photos: [
          ["5102904", "before", { hu: "Vendégváltás előtti lakott állapot: a nappalit rendezettebbé és fotózhatóbbá kell tenni.", en: "Lived-in condition before guest turnover: the living room needs to become tidier and easier to present." }],
          ["6195959", "process", { hu: "Airbnb előkészítés takarítással és ellenőrzéssel, teljesebb lakótérben látható munkával.", en: "Airbnb preparation with cleaning and checking, shown in a fuller living-space context." }],
          ["6764827", "after", { hu: "Kész, rendezett nappali vendégérkezéshez: tiszta, átlátható és használható tér.", en: "Finished living room for guest arrival: clean, clear and usable." }],
          ["8135495", "after", { hu: "Rendezett hálószoba átadás előtt, tiszta textillel és ellenőrizhető összképpel.", en: "Tidy bedroom before handover, with clean textiles and a reviewable overall condition." }],
          ["19899060", "after", { hu: "Világos, teljes nappali kész állapotban, amely jól mutat vendégfotón és átadáskor.", en: "Bright full living room in finished condition, suitable for guest photos and handover." }],
          ["assets/budapest-airbnb-living-room.jpg", "after", { hu: "Hétköznapi budapesti nappali rendezett, vendégfogadásra kész állapotban.", en: "Everyday Budapest living room in a tidy, guest-ready condition." }],
          ["assets/budapest-finished-room-2.jpg", "after", { hu: "Frissen festett, egyszerű budapesti szoba tiszta járófelülettel.", en: "Freshly painted, simple Budapest room with clear circulation." }],
          ["assets/budapest-finished-room-1.jpg", "after", { hu: "Világos budapesti lakószoba rendezett falakkal, átadásra kész állapotban.", en: "Bright Budapest living room with tidy walls, ready for handover." }],
          ["assets/budapest-airbnb-bedroom.jpg", "after", { hu: "Tiszta, visszafogott hálószoba, amely vendégnek és tulajdonosnak is könnyen ellenőrizhető.", en: "Clean, understated bedroom that is easy for both guest and owner to review." }],
          ["271624", "after", { hu: "Kompakt Airbnb lakótér kész állapotban, rendezett fallal és használható elrendezéssel.", en: "Compact Airbnb living area in finished condition, with tidy walls and usable layout." }],
        ],
      },
      {
        key: "office-touchup",
        category: "office",
        type: { hu: "Iroda / képviseleti tér", en: "Office / representative space" },
        cover: "assets/budapest-office-finished-1.jpg",
        comparison: true,
        before: "assets/budapest-office-before-touchup-matched.jpg",
        after: "assets/budapest-office-finished-1.jpg",
        title: { hu: "Iroda gyors frissítése látogatás előtt", en: "Office touch-up before a visit" },
        location: { hu: "Budapesti iroda", en: "Budapest office" },
        timeline: { hu: "rövid, célzott munka", en: "short, focused work" },
        client: { hu: "nemzetközi környezet", en: "international environment" },
        summary: {
          hu:
            "Irodáknál és képviseleti tereknél nem fér bele a zavaros kivitelezés. A munka legyen rövid, diszkrét és tisztán kommunikált.",
          en:
            "Offices and representative spaces need quiet, organised work. The job should be short, discreet and clearly communicated.",
        },
        problem: {
          hu:
            "A falakon és használati pontokon apró sérülések rontották a rendezett képet. Ezek nem nagy hibák, de egy látogatásnál feltűnnek.",
          en:
            "Small marks and worn areas affected the professional feel of the office. They were not major defects, but they are noticeable during a visit.",
        },
        approach: {
          hu:
            "A munka a látható felületekre koncentrál: faljavítás, javítófestés, kisebb igazítások és tiszta átadás.",
          en:
            "Work focuses on visible surfaces: wall repair, touch-up painting, small adjustments and clean handover.",
        },
        result: {
          hu:
            "Az iroda rendezettebb, nyugodtabb és vendégfogadásra alkalmasabb benyomást kelt.",
          en:
            "The office feels more orderly, calmer and better prepared for visitors.",
        },
        works: {
          hu: ["látható sérülések felmérése", "javítófestés", "gipszkarton részjavítás", "kisebb szerelés", "tiszta átadás"],
          en: ["visible defect check", "touch-up painting", "minor drywall repair", "small adjustments", "tidy handover"],
        },
        evidence: {
          hu: ["diszkrét munkaszervezés", "részletfotók", "átadás előtti ellenőrzés", "kész állapot"],
          en: ["discreet scheduling", "detail photos", "pre-handover check", "finished condition"],
        },
        metrics: [
          { n: "HU/EN", hu: "kommunikáció", en: "communication" },
          { n: "5", hu: "ellenőrzési pont", en: "check points" },
          { n: "10", hu: "kép", en: "images" },
        ],
        photos: [
          ["5483236", "before", { hu: "Üres irodatér frissítés előtt: a cél a tiszta, használatra kész munkakörnyezet.", en: "Empty office before refresh, with the goal of a clean, usable work environment." }],
          ["8477444", "before", { hu: "Nagyobb nyitott iroda átadás előtt, ahol a teljes tér összképe számít.", en: "Large open office before handover, where the overall impression matters." }],
          ["assets/budapest-office-process-wall-touchup.jpg", "process", { hu: "Szervezett javítófestés egy budapesti iroda kisebb falszakaszán.", en: "Organised touch-up painting on a small wall section in a Budapest office." }],
          ["5511098", "process", { hu: "Nagyobb irodai munkatér ellenőrzése frissítés előtt, teljesebb perspektívából.", en: "Larger office workspace reviewed before refresh, shown from a wider perspective." }],
          ["assets/budapest-office-finished-1.jpg", "after", { hu: "Rendezett budapesti irodatér tiszta falakkal és hétköznapi berendezéssel.", en: "Tidy Budapest office with clean walls and practical furnishings." }],
          ["assets/budapest-office-finished-2.jpg", "after", { hu: "Világos, látogatófogadásra kész budapesti váró- és közösségi tér.", en: "Bright Budapest waiting and shared area ready to receive visitors." }],
          ["assets/budapest-office-finished-3.jpg", "after", { hu: "Egyszerű budapesti tárgyaló egységes falakkal és rendezett összképpel.", en: "Simple Budapest meeting room with consistent walls and an orderly appearance." }],
          ["7534216", "after", { hu: "Kész tárgyaló jellegű tér, tiszta falakkal és rendezett összképpel.", en: "Finished meeting-style room with clean walls and an orderly appearance." }],
          ["36631699", "after", { hu: "Tágas iroda teljes nézetben, rendezett munkaállomásokkal.", en: "Spacious office shown in full view, with orderly workstations." }],
          ["1181406", "after", { hu: "Teljes irodatér használat közben: a frissített környezet professzionálisabb képet ad.", en: "Full office area in use, with the refreshed environment supporting a more professional feel." }],
        ],
      },
      {
        key: "handover-small-fixes",
        category: "handyman",
        type: { hu: "Kisebb javítások / átadás", en: "Small repairs / handover" },
        cover: "assets/budapest-airbnb-bedroom.jpg",
        comparison: true,
        before: "assets/budapest-handyman-before-matched.jpg",
        after: "assets/budapest-airbnb-bedroom.jpg",
        title: { hu: "Apró hibákból rendezett átadás", en: "Small defects turned into a tidy handover" },
        location: { hu: "Budapesti bérlemény", en: "Budapest rental property" },
        timeline: { hu: "átadás előtti javítás", en: "pre-handover repairs" },
        client: { hu: "tulajdonos / kezelő", en: "owner / manager" },
        summary: {
          hu:
            "A kisebb hibák külön-külön nem tűnnek súlyosnak, de együtt azt sugallják, hogy az ingatlan nincs kézben tartva.",
          en:
            "Small defects may not look serious individually, but together they suggest the property is not being managed properly.",
        },
        problem: {
          hu:
            "Karnis, polc, fogantyú, szegély vagy ajtóigazítás jellegű apróságok gyűltek össze. Ezek átadásnál vagy fotózásnál erősen látszanak.",
          en:
            "Small items such as rails, shelves, handles, trims or door adjustments had built up. These details are visible during handover or photography.",
        },
        approach: {
          hu:
            "A munkát listázzuk, majd egy körben kezeljük a kisebb hibákat. Így a tulajdonos nem veszít időt sok külön egyeztetéssel.",
          en:
            "The items are listed and handled in one focused visit, reducing the need for the owner to coordinate multiple small tasks.",
        },
        result: {
          hu:
            "Az ingatlan rendezettebb és átadhatóbb lett, a javítások pedig követhető listában szerepelnek.",
          en:
            "The property becomes tidier and easier to hand over, with completed fixes documented in a clear list.",
        },
        works: {
          hu: ["javítási lista", "kisebb rögzítések", "ajtó és szegély igazítás", "látható hibák kezelése", "fotós visszajelzés"],
          en: ["repair list", "small fixings", "door and trim adjustments", "visible defect handling", "photo update"],
        },
        evidence: {
          hu: ["feladatlista", "munkafolyamat képek", "kész állapot", "átadásra alkalmasabb tér"],
          en: ["task list", "process images", "finished condition", "more handover-ready space"],
        },
        metrics: [
          { n: "1", hu: "szervezett kör", en: "organised visit" },
          { n: "10", hu: "fotó", en: "photos" },
          { n: "5+", hu: "tipikus apró hiba", en: "typical small defects" },
        ],
        photos: services[3].photos,
      }
    );

    const phaseCounts = (photos = []) =>
      photos.reduce(
        (counts, photo) => {
          counts[photo[1]] += 1;
          return counts;
        },
        { before: 0, process: 0, after: 0 }
      );

    const homepageHashTargets = new Set(["services", "clients", "projects", "media", "contact"]);
    let hashScrollFrame = 0;
    const scrollToCurrentHashTarget = () => {
      const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (!homepageHashTargets.has(id)) return;
      const target = document.getElementById(id);
      if (!target) return;
      const headerHeight = Math.ceil(document.querySelector(".header")?.getBoundingClientRect().height || 76);
      const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 18;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: "auto" });
    };
    const scheduleHashScroll = () => {
      if (!window.location.hash) return;
      window.cancelAnimationFrame(hashScrollFrame);
      hashScrollFrame = window.requestAnimationFrame(() => {
        hashScrollFrame = window.requestAnimationFrame(scrollToCurrentHashTarget);
      });
    };

    const problemDetails = [
      {
        service: { hu: "Ingatlankarbantartás", en: "Property maintenance" },
        href: "property-maintenance-budapest.html",
        projectIndex: 0,
        next: {
          hu: "Küldjön néhány áttekintő fotót, a budapesti kerületet és azt, hogyan lehet bejutni az ingatlanba. Így gyorsan látható, hogy fotók alapján elindítható-e a feladat.",
          en: "Send a few overview photos, the Budapest district and access details. This makes it clear whether the task can start from photos or needs an on-site check.",
        },
      },
      {
        service: { hu: "Takarítás és karbantartás", en: "Cleaning and maintenance" },
        href: "cleaning-services-budapest.html",
        projectIndex: 3,
        next: {
          hu: "Írja meg a következő vendég érkezési idejét, küldjön fotókat a látható hibákról, és jelölje meg, mi számít sürgősnek.",
          en: "Share the next guest arrival time, send photos of visible issues and mark what is urgent.",
        },
      },
      {
        service: { hu: "Festés és faljavítás", en: "Painting and wall repairs" },
        href: "painting-wall-repairs-budapest.html",
        projectIndex: 0,
        next: {
          hu: "Küldjön képeket a falhibákról, a helyiségről és az átadási határidőről. Ebből eldönthető, javítófestés vagy nagyobb frissítés indokolt-e.",
          en: "Send photos of the wall defects, the room and the handover deadline. From there we can clarify whether touch-up painting or a fuller refresh makes sense.",
        },
      },
      {
        service: { hu: "Ezermester és ingatlankarbantartás", en: "Handyman and property maintenance" },
        href: "handyman-services-budapest.html",
        projectIndex: 5,
        next: {
          hu: "Készítsen rövid listát a hibákról, mellékeljen fotókat, és írja le, ki tudja jóváhagyni az esetleges változásokat.",
          en: "Prepare a short task list, attach photos and note who can approve any scope changes.",
        },
      },
      {
        service: { hu: "Kertfenntartás", en: "Garden maintenance" },
        href: "garden-maintenance-budapest.html",
        projectIndex: 2,
        next: {
          hu: "Küldjön kültéri fotókat, jelölje meg a hozzáférést és az időjárástól függő határidőt. Így reális ütemezést lehet adni.",
          en: "Send outdoor photos, access details and any weather-sensitive deadline. This helps set a realistic schedule.",
        },
      },
      {
        service: { hu: "Festés, faljavítás és szerelés", en: "Painting, wall repairs and fittings" },
        href: "painting-wall-repairs-budapest.html",
        projectIndex: 4,
        next: {
          hu: "Küldjön fotókat a látogatás előtt zavaró részletekről, a működési időről és a belépési szabályokról. Így diszkréten ütemezhető a munka.",
          en: "Send photos of the details that matter before the visit, plus operating hours and access rules. The work can then be scheduled discreetly.",
        },
      },
    ];

    const process = [
      ["Fotók, cím és időzítés", "Photos, location and timing", "Küldje el a problémát, néhány fotót, a budapesti helyszínt és azt, mikorra fontos az átadás vagy vendégérkezés.", "Send the issue, a few photos, the Budapest location and the timing that matters for handover or guest arrival."],
      ["Feladatlista és hozzáférés", "Scope and access", "Tisztázzuk, mi tartozik a munkába, hogyan lehet bejutni, ki dönthet a változásokról, és kell-e helyszíni felmérés.", "We clarify what is included, how access works, who can approve changes and whether an on-site assessment is needed."],
      ["Egyeztetett munkavégzés", "Agreed execution", "A kivitelezés a jóváhagyott feladatokra koncentrál. Ha közben új kérdés merül fel, azt nem feltételezéssel, hanem külön egyeztetéssel kezeljük.", "Work follows the agreed scope. If a new question appears, it is handled by a separate check-in rather than assumption."],
      ["Fotós állapotfrissítés", "Photo condition update", "Kérés szerint láthatóvá tesszük a kiinduló állapotot, a fontos munkafázist és az elkészült eredményt.", "When requested, photos show the starting condition, important work stages and the finished result."],
      ["Rendezett átadás", "Orderly handover", "Az elkészült feladatokat röviden összefoglaljuk, az ingatlant pedig használható, tiszta és bemutatható állapotban hagyjuk.", "Completed tasks are summarised and the property is left usable, tidy and ready to present."],
    ];

    const audience = [
      ["Nagykövetségek és képviseletek", "Embassies and representative offices", "Diszkrét egyeztetés és rendezett munkavégzés rezidenciákban, irodákban és képviseleti terekben. A feladatok a helyszín használatához és a belépési szabályokhoz igazíthatók.", "Discreet coordination and orderly work in residences, offices and representative spaces. Tasks can be planned around the use of the property and site-access requirements."],
      ["Nemzetközi cégek és irodák", "International companies and offices", "Kisebb javítások, falfrissítés és szerelési feladatok a napi működéshez igazítva. A cél a rendezett környezet helyreállítása indokolatlan fennakadás nélkül.", "Minor repairs, wall refreshes and fittings can be scheduled around normal operations. The goal is to restore an orderly environment without unnecessary disruption."],
      ["Külföldi tulajdonosok", "Foreign property owners", "Az egyeztetés magyarul vagy angolul történhet, a fontos állapotokról pedig fotós visszajelzés kérhető. Ez különösen hasznos, ha a tulajdonos nem tartózkodik Budapesten.", "Communication is available in Hungarian or English, with photo updates for important stages. This is particularly useful when the owner is not in Budapest."],
      ["Airbnb és hosszú távú bérlemények", "Airbnb and long-term rentals", "Vendég- vagy bérlőváltás előtt a látható hibák, faljavítások és kisebb karbantartási feladatok egy folyamatban kezelhetők. A határidőt mindig a tényleges munka alapján egyeztetjük.", "Visible defects, wall repairs and small maintenance jobs can be handled together before a guest or tenant change. Timing is always agreed against the actual scope."],
      ["Ingatlankezelők és helyi kapcsolattartók", "Property managers and local coordinators", "Ha több kisebb feladat gyűlik össze egy lakásban, irodában vagy közös területen, a munkát átlátható listába rendezzük. Ez segít abban, hogy a tulajdonos, kezelő és helyszíni kapcsolattartó ugyanazt lássa.", "When several small tasks build up in an apartment, office or shared area, they are organised into a clear list. This helps the owner, manager and local contact work from the same information."],
      ["Magánházak és lakástulajdonosok", "Private homeowners and apartment owners", "Családi házak és saját használatú lakások kisebb javításai, festése, gipszkarton-javítása, kert- és szezonális karbantartása is egy átlátható feladatlistába rendezhető. Költözés vagy értékesítés előtt segítünk az otthont rendezett, használható és bemutatható állapotba hozni.", "Small repairs, painting, drywall work, garden care and seasonal maintenance can be organised into one clear scope for family houses and owner-occupied apartments. Before moving in or selling, we help prepare the home so it is tidy, usable and ready to present."],
    ];

    const faq = [
      ["Lehet csak kisebb munkát kérni?", "Can I request a small job?", "Igen. A szolgáltatás kifejezetten alkalmas kisebb, de fontos javításokra is, például falhibákra, szerelési feladatokra vagy átadás előtti frissítésre. A vállalhatóságot mindig a helyszín, a feladatlista és az időzítés alapján erősítjük meg.", "Yes. The service is suitable for smaller but important jobs such as wall repairs, fittings or pre-handover touch-ups. Availability is confirmed against the location, task list and required timing."],
      ["Küldhetek fotókat első körben?", "Can I send photos first?", "Igen, ez a legegyszerűbb kiindulópont. Néhány jól megvilágított összkép és közelkép sokszor elég ahhoz, hogy meghatározzuk a következő lépést. Ha a pontos műszaki tartalom fotókból nem állapítható meg, helyszíni felmérést javaslunk.", "Yes, that is usually the easiest place to start. A few clear overview and close-up photos are often enough to identify the next step. If the technical scope cannot be confirmed from images, we will recommend an on-site assessment."],
      ["Angolul is lehet egyeztetni?", "Is English communication available?", "Igen. A feladat egyeztetése, a munkafázisok visszajelzése és az átadás magyarul vagy angolul is történhet. Ez nem külön szolgáltatás, hanem a működés része.", "Yes. Scope, progress updates and handover can all be handled in Hungarian or English. Bilingual communication is part of the service, not an add-on."],
      ["Hogyan alakul az ár?", "How is pricing established?", "Az ár a tényleges feladatból, az anyagigényből, a hozzáférésből és az időzítésből áll össze. Fotók alapján gyakran adható első tájékoztatás, de összetettebb vagy rejtett hibáknál helyszíni felmérés szükséges lehet. A jóváhagyott munkán túli változásokat külön egyeztetjük.", "Pricing depends on the actual scope, materials, access and timing. Photos can often support an initial indication, while complex or concealed issues may require a site assessment. Changes beyond the agreed work are discussed separately."],
      ["Tudnak segíteni sürgős Airbnb-helyzetben?", "Can you help with an urgent Airbnb issue?", "A rövid határidejű feladatokat kapacitás és a munka terjedelme alapján vizsgáljuk meg. A fotók, a pontos cím és a következő vendég érkezési ideje segít gyorsan eldönteni, mi vállalható reálisan. Nem ígérünk olyan határidőt, amely mellett a munka minősége nem tartható.", "Short-notice work is considered against current capacity and the real scope. Photos, the exact location and the next arrival time help us assess what can be completed realistically. We do not promise a deadline that would compromise the work."],
      ["Mi történik, ha nem vagyok Budapesten?", "What if I am not in Budapest?", "A feladat távolról is egyeztethető, ha a bejutás és a döntési jogosultság rendezett. A fontos kérdéseket indulás előtt tisztázzuk, a munkáról pedig kérés szerint fotós frissítést küldünk. Kulcsátadást vagy helyszíni kapcsolattartót minden esetben előre egyeztetünk.", "The work can be coordinated remotely when access and decision-making authority are clear. Important questions are settled before the visit, with photo updates available on request. Key handover or a local contact is always agreed in advance."],
      ["Budapesten kívül is vállalnak munkát?", "Do you work outside Budapest?", "Az elsődleges működési terület Budapest. A közvetlen környéken lévő feladatokat a távolság, a munka mérete és az időzítés alapján lehet megvizsgálni. Érdemes elküldeni a pontos helyszínt már az első üzenetben.", "Budapest is the primary service area. Jobs in the nearby area can be considered depending on distance, scope and timing. Include the exact location in the first message so feasibility can be assessed quickly."],
      ["A weboldal képei saját referenciák?", "Are the website images completed client projects?", "Nem. Az oldalon szereplő képek illusztratív példák, amelyek tipikus kiinduló állapotokat, munkafázisokat és várható eredményeket mutatnak. Egy konkrét ingatlan feladatát mindig a helyszín és a tényleges állapot alapján egyeztetjük.", "No. The images are illustrative examples showing typical starting conditions, work stages and expected outcomes. The scope for a specific property is always agreed from its actual condition and site requirements."],
    ];

    projects.forEach((project) => {
      project.description = project.description || project.summary;
      project.images = project.images || project.photos || [];
      project.photos = project.images;
      project.videos = [];
    });

    const projectCarousel = (item, index, mode = "card") => {
      const id = `${mode}-${index}`;
      const isModal = mode === "modal";
      const images = item.images || [];
      return `
        <div class="project-carousel ${isModal ? "large" : "compact"}" data-carousel="${id}" data-project-index="${index}" data-carousel-action="${isModal ? "gallery" : "project"}" data-active="0" data-phase="all">
          <div class="carousel-head">
            <strong>${state.lang === "hu" ? "Illusztratív képsorozat" : "Illustrative image sequence"}</strong>
            <span data-carousel-count aria-live="polite">${images.length} ${state.lang === "hu" ? "kép" : "images"}</span>
          </div>
          <div class="carousel-stage">
            <button class="carousel-arrow carousel-prev" type="button" data-carousel-prev="${id}" aria-label="${state.lang === "hu" ? "Előző kép" : "Previous image"}">‹</button>
            <div class="carousel-viewport">
              <div class="carousel-track">
                ${images.map((p, i) => `<button class="carousel-slide" type="button" data-slide="${i}" data-phase="${p[1]}"><img src="${img(p[0], isModal ? 1100 : 520)}" alt="${photoCaption(p)}" loading="${isModal && i === 0 ? "eager" : "lazy"}" decoding="async"><span class="slide-caption"><b>${phaseText(p[1])}</b><span>${photoCaption(p)}</span></span></button>`).join("")}
              </div>
            </div>
            <button class="carousel-arrow carousel-next" type="button" data-carousel-next="${id}" aria-label="${state.lang === "hu" ? "Következő kép" : "Next image"}">›</button>
          </div>
          <div class="carousel-thumbs">
            ${images.map((p, i) => `<button type="button" data-carousel-dot="${id}" data-slide-to="${i}" data-phase="${p[1]}" aria-label="${phaseText(p[1])} ${i + 1}: ${photoCaption(p)}"><img src="${img(p[0], 180)}" alt="" loading="lazy" decoding="async"></button>`).join("")}
          </div>
        </div>`;
    };

    let globalEventsBound = false;
    let revealObserver;
    let revealSweepListener;
    const modalOpeners = new WeakMap();


    const hydrate = () => {
      bind();
      reveal();
      initCarousels(document);
      document.querySelectorAll(".project-grid-rich [data-compare]").forEach(initCompare);
      scheduleHashScroll();
    };

    const bind = () => {
      document.getElementById("langBtn")?.addEventListener("click", (event) => {
        if (!window.BPS_I18N?.setLanguage) return;
        event.preventDefault();
      });
      const syncDisclosure = (detail) => {
        const summary = detail.querySelector("summary");
        const isOpen = detail.open;
        summary?.setAttribute("aria-expanded", String(isOpen));
        summary?.querySelectorAll(".closed-label").forEach((label) => {
          label.hidden = isOpen;
          label.setAttribute("aria-hidden", String(isOpen));
        });
        summary?.querySelectorAll(".open-label").forEach((label) => {
          label.hidden = !isOpen;
          label.setAttribute("aria-hidden", String(!isOpen));
        });
      };
      const bindDisclosure = (detail) => {
        if (detail.dataset.disclosureBound === "true") return;
        detail.dataset.disclosureBound = "true";
        const summary = detail.querySelector("summary");
        syncDisclosure(detail);
        detail.addEventListener("toggle", () => syncDisclosure(detail));
        summary?.addEventListener("keydown", (event) => {
          if (!["Enter", " "].includes(event.key)) return;
          event.preventDefault();
          detail.open = !detail.open;
          syncDisclosure(detail);
        });
      };
      document.querySelectorAll("details.stat, details.problem, details.audience").forEach(bindDisclosure);
      document.querySelectorAll("[data-accordion-group]").forEach((group) => {
        group.querySelectorAll("details").forEach((detail) => {
          detail.addEventListener("toggle", () => {
            if (!detail.open) return;
            group.querySelectorAll("details[open]").forEach((other) => {
              if (other !== detail) other.open = false;
            });
          });
        });
      });
      document.querySelectorAll("[data-situation-gallery]").forEach((btn) => {
        btn.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          const detail = problemDetails[Number(btn.dataset.situationGallery)];
          const galleryProject = detail ? projects[detail.projectIndex] : null;
          if (!galleryProject) return;
          openGallery(projectLightboxImages(galleryProject), 0, tx(galleryProject.title));
        });
      });
      document.querySelectorAll("[data-project-filter]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const filter = btn.dataset.projectFilter;
          state.projectFilter = filter;
          document.querySelectorAll("[data-project-filter]").forEach((other) => other.classList.toggle("active", other === btn));
          document.querySelectorAll(".project-grid-rich .project-card").forEach((card) => {
            card.hidden = filter !== "all" && card.dataset.projectCategory !== filter;
          });
          document.getElementById("projects")?.scrollIntoView({ block: "start" });
        });
      });
      document.querySelectorAll("[data-service]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const item = services[Number(btn.dataset.service)];
          openGallery(item.photos, 0, tx(item.title));
        });
      });
      document.querySelectorAll("[data-project]").forEach((btn) => {
        btn.addEventListener("click", () => openProject(Number(btn.dataset.project)));
      });
      document.querySelectorAll("[data-project-gallery]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const project = projects[Number(btn.dataset.projectGallery)];
          openGallery(projectLightboxImages(project), 0, tx(project.title));
        });
      });
      document.querySelectorAll("[data-close]").forEach((btn) => {
        btn.addEventListener("click", () => closeModal(btn.closest(".modal")));
      });
      if (!globalEventsBound) {
        globalEventsBound = true;
        document.addEventListener("keydown", (event) => {
          const modal = activeModal();
          const comparisonMode = modal?.id === "galleryModal" && modal.dataset.galleryMode === "comparison";
          if (event.key === "Escape" && modal) {
            event.preventDefault();
            closeModal(modal);
          } else if (event.key === "Tab" && modal) {
            trapFocus(event, modal);
          } else if (modal?.id === "galleryModal" && !comparisonMode && event.key === "ArrowLeft") {
            showGallery(state.galleryIndex - 1);
          } else if (modal?.id === "galleryModal" && !comparisonMode && event.key === "ArrowRight") {
            showGallery(state.galleryIndex + 1);
          } else if (modal?.id === "galleryModal" && !comparisonMode && ["+", "="].includes(event.key)) {
            event.preventDefault();
            changeGalleryZoom("in");
          } else if (modal?.id === "galleryModal" && !comparisonMode && event.key === "-") {
            event.preventDefault();
            changeGalleryZoom("out");
          } else if (modal?.id === "galleryModal" && !comparisonMode && event.key === "0") {
            event.preventDefault();
            changeGalleryZoom("reset");
          }
        });
      }
    };

    const openProject = (index) => {
      const item = projects[index];
      const images = item.images || [];
      const counts = phaseCounts(images);
      state.projectIndex = index;
      document.getElementById("projectInner").innerHTML = `
        <div class="project-layout" data-project-index="${index}">
          <div>
            ${
              hasProjectComparison(item)
                ? `${compareMarkup(item, { id: "compare", hintId: "compareHint" })}
            <button class="btn compare-fullscreen-btn" type="button" data-full-comparison="${index}">${compareText("viewFullComparison")}</button>`
                : `<div class="case-preview single-image modal-single-preview"><img src="${img(item.cover, 1400)}" alt="${tx(item.title)}" loading="eager" decoding="async"><span class="inspect-icon" aria-hidden="true"></span></div>`
            }
            <div class="phase-filter">
              <button class="active" data-phase-filter="all">${state.lang === "hu" ? "Összes kép" : "All photos"}</button>
              <button data-phase-filter="before">${tx(phaseLabel.before)} (${counts.before})</button>
              <button data-phase-filter="process">${tx(phaseLabel.process)} (${counts.process})</button>
              <button data-phase-filter="after">${tx(phaseLabel.after)} (${counts.after})</button>
            </div>
            ${projectCarousel(item, index, "modal")}
          </div>
          <div class="details">
            <small class="eyebrow">${tx(item.type)}</small>
            <h2 id="projectModalTitle">${tx(item.title)}</h2>
            <p class="example-badge">${state.lang === "hu" ? "Illusztratív példa, nem saját referenciaprojekt." : "Illustrative example, not a completed client project."}</p>
            <div class="project-meta-line">
              <span>${tx(item.location)}</span>
              <span>${tx(item.timeline)}</span>
              <span>${tx(item.client)}</span>
            </div>
            <p>${tx(item.description)}</p>
            <div class="project-metrics">
              ${item.metrics.map((metric) => `<div><b>${typeof metric.n === "object" ? tx(metric.n) : metric.n}</b><small>${state.lang === "hu" ? metric.hu : metric.en}</small></div>`).join("")}
            </div>
            <div class="story-grid">
              <article class="story-card"><strong>${state.lang === "hu" ? "Kiinduló helyzet" : "Starting point"}</strong><p>${tx(item.problem)}</p></article>
              <article class="story-card"><strong>${state.lang === "hu" ? "Megközelítés" : "Approach"}</strong><p>${tx(item.approach)}</p></article>
              <article class="story-card"><strong>${state.lang === "hu" ? "Végeredmény" : "Final result"}</strong><p>${tx(item.result)}</p></article>
            </div>
            <div class="evidence-list">
              ${tx(item.evidence).map((entry) => `<span class="evidence-chip">${entry}</span>`).join("")}
            </div>
            <h3>${state.lang === "hu" ? "Jellemző munkalépések" : "Typical work items"}</h3>
            <ul>${tx(item.works).map((work) => `<li>${work}</li>`).join("")}</ul>
            <div class="result"><strong>${state.lang === "hu" ? "Várható eredmény" : "Expected result"}</strong><p>${tx(item.result)}</p></div>
            <div class="section-cta"><a class="btn primary" href="${tel}" data-phone-action>${phoneActionLabel()}</a></div>
          </div>
        </div>`;
      window.BPS_I18N?.applyPageLanguage?.();
      const modal = document.getElementById("projectModal");
      modal.setAttribute("aria-labelledby", "projectModalTitle");
      openModal(modal);
      const compare = document.getElementById("compare");
      initCompare(compare);
      document.querySelector("[data-full-comparison]")?.addEventListener("click", () => openFullComparison(index));
      document.querySelectorAll("[data-phase-filter]").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll("[data-phase-filter]").forEach((item) => item.classList.remove("active"));
          btn.classList.add("active");
          const phase = btn.dataset.phaseFilter;
          showCarousel(`modal-${index}`, 0, phase);
        });
      });
      initCarousels(document.getElementById("projectModal"));
    };

    const openFullComparison = (index) => {
      const item = projects[index];
      if (!hasProjectComparison(item)) return;
      state.projectIndex = index;
      document.getElementById("galleryInner").innerHTML = `
        <div class="gallery-layout comparison-lightbox-layout">
          <div class="gallery-main comparison-main">
            ${compareMarkup(item, { id: "fullCompare", hintId: "fullCompareHint", className: "compare-large" })}
          </div>
          <aside class="gallery-info comparison-info">
            <small class="eyebrow">${tx(item.title)}</small>
            <h2 id="galleryModalTitle">${compareText("fullComparisonTitle")}</h2>
            <p>${compareText("fullComparisonDescription")}</p>
            <div class="comparison-key">
              <span><b>${compareText("compareBefore")}</b>${photoCaption([item.before, "before", { hu: `${tx(item.title)} - kiinduló állapot`, en: `${tx(item.title)} - starting condition` }])}</span>
              <span><b>${compareText("compareAfter")}</b>${photoCaption([item.after, "after", { hu: `${tx(item.title)} - kész állapot`, en: `${tx(item.title)} - finished condition` }])}</span>
            </div>
          </aside>
        </div>`;
      window.BPS_I18N?.applyPageLanguage?.();
      const modal = document.getElementById("galleryModal");
      modal.dataset.galleryMode = "comparison";
      modal.setAttribute("aria-labelledby", "galleryModalTitle");
      openModal(modal);
      const compare = document.getElementById("fullCompare");
      initCompare(compare);
      compare?.focus({ preventScroll: true });
    };

    const setComparePosition = (compare, value) => {
      const next = Math.max(0, Math.min(100, Number(value)));
      compare.style.setProperty("--split", `${next}%`);
      const rounded = String(Math.round(next));
      if (compare.getAttribute("aria-valuenow") !== rounded) {
        compare.setAttribute("aria-valuenow", rounded);
        compare.setAttribute("aria-valuetext", compareValueText(next));
      }
    };

    let activeCompareDrag = null;
    let compareFrame = 0;
    let comparePendingClientX = 0;
    let compareDocumentListenersBound = false;

    const comparePercentFromClientX = (state, clientX) => {
      if (!state?.rect?.width) return 50;
      return ((clientX - state.rect.left) / state.rect.width) * 100;
    };

    const renderCompareFromClientX = (state, clientX) => {
      if (!state?.compare) return;
      setComparePosition(state.compare, comparePercentFromClientX(state, clientX));
    };

    const scheduleCompareRender = (clientX) => {
      if (!activeCompareDrag) return;
      comparePendingClientX = clientX;
      if (compareFrame) return;
      compareFrame = requestAnimationFrame(() => {
        compareFrame = 0;
        if (!activeCompareDrag) return;
        renderCompareFromClientX(activeCompareDrag, comparePendingClientX);
      });
    };

    const findCompareAtPoint = (event) => {
      const directCompare = event.target?.closest?.("[data-compare]");
      if (directCompare) return directCompare;
      const candidates = [...document.querySelectorAll("[data-compare]")].filter((compare) => {
        const rect = compare.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      });
      return candidates.at(-1) || null;
    };

    const releaseComparePointerCapture = (state, event) => {
      try {
        const pointerId = event?.pointerId ?? state?.pointerId;
        if (state?.compare && pointerId !== undefined && state.compare.hasPointerCapture?.(pointerId)) {
          state.compare.releasePointerCapture(pointerId);
        }
      } catch {
        // Pointer capture may already have been released by the browser.
      }
    };

    const finishCompareDrag = (event, { finalUpdate = false } = {}) => {
      if (!activeCompareDrag) return;
      if (event?.pointerId !== undefined && event.pointerId !== activeCompareDrag.pointerId) return;
      const state = activeCompareDrag;
      if (finalUpdate && event?.clientX !== undefined) renderCompareFromClientX(state, event.clientX);
      if (compareFrame) {
        cancelAnimationFrame(compareFrame);
        compareFrame = 0;
      }
      releaseComparePointerCapture(state, event);
      state.compare.classList.remove("is-dragging");
      activeCompareDrag = null;
    };

    const handleComparePointerMove = (event) => {
      if (!activeCompareDrag || event.pointerId !== activeCompareDrag.pointerId) return;
      if (activeCompareDrag.touchIntent === "pending") {
        const dx = event.clientX - activeCompareDrag.startX;
        const dy = event.clientY - activeCompareDrag.startY;
        if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx) * 1.2) {
          setComparePosition(activeCompareDrag.compare, activeCompareDrag.startValue);
          finishCompareDrag(event);
          return;
        }
        if (Math.abs(dx) >= Math.abs(dy)) activeCompareDrag.touchIntent = "drag";
      }
      scheduleCompareRender(event.clientX);
    };

    const handleComparePointerEnd = (event) => {
      finishCompareDrag(event, { finalUpdate: event.type === "pointerup" });
    };

    const handleComparePointerDown = (event) => {
      const compare = findCompareAtPoint(event);
      if (!compare) return;
      startCompareDrag(compare, event);
    };

    const bindCompareDocumentListeners = () => {
      if (compareDocumentListenersBound) return;
      compareDocumentListenersBound = true;
      document.addEventListener("pointerdown", handleComparePointerDown, true);
      document.addEventListener("pointermove", handleComparePointerMove);
      document.addEventListener("pointerup", handleComparePointerEnd);
      document.addEventListener("pointercancel", handleComparePointerEnd);
      document.addEventListener("lostpointercapture", handleComparePointerEnd, true);
      window.addEventListener("blur", () => finishCompareDrag());
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") finishCompareDrag();
      });
      window.addEventListener("resize", () => finishCompareDrag());
      window.addEventListener("orientationchange", () => finishCompareDrag());
    };

    const startCompareDrag = (compare, event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (event.isPrimary === false) return;
      finishCompareDrag();

      const rect = compare.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      activeCompareDrag = {
        compare,
        pointerId: event.pointerId,
        pointerType: event.pointerType || "mouse",
        rect,
        startX: event.clientX,
        startY: event.clientY,
        startValue: Number(compare.getAttribute("aria-valuenow")) || 50,
        touchIntent: event.pointerType && event.pointerType !== "mouse" ? "pending" : "drag"
      };
      compare.classList.add("is-dragging");
      compare.focus({ preventScroll: true });
      try {
        compare.setPointerCapture?.(event.pointerId);
      } catch {
        // Some browsers can deny capture during interrupted gestures.
      }
      renderCompareFromClientX(activeCompareDrag, event.clientX);
    };

    const initCompare = (compare) => {
      if (compare.dataset.bound === "true") return;
      compare.dataset.bound = "true";
      bindCompareDocumentListeners();
      compare.addEventListener("keydown", (event) => {
        const current = Number(compare.getAttribute("aria-valuenow")) || 50;
        const step = event.shiftKey ? 5 : 1;
        const values = {
          ArrowLeft: current - step,
          ArrowDown: current - step,
          ArrowRight: current + step,
          ArrowUp: current + step,
          PageDown: current - 10,
          PageUp: current + 10,
          Home: 0,
          End: 100
        };
        if (!(event.key in values)) return;
        event.preventDefault();
        setComparePosition(compare, values[event.key]);
      });
      setComparePosition(compare, 50);
      requestAnimationFrame(() => compare.classList.add("is-ready"));
    };

    const initCarousels = (root = document) => {
      root.querySelectorAll("[data-carousel]").forEach((carousel) => {
        if (carousel.dataset.bound === "true") return;
        carousel.dataset.bound = "true";
        const id = carousel.dataset.carousel;
        carousel.querySelectorAll("[data-carousel-prev]").forEach((btn) => btn.addEventListener("click", () => moveCarousel(id, -1)));
        carousel.querySelectorAll("[data-carousel-next]").forEach((btn) => btn.addEventListener("click", () => moveCarousel(id, 1)));
        carousel.querySelectorAll("[data-carousel-dot]").forEach((btn) => {
          btn.addEventListener("click", () => {
            const imageIndex = Number(btn.dataset.slideTo);
            if (carousel.dataset.carouselAction === "gallery") {
              const project = projects[Number(carousel.dataset.projectIndex)];
              openGallery(project.images, imageIndex, tx(project.title));
              return;
            }
            showCarousel(id, imageIndex);
          });
        });
        carousel.querySelectorAll("[data-slide]").forEach((btn) => {
          btn.addEventListener("click", () => {
            const project = projects[Number(carousel.dataset.projectIndex)];
            if (carousel.dataset.carouselAction === "gallery") {
              openGallery(project.images, Number(btn.dataset.slide), tx(project.title));
              return;
            }
            openProject(Number(carousel.dataset.projectIndex));
          });
        });
        const viewport = carousel.querySelector(".carousel-viewport");
        let startX = 0;
        let lastX = 0;
        let dragging = false;
        viewport.addEventListener("pointerdown", (event) => {
          dragging = true;
          startX = event.clientX;
          lastX = event.clientX;
        });
        viewport.addEventListener("pointermove", (event) => {
          if (!dragging) return;
          lastX = event.clientX;
        });
        const finishDrag = () => {
          if (!dragging) return;
          const delta = lastX - startX;
          dragging = false;
          if (Math.abs(delta) > 42) {
            moveCarousel(id, delta < 0 ? 1 : -1);
          }
        };
        viewport.addEventListener("pointerup", finishDrag);
        viewport.addEventListener("pointercancel", finishDrag);
        showCarousel(id, Number(carousel.dataset.active || 0));
      });
    };

    const moveCarousel = (id, direction) => {
      const carousel = document.querySelector(`[data-carousel="${id}"]`);
      if (!carousel) return;
      showCarousel(id, Number(carousel.dataset.active || 0) + direction);
    };

    const showCarousel = (id, index, phase) => {
      const carousel = document.querySelector(`[data-carousel="${id}"]`);
      if (!carousel) return;
      if (phase) carousel.dataset.phase = phase;
      const activePhase = carousel.dataset.phase || "all";
      const slides = [...carousel.querySelectorAll("[data-slide]")];
      const thumbs = [...carousel.querySelectorAll("[data-carousel-dot]")];
      slides.forEach((slide) => {
        slide.hidden = activePhase !== "all" && slide.dataset.phase !== activePhase;
      });
      thumbs.forEach((thumb) => {
        thumb.hidden = activePhase !== "all" && thumb.dataset.phase !== activePhase;
      });
      const visibleSlides = slides.filter((slide) => !slide.hidden);
      const visibleThumbs = thumbs.filter((thumb) => !thumb.hidden);
      if (!visibleSlides.length) return;
      const active = ((index % visibleSlides.length) + visibleSlides.length) % visibleSlides.length;
      carousel.dataset.active = String(active);
      carousel.querySelector(".carousel-track").style.transform = `translateX(-${active * 100}%)`;
      slides.forEach((slide) => {
        const isActive = slide === visibleSlides[active];
        slide.classList.toggle("active", isActive);
        slide.tabIndex = isActive ? 0 : -1;
        slide.setAttribute("aria-hidden", String(!isActive));
      });
      thumbs.forEach((thumb) => {
        const isActive = thumb === visibleThumbs[active];
        thumb.classList.toggle("active", isActive);
        thumb.setAttribute("aria-current", isActive ? "true" : "false");
      });
      const counter = carousel.querySelector("[data-carousel-count]");
      if (counter) counter.textContent = `${active + 1} / ${visibleSlides.length}`;
    };

    const openGallery = (photos, index, title) => {
      state.gallery = photos;
      state.galleryIndex = index;
      document.getElementById("galleryInner").innerHTML = `
        <div class="gallery-layout">
          <div class="gallery-main" id="galleryStage">
            <div class="gallery-viewport" id="galleryViewport">
              <img id="galleryImg" src="" alt="${title}" draggable="false">
            </div>
            <button class="arrow prev" id="prev" type="button" aria-label="${state.lang === "hu" ? "Előző kép" : "Previous image"}">‹</button>
            <button class="arrow next" id="next" type="button" aria-label="${state.lang === "hu" ? "Következő kép" : "Next image"}">›</button>
            <span class="counter" id="counter" aria-live="polite"></span>
            <div class="gallery-caption" id="galleryCaption"></div>
            <div class="gallery-tools" role="toolbar" aria-label="${state.lang === "hu" ? "Kép nagyítása" : "Image zoom controls"}">
              <button type="button" data-gallery-zoom="out" aria-label="${state.lang === "hu" ? "Kicsinyítés" : "Zoom out"}">−</button>
              <button type="button" class="zoom-level" data-gallery-zoom="reset" aria-label="${state.lang === "hu" ? "Eredeti nagyítás" : "Reset zoom"}">100%</button>
              <button type="button" data-gallery-zoom="in" aria-label="${state.lang === "hu" ? "Nagyítás" : "Zoom in"}">+</button>
            </div>
          </div>
          <aside class="gallery-info">
            <small class="eyebrow">${title}</small>
            <h2 id="galleryModalTitle">${state.lang === "hu" ? "Képes munkafolyamat" : "Visual work process"}</h2>
            <p>${state.lang === "hu" ? "Lapozzon a képek között, húzza oldalra mobilon, vagy nagyítsa ki a részleteket. A képek illusztratív példák; a konkrét feladatot mindig a helyszín saját fotói alapján egyeztetjük." : "Browse with the arrows, swipe on mobile or zoom in to inspect details. Images are illustrative examples; the actual scope is always agreed from photos of the specific property."}</p>
            <div class="thumb-grid" id="thumbs">${photos.map((p, i) => `<button type="button" data-thumb="${i}" aria-label="${photoCaption(p)}"><img src="${img(p[0], 420)}" alt="" loading="lazy" decoding="async"><span class="thumb-zoom" aria-hidden="true"></span></button>`).join("")}</div>
          </aside>
        </div>`;
      window.BPS_I18N?.applyPageLanguage?.();
      const modal = document.getElementById("galleryModal");
      modal.dataset.galleryMode = "gallery";
      modal.setAttribute("aria-labelledby", "galleryModalTitle");
      openModal(modal);
      document.getElementById("prev").addEventListener("click", () => showGallery(state.galleryIndex - 1));
      document.getElementById("next").addEventListener("click", () => showGallery(state.galleryIndex + 1));
      document.querySelectorAll("#thumbs [data-thumb]").forEach((btn) => {
        btn.addEventListener("click", () => showGallery(Number(btn.dataset.thumb)));
      });
      document.querySelectorAll("[data-gallery-zoom]").forEach((btn) => {
        btn.addEventListener("click", () => changeGalleryZoom(btn.dataset.galleryZoom));
      });
      initGalleryInteraction(document.getElementById("galleryViewport"));
      showGallery(index);
    };

    const showGallery = (index) => {
      if (!state.gallery.length) return;
      state.galleryIndex = (index + state.gallery.length) % state.gallery.length;
      const current = state.gallery[state.galleryIndex];
      const [id, phase] = current;
      const galleryImg = document.getElementById("galleryImg");
      const nextSrc = img(id, 2000);
      if (galleryImg.src !== new URL(nextSrc, document.baseURI).href) galleryImg.src = nextSrc;
      galleryImg.alt = photoCaption(current);
      document.getElementById("counter").textContent = `${state.galleryIndex + 1} / ${state.gallery.length} - ${phaseText(phase)}`;
      document.getElementById("galleryCaption").innerHTML = `<b>${phaseText(phase)}</b><span>${photoCaption(current)}</span>`;
      document.querySelectorAll("#thumbs [data-thumb]").forEach((thumb, thumbIndex) => {
        const isActive = thumbIndex === state.galleryIndex;
        thumb.classList.toggle("active", isActive);
        thumb.setAttribute("aria-current", isActive ? "true" : "false");
      });
      resetGalleryView();
      preloadGalleryNeighbors();
    };

    const applyGalleryTransform = () => {
      const image = document.getElementById("galleryImg");
      const viewport = document.getElementById("galleryViewport");
      if (!image || !viewport) return;
      const maxX = Math.max(0, (viewport.clientWidth * (state.galleryZoom - 1)) / 2);
      const maxY = Math.max(0, (viewport.clientHeight * (state.galleryZoom - 1)) / 2);
      state.galleryPanX = Math.max(-maxX, Math.min(maxX, state.galleryPanX));
      state.galleryPanY = Math.max(-maxY, Math.min(maxY, state.galleryPanY));
      image.style.transform = `translate3d(${state.galleryPanX}px, ${state.galleryPanY}px, 0) scale(${state.galleryZoom})`;
      viewport.classList.toggle("is-zoomed", state.galleryZoom > 1);
      const level = document.querySelector(".zoom-level");
      if (level) level.textContent = `${Math.round(state.galleryZoom * 100)}%`;
    };

    const setGalleryZoom = (zoom, originX = 0, originY = 0) => {
      const previous = state.galleryZoom;
      state.galleryZoom = Math.max(1, Math.min(4, Number(zoom)));
      if (state.galleryZoom === 1) {
        state.galleryPanX = 0;
        state.galleryPanY = 0;
      } else if (previous > 0 && previous !== state.galleryZoom) {
        const ratio = state.galleryZoom / previous;
        state.galleryPanX = state.galleryPanX * ratio + originX * (1 - ratio);
        state.galleryPanY = state.galleryPanY * ratio + originY * (1 - ratio);
      }
      applyGalleryTransform();
    };

    const changeGalleryZoom = (action) => {
      if (action === "reset") return setGalleryZoom(1);
      setGalleryZoom(state.galleryZoom + (action === "in" ? 0.5 : -0.5));
    };

    const resetGalleryView = () => {
      state.galleryZoom = 1;
      state.galleryPanX = 0;
      state.galleryPanY = 0;
      applyGalleryTransform();
    };

    const preloadGalleryNeighbors = () => {
      if (state.gallery.length < 2) return;
      [-1, 1].forEach((offset) => {
        const photo = state.gallery[(state.galleryIndex + offset + state.gallery.length) % state.gallery.length];
        const preload = new Image();
        preload.src = img(photo[0], 2000);
      });
    };

    const activeModal = () => [...document.querySelectorAll(".modal.open")].at(-1) || null;

    const openModal = (modal) => {
      const previous = activeModal();
      if (previous && previous !== modal) {
        previous.setAttribute("aria-hidden", "true");
        previous.setAttribute("inert", "");
      }
      modalOpeners.set(modal, document.activeElement);
      modal.classList.add("open");
      modal.removeAttribute("inert");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      const panel = modal.querySelector(".panel");
      if (panel) panel.scrollTop = 0;
      requestAnimationFrame(() => modal.querySelector(".close")?.focus());
    };

    const closeModal = (modal) => {
      if (!modal) return;
      const opener = modalOpeners.get(modal);
      modal.classList.remove("open");
      modal.removeAttribute("inert");
      modal.setAttribute("aria-hidden", "true");
      const previous = activeModal();
      if (previous) {
        previous.removeAttribute("inert");
        previous.setAttribute("aria-hidden", "false");
      } else {
        document.body.classList.remove("modal-open");
      }
      if (opener?.isConnected) requestAnimationFrame(() => opener.focus());
    };

    const trapFocus = (event, modal) => {
      const focusable = [...modal.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )].filter((element) => !element.hidden && element.getClientRects().length);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const initGalleryInteraction = (target) => {
      if (!target) return;
      const pointers = new Map();
      let startX = 0;
      let startY = 0;
      let startPanX = 0;
      let startPanY = 0;
      let pinchDistance = 0;
      let pinchZoom = 1;
      target.addEventListener("pointerdown", (event) => {
        target.setPointerCapture?.(event.pointerId);
        pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
        startX = event.clientX;
        startY = event.clientY;
        startPanX = state.galleryPanX;
        startPanY = state.galleryPanY;
        if (pointers.size === 2) {
          const [a, b] = [...pointers.values()];
          pinchDistance = Math.hypot(b.x - a.x, b.y - a.y);
          pinchZoom = state.galleryZoom;
        }
      });
      target.addEventListener("pointermove", (event) => {
        if (!pointers.has(event.pointerId)) return;
        pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
        if (pointers.size === 2) {
          const [a, b] = [...pointers.values()];
          const distance = Math.hypot(b.x - a.x, b.y - a.y);
          if (pinchDistance) setGalleryZoom(pinchZoom * (distance / pinchDistance));
          return;
        }
        if (state.galleryZoom > 1) {
          state.galleryPanX = startPanX + event.clientX - startX;
          state.galleryPanY = startPanY + event.clientY - startY;
          applyGalleryTransform();
        }
      });
      const finishPointer = (event) => {
        const point = pointers.has(event.pointerId) ? { x: event.clientX, y: event.clientY } : null;
        pointers.delete(event.pointerId);
        if (!point || pointers.size || state.galleryZoom > 1) return;
        const deltaX = point.x - startX;
        const deltaY = point.y - startY;
        if (Math.abs(deltaX) > 55 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
          showGallery(state.galleryIndex + (deltaX < 0 ? 1 : -1));
        }
      };
      target.addEventListener("pointerup", finishPointer);
      target.addEventListener("pointercancel", (event) => pointers.delete(event.pointerId));
      target.addEventListener("dblclick", (event) => {
        const rect = target.getBoundingClientRect();
        setGalleryZoom(state.galleryZoom > 1 ? 1 : 2.5, event.clientX - rect.left - rect.width / 2, event.clientY - rect.top - rect.height / 2);
      });
      target.addEventListener("wheel", (event) => {
        event.preventDefault();
        const rect = target.getBoundingClientRect();
        setGalleryZoom(state.galleryZoom + (event.deltaY < 0 ? 0.25 : -0.25), event.clientX - rect.left - rect.width / 2, event.clientY - rect.top - rect.height / 2);
      }, { passive: false });
    };

    const reveal = () => {
      const items = [...document.querySelectorAll("[data-reveal]")];
      revealObserver?.disconnect();
      if (revealSweepListener) {
        window.removeEventListener("scroll", revealSweepListener);
        revealSweepListener = null;
      }
      if (!("IntersectionObserver" in window)) {
        items.forEach((item) => item.classList.add("visible"));
        return;
      }
      const pending = new Set(items);
      const revealItem = (item) => {
        if (!pending.has(item)) return;
        item.classList.add("visible");
        pending.delete(item);
        revealObserver.unobserve(item);
        if (!pending.size && revealSweepListener) {
          window.removeEventListener("scroll", revealSweepListener);
          revealSweepListener = null;
        }
      };
      revealObserver = new IntersectionObserver(
        (entries) => entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealItem(entry.target);
        }),
        { threshold: 0.12 }
      );
      items.forEach((item) => revealObserver.observe(item));

      // A fast/instant scroll (flick, or a hash-link jump) can move past an
      // element before the observer ever samples it, leaving it permanently
      // opacity:0. Sweep anything already scrolled to or past and force it
      // visible so the reveal animation never blocks content from appearing.
      revealSweepListener = () => {
        pending.forEach((item) => {
          if (item.getBoundingClientRect().top < window.innerHeight) revealItem(item);
        });
      };
      window.addEventListener("scroll", revealSweepListener, { passive: true });
      window.setTimeout(revealSweepListener, 1000);
    };

    window.addEventListener("hashchange", scheduleHashScroll);

    hydrate();
  };

  const initHome = () => {
    applySituationImages();
    applyPageLanguage();
    bindHeroLightbox();
    bindPaintReveal();
    bindConversionActionTracking();
    bindQuoteForms();
    bindEmailCopyActions();
    initHomePage();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHome, { once: true });
  } else {
    initHome();
  }
})();
