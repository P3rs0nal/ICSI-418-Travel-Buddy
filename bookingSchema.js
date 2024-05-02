const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    name_stay: String,
    about_stay: String,
    policies: String,
    num_of_rooms: {
        type: mongoose.Schema.Types.Number,
        default:0,
        required: true,
    },
    availability:[{
        startDate:{
            type:Date,
            required: true,
        },
        endDate: {
            type:Date,
            required:true,
        },
    key:{
        type:String,
        required:true,
    },
    }],
    num_of_bathrooms: {
        type: mongoose.Schema.Types.Number,
        default:0,
        required: true,
    },
    num_of_guests: {
        type: mongoose.Schema.Types.Number,
        default:0,
        required: true,
    },
    price:{
        type:mongoose.Schema.Types.Number,
        default:0,
        required:true,
     },
     features:[{
         value: mongoose.Schema.Types.ObjectId,
         label: String
     }]


});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;