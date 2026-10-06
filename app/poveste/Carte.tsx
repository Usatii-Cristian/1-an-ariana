"use client";

import Image from "next/image";
import { useState } from "react";
import { continut } from "../continut";
import { INIMA, Inima } from "./ui";

const LUNI = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"];
const ZILE = ["L", "M", "M", "J", "V", "S", "D"];

function Continua({ onClick, className = "" }: { onClick: () => void; className?: string }) {
  return (
    <button type="button" className={`continua ${className}`} onClick={onClick}>
      Continuă <Inima className="continua__inima" />
    </button>
  );
}

function Calendar() {
  const { an, luna, zi } = continut.inceput;
  const prima = (new Date(an, luna - 1, 1).getDay() + 6) % 7; // săptămâna începe lunea
  const nrZile = new Date(an, luna, 0).getDate();
  const zile = [...Array<number>(prima).fill(0), ...Array.from({ length: nrZile }, (_, i) => i + 1)];
  return (
    <div className="calendar">
      {ZILE.map((z, i) => (
        <span key={`z${i}`} className="calendar__antet">
          {z}
        </span>
      ))}
      {zile.map((d, i) =>
        d === zi ? (
          <span key={i} className="calendar__zi calendar__zi--noi">
            <Inima className="calendar__inima" />
            <b>{d}</b>
          </span>
        ) : (
          <span key={i} className="calendar__zi">
            {d || ""}
          </span>
        ),
      )}
    </div>
  );
}

// Hartă desenată, folosită până primim o poză cu locul
function Harta() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden>
      <rect width="120" height="120" fill="#e4eef9" />
      <circle cx="30" cy="34" r="13" fill="#cddff1" />
      <rect x="76" y="80" width="24" height="17" rx="4" fill="#cddff1" />
      <path d="M-5 80C20 70 30 94 55 85C80 76 88 52 125 58" stroke="#a5c6ec" strokeWidth="9" fill="none" />
      <g stroke="#b3cbe9" strokeWidth="1">
        {[14, 26, 50, 62, 98, 108].map((y) => (
          <line key={y} x1="0" y1={y} x2="120" y2={y - 6} />
        ))}
        {[8, 22, 58, 84, 100, 112].map((x) => (
          <line key={x} x1={x} y1="0" x2={x + 10} y2="120" />
        ))}
      </g>
      <path d="M0 42L120 30M10 120L40 0M70 0L92 120M0 104L120 92" stroke="#7da3d2" strokeWidth="2.4" fill="none" />
      <ellipse cx="60" cy="71" rx="7" ry="2.4" fill="#1d3b6e" opacity=".25" />
      <path d={INIMA} transform="translate(50.5 50) scale(.8)" fill="#e2456f" stroke="#fff" strokeWidth="1.2" />
    </svg>
  );
}

export default function Carte({ onGata }: { onGata: () => void }) {
  const [pas, setPas] = useState(0); // 0: prima pagină, 1: pagina întoarsă, 2: calendarul (pe telefon)
  const [aparuta, setAparuta] = useState(false);
  const { an, luna } = continut.inceput;

  return (
    <div className="carte-scena">
      <div className={`carte${aparuta ? "" : " carte--apare"}`} data-pas={pas} onAnimationEnd={(e) => e.target === e.currentTarget && setAparuta(true)}>
        <div className="pagina pagina--stanga">
          <div className="pagina__continut coperta">
            <span className="coperta__ornament">❦</span>
            <p className="coperta__pentru">pentru</p>
            <p className="coperta__nume">{continut.ea}</p>
            <p className="coperta__sub">povestea noastră</p>
            <Inima className="coperta__inima" />
          </div>
        </div>

        <div className="pagina pagina--dreapta">
          <div className="pagina__continut zi-noastra">
            <p className="zi-noastra__luna">{LUNI[luna - 1]}</p>
            <p className="zi-noastra__an">{an}</p>
            <Calendar />
            <p className="zi-noastra__nota">ziua în care a început totul</p>
            <Continua onClick={onGata} />
          </div>
        </div>

        <div className="foaie">
          <div className="pagina pagina--fata">
            <div className="pagina__continut vreau">
              <p>
                Vreau
                <br />
                să îți reamintesc ce
                <br />
                poveste frumoasă avem...
              </p>
              <Continua onClick={() => setPas(1)} />
            </div>
          </div>
          <div className="pagina pagina--spate">
            <div className="pagina__continut loc">
              <p className="loc__titlu">
                Unde a început
                <br />
                <span>povestea</span> noastră
              </p>
              <div className="loc__cerc">
                {continut.pozaLoc ? <Image src={continut.pozaLoc} alt={continut.locul} fill sizes="200px" /> : <Harta />}
              </div>
              <p className="loc__nume">{continut.locul}</p>
              <Continua className="doar-ingust" onClick={() => setPas(2)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
