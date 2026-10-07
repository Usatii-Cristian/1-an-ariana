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

type Pista = "fundal" | "piesa";
type Sursa = Pista | null;
// Pe iPhone volumul unui <audio> nu se poate schimba, așa că tranzițiile trec prin Web Audio
type Mixer = { ctx: AudioContext } & Partial<Record<Pista, GainNode>>;

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
  const [sunet, setSunet] = useState(true); // butonul general de sunet (sus, dreapta)
  const [vinilPauza, setVinilPauza] = useState(false); // pauza de pe vinil oprește doar „melodia noastră”
  const [sursa, setSursa] = useState<Sursa>(null); // ce piesă se aude acum
  const fundal = useRef<HTMLAudioElement>(null); // muzica de fundal
  const piesa = useRef<HTMLAudioElement>(null); // „melodia noastră” din cufăr
  const mixer = useRef<Mixer | null>(null);
  const opriri = useRef<Partial<Record<Pista, number>>>({});
  const activ = useRef<HTMLAudioElement | null>(null);
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

  // După film aducem din timp fundalurile cuferelor — nu mai devreme, ca să nu concureze
  // cu filmul pe internetul telefonului
  const dupaFilm = scena !== "intro";
  useEffect(() => {
    if (!pornit || !dupaFilm) return;
    const p = matchMedia("(orientation: portrait)").matches ? "p" : "l";
    for (const src of [`/img/padure-${p}.webp`, `/img/nori-${p}.webp`, `/img/castel-${p}.webp`]) new Image().src = src;
  }, [pornit, dupaFilm]);

  useEffect(() => {
    if (!pornit) return;
    // la întoarcerea în aplicație: ecranul rămâne aprins și muzica pornește din nou
    const reia = () => {
      if (document.visibilityState !== "visible") return;
      tineEcranulAprins();
      mixer.current?.ctx.resume().catch(() => {});
      activ.current?.play().catch(() => {});
    };
    // plasă de siguranță: dacă Safari a „adormit” mixerul (ex. în timpul filmului), orice atingere îl trezește
    const trezeste = () => {
      const ctx = mixer.current?.ctx;
      if (ctx && ctx.state !== "running") ctx.resume().catch(() => {});
    };
    document.addEventListener("visibilitychange", reia);
    document.addEventListener("pointerdown", trezeste, true);
    return () => {
      document.removeEventListener("visibilitychange", reia);
      document.removeEventListener("pointerdown", trezeste, true);
    };
  }, [pornit, tineEcranulAprins]);

  // Tranziții de sunet: piesa care trebuie să se audă crește încet, cealaltă se stinge încet și
  // abia apoi se oprește — așa, la întoarcere, continuă de unde a rămas
  useEffect(() => {
    if (!pornit) return;
    const m = mixer.current;
    activ.current = null;
    for (const [nume, el, durata] of [["fundal", fundal.current, 2.5], ["piesa", piesa.current, 1.2]] as const) {
      if (!el) continue;
      window.clearTimeout(opriri.current[nume]);
      const aud = sunet && sursa === nume && !(nume === "piesa" && vinilPauza);
      m?.[nume]?.gain.setTargetAtTime(aud ? 1 : 0, m.ctx.currentTime, durata / 4);
      if (aud) {
        activ.current = el;
        m?.ctx.resume().catch(() => {});
        el.play().catch(() => {});
      } else if (!el.paused) {
        opriri.current[nume] = window.setTimeout(() => el.pause(), m?.[nume] ? durata * 1000 : 0);
      }
    }
  }, [sursa, sunet, vinilPauza, pornit]);

  // Atingerea de pe ecranul de start (gest al utilizatorului): ecranul rămâne aprins, pornim mixerul
  // și „deblocăm” ambele playere, ca pe iPhone să poată cânta mai târziu fără altă atingere
  const laPornire = () => {
    setPornit(true);
    setSursa(null);
    tineEcranulAprins();
    const sesiune = (navigator as Navigator & { audioSession?: { type: string } }).audioSession;
    if (sesiune) sesiune.type = "playback"; // se aude și cu telefonul pe silențios
    if (!mixer.current && typeof AudioContext !== "undefined") {
      try {
        const ctx = new AudioContext();
        const leaga = (el: HTMLAudioElement | null) => {
          if (!el) return undefined;
          const g = ctx.createGain();
          g.gain.value = 0;
          ctx.createMediaElementSource(el).connect(g).connect(ctx.destination);
          return g;
        };
        mixer.current = { ctx, fundal: leaga(fundal.current), piesa: leaga(piesa.current) };
      } catch {
        // fără mixer: piesele doar pornesc și se opresc, fără tranziții
      }
    }
    mixer.current?.ctx.resume().catch(() => {});
    // muzica de fundal pornește singură la finalul filmului, deci o „deblocăm” acum;
    // „melodia noastră” se deblochează abia la atingerea cufărului, ca să nu se descarce degeaba
    const a = fundal.current;
    if (a) {
      a.play().catch(() => {});
      a.pause();
    }
  };

  // „Melodia noastră” pornește chiar din clipa în care atinge cufărul, iar muzica de fundal se stinge
  const atingeCufar = (i: number) => {
    if (CUFERE[i] !== "melodie") return;
    const p = piesa.current;
    if (p) {
      p.currentTime = 0;
      // pornită chiar în atingere: pe iPhone, o piesă poate cânta doar dacă a fost pornită dintr-o atingere
      p.play().catch(() => {});
      if (!sunet) p.pause();
    }
    setVinilPauza(false);
    setSursa("piesa");
  };

  // butonul de pe vinil: pauză/redare doar pentru piesă; dacă tot sunetul era oprit, îl pornește
  const comutaVinil = () => {
    if (!sunet) {
      setSunet(true);
      setVinilPauza(false);
    } else setVinilPauza((p) => !p);
  };

  const deschideCufar = (i: number) => {
    setDeschise((d) => (d.includes(i) ? d : [...d, i]));
    mergi(CUFERE[i]);
  };

  const cautaInPiesa = (f: number) => {
    const a = piesa.current;
    if (a?.duration) a.currentTime = f * a.duration;
  };

  const laCufere = () => {
    setSursa("fundal");
    mergi("cufere");
  };

  return (
    <main className="poveste">
      <Cer />
      <div key={scena} className={iese ? "scena scena--iese" : "scena"}>
        {scena === "intro" && (
          <Intro
            seek={seek}
            onStart={laPornire}
            onGata={() => {
              setSursa("fundal");
              mergi("surpriza");
            }}
          />
        )}
        {scena === "surpriza" && <Surpriza onDa={() => mergi("carte")} />}
        {scena === "carte" && <Carte onGata={laCufere} />}
        {scena === "cufere" && (
          <Cufere deschise={deschise} onAtinge={atingeCufar} onDeschide={deschideCufar} onFinal={() => mergi("final")} />
        )}
        {scena === "scrisoare" && <Scrisoare onInapoi={laCufere} />}
        {scena === "amintiri" && <Amintiri ultima={deschise.length === 3} onInapoi={laCufere} />}
        {scena === "melodie" && (
          <Melodie
            audio={piesa}
            canta={sunet && !vinilPauza}
            onComuta={comutaVinil}
            onCauta={cautaInPiesa}
            onInapoi={laCufere}
          />
        )}
        {scena === "final" && (
          <Final
            onRevezi={() => {
              setSursa(null);
              setDeschise([]); // povestea o ia de la capăt, cu cuferele închise
              mergi("intro");
            }}
          />
        )}
      </div>

      {continut.muzica && <audio ref={fundal} src={continut.muzica} loop preload="none" />}
      <audio ref={piesa} src={continut.melodie.fisier} loop preload="none" />
      {pornit && scena !== "intro" && (
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
    </main>
  );
}
