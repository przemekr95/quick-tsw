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
import { PathRedirect } from '../shared/components/PathRedirect';
import { MEN_SECTION_PATH, WOMEN_SECTION_URL } from '../shared/utils/config';
import { PAGE_META, type PageMeta, type PageMetaHandle } from '../shared/utils/pageMeta';

function pageMeta(meta: PageMeta): PageMetaHandle {
  return { pageMeta: meta };
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
  // Tabs lived at the root (/klub, /druzyna...) before the section chooser
  // returned to /. Every other root address continues under the section, which
  // shows its own not-found page for unknown ones.
  {
    path: '*',
    element: <PathRedirect pathname={(current) => `${MEN_SECTION_PATH}${current}`} />,
  },
];

export const router = createBrowserRouter(appRoutes);
