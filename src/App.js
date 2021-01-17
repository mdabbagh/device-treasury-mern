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
      localStorage.setItem("user", null);
      localStorage.setItem("token", null);
      setCurrUser();
    } else {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setCurrUser(data.user);
    }
  }

  useEffect(() => {
    if(currUser) {
      let token = localStorage.getItem("token");
      let exp = jwt.decode(token).exp
      console.log("THE EXP IS: " + exp);
      if (Date.now() >= exp * 1000) {
        console.log("IN IF");
        setMainUser(null)
      }
    }
  }, [currUser])

  return (
    <UserContext.Provider value={{ currUser, setCurrUser: setMainUser }}>
        <div>
          <Header />
          <div className="container-fluid">
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