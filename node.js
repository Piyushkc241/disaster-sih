const express = require("express");
const app = express();

var alerts = [
  "Normal",
  "Flood Warning",
  "Earthquake Detected",
  "Fire Emergency",
  "Heavy Rainfall Warning"
];

var index = 1;

app.get("/alert", (req, res) => {
  res.json({ status: alerts[index] });
  index = (index + 1) % alerts.length;
});


app.listen(4000, () => {
  console.log("Alert API running on port 3000");
});
