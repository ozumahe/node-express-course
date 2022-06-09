const OrderSchema = require("../models/OrderSchema");
const ProductSchema = require("../models/ProductSchema");

const { StatusCodes } = require("http-status-codes");
const Error = require("../errors");
const { checkPermissions } = require("../utils");

const fakeStripeApi = ({ amount, currency }) => {
  const client_secret = "ehuieoshoeheiheeoohee9ieue";
  return { client_secret, amount };
};

const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new Error.BadRequestError("No cart items provided");
  }

  if (!tax || !shippingFee) {
    throw new Error.BadRequestError("Please provide tax and shipping fee");
  }

  let orderItems = [];
  let subTotal = [];

  for (const item of cartItems) {
    const dbProduct = await ProductSchema.findOne({ _id: item.product });

    if (!dbProduct) {
      throw new Error.NotFoundError(
        `No product found with id: ${item.product}`
      );
    }

    const { name, price, image, _id } = dbProduct;

    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };

    // add items to order
    orderItems = [...orderItems, singleOrderItem];
    // calculate subtotal
    subTotal += item.amount * price;
  }

  // Calculate the total
  const total = tax + shippingFee + subTotal;

  const paymentIntent = await fakeStripeApi({
    amount: total,
    currency: "usd",
  });

  const order = OrderSchema.create({
    orderItems,
    total,
    subTotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
  });
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
