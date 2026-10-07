"use client";

import { useState, type CSSProperties } from "react";
import { continut } from "../continut";
import { BtnInapoi, INIMA } from "./ui";

const SIGILIU = (() => {
  const p = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    const r = i % 2 ? 15 : 13.4;
    return `${(141 + Math.cos(a) * r).toFixed(1)} ${(52 + Math.sin(a) * r).toFixed(1)}`;
  });
  return `M${p.join("L")}Z`;
})();

const LICURICI = Array.from({ length: 12 }, (_, i) => ({
  x: (i * 37 + 11) % 96,
  y: 30 + ((i * 53) % 60),
  d: (i * 0.7) % 6,
  t: 6 + (i % 4) * 1.5,
}));

function Porumbel() {
  return (
    <svg className="porumbel" viewBox="0 0 220 170" aria-hidden>
      <defs>
        <linearGradient id="pm-corp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d7dfeb" />
        </linearGradient>
      </defs>
      <path className="porumbel__aripa porumbel__aripa--spate" d="M120 94C108 64 86 34 56 8C68 30 72 44 74 58C78 72 92 86 104 98Z" fill="#dfe6f0" />
      <path d="M46 118L6 128L13 137L4 146L54 128Z" fill="#e9eef5" />
      <path d="M40 112C62 96 96 88 128 92C146 82 162 80 172 90C180 97 176 106 166 108C152 118 136 124 116 126C92 130 64 128 46 122C34 124 22 130 8 136C16 124 24 116 40 112Z" fill="url(#pm-corp)" />
      <circle cx="166" cy="92" r="13" fill="#fff" />
      <path d="M178 91L191 95.5L178 99Z" fill="#f2a07b" />
      <circle cx="170" cy="89" r="2.3" fill="#2b2b3a" />
      <path d="M118 124L114 134M130 124L128 134" stroke="#e98a8a" strokeWidth="3" strokeLinecap="round" />
      <path className="porumbel__aripa porumbel__aripa--fata" d="M110 100C118 70 128 40 152 6C152 30 148 46 158 52C152 58 148 66 152 72C144 76 140 86 142 98Z" fill="#fff" />
      <path className="porumbel__aripa porumbel__aripa--fata" d="M130 60L148 30M128 72L152 52M130 86L150 72" stroke="#d5deea" strokeWidth="2" fill="none" />
    </svg>
  );
}

function Sul() {
  return (
    <svg className="sul" viewBox="0 0 260 96" aria-hidden>
      <defs>
        <linearGradient id="sul-hartie" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbe9c4" />
          <stop offset=".35" stopColor="#ecc68c" />
          <stop offset=".75" stopColor="#c99556" />
          <stop offset="1" stopColor="#efd09b" />
        </linearGradient>
        <radialGradient id="sul-sigiliu" cx=".4" cy=".35" r=".7">
          <stop offset="0" stopColor="#f0444c" />
          <stop offset="1" stopColor="#8e0b14" />
        </radialGradient>
      </defs>
      <rect x="20" y="22" width="220" height="50" rx="10" fill="url(#sul-hartie)" />
      <ellipse cx="22" cy="47" rx="10" ry="25" fill="#f3d9a6" stroke="#c99556" strokeWidth="1.5" />
      <path d="M22 47m-5 0a5 11 0 1 0 10 0a3.5 7 0 1 0-7 0" fill="none" stroke="#b9844a" strokeWidth="1.5" />
      <ellipse cx="238" cy="47" rx="10" ry="25" fill="#e8c48a" stroke="#c99556" strokeWidth="1.5" />
      <path d="M136 22V72M146 22V72" stroke="#b3121b" strokeWidth="3" />
      <path d="M141 64C138 78 130 84 122 92M141 64C146 78 156 82 162 92" stroke="#b3121b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <g className="sul__sigiliu">
        <path d={SIGILIU} fill="url(#sul-sigiliu)" />
        <circle cx="141" cy="52" r="9.5" fill="none" stroke="#7d0a12" strokeWidth="1.2" opacity=".6" />
        <path d={INIMA} transform="translate(134.4 45.6) scale(.55)" fill="#7d0a12" opacity=".75" />
      </g>
    </svg>
  );
}

function PorumbeiInima() {
  const porumbel = (
    <>
      <path d="M84 100C70 70 46 40 14 22C26 40 30 52 28 62C38 64 40 70 38 78C48 80 52 88 52 96C62 96 70 102 76 108Z" />
      <path d="M112 96C104 84 92 86 86 92C70 92 52 100 40 114C30 126 20 136 6 146C26 146 42 140 54 134C70 132 88 124 98 112C104 106 110 102 112 96Z" />
      <circle cx="101" cy="92" r="10" />
    </>
  );
  return (
    <svg className="porumbei" viewBox="0 0 240 170" aria-hidden>
      <defs>
        <radialGradient id="pi-roz">
          <stop offset="0" stopColor="#ff9fcf" stopOpacity=".95" />
          <stop offset="1" stopColor="#ff6fae" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="porumbei__aura">
        <path d={INIMA} transform="translate(48 2) scale(6)" fill="url(#pi-roz)" />
      </g>
      <g fill="#fff">
        {porumbel}
        <g transform="translate(240 0) scale(-1 1)">{porumbel}</g>
      </g>
      <path d="M110 92L120 95.5L110 99ZM130 92L120 95.5L130 99Z" fill="#f2a07b" />
      <circle cx="104" cy="89" r="1.8" fill="#2b2b3a" />
      <circle cx="136" cy="89" r="1.8" fill="#2b2b3a" />
      <g className="porumbei__inima">
        <path d={INIMA} transform="translate(109 58) scale(.92)" fill="#ff5c9a" />
      </g>
    </svg>
  );
}

export default function Scrisoare({ onInapoi }: { onInapoi: () => void }) {
  const [stare, setStare] = useState<"sigilata" | "se-deschide" | "deschisa">("sigilata");
  const s = continut.scrisoare;

  const deschide = () => {
    if (stare !== "sigilata") return;
    setStare("se-deschide");
    window.setTimeout(() => setStare("deschisa"), 1300);
  };

  let p = 0;
  const intarziere = () => ({ animationDelay: `${1.1 + p++ * 0.16}s` }) as CSSProperties;

  return (
    <div className={`padure padure--${stare}`}>
      <div className="padure__foto" />
      <div className="padure__raze" />
      {LICURICI.map((l, i) => (
        <span
          key={i}
          className="licurici"
          style={{ left: `${l.x}%`, top: `${l.y}%`, animationDelay: `-${l.d}s`, animationDuration: `${l.t}s` }}
        />
      ))}

      {stare !== "deschisa" ? (
        <>
          <div className="panglica">O scrisoare fermecată te așteaptă</div>
          <button type="button" className="porumbel-grup" onClick={deschide} aria-label="Deschide scrisoarea">
            <span className="porumbel-plutire">
              <Porumbel />
              <Sul />
            </span>
          </button>
          <p className="padure__eticheta">Atinge sigiliul și deschide scrisoarea fermecată...</p>
        </>
      ) : (
        <div className="scrisoare">
          <PorumbeiInima />
          <div className="pergament">
            <div className="pergament__sul" />
            <div className="pergament__hartie">
              <div className="pergament__text">
                <p className="pergament__salut" style={intarziere()}>
                  {s.salut}
                </p>
                {s.paragrafe.map((t) => (
                  <p key={t} style={intarziere()}>
                    {t}
                  </p>
                ))}
                <p className="pergament__evidentiat" style={intarziere()}>
                  {s.evidentiat}
                </p>
                {s.final.map((t) => (
                  <p key={t} className="pergament__final" style={intarziere()}>
                    {t}
                  </p>
                ))}
                <p className="pergament__semnatura" style={intarziere()}>
                  {s.semnatura}
                  <span>{s.nume}</span>
                </p>
              </div>
            </div>
            <div className="pergament__sul pergament__sul--jos" />
          </div>
          <BtnInapoi onClick={onInapoi} />
        </div>
      )}
    </div>
  );
}
