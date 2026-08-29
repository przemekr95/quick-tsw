import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import HomeRoute from './routes';
import MediaRoute from './routes/media';
import KobietyKontaktRoute from './routes/kobiety/kontakt';
import KobietyKlubRoute from './routes/kobiety/klub';
import KobietyDruzynaRoute from './routes/kobiety/druzyna';
import KobietyLayoutRoute from './routes/kobiety/layout';
import MezczyzniKontaktRoute from './routes/mezczyzni/kontakt';
import MezczyzniKlubRoute from './routes/mezczyzni/klub';
import MezczyzniDruzynaRoute from './routes/mezczyzni/druzyna';
import MezczyzniLayoutRoute from './routes/mezczyzni/layout';

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomeRoute />,
  },
  {
    path: '/media',
    element: <MediaRoute />,
  },
  {
    path: '/kobiety',
    element: <KobietyLayoutRoute />,
    children: [
      { index: true, element: <Navigate replace to="klub" /> },
      { path: 'klub', element: <KobietyKlubRoute /> },
      { path: 'druzyna', element: <KobietyDruzynaRoute /> },
      { path: 'kontakt', element: <KobietyKontaktRoute /> },
    ],
  },
  {
    path: '/mezczyzni',
    element: <MezczyzniLayoutRoute />,
    children: [
      { index: true, element: <Navigate replace to="klub" /> },
      { path: 'klub', element: <MezczyzniKlubRoute /> },
      { path: 'druzyna', element: <MezczyzniDruzynaRoute /> },
      { path: 'kontakt', element: <MezczyzniKontaktRoute /> },
    ],
  },
];

export const router = createBrowserRouter(appRoutes);
