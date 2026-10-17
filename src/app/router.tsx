import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import HomeRoute from './routes';
import MezczyzniKontaktRoute from './routes/mezczyzni/kontakt';
import MezczyzniKlubRoute from './routes/mezczyzni/klub';
import MezczyzniDruzynaRoute from './routes/mezczyzni/druzyna';
import MezczyzniPrzyjacieleRoute from './routes/mezczyzni/przyjaciele';
import MezczyzniZostanPartneremRoute from './routes/mezczyzni/zostan-partnerem';
import MezczyzniMediaRoute from './routes/mezczyzni/media';
import MezczyzniLayoutRoute from './routes/mezczyzni/layout';
import MezczyzniNotFoundRoute from './routes/mezczyzni/not-found';
import { PAGE_META, type PageMeta, type PageMetaHandle } from '../shared/utils/pageMeta';

function pageMeta(meta: PageMeta): PageMetaHandle {
  return { pageMeta: meta };
}

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomeRoute />,
  },
  // Legacy URL of the Przyjaciele tab, kept so old links still land on the page.
  {
    path: 'strefa-przyjaciol',
    element: <Navigate replace to="/przyjaciele" />,
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
      { path: '*', element: <MezczyzniNotFoundRoute />, handle: pageMeta(PAGE_META.notFound) },
    ],
  },
];

export const router = createBrowserRouter(appRoutes);
