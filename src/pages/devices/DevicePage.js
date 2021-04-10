import React, { useState, useEffect } from 'react';

import DeviceService from '../../services/device.service';
import CheckoutHistoryService from '../../services/checkout.history.service'
import History from '../../components/History';

function DevicePage(props) {
  const [tag, setTag] = useState("");
  const [category, setCategory] = useState("");
  const [make, setMake] = useState("");
  const [modelName, setModelName] = useState("");
  const [history, setHistory] = useState();
  
  useEffect(() => {
    DeviceService.getDevice(props.match.params.id)
      .then(res => {
        setTag(res.data.tag);
        setCategory(res.data.category);
        setMake(res.data.make);
        setModelName(res.data.modelName);
      });
  }, [])

  useEffect(() => {
    // Get all devices to populate whole list
    CheckoutHistoryService.getDeviceHistory(props.match.params.id)
      .then(res => {
        if(res.data) {
          setHistory(res.data)
        }
      });
  }, [])

  function historyList() {
    if(history !== undefined) {
      if(history.length > 0) {
        return history.map(currHistory => {
          return (
            <History history={currHistory} key={currHistory._id} />
          );
        });
      }
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
          <tr>
            <td>{tag}</td>
            <td>{category}</td>
            <td>{make}</td>
            <td>{modelName}</td>
          </tr>
        </tbody>
      </table>
      <h3>History</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <td>Date</td>
            <td>User</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {historyList()}
        </tbody>
      </table>
    </div>
  )
}

export default DevicePage;