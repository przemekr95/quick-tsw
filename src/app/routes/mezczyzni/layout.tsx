import { Outlet, useMatches } from 'react-router-dom';
import { ThemeProvider } from '../../providers/ThemeProvider';
import { useClubData, useClubLandingContent, usePageMeta } from '../../../shared/hooks';
import { SectionLayout } from '../../../shared/components/SectionLayout';
import { getRoutePageMeta } from '../../../shared/utils/pageMeta';

export default function MezczyzniLayoutRoute() {
  const { data } = useClubLandingContent('mezczyzni');
  const { data: club } = useClubData('mezczyzni');
  const pageMeta = getRoutePageMeta(useMatches());

  usePageMeta(pageMeta);

  return (
    <ThemeProvider theme="mezczyzni">
      <SectionLayout
        clubName={club?.name ?? ''}
        heroHeading={data?.heroHeading ?? ''}
        heroSlides={data?.heroSlides ?? []}
        pageHeading={pageMeta.heading}
        sectionLabel="Mężczyźni"
        sectionName="Siatkówka mężczyzn"
        sectionPath=""
        sponsors={club?.sponsors ?? []}
      >
        <Outlet context={{ club, landingContent: data }} />
      </SectionLayout>
    </ThemeProvider>
  );
}
