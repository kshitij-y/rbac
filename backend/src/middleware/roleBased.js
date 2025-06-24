const { sendResponse } = require("../utils/sendResponse");

exports.restrictToRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.Role) {
      return sendResponse(res, {
        status: 403,
        success: false,
        message: "Forbidden: No role assigned",
      });
    }

    if (!allowedRoles.includes(req.user.Role)) {
      return sendResponse(res, {
        status: 403,
        success: false,
        message:
          "Forbidden: You do not have permission to access this resource",
      });
    }

    next();
  };
};
