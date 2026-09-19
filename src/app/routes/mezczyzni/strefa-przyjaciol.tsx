import { PatronsInfo } from '../../../features/patrons/PatronsInfo';
import { LoadingState } from '../../../shared/components/LoadingState';
import { usePatrons } from '../../../shared/hooks';

export default function MezczyzniStrefaPrzyjaciolRoute() {
  const { data: patrons, loading } = usePatrons('mezczyzni');

  if (loading) {
    return <LoadingState label="Ładowanie strefy przyjaciół..." />;
  }

  return <PatronsInfo patrons={patrons} />;
}
