const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    cardHolderName: String,
    cardNumber: String,
    expiration: String,
    securityCode: String
});

const Booking = mongoose.model("Payment", PaymentSchema);

module.exports = Booking;