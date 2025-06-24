const express = require("express");
const { sendEmail } = require("./lib/mailer");
const authRouter = require("./routes/auth");
const { protect } = require("./middleware/auth");
const { restrictToRoles } = require("./middleware/roleBased");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/auth", authRouter);


app.get("/check", protect, restrictToRoles("ADMIN"), (req, res) => {
  res.send({ message: "Protected route accessed successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
