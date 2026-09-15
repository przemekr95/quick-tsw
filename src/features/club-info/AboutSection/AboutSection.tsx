import styles from './AboutSection.module.scss';

interface AboutSectionProps {
  clubName: string;
  history: string;
  imageSrc: string;
  imageAlt: string;
}

export function AboutSection({ clubName, history, imageSrc, imageAlt }: AboutSectionProps) {
  return (
    <section aria-labelledby="o-klubie-heading" className={styles.section} id="o-klubie">
      <div className={styles.copy}>
        <div className={styles.heading}>
          <p aria-hidden="true" className={styles.index} />
          <p className={styles.eyebrow}>O klubie</p>
          <h2 className={styles.title} id="o-klubie-heading">
            {clubName}
          </h2>
        </div>
        <p className={styles.history}>{history}</p>
      </div>

      <figure className={styles.figure}>
        <img alt={imageAlt} className={styles.image} loading="lazy" src={imageSrc} />
      </figure>
    </section>
  );
}
