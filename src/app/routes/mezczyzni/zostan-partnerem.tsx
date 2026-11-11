import { PartnershipInfo } from '../../../features/partnership/PartnershipInfo';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingState } from '../../../shared/components/LoadingState';
import { usePartnershipContent } from '../../../shared/hooks';

export default function MezczyzniZostanPartneremRoute() {
  const { data, loading, error, retry } = usePartnershipContent('mezczyzni');

  if (error) {
    return <ErrorState onRetry={retry} />;
  }

  if (loading || !data) {
    return <LoadingState label="Ładowanie oferty partnerskiej..." />;
  }

  return <PartnershipInfo content={data} />;
}
