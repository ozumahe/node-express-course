const UserSchema = require("../models/UserSchema");
const { StatusCodes } = require("http-status-codes");
const Error = require("../errors");
const { createTokenUser, attachCookiesToResponse } = require("../utils");

// Get all users
const getAllUsers = async (req, res) => {
  const users = await UserSchema.find({ role: "user" }).select("-password");

  res.status(StatusCodes.OK).json({ users });
};

// Get SIngle User
const getSingleUsers = async (req, res) => {
  const { id: userId } = req.params;

  const user = await UserSchema.findOne({ _id: userId }).select("-password");

  if (!user) {
    throw new Error.NotFoundError(`No User FOund With Id ${userId}`);
  }
  res.status(StatusCodes.OK).json(user);
};

// Show Single User
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

// // Update User with findOndAndUpdate
// const updateUser = async (req, res) => {
//   const { name, email } = req.body;
//   if (!name || !email) {
//     throw new Error.BadRequestError("Please provide all values");
//   }

//   const user = await UserSchema.findByIdAndUpdate(
//     { _id: req.user.userId },
//     { email, name },
//     { new: true, runValidators: true }
//   );

//   const tokenUser = createTokenUser(user);

//   attachCookiesToResponse({ res, user: tokenUser });

//   res.status(StatusCodes.OK).json({ user: tokenUser });
// };
//

// Update User with save
const updateUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    throw new Error.BadRequestError("Please provide all values");
  }

  const user = await UserSchema.findOne({ _id: req.user.userId });

  user.name = name;
  user.email = email;

  await user.save();

  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

// Update User Password
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
