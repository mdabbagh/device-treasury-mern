const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const deviceSchema = new mongoose.Schema({
  tag: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  make: {
    type: String,
    trim: true,
    required: true
  },
  modelName: {
    type: String,
    trim: true,
    required: true
  },
  color: {
    type: String,
    trim: true,
    required: true
  },
  displaySize: {
    type: String,
    trim: true,
    required: true
  },
  resolution: {
    type: String,
    trim: true,
    required: true
  },
  memory: {
    type: String,
    trim: true,
    required: true
  },
  os: {
    type: String,
    trim: true,
    required: true
  },
  features: {
    type: String,
    trim: true,
  },
  passcode: {
    type: String,
    trim: true,
  },
  available: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

const Device = mongoose.model("devices", deviceSchema);

module.exports = Device;