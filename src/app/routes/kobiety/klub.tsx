import { ClubInfo } from '../../../features/club-info/ClubInfo';
import { useClubData } from '../../../shared/hooks/useClubData';
import { useClubLandingContent } from '../../../shared/hooks/useClubLandingContent';

export default function KobietyKlubRoute() {
  const { data, loading } = useClubData('kobiety');
  const { data: landingContent, loading: landingLoading } = useClubLandingContent('kobiety');

  if (loading || landingLoading || !data || !landingContent) {
    return <p>Ładowanie danych klubu...</p>;
  }

  return <ClubInfo club={data} landingContent={landingContent} section="kobiety" />;
}
