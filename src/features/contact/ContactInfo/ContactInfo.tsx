import type { ContactInfo as ContactInfoType } from '../../../shared/types/domain';
import { ContactDetailsSection } from '../ContactDetailsSection';
import { CoordinatorsSection } from '../CoordinatorsSection';
import styles from './ContactInfo.module.scss';

interface ContactInfoProps {
  contact: ContactInfoType;
}

export function ContactInfo({ contact }: ContactInfoProps) {
  return (
    <section aria-label="Zakładka Kontakt" className={styles.root}>
      <div className={styles.stack}>
        <CoordinatorsSection coordinators={contact.coordinators} />
        <ContactDetailsSection contact={contact} />
      </div>
    </section>
  );
}
