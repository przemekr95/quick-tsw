import type { PropsWithChildren } from 'react';
import styles from './HeroBackground.module.scss';

interface HeroBackgroundProps extends PropsWithChildren {
  sectionLabel: string;
}

export function HeroBackground({ children, sectionLabel }: HeroBackgroundProps) {
  return (
    <section aria-label={`Tło sekcji ${sectionLabel}`} className={styles.hero}>
      {children}
    </section>
  );
}
