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
    phone:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    institute:{
        type:String,
        required:true
    },
    approval:{
         type: String,
  enum: ["approved", "rejected"],
  default: "rejected"
    },

});

const User=mongoose.model("User",userSchema);
module.exports=User;