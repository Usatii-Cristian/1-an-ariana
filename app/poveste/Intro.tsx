"use client";

import { useEffect, useEffectEvent, useRef, useState, type CSSProperties } from "react";
import { continut } from "../continut";
import { Steluta } from "./ui";

// Momente din film (secunde): intro-ul cu castelul, apoi camera intră prin vitraliu în sala gotică
const TEXT_1 = [1.3, 5.4];
const TEXT_2 = [7.6, 11.2];
const NUME = [23.9, 30.2]; // în locul logo-ului de pe apă, până pornește camera spre castel
const SCENA = 39.0; // „Totul a început când...” peste sala gotică
const SFARSIT = 45.2;

type Etapa = "poarta" | "film" | "sfarsit";

const SCANTEI_NUME = [
  [8, 18, 0.2], [92, 22, 0.6], [18, 82, 1], [84, 78, 0.4], [50, -6, 0.8], [30, 4, 1.3], [70, 96, 1.6],
];

const intre = (t: number, [a, b]: number[]) => t >= a && t < b;

export default function Intro({ seek, onStart, onGata }: { seek: number; onStart: () => void; onGata: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const [etapa, setEtapa] = useState<Etapa>("poarta");
  const [t, setT] = useState(0);
  const [pauza, setPauza] = useState(false);
  const [seIncarca, setSeIncarca] = useState(false);
  const [format, setFormat] = useState(0); // lățime/înălțime a filmului încărcat (telefonul primește varianta decupată)
  const gata = useEffectEvent(onGata);

  const porneste = () => {
    const v = video.current!;
    onStart();
    if (seek) v.currentTime = seek;
    // dacă browserul refuză sunetul, măcar pornim pe mut; dacă nici așa, sărim peste film
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(() => setEtapa("sfarsit"));
    });
    setEtapa("film");
  };

  // Ceasul filmului conduce textele și sfârșitul (rotunjit la 0,1 s, ca să nu randăm la fiecare cadru)
  useEffect(() => {
    if (etapa !== "film") return;
    const v = video.current!;
    let raf = 0;
    const tic = () => {
      setT(Math.floor(v.currentTime * 10) / 10);
      if (v.currentTime >= SFARSIT || v.ended) setEtapa("sfarsit");
      else raf = requestAnimationFrame(tic);
    };
    raf = requestAnimationFrame(tic);
    return () => cancelAnimationFrame(raf);
  }, [etapa]);

  useEffect(() => {
    if (etapa !== "sfarsit") return;
    const id = window.setTimeout(() => gata(), 1300);
    return () => window.clearTimeout(id);
  }, [etapa]);

  const inFilm = etapa === "film";
  const arata = (cand: boolean) => (inFilm && cand ? " arata" : "");

  return (
    <div className={`intro intro--${etapa}`}>
      <div className="film-cutie">
        <div className="film" style={format ? ({ "--ar": format } as CSSProperties) : undefined}>
          <video
            ref={video}
            playsInline
            preload="auto"
            disablePictureInPicture
            onLoadedMetadata={(e) => setFormat(e.currentTarget.videoWidth / e.currentTarget.videoHeight)}
            onPause={(e) => inFilm && !e.currentTarget.ended && setPauza(true)}
            onPlay={() => setPauza(false)}
            onWaiting={() => setSeIncarca(true)}
            onPlaying={() => setSeIncarca(false)}
            onError={() => inFilm && setEtapa("sfarsit")}
          >
            {/* pe telefonul ținut vertical se vede doar mijlocul filmului: îi dăm varianta decupată, mai ușoară */}
            <source src="/intro/inceput-telefon.mp4" type="video/mp4" media="(max-aspect-ratio: 1/1)" />
            <source src="/intro/inceput.mp4" type="video/mp4" />
          </video>
          <div className={`film__nume${arata(intre(t, NUME))}`}>
            <p className="film__nume-text">
              {continut.ea} <br className="doar-portret" />&amp; {continut.el}
            </p>
            <p className="film__nume-sub">Povestea noastră</p>
            {SCANTEI_NUME.map(([x, y, d]) => (
              <Steluta key={`${x}-${y}`} className="film__scanteie" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s` } as CSSProperties} />
            ))}
          </div>
          <p className={`film__scena${arata(t >= SCENA)}`}>
            Totul A Început <br className="doar-portret" />
            Când...
          </p>
        </div>
      </div>

      <p className={`intro__text${arata(intre(t, TEXT_1))}`}>
        A Fost Odata <br className="doar-portret" />
        Ca Niciodata
      </p>
      <p className={`intro__text intro__text--2${arata(intre(t, TEXT_2))}`}>
        O Poveste <br className="doar-portret" />
        De Dragoste
      </p>
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
