// Catronics Lab — Services section

const SERVICES = [
  { id: "01", tag: { es: "HARDWARE & FIRMWARE",    en: "HARDWARE & FIRMWARE" },
    title: { es: "Sistemas\nEmbebidos",            en: "Embedded\nSystems" },
    body:  { es: "Diseño de PCBs a medida y programación de microcontroladores (STM32, ESP32, PIC) para aplicaciones de alto rendimiento y bajo consumo.",
             en: "Custom PCB design and microcontroller firmware (STM32, ESP32, PIC) for high-performance, low-power applications." },
    specs: ["STM32","ESP32","PIC","PCB Custom"], img: assetUrl("svcPcb", "../assets/svc-pcb.jpeg") },
  { id: "02", tag: { es: "CONECTIVIDAD",           en: "CONNECTIVITY" },
    title: { es: "Dashboards",                     en: "Dashboards" },
    body:  { es: "Interconexión de dispositivos a la nube. Monitoreo remoto, telemetría MQTT y dashboards en tiempo real para la toma de decisiones.",
             en: "Connect devices to the cloud. Remote monitoring, MQTT telemetry and real-time dashboards for decision-making." },
    specs: ["MQTT","Telemetría","Dashboards","Cloud"], img: assetUrl("svcDashboard", "../assets/svc-dashboard.png") },
  { id: "03", tag: { es: "INDUSTRIAL",             en: "INDUSTRIAL" },
    title: { es: "Automatización",                 en: "Automation" },
    body:  { es: "Integración de PLCs, sensores industriales y actuadores para modernizar líneas de producción y reducir intervención manual.",
             en: "Integration of PLCs, industrial sensors and actuators to modernize production lines and reduce manual intervention." },
    specs: ["PLC","Sensores","Actuadores","SCADA"], img: assetUrl("svcPlc", "../assets/svc-plc.png") },
  { id: "04", tag: { es: "DESARROLLO DE PRODUCTO", en: "PRODUCT DEVELOPMENT" },
    title: { es: "Prototipado\nRápido",            en: "Rapid\nPrototyping" },
    body:  { es: "Del plano a la realidad. Impresión 3D, corte láser y ensamblaje de MVPs funcionales para validación de mercado.",
             en: "From blueprint to reality. 3D printing, laser cutting and assembly of functional MVPs for market validation." },
    specs: ["Impresión 3D","Corte láser","MVPs","Ensamble"], img: assetUrl("svc3dprint", "../assets/svc-3dprint.png") },
  { id: "05", tag: { es: "FULL STACK",             en: "FULL STACK" },
    title: { es: "Modelado 3D",                    en: "3D Modeling" },
    body:  { es: "Modelado 3D de piezas mecánicas complejas y de ingeniería usando software de tipo CAD, modelos funcionales para simulación e impresión.",
             en: "3D modeling of complex mechanical parts using CAD software — functional models for simulation, 3D printing and other applications." },
    specs: ["CAD","Fusion 360","SolidWorks","FEA"], img: assetUrl("svcCad", "../assets/svc-cad.png") },
  { id: "06", tag: { es: "INNOVACIÓN",             en: "INNOVATION" },
    title: { es: "Simulación\nIndustrial",         en: "Industrial\nSimulation" },
    body:  { es: "Simulación de herramientas industriales en ambientes controlados y simulados por computadora.",
             en: "Simulation of industrial tooling in controlled, computer-modelled environments." },
    specs: ["Edge AI","Visión","ML","Predictivo"], img: assetUrl("svcSimulacion", "../assets/svc-simulacion.png") }
];

function ServiceCard({ s }) {
  useT();
  return (
    <article className="svc">
      <div className="svc-media">
        <img src={s.img} alt={tx(s.title).replace(/\n/g, " ")} loading="lazy" />
        <div className="svc-media-overlay"></div>
        <div className="svc-media-id">// {s.id}</div>
      </div>
      <div className="svc-body">
        <div className="svc-top">
          <div className="svc-num">SVC // {s.id}</div>
          <div className="svc-tag">{tx(s.tag)}</div>
        </div>
        <h3 style={{ whiteSpace: "pre-line" }}>{tx(s.title)}</h3>
        <p>{tx(s.body)}</p>
        <div className="svc-foot">
          <div className="svc-spec">
            {s.specs.map(x => <span key={x}>{x}</span>)}
          </div>
          <div className="svc-arrow">↗</div>
        </div>
      </div>
    </article>
  );
}

function ServicesSection() {
  useT();
  return (
    <section id="servicios" data-screen-label="02 Services">
      <SectionHead
        id="01 / SERVICIOS"
        title={tx({ es: "Nuestras\nSoluciones", en: "Our\nSolutions" })}
        meta={tx({ es: "INGENIERÍA INTEGRAL · PROBLEMAS COMPLEJOS", en: "FULL-STACK ENGINEERING · COMPLEX PROBLEMS" })}
      />
      <div className="svc-grid">
        {SERVICES.map(s => <ServiceCard s={s} key={s.id} />)}
      </div>
    </section>
  );
}

Object.assign(window, { ServiceCard, ServicesSection, SERVICES });
