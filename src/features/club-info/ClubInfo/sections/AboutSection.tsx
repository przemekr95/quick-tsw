import styles from '../ClubInfo.module.scss';

interface AboutSectionProps {
  arenaAddress: string;
  imageSrc: string;
  imageAlt: string;
}

export function AboutSection({ arenaAddress, imageSrc, imageAlt }: AboutSectionProps) {
  return (
    <section className={styles.aboutBlock} id="o-klubie" aria-labelledby="o-klubie-heading">
      <div className={styles.aboutCopy}>
        <p className={styles.aboutEyebrow}>Nasz klub</p>
        <h3 id="o-klubie-heading" className={styles.aboutA11yHeading}>O klubie</h3>
        <p className={styles.aboutTitle}>Zrodzeni z pasji do gry.</p>
        <span aria-hidden="true" className={styles.aboutAccentLine} />
        <p>
          Założony w 1987 roku, Volterra Volleyball Club wyrósł z oddolnej inicjatywy na jeden z najbardziej
          szanowanych klubów w regionie. Rywalizujemy na szczeblu krajowym, rozwijając sportowców poprzez
          dyscyplinę, pracę zespołową i nieustanne dążenie do doskonałości.
        </p>
        <p>
          Nasz sztab szkoleniowy dysponuje dziesięcioleciami doświadczenia na poziomie zawodowym. Nasi
          zawodnicy wnoszą ogień. Razem budujemy mistrzów, sezon po sezonie.
        </p>
        <p className={styles.aboutArena}>
          Trenujemy i gramy w hali przy <strong>{arenaAddress}</strong>.
        </p>
      </div>

      <div className={styles.aboutVisual}>
        <span aria-hidden="true" className={styles.aboutFrame} />
        <figure className={styles.aboutImage}>
          <img alt={imageAlt} loading="lazy" src={imageSrc} />
        </figure>
      </div>
    </section>
  );
}
