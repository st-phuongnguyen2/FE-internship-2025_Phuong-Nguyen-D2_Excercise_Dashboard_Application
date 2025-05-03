import { Navigate } from 'react-router-dom';
import { PageRoute } from './router.interface';
import PrivateRoute from './PrivateRoute';

export const renderChildren = (routes: PageRoute[]): any => {
  return routes.map((route) => {
    if ('component' in route || 'redirect' in route) {
      const Component = route.component!;

      return {
        ...route,
        element: route.redirect ? (
          <Navigate to={route.redirect} replace />
        ) : route.isProtected ? (
          <PrivateRoute component={Component} />
        ) : (
          <Component />
        ),
        children: route.children ? renderChildren(route.children) : []
      };
    } else return { ...route };
  });
};
