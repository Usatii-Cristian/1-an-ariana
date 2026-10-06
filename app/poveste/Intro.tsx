"use client";

import { useEffect, useEffectEvent, useRef, type CSSProperties } from "react";
import { continut } from "../continut";
import Artificii, { type ArtificiiApi } from "./Artificii";
import Castel from "./Castel";

const DURATA = 34.8; // secunde

const RAU =
  "M792 614C770 630 830 646 812 668C786 700 640 712 660 768C684 832 920 830 896 906C884 946 760 972 730 1000L930 1000C980 950 1030 900 996 852C952 790 744 800 772 760C790 734 880 714 852 676C836 654 812 634 808 614Z";
const LUMINI: [number, number, number][] = [
  [700, 740, 2], [716, 748, 1.6], [690, 756, 1.8], [640, 792, 2], [626, 780, 1.5], [612, 800, 1.4],
  [952, 820, 2.2], [968, 832, 1.6], [932, 812, 1.4], [1010, 872, 2], [1026, 862, 1.5], [622, 882, 2],
  [600, 900, 1.6], [586, 888, 1.4], [862, 700, 1.5], [880, 690, 1.8], [758, 722, 1.4], [540, 820, 1.8],
  [1082, 760, 1.6], [1100, 772, 2], [460, 760, 1.5], [1180, 820, 1.7], [820, 960, 1.6], [990, 980, 1.8],
];
const PETALE: [number, number, number][] = [
  [752, 842, -20], [770, 852, 30], [790, 838, 70], [826, 848, -40], [846, 836, 10], [812, 858, 50], [736, 832, 80], [862, 852, -60],
];

function Vale() {
  return (
    <svg className="intro__vale" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="v-cer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2457b8" stopOpacity="0" />
          <stop offset=".14" stopColor="#25469a" />
          <stop offset=".42" stopColor="#4c5fae" />
          <stop offset=".54" stopColor="#9a7fc0" />
          <stop offset=".62" stopColor="#ecb3c9" />
        </linearGradient>
        <linearGradient id="v-raza" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".22" />
          <stop offset=".7" stopColor="#fff" stopOpacity=".06" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id="v-moale" x="-20%" y="-5%" width="140%" height="110%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <linearGradient id="v-rau" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3f8ff" />
          <stop offset=".4" stopColor="#b3d3f7" />
          <stop offset="1" stopColor="#5f8fd6" />
        </linearGradient>
        <linearGradient id="v-vale" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#24357a" />
          <stop offset="1" stopColor="#0d1740" />
        </linearGradient>
        <radialGradient id="v-lumina">
          <stop offset="0" stopColor="#ffe2a0" />
          <stop offset="1" stopColor="#ffe2a0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="640" fill="url(#v-cer)" />
      <g fill="url(#v-raza)" filter="url(#v-moale)">
        <polygon points="760,0 800,0 640,600 540,600" />
        <polygon points="822,0 846,0 890,600 810,600" />
        <polygon points="872,0 900,0 1110,600 1020,600" />
        <polygon points="700,0 726,0 400,600 330,600" opacity=".6" />
        <polygon points="932,0 956,0 1310,600 1240,600" opacity=".6" />
      </g>
      <ellipse cx="420" cy="250" rx="220" ry="30" fill="#2c4a9a" opacity=".55" />
      <ellipse cx="1180" cy="230" rx="260" ry="34" fill="#2c4a9a" opacity=".5" />
      <ellipse cx="820" cy="300" rx="180" ry="18" fill="#d99ac4" opacity=".55" />
      <ellipse cx="560" cy="430" rx="260" ry="26" fill="#f4b0cf" opacity=".85" />
      <ellipse cx="610" cy="444" rx="210" ry="14" fill="#a688c8" opacity=".7" />
      <ellipse cx="1080" cy="400" rx="300" ry="22" fill="#f6bdd6" opacity=".8" />
      <ellipse cx="1040" cy="410" rx="220" ry="12" fill="#9f86c9" opacity=".6" />
      <ellipse cx="820" cy="505" rx="360" ry="18" fill="#f2a5c8" opacity=".75" />
      <ellipse cx="300" cy="520" rx="240" ry="16" fill="#e9a3c6" opacity=".7" />
      <ellipse cx="1340" cy="530" rx="260" ry="16" fill="#e9a3c6" opacity=".7" />
      <path d="M0 610Q200 585 400 600T800 595T1200 600T1600 590V700H0Z" fill="#5a6cab" />
      <path d="M0 640Q240 610 520 640T1000 632T1600 628V760H0Z" fill="#33478c" />
      <rect y="660" width="1600" height="340" fill="url(#v-vale)" />
      <path d="M0 700Q300 670 620 712T1240 700T1600 690V1000H0Z" fill="#1d2c69" opacity=".8" />
      <path d={RAU} fill="none" stroke="#bcd9ff" strokeWidth="16" opacity=".22" />
      <path d={RAU} fill="url(#v-rau)" />
      {LUMINI.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#ffd98a" />
      ))}
      {LUMINI.filter((_, i) => i % 3 === 0).map(([x, y], i) => (
        <circle key={`h${i}`} cx={x} cy={y} r={14} fill="url(#v-lumina)" opacity=".5" />
      ))}
      <rect y="588" width="1600" height="60" fill="#f0c6dc" opacity=".16" />
    </svg>
  );
}

function ScenaTeatru() {
  return (
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <pattern id="s-zid" width="80" height="40" patternUnits="userSpaceOnUse">
          <rect width="80" height="40" fill="#2a3450" />
          <rect x="2" y="2" width="36" height="16" rx="2" fill="#56658a" />
          <rect x="42" y="2" width="36" height="16" rx="2" fill="#4d5b7e" />
          <rect x="-18" y="22" width="36" height="16" rx="2" fill="#4f5e82" />
          <rect x="22" y="22" width="36" height="16" rx="2" fill="#5a6a90" />
          <rect x="62" y="22" width="36" height="16" rx="2" fill="#4f5e82" />
        </pattern>
        <pattern id="s-zid2" width="80" height="40" patternUnits="userSpaceOnUse">
          <rect width="80" height="40" fill="#5f84ad" />
          <rect x="2" y="2" width="36" height="16" rx="2" fill="#9fc2e3" />
          <rect x="42" y="2" width="36" height="16" rx="2" fill="#93b7da" />
          <rect x="-18" y="22" width="36" height="16" rx="2" fill="#97bbdd" />
          <rect x="22" y="22" width="36" height="16" rx="2" fill="#a6c8e6" />
          <rect x="62" y="22" width="36" height="16" rx="2" fill="#97bbdd" />
        </pattern>
        <linearGradient id="s-lumina" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2fbff" stopOpacity=".55" />
          <stop offset="1" stopColor="#f2fbff" stopOpacity=".06" />
        </linearGradient>
        <linearGradient id="s-teal" x1="0" x2="1">
          {[0, 0.18, 0.36, 0.54, 0.72, 0.9, 1].map((o, i) => (
            <stop key={o} offset={o} stopColor={i % 2 ? "#1f6f75" : "#3aa8ac"} />
          ))}
        </linearGradient>
        <linearGradient id="s-roz" x1="0" x2="1">
          {[0, 0.18, 0.36, 0.54, 0.72, 0.9, 1].map((o, i) => (
            <stop key={o} offset={o} stopColor={i % 2 ? "#b06a83" : "#eaa6b8"} />
          ))}
        </linearGradient>
        <linearGradient id="s-draperie" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d6466" />
          <stop offset="1" stopColor="#35a09a" />
        </linearGradient>
        <radialGradient id="s-podea" cx=".5" cy=".4" r=".6">
          <stop offset="0" stopColor="#eaf6ff" />
          <stop offset=".6" stopColor="#a6c9e6" />
          <stop offset="1" stopColor="#6f93ba" />
        </radialGradient>
        <radialGradient id="s-vigneta" cx=".5" cy=".5" r=".75">
          <stop offset=".55" stopColor="#0a1230" stopOpacity="0" />
          <stop offset="1" stopColor="#0a1230" stopOpacity=".8" />
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#s-zid)" />
      <path d="M520 900V360Q520 170 800 160Q1080 170 1080 360V900Z" fill="url(#s-zid2)" />
      <path d="M520 900V360Q520 170 800 160Q1080 170 1080 360V900" fill="none" stroke="#252e47" strokeWidth="26" />
      <polygon points="745,150 855,150 1060,840 540,840" fill="url(#s-lumina)" />
      <rect y="860" width="1600" height="140" fill="#3f4f73" />
      <ellipse cx="800" cy="870" rx="470" ry="92" fill="#58739c" />
      <ellipse cx="800" cy="854" rx="460" ry="86" fill="url(#s-podea)" />
      <ellipse cx="800" cy="854" rx="330" ry="58" fill="none" stroke="#c2dbef" strokeWidth="3" opacity=".7" />
      <ellipse cx="800" cy="848" rx="190" ry="34" fill="#fff" opacity=".45" />
      <path d="M420 200H662C644 330 606 470 566 560C606 650 644 760 664 880H420Z" fill="url(#s-teal)" />
      <path d="M1180 200H938C956 330 994 470 1034 560C994 650 956 760 936 880H1180Z" fill="url(#s-roz)" />
      <g fill="#f3c95f">
        <ellipse cx="572" cy="560" rx="22" ry="9" />
        <ellipse cx="1028" cy="560" rx="22" ry="9" />
      </g>
      <path d="M400 130H800V170C720 310 520 310 400 250Z" fill="url(#s-draperie)" />
      <path d="M1200 130H800V170C880 310 1080 310 1200 250Z" fill="url(#s-draperie)" />
      <path d="M400 250C520 310 720 310 800 170C880 310 1080 310 1200 250" fill="none" stroke="#f3c95f" strokeWidth="7" strokeDasharray="1 13" strokeLinecap="round" />
      {[[560, 200], [700, 220], [900, 220], [1040, 200]].map(([x, y]) => (
        <path key={x} d={`M${x} ${y - 12}L${x + 4} ${y - 4}L${x + 12} ${y}L${x + 4} ${y + 4}L${x} ${y + 12}L${x - 4} ${y + 4}L${x - 12} ${y}L${x - 4} ${y - 4}Z`} fill="#f6d27a" />
      ))}
      <path d="M800 818L758 848M800 818L800 852M800 818L844 848" stroke="#5b1f24" strokeWidth="9" strokeLinecap="round" />
      <rect x="790" y="640" width="20" height="182" rx="6" fill="#7a2c31" />
      <polygon points="728,612 872,594 878,636 734,656" fill="#8a3238" />
      <path d="M740 610Q770 590 800 604Q830 588 862 598L866 628Q834 618 802 634Q772 618 744 640Z" fill="#ffc96b" />
      <path d="M802 604V634" stroke="#c98a2e" strokeWidth="2" />
      <path d="M742 636Q754 666 744 694Q774 678 792 650ZM862 626Q854 660 864 686Q834 670 816 646Z" fill="#3c5fb8" />
      <path d="M800 632L797 672L803 665L809 673L806 632Z" fill="#d6455f" />
      {PETALE.map(([x, y, a]) => (
        <ellipse key={`${x}${y}`} cx={x} cy={y} rx="7" ry="4" fill="#f7a1b8" transform={`rotate(${a} ${x} ${y})`} />
      ))}
      <rect width="1600" height="1000" fill="url(#s-vigneta)" />
    </svg>
  );
}

export default function Intro({ seek, onGata }: { seek: number; onGata: () => void }) {
  const artificii = useRef<ArtificiiApi>(null);
  const castel = useRef<HTMLDivElement>(null);
  const gata = useEffectEvent(onGata);

  // momentul (în secunde) la care pornește fiecare animație; seek sare direct la o secundă din intro
  const la = (s: number, dur?: number) =>
    ({ animationDelay: `${s - seek}s`, ...(dur && { "--dur": `${dur}s` }) }) as CSSProperties;

  useEffect(() => {
    const t: number[] = [];
    const cand = (s: number, f: () => void) => t.push(window.setTimeout(f, Math.max(0, s - seek) * 1000));
    cand(11.4, () => artificii.current?.porneste());
    cand(17.5, () => {
      const r = castel.current?.getBoundingClientRect();
      if (r) artificii.current?.arc(r);
    });
    cand(23.4, () => artificii.current?.opreste());
    cand(DURATA, () => gata());
    return () => t.forEach(clearTimeout);
  }, [seek]);

  return (
    <div className="intro">
      <p className="intro__text intro__text--1" style={la(0.8, 4.6)}>
        A Fost Odata <br className="doar-portret" />
        Ca Niciodata
      </p>

      <div className="intro__lume" style={la(4.4)}>
        <div className="intro__nori-trecere" />
        <Vale />
      </div>
      <p className="intro__text intro__text--2" style={la(7.4, 3.8)}>
        O Poveste <br className="doar-portret" />
        De Dragoste
      </p>

      <div className="intro__fundal" style={la(12.4)}>
        <svg className="intro__orizont" viewBox="0 0 1600 40" preserveAspectRatio="none" aria-hidden>
          <path d="M0 40V26Q120 14 260 22T560 18T860 24T1180 16T1600 24V40Z" fill="#2b3f7c" />
        </svg>
      </div>
      <div className="intro__artificii" style={la(24.2)}>
        <Artificii ref={artificii} />
      </div>
      <div className="intro__castel" style={la(24.6)}>
        <div className="intro__castel-intra" ref={castel} style={la(10.4)}>
          <Castel />
        </div>
      </div>
      <div className="intro__nume" style={la(19.4, 5.2)}>
        <p className="intro__nume-text">
          {continut.ea} &amp; {continut.el}
        </p>
        <p className="intro__nume-sub">Povestea noastră</p>
      </div>

      <div className="intro__scena" style={la(27.2)}>
        <ScenaTeatru />
      </div>
      <p className="intro__text intro__text--3" style={la(28.9, 4.6)}>
        Totul A Început <br className="doar-portret" />
        Când...
      </p>
      <div className="intro__sfarsit" style={la(33.4)} />
    </div>
  );
}
