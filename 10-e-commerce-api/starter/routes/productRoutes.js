const express = require("express");
const router = express.Router();

const {
  authenticateUser,
  authenticatePermission,
} = require("../middleware/authentication");

const {
  createProduct,
  getAllproducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/productController");

const { getSingleProductReviews } = require("../controllers/reviewController");
router
  .route("/")
  .post([authenticateUser, authenticatePermission("admin")], createProduct)
  .get(getAllproducts);

router
  .route("/upload_image")
  .post([authenticateUser, authenticatePermission("admin")], uploadImage);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch([authenticateUser, authenticatePermission("admin")], updateProduct)
  .delete([authenticateUser, authenticatePermission("admin")], deleteProduct);

router.route("/:id/reviews").get(getSingleProductReviews);

module.exports = router;
