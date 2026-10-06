/* ==========================================================================
   NILE PETRO APP — CANONICAL NUMERIC CONTRACT (CC-007)
   Shared asset, same architecture as np-icons.js: ONE definition, loaded by
   every component that reads or displays a number. No component re-implements
   any rule below.

   CTO-R-018  Western digits 0–9 everywhere, numeric runs LTR-isolated.
   CTO-R-019  Accepts Western, Arabic-Indic ٠–٩, extended Arabic-Indic ۰–۹
              and the Arabic decimal separator ٫; normalizes to 0–9 and '.'.
              Trims outer spaces, ignores group separators on paste, changes
              nothing else — invalid input is flagged, never truncated.
   CTO-R-020  Unit / currency at the INLINE-END; sign stays inside the run.
   CTO-R-021  Precision defaults per value type (consumer may override).
   CTO-R-022  Date DD/MM/YYYY · time 12-hour with ص / م · station time zone
              supplied by configuration, never the device zone.
   ========================================================================== */
(function (root) {
  "use strict";

  var ARABIC_INDIC = "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
  var EXT_ARABIC_INDIC = "\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9";
  var ARABIC_DECIMAL = "\u066B";   /* ٫ */
  var ARABIC_GROUP = "\u066C";     /* ٬ */

  /* CTO-R-019 — the single normalization entry point. */
  function normalizeDigits(input) {
    var s = String(input == null ? "" : input).trim();
    var out = "";
    for (var i = 0; i < s.length; i++) {
      var ch = s[i];
      var ai = ARABIC_INDIC.indexOf(ch);
      var xi = EXT_ARABIC_INDIC.indexOf(ch);
      if (ai > -1) out += String(ai);
      else if (xi > -1) out += String(xi);
      else if (ch === ARABIC_DECIMAL) out += ".";
      else if (ch === ARABIC_GROUP || ch === ",") continue; /* group separators ignored */
      else out += ch;
    }
    return out;
  }

  /* Validity is reported, never silently repaired. */
  function validate(raw, opts) {
    var o = opts || {};
    var s = normalizeDigits(raw);
    if (s === "") return { ok: true, empty: true, normalized: "", reason: "" };
    if (!/^\d*(\.\d*)?$/.test(s)) return { ok: false, empty: false, normalized: s, reason: "chars" };
    var dec = s.indexOf(".") > -1 ? s.length - s.indexOf(".") - 1 : 0;
    var max = o.maxDecimals == null ? 3 : o.maxDecimals;
    if (dec > max) return { ok: false, empty: false, normalized: s, reason: "decimals" };
    if (o.maxIntegerDigits && s.split(".")[0].length > o.maxIntegerDigits) {
      return { ok: false, empty: false, normalized: s, reason: "length" };
    }
    return { ok: true, empty: false, normalized: s, reason: "" };
  }

  function group(intPart) {
    return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  /* CTO-R-021 precision defaults. A consumer may pass decimals explicitly. */
  var PRECISION = {
    money:   { min: 2, max: 2 },
    liters:  { min: 0, max: 3 },
    reading: { min: 0, max: 3 },
    percent: { min: 0, max: 0 },
    days:    { min: 1, max: 1 },
    count:   { min: 0, max: 0 }
  };

  function formatNumber(value, type, opts) {
    var o = opts || {};
    var s = normalizeDigits(value);
    var neg = /^-/.test(String(value).trim());
    s = s.replace(/^[-+]/, "");
    if (s === "" || isNaN(Number(s))) return "";
    var p = PRECISION[type] || { min: 0, max: 3 };
    var min = o.decimals == null ? p.min : o.decimals;
    var max = o.decimals == null ? p.max : o.decimals;
    var n = Number(s);
    var fixed = n.toFixed(max);
    if (max > min) fixed = fixed.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
    var parts = fixed.split(".");
    var text = (o.grouped === false ? parts[0] : group(parts[0])) + (parts[1] ? "." + parts[1] : "");
    var sign = neg ? "-" : (o.signed && n > 0 ? "+" : "");
    return sign + text;
  }

  /* CTO-R-022 — display only; the station time zone is consumer-supplied. */
  function formatDate(v) {
    var s = normalizeDigits(v);
    var m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
    return m ? m[3] + "/" + m[2] + "/" + m[1] : s;
  }
  function formatTime(v) {
    var s = normalizeDigits(v);
    var m = s.match(/^(\d{1,2}):(\d{2})/);
    if (!m) return s;
    var h = Number(m[1]);
    var mer = h < 12 ? "\u0635" : "\u0645";
    var h12 = h % 12 === 0 ? 12 : h % 12;
    return h12 + ":" + m[2] + " " + mer;
  }

  var TYPES = ["money", "liters", "reading", "percent", "count", "days", "date", "time", "datetime"];

  /* Returns the display run only. The unit/currency is rendered by the
     consumer at the inline-end, never concatenated into the run. */
  function format(value, type, opts) {
    switch (type) {
      case "date": return formatDate(value);
      case "time": return formatTime(value);
      case "datetime": {
        var parts = String(value).trim().split(/[ T]/);
        return formatDate(parts[0]) + (parts[1] ? " " + formatTime(parts[1]) : "");
      }
      default: return formatNumber(value, type, opts);
    }
  }

  root.NPFormat = {
    TYPES: TYPES,
    normalizeDigits: normalizeDigits,
    validate: validate,
    format: format,
    formatNumber: formatNumber,
    formatDate: formatDate,
    formatTime: formatTime
  };
})(window);
