import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '../../providers/ThemeProvider';
import { useClubLandingContent } from '../../../shared/hooks';
import { SectionLayout } from '../../../shared/components/SectionLayout';

export default function MezczyzniLayoutRoute() {
  const { data } = useClubLandingContent('mezczyzni');

  return (
    <ThemeProvider theme="mezczyzni">
      <SectionLayout
        ctaLabel={data?.ctaLabel ?? ''}
        heroHeading={data?.heroHeading ?? ''}
        heroSlides={data?.heroSlides ?? []}
        sectionLabel="Mężczyźni"
        sectionPath="/mezczyzni"
      >
        <Outlet />
      </SectionLayout>
    </ThemeProvider>
  );
}
