const mongoose = require("mongoose");

const StaySchema = new mongoose.Schema({
    name_stay: {
        type: String,
        required: true,
    },
    about_stay: {
        type: String,
        required: true,
    },
    policies: {
        type: String,
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
    
    num_of_rooms: {
        type: mongoose.Schema.Types.Number,
        default:0,
        required: true,
    },
    num_of_bathrooms: {
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
        value: String,
        label: String
    }],
    num_of_guests: {
        type: mongoose.Schema.Types.Number,
        default:0,
        required: true,
    },
    deal_type:[{
        value: String,
        label: String
    }],
});

const Stay = mongoose.model("stays", StaySchema);

module.exports = Stay;