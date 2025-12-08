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
    password:{
        type:String,
        required:true,
    },
    institue:{
        type:String,
        // required:true
    },
    approval:{
        type:String,
        required:true,
        set:(v)=>v === ""? "rejected" :v,
    },

});

const User=mongoose.model("User",userSchema);
module.exports=User;