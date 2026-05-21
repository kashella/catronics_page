// Catronics Lab — Hero (top of page)

function HeroPCB() {
  return (
    <svg className="pcb" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g>
        <path className="trace" stroke="#9b3df0" strokeWidth="1" fill="none" opacity="0.6" d="M40 60 H220 V120 H360 V240 H480"/>
        <path stroke="#9b3df0" strokeWidth="1" fill="none" opacity="0.6" d="M40 200 H140 V300 H260"/>
        <path stroke="#9b3df0" strokeWidth="1" fill="none" opacity="0.6" d="M520 80 V160 H640 V300 H760"/>
        <path stroke="#9b3df0" strokeWidth="1" fill="none" opacity="0.6" d="M120 480 H300 V400 H460 V520 H700"/>
        <path stroke="#9b3df0" strokeWidth="1" fill="none" opacity="0.6" d="M520 480 V420 H580"/>
        <path stroke="#9b3df0" strokeWidth="1" fill="none" opacity="0.6" d="M40 400 H80 V520 H180"/>
        <rect x="320" y="180" width="160" height="100" fill="none" stroke="#9b3df0" strokeWidth="1"/>
        <text x="400" y="234" fill="#6a0dad" fontFamily="JetBrains Mono" fontSize="11" textAnchor="middle" letterSpacing="2">CTLB-01</text>
        <g fill="#9b3df0">
          {[190,210,230,250,270].map(y => <rect key={"L"+y} x="316" y={y} width="4" height="6"/>)}
          {[190,210,230,250,270].map(y => <rect key={"R"+y} x="480" y={y} width="4" height="6"/>)}
        </g>
        <g>
          {[[40,60],[760,300],[700,520],[180,520],[260,300]].map(([cx,cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="6" fill="none" stroke="#9b3df0" strokeWidth="1"/>
              <circle cx={cx} cy={cy} r="2.5" fill="#9b3df0"/>
            </g>
          ))}
          {[[220,120],[360,240],[640,160],[300,400],[460,520],[580,420]].map(([cx,cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3" fill="#6a0dad"/>
          ))}
        </g>
      </g>
    </svg>
  );
}

function Hero() {
  useT();
  const stats = [
    { v: "06",                          k: tx({ es: <>Áreas de<br/>especialidad</>,         en: <>Areas of<br/>specialty</> }) },
    { v: <>100<small>%</small></>,      k: tx({ es: <>Soluciones<br/>a medida</>,           en: <>Tailor-made<br/>solutions</> }) },
    { v: "MQTT",                        k: tx({ es: <>Telemetría<br/>en tiempo real</>,     en: <>Real-time<br/>telemetry</> }) },
    { v: <>Edge<small>AI</small></>,    k: tx({ es: <>Visión + ML<br/>en el dispositivo</>, en: <>Vision + ML<br/>on device</> }) }
  ];
  return (
    <header className="hero" data-screen-label="01 Hero">
      <div className="grid-bg"></div>
      <div className="bracket tl"></div>
      <div className="bracket tr"></div>

      <HeroPCB />

      <EyebrowRow
        idx="INDEX / 00"
        tag1={tx({ es: "CATRONICS LAB · YUCATÁN MEXICO", en: "CATRONICS LAB · YUCATÁN MEXICO" })}
        tag2={t("brand.tagline").replace(/^./, c => c.toUpperCase()).replace(/[A-ZÁ-Ú]+/g, w => w.charAt(0) + w.slice(1).toLowerCase())}
      />

      <div className="h1-row">
        <h1 className="display">
          {tx({
            es: <>INGENIERÍA<br/>ELECTRÓNICA<br/><span style={{ color: "var(--primary)" }}>SIN LÍMITES.</span></>,
            en: <>ELECTRONIC<br/>ENGINEERING<br/><span style={{ color: "var(--primary)" }}>WITHOUT LIMITS.</span></>
          })}
        </h1>
        <div className="sub">
          {tx({
            es: <>Diseñamos y desarrollamos soluciones a medida en <b>IoT</b>, <b>Sistemas Embebidos</b>, <b>Robótica</b>, <b>Impresión y Modelado 3D</b> y <b>Automatización</b>. Llevamos tu proyecto del concepto a la realidad.</>,
            en: <>We design and develop tailor-made solutions in <b>IoT</b>, <b>Embedded Systems</b>, <b>Robotics</b>, <b>3D Printing &amp; Modeling</b> and <b>Automation</b>. We take your project from concept to reality.</>
          })}
        </div>
      </div>

      <div className="stat-row">
        {stats.map((s, i) => (
          <div className="stat" key={i}>
            <div className="v">{s.v}</div>
            <div className="k">{s.k}</div>
          </div>
        ))}
      </div>

      <div className="bracket bl"></div>
      <div className="bracket br"></div>

      <img className="cat-watermark" src={assetUrl("catPurple", "../assets/catronics-cat-purple.png")} alt="" aria-hidden="true" />
    </header>
  );
}

Object.assign(window, { Hero });
