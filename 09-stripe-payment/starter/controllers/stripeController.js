const { StatusCodes } = require("http-status-codes");

const stripe = async (req, res) => {
  console.log(req.body);
  res.status(StatusCodes.OK).send("Strip APi");
};

module.exports = stripe;
