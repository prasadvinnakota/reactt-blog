const mongoose = require("mongoose")

const userSchema = mongoose.Schema({

    name:{
        type:String,
        maxlength:50
    },

    email:{
        type:String,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        minlength:6
    },
    lastName:{
        type:String
    },
    role:
    {
        type:Number,
        default:0
    },
    token:
    {
        type:String
    },
    tokenExp:{
        type:Number
    }


})



module.exports = mongoose.model("User", userSchema)