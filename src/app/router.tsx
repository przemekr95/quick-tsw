import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import HomeRoute from './routes';
import KobietyKontaktRoute from './routes/kobiety/kontakt';
import KobietyKlubRoute from './routes/kobiety/klub';
import KobietyDruzynaRoute from './routes/kobiety/druzyna';
import KobietyScianaWspierajacychRoute from './routes/kobiety/sciana-wspierajacych';
import KobietyMediaRoute from './routes/kobiety/media';
import KobietyLayoutRoute from './routes/kobiety/layout';
import MezczyzniKontaktRoute from './routes/mezczyzni/kontakt';
import MezczyzniKlubRoute from './routes/mezczyzni/klub';
import MezczyzniDruzynaRoute from './routes/mezczyzni/druzyna';
import MezczyzniScianaWspierajacychRoute from './routes/mezczyzni/sciana-wspierajacych';
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
      { path: 'sciana-wspierajacych', element: <KobietyScianaWspierajacychRoute /> },
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
      { path: 'sciana-wspierajacych', element: <MezczyzniScianaWspierajacychRoute /> },
      { path: 'media', element: <MezczyzniMediaRoute /> },
    ],
  },
];

export const router = createBrowserRouter(appRoutes);
