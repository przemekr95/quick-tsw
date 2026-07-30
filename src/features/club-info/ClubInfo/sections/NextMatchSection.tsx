import { Link } from 'react-router-dom';
import type { ClubMatchCountdownItem } from '../../../../shared/types/domain';
import styles from '../ClubInfo.module.scss';

interface NextMatchSectionProps {
  matchCountdown: ClubMatchCountdownItem[];
  matchForm: string[];
}

export function NextMatchSection({ matchCountdown, matchForm }: NextMatchSectionProps) {
  return (
    <section className={styles.nextMatchShowcase} id="najblizszy-mecz" aria-labelledby="najblizszy-mecz-heading">
      <h3 className={styles.aboutA11yHeading} id="najblizszy-mecz-heading">Najbliższy mecz</h3>

      <div className={styles.nextMatchInner}>
        <article className={styles.matchMainColumn}>
          <p className={styles.matchEyebrow}>Następny mecz - Serie A</p>
          <p className={styles.matchTeams}>Volterra VC</p>

          <div aria-hidden="true" className={styles.matchVsRow}>
            <span />
            <strong>VS</strong>
            <span />
          </div>

          <p className={styles.matchTeams}>Adriatica Spikes</p>

          <div className={styles.matchMetaRow}>
            <p>15 sierpnia 2026 · 19:00</p>
            <p>PalaSport Volterra, Boisko A</p>
          </div>

          <div className={styles.matchFormBlock}>
            <p>Forma</p>
            <ul>
              {matchForm.map((result, index) => (
                <li className={result === 'L' ? styles.formLoss : styles.formWin} key={`${result}-${index}`}>
                  {result}
                </li>
              ))}
            </ul>
          </div>

          <Link className={styles.ticketCta} to="../kontakt">
            Kup bilet <span aria-hidden="true">-&gt;</span>
          </Link>
        </article>

        <article className={styles.matchSideColumn}>
          <p className={styles.matchEyebrow}>Odliczanie</p>
          <div className={styles.countdownGrid}>
            {matchCountdown.map((item) => (
              <div className={styles.countdownCard} key={item.label}>
                <p>{item.value}</p>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.standingsCard}>
            <p className={styles.standingsEyebrow}>Tabela rozgrywek</p>
            <div className={styles.standingsSummary}>
              <strong>2.</strong>
              <div>
                <p>Serie A - Dywizja Północna</p>
                <span>28 pkt. · 9W 2P 1R</span>
              </div>
            </div>
            <div aria-hidden="true" className={styles.standingsProgress}>
              <span />
            </div>
            <p className={styles.standingsFootnote}>74% możliwych punktów</p>
          </div>
        </article>
      </div>
    </section>
  );
}
