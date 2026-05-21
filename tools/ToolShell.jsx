// Catronics Lab — Tools UI Kit · shell + sidebar nav
// Includes language toggle (uses ../i18n.js, loaded before this file).

// Each tool entry: { id, gly, label: {es,en}, section: 'resistors'|'passives'|'ohmlaw'|'utility'|'numeric' }
const TOOLS = [
  // Resistors
  { id: "resistor4",     gly: "▤", section: "resistors", label: { es: "Código 4 bandas",       en: "4-Band Color Code" } },
  { id: "resistor5",     gly: "▥", section: "resistors", label: { es: "Código 5 bandas",       en: "5-Band Color Code" } },
  { id: "smd",           gly: "▦", section: "resistors", label: { es: "Código SMD",            en: "SMD Resistor Code" } },
  { id: "parallel",      gly: "‖", section: "resistors", label: { es: "Paralelo · Serie",      en: "Parallel · Series" } },
  // Passives
  { id: "inductor",      gly: "L", section: "passives",  label: { es: "Color de inductor",     en: "Inductor Color Code" } },
  { id: "capcode",       gly: "C", section: "passives",  label: { es: "Código de capacitor",   en: "Capacitor Code" } },
  { id: "reactance",     gly: "Z", section: "passives",  label: { es: "Reactancia",             en: "Reactance" } },
  { id: "rctc",          gly: "τ", section: "passives",  label: { es: "Constante RC",           en: "RC Time Constant" } },
  // Ohm's law cluster
  { id: "ohms",          gly: "Ω", section: "ohmlaw",    label: { es: "Ley de Ohm",             en: "Ohm's Law" } },
  { id: "divider",       gly: "⊥", section: "ohmlaw",    label: { es: "Divisor de voltaje",     en: "Voltage Divider" } },
  { id: "led",           gly: "◉", section: "ohmlaw",    label: { es: "Resistencia LED",        en: "LED Series Resistor" } },
  // Utility
  { id: "battery",       gly: "▮", section: "utility",   label: { es: "Vida de batería",        en: "Battery Life" } },
  { id: "awg",           gly: "⌀", section: "utility",   label: { es: "Calibre AWG",            en: "AWG Wire Gauge" } },
  { id: "convert",       gly: "⇌", section: "utility",   label: { es: "Conversión SI",          en: "SI Unit Conversion" } },
  // Numeric
  { id: "decfrac",       gly: "½", section: "numeric",   label: { es: "Decimal a fracción",     en: "Decimal to Fraction" } },
  { id: "ppm",           gly: "‰", section: "numeric",   label: { es: "Partes por millón",      en: "Parts Per Million (ppm)" } }
];

function ToolShell({ tools, activeId, onPick, children }) {
  useT();
  const lang = getLang();
  const sections = [];
  for (const tool of tools) {
    let s = sections.find(x => x.key === tool.section);
    if (!s) { s = { key: tool.section, items: [] }; sections.push(s); }
    s.items.push(tool);
  }
  return (
    <div className="app">
      <aside className="side">
        <div className="side-head">
          <a href="/index.html" className="side-mark-link" title={t("nav.back")}>
            <div className="side-mark"><img src="../assets/catronics-cat-white.png" alt="" /></div>
          </a>
          <div style={{ flex: 1 }}>
            <a href="/index.html" className="side-wm-link">
              <div className="side-wm">CATRONICS<span className="dot">·</span>LAB</div>
            </a>
            <div className="side-tag">// {t("tools.title").toUpperCase()} / v0.1</div>
          </div>
          <LangToggle compact={true} />
        </div>
        <a href="/index.html" className="side-back">
          <span>←</span>
          <span>{t("nav.back")}</span>
        </a>
        {sections.map(s => (
          <React.Fragment key={s.key}>
            <div className="side-section">// {t("tools.section." + s.key)}</div>
            {s.items.map(tool => (
              <div
                key={tool.id}
                className={"side-link " + (tool.id === activeId ? "active" : "")}
                onClick={() => onPick(tool.id)}
              >
                <span className="gly">{tool.gly}</span>
                <span>{tool.label[lang]}</span>
                <span className="arr">→</span>
              </div>
            ))}
          </React.Fragment>
        ))}
        <div className="side-foot">// SLA &lt; 24h<br/>// LAT 20.97°N</div>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}

function ToolHead({ id, title, meta, sub }) {
  return (
    <React.Fragment>
      <div className="tool-head">
        <div className="id">[ {id} ]</div>
        <h1>{typeof title === "string" ? title : title}</h1>
        <div className="meta">{meta}</div>
      </div>
      {sub && <p className="tool-sub">{sub}</p>}
    </React.Fragment>
  );
}

function Panel({ tag, status, children }) {
  return (
    <section className="panel">
      <div className="panel-head">
        <span className="left">// {tag}</span>
        {status !== false && (
          <span className="right"><span className="ddd"></span>{status || t("panel.live")}</span>
        )}
      </div>
      <div className="panel-body">{children}</div>
    </section>
  );
}

function Pill({ children }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", border: "1px solid var(--line-strong)", borderRadius: 999, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--primary-2)" }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--primary-2)", boxShadow: "0 0 10px var(--primary-2)" }}></span>
      {children}
    </div>
  );
}

function Placeholder({ glyph, label }) {
  return (
    <div className="placeholder">
      <div className="glyph">{glyph}</div>
      <div>{label || t("common.notbuilt")}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Generic <Calc> renderer.
   Most calculators are just: a few number inputs → one or more derived values.
   Pass a shape:
     inputs: [{ key, label:{es,en}, unit, default, step?, options? }]
     compute(values) → { rows: [{label:{es,en}, value, unit}], primary?: {label, value, unit} }
   ────────────────────────────────────────────────────────────── */
function Calc({ inputs, compute, inputTag, resultTag, formula, primaryColor }) {
  useT();
  const lang = getLang();
  const initial = Object.fromEntries(inputs.map(i => [i.key, i.default]));
  const [vals, setVals] = React.useState(initial);
  const setKey = k => e => setVals({ ...vals, [k]: e.target.value });

  const parsed = Object.fromEntries(Object.entries(vals).map(([k, v]) => [k, parseFloat(v)]));
  const out = compute(parsed) || { rows: [] };

  const fmt = (v, digits = 4) => {
    if (!Number.isFinite(v)) return "—";
    const a = Math.abs(v);
    if (a !== 0 && (a < 1e-3 || a >= 1e7)) return v.toExponential(3);
    return Number(v.toFixed(digits)).toLocaleString("en");
  };

  return (
    <div className="panels">
      <Panel tag={inputTag || ("// " + t("panel.input"))}>
        {inputs.map(i => (
          <div className="field" key={i.key}>
            <span className="field-label">{i.label[lang]}</span>
            {i.options ? (
              <select className="field-input" value={vals[i.key]} onChange={setKey(i.key)} style={{ appearance: "none", WebkitAppearance: "none", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.14)", padding: "8px 10px" }}>
                {i.options.map(o => <option key={o.value} value={o.value}>{o.label[lang]}</option>)}
              </select>
            ) : (
              <input className="field-input" type="number" step={i.step || "any"} value={vals[i.key]} onChange={setKey(i.key)} />
            )}
            <span className="field-unit">{i.unit}</span>
          </div>
        ))}
        {formula && (
          <div className="mono" style={{ marginTop: 14, padding: "10px 12px", border: "1px dashed rgba(154,100,230,0.35)", color: "var(--primary-2)", fontSize: 12, letterSpacing: "0.06em" }}>
            {t("common.formula")} · {formula}
          </div>
        )}
      </Panel>
      <Panel tag={resultTag || ("// " + t("panel.result"))}>
        {out.rows.map((r, i) => (
          <div className="spec-row" key={i}><span>{r.label[lang]}</span><b>{typeof r.value === "string" ? r.value : fmt(r.value)} {r.unit}</b></div>
        ))}
        {out.primary && (
          <div className="result">
            <div>
              <div className="lbl">// {out.primary.label[lang].toUpperCase()}</div>
              <div className="v" style={primaryColor ? { color: primaryColor } : undefined}>
                {typeof out.primary.value === "string" ? out.primary.value : fmt(out.primary.value)}
                {out.primary.unit && <small>{out.primary.unit}</small>}
              </div>
            </div>
            <Pill>OK</Pill>
          </div>
        )}
        <div className="mono" style={{ marginTop: 14, fontSize: 10, letterSpacing: "0.20em", color: "var(--ink-faint)", textTransform: "uppercase" }}>
          // {t("tools.foot.note")}
        </div>
      </Panel>
    </div>
  );
}

Object.assign(window, { TOOLS, ToolShell, ToolHead, Panel, Pill, Placeholder, Calc });
