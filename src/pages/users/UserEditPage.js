import React, { useState } from 'react';

import UserService from '../../services/user.service';

function UserEditPage(props) {
  const [fullname, setFullname] = useState(props.location.state.user.fullname);
  const [email, setEmail] = useState(props.location.state.user.email);
  const [password, setPassword] = useState("");
  const [, setConfirmPassword] = useState("");
  const [isAdmin, setAdmin] = useState(props.location.state.user.isAdmin);
  
  const postEditUser = e => {
    e.preventDefault();

    const user = {
      fullname: fullname,
      email: email,
      password: password,
      isAdmin: isAdmin
    }

    UserService.updateUser(props.match.params.id, user).then(() => {
      window.location = '/';
    });
  }

  return (
    <div>
      <h2>Editing {props.location.state.user.email}</h2>
      <form onSubmit={postEditUser}>
        <div className="form-group">
          <label htmlFor="fullname">Full name</label>
          <input type="text" value={fullname} className="form-control" id="fullname" placeholder="Enter full name" 
            onChange={e => {setFullname(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" value={email} className="form-control" id="email" placeholder="Enter email" 
            onChange={e => {setEmail(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" 
            onChange={e => {setPassword(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" className="form-control" id="confirmPassword" 
            onChange={e => {setConfirmPassword(e.target.value)}}
          />
        </div>
        <div className="form-check">
          <input type="checkbox" defaultChecked={isAdmin} className="form-check-input" id="isAdminCheck" 
            onChange={e => {setAdmin(e.target.checked)}}
          />
          <label className="form-check-label" htmlFor="isAdminCheck">Make Admin</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default UserEditPage;