import type { Club } from '../../../shared/types/domain';
import { SponsorsCarousel } from '../SponsorsCarousel';
import styles from './ClubInfo.module.scss';

interface ClubInfoProps {
  club: Pick<Club, 'name' | 'history' | 'sponsors'>;
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

export function ClubInfo({ club }: ClubInfoProps) {
  return (
    <section aria-labelledby="club-heading" className={styles.root}>
      <header className={styles.hero}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Klub</p>
          <h2 id="club-heading" className={styles.name}>
            {club.name}
          </h2>
          <p className={styles.lead}>{club.history}</p>
          <p className={styles.bodyText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,
            dignissim sit amet, adipiscing nec, ultricies sed, dolor.
          </p>
        </div>

        <div className={styles.gallery} aria-label="Galeria klubowa">
          <figure className={styles.galleryPrimary}>
            <img alt={clubImages[0].alt} className={styles.galleryImage} src={clubImages[0].src} />
          </figure>
          <figure className={styles.gallerySecondary}>
            <img alt={clubImages[1].alt} className={styles.galleryImage} src={clubImages[1].src} />
          </figure>
          <div className={styles.galleryNote}>
            <span className={styles.galleryNoteLabel}>Sezon</span>
            <strong>Nowa energia</strong>
            <p>Fokus na rozwój, charakter i mocny klubowy styl.</p>
          </div>
        </div>
      </header>

      <section aria-label="Sygnały klubu" className={styles.signals}>
        <article className={styles.signalCard}>
          <p className={styles.signalIndex}>01</p>
          <h3>Tożsamość</h3>
          <p>Zespół oparty na dyscyplinie, energii i ciągłym rozwoju.</p>
        </article>

        <article className={styles.signalCard}>
          <p className={styles.signalIndex}>02</p>
          <h3>Rytm sezonu</h3>
          <p>Pracujemy w cyklach, które budują stabilność i świeżość gry.</p>
        </article>

        <article className={styles.signalCard}>
          <p className={styles.signalIndex}>03</p>
          <h3>Wspólnota</h3>
          <p>Klub rośnie dzięki ludziom, którzy tworzą jego codzienność.</p>
        </article>
      </section>

      <section aria-labelledby="sponsors-heading" className={styles.sponsors}>
        <div className={styles.sponsorsHeader}>
          <p className={styles.cardLabel}>Partnerzy</p>
          <h3 id="sponsors-heading">Sponsorzy</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam cursus, arcu a pharetra volutpat, dui sem
            pellentesque nunc, sed convallis massa lectus sed nibh.
          </p>
        </div>
        <SponsorsCarousel sponsors={club.sponsors} />
      </section>
    </section>
  );
}
