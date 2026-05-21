// Catronics Lab — Contact section (headline + form + socials + footer)

const SUBJECTS = [
  { es: "Cotización de proyecto",         en: "Project quote" },
  { es: "Sistemas embebidos / PCB",       en: "Embedded systems / PCB" },
  { es: "Modelado 3D · CAD",              en: "3D modeling · CAD" },
  { es: "Impresión 3D · Prototipado",     en: "3D printing · Prototyping" },
  { es: "Automatización industrial",      en: "Industrial automation" },
  { es: "Dashboards / IoT",               en: "Dashboards / IoT" },
  { es: "Simulación industrial",          en: "Industrial simulation" },
  { es: "Soporte técnico",                en: "Technical support" },
  { es: "Información general",            en: "General info" }
];

function ContactDirect() {
  useT();
  return (
    <div className="contact-direct">
      <a href="mailto:contacto@catronicslab.com" className="contact-direct-line">
        <span className="cd-tag">{tx({ es: "EMAIL",    en: "EMAIL" })}</span>
        <span className="cd-val">contacto@catronicslab.com</span>
      </a>
      <a href="https://wa.me/529997372022" className="contact-direct-line">
        <span className="cd-tag">{tx({ es: "WHATSAPP", en: "WHATSAPP" })}</span>
        <span className="cd-val">+52 999 737 2022</span>
      </a>
      <div className="contact-direct-line">
        <span className="cd-tag">{tx({ es: "LAB",      en: "LAB" })}</span>
        <span className="cd-val">{tx({ es: "Yucatán · México", en: "Yucatán · Mexico" })}</span>
      </div>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = React.useState({ name: "", email: "", subject: "", details: "" });
  const [status, setStatus] = React.useState("idle");
  const [touched, setTouched] = React.useState({});
  useT();

  const set  = k => e => setForm({ ...form, [k]: e.target.value });
  const blur = k => () => setTouched({ ...touched, [k]: true });

  const errors = {
    name:    form.name.trim().length < 2 ? tx({ es: "Mínimo 2 caracteres",  en: "At least 2 characters" }) : "",
    email:   !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? tx({ es: "Email inválido", en: "Invalid email" }) : "",
    subject: !form.subject ? tx({ es: "Selecciona un asunto", en: "Select a subject" }) : "",
    details: form.details.trim().length < 10 ? tx({ es: "Mínimo 10 caracteres", en: "At least 10 characters" }) : ""
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const onSubmit = e => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, details: true });
    if (hasErrors) return;
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1100);
  };

  const reset = () => {
    setForm({ name: "", email: "", subject: "", details: "" });
    setTouched({});
    setStatus("idle");
  };

  if (status === "sent") {
    return (
      <div className="form-success">
        <div className="success-mark">
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" width="36" height="36">
            <circle cx="32" cy="32" r="28" />
            <path d="M20 33 l9 9 l16 -18" />
          </svg>
        </div>
        <h3 className="display" style={{ fontSize: 38, lineHeight: 0.95, margin: "18px 0 6px" }}>
          {tx({ es: "Mensaje enviado.", en: "Message sent." })}
        </h3>
        <p style={{ color: "var(--ink-dim)", maxWidth: 380, margin: "0 auto", fontSize: 14, lineHeight: 1.55 }}>
          {tx({
            es: <>Gracias <b style={{ color: "#fff" }}>{form.name.split(" ")[0]}</b>. Recibimos tu solicitud sobre <b style={{ color: "var(--primary-2)" }}> {form.subject}</b>. Te responderemos a <b style={{ color: "#fff" }}>{form.email}</b> en menos de 24 hrs.</>,
            en: <>Thanks <b style={{ color: "#fff" }}>{form.name.split(" ")[0]}</b>. We received your request about <b style={{ color: "var(--primary-2)" }}> {form.subject}</b>. We'll reply to <b style={{ color: "#fff" }}>{form.email}</b> in under 24 hrs.</>
          })}
        </p>
        <button type="button" className="form-reset" onClick={reset}>
          {tx({ es: "Enviar otro mensaje", en: "Send another message" })}
        </button>
      </div>
    );
  }

  const cls = (k, extra = "") =>
    "field " + (form[k] ? "has-val " : "") + (touched[k] && errors[k] ? "err " : "") + extra;

  const lang = getLang();
  return (
    <form onSubmit={onSubmit} noValidate>
      <div className={cls("name")}>
        <label>{tx({ es: "Nombre Completo *",     en: "Full Name *" })}</label>
        <input type="text" value={form.name} onChange={set("name")} onBlur={blur("name")} autoComplete="name" />
        <span className="field-line"></span>
        {touched.name && errors.name && <span className="field-err">{errors.name}</span>}
      </div>

      <div className={cls("email")}>
        <label>{tx({ es: "Correo Electrónico *",  en: "Email *" })}</label>
        <input type="email" value={form.email} onChange={set("email")} onBlur={blur("email")} autoComplete="email" />
        <span className="field-line"></span>
        {touched.email && errors.email && <span className="field-err">{errors.email}</span>}
      </div>

      <div className={cls("subject", "field-select ")}>
        <label>{tx({ es: "Selecciona el Asunto *", en: "Select Subject *" })}</label>
        <select value={form.subject} onChange={set("subject")} onBlur={blur("subject")}>
          <option value=""></option>
          {SUBJECTS.map(s => <option key={s.es} value={s[lang]}>{s[lang]}</option>)}
        </select>
        <span className="field-line"></span>
        <span className="select-caret">▾</span>
        {touched.subject && errors.subject && <span className="field-err">{errors.subject}</span>}
      </div>

      <div className={cls("details", "field-area ")}>
        <label>{tx({ es: "Detalles del Proyecto *", en: "Project Details *" })}</label>
        <textarea rows="5" value={form.details} onChange={set("details")} onBlur={blur("details")}></textarea>
        <span className="field-line"></span>
        <span className="field-count">{form.details.length} / 600</span>
      </div>

      <div className="form-submit-row">
        <button type="submit" className={"submit-btn " + (status === "sending" ? "is-sending" : "")} disabled={status === "sending"}>
          <span className="dot" style={{ background: "#fff", boxShadow: "0 0 10px #fff" }}></span>
          <span>{status === "sending" ? tx({ es: "Enviando...", en: "Sending..." }) : tx({ es: "Enviar mensaje", en: "Send message" })}</span>
          <IconArrow />
        </button>
        <div className="form-foot-note mono">{tx({ es: "Respuesta < 24 hrs · SLA", en: "Reply < 24 hrs · SLA" })}</div>
      </div>
    </form>
  );
}

function ContactSocials() {
  useT();
  const links = [
    { url: "https://github.com/CatronicsLabMx",                t: "GitHub" },
    { url: "https://www.linkedin.com/company/catronics-lab/",  t: "LinkedIn" },
    { url: "https://www.instagram.com/catronicslabmx/",        t: "Instagram" },
    { url: "https://wa.me/529997372022",                       t: "WhatsApp" },
    { url: "mailto:contacto@catronicslab.com",                 t: "Email" }
  ];
  return (
    <div className="contact-social-row">
      <h5 className="contact-social-h5">// {tx({ es: "SOCIAL", en: "SOCIAL" })}</h5>
      <div className="contact-social-links">
        {links.map(l => (
          <a key={l.t} href={l.url} className="contact-social-link">{l.t} <span className="arr">→</span></a>
        ))}
      </div>
      <div className="mono" style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--ink-dim)", textTransform: "uppercase", textAlign: "right", lineHeight: 1.7 }}>
        <div>// LAT 20.97°N · LNG 89.62°W</div>
        <div>// CTLB · v2026.05</div>
      </div>
    </div>
  );
}

function ContactSection() {
  useT();
  return (
    <section id="contacto" className="contact-section" data-screen-label="05 Contact">
      <div className="contact-band-glow"></div>
      <div className="contact-grid">
        <div className="contact-headline">
          <div className="eyebrow" style={{ marginBottom: 18 }}>[ 05 / {tx({ es: "CONTACTO", en: "CONTACT" })} ]</div>
          <h2 className="display contact-h2">
            {tx({
              es: <>¿Tienes algún<br/>proyecto en<br/>mente?<br/><span style={{ color: "var(--primary)" }}>Contáctanos.</span></>,
              en: <>Got a<br/>project in<br/>mind?<br/><span style={{ color: "var(--primary)" }}>Get in touch.</span></>
            })}
          </h2>
          <p className="contact-sub">
            {tx({
              es: "Cuéntanos qué quieres construir. Sin compromiso — te respondemos por el canal que prefieras.",
              en: "Tell us what you want to build. No commitment — we'll get back to you through your preferred channel."
            })}
          </p>
          <ContactDirect />
        </div>

        <div className="contact-form-wrap">
          <div className="form-head">
            <span className="form-head-tag">// {tx({ es: "FORMULARIO_DE_COTIZACION", en: "QUOTE_REQUEST_FORM" })}</span>
            <span className="form-head-status"><span className="ddd"></span> ONLINE</span>
          </div>
          <ContactForm />
        </div>
      </div>

      <ContactSocials />

      <div className="contact-legal">
        <div>© 2026 Catronics Lab · {tx({ es: "Todos los derechos reservados.", en: "All rights reserved." })}</div>
        <div className="contact-legal-mid">contacto@catronicslab.com · +52 999 737 2022</div>
        <div>{tx({ es: "Ingeniería que Transforma", en: "Engineering that Transforms" })}</div>
      </div>
    </section>
  );
}

Object.assign(window, { ContactSection, ContactForm, ContactDirect, ContactSocials });
