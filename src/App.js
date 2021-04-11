import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import UsersPage from './pages/users/UsersPage';
import UserPage from './pages/users/UserPage';
import UserEditPage from './pages/users/UserEditPage';
import UserCreatePage from './pages/users/UserCreatePage';
import DevicesPage from './pages/devices/DevicesPage';
import DevicePage from './pages/devices/DevicePage';
import DeviceCreatePage from './pages/devices/DeviceCreatePage';
import DeviceEditPage from './pages/devices/DeviceEditPage';
import PrivateRoute from './private.route';
import LoginPage from './pages/LoginPage';
import { UserContext } from "./context/user.context";
import AdminRoute from './admin.route';

import jwt from 'jsonwebtoken';

function App(props) {
  const existingUser = JSON.parse(localStorage.getItem("user"));
  const [currUser, setCurrUser] = useState(existingUser);
  
  const setMainUser = (data) => {
    if(data === null) {
      localStorage.clear();
      setCurrUser(null);
    } else {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken)
      setCurrUser(data.user);
    }
  }

  useEffect(() => {
    // TODO: See if we still need this
    if(currUser) {
      let token = localStorage.getItem("accessToken");
      let exp = jwt.decode(token).exp;
      if (Date.now() >= exp * 1000) {
        setMainUser(null);
      }
    }
  }, [])

  return (
    <UserContext.Provider value={{ currUser, setCurrUser: setMainUser }}>
        <div>
          <Header />
          <div className="container-fluid" id="mainContent" style={{paddingTop: "15px"}}>
            <Switch>
              <Route path="/login" exact component={LoginPage} />
              <Route path="/about" exact component={AboutPage} />
              <PrivateRoute path="/" exact component={HomePage} />

              <AdminRoute path="/users/create" exact component={UserCreatePage} />
              <PrivateRoute path="/users" exact component={UsersPage} />
              <AdminRoute path="/users/edit/:id" exact component={UserEditPage} />
              <PrivateRoute path="/users/:id" exact component={UserPage} />

              <PrivateRoute path="/devices" exact component={DevicesPage} />
              <AdminRoute path="/devices/create" exact component={DeviceCreatePage} />
              <PrivateRoute path="/devices/:id" exact component={DevicePage} />
              <AdminRoute path="/devices/edit/:id" exact component={DeviceEditPage} />
            </Switch>
          </div>
        </div>
    </UserContext.Provider>
  );
}

export default App;