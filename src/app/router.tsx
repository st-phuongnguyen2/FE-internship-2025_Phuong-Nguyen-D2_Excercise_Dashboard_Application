import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/home-page/HomePage';
import LoginPage from './pages/login-page/LoginPage';
import RegisterPage from './pages/register-page/RegisterPage';
import { AppRoutes } from './utils/constants/app-routes';
import AuthCheck from './shared/components/AuthCheck';

export const router = createBrowserRouter([
  {
    path: AppRoutes.HOME,
    element: <AuthCheck />,
    children: [
      {
        path: AppRoutes.HOME,
        element: <HomePage />
      },
      {
        path: AppRoutes.REGISTER,
        element: <RegisterPage />
      },
      {
        path: AppRoutes.LOGIN,
        element: <LoginPage />
      }
    ]
  }
]);
