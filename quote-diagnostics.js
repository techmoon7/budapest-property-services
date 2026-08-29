/*
 * TEMPORARY mobile diagnostic instrumentation for the homepage WhatsApp quote
 * form's "Service type" scroll-jump bug.
 *
 * Fully gated behind ?quoteDebug=1 or ?quoteDebug=trace: without one of those
 * exact query parameter values this script does nothing at all -- no DOM
 * changes, no event listeners, no sessionStorage writes, zero behavioral
 * impact on normal visitors.
 *
 * - ?quoteDebug=1  : live capture + panel (the original instrumentation).
 * - ?quoteDebug=trace : read-only retrieval. Reads the trace already saved
 *   by a prior ?quoteDebug=1 visit and displays it as plain text in a
 *   full-screen <textarea>, with no button/focus/scroll interaction
 *   required. Registers no listeners and never writes to sessionStorage.
 *
 * Read-only observation only, even when active:
 * - never calls preventDefault()
 * - never calls scrollTo/scrollBy/scrollIntoView
 * - never calls .focus()/.blur() on anything
 * - never touches the <select> or any form element
 * - all listeners are { passive: true, capture: true }
 * - the panel is position:fixed, so it never participates in document
 *   layout or affects scrollHeight
 *
 * Remove this file and its <script> tag once the bug is diagnosed.
 */
(() => {
  "use strict";

  let params;
  try {
    params = new URLSearchParams(window.location.search);
  } catch {
    return; // can't determine intent -- stay fully inactive
  }
  const mode = params.get("quoteDebug");
  if (mode !== "1" && mode !== "trace") return; // <-- the entire gate

  const STORAGE_KEY = "bps_quote_diag_trace_v1";

  const fmtTime = (t) => {
    const d = new Date(t);
    const pad = (n, len = 2) => String(n).padStart(len, "0");
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(), 3)}`;
  };

  const formatEntry = (e) =>
    [
      fmtTime(e.t),
      e.type,
      e.target ? `target=${e.target}` : null,
      `active=${e.active || "-"}`,
      `scrollY=${e.scrollY}`,
      `vvH=${e.vvH}`,
      `vvOffsetTop=${e.vvOffsetTop}`,
      `vvPageTop=${e.vvPageTop}`,
      `innerH=${e.innerH}`,
      `clientH=${e.clientH}`,
    ]
      .filter((p) => p !== null)
      .join(" | ");

  if (mode === "trace") {
    // Read-only retrieval view. Does not register any listener, does not
    // write to sessionStorage, does not touch the existing trace in any way
    // -- it only reads what a prior ?quoteDebug=1 visit already saved.
    let raw = null;
    try {
      raw = sessionStorage.getItem(STORAGE_KEY);
    } catch {
      raw = null;
    }
    let entries = [];
    try {
      const parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed)) entries = parsed;
    } catch {
      entries = [];
    }

    const headerLines = [
      "SAVED QUOTE TRACE",
      `entries: ${entries.length}`,
      entries.length ? `first event: ${fmtTime(entries[0].t)}` : "(no trace found in sessionStorage for this tab)",
      entries.length ? `last event:  ${fmtTime(entries[entries.length - 1].t)}` : "",
      "",
    ];
    const bodyLines = entries.map(formatEntry);
    const footerLines = ["", "===== END OF TRACE (line just above = most recent event) ====="];
    const fullText = headerLines.concat(bodyLines, footerLines).join("\n");

    const buildTraceView = () => {
      const wrap = document.createElement("div");
      wrap.id = "bps-quote-trace-view";
      wrap.style.cssText =
        "position:fixed !important;inset:0 !important;z-index:2147483647 !important;" +
        "background:#06100c;display:flex;flex-direction:column;padding:10px;box-sizing:border-box;";

      const title = document.createElement("div");
      title.textContent = "SAVED QUOTE TRACE";
      title.style.cssText = "font:900 20px/1.2 system-ui,sans-serif;color:#ff5b5b;margin-bottom:4px;flex:0 0 auto;";

      const sub = document.createElement("div");
      sub.textContent = `${entries.length} event(s) captured. Select all text below and copy.`;
      sub.style.cssText = "font:700 12px/1.3 system-ui,sans-serif;color:#d8f3dc;margin-bottom:8px;flex:0 0 auto;";

      const ta = document.createElement("textarea");
      ta.readOnly = true;
      ta.value = fullText;
      ta.style.cssText =
        "flex:1 1 auto;width:100%;background:rgba(255,255,255,0.06);color:#fffaf2;" +
        "border:1px solid rgba(255,255,255,0.25);border-radius:8px;padding:8px;" +
        "font:12px/1.5 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;" +
        "box-sizing:border-box;resize:none;white-space:pre-wrap;word-break:break-word;";

      wrap.appendChild(title);
      wrap.appendChild(sub);
      wrap.appendChild(ta);
      document.body.appendChild(wrap);
      // Deliberately no .focus(), no .select(), no scrollIntoView/scrollTo --
      // the page must display exactly as-is with zero interaction required.
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", buildTraceView, { once: true, passive: true });
    } else {
      buildTraceView();
    }
    return; // trace mode does nothing else -- no listeners registered below
  }

  // mode === "1": live capture + panel (unchanged from before).
  const MAX_ENTRIES = 300;
  const SCROLL_THROTTLE_MS = 40;
  const LIVE_REFRESH_MS = 250;

  let trace = [];
  try {
    const existing = sessionStorage.getItem(STORAGE_KEY);
    const parsed = existing ? JSON.parse(existing) : null;
    if (Array.isArray(parsed)) trace = parsed.slice(-MAX_ENTRIES);
  } catch {
    /* sessionStorage unavailable (private mode etc.) -- keep in-memory only */
  }

  const persist = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(trace));
    } catch {
      /* storage full or unavailable -- trace still lives in memory */
    }
  };

  const describeEl = (el) => {
    if (!el || el === document || el === window) return el === window ? "window" : el === document ? "document" : null;
    const tag = el.tagName || "?";
    const id = el.id ? `#${el.id}` : "";
    const name = el.name ? `[name=${el.name}]` : "";
    return `${tag}${id}${name}`;
  };

  const snapshot = () => {
    const vv = window.visualViewport;
    return {
      scrollX: Math.round(window.scrollX * 10) / 10,
      scrollY: Math.round(window.scrollY * 10) / 10,
      innerW: window.innerWidth,
      innerH: window.innerHeight,
      clientH: document.documentElement.clientHeight,
      vvH: vv ? Math.round(vv.height * 10) / 10 : null,
      vvOffsetTop: vv ? Math.round(vv.offsetTop * 10) / 10 : null,
      vvPageTop: vv ? Math.round(vv.pageTop * 10) / 10 : null,
      active: describeEl(document.activeElement),
    };
  };

  let panelEl = null;
  let lastEventLabel = "-";

  const renderPanelIfOpen = () => {
    if (!panelEl || panelEl.hidden) return;
    const body = panelEl.querySelector("[data-diag-body]");
    if (body) {
      body.textContent = formatTraceText();
      body.scrollTop = body.scrollHeight;
    }
    const countEl = panelEl.querySelector("[data-diag-count]");
    if (countEl) countEl.textContent = String(trace.length);
  };

  const log = (type, extra) => {
    const entry = Object.assign({ t: Date.now(), type }, snapshot(), extra || {});
    trace.push(entry);
    if (trace.length > MAX_ENTRIES) trace.splice(0, trace.length - MAX_ENTRIES);
    persist();
    lastEventLabel = `${fmtTime(entry.t)} ${type}${entry.target ? " (" + entry.target + ")" : ""}`;
    renderPanelIfOpen();
  };

  const formatTraceText = () => trace.map(formatEntry).join("\n");

  log("QUOTE_DIAG_START");

  // -- Field identification (matches the current homepage quote-form markup;
  // purely a read of `name`/`id`, no reference into script.js at all) --
  const isField = (el, fieldName) => !!el && el.getAttribute && el.getAttribute("name") === fieldName;

  const semanticMarkers = (eventName, target) => {
    if (isField(target, "name")) {
      if (eventName === "focus" || eventName === "focusin") log("NAME_FOCUS", { target: describeEl(target) });
      if (eventName === "input") log("NAME_INPUT", { target: describeEl(target) });
    }
    if (isField(target, "service")) {
      if (eventName === "pointerdown") log("SERVICE_POINTERDOWN", { target: describeEl(target) });
      if (eventName === "focus" || eventName === "focusin") log("SERVICE_FOCUS", { target: describeEl(target) });
      if (eventName === "click") log("SERVICE_CLICK", { target: describeEl(target) });
      if (eventName === "change") log("SERVICE_CHANGE", { target: describeEl(target) });
    }
  };

  const DOCUMENT_EVENTS = [
    "focus",
    "focusin",
    "blur",
    "focusout",
    "pointerdown",
    "pointerup",
    "touchstart",
    "touchend",
    "click",
    "input",
    "change",
  ];
  DOCUMENT_EVENTS.forEach((eventName) => {
    document.addEventListener(
      eventName,
      (event) => {
        const target = event.target;
        log(eventName, { target: describeEl(target) });
        semanticMarkers(eventName, target);
      },
      { passive: true, capture: true }
    );
  });

  let lastScrollLog = 0;
  window.addEventListener(
    "scroll",
    () => {
      const now = Date.now();
      if (now - lastScrollLog < SCROLL_THROTTLE_MS) return;
      lastScrollLog = now;
      log("WINDOW_SCROLL");
    },
    { passive: true, capture: true }
  );

  window.addEventListener("resize", () => log("window resize"), { passive: true });
  window.addEventListener("hashchange", () => log("hashchange"), { passive: true });
  window.addEventListener("popstate", () => log("popstate"), { passive: true });

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", () => log("VIEWPORT_RESIZE"), { passive: true });
    let lastVvScrollLog = 0;
    window.visualViewport.addEventListener(
      "scroll",
      () => {
        const now = Date.now();
        if (now - lastVvScrollLog < SCROLL_THROTTLE_MS) return;
        lastVvScrollLog = now;
        log("visualViewport scroll");
      },
      { passive: true }
    );
  }

  // -- Retrieval UI: position:fixed, never in document flow, never affects
  // scrollHeight/layout. Only ever created because ?quoteDebug=1 was present. --
  const buildPanel = () => {
    const style = document.createElement("style");
    style.textContent = `
      #bps-quote-diag-toggle {
        position: fixed !important;
        bottom: 20px !important;
        left: 20px !important;
        top: auto !important;
        right: auto !important;
        z-index: 2147483647 !important;
        width: 56px;
        height: 56px;
        min-width: 56px;
        min-height: 56px;
        border-radius: 999px;
        border: 3px solid #fff;
        background: #ff2d2d;
        color: #fff;
        font: 900 12px/1.1 system-ui, sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 24px rgba(0,0,0,0.45);
        text-shadow: 0 1px 2px rgba(0,0,0,0.4);
      }
      #bps-quote-diag-toggle[hidden] { display: none !important; }
      #bps-quote-diag-panel {
        position: fixed !important;
        top: 0 !important;
        right: 0 !important;
        left: 0 !important;
        bottom: auto !important;
        max-height: 85vh;
        z-index: 2147483647 !important;
        background: rgba(6, 16, 12, 0.98);
        color: #fffaf2;
        border-radius: 0 0 14px 14px;
        padding: 10px 10px 12px;
        font: 11px/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        box-shadow: 0 12px 40px rgba(0,0,0,0.5);
        display: flex;
        flex-direction: column;
        gap: 8px;
        box-sizing: border-box;
      }
      #bps-quote-diag-panel[hidden] { display: none; }
      #bps-quote-diag-panel .diag-title {
        font: 900 15px/1.2 system-ui, sans-serif;
        letter-spacing: 0.04em;
        color: #ff5b5b;
      }
      #bps-quote-diag-panel .diag-active {
        font: 900 11px/1.2 system-ui, sans-serif;
        color: #6df0a0;
        letter-spacing: 0.06em;
      }
      #bps-quote-diag-panel .diag-live {
        background: rgba(255,255,255,0.08);
        border-radius: 8px;
        padding: 8px;
        font: 11px/1.55 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      }
      #bps-quote-diag-panel .diag-live div { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      #bps-quote-diag-panel [data-diag-body] {
        overflow: auto;
        white-space: pre-wrap;
        word-break: break-word;
        flex: 1 1 auto;
        min-height: 80px;
        background: rgba(255,255,255,0.05);
        border-radius: 8px;
        padding: 6px;
      }
      #bps-quote-diag-panel .diag-row { display: flex; gap: 8px; flex-wrap: wrap; }
      #bps-quote-diag-panel button {
        appearance: none;
        border: 0;
        border-radius: 999px;
        background: #fffaf2;
        color: #102c21;
        padding: 8px 12px;
        font: 700 12px/1 system-ui, sans-serif;
      }
      #bps-quote-diag-panel [data-diag-copy] {
        background: #ff2d2d;
        color: #fff;
        font: 900 14px/1 system-ui, sans-serif;
        padding: 12px 18px;
      }
      #bps-quote-diag-panel .diag-status { color: #d8f3dc; }
    `;
    document.head.appendChild(style);

    const toggle = document.createElement("button");
    toggle.id = "bps-quote-diag-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Reopen quote form diagnostics");
    toggle.innerHTML = '<span>DEBUG</span><span data-diag-count>0</span>';
    toggle.hidden = true; // panel starts open; toggle only appears once minimized

    const panel = document.createElement("div");
    panel.id = "bps-quote-diag-panel";
    panel.innerHTML = `
      <div class="diag-title">QUOTE DEBUG</div>
      <div class="diag-active">DIAGNOSTICS ACTIVE</div>
      <div class="diag-live">
        <div data-live-scroll>scrollY: -</div>
        <div data-live-active>activeElement: -</div>
        <div data-live-innerh>innerHeight: -</div>
        <div data-live-vvh>visualViewport.height: -</div>
        <div data-live-last>last event: -</div>
      </div>
      <div class="diag-row">
        <button type="button" data-diag-copy>COPY TRACE</button>
      </div>
      <div class="diag-row">
        <button type="button" data-diag-minimize>Minimize</button>
        <button type="button" data-diag-clear>Clear</button>
        <span class="diag-status" data-diag-status></span>
      </div>
      <div data-diag-body tabindex="0"></div>
      <textarea data-diag-fallback style="position:absolute;left:-9999px;top:0;width:1px;height:1px;" readonly></textarea>
    `;

    document.body.appendChild(toggle);
    document.body.appendChild(panel);
    panelEl = panel;
    panel.querySelector("[data-diag-status]").textContent = "Diagnostics active (loaded via ?quoteDebug=1).";
    renderPanelIfOpen();

    const liveScroll = panel.querySelector("[data-live-scroll]");
    const liveActive = panel.querySelector("[data-live-active]");
    const liveInnerH = panel.querySelector("[data-live-innerh]");
    const liveVvH = panel.querySelector("[data-live-vvh]");
    const liveLast = panel.querySelector("[data-live-last]");

    const refreshLive = () => {
      if (panel.hidden) return;
      const s = snapshot();
      liveScroll.textContent = `scrollY: ${s.scrollY}`;
      liveActive.textContent = `activeElement: ${s.active || "-"}`;
      liveInnerH.textContent = `innerHeight: ${s.innerH}`;
      liveVvH.textContent = `visualViewport.height: ${s.vvH}`;
      liveLast.textContent = `last event: ${lastEventLabel}`;
    };
    window.setInterval(refreshLive, LIVE_REFRESH_MS);
    refreshLive();

    toggle.addEventListener(
      "click",
      () => {
        panel.hidden = false;
        toggle.hidden = true;
        renderPanelIfOpen();
        refreshLive();
      },
      { passive: true }
    );

    panel.querySelector("[data-diag-minimize]").addEventListener(
      "click",
      () => {
        panel.hidden = true;
        toggle.hidden = false;
      },
      { passive: true }
    );

    panel.querySelector("[data-diag-clear]").addEventListener(
      "click",
      () => {
        trace = [];
        persist();
        renderPanelIfOpen();
        panel.querySelector("[data-diag-status]").textContent = "Cleared.";
      },
      { passive: true }
    );

    panel.querySelector("[data-diag-copy]").addEventListener(
      "click",
      async () => {
        const text = formatTraceText();
        const status = panel.querySelector("[data-diag-status]");
        let copied = false;
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            copied = true;
          }
        } catch {
          /* fall through to manual-selection fallback below */
        }
        if (!copied) {
          const fallback = panel.querySelector("[data-diag-fallback]");
          fallback.style.cssText = "position:static;width:100%;height:120px;margin-top:4px;";
          fallback.value = text;
          fallback.focus();
          fallback.select();
          try {
            copied = document.execCommand("copy");
          } catch {
            copied = false;
          }
        }
        status.textContent = copied ? "Copied to clipboard." : "Copy failed -- text is selected below, copy manually.";
      },
      { passive: true }
    );
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildPanel, { once: true, passive: true });
  } else {
    buildPanel();
  }
})();
