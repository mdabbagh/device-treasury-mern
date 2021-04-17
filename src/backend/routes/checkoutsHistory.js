const mongoose = require('mongoose')
const router = require('express').Router();
var Device = require('../models/device.model');
var User = require('../models/user.model')
var CheckoutHistory = require('../models/checkout.history.model')
const authMiddleware = require("../middleware/auth.middleware");

// Get all checkouts history
router.route('/history').get(authMiddleware, (req, res) => {
  CheckoutHistory.find({}, null, {limit: 10, sor: {'epoch': -1}})
    .populate({ path: 'device_id', select: ['tag', 'make', 'modelName'], model: Device })
    .populate({path: 'user_id', select: 'fullname', model: User})
      .then(checkouts => {
        res.status(200).json(checkouts.slice(0, 10))
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

// Get checkout history for user
router.route('/history/user/:id').get(authMiddleware, (req, res) => {
  CheckoutHistory.find({user_id: mongoose.Types.ObjectId(req.params.id)})
    .populate({ path: 'device_id', select: ['tag', 'make', 'modelName'], model: Device })
      .then(checkouts => res.status(200).json(checkouts))
      .catch(err => res.status(400).json('Error: ' + err));
});

// Get checkout history for device
router.route('/history/device/:id').get(authMiddleware, (req, res) => {
  CheckoutHistory.find({device_id: mongoose.Types.ObjectId(req.params.id)})
    .populate({path: 'user_id', select: 'fullname', model: User})
      .then(checkouts => res.status(200).json(checkouts))
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;