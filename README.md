# Quick TSW - Etap 1 (Template)

Szablon SPA dla strony sekcji mężczyzn klubu siatkarskiego.

Założenia projektu i konwencje zespołu są opisane w pliku [AGENTS.MD](AGENTS.MD).

## Stack

- React 19 + TypeScript (strict)
- Vite 6
- React Router 7 (SPA, nested routes)
- SCSS Modules + design tokens przez CSS variables
- ESLint (flat config), Stylelint, Prettier
- Vitest + React Testing Library + jsdom
- Husky + lint-staged
- GitHub Actions (lint, stylelint, typecheck, test:coverage, build)

## Setup

```bash
npm install
npm run dev
```

## Dostępne skrypty

```bash
npm run dev
npm run build   # dist/ + HTML każdej strony, robots.txt i sitemap.xml (wymaga VITE_SITE_URL w .env)
npm run preview
npm run lint
npm run lint:fix
npm run stylelint
npm run stylelint:fix
npm run format
npm run format:check
npm run typecheck
npm run test
npm run test:watch
npm run test:coverage
```

## Architektura

- `src/app/router.tsx` definiuje routing; zakładki sekcji żyją pod prefiksem `/mezczyzni` (`/mezczyzni/klub`, `/mezczyzni/druzyna`, ...), a dawne adresy bez prefiksu przekierowują do nich.
- `src/app/routes/index.tsx` renderuje ekran startowy z wyborem sekcji: mężczyźni → `/mezczyzni/klub`, kobiety → kategoria siatkówki kobiet na stronie klubu.
- `src/shared/theme/tokens.scss` trzyma wszystkie tokeny motywu i kolory sekcji.
- `src/data/mocks/*.json` zawiera dane placeholderowe.
- `src/data/services/*.ts` to warstwa abstrakcji danych (Promise-ready pod API/CMS).
- `src/shared/hooks/*` pobiera dane przez serwisy.
- `src/features/*` i `src/shared/components/*` to komponenty z własnymi testami i stylami.

## Punkty do przeglądu

- Sekcja Kontakt jest obecnie statyczna (bez formularza), zgodnie z najprostszą interpretacją etapu 1.
