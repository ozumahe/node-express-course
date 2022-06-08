const OrderSchema = require("../models/OrderSchema");
const ProductSchema = require("../models/ProductSchema");

const { StatusCodes } = require("http-status-codes");
const Error = require("../errors");
const { checkPermissions } = require("../utils");

const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartIttems || cartIttems.length < 1) {
    throw new Error.BadRequestError("No cart items provided");
  }

  if (!tax || !shippingFee) {
    throw new Error.BadRequestError("Please provide tax and shipping fee");
  }

  let orderItems = [];
  let subTotal = [];

  for (const item of cartItems) {
    const dbProduct = await new ProductSchema.findOne({ _id: item.product });

    if (!dbProduct) {
      throw new Error.NotFoundError(
        `No product found with id: ${item.product}`
      );
    }
  }
  res.send("create Order");
};

const getAllOrders = async (req, res) => {
  res.send("Get All Orders");
};
const getSingleOrder = async (req, res) => {
  res.send("Get Single Order");
};
const getCurrentUserOrder = async (req, res) => {
  res.send("Get Current User Order");
};
const updateOrder = async (req, res) => {
  res.send("update Order");
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrder,
  createOrder,
  updateOrder,
};
