import React, { useState, useEffect } from 'react';

import DeviceService from '../../services/device.service';
import Device from '../../components/Device';

function DevicesPage(props) {
  const [devices, setDevices] = useState("");

  useEffect(() => {
    DeviceService.getAll()
      .then(res => {
        if(res.data.length > 0) {
          setDevices(res.data);
        }
      });
  }, [])

  function deleteDevice(id) {
    DeviceService.deleteDevice(id)
      .then(res => console.log(res.data));
    
    setDevices(devices.filter(device => device._id != id));
  }

  function devicesList() {
    if(devices != '') {
      return devices.map(currDevice => {
        return <Device device={currDevice} deleteDevice={deleteDevice} key={currDevice._id} />;
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