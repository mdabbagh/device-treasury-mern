import React, { useState, useEffect } from 'react';

import DeviceService from '../../services/device.service';
import Device from '../../components/Device';

function DevicesPage(props) {
  const [devices, setDevices] = useState();
  const [unavailableDevices, setUnavailableDevices] = useState({});
  const [count, setCount] = useState()

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

  function checkoutDevice(id) {
    console.log("About to checkout device");
    console.log(id);
    DeviceService.checkoutDevice(id)
      .then(res => {
        console.log("Device checked out");
        
      }).then(() => {
        console.log("after device checkout")
        let newCount = count + 1;
        setCount(newCount);
      })
      .catch(err => "Error checking out device: " + err);
    console.log("after device checkedout")
    let newCount = count + 1;
    setCount(newCount);
  }

  function checkinDevice(id) {
    DeviceService.checkinDevice(id)
      .then(res => {
        console.log("Device checked in");
      }).then(() => {
        console.log("after device checkin")
        let newCount = count + 1;
        setCount(newCount);
      })
      .catch(err => "Error checking out device: " + err);
    
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