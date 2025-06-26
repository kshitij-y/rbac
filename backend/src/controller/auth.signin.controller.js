const prisma = require("../lib/db");
const { sendResponse } = require("../utils/sendResponse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const signinController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendResponse(res, {
      status: 400,
      success: false,
      message: "Email and password are required.",
    });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return sendResponse(res, {
        status: 404,
        success: false,
        message: "User not found.",
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return sendResponse(res, {
        status: 401,
        success: false,
        message: "Invalid password.",
      });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.Role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const isProd = process.env.NODE_ENV === "production"
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: isProd,
      sameSite: isProd ? 'lax' : 'strict',
    });

    return sendResponse(res, {
      status: 200,
      success: true,
      message: "Sign-in successful.",
      data: {
        id: user.id,
        email: user.email,
        role: user.Role,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    return sendResponse(res, {
      status: 500,
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = signinController;
