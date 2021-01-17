import React, { useState } from 'react';

import DeviceService from '../../services/device.service';

function DeviceCreatePage(props) {
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

  const postDevice = e => {
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

    DeviceService.createDevice(device);
    window.location = '/';
  }

  return (
    <div>
      <form onSubmit={postDevice}>
        <div className="form-group">
          <label for="tag">Tag</label>
          <input type="text" className="form-control" id="tag" placeholder="" 
            onChange={e => {setTag(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label for="category">Category</label>
          <input type="text" className="form-control" id="category" placeholder="" 
            onChange={e => {setCategory(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label for="make">Make</label>
          <input type="text" className="form-control" id="make" 
            onChange={e => {setMake(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label for="model">Model</label>
          <input type="text" className="form-control" id="model" 
            onChange={e => {setModelName(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label for="color">Color</label>
          <input type="text" className="form-control" id="color" 
            onChange={e => {setColor(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label for="displaySize">Display Size</label>
          <input type="text" className="form-control" id="displaySize" 
            onChange={e => {setDisplaySize(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label for="resolution">Resolution</label>
          <input type="text" className="form-control" id="resolution" 
            onChange={e => {setResolution(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label for="memory">Memory</label>
          <input type="text" className="form-control" id="memory" 
            onChange={e => {setMemory(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label for="os">OS</label>
          <input type="text" className="form-control" id="os" 
            onChange={e => {setOS(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label for="features">Features</label>
          <input type="text" className="form-control" id="features" 
            onChange={e => {setFeatures(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label for="passcode">Passcode</label>
          <input type="text" className="form-control" id="passcode" 
            onChange={e => {setPasscode(e.target.value)}}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default DeviceCreatePage;