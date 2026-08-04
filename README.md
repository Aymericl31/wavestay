# WaveStay — Démo booking

POC de site de réservation de chambres pour la démo Accor (Wavestone).

V1 manuelle servant de base aux itérations live via la plateforme agentique
**waveagentdev**.

## Stack

- Vite 8 + React 19 (JS)
- Tailwind CSS 4 (config CSS-first, `@theme`)
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

## Linter

```bash
pnpm lint
```

## Structure

```
src/
├── main.jsx              # entrée + RouterProvider
├── routes.jsx            # createBrowserRouter + RootLayout (Header + Outlet + Footer)
├── index.css             # @import "tailwindcss" + tokens @theme
├── data/
│   └── rooms.js          # 4 chambres (données statiques) + getRoomById()
├── components/           # Header, Footer, RoomCard, RoomGallery, BookingWidget
└── pages/                # HomePage, RoomDetailPage, BookingPage, ConfirmationPage
```

## Catalogue des chambres

| ID | Nom | Surface | Capacité | Prix / nuit |
|----|-----|---------|----------|-------------|
| `classique` | Chambre Classique | 22 m² | 2 pers. | 189 € |
| `executive` | Suite Exécutive | 38 m² | 2 pers. | 289 € |
| `familiale-6` | Chambre Familiale 6 personnes | 55 m² | 6 pers. | 489 € |
| `presidentielle` | Suite Présidentielle | 75 m² | 4 pers. | 689 € |

La source unique de vérité est `src/data/rooms.js` (pas de backend). Toute nouvelle chambre s'ajoute dans ce fichier ; elle est automatiquement rendue dans la grille d'accueil et accessible via la route `/rooms/:id`.

## Flux de réservation

```
HomePage → RoomDetailPage → BookingPage → ConfirmationPage
```

- Les paramètres de recherche (dates, nombre de voyageurs) transitent en **query string**.
- Les données de réservation finale sont transmises via le **router state** de React Router (`navigate('/confirmation', { state: reservation })`).

## Design tokens (Tailwind CSS 4)

Définis dans `src/index.css` via `@theme` :

| Token | Valeur | Usage |
|-------|--------|-------|
| `--color-ink` | `#1a1a2e` | Texte principal, titres, boutons sombres |
| `--color-gold` | `#d4a24c` | Accent, CTA, bullets équipements |
| `--color-gold-dark` | `#b8862e` | État hover des éléments gold |
| `--color-cream` | `#faf7f2` | Fonds de sections, panneaux récapitulatifs |

Il n'y a **pas** de `tailwind.config.js` ; la configuration est intégralement dans `src/index.css`.

## Hors-scope (à ajouter via waveagentdev pendant la démo)

- Filtres / recherche avancée
- i18n FR/EN
- Pages Contact / À propos
- Avis clients
- Backend mock / persistance
- Tests Vitest
