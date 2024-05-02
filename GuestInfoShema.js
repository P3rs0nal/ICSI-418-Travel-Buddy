const mongoose = require("mongoose");

const GuestInfoSchema = new mongoose.Schema({
    first_Name: String,
    last_Name: String,
    Email: String,
    PhoneNumber: String,
    features: [String]
});

const Guest = mongoose.model("Guest", GuestInfoSchema);
module.exports = Guest;