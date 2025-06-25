const jwt = require("jsonwebtoken");
const { sendResponse } = require("../utils/sendResponse");
const dotenv = require("dotenv");
dotenv.config();


const getMe = (req, res) => {
  try {
    const token = req.cookies?.token;

    console.log("req came", token);

    if (!token) {
      return sendResponse(res, {
        status: 401,
        success: false,
        message: "Not authenticated",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return sendResponse(res, {
      status: 200,
      success: true,
      message: "Authenticated",
      data: {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      },
    });
  } catch (error) {
    return sendResponse(res, {
      status: 401,
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = getMe;

