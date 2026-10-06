"use client";

import { useEffect, useRef, useState } from "react";
import { continut } from "../continut";
import { BtnInapoi, Polaroid, TitluScris } from "./ui";

function Banner({ text }: { text: string }) {
  return (
    <div className="banner">
      <svg viewBox="0 0 400 130" className="banner__panglica" aria-hidden>
        <defs>
          <linearGradient id="bn-hartie" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fbefd2" />
            <stop offset="1" stopColor="#e9cf9c" />
          </linearGradient>
        </defs>
        <path d="M10 112L26 98L10 84L40 82V102Z" fill="#c9a46a" />
        <path d="M390 112L374 98L390 84L360 82V102Z" fill="#c9a46a" />
        <path d="M30 104Q200 18 370 104L370 74Q200 -12 30 74Z" fill="url(#bn-hartie)" stroke="#c9a46a" strokeWidth="1.5" />
      </svg>
      <svg viewBox="0 0 400 130" className="banner__text" aria-label={text} role="img">
        <defs>
          <path id="bn-arc" d="M30 98Q200 8 370 98" />
        </defs>
        <text fill="#6b4718" fontSize="15.5" fontWeight="700" letterSpacing="1">
          <textPath href="#bn-arc" startOffset="50%" textAnchor="middle">
            {text.toUpperCase()}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

function Stalp() {
  return (
    <svg viewBox="0 0 300 380" aria-hidden>
      <defs>
        <linearGradient id="st-lemn" x1="0" x2="1">
          <stop offset="0" stopColor="#6b3f1a" />
          <stop offset=".45" stopColor="#9a6531" />
          <stop offset="1" stopColor="#5e3514" />
        </linearGradient>
        <linearGradient id="st-scandura" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf0cf" />
          <stop offset="1" stopColor="#e9d29c" />
        </linearGradient>
      </defs>
      <rect x="140" y="36" width="20" height="344" rx="5" fill="url(#st-lemn)" />
      <path d="M146 60V360M153 90V340" stroke="#4d2a0e" strokeWidth="1.2" opacity=".4" />
      <g className="stalp__semn">
        <path d="M52 76H232L266 112L232 148H52Z" fill="url(#st-scandura)" stroke="#b48a4a" strokeWidth="3" strokeLinejoin="round" />
        <text x="158" y="106" textAnchor="middle" fontSize="21" fontWeight="700" fill="#6b4718">TĂRÂMUL</text>
        <text x="158" y="132" textAnchor="middle" fontSize="21" fontWeight="700" fill="#6b4718">SURPRIZELOR</text>
      </g>
      <path d="M248 186H70L36 220L70 254H248Z" fill="url(#st-scandura)" stroke="#b48a4a" strokeWidth="3" strokeLinejoin="round" />
      <text x="146" y="228" textAnchor="middle" fontSize="20" fontWeight="700" fill="#6b4718">BINE AI VENIT!</text>
    </svg>
  );
}

function Galerie({ onInapoi }: { onInapoi: () => void }) {
  const banda = useRef<HTMLDivElement>(null);

  // Pozele se derulează singure; dacă ea dă swipe, așteptăm puțin înainte să continuăm
  useEffect(() => {
    const el = banda.current!;
    let pauza = 0;
    const atinge = () => (pauza = Date.now() + 7000);
    el.addEventListener("pointerdown", atinge);
    el.addEventListener("wheel", atinge, { passive: true });
    const id = window.setInterval(() => {
      if (Date.now() < pauza) return;
      const card = el.firstElementChild as HTMLElement | null;
      if (!card) return;
      const pas = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
      const max = el.scrollWidth - el.clientWidth;
      el.scrollTo({ left: el.scrollLeft + pas > max + 4 ? 0 : el.scrollLeft + pas, behavior: "smooth" });
    }, 3600);
    return () => {
      window.clearInterval(id);
      el.removeEventListener("pointerdown", atinge);
      el.removeEventListener("wheel", atinge);
    };
  }, []);

  return (
    <div className="galerie">
      <TitluScris text="Amintirile noastre..." className="titlu-mana galerie__titlu" />
      <div className="galerie__banda" ref={banda}>
        {continut.amintiri.map((a, i) => (
          <Polaroid key={i} index={i} poza={a.poza} text={a.text} className="galerie__poza" sizes="(max-width: 700px) 72vw, 300px" />
        ))}
      </div>
      <p className="galerie__hint">glisează pentru mai multe ↔</p>
      <BtnInapoi onClick={onInapoi} />
    </div>
  );
}

export default function Amintiri({ ultima, onInapoi }: { ultima: boolean; onInapoi: () => void }) {
  const [etapa, setEtapa] = useState<"indicator" | "lumina" | "galerie">("indicator");

  if (etapa === "galerie") return <Galerie onInapoi={onInapoi} />;

  const intra = () => {
    if (etapa !== "indicator") return;
    setEtapa("lumina");
    window.setTimeout(() => setEtapa("galerie"), 900);
  };

  return (
    <div className={`indicator${etapa === "lumina" ? " indicator--lumina" : ""}`}>
      <div className="indicator__nori" />
      <Banner text={ultima ? "Ultima comoară te așteaptă" : "O nouă comoară te așteaptă"} />
      <button type="button" className="indicator__stalp" onClick={intra} aria-label="Intră pe Tărâmul surprizelor">
        <Stalp />
        <span className="indicator__hint" aria-hidden>
          <span className="doar-tactil">ATINGE</span>
          <span className="doar-mouse">CLICK</span> 👉
        </span>
      </button>
    </div>
  );
}
