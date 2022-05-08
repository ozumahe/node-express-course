const express = require("express");
const router = express.Router();

// controllers
const {
  getAllProsducts,
  createProduct,
} = require("../controllers/productController");

const { uploadImage } = require("../controllers/uploadsController");
router.route("/").get(getAllProsducts).post(createProduct);
router.route("/uploads").post(uploadImage);

module.exports = router;
