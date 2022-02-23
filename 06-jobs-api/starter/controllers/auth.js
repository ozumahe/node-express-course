const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// # Register
const register = async (req, res) => {
  // const { name, email, password } = req.body;

  // // salt
  // const salt = await bcrypt.genSalt(10);

  // // hashedPassword
  // const hashedPassword = await bcrypt.hash(password, salt);

  // // tempuser
  // const tempUser = { name, email, password: hashedPassword };

  const user = await User.create({ ...req.body });

  // const token = jwt.sign({ userId: user._id, name: user.name }, "jwtsecreat", {
  //   expiresIn: "30d",
  // });

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

// # Log In
const login = async (req, res) => {
  const { email, password } = req.body;

  // $ check empty value
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
