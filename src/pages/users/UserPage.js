import React, { useState, useEffect } from 'react';
import UserService from '../../services/user.service';
import { useUserContext } from "../../context/user.context";

function UserPage(props) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const {currUser, setCurrUser} = useUserContext();

  useEffect(() => {
    if(currUser) {
      UserService.getUser(props.match.params.id)
      .then(res => {
        setFullname(res.data.fullname);
        setEmail(res.data.email);
      });
    }
  }, [])

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
          <tr>
            <td>{fullname}</td>
            <td>{email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default UserPage;