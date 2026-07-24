import type { Club } from '../../../shared/types/domain';
import styles from './ClubInfo.module.scss';

interface ClubInfoProps {
  club: Club;
}

export function ClubInfo({ club }: ClubInfoProps) {
  return (
    <section aria-labelledby="club-heading" className={styles.root}>
      <h2 id="club-heading">Klub</h2>
      <p className={styles.name}>{club.name}</p>
      <p>{club.history}</p>
      <p>
        <strong>Adres hali:</strong> {club.arenaAddress}
      </p>
      <h3>Zarząd</h3>
      <ul>
        {club.board.map((member) => (
          <li key={member}>{member}</li>
        ))}
      </ul>
      <h3>Sponsorzy</h3>
      <ul>
        {club.sponsors.map((sponsor) => (
          <li key={sponsor}>{sponsor}</li>
        ))}
      </ul>
    </section>
  );
}
