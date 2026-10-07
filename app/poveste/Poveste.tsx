"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { continut } from "../continut";
import Amintiri from "./Amintiri";
import Carte from "./Carte";
import Cufere from "./Cufere";
import Final from "./Final";
import Intro from "./Intro";
import Melodie from "./Melodie";
import Scrisoare from "./Scrisoare";
import Surpriza from "./Surpriza";
import { Steluta } from "./ui";

const SCENE = ["intro", "surpriza", "carte", "cufere", "scrisoare", "amintiri", "melodie", "final"] as const;
type Scena = (typeof SCENE)[number];
const CUFERE: Scena[] = ["scrisoare", "amintiri", "melodie"];

// Stele generate determinist, ca serverul și telefonul să deseneze același cer
function aleator(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const r = aleator(14);
const STELE = Array.from({ length: 64 }, () => ({
  x: r() * 100,
  y: r() * 70,
  s: r() < 0.85 ? 1 + r() * 1.2 : 2 + r() * 0.8,
  d: r() * 6,
  o: 0.35 + r() * 0.65,
}));

function Cer() {
  return (
    <div className="cer" aria-hidden>
      <div className="cer__nori" />
      <div className="cer__dungi" />
      {STELE.map((s, i) => (
        <span
          key={i}
          className="cer__stea"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, opacity: s.o, animationDelay: `${s.d}s` }}
        />
      ))}
      <Steluta className="cer__luceafar" />
    </div>
  );
}

export default function Poveste() {
  const [scena, setScena] = useState<Scena>("intro");
  const [iese, setIese] = useState(false);
  const [seek, setSeek] = useState(0);
  const [deschise, setDeschise] = useState<number[]>([]);
  const [pornit, setPornit] = useState(false);
  const [sunet, setSunet] = useState(true);
  const audio = useRef<HTMLAudioElement>(null);
  const tranzitie = useRef(0);
  const trezie = useRef<WakeLockSentinel | null>(null);

  const mergi = useCallback((s: Scena) => {
    setIese(true);
    window.clearTimeout(tranzitie.current);
    tranzitie.current = window.setTimeout(() => {
      setScena(s);
      setIese(false);
    }, 650);
  }, []);

  // Ecranul iPhone-ului nu are voie să se stingă în mijlocul poveștii
  const tineEcranulAprins = useCallback(() => {
    navigator.wakeLock
      ?.request("screen")
      .then((w) => (trezie.current = w))
      .catch(() => {});
  }, []);

  // Pentru previzualizare: ?s=cufere sau ?s=intro&t=17
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const s = q.get("s") as Scena | null;
    if (!s || !SCENE.includes(s)) return;
    const id = window.setTimeout(() => {
      setSeek(Number(q.get("t")) || 0);
      setScena(s);
    });
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!pornit) return;
    const p = matchMedia("(orientation: portrait)").matches ? "p" : "l";
    const poze = [`/img/padure-${p}.webp`, `/img/nori-${p}.webp`];
    poze.forEach((src) => (new Image().src = src));
    const reia = () => document.visibilityState === "visible" && tineEcranulAprins();
    document.addEventListener("visibilitychange", reia);
    return () => document.removeEventListener("visibilitychange", reia);
  }, [pornit, tineEcranulAprins]);

  // Muzica de fundal tace cât timp rulează filmul de la început și melodia de pe YouTube
  useEffect(() => {
    const a = audio.current;
    if (!a || !pornit) return;
    if (sunet && scena !== "intro" && scena !== "melodie") a.play().catch(() => {});
    else a.pause();
  }, [scena, sunet, pornit]);

  // Atingerea de pe ecranul de start: ținem ecranul aprins și „deblocăm” muzica pe iPhone
  const laPornire = () => {
    setPornit(true);
    tineEcranulAprins();
    const a = audio.current;
    if (a) {
      a.play().catch(() => {});
      a.pause();
    }
  };

  const deschideCufar = (i: number) => {
    setDeschise((d) => (d.includes(i) ? d : [...d, i]));
    mergi(CUFERE[i]);
  };

  const laCufere = () => mergi("cufere");

  return (
    <main className="poveste">
      <Cer />
      <div key={scena} className={iese ? "scena scena--iese" : "scena"}>
        {scena === "intro" && <Intro seek={seek} onStart={laPornire} onGata={() => mergi("surpriza")} />}
        {scena === "surpriza" && <Surpriza onDa={() => mergi("carte")} />}
        {scena === "carte" && <Carte onGata={laCufere} />}
        {scena === "cufere" && <Cufere deschise={deschise} onDeschide={deschideCufar} onFinal={() => mergi("final")} />}
        {scena === "scrisoare" && <Scrisoare onInapoi={laCufere} />}
        {scena === "amintiri" && <Amintiri ultima={deschise.length === 3} onInapoi={laCufere} />}
        {scena === "melodie" && <Melodie onInapoi={laCufere} />}
        {scena === "final" && <Final onRevezi={() => mergi("intro")} />}
      </div>

      {continut.muzica && (
        <>
          <audio ref={audio} src={continut.muzica} loop preload="auto" />
          {pornit && (
            <button
              type="button"
              className="btn-sunet"
              onClick={() => setSunet((s) => !s)}
              aria-label={sunet ? "Oprește muzica" : "Pornește muzica"}
            >
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M3 9v6h4l5 5V4L7 9H3z" fill="currentColor" />
                {sunet ? (
                  <path d="M16 8.5a5 5 0 0 1 0 7M18.8 5.7a9 9 0 0 1 0 12.6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                ) : (
                  <path d="M16 9l6 6m0-6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          )}
        </>
      )}
    </main>
  );
}
