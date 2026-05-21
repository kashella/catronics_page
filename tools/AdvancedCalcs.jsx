// Catronics Lab — Tools · SMD Resistor & Capacitor code decoders, SI Unit Conversion

/* SMD RESISTOR CODE — 3 or 4 digit code, or EIA-96 (3-char) */
function decodeSmd(code) {
  if (!code) return { value: NaN, fmt: "—" };
  code = code.toString().trim().toUpperCase();
  // EIA-96 (3 chars, first 2 digits + 1 letter) — letter is multiplier
  const E96 = { Z: 0.001, Y: 0.01, X: 0.1, A: 1, B: 10, C: 100, D: 1000, E: 1e4, F: 1e5, G: 1e6, H: 1e7 };
  const E96_TABLE = [
    100,102,105,107,110,113,115,118,121,124,127,130,133,137,140,143,147,150,154,158,
    162,165,169,174,178,182,187,191,196,200,205,210,215,221,226,232,237,243,249,255,
    261,267,274,280,287,294,301,309,316,324,332,340,348,357,365,374,383,392,402,412,
    422,432,442,453,464,475,487,499,511,523,536,549,562,576,590,604,619,634,649,665,
    681,698,715,732,750,768,787,806,825,845,866,887,909,931,953,976
  ];
  // R-notation (e.g. "4R7" = 4.7Ω)
  if (/^[0-9R]+$/.test(code) && code.includes("R")) {
    const v = parseFloat(code.replace("R", "."));
    return { value: v, fmt: v + " Ω" };
  }
  if (/^\d{2}[A-Z]$/.test(code)) {
    const idx = parseInt(code.slice(0, 2), 10);
    const letter = code[2];
    const base = E96_TABLE[idx - 1];
    const mult = E96[letter];
    if (base !== undefined && mult !== undefined) {
      const v = (base / 100) * mult;
      return { value: v, fmt: formatOhms(v) };
    }
  }
  // Standard 3 or 4 digit (last digit = multiplier exponent)
  if (/^\d{3,4}$/.test(code)) {
    const digits = code.slice(0, -1); const exp = parseInt(code.slice(-1), 10);
    const base = parseInt(digits, 10);
    const v = base * Math.pow(10, exp);
    return { value: v, fmt: formatOhms(v) };
  }
  return { value: NaN, fmt: "—" };
}

function SmdTool() {
  const [code, setCode] = React.useState("4702");
  useT();
  const r = decodeSmd(code);
  return (
    <React.Fragment>
      <ToolHead id="TOOL · SMD" title={tx({ es: "Código\nSMD", en: "SMD\nCode" })} meta={tx({ es: "3 / 4 DÍGITOS · EIA-96 · R", en: "3 / 4 DIGITS · EIA-96 · R" })}
        sub={tx({ es: "Acepta códigos numéricos (ej. 472, 4702), notación R (4R7) y EIA-96 (01A).", en: "Accepts numeric codes (e.g. 472, 4702), R-notation (4R7) and EIA-96 (01A)." })} />
      <div className="panels">
        <Panel tag={tx({ es: "ENTRADA · CÓDIGO", en: "INPUT · CODE" })}>
          <div className="field">
            <span className="field-label">{tx({ es: "Código", en: "Code" })}</span>
            <input className="field-input" type="text" value={code} onChange={e => setCode(e.target.value)} style={{ textTransform: "uppercase", letterSpacing: "0.18em" }} />
            <span className="field-unit">smd</span>
          </div>
          <div className="mono" style={{ marginTop: 14, padding: "10px 12px", border: "1px dashed rgba(154,100,230,0.35)", color: "var(--primary-2)", fontSize: 12, lineHeight: 1.5 }}>
            <div>// 472 = 47 × 10² = 4.7 kΩ</div>
            <div>// 4R7 = 4.7 Ω</div>
            <div>// 01A = 100 × 1 = 100 Ω</div>
          </div>
        </Panel>
        <Panel tag={tx({ es: "RESULTADO", en: "RESULT" })}>
          <div className="result">
            <div>
              <div className="lbl">// {tx({ es: "VALOR DECODIFICADO", en: "DECODED VALUE" })}</div>
              <div className="v">{r.fmt}</div>
            </div>
            <Pill>{tx({ es: "OK", en: "OK" })}</Pill>
          </div>
          <div className="spec-row" style={{ marginTop: 14 }}><span>{tx({ es: "Código", en: "Code" })}</span><b>{code.toUpperCase()}</b></div>
          <div className="spec-row"><span>{tx({ es: "Valor",  en: "Value" })}</span><b>{Number.isFinite(r.value) ? r.value.toLocaleString("en") : "—"} Ω</b></div>
        </Panel>
      </div>
    </React.Fragment>
  );
}

/* CAPACITOR CODE — typically a 3-digit code like 104 = 10 × 10^4 pF = 100 nF */
function decodeCap(code) {
  if (!code) return { pF: NaN };
  code = code.toString().trim().toUpperCase();
  if (/^\d{3}$/.test(code)) {
    const base = parseInt(code.slice(0, 2), 10);
    const exp  = parseInt(code.slice(2), 10);
    return { pF: base * Math.pow(10, exp) };
  }
  if (/^\d{1,3}$/.test(code)) {
    return { pF: parseInt(code, 10) };  // bare value in pF
  }
  return { pF: NaN };
}
function formatFarads(pF) {
  if (!Number.isFinite(pF)) return "—";
  const F = pF * 1e-12;
  if (F >= 1) return F + " F";
  if (F >= 1e-3) return (F * 1e3).toFixed(3) + " mF";
  if (F >= 1e-6) return (F * 1e6).toFixed(3) + " µF";
  if (F >= 1e-9) return (F * 1e9).toFixed(3) + " nF";
  return pF + " pF";
}
function CapCodeTool() {
  const [code, setCode] = React.useState("104");
  const [tol,  setTol]  = React.useState("K");   // K = ±10%, M = ±20%, J = ±5%, F = ±1%
  useT();
  const r = decodeCap(code);
  const TOL_MAP = { F: 1, G: 2, J: 5, K: 10, M: 20 };
  const t_pct = TOL_MAP[tol] || 10;
  return (
    <React.Fragment>
      <ToolHead id="TOOL · CAP" title={tx({ es: "Código\nde Capacitor", en: "Capacitor\nCode" })} meta={tx({ es: "3 DÍGITOS · pF", en: "3 DIGITS · pF" })}
        sub={tx({ es: "Decodifica el valor de capacitores cerámicos en pF/nF/µF. La letra indica tolerancia.", en: "Decode ceramic capacitor codes into pF/nF/µF. Trailing letter indicates tolerance." })} />
      <div className="panels">
        <Panel tag={tx({ es: "ENTRADA · CÓDIGO", en: "INPUT · CODE" })}>
          <div className="field">
            <span className="field-label">{tx({ es: "Código", en: "Code" })}</span>
            <input className="field-input" type="text" value={code} onChange={e => setCode(e.target.value)} style={{ letterSpacing: "0.18em" }} />
            <span className="field-unit">cap</span>
          </div>
          <div className="field">
            <span className="field-label">{tx({ es: "Tolerancia", en: "Tolerance" })}</span>
            <select className="field-input" value={tol} onChange={e => setTol(e.target.value)} style={{ appearance: "none", WebkitAppearance: "none", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.14)", padding: "8px 10px" }}>
              <option value="F">F · ±1%</option>
              <option value="G">G · ±2%</option>
              <option value="J">J · ±5%</option>
              <option value="K">K · ±10%</option>
              <option value="M">M · ±20%</option>
            </select>
            <span className="field-unit">letter</span>
          </div>
          <div className="mono" style={{ marginTop: 14, padding: "10px 12px", border: "1px dashed rgba(154,100,230,0.35)", color: "var(--primary-2)", fontSize: 12, lineHeight: 1.5 }}>
            <div>// 104 = 10 × 10⁴ pF = 100 nF</div>
            <div>// 223 = 22 × 10³ pF = 22 nF</div>
            <div>// 472K = 4.7 nF ±10%</div>
          </div>
        </Panel>
        <Panel tag={tx({ es: "RESULTADO", en: "RESULT" })}>
          <div className="result">
            <div>
              <div className="lbl">// {tx({ es: "CAPACITANCIA", en: "CAPACITANCE" })}</div>
              <div className="v">{formatFarads(r.pF)}</div>
            </div>
            <Pill>±{t_pct}%</Pill>
          </div>
          <div className="spec-row" style={{ marginTop: 14 }}><span>pF</span><b>{Number.isFinite(r.pF) ? r.pF.toLocaleString("en") : "—"}</b></div>
          <div className="spec-row"><span>nF</span><b>{Number.isFinite(r.pF) ? (r.pF / 1000).toLocaleString("en") : "—"}</b></div>
          <div className="spec-row"><span>µF</span><b>{Number.isFinite(r.pF) ? (r.pF / 1e6).toLocaleString("en") : "—"}</b></div>
        </Panel>
      </div>
    </React.Fragment>
  );
}

/* SI UNIT CONVERSION (across 6 electrical domains) */
const DOMAINS = {
  voltage:     { label: { es: "VOLTAJE",     en: "VOLTAGE" },     base: "V",  units: [{ k: "kV", f: 1000 }, { k: "V", f: 1 }, { k: "mV", f: 1e-3 }, { k: "µV", f: 1e-6 }] },
  current:     { label: { es: "CORRIENTE",   en: "CURRENT" },     base: "A",  units: [{ k: "kA", f: 1000 }, { k: "A", f: 1 }, { k: "mA", f: 1e-3 }, { k: "µA", f: 1e-6 }] },
  resistance:  { label: { es: "RESISTENCIA", en: "RESISTANCE" },  base: "Ω",  units: [{ k: "GΩ", f: 1e9 }, { k: "MΩ", f: 1e6 }, { k: "kΩ", f: 1e3 }, { k: "Ω", f: 1 }, { k: "mΩ", f: 1e-3 }] },
  power:       { label: { es: "POTENCIA",    en: "POWER" },       base: "W",  units: [{ k: "kW", f: 1000 }, { k: "W", f: 1 }, { k: "mW", f: 1e-3 }] },
  frequency:   { label: { es: "FRECUENCIA",  en: "FREQUENCY" },   base: "Hz", units: [{ k: "GHz", f: 1e9 }, { k: "MHz", f: 1e6 }, { k: "kHz", f: 1e3 }, { k: "Hz", f: 1 }] },
  capacitance: { label: { es: "CAPACITANCIA", en: "CAPACITANCE" }, base: "F", units: [{ k: "F", f: 1 }, { k: "mF", f: 1e-3 }, { k: "µF", f: 1e-6 }, { k: "nF", f: 1e-9 }, { k: "pF", f: 1e-12 }] }
};
function ConversionPanel({ domainKey }) {
  const d = DOMAINS[domainKey];
  const [val, setVal] = React.useState(1);
  const [fromUnit, setFromUnit] = React.useState(d.units[Math.floor(d.units.length / 2)].k);
  useT();
  React.useEffect(() => { setFromUnit(d.units[Math.floor(d.units.length / 2)].k); }, [domainKey]);
  const fromF = d.units.find(u => u.k === fromUnit).f;
  const inBase = (parseFloat(val) || 0) * fromF;
  const lang = getLang();
  return (
    <Panel tag={"CONV · " + d.label[lang]} status={d.base.toUpperCase()}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 100px", gap: 14, alignItems: "end", marginBottom: 12 }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", color: "var(--ink-dim)", textTransform: "uppercase", marginBottom: 6 }}>{tx({ es: "VALOR", en: "VALUE" })}</div>
          <input className="field-input" style={{ textAlign: "left" }} type="number" step="any" value={val} onChange={e => setVal(e.target.value)} />
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", color: "var(--ink-dim)", textTransform: "uppercase", marginBottom: 6 }}>{tx({ es: "UNIDAD", en: "UNIT" })}</div>
          <select className="field-input" style={{ textAlign: "left", padding: "8px 6px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.14)", appearance: "none", WebkitAppearance: "none" }} value={fromUnit} onChange={e => setFromUnit(e.target.value)}>
            {d.units.map(u => <option key={u.k} value={u.k}>{u.k}</option>)}
          </select>
        </div>
      </div>
      <div className="conv">
        {d.units.map(u => {
          const v = inBase / u.f;
          const a = Math.abs(v);
          const fmt = a !== 0 && (a < 1e-3 || a >= 1e6) ? v.toExponential(3) : Number(v.toFixed(4)).toLocaleString("en");
          return (
            <div className="conv-card" key={u.k}>
              <div className="h">// {u.k}</div>
              <div className="v">{fmt}<small>{u.k}</small></div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

function ConvertTool() {
  const [active, setActive] = React.useState("voltage");
  useT(); const lang = getLang();
  return (
    <React.Fragment>
      <ToolHead id="TOOL · CONVERT" title={tx({ es: "Conversión\nde Unidades", en: "Unit\nConversion" })} meta="SI · METRIC SCALE"
        sub={tx({ es: "Convierte entre prefijos SI para voltaje, corriente, resistencia, potencia, frecuencia y capacitancia.", en: "Convert between SI prefixes for voltage, current, resistance, power, frequency and capacitance." })} />
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {Object.entries(DOMAINS).map(([k, d]) => (
          <button key={k} className={"btn " + (k === active ? "" : "ghost")} onClick={() => setActive(k)}>
            {d.label[lang]}
          </button>
        ))}
      </div>
      <div className="panels" style={{ gridTemplateColumns: "1fr" }}>
        <ConversionPanel domainKey={active} />
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { SmdTool, CapCodeTool, ConvertTool, decodeSmd, decodeCap, formatFarads, DOMAINS });
