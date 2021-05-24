import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import UserService from '../../services/user.service';
import User from '../../components/User';
import { useUserContext } from "../../context/user.context";

function UsersPage() {
  const [users, setUsers] = useState("");
  const {currUser} = useUserContext();

  useEffect(() => {
      UserService.getAll().then(res => {
        if(res.data.length > 0) {
          setUsers(res.data);
        }
      })
  }, [])

  function deleteUser(id) {
    UserService.deleteUser(id)
      .then(res => console.log(res.data));
    
    setUsers(users.filter(user => user._id != id));
  }

  function usersList() {
    if(users != '') {
      return users.map(user => {
        return <User user={user} deleteUser={deleteUser} key={user._id} />;
      });
    }
  }

  return (
    <div>
      { currUser.isAdmin ? 
        <NavLink type="button" className="btn btn-primary" to='/users/create/' style={{marginBottom: "15px"}}>Add User</NavLink>
       : 
        null
      }
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