const UserSchema = require("../models/UserSchema");
const { StatusCodes } = require("http-status-codes");
const Errors = require("../errors");
const { createJWT, verifyJWT } = require("../utils");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const emailAlreadyExist = await UserSchema.findOne({ email });

  if (emailAlreadyExist) {
    throw new Errors.BadRequestError("Email Aready Exit");
  }

  const user = await UserSchema.create({ name, email, password });

  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  // const token = jwt.sign(tokenUser, "jwtsecret", { expiresIn: "1d" });
  const token = createJWT({ payload: tokenUser });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    expires: new Date(Date.now() + oneDay),
    httpOnly: true,
  });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  res.send("login User");
};

const logout = async (req, res) => {
  res.send("logout User");
};

module.exports = { register, login, logout };
