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

//  Get All Products
const getAllproducts = async (req, res) => {
  const products = await Product.find({});

  res.status(StatusCodes.OK).json({ products });
};

//  Get Single Product
const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });
  if (!product)
    throw new Errors.BadRequestError(`No product found with id ${productId}`);

  res.status(StatusCodes.OK).json({ product });
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
