const UserSchema = require("../models/UserSchema");
const { StatusCodes } = require("http-status-codes");
const Errors = require("../errors");
const {
  createJWT,
  verifyJWT,
  attachCookiesToResponse,
  createTokenUser,
} = require("../utils");

// Register
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const emailAlreadyExist = await UserSchema.findOne({ email });

  if (emailAlreadyExist) {
    throw new Errors.BadRequestError("Email Aready Exit");
  }

  const user = await UserSchema.create({ name, email, password });

  const tokenUser = createTokenUser(user);
  // const token = jwt.sign(tokenUser, "jwtsecret", { expiresIn: "1d" });
  // const token = createJWT({ payload: tokenUser });
  // const oneDay = 1000 * 60 * 60 * 24;

  // res.cookie("token", token, {
  //   expires: new Date(Date.now() + oneDay),
  //   httpOnly: true,
  // });
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    throw new Errors.BadRequestError("Please Provide email and password");
  }

  const user = await UserSchema.findOne({ email });

  if (!user) {
    throw new Errors.UnauthenticatedError(`No user found with email ${email}`);
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new Errors.UnauthenticatedError("Invalid Password");
  }

  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

// Logout
const logout = async (req, res) => {
  res.cookie("token", "logout", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};

module.exports = { register, login, logout };
