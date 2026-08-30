import { PatronsInfo } from '../../../features/patrons/PatronsInfo';
import { useClubData } from '../../../shared/hooks/useClubData';
import { usePatrons } from '../../../shared/hooks/usePatrons';

export default function KobietyStrefaPrzyjaciolRoute() {
  const { data: patrons, loading: patronsLoading } = usePatrons('kobiety');
  const { data: club, loading: clubLoading } = useClubData('kobiety');

  if (patronsLoading || clubLoading || !club) {
    return <p>Ładowanie strefy przyjaciół...</p>;
  }

  return <PatronsInfo clubName={club.name} patrons={patrons} sponsors={club.sponsors} />;
}
