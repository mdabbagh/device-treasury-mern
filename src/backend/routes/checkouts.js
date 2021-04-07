const mongoose = require('mongoose')
const router = require('express').Router();
var Device = require('../models/device.model');
var Checkout = require('../models/checkout.model')
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

// Get all checkouts history
router.route('/history').get(authMiddleware, (req, res) => {
  Checkout.find()
    .then(checkouts => res.status(200).json(checkouts))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get checkout history for user
router.route('/history/user/:id').get(authMiddleware, (req, res) => {
  console.log("Getting checkouts for user")
  Checkout.find({user_id: mongoose.Types.ObjectId(req.params.id)})
    .then(checkouts => res.status(200).json(checkouts))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get checkout history for device
router.route('/history/device/:id').get(authMiddleware, (req, res) => {
  console.log("Getting checkouts for device")
  Checkout.find({device_id: mongoose.Types.ObjectId(req.params.id)})
    .then(checkouts => res.status(200).json(checkouts))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get current user checkouts
// TODO: May not need this
router.route('/user/:id').get(authMiddleware, (req, res) => {
  console.log("Getting checkouts for device")
  Checkout.find({device_id: mongoose.Types.ObjectId(req.params.id)})
    .then(checkouts => res.status(200).json(checkouts))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;