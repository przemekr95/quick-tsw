# Changelog

Zmiany na publicznej stronie, najnowsze na górze. Data to dzień wdrożenia na produkcję (https://siatkowka.tswisla.pl). Historia od 6.11.2026, wcześniejsze zmiany są w `git log`.

## 2026-11-12

### Zmienione

- Tabela ligowa: kolumny jak w MZPS (Lp., Drużyna, Pkt, M, Sety, Małe pkt) i link do źródła. Dane pobiera backend z MZPS.

## 2026-11-11

### Dodane

- Na `/` jest wybór sekcji. Mężczyźni prowadzą do `/mezczyzni/klub`, kobiety na stronę klubu tswisla.pl.
- SEO: każda podstrona ma własny plik HTML z tytułem, opisem, og:* i canonical. Doszły `robots.txt` (blokuje `/api/` i `/konto/`), `sitemap.xml` i dane strukturalne (klub, drużyna, najbliższy mecz).
- Drużyna: aktualne zdjęcie zespołu.

### Zmienione

- Zakładki sekcji mężczyzn przeszły pod `/mezczyzni/…`. Stare adresy przekierowuje serwer.
- Mniejsze zdjęcia zawodników, herb, favicon i tła.
- Herb z poświatą gwiazdy.

### Naprawione

- Pasek sponsorów nie skacze, gdy ładuje się treść zakładki.
- Tabela ligowa jest posortowana według miejsca.
- Gdy zapytanie do API się nie powiedzie, strona pokazuje komunikat zamiast pustej sekcji.

## 2026-11-09

### Dodane

- Link do Strefy zawodnika w stopce. Panel to osobna aplikacja pod `/konto/`.
