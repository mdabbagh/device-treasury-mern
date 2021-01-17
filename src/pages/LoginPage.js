import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useUserContext } from '../context/user.context';
import AuthService from '../services/auth.service';

function LoginPage() {
  const {currUser, setCurrUser} = useUserContext();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const postLogin = e => {
    e.preventDefault();
    const creds = {
      email: email,
      password: password,
    }
    AuthService.login(creds).then(res => {
      if (res.status === 200) {
        setCurrUser(res.data);
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
    })
  }

  if (isLoggedIn) {
    return <Redirect exact from="/login" to="/" />;
  }

  return (
    <div>
      <form onSubmit={postLogin}>
        <div className="form-group">
          <label htmlFor="emailAddress">Email address</label>
          <input type="email" className="form-control" id="emailAddress" aria-describedby="emailHelp" placeholder="Enter email" 
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" 
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      { isError &&<div>The username or password provided were incorrect!</div> }
    </div>
  );
}

export default LoginPage;