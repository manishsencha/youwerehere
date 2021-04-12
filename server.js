const express = require("express");
const mongoose = require("mongoose");
const userData = require("./data");
const profanity = require("profanity-hindi");
const app = express();
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");

const colorsarr = ["primary", "success", "danger", "info", "secondary"];

app.use(express.urlencoded({ extended: false }));
mongoose
  .connect(
    "mongodb+srv://manishsencha:Psghcgueg.7@youwerehere.skqd6.mongodb.net/youwerehere?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.log(err));

var errorMessage = "";
app.post("/add", async (req, res) => {
  try {
    const reqIP = req.socket.remoteAddress;
    const ip = await userData.findOne({ ip: reqIP });
    const color = colorsarr[Math.floor(Math.random() * colorsarr.length)];

    if (profanity.isMessageDirty(req.body.name)) {
      errorMessage = "Please don't use inappropriate words!! Behave yourself!!";
      res.redirect("/");
      } else if (ip) {
        errorMessage = "Already exist for this IP Address!!";
        res.redirect("/");
    } else {
      await userData.create({ ip: reqIP, name: req.body.name, color: color });
      errorMessage= "Successfully added!!"
      res.redirect("/");
    }
  } catch (e) {
    console.log(e);
    res.redirect("/");
  }
});
app.get("/", async (req, res) => {
  const data = await userData.find();
  res.render("index", { data: data, count: data.length, error: errorMessage });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
