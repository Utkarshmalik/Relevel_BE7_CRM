const mongoose = require("mongoose");
const { userTypes, userStatus } = require("../utils/constants");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>Date.now()
    },
    userTypes:{
        type:String,
        required:true,
        default:userTypes.customer
    },
    userStatus:{
        type:String,
        required:true,
        default:userStatus.approved
    }
})

module.exports = mongoose.model("User", userSchema);