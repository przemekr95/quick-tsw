import { ClubInfo } from '../../../features/club-info/ClubInfo';
import { useClubData } from '../../../shared/hooks/useClubData';
import { useClubLandingContent } from '../../../shared/hooks/useClubLandingContent';

export default function MezczyzniKlubRoute() {
  const { data, loading } = useClubData('mezczyzni');
  const { data: landingContent, loading: landingLoading } = useClubLandingContent('mezczyzni');

  if (loading || landingLoading || !data || !landingContent) {
    return <p>Ładowanie danych klubu...</p>;
  }

  return <ClubInfo club={data} landingContent={landingContent} section="mezczyzni" />;
}
