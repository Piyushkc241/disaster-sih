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
    uniqueId:{
        type:Number,
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
        enum: ["pending", "approved", "rejected", "blocked"],
        default: "pending"
    },

});

const User=mongoose.model("User",userSchema);
module.exports=User;