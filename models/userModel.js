const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required']
     },
     email: {
        type:String,
        unique :true ,
        required: [true, 'Email is required']
     },
     contactno: {
        type: Number,
        minlength:10,
        maxlength:12,
        required: [true, 'Contact no is required']
     },
     password: {
        type: String,
        required: [true, 'Password is required']
     },

     isAdmin: {
      type: Boolean,
      default: false
     },
     isStylist: {
      type: Boolean,
      default: false
     },
     notification: {
      type: Array,
      default: [],
     },
     seenNotification: {
      type: Array,
      default: [],
     }
},{
    timestamps: true
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;