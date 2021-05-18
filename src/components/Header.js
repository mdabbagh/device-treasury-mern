import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUserContext } from "../context/user.context";

function Header() {
  const {currUser, setCurrUser} = useUserContext();

  function logOut() {
    setCurrUser(null);
    localStorage.clear();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink to="/" className="navbar-brand">Device Treasury</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" 
          data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {
              !currUser ? 
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">Login</NavLink>
                </li>
              : 
                <li className="nav-item">
                  <button type="button" className="btn btn-primary" onClick={logOut}>Logout</button>
                </li>
            }
            <li className="nav-item">
              <NavLink to="/" className="nav-link">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/users" className="nav-link">Users</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/devices" className="nav-link">Devices</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">About</NavLink>
            </li>
          </ul>
          <div className="nav-item">
              {
                currUser? <NavLink to={{pathname: "/users/" + currUser.id}} className="nav-link">{currUser.fullname}</NavLink>
                : null
              } 
          </div>
        </div>
      </nav>
  );
}

export default Header;