import { PartnershipInfo } from '../../../features/partnership/PartnershipInfo';
import { usePartnershipContent } from '../../../shared/hooks/usePartnershipContent';

export default function MezczyzniZostanPartneremRoute() {
  const { data, loading } = usePartnershipContent('mezczyzni');

  if (loading || !data) {
    return <p>Ładowanie oferty partnerskiej...</p>;
  }

  return <PartnershipInfo content={data} />;
}
