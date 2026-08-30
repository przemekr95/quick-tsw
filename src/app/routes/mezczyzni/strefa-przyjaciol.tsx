import { PatronsInfo } from '../../../features/patrons/PatronsInfo';
import { useClubData } from '../../../shared/hooks/useClubData';
import { usePatrons } from '../../../shared/hooks/usePatrons';

export default function MezczyzniStrefaPrzyjaciolRoute() {
  const { data: patrons, loading: patronsLoading } = usePatrons('mezczyzni');
  const { data: club, loading: clubLoading } = useClubData('mezczyzni');

  if (patronsLoading || clubLoading || !club) {
    return <p>Ładowanie strefy przyjaciół...</p>;
  }

  return <PatronsInfo clubName={club.name} patrons={patrons} sponsors={club.sponsors} />;
}
