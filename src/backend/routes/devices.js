const router = require('express').Router();
var Device = require('../models/device.model');
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

// Get devices
router.route('/').get(authMiddleware, (req, res) => {
  Device.find()
    .then(devices => res.json(devices))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a device
router.route('/add').post([authMiddleware,adminMiddleware], (req, res) => {
  const device = {
    tag: req.body.tag,
    category: req.body.category,
    make: req.body.make,
    modelName: req.body.modelName,
    color: req.body.color,
    displaySize: req.body.displaySize,
    resolution: req.body.resolution,
    memory: req.body.memory,
    os: req.body.os,
    features: req.body.features,
    passcode: req.body.passcode
  }

  let newDevice = new Device(device);

  newDevice.save()
    .then(() => res.json('Device added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get a device
router.route('/:id').get(authMiddleware, (req, res) => {
  Device.findById(req.params.id)
    .then(device => res.json(device))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a device
router.route('/delete/:id').delete([authMiddleware,adminMiddleware], (req, res) => {
  Device.findByIdAndDelete(req.params.id)
    .then(() => res.json('Device deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update a device
router.route('/update/:id').post([authMiddleware,adminMiddleware], (req, res) => {
  Device.findById(req.params.id)
    .then(device => {
      device.tag = req.body.tag;
      device.category = req.body.category,
      device.make = req.body.make;
      device.modelName = req.body.modelName;
      device.color = req.body.color,
      device.displaySize = req.body.displaySize,
      device.resolution = req.body.resolution,
      device.memory = req.body.memory,
      device.os = req.body.os,
      device.features = req.body.features,
      device.passcode = req.body.passcode

      device.save()
        .then(() => res.json('Device updated'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;