import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUserContext } from "./context/user.context";

function PrivateRoute({ component: Component, ...rest }) {
  const { currUser } = useUserContext();
  return(
    <Route 
      {...rest} render={(props) => 
        currUser ? (
          <Component {...props} />
        ) : (
          <Redirect exact to="/login" />
        )
      }
    />
  );
}

export default PrivateRoute;