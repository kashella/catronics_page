// Catronics Lab — Team section (4 members + Byte mascot panel)

const TEAM = [
  { id: "CTLB-01", name: "Diego González",
    role: { es: "Desarrollador Software & Firmware", en: "Software & Firmware Engineer" },
    bio:  { es: "Firmware bare-metal, RTOS y backends.", en: "Bare-metal firmware, RTOS, and backends." },
    img: assetUrl("teamSebastian", "../assets/team-sebastian.jpeg"),
    li: "https://www.linkedin.com/in/diego-gonz%C3%A1lez-52706737a/" },
  { id: "CTLB-02", name: "Ronaldo Avila",
    role: { es: "CTO & Diseñador Digital", en: "CTO & Digital Designer" },
    bio:  { es: "Estrategia tecnológica e identidad visual.", en: "Tech strategy and visual identity." },
    img: assetUrl("teamRonaldo", "../assets/team-ronaldo.jpeg"),
    li: "https://www.linkedin.com/in/ronaldo-iv%C3%A1n-%C3%A1vila-sauri-a91050257/" },
  { id: "CTLB-03", name: "Sebastian Victorio",
    role: { es: "CEO & Lead Developer", en: "CEO & Lead Developer" },
    bio:  { es: "Ingeniería de sistemas embebidos y dirección técnica.", en: "Embedded systems engineering and technical leadership." },
    img: assetUrl("teamDiego", "../assets/team-diego.jpeg"),
    li: "https://www.linkedin.com/in/sebasti%C3%A1n-victorio-fabila-1507562a0/" },
  { id: "CTLB-04", name: "Sergio Basulto",
    role: { es: "Ingeniero de Hardware", en: "Hardware Engineer" },
    bio:  { es: "PCB design, prototipado y validación.", en: "PCB design, prototyping, and validation." },
    img: assetUrl("teamSergio", "../assets/team-sergio.jpeg"),
    li: "https://www.linkedin.com/in/sergio-basulto-046370269/" }
];
const SOCIAL_LI = "https://www.linkedin.com/company/catronics-lab/";
const SOCIAL_GH = "https://github.com/CatronicsLabMx";

function MemberCard({ m }) {
  useT();
  return (
    <article className="member">
      <div className="member-head">
        <div className="avatar">
          <div className="img-mask">
            <img src={m.img} alt={m.name} />
          </div>
        </div>
        <div className="member-meta">
          <h4>{m.name}</h4>
          <div className="role">{tx(m.role)}</div>
        </div>
      </div>
      <p className="member-bio">{tx(m.bio)}</p>
      <div className="member-foot">
        <div className="ident">// {m.id}</div>
        <div className="socials">
          <a href={m.li} target="_blank" rel="noreferrer" aria-label="LinkedIn"><IconLI /></a>
          <a href={SOCIAL_GH} target="_blank" rel="noreferrer" aria-label="GitHub"><IconGH /></a>
        </div>
      </div>
    </article>
  );
}

function ByteCard() {
  useT();
  return (
    <aside className="team-side">
      <span className="pin-corner tl"></span><span className="pin-corner tr"></span>
      <span className="pin-corner bl"></span><span className="pin-corner br"></span>
      <div className="mono" style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--ink-dim)", alignSelf: "flex-start", zIndex: 1 }}>// MASCOT · CTLB-AI</div>
      <div className="byte-frame">
        <img src={assetUrl("byte", "../assets/byte-mascot.png")} alt="Byte mascota" />
      </div>
      <div className="byte-name">BYTE</div>
      <div className="byte-tag">{tx({ es: "Lab Companion · v1.0", en: "Lab Companion · v1.0" })}</div>
      <div className="byte-desc">
        {tx({
          es: "Nuestra mascota oficial. Acompaña cada prototipo, cada commit y cada release de Catronics Lab.",
          en: "Our official mascot. Rides along with every prototype, every commit and every release at Catronics Lab."
        })}
      </div>
    </aside>
  );
}

function TeamSection() {
  useT();
  return (
    <section id="equipo" data-screen-label="04 Team">
      <SectionHead
        id="04 / EQUIPO"
        title={tx({ es: "Nuestro\nEquipo", en: "Our\nTeam" })}
        meta={tx({ es: "EXPERTOS MULTIDISCIPLINARIOS", en: "MULTI-DISCIPLINARY EXPERTS" })}
      />
      <div className="team-info">
        <div className="lab-tag">CATRONICS LAB · YUCATÁN · MX</div>
        <div style={{ textAlign: "center" }}>
          {tx({ es: "Expertos multidisciplinarios unidos por la innovación.", en: "Multi-disciplinary experts united by innovation." })}
        </div>
        <div><span className="count">04</span> + 01 BYTE</div>
      </div>
      <div className="team-wrap">
        <div className="team-grid">
          {TEAM.map(m => <MemberCard m={m} key={m.id} />)}
        </div>
        <ByteCard />
      </div>
    </section>
  );
}

Object.assign(window, { TeamSection, MemberCard, ByteCard, TEAM });
