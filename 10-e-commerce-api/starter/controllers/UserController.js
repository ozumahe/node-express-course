const UserSchema = require("../models/UserSchema");
const { StatusCodes } = require("http-status-codes");

const getAllUsers = async (req, res) => {
  res.send("Get All Users");
};

const getSingleUsers = async (req, res) => {
  res.send("Get Single Users");
};
const showCurrentUser = async (req, res) => {
  res.send("Show Current User");
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
