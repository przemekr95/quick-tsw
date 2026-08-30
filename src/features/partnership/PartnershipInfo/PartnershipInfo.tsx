import { PartnershipIntroSection } from '../PartnershipIntroSection';
import { PartnershipTiersSection } from '../PartnershipTiersSection';
import { PartnershipWaysSection } from '../PartnershipWaysSection';
import styles from './PartnershipInfo.module.scss';

export function PartnershipInfo() {
  return (
    <section aria-label="Zakładka Zostań Partnerem" className={styles.root}>
      <div className={styles.stack}>
        <PartnershipIntroSection />
        <PartnershipTiersSection />
        <PartnershipWaysSection />
      </div>
    </section>
  );
}
