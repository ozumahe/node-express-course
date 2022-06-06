const Product = require("../models/ProductSchema");
const Errors = require("../errors");
const { StatusCodes } = require("http-status-codes");
const path = require("path");

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

  res.status(StatusCodes.OK).json({ products, count: products.length });
};

//  Get Single Product
const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId }).populate("reviews");
  if (!product)
    throw new Errors.NotFoundError(`No product found with id: ${productId}`);

  res.status(StatusCodes.OK).json({ product });
};

//  Update Product
const updateProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product)
    throw new Errors.NotFoundError(`No product found with id: ${productId}`);

  res.status(StatusCodes.OK).send({ product });
};

// TODO: Delete Product
const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });
  if (!product)
    throw new Errors.NotFoundError(`No product found with id: ${productId}`);

  await product.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! product removed" });
};

// TODO: Upload Imagem
const uploadImage = async (req, res) => {
  if (!req.files) throw new Errors.BadRequestError("No File Uploaded");

  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image"))
    throw new Errors.BadRequestError("Please upload an image");

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize)
    throw new Errors.BadRequestError("Plase upload image less than 1kb");

  const imagePath = path.join(
    __dirname,
    `../public/uploads/${productImage.name}`
  );

  await productImage.mv(imagePath);

  res.json({ image: { src: `/uploads/${productImage.name}` } });
};

module.exports = {
  createProduct,
  getAllproducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
