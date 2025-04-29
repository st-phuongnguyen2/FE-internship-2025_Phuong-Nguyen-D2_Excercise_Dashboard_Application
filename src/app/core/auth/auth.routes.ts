import { AuthRoutes } from '../constants/app-routes';
import { PageRoute } from '../modules/custom-router-dom/router.interface';
import Auth from './Auth';
import Login from './containers/Login';
import Register from './containers/Register';

const authRoutes: PageRoute[] = [
  {
    path: AuthRoutes.BASE,
    component: Auth,
    children: [
      {
        path: '',
        redirect: AuthRoutes.LOGIN
      },
      {
        path: AuthRoutes.LOGIN,
        component: Login
      },
      {
        path: AuthRoutes.REGISTER,
        component: Register
      }
    ]
  }
];

export default authRoutes;
