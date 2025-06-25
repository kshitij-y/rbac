const prisma = require("../lib/db");
const { sendResponse } = require("../utils/sendResponse");
const dotenv = require("dotenv");
dotenv.config();

exports.getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.blog.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return sendResponse(res, {
      status: 200,
      success: true,
      message: "Blogs fetched successfully",
      data: {
        page,
        limit,
        total,
        totalPages,
        blogs,
      },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return sendResponse(res, {
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getById = async (req, res) => {
    const { id } = req.params;
    
    console.log("id -> ", id);

  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!blog) {
      return sendResponse(res, {
        status: 404,
        success: false,
        message: "Blog not found",
      });
    }

    return sendResponse(res, {
      status: 200,
      success: true,
      message: "Blog fetched successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    return sendResponse(res, {
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.searchBlog = async (req, res) => {
  const keyword = req.query.q;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  if (!keyword || keyword.trim() === "") {
    return sendResponse(res, {
      status: 400,
      success: false,
      message: "Search term is required",
    });
  }

  try {
    const whereCondition = {
      OR: [
        { title: { contains: keyword, mode: "insensitive" } },
        { content: { contains: keyword, mode: "insensitive" } },
      ],
    };

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.blog.count({ where: whereCondition }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return sendResponse(res, {
      status: 200,
      success: true,
      message: "Search results",
      data: {
        page,
        limit,
        total,
        totalPages,
        blogs,
      },
    });
  } catch (error) {
    console.error("Search error:", error);
    return sendResponse(res, {
      status: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

exports.createBlog = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return sendResponse(res, {
      status: 400,
      success: false,
      messsage: "Title and content both are required",
    });
  }

  try {
    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        authorId: req.user.id,
      },
    });

    return sendResponse(res, {
      status: 201,
      success: true,
      message: "Blog created succefully",
      data: blog,
    });
  } catch (error) {
    return sendResponse(res, {
      status: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const existing = await prisma.blog.findUnique({ where: { id } });
    if (!existing) {
      return sendResponse(res, {
        status: 404,
        success: false,
        message: "Blog not found",
      });
    }

    await prisma.blog.delete({ where: { id } });

    return sendResponse(res, {
      status: 200,
      success: true,
      message: "Blog deleted succesfully",
    });
  } catch (error) {
    return sendResponse(res, {
      status: 500,
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const existing = await prisma.blog.findUnique({ where: { id } });
    if (!existing) {
      return sendResponse(res, {
        status: 404,
        success: false,
        message: "Blog not found",
      });
    }

    const updated = await prisma.blog.update({
      where: { id },
      data: {
        title: title || existing.title,
        content: content || existing.content,
      },
    });

    return sendResponse(res, {
      status: 200,
      success: true,
      message: "Blog updated succesfully",
      data: updated,
    });
  } catch (error) {
    return sendResponse(res, {
      status: 500,
      success: false,
      message: "Internal server error",
    });
  }
};