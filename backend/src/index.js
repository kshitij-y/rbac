const express = require("express");
const { sendEmail } = require("./lib/mailer");
const authRouter = require("./routes/auth");
const blogRouter = require("./routes/blog");
const { protect } = require("./middleware/auth");
const { restrictToRoles } = require("./middleware/roleBased");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/blog", blogRouter);





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
