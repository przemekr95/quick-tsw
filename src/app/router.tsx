import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import HomeRoute from './routes';
import MezczyzniKontaktRoute from './routes/mezczyzni/kontakt';
import MezczyzniKlubRoute from './routes/mezczyzni/klub';
import MezczyzniDruzynaRoute from './routes/mezczyzni/druzyna';
import MezczyzniPrzyjacieleRoute from './routes/mezczyzni/przyjaciele';
import MezczyzniZostanPartneremRoute from './routes/mezczyzni/zostan-partnerem';
import MezczyzniMediaRoute from './routes/mezczyzni/media';
import MezczyzniLayoutRoute from './routes/mezczyzni/layout';
import MezczyzniNotFoundRoute from './routes/mezczyzni/not-found';
import { ExternalRedirect } from '../shared/components/ExternalRedirect';
import { HtmlFileRedirect } from '../shared/components/HtmlFileRedirect';
import { PathRedirect } from '../shared/components/PathRedirect';
import { MEN_SECTION_PATH, WOMEN_SECTION_URL } from '../shared/utils/config';
import { PAGE_META, type PageMeta, type PageMetaHandle } from '../shared/utils/pageMeta';
import { pathFromHtmlFile } from '../shared/utils/sitePages';

function pageMeta(meta: PageMeta): PageMetaHandle {
  return { pageMeta: meta };
}

// Any root address outside the section continues under it (tabs lived at the
// root before the section chooser returned). File addresses lose their .html
// first, so /klub.html and /index.html need one redirect, not two.
function sectionAddress(pathname: string): string {
  const path = pathFromHtmlFile(pathname) ?? pathname;

  return path === '/' ? '/' : `${MEN_SECTION_PATH}${path}`;
}

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomeRoute />,
  },
  // The women's section has no pages here; its archived /kobiety/* addresses
  // go to its category on the club website.
  {
    path: 'kobiety/*',
    element: <ExternalRedirect href={WOMEN_SECTION_URL} />,
  },
  {
    path: MEN_SECTION_PATH,
    element: <HtmlFileRedirect />,
    children: [
      // Redirects sit outside the layout so it never renders before they run.
      { index: true, element: <PathRedirect pathname={`${MEN_SECTION_PATH}/klub`} /> },
      // Legacy URL of the Przyjaciele tab, kept so old links still land on the page.
      {
        path: 'strefa-przyjaciol',
        element: <PathRedirect pathname={`${MEN_SECTION_PATH}/przyjaciele`} />,
      },
      {
        element: <MezczyzniLayoutRoute />,
        children: [
          { path: 'klub', element: <MezczyzniKlubRoute />, handle: pageMeta(PAGE_META.klub) },
          {
            path: 'druzyna',
            element: <MezczyzniDruzynaRoute />,
            handle: pageMeta(PAGE_META.druzyna),
          },
          {
            path: 'kontakt',
            element: <MezczyzniKontaktRoute />,
            handle: pageMeta(PAGE_META.kontakt),
          },
          {
            path: 'przyjaciele',
            element: <MezczyzniPrzyjacieleRoute />,
            handle: pageMeta(PAGE_META.przyjaciele),
          },
          {
            path: 'zostan-partnerem',
            element: <MezczyzniZostanPartneremRoute />,
            handle: pageMeta(PAGE_META.zostanPartnerem),
          },
          { path: 'media', element: <MezczyzniMediaRoute />, handle: pageMeta(PAGE_META.media) },
          {
            path: '*',
            element: <MezczyzniNotFoundRoute />,
            handle: pageMeta(PAGE_META.notFound),
          },
        ],
      },
    ],
  },
  // Unknown addresses end on the section's own not-found page.
  {
    path: '*',
    element: <PathRedirect pathname={sectionAddress} />,
  },
];

export const router = createBrowserRouter(appRoutes);
