const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const prisma = require("../lib/db");
const { sendResponse } = require("../utils/sendResponse");

dotenv.config();

exports.protect = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return sendResponse(res, {
      status: 401,
      success: false,
      message: "Unauthorized: No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, Role: true },
    });

    if (!user) {
      return sendResponse(res, {
        status: 401,
        success: false,
        message: "Unauthorized: User not found",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("JWT Error:", err);
    return sendResponse(res, {
      status: 401,
      success: false,
      message: "Unauthorized: Invalid token",
    });
  }
};
