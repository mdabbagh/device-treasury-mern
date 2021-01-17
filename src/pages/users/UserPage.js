import React, { useState, useEffect } from 'react';
import UserService from '../../services/user.service';

function UserPage(props) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    UserService.getUser(props.match.params.id)
      .then(res => {
        setFullname(res.data.fullname);
        setEmail(res.data.email);
      });
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