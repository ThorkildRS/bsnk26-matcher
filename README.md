# BSNK26 Foredragsmatcher

Interaktiv swipe-app for buildingSMART Norge-konferansen 2026. Deltakere swiper gjennom foredrag og får en personlig oppsummering med link til billettside.

## Kom i gang

```bash
npm install
npm run dev
```

Åpner automatisk på http://localhost:3000

## Bygg for produksjon

```bash
npm run build
```

Ferdig bygget versjon havner i `dist/`-mappen og kan deployes til hvilken som helst statisk hosting (Vercel, Netlify, GitHub Pages osv.).

## Prosjektstruktur

```
├── index.html          # HTML entry point
├── package.json
├── vite.config.js      # Vite config
└── src/
    ├── main.jsx        # React entry
    └── App.jsx         # Hele appen (swipe-kort, resultatside)
```

## Tilpasninger

- **Farger/branding**: Endre `BRAND`-objektet øverst i `App.jsx`
- **Foredrag**: Endre `TALKS`-arrayet i `App.jsx`
- **Billettlink**: Søk etter `checkin.no` i `App.jsx`
