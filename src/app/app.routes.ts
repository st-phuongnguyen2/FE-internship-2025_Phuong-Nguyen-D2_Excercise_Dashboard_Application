import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import authRoutes from './core/auth/auth.routes';
import { AppRoutes } from './core/constants/app-routes';
import { renderChildren } from './core/modules/custom-router-dom/RouterOutlet';
import { pageRoutes } from './pages/page.routes';

const App = lazy(() => import('./App'));
const route = [...authRoutes, ...pageRoutes];

export const router = createBrowserRouter([
  {
    path: AppRoutes.HOME,
    Component: App,
    children: renderChildren(route)
  }
]);
