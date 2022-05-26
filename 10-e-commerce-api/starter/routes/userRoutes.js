const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUsers,
  updateUserPassword,
  updateUser,
  showCurrentUser,
} = require("../controllers/userController");
const {
  authenticateUser,
  authenticatePermission,
} = require("../middleware/authentication");

router
  .route("/")
  .get(authenticateUser, authenticatePermission("admin", "owner"), getAllUsers);

router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/updateUser").patch(updateUser);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);

router.route("/:id").get(authenticateUser, getSingleUsers);

module.exports = router;
