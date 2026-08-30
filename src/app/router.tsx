import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import HomeRoute from './routes';
import KobietyKontaktRoute from './routes/kobiety/kontakt';
import KobietyKlubRoute from './routes/kobiety/klub';
import KobietyDruzynaRoute from './routes/kobiety/druzyna';
import KobietyStrefaPrzyjaciolRoute from './routes/kobiety/strefa-przyjaciol';
import KobietyZostanPartneremRoute from './routes/kobiety/zostan-partnerem';
import KobietyMediaRoute from './routes/kobiety/media';
import KobietyLayoutRoute from './routes/kobiety/layout';
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
    path: '/kobiety',
    element: <KobietyLayoutRoute />,
    children: [
      { index: true, element: <Navigate replace to="klub" /> },
      { path: 'klub', element: <KobietyKlubRoute /> },
      { path: 'druzyna', element: <KobietyDruzynaRoute /> },
      { path: 'kontakt', element: <KobietyKontaktRoute /> },
      { path: 'strefa-przyjaciol', element: <KobietyStrefaPrzyjaciolRoute /> },
      { path: 'zostan-partnerem', element: <KobietyZostanPartneremRoute /> },
      { path: 'media', element: <KobietyMediaRoute /> },
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
      { path: 'strefa-przyjaciol', element: <MezczyzniStrefaPrzyjaciolRoute /> },
      { path: 'zostan-partnerem', element: <MezczyzniZostanPartneremRoute /> },
      { path: 'media', element: <MezczyzniMediaRoute /> },
    ],
  },
];

export const router = createBrowserRouter(appRoutes);
