import { Link } from 'react-router-dom';
import type { Club } from '../../../shared/types/domain';
import { SponsorsCarousel } from '../SponsorsCarousel';
import styles from './ClubInfo.module.scss';

interface ClubInfoProps {
  club: Pick<Club, 'arenaAddress' | 'board' | 'sponsors'>;
}

const clubImages = [
  {
    src: '/images/backgrounds/hero-k.jpg',
    alt: 'Zdjęcie meczowe drużyny siatkarskiej w czerwonej tonacji',
  },
  {
    src: '/images/backgrounds/hero-m.jpg',
    alt: 'Zdjęcie meczowe drużyny siatkarskiej w niebieskiej tonacji',
  },
] as const;

const sectionTabs = [
  { id: 'o-klubie', label: 'O klubie' },
  { id: 'nasza-druzyna', label: 'Nasza drużyna' },
  { id: 'dolacz-do-nas', label: 'Dołącz do nas' },
  { id: 'najblizszy-mecz', label: 'Najbliższy mecz' },
] as const;

const teamPillars = [
  { label: 'Trening', value: '6 dni / tydzień' },
  { label: 'Rytm', value: 'Intensywność + analiza' },
  { label: 'Cel', value: 'Stabilna forma meczowa' },
] as const;

const nextMatch = {
  opponent: 'Volley City',
  date: '14 września 2026',
  time: '18:00',
  arena: 'Hala Główna',
};

export function ClubInfo({ club }: ClubInfoProps) {
  const boardPreview = club.board.slice(0, 3);

  return (
    <section aria-label="Zakładka Klub" className={styles.root}>

      <nav aria-label="Nawigacja sekcji klubu" className={styles.tabRail}>
        <ul>
          {sectionTabs.map((tab) => (
            <li key={tab.id}>
              <a href={`#${tab.id}`}>{tab.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.sections}>
        <section className={`${styles.row} ${styles.rowClub}`} id="o-klubie" aria-labelledby="o-klubie-heading">
          <div className={styles.rowContent}>
            <p className={styles.panelIndex}>01</p>
            <h3 id="o-klubie-heading">O klubie</h3>
            <p>
              Łączymy profesjonalne przygotowanie sportowe z kulturą zespołu opartą na odpowiedzialności,
              konsekwencji i codziennym postępie.
            </p>
            <p>Trenujemy i gramy w hali przy <strong>{club.arenaAddress}</strong>.</p>
          </div>
          <figure className={styles.rowImage}>
            <img alt={clubImages[1].alt} loading="lazy" src={clubImages[1].src} />
          </figure>
        </section>

        <section className={`${styles.row} ${styles.rowTeam}`} id="nasza-druzyna" aria-labelledby="nasza-druzyna-heading">
          <div className={styles.rowContent}>
            <p className={styles.panelIndex}>02</p>
            <h3 id="nasza-druzyna-heading">Nasza drużyna</h3>
            <p>
              Budujemy zespół gotowy na wysokie tempo gry i szybkie decyzje, bez kompromisów w jakości technicznej.
            </p>
            <ul className={styles.pillarsList}>
              {teamPillars.map((pillar) => (
                <li key={pillar.label}>
                  <span>{pillar.label}</span>
                  <strong>{pillar.value}</strong>
                </li>
              ))}
            </ul>
            <div className={styles.boardSection}>
              <p className={styles.boardLabel}>Zarząd</p>
              <ul>
                {boardPreview.length > 0 ? (
                  boardPreview.map((member) => <li key={member}>{member}</li>)
                ) : (
                  <li>Skład zarządu w przygotowaniu</li>
                )}
              </ul>
            </div>
          </div>
          <figure className={styles.rowImage}>
            <img alt={clubImages[0].alt} loading="lazy" src={clubImages[0].src} />
          </figure>
        </section>

        <section className={`${styles.row} ${styles.rowJoin}`} id="dolacz-do-nas" aria-labelledby="dolacz-do-nas-heading">
          <div className={styles.rowContent}>
            <p className={styles.panelIndex}>03</p>
            <h3 id="dolacz-do-nas-heading">Dołącz do nas</h3>
            <p>
              Chcesz trenować, dołączyć do sztabu albo wspierać klub jako partner? Odezwij się, a wrócimy z
              najbliższymi terminami i możliwościami współpracy.
            </p>
            <Link className={styles.primaryCta} to="../kontakt">
              Skontaktuj się
            </Link>
          </div>
          <figure className={styles.rowImage}>
            <img alt={clubImages[0].alt} loading="lazy" src={clubImages[0].src} />
          </figure>
        </section>

        <section className={`${styles.row} ${styles.rowMatch}`} id="najblizszy-mecz" aria-labelledby="najblizszy-mecz-heading">
          <div className={styles.rowContent}>
            <p className={styles.panelIndex}>04</p>
            <h3 id="najblizszy-mecz-heading">Najbliższy mecz</h3>
            <div className={styles.matchGrid}>
              <p>
                Rywal
                <strong>{nextMatch.opponent}</strong>
              </p>
              <p>
                Data
                <strong>{nextMatch.date}</strong>
              </p>
              <p>
                Godzina
                <strong>{nextMatch.time}</strong>
              </p>
              <p>
                Miejsce
                <strong>{nextMatch.arena}</strong>
              </p>
            </div>
          </div>
        </section>
      </div>

      <section aria-labelledby="sponsors-heading" className={styles.sponsorRow}>
        <div className={styles.sponsorIntro}>
          <p className={styles.panelIndex}>05</p>
          <h3 id="sponsors-heading">Sponsorzy</h3>
          <p>Partnerzy, którzy wspierają rozwój zespołu i codzienną pracę klubu.</p>
        </div>
        <SponsorsCarousel sponsors={club.sponsors} />
      </section>
    </section>
  );
}
