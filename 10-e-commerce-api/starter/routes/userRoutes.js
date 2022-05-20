const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUsers,
  updateUserPassword,
  updateUser,
  showCurrentUser,
} = require("../controllers/userController");

router.route("/").get(getAllUsers);

router.route("/showMe").get(showCurrentUser);
router.route("/updateUser").patch(updateUser);
router.route("/updateUserPassword").patch(updateUserPassword);

router.route("/:id").get(getSingleUsers);

module.exports = router;
