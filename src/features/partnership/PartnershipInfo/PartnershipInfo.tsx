import type { PartnershipContent } from '../../../shared/types/domain';
import { PartnershipIntroSection } from '../PartnershipIntroSection';
import { PartnershipTiersSection } from '../PartnershipTiersSection';
import { PartnershipWaysSection } from '../PartnershipWaysSection';
import styles from './PartnershipInfo.module.scss';

interface PartnershipInfoProps {
  content: PartnershipContent;
}

export function PartnershipInfo({ content }: PartnershipInfoProps) {
  return (
    <section aria-label="Zakładka Zostań Partnerem" className={styles.root}>
      <div className={styles.stack}>
        <PartnershipIntroSection benefits={content.benefits} leadText={content.leadText} />
        <PartnershipTiersSection tiers={content.tiers} />
        <PartnershipWaysSection leadText={content.waysLeadText} ways={content.ways} />
      </div>
    </section>
  );
}
