const mongoose = require("mogoose")

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
    passwrd:{
        type:String,
        minlength:6
    },
    lastname:{
        type:string
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