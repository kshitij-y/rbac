const express = require("express");
const authRouter = require("./routes/auth");
const blogRouter = require("./routes/blog");
const cookieParser = require("cookie-parser");
const cors = require("cors");

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

app.use("/api/auth", authRouter);
app.use("/api/blog", blogRouter);





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
