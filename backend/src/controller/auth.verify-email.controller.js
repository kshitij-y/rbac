const { redisClient } = require('../lib/redis');
const { sendEmail } = require("../lib/mailer");
const dotenv = require("dotenv");
const { sendResponse } = require('../utils/sendResponse');
dotenv.config();

const verifyEmail = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return sendResponse(res, {
            status: 400,
            success: false,
            message: "Email is required."
        });
    }
    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await redisClient.set(email, otp, 'EX', 300);
        await sendEmail(email, otp);
        return sendResponse(res, {
            status: 200,
            success: true,
            message: "OTP sent to your email successfully."
        });
    } catch (error) {
        console.error("Error in verifyEmail:", error);
        return sendResponse(res, {
            status: 500,
            success: false,
            message: "Internal server error."
        });
    }

}

module.exports =  verifyEmail ;