import { Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider } from '../../providers/ThemeProvider';
import { useClubData, useClubLandingContent, usePageMeta } from '../../../shared/hooks';
import { SectionLayout } from '../../../shared/components/SectionLayout';
import { getPageMeta } from '../../../shared/utils/pageMeta';

const SECTION_PATH = '';

export default function MezczyzniLayoutRoute() {
  const { data } = useClubLandingContent('mezczyzni');
  const { data: club } = useClubData('mezczyzni');
  const { pathname } = useLocation();
  const pageMeta = getPageMeta(pathname, SECTION_PATH);

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
        sectionPath={SECTION_PATH}
        sponsors={club?.sponsors ?? []}
      >
        <Outlet context={{ club, landingContent: data }} />
      </SectionLayout>
    </ThemeProvider>
  );
}
