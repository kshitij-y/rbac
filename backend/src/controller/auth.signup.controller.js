const prisma = require("../lib/db");
const { sendResponse } = require("../utils/sendResponse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { redisClient } = require("../lib/redis");
dotenv.config();

const signupController = async (req, res) => {
  const { name, email, password, Role, otp } = req.body;

  if (!name || !email || !password || !Role || !otp) {
    return sendResponse(res, {
      status: 400,
      success: false,
      message: "All fields are required.",
    });
  }

  try {
    const storedOtp = await redisClient.get(email);
    if (!storedOtp) {
      return sendResponse(res, {
        status: 400,
        success: false,
        message: "OTP expired or not found.",
      });
    }

    if (storedOtp !== otp) {
      return sendResponse(res, {
        status: 401,
        success: false,
        message: "Invalid OTP.",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return sendResponse(res, {
        status: 400,
        success: false,
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        Role,
      },
    });

    const token = jwt.sign(
      { id: newUser.id, role: newUser.Role, email: newUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    await redisClient.del(email);

    return sendResponse(res, {
      status: 201,
      success: true,
      message: "User created successfully.",
      data: {
        email: newUser.email,
        token,
        role: newUser.Role,
        name: newUser.name,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return sendResponse(res, {
      status: 500,
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = signupController;
