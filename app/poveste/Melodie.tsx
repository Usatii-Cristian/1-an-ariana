"use client";

import Image from "next/image";
import { useEffect, useState, type RefObject } from "react";
import { continut } from "../continut";
import { BtnInapoi, Inima } from "./ui";

const ceas = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

// „Melodia noastră” pe un vinil; Poveste o pornește de la început când se deschide cufărul
export default function Melodie({ audio, canta, onComuta, onCauta, onInapoi }: {
  audio: RefObject<HTMLAudioElement | null>;
  canta: boolean;
  onComuta: () => void;
  onCauta: (fractie: number) => void;
  onInapoi: () => void;
}) {
  const { titlu, artist, poza } = continut.melodie;
  const [timp, setTimp] = useState({ t: 0, d: 0 });

  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    const tic = () => setTimp({ t: a.currentTime, d: a.duration || 0 });
    a.addEventListener("timeupdate", tic);
    a.addEventListener("durationchange", tic);
    return () => {
      a.removeEventListener("timeupdate", tic);
      a.removeEventListener("durationchange", tic);
    };
  }, [audio]);

  const cauta = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    onCauta(Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1));
  };

  return (
    <div className="melodie">
      <h2 className="titlu-mana melodie__titlu">De fiecare dată când o aud, mă gândesc la tine!</h2>

      <div className={`vinil${canta ? " vinil--canta" : ""}`}>
        <div className="vinil__disc">
          <div className="vinil__eticheta">
            {poza ? <Image src={poza} alt="Noi doi" fill sizes="160px" /> : <Inima className="vinil__inima" />}
          </div>
        </div>
        <svg className="vinil__brat" viewBox="0 0 60 200" aria-hidden>
          <circle cx="30" cy="22" r="18" fill="#c9ced8" stroke="#8d93a1" strokeWidth="3" />
          <circle cx="30" cy="22" r="7" fill="#6d7383" />
          <path d="M30 22L34 150L20 178" fill="none" stroke="#dfe3ea" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="8" y="170" width="22" height="26" rx="4" fill="#2b2d36" transform="rotate(28 19 183)" />
        </svg>
      </div>

      <div className="melodie__info">
        <p className="melodie__piesa">{titlu}</p>
        <p className="melodie__artist">{artist}</p>
      </div>

      <div className="melodie__progres" onPointerDown={cauta} role="presentation">
        <span style={{ width: `${timp.d ? (timp.t / timp.d) * 100 : 0}%` }} />
      </div>
      <div className="melodie__timp">
        <span>{ceas(timp.t)}</span>
        <span>{ceas(timp.d)}</span>
      </div>

      <button type="button" className="melodie__play" onClick={onComuta} aria-label={canta ? "Pauză" : "Redă"}>
        <svg viewBox="0 0 24 24" aria-hidden>
          {canta ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" /> : <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />}
        </svg>
      </button>

      <BtnInapoi onClick={onInapoi} />
    </div>
  );
}
