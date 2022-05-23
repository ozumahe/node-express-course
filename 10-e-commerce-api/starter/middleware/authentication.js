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

module.exports = { authenticateUser };
