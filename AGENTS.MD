# AGENTS.md — kontekst i wytyczne dla agentów AI

Ten plik jest źródłem prawdy dla wszystkich decyzji technicznych w tym repozytorium. Każdy agent AI (Claude Code, Cursor, Copilot itd.) pracujący nad tym projektem powinien go przeczytać przed rozpoczęciem pracy i trzymać się opisanych tu konwencji, chyba że użytkownik jawnie poprosi o odstępstwo.

## 1. Kontekst projektu

Strona internetowa klubu siatkarskiego. Obecnie repozytorium obejmuje wyłącznie sekcję **Mężczyźni**, bez żadnego prefiksu sekcji w URL — zakładki żyją bezpośrednio pod `/klub`, `/druzyna` itd. Punkt wejścia (`/`) to krótki ekran ładowania (loading screen), który automatycznie przekierowuje do `/klub`.

> **Historia:** do września 2026 serwis miał dwie równoległe sekcje — **Kobiety** i **Mężczyźni** — wybierane z ekranu startowego typu split-screen. Prace nad sekcją kobiet zostały wstrzymane, a `develop` uproszczono do samej sekcji mężczyzn. Pełny, dwusekcyjny stan (split-screen, `/kobiety/*`, motyw czerwony, mocki i serwisy dla obu sekcji) jest zachowany na gałęzi `archive/kobiety-mezczyzni` i posłuży jako punkt wyjścia, gdy prace nad sekcją kobiet zostaną wznowione. Architektura danych (patrz sekcja 6) celowo pozostała parametryczna przez `SectionId`/`SectionPath` — przywrócenie drugiej sekcji to rozszerzenie tych typów i serwisów o kolejną gałąź, a nie przebudowa struktury.

Sekcja ma 6 zakładek, w tej kolejności w nawigacji: **Aktualności** (link zewnętrzny do Facebooka, nie osobna podstrona), **Klub**, **Drużyna**, **Strefa Przyjaciół**, **Zostań Partnerem**, **Kontakt**.

Sekcja ma też podstronę **Media** (`/media`) z materiałami klubowymi: księga znaków, kolory klubu (oba historyczne kolory klubu — niebieski i czerwony, patrz sekcja 5), pliki do pobrania. Dostępna wyłącznie z linku w stopce (nie jest osobną pozycją w głównej nawigacji zakładek) — celowo w motywie sekcji, nie osobnym neutralnym motywem, żeby zachować pełną nawigację (Klub/Drużyna/Kontakt/Strefa Przyjaciół/Zostań Partnerem) i spójność wizualną. Treść żyje w komponencie `features/media`, zaprojektowanym tak, by dało się go współdzielić z kolejną sekcją bez zmian w zawartości.

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
      index.tsx                # ekran startowy (loading screen -> redirect do /klub)
      mezczyzni/                # nazwa folderu = wewnętrzna organizacja, bez odbicia w URL (patrz sekcja 4)
        layout.tsx              # pathless layout route (bez segmentu URL) + nawigacja po zakładkach
        klub.tsx
        druzyna.tsx
        kontakt.tsx
        strefa-przyjaciol.tsx
        zostan-partnerem.tsx
        media.tsx                # podstrona Media w motywie mężczyzn
    router.tsx                  # definicja routera
    providers/
      ThemeProvider.tsx
  features/
    club-info/
    team-roster/
    contact/
    patrons/                    # zakładka Strefa Przyjaciół
    partnership/                 # zakładka Zostań Partnerem
    media/                      # zawartość podstrony Media
  shared/
    components/                 # LoadingScreen, Tabs, Layout, Button...
    hooks/
    theme/                      # design tokens: colors, typography
    types/
    utils/
  data/
    mocks/
      club.mezczyzni.json
      team.mezczyzni.json
      contact.mezczyzni.json
      patrons.mezczyzni.json
      partnership.mezczyzni.json
    services/                   # warstwa dostępu do danych (repository pattern)
      clubService.ts
      teamService.ts
      contactService.ts
      patronService.ts
      partnershipService.ts
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

- `/` — ekran startowy (loading screen), automatycznie przekierowuje (`useNavigate`, po krótkim opóźnieniu) do `/klub`
- Zakładki sekcji żyją **bez żadnego prefiksu** bezpośrednio pod root: `/klub`, `/druzyna`, `/kontakt`, `/strefa-przyjaciol`, `/zostan-partnerem`, `/media` — w `router.tsx` layout sekcji (`MezczyzniLayoutRoute`) jest zamontowany jako *pathless route* (bez własnego `path`, tylko `children`), więc nie dodaje żadnego segmentu do URL. Skoro istnieje tylko jedna sekcja, prefiks typu `/mezczyzni/*` byłby czystym szumem w adresie — folder `routes/mezczyzni/` to wyłącznie organizacja plików, nie odzwierciedla się w URL.
- `SectionPath` (`shared/types/domain.ts`) odzwierciedla to jako pusty string (`''`) — `NavBar`/`Footer` budują linki jako `` `${sectionPath}/${link.path}` ``, co przy pustym `sectionPath` daje wprost `/klub` itd. Przy ewentualnym przywróceniu drugiej sekcji z prefiksem (patrz `archive/kobiety-mezczyzni`) wystarczy nadać `SectionPath` realną wartość taką jak `/mezczyzni` ponownie.
- `/media` renderuje treść ze wspólnego komponentu `features/media` — tylko link w stopce, nie osobna pozycja w NavBar
- Adresy URL są bez polskich znaków i małymi literami; w interfejsie (nawigacja) wyświetlana etykieta to pełna, poprawna forma: **„Mężczyźni"**
- „Aktualności" **nie jest trasą** — to zwykły `<a target="_blank" rel="noopener noreferrer">` do strony klubu na Facebooku (URL na razie jako placeholder w konfiguracji)

## 5. Motyw wizualny (design tokens)

**Font:** Poppins (wagi 400/500/600/700), self-hosted (np. `@fontsource/poppins`) — nie ładowany z zewnętrznego CDN Google Fonts, żeby uniknąć zależności i poprawić wydajność.

**Kolory bazowe klubu:**

| Nazwa                           | HEX       | CMYK       | Rola w motywie                                                                                                                      |
| ------------------------------- | --------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| PANTONE 286 C (niebieski)       | `#273583` | 100/75/0/0 | kolor przewodni sekcji **Mężczyźni** (jedyna aktywna sekcja)                                                                        |
| PANTONE 1795 C (czerwony)       | `#E30613` | 0/96/93/0  | historyczny kolor przewodni sekcji **Kobiety** — nieaktywny w routingu/motywach, nadal pokazywany jako kolor klubu na stronie Media |
| PANTONE 000 C (biały)           | `#FFFFFF` | 0/0/0/0    | tło serwisu                                                                                                                         |
| PANTONE Cool Gray 3 C (szary)   | `#404040` | 0/0/0/25   | podstawowy kolor tekstu i obramowań (czytelniejszy niż czysta czerń)                                                                |
| PANTONE Process Black C (czerń) | `#000000` | 0/0/0/100  | tylko mocne akcenty (np. logo)                                                                                                      |
| PANTONE 7509 C (złoty/beżowy)   | `#EFBC7B` | 4/29/57/4  | wspólny akcent dekoracyjny (hover, wyróżnienia)                                                                                     |

Niebieski jest kolorem wiodącym jedynej aktywnej sekcji; czerwony pozostaje w tokenach (`--color-club-red`, patrz `ClubColorsSection` na stronie Media) jako część księgi znaków klubu, ale nie jest już przypisany do żadnego `[data-theme]`. Złoty jest wspólnym akcentem dekoracyjnym, czerń używana oszczędnie.

**Implementacja:** zmienne CSS (`--color-primary`, `--color-background`, `--color-text`, `--color-accent`, `--color-emphasis`, `--font-family-base`...) ustawiane na `[data-theme="mezczyzni"]` na elemencie root layoutu sekcji. Komponenty **nigdy** nie hardkodują kolorów ani fontów — zawsze przez zmienne. Dodanie kolejnego motywu (np. przywrócenie `[data-theme="kobiety"]`) w przyszłości ma być zmianą w jednym pliku (`tokens.scss`), analogicznie do stanu zachowanego na gałęzi `archive/kobiety-mezczyzni`.

**Ciemne tło treści zakładek:** `--color-surface-start` / `--color-surface-end` (`#121212` → `#2c2c2c`) to standardowe tło elementu `.root` **każdej** zakładki treści (`ClubInfo`, `ContactInfo`, `TeamRoster`, `PatronsInfo`, `PartnershipInfo`, `MediaInfo`) — w połączeniu z radialnym gradientem koloru sekcji (`--color-primary`) daje spójny, ciemny, premium wygląd całej treści. Ten sam gradient jest też tłem ekranu startowego (`src/shared/components/LoadingScreen`) — to nie wyjątek dla tego ekranu, tylko ten sam token użyty w tym samym celu wszędzie. `--color-background` (białe) pełni w tym kontekście dwie role: jest kolorem tekstu na ciemnym tle (`color: var(--color-background)` na każdym `.root`) oraz realnym białym tłem elementów, które celowo pozostają jasne mimo sąsiedztwa z ciemną treścią — np. zamykający każdą zakładkę `SponsorsSection` czy chrom `SectionLayout` (`.headerInline`/`.main`) poza samym `.root`. Przy dodawaniu nowej zakładki treści kopiuj dokładnie ten sam wzorzec `.root`/`.stack` (patrz dowolny z istniejących komponentów wyżej) — nie twórz jasnej (białej) alternatywy, bo złamie to spójność wizualną całego serwisu.

## 6. Warstwa danych (mock → przyszłe API)

Na tym etapie dane pochodzą z plików JSON w `src/data/mocks/`. Dostęp do danych **zawsze** przez warstwę serwisów (`src/data/services/*.ts`) — nigdy przez bezpośredni import JSON w komponencie. Serwisy zwracają `Promise` (nawet czytając lokalny plik) i są typowane przez wspólne typy domenowe z `shared/types/`. Dzięki temu podmiana na prawdziwe API/CMS w kolejnym etapie wymaga zmiany tylko wewnątrz serwisu, nie w komponentach.

Sugerowany kształt danych (do rozbudowy w kolejnych etapach):

- `Club` — nazwa, opis/historia, adres hali, zarząd, sponsorzy
- `Player` — imię, nazwisko, numer, pozycja, zdjęcie (placeholder)
- `ContactInfo` — adres, telefon, e-mail, link do mapy
- `Patron` — nazwa mecenasa/wspierającego, poziom wsparcia (`tier`: 1–3, analogicznie do `Sponsor`)
- `PartnershipContent` — treść zakładki Zostań Partnerem: tekst wprowadzenia, lista korzyści, pakiety partnerskie (`PartnershipTier[]` — nazwa, opis, lista świadczeń), tekst i lista form współpracy

`SponsorsSection` (loga sponsorów klubu) renderowany jest **raz, na poziomie `SectionLayout`** — tuż nad stopką, na każdej zakładce sekcji (Klub, Drużyna, Kontakt, Strefa Przyjaciół, Zostań Partnerem, Media). Dane klubu (`clubName`, `sponsors`) pobierane są w `routes/mezczyzni/layout.tsx` (pathless layout route, patrz sekcja 4) przez `useClubData` i przekazywane do `SectionLayout`. Poszczególne zakładki (np. `ClubInfo`, `PatronsInfo`) **nie** renderują własnej kopii tego komponentu.

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
- Obowiązkowe testy: przekierowanie z ekranu startowego (`/`) do `/klub`, przełączanie zakładek, renderowanie danych z warstwy serwisowej

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

- Branch naming: `feature/...`, `fix/...`, `chore/...`; `archive/...` dla gałęzi-snapshotów zachowujących stan repo do wglądu/wznowienia w przyszłości (np. `archive/kobiety-mezczyzni`) — nie są to gałęzie robocze i nie powinny być mergowane
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
