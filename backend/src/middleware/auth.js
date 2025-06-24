const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const prisma = require("../lib/db");
const { sendResponse } = require("../utils/sendResponse");
dotenv.config();

exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return sendResponse(res, {
      status: 401,
      success: false,
      message: "Unauthorized: No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

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
