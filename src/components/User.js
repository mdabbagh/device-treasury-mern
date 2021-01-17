import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from "../context/user.context";

function User(props) {
  const {currUser} = useUserContext();

  return (
    <tr>
      <td><Link to={"/users/" + props.user._id}>{props.user.fullname}</Link></td>
      <td>{props.user.email}</td>
      
      {
        currUser.isAdmin?
          <>
            <td>
              <Link to={{pathname: "/users/edit/" + props.user._id, 
                state: {
                  email: props.user.email
                }}}>
                edit</Link>
            </td>
            <td>
              <a href="#" onClick={() => {props.deleteUser(props.user._id)}}>delete</a>
            </td>
          </>
        :
          null
      }  
    </tr>
  )
}

export default User;