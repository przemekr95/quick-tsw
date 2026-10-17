import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CLUB_BRAND_NAME } from '../../utils/config';
import { CrestLoader } from '../CrestLoader';
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
      <CrestLoader />
      <p className={styles.status} role="status">
        Ładowanie…
      </p>
    </main>
  );
}
