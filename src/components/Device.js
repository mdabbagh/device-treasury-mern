import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from "../context/user.context";

function Device(props) {
  const {currUser} = useUserContext();

  return (
    <tr>
    <td><Link to={"/devices/" + props.device._id}>{props.device.tag}</Link></td>
    <td>{props.device.category}</td>
    <td>{props.device.make}</td>
    <td>{props.device.modelName}</td>
    {
      currUser.isAdmin?
        <>
          <td>
            <Link to={{pathname: "/devices/edit/" + props.device._id, 
              state: {
                tag: props.device.tag
              }}}>
              edit</Link>
          </td>
          <td>
            <a href="#" onClick={() => {props.deleteDevice(props.device._id)}}>delete</a>
          </td>
        </>
      : 
        null
    }
  </tr>
  )
}

export default Device;