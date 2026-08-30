import { PartnershipInfo } from '../../../features/partnership/PartnershipInfo';
import { usePartnershipContent } from '../../../shared/hooks/usePartnershipContent';

export default function KobietyZostanPartneremRoute() {
  const { data, loading } = usePartnershipContent('kobiety');

  if (loading || !data) {
    return <p>Ładowanie oferty partnerskiej...</p>;
  }

  return <PartnershipInfo content={data} />;
}
