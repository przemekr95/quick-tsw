# AGENTS.md — kontekst i wytyczne dla agentów AI

Ten plik jest źródłem prawdy dla wszystkich decyzji technicznych w tym repozytorium. Każdy agent AI (Claude Code, Cursor, Copilot itd.) pracujący nad tym projektem powinien go przeczytać przed rozpoczęciem pracy i trzymać się opisanych tu konwencji, chyba że użytkownik jawnie poprosi o odstępstwo.

## 1. Kontekst projektu

Strona internetowa klubu siatkarskiego. Punkt wejścia to ekran podzielony na dwie połowy (split-screen): kliknięcie w lewą połowę przenosi do sekcji **Kobiety**, w prawą do sekcji **Mężczyźni**.

Obie sekcje mają identyczną strukturę i funkcjonalność, różnią się wyłącznie motywem kolorystycznym. Każda sekcja ma 5 zakładek: **Klub**, **Drużyna**, **Kontakt**, **Ściana Wspierających**, **Aktualności** (link zewnętrzny do Facebooka, nie osobna podstrona).

Poza sekcjami Kobiety/Mężczyźni istnieje jedna wspólna, neutralna podstrona **`/media`** (dostępna z linku w stopce każdej sekcji) z materiałami wspólnymi dla obu sekcji: księga znaków, kolory klubu, pliki do pobrania. Nie ma własnego motywu kolorystycznego kobiety/mężczyzni — używa neutralnego motywu `media` (złoty jako `--color-primary`).

To jest **etap 1 — szablon (template)**, który będzie rozwijany iteracyjnie w kolejnych etapach. Architektura musi to ułatwiać: dane mockowane dziś muszą dać się łatwo podmienić na prawdziwe API/CMS, a dodanie treści/funkcji w przyszłości nie powinno wymagać przebudowy struktury.

## 2. Stack technologiczny

| Warstwa           | Wybór                                                                                                                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework         | React 19.x + TypeScript (strict mode, bez `any`)                                                                                                                                        |
| Build tool        | Vite 6.x                                                                                                                                                                                |
| Routing           | React Router 7.x, tryb deklaratywny/biblioteczny (`createBrowserRouter`), **bez SSR** — czysty SPA                                                                                      |
| Stylowanie        | CSS Modules + SCSS                                                                                                                                                                      |
| Linter stylów     | Stylelint (`stylelint-config-standard-scss` + `stylelint-config-css-modules`)                                                                                                           |
| Linter kodu       | ESLint 9.x, flat config (`eslint.config.js`), `typescript-eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`, `eslint-plugin-vitest` (pliki testowe) |
| Formatowanie      | Prettier — uruchamiany niezależnie od ESLint (nie przez `eslint-plugin-prettier`), żeby lint i format się nie dublowały                                                                 |
| Testy             | Vitest + React Testing Library + jsdom                                                                                                                                                  |
| Menedżer pakietów | npm                                                                                                                                                                                     |
| Pre-commit        | Husky + lint-staged                                                                                                                                                                     |
| CI                | GitHub Actions (lint, stylelint, typecheck, test + coverage, build)                                                                                                                     |
| Hosting           | jeszcze nie ustalony — build musi być czystym, statycznym SPA (`dist/`) deployowalnym na dowolny hosting statyczny bez zależności od konkretnej platformy                               |

## 3. Struktura katalogów

```
src/
  app/
    routes/
      index.tsx                # ekran startowy (split-screen)
      media.tsx                 # wspólna podstrona /media (poza sekcjami)
      kobiety/
        layout.tsx              # layout sekcji + nawigacja po zakładkach
        klub.tsx
        druzyna.tsx
        kontakt.tsx
        sciana-wspierajacych.tsx
      mezczyzni/
        layout.tsx
        klub.tsx
        druzyna.tsx
        kontakt.tsx
        sciana-wspierajacych.tsx
    router.tsx                  # definicja routera
    providers/
      ThemeProvider.tsx
  features/
    club-info/
    team-roster/
    contact/
    patrons/                    # zakładka Ściana Wspierających
    media/                      # zawartość wspólnej podstrony /media
  shared/
    components/                 # SplitScreen, Tabs, Layout, Button...
    hooks/
    theme/                      # design tokens: colors, typography
    types/
    utils/
  data/
    mocks/
      club.kobiety.json
      club.mezczyzni.json
      team.kobiety.json
      team.mezczyzni.json
      contact.kobiety.json
      contact.mezczyzni.json
      patrons.kobiety.json
      patrons.mezczyzni.json
    services/                   # warstwa dostępu do danych (repository pattern)
      clubService.ts
      teamService.ts
      contactService.ts
      patronService.ts
  test/
    setup.ts
```

Każdy komponent w `shared/components` i `features/*` ma własny folder:

```
ComponentName/
  ComponentName.tsx
  ComponentName.module.scss
  ComponentName.test.tsx
  index.ts
```

## 4. Routing

- `/` — ekran startowy (split-screen)
- `/kobiety` — layout sekcji kobiet, zakładki jako nested routes: `/kobiety/klub`, `/kobiety/druzyna`, `/kobiety/kontakt`, `/kobiety/sciana-wspierajacych`
- `/mezczyzni` — analogicznie: `/mezczyzni/klub`, `/mezczyzni/druzyna`, `/mezczyzni/kontakt`, `/mezczyzni/sciana-wspierajacych`
- `/kobiety` i `/mezczyzni` bez podstrony przekierowują domyślnie na `/klub`
- `/media` — jedna wspólna, neutralna podstrona (poza layoutem `/kobiety` i `/mezczyzni`, bez motywu sekcji), z linkiem w stopce każdej sekcji
- Adresy URL są bez polskich znaków i małymi literami; w interfejsie (przyciski na ekranie startowym, nawigacja) wyświetlana etykieta to pełna, poprawna forma: **„Kobiety"** i **„Mężczyźni"**
- „Aktualności" **nie jest trasą** — to zwykły `<a target="_blank" rel="noopener noreferrer">` do strony klubu na Facebooku (URL na razie jako placeholder w konfiguracji)

## 5. Motyw wizualny (design tokens)

**Font:** Poppins (wagi 400/500/600/700), self-hosted (np. `@fontsource/poppins`) — nie ładowany z zewnętrznego CDN Google Fonts, żeby uniknąć zależności i poprawić wydajność.

**Kolory bazowe klubu:**

| Nazwa                           | HEX       | CMYK       | Rola w motywie                                                       |
| ------------------------------- | --------- | ---------- | -------------------------------------------------------------------- |
| PANTONE 286 C (niebieski)       | `#273583` | 100/75/0/0 | kolor przewodni sekcji **Mężczyźni**                                 |
| PANTONE 1795 C (czerwony)       | `#E30613` | 0/96/93/0  | kolor przewodni sekcji **Kobiety**                                   |
| PANTONE 000 C (biały)           | `#FFFFFF` | 0/0/0/0    | wspólne tło obu sekcji                                               |
| PANTONE Cool Gray 3 C (szary)   | `#404040` | 0/0/0/25   | podstawowy kolor tekstu i obramowań (czytelniejszy niż czysta czerń) |
| PANTONE Process Black C (czerń) | `#000000` | 0/0/0/100  | tylko mocne akcenty (np. logo)                                       |
| PANTONE 7509 C (złoty/beżowy)   | `#EFBC7B` | 4/29/57/4  | wspólny akcent dekoracyjny (hover, wyróżnienia) w obu sekcjach       |

Niebieski, biały i czerwony są kolorami wiodącymi: białe tło i szary tekst są wspólne dla obu sekcji, a niebieski/czerwony różnicuje sekcję Mężczyźni/Kobiety. Złoty jest wspólnym akcentem dekoracyjnym, czerń używana oszczędnie.

**Implementacja:** zmienne CSS (`--color-primary`, `--color-background`, `--color-text`, `--color-accent`, `--color-emphasis`, `--font-family-base`...) ustawiane na `[data-theme="kobiety"]` / `[data-theme="mezczyzni"]` na elemencie root layoutu danej sekcji. Komponenty **nigdy** nie hardkodują kolorów ani fontów — zawsze przez zmienne. Dodanie kolejnego motywu w przyszłości ma być zmianą w jednym pliku.

**Wyjątek — ekran startowy (split-screen):** `--color-surface-start` / `--color-surface-end` (`#121212` → `#2c2c2c`) to celowo ciemne tło pod duotonowe zdjęcia na ekranie startowym (`src/shared/components/SplitScreen`), niezależne od `--color-background` (białego, wspólnego dla zakładek Klub/Drużyna/Kontakt). Nie mieszać tych dwóch tokenów: `--color-background` zostaje białe wszędzie poza tym jednym ekranem.

## 6. Warstwa danych (mock → przyszłe API)

Na tym etapie dane pochodzą z plików JSON w `src/data/mocks/`. Dostęp do danych **zawsze** przez warstwę serwisów (`src/data/services/*.ts`) — nigdy przez bezpośredni import JSON w komponencie. Serwisy zwracają `Promise` (nawet czytając lokalny plik) i są typowane przez wspólne typy domenowe z `shared/types/`. Dzięki temu podmiana na prawdziwe API/CMS w kolejnym etapie wymaga zmiany tylko wewnątrz serwisu, nie w komponentach.

Sugerowany kształt danych (do rozbudowy w kolejnych etapach):

- `Club` — nazwa, opis/historia, adres hali, zarząd, sponsorzy
- `Player` — imię, nazwisko, numer, pozycja, zdjęcie (placeholder)
- `ContactInfo` — adres, telefon, e-mail, link do mapy
- `Patron` — nazwa mecenasa/wspierającego, poziom wsparcia (`tier`: 1–3, analogicznie do `Sponsor`)

## 7. Konwencje komponentów

- Komponenty funkcyjne, bez class components, bez `React.FC` (zwykła funkcja z typowanym argumentem `ComponentNameProps`)
- Komponenty „głupie" (prezentacyjne, `shared/components`) nie znają się na danych/serwisach — dostają dane przez propsy
- Logika pobierania danych żyje w hookach (`useClubData`, `useTeamRoster`...) lub loaderach tras, nie w komponentach prezentacyjnych
- Dostępność: semantyczny HTML, `alt` na obrazkach, widoczny focus, `aria-*` tam gdzie potrzebne — cel: WCAG AA
- Mobile-first, responsywność jako podstawowy wymóg (nie dodatek)

## 8. Testy

- Próg pokrycia: **80%** (statements, branches, functions, lines), skonfigurowany w `vitest.config.ts` (`coverage.thresholds`) — CI failuje poniżej progu
- React Testing Library — testujemy zachowanie widoczne dla użytkownika, nie szczegóły implementacji
- Każdy nowy komponent/hook/serwis ma odpowiadający plik testowy
- Obowiązkowe testy: nawigacja ze split-screen do właściwej sekcji, przełączanie zakładek, renderowanie danych z warstwy serwisowej

## 9. Jakość kodu

Skrypty w `package.json` (obowiązkowe):

```
dev, build, preview
lint, lint:fix
stylelint, stylelint:fix
format, format:check
typecheck        # tsc --noEmit
test, test:watch, test:coverage
prepare          # husky install
```

Pre-commit (Husky + lint-staged): `eslint --fix`, `stylelint --fix`, `prettier --write` na zmienionych plikach. PR bez przejścia CI (lint + stylelint + typecheck + testy + build) nie może być zmergowany.

## 10. Konwencje pracy zespołowej

- Branch naming: `feature/...`, `fix/...`, `chore/...`
- Commit messages: Conventional Commits (`feat:`, `fix:`, `chore:`, `test:`, `docs:`...)
- Każdy PR zawiera opis i checklistę: testy przechodzą, coverage ≥80%, lint czysty

## 11. Czego agent NIE powinien robić bez pytania

- Zmieniać wybranego stacku (np. przechodzić na Next.js) bez wyraźnej prośby
- Hardkodować kolorów/fontów poza plikiem tokenów motywu
- Dodawać nowych dużych zależności (state management, UI kit) bez uzasadnienia w PR
- Mieszać logikę pobierania danych z komponentami prezentacyjnymi

## 12. Otwarte decyzje do potwierdzenia przez klub/zespół

- Docelowy hosting (wpłynie na konfigurację builda)
- Zakres zakładki „Kontakt" (czy ma być formularz, czy tylko dane statyczne)
