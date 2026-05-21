// Catronics Lab — shared icons & primitive subcomponents
// Loaded BEFORE feature components so all share these globals.

// Resource bridge — supports two modes:
//   (1) Normal multi-file run: returns the fallback URL as-is.
//   (2) Standalone bundled run: returns a window.__resources[id] blob URL.
// Every JSX that references an image-by-string MUST go through assetUrl()
// so the standalone export can swap real files in.
function assetUrl(id, fallback) {
  return (typeof window !== "undefined" && window.__resources && window.__resources[id]) || fallback;
}
window.assetUrl = assetUrl;

const IconLI = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5A2.5 2.5 0 1 1 2.48 6 2.5 2.5 0 0 1 4.98 3.5zM2.9 8.4h4.16V21H2.9V8.4zM9.6 8.4h3.99v1.72h.06c.56-1.05 1.93-2.16 3.97-2.16 4.25 0 5.04 2.8 5.04 6.44V21h-4.17v-5.74c0-1.37-.03-3.13-1.91-3.13-1.91 0-2.21 1.49-2.21 3.03V21H9.6V8.4z"/>
  </svg>
);

const IconGH = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-1.96c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.6.23 2.78.11 3.07.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.35.78 1.05.78 2.11v3.13c0 .3.21.66.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
  </svg>
);

const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M3 11l18-8-8 18-2-8z" />
  </svg>
);

/* ── Eyebrow row — "[ INDEX / 00 ]  CATRONICS LAB ·  ●  Tag" ── */
function EyebrowRow({ idx, tag1, tag2 }) {
  return (
    <div className="crumb">
      <span className="num">[ {idx} ]</span>
      <span className="eyebrow">{tag1}</span>
      <span className="dot" style={{ marginLeft: "auto" }}></span>
      <span className="eyebrow">{tag2}</span>
    </div>
  );
}

/* ── SectionHead: 3-col [id] · title · meta ── */
function SectionHead({ id, title, meta }) {
  return (
    <div className="section-head">
      <div className="id">[ {id} ]</div>
      <h2 className="display" style={{ whiteSpace: "pre-line" }}>{title}</h2>
      <div className="meta">{meta}</div>
    </div>
  );
}

/* ── Pill (status capsule) ── */
function Pill({ children }) {
  return (
    <div className="pill"><span className="ddd"></span>{children}</div>
  );
}

/* expose to other Babel scripts */
Object.assign(window, { IconLI, IconGH, IconArrow, EyebrowRow, SectionHead, Pill });
