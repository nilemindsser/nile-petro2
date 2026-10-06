/* ==========================================================================
   NILE PETRO — LEGACY ICON ADAPTER  (NP-ICON-SYSTEM-01 · v2)
   GENERATED FROM THE CANONICAL REGISTRY — NOT A SECOND ICON LIBRARY.

   This file owns ZERO geometry. It reads `window.NPIcons.registry`
   (np-icons.js — the one authoritative source) and emits `<symbol>` nodes
   for the legacy ids that surfaces still reference, using the EXPLICIT
   alias table below. Contract:

     · no keyword / nearest-icon guessing        (heuristic mappings = 0)
     · no MutationObserver remapping             (DOM-order contract = 0)
     · no colour inside the glyph                (icon-level hex = 0)
     · an unknown id is a LOUD failure, never a placeholder glyph

   Load order: np-icons.js  →  np-sprite.js
   Removal plan: once every surface references canonical ids directly
   (`<np-icon name>` or `#np-<canonical>`), delete this adapter. Each alias
   row below records why it still exists.
   ========================================================================== */
(function () {
  /* ── EXPLICIT ALIAS TABLE ───────────────────────────────────────────────
     legacy id            canonical id      reason
     ------------------------------------------------------------------ */
  var ALIAS = {
    /* mobile navigation (Worker · Manager bottom nav) */
    "s-home":        "home",
    "s-station":     "station",
    "s-bell":        "bell",
    "s-profile":     "user",
    "nav-home":      "home",
    "nav-shift":     "shift-log",
    "nav-bell":      "bell",
    "nav-profile":   "user",
    /* station operations */
    "s-worker":      "parties",
    "s-pump":        "fuel-pump",
    "s-nozzle":      "nozzle",
    "s-fuel":        "droplet",
    "s-droplet":     "droplet",
    "s-tank":        "tank",
    "s-meter":       "gauge",
    "s-shift":       "shift-log",
    "s-supply":      "supply",
    "s-truck":       "truck",
    "s-scale":       "scale",
    "s-hardhat":     "helmet",
    "s-users":       "team",
    "s-idcard":      "id-card",
    "icon-pump":     "fuel-pump",
    "icon-meter":    "gauge",
    "icon-droplet":  "droplet",
    /* finance */
    "s-wallet":      "wallet",
    "s-card":        "payment-card",
    "s-bank":        "bank",
    "s-swap":        "transfer",
    "s-receipt":     "receipt",
    "s-cart":        "purchase",
    "s-calc":        "calculator",
    "icon-wallet":   "wallet",
    /* documents · reports */
    "s-report":      "reports",
    "s-history":     "clock",
    "s-doc":         "document",
    "s-calendar":    "calendar",
    "s-pie":         "pie-chart",
    "s-trend":       "trend",
    "s-print":       "print",
    "s-receipt-doc": "receipt",
    /* actions */
    "s-search":      "search",
    "s-plus":        "plus",
    "s-minus":       "minus",
    "s-edit":        "edit",
    "s-sign":        "signature",
    "s-hand":        "handover",
    "s-filter":      "filter",
    "s-download":    "download",
    "s-down":        "download",
    "s-eye":         "eye",
    "s-more":        "more",
    "s-camera":      "camera",
    "s-attach":      "attachment",
    "s-trash":       "delete",
    "s-share":       "share",
    "s-send":        "send",
    "s-close":       "close",
    "s-return":      "undo",
    "s-sliders":     "sliders",
    "icon-camera":   "camera",
    "icon-settings": "settings",
    /* status · feedback */
    "s-check":       "success",
    "s-check-plain": "check",
    "s-alert":       "warning",
    "s-info":        "info",
    "s-star":        "star",
    "s-heart":       "heart",
    "s-mute":        "mute",
    "s-clock":       "clock",
    "icon-check":    "success",
    "icon-error":    "close",
    "icon-warning":  "warning",
    "icon-info":     "info",
    /* connectivity · sync */
    "s-sync":        "refresh",
    "s-offline":     "wifi-off",
    "s-wifi":        "wifi",
    "s-cloud-up":    "cloud-upload",
    "s-cloud-sync":  "cloud-sync",
    "icon-sync":     "refresh",
    "icon-offline":  "wifi-off",
    /* security — Manager biometric capability only; Worker login has none */
    "s-lock":        "lock",
    "s-unlock":      "unlock",
    "s-shield":      "shield",
    "s-finger":      "fingerprint",
    "s-key":         "key",
    "s-qr":          "qr-code",
    "s-nfc":         "nfc",
    "np-fp":              "fingerprint",
    "icon-fingerprint":   "fingerprint",
    /* people · contact · support */
    "s-support":     "support",
    "s-phone":       "phone",
    "s-mail":        "mail",
    "s-chat":        "chat",
    "s-question":    "question",
    "s-ticket":      "ticket",
    "s-location":    "location",
    "s-globe":       "globe",
    "s-moon":        "moon",
    "s-device":      "device",
    "icon-support":  "support",
    "icon-globe":    "globe",
    /* directional */
    "s-back":        "back",
    "s-chevron":     "chevron-back",
    "s-logout":      "logout",
    "icon-logout":   "logout",
    /* shift lifecycle */
    "s-play":        "start",
    "s-stop":        "stop"
  };

  function registry() {
    return (window.NPIcons && window.NPIcons.registry) || null;
  }

  function mount() {
    if (document.getElementById("np-legacy-icon-adapter")) return true;
    var reg = registry();
    if (!reg) return false;
    /* mounted synchronously at script-execution time: <use> nodes that the
       template streams later must never be parsed before the symbols exist,
       otherwise the browser logs a failed reference for each one. */
    var host = document.body || document.documentElement;
    if (!host) return false;
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("id", "np-legacy-icon-adapter");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("style", "position:absolute;width:0;height:0;overflow:hidden");
    var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

    var html = "", missing = [], artwork = [];
    Object.keys(ALIAS).forEach(function (legacy) {
      var canon = ALIAS[legacy];
      var entry = reg[canon];
      if (!entry) { missing.push(legacy + " → " + canon); return; }
      if (entry.brandArtwork) { artwork.push([legacy, entry]); return; }
      html += '<symbol id="' + legacy + '" viewBox="' + window.NPIcons.viewBox +
              '" fill="currentColor" stroke="none"' +
              (entry.mirror ? ' data-mirror="true"' : "") + ">" + entry.path + "</symbol>";
    });
    defs.innerHTML = html;
    /* brand-artwork entries (owner ruling: ONE fingerprint for the whole app)
       are raster, so the symbol is assembled from real DOM nodes — an SVG
       <image> parsed from an innerHTML string does not paint in every host. */
    var NS = "http://www.w3.org/2000/svg", XL = "http://www.w3.org/1999/xlink";
    artwork.forEach(function (pair) {
      var sym = document.createElementNS(NS, "symbol");
      sym.setAttribute("id", pair[0]);
      sym.setAttribute("viewBox", "0 0 20 20");
      var im = document.createElementNS(NS, "image");
      im.setAttribute("x", "0"); im.setAttribute("y", "0");
      im.setAttribute("width", "20"); im.setAttribute("height", "20");
      im.setAttribute("preserveAspectRatio", "xMidYMid meet");
      im.setAttribute("href", pair[1].artwork);
      im.setAttributeNS(XL, "xlink:href", pair[1].artwork);
      sym.appendChild(im);
      defs.appendChild(sym);
    });
    svg.appendChild(defs);
    host.insertBefore(svg, host.firstChild);
    /* once <body> exists, keep the adapter as its first child so page-local
       markup can never precede it. */
    if (host !== document.body) {
      document.addEventListener("DOMContentLoaded", function () {
        if (document.body && svg.parentNode !== document.body) {
          document.body.insertBefore(svg, document.body.firstChild);
        }
      });
    }

    if (missing.length) {
      console.error("[NP icons] alias points at a canonical id that does not exist:", missing);
    }
    validate();
    /* the surface streams in — re-validate once the document is parsed so the
       audit reflects every reference, not only the ones present at mount. */
    if (document.readyState !== "complete") {
      window.addEventListener("load", validate, { once: true });
    }
    return true;
  }

  /* An unknown id must be a visible validation failure — never a fallback
     glyph. QA reads this error; production must ship only valid ids. */
  function validate() {
    var known = {};
    Object.keys(ALIAS).forEach(function (k) { known[k] = 1; });
    var unknown = {};
    document.querySelectorAll("use").forEach(function (u) {
      var href = u.getAttribute("href") || u.getAttribute("xlink:href") || "";
      if (!href || href.charAt(0) !== "#") return;
      var id = href.slice(1);
      if (known[id] || document.getElementById(id)) return;
      unknown[id] = (unknown[id] || 0) + 1;
    });
    var list = Object.keys(unknown);
    if (list.length) {
      console.error("[NP icons] unknown icon id(s) — no canonical geometry:",
        list.map(function (i) { return i + " ×" + unknown[i]; }).join(", "));
    }
    window.NPIconAudit = {
      aliases: Object.keys(ALIAS).length,
      canonical: window.NPIcons ? window.NPIcons.names.length : 0,
      unknownRefs: list,
      heuristicMappings: 0,
      domOrderContract: false
    };
  }

  if (!mount()) {
    /* np-icons.js not evaluated yet — retry briefly, then fail loudly. */
    var tries = 0;
    var t = setInterval(function () {
      if (mount() || ++tries > 60) {
        clearInterval(t);
        if (!registry()) console.error("[NP icons] np-icons.js did not load — canonical registry missing.");
      }
    }, 20);
    document.addEventListener("DOMContentLoaded", function () { mount(); });
  }
})();
