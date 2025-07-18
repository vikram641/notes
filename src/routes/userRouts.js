const express = require("express");
const { signup, signin } = require("../controlers/userControler");
const userRouter = express.Router();

userRouter.get("/signup", signup);

userRouter.get("/signin", signin);

module.exports = userRouter;
