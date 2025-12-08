const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/user");
const Teacher = require("./models/teacher");

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//alert
const alerts = [
  "Normal",
  "Flood Warning",
  "Earthquake Detected",
  "Fire Emergency",
  "Heavy Rainfall Warning",
];

const index = 1;
const msg=alerts[index];

require("dotenv").config();
const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

// const client = twilio(
//   ,   // your Account SID
//   ""// your Auth Token
// );


//mongoose connection
main()
  .then((res) => {
    console.log("connection successsful");
  })
  .catch((err) => {
    console.log("an error occured", err);
  });
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/disastereducation");
}

// app.get("/testListing",async (req, res) => {
//   let sample = new User({
//     name:"piyush",
//     email:"piyush@gamil.com",
//     role:"",
//     password:"piyush"
//   });
//   await sample.save();

//   res.send("no");
// });

//routes
app.get("/", (req, res) => {
  res.render("home",{idx:index,msg:alerts[index]});
});

app.get("/report", (req, res) => {
  res.render("report",{idx:index,msg:alerts[index]});
});

app.get("/chooselogin", (req, res) => {
  res.render("choose-login",{idx:index,msg:alerts[index]});
});

//admin
app.get("/adminlogin",(req,res)=>{
  res.render("adminLogin");
});

app.get("/admindashboard",(req,res)=>{
  res.render("adminDashboard");
});

app.get("/admin/studentinfo",(req,res)=>{
  res.render("studentinfo");
});

app.get("/admin/teacherinfo",(req,res)=>{
  res.render("teacherinfo");
});


//student
app.get("/studentregister", (req, res) => {
  res.render("studentRegister",{idx:index,msg:alerts[index]});
});
app.post("/studentregister", async (req, res) => {
  // let register = req.body.register;
  // if (register.role == "student" || register.role == "") {
  //   const exists = await User.exists({
  //     email: register.email,
  //     password: register.password,
  //   });
  //   if (!exists) {
  //     const newUser = new User(req.body.register);
  //     await newUser.save();
  //   }
  // } else {
  //   const exists = await Teacher.exists({
  //     email: register.email,
  //     password: register.password,
  //   });
  //   if (!exists) {
  //     const newTeacher = new Teacher(req.body.register);
  //     await newTeacher.save();
  //   }
  // }
  res.render("studentDashboard",{idx:index,msg:alerts[index]});
});

app.get("/studentlogin", (req, res) => {
  res.render("studentlogin");
});
app.post("/studentlogin", async (req, res) => {
  let studentDetails = req.body;

  const exists = await User.exists({
    email: studentDetails.email,
    password: studentDetails.password,
  });
  if (exists) {
    res.render("studentDashboard",{idx:index,msg:alerts[index]});
  } else {
    res.render("choose-login",{idx:index,msg:alerts[index]});
  }
});

app.get("/studentdashboard", (req, res) => {
  res.render("studentdashboard",{idx:index,msg:alerts[index]});
});

app.get("/studentpending",(req,res)=>{
  res.sender("studentPendingApproval");
});


//teacher
app.get("/teacherlogin", (req, res) => {
  res.render("teacherlogin",{idx:index,msg:alerts[index]});
});
app.post("/teacherlogin", async (req, res) => {
  let teacherDetails = req.body;
  
  const exists = await Teacher.exists({
    email: teacherDetails.email,
    password: teacherDetails.password,
  });
  if (exists) {
    res.render("teacherDashboard",{idx:index,msg:alerts[index]});
  } else {
    res.render("choose-login",{idx:index,msg:alerts[index]});
  }
});

app.get("/teacherregister", (req, res) => {
  res.render("teacherregister",{idx:index,msg:alerts[index]});
});
app.get("/teacherdashboard", (req, res) => {
  res.render("teacherDashboard",{idx:index,msg:alerts[index]});
});

app.get("/teacherapproval",(req,res)=>{
  res.sender("teacherPendingApproval");
});


app.get("/index", (req, res) => {
  res.render("index",{idx:index,msg:alerts[index]});
});

app.get("/index/alert",(req,res)=>{
  
});

app.get("/alldisaster", (req, res) => {

  const message = `${msg} occurred. Be safe!`;

  // Send SMS
  client.messages.create({

      to: "+918299569979",
      messagingServiceSid: "MG01379ec51e80956e142c143489483849",
      body: message
  })
  .then(sms => console.log("SMS Sent:", sms.sid))
  .catch(err => console.error("SMS Error:", err));

  // Render page
  res.render("All_disaster", {
      index,
      msg
  });

});



app.get("/avalanches", (req, res) => {
  res.render("Avalanches",{idx:index,msg:alerts[index]});
});

app.get("/chemicalhazards", (req, res) => {
  res.render("Chemical_Hazards",{idx:index,msg:alerts[index]});
});

app.get("/coldwave", (req, res) => {
  res.render("Coldwave",{idx:index,msg:alerts[index]});
});

app.get("/cyclone", (req, res) => {
  res.render("Cyclone",{idx:index,msg:alerts[index]});
});

app.get("/drought", (req, res) => {
  res.render("Drought",{idx:index,msg:alerts[index]});
});

app.get("/earthquake", (req, res) => {
  res.render("earthquake",{idx:index,msg:alerts[index]});
});
app.get("/earthquakehistory", (req, res) => {
  res.render("earthquakehistory",{idx:index,msg:alerts[index]});
});

app.get("/fire", (req, res) => {
  res.render("Fire",{idx:index,msg:alerts[index]});
});

app.get("/flood", (req, res) => {
  res.render("Flood",{idx:index,msg:alerts[index]});
});
app.get("/floodhistory", (req, res) => {
  res.render("floodhistory",{idx:index,msg:alerts[index]});
});
app.get("/firehistory", (req, res) => {
  res.render("firehistory",{idx:index,msg:alerts[index]});
});

app.get("/forestfire", (req, res) => {
  res.render("Forestfire",{idx:index,msg:alerts[index]});
});

app.get("/hailstorm", (req, res) => {
  res.render("Hailstorm",{idx:index,msg:alerts[index]});
});

app.get("/heatwave", (req, res) => {
  res.render("Heatwave",{idx:index,msg:alerts[index]});
});

app.get("/landslide", (req, res) => {
  res.render("Landslide",{idx:index,msg:alerts[index]});
});

app.get("/lightning", (req, res) => {
  res.render("Lightning",{idx:index,msg:alerts[index]});
});

app.get("/pandemic", (req, res) => {
  res.render("Pandemic",{idx:index,msg:alerts[index]});
});

app.get("/roadhazard", (req, res) => {
  res.render("Road_Hazard",{idx:index,msg:alerts[index]});
});

app.get("/tsunami", (req, res) => {
  res.render("Tsunami",{idx:index,msg:alerts[index]});
});

app.get("/overview", (req, res) => {
  res.render("overview",{idx:index,msg:alerts[index]});
});

app.get("/quiz", (req, res) => {
  res.render("quiz",{idx:index,msg:alerts[index]});
});

app.listen(port, () => {
  console.log("app is listening on port :", port);
});
