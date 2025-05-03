import { StorageKeys } from '@src/app/core/constants/local-storage-keys';
import { LocalStorage } from '@src/app/core/utils/local-storage';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { User } from '../models/User';
import { IUserLoginFields } from '../schema-validations/login-form';
import { userService } from '../services/user.service';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hook';
import { setLoading } from '@src/app/redux-store/loading/loading-slice';
import { Navigate, useLocation } from 'react-router-dom';
import { AppRoutes } from '@src/app/core/constants/app-routes';
import { toast } from 'react-toastify';
import { waitAsync } from '@src/app/core/utils/wait';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  setUserSession: (user: User) => void;
  clearUserSession: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  setUserSession() {},
  clearUserSession() {}
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const dispatch = useAppDispatch();

  const setUserSession = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
    LocalStorage.set(StorageKeys.AUTH, user);
  };

  const clearUserSession = () => {
    setUser(null);
    setIsAuthenticated(false);
    LocalStorage.remove(StorageKeys.AUTH);
  };

  function render() {
    if (isLoading) return;
    else if (isAuthenticated) {
      if (
        location.pathname.includes(AppRoutes.LOGIN) ||
        location.pathname.includes(AppRoutes.REGISTER)
      ) {
        return <Navigate to={AppRoutes.HOME} replace />;
      }
    }

    return children;
  }

  useEffect(() => {
    checkAuth();

    async function checkAuth() {
      const userAuth = LocalStorage.get<IUserLoginFields>(StorageKeys.AUTH);

      if (userAuth) {
        try {
          await waitAsync(0.5);
          const user = await userService.loginUser(userAuth);

          if (user) {
            setUserSession(user);
          }
        } catch (err) {
          clearUserSession();

          if (err instanceof Error) {
            toast.error(err.message);
          }
        }
      }

      dispatch(setLoading(false));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, setUserSession, clearUserSession }}
    >
      {render()}
    </AuthContext.Provider>
  );
};
