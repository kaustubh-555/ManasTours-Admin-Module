const mongoose=require("mongoose");

const tourSchema=new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    visits: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    AverageRating: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    imageCover: {
        type: String,
        require: true
    },
    bookings:{
        type: Number,
        default: 0
    },
    duration: {
        type: String,
        require: true
    },
    discount: {
        type: Number,
        default:0
    },
    places:{
        type: [String]
    },
    stay: {
        type: String,
        require: true
    },
    food: {
        type: String,
        require: true
    }
})  
module.exports=mongoose.model('Tours',tourSchema);