/* ==========================================================================
   NILE PETRO APP — SHARED SVG ICON REGISTRY
   One definition per icon. Consumed as <np-icon name size> from any
   component or surface. No SVG path may be redrawn inside a screen.

   ICON STYLE — owner-approved reference set (Nile Petro Icon Set v1.0):
   solid FILLED glyphs, rounded geometry, one coherent family. Detail is cut
   out of the silhouette with fill-rule="evenodd" (never a second colour), so
   a single `color` drives the whole glyph: brand blue by default, semantic
   colour where the surface assigns it (green start · red stop/destructive ·
   amber supply). Secondary masses use opacity for the reference's duotone.

   ONE DOCUMENTED EXCEPTION — `fingerprint`: owner ruling binds it to the
   approved brand artwork (assets/np-fingerprint.png), so every
   biometric surface in the app draws the SAME fingerprint. It is the only
   entry that does not follow currentColor (marked `brandArtwork: true`).

   Registry contract per entry:
     path      : filled geometry on a 20×20 grid, fill=currentColor
     mirror    : true  = directional, mirrors in RTL
                 false = never mirrors (objects, states, actions)
   ========================================================================== */
(function () {
  var VIEWBOX = "0 0 20 20";

  var REGISTRY = {
    /* --- navigation / structure (non-directional) --- */
    home:        { mirror: false, path: '<path fill-rule="evenodd" d="M9.31 2.43a1.1 1.1 0 0 1 1.38 0l6.7 5.3c.26.2.41.52.41.86V15.7a1.9 1.9 0 0 1-1.9 1.9h-3.4v-4.9a.9.9 0 0 0-.9-.9H8.4a.9.9 0 0 0-.9.9v4.9H4.1a1.9 1.9 0 0 1-1.9-1.9V8.59c0-.34.15-.66.41-.86zM8.3 6.9a.7.7 0 0 0-.7.7v1.3c0 .39.31.7.7.7h1.1a.7.7 0 0 0 .7-.7V7.6a.7.7 0 0 0-.7-.7zm3.4 0a.7.7 0 0 0-.7.7v1.3c0 .39.31.7.7.7h1.1a.7.7 0 0 0 .7-.7V7.6a.7.7 0 0 0-.7-.7z"/>' },
    "shift-log": { mirror: false, path: '<path fill-rule="evenodd" d="M5.4 2.4h9.2a1.9 1.9 0 0 1 1.9 1.9v11.4a1.9 1.9 0 0 1-1.9 1.9H5.4a1.9 1.9 0 0 1-1.9-1.9V4.3A1.9 1.9 0 0 1 5.4 2.4zm.9 3.5a.75.75 0 0 0 0 1.5h7.4a.75.75 0 0 0 0-1.5zm0 3.4a.75.75 0 0 0 0 1.5h7.4a.75.75 0 0 0 0-1.5zm0 3.4a.75.75 0 0 0 0 1.5h4.6a.75.75 0 0 0 0-1.5z"/>' },
    inventory:   { mirror: false, path: '<path d="M9.54 2.24a1.1 1.1 0 0 1 .92 0l6.3 3.12L10 8.6 3.24 5.36zM2.4 6.86 9.2 10.1v7.32a1 1 0 0 1-1.44.9L2.96 15.9a1.1 1.1 0 0 1-.56-.96z"/><path opacity=".45" d="M17.6 6.86v8.08c0 .4-.21.77-.56.96l-4.8 2.42a1 1 0 0 1-1.44-.9V10.1z"/>' },
    parties:     { mirror: false, path: '<circle cx="7.5" cy="6.9" r="3.1"/><path d="M2.6 15.7c0-2.44 2.19-4.1 4.9-4.1s4.9 1.66 4.9 4.1a1.3 1.3 0 0 1-1.3 1.3H3.9a1.3 1.3 0 0 1-1.3-1.3z"/><path opacity=".45" d="M13.6 4.4a2.6 2.6 0 0 1 0 5.2 2.6 2.6 0 0 1 0-5.2zm.2 6.6c2.2.1 3.8 1.6 3.8 3.7a1.3 1.3 0 0 1-1.3 1.3h-2.6c.06-.3.1-.62.1-.96 0-1.6-.62-2.94-1.64-3.9.5-.1 1.06-.15 1.64-.14z"/>' },
    "price-tag": { mirror: false, path: '<path fill-rule="evenodd" d="M10.6 2.4h5.2a1.8 1.8 0 0 1 1.8 1.8v5.2c0 .48-.19.94-.53 1.28l-6.4 6.4a1.8 1.8 0 0 1-2.55 0L2.92 11.9a1.8 1.8 0 0 1 0-2.55l6.4-6.42c.34-.34.8-.53 1.28-.53zm3 2.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/>' },
    certificate: { mirror: false, path: '<path fill-rule="evenodd" d="M5.2 2.2h5.9l5.1 5.1v9.2a1.5 1.5 0 0 1-1.5 1.5H5.2a1.5 1.5 0 0 1-1.5-1.5V3.7a1.5 1.5 0 0 1 1.5-1.5zm7.2 8.1a.8.8 0 0 0-1.14 0l-2.5 2.6-1-1a.8.8 0 1 0-1.14 1.12l1.58 1.6a.8.8 0 0 0 1.14 0l3.06-3.16a.8.8 0 0 0 0-1.16z"/><path opacity=".45" d="M11.5 2.6 16.2 7.3h-3.9a.8.8 0 0 1-.8-.8z"/>' },
    wallet:      { mirror: false, path: '<path fill-rule="evenodd" d="M4.6 4.4h10.8a2.2 2.2 0 0 1 2.2 2.2v6.8a2.2 2.2 0 0 1-2.2 2.2H4.6a2.2 2.2 0 0 1-2.2-2.2V6.6a2.2 2.2 0 0 1 2.2-2.2zm8.6 4.2a1.4 1.4 0 0 0 0 2.8h4.4V8.6z"/><path opacity=".45" d="M13.2 8.6h4.4v2.8h-4.4a1.4 1.4 0 0 1 0-2.8z"/>' },
    "worker-id": { mirror: false, path: '<path fill-rule="evenodd" d="M4.2 3.4h11.6a1.8 1.8 0 0 1 1.8 1.8v9.6a1.8 1.8 0 0 1-1.8 1.8H4.2a1.8 1.8 0 0 1-1.8-1.8V5.2a1.8 1.8 0 0 1 1.8-1.8zm3.4 2.8a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2zm0 5c-1.9 0-3.4 1.1-3.4 2.7 0 .38.31.7.7.7h5.4c.39 0 .7-.32.7-.7 0-1.6-1.5-2.7-3.4-2.7zm4.8-4.3a.7.7 0 0 0 0 1.4h3a.7.7 0 0 0 0-1.4zm0 3a.7.7 0 0 0 0 1.4h3a.7.7 0 0 0 0-1.4z"/>' },
    device:      { mirror: false, path: '<path fill-rule="evenodd" d="M6.4 2.2h7.2a2 2 0 0 1 2 2v11.6a2 2 0 0 1-2 2H6.4a2 2 0 0 1-2-2V4.2a2 2 0 0 1 2-2zm2.2 12.4a.75.75 0 0 0 0 1.5h2.8a.75.75 0 0 0 0-1.5z"/>' },
    reports:     { mirror: false, path: '<rect x="3" y="10.2" width="3.4" height="6.4" rx="1.1"/><rect opacity=".55" x="8.3" y="6.4" width="3.4" height="10.2" rx="1.1"/><rect x="13.6" y="8.4" width="3.4" height="8.2" rx="1.1"/>' },
    "fuel-pump": { mirror: false, path: '<path fill-rule="evenodd" d="M4.6 2.6h5.6a2 2 0 0 1 2 2v12.8H2.6V4.6a2 2 0 0 1 2-2zm.8 2.6a.8.8 0 0 0-.8.8v1.4c0 .44.36.8.8.8h4a.8.8 0 0 0 .8-.8V6a.8.8 0 0 0-.8-.8z"/><path opacity=".45" d="M12.8 6.2h1.9a2.5 2.5 0 0 1 2.5 2.5v4.1a1.2 1.2 0 0 0 1.2 1.2v1.6a2.8 2.8 0 0 1-2.8-2.8V8.7a.9.9 0 0 0-.9-.9h-1.9z"/>' },
    gauge:       { mirror: false, path: '<path d="M10 3.8a7.2 7.2 0 0 1 7.2 7.2 1.3 1.3 0 0 1-1.3 1.3h-1.2a1 1 0 0 1-1-1 3.7 3.7 0 1 0-7.4 0 1 1 0 0 1-1 1H4.1A1.3 1.3 0 0 1 2.8 11 7.2 7.2 0 0 1 10 3.8z"/><path d="M13.9 6.6a1.15 1.15 0 0 1 .1 1.62l-2.36 2.66a1.7 1.7 0 1 1-1.72-1.08l2.36-2.66a1.15 1.15 0 0 1 1.62-.54z"/>' },
    station:     { mirror: false, path: '<path d="M9.63 2.46a1 1 0 0 1 .74 0l7.2 2.8a1 1 0 0 1 .63.93V7.6H2.8V6.19a1 1 0 0 1 .63-.93zM3.4 9h2.2v8.6H3.4zm10.2 0h1.4a2 2 0 0 1 2 2v3.4a.8.8 0 0 0 .8.8v1.6a2.4 2.4 0 0 1-2.4-2.4V11.2a.6.6 0 0 0-.6-.6h-1.2z"/><path fill-rule="evenodd" d="M7.8 9h4.2a1.2 1.2 0 0 1 1.2 1.2v7.4H6.6v-7.4A1.2 1.2 0 0 1 7.8 9zm.6 1.8a.7.7 0 0 0-.7.7v1.2c0 .39.31.7.7.7h3a.7.7 0 0 0 .7-.7v-1.2a.7.7 0 0 0-.7-.7z"/>' },
    nozzle:      { mirror: false, path: '<path d="M5.6 5.4h4.2a1.4 1.4 0 0 1 1.4 1.4v4.4a1.4 1.4 0 0 1-1.4 1.4H8.5v3.6a1 1 0 0 1-1 1h-.6a1 1 0 0 1-1-1v-3.6h-.3a1.4 1.4 0 0 1-1.4-1.4V6.8a1.4 1.4 0 0 1 1.4-1.4z"/><path opacity=".45" d="M11.8 6.8h1.6a2.4 2.4 0 0 1 2.4 2.4v4.2h-1.7V9.2a.7.7 0 0 0-.7-.7h-1.6z"/>' },
    tank:        { mirror: false, path: '<path fill-rule="evenodd" d="M4.8 5.6h10.4a2.6 2.6 0 0 1 2.6 2.6v4.6a2.6 2.6 0 0 1-2.6 2.6H4.8a2.6 2.6 0 0 1-2.6-2.6V8.2a2.6 2.6 0 0 1 2.6-2.6zm.2 4.1a.8.8 0 0 0 0 1.6h10a.8.8 0 0 0 0-1.6z"/><path opacity=".45" d="M9.2 2.6h1.6v2.4H9.2z"/>' },
    meter:       { mirror: false, path: '<path fill-rule="evenodd" d="M3.6 5.6h12.8a1.8 1.8 0 0 1 1.8 1.8v5.2a1.8 1.8 0 0 1-1.8 1.8H3.6a1.8 1.8 0 0 1-1.8-1.8V7.4a1.8 1.8 0 0 1 1.8-1.8zm1.6 2.6a.8.8 0 0 0-.8.8v1.6c0 .44.36.8.8.8h1.2a.8.8 0 0 0 .8-.8V9a.8.8 0 0 0-.8-.8zm3.6 0a.8.8 0 0 0-.8.8v1.6c0 .44.36.8.8.8H10a.8.8 0 0 0 .8-.8V9a.8.8 0 0 0-.8-.8zm3.6 0a.8.8 0 0 0-.8.8v1.6c0 .44.36.8.8.8h1.2a.8.8 0 0 0 .8-.8V9a.8.8 0 0 0-.8-.8z"/>' },
    supply:      { mirror: false, path: '<path d="M10.66 2.64a.94.94 0 0 0-1.32 0l-.01.01a.94.94 0 0 0-.27.66v4.35H7.3a1 1 0 0 0-.74 1.68l2.7 2.96a1 1 0 0 0 1.48 0l2.7-2.96A1 1 0 0 0 12.7 7.66h-1.76V3.31a.94.94 0 0 0-.28-.67z"/><path opacity=".45" d="M3.4 12.4a1 1 0 0 1 1 1v1.4a.6.6 0 0 0 .6.6h10a.6.6 0 0 0 .6-.6v-1.4a1 1 0 0 1 2 0v1.4a2.6 2.6 0 0 1-2.6 2.6H5a2.6 2.6 0 0 1-2.6-2.6v-1.4a1 1 0 0 1 1-1z"/>' },
    support:     { mirror: false, path: '<path opacity=".45" d="M10 2.4a6.6 6.6 0 0 1 6.6 6.6v1.2h-1.9V9a4.7 4.7 0 0 0-9.4 0v1.2H3.4V9A6.6 6.6 0 0 1 10 2.4z"/><path d="M3.4 10.4h1.2a1.6 1.6 0 0 1 1.6 1.6v3a1.6 1.6 0 0 1-1.6 1.6H3.4A1.4 1.4 0 0 1 2 15.2V11.8a1.4 1.4 0 0 1 1.4-1.4zm12 0h1.2a1.4 1.4 0 0 1 1.4 1.4v3.4a1.4 1.4 0 0 1-1.4 1.4h-1.2a1.6 1.6 0 0 1-1.6-1.6v-3a1.6 1.6 0 0 1 1.6-1.6z"/>' },
    settings:    { mirror: false, path: '<path fill-rule="evenodd" d="M8.62 1.8h2.76a1 1 0 0 1 .98.8l.22 1.1c.36.15.7.35 1.02.58l1.06-.36a1 1 0 0 1 1.19.45l1.38 2.39a1 1 0 0 1-.21 1.25l-.84.74c.03.2.04.4.04.6s-.1.4-.4.6l.84.74a1 1 0 0 1 .21 1.25l-1.38 2.39a1 1 0 0 1-1.19.45l-1.06-.36c-.32.23-.66.43-1.02.58l-.22 1.1a1 1 0 0 1-.98.8H8.62a1 1 0 0 1-.98-.8l-.22-1.1a6.6 6.6 0 0 1-1.02-.58l-1.06.36a1 1 0 0 1-1.19-.45L2.77 12.6a1 1 0 0 1 .21-1.25l.84-.74a5 5 0 0 1 0-1.2l-.84-.74a1 1 0 0 1-.21-1.25l1.38-2.39a1 1 0 0 1 1.19-.45l1.06.36c.32-.23.66-.43 1.02-.58l.22-1.1a1 1 0 0 1 .98-.8zM10 7.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6z"/>' },
    user:        { mirror: false, path: '<circle cx="10" cy="6.6" r="3.4"/><path d="M3.8 15.8c0-2.72 2.78-4.6 6.2-4.6s6.2 1.88 6.2 4.6a1.4 1.4 0 0 1-1.4 1.4H5.2a1.4 1.4 0 0 1-1.4-1.4z"/>' },
    list:        { mirror: false, path: '<rect x="2.6" y="4.8" width="14.8" height="1.9" rx=".95"/><rect opacity=".55" x="2.6" y="9.05" width="14.8" height="1.9" rx=".95"/><rect x="2.6" y="13.3" width="10.2" height="1.9" rx=".95"/>' },
    menu:        { mirror: false, path: '<rect x="2.6" y="5" width="14.8" height="1.9" rx=".95"/><rect x="2.6" y="9.05" width="14.8" height="1.9" rx=".95"/><rect x="2.6" y="13.1" width="14.8" height="1.9" rx=".95"/>' },

    /* --- actions (non-directional) --- */
    search:      { mirror: false, path: '<path fill-rule="evenodd" d="M8.9 2.6a6.3 6.3 0 1 0 3.83 11.3l2.72 2.72a1.15 1.15 0 0 0 1.63-1.63l-2.72-2.72A6.3 6.3 0 0 0 8.9 2.6zm0 2.3a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/>' },
    plus:        { mirror: false, path: '<path d="M10 3a1.2 1.2 0 0 1 1.2 1.2v4.6h4.6a1.2 1.2 0 0 1 0 2.4h-4.6v4.6a1.2 1.2 0 0 1-2.4 0v-4.6H4.2a1.2 1.2 0 0 1 0-2.4h4.6V4.2A1.2 1.2 0 0 1 10 3z"/>' },
    check:       { mirror: false, path: '<path d="M16.44 5.36a1.25 1.25 0 0 1 .08 1.77l-6.6 7.2a1.25 1.25 0 0 1-1.8.04L4.4 10.6a1.25 1.25 0 1 1 1.76-1.78l2.8 2.76 5.7-6.22a1.25 1.25 0 0 1 1.78-.08z"/>' },
    close:       { mirror: false, path: '<path d="M4.72 4.72a1.2 1.2 0 0 1 1.7 0L10 8.3l3.58-3.58a1.2 1.2 0 1 1 1.7 1.7L11.7 10l3.58 3.58a1.2 1.2 0 0 1-1.7 1.7L10 11.7l-3.58 3.58a1.2 1.2 0 0 1-1.7-1.7L8.3 10 4.72 6.42a1.2 1.2 0 0 1 0-1.7z"/>' },
    delete:      { mirror: false, path: '<path d="M8.1 2.2h3.8a1.3 1.3 0 0 1 1.3 1.3v.7h3a1 1 0 0 1 0 2H3.8a1 1 0 0 1 0-2h3v-.7a1.3 1.3 0 0 1 1.3-1.3z"/><path fill-rule="evenodd" d="M5 7.6h10l-.62 8.5a1.8 1.8 0 0 1-1.8 1.7H7.42a1.8 1.8 0 0 1-1.8-1.7zm3.1 2a.7.7 0 0 0-.7.7v4.6a.7.7 0 0 0 1.4 0v-4.6a.7.7 0 0 0-.7-.7zm3.8 0a.7.7 0 0 0-.7.7v4.6a.7.7 0 0 0 1.4 0v-4.6a.7.7 0 0 0-.7-.7z"/>' },
    filter:      { mirror: false, path: '<path d="M3.4 4.2h13.2a1 1 0 0 1 .78 1.63l-4.58 5.6v4.34a1 1 0 0 1-1.45.9l-2.6-1.34a1 1 0 0 1-.55-.89v-3.01l-4.58-5.6A1 1 0 0 1 3.4 4.2z"/>' },
    download:    { mirror: false, path: '<path d="M10 2.4a1.2 1.2 0 0 1 1.2 1.2v5.72l1.75-1.75a1.2 1.2 0 0 1 1.7 1.7l-3.8 3.8a1.2 1.2 0 0 1-1.7 0l-3.8-3.8a1.2 1.2 0 0 1 1.7-1.7l1.75 1.75V3.6A1.2 1.2 0 0 1 10 2.4z"/><path opacity=".45" d="M3.6 14.2h12.8a1.1 1.1 0 0 1 0 2.2H3.6a1.1 1.1 0 0 1 0-2.2z"/>' },
    refresh:     { mirror: false, path: '<path fill-rule="evenodd" d="M10 3.4a6.6 6.6 0 1 0 6.42 8.14 1.15 1.15 0 0 0-2.24-.52A4.3 4.3 0 1 1 10 5.7c1.16 0 2.2.46 2.98 1.2h-1.12a1.1 1.1 0 0 0 0 2.2h3.5a1.1 1.1 0 0 0 1.1-1.1V4.5a1.1 1.1 0 0 0-2.2 0v.62A6.57 6.57 0 0 0 10 3.4z"/>' },
    more:        { mirror: false, path: '<circle cx="4.6" cy="10" r="1.7"/><circle cx="10" cy="10" r="1.7"/><circle cx="15.4" cy="10" r="1.7"/>' },
    sort:        { mirror: false, path: '<path d="M6 2.8a1.1 1.1 0 0 1 .78.32l2.1 2.1a1.1 1.1 0 0 1-1.56 1.56l-.22-.22V16.1a1.1 1.1 0 0 1-2.2 0V6.56l-.22.22A1.1 1.1 0 0 1 3.12 5.22l2.1-2.1A1.1 1.1 0 0 1 6 2.8z"/><path d="M14 17.2a1.1 1.1 0 0 1-.78-.32l-2.1-2.1a1.1 1.1 0 0 1 1.56-1.56l.22.22V3.9a1.1 1.1 0 0 1 2.2 0v9.54l.22-.22a1.1 1.1 0 0 1 1.56 1.56l-2.1 2.1a1.1 1.1 0 0 1-.78.32z"/>' },
    "chevron-down": { mirror: false, path: '<path d="M3.92 7.02a1.2 1.2 0 0 1 1.7 0L10 11.4l4.38-4.38a1.2 1.2 0 0 1 1.7 1.7l-5.23 5.23a1.2 1.2 0 0 1-1.7 0L3.92 8.72a1.2 1.2 0 0 1 0-1.7z"/>' },
    camera:      { mirror: false, path: '<path fill-rule="evenodd" d="M7.7 2.8h4.6a1 1 0 0 1 .84.46l.82 1.28h1.64A2.4 2.4 0 0 1 18 6.94v7.46a2.4 2.4 0 0 1-2.4 2.4H4.4A2.4 2.4 0 0 1 2 14.4V6.94a2.4 2.4 0 0 1 2.4-2.4h1.64l.82-1.28a1 1 0 0 1 .84-.46zM10 7.5a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4z"/>' },
    attachment:  { mirror: false, path: '<path d="M12.66 3.34a3.9 3.9 0 0 1 5.52 5.52l-6.4 6.4a1.1 1.1 0 0 1-1.56-1.56l6.4-6.4a1.7 1.7 0 0 0-2.4-2.4l-6.4 6.4a3.1 3.1 0 0 0 4.38 4.38l5-5a1.1 1.1 0 0 1 1.56 1.56l-5 5a5.3 5.3 0 0 1-7.5-7.5z"/>' },
    calendar:    { mirror: false, path: '<path fill-rule="evenodd" d="M6.4 2a1 1 0 0 1 1 1v.6h5.2V3a1 1 0 0 1 2 0v.6h.8A2.2 2.2 0 0 1 17.6 5.8v9.4a2.2 2.2 0 0 1-2.2 2.2H4.6a2.2 2.2 0 0 1-2.2-2.2V5.8a2.2 2.2 0 0 1 2.2-2.2h.8V3a1 1 0 0 1 1-1zM4.4 8.4v6.8c0 .11.09.2.2.2h10.8a.2.2 0 0 0 .2-.2V8.4zm2.3 1.6a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8zm3.3 0a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8zm3.3 0a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8z"/>' },
    eye:         { mirror: false, path: '<path fill-rule="evenodd" d="M10 4.4c4.4 0 7.4 4 8.1 5.16a.9.9 0 0 1 0 .88C17.4 11.6 14.4 15.6 10 15.6S2.6 11.6 1.9 10.44a.9.9 0 0 1 0-.88C2.6 8.4 5.6 4.4 10 4.4zm0 2.4a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4z"/><circle cx="10" cy="10" r="1.5"/>' },
    "eye-off":   { mirror: false, path: '<path opacity=".62" d="M10 4.4c4.4 0 7.4 4 8.1 5.16a.9.9 0 0 1 0 .88 15.6 15.6 0 0 1-2.5 3.02l-2.62-2.62a3.2 3.2 0 0 0-4.22-4.22L6.98 5.38A9.4 9.4 0 0 1 10 4.4zM4.36 6.62l2.3 2.3a3.2 3.2 0 0 0 4.42 4.42l1.98 1.98c-.95.3-1.97.48-3.06.48-4.4 0-7.4-4-8.1-5.16a.9.9 0 0 1 0-.88 15.7 15.7 0 0 1 2.46-3.14z"/><path d="M4.1 3.7a.85.85 0 0 1 1.2 0l11 11a.85.85 0 0 1-1.2 1.2l-11-11a.85.85 0 0 1 0-1.2z"/>' },

    /* --- states (non-directional) --- */
    bell:        { mirror: false, path: '<path d="M10 1.8a1.3 1.3 0 0 1 1.3 1.3v.42A5.4 5.4 0 0 1 15.4 8.8v2.6l1.1 1.7a1 1 0 0 1-.84 1.54H4.34a1 1 0 0 1-.84-1.54l1.1-1.7V8.8a5.4 5.4 0 0 1 4.1-5.28V3.1A1.3 1.3 0 0 1 10 1.8z"/><path opacity=".55" d="M7.7 15.9h4.6a2.4 2.4 0 0 1-4.6 0z"/>' },
    alert:       { mirror: false, path: '<path fill-rule="evenodd" d="M8.62 3.1a1.6 1.6 0 0 1 2.76 0l6.36 11.3a1.6 1.6 0 0 1-1.38 2.4H3.64a1.6 1.6 0 0 1-1.38-2.4zM10 6.9a.9.9 0 0 0-.9.9v3.4a.9.9 0 0 0 1.8 0V7.8a.9.9 0 0 0-.9-.9zm0 6a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z"/>' },
    info:        { mirror: false, path: '<path fill-rule="evenodd" d="M10 2.4a7.6 7.6 0 1 0 0 15.2 7.6 7.6 0 0 0 0-15.2zm0 3.1a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zm0 3.6a.95.95 0 0 1 .95.95v4a.95.95 0 0 1-1.9 0v-4A.95.95 0 0 1 10 9.1z"/>' },
    "wifi-off":  { mirror: false, path: '<path opacity=".62" d="M10 4.2c2.66 0 5.1.94 7 2.5a1.1 1.1 0 0 1-1.4 1.7A8.9 8.9 0 0 0 10 6.4c-.5 0-1 .04-1.47.12L6.86 4.85A11 11 0 0 1 10 4.2zM4.4 6.28l1.6 1.6c-.58.3-1.12.66-1.6 1.08a1.1 1.1 0 0 1-1.44-1.66c.44-.38.92-.72 1.44-1.02zM7.6 9.48l1.72 1.72a3.4 3.4 0 0 0-1.2.68 1.1 1.1 0 0 1-1.42-1.68c.28-.26.58-.5.9-.72z"/><circle opacity=".62" cx="10" cy="14.9" r="1.4"/><path d="M4.1 3.7a.85.85 0 0 1 1.2 0l11 11a.85.85 0 0 1-1.2 1.2l-11-11a.85.85 0 0 1 0-1.2z"/>' },
    empty:       { mirror: false, path: '<path fill-rule="evenodd" d="M4.4 3.6h11.2a2.2 2.2 0 0 1 2.2 2.2v8.4a2.2 2.2 0 0 1-2.2 2.2H4.4a2.2 2.2 0 0 1-2.2-2.2V5.8a2.2 2.2 0 0 1 2.2-2.2zm0 2v1.8h11.2V5.6zm3.2 5.2a.9.9 0 0 0 0 1.8h4.8a.9.9 0 0 0 0-1.8z"/>' },
    lock:        { mirror: false, path: '<path opacity=".45" d="M10 2.2a4 4 0 0 1 4 4v2.2h-2.2V6.2a1.8 1.8 0 0 0-3.6 0v2.2H6V6.2a4 4 0 0 1 4-4z"/><path fill-rule="evenodd" d="M4.8 8.4h10.4a1.8 1.8 0 0 1 1.8 1.8v5.4a1.8 1.8 0 0 1-1.8 1.8H4.8A1.8 1.8 0 0 1 3 15.6v-5.4a1.8 1.8 0 0 1 1.8-1.8zM10 10.8a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1z"/>' },
    mail:        { mirror: false, path: '<path fill-rule="evenodd" d="M3.6 4h12.8A2.2 2.2 0 0 1 18.6 6.2v7.6a2.2 2.2 0 0 1-2.2 2.2H3.6a2.2 2.2 0 0 1-2.2-2.2V6.2A2.2 2.2 0 0 1 3.6 4zm.36 2.2a.3.3 0 0 0-.18.54l5.66 4.12a.95.95 0 0 0 1.12 0l5.66-4.12a.3.3 0 0 0-.18-.54z"/>' },
    fingerprint: { mirror: false, brandArtwork: true, artwork: "assets/np-fingerprint.png",
                   path: '<image href="assets/np-fingerprint.png" xlink:href="assets/np-fingerprint.png" x="0" y="0" width="20" height="20" preserveAspectRatio="xMidYMid meet"></image>' },

    /* --- DIRECTIONAL — these mirror in RTL --- */
    back:        { mirror: true,  path: '<path d="M8.88 3.52a1.2 1.2 0 0 1 0 1.7L5.3 8.8h10.3a1.2 1.2 0 0 1 0 2.4H5.3l3.58 3.58a1.2 1.2 0 0 1-1.7 1.7l-5.6-5.63a1.2 1.2 0 0 1 0-1.7l5.6-5.63a1.2 1.2 0 0 1 1.7 0z"/>' },
    forward:     { mirror: true,  path: '<path d="M11.12 3.52a1.2 1.2 0 0 0 0 1.7L14.7 8.8H4.4a1.2 1.2 0 0 0 0 2.4h10.3l-3.58 3.58a1.2 1.2 0 0 0 1.7 1.7l5.6-5.63a1.2 1.2 0 0 0 0-1.7l-5.6-5.63a1.2 1.2 0 0 0-1.7 0z"/>' },
    chevron:     { mirror: true,  path: '<path d="M7.02 3.92a1.2 1.2 0 0 1 1.7 0l5.23 5.23a1.2 1.2 0 0 1 0 1.7l-5.23 5.23a1.2 1.2 0 0 1-1.7-1.7L11.4 10 7.02 5.62a1.2 1.2 0 0 1 0-1.7z"/>' },
    "chevron-back": { mirror: true, path: '<path d="M12.98 3.92a1.2 1.2 0 0 0-1.7 0L6.05 9.15a1.2 1.2 0 0 0 0 1.7l5.23 5.23a1.2 1.2 0 0 0 1.7-1.7L8.6 10l4.38-4.38a1.2 1.2 0 0 0 0-1.7z"/>' },
    collapse:    { mirror: true,  path: '<path d="M11.98 4.12a1.2 1.2 0 0 0-1.7 0L5.45 8.95a1.2 1.2 0 0 0 0 1.7l4.83 4.83a1.2 1.2 0 0 0 1.7-1.7L8.15 10l3.83-3.78a1.2 1.2 0 0 0 0-2.1z"/><path opacity=".45" d="M16 3.4a1.1 1.1 0 0 1 1.1 1.1v11a1.1 1.1 0 0 1-2.2 0v-11A1.1 1.1 0 0 1 16 3.4z"/>' },
    expand:      { mirror: true,  path: '<path d="M8.02 4.12a1.2 1.2 0 0 1 1.7 0l4.83 4.83a1.2 1.2 0 0 1 0 1.7l-4.83 4.83a1.2 1.2 0 0 1-1.7-1.7L11.85 10 8.02 6.22a1.2 1.2 0 0 1 0-2.1z"/><path opacity=".45" d="M4 3.4a1.1 1.1 0 0 1 1.1 1.1v11a1.1 1.1 0 0 1-2.2 0v-11A1.1 1.1 0 0 1 4 3.4z"/>' },
    logout:      { mirror: true,  path: '<path opacity=".45" d="M4.6 2.2h4.6a1.1 1.1 0 0 1 0 2.2H5.2a.6.6 0 0 0-.6.6v10c0 .33.27.6.6.6h4a1.1 1.1 0 0 1 0 2.2H4.6A2.4 2.4 0 0 1 2.2 15.4V4.6a2.4 2.4 0 0 1 2.4-2.4z"/><path d="M12.92 5.52a1.2 1.2 0 0 1 1.7 0l3.38 3.38a1.2 1.2 0 0 1 0 1.7l-3.38 3.38a1.2 1.2 0 0 1-1.7-1.7l1.33-1.33H8.4a1.2 1.2 0 0 1 0-2.4h5.85l-1.33-1.33a1.2 1.2 0 0 1 0-1.7z"/>' },

    /* ── NP-ICON-SYSTEM-01 · v2 — promoted meanings ───────────────────────
       Functional meanings the active product already renders (Worker ·
       Manager · Web) that had no canonical id. Promoted explicitly, same
       grammar: 20×20, filled, fill=currentColor, evenodd detail, no colour
       inside the glyph. Reference-only sheet art is NOT promoted. */
    droplet         : { mirror: false, path: '<path d="M10 2.2c1.7 2.7 4.8 5.9 4.8 9.4a4.8 4.8 0 0 1-9.6 0c0-3.5 3.1-6.7 4.8-9.4z"/>' },
    scale           : { mirror: false, path: '<path d="M10 2.4a1 1 0 0 1 1 1v.6l4.2.9a1 1 0 0 1-.42 1.96L11 6.06v9.54h2.6a1 1 0 0 1 0 2H6.4a1 1 0 0 1 0-2H9V6.06l-3.78.76a1 1 0 0 1-.42-1.96L9 3.96V3.4a1 1 0 0 1 1-1z"/><path opacity=".45" d="M5.4 7.6 7.8 12H3zm9.2 0L17 12h-4.8z"/>' },
    success         : { mirror: false, path: '<path fill-rule="evenodd" d="M10 2.2a7.8 7.8 0 1 0 0 15.6 7.8 7.8 0 0 0 0-15.6zm3.9 5.04a1.1 1.1 0 0 1 .06 1.56l-4.3 4.7a1.1 1.1 0 0 1-1.59.03l-2.1-2.06a1.1 1.1 0 1 1 1.54-1.56l1.28 1.26 3.55-3.88a1.1 1.1 0 0 1 1.56-.05z"/>' },
    warning         : { mirror: false, path: '<path fill-rule="evenodd" d="M8.62 3.1a1.6 1.6 0 0 1 2.76 0l6.36 11.3a1.6 1.6 0 0 1-1.38 2.4H3.64a1.6 1.6 0 0 1-1.38-2.4zM10 6.9a.9.9 0 0 0-.9.9v3.4a.9.9 0 0 0 1.8 0V7.8a.9.9 0 0 0-.9-.9zm0 6a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z"/>' },
    clock           : { mirror: false, path: '<path fill-rule="evenodd" d="M10 2.4a7.6 7.6 0 1 0 0 15.2 7.6 7.6 0 0 0 0-15.2zm0 2.9a1 1 0 0 1 1 1v3.26l2.1 1.4a1 1 0 0 1-1.1 1.66l-2.55-1.7a1 1 0 0 1-.45-.83V6.3a1 1 0 0 1 1-1z"/>' },
    unlock          : { mirror: false, path: '<path opacity=".45" d="M10 2.2a4 4 0 0 1 4 4h-2.2a1.8 1.8 0 0 0-3.6 0v2.2H6V6.2a4 4 0 0 1 4-4z"/><path fill-rule="evenodd" d="M4.8 8.4h10.4a1.8 1.8 0 0 1 1.8 1.8v5.4a1.8 1.8 0 0 1-1.8 1.8H4.8A1.8 1.8 0 0 1 3 15.6v-5.4a1.8 1.8 0 0 1 1.8-1.8zM10 10.8a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1z"/>' },
    shield          : { mirror: false, path: '<path fill-rule="evenodd" d="M9.58 1.92a1.1 1.1 0 0 1 .84 0l5.6 2.3a1.1 1.1 0 0 1 .68 1.02v4.4c0 3.68-2.42 6.72-6.28 8.32a1.1 1.1 0 0 1-.84 0C5.72 16.36 3.3 13.32 3.3 9.64v-4.4a1.1 1.1 0 0 1 .68-1.02zm3.34 5.34a1 1 0 0 0-1.42.04L9.2 9.8l-.9-.88a1 1 0 0 0-1.4 1.44l1.62 1.58a1 1 0 0 0 1.43-.02l3-3.2a1 1 0 0 0-.03-1.46z"/>' },
    sliders:         { mirror: false, path: '<path fill-rule="evenodd" d="M2.6 5.4h14.8a1 1 0 0 1 0 2H2.6a1 1 0 0 1 0-2zM7 3.8a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2zm0 1.5a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z"/><path fill-rule="evenodd" d="M2.6 12.6h14.8a1 1 0 0 1 0 2H2.6a1 1 0 0 1 0-2zM13 11a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2zm0 1.5a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z"/>' },
    phone           : { mirror: false, path: '<path d="M5.2 2.4h2.9a1 1 0 0 1 .94.66l1.1 3a1 1 0 0 1-.34 1.14l-1.5 1.1a9.4 9.4 0 0 0 3.5 3.5l1.1-1.5a1 1 0 0 1 1.14-.34l3 1.1a1 1 0 0 1 .66.94v2.9a1.7 1.7 0 0 1-1.86 1.69C8.3 16.02 3.98 11.7 3.5 4.26A1.7 1.7 0 0 1 5.2 2.4z"/>' },
    globe           : { mirror: false, path: '<path fill-rule="evenodd" d="M10 2.4a7.6 7.6 0 1 0 0 15.2 7.6 7.6 0 0 0 0-15.2zM8.8 4.6a12 12 0 0 0-1.3 4.5H4.72A5.5 5.5 0 0 1 8.8 4.6zm2.4 0a5.5 5.5 0 0 1 4.08 4.5h-2.78a12 12 0 0 0-1.3-4.5zM7.5 11.1h5a12 12 0 0 1-1.2 4.3H8.7a12 12 0 0 1-1.2-4.3zm-2.78 0H7.5a13.6 13.6 0 0 0 1.3 4.3 5.5 5.5 0 0 1-4.08-4.3zm7.78 0h2.78a5.5 5.5 0 0 1-4.08 4.3 13.6 13.6 0 0 0 1.3-4.3zM8.8 9.1a10 10 0 0 1 1.2-4.1 10 10 0 0 1 1.2 4.1z"/>' },
    moon            : { mirror: false, path: '<path d="M11.8 2.2a1 1 0 0 1 .5 1.7 5.6 5.6 0 0 0 4.9 9.4 1 1 0 0 1 1.1 1.36A7.8 7.8 0 1 1 11.06 2.22z"/>' },
    undo            : { mirror: true , path: '<path d="M7.08 3.52a1.2 1.2 0 0 1 0 1.7L5.3 7h5.9a5.8 5.8 0 0 1 5.8 5.8v2.6a1.2 1.2 0 0 1-2.4 0v-2.6A3.4 3.4 0 0 0 11.2 9.4H5.3l1.78 1.78a1.2 1.2 0 0 1-1.7 1.7L1.96 9.05a1.2 1.2 0 0 1 0-1.7L5.38 3.52a1.2 1.2 0 0 1 1.7 0z"/>' },
    minus           : { mirror: false, path: '<path d="M4.2 8.8h11.6a1.2 1.2 0 0 1 0 2.4H4.2a1.2 1.2 0 0 1 0-2.4z"/>' },
    edit            : { mirror: false, path: '<path d="M13.44 2.86a1.6 1.6 0 0 1 2.26 0l1.44 1.44a1.6 1.6 0 0 1 0 2.26l-7.9 7.9a1.6 1.6 0 0 1-.74.42l-3.3.86a1 1 0 0 1-1.22-1.22l.86-3.3a1.6 1.6 0 0 1 .42-.74z"/><path opacity=".45" d="M3 16.6h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2z"/>' },
    truck           : { mirror: false, path: '<path d="M2.4 5.6h7.2a1 1 0 0 1 1 1v6.2H3.4a1 1 0 0 1-1-1z"/><path opacity=".45" d="M11.6 7.8h2.6a2 2 0 0 1 1.7.94l1.4 2.24a2 2 0 0 1 .3 1.06v.76h-6z"/><circle cx="6" cy="14.6" r="1.8"/><circle cx="14.4" cy="14.6" r="1.8"/>' },
    key             : { mirror: false, path: '<path fill-rule="evenodd" d="M13.4 2.6a4.6 4.6 0 0 0-4.36 6.06L2.9 14.76a1 1 0 0 0-.3.7v1.94a1 1 0 0 0 1 1h2.06a1 1 0 0 0 .7-.3l.74-.74v-1.36h1.5v-1.5h1.36l1.38-1.38A4.6 4.6 0 1 0 13.4 2.6zm.9 2.4a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z"/>' },
    print           : { mirror: false, path: '<path opacity=".45" d="M5.6 2.4h8.8a1 1 0 0 1 1 1v3.2H4.6V3.4a1 1 0 0 1 1-1z"/><path fill-rule="evenodd" d="M3.4 7.6h13.2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1.2v-2.4a1 1 0 0 0-1-1H5.6a1 1 0 0 0-1 1v2.4H3.4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zm2.2 6.8h8.8v2.2a1 1 0 0 1-1 1H6.6a1 1 0 0 1-1-1z"/>' },
    "qr-code"       : { mirror: false, path: '<path fill-rule="evenodd" d="M2.6 2.6h6v6h-6zm2 2v2h2v-2zm6.8-2h6v6h-6zm2 2v2h2v-2zM2.6 11.4h6v6h-6zm2 2v2h2v-2z"/><path d="M11.4 11.4h2v2h-2zm4 0h2v2h-2zm-2 2h2v2h-2zm2 2h2v2h-2zm-4 0h2v2h-2z"/>' },
    nfc             : { mirror: false, path: '<path fill-rule="evenodd" d="M10 3.2a1 1 0 0 1 .78.37 10.4 10.4 0 0 1 0 12.86 1 1 0 0 1-1.56-1.26 8.4 8.4 0 0 0 0-10.34A1 1 0 0 1 10 3.2zM6.3 5.8a1 1 0 0 1 .8.4 6.2 6.2 0 0 1 0 7.6 1 1 0 0 1-1.6-1.2 4.2 4.2 0 0 0 0-5.2 1 1 0 0 1 .8-1.6z"/><circle cx="3.4" cy="10" r="1.6"/>' },
    star            : { mirror: false, path: '<path d="M10.9 2.2 12.8 6.1l4.3.62a1 1 0 0 1 .56 1.71l-3.1 3 .73 4.26a1 1 0 0 1-1.45 1.06L10 14.76l-3.87 2a1 1 0 0 1-1.45-1.06l.73-4.27-3.1-3a1 1 0 0 1 .56-1.7L7.2 6.1 9.1 2.2a1 1 0 0 1 1.8 0z"/>' },
    heart           : { mirror: false, path: '<path d="M10 17.2c-.3 0-.6-.1-.84-.3C5.9 14.2 2 11.1 2 7.6A4.6 4.6 0 0 1 10 4.5a4.6 4.6 0 0 1 8 3.1c0 3.5-3.9 6.6-7.16 9.3-.24.2-.54.3-.84.3z"/>' },
    send            : { mirror: false, path: '<path d="M17.2 2.9a1 1 0 0 1 .26 1.06l-4.6 13a1 1 0 0 1-1.84.1L8.9 12.3l-4.76-2.1a1 1 0 0 1 .1-1.86l13-4.6a1 1 0 0 1 .96.16z"/>' },
    share           : { mirror: false, path: '<circle cx="15.4" cy="4.6" r="2.6"/><circle cx="4.6" cy="10" r="2.6"/><circle cx="15.4" cy="15.4" r="2.6"/><path opacity=".5" d="M13.4 5.8 6.6 9.2l-.9-1.8 6.8-3.4zm-6.8 5 6.8 3.4-.9 1.8-6.8-3.4z"/>' },
    location        : { mirror: false, path: '<path fill-rule="evenodd" d="M10 2a6 6 0 0 1 6 6c0 4.2-4.4 8.8-5.3 9.7a1 1 0 0 1-1.4 0C8.4 16.8 4 12.2 4 8a6 6 0 0 1 6-6zm0 3.6a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8z"/>' },
    chat            : { mirror: false, path: '<path fill-rule="evenodd" d="M4 3.4h12a2.2 2.2 0 0 1 2.2 2.2v6.4a2.2 2.2 0 0 1-2.2 2.2H9.4l-3.5 2.8A1 1 0 0 1 4.3 16.2v-2h-.3A2.2 2.2 0 0 1 1.8 12V5.6A2.2 2.2 0 0 1 4 3.4zm2.6 4a1 1 0 1 0 0 2h6.8a1 1 0 0 0 0-2z"/>' },
    question        : { mirror: false, path: '<path fill-rule="evenodd" d="M10 2.4a7.6 7.6 0 1 0 0 15.2 7.6 7.6 0 0 0 0-15.2zm.06 3.1a3 3 0 0 1 1.5 5.6c-.4.24-.56.44-.56.7v.3a1 1 0 0 1-2 0v-.3c0-1.16.66-1.9 1.52-2.4a1 1 0 0 0-1.46-1.16 1 1 0 0 1-1.42-1.4 3 3 0 0 1 2.42-1.34zM10 13.9a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"/>' },
    ticket          : { mirror: false, path: '<path fill-rule="evenodd" d="M3.4 5h13.2a1.4 1.4 0 0 1 1.4 1.4v2a2.1 2.1 0 0 0 0 3.2v2a1.4 1.4 0 0 1-1.4 1.4H3.4A1.4 1.4 0 0 1 2 13.6v-2a2.1 2.1 0 0 0 0-3.2v-2A1.4 1.4 0 0 1 3.4 5zm3.2 3.2a.9.9 0 0 0 0 1.8h6.8a.9.9 0 0 0 0-1.8z"/>' },
    bank            : { mirror: false, path: '<path d="M9.52 2.14a1.1 1.1 0 0 1 .96 0l7 3.4A1 1 0 0 1 17.04 7.4H2.96a1 1 0 0 1-.44-1.86zM4 8.8h2.2v5.4H4zm4.9 0h2.2v5.4H8.9zm4.9 0H16v5.4h-2.2z"/><path opacity=".5" d="M2.6 15.6h14.8a1 1 0 0 1 0 2H2.6a1 1 0 0 1 0-2z"/>' },
    "payment-card"  : { mirror: false, path: '<path fill-rule="evenodd" d="M3.4 4.4h13.2a2 2 0 0 1 2 2v7.2a2 2 0 0 1-2 2H3.4a2 2 0 0 1-2-2V6.4a2 2 0 0 1 2-2zm-.2 3.4v1.8h13.6V7.8zm2 3.8a.9.9 0 0 0 0 1.8h3.4a.9.9 0 0 0 0-1.8z"/>' },
    transfer        : { mirror: false, path: '<path d="M12.68 2.92a1.1 1.1 0 0 1 1.56 0l2.6 2.6a1.1 1.1 0 0 1-.78 1.88H4.4a1.1 1.1 0 0 1 0-2.2h9.02l-.74-.72a1.1 1.1 0 0 1 0-1.56z"/><path opacity=".5" d="M7.32 17.08a1.1 1.1 0 0 1-1.56 0l-2.6-2.6A1.1 1.1 0 0 1 3.94 12.6h11.66a1.1 1.1 0 0 1 0 2.2H6.58l.74.72a1.1 1.1 0 0 1 0 1.56z"/>' },
    receipt         : { mirror: false, path: '<path fill-rule="evenodd" d="M4.6 2.2h10.8a1.4 1.4 0 0 1 1.4 1.4v14.2l-2.2-1.4-2.2 1.4-2.4-1.4-2.4 1.4-2.2-1.4-2.2 1.4V3.6a1.4 1.4 0 0 1 1.4-1.4zm1.8 3.2a.9.9 0 0 0 0 1.8h7.2a.9.9 0 0 0 0-1.8zm0 3.6a.9.9 0 0 0 0 1.8h7.2a.9.9 0 0 0 0-1.8z"/>' },
    purchase        : { mirror: false, path: '<path d="M1.8 3.4h2.1a1 1 0 0 1 .97.76l.26 1.04h11.7a1 1 0 0 1 .96 1.28l-1.6 5.2a1 1 0 0 1-.96.72H7.1a1 1 0 0 1-.97-.76L4.1 5.4h-2.3a1 1 0 0 1 0-2z"/><circle cx="7.6" cy="16" r="1.7"/><circle cx="14.6" cy="16" r="1.7"/>' },
    "cloud-upload"  : { mirror: false, path: '<path d="M10 2.6a5.4 5.4 0 0 1 5.3 4.42A4 4 0 0 1 14.6 15h-3.4v-4.1l1.25 1.24a1.1 1.1 0 0 0 1.56-1.56l-3.13-3.12a1.1 1.1 0 0 0-1.56 0L6.19 10.58a1.1 1.1 0 0 0 1.56 1.56L8.8 10.9V15H5.6a4 4 0 0 1-.9-7.98A5.4 5.4 0 0 1 10 2.6z"/>' },
    "cloud-sync"    : { mirror: false, path: '<path fill-rule="evenodd" d="M10 2.6a5.4 5.4 0 0 1 5.3 4.42A4 4 0 0 1 14.6 15H5.6a4 4 0 0 1-.9-7.98A5.4 5.4 0 0 1 10 2.6zm0 5.6a3 3 0 0 0-2.7 1.72.9.9 0 0 0 1.62.78A1.2 1.2 0 0 1 10 10a1.2 1.2 0 0 1 1.1.72h-.6l1.5 2 1.5-2h-.66A3 3 0 0 0 10 8.2z"/>' },
    wifi            : { mirror: false, path: '<path d="M10 3.6c2.9 0 5.5 1.04 7.4 2.78a1.1 1.1 0 0 1-1.5 1.62A9 9 0 0 0 10 5.8a9 9 0 0 0-5.9 2.2A1.1 1.1 0 0 1 2.6 6.38A11.2 11.2 0 0 1 10 3.6zm0 4.2c1.8 0 3.4.66 4.6 1.74a1.1 1.1 0 0 1-1.46 1.64A4.9 4.9 0 0 0 10 10a4.9 4.9 0 0 0-3.14 1.18A1.1 1.1 0 0 1 5.4 9.54A6.9 6.9 0 0 1 10 7.8z"/><circle cx="10" cy="14.9" r="1.7"/>' },
    start           : { mirror: false, path: '<path fill-rule="evenodd" d="M10 2.2a7.8 7.8 0 1 0 0 15.6 7.8 7.8 0 0 0 0-15.6zm-1.3 4.6 4.6 2.7a.8.8 0 0 1 0 1.38l-4.6 2.72a.8.8 0 0 1-1.2-.7V7.5a.8.8 0 0 1 1.2-.7z"/>' },
    stop            : { mirror: false, path: '<path fill-rule="evenodd" d="M10 2.2a7.8 7.8 0 1 0 0 15.6 7.8 7.8 0 0 0 0-15.6zM7.9 7.2h4.2a.7.7 0 0 1 .7.7v4.2a.7.7 0 0 1-.7.7H7.9a.7.7 0 0 1-.7-.7V7.9a.7.7 0 0 1 .7-.7z"/>' },
    "pie-chart"     : { mirror: false, path: '<path d="M9 2.06v7.94a1 1 0 0 0 .3.7l5.62 5.62A8 8 0 0 0 9 2.06z" opacity=".5"/><path d="M11 2.06A8 8 0 1 0 13.5 17.3l-5.4-5.4a1 1 0 0 1-.3-.7V2.06z"/>' },
    trend           : { mirror: false, path: '<path d="M16.6 4.4a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0V7.82l-4.5 4.5a1 1 0 0 1-1.42 0L7.6 10.24l-3.9 3.9a1 1 0 0 1-1.4-1.42l4.6-4.6a1 1 0 0 1 1.42 0l2.08 2.08 3.78-3.8H12.6a1 1 0 0 1 0-2z"/>' },
    calculator      : { mirror: false, path: '<path fill-rule="evenodd" d="M4.6 1.8h10.8a1.8 1.8 0 0 1 1.8 1.8v12.8a1.8 1.8 0 0 1-1.8 1.8H4.6a1.8 1.8 0 0 1-1.8-1.8V3.6A1.8 1.8 0 0 1 4.6 1.8zm.8 2.2a.7.7 0 0 0-.7.7v1.8c0 .39.31.7.7.7h9.2a.7.7 0 0 0 .7-.7V4.7a.7.7 0 0 0-.7-.7zm.9 5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zm3.7 0a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zm3.7 0a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zm-7.4 4a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zm3.7 0a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zm3.7 0a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/>' },
    team            : { mirror: false, path: '<circle cx="7.4" cy="7" r="3"/><path d="M2.4 15.6c0-2.5 2.2-4.2 5-4.2s5 1.7 5 4.2a1.2 1.2 0 0 1-1.2 1.2H3.6a1.2 1.2 0 0 1-1.2-1.2z"/><path opacity=".45" d="M13.6 4.6a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5zm.2 6.4c2 .1 3.8 1.5 3.8 3.5a1.2 1.2 0 0 1-1.2 1.2h-2.5c.06-.3.1-.6.1-.9 0-1.5-.6-2.8-1.6-3.7.44-.07.9-.1 1.4-.1z"/>' },
    "id-card"       : { mirror: false, path: '<path fill-rule="evenodd" d="M3.4 4h13.2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3.4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm3.4 2.6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 4.8c-1.8 0-3.2 1-3.2 2.4 0 .36.3.66.66.66h5.08c.36 0 .66-.3.66-.66 0-1.4-1.4-2.4-3.2-2.4zm5.2-4.2a.8.8 0 0 0 0 1.6h3.2a.8.8 0 0 0 0-1.6zm0 3.2a.8.8 0 0 0 0 1.6h3.2a.8.8 0 0 0 0-1.6z"/>' },
    helmet          : { mirror: false, path: '<path d="M10 3.2a5.6 5.6 0 0 1 5.6 5.6v2.2H4.4V8.8A5.6 5.6 0 0 1 10 3.2z"/><path opacity=".5" d="M2.4 12.2h15.2a1 1 0 0 1 0 2H2.4a1 1 0 0 1 0-2z"/>' },
    document        : { mirror: false, path: '<path fill-rule="evenodd" d="M5.4 2.4h9.2a1.9 1.9 0 0 1 1.9 1.9v11.4a1.9 1.9 0 0 1-1.9 1.9H5.4a1.9 1.9 0 0 1-1.9-1.9V4.3A1.9 1.9 0 0 1 5.4 2.4zm.9 3.5a.75.75 0 0 0 0 1.5h7.4a.75.75 0 0 0 0-1.5zm0 3.4a.75.75 0 0 0 0 1.5h7.4a.75.75 0 0 0 0-1.5zm0 3.4a.75.75 0 0 0 0 1.5h4.6a.75.75 0 0 0 0-1.5z"/>' },
    signature       : { mirror: false, path: '<path d="M13.44 2.86a1.6 1.6 0 0 1 2.26 0l1.44 1.44a1.6 1.6 0 0 1 0 2.26l-7.9 7.9a1.6 1.6 0 0 1-.74.42l-3.3.86a1 1 0 0 1-1.22-1.22l.86-3.3a1.6 1.6 0 0 1 .42-.74z"/><path opacity=".45" d="M3 16.6h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2z"/>' },
    handover        : { mirror: false, path: '<path d="M10 2.6a1 1 0 0 1 1 1v6.2l1.7-1.4a1.4 1.4 0 0 1 1.96 1.96l-3.1 3.6a1 1 0 0 1-.76.34H7.2a1 1 0 0 1-.78-.38l-2.4-3A1.4 1.4 0 0 1 6.2 9.1L7 9.9V3.6a1 1 0 0 1 1-1z" opacity=".5"/><path d="M3.4 14.6h13.2a1 1 0 0 1 0 2H3.4a1 1 0 0 1 0-2z"/>' },
    mute            : { mirror: false, path: '<path d="M10 1.8a1.3 1.3 0 0 1 1.3 1.3v.42A5.4 5.4 0 0 1 15.4 8.8v2.6l1.1 1.7a1 1 0 0 1-.84 1.54H4.34a1 1 0 0 1-.84-1.54l1.1-1.7V8.8a5.4 5.4 0 0 1 4.1-5.28V3.1A1.3 1.3 0 0 1 10 1.8z" opacity=".5"/><path d="M4.1 3.7a.85.85 0 0 1 1.2 0l11 11a.85.85 0 0 1-1.2 1.2l-11-11a.85.85 0 0 1 0-1.2z"/>' },

    "arrow-in":  { mirror: true,  path: '<path d="M9.52 5.52a1.2 1.2 0 0 1 1.7 0l3.38 3.38a1.2 1.2 0 0 1 0 1.7l-3.38 3.38a1.2 1.2 0 0 1-1.7-1.7l1.33-1.33H3.6a1.2 1.2 0 0 1 0-2.4h7.25L9.52 7.22a1.2 1.2 0 0 1 0-1.7z"/><path opacity=".45" d="M16.4 3.4a1.1 1.1 0 0 1 1.1 1.1v11a1.1 1.1 0 0 1-2.2 0v-11a1.1 1.1 0 0 1 1.1-1.1z"/>' }
  };

  class NPIcon extends HTMLElement {
    static get observedAttributes() { return ["name", "size"]; }
    constructor() { super(); this.attachShadow({ mode: "open" }); }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { this.render(); }
    render() {
      if (!this.shadowRoot) return;
      var name = this.getAttribute("name") || "home";
      var entry = REGISTRY[name] || REGISTRY.home;
      var size = this.getAttribute("size") || "20";
      /* mirroring metadata is reflected onto the host so the shared
         stylesheet can mirror it under [dir="rtl"] without forking. */
      if (entry.mirror) this.setAttribute("data-mirror", "true");
      else this.removeAttribute("data-mirror");
      this.style.display = "inline-flex";
      this.style.flex = "none";
      if (entry.brandArtwork) {
        this.shadowRoot.innerHTML =
          '<img src="' + entry.artwork + '" alt="" aria-hidden="true" style="display:block;width:' +
          size + 'px;height:' + size + 'px;object-fit:contain">';
        return;
      }
      this.shadowRoot.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="' + VIEWBOX + '"' +
        ' fill="currentColor" stroke="none" aria-hidden="true" focusable="false">' +
        entry.path + "</svg>";
    }
  }
  if (!customElements.get("np-icon")) customElements.define("np-icon", NPIcon);

  window.NPIcons = {
    registry: REGISTRY,
    viewBox: VIEWBOX,
    style: "filled",
    names: Object.keys(REGISTRY),
    mirrored: Object.keys(REGISTRY).filter(function (k) { return REGISTRY[k].mirror; }),
    nonMirrored: Object.keys(REGISTRY).filter(function (k) { return !REGISTRY[k].mirror; })
  };
  window.NPIconNames = window.NPIcons.names;
})();
