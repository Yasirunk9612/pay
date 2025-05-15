const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  cardholderName: { type: String, required: true },
  cardNumber: { type: String, required: true },
  expiry: { type: String, required: true },
  cvc: { type: String, required: true },
  discountCode: { type: String, default: "" },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  totalAmount: { type: String, required: true },
});

module.exports = mongoose.model("Payment", PaymentSchema);
