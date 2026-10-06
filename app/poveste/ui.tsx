import Image from "next/image";
import { Fragment, type CSSProperties } from "react";

export const INIMA =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

export const STELUTA = "M12 0C13 8 16 11 24 12 16 13 13 16 12 24 11 16 8 13 0 12 8 11 11 8 12 0Z";

export function Inima({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d={INIMA} fill="currentColor" />
    </svg>
  );
}

export function Steluta({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d={STELUTA} fill="currentColor" />
    </svg>
  );
}

// Text care apare literă cu literă (cuvintele nu se rup între rânduri)
export function TitluScris({ text, className, start = 0, pas = 0.07 }: {
  text: string;
  className?: string;
  start?: number;
  pas?: number;
}) {
  let i = 0;
  return (
    <h2 className={className} aria-label={text}>
      {text.split(" ").map((cuvant, w) => (
        <Fragment key={w}>
          {w > 0 && " "}
          <span className="scris__cuvant" aria-hidden>
            {[...cuvant].map((litera, l) => (
              <span key={l} className="scris__litera" style={{ animationDelay: `${start + i++ * pas}s` }}>
                {litera}
              </span>
            ))}
          </span>
        </Fragment>
      ))}
    </h2>
  );
}

export function Polaroid({ poza, text, index = 0, className = "", sizes }: {
  poza: string;
  text?: string;
  index?: number;
  className?: string;
  sizes: string;
}) {
  return (
    <figure className={`polaroid ${className}`} style={{ "--i": index } as CSSProperties}>
      <div className="polaroid__poza">
        {poza ? (
          <Image src={poza} alt={text ?? "Amintirea noastră"} fill sizes={sizes} />
        ) : (
          <div className="polaroid__gol" data-v={index % 6}>
            <Inima className="polaroid__gol-inima" />
            <span>poza ta aici</span>
          </div>
        )}
      </div>
      {text && <figcaption>{text}</figcaption>}
    </figure>
  );
}

export function BtnInapoi({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="btn-inapoi" onClick={onClick}>
      <span aria-hidden>←</span> Înapoi la cufere
    </button>
  );
}
