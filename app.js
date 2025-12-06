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
var alerts = [
  "Normal",
  "Flood Warning",
  "Earthquake Detected",
  "Fire Emergency",
  "Heavy Rainfall Warning",
];
var index = 1;

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
  res.render("home");
});

app.get("/report", (req, res) => {
  res.render("report");
});

app.get("/chooselogin", (req, res) => {
  res.render("choose-login");
});

app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/register", async (req, res) => {
  let register = req.body.register;
  if (register.role == "student" || register.role == "") {
    const exists = await User.exists({
      email: register.email,
      password: register.password,
    });
    if (!exists) {
      const newUser = new User(req.body.register);
      await newUser.save();
    }
  } else {
    const exists = await Teacher.exists({
      email: register.email,
      password: register.password,
    });
    if (!exists) {
      const newTeacher = new Teacher(req.body.register);
      await newTeacher.save();
    }
  }
  res.render(`${register.role}Dashboard`);
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
    res.render("studentDashboard");
  } else {
    res.render("choose-login");
  }
});

app.get("/studentdashboard", (req, res) => {
  res.render("studentdashboard");
});

app.get("/teacherlogin", (req, res) => {
  res.render("teacherlogin");
});
app.post("/teacherlogin", async (req, res) => {
  let teacherDetails = req.body;

  const exists = await Teacher.exists({
    email: teacherDetails.email,
    password: teacherDetails.password,
  });
  if (exists) {
    res.render("teacherDashboard");
  } else {
    res.render("choose-login");
  }
});

app.get("/teacherdashboard", (req, res) => {
  res.render("teacherdashboard");
});

app.get("/index", (req, res) => {
  res.render("index", { msg: alerts[index] });
});

app.get("/alldisaster", (req, res) => {
  res.render("All_disaster");
});

app.get("/avalanches", (req, res) => {
  res.render("Avalanches");
});

app.get("/chemicalhazards", (req, res) => {
  res.render("Chemical_Hazards");
});

app.get("/coldwave", (req, res) => {
  res.render("Coldwave");
});

app.get("/cyclone", (req, res) => {
  res.render("Cyclone");
});

app.get("/drought", (req, res) => {
  res.render("Drought");
});

app.get("/earthquake", (req, res) => {
  res.render("earthquake");
});
app.get("/earthquakehistory", (req, res) => {
  res.render("earthquakehistory");
});

app.get("/fire", (req, res) => {
  res.render("Fire");
});

app.get("/flood", (req, res) => {
  res.render("Flood");
});
app.get("/floodhistory", (req, res) => {
  res.render("floodhistory");
});
app.get("/firehistory", (req, res) => {
  res.render("firehistory");
});

app.get("/forestfire", (req, res) => {
  res.render("Forestfire");
});

app.get("/hailstorm", (req, res) => {
  res.render("Hailstorm");
});

app.get("/heatwave", (req, res) => {
  res.render("Heatwave");
});

app.get("/landslide", (req, res) => {
  res.render("Landslide");
});

app.get("/lightning", (req, res) => {
  res.render("Lightning");
});

app.get("/pandemic", (req, res) => {
  res.render("Pandemic");
});

app.get("/roadhazard", (req, res) => {
  res.render("Road_Hazard");
});

app.get("/tsunami", (req, res) => {
  res.render("Tsunami");
});

app.get("/overview", (req, res) => {
  res.render("overview");
});

app.get("/quiz", (req, res) => {
  res.render("quiz");
});

app.listen(port, () => {
  console.log("app is listening on port :", port);
});
