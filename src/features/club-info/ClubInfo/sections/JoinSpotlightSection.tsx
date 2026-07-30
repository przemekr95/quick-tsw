import { Link } from 'react-router-dom';
import styles from '../ClubInfo.module.scss';

interface JoinSpotlightSectionProps {
  recruitmentPaths: string[];
  imageSrc: string;
}

export function JoinSpotlightSection({ recruitmentPaths, imageSrc }: JoinSpotlightSectionProps) {
  return (
    <section className={styles.joinSpotlight} id="dolacz-do-nas" aria-labelledby="dolacz-do-nas-heading">
      <div className={styles.joinContent}>
        <p className={styles.joinEyebrow}>Dołącz do nas</p>
        <h3 id="dolacz-do-nas-heading" className={styles.joinTitle}>Twoje miejsce jest na boisku.</h3>
        <span aria-hidden="true" className={styles.joinAccentLine} />
        <p className={styles.joinLead}>
          Zapraszamy zawodników na każdym poziomie - od młodych adeptów po doświadczonych rywalizatorów.
          Volterra VC oferuje usystematyzowane treningi, ligi rozgrywkowe i społeczność, która wyciągnie z
          Ciebie to, co najlepsze.
        </p>
        <ul className={styles.recruitmentList}>
          {recruitmentPaths.map((path) => (
            <li key={path}>{path}</li>
          ))}
        </ul>
        <Link className={styles.primaryCta} to="../kontakt">
          Skontaktuj się <span aria-hidden="true">-&gt;</span>
        </Link>
      </div>

      <div className={styles.joinVisual}>
        <figure className={styles.joinImage}>
          <img alt="Zawodnicy przy siatce podczas akcji" loading="lazy" src={imageSrc} />
        </figure>
        <aside className={styles.joinPanel}>
          <p className={styles.joinPanelEyebrow}>Następny nabór</p>
          <p className={styles.joinPanelTitle}>Wrzesień 2026</p>
          <p className={styles.joinPanelLead}>
            Zapisy do Akademii Młodzieżowej oraz drużyny seniorskiej są otwarte. Skontaktuj się z nami, aby
            dowiedzieć się więcej.
          </p>
        </aside>
      </div>
    </section>
  );
}
