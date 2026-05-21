// Catronics Lab — Decorative dividers (schematic strip + marquee band)

function SchematicDivider() {
  return (
    <div className="schematic" aria-hidden="true">
      <svg viewBox="0 0 1600 120" preserveAspectRatio="none">
        <path className="trace-dim" d="M0 60 H1600"/>
        <path className="trace" d="M80 20 V60 H300 V100 H520"/>
        <path className="trace" d="M180 100 V70 H360"/>
        <path className="trace" d="M620 100 V80 H720 V40 H900"/>
        <path className="trace" d="M1060 40 H1200 V90 H1380 V30 H1560"/>
        <path className="trace-dim" d="M520 60 H620"/>
        <path className="trace-dim" d="M900 60 H1060"/>
        <rect className="chip-rect" x="720" y="30" width="180" height="60" rx="4" strokeWidth="2"/>
        <image href={assetUrl("catPurple", "../assets/catronics-cat-purple.png")} x="740" y="35" width="50" height="50"/>
        <text className="label" x="810" y="55" textAnchor="middle">CTLB-AI</text>
        <text className="label" x="810" y="74" textAnchor="middle">v2.6</text>
        <g fill="#9b3df0">
          {[730,745,760,775,855,870,885].map(x => <rect key={"t"+x} x={x} y="26" width="3" height="6"/>)}
          {[730,745,760,855,870,885].map(x => <rect key={"b"+x} x={x} y="88" width="3" height="6"/>)}
        </g>
        <g stroke="#9b3df0" strokeWidth="1" fill="none">
          <path d="M380 60 l8 -8 l12 16 l12 -16 l12 16 l12 -16 l8 8"/>
          <rect x="1240" y="56" width="36" height="8"/>
        </g>
        <text className="label" x="410" y="48" textAnchor="middle">10kΩ</text>
        <text className="label" x="1258" y="50" textAnchor="middle">R7</text>
        <g stroke="#9b3df0" strokeWidth="1.4" fill="none">
          <line x1="1100" y1="48" x2="1100" y2="72"/>
          <line x1="1110" y1="44" x2="1110" y2="76"/>
        </g>
        <text className="label" x="1105" y="36" textAnchor="middle">C3</text>
        <g>
          <circle className="pad-ring" cx="80" cy="20" r="5"/><circle className="pad" cx="80" cy="20" r="2"/>
          <circle className="pad-ring" cx="1560" cy="30" r="5"/><circle className="pad" cx="1560" cy="30" r="2"/>
          <circle className="glow node-pulse"   cx="300"  cy="60" r="3.5"/>
          <circle className="glow node-pulse-2" cx="720"  cy="40" r="3.5"/>
          <circle className="glow node-pulse-3" cx="1060" cy="40" r="3.5"/>
          <circle className="glow node-pulse-2" cx="1200" cy="90" r="3.5"/>
        </g>
        <text className="label" x="14"   y="18">VCC ─</text>
        <text className="label" x="14"   y="110">GND ─</text>
        <text className="label" x="1586" y="110" textAnchor="end">─ DATA_OUT</text>
      </svg>
    </div>
  );
}

const MARQUEE_ITEMS = [
  "PCB Design", "3D Printing", "Firmware", "IoT Stacks",
  "CAD / CAM", "Embedded Linux", "RF · BLE · LoRa", "Industrial Design",
];

function Marquee() {
  // duplicate so the loop is seamless
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((label, i) => (
          <React.Fragment key={i}>
            <span className={i % 2 === 0 ? "solid" : ""}>{label}</span>
            <span className="sep">◇</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { SchematicDivider, Marquee });
