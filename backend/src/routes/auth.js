const express = require("express");
const signupController = require("../controller/auth.signup.controller");
const signinController = require("../controller/auth.signin.controller");
const verifyEmail = require("../controller/auth.verify-email.controller");
const getMe = require("../controller/auth.verify.controller");
const signout = require("../controller/auth.signout.controller");
const authRouter = express.Router();

authRouter.post("/signin", signinController);
authRouter.post("/signup", signupController);
authRouter.post("/verifyEmail", verifyEmail);
authRouter.get("/me", getMe);
authRouter.get("/signout", signout);

module.exports = authRouter;
