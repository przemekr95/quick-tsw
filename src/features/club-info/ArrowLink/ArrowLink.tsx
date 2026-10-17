import { Link } from 'react-router-dom';
import styles from './ArrowLink.module.scss';

type ArrowLinkProps = {
  children: string;
  variant?: 'default' | 'solid';
} & ({ to: string; href?: never } | { href: string; to?: never });

export function ArrowLink({ to, href, children, variant = 'default' }: ArrowLinkProps) {
  const className = variant === 'solid' ? styles.solid : styles.link;
  const content = (
    <>
      {children}
      <span aria-hidden="true" className={styles.arrow}>
        →
      </span>
    </>
  );

  if (href !== undefined) {
    return (
      <a className={className} href={href} rel="noopener noreferrer" target="_blank">
        {content}
      </a>
    );
  }

  return (
    <Link className={className} to={to}>
      {content}
    </Link>
  );
}
