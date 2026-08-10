import { Link } from 'react-router-dom';
import styles from './ArrowLink.module.scss';

interface ArrowLinkProps {
  to: string;
  children: string;
  variant?: 'default' | 'solid';
}

export function ArrowLink({ to, children, variant = 'default' }: ArrowLinkProps) {
  const className = variant === 'solid' ? styles.solid : styles.link;

  return (
    <Link className={className} to={to}>
      {children}
      <span aria-hidden="true" className={styles.arrow}>
        →
      </span>
    </Link>
  );
}
