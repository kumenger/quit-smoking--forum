const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/key");
const passport = require("passport");
const cros=require('cors')
const app=express()
const path =require('path')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cros());

mongoose.connect(keys.mongouri, {
  useCreateIndex: true,
  useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("sussfuly connected");
});



app.use(passport.initialize());
app.use(passport.session());



const postRouter = require("./routes/postroute");
const userRouter = require("./routes/userRoutes");


app.use("/post", postRouter);
app.use("/users", userRouter);

require("./config/passport")(passport);
app.use(express.static('./client/build/'))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`runing on port ${PORT}`);
});



