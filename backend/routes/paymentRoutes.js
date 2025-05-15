const express = require("express");
const Payment = require("../models/Payment1");
const router = express.Router();


router.post("/", async (req, res) => {
  const { cardholderName, cardNumber, expiry, cvc, discountCode, name, phone, address, totalAmount } = req.body;

  try {
    const newPayment = new Payment({
      cardholderName,
      cardNumber,
      expiry,
      cvc,
      discountCode,
      name,
      phone,
      address,
      totalAmount,
    });

    const payment = await newPayment.save();
    res.json(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


router.put("/:id", async (req, res) => {
  const { cardholderName, cardNumber, expiry, name, phone, address } = req.body;

  try {
    let payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ msg: "Payment not found" });

    payment.cardholderName = cardholderName || payment.cardholderName;
    payment.cardNumber = cardNumber || payment.cardNumber;
    payment.expiry = expiry || payment.expiry;
    payment.name = name || payment.name;
    payment.phone = phone || payment.phone;
    payment.address = address || payment.address;

    await payment.save();
    res.json(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});



router.get("/", async (req, res) => {
  try {
    const query = {};

    // Check if query parameters are provided and add them to the filter
    if (req.query.cardholderName) query.cardholderName = req.query.cardholderName;
    if (req.query.phone) query.phone = req.query.phone;
    if (req.query.address) query.address = req.query.address;
    if (req.query.totalAmount) query.totalAmount = req.query.totalAmount;

    const payments = await Payment.find(query);
    res.json(payments);
  } catch (err) {
    console.error("Error details:", err);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
