// Catronics Lab — Tools · Color-code calculators (Resistor 4-band, 5-band, Inductor)

const BAND_COLORS = [
  { n: { es: "Negro", en: "Black" }, hex: "#000000", digit: 0, mult: 1 },
  { n: { es: "Café", en: "Brown" }, hex: "#7A3E1D", digit: 1, mult: 10 },
  { n: { es: "Rojo", en: "Red" }, hex: "#D62828", digit: 2, mult: 100 },
  { n: { es: "Naranja", en: "Orange" }, hex: "#F77F00", digit: 3, mult: 1e3 },
  { n: { es: "Amarillo", en: "Yellow" }, hex: "#FCBF49", digit: 4, mult: 1e4 },
  { n: { es: "Verde", en: "Green" }, hex: "#3AA47A", digit: 5, mult: 1e5 },
  { n: { es: "Azul", en: "Blue" }, hex: "#1E70B8", digit: 6, mult: 1e6 },
  { n: { es: "Violeta", en: "Violet" }, hex: "#6A0DAD", digit: 7, mult: 1e7 },
  { n: { es: "Gris", en: "Gray" }, hex: "#9CA3AF", digit: 8, mult: 1e8 },
  { n: { es: "Blanco", en: "White" }, hex: "#FFFFFF", digit: 9, mult: 1e9 }
];
const TOLERANCE_COLORS = [
  { n: { es: "Café",    en: "Brown" },  hex: "#7A3E1D", tol: 1 },
  { n: { es: "Rojo",    en: "Red" },    hex: "#D62828", tol: 2 },
  { n: { es: "Verde",   en: "Green" },  hex: "#3AA47A", tol: 0.5 },
  { n: { es: "Azul",    en: "Blue" },   hex: "#1E70B8", tol: 0.25 },
  { n: { es: "Violeta", en: "Violet" }, hex: "#6A0DAD", tol: 0.1 },
  { n: { es: "Gris",    en: "Gray" },   hex: "#9CA3AF", tol: 0.05 },
  { n: { es: "Oro",     en: "Gold" },   hex: "#C9A227", tol: 5 },
  { n: { es: "Plata",   en: "Silver" }, hex: "#C0C0C0", tol: 10 }
];

function formatOhms(v) {
  if (!Number.isFinite(v)) return "—";
  if (v >= 1e9) return (v / 1e9) + " GΩ";
  if (v >= 1e6) return (v / 1e6) + " MΩ";
  if (v >= 1e3) return (v / 1e3) + " kΩ";
  return v + " Ω";
}
function formatHenries(v) {
  if (!Number.isFinite(v)) return "—";
  if (v >= 1) return v + " H";
  if (v >= 1e-3) return (v * 1e3) + " mH";
  if (v >= 1e-6) return (v * 1e6) + " µH";
  return (v * 1e9) + " nH";
}

function ResistorSVG({ bands }) {
  // bands: array of {hex} — drawn left to right
  const slots = bands.length;
  const start = 90; const span = 240; const step = span / (slots + 1);
  return (
    <svg viewBox="0 0 420 110" width="100%" height="110" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <line x1="0" y1="55" x2="60" y2="55" stroke="#9b3df0" strokeWidth="2"/>
      <line x1="360" y1="55" x2="420" y2="55" stroke="#9b3df0" strokeWidth="2"/>
      <rect x="60" y="30" width="300" height="50" rx="14" fill="#1a0f24" stroke="rgba(154,100,230,0.55)" strokeWidth="1"/>
      <rect x="60" y="30" width="300" height="50" rx="14" fill="url(#gres)"/>
      <defs>
        <linearGradient id="gres" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.10)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0.20)"/>
        </linearGradient>
      </defs>
      {bands.map((b, i) => (
        <rect key={i} x={start + step * (i + 0.5) - 12} y="30" width="24" height="50" fill={b.hex || "#222"} />
      ))}
      <circle cx="0" cy="55" r="3" fill="#9b3df0"/>
      <circle cx="420" cy="55" r="3" fill="#9b3df0"/>
    </svg>
  );
}

function BandSelect({ label, options, value, onChange }) {
  const lang = getLang();
  useT();
  const idx = options.findIndex(o => o.n.es === value.n.es);
  return (
    <div className="band-select">
      <label>{label}</label>
      <select value={idx} onChange={e => onChange(options[parseInt(e.target.value, 10)])}>
        {options.map((o, i) => <option key={i} value={i}>{o.n[lang]}</option>)}
      </select>
      <div style={{ display: "flex", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.10em", color: "var(--ink-dim)" }}>
        <span className="swatch" style={{ background: value.hex }}></span>
        {("tol" in value) ? <span>±{value.tol}%</span> : <span>{("digit" in value) && ("mult" in value) ? `d${value.digit} · ×${value.mult}` : ("digit" in value) ? `digit ${value.digit}` : `×${value.mult}`}</span>}
      </div>
    </div>
  );
}

/* RESISTOR 4-BAND */
function Resistor4Tool() {
  const [b1, setB1] = React.useState(BAND_COLORS[2]);   // Red
  const [b2, setB2] = React.useState(BAND_COLORS[7]);   // Violet
  const [b3, setB3] = React.useState(BAND_COLORS[2]);   // ×100
  const [bt, setBt] = React.useState(TOLERANCE_COLORS[6]);
  useT(); const lang = getLang();
  const value = (b1.digit * 10 + b2.digit) * b3.mult;
  const min = value * (1 - bt.tol / 100); const max = value * (1 + bt.tol / 100);
  return (
    <React.Fragment>
      <ToolHead id="TOOL · 4-BAND" title={tx({ es: "Código\n4 bandas", en: "4-Band\nColor Code" })} meta={tx({ es: "RESISTOR · 4 BANDAS", en: "RESISTOR · 4 BANDS" })}
        sub={tx({ es: "Decodifica el valor a partir de las 4 bandas: 2 dígitos + multiplicador + tolerancia.", en: "Decode the value from the 4 bands: 2 digits + multiplier + tolerance." })} />
      <div className="panels">
        <Panel tag={tx({ es: "ENTRADA · BANDAS", en: "INPUT · BANDS" })}>
          <div className="resistor-svg-wrap"><ResistorSVG bands={[b1, b2, b3, bt]} /></div>
          <div className="bands-row">
            <BandSelect label={tx({ es: "Banda 1 · dígito",     en: "Band 1 · digit" })}        options={BAND_COLORS}      value={b1} onChange={setB1} />
            <BandSelect label={tx({ es: "Banda 2 · dígito",     en: "Band 2 · digit" })}        options={BAND_COLORS}      value={b2} onChange={setB2} />
            <BandSelect label={tx({ es: "Banda 3 · multiplicador", en: "Band 3 · multiplier" })} options={BAND_COLORS}      value={b3} onChange={setB3} />
            <BandSelect label={tx({ es: "Banda 4 · tolerancia",  en: "Band 4 · tolerance" })}   options={TOLERANCE_COLORS} value={bt} onChange={setBt} />
          </div>
        </Panel>
        <Panel tag={tx({ es: "RESULTADO", en: "RESULT" })}>
          <div className="result">
            <div><div className="lbl">// {tx({ es: "VALOR NOMINAL", en: "NOMINAL VALUE" })}</div><div className="v">{formatOhms(value)}</div></div>
            <Pill>±{bt.tol}%</Pill>
          </div>
          <div className="spec-row" style={{ marginTop: 14 }}><span>{tx({ es: "Dígitos", en: "Digits" })}</span><b>{b1.digit}{b2.digit}</b></div>
          <div className="spec-row"><span>{tx({ es: "Multiplicador", en: "Multiplier" })}</span><b>× {b3.mult.toLocaleString("en")}</b></div>
          <div className="spec-row"><span>{tx({ es: "Rango mín.", en: "Min" })}</span><b>{formatOhms(min)}</b></div>
          <div className="spec-row"><span>{tx({ es: "Rango máx.", en: "Max" })}</span><b>{formatOhms(max)}</b></div>
        </Panel>
      </div>
    </React.Fragment>
  );
}

/* RESISTOR 5-BAND */
function Resistor5Tool() {
  const [b1, setB1] = React.useState(BAND_COLORS[2]);
  const [b2, setB2] = React.useState(BAND_COLORS[2]);
  const [b3, setB3] = React.useState(BAND_COLORS[0]);
  const [b4, setB4] = React.useState(BAND_COLORS[2]);   // ×100
  const [bt, setBt] = React.useState(TOLERANCE_COLORS[0]); // Brown ±1
  useT(); const lang = getLang();
  const value = (b1.digit * 100 + b2.digit * 10 + b3.digit) * b4.mult;
  const min = value * (1 - bt.tol / 100); const max = value * (1 + bt.tol / 100);
  return (
    <React.Fragment>
      <ToolHead id="TOOL · 5-BAND" title={tx({ es: "Código\n5 bandas", en: "5-Band\nColor Code" })} meta={tx({ es: "RESISTOR · ALTA PRECISIÓN", en: "RESISTOR · HIGH PRECISION" })}
        sub={tx({ es: "Tres dígitos + multiplicador + tolerancia. Usado en resistencias de precisión.", en: "Three digits + multiplier + tolerance. Used in precision resistors." })} />
      <div className="panels">
        <Panel tag={tx({ es: "ENTRADA · BANDAS", en: "INPUT · BANDS" })}>
          <div className="resistor-svg-wrap"><ResistorSVG bands={[b1, b2, b3, b4, bt]} /></div>
          <div className="bands-row" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
            <BandSelect label={tx({ es: "B1 · dígito", en: "B1 · digit" })} options={BAND_COLORS} value={b1} onChange={setB1} />
            <BandSelect label={tx({ es: "B2 · dígito", en: "B2 · digit" })} options={BAND_COLORS} value={b2} onChange={setB2} />
            <BandSelect label={tx({ es: "B3 · dígito", en: "B3 · digit" })} options={BAND_COLORS} value={b3} onChange={setB3} />
            <BandSelect label={tx({ es: "B4 · mult.",  en: "B4 · mult." })} options={BAND_COLORS} value={b4} onChange={setB4} />
            <BandSelect label={tx({ es: "B5 · tol.",   en: "B5 · tol." })}  options={TOLERANCE_COLORS} value={bt} onChange={setBt} />
          </div>
        </Panel>
        <Panel tag={tx({ es: "RESULTADO", en: "RESULT" })}>
          <div className="result">
            <div><div className="lbl">// {tx({ es: "VALOR NOMINAL", en: "NOMINAL VALUE" })}</div><div className="v">{formatOhms(value)}</div></div>
            <Pill>±{bt.tol}%</Pill>
          </div>
          <div className="spec-row" style={{ marginTop: 14 }}><span>{tx({ es: "Dígitos", en: "Digits" })}</span><b>{b1.digit}{b2.digit}{b3.digit}</b></div>
          <div className="spec-row"><span>{tx({ es: "Multiplicador", en: "Multiplier" })}</span><b>× {b4.mult.toLocaleString("en")}</b></div>
          <div className="spec-row"><span>{tx({ es: "Rango mín.", en: "Min" })}</span><b>{formatOhms(min)}</b></div>
          <div className="spec-row"><span>{tx({ es: "Rango máx.", en: "Max" })}</span><b>{formatOhms(max)}</b></div>
        </Panel>
      </div>
    </React.Fragment>
  );
}

/* INDUCTOR COLOR CODE — same band system but result is µH; tolerance band same */
function InductorTool() {
  const [b1, setB1] = React.useState(BAND_COLORS[2]);
  const [b2, setB2] = React.useState(BAND_COLORS[7]);
  const [b3, setB3] = React.useState(BAND_COLORS[1]);
  const [bt, setBt] = React.useState(TOLERANCE_COLORS[6]); // Gold ±5
  useT();
  const microHenry = (b1.digit * 10 + b2.digit) * b3.mult;
  const H = microHenry * 1e-6;
  const min = H * (1 - bt.tol / 100); const max = H * (1 + bt.tol / 100);
  return (
    <React.Fragment>
      <ToolHead id="TOOL · INDUCTOR" title={tx({ es: "Color de\nInductor", en: "Inductor\nColor Code" })} meta={tx({ es: "AXIAL · 4 BANDAS · µH", en: "AXIAL · 4 BANDS · µH" })}
        sub={tx({ es: "Bobinas axiales: 2 dígitos + multiplicador + tolerancia, en microhenrios.", en: "Axial inductors: 2 digits + multiplier + tolerance, in microhenries." })} />
      <div className="panels">
        <Panel tag={tx({ es: "ENTRADA · BANDAS", en: "INPUT · BANDS" })}>
          <div className="resistor-svg-wrap"><ResistorSVG bands={[b1, b2, b3, bt]} /></div>
          <div className="bands-row">
            <BandSelect label={tx({ es: "Banda 1 · dígito", en: "Band 1 · digit" })} options={BAND_COLORS} value={b1} onChange={setB1} />
            <BandSelect label={tx({ es: "Banda 2 · dígito", en: "Band 2 · digit" })} options={BAND_COLORS} value={b2} onChange={setB2} />
            <BandSelect label={tx({ es: "Banda 3 · mult.",  en: "Band 3 · mult." })} options={BAND_COLORS} value={b3} onChange={setB3} />
            <BandSelect label={tx({ es: "Banda 4 · tol.",   en: "Band 4 · tol." })}  options={TOLERANCE_COLORS} value={bt} onChange={setBt} />
          </div>
        </Panel>
        <Panel tag={tx({ es: "RESULTADO", en: "RESULT" })}>
          <div className="result">
            <div><div className="lbl">// {tx({ es: "INDUCTANCIA", en: "INDUCTANCE" })}</div><div className="v">{formatHenries(H)}</div></div>
            <Pill>±{bt.tol}%</Pill>
          </div>
          <div className="spec-row" style={{ marginTop: 14 }}><span>{tx({ es: "Dígitos", en: "Digits" })}</span><b>{b1.digit}{b2.digit}</b></div>
          <div className="spec-row"><span>{tx({ es: "Multiplicador", en: "Multiplier" })}</span><b>× {b3.mult.toLocaleString("en")}</b></div>
          <div className="spec-row"><span>{tx({ es: "Rango mín.", en: "Min" })}</span><b>{formatHenries(min)}</b></div>
          <div className="spec-row"><span>{tx({ es: "Rango máx.", en: "Max" })}</span><b>{formatHenries(max)}</b></div>
        </Panel>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { Resistor4Tool, Resistor5Tool, InductorTool, formatOhms, formatHenries, BAND_COLORS, TOLERANCE_COLORS, BandSelect, ResistorSVG });
