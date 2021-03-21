import React, { useState, useEffect } from 'react';

import DeviceService from '../../services/device.service';
import Device from '../../components/Device';

function DevicesPage(props) {
  const [devices, setDevices] = useState();
  const [count, setCount] = useState();
  const [availableDevices, setAvailableDevices] = useState()

  useEffect(() => {
    setCount(Math.random())
    DeviceService.getAll()
      .then(res => {
        if(res.data.length > 0) {
          setDevices(res.data);
        }
      });
  }, [])

  function updateCount() {
    setCount(Math.random());
  }

  function deleteDevice(id) {
    DeviceService.deleteDevice(id)
      .then(res => console.log(res.data));
    setDevices(devices.filter(device => device._id != id));
  }

  function checkoutDevice(id) {
    DeviceService.checkoutDevice(id)
      .then(() => window.location.reload()) // BAD, couldn't figure out how to rerender the DevicesPage
  }

  function checkinDevice(id) {
    DeviceService.checkinDevice(id)
      .then(res => window.location.reload()) // BAD, couldn't figure out how to rerender the DevicesPage
  }

  function devicesList() {
    if(devices) {
      return devices.map(currDevice => {
        return <Device device={currDevice} deleteDevice={deleteDevice} checkoutDevice={checkoutDevice} checkinDevice={checkinDevice} key={currDevice._id} />;
      });
    }
  }

  return (
    <div>
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