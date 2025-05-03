import { AppRoutes } from '@src/app/core/constants/app-routes';
import { PageRoute } from '@src/app/core/modules/custom-router-dom/router.interface';
import HomePage from './HomePage';
import Dashboard from './containers/Dashboard';

export const homepageRoutes: PageRoute[] = [
  {
    path: AppRoutes.HOME,
    component: HomePage,
    isProtected: true,
    children: [
      {
        path: AppRoutes.HOME,
        component: Dashboard
      }
    ]
  }
];
