# AGENTS.md — kontekst i wytyczne dla agentów AI

Ten plik jest źródłem prawdy dla wszystkich decyzji technicznych w tym repozytorium. Każdy agent AI (Claude Code, Cursor, Copilot itd.) pracujący nad tym projektem powinien go przeczytać przed rozpoczęciem pracy i trzymać się opisanych tu konwencji, chyba że użytkownik jawnie poprosi o odstępstwo.

## 1. Kontekst projektu

Strona internetowa klubu siatkarskiego. Obecnie repozytorium obejmuje wyłącznie sekcję **Mężczyźni**, której zakładki żyją pod prefiksem `/mezczyzni` (`/mezczyzni/klub`, `/mezczyzni/druzyna` itd.). Punkt wejścia (`/`) to ekran wyboru sekcji typu split-screen (`SplitScreen`): panel **Mężczyzn** prowadzi do `/mezczyzni/klub` (cała ta strona), a panel **Kobiet** jest zwykłym linkiem zewnętrznym do kategorii siatkówki kobiet na stronie klubu (`https://www.tswisla.pl/category/siatkowka-kobiet/`, `WOMEN_SECTION_URL` w `shared/utils/config.ts`) — sekcja kobiet nie ma własnych podstron w tym repozytorium.

> **Historia:** do września 2026 serwis miał dwie równoległe sekcje — **Kobiety** i **Mężczyźni** — wybierane z ekranu startowego typu split-screen. Prace nad sekcją kobiet zostały wstrzymane, a `develop` uproszczono do samej sekcji mężczyzn. Od listopada 2026 split-screen wrócił na `/`, ale panel kobiet prowadzi na zewnętrzną stronę klubu zamiast do `/kobiety/*`; razem z nim wrócił prefiks `/mezczyzni` w adresach zakładek (między wrześniem a listopadem 2026 zakładki żyły bez prefiksu, pod `/klub` itd.). Pełny, dwusekcyjny stan (split-screen, `/kobiety/*`, motyw czerwony, mocki i serwisy dla obu sekcji) jest zachowany na gałęzi `archive/kobiety-mezczyzni` i posłuży jako punkt wyjścia, gdy prace nad sekcją kobiet zostaną wznowione. Architektura danych (patrz sekcja 6) celowo pozostała parametryczna przez `SectionId`/`SectionPath` — przywrócenie drugiej sekcji to rozszerzenie tych typów i serwisów o kolejną gałąź, a nie przebudowa struktury.

Sekcja ma 6 zakładek, w tej kolejności w nawigacji: **Aktualności** (link zewnętrzny do Facebooka, nie osobna podstrona), **Klub**, **Drużyna**, **Przyjaciele** (tytuł strony: „Przyjaciele Białej Gwiazdy”), **Zostań Partnerem**, **Kontakt**.

Sekcja ma też podstronę **Media** (`/mezczyzni/media`) z materiałami klubowymi: księga znaków, kolory klubu (oba historyczne kolory klubu — niebieski i czerwony, patrz sekcja 5), pliki do pobrania. Dostępna wyłącznie z linku w stopce (nie jest osobną pozycją w głównej nawigacji zakładek) — celowo w motywie sekcji, nie osobnym neutralnym motywem, żeby zachować pełną nawigację (Klub/Drużyna/Kontakt/Przyjaciele/Zostań Partnerem) i spójność wizualną. Treść żyje w komponencie `features/media`, zaprojektowanym tak, by dało się go współdzielić z kolejną sekcją bez zmian w zawartości.

To jest **etap 1 — szablon (template)**, który będzie rozwijany iteracyjnie w kolejnych etapach. Architektura musi to ułatwiać: dane mockowane dziś muszą dać się łatwo podmienić na prawdziwe API/CMS, a dodanie treści/funkcji w przyszłości nie powinno wymagać przebudowy struktury.

## 2. Stack technologiczny

| Warstwa           | Wybór                                                                                                                                                                                                                                                                                           |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework         | React 19.x + TypeScript (strict mode, bez `any`)                                                                                                                                                                                                                                                |
| Build tool        | Vite 6.x                                                                                                                                                                                                                                                                                        |
| Routing           | React Router 7.x, tryb deklaratywny/biblioteczny (`createBrowserRouter`), **bez SSR** — czysty SPA                                                                                                                                                                                              |
| Stylowanie        | CSS Modules + SCSS                                                                                                                                                                                                                                                                              |
| Linter stylów     | Stylelint (`stylelint-config-standard-scss` + `stylelint-config-css-modules`)                                                                                                                                                                                                                   |
| Linter kodu       | ESLint 9.x, flat config (`eslint.config.js`), `typescript-eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`, `eslint-plugin-vitest` (pliki testowe)                                                                                                         |
| Formatowanie      | Prettier — uruchamiany niezależnie od ESLint (nie przez `eslint-plugin-prettier`), żeby lint i format się nie dublowały                                                                                                                                                                         |
| Testy             | Vitest + React Testing Library + jsdom                                                                                                                                                                                                                                                          |
| Menedżer pakietów | npm                                                                                                                                                                                                                                                                                             |
| Pre-commit        | Husky + lint-staged                                                                                                                                                                                                                                                                             |
| CI                | GitHub Actions (lint, stylelint, typecheck, test + coverage, build)                                                                                                                                                                                                                             |
| Hosting           | Caddy pod `siatkowka.tswisla.pl` (konfiguracja serwera poza tym repo, wymagania w sekcji 13). Build pozostaje czystym, statycznym SPA (`dist/`): pliki SEO to zwykłe pliki obok `index.html`, a na hostingu bez reguły dla `.html` strona dalej działa, tylko roboty bez JS dostają ogólne meta |

## 3. Struktura katalogów

```
src/
  app/
    routes/
      index.tsx                # ekran startowy (SplitScreen: wybór sekcji kobiety/mężczyźni)
      mezczyzni/                # trasy pod prefiksem /mezczyzni (patrz sekcja 4)
        layout.tsx              # layout route /mezczyzni + nawigacja po zakładkach
        klub.tsx
        druzyna.tsx
        kontakt.tsx
        przyjaciele.tsx
        zostan-partnerem.tsx
        media.tsx                # podstrona Media w motywie mężczyzn
    router.tsx                  # definicja routera
    providers/
      ThemeProvider.tsx
  features/
    club-info/
    team-roster/
    contact/
    patrons/                    # zakładka Przyjaciele (Białej Gwiazdy)
    partnership/                 # zakładka Zostań Partnerem
    media/                      # zawartość podstrony Media
  shared/
    components/                 # SplitScreen, Tabs, Layout, Button...
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

- `/` — ekran startowy (`shared/components/SplitScreen`) z wyborem sekcji: „Mężczyzn” to `<Link>` do `/mezczyzni/klub`, „Kobiet” to zwykły `<a>` (ta sama karta) do `WOMEN_SECTION_URL` na stronie klubu. Herb w `NavBar` prowadzi z powrotem na `/`, więc z sekcji mężczyzn zawsze da się wrócić do wyboru (i przejść do sekcji kobiet); stronę Klub otwiera zakładka „Klub”
- Zakładki sekcji żyją pod prefiksem sekcji: `/mezczyzni/klub`, `/mezczyzni/druzyna`, `/mezczyzni/kontakt`, `/mezczyzni/przyjaciele`, `/mezczyzni/zostan-partnerem`, `/mezczyzni/media` — w `router.tsx` trasa `path: MEN_SECTION_PATH` ma dzieci: przekierowania (goły `/mezczyzni` → `/mezczyzni/klub`, `/mezczyzni/strefa-przyjaciol` → `/mezczyzni/przyjaciele`) oraz bezścieżkowy layout sekcji (`MezczyzniLayoutRoute`) z zakładkami. Przekierowania celowo leżą poza layoutem, żeby nie rysował się on na chwilę przed przeniesieniem. Prefiks odróżnia tę sekcję od wyboru na ekranie startowym i zostawia miejsce na ewentualne `/kobiety/*` w przyszłości.
- `SectionPath` (`shared/types/domain.ts`) jest wyprowadzony z `SectionId` (`` `/${SectionId}` ``), a wartość `/mezczyzni` żyje tylko w stałej `MEN_SECTION_PATH` w `shared/utils/config.ts` — router, layout, strona 404 i `SplitScreen` biorą prefiks z niej, nie wpisują go ręcznie. `NavBar`/`Footer` budują linki jako `` `${sectionPath}/${link.path}` ``, a linki wewnątrz treści zakładek są względne (`../kontakt`), więc nie hardkodują prefiksu. Wyjątek: przyciski slajdów hero (`HeroCtaButton`) renderują się w layoucie, nie w zakładce, więc ich względne `ctaHref` z danych (np. `../kontakt`) są rozwiązywane jawnie (`resolvePath`) względem strony Klub sekcji, przekazanej z `SectionLayout` jako `relativeTo` — niezależnie od wielkości liter czy ukośnika w adresie. Adresy z protokołem (`https:`, `mailto:`, `tel:`, `//`) zostają nietknięte. Przy przywróceniu drugiej sekcji (patrz `archive/kobiety-mezczyzni`) wystarczy rozszerzyć `SectionId` o `'kobiety'`.
- Ostatnia trasa routera (`path: '*'`) przenosi każdy inny adres spoza sekcji pod prefiks: `/x` → `/mezczyzni/x`. Dzięki temu dawne adresy bez prefiksu (`/klub`, `/kontakt`, `/strefa-przyjaciol` itd.) trafiają na właściwe zakładki bez osobnej listy do utrzymywania, a nieznane adresy kończą na stronie „Nie znaleziono strony” (noindex) w chromie sekcji — w jednej instancji layoutu, więc przejście z 404 do zakładki nie przeładowuje go od nowa
- `/kobiety/*` (adresy z czasów dwusekcyjnego serwisu, patrz `archive/kobiety-mezczyzni`) przekierowuje przez `shared/components/ExternalRedirect` na `WOMEN_SECTION_URL`
- Wszystkie przekierowania wewnątrz serwisu używają `shared/components/PathRedirect` zamiast gołego `<Navigate replace>` — zachowuje on query string i hash starego adresu (np. `?fbclid=`, `?utm_…` z linków udostępnionych na Facebooku). To przekierowania po stronie przeglądarki; po wyborze hostingu (sekcja 12) warto zdublować je jako 301 na serwerze, żeby wyszukiwarki przeniosły stare adresy
- `/mezczyzni/media` renderuje treść ze wspólnego komponentu `features/media` — tylko link w stopce, nie osobna pozycja w NavBar
- Stopka (`shared/components/Footer`) celowo **nie powtarza** zakładek z NavBar — pasek nawigacji jest przypięty (`position: fixed`) i zawsze widoczny, więc pełna lista na dole byłaby duplikatem. Stopka to nazwa sekcji (pełna forma, np. „Siatkówka mężczyzn”, przekazywana z layoutu jako `sectionName`), krótka lista linków z `FOOTER_LINKS` w `shared/utils/config.ts` (Media, Kontakt) i zwykły link „Strefa zawodnika” do `/konto/` (osobna aplikacja, repo `quick-tsw-konto`, poza routerem tej strony), ikony Facebooka i Instagrama, a pod nią linia copyright. Nazwa klubu pada tylko w copyright — bez osobnego logotypu/napisu, żeby się nie dublowała
- Adresy URL są bez polskich znaków i małymi literami; w interfejsie (nawigacja) wyświetlana etykieta to pełna, poprawna forma: **„Mężczyźni”**
- „Aktualności” **nie jest trasą** — to zwykły `<a target="_blank" rel="noopener noreferrer">` do strony klubu na Facebooku (URL na razie jako placeholder w konfiguracji)

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

Niebieski jest kolorem wiodącym jedynej aktywnej sekcji; czerwony pozostaje w tokenach (`--color-club-red`, patrz `ClubColorsSection` na stronie Media i panel kobiet na ekranie startowym `SplitScreen`) jako część księgi znaków klubu, ale nie jest już przypisany do żadnego `[data-theme]`. Złoty jest wspólnym akcentem dekoracyjnym, czerń używana oszczędnie.

**Implementacja:** zmienne CSS (`--color-primary`, `--color-background`, `--color-text`, `--color-accent`, `--color-emphasis`, `--font-family-base`...) ustawiane na `[data-theme="mezczyzni"]` na elemencie root layoutu sekcji. Komponenty **nigdy** nie hardkodują kolorów ani fontów — zawsze przez zmienne. Dodanie kolejnego motywu (np. przywrócenie `[data-theme="kobiety"]`) w przyszłości ma być zmianą w jednym pliku (`tokens.scss`), analogicznie do stanu zachowanego na gałęzi `archive/kobiety-mezczyzni`.

**Ciemne tło treści zakładek:** `--color-surface-start` / `--color-surface-end` (`#121212` → `#2c2c2c`) to standardowe tło elementu `.root` **każdej** zakładki treści (`ClubInfo`, `ContactInfo`, `TeamRoster`, `PatronsInfo`, `PartnershipInfo`, `MediaInfo`) — w połączeniu z radialnym gradientem koloru sekcji (`--color-primary`) daje spójny, ciemny, premium wygląd całej treści. Ekran startowy (`src/shared/components/SplitScreen`) jest wyjątkiem: to dwa panele ze zdjęciami w duotonie kolorów klubu (`--color-club-red` dla kobiet, `--color-club-blue` dla mężczyzn) na tle `--color-surface-start`. `--color-background` (białe) pełni w tym kontekście dwie role: jest kolorem tekstu na ciemnym tle (`color: var(--color-background)` na każdym `.root`) oraz realnym białym tłem elementów, które celowo pozostają jasne mimo sąsiedztwa z ciemną treścią — np. zamykający każdą zakładkę `SponsorsSection` czy chrom `SectionLayout` (`.headerInline`/`.main`) poza samym `.root`. Przy dodawaniu nowej zakładki treści kopiuj dokładnie ten sam wzorzec `.root`/`.stack` (patrz dowolny z istniejących komponentów wyżej) — nie twórz jasnej (białej) alternatywy, bo złamie to spójność wizualną całego serwisu.

## 6. Warstwa danych (mock → przyszłe API)

Na tym etapie dane pochodzą z plików JSON w `src/data/mocks/`. Dostęp do danych **zawsze** przez warstwę serwisów (`src/data/services/*.ts`) — nigdy przez bezpośredni import JSON w komponencie. Serwisy zwracają `Promise` (nawet czytając lokalny plik) i są typowane przez wspólne typy domenowe z `shared/types/`. Dzięki temu podmiana na prawdziwe API/CMS w kolejnym etapie wymaga zmiany tylko wewnątrz serwisu, nie w komponentach.

Sugerowany kształt danych (do rozbudowy w kolejnych etapach):

- `Club` — nazwa, opis/historia, adres hali, zarząd, sponsorzy
- `Player` — imię, nazwisko, numer, pozycja, zdjęcie (placeholder)
- `ContactInfo` — adres, telefon, e-mail, link do mapy
- `Patron` — nazwa wspierającego, poziom wsparcia (`tier`: 1 — Mecenas, 2 — Darczyńca, 3 — Przyjaciel Klubu; analogicznie do `Sponsor`), opcjonalna krótka wiadomość
- `PartnershipContent` — treść zakładki Zostań Partnerem: tekst wprowadzenia, lista korzyści, pakiety partnerskie (`PartnershipTier[]` — nazwa, opis, lista świadczeń), tekst i lista form współpracy

`SponsorsSection` (loga sponsorów klubu) renderowany jest **raz, na poziomie `SectionLayout`** — tuż nad stopką, na każdej zakładce sekcji (Klub, Drużyna, Kontakt, Przyjaciele, Zostań Partnerem, Media). Dane klubu (`clubName`, `sponsors`) pobierane są w `routes/mezczyzni/layout.tsx` (layout route `/mezczyzni`, patrz sekcja 4) przez `useClubData` i przekazywane do `SectionLayout`. Poszczególne zakładki (np. `ClubInfo`, `PatronsInfo`) **nie** renderują własnej kopii tego komponentu.

Hooki danych (`useTeamRoster`, `useContactInfo`...) są cienkimi nakładkami na `shared/hooks/useSectionData` i zwracają `{ data, loading, error, retry }`. Każda zmiana sekcji i każde ponowienie to nowe zapytanie z własnym numerem i liczy się tylko jego wynik (spóźnione odpowiedzi są ignorowane), a puste listy są stałymi modułu (stabilna tożsamość `data`). `apiClient` przerywa zapytanie po 10 s (`API_TIMEOUT_MS`), więc zawieszony serwer też kończy się błędem, a nie wiecznym ładowaniem. Nieudane zapytanie daje `error: true` i wpis w konsoli (`console.error` z nazwą zapytania). Zakładka chowa wtedy tylko sekcje zbudowane z nieudanego zapytania — `ClubInfo`/`TeamRoster` dostają `null` zamiast danych — a na Klubie w ich miejscu pojawia się `shared/components/PartialDataNotice` („Nie udało się wczytać składu drużyny, meczów i tabeli ligowej.” + „Spróbuj ponownie”). Pełny komunikat `shared/components/ErrorState` pojawia się, gdy padła główna treść zakładki: jedyne źródło danych (Kontakt, Przyjaciele, Zostań Partnerem), zawodnicy na Drużynie albo zapytania layoutu na Klubie (dane klubu i treść hero, przekazywane przez kontekst `Outlet` jako `loadError`/`retryLoad`). Oba komunikaty używają `shared/components/RetryButton`, który ponawia tylko nieudane zapytania i przenosi fokus do `<main>` (`MAIN_CONTENT_ID`), bo sam przycisk znika. Na innych zakładkach błąd danych layoutu nie zasłania treści: hero bez treści nie rysuje pustego `h1` ani przycisku, a etykiety `SponsorsSection` pomijają brakującą nazwę klubu. Na razie przez API idą mecze, przyjaciele, tabela i zawodnicy; pozostałe serwisy czytają lokalne mocki. `LoadingState` i `ErrorState` zajmują pełną wysokość okna (animacja ładowania w środku górnych 70%), żeby pasek sponsorów pod nimi nie wskakiwał w widok i nie wyskakiwał po zmianie treści (CLS). Panel komunikatu (404, błąd) i pełny przycisk dzielą style z `shared/theme/_messagePanel.scss` i `_buttons.scss`.

## 7. Konwencje komponentów

- Komponenty funkcyjne, bez class components, bez `React.FC` (zwykła funkcja z typowanym argumentem `ComponentNameProps`)
- Komponenty „głupie” (prezentacyjne, `shared/components`) nie znają się na danych/serwisach — dostają dane przez propsy
- Logika pobierania danych żyje w hookach (`useClubData`, `useTeamRoster`...) lub loaderach tras, nie w komponentach prezentacyjnych
- Dostępność: semantyczny HTML, `alt` na obrazkach, widoczny focus, `aria-*` tam gdzie potrzebne — cel: WCAG AA
- Mobile-first, responsywność jako podstawowy wymóg (nie dodatek)

## 8. Testy

- Próg pokrycia: **80%** (statements, branches, functions, lines), skonfigurowany w `vitest.config.ts` (`coverage.thresholds`) — CI failuje poniżej progu
- React Testing Library — testujemy zachowanie widoczne dla użytkownika, nie szczegóły implementacji
- Każdy nowy komponent/hook/serwis ma odpowiadający plik testowy
- Obowiązkowe testy: wybór sekcji na ekranie startowym (`/`: mężczyźni → `/mezczyzni/klub`, kobiety → strona klubu), przełączanie zakładek, renderowanie danych z warstwy serwisowej

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

## 12. SEO

- **Adres serwisu:** `VITE_SITE_URL` w `.env` (`https://siatkowka.tswisla.pl`, bez końcowego `/` — build go odrzuca, bo `index.html` wstawia wartość wprost). Z niego powstają `canonical`, `og:url`, pełny adres `og:image`, `sitemap.xml` i adresy w danych strukturalnych. Pusty = build pomija canonical/og:url/sitemap i ostrzega, a adresy w przeglądarce powstają z bieżącego originu i `BASE_URL` (np. testowy deploy pod podścieżką). Testowe deploye (`ghp_*`) budują z pustym `VITE_SITE_URL=` w workflow, żeby canonical, sitemap i adresy w JSON-LD nie wskazywały produkcji.
- **HTML dla każdej strony:** plugin `quick-tsw:seo-files` w `vite.config.ts` po buildzie zapisuje kopię `index.html` dla każdej strony z `SITE_PAGES` (`shared/utils/sitePages.ts`) jako `dist/mezczyzni/druzyna.html` itd. — z jej tytułem, opisem, `og:*` i `canonical`. Roboty bez JS (Facebook, Messenger) czytają tylko to. Dodając nową zakładkę, dopisz ją do `SITE_PAGES` (test w `sitePages.test.ts` pilnuje zgodności z routerem). Sam `index.html` celowo nie ma `canonical`, bo hosting serwuje go też dla nieznanych adresów (SPA fallback); ta sama powłoka trafia jako `index.html` do każdego folderu, który tworzą pliki stron (`dist/mezczyzni/index.html`), żeby adres folderu (`/mezczyzni/`) nie kończył się 404/403 hostingu. Adresy samych plików router przekierowuje na właściwe adresy (`pathFromHtmlFile`): w sekcji robi to `shared/components/HtmlFileRedirect` na trasie `/mezczyzni`, zanim narysuje się layout, a poza sekcją ostatnia trasa routera (`/klub.html` → `/mezczyzni/klub`, `/index.html` → `/`).
- **W przeglądarce** `usePageMeta` aktualizuje title, description, `og:title`/`og:description`/`og:url` i `canonical` (zawsze małe litery, bez końcowego `/`; na stronie 404 bez canonical, z `noindex`).
- **`robots.txt` i `sitemap.xml`** generuje ten sam plugin (`shared/utils/seoFiles.ts`). `robots.txt` obejmuje całą domenę, więc blokuje `/api/` (surowe dane) i `/konto/` (Strefa zawodnika, osobna aplikacja za logowaniem). Manifest (`public/site.webmanifest`) używa ścieżek względnych, żeby działał też pod podścieżką.
- **Dane strukturalne (JSON-LD):** w `index.html` statycznie `WebSite` i `SportsOrganization` klubu; w trasach przez `shared/components/StructuredData` budowane w `shared/utils/structuredData.ts`: `SportsTeam` (Klub — bez listy zawodników, bo strona pokazuje tylko 4 losowych; Drużyna z zawodnikami i trenerem, o ile ich sekcje się wczytały; Kontakt z danymi kontaktowymi), `SportsEvent` tylko dla najbliższego meczu i tylko gdy ma podane miejsce — jedyny mecz, którego miejsce strona pokazuje (Google wymaga lokalizacji, nie zgadujemy jej) — renderowany w `ClubInfo` z tego samego harmonogramu, który sekcja pokazuje, oraz `BreadcrumbList` w layoucie. Zasada: tylko fakty, które strona pokazuje; tekst z API jest escapowany (`<` → `\u003c`).
- **Nagłówki:** `h1` Klubu to sam slogan z danych — bez ukrytego tekstu ze słowami kluczowymi (Google traktuje taki tekst jako spam); słowa kluczowe są w tytule, opisie i danych strukturalnych. `h2` najbliższego meczu ma ukryty wizualnie prefiks „Najbliższy mecz: ” dla czytników ekranu (sama nazwa rywala nie mówi, czego dotyczy sekcja).
- **Linki do sponsorów** mają `rel="sponsored"` (wymóg Google dla płatnych linków).
- **Tytuły** do 60 znaków, opisy do 160 (pilnują testy w `pageMeta.test.ts`).
- **Obrazy:** zdjęcia zawodników/sztabu maks. 864 px szerokości (największe wyświetlenie to ok. 858 px przy ekranie 3×), tła 1600 px, PNG herbu/faviconu z paletą 256 kolorów. Nowe zdjęcia przygotowuj tak samo.

## 13. Otwarte decyzje do potwierdzenia przez klub/zespół

- Hosting: domena `siatkowka.tswisla.pl` stoi na **Caddy**, a jego konfiguracji nie ma w tym repo. Żeby pliki SEO działały, Caddy musi serwować `/mezczyzni/druzyna` z `mezczyzni/druzyna.html` (bez przekierowania na końcowy `/`), a dla pozostałych adresów `index.html` (SPA fallback): `try_files {path} {path}.html /index.html` przed `file_server`. Bez tego roboty bez JS dostają ogólne meta z `index.html`; `robots.txt`/`sitemap.xml` to zwykłe pliki, więc są serwowane i tak. Docelowo także prawdziwe 404 i przekierowania 301 dla dawnych adresów (`/klub` → `/mezczyzni/klub` itd.) zamiast obecnych przekierowań w przeglądarce.
- Zakres zakładki „Kontakt” (czy ma być formularz, czy tylko dane statyczne)
