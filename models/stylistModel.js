const mongoose = require( 'mongoose' );
const stylistSchema = new mongoose.Schema({
    userId: {
        type:String,
    },
    firstName: {
        type:String,
        required:[true, 'first name is required']
    },
    lastName: {
        type:String,
        required:[true, 'last name is required']
    },
    phone: {
        type:String,
        required:[true, 'contact number is required']
    },
    email: {
        type:String,
        required:[true, 'email id is required']
    },
    address:{
        type:String,
        required:[true, 'address is required']
    },
    specialization: {
        type:String,
        required:[true, 'specialization is required']
    },
    experience: {
        type:String,
        required:[true, 'experience is required']
    },
    timings: {
        type:Object,
        required:[true,'work timing details are required']
    },
    status: {
        type:String,
        default:'pending'
    }
}, {timestamps: true}
);


const stylistModel = mongoose.model('stylists', stylistSchema);

module.exports = stylistModel;

