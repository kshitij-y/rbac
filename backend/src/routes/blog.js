const express = require("express");

const {
  getAll,
  getById,
  searchBlog,
  createBlog,
  deleteBlog,
  updateBlog,
} = require("../controller/blog.controller");

const { protect } = require("../middleware/auth");
const { restrictToRoles } = require("../middleware/roleBased");

const blogRouter = express.Router();

blogRouter.get("/getAll", getAll);
blogRouter.get("/search", searchBlog);
blogRouter.get("/:id", getById); // this is dynamic route (always in last line)

blogRouter.post("/create", protect, restrictToRoles("ADMIN"), createBlog);
blogRouter.delete("/delete/:id", protect, restrictToRoles("ADMIN"), deleteBlog);
blogRouter.patch("/update/:id", protect, restrictToRoles("ADMIN"), updateBlog);

module.exports = blogRouter;
