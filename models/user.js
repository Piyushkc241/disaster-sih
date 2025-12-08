const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const userSchema= new Schema({
    name :{
        type:String,
        required:true,
    },
    email : {
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"student",
    },
    password:{
        type:String,
        required:true,
    },
    roll : {
        type:Number,
        // required:true,
    },
    number :{
        type:Number,
        // required:true,
    },
    institue:{
        type:String,
        // required:true
    }
});

const User=mongoose.model("User",userSchema);
module.exports=User;