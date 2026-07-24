import type { ContactInfo as ContactInfoType } from '../../../shared/types/domain';
import styles from './ContactInfo.module.scss';

interface ContactInfoProps {
  contact: ContactInfoType;
}

export function ContactInfo({ contact }: ContactInfoProps) {
  return (
    <section aria-labelledby="contact-heading" className={styles.root}>
      <h2 id="contact-heading">Kontakt</h2>
      <p>
        <strong>Adres:</strong> {contact.address}
      </p>
      <p>
        <strong>Telefon:</strong> {contact.phone}
      </p>
      <p>
        <strong>Email:</strong> <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </p>
      <p>
        <a href={contact.mapUrl} rel="noopener noreferrer" target="_blank">
          Zobacz na mapie
        </a>
      </p>
    </section>
  );
}
