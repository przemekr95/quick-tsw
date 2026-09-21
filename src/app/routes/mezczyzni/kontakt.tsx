import { ContactInfo } from '../../../features/contact/ContactInfo';
import { LoadingState } from '../../../shared/components/LoadingState';
import { useContactInfo } from '../../../shared/hooks';

export default function MezczyzniKontaktRoute() {
  const { data, loading } = useContactInfo('mezczyzni');

  if (loading || !data) {
    return <LoadingState label="Ładowanie kontaktu..." />;
  }

  return <ContactInfo contact={data} />;
}
