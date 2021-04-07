import { PromiseProvider } from 'mongoose';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from "../context/user.context";
import CheckoutService from '../services/checkout.service';

function Device(props) {
  const {currUser} = useUserContext();

  return (
    <tr>
      <td><Link to={"/devices/" + props.device._id}>{props.device.tag}</Link></td>
      <td>{props.device.category}</td>
      <td>{props.device.make}</td>
      <td>{props.device.modelName}</td>
      <td>
        { props.device.available && !props.userDevices.includes(props.device._id) &&
            <button type="button" className="btn btn-primary" onClick={() => {props.checkoutDevice(props.device._id)}}>Checkout</button>
        }
        { !props.device.available && props.userDevices.includes(props.device._id) &&
            <button type="button" className="btn btn-primary" onClick={() => {props.checkinDevice(props.device._id)}}>Checkin</button>
        }
        { !props.device.available && !props.userDevices.includes(props.device._id) &&
            <button type="button" className="btn btn-primary" onClick={() => {props.checkinDevice(props.device._id)}}>Blah</button>
        }
      </td>
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