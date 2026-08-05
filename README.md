# WaveStay — Démo booking

POC de site de réservation de chambres pour la démo Accor (Wavestone).

V1 manuelle servant de base aux itérations live via la plateforme agentique
**waveagentdev**.

## Stack

- Vite 8 + React 19 (JS)
- Tailwind CSS 4 (config CSS-first, `@theme` tokens dans `src/index.css`)
- React Router 7 (Data Router)

## Prérequis

- [Node.js](https://nodejs.org/) ≥ 18
- [pnpm](https://pnpm.io/) ≥ 8

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

## Tests

La suite de tests couvre le catalogue de chambres (`src/data/rooms.js`) et la
fonction `getRoomById`. Elle utilise [Vitest](https://vitest.dev/).

```bash
pnpm vitest run src/data/rooms.test.js
```

> **Note :** `vitest` doit être installé (`pnpm add -D vitest`) si ce n'est
> pas déjà fait — il n'est pas encore déclaré dans `package.json`.

## Lint

```bash
pnpm lint
```

## Catalogue de chambres

Le catalogue est une donnée statique dans `src/data/rooms.js`.  
Il contient **4 chambres**, triées par prix croissant :

| # | ID | Nom | Surface | Prix / nuit | Capacité |
|---|---|---|---|---|---|
| 1 | `classique` | Chambre Classique | 22 m² | 189 € | 2 pers. |
| 2 | `executive` | Suite Exécutive | 38 m² | 289 € | 2 pers. |
| 3 | `familiale-6` | Chambre Familiale 6 personnes | 55 m² | 489 € | 6 pers. |
| 4 | `presidentielle` | Suite Présidentielle | 75 m² | 689 € | 4 pers. |

Chaque chambre expose les champs suivants :

```js
{
  id:               string   // kebab-case unique
  name:             string   // Nom d'affichage
  shortDescription: string   // Résumé (~120 chars, sans balise HTML)
  longDescription:  string   // Texte complet (sans balise HTML)
  pricePerNight:    integer  // Entier positif, en euros
  surface:          integer  // En m², entier positif
  bedType:          string   // Description du couchage
  maxGuests:        integer  // >= 1
  images:           string[] // Exactement 4 URLs Unsplash (w=1200&q=80)
  amenities:        string[] // >= 5 items, sans trailing whitespace
}
```

Pour récupérer une chambre par son identifiant :

```js
import { getRoomById } from './src/data/rooms.js'

const room = getRoomById('familiale-6') // retourne l'objet Room ou undefined
```

## Structure

```
src/
├── main.jsx              # Entrée + RouterProvider (StrictMode)
├── routes.jsx            # createBrowserRouter + RootLayout (Header / Outlet / Footer)
├── index.css             # @import "tailwindcss" + tokens @theme (ink, gold, cream…)
├── data/
│   ├── rooms.js          # Catalogue statique — 4 chambres + getRoomById()
│   └── rooms.test.js     # Suite Vitest — contrats du catalogue et de getRoomById
├── components/           # Header, Footer, RoomCard, RoomGallery, BookingWidget
└── pages/                # HomePage, RoomDetailPage, BookingPage, ConfirmationPage
```

### Flux de navigation

```
HomePage (grille RoomCard)
  └── /rooms/:id   → RoomDetailPage (galerie + description + BookingWidget)
                         └── /booking/:id?checkIn=…&checkOut=…&guests=…
                               → BookingPage (formulaire coordonnées + récapitulatif)
                                     └── ConfirmationPage (router state)
```

Le flux est entièrement **synchrone et in-memory** — aucun appel réseau,
aucun store global.

## Design tokens (Tailwind CSS 4)

Toute la configuration visuelle est déclarée dans `src/index.css` via `@theme`.
Aucune couleur en dur dans les composants.

| Token | Valeur | Usage |
|---|---|---|
| `--color-ink` | `#1a1a2e` | Texte principal, titres, boutons sombres |
| `--color-gold` | `#d4a24c` | Accent, CTA, bullets |
| `--color-gold-dark` | `#b8862e` | Hover des éléments gold |
| `--color-cream` | `#faf7f2` | Fonds de sections, panneaux récapitulatifs |

## Hors-scope (à ajouter via waveagentdev pendant la démo)

- Filtres / recherche avancée
- i18n FR/EN
- Pages Contact / À propos
- Avis clients
- Backend mock / persistance
