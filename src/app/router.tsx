import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import HomeRoute from './routes';
import MezczyzniKontaktRoute from './routes/mezczyzni/kontakt';
import MezczyzniKlubRoute from './routes/mezczyzni/klub';
import MezczyzniDruzynaRoute from './routes/mezczyzni/druzyna';
import MezczyzniPrzyjacieleRoute from './routes/mezczyzni/przyjaciele';
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
      { path: 'przyjaciele', element: <MezczyzniPrzyjacieleRoute /> },
      { path: 'zostan-partnerem', element: <MezczyzniZostanPartneremRoute /> },
      { path: 'media', element: <MezczyzniMediaRoute /> },
    ],
  },
];

export const router = createBrowserRouter(appRoutes);
