import React, { useState, useEffect } from 'react';

import DeviceService from '../../services/device.service';

function DeviceEditPage(props) {
  const [tag, setTag] = useState("");
  const [category, setCategory] = useState("");
  const [make, setMake] = useState("");
  const [modelName, setModelName] = useState("");
  const [color, setColor] = useState("");
  const [displaySize, setDisplaySize] = useState("");
  const [resolution, setResolution] = useState("");
  const [memory, setMemory] = useState("");
  const [os, setOS] = useState("");
  const [features, setFeatures] = useState("");
  const [passcode, setPasscode] = useState("");
  const [originalDevice, setOriginalDevice] = useState("");

  useEffect(() => { 
    setOriginalDevice(props.location.state.tag);
  }, [setOriginalDevice]);

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
      <h2>Editing {originalDevice}</h2>
      <form onSubmit={postEditDevice}>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input type="text" className="form-control" id="tag" placeholder="" 
            onChange={e => {setTag(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input type="text" className="form-control" id="category" placeholder="" 
            onChange={e => {setCategory(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="make">Make</label>
          <input type="text" className="form-control" id="make" 
            onChange={e => {setMake(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="model">Model</label>
          <input type="text" className="form-control" id="model" 
            onChange={e => {setModelName(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input type="text" className="form-control" id="color" 
            onChange={e => {setColor(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="displaySize">Display Size</label>
          <input type="text" className="form-control" id="displaySize" 
            onChange={e => {setDisplaySize(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="resolution">Resolution</label>
          <input type="text" className="form-control" id="resolution" 
            onChange={e => {setResolution(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="memory">Memory</label>
          <input type="text" className="form-control" id="memory" 
            onChange={e => {setMemory(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="os">OS</label>
          <input type="text" className="form-control" id="os" 
            onChange={e => {setOS(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="features">Features</label>
          <input type="text" className="form-control" id="features" 
            onChange={e => {setFeatures(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="passcode">Passcode</label>
          <input type="text" className="form-control" id="passcode" 
            onChange={e => {setPasscode(e.target.value)}}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default DeviceEditPage;