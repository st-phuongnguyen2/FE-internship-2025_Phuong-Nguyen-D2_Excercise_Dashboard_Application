import { AppRoutes } from '@src/app/core/constants/app-routes';
import { PageRoute } from '@src/app/core/modules/custom-router-dom/router.interface';

import { lazy } from 'react';

import { homepageRoutes } from './homepage/homepage.routes';
import { taskRoutes } from './my-task/my-task-page.routes';

const Page = lazy(() => import('./Page'));
export const pageRoutes: PageRoute[] = [
  {
    path: AppRoutes.HOME,
    component: Page,
    children: [...homepageRoutes, ...taskRoutes]
  }
];
