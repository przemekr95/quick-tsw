import styles from './HeroCtaButton.module.scss';

interface HeroCtaButtonProps {
  targetId: string;
  label: string;
}

export function HeroCtaButton({ targetId, label }: HeroCtaButtonProps) {
  return (
    <a aria-label={label} className={styles.ctaButton} href={`#${targetId}`}>
      {label}
    </a>
  );
}
