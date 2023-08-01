const mongoose = require('mongoose');

const resetPassword = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    resetPasswordToken:{
        type:String,
        required:true
    },
    resetPasswordExpires:{
        type:Date
    }
});


const ResetPassword = mongoose.model('ResetPassword', resetPassword);
module.exports = ResetPassword;