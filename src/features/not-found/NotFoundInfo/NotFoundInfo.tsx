import { ArrowLink } from '../../club-info/ArrowLink';
import styles from './NotFoundInfo.module.scss';

interface NotFoundInfoProps {
  homePath: string;
}

export function NotFoundInfo({ homePath }: NotFoundInfoProps) {
  return (
    <section aria-labelledby="nie-znaleziono-heading" className={styles.root}>
      <div className={styles.stack}>
        <div className={styles.section}>
          <h1 className={styles.title} id="nie-znaleziono-heading">
            Nie znaleziono strony
          </h1>
          <p className={styles.lead}>
            Strona, której szukasz, nie istnieje albo została przeniesiona.
          </p>
          <ArrowLink to={homePath} variant="solid">
            Wróć na stronę klubu
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
