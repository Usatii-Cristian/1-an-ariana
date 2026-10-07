"use client";

import { useSyncExternalStore, type CSSProperties } from "react";
import { INIMA } from "./ui";

// Scena cu cortine din „Totul a început când...”, desenată într-o lume de 1600×1000.
// Pe telefon (portret) „camera” se apropie de mijloc, pe laptop se vede toată sala.

const PORTRET = "(max-aspect-ratio: 1/1)";
const abonare = (cb: () => void) => {
  const m = window.matchMedia(PORTRET);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

const PETALE: [number, number, number, number][] = [
  [742, 846, -20, 1], [768, 860, 35, 0.9], [792, 842, 70, 1.1], [828, 856, -45, 1], [850, 840, 15, 0.8],
  [812, 872, 55, 1], [722, 864, 80, 0.85], [872, 866, -65, 0.95], [690, 880, 20, 0.8], [918, 884, -30, 0.9],
  [640, 900, 60, 0.7], [960, 906, -10, 0.75],
];
const PRAF = Array.from({ length: 16 }, (_, i) => ({
  x: 700 + ((i * 53) % 200),
  y: 260 + ((i * 97) % 520),
  r: 1.4 + (i % 3) * 0.7,
  d: (i * 0.61) % 6,
}));
const STELE_DRAPERIE: [number, number][] = [[612, 214], [700, 238], [900, 238], [988, 214]];

const stea4 = (x: number, y: number, r: number) =>
  `M${x} ${y - r}L${x + r * 0.28} ${y - r * 0.28}L${x + r} ${y}L${x + r * 0.28} ${y + r * 0.28}L${x} ${y + r}L${x - r * 0.28} ${y + r * 0.28}L${x - r} ${y}L${x - r * 0.28} ${y - r * 0.28}Z`;

const ARCADA = "M520 880V360Q520 158 800 148Q1080 158 1080 360V880Z";
const CORTINA = "M528 188H664C652 330 616 470 576 560C612 660 646 760 670 862H528Z";

function Cortina({ fill, flori, oglinda }: { fill: string; flori: string; oglinda?: boolean }) {
  return (
    <g transform={oglinda ? "translate(1600 0) scale(-1 1)" : undefined}>
      <path d={CORTINA} fill={fill} />
      <path d={CORTINA} fill={flori} opacity={0.55} />
      <g fill="none" stroke="#062a2e" strokeOpacity={0.32} strokeWidth={4} strokeLinecap="round">
        <path d="M548 194C552 330 560 470 566 554" />
        <path d="M578 194C580 330 576 470 570 556" />
        <path d="M610 194C606 330 592 470 578 556" />
        <path d="M640 194C630 330 604 470 584 558" />
        <path d="M570 570C584 680 592 780 590 856" />
        <path d="M578 572C604 680 624 780 634 858" />
        <path d="M566 572C562 680 556 780 552 858" />
      </g>
      <path d="M664 188C652 330 616 470 576 560C612 660 646 760 670 862" fill="none" stroke="#fff" strokeOpacity={0.18} strokeWidth={3} />
      <ellipse cx={578} cy={561} rx={28} ry={10} fill="url(#sc-aur)" />
      <path d="M592 568C598 584 600 598 598 612" stroke="url(#sc-aur)" strokeWidth={4} fill="none" />
      <path d="M590 610H606L612 650H584Z" fill="url(#sc-aur)" />
      <path d="M588 650V662M594 650V664M600 650V663M606 650V661" stroke="#d6a23a" strokeWidth={2} />
    </g>
  );
}

export default function Scena() {
  const portret = useSyncExternalStore(abonare, () => window.matchMedia(PORTRET).matches, () => false);

  return (
    <svg
      className="scena-svg"
      viewBox={portret ? "540 30 520 970" : "96 110 1408 880"}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <pattern id="sc-piatra" width="120" height="60" patternUnits="userSpaceOnUse">
          <rect width="120" height="60" fill="#232b44" />
          <rect x="2" y="2" width="56" height="26" rx="3" fill="#475473" />
          <rect x="62" y="2" width="56" height="26" rx="3" fill="#3f4b69" />
          <rect x="-28" y="32" width="56" height="26" rx="3" fill="#43506e" />
          <rect x="32" y="32" width="56" height="26" rx="3" fill="#4c5a7b" />
          <rect x="92" y="32" width="56" height="26" rx="3" fill="#43506e" />
          <rect x="4" y="3" width="52" height="3" rx="1.5" fill="#6a789c" opacity=".45" />
          <rect x="34" y="33" width="52" height="3" rx="1.5" fill="#6a789c" opacity=".4" />
        </pattern>
        <pattern id="sc-caramida" width="80" height="40" patternUnits="userSpaceOnUse">
          <rect width="80" height="40" fill="#5f81a9" />
          <rect x="2" y="2" width="36" height="16" rx="2" fill="#a9c7e4" />
          <rect x="42" y="2" width="36" height="16" rx="2" fill="#9cbcdc" />
          <rect x="-18" y="22" width="36" height="16" rx="2" fill="#a2c1e0" />
          <rect x="22" y="22" width="36" height="16" rx="2" fill="#b3cfe8" />
          <rect x="62" y="22" width="36" height="16" rx="2" fill="#a2c1e0" />
        </pattern>
        <pattern id="sc-flori" width="64" height="64" patternUnits="userSpaceOnUse">
          <g fill="#f7a8bd">
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx="16" cy="10.5" rx="3.2" ry="5" transform={`rotate(${a} 16 16)`} />
            ))}
          </g>
          <circle cx="16" cy="16" r="2.6" fill="#ffd27a" />
          <path d="M22 22Q30 22 32 30Q24 30 22 22Z" fill="#8fd8cc" />
          <g fill="#ffb889">
            {[0, 90, 180, 270].map((a) => (
              <ellipse key={a} cx="48" cy="44.5" rx="2.4" ry="3.6" transform={`rotate(${a} 48 48)`} />
            ))}
          </g>
          <circle cx="48" cy="48" r="1.8" fill="#fff3c4" />
        </pattern>
        <linearGradient id="sc-teal" x1="0" x2="1">
          {[0, 0.12, 0.24, 0.36, 0.48, 0.6, 0.72, 0.84, 1].map((o, i) => (
            <stop key={o} offset={o} stopColor={i % 2 ? "#156c72" : "#2fa7a9"} />
          ))}
        </linearGradient>
        <linearGradient id="sc-roz" x1="0" x2="1">
          {[0, 0.12, 0.24, 0.36, 0.48, 0.6, 0.72, 0.84, 1].map((o, i) => (
            <stop key={o} offset={o} stopColor={i % 2 ? "#b46a86" : "#f1b1c3"} />
          ))}
        </linearGradient>
        <linearGradient id="sc-catifea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#145a5a" />
          <stop offset=".55" stopColor="#2c9690" />
          <stop offset="1" stopColor="#1a6663" />
        </linearGradient>
        <linearGradient id="sc-aur" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff1b0" />
          <stop offset=".5" stopColor="#f2c14e" />
          <stop offset="1" stopColor="#b8862b" />
        </linearGradient>
        <radialGradient id="sc-lumina-fundal" cx=".5" cy=".55" r=".55">
          <stop offset="0" stopColor="#f4fbff" stopOpacity=".55" />
          <stop offset="1" stopColor="#f4fbff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sc-spot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4fbff" stopOpacity=".62" />
          <stop offset=".7" stopColor="#e6f4ff" stopOpacity=".16" />
          <stop offset="1" stopColor="#e6f4ff" stopOpacity=".05" />
        </linearGradient>
        <radialGradient id="sc-podea" cx=".5" cy=".38" r=".62">
          <stop offset="0" stopColor="#f6fcff" />
          <stop offset=".5" stopColor="#bcd8ee" />
          <stop offset="1" stopColor="#7c9fc6" />
        </radialGradient>
        <linearGradient id="sc-margine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7a9ac2" />
          <stop offset="1" stopColor="#3b5580" />
        </linearGradient>
        <linearGradient id="sc-lemn" x1="0" x2="1">
          <stop offset="0" stopColor="#3e1015" />
          <stop offset=".45" stopColor="#93323b" />
          <stop offset="1" stopColor="#4f161c" />
        </linearGradient>
        <linearGradient id="sc-pagina" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff6dc" />
          <stop offset="1" stopColor="#f6bf62" />
        </linearGradient>
        <radialGradient id="sc-glow">
          <stop offset="0" stopColor="#fff3c4" stopOpacity=".95" />
          <stop offset="1" stopColor="#ffd27a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sc-petala" cx=".35" cy=".35">
          <stop offset="0" stopColor="#ffd0dc" />
          <stop offset="1" stopColor="#e9799a" />
        </radialGradient>
        <radialGradient id="sc-vigneta" cx=".5" cy=".5" r=".72">
          <stop offset=".55" stopColor="#050a22" stopOpacity="0" />
          <stop offset="1" stopColor="#050a22" stopOpacity=".85" />
        </radialGradient>
        <clipPath id="sc-arcada">
          <path d={ARCADA} />
        </clipPath>
      </defs>

      <rect width="1600" height="1000" fill="url(#sc-piatra)" />

      {/* sala castelului (se vede pe ecran lat): steaguri cu inimă, sfeșnice, coloane */}
      {[0, 1].map((o) => (
        <g key={o} transform={o ? "translate(1600 0) scale(-1 1)" : undefined}>
          <path d="M238 176H362V508L300 552L238 508Z" fill="url(#sc-catifea)" />
          <path d="M238 176H362V508L300 552L238 508Z" fill="none" stroke="url(#sc-aur)" strokeWidth={6} />
          <path d="M252 192H348V500L300 534L252 500Z" fill="none" stroke="#f2c14e" strokeOpacity={0.5} strokeWidth={2} />
          <rect x="226" y="164" width="148" height="14" rx="7" fill="url(#sc-aur)" />
          <path d={INIMA} transform="translate(270 306) scale(2.5)" fill="#ff8fb6" />
          <path d={stea4(300, 252, 12)} fill="url(#sc-aur)" />
          <path d={stea4(300, 444, 9)} fill="url(#sc-aur)" />
          <circle cx={300} cy={620} r={86} fill="url(#sc-glow)" opacity={0.4} />
          <path d="M274 668H326L314 684H286Z" fill="url(#sc-aur)" />
          <rect x="294" y="630" width="12" height="40" rx="2" fill="#f4ead6" />
          <path className="scena__flacara" d="M300 602Q308 616 300 630Q292 616 300 602Z" fill="#ffd27a" />
        </g>
      ))}

      {/* interiorul arcadei, luminat */}
      <path d={ARCADA} fill="url(#sc-caramida)" />
      <path d={ARCADA} fill="url(#sc-lumina-fundal)" />

      {/* reflectorul */}
      <polygon points="744,150 856,150 1080,860 520,860" fill="url(#sc-spot)" opacity={0.55} />
      <polygon points="760,150 840,150 1020,860 580,860" fill="url(#sc-spot)" />

      {/* podeaua și scena rotundă */}
      <rect y="880" width="1600" height="120" fill="#2c3756" />
      <g stroke="#3f4c70" strokeWidth={2}>
        {[-6, -4, -2, 0, 2, 4, 6].map((k) => (
          <line key={k} x1={800 + k * 120} y1={880} x2={800 + k * 260} y2={1000} />
        ))}
        <line x1="0" y1="920" x2="1600" y2="920" />
        <line x1="0" y1="962" x2="1600" y2="962" />
      </g>
      <ellipse cx="800" cy="902" rx="505" ry="80" fill="#34476d" />
      <ellipse cx="800" cy="880" rx="472" ry="78" fill="url(#sc-margine)" />
      <ellipse cx="800" cy="860" rx="462" ry="70" fill="url(#sc-podea)" />
      <ellipse cx="800" cy="860" rx="340" ry="50" fill="none" stroke="#e1effa" strokeWidth={3} opacity={0.75} />
      <ellipse cx="800" cy="858" rx="214" ry="34" fill="#fff" opacity={0.5} />

      {/* cortinele laterale */}
      <g clipPath="url(#sc-arcada)">
        <Cortina fill="url(#sc-teal)" flori="url(#sc-flori)" />
        <Cortina fill="url(#sc-roz)" flori="url(#sc-flori)" oglinda />

        {/* draperia de sus */}
        <rect x="520" y="140" width="560" height="52" fill="#134f50" />
        {[0, 1].map((o) => (
          <g key={o} transform={o ? "translate(1600 0) scale(-1 1)" : undefined}>
            <path d="M520 150H800V192C740 322 600 334 520 272Z" fill="url(#sc-catifea)" />
            <path d="M542 214C602 282 718 284 780 204" fill="none" stroke="#0b3c3c" strokeOpacity={0.4} strokeWidth={7} />
            <path d="M532 246C600 304 716 306 772 232" fill="none" stroke="#0b3c3c" strokeOpacity={0.3} strokeWidth={6} />
            <path d="M520 160H562V318L552 306L542 322L531 308L520 326Z" fill="#1d7672" />
          </g>
        ))}
        <path d="M520 272C600 334 740 322 800 192C860 322 1000 334 1080 272" fill="none" stroke="#e7b84a" strokeWidth={2.5} />
        <path d="M520 279C600 341 740 329 800 199C860 329 1000 341 1080 279" fill="none" stroke="url(#sc-aur)" strokeWidth={8} strokeDasharray="1 13" strokeLinecap="round" />
        {STELE_DRAPERIE.map(([x, y], i) => (
          <path key={x} className="scena__stea" style={{ animationDelay: `${i * 0.5}s` }} d={stea4(x, y, 13)} fill="url(#sc-aur)" />
        ))}
        <circle cx="800" cy="198" r="15" fill="url(#sc-aur)" />
        <path d="M800 212V236" stroke="url(#sc-aur)" strokeWidth={4} />
        <path d="M790 236H810L816 268H784Z" fill="url(#sc-aur)" />
      </g>

      {/* arcada de piatră */}
      <path d="M520 880V360Q520 158 800 148Q1080 158 1080 360V880" fill="none" stroke="#2b3450" strokeWidth={46} />
      <path d="M520 880V360Q520 158 800 148Q1080 158 1080 360V880" fill="none" stroke="#56638a" strokeWidth={34} strokeDasharray="44 7" />
      <path d="M770 118H830L822 172H778Z" fill="#6b789f" stroke="#2b3450" strokeWidth={4} />

      {/* pupitrul cu cartea */}
      <ellipse cx="800" cy="860" rx="74" ry="12" fill="#1d2c4a" opacity={0.45} />
      <g fill="none" stroke="url(#sc-lemn)" strokeWidth={10} strokeLinecap="round">
        <path d="M800 792C790 816 770 834 746 846" />
        <path d="M800 792C800 816 800 834 800 852" />
        <path d="M800 792C810 816 830 834 854 846" />
      </g>
      <g fill="#4a1418">
        <circle cx="745" cy="847" r="6" />
        <circle cx="800" cy="853" r="6" />
        <circle cx="855" cy="847" r="6" />
      </g>
      <rect x="790" y="640" width="20" height="156" rx="5" fill="url(#sc-lemn)" />
      {[652, 704, 784].map((y) => (
        <ellipse key={y} cx="800" cy={y} rx="15" ry="5.5" fill="#7a2730" stroke="#b54a55" strokeWidth={1.2} />
      ))}
      <polygon points="730,612 870,596 877,637 737,653" fill="#7d2b33" />
      <path d="M730 612L870 596" stroke="#c45c66" strokeWidth={2} />
      <ellipse className="scena__aura" cx="802" cy="602" rx="96" ry="54" fill="url(#sc-glow)" />
      <path d="M736 640C732 680 728 712 742 734C764 718 784 688 800 662C816 688 838 714 860 726C872 704 868 670 873 628Z" fill="#3b5cc0" />
      <path d="M742 734C764 718 784 688 800 662C816 688 838 714 860 726" fill="none" stroke="url(#sc-aur)" strokeWidth={5} strokeDasharray="1 7" strokeLinecap="round" />
      <path d="M760 652C770 676 780 690 792 700" fill="none" stroke="#2a4596" strokeWidth={4} opacity={0.6} />
      <path d="M744 606Q772 588 800 600V630Q772 618 748 636Z" fill="url(#sc-pagina)" />
      <path d="M800 600Q830 584 860 594L864 624Q832 614 800 630Z" fill="url(#sc-pagina)" />
      <g stroke="#d99a3e" strokeWidth={1.2} opacity={0.55}>
        <path d="M756 606Q776 596 794 604M758 614Q776 604 794 612M760 622Q778 612 794 620" fill="none" />
        <path d="M806 604Q826 594 852 600M806 612Q826 602 854 608M806 620Q828 610 856 616" fill="none" />
      </g>
      <path d="M800 600V630" stroke="#c98a2e" strokeWidth={2} />
      <path d="M801 630L798 670L804 663L810 671L806 630Z" fill="#d6455f" />
      {[[772, 572, 7], [832, 566, 6], [804, 548, 8], [858, 580, 5]].map(([x, y, r], i) => (
        <path key={x} className="scena__stea" style={{ animationDelay: `${0.3 + i * 0.45}s` }} d={stea4(x, y, r)} fill="#fff6d0" />
      ))}

      {/* petale de trandafir */}
      {PETALE.map(([x, y, a, s]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx={8 * s} ry={4.6 * s} fill="url(#sc-petala)" transform={`rotate(${a} ${x} ${y})`} />
      ))}

      {/* praf luminos în reflector */}
      {PRAF.map((p, i) => (
        <circle key={i} className="scena__praf" cx={p.x} cy={p.y} r={p.r} fill="#fff" style={{ animationDelay: `-${p.d}s` } as CSSProperties} />
      ))}

      <rect x="0" y="0" width="1600" height="1000" fill="url(#sc-vigneta)" />
    </svg>
  );
}
