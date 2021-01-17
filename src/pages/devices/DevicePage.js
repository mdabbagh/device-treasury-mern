import React, { useState, useEffect } from 'react';

import DeviceService from '../../services/device.service';

function DevicePage(props) {
  const [tag, setTag] = useState("");
  const [category, setCategory] = useState("");
  const [make, setMake] = useState("");
  const [modelName, setModelName] = useState("");
  
  useEffect(() => {
    DeviceService.getDevice(props.match.params.id)
      .then(res => {
        setTag(res.data.tag);
        setCategory(res.data.category);
        setMake(res.data.make);
        setModelName(res.data.modelName);
      });
  }, [])

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
    </div>
  )
}

export default DevicePage;