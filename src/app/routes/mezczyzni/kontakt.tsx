import { ContactInfo } from '../../../features/contact/ContactInfo';
import { useContactInfo } from '../../../shared/hooks/useContactInfo';

export default function MezczyzniKontaktRoute() {
  const { data, loading } = useContactInfo('mezczyzni');

  if (loading || !data) {
    return <p>Ładowanie kontaktu...</p>;
  }

  return <ContactInfo contact={data} />;
}
