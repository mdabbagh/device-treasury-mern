import React, { useState, useEffect } from 'react';

import UserService from '../../services/user.service';
import User from '../../components/User';
import { useUserContext } from "../../context/user.context";

function UsersPage(props) {
  const [users, setUsers] = useState("");
  const {currUser, setCurrUser} = useUserContext();
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
      UserService.getAll().then(res => {
        if(res.data.length > 0) {
          setUsers(res.data);
        }
      })
  }, [])

  useEffect(() => {
    if(currUser) {
      setLoggedIn(true);
    }
  }, [])

  function deleteUser(id) {
    UserService.deleteUser(id)
      .then(res => console.log(res.data));
    
    setUsers(users.filter(user => user._id != id));
  }

  function usersList() {
    if(users != '') {
      return users.map(currUser => {
        return <User user={currUser} deleteUser={deleteUser} key={currUser._id} />;
      });
    }
  }

  return (
    <div>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <td>Name</td>
            <td>Email</td>
          </tr>
        </thead>
        <tbody>
          {usersList()}
        </tbody>
      </table>
    </div>
  )
}

export default UsersPage;