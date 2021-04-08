const mongoose = require('mongoose')
const router = require('express').Router();
var Device = require('../models/device.model');
var CheckoutHistory = require('../models/checkout.history.model')
const authMiddleware = require("../middleware/auth.middleware");

// Get all checkouts history
router.route('/history').get(authMiddleware, (req, res) => {
  CheckoutHistory.find()
    .then(checkouts => res.status(200).json(checkouts))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get checkout history for user
router.route('/history/user/:id').get(authMiddleware, (req, res) => {
  console.log("Getting checkouts for user")
  CheckoutHistory.find({user_id: mongoose.Types.ObjectId(req.params.id)})
    .then(checkouts => res.status(200).json(checkouts))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get checkout history for device
router.route('/history/device/:id').get(authMiddleware, (req, res) => {
  console.log("Getting checkouts for device")
  CheckoutHistory.find({device_id: mongoose.Types.ObjectId(req.params.id)})
    .then(checkouts => res.status(200).json(checkouts))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;