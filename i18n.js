// Catronics Lab — bilingual (ES / EN) translation table + tiny runtime.
//
// Usage:
//   const t = useT();           // hook inside any component
//   t("nav.servicios")          // returns string in current language
//   setLang("en")               // global setter
//
// Persistence: localStorage 'catronics-lang' (default 'es').
// Subscriber model so any component re-renders when language changes.

const STRINGS = {
  es: {
    "brand.tagline":          "INGENIERÍA QUE TRANSFORMA",
    "lang.label":              "IDIOMA",
    "nav.servicios":           "Servicios",
    "nav.proceso":             "Proceso",
    "nav.equipo":              "Equipo",
    "nav.contacto":            "Contacto",
    "nav.herramientas":        "Herramientas",
    "nav.cta":                 "Iniciar proyecto",
    "nav.back":                "Volver al sitio",

    "tools.title":             "Calculadoras",
    "tools.subtitle":          "Conjunto completo de calculadoras útiles para el campo de la electrónica.",
    "tools.section.resistors": "Resistencias",
    "tools.section.passives":  "Pasivos",
    "tools.section.ohmlaw":    "Ley de Ohm",
    "tools.section.utility":   "Utilidades",
    "tools.section.numeric":   "Numérico",

    "panel.input":             "ENTRADA",
    "panel.result":            "RESULTADO",
    "panel.live":              "EN VIVO",
    "result.calc":             "CALCULADO",
    "tools.foot.note":         "Cálculo válido con valores positivos",
    "common.value":            "Valor",
    "common.unit":             "Unidad",
    "common.min":              "Mín.",
    "common.max":              "Máx.",
    "common.nominal":          "Nominal",
    "common.tolerance":        "Tolerancia",
    "common.formula":          "Fórmula",
    "common.notbuilt":         "PENDIENTE DE CONSTRUCCIÓN"
  },
  en: {
    "brand.tagline":           "ENGINEERING THAT TRANSFORMS",
    "lang.label":              "LANGUAGE",
    "nav.servicios":           "Services",
    "nav.proceso":             "Process",
    "nav.equipo":              "Team",
    "nav.contacto":            "Contact",
    "nav.herramientas":        "Tools",
    "nav.cta":                 "Start a project",
    "nav.back":                "Back to site",

    "tools.title":             "Calculators",
    "tools.subtitle":          "Full set of conversion calculators useful for the electronics field.",
    "tools.section.resistors": "Resistors",
    "tools.section.passives":  "Passives",
    "tools.section.ohmlaw":    "Ohm's Law",
    "tools.section.utility":   "Utility",
    "tools.section.numeric":   "Numeric",

    "panel.input":             "INPUT",
    "panel.result":            "RESULT",
    "panel.live":              "LIVE",
    "result.calc":             "CALCULATED",
    "tools.foot.note":         "Calculation valid with positive values",
    "common.value":            "Value",
    "common.unit":             "Unit",
    "common.min":              "Min.",
    "common.max":              "Max.",
    "common.nominal":          "Nominal",
    "common.tolerance":        "Tolerance",
    "common.formula":          "Formula",
    "common.notbuilt":         "NOT YET BUILT"
  }
};

const _i18n = {
  lang: (typeof localStorage !== "undefined" && localStorage.getItem("catronics-lang")) || "es",
  subs: new Set()
};

function setLang(lang) {
  if (lang !== "es" && lang !== "en") return;
  _i18n.lang = lang;
  try { localStorage.setItem("catronics-lang", lang); } catch (e) {}
  _i18n.subs.forEach(fn => fn(lang));
}
function getLang() { return _i18n.lang; }

function t(key) {
  return (STRINGS[_i18n.lang] && STRINGS[_i18n.lang][key]) || key;
}

// Hook — re-render the calling component when language changes.
function useT() {
  const [, setN] = React.useState(0);
  React.useEffect(() => {
    const fn = () => setN(n => n + 1);
    _i18n.subs.add(fn);
    return () => _i18n.subs.delete(fn);
  }, []);
  return t;
}

// Variant: pick from a per-key {es, en} object inline.
function tx(obj) { return obj && (obj[_i18n.lang] || obj.es || obj.en); }

function LangToggle({ compact }) {
  useT();   // subscribe so the toggle re-renders
  const cur = getLang();
  const btn = (code, label) => (
    <button
      key={code}
      onClick={() => setLang(code)}
      style={{
        padding: compact ? "4px 8px" : "6px 10px",
        background: cur === code ? "rgba(106,13,173,0.22)" : "transparent",
        border: "1px solid " + (cur === code ? "var(--primary-2)" : "rgba(255,255,255,0.16)"),
        color: cur === code ? "#fff" : "var(--ink-dim)",
        fontFamily: "var(--font-mono)",
        fontSize: compact ? 10 : 11,
        letterSpacing: "0.20em",
        textTransform: "uppercase",
        cursor: "pointer",
        transition: "background .2s, border-color .2s, color .2s"
      }}
    >{label}</button>
  );
  return (
    <div style={{ display: "inline-flex", gap: 4 }}>
      {btn("es", "ES")}
      {btn("en", "EN")}
    </div>
  );
}

Object.assign(window, { setLang, getLang, t, tx, useT, LangToggle });
