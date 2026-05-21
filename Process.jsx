// Catronics Lab — Process section (lab card with steps + live spec panel)

const STEPS = [
  { n: "01", t: { es: "Análisis",   en: "Analysis" },    d: { es: "REQUERIMIENTOS",  en: "REQUIREMENTS" },
    obj: { es: "Entender a fondo tu problema",     en: "Deeply understand your problem" },
    out: { es: "Requerimientos técnicos",          en: "Technical requirements" },
    canal:{ es: "WhatsApp · Email",                 en: "WhatsApp · Email" } },
  { n: "02", t: { es: "Diseño",     en: "Design" },      d: { es: "ARQUITECTURA",    en: "ARCHITECTURE" },
    obj: { es: "Componentes y arquitectura óptima", en: "Optimal components and architecture" },
    out: { es: "BOM + Arquitectura",                en: "BOM + Architecture" },
    canal:{ es: "Reunión técnica",                  en: "Technical meeting" } },
  { n: "03", t: { es: "Ejecución",  en: "Execution" },   d: { es: "DESARROLLO ÁGIL", en: "AGILE DEV" },
    obj: { es: "Entregas parciales y demos",        en: "Partial deliveries and demos" },
    out: { es: "Builds funcionales",                en: "Functional builds" },
    canal:{ es: "Sprint review",                    en: "Sprint review" } },
  { n: "04", t: { es: "Validación", en: "Validation" },  d: { es: "QA · PRUEBAS",    en: "QA · TESTING" },
    obj: { es: "Pruebas y QA documentado",          en: "Documented QA + tests" },
    out: { es: "Test report",                       en: "Test report" },
    canal:{ es: "Demo en vivo",                     en: "Live demo" } },
  { n: "05", t: { es: "Entrega",    en: "Handoff" },     d: { es: "HANDOFF",         en: "HANDOFF" },
    obj: { es: "Handoff técnico completo",          en: "Full technical handoff" },
    out: { es: "Documentación + Manual",            en: "Documentation + Manual" },
    canal:{ es: "Entrega formal",                   en: "Formal delivery" } },
  { n: "06", t: { es: "Soporte",    en: "Support" },     d: { es: "POST-LANZAMIENTO",en: "POST-LAUNCH" },
    obj: { es: "Acompañamiento continuo",           en: "Ongoing support" },
    out: { es: "OTA · Mejoras",                     en: "OTA · Improvements" },
    canal:{ es: "Soporte directo",                  en: "Direct support" } }
];

const CAPS = [
  { g: "⏚", t: { es: "Bench & Lab",  en: "Bench & Lab" },  s: { es: "OSCILOSCOPIO · LCR · PSU", en: "OSCILLOSCOPE · LCR · PSU" } },
  { g: "◐", t: { es: "Granja 3D",    en: "3D Farm" },      s: { es: "6× FDM · 2× SLA · 1× SLS",  en: "6× FDM · 2× SLA · 1× SLS" } },
  { g: "⎔", t: { es: "Reflow & SMD", en: "Reflow & SMD" }, s: { es: "HORNO · CÁMARA TÉRMICA",    en: "OVEN · THERMAL CAMERA" } },
  { g: "◈", t: { es: "DevOps IoT",   en: "IoT DevOps" },   s: { es: "MQTT · OTA · DASHBOARD",    en: "MQTT · OTA · DASHBOARD" } }
];

function CapRow() {
  useT();
  return (
    <div className="cap-row">
      {CAPS.map((c, i) => (
        <div className="cap" key={i}>
          <div className="glyph">{c.g}</div>
          <h4>{tx(c.t)}</h4>
          <small>{tx(c.s)}</small>
        </div>
      ))}
    </div>
  );
}

function ProcessSteps({ active, onPick }) {
  useT();
  return (
    <div className="steps">
      {STEPS.map((st, i) => (
        <div
          key={st.n}
          className="step"
          onClick={() => onPick(i)}
          style={{ background: active === i ? "rgba(106,13,173,0.10)" : undefined }}
        >
          <div className="n">{st.n}</div>
          <div className="t" style={{ color: active === i ? "var(--primary-2)" : undefined }}>{tx(st.t)}</div>
          <div className="d">{tx(st.d)}</div>
        </div>
      ))}
    </div>
  );
}

function SpecPanel({ step }) {
  useT();
  return (
    <div className="specs">
      <div className="head">
        <div className="left">SCOPE · {step.n}</div>
        <div className="right">● {tx({ es: "EN VIVO", en: "LIVE" })}</div>
      </div>
      <div className="spec-row"><span>{tx({ es: "Etapa",    en: "Stage" })}</span><b>{tx(step.t)}</b></div>
      <div className="spec-row"><span>{tx({ es: "Foco",     en: "Focus" })}</span><b>{tx(step.d)}</b></div>
      <div className="spec-row"><span>{tx({ es: "Objetivo", en: "Goal" })}</span><b>{tx(step.obj)}</b></div>
      <div className="spec-row"><span>{tx({ es: "Output",   en: "Output" })}</span><b>{tx(step.out)}</b></div>
      <div className="spec-row"><span>{tx({ es: "Canal",    en: "Channel" })}</span><b>{tx(step.canal)}</b></div>
      <div className="spec-foot">
        <Pill>SLA 12h</Pill>
        <div className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.2em" }}>CTLB-{step.n}</div>
      </div>
      <CapRow />
    </div>
  );
}

function ProcessSection() {
  const [active, setActive] = React.useState(2);
  useT();
  return (
    <section id="proceso" data-screen-label="03 Process">
      <SectionHead
        id="02 / PROCESO"
        title={tx({ es: "¿Cómo\nTrabajamos?", en: "How We\nWork" })}
        meta={tx({ es: "METODOLOGÍA ÁGIL · ENTREGAS PARCIALES", en: "AGILE METHODOLOGY · PARTIAL DELIVERIES" })}
      />
      <div className="lab">
        <div className="left">
          <h3 className="display">
            {tx({
              es: <>One bench.<br/><span style={{ color: "var(--primary)" }}>Full stack.</span></>,
              en: <>One bench.<br/><span style={{ color: "var(--primary)" }}>Full stack.</span></>
            })}
          </h3>
          <p>
            {tx({
              es: "Autoridad técnica sólida, soluciones totalmente personalizadas y tecnología de vanguardia. Desarrollo ágil con entregas parciales para asegurar que vamos por buen camino.",
              en: "Solid technical authority, fully personalized solutions, and cutting-edge tech. Agile development with partial deliveries to make sure we're on the right track."
            })}
          </p>
          <ProcessSteps active={active} onPick={setActive} />
        </div>
        <SpecPanel step={STEPS[active]} />
      </div>
    </section>
  );
}

Object.assign(window, { ProcessSection, ProcessSteps, SpecPanel, CapRow });
