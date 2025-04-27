import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/home-page/HomePage';
import { AppRoutes } from './utils/constants/app-routes';

export const router = createBrowserRouter([
  {
    path: AppRoutes.HOME,
    element: <HomePage />
  }
]);
