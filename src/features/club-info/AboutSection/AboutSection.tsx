import { ArrowLink } from '../ArrowLink';
import styles from './AboutSection.module.scss';

interface AboutSectionProps {
  clubName: string;
  history: string;
  historyUrl: string;
  imageSrc: string;
  imageAlt: string;
}

export function AboutSection({
  clubName,
  history,
  historyUrl,
  imageSrc,
  imageAlt,
}: AboutSectionProps) {
  return (
    <section aria-labelledby="o-klubie-heading" className={styles.section} id="o-klubie">
      <div className={styles.copy}>
        <div className={styles.heading}>
          <h2 className={styles.title} id="o-klubie-heading">
            {clubName}
          </h2>
        </div>
        <p className={styles.history}>{history}</p>
        <div className={styles.actions}>
          <ArrowLink href={historyUrl} variant="solid">
            Pełna historia sekcji
          </ArrowLink>
        </div>
      </div>

      <figure className={styles.figure}>
        <img alt={imageAlt} className={styles.image} loading="lazy" src={imageSrc} />
      </figure>
    </section>
  );
}
