import { PageRoute } from '../modules/custom-router-dom/router.interface';
import Auth from './Auth';
import Login from './containers/Login';
import Register from './containers/Register';
import { AppRoutes } from '@src/app/core/constants/app-routes';

const authRoutes: PageRoute[] = [
  {
    path: AppRoutes.AUTH,
    component: Auth,
    children: [
      {
        path: '',
        redirect: AppRoutes.LOGIN
      },
      {
        path: AppRoutes.LOGIN,
        component: Login
      },
      {
        path: AppRoutes.REGISTER,
        component: Register
      }
    ]
  }
];

export default authRoutes;
