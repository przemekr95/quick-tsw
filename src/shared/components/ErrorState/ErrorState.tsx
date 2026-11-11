import { RetryButton } from '../RetryButton';
import styles from './ErrorState.module.scss';

interface ErrorStateProps {
  // Runs the failed request(s) again.
  onRetry: () => void;
  // Mirrors LoadingState: false on the hero-headed Klub tab.
  withNavOffset?: boolean;
}

export function ErrorState({ onRetry, withNavOffset = true }: ErrorStateProps) {
  return (
    <div className={withNavOffset ? styles.root : styles.rootFlush}>
      <div className={styles.stack}>
        <section aria-labelledby="blad-danych-heading" className={styles.section}>
          <div role="alert">
            <h2 className={styles.title} id="blad-danych-heading">
              Nie udało się wczytać danych
            </h2>
            <p className={styles.lead}>
              Coś poszło nie tak przy pobieraniu danych. Spróbuj ponownie za chwilę.
            </p>
          </div>
          <RetryButton onRetry={onRetry} />
        </section>
      </div>
    </div>
  );
}
