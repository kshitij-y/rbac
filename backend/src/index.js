const express = require("express");
const authRouter = require("./routes/auth");
const blogRouter = require("./routes/blog");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { sendResponse } = require("./utils/sendResponse");

const app = express();
const PORT = process.env.PORT || 3000;

const feurl = process.env.feurl;

app.use(
  cors({
    origin: feurl,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/health", async (req, res) => {
  return sendResponse(res, {
    status: 200,
    success: true,
    message: "Backend is up and running",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/blog", blogRouter);





app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
