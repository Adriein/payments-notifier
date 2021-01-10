import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context as AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ component: Component, ...rest }) {
  const {getToken}= useContext(AuthContext);
  console.log(getToken);
  return (
    <Route
      {...rest}
      render={(props) =>
        getToken ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
