import { PartnershipInfo } from '../../../features/partnership/PartnershipInfo';
import { LoadingState } from '../../../shared/components/LoadingState';
import { usePartnershipContent } from '../../../shared/hooks';

export default function MezczyzniZostanPartneremRoute() {
  const { data, loading } = usePartnershipContent('mezczyzni');

  if (loading || !data) {
    return <LoadingState label="Ładowanie oferty partnerskiej..." />;
  }

  return <PartnershipInfo content={data} />;
}
