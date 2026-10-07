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

// Școala unde a început totul, desenată (până primim o poză)
function Scoala() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden>
      <defs>
        <linearGradient id="sc-cer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9def6" />
          <stop offset="1" stopColor="#f1f6fc" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" fill="url(#sc-cer)" />
      <g fill="#fff">
        <ellipse cx="24" cy="25" rx="12" ry="5" />
        <ellipse cx="31" cy="21" rx="8" ry="5" />
        <ellipse cx="96" cy="32" rx="10" ry="4" />
      </g>
      <rect x="12.5" y="84" width="3" height="13" fill="#8a6a4a" />
      <circle cx="14" cy="80" r="11" fill="#9cc59a" />
      <rect x="104.5" y="83" width="3" height="14" fill="#8a6a4a" />
      <circle cx="106" cy="78" r="12" fill="#8fbd8e" />
      <rect y="95" width="120" height="25" fill="#cfe3c4" />
      <path d="M53 120L56 97H64L67 120Z" fill="#ece1c9" />
      <rect x="24" y="58" width="72" height="39" fill="#f3d9b1" />
      <rect x="22" y="55" width="76" height="4" fill="#c96b5a" />
      <rect x="45" y="44" width="30" height="53" fill="#f8e4c4" />
      <polygon points="42,46 78,46 60,29" fill="#c96b5a" />
      <circle cx="60" cy="39.5" r="4.6" fill="#fff" stroke="#8a5a3c" strokeWidth="1" />
      <path d="M60 37V39.6H62.2" stroke="#8a5a3c" strokeWidth=".9" fill="none" />
      <g fill="#a8c8ee" stroke="#fff" strokeWidth="1">
        {[29, 37, 77, 85].map((x) =>
          [64, 78].map((y) => <rect key={`${x}-${y}`} x={x} y={y} width="6" height="8" />),
        )}
        <rect x="50" y="51" width="6" height="8" />
        <rect x="64" y="51" width="6" height="8" />
      </g>
      <path d="M55 97V85Q55 79.5 60 79.5Q65 79.5 65 85V97Z" fill="#8a5a3c" />
      <line x1="60" y1="29" x2="60" y2="19" stroke="#8a5a3c" strokeWidth="1" />
      <path d="M60 19.5L68.5 22.2L60 25Z" fill="#e2456f" />
      <path d={INIMA} transform="translate(78 7) scale(.6)" fill="#e2456f" />
      <path d={INIMA} transform="translate(28 38) scale(.36)" fill="#f08bb0" />
      <path d={INIMA} transform="translate(90 50) scale(.3)" fill="#f08bb0" />
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
            <p className="zi-noastra__nota">ziua în care am devenit „noi”</p>
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
                {continut.pozaLoc ? <Image src={continut.pozaLoc} alt={continut.locul} fill sizes="200px" /> : <Scoala />}
              </div>
              <p className="loc__nume">{continut.locul}</p>
              <p className="loc__detaliu">{continut.locDetaliu}</p>
              <Continua className="doar-ingust" onClick={() => setPas(2)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
