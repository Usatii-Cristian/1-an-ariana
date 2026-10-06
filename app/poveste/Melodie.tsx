import { continut } from "../continut";
import { BtnInapoi, Polaroid } from "./ui";

export default function Melodie({ onInapoi }: { onInapoi: () => void }) {
  const { youtubeId, poza } = continut.melodie;
  return (
    <div className="melodie">
      <h2 className="titlu-mana melodie__titlu">De fiecare dată când o aud, mă gândesc la tine!</h2>
      <div className="melodie__media">
        <div className="melodie__video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&playsinline=1&modestbranding=1`}
            title="Melodia noastră"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <Polaroid poza={poza} text="melodia noastră ♫" index={2} className="melodie__poza" sizes="220px" />
      </div>
      <BtnInapoi onClick={onInapoi} />
    </div>
  );
}
