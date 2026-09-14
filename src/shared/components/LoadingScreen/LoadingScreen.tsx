import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CLUB_BRAND_NAME, CLUB_CREST_SRC } from '../../utils/config';
import styles from './LoadingScreen.module.scss';

export const LOADING_SCREEN_REDIRECT_PATH = '/klub';
export const LOADING_SCREEN_REDIRECT_DELAY_MS = 900;

export function LoadingScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      navigate(LOADING_SCREEN_REDIRECT_PATH, { replace: true });
    }, LOADING_SCREEN_REDIRECT_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <main aria-label={CLUB_BRAND_NAME} className={styles.root}>
      <div className={styles.crestWrap}>
        <div aria-hidden="true" className={styles.crestGlow} />
        <div aria-hidden="true" className={styles.crest}>
          <img alt="" className={styles.crestImage} src={CLUB_CREST_SRC} />
        </div>
      </div>
      <p className={styles.status} role="status">
        Ładowanie…
      </p>
    </main>
  );
}
