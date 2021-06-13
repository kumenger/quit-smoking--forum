const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/key");
const passport = require("passport");
const cros = require("cors");
const path = require("path");

const app = express();
app.use(cros());
mongoose.connect(keys.mongouri, {
  useCreateIndex: true,
  useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("sussfuly connected");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);
const postRouter = require("./routes/postroute");
const userRouter = require("./routes/userRoutes");

app.use("/post", postRouter);
app.use("/users", userRouter);

const PORT = process.env.PORT || 8000;
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`runing on port ${PORT}`);
});
