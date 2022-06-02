const ReviewSchema = require("../models/ReviewSchema");
const ProductSchema = require("../models/ProductSchema");

const { StatusCodes } = require("http-status-codes");
const Error = require("../errors");
const { checkPermissions } = require("../utils");

const createReview = async (req, res) => {
  const { product: productId } = req.body;
  const { userId } = req.user;
  const isValidProduct = await ProductSchema.findOne({ _id: productId });

  if (!isValidProduct)
    throw new Error.NotFoundError(`No product found with id : ${productId}`);

  const alreadySubmitted = await ReviewSchema.findOne({
    product: productId,
    user: userId,
  });

  if (alreadySubmitted)
    throw new Error.BadRequestError(
      "Already submitted review for this product"
    );

  req.body.user = userId;

  const review = await ReviewSchema.create(req.body);

  res.status(StatusCodes.CREATED).json({ review });
};

const getAllReviews = async (req, res) => {
  res.send("getAllReviews");
};
const getSingleReview = async (req, res) => {
  res.send("getSingleReview");
};
const updateReview = async (req, res) => {
  res.send("updateReview");
};
const deleteReview = async (req, res) => {
  res.send("deleteReview");
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
