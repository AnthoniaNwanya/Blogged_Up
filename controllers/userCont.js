const express = require("express");
const userModel = require("../models/userModel");
const app = express();
app.use(express.json());

const getUsers = (req, res) => {
  userModel
    .find({}).populate('blogs', { title: 1, description: 1, timestamp: 1})
    .then((User) => {
      res.status(200).send(User);
    })
    .catch((err) => {
      res.status(404).send("User not found");
    });
};

const getUsersById = (req, res) => {
  const id = req.params.id;
  userModel
    .findById(id)
    .then(() => {
      res.status(200).send(User);
    })
    .catch((err) => {
      res.status(404).send({
        message: "User not found",
        data: err,
      });
    });
};
const createUser = (req, res) => {
  const newUser = req.body;
  userModel
    .create(newUser)
    .then((newUser) => {
      res.status(201).send({
        message: "User was created successfully",
        data: newUser,
      });
    })
    .catch((err) => {
      res.status(409).send("Unable to create user");
    });
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const userUpdate = req.body;
  userModel
    .findByIdAndUpdate(id, userUpdate, { new: true })
    .then(() => {
      res.status(200).send("User was updated successfully");
    })
    .catch((err) => {
      res.status(409).send("Unable to perform update");
    });
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndDelete(id)
    .then(() => {
      res.status(200).send("User deleted successfully");
    })
    .catch((err) => {
      res.status(409).send("Unable to delete user");
    });
};

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
};
