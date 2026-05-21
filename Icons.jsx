// Catronics Lab — Custom Iconography
// Schematic-style icons drawn to match the linework of the cat-mark and
// the existing schematic motifs (1.4px strokes, square caps, sharp corners,
// pad-and-trace details). 24×24 viewBox, `currentColor` stroke.
//
// USE: <Icon name="cpu" />  or  <Icon name="cpu" size={20} stroke={1.6} />
//
// Available names: cpu, board, capacitor, resistor, inductor, diode,
//   bolt, oscilloscope, antenna, gear, terminal, leaf, divider, wave, plug

const CATRONICS_ICONS = {
  cpu: (
    <g>
      <rect x="6" y="6" width="12" height="12" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="3" y1="9"  x2="6" y2="9" />
      <line x1="3" y1="12" x2="6" y2="12" />
      <line x1="3" y1="15" x2="6" y2="15" />
      <line x1="18" y1="9"  x2="21" y2="9" />
      <line x1="18" y1="12" x2="21" y2="12" />
      <line x1="18" y1="15" x2="21" y2="15" />
      <line x1="9"  y1="3" x2="9"  y2="6" />
      <line x1="12" y1="3" x2="12" y2="6" />
      <line x1="15" y1="3" x2="15" y2="6" />
      <line x1="9"  y1="18" x2="9"  y2="21" />
      <line x1="12" y1="18" x2="12" y2="21" />
      <line x1="15" y1="18" x2="15" y2="21" />
    </g>
  ),
  board: (
    <g>
      <rect x="3" y="3" width="18" height="18" />
      <circle cx="7" cy="7" r="1.3" fill="currentColor" />
      <circle cx="17" cy="7" r="1.3" fill="currentColor" />
      <circle cx="7" cy="17" r="1.3" fill="currentColor" />
      <circle cx="17" cy="17" r="1.3" fill="currentColor" />
      <path d="M7 7 H13 V13 H17" />
      <path d="M7 17 V11" />
    </g>
  ),
  capacitor: (
    <g>
      <line x1="3" y1="12" x2="10" y2="12" />
      <line x1="14" y1="12" x2="21" y2="12" />
      <line x1="10" y1="6"  x2="10" y2="18" />
      <line x1="14" y1="6"  x2="14" y2="18" />
    </g>
  ),
  resistor: (
    <g>
      <line x1="2" y1="12" x2="5" y2="12" />
      <path d="M5 12 L7 8 L9 16 L11 8 L13 16 L15 8 L17 16 L19 12" />
      <line x1="19" y1="12" x2="22" y2="12" />
    </g>
  ),
  inductor: (
    <g>
      <line x1="2" y1="15" x2="5" y2="15" />
      <path d="M5 15 A2 2 0 0 1 9 15 A2 2 0 0 1 13 15 A2 2 0 0 1 17 15 A2 2 0 0 1 21 15" fill="none" />
      <line x1="21" y1="15" x2="22" y2="15" />
    </g>
  ),
  diode: (
    <g>
      <line x1="3" y1="12" x2="9" y2="12" />
      <path d="M9 6 L9 18 L18 12 Z" fill="none" />
      <line x1="18" y1="6" x2="18" y2="18" />
      <line x1="18" y1="12" x2="21" y2="12" />
    </g>
  ),
  bolt: (
    <g>
      <path d="M13 3 L4 14 H11 L10 21 L20 9 H13 Z" />
    </g>
  ),
  oscilloscope: (
    <g>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M5 13 L8 13 L10 8 L13 18 L15 11 L17 13 L20 13" />
    </g>
  ),
  antenna: (
    <g>
      <line x1="12" y1="3" x2="12" y2="13" />
      <path d="M7 8 Q12 4 17 8" fill="none" />
      <path d="M5 11 Q12 5 19 11" fill="none" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="13" x2="12" y2="20" />
    </g>
  ),
  gear: (
    <g>
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2"  x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="2" y1="12"  x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="5" y1="5"  x2="8" y2="8" />
      <line x1="16" y1="16" x2="19" y2="19" />
      <line x1="5" y1="19"  x2="8" y2="16" />
      <line x1="16" y1="8"  x2="19" y2="5" />
    </g>
  ),
  terminal: (
    <g>
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <path d="M7 9 L10 12 L7 15" />
      <line x1="12" y1="16" x2="17" y2="16" />
    </g>
  ),
  leaf: ( // "lab" leaf — molecule-like for chemistry/sim
    <g>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <line x1="7.5" y1="7.5" x2="11" y2="16.5" />
      <line x1="16.5" y1="7.5" x2="13" y2="16.5" />
      <line x1="8" y1="6" x2="16" y2="6" />
    </g>
  ),
  divider: (
    <g>
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M5 6 V11 M7 11 L9 9 L11 13 L13 9 L15 13 L17 11 V6" fill="none" />
      <line x1="11" y1="13" x2="11" y2="20" />
      <line x1="3" y1="20" x2="21" y2="20" />
    </g>
  ),
  wave: (
    <g>
      <path d="M3 12 Q6 4 9 12 T15 12 T21 12" fill="none" />
    </g>
  ),
  plug: (
    <g>
      <path d="M6 3 V8" />
      <path d="M14 3 V8" />
      <rect x="3" y="8" width="14" height="6" rx="1" />
      <path d="M17 11 H21" />
      <path d="M10 14 V21" />
    </g>
  )
};

function Icon({ name, size = 20, stroke = 1.4 }) {
  const body = CATRONICS_ICONS[name];
  if (!body) return null;
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      {body}
    </svg>
  );
}

Object.assign(window, { Icon, CATRONICS_ICONS });
