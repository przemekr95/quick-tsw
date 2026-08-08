import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '../../providers/ThemeProvider';
import { useClubLandingContent } from '../../../shared/hooks';
import { SectionLayout } from '../../../shared/components/SectionLayout';

export default function KobietyLayoutRoute() {
  const { data } = useClubLandingContent('kobiety');

  return (
    <ThemeProvider theme="kobiety">
      <SectionLayout
        ctaLabel={data?.ctaLabel ?? ''}
        heroHeading={data?.heroHeading ?? ''}
        heroSlides={data?.heroSlides ?? []}
        sectionLabel="Kobiety"
        sectionPath="/kobiety"
      >
        <Outlet />
      </SectionLayout>
    </ThemeProvider>
  );
}
