const UserSchema = require("../models/UserSchema");
const { StatusCodes } = require("http-status-codes");
const Error = require("../errors");

const getAllUsers = async (req, res) => {
  const users = await UserSchema.find({ role: "user" }).select("-password");

  res.status(StatusCodes.OK).json({ users });
};

const getSingleUsers = async (req, res) => {
  const { id: userId } = req.params;

  const user = await UserSchema.findOne({ _id: userId }).select("-password");

  if (!user) {
    throw new Error.NotFoundError(`No User FOund With Id ${userId}`);
  }
  res.status(StatusCodes.OK).json(user);
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  res.send("Update User");
};

const updateUserPassword = async (req, res) => {
  res.send(req.body);
};

module.exports = {
  getAllUsers,
  getSingleUsers,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
