const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const teacherSchema= new Schema({
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
        default:"teacher",
    },
    password:{
        type:String,
        required:true,
    },
    number :{
        type : Number,
        // required : true,
    },
    institute:{
        type:String,
        //required:true
    },
    
});

const Teacher=mongoose.model("Teacher",teacherSchema);
module.exports=Teacher;