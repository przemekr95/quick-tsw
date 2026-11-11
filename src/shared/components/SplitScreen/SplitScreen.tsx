import { Link } from 'react-router-dom';
import { CLUB_CREST_SRC, MEN_SECTION_PATH, WOMEN_SECTION_URL } from '../../utils/config';
import styles from './SplitScreen.module.scss';

interface PanelContentProps {
  sectionName: string;
}

function PanelContent({ sectionName }: PanelContentProps) {
  return (
    <>
      <span aria-hidden="true" className={styles.scrim} />
      <span aria-hidden="true" className={styles.eyebrow}>
        Sekcja siatkówki
      </span>
      <span className={styles.label}>{sectionName}</span>
      <span aria-hidden="true" className={styles.cta}>
        Poznaj sekcję
        <span className={styles.arrow}>→</span>
      </span>
    </>
  );
}

export function SplitScreen() {
  return (
    <main className={styles.root}>
      <h1 className={styles.heading}>Wybierz sekcję siatkówki TS Wisła Kraków</h1>

      <a
        aria-label="Sekcja siatkówki kobiet"
        className={styles.panel}
        data-variant="kobiety"
        href={WOMEN_SECTION_URL}
      >
        <PanelContent sectionName="Kobiet" />
      </a>

      <div aria-hidden="true" className={styles.crestGlow} />
      <div aria-hidden="true" className={styles.divider} />
      <div aria-hidden="true" className={styles.crest}>
        <img alt="" className={styles.crestImage} src={CLUB_CREST_SRC} />
      </div>

      <Link
        aria-label="Sekcja siatkówki mężczyzn"
        className={styles.panel}
        data-variant="mezczyzni"
        to={`${MEN_SECTION_PATH}/klub`}
      >
        <PanelContent sectionName="Mężczyzn" />
      </Link>
    </main>
  );
}
