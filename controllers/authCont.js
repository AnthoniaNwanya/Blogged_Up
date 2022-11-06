const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
require("dotenv").config();
const app = express();
app.use(express.json());

exports.signup = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!(first_name && last_name && email && password)) {
    res.status(400).send("Input user details");
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(400).send("User already exists");
    }

    const encryptPass = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptPass,
    });
    res.status(201).send(newUser);
  } catch (err) {
    return err;
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    res.status(400).send("Please provide your login details");
  }
  try {
    const validUser = await userModel.findOne({ email });
    if (!validUser) {
      res.status(404).send("User does not exist. Please register");
    }

    if (validUser) {
      const comparePass = await bcrypt.compare(password, validUser.password);
    }
    const token = jwt.sign(
      { validUser_id: validUser._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: "1h" }
    );
    validUser.token = token;
    res.status(200).send(validUser);
  } catch (err) {
    return err;
  }
};
