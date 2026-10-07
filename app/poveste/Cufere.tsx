"use client";

import { useState, type CSSProperties } from "react";
import { Inima, Steluta } from "./ui";

const NUME = ["Cufărul cu scrisoarea", "Cufărul cu amintiri", "Cufărul cu melodia noastră"];

// Gradientele cuferelor, definite o singură dată pentru toate trei
function CufarDefs() {
  return (
    <svg className="defs-ascunse" aria-hidden>
      <defs>
        <linearGradient id="cf-lemn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9782b" />
          <stop offset="1" stopColor="#9a4512" />
        </linearGradient>
        <linearGradient id="cf-lemn-umbra" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a8531a" />
          <stop offset="1" stopColor="#6e2f0b" />
        </linearGradient>
        <linearGradient id="cf-aur" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff09a" />
          <stop offset=".5" stopColor="#ffc928" />
          <stop offset="1" stopColor="#e89a00" />
        </linearGradient>
        <radialGradient id="cf-lumina" cx=".5" cy=".7" r=".6">
          <stop offset="0" stopColor="#fffbe0" />
          <stop offset=".5" stopColor="#ffd75a" stopOpacity=".9" />
          <stop offset="1" stopColor="#ffb300" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function Cufar() {
  return (
    <svg viewBox="0 0 140 124" className="cufar__svg" aria-hidden>
      <ellipse cx="70" cy="116" rx="54" ry="6" fill="#000a30" opacity=".3" />
      <ellipse className="cufar__lumina" cx="64" cy="50" rx="58" ry="40" fill="url(#cf-lumina)" />

      <path d="M112 58L128 50V100L112 110Z" fill="url(#cf-lemn-umbra)" />
      <path d="M112 58L128 50V100L112 110Z" fill="none" stroke="#e8a000" strokeWidth="3" strokeLinejoin="round" />
      <rect x="14" y="58" width="98" height="52" fill="url(#cf-lemn)" />
      <path d="M14 75H112M14 92H112" stroke="#6e2f0b" strokeWidth="2" opacity=".45" />
      <g fill="url(#cf-aur)" stroke="#b77200" strokeWidth="1.4">
        <rect x="11" y="55" width="104" height="8" rx="2.5" />
        <rect x="11" y="104" width="104" height="8" rx="2.5" />
        <rect x="11" y="55" width="10" height="57" rx="2.5" />
        <rect x="105" y="55" width="10" height="57" rx="2.5" />
        <rect x="53" y="66" width="20" height="25" rx="5" />
      </g>
      <circle cx="63" cy="75" r="3" fill="#5a2a00" />
      <path d="M61.4 76.5L60.6 84H65.4L64.6 76.5Z" fill="#5a2a00" />

      <g className="cufar__capac">
        <path d="M112 57V42C112 30 118 24 128 22V50Z" fill="url(#cf-lemn-umbra)" stroke="#e8a000" strokeWidth="3" strokeLinejoin="round" />
        <path d="M14 57V42C14 18 112 18 112 42V57Z" fill="url(#cf-lemn)" />
        <path d="M14 42C14 26 64 22 96 24C106 25 112 32 112 42" fill="none" stroke="#f6a35a" strokeWidth="3" opacity=".6" />
        <g fill="url(#cf-aur)" stroke="#b77200" strokeWidth="1.4">
          <path d="M11 58V42C11 30 16 24 22 22V58Z" />
          <path d="M104 58V26C110 30 115 35 115 42V58Z" />
          <rect x="11" y="50" width="104" height="8" rx="2.5" />
        </g>
        <path d="M30 30C46 24 70 22 92 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity=".35" />
      </g>
    </svg>
  );
}

export default function Cufere({ deschise, onAtinge, onDeschide, onFinal }: {
  deschise: number[];
  onAtinge: (i: number) => void; // chiar în clipa atingerii (pentru sunet)
  onDeschide: (i: number) => void; // după ce s-a deschis capacul
  onFinal: () => void;
}) {
  const [seDeschide, setSeDeschide] = useState<number | null>(null);
  const toate = deschise.length === 3;

  const deschide = (i: number) => {
    if (seDeschide !== null) return;
    setSeDeschide(i);
    onAtinge(i);
    window.setTimeout(() => onDeschide(i), 1200);
  };

  return (
    <div className="cufere">
      <CufarDefs />
      <h2 className="titlu-script cufere__titlu">
        În aceste cufere se află cele mai prețioase <span className="text-roz">momente</span> ale noastre
      </h2>

      <div className="cufere__rand">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            type="button"
            aria-label={NUME[i]}
            className={`cufar${deschise.includes(i) || seDeschide === i ? " cufar--deschis" : ""}`}
            onClick={() => deschide(i)}
          >
            <Cufar />
            {seDeschide === i &&
              Array.from({ length: 12 }, (_, j) => (
                <Steluta
                  key={j}
                  className="cufar__scanteie"
                  style={{ "--x": `${(j % 6) * 22 - 55}px`, "--d": `${0.05 * j}s`, "--s": `${10 + (j % 4) * 5}px` } as CSSProperties}
                />
              ))}
          </button>
        ))}
      </div>

      {toate ? (
        <button type="button" className="cufere__final" onClick={onFinal}>
          <Inima className="cufere__final-inima" />
          Ultima surpriză
        </button>
      ) : (
        <p className="cufere__hint">{deschise.length ? "Mai sunt comori de descoperit ✨" : "Atinge un cufăr ✨"}</p>
      )}
    </div>
  );
}
