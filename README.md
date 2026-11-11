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

## Wdrożenie (hosting)

Produkcja: `https://siatkowka.tswisla.pl` na serwerze **Caddy**. Konfiguracji serwera nie ma w tym repo — poniższe kroki trzeba wykonać ręcznie po stronie hostingu.

### 1. Wymagane: serwowanie stron z plików `.html`

`npm run build` zapisuje w `dist/` obok aplikacji osobny HTML każdej strony (`mezczyzni/druzyna.html` itd.) z jej tytułem, opisem, Open Graph i `canonical`. Roboty bez JavaScriptu (Facebook, Messenger, WhatsApp, LinkedIn, część Binga) czytają tylko ten plik. Caddy musi podać `mezczyzni/druzyna.html` pod adresem `/mezczyzni/druzyna` (bez przekierowania na końcowy `/`), a dla pozostałych adresów `index.html` (SPA fallback).

W bloku Caddy obsługującym tę aplikację (nie `/api/` ani `/konto/`) zamień typowe `try_files {path} /index.html` na:

```caddy
siatkowka.tswisla.pl {
	# … istniejące reguły dla /api/* i /konto/* bez zmian …

	root * /ścieżka/do/dist
	try_files {path} {path}.html /index.html
	file_server
}
```

Bez tej zmiany strona działa normalnie, tylko podgląd linków i roboty bez JS dostają ogólne meta z `index.html`.

### 2. Wymagane: wdrożenie całego `dist/`

Razem z aplikacją muszą trafić na serwer nowe pliki: `mezczyzni/*.html`, `mezczyzni/index.html`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, `apple-touch-icon.png`, `icon-192.png`. Build musi mieć ustawione `VITE_SITE_URL` (domyślnie z `.env`), inaczej pominie `canonical`, `og:url` i `sitemap.xml` (i wypisze ostrzeżenie).

### 3. Sprawdzenie po wdrożeniu

```bash
curl -s https://siatkowka.tswisla.pl/mezczyzni/druzyna | grep -o '<title>[^<]*</title>'
# <title>Drużyna | Siatkówka mężczyzn TS Wisła Kraków</title>
curl -sI https://siatkowka.tswisla.pl/robots.txt | grep -i content-type
# content-type: text/plain…   (dziś zwraca text/html — to znak, że brakuje pliku)
curl -s https://siatkowka.tswisla.pl/sitemap.xml | head -3
# <?xml … <urlset …
curl -s -o /dev/null -w '%{http_code}\n' https://siatkowka.tswisla.pl/mezczyzni/
# 200
```

### 4. Zalecane (opcjonalne)

Prawdziwe przekierowania 301 dla dawnych adresów zamiast przekierowań w przeglądarce (wyszukiwarki przeniosą wtedy stare adresy):

```caddy
@legacy path /klub /druzyna /kontakt /przyjaciele /zostan-partnerem /media
redir @legacy /mezczyzni{uri} 301
redir /strefa-przyjaciol /mezczyzni/przyjaciele 301
```

Długie cache'owanie plików z hashem w nazwie (`/assets/*`), krótkie dla HTML:

```caddy
@hashed path /assets/*
header @hashed Cache-Control "public, max-age=31536000, immutable"
encode zstd gzip
```

### 5. Po pierwszym wdrożeniu

- Google Search Console (i opcjonalnie Bing Webmaster Tools): dodać domenę i wysłać `https://siatkowka.tswisla.pl/sitemap.xml`.
- Facebook Sharing Debugger (`developers.facebook.com/tools/debug`): odświeżyć podgląd udostępnianych wcześniej linków.

### Testowe deploye (`ghp_*`)

Budują z pustym `VITE_SITE_URL=` w zmiennych workflow, żeby `canonical`, `sitemap.xml` i dane strukturalne nie wskazywały produkcji.

## Punkty do przeglądu

- Sekcja Kontakt jest obecnie statyczna (bez formularza), zgodnie z najprostszą interpretacją etapu 1.
