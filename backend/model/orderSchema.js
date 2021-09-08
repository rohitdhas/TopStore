const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  cartItems: {
    required: true,
    type: Array,
  },
  address: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  full_name: {
    required: true,
    type: String,
  },
  mobile: {
    required: true,
    type: Number,
  },
});

const Order = mongoose.model("Orders", orderSchema);
module.exports = Order;
