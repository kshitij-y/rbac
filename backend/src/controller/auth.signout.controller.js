const { sendResponse } = require("../utils/sendResponse");

const signout = (req, res) => {
  res.setHeader(
    "Set-Cookie",
    "token=; HttpOnly; Path=/; Max-Age=0; SameSite=None; Secure"
  );
  
    return sendResponse(res, {
        status: 200,
        success: true,
        message: "Signed out"
    });
}

module.exports = signout;