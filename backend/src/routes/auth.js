const express = require("express");
const signupController = require("../controller/auth.signup.controller");
const signinController = require("../controller/auth.signin.controller");

const authRouter = express.Router();

authRouter.post("/signin", signinController);
authRouter.post("/signup", signupController);

module.exports = authRouter;
