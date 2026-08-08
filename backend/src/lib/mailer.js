const { Resend } = require("resend");
const dotenv = require("dotenv");

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, otp) => {
  const mailOptions = {
    from: "writeFlow@resend.dev",
    to,
    subject: "Your OTP Code",
    html: `
      <p>Your OTP code is:</p>
      <h2>${otp}</h2>
      <p>This OTP will expire in 10 minutes.</p>
`,
  };

  try {
    const { data, error } = await resend.emails.send(mailOptions);

    if (error) {
      console.error("Error sending email:", error);
      return false;
    }

    console.log("Email sent:", data);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = { sendEmail };

// Example:
// sendEmail("kshitijyadav2003@gmail.com", "123456");
