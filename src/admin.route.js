import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUserContext } from "./context/user.context";

function AdminRoute({ component: Component, ...rest }) {
  const { currUser } = useUserContext();
  return(
    <Route 
      {...rest} render={(props) => 
        currUser && currUser.isAdmin? (
          <Component {...props} />
        ) : (
          <Redirect exact to="/" />
        )
      }
    />
  );
}

export default AdminRoute;