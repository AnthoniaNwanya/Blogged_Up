const express = require("express");
const userModel = require("../models/userModel");
const app = express();
app.use(express.json());


const blogOwnerCheck = async (req, res, next) => {
  const userId = req.User.validUser_id;
  const currUser = await userModel.findById(userId);
  const mapUserToBlog = currUser.blogs.map((blog) => {
    return blog.toString();
  });
  const checkQueryParams = mapUserToBlog.includes(req.query.id);
  if (!checkQueryParams) {
    return res
      .status(403)
      .send("Only blog owners are authorized to perform this action");
  }
  next();
};


module.exports = { blogOwnerCheck };