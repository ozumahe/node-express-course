const Product = require("../models/ProductSchema");
const Errors = require("../errors");
const { StatusCodes } = require("http-status-codes");

// Create Product
const createProduct = async (req, res) => {
  req.body.user = req.user.userId;

  const product = await Product.create(req.body);

  if (!product)
    throw new Errors.BadRequestError("Please try again somethimg went wrong");

  res.status(StatusCodes.CREATED).json({ product });
};

// TODO: Get All Products
const getAllproducts = async (req, res) => {
  res.send("Get All Products");
};

// TODO: Get Single Product
const getSingleProduct = async (req, res) => {
  res.send("Get Single Product");
};

// TODO: Update Product
const updateProduct = async (req, res) => {
  res.send("update Product");
};

// TODO: Delete Product
const deleteProduct = async (req, res) => {
  res.send("Delete Product");
};

// TODO: Upload Image
const uploadImage = async (req, res) => {
  res.send("Upload Image");
};

module.exports = {
  createProduct,
  getAllproducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
