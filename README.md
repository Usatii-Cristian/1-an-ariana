# Pentru Ariana ❤

Site-cadou pentru aniversarea de 1 an: intro de basm cu castel și artificii, „Pregătită pentru o surpriză?”, cartea poveștii, cele 3 cufere (scrisoarea, amintirile, melodia) și finalul cu numărătoarea „Un an împreună”.

Făcut pentru telefon (iPhone 13 / 15 Plus), merge și pe laptop. Fără bază de date — totul e static.

## Ce se modifică și unde

Tot ce e personal stă în [`app/continut.ts`](app/continut.ts): numele, data începutului, locul, scrisoarea, pozele, melodia.

- **Poze**: se pun în `public/poze/` și se scriu în `continut.ts` ca `"/poze/nume.jpg"`.
- **Muzică de fundal**: fișierul `public/muzica.mp3` și `muzica: "/muzica.mp3"` în `continut.ts`.

## Rulare locală

```bash
npm install
npm run dev
```

Previzualizare directă a unei scene: `/?s=cufere`, `/?s=scrisoare`, `/?s=final`, sau o secundă din intro: `/?s=intro&t=17`.

## Publicare

Repo-ul se importă în Vercel (Add New → Project → Import), fără nicio setare în plus.

Fontul Waltograph (`app/fonts/`) e gratuit pentru uz personal, necomercial — licența e lângă el.
