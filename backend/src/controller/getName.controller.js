const prisma = require("../lib/db");
const { sendResponse } = require("../utils/sendResponse");
const dotenv = require("dotenv");
dotenv.config();


exports.getUserName = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { name: true },
    });

    if (!user) {
      return sendResponse(res, {
        status: 404,
        success: false,
        message: "User not found",
      });
    }

    return sendResponse(res, {
      status: 200,
      success: true,
      message: "User name fetched successfully",
      data: { name: user.name },
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    return sendResponse(res, {
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};
