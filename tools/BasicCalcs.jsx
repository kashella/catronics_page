// Catronics Lab — Tools · Basic Formula Calculators
// All use the generic <Calc> renderer. Each calculator is one function.

/* OHMS — V = I·R, P = V·I = I²·R = V²/R. Pick 2, compute the rest. */
function OhmsTool() {
  useT();
  const FIELDS = [
    { k: "V", label: { es: "Voltaje",     en: "Voltage" },     unit: "V" },
    { k: "I", label: { es: "Corriente",   en: "Current" },     unit: "A" },
    { k: "R", label: { es: "Resistencia", en: "Resistance" }, unit: "Ω" },
    { k: "P", label: { es: "Potencia",    en: "Power" },       unit: "W" }
  ];
  const [locked, setLocked] = React.useState(["V", "R"]);
  const [vals, setVals] = React.useState({ V: "12", R: "24", I: "", P: "" });
  const lang = getLang();

  const a = locked[0], b = locked[1];
  const av = parseFloat(vals[a]); const bv = parseFloat(vals[b]);
  const solved = { V: NaN, I: NaN, R: NaN, P: NaN };
  if (Number.isFinite(av) && Number.isFinite(bv) && av > 0 && bv > 0) {
    const key = [a, b].sort().join("");
    if (key === "IV") { solved.V = vals.V * 1; solved.I = vals.I * 1; solved.R = solved.V / solved.I; solved.P = solved.V * solved.I; }
    else if (key === "RV") { solved.V = vals.V * 1; solved.R = vals.R * 1; solved.I = solved.V / solved.R; solved.P = solved.V * solved.V / solved.R; }
    else if (key === "IR") { solved.I = vals.I * 1; solved.R = vals.R * 1; solved.V = solved.I * solved.R; solved.P = solved.I * solved.I * solved.R; }
    else if (key === "PV") { solved.V = vals.V * 1; solved.P = vals.P * 1; solved.I = solved.P / solved.V; solved.R = solved.V * solved.V / solved.P; }
    else if (key === "IP") { solved.I = vals.I * 1; solved.P = vals.P * 1; solved.V = solved.P / solved.I; solved.R = solved.P / (solved.I * solved.I); }
    else if (key === "PR") { solved.P = vals.P * 1; solved.R = vals.R * 1; solved.V = Math.sqrt(solved.P * solved.R); solved.I = Math.sqrt(solved.P / solved.R); }
  }

  const toggleLock = (k) => {
    if (locked.includes(k)) return;
    setLocked([locked[1], k]);
    setVals(p => ({ ...p, [k]: Number.isFinite(solved[k]) ? String(Number(solved[k].toFixed(4))) : p[k] }));
  };
  const fmt = (v) => Number.isFinite(v) ? Number(v.toFixed(4)).toLocaleString("en") : "—";

  return (
    <React.Fragment>
      <ToolHead
        id="TOOL · OHMS"
        title={tx({ es: "Ley\nde Ohm", en: "Ohm's\nLaw" })}
        meta="V = I · R · P = V · I"
        sub={tx({ es: "Selecciona los dos valores conocidos. Los otros dos se calculan automáticamente.", en: "Select any two known values. The remaining two are calculated automatically." })}
      />
      <div className="panels">
        <Panel tag={tx({ es: "ENTRADA · 2 DE 4 BLOQUEOS", en: "INPUT · LOCK 2 OF 4" })}>
          {FIELDS.map(f => {
            const isLocked = locked.includes(f.k);
            const display = isLocked ? vals[f.k] : (Number.isFinite(solved[f.k]) ? Number(solved[f.k].toFixed(4)) : "");
            return (
              <div className={"field " + (isLocked ? "" : "locked")} key={f.k}>
                <span className="field-label">{f.label[lang]}</span>
                <input className="field-input" type="number" step="any" value={display} onChange={isLocked ? e => setVals(p => ({ ...p, [f.k]: e.target.value })) : () => {}} disabled={!isLocked} />
                <span className="field-unit">{f.unit}</span>
                <span></span>
                <div className="field-actions" style={{ gridColumn: "2 / 4", justifyContent: "flex-end", marginTop: -4 }}>
                  <button className={"lockbtn " + (isLocked ? "on" : "")} onClick={() => toggleLock(f.k)}>{isLocked ? "■" : "□"}</button>
                </div>
              </div>
            );
          })}
        </Panel>
        <Panel tag={tx({ es: "RESULTADO · CALCULADO", en: "RESULT · CALCULATED" })}>
          <div className="spec-row"><span>{tx({ es: "Voltaje", en: "Voltage" })}</span><b>{fmt(solved.V)} V</b></div>
          <div className="spec-row"><span>{tx({ es: "Corriente", en: "Current" })}</span><b>{fmt(solved.I)} A</b></div>
          <div className="spec-row"><span>{tx({ es: "Resistencia", en: "Resistance" })}</span><b>{fmt(solved.R)} Ω</b></div>
          <div className="spec-row"><span>{tx({ es: "Potencia", en: "Power" })}</span><b>{fmt(solved.P)} W</b></div>
          <div className="result">
            <div>
              <div className="lbl">// {tx({ es: "POTENCIA DISIPADA", en: "POWER DISSIPATED" })}</div>
              <div className="v">{fmt(solved.P)}<small>W</small></div>
            </div>
            <Pill>OK</Pill>
          </div>
        </Panel>
      </div>
    </React.Fragment>
  );
}

/* VOLTAGE DIVIDER */
function DividerTool() {
  return (
    <React.Fragment>
      <ToolHead id="TOOL · DIVIDER" title={tx({ es: "Divisor\nde Voltaje", en: "Voltage\nDivider" })} meta="Vout = Vin · R2 / (R1+R2)"
        sub={tx({ es: "Calcula la salida de un divisor resistivo de dos resistencias.", en: "Compute the output of a two-resistor resistive divider." })} />
      <Calc
        formula="Vout = Vin · R2 / (R1 + R2)"
        inputs={[
          { key: "Vin", label: { es: "Vin (entrada)",   en: "Vin (input)" },     unit: "V", default: 12 },
          { key: "R1",  label: { es: "R1",               en: "R1" },               unit: "Ω", default: 10000 },
          { key: "R2",  label: { es: "R2",               en: "R2" },               unit: "Ω", default: 4700 }
        ]}
        compute={v => {
          const Vout = v.Vin * v.R2 / (v.R1 + v.R2);
          const I    = v.Vin / (v.R1 + v.R2);
          return {
            rows: [
              { label: { es: "Corriente", en: "Current" }, value: I, unit: "A" },
              { label: { es: "Pot. R1",   en: "Power R1" }, value: I * I * v.R1, unit: "W" },
              { label: { es: "Pot. R2",   en: "Power R2" }, value: I * I * v.R2, unit: "W" }
            ],
            primary: { label: { es: "Vout", en: "Vout" }, value: Vout, unit: "V" }
          };
        }}
      />
    </React.Fragment>
  );
}

/* LED SERIES RESISTOR  R = (Vs − Vf) / If */
function LedTool() {
  return (
    <React.Fragment>
      <ToolHead id="TOOL · LED" title={tx({ es: "Resistencia\npara LED", en: "LED Series\nResistor" })} meta="R = (Vs − Vf) / If"
        sub={tx({ es: "Calcula la resistencia limitadora de corriente y la potencia disipada.", en: "Compute the current-limiting resistor and its dissipated power." })} />
      <Calc
        formula="R = (Vs − Vf) / If  ·  P = (Vs − Vf) · If"
        inputs={[
          { key: "Vs", label: { es: "Voltaje fuente", en: "Source voltage" }, unit: "V",  default: 5 },
          { key: "Vf", label: { es: "Voltaje LED (Vf)", en: "LED forward (Vf)" }, unit: "V",  default: 2.1 },
          { key: "If", label: { es: "Corriente LED", en: "LED current" }, unit: "mA", default: 20 }
        ]}
        compute={v => {
          const If = v.If / 1000;
          const R = (v.Vs - v.Vf) / If;
          const P = (v.Vs - v.Vf) * If;
          return {
            rows: [
              { label: { es: "Potencia (R)", en: "Power (R)" }, value: P, unit: "W" },
              { label: { es: "Caída en R",   en: "Drop on R" }, value: v.Vs - v.Vf, unit: "V" }
            ],
            primary: { label: { es: "Resistencia", en: "Resistance" }, value: R, unit: "Ω" }
          };
        }}
      />
    </React.Fragment>
  );
}

/* REACTANCE — capacitive Xc = 1/(2πfC), inductive Xl = 2πfL */
function ReactanceTool() {
  return (
    <React.Fragment>
      <ToolHead id="TOOL · REACTANCE" title={tx({ es: "Reactancia", en: "Reactance" })} meta="Xc = 1 / 2πfC · Xl = 2πfL"
        sub={tx({ es: "Reactancia capacitiva e inductiva a una frecuencia dada.", en: "Capacitive and inductive reactance at a given frequency." })} />
      <Calc
        formula="Xc = 1 / (2π·f·C) · Xl = 2π·f·L"
        inputs={[
          { key: "f", label: { es: "Frecuencia",   en: "Frequency" },  unit: "Hz", default: 1000 },
          { key: "C", label: { es: "Capacitancia", en: "Capacitance" }, unit: "µF", default: 1 },
          { key: "L", label: { es: "Inductancia",  en: "Inductance" },  unit: "mH", default: 10 }
        ]}
        compute={v => {
          const C = v.C * 1e-6;
          const L = v.L * 1e-3;
          const w = 2 * Math.PI * v.f;
          const Xc = 1 / (w * C);
          const Xl = w * L;
          return {
            rows: [
              { label: { es: "Reactancia Xc",  en: "Reactance Xc" },  value: Xc, unit: "Ω" },
              { label: { es: "Reactancia Xl",  en: "Reactance Xl" },  value: Xl, unit: "Ω" },
              { label: { es: "Frec. resonancia", en: "Resonant freq" }, value: 1 / (2 * Math.PI * Math.sqrt(L * C)), unit: "Hz" }
            ],
            primary: { label: { es: "|Xc − Xl|", en: "|Xc − Xl|" }, value: Math.abs(Xc - Xl), unit: "Ω" }
          };
        }}
      />
    </React.Fragment>
  );
}

/* RC TIME CONSTANT — τ = R·C; charge ~5τ to ~99% */
function RCTool() {
  return (
    <React.Fragment>
      <ToolHead id="TOOL · RC" title={tx({ es: "Constante RC", en: "RC Time Constant" })} meta="τ = R · C"
        sub={tx({ es: "Constante de tiempo RC: tiempo para alcanzar 63.2% en una carga.", en: "RC time constant: time to reach 63.2% on a charge." })} />
      <Calc
        formula="τ = R · C · t(5τ) ≈ 99.3% charge"
        inputs={[
          { key: "R", label: { es: "Resistencia", en: "Resistance" }, unit: "Ω",  default: 10000 },
          { key: "C", label: { es: "Capacitancia", en: "Capacitance" }, unit: "µF", default: 10 }
        ]}
        compute={v => {
          const C = v.C * 1e-6;
          const tau = v.R * C;
          return {
            rows: [
              { label: { es: "1τ (63.2%)", en: "1τ (63.2%)" }, value: tau,       unit: "s" },
              { label: { es: "3τ (95.0%)", en: "3τ (95.0%)" }, value: 3 * tau,   unit: "s" },
              { label: { es: "5τ (99.3%)", en: "5τ (99.3%)" }, value: 5 * tau,   unit: "s" }
            ],
            primary: { label: { es: "Constante τ", en: "Constant τ" }, value: tau, unit: "s" }
          };
        }}
      />
    </React.Fragment>
  );
}

/* PARALLEL · SERIES — up to 4 resistors */
function ParallelTool() {
  const [mode, setMode] = React.useState("parallel");
  return (
    <React.Fragment>
      <ToolHead id="TOOL · COMBO" title={tx({ es: "Paralelo · Serie", en: "Parallel · Series" })} meta={mode === "parallel" ? "1/Rt = Σ 1/Rn" : "Rt = Σ Rn"}
        sub={tx({ es: "Suma de hasta 4 resistencias en paralelo o en serie. Deja en 0 los espacios no usados.", en: "Sum of up to 4 resistors in parallel or series. Leave unused fields at 0." })} />
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button className={"btn " + (mode === "parallel" ? "" : "ghost")} onClick={() => setMode("parallel")}>{tx({ es: "PARALELO", en: "PARALLEL" })}</button>
        <button className={"btn " + (mode === "series" ? "" : "ghost")} onClick={() => setMode("series")}>{tx({ es: "SERIE",    en: "SERIES" })}</button>
      </div>
      <Calc
        formula={mode === "parallel" ? "1/Rt = 1/R1 + 1/R2 + … + 1/Rn" : "Rt = R1 + R2 + … + Rn"}
        inputs={[
          { key: "R1", label: { es: "R1", en: "R1" }, unit: "Ω", default: 220 },
          { key: "R2", label: { es: "R2", en: "R2" }, unit: "Ω", default: 470 },
          { key: "R3", label: { es: "R3", en: "R3" }, unit: "Ω", default: 0 },
          { key: "R4", label: { es: "R4", en: "R4" }, unit: "Ω", default: 0 }
        ]}
        compute={v => {
          const rs = [v.R1, v.R2, v.R3, v.R4].filter(x => Number.isFinite(x) && x > 0);
          const total = mode === "parallel"
            ? (rs.length ? 1 / rs.reduce((s, r) => s + 1 / r, 0) : NaN)
            : rs.reduce((s, r) => s + r, 0);
          return {
            rows: rs.map((r, i) => ({ label: { es: "R" + (i + 1), en: "R" + (i + 1) }, value: r, unit: "Ω" })),
            primary: { label: { es: "Rt total", en: "Rt total" }, value: total, unit: "Ω" }
          };
        }}
      />
    </React.Fragment>
  );
}

/* BATTERY LIFE  hours = Capacity_mAh / Load_mA  (with derate factor) */
function BatteryTool() {
  return (
    <React.Fragment>
      <ToolHead id="TOOL · BATTERY" title={tx({ es: "Vida\nde Batería", en: "Battery\nLife" })} meta="t = (C · k) / I"
        sub={tx({ es: "Tiempo estimado en horas para una capacidad y consumo dados. Factor k considera pérdidas reales.", en: "Estimated hours of runtime for a given capacity and load. k is a real-world derate factor." })} />
      <Calc
        formula="t = (Capacity_mAh × derate) / Load_mA"
        inputs={[
          { key: "C",  label: { es: "Capacidad",  en: "Capacity" },     unit: "mAh", default: 2500 },
          { key: "I",  label: { es: "Consumo",    en: "Load current" }, unit: "mA",  default: 80 },
          { key: "k",  label: { es: "Factor (0–1)", en: "Derate (0–1)" }, unit: "k",  default: 0.85 }
        ]}
        compute={v => {
          const hours = v.C * v.k / v.I;
          return {
            rows: [
              { label: { es: "Días",    en: "Days" },    value: hours / 24, unit: "d" },
              { label: { es: "Semanas", en: "Weeks" },   value: hours / (24 * 7), unit: "w" }
            ],
            primary: { label: { es: "Duración", en: "Runtime" }, value: hours, unit: "h" }
          };
        }}
      />
    </React.Fragment>
  );
}

/* PPM */
function PpmTool() {
  return (
    <React.Fragment>
      <ToolHead id="TOOL · PPM" title={tx({ es: "PPM", en: "PPM" })} meta="ppm = (part / whole) × 10⁶"
        sub={tx({ es: "Partes por millón: relación de una parte respecto al total.", en: "Parts per million: ratio of a part to the whole." })} />
      <Calc
        formula="ppm = (part / whole) × 1 000 000  ·  % = ppm / 10 000"
        inputs={[
          { key: "part",  label: { es: "Parte",    en: "Part" },  unit: "", default: 1 },
          { key: "whole", label: { es: "Total",    en: "Whole" }, unit: "", default: 1000000 }
        ]}
        compute={v => {
          const ppm = (v.part / v.whole) * 1e6;
          return {
            rows: [
              { label: { es: "Porcentaje", en: "Percent" }, value: ppm / 10000, unit: "%" },
              { label: { es: "Por mil",    en: "Per mille" }, value: ppm / 1000,  unit: "‰" }
            ],
            primary: { label: { es: "PPM", en: "PPM" }, value: ppm, unit: "ppm" }
          };
        }}
      />
    </React.Fragment>
  );
}

/* AWG WIRE GAUGE — diameter mm by gauge */
const AWG_TABLE = {
  "0000": 11.684, "000": 10.405, "00": 9.266, "0": 8.252,
  "1": 7.348, "2": 6.544, "3": 5.827, "4": 5.189, "5": 4.621,
  "6": 4.115, "7": 3.665, "8": 3.264, "9": 2.906, "10": 2.588,
  "11": 2.305, "12": 2.053, "13": 1.828, "14": 1.628, "15": 1.450,
  "16": 1.291, "17": 1.150, "18": 1.024, "19": 0.912, "20": 0.812,
  "21": 0.723, "22": 0.644, "23": 0.573, "24": 0.511, "25": 0.455,
  "26": 0.405, "27": 0.361, "28": 0.321, "29": 0.286, "30": 0.255,
  "32": 0.202, "34": 0.160, "36": 0.127, "38": 0.101, "40": 0.0799
};
function AwgTool() {
  const [g, setG] = React.useState("18");
  const lang = getLang();
  useT();
  const d = AWG_TABLE[g];
  const area = Math.PI * Math.pow(d / 2, 2);
  const resPerKm = 0.0172 * 1000 / area;
  // Rough current capacity for chassis wiring (very approximate)
  const ampacity = Math.max(0.5, Math.round(area * 8));
  return (
    <React.Fragment>
      <ToolHead id="TOOL · AWG" title={tx({ es: "Calibre\nAWG", en: "AWG Wire\nGauge" })} meta="AWG → mm · mm² · Ω/km"
        sub={tx({ es: "Diámetro, sección y resistencia por kilómetro para hilo de cobre.", en: "Diameter, cross-section, and ohms-per-kilometre for copper wire." })} />
      <div className="panels">
        <Panel tag={tx({ es: "ENTRADA · CALIBRE AWG", en: "INPUT · AWG GAUGE" })}>
          <div className="field">
            <span className="field-label">AWG</span>
            <select className="field-input" value={g} onChange={e => setG(e.target.value)} style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.14)", padding: "8px 10px", appearance: "none", WebkitAppearance: "none" }}>
              {Object.keys(AWG_TABLE).map(k => <option key={k} value={k}>{k}</option>)}
            </select>
            <span className="field-unit">awg</span>
          </div>
          <div className="mono" style={{ marginTop: 14, padding: "10px 12px", border: "1px dashed rgba(154,100,230,0.35)", color: "var(--primary-2)", fontSize: 12 }}>
            {tx({ es: "Tabla AWG estándar (cobre)", en: "Standard AWG table (copper)" })}
          </div>
        </Panel>
        <Panel tag={tx({ es: "RESULTADO", en: "RESULT" })}>
          <div className="spec-row"><span>{tx({ es: "Diámetro", en: "Diameter" })}</span><b>{d.toFixed(3)} mm</b></div>
          <div className="spec-row"><span>{tx({ es: "Sección", en: "Cross-section" })}</span><b>{area.toFixed(4)} mm²</b></div>
          <div className="spec-row"><span>{tx({ es: "Resistencia / km", en: "Resistance / km" })}</span><b>{resPerKm.toFixed(3)} Ω</b></div>
          <div className="result">
            <div>
              <div className="lbl">// {tx({ es: "AMPACIDAD APROX.", en: "ROUGH AMPACITY" })}</div>
              <div className="v">~{ampacity}<small>A</small></div>
            </div>
            <Pill>{tx({ es: "CHASIS", en: "CHASSIS" })}</Pill>
          </div>
        </Panel>
      </div>
    </React.Fragment>
  );
}

/* DECIMAL TO FRACTION  (continued-fraction approximation) */
function decToFrac(x, eps = 1e-6, maxIter = 64) {
  if (!Number.isFinite(x)) return [NaN, NaN];
  const neg = x < 0; x = Math.abs(x);
  let h1 = 1, h0 = 0, k1 = 0, k0 = 1, b = x;
  let i = 0;
  do {
    const a = Math.floor(b);
    let h2 = a * h1 + h0; h0 = h1; h1 = h2;
    let k2 = a * k1 + k0; k0 = k1; k1 = k2;
    b = 1 / (b - a);
    if (Math.abs(x - h1 / k1) < x * eps) break;
    i++;
  } while (i < maxIter && Number.isFinite(b));
  return [neg ? -h1 : h1, k1];
}
function DecFracTool() {
  return (
    <React.Fragment>
      <ToolHead id="TOOL · DEC/FRAC" title={tx({ es: "Decimal\na Fracción", en: "Decimal\nto Fraction" })} meta="≈ fracción continua"
        sub={tx({ es: "Aproxima un decimal a la fracción más simple posible usando fracciones continuas.", en: "Approximates a decimal to the simplest fraction using continued fractions." })} />
      <Calc
        formula="x ≈ p / q  (continued-fraction expansion)"
        inputs={[
          { key: "x", label: { es: "Decimal", en: "Decimal" }, unit: "", default: 0.625, step: "any" }
        ]}
        compute={v => {
          const [p, q] = decToFrac(v.x);
          return {
            rows: [
              { label: { es: "Numerador",   en: "Numerator" },   value: p, unit: "" },
              { label: { es: "Denominador", en: "Denominator" }, value: q, unit: "" },
              { label: { es: "Error",       en: "Error" },        value: Math.abs(v.x - p / q), unit: "" }
            ],
            primary: { label: { es: "Fracción", en: "Fraction" }, value: p + " / " + q, unit: "" }
          };
        }}
      />
    </React.Fragment>
  );
}

Object.assign(window, { OhmsTool, DividerTool, LedTool, ReactanceTool, RCTool, ParallelTool, BatteryTool, PpmTool, AwgTool, DecFracTool, decToFrac });
