import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from "../context/user.context";

function Device(props) {
  const {currUser} = useUserContext();
  const [isAvailable, setIsAvailable] = useState()

  useEffect(() => {
    if(props.device.available) {
      setIsAvailable(true);
    } else {
      setIsAvailable(false);
    }
  }, [])

  return (
    <tr>
    <td><Link to={"/devices/" + props.device._id}>{props.device.tag}</Link></td>
    <td>{props.device.category}</td>
    <td>{props.device.make}</td>
    <td>{props.device.modelName}</td>
    {
      props.device.available?
        <>
          <td>
            <button type="button" className="btn btn-primary" onClick={() => {props.checkoutDevice(props.device._id)}}>Checkout</button>
          </td>
        </>
        :
        <>
          <td>
            <button type="button" className="btn btn-primary" onClick={() => {props.checkinDevice(props.device._id)}}>Checkin</button>
          </td>
        </>
    }
    {
      currUser.isAdmin?
        <>
          <td>
            <Link to={{pathname: "/devices/edit/" + props.device._id, 
              state: {
                tag: props.device.tag
              }}}>
              edit
            </Link>
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