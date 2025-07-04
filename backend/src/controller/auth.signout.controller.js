const { sendResponse } = require("../utils/sendResponse");

const signout = (req, res) => {
  const isProd = process.env.NODE_ENV === "production";

  res.cookie("token", "", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "None" : "Strict",
    maxAge: 0,
  });


  return sendResponse(res, {
    status: 200,
    success: true,
    message: "Signed out",
  });
};

module.exports = signout;
