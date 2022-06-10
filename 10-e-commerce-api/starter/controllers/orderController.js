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
  let subtotal = [];

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
    subtotal += item.amount * price;
  }

  // Calculate the total
  const total = tax + shippingFee + subtotal;

  const paymentIntent = await fakeStripeApi({
    amount: total,
    currency: "usd",
  });

  // create order
  const order = await OrderSchema.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
};

// Get All Orders
const getAllOrders = async (req, res) => {
  const orders = await OrderSchema.find({});

  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

// Get Single Order
const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;

  const order = await OrderSchema.findOne({ _id: orderId });

  if (!order) {
    throw new Error.NotFoundError(`No product found with id: ${orderId}`);
  }

  checkPermissions(req.user, order.user);

  res.status(StatusCodes.OK).json({ order });
};

const getCurrentUserOrder = async (req, res) => {
  const order = await OrderSchema.find({ user: req.user.userId }).populate({
    path: "user",
    select: "name ",
  });
  res.status(StatusCodes.OK).json({ order, count: order.length });
};

// Update Order
const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { paymentIntentId } = req.body;

  const order = await OrderSchema.findOne({ _id: orderId });

  if (!order) {
    throw new Error.NotFoundError(`No product found with id: ${orderId}`);
  }

  checkPermissions(req.user, order.user);

  order.paymentIntentId = paymentIntentId;
  order.status = "paid";

  await order.save();

  res.status(StatusCodes.OK).json({ order });
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrder,
  createOrder,
  updateOrder,
};
