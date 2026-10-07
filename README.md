# Pentru Ariana ❤

Site-cadou pentru aniversarea de 1 an: filmul de basm de la început (`public/intro/` — castelul, „Ariana & Cristian” pe apă, apoi camera intră prin vitraliu în sala gotică: „Totul a început când...”), „Pregătită pentru o surpriză?”, cartea poveștii, cele 3 cufere (scrisoarea, amintirile, „melodia noastră” pe un vinil) și finalul cu numărătoarea „Un an împreună”.

Muzică: `public/muzica.mp3` (fundal) și `public/princess.mp3` (cufărul cu melodia); când se deschide cufărul, fundalul se stinge încet și reia de unde a rămas la ieșire.

Făcut pentru telefon (iPhone 13 / 15 Plus), merge și pe laptop. Fără bază de date — totul e static.

## Ce se modifică și unde

Tot ce e personal stă în [`app/continut.ts`](app/continut.ts): numele, data începutului, locul, scrisoarea, pozele, melodia.

- **Poze**: se pun în `public/poze/` și se scriu în `continut.ts` ca `"/poze/nume.jpg"`.
- **Muzică**: `muzica` (fundal) și `melodie.fisier` (piesa de pe vinil) în `continut.ts`, fișierele în `public/`.

## Rulare locală

```bash
npm install
npm run dev
```

Previzualizare directă a unei scene: `/?s=cufere`, `/?s=scrisoare`, `/?s=final`, sau o secundă din filmul de la început: `/?s=intro&t=23` (numele apar la 24 s, camera pleacă spre castel la 30 s, sala gotică la 38 s).

## Publicare

Repo-ul se importă în Vercel (Add New → Project → Import), fără nicio setare în plus.

Fontul Waltograph (`app/fonts/`) e gratuit pentru uz personal, necomercial — licența e lângă el.
