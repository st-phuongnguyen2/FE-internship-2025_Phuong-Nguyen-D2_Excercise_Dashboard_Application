import { AppRoutes } from '@src/app/core/constants/app-routes';
import { PageRoute } from '@src/app/core/modules/custom-router-dom/router.interface';
import Auth from './Auth';
import Login from './containers/Login';
import Register from './containers/Register';

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
