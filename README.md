# WaveStay — Démo booking

POC de site de réservation de chambres pour la démo Accor (Wavestone).

V1 manuelle servant de base aux itérations live via la plateforme agentique
**waveagentdev**.

## Stack

- Vite 8 + React 19 (JS)
- Tailwind CSS 4 (config CSS-first)
- React Router 7 (Data Router)

## Lancer en local

```bash
pnpm install
pnpm dev
```

Ouvrir http://localhost:5173

## Build production

```bash
pnpm build
pnpm preview
```

## Structure

```
src/
├── main.jsx              # entrée + RouterProvider
├── routes.jsx            # createBrowserRouter + RootLayout
├── index.css             # @import "tailwindcss" + tokens @theme
├── data/rooms.js         # 3 chambres (données en dur)
├── components/           # Header, Footer, RoomCard, RoomGallery, BookingWidget
└── pages/                # HomePage, RoomDetailPage, BookingPage, ConfirmationPage
```

## Hors-scope (à ajouter via waveagentdev pendant la démo)

- Filtres / recherche avancée
- i18n FR/EN
- Pages Contact / À propos
- Avis clients
- Backend mock / persistance
- Tests Vitest
