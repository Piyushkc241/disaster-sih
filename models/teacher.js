const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const teacherSchema= new Schema({
    name :{
        type:String,
        required:true,
    },
    uniqueId: {
        type: String,
    },
    email : {
        type:String,
        required:true,
        unique: true,
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
        type : String,
    },
    institute:{
        type:String,
    },
    
});

const Teacher=mongoose.model("Teacher",teacherSchema);
module.exports=Teacher;