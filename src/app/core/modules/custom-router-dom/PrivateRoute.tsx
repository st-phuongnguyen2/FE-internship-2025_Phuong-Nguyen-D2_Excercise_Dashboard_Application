import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = (): boolean => {
  // const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  // return !!token;
  return true;
};

export const PrivateRoute = ({ component: Wrapped }) => {
  return isAuthenticated() ? <Wrapped /> : <Navigate to="/auth/login" />;
};
