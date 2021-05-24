import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import DeviceService from '../../services/device.service';
import UserService from '../../services/user.service';
import Device from '../../components/Device';
import { useUserContext } from "../../context/user.context";

function DevicesPage() {
  const [devices, setDevices] = useState([]);
  const [userDevices, setUserDevices] = useState([]);
  const {currUser} = useUserContext();

  useEffect(() => {
    // Get all devices to populate whole list
    DeviceService.getAll()
      .then(res => {
        if(res.data.length > 0) {
          setDevices(res.data);
        }
      });
  }, [])

  useEffect(() => {
    UserService.getUser(currUser.id).then((res) => {
      setUserDevices(res.data.devices)
    })
  }, [])

  function deleteDevice(id) {
    DeviceService.deleteDevice(id)
      .then(res => console.log(res.data));
    setDevices(devices.filter(device => device._id != id));
  }

  function checkoutDevice(id) {
    // Checkout device
    // Update current devices list
    // Update userDevices
    DeviceService.checkoutDevice(id)
      .then(res => {
        if(res.data.length > 0) {
          setDevices(res.data);
        }
        UserService.getUser(currUser.id).then(res => {
          if(res.data.length > 0) {
            setUserDevices(res.data.devices);
          }
        })
        window.location.reload();
      }); // BAD, couldn't figure out how to rerender the DevicesPage without a reload
  }

  function checkinDevice(id) {
    DeviceService.checkinDevice(id)
      .then(res => {
        if(res.data.length > 0) {
          setDevices(res.data);
        }
        UserService.getUser(currUser.id).then(res => {
          if(res.data.length > 0) {
            setUserDevices(res.data.devices);
          }
        })
        window.location.reload();
      }); // BAD, couldn't figure out how to rerender the DevicesPage without a reload
  }

  function devicesList() {
    if(devices.length > 0) {
      return devices.map(currDevice => {
        return (
          <Device device={currDevice} userDevices={userDevices} deleteDevice={deleteDevice} checkoutDevice={checkoutDevice} checkinDevice={checkinDevice} key={currDevice._id} />
        );
      });
    }
  }

  return (
    <div>
      { currUser.isAdmin ? 
        <NavLink type="button" className="btn btn-primary" to='/devices/create/' style={{marginBottom: "15px"}}>Add Device</NavLink>
       : 
        null
      }
      <table className="table">
        <thead className="thead-light">
          <tr>
            <td>Tag</td>
            <td>Category</td>
            <td>Make</td>
            <td>Model</td>
          </tr>
        </thead>
        <tbody>
          {devicesList()}
        </tbody>
      </table>
    </div>
  )
}

export default DevicesPage;