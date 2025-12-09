const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/user");
const Teacher = require("./models/teacher");
const Admin = require("./models/admin");
const PendingTeacher = require("./models/pendingTeacher");
const PendingStudent = require("./models/pendingStudent");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Files
app.use(express.static("public"));
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


//home
app.get("/", (req, res) => {
  res.render("home",{idx:index,msg:alerts[index]});
});

//report
app.get("/report", (req, res) => {
  res.render("report",{idx:index,msg:alerts[index]});
});

//ar-tools
app.get("/ar-tools", (req, res) => {
  res.render("ar-tools",{idx:index,msg:alerts[index]});
});

//chooselogin
app.get("/chooselogin", (req, res) => {
  res.render("choose-login",{idx:index,msg:alerts[index]});
});


//admin
app.get("/adminlogin",(req,res)=>{
  res.render("adminLogin");
});

app.post("/adminlogin",async (req,res)=>{
  let adminUsername=req.body.username;
  let adminInstitute=req.body.institute;
  let adminPassword=req.body.password;
  let exists=await Admin.findOne({username:adminUsername, institute:adminInstitute,password:adminPassword});
  if(exists){
    res.redirect("/adminlogin");
  }
  res.redirect("/admindashboard");
});

app.get("/admindashboard", async (req, res) => {

    const msg = req.query.msg ?? null;

    const totalTeachers = await Teacher.countDocuments({});
    const approvedTeachers = await Teacher.countDocuments({ approval: "approved" });
    const pendingTeachers = await PendingTeacher.countDocuments({ });

    const totalStudents = await User.countDocuments({});
    const approvedStudents = await User.countDocuments({ approval: "approved" });

    const totalIncidents = 18;

    const pendingTeachersList = await PendingTeacher.find({});
    const studentList = await User.find({});

    res.render("adminDashboard", {
        msg,
        totalTeachers,
        approvedTeachers,
        pendingTeachers,
        totalStudents,
        approvedStudents,
        totalIncidents,
        pendingTeachersList,
        studentList
    });
});



app.get("/admin/studentinfo", async (req, res) => {
  const students = await User.find({});
  res.render("studentinfo", { students });
});

app.get("/admin/teacherinfo", async (req, res) => {
  const teachers = await Teacher.find({});
  res.render("teacherinfo", { teachers });
});

// APPROVE TEACHER
app.post("/admin/teacher/approve/:id", async (req, res) => {
    const pending = await PendingTeacher.findById(req.params.id);

    if (!pending) return res.redirect("/admindashboard?msg=error");

    await new Teacher({
        name: pending.name,
        uniqueId: pending.uniqueId,
        email: pending.email,
        password: pending.password,
        phone: pending.phone,
        institute: pending.institute,
        approval: "approved"
    }).save();

    await PendingTeacher.findByIdAndDelete(req.params.id);

    res.redirect("/admindashboard?msg=approved");
});



app.post("/admin/teacher/reject/:id", async (req, res) => {
    await PendingTeacher.findByIdAndDelete(req.params.id);
    res.redirect("/admindashboard?msg=rejected");
});



// BLOCK TEACHER
app.post("/admin/teacher/block/:id", async (req, res) => {
  await Teacher.findByIdAndUpdate(req.params.id, { approval: "blocked" });
  res.redirect("/admindashboard");
});




//teacher

app.get("/teacherregister", (req, res) => {
  res.render("teacherRegister",{idx:index,msg:alerts[index]});
});

app.post("/teacherregister", async (req, res) => {
    const newTeacher = new PendingTeacher(req.body.teacher);
    await newTeacher.save();

    res.render("teacherPendingApproval", {
        message: "Your request has been sent to admin!"
    });
});




app.get("/teacherlogin", (req, res) => {
  res.render("teacherlogin",{idx:index,msg:null});
});
app.post("/teacherlogin", async (req, res) => {
  const { roll, clg, password } = req.body;

  const teacher = await Teacher.findOne({
    uniqueId: roll,
    institute: clg,
    password: password
  });

  if (!teacher) {
    return res.send("Teacher not registered.");
  }

  return res.redirect("/teacherdashboard"); // ✅ FIXED
});



app.get("/teacherdashboard", async (req, res) => {

  const msg = req.query.msg || null;

  const pendingStudents = await PendingStudent.find({});


  res.render("teacherDashboard", {
    pendingStudents,
    msg,
    idx: index
  });
});



app.get("/teacherapproval",(req,res)=>{
  res.render("teacherPendingApproval");
});
app.get("/teacher/studentinfo", async (req, res) => {
  const students = await User.find({});
  res.render("studentinfo", { students });
});

// STUDENT APPROVE
app.post("/teacher/student/approve/:id", async (req, res) => {
    const pending = await PendingStudent.findById(req.params.id);

    if (!pending) return res.redirect("/teacherdashboard?msg=error");

    await new User({
        name: pending.name,
        email: pending.email,
        uniqueId: pending.uniqueId,
        phone: pending.phone,
        password: pending.password,
        institute: pending.institute,
        approval: "approved"
    }).save();

    await PendingStudent.findByIdAndDelete(req.params.id);

    res.redirect("/teacherdashboard?msg=approved");
    
  });
  
  
  app.post("/teacher/student/reject/:id", async (req, res) => {
    await PendingStudent.findByIdAndDelete(req.params.id);
    res.redirect("/teacherdashboard?msg=rejected");
  });


// STUDENT BLOCK
app.post("/teacher/student/block/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { approval: "blocked" });
  res.redirect("/teacher/studentinfo");
});




//student
app.get("/studentregister", (req, res) => {
  res.render("studentRegister",{idx:index,msg:alerts[index]});
});

app.post("/studentregister", async (req, res) => {
    const newStudent = new PendingStudent({
        ...req.body.student,
        approval: "pending"
    });

    await newStudent.save();
    res.render("studentPendingApproval");
});


app.get("/studentlogin", (req, res) => {
  res.render("studentlogin", { idx:index, msg:alerts[index] });
});
app.post("/studentlogin", async (req, res) => {
  let rollNum = req.body.roll;
  let clgName= req.body.clg;
  let pass = req.body.password;
  let exists= await User.find({ uniqueId:rollNum , institue:clgName,password:pass});
  if(!exists==1){
    res.redirect("/studentregister");
  }  
  res.render("studentDashboard",{idx:index,msg:alerts[index]});
});

app.get("/studentdashboard", (req, res) => {
  res.render("studentdashboard",{idx:index,msg:alerts[index]});
});

app.get("/studentpending",(req,res)=>{
  res.render("studentPendingApproval");
});


//teacher


//evacuation
app.get("/evacuation",(req,res)=>{
  res.render("evacuationIndex");
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

// ===== API Routes (AFTER all GET/POST routes) =====

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Chatbot API
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return res.status(500).json({
        error: 'API key not configured. Please add valid GEMINI_API_KEY to .env file'
      });
    }

    console.log('Sending message to Gemini:', message.substring(0, 50));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: message
            }]
          }]
        })
      }
    );

    const responseText = await response.text();
    
    console.log('Gemini response status:', response.status);
    console.log('Gemini response:', responseText.substring(0, 200));

    if (!response.ok) {
      console.error('Gemini API error:', responseText);
      
      // Check if it's a quota error (429)
      if (response.status === 429) {
        console.log('Quota exceeded - using fallback response');
        const fallbackResponses = [
          "I'm currently experiencing high demand. Here's some helpful information: Always have an emergency kit ready with water, food, first aid supplies, and important documents.",
          "API quota temporarily exceeded. Quick tip: During natural disasters, stay calm and follow official evacuation orders. Keep your phone charged and have multiple communication methods.",
          "Service temporarily unavailable. Safety reminder: Know your evacuation routes in advance and have a family communication plan prepared.",
          "Currently at capacity. Disaster safety tip: Secure heavy furniture and objects that could fall during earthquakes or storms.",
          "High demand right now. Remember: In a flood, move to higher ground immediately and never try to drive through flooded areas."
        ];
        const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
        return res.json({ reply: randomResponse });
      }
      
      return res.status(response.status).json({
        error: `API Error: ${response.status} - Check console for details`
      });
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse response:', responseText);
      return res.status(500).json({ error: 'Invalid API response format' });
    }

    if (!data.candidates || data.candidates.length === 0) {
      return res.status(500).json({ error: 'No response from Gemini' });
    }
    
    const candidate = data.candidates[0];
    const reply = candidate.content?.parts?.[0]?.text;
    
    if (!reply) {
      console.error('No text in response:', candidate);
      return res.status(500).json({ 
        error: `Response incomplete. Reason: ${candidate.finishReason || 'unknown'}` 
      });
    }
    
    console.log('Sending reply:', reply.substring(0, 100));
    res.json({ reply });
  } catch (error) {
    console.error('Chatbot API error:', error.message);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log("app is listening on port :", port);
});
