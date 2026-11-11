import { useCallback } from 'react';
import { Outlet, useLocation, useMatches } from 'react-router-dom';
import { ThemeProvider } from '../../providers/ThemeProvider';
import { useClubData, useClubLandingContent, usePageMeta } from '../../../shared/hooks';
import { SectionLayout } from '../../../shared/components/SectionLayout';
import { StructuredData } from '../../../shared/components/StructuredData';
import { MEN_SECTION_PATH } from '../../../shared/utils/config';
import { getRoutePageMeta } from '../../../shared/utils/pageMeta';
import { findSitePage, siteBaseUrl } from '../../../shared/utils/sitePages';
import { breadcrumbJsonLd } from '../../../shared/utils/structuredData';

export default function MezczyzniLayoutRoute() {
  const {
    data: landingContent,
    error: landingError,
    retry: retryLanding,
  } = useClubLandingContent('mezczyzni');
  const { data: club, error: clubError, retry: retryClub } = useClubData('mezczyzni');
  const retryLoad = useCallback(() => {
    if (landingError) retryLanding();
    if (clubError) retryClub();
  }, [landingError, clubError, retryLanding, retryClub]);
  const { pathname } = useLocation();
  const pageMeta = getRoutePageMeta(useMatches());

  usePageMeta(pageMeta, pathname);

  const sitePage = findSitePage(pathname);
  const breadcrumb = sitePage ? breadcrumbJsonLd(siteBaseUrl(), sitePage) : null;

  return (
    <ThemeProvider theme="mezczyzni">
      <SectionLayout
        clubName={club?.name ?? ''}
        heroHeading={landingContent?.heroHeading ?? ''}
        heroSlides={landingContent?.heroSlides ?? []}
        pageHeading={pageMeta.heading}
        sectionLabel="Mężczyźni"
        sectionName="Siatkówka mężczyzn"
        sectionPath={MEN_SECTION_PATH}
        sponsors={club?.sponsors ?? []}
      >
        <Outlet
          context={{ club, landingContent, loadError: landingError || clubError, retryLoad }}
        />
      </SectionLayout>
      {breadcrumb && <StructuredData data={breadcrumb} />}
    </ThemeProvider>
  );
}
