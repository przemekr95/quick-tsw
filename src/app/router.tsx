import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import HomeRoute from './routes';
import MezczyzniKontaktRoute from './routes/mezczyzni/kontakt';
import MezczyzniKlubRoute from './routes/mezczyzni/klub';
import MezczyzniDruzynaRoute from './routes/mezczyzni/druzyna';
import MezczyzniStrefaPrzyjaciolRoute from './routes/mezczyzni/strefa-przyjaciol';
import MezczyzniZostanPartneremRoute from './routes/mezczyzni/zostan-partnerem';
import MezczyzniMediaRoute from './routes/mezczyzni/media';
import MezczyzniLayoutRoute from './routes/mezczyzni/layout';

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomeRoute />,
  },
  {
    element: <MezczyzniLayoutRoute />,
    children: [
      { path: 'klub', element: <MezczyzniKlubRoute /> },
      { path: 'druzyna', element: <MezczyzniDruzynaRoute /> },
      { path: 'kontakt', element: <MezczyzniKontaktRoute /> },
      { path: 'strefa-przyjaciol', element: <MezczyzniStrefaPrzyjaciolRoute /> },
      { path: 'zostan-partnerem', element: <MezczyzniZostanPartneremRoute /> },
      { path: 'media', element: <MezczyzniMediaRoute /> },
    ],
  },
];

// Vite's `base` only rewrites asset URLs; react-router needs its own basename
// so route matching accounts for the app being served under a subpath
// (e.g. GitHub Pages' /quick-tsw/).
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

export const router = createBrowserRouter(appRoutes, { basename });
