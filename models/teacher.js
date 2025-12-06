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
        set:(v)=>v === ""? "teacher" :v,
    },
    password:{
        type:String,
        required:true,
    },
});

const Teacher=mongoose.model("Teacher",teacherSchema);
module.exports=Teacher;