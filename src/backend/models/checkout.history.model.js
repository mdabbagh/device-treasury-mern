const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const checkoutHistorySchema = new mongoose.Schema({
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

const CheckoutHistory = mongoose.model("checkouts", checkoutHistorySchema);

module.exports = CheckoutHistory;