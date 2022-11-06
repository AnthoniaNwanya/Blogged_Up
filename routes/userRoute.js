const express = require("express");
const userController = require("../controllers/userCont");
const userRouter = express.Router();
const { useToken } = require("../auth");

userRouter.get("/", userController.getUsers);

userRouter.get("/id",  userController.getUsersById);

userRouter.post("/",  userController.createUser);

userRouter.put("/", useToken, userController.updateUser);

userRouter.delete("/", useToken, userController.deleteUser);

module.exports = userRouter;
