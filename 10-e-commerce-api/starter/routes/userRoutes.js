const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUsers,
  updateUserPassword,
  updateUser,
  showCurrentUser,
} = require("../controllers/userController");
const { authenticateUser } = require("../middleware/authentication");

router.route("/").get(authenticateUser, getAllUsers);

router.route("/showMe").get(showCurrentUser);
router.route("/updateUser").patch(updateUser);
router.route("/updateUserPassword").patch(updateUserPassword);

router.route("/:id").get(authenticateUser, getSingleUsers);

module.exports = router;
