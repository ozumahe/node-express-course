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
  const { old_password, new_password } = req.body;

  if (!old_password || !new_password) {
    throw new Error.BadRequestError(
      "Please Old password and New password are required"
    );
  }
  const { userId } = req.user;

  const user = await UserSchema.findOne({ _id: userId });

  const isPasswordCorrect = await user.comparePassword(old_password);

  if (!isPasswordCorrect) {
    throw new Error.UnauthenticatedError("Invalid Credentials");
  }

  user.password = new_password;

  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Sucess! Password Updated" });
};

module.exports = {
  getAllUsers,
  getSingleUsers,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
