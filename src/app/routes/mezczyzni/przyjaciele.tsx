import { PatronsInfo } from '../../../features/patrons/PatronsInfo';
import { LoadingState } from '../../../shared/components/LoadingState';
import { usePatrons } from '../../../shared/hooks';

export default function MezczyzniPrzyjacieleRoute() {
  const { data: patrons, loading } = usePatrons('mezczyzni');

  if (loading) {
    return <LoadingState label="Ładowanie listy przyjaciół..." />;
  }

  return <PatronsInfo patrons={patrons} />;
}
