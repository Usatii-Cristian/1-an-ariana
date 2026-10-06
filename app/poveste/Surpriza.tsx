"use client";

import { useState, type CSSProperties } from "react";
import { Steluta } from "./ui";

const MESAJE_NU = ["Nu", "Ești sigură? 🥺", "Mai gândește-te...", "Nu cred 😌", "Hai, apasă „Da” ❤️", "Nu te las 😄"];

// Lampioane aurii în valuri, de o parte și de alta a cadoului
const LAMPIOANE = Array.from({ length: 12 }, (_, i) => ({
  x: 1.5 + i * 2.9,
  y: 50 + Math.sin(i * 0.7) * 9,
  m: 0.6 + 0.65 * Math.abs(Math.sin(i * 1.3)),
  d: (i * 0.37) % 3,
}));

function Cadou() {
  return (
    <svg className="cadou" viewBox="0 0 160 160" aria-hidden>
      <g fill="none" stroke="#ffc22e" strokeWidth="5" strokeLinecap="round" className="cadou__bucle">
        <path d="M80 74C76 56 58 50 54 38C51 29 61 24 66 32" />
        <path d="M80 74C80 54 82 42 76 30C72 22 84 18 86 26" />
        <path d="M80 74C88 56 104 54 106 42C108 32 96 30 96 38" />
        <path d="M78 76C68 68 50 70 42 64C36 59 42 52 48 56" />
        <path d="M82 76C94 70 112 72 120 64C126 58 118 52 113 57" />
      </g>
      <g fill="#ffd34d">
        <path d="M60 16l2.5 5 5 2.5-5 2.5-2.5 5-2.5-5-5-2.5 5-2.5z" />
        <path d="M104 18l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" />
        <circle cx="40" cy="44" r="2.2" />
        <circle cx="124" cy="46" r="2.2" />
        <circle cx="90" cy="12" r="1.8" />
      </g>
      <polygon points="80,64 124,80 80,96 36,80" fill="#7fb0e6" />
      <polygon points="36,80 80,96 80,148 36,130" fill="#b9d8f8" />
      <polygon points="80,96 124,80 124,130 80,148" fill="#90bcec" />
      <polyline points="36,80 80,64 124,80 80,96 36,80 36,130 80,148 124,130 124,80" fill="none" stroke="#eef6ff" strokeWidth="2.2" strokeLinejoin="round" opacity=".8" />
      <line x1="80" y1="96" x2="80" y2="148" stroke="#eef6ff" strokeWidth="2" opacity=".7" />
    </svg>
  );
}

function Bagheta() {
  return (
    <svg className="bagheta" viewBox="0 0 90 70" aria-hidden>
      <line x1="4" y1="6" x2="55" y2="37" stroke="#fff3c8" strokeWidth="3" strokeLinecap="round" />
      <path d="M60 31L62.23 36.93L68.56 37.22L63.61 41.17L65.29 47.28L60 43.8L54.71 47.28L56.39 41.17L51.44 37.22L57.77 36.93Z" fill="#ffd23f" />
      {[[74, 26, 7], [78, 46, 5], [66, 58, 5], [48, 52, 4], [70, 14, 4]].map(([x, y, s], i) => (
        <path key={i} className="bagheta__scanteie" style={{ animationDelay: `${i * 0.35}s` }} d={`M${x} ${y - s}L${x + s * 0.3} ${y - s * 0.3}L${x + s} ${y}L${x + s * 0.3} ${y + s * 0.3}L${x} ${y + s}L${x - s * 0.3} ${y + s * 0.3}L${x - s} ${y}L${x - s * 0.3} ${y - s * 0.3}Z`} fill="#fff6c8" />
      ))}
    </svg>
  );
}

export default function Surpriza({ onDa }: { onDa: () => void }) {
  const [da, setDa] = useState(false);
  const [incercari, setIncercari] = useState(0);
  const [loc, setLoc] = useState<{ x: number; y: number } | null>(null);

  const fugi = () => {
    setIncercari((n) => n + 1);
    setLoc({ x: 8 + Math.random() * 56, y: 14 + Math.random() * 66 });
  };

  const apasaDa = () => {
    if (da) return;
    setDa(true);
    window.setTimeout(onDa, 2300);
  };

  return (
    <div className={`surpriza${da ? " surpriza--da" : ""}`}>
      <h2 className="titlu-script surpriza__titlu">Pregătită pentru o surpriză?</h2>

      <div className="surpriza__centru">
        {[0, 1].map((parte) =>
          LAMPIOANE.map((l, i) => (
            <span
              key={`${parte}-${i}`}
              className="lampion"
              style={{ [parte ? "right" : "left"]: `${l.x}%`, top: `${l.y}%`, "--m": l.m, animationDelay: `-${l.d}s` } as CSSProperties}
            />
          )),
        )}
        <div className="surpriza__grup">
          <Bagheta />
          <Cadou />
          <svg className="surpriza__vartej" viewBox="0 0 200 200" aria-hidden>
            <defs>
              <linearGradient id="vartej-aur" x1="0" x2="1">
                <stop offset="0" stopColor="#fff6c8" />
                <stop offset=".5" stopColor="#ffc93c" />
                <stop offset="1" stopColor="#fff2b0" />
              </linearGradient>
            </defs>
            <path pathLength={1} d="M18 160C46 196 166 188 176 132C186 80 116 58 76 82C38 104 62 156 112 144C154 134 172 66 148 18" fill="none" stroke="#ffe08a" strokeWidth="12" opacity=".35" strokeLinecap="round" />
            <path pathLength={1} d="M18 160C46 196 166 188 176 132C186 80 116 58 76 82C38 104 62 156 112 144C154 134 172 66 148 18" fill="none" stroke="url(#vartej-aur)" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
          {da &&
            Array.from({ length: 14 }, (_, i) => (
              <Steluta
                key={i}
                className="surpriza__scanteie"
                style={{ "--a": `${i * 25.7}deg`, animationDelay: `${0.9 + (i % 5) * 0.12}s` } as CSSProperties}
              />
            ))}
        </div>
      </div>

      <div className="surpriza__butoane">
        <button type="button" className="btn-poveste" onClick={apasaDa}>
          Da
        </button>
        <button
          type="button"
          className={`btn-poveste${loc ? " btn-poveste--fuge" : ""}${incercari ? " btn-poveste--mesaj" : ""}`}
          style={loc ? { left: `${loc.x}%`, top: `${loc.y}%` } : undefined}
          onClick={fugi}
          onPointerEnter={(e) => e.pointerType === "mouse" && fugi()}
        >
          {MESAJE_NU[Math.min(incercari, MESAJE_NU.length - 1)]}
        </button>
      </div>
    </div>
  );
}
