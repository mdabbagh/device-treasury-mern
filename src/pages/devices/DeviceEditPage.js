import React, { useState, useEffect } from 'react';

import DeviceService from '../../services/device.service';

function DeviceEditPage(props) {
  const [tag, setTag] = useState(props.location.state.device.tag);
  const [category, setCategory] = useState(props.location.state.device.category);
  const [make, setMake] = useState(props.location.state.device.make);
  const [modelName, setModelName] = useState(props.location.state.device.modelName);
  const [color, setColor] = useState(props.location.state.device.color);
  const [displaySize, setDisplaySize] = useState(props.location.state.device.displaySize);
  const [resolution, setResolution] = useState(props.location.state.device.resolution);
  const [memory, setMemory] = useState(props.location.state.device.memory);
  const [os, setOS] = useState(props.location.state.device.os);
  const [features, setFeatures] = useState(props.location.state.device.features);
  const [passcode, setPasscode] = useState(props.location.state.device.passcode);

  const postEditDevice = e => {
    e.preventDefault();

    const device = {
      tag: tag,
      category: category,
      make: make,
      modelName: modelName,
      color: color,
      displaySize: displaySize,
      resolution: resolution,
      memory: memory,
      os: os,
      features: features,
      passcode: passcode,
    }

    DeviceService.updateDevice(props.match.params.id, device);
    window.location = '/devices';
  }

  return (
    <div>
      <h2>Editing {props.location.state.device.tag}</h2>
      <form onSubmit={postEditDevice}>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input type="text" value={tag} className="form-control" id="tag" placeholder="" 
            onChange={e => {setTag(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input type="text" value={category} className="form-control" id="category" placeholder="" 
            onChange={e => {setCategory(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="make">Make</label>
          <input type="text" value={make} className="form-control" id="make" 
            onChange={e => {setMake(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="model">Model</label>
          <input type="text" value={modelName} className="form-control" id="model" 
            onChange={e => {setModelName(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input type="text" value={color} className="form-control" id="color" 
            onChange={e => {setColor(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="displaySize">Display Size</label>
          <input type="text" value={displaySize} className="form-control" id="displaySize" 
            onChange={e => {setDisplaySize(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="resolution">Resolution</label>
          <input type="text" value={resolution} className="form-control" id="resolution" 
            onChange={e => {setResolution(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="memory">Memory</label>
          <input type="text" value={memory} className="form-control" id="memory" 
            onChange={e => {setMemory(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="os">OS</label>
          <input type="text" value={os} className="form-control" id="os" 
            onChange={e => {setOS(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="features">Features</label>
          <input type="text" value={features} className="form-control" id="features" 
            onChange={e => {setFeatures(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="passcode">Passcode</label>
          <input type="text" value={passcode} className="form-control" id="passcode" 
            onChange={e => {setPasscode(e.target.value)}}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default DeviceEditPage;