const Errors = require("../errors");
const { verifyJWT } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const { token } = req.signedCookies;

  if (!token) {
    throw new Errors.UnauthenticatedError("Not Authorized");
  }

  try {
    const { name, userId, role } = verifyJWT({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new Errors.UnauthenticatedError("Not Authorized");
  }
};

// const authenticatePermission = async (req, res, next) => {
//   if (req.user.role !== "admin") {
//     // console.log("Not an Admin");
//     throw new Errors.UnauthorizedError("Unauthorized to access this route");
//   }
//   next();
// };

const authenticatePermission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new Errors.UnauthorizedError("You are Not Permited to this Route");
    }
    next();
  };
};

module.exports = { authenticateUser, authenticatePermission };
