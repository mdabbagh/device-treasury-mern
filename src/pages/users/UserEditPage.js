import React, { useState, useEffect } from 'react';
import UserService from '../../services/user.service';

function UserEditPage(props) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const [originalEmail, setOriginalEmail] = useState("");

  useEffect(() => { 
    setOriginalEmail(props.location.state.email);
  }, [setOriginalEmail]);
  
  const postEditUser = e => {
    e.preventDefault();

    const user = {
      fullname: fullname,
      email: email,
      password: password,
      isAdmin: admin
    }

    UserService.updateUser(props.match.params.id, user).then(res => {
      window.location = '/';
    });
  }

  return (
    <div>
      <h2>Editing {originalEmail}</h2>
      <form onSubmit={postEditUser}>
        <div className="form-group">
          <label for="fullname">Full name</label>
          <input type="text" className="form-control" id="fullname" placeholder="Enter full name" 
            onChange={e => {setFullname(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label for="email">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email" 
            onChange={e => {setEmail(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input type="password" className="form-control" id="password" 
            onChange={e => {setPassword(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" className="form-control" id="confirmPassword" 
            onChange={e => {setConfirmPassword(e.target.value)}}
          />
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="isAdminCheck" 
            onChange={e => {setAdmin(e.target.checked)}}
          />
          <label className="form-check-label" for="isAdminCheck">Make Admin</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default UserEditPage;