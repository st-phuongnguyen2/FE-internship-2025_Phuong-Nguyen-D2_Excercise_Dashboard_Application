import { AppRoutes } from '@src/app/core/constants/app-routes';
import { PageRoute } from '@src/app/core/modules/custom-router-dom/router.interface';

import { lazy } from 'react';

const HomePage = lazy(() => import('./HomePage'));
const DashboardPage = lazy(() => import('./containers/DashboardPage'));

export const homepageRoutes: PageRoute[] = [
  {
    path: AppRoutes.HOME,
    component: HomePage,
    isProtected: true,
    children: [
      {
        path: AppRoutes.HOME,
        component: DashboardPage
      }
    ]
  }
];
