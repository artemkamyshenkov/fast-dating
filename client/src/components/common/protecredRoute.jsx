import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import PropTypes from 'prop-types';
function ProtectedRoute({ component: Component, children, ...rest }) {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      element={
        currentUser ? (
          Component ? (
            <Component />
          ) : (
            children
          )
        ) : (
          <Navigate
            to={{
              pathname: '/login',
              state: { from: rest.location.pathname },
            }}
          />
        )
      }
    />
  );
}
ProtectedRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ProtectedRoute;
