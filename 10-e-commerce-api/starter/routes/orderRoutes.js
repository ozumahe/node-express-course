const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authenticatePermission,
} = require("../middleware/authentication");

const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrder,
  createOrder,
  updateOrder,
} = require("../controllers/orderController");

router
  .route("/")
  .post(authenticateUser, createOrder)
  .get([authenticateUser, authenticatePermission("admin")], getAllOrders);

router.route("/show_all_my_orders").get(authenticateUser, getCurrentUserOrder);

router
  .route("/:id")
  .patch(authenticateUser, updateOrder)
  .get(authenticateUser, getSingleOrder);

module.exports = router;
