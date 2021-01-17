import React, { useState } from 'react';
import UserService from '../../services/user.service';

function UserCreatePage(props) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [admin, setAdmin] = useState(false);

  const postUser = e => {
    e.preventDefault();

    const user = {
      fullname: fullname,
      email: email,
      password: password,
      isAdmin: admin
    }

    UserService.createUser(user).then(res => {
      console.log("Sent create user");
      if(res.status === 200) {
        window.location = '/';
      }
    });
  }

  return (
    <div>
      <form onSubmit={postUser}>
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

export default UserCreatePage;