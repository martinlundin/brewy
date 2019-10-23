import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './auth';

export default function PrivateRoute({ component: RouteComponent, ...rest }) {
  const currentUser = React.useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routeProps) => (currentUser ? (
        <RouteComponent {...routeProps} />
      ) : (
        <Redirect to="/login" />
      ))}
    />
  );
}
