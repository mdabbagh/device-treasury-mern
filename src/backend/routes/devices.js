const router = require('express').Router();
var Device = require('../models/device.model');
var CheckoutHistory = require('../models/checkout.history.model')
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const User = require('../models/user.model');

// Get devices
router.route('/').get(authMiddleware, (req, res) => {
  Device.find()
    .then(devices => res.status(200).json(devices))
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
    .then(() => res.status(200).json('Device added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get a device
router.route('/:id').get(authMiddleware, (req, res) => {
  Device.findById(req.params.id)
    .then(device => res.status(200).json(device))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a device
router.route('/delete/:id').delete([authMiddleware,adminMiddleware], (req, res) => {
  Device.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json('Device deleted'))
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
        .then(() => res.status(200).json('Device updated'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

// CheckoutHistory a device
router.route('/checkout/:id').post([authMiddleware], (req, res) => {
  Device.findById(req.params.id)
    .then(device => {
      var checkout = new CheckoutHistory();
      checkout.user_id = req.user
      checkout.device_id = device._id
      checkout.action = "CHECKOUT"
      checkout.save()
        .then(() => {
          User.findByIdAndUpdate(
            req.user,
            { $push: { devices: device._id } },
            { new: true, useFindAndModify: false })
            .then(() => {
              device.available = false;
              device.save()
                .then(() => {
                  Device.find()
                    .then(devices => res.status(200).json(devices))
                })
                .catch((err) => res.status(400).json('Error: ' + err));
            })
        })
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

// Checking a device
router.route('/checkin/:id').post([authMiddleware], (req, res) => {
  Device.findById(req.params.id)
    .then(device => {
      var checkout = new CheckoutHistory();
      checkout.user_id = req.user
      checkout.device_id = device._id
      checkout.action = "CHECKIN"
      checkout.save()
        .then(() => {
          User.findByIdAndUpdate(
            req.user,
            { $pull: { devices: device._id } },
            { new: true, useFindAndModify: false })
            .then(() => {
              device.available = true;
              device.save()
                .then(() => {
                  Device.find()
                    .then(devices => res.status(200).json(devices))
                })
                .catch((err) => res.status(400).json('Error: ' + err));
            })
        })
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;