const stripe = require("stripe")(process.env.STRIPE_KEY);

const { StatusCodes } = require("http-status-codes");

const stripeController = async (req, res) => {
  const { purchase, total_amount, shipping_fee } = req.body;
  const calculateOrderAmount = () => {
    return total_amount + shipping_fee;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  console.log(paymentIntent);
  res.json({
    clientSecret: paymentIntent.client_secret,
  });
};

module.exports = stripeController;
