const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const teacherSchema= new Schema({
    name :{
        type:String,
        required:true,
    },
    uniqueId: {
        type: String,
        required:true,
    },
    email : {
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone :{
        type : Number,
        required:true,
    },
    institute:{
        type:String,
        required:true,
    },
    approval:{
         type: String,
  enum: ["approved", "rejected"],
  default: "rejected"
    },
    
});

const Teacher=mongoose.model("Teacher",teacherSchema);
module.exports=Teacher;