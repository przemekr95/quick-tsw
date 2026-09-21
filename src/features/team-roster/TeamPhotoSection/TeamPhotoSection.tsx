import styles from './TeamPhotoSection.module.scss';

export function TeamPhotoSection() {
  return (
    <section aria-labelledby="druzyna-zdjecie-heading" className={styles.section} id="druzyna">
      <div className={styles.heading}>
        <p aria-hidden="true" className={styles.index} />
        <p className={styles.eyebrow}>Drużyna</p>
        <h2 className={styles.title} id="druzyna-zdjecie-heading">
          Poznaj zespół
        </h2>
      </div>

      <figure className={styles.figure}>
        <img
          alt="Drużyna siatkarska podczas wspólnego zdjęcia zespołowego"
          className={styles.image}
          loading="lazy"
          src="/quick-tsw/images/backgrounds/team.jpg"
        />
      </figure>
    </section>
  );
}
