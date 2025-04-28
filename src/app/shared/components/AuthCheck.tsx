import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { setLoading } from '../../redux-store/loading/loading-slice';
import { AppRoutes } from '../../utils/constants/app-routes';
import { waitAsync } from '../../utils/constants/wait';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hook';

const AuthCheck = () => {
  console.log('HERE');
  const location = useLocation();

  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const dispatch = useAppDispatch();

  function checkAuthAndRender() {
    if (isLoading) return;
    else if (!currentUser || !currentUser.email || !currentUser.password) {
      if (
        location.pathname.includes(AppRoutes.LOGIN) ||
        location.pathname.includes(AppRoutes.REGISTER)
      ) {
        return <Outlet />;
      } else return <Navigate to="/login" replace />;
    } else {
      if (
        location.pathname.includes(AppRoutes.LOGIN) ||
        location.pathname.includes(AppRoutes.REGISTER)
      ) {
        return <Navigate to="/" replace />;
      } else return <Outlet />;
    }
  }

  useEffect(() => {
    check();
    async function check() {
      await waitAsync(0.5);
      if (currentUser && isLoading) {
        console.log('HERE1');
        dispatch(setLoading(false));
      } else {
        console.log('HERE2');
        dispatch(setLoading(false));
      }
    }
  }, [currentUser, isLoading]);

  return <>{checkAuthAndRender()}</>;
};

export default AuthCheck;
