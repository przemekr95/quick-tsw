import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '../../providers/ThemeProvider';
import { useClubData, useClubLandingContent } from '../../../shared/hooks';
import { SectionLayout } from '../../../shared/components/SectionLayout';

export default function MezczyzniLayoutRoute() {
  const { data } = useClubLandingContent('mezczyzni');
  const { data: club } = useClubData('mezczyzni');

  return (
    <ThemeProvider theme="mezczyzni">
      <SectionLayout
        clubName={club?.name ?? ''}
        ctaLabel={data?.ctaLabel ?? ''}
        heroHeading={data?.heroHeading ?? ''}
        heroSlides={data?.heroSlides ?? []}
        sectionLabel="Mężczyźni"
        sectionPath="/mezczyzni"
        sponsors={club?.sponsors ?? []}
      >
        <Outlet />
      </SectionLayout>
    </ThemeProvider>
  );
}
