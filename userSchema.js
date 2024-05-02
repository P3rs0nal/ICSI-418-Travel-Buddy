const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_Name: String,
    last_Name: String,
    UserName: String,
    Password: String,
    PhoneNumber: String,
    Email: String,
    isAdmin: {type: Boolean, default: false},
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stays'
    }]
});

const user = mongoose.model("user", userSchema);

module.exports = user;