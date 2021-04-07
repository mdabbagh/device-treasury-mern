const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const checkoutSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  device_id: {
    type: Schema.Types.ObjectId,
    ref: 'Device',
    required: true
  },
  action: {
    type: String,
    enum: ['CHECKOUT', 'CHECKIN'],
    required: true
  }
}, {
  timestamps: true,
});

const Checkout = mongoose.model("checkouts", checkoutSchema);

module.exports = Checkout;