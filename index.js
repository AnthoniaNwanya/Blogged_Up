const express = require("express");

const BlogRoute = require("./routes/blogRoute");
const UserRoute = require("./routes/userRoute");
const JwtRoute = require("./routes/authRoute");


require("dotenv").config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "views");

app.use("/auth", JwtRoute);
app.use("/blog", BlogRoute);
app.use("/user", UserRoute);

app.get('/', (req, res) => {
  res.render("index")
})

app.use(function (err, req, res, next) {
  res.status(500);
  res.json({
    error: err.message,
  });
});

app.use("*", (req, res) => {
  return res.status(404).json({ message: "route not found" });
});

module.exports = app
