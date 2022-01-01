import React, { useContext } from 'react';
import { AuthContext } from '../Auth/Context/AuthContext';
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { getToken } = useContext(AuthContext);
  let location = useLocation();

  if (!getToken()) {
    return <Navigate to="/" state={{ from: location }}/>;
  }

  return children;
}

export default RequireAuth;