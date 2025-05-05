import { AppRoutes } from '@src/app/core/constants/app-routes';
import { AuthContext } from '@src/app/shared/contexts/auth.context';

import { JSX, useContext } from 'react';
import { Navigate } from 'react-router-dom';

interface IPrivateRouteProps {
  component: () => JSX.Element;
}

const PrivateRoute = ({ component: Component }: IPrivateRouteProps) => {
  const { isAuthenticated } = useContext(AuthContext);

  function render() {
    return isAuthenticated ? (
      <Component />
    ) : (
      <Navigate to={AppRoutes.LOGIN} replace />
    );
  }

  return <>{render()}</>;
};

export default PrivateRoute;
