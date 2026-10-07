"use client";

import Image from "next/image";
import { useEffect, useEffectEvent, useRef, useState, type CSSProperties } from "react";
import { continut } from "../continut";
import Scena from "./Scena";
import { Steluta } from "./ui";

// Momente din video (secunde)
const TEXT_1 = [1.3, 5.4];
const TEXT_2 = [7.6, 11.2];
const NUME = 23.9; // în locul logo-ului de pe apă
const ZOOM = 30.2; // intrăm în vitraliul din mijlocul castelului
const ZOOM_DURATA = 2700; // ms
const SCENA_DURATA = 6200; // ms până începe să se stingă

type Etapa = "poarta" | "film" | "zoom" | "scena" | "sfarsit";

const fazaFilm = (t: number) =>
  t < TEXT_1[0] ? 0 : t < TEXT_1[1] ? 1 : t < TEXT_2[0] ? 2 : t < TEXT_2[1] ? 3 : t < NUME ? 4 : 5;

const SCANTEI_NUME = [
  [8, 18, 0.2], [92, 22, 0.6], [18, 82, 1], [84, 78, 0.4], [50, -6, 0.8], [30, 4, 1.3], [70, 96, 1.6],
];

export default function Intro({ seek, onStart, onGata }: { seek: number; onStart: () => void; onGata: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const [etapa, setEtapa] = useState<Etapa>("poarta");
  const [faza, setFaza] = useState(0);
  const [pauza, setPauza] = useState(false);
  const [seIncarca, setSeIncarca] = useState(false);
  const gata = useEffectEvent(onGata);

  const porneste = () => {
    const v = video.current!;
    onStart();
    if (seek) v.currentTime = seek;
    // dacă browserul refuză sunetul, măcar pornim pe mut
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(() => setEtapa("zoom"));
    });
    setEtapa("film");
  };

  // Ceasul video-ului conduce textele și momentul zoom-ului
  useEffect(() => {
    if (etapa !== "film") return;
    const v = video.current!;
    let raf = 0;
    const tic = () => {
      setFaza(fazaFilm(v.currentTime));
      if (v.currentTime >= ZOOM || v.ended) setEtapa("zoom");
      else raf = requestAnimationFrame(tic);
    };
    raf = requestAnimationFrame(tic);
    return () => cancelAnimationFrame(raf);
  }, [etapa]);

  useEffect(() => {
    if (etapa === "zoom") {
      const id = window.setTimeout(() => setEtapa("scena"), ZOOM_DURATA);
      return () => window.clearTimeout(id);
    }
    if (etapa === "scena") {
      const id = window.setTimeout(() => setEtapa("sfarsit"), SCENA_DURATA);
      return () => window.clearTimeout(id);
    }
    if (etapa === "sfarsit") {
      const id = window.setTimeout(() => gata(), 1300);
      return () => window.clearTimeout(id);
    }
  }, [etapa]);

  const inFilm = etapa === "film";

  return (
    <div className={`intro intro--${etapa}`}>
      <div className="film-cutie">
        <div className="film">
          <video
            ref={video}
            src="/intro/inceput.mp4"
            playsInline
            preload="auto"
            disablePictureInPicture
            onPause={(e) => inFilm && !e.currentTarget.ended && setPauza(true)}
            onPlay={() => setPauza(false)}
            onWaiting={() => setSeIncarca(true)}
            onPlaying={() => setSeIncarca(false)}
            onError={() => inFilm && setEtapa("zoom")}
          />
          {/* cadrul final al castelului, fără logo — pe el facem zoom-ul */}
          <Image className="film__final" src="/intro/final.webp" alt="" fill unoptimized loading="eager" draggable={false} />
          <div className={`film__nume${inFilm && faza >= 5 ? " arata" : ""}`}>
            <p className="film__nume-text">
              {continut.ea} <br className="doar-portret" />&amp; {continut.el}
            </p>
            <p className="film__nume-sub">Povestea noastră</p>
            {SCANTEI_NUME.map(([x, y, d]) => (
              <Steluta key={`${x}-${y}`} className="film__scanteie" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s` } as CSSProperties} />
            ))}
          </div>
          <div className="film__lumina" />
        </div>
      </div>

      <p className={`intro__text${inFilm && faza === 1 ? " arata" : ""}`}>
        A Fost Odata <br className="doar-portret" />
        Ca Niciodata
      </p>
      <p className={`intro__text intro__text--2${inFilm && faza === 3 ? " arata" : ""}`}>
        O Poveste <br className="doar-portret" />
        De Dragoste
      </p>

      {(etapa === "scena" || etapa === "sfarsit") && (
        <div className="intro__scena">
          <Scena />
          <p className="intro__text intro__text--3">
            Totul A Început <br className="doar-portret" />
            Când...
          </p>
        </div>
      )}
      <div className="intro__sfarsit" />

      {etapa === "poarta" && (
        <div className="poarta">
          <Steluta className="poarta__stea" />
          <h1 className="poarta__titlu">Pentru {continut.ea}</h1>
          <p className="poarta__sub">o poveste scrisă doar pentru tine</p>
          <button type="button" className="btn-magic" onClick={porneste}>
            Deschide povestea
          </button>
          <p className="poarta__hint">🎧 cu sunetul pornit</p>
        </div>
      )}

      {inFilm && seIncarca && !pauza && <Steluta className="intro__incarcare" />}
      {inFilm && pauza && (
        <button type="button" className="intro__reia" onClick={() => video.current?.play()}>
          <span>▶</span> atinge ca să continuăm
        </button>
      )}
    </div>
  );
}
