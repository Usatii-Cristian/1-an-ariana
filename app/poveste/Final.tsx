"use client";

import { useEffect, useRef, useState } from "react";
import { continut } from "../continut";
import Artificii, { type ArtificiiApi } from "./Artificii";
import Castel from "./Castel";
import { Inima } from "./ui";

const { an, luna, zi } = continut.inceput;
const INCEPUT = new Date(an, luna - 1, zi).getTime();

function timpImpreuna(acum: number) {
  const s = Math.max(0, Math.floor((acum - INCEPUT) / 1000));
  return [
    { n: Math.floor(s / 86400), et: "zile" },
    { n: Math.floor(s / 3600) % 24, et: "ore" },
    { n: Math.floor(s / 60) % 60, et: "minute" },
    { n: s % 60, et: "secunde" },
  ];
}

export default function Final({ onRevezi }: { onRevezi: () => void }) {
  const artificii = useRef<ArtificiiApi>(null);
  const [acum, setAcum] = useState(() => Date.now());

  useEffect(() => {
    const tic = window.setInterval(() => setAcum(Date.now()), 1000);
    const start = window.setTimeout(() => artificii.current?.porneste(true), 900);
    return () => {
      window.clearInterval(tic);
      window.clearTimeout(start);
    };
  }, []);

  return (
    <div className="final">
      <Artificii ref={artificii} className="final__artificii" />
      <Castel className="final__castel" />
      <div className="final__continut">
        <p className="final__an">Un an împreună</p>
        <div className="final__contor" role="timer">
          {timpImpreuna(acum).map(({ n, et }) => (
            <div key={et} className="final__cifra">
              <b>{n}</b>
              <span>{et}</span>
            </div>
          ))}
        </div>
        <p className="final__poveste">
          ...și au trăit fericiți, în căsuța lor, până la adânci bătrâneți.
          <br />
          Doar că povestea noastră abia a început.
        </p>
        <p className="final__te-iubesc">
          Te iubesc, {continut.ea}!
        </p>
        <p className="final__semnatura">
          <Inima className="final__inima" /> {continut.el}
        </p>
        <button type="button" className="final__revezi" onClick={onRevezi}>
          ↺ Revezi povestea
        </button>
      </div>
    </div>
  );
}
