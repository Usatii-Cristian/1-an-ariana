"use client";

import { useEffect, useImperativeHandle, useRef, type Ref } from "react";

export type ArtificiiApi = {
  porneste: (inimi?: boolean) => void;
  opreste: () => void;
};

type Particula = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  viata: number;
  max: number;
  c: string;
  m: number;
  g: number;
  sclipeste: boolean;
};
type Racheta = { x: number; y: number; vy: number; tinta: number; culori: string[] };

const CULORI = [
  ["#fff3c4", "#ffd36b"],
  ["#ffffff", "#bfe9ff"],
  ["#ffc2e6", "#ff7fc8"],
  ["#c8fff3", "#7fe3ff"],
  ["#fff3c4", "#ffb3e1"],
];
const MAX_PARTICULE = 1400;

const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const alege = <T,>(v: T[]) => v[Math.floor(Math.random() * v.length)];

export default function Artificii({ ref, className }: { ref?: Ref<ArtificiiApi>; className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const motor = useRef<ArtificiiApi>(null);

  useImperativeHandle(
    ref,
    () => ({
      porneste: (inimi) => motor.current?.porneste(inimi),
      opreste: () => motor.current?.opreste(),
    }),
    [],
  );

  useEffect(() => {
    const c = canvas.current!;
    const ctx = c.getContext("2d")!;
    let W = 0;
    let H = 0;
    let k = 1;
    const marime = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = c.clientWidth;
      H = c.clientHeight;
      c.width = Math.round(W * dpr);
      c.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      k = Math.max(0.8, Math.min(W, H) / 400);
    };
    marime();
    window.addEventListener("resize", marime);

    const P: Particula[] = [];
    const R: Racheta[] = [];
    let activ = false;
    let inimi = false;
    let urmatoarea = 0;
    let raf = 0;
    let ultim = 0;

    const adauga = (p: Particula) => P.length < MAX_PARTICULE && P.push(p);

    const explozie = (x: number, y: number, culori: string[]) => {
      const tip = inimi && Math.random() < 0.5 ? "inima" : alege(["sfera", "sfera", "salcie", "inel"]);
      if (tip === "inima") {
        const v = rnd(2.2, 2.8) * k;
        for (let i = 0; i < 64; i++) {
          const t = (i / 64) * Math.PI * 2;
          const hx = 16 * Math.sin(t) ** 3;
          const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
          adauga({ x, y, vx: (hx / 17) * v, vy: (hy / 17) * v, viata: 0, max: rnd(70, 90), c: i % 3 ? "#ff8fc8" : "#ffd6ea", m: 1.7, g: 0.008, sclipeste: false });
        }
        return;
      }
      if (tip === "salcie") {
        for (let i = 0; i < 56; i++) {
          const a = rnd(0, Math.PI * 2);
          const v = rnd(0.5, 1.9) * k;
          adauga({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, viata: 0, max: rnd(90, 130), c: alege(["#ffd36b", "#fff3c4", "#ffbf47"]), m: 1.2, g: 0.03, sclipeste: true });
        }
        return;
      }
      const n = tip === "inel" ? 48 : 78;
      const vInel = rnd(2, 2.6) * k;
      for (let i = 0; i < n; i++) {
        const a = tip === "inel" ? (i / n) * Math.PI * 2 : rnd(0, Math.PI * 2);
        const v = tip === "inel" ? vInel : Math.sqrt(Math.random()) * 2.7 * k;
        adauga({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, viata: 0, max: rnd(55, 85), c: alege(culori), m: rnd(1.3, 2.1), g: 0.022, sclipeste: Math.random() < 0.3 });
      }
    };

    const lanseaza = () => {
      const y = H * 0.8;
      const tinta = rnd(H * 0.1, H * 0.4);
      R.push({ x: rnd(W * 0.15, W * 0.85), y, vy: -Math.sqrt(2 * 0.1 * k * (y - tinta)), tinta, culori: alege(CULORI) });
    };

    const cadru = (acum: number) => {
      const dt = Math.min((acum - ultim) / 16.67, 3);
      ultim = acum;

      // stingem încet ce era desenat — lasă dâre luminoase
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0,0,0,${Math.min(0.24 * dt, 1)})`;
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      if (activ && acum > urmatoarea) {
        lanseaza();
        if (Math.random() < 0.25) lanseaza();
        urmatoarea = acum + rnd(320, 720);
      }

      ctx.lineWidth = 1.6;
      ctx.strokeStyle = "rgba(255,226,160,.9)";
      for (let i = R.length - 1; i >= 0; i--) {
        const q = R[i];
        q.y += q.vy * dt;
        q.vy += 0.1 * k * dt;
        ctx.beginPath();
        ctx.moveTo(q.x, q.y);
        ctx.lineTo(q.x, q.y - q.vy * 3);
        ctx.stroke();
        if (Math.random() < 0.7) adauga({ x: q.x, y: q.y, vx: rnd(-0.2, 0.2), vy: rnd(0.2, 0.7), viata: 0, max: rnd(16, 30), c: "#ffd9a0", m: 1, g: 0.01, sclipeste: false });
        if (q.vy >= -0.6 || q.y <= q.tinta) {
          explozie(q.x, q.y, q.culori);
          R.splice(i, 1);
        }
      }

      for (let i = P.length - 1; i >= 0; i--) {
        const p = P[i];
        p.viata += dt;
        if (p.viata >= p.max) {
          P.splice(i, 1);
          continue;
        }
        const frana = 0.97 ** dt;
        p.vx *= frana;
        p.vy = p.vy * frana + p.g * k * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        let a = 1 - p.viata / p.max;
        if (p.sclipeste) a *= 0.55 + 0.45 * Math.sin(p.viata * 0.8 + p.x);
        ctx.globalAlpha = a > 0 ? a : 0;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.m, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (activ || R.length || P.length) raf = requestAnimationFrame(cadru);
      else {
        raf = 0;
        ctx.clearRect(0, 0, W, H);
      }
    };

    const bucla = () => {
      if (raf) return;
      ultim = performance.now();
      raf = requestAnimationFrame(cadru);
    };

    motor.current = {
      porneste(cuInimi) {
        activ = true;
        inimi = !!cuInimi;
        bucla();
      },
      opreste() {
        activ = false;
      },
    };

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", marime);
    };
  }, []);

  return <canvas ref={canvas} className={className} aria-hidden />;
}
