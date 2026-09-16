import type { ContactInfo } from '../../../shared/types/domain';
import styles from './ContactDetailsSection.module.scss';

interface ContactDetailsSectionProps {
  contact: Omit<ContactInfo, 'coordinators' | 'trainingGroups'>;
}

export function ContactDetailsSection({ contact }: ContactDetailsSectionProps) {
  return (
    <section
      aria-labelledby="dane-kontaktowe-heading"
      className={styles.section}
      id="dane-kontaktowe"
    >
      <div className={styles.heading}>
        <p aria-hidden="true" className={styles.index} />
        <p className={styles.eyebrow}>Organizacja</p>
        <h2 className={styles.title} id="dane-kontaktowe-heading">
          Dane kontaktowe
        </h2>
      </div>

      <dl className={styles.grid}>
        <div className={styles.cell}>
          <dt className={styles.label}>Odbiorca</dt>
          <dd className={styles.value}>{contact.bankAccountHolder}</dd>
        </div>

        <div className={styles.cell}>
          <dt className={styles.label}>Adres</dt>
          <dd className={styles.value}>{contact.address}</dd>
        </div>

        <div className={styles.cell}>
          <dt className={styles.label}>NIP</dt>
          <dd className={styles.value}>{contact.nip}</dd>
        </div>

        <div className={styles.cell}>
          <dt className={styles.label}>KRS</dt>
          <dd className={styles.value}>{contact.krs}</dd>
        </div>

        <div className={styles.cell}>
          <dt className={styles.label}>Numer konta</dt>
          <dd className={styles.value}>{contact.bankAccountNumber}</dd>
        </div>

        <div className={styles.cell}>
          <dt className={styles.label}>E-mail</dt>
          <dd className={styles.value}>
            <a className={styles.link} href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </dd>
        </div>
      </dl>

      <a className={styles.mapLink} href={contact.mapUrl} rel="noopener noreferrer" target="_blank">
        Zobacz na mapie
        <span aria-hidden="true" className={styles.mapArrow}>
          →
        </span>
      </a>
    </section>
  );
}
