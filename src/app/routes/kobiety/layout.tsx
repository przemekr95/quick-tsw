import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '../../providers/ThemeProvider';
import { useClubData, useClubLandingContent } from '../../../shared/hooks';
import { SectionLayout } from '../../../shared/components/SectionLayout';

export default function KobietyLayoutRoute() {
  const { data } = useClubLandingContent('kobiety');
  const { data: club } = useClubData('kobiety');

  return (
    <ThemeProvider theme="kobiety">
      <SectionLayout
        clubName={club?.name ?? ''}
        ctaLabel={data?.ctaLabel ?? ''}
        heroHeading={data?.heroHeading ?? ''}
        heroSlides={data?.heroSlides ?? []}
        sectionLabel="Kobiety"
        sectionPath="/kobiety"
        sponsors={club?.sponsors ?? []}
      >
        <Outlet context={{ club }} />
      </SectionLayout>
    </ThemeProvider>
  );
}
