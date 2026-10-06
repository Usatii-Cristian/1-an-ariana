import { INIMA } from "./ui";

// Castel de basm desenat de mână. viewBox 400×570, solul la y=444, sub el reflexia în apă.
// Vitraliul din mijloc (≈ 50% / 56.8%) e ținta zoom-ului din intro.

type Turn = { x: number; sus: number; jos: number; w: number; con: number; aur?: boolean; f?: number };

// Jumătatea stângă; dreapta e oglindită
const SPATE: Turn[] = [
  { x: 166, sus: 178, jos: 300, w: 12, con: 62, aur: true, f: 2 },
  { x: 150, sus: 200, jos: 322, w: 24, con: 58, f: 3 },
  { x: 128, sus: 242, jos: 332, w: 16, con: 40, f: 2 },
];
const FATA: Turn[] = [
  { x: 112, sus: 264, jos: 412, w: 26, con: 54, f: 3 },
  { x: 175, sus: 276, jos: 300, w: 11, con: 26 },
  { x: 80, sus: 386, jos: 444, w: 18, con: 30, f: 1 },
  { x: 40, sus: 372, jos: 444, w: 22, con: 36, f: 1 },
  { x: 180, sus: 394, jos: 444, w: 12, con: 20 },
];

const GEAM = "M189 352V318Q189 302 200 297Q211 302 211 318V352Z";

function Fereastra({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return <path d={`M${x - w / 2} ${y + h}V${y + w / 2}a${w / 2} ${w / 2} 0 0 1 ${w} 0V${y + h}z`} fill="url(#c-lumina)" />;
}

function Creneluri({ x1, x2, y, pas = 8 }: { x1: number; x2: number; y: number; pas?: number }) {
  const n = Math.floor((x2 - x1) / pas);
  return (
    <g fill="#f3c9a0">
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={x1 + i * pas + pas * 0.2} y={y - 4.5} width={pas * 0.55} height={5} />
      ))}
    </g>
  );
}

function TurnDesen({ x, sus, jos, w, con, aur, f = 0 }: Turn) {
  const h = w / 2;
  const fw = Math.max(3, w * 0.3);
  return (
    <g>
      <rect x={x - h} y={sus} width={w} height={jos - sus} fill="url(#c-turn)" />
      {Array.from({ length: f }, (_, i) => (
        <Fereastra key={i} x={x} y={sus + 9 + i * 21} w={fw} h={fw * 2.1} />
      ))}
      <rect x={x - h - 1.5} y={sus - 3} width={w + 3} height={4.5} fill="#f9d9b2" />
      <polygon points={`${x - h - 3},${sus - 1.5} ${x + h + 3},${sus - 1.5} ${x},${sus - con}`} fill={aur ? "url(#c-aur)" : "url(#c-acoperis)"} />
      <line x1={x} y1={sus - con} x2={x} y2={sus - con - 8} stroke="#ffe2a0" strokeWidth={1} />
      <circle cx={x} cy={sus - con - 8} r={1.3} fill="#fff1c2" />
    </g>
  );
}

const oglinda = "translate(400 0) scale(-1 1)";

export default function Castel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 570" className={className} aria-hidden>
      <defs>
        <linearGradient id="c-turn" x1="0" x2="1">
          <stop offset="0" stopColor="#b27a76" />
          <stop offset=".3" stopColor="#f6c697" />
          <stop offset=".5" stopColor="#ffdeb2" />
          <stop offset=".72" stopColor="#f0b98f" />
          <stop offset="1" stopColor="#a8727a" />
        </linearGradient>
        <linearGradient id="c-zid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f8d3a8" />
          <stop offset="1" stopColor="#eaa67a" />
        </linearGradient>
        <linearGradient id="c-zid2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ecc39c" />
          <stop offset="1" stopColor="#b98a76" />
        </linearGradient>
        <linearGradient id="c-acoperis" x1="0" x2="1">
          <stop offset="0" stopColor="#173b80" />
          <stop offset=".38" stopColor="#4a8ad8" />
          <stop offset=".55" stopColor="#62a2e8" />
          <stop offset=".76" stopColor="#2b5daf" />
          <stop offset="1" stopColor="#132c66" />
        </linearGradient>
        <linearGradient id="c-aur" x1="0" x2="1">
          <stop offset="0" stopColor="#9b604f" />
          <stop offset=".4" stopColor="#f8cd8f" />
          <stop offset=".55" stopColor="#ffe6b8" />
          <stop offset=".76" stopColor="#e7a96f" />
          <stop offset="1" stopColor="#8d564b" />
        </linearGradient>
        <radialGradient id="c-lumina" cx=".5" cy=".35" r=".75">
          <stop offset="0" stopColor="#fff8d2" />
          <stop offset="1" stopColor="#ffb948" />
        </radialGradient>
        <linearGradient id="c-vitraliu" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a9be6" />
          <stop offset=".6" stopColor="#b48ad8" />
          <stop offset="1" stopColor="#f2b8d8" />
        </linearGradient>
        <radialGradient id="c-halo">
          <stop offset="0" stopColor="#fff2c8" stopOpacity=".75" />
          <stop offset="1" stopColor="#fff2c8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="c-poarta" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff6cf" />
          <stop offset="1" stopColor="#ffb347" />
        </linearGradient>
        <linearGradient id="c-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="c-reflex" maskUnits="userSpaceOnUse" x="0" y="444" width="400" height="126">
          <rect x="0" y="444" width="400" height="126" fill="url(#c-fade)" />
        </mask>
        <clipPath id="c-geam">
          <path d={GEAM} />
        </clipPath>
      </defs>

      <g id="c-tot">
        {/* turnul central cu turla aurie */}
        <rect x={178} y={150} width={44} height={152} fill="url(#c-turn)" />
        {[0, 1, 2].map((i) => (
          <Fereastra key={i} x={200} y={160 + i * 44} w={8} h={20} />
        ))}
        <rect x={172} y={145} width={56} height={6} fill="#f9d9b2" />
        <Creneluri x1={172} x2={228} y={145} pas={7} />
        <rect x={186} y={100} width={28} height={46} fill="url(#c-turn)" />
        <Fereastra x={200} y={110} w={8} h={22} />
        <rect x={182} y={96} width={36} height={5} fill="#f9d9b2" />
        <polygon points="180,100 190,100 185,72" fill="url(#c-aur)" />
        <polygon points="210,100 220,100 215,72" fill="url(#c-aur)" />
        <rect x={192} y={70} width={16} height={27} fill="url(#c-turn)" />
        <polygon points="187,72 213,72 200,20" fill="url(#c-aur)" />
        <circle cx={200} cy={70} r={2} fill="#fff1c2" />
        <g className="castel__steag">
          <line x1={200} y1={22} x2={200} y2={3} stroke="#ffe7b0" strokeWidth={1.1} />
          <path d="M200 4Q211 1.5 223 7Q211 11 200 14Z" fill="#fffaf2" />
          <path d={INIMA} transform="translate(206.6 5.6) scale(.2)" fill="#e5486f" />
        </g>

        {SPATE.map((t, i) => (
          <g key={i}>
            <TurnDesen {...t} />
            <g transform={oglinda}>
              <TurnDesen {...t} />
            </g>
          </g>
        ))}

        {/* aripile castelului */}
        {[0, 1].map((o) => (
          <g key={o} transform={o ? oglinda : undefined}>
            <rect x={116} y={302} width={54} height={102} fill="url(#c-zid)" />
            <Creneluri x1={116} x2={170} y={302} pas={9} />
            {[126, 143, 160].map((x) =>
              [316, 348].map((y) => <Fereastra key={`${x}-${y}`} x={x} y={y} w={7} h={15} />),
            )}
          </g>
        ))}

        {/* corpul central cu frontonul și vitraliul */}
        <rect x={168} y={282} width={64} height={122} fill="url(#c-zid)" />
        <polygon points="163,284 237,284 200,232" fill="url(#c-acoperis)" />
        <line x1={200} y1={232} x2={200} y2={222} stroke="#ffe2a0" strokeWidth={1} />
        <circle cx={200} cy={221.5} r={1.5} fill="#fff1c2" />
        <ellipse cx={200} cy={326} rx={26} ry={38} fill="url(#c-halo)" />
        <path d={GEAM} fill="url(#c-vitraliu)" />
        <g clipPath="url(#c-geam)" stroke="#4a3260" strokeWidth={0.9} opacity={0.85}>
          {Array.from({ length: 12 }, (_, i) => (
            <g key={i}>
              <line x1={170 + i * 7} y1={290} x2={230 + i * 7} y2={360} />
              <line x1={230 - i * 7} y1={290} x2={170 - i * 7} y2={360} />
            </g>
          ))}
        </g>
        <path d={GEAM} fill="none" stroke="#f9d9b2" strokeWidth={2} />
        <rect x={181} y={354} width={38} height={4} fill="#f9d9b2" />
        <Fereastra x={200} y={368} w={12} h={26} />

        {FATA.map((t, i) => (
          <g key={i}>
            <TurnDesen {...t} />
            <g transform={oglinda}>
              <TurnDesen {...t} />
            </g>
          </g>
        ))}

        {/* zidul din față, poarta și podul */}
        <rect x={30} y={398} width={340} height={46} fill="url(#c-zid2)" />
        <Creneluri x1={30} x2={370} y={398} pas={9} />
        {[56, 100, 140, 260, 300, 344].map((x) => (
          <Fereastra key={x} x={x} y={410} w={6} h={12} />
        ))}
        <path d="M186 444V424Q186 410 200 407Q214 410 214 424V444Z" fill="url(#c-poarta)" />
        <g stroke="#b06a3c" strokeWidth={1} opacity={0.45}>
          {[191, 196, 200, 204, 209].map((x) => (
            <line key={x} x1={x} y1={410} x2={x} y2={444} />
          ))}
        </g>
        <rect x={0} y={441} width={400} height={6} fill="#162c58" />
        <polygon points="186,444 214,444 228,460 172,460" fill="#e2b48a" />
      </g>

      {/* reflexia în apă */}
      <g mask="url(#c-reflex)">
        <use href="#c-tot" transform="matrix(1 0 0 -1 0 888)" opacity={0.32} />
      </g>
      <rect x={194} y={462} width={12} height={70} fill="#ffcf7a" opacity={0.25} />
      <g fill="#cfe3ff" opacity={0.3}>
        <rect x={120} y={474} width={70} height={1.5} rx={1} />
        <rect x={220} y={490} width={90} height={1.5} rx={1} />
        <rect x={150} y={512} width={110} height={1.5} rx={1} />
      </g>
    </svg>
  );
}
